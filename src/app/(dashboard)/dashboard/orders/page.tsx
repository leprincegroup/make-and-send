import Link from "next/link";
import { Package, ChevronRight, ShoppingBag, Search } from "lucide-react";
import { ORDER_STATUSES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { DoodleSmile, DoodleGift, MiniSparkle } from "@/components/shared/illustrations";
import { getOrdersByEmail } from "@/server/queries/orders";
import { redirect } from "next/navigation";

// ---------------------------------------------------------------------------
// Status badge color mapping
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

type OrderStatusKey = keyof typeof ORDER_STATUSES;

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
// Empty State
// ---------------------------------------------------------------------------
function EmptyState({ hasEmail }: { hasEmail: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gold/30 bg-white px-6 py-16 text-center shadow-sm">
      <DoodleGift className="mb-4 h-16 w-16 text-gold" />
      <h2 className="text-lg font-semibold text-navy">
        {hasEmail ? "No orders found" : "Track your orders"}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-navy/60">
        {hasEmail
          ? "We couldn't find any orders with this email. Try a different one, or create your first bobblehead!"
          : "Enter the email you used at checkout to view your orders."}
      </p>
      {hasEmail && (
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-navy-light"
        >
          <ShoppingBag className="h-4 w-4" />
          Start creating
        </Link>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Email Lookup Form
// ---------------------------------------------------------------------------
function EmailLookupForm({ currentEmail }: { currentEmail?: string }) {
  async function lookupOrders(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    if (email) {
      redirect(`/dashboard/orders?email=${encodeURIComponent(email.trim())}`);
    }
  }

  return (
    <form action={lookupOrders} className="mb-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30" />
          <input
            type="email"
            name="email"
            placeholder="Enter your email to find orders..."
            defaultValue={currentEmail}
            required
            className="w-full rounded-full border border-navy/15 bg-white py-2.5 pl-10 pr-4 text-sm text-navy placeholder:text-navy/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-navy-light"
        >
          Look up
        </button>
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Order Card
// ---------------------------------------------------------------------------
interface OrderCardProps {
  id: string;
  orderNumber: string;
  createdAt: Date;
  status: string;
  itemCount: number;
  total: number;
  email: string;
}

function OrderCard({ id, orderNumber, createdAt, status, itemCount, total, email }: OrderCardProps) {
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/dashboard/orders/${id}?email=${encodeURIComponent(email)}`}
      className="group flex items-center justify-between rounded-3xl bg-white px-5 py-4 shadow-sm transition-all hover:shadow-md hover:ring-1 hover:ring-gold/30 sm:px-6"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cream text-navy/60">
          <Package className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-navy">
              {orderNumber}
            </span>
            <StatusBadge status={status} />
          </div>
          <p className="mt-0.5 text-xs text-navy/50">
            {formattedDate} &middot; {itemCount}{" "}
            {itemCount === 1 ? "item" : "items"} &middot;{" "}
            {formatCurrency(total)}
          </p>
        </div>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-navy/30 transition-transform group-hover:translate-x-0.5 group-hover:text-navy/60" />
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  const orders = email ? await getOrdersByEmail(email) : [];

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-navy">Your Orders</h1>
            <MiniSparkle className="h-5 w-5 text-gold" />
          </div>
          <p className="mt-1 text-sm text-navy/60">
            Track every bobblehead from photo to doorstep.
          </p>
        </div>
        <DoodleSmile className="hidden h-10 w-10 text-gold/60 sm:block" />
      </div>

      {/* Email lookup */}
      <EmailLookupForm currentEmail={email} />

      {/* Order list or empty state */}
      {orders.length === 0 ? (
        <EmptyState hasEmail={!!email} />
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              orderNumber={order.orderNumber}
              createdAt={order.createdAt}
              status={order.status}
              itemCount={order.items.length}
              total={Number(order.total)}
              email={email!}
            />
          ))}
        </div>
      )}
    </div>
  );
}
