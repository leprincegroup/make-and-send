import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { PRODUCT, BULK_DISCOUNTS } from "@/lib/constants";

interface PersonItem {
  recipientName: string;
  plaqueText: string;
  photoUrl: string;
  photoName: string;
  shippingAddress?: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

interface CheckoutBody {
  people: PersonItem[];
  isGift: boolean;
  giftMessage: string;
  shipToOneAddress: boolean;
  sharedAddress?: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  buyerEmail: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutBody = await request.json();
    const { people, isGift, giftMessage, shipToOneAddress, sharedAddress, buyerEmail } = body;

    // Validate
    if (!people || people.length === 0) {
      return NextResponse.json({ error: "No people in order" }, { status: 400 });
    }
    if (!buyerEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const quantity = people.length;
    const unitPrice = PRODUCT.price;
    const subtotal = unitPrice * quantity;

    // Calculate bulk discount
    const applicableDiscount = [...BULK_DISCOUNTS]
      .reverse()
      .find((d) => quantity >= d.minQuantity);
    const discountPercent = applicableDiscount ? applicableDiscount.discount : 0;
    const discountAmount = Math.round(subtotal * discountPercent);
    const total = subtotal - discountAmount;

    // Build Stripe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: PRODUCT.name,
            description: `${PRODUCT.material} · ${PRODUCT.description}`,
          },
          unit_amount: unitPrice * 100, // cents
        },
        quantity,
      },
    ];

    // Add discount as a separate negative line item if applicable
    if (discountAmount > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `Bulk Discount (${(discountPercent * 100).toFixed(0)}% off)`,
          },
          unit_amount: -discountAmount * 100, // negative cents — but Stripe doesn't allow negative
        },
        quantity: 1,
      });
    }

    // For discounts, use Stripe coupons instead of negative line items
    const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
    if (discountAmount > 0) {
      // Create a one-time coupon
      const coupon = await stripe.coupons.create({
        amount_off: discountAmount * 100,
        currency: "usd",
        duration: "once",
        name: `Bulk ${(discountPercent * 100).toFixed(0)}% off (${quantity} bobbleheads)`,
      });
      discounts.push({ coupon: coupon.id });
      // Remove the negative line item we added above
      lineItems.pop();
    }

    // Build metadata with order details
    const metadata: Record<string, string> = {
      product: PRODUCT.name,
      quantity: String(quantity),
      subtotal: String(subtotal),
      discountPercent: String(discountPercent),
      discountAmount: String(discountAmount),
      total: String(total),
      isGift: String(isGift),
      giftMessage: giftMessage || "",
      shipToOneAddress: String(shipToOneAddress),
      buyerEmail,
      // Store people data as JSON (Stripe metadata values max 500 chars each)
      peopleCount: String(people.length),
    };

    // Store people data — Stripe metadata has 500 char limit per value
    // For large orders, we'll store a reference and fetch from our DB
    const peopleData = people.map((p) => ({
      name: p.recipientName,
      plaque: p.plaqueText,
      photo: p.photoUrl,
      photoName: p.photoName,
      ...(p.shippingAddress && !shipToOneAddress ? { address: p.shippingAddress } : {}),
    }));

    // Split people data across multiple metadata keys if needed
    const peopleJson = JSON.stringify(peopleData);
    if (peopleJson.length <= 500) {
      metadata.people = peopleJson;
    } else {
      // Chunk into 500-char segments
      for (let i = 0; i < peopleJson.length; i += 500) {
        metadata[`people_${Math.floor(i / 500)}`] = peopleJson.slice(i, i + 500);
      }
      metadata.peopleChunks = String(Math.ceil(peopleJson.length / 500));
    }

    if (shipToOneAddress && sharedAddress) {
      metadata.sharedAddress = JSON.stringify(sharedAddress);
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: buyerEmail,
      line_items: lineItems,
      discounts,
      shipping_address_collection: shipToOneAddress
        ? { allowed_countries: ["US", "CA", "GB", "AU"] }
        : undefined,
      metadata,
      success_url: `${siteUrl}/order/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/create/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    const message = error instanceof Error ? error.message : "Failed to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
