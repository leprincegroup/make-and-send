"use server";

import { revalidatePath } from "next/cache";
import {
  updateOrderStatus,
  uploadProof,
} from "@/server/queries/admin";
import type { OrderStatus } from "@prisma/client";

// ---------------------------------------------------------------------------
// Shared auth check (Supabase session-based)
// ---------------------------------------------------------------------------

async function assertAdmin() {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // For now, any authenticated user is treated as admin.
  // Add role checks here later (e.g. user_metadata.role === "admin").
}

// ---------------------------------------------------------------------------
// Update order status
// ---------------------------------------------------------------------------

export async function updateOrderStatusAction(formData: FormData): Promise<void> {
  await assertAdmin();

  const orderId = formData.get("orderId") as string;
  const status = formData.get("status") as OrderStatus;
  const note = (formData.get("note") as string) || undefined;

  if (!orderId || !status) {
    throw new Error("Missing required fields");
  }

  const result = await updateOrderStatus(orderId, status, note);
  if (!result.success) {
    throw new Error("error" in result ? result.error : "Failed to update status");
  }

  revalidatePath("/admin", "layout");
}

// ---------------------------------------------------------------------------
// Upload proof
// ---------------------------------------------------------------------------

export async function uploadProofAction(formData: FormData): Promise<void> {
  await assertAdmin();

  const orderId = formData.get("orderId") as string;
  const imageUrlsRaw = formData.get("imageUrls") as string;

  if (!orderId || !imageUrlsRaw) {
    throw new Error("Missing required fields");
  }

  // For now, accept comma-separated URLs. In production this would handle
  // actual file uploads to Supabase Storage first.
  const imageUrls = imageUrlsRaw
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);

  if (imageUrls.length === 0) {
    throw new Error("No image URLs provided");
  }

  const result = await uploadProof(orderId, imageUrls);
  if (!result.success) {
    throw new Error("error" in result ? result.error : "Failed to upload proof");
  }

  revalidatePath("/admin", "layout");
}

// ---------------------------------------------------------------------------
// Add tracking number
// ---------------------------------------------------------------------------

export async function addTrackingAction(formData: FormData): Promise<void> {
  await assertAdmin();

  const orderId = formData.get("orderId") as string;
  const itemId = formData.get("itemId") as string;
  const trackingNumber = formData.get("trackingNumber") as string;

  if (!orderId || !trackingNumber) {
    throw new Error("Missing required fields");
  }

  if (!process.env.DATABASE_URL) {
    // Mock mode
    revalidatePath("/admin", "layout");
    return;
  }

  const { prisma } = await import("@/lib/prisma");

  if (itemId) {
    await prisma.orderItem.update({
      where: { id: itemId },
      data: { trackingNumber },
    });
  } else {
    await prisma.orderItem.updateMany({
      where: { orderId },
      data: { trackingNumber },
    });
  }

  // Also update order status to SHIPPING if not already
  await updateOrderStatus(
    orderId,
    "SHIPPING",
    `Tracking number added: ${trackingNumber}`
  );

  revalidatePath("/admin", "layout");
}
