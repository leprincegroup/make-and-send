import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Circle,
  MapPin,
  Image as ImageIcon,
  User,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import { ORDER_STATUSES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import {
  Confetti,
  MiniSparkle,
  DoodleSmile,
} from "@/components/shared/illustrations";
import { getOrderById } from "@/server/queries/orders";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type OrderStatusKey = keyof typeof ORDER_STATUSES;

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------
const TIMELINE_STEPS: { key: OrderStatusKey; label: string }[] = [
  { key: "DRAFT", label: "Draft" },
  { key: "PAID", label: "Paid" },
  { key: "IN_PRODUCTION", label: "In Production" },
  { key: "PROOF_READY", label: "Proof Ready" },
  { key: "PROOF_APPROVED", label: "Approved" },
  { key: "SHIPPING", label: "Shipping" },
  { key: "DELIVERED", label: "Delivered" },
];

function getStepIndex(status: OrderStatusKey): number {
  const mapped = status === "PROOF_REVISION" ? "PROOF_READY" : status;
  const idx = TIMELINE_STEPS.findIndex((s) => s.key === mapped);
  return idx === -1 ? 0 : idx;
}

function OrderTimeline({ status }: { status: OrderStatusKey }) {
  const currentIdx = getStepIndex(status);
  const isRevision = status === "PROOF_REVISION";

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-5 text-sm font-semibold text-navy">Order Progress</h2>

      <ol className="relative space-y-0" aria-label="Order status timeline">
        {TIMELINE_STEPS.map((step, idx) => {
          const isComplete = idx < currentIdx;
          const isCurrent = idx === currentIdx;

          return (
            <li key={step.key} className="relative flex gap-3 pb-6 last:pb-0">
              {idx < TIMELINE_STEPS.length - 1 && (
                <div
                  className={`absolute left-[11px] top-6 h-full w-0.5 ${
                    isComplete ? "bg-mint" : "bg-navy/10"
                  }`}
                  aria-hidden="true"
                />
              )}

              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center">
                {isComplete ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-mint text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </div>
                ) : isCurrent ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gold bg-gold/20">
                    <Circle className="h-2.5 w-2.5 fill-gold text-gold" />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-navy/15 bg-cream/60">
                    <Circle className="h-2 w-2 fill-navy/15 text-navy/15" />
                  </div>
                )}
              </div>

              <div className="pt-0.5">
                <span
                  className={`text-sm font-medium ${
                    isComplete
                      ? "text-navy/70"
                      : isCurrent
                        ? "text-navy"
                        : "text-navy/40"
                  }`}
                >
                  {step.label}
                </span>
                {isCurrent && isRevision && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                    Revision requested
                  </span>
                )}
                {isCurrent && !isRevision && (
                  <span className="ml-2 text-xs text-navy/40">Current</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------
const STATUS_BADGE_STYLES: Record<string, string> = {
  gray: "bg-navy/10 text-navy/70",
  yellow: "bg-amber-100 text-amber-800",
  blue: "bg-blue-100 text-blue-800",
  indigo: "bg-indigo-100 text-indigo-800",
  purple: "bg-purple-100 text-purple-800",
  green: "bg-emerald-100 text-emerald-800",
  orange: "bg-orange-100 text-orange-800",
  cyan: "bg-cyan-100 text-cyan-800",
  red: "bg-red-100 text-red-800",
};

function StatusBadge({ status }: { status: string }) {
  const config = ORDER_STATUSES[status as OrderStatusKey];
  if (!config) return null;
  const colorClasses = STATUS_BADGE_STYLES[config.color] ?? STATUS_BADGE_STYLES.gray;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClasses}`}
    >
      {config.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// People / Items card
// ---------------------------------------------------------------------------
function PersonCard({ name, photoUrl, plaqueText }: { name: string; photoUrl: string | null; plaqueText: string | null }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-navy/5 bg-cream/30 px-4 py-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-navy/40">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt={name}
            className="h-12 w-12 rounded-xl object-cover"
          />
        ) : (
          <User className="h-5 w-5" />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-navy">{name}</p>
        {plaqueText && (
          <p className="truncate font-accent text-sm italic text-navy/50">
            &ldquo;{plaqueText}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Proof Section
// ---------------------------------------------------------------------------
function ProofSection({ proofImages }: { proofImages: string[] }) {
  const hasProofs = proofImages.length > 0;

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-sm font-semibold text-navy">Proof Review</h2>

      {hasProofs ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {proofImages.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`Proof ${i + 1}`}
              className="rounded-2xl border border-navy/5 object-cover"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy/10 bg-cream/30 py-10 text-center">
          <ImageIcon className="mb-2 h-8 w-8 text-navy/20" />
          <p className="text-sm text-navy/40">
            Proof images will appear here once ready
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          disabled
          className="inline-flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-sm font-medium text-white opacity-60 transition-colors"
          aria-label="Approve proof (not available yet)"
        >
          <ThumbsUp className="h-4 w-4" />
          Approve Proof
        </button>
        <button
          type="button"
          disabled
          className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-5 py-2.5 text-sm font-medium text-navy opacity-60 transition-colors"
          aria-label="Request revision (not available yet)"
        >
          <MessageSquare className="h-4 w-4" />
          Request Revision
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function OrderDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ email?: string }>;
}) {
  const { id } = await params;
  const { email } = await searchParams;

  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  // Basic access check: the email in the query must match the order's buyer email
  if (email && order.buyerEmail !== email) {
    notFound();
  }

  const backHref = email
    ? `/dashboard/orders?email=${encodeURIComponent(email)}`
    : "/dashboard/orders";

  const formattedDate = order.createdAt.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const sharedAddress = order.sharedAddress as Record<string, string> | null;
  const latestProof = order.proofs[0];
  const proofImages = latestProof?.imageUrls ?? [];

  return (
    <div>
      {/* Back link */}
      <Link
        href={backHref}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-navy/60 transition-colors hover:text-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        All orders
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-navy">{order.orderNumber}</h1>
          <StatusBadge status={order.status} />
          {order.status === "DELIVERED" && (
            <Confetti className="h-8 w-8" />
          )}
        </div>
        <p className="mt-1 text-sm text-navy/50">
          Placed {formattedDate} &middot; {order.items.length}{" "}
          {order.items.length === 1 ? "item" : "items"} &middot;{" "}
          {formatCurrency(Number(order.total))}
        </p>
      </div>

      {/* Two-column grid on larger screens */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left column: Timeline */}
        <div className="lg:col-span-2">
          <OrderTimeline status={order.status as OrderStatusKey} />
        </div>

        {/* Right column: Details */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {/* People / Items */}
          <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <h2 className="text-sm font-semibold text-navy">
                People in this order
              </h2>
              <MiniSparkle className="h-3.5 w-3.5 text-gold" />
            </div>
            <div className="flex flex-col gap-3">
              {order.items.map((item: { id: string; recipientName: string; photoUrl: string | null; plaqueText: string | null }) => (
                <PersonCard
                  key={item.id}
                  name={item.recipientName}
                  photoUrl={item.photoUrl}
                  plaqueText={item.plaqueText}
                />
              ))}
            </div>
          </div>

          {/* Proof Review */}
          <ProofSection proofImages={proofImages} />

          {/* Shipping Address */}
          {sharedAddress && (
            <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-coral" />
                <h2 className="text-sm font-semibold text-navy">
                  Shipping Address
                </h2>
              </div>
              <address className="not-italic text-sm leading-relaxed text-navy/70">
                {sharedAddress.firstName} {sharedAddress.lastName}
                <br />
                {sharedAddress.address}
                <br />
                {sharedAddress.city}, {sharedAddress.state}{" "}
                {sharedAddress.zip}
              </address>
            </div>
          )}

          {/* Gift message */}
          {order.isGift && order.giftMessage && (
            <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-3 text-sm font-semibold text-navy">Gift Message</h2>
              <p className="rounded-2xl bg-cream/50 p-4 font-accent text-sm italic text-navy/70">
                &ldquo;{order.giftMessage}&rdquo;
              </p>
            </div>
          )}

          {/* Decorative footer */}
          <div className="flex items-center justify-center gap-2 py-4 text-navy/30">
            <DoodleSmile className="h-6 w-6" />
            <span className="font-accent text-sm italic">
              Made with love, shipped with care
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
