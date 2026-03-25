import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { generateOrderNumber } from "@/lib/utils";
import OrderConfirmationEmail from "@/emails/order-confirmation";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutCompleted(session);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const metadata = session.metadata || {};

  // Reconstruct people data from metadata
  let peopleData: Array<{
    name: string;
    plaque: string;
    photo: string;
    photoName: string;
    address?: Record<string, string>;
  }> = [];

  if (metadata.people) {
    peopleData = JSON.parse(metadata.people);
  } else if (metadata.peopleChunks) {
    const chunks = parseInt(metadata.peopleChunks, 10);
    let json = "";
    for (let i = 0; i < chunks; i++) {
      json += metadata[`people_${i}`] || "";
    }
    peopleData = JSON.parse(json);
  }

  const unitPrice = parseFloat(metadata.subtotal || "0") / parseInt(metadata.quantity || "1", 10);
  const shipToOneAddress = metadata.shipToOneAddress === "true";
  const sharedAddress = metadata.sharedAddress ? JSON.parse(metadata.sharedAddress) : null;

  // Use Stripe's collected shipping address if available
  const collectedShipping = session.collected_information?.shipping_details;
  const stripeShipping = collectedShipping?.address;
  const finalSharedAddress = stripeShipping
    ? {
        firstName: collectedShipping?.name?.split(" ")[0] || "",
        lastName: collectedShipping?.name?.split(" ").slice(1).join(" ") || "",
        address: [stripeShipping.line1, stripeShipping.line2].filter(Boolean).join(", "),
        city: stripeShipping.city || "",
        state: stripeShipping.state || "",
        zip: stripeShipping.postal_code || "",
        country: stripeShipping.country || "US",
      }
    : sharedAddress;

  try {
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        buyerEmail: metadata.buyerEmail || session.customer_email || "",
        status: "PAID",
        subtotal: parseFloat(metadata.subtotal || "0"),
        discountPercent: parseFloat(metadata.discountPercent || "0") * 100,
        discountAmount: parseFloat(metadata.discountAmount || "0"),
        total: parseFloat(metadata.total || "0"),
        stripePaymentId: session.payment_intent as string,
        stripeSessionId: session.id,
        shipToOneAddress,
        sharedAddress: finalSharedAddress,
        isGift: metadata.isGift === "true",
        giftMessage: metadata.giftMessage || null,
        items: {
          create: peopleData.map((person) => ({
            unitPrice,
            recipientName: person.name || "Unknown",
            plaqueText: person.plaque || null,
            photoUrl: person.photo || "",
            photoName: person.photoName || null,
            shippingAddress: shipToOneAddress
              ? Prisma.JsonNull
              : (person.address ?? Prisma.JsonNull),
          })),
        },
        statusHistory: {
          create: {
            status: "PAID",
            note: `Payment confirmed via Stripe. Session: ${session.id}`,
          },
        },
      },
    });

    console.log(`Order created: ${order.orderNumber} (${order.id})`);

    // Send confirmation email
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";
    const subtotal = parseFloat(metadata.subtotal || "0");
    const discountPct = parseFloat(metadata.discountPercent || "0") * 100;
    const discountAmt = parseFloat(metadata.discountAmount || "0");
    const total = parseFloat(metadata.total || "0");

    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Make & Send <orders@makeandsend.com>",
        to: order.buyerEmail,
        subject: `Order confirmed! #${order.orderNumber}`,
        react: OrderConfirmationEmail({
          orderNumber: order.orderNumber,
          buyerEmail: order.buyerEmail,
          items: peopleData.map((p) => ({
            recipientName: p.name || "Unknown",
            plaqueText: p.plaque || null,
            unitPrice,
          })),
          subtotal,
          discountPercent: discountPct,
          discountAmount: discountAmt,
          total,
          isGift: metadata.isGift === "true",
          giftMessage: metadata.giftMessage || null,
          siteUrl,
        }),
      });
      console.log(`Confirmation email sent to ${order.buyerEmail}`);
    } catch (emailError) {
      // Don't fail the webhook if email fails
      console.error("Failed to send confirmation email:", emailError);
    }
  } catch (error) {
    console.error("Failed to create order from webhook:", error);
    throw error; // Stripe will retry
  }
}
