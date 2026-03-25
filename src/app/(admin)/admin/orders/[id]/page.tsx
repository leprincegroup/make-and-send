import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderDetail } from "@/server/queries/admin";
import {
  updateOrderStatusAction,
  uploadProofAction,
  addTrackingAction,
} from "@/server/actions/admin";
import { formatCurrency } from "@/lib/utils";
import { ORDER_STATUSES } from "@/lib/constants";
import type { OrderStatus } from "@prisma/client";
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  CreditCard,
  Clock,
  Image,
  Truck,
  MessageSquare,
  Gift,
} from "lucide-react";

// The order of status progression for the "advance" button
const STATUS_FLOW: OrderStatus[] = [
  "DRAFT",
  "PENDING_PAYMENT",
  "PAID",
  "IN_PRODUCTION",
  "PROOF_READY",
  "PROOF_APPROVED",
  "SHIPPING",
  "DELIVERED",
];

const ALL_STATUSES = Object.keys(ORDER_STATUSES) as OrderStatus[];

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderDetail(id);

  if (!order) {
    notFound();
  }

  const statusInfo =
    ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
  const currentIndex = STATUS_FLOW.indexOf(order.status as OrderStatus);
  const nextStatus =
    currentIndex >= 0 && currentIndex < STATUS_FLOW.length - 1
      ? STATUS_FLOW[currentIndex + 1]
      : null;
  const address = order.sharedAddress as Record<string, string> | null;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/orders"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-navy/60 transition-colors hover:text-navy"
        >
          <ArrowLeft className="size-3.5" />
          Back to orders
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-navy">
              {order.orderNumber}
            </h1>
            <p className="mt-1 text-sm text-navy/60">
              Placed{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
          <StatusBadge
            label={statusInfo?.label ?? order.status}
            color={statusInfo?.color ?? "gray"}
            large
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: order details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Customer info */}
          <Card title="Customer" icon={User}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Name</Label>
                <Value>
                  {order.buyerFirstName} {order.buyerLastName}
                </Value>
              </div>
              <div>
                <Label>Email</Label>
                <Value>{order.buyerEmail}</Value>
              </div>
              {order.isGift && (
                <div className="sm:col-span-2">
                  <div className="flex items-center gap-2 rounded-lg bg-gold/10 px-3 py-2">
                    <Gift className="size-4 text-gold-dark" />
                    <span className="text-sm font-medium text-gold-dark">
                      Gift order
                    </span>
                    {order.giftMessage && (
                      <span className="text-sm text-navy/60">
                        &mdash; &ldquo;{order.giftMessage}&rdquo;
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Items */}
          <Card title={`Items (${order.items.length})`} icon={Package}>
            <div className="divide-y divide-navy/[0.06]">
              {order.items.map((item) => {
                const itemAddress = item.shippingAddress as Record<
                  string,
                  string
                > | null;
                return (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-navy">
                          {item.recipientName}
                        </p>
                        {item.plaqueText && (
                          <p className="mt-0.5 text-sm text-navy/50 italic">
                            &ldquo;{item.plaqueText}&rdquo;
                          </p>
                        )}
                        {item.proofStatus && (
                          <span className="mt-1 inline-block text-xs font-medium text-navy/50">
                            Proof:{" "}
                            {item.proofStatus === "APPROVED"
                              ? "Approved"
                              : item.proofStatus === "REVISION_REQUESTED"
                                ? "Revision Requested"
                                : "Pending"}
                          </span>
                        )}
                        {item.trackingNumber && (
                          <p className="mt-1 text-xs text-navy/50">
                            Tracking: {item.trackingNumber}
                          </p>
                        )}
                      </div>
                      <p className="font-medium text-navy">
                        {formatCurrency(Number(item.unitPrice))}
                      </p>
                    </div>
                    {itemAddress && (
                      <p className="mt-2 text-xs text-navy/40">
                        Ship to: {itemAddress.line1}, {itemAddress.city},{" "}
                        {itemAddress.state} {itemAddress.zip}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Shipping */}
          <Card title="Shipping" icon={MapPin}>
            {address ? (
              <div>
                <p className="text-sm text-navy">
                  {address.line1}
                  {address.line2 && `, ${address.line2}`}
                </p>
                <p className="text-sm text-navy/70">
                  {address.city}, {address.state} {address.zip}
                </p>
                <p className="text-sm text-navy/50">{address.country}</p>
              </div>
            ) : (
              <p className="text-sm text-navy/50">
                Individual shipping addresses per item
              </p>
            )}
          </Card>

          {/* Payment */}
          <Card title="Payment" icon={CreditCard}>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <Label>Subtotal</Label>
                <Value>{formatCurrency(Number(order.subtotal))}</Value>
              </div>
              {Number(order.discountAmount) > 0 && (
                <div>
                  <Label>
                    Discount ({Number(order.discountPercent)}%)
                  </Label>
                  <Value className="text-emerald-600">
                    -{formatCurrency(Number(order.discountAmount))}
                  </Value>
                </div>
              )}
              <div>
                <Label>Total</Label>
                <Value className="text-lg font-bold">
                  {formatCurrency(Number(order.total))}
                </Value>
              </div>
            </div>
            {order.stripePaymentId && (
              <p className="mt-3 text-xs text-navy/40">
                Stripe: {order.stripePaymentId}
              </p>
            )}
          </Card>

          {/* Proof management */}
          <Card title="Proof Management" icon={Image}>
            {order.proofs && order.proofs.length > 0 ? (
              <div className="space-y-4">
                {order.proofs.map((proof) => (
                  <div
                    key={proof.id}
                    className="rounded-lg border border-navy/[0.06] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-navy">
                        Proof v{proof.version}
                      </p>
                      <ProofStatusBadge status={proof.status} />
                    </div>
                    {proof.revisionNotes && (
                      <div className="mt-3 rounded-lg bg-orange-50 p-3">
                        <p className="text-xs font-semibold text-orange-700">
                          Revision Notes:
                        </p>
                        <p className="mt-1 text-sm text-orange-700/80">
                          {proof.revisionNotes}
                        </p>
                      </div>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {proof.imageUrls.map((url, i) => (
                        <div
                          key={i}
                          className="size-16 rounded-lg border border-navy/[0.06] bg-cream/50"
                          title={url}
                        >
                          <div className="flex size-full items-center justify-center text-xs text-navy/30">
                            IMG
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-navy/50">No proofs uploaded yet</p>
            )}

            {/* Upload proof form */}
            <form action={uploadProofAction} className="mt-4 space-y-3">

              <input type="hidden" name="orderId" value={order.id} />
              <div>
                <label
                  htmlFor="imageUrls"
                  className="mb-1 block text-xs font-semibold text-navy/60"
                >
                  Proof Image URLs (comma-separated)
                </label>
                <input
                  id="imageUrls"
                  name="imageUrls"
                  type="text"
                  placeholder="https://example.com/proof1.jpg, https://example.com/proof2.jpg"
                  className="w-full rounded-lg border border-navy/[0.08] bg-cream/40 px-3 py-2 text-sm text-navy placeholder:text-navy/30 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-cream transition-colors hover:bg-navy-light"
              >
                Upload Proof
              </button>
            </form>
          </Card>
        </div>

        {/* Right column: actions & timeline */}
        <div className="space-y-6">
          {/* Status update */}
          <Card title="Update Status" icon={Clock}>
            {/* Quick advance button */}
            {nextStatus && (
              <form action={updateOrderStatusAction} className="mb-4">
  
                <input type="hidden" name="orderId" value={order.id} />
                <input type="hidden" name="status" value={nextStatus} />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-dark"
                >
                  Advance to{" "}
                  {ORDER_STATUSES[nextStatus]?.label ?? nextStatus}
                </button>
              </form>
            )}

            {/* Manual status change */}
            <form action={updateOrderStatusAction} className="space-y-3">

              <input type="hidden" name="orderId" value={order.id} />
              <div>
                <label
                  htmlFor="status"
                  className="mb-1 block text-xs font-semibold text-navy/60"
                >
                  Set Status
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={order.status}
                  className="w-full rounded-lg border border-navy/[0.08] bg-cream/40 px-3 py-2 text-sm text-navy outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                >
                  {ALL_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {ORDER_STATUSES[s].label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="note"
                  className="mb-1 block text-xs font-semibold text-navy/60"
                >
                  Note (optional)
                </label>
                <textarea
                  id="note"
                  name="note"
                  rows={2}
                  placeholder="Internal note..."
                  className="w-full rounded-lg border border-navy/[0.08] bg-cream/40 px-3 py-2 text-sm text-navy placeholder:text-navy/30 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg border border-navy/[0.08] bg-white px-4 py-2 text-xs font-semibold text-navy transition-colors hover:bg-cream/50"
              >
                Update Status
              </button>
            </form>
          </Card>

          {/* Add tracking */}
          <Card title="Tracking" icon={Truck}>
            <form action={addTrackingAction} className="space-y-3">

              <input type="hidden" name="orderId" value={order.id} />
              <div>
                <label
                  htmlFor="trackingNumber"
                  className="mb-1 block text-xs font-semibold text-navy/60"
                >
                  Tracking Number
                </label>
                <input
                  id="trackingNumber"
                  name="trackingNumber"
                  type="text"
                  placeholder="1Z999AA10123456789"
                  className="w-full rounded-lg border border-navy/[0.08] bg-cream/40 px-3 py-2 text-sm text-navy placeholder:text-navy/30 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg border border-navy/[0.08] bg-white px-4 py-2 text-xs font-semibold text-navy transition-colors hover:bg-cream/50"
              >
                Add Tracking
              </button>
            </form>
          </Card>

          {/* Status timeline */}
          <Card title="Status History" icon={MessageSquare}>
            {order.statusHistory && order.statusHistory.length > 0 ? (
              <ol className="relative ml-3 border-l border-navy/10">
                {order.statusHistory.map((event, i) => {
                  const evStatus =
                    ORDER_STATUSES[
                      event.status as keyof typeof ORDER_STATUSES
                    ];
                  return (
                    <li key={event.id} className="mb-6 ml-6 last:mb-0">
                      <span
                        className={`absolute -left-2 flex size-4 items-center justify-center rounded-full ring-4 ring-white ${
                          i === 0 ? "bg-gold" : "bg-navy/20"
                        }`}
                      />
                      <p className="text-sm font-medium text-navy">
                        {evStatus?.label ?? event.status}
                      </p>
                      {event.note && (
                        <p className="mt-0.5 text-xs text-navy/50">
                          {event.note}
                        </p>
                      )}
                      <time className="mt-0.5 block text-xs text-navy/40">
                        {new Date(event.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </time>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <p className="text-sm text-navy/50">No status history</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared components
// ---------------------------------------------------------------------------

function Card({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-navy/[0.08] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="size-4 text-navy/40" />
        <h2 className="text-sm font-bold text-navy">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium text-navy/50">{children}</p>
  );
}

function Value({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`text-sm text-navy ${className}`}>{children}</p>;
}

function StatusBadge({
  label,
  color,
  large,
}: {
  label: string;
  color: string;
  large?: boolean;
}) {
  const colorMap: Record<string, string> = {
    gray: "bg-navy/5 text-navy/60",
    yellow: "bg-amber-50 text-amber-700",
    blue: "bg-blue-50 text-blue-700",
    indigo: "bg-indigo-50 text-indigo-700",
    purple: "bg-purple-50 text-purple-700",
    green: "bg-emerald-50 text-emerald-700",
    orange: "bg-orange-50 text-orange-700",
    cyan: "bg-cyan-50 text-cyan-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${colorMap[color] ?? colorMap.gray} ${
        large ? "px-3.5 py-1 text-sm" : "px-2.5 py-0.5 text-xs"
      }`}
    >
      {label}
    </span>
  );
}

function ProofStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    PENDING: {
      label: "Pending",
      className: "bg-amber-50 text-amber-700",
    },
    APPROVED: {
      label: "Approved",
      className: "bg-emerald-50 text-emerald-700",
    },
    REVISION_REQUESTED: {
      label: "Revision Requested",
      className: "bg-orange-50 text-orange-700",
    },
  };

  const info = map[status] ?? { label: status, className: "bg-navy/5 text-navy/60" };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${info.className}`}
    >
      {info.label}
    </span>
  );
}
