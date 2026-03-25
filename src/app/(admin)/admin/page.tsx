import Link from "next/link";
import { getAdminStats, getRecentOrders } from "@/server/queries/admin";
import { formatCurrency } from "@/lib/utils";
import { ORDER_STATUSES } from "@/lib/constants";
import {
  ShoppingCart,
  DollarSign,
  Image,
  Hammer,
  ArrowRight,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [stats, recentOrders] = await Promise.all([
    getAdminStats(),
    getRecentOrders(10),
  ]);

  const statCards = [
    {
      label: "Total Orders",
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      color: "bg-navy/10 text-navy",
    },
    {
      label: "Revenue",
      value: formatCurrency(stats.revenue),
      icon: DollarSign,
      color: "bg-gold/10 text-gold-dark",
    },
    {
      label: "Pending Proofs",
      value: stats.pendingProofs.toString(),
      icon: Image,
      color: "bg-coral/10 text-coral",
    },
    {
      label: "In Production",
      value: stats.inProduction.toString(),
      icon: Hammer,
      color: "bg-mint/10 text-mint",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
        <p className="mt-1 text-sm text-navy/60">
          Overview of your Make &amp; Send operations
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-navy/[0.08] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-navy/60">{card.label}</p>
              <div
                className={`flex size-9 items-center justify-center rounded-lg ${card.color}`}
              >
                <card.icon className="size-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-navy">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1 text-sm font-medium text-gold-dark transition-colors hover:text-gold"
          >
            View all
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-navy/[0.08] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy/[0.06] bg-cream/40">
                <th className="px-4 py-3 font-semibold text-navy/70">
                  Order #
                </th>
                <th className="px-4 py-3 font-semibold text-navy/70">
                  Customer
                </th>
                <th className="px-4 py-3 font-semibold text-navy/70">
                  Status
                </th>
                <th className="px-4 py-3 font-semibold text-navy/70 text-right">
                  Total
                </th>
                <th className="px-4 py-3 font-semibold text-navy/70">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/[0.04]">
              {recentOrders.map((order) => {
                const statusInfo =
                  ORDER_STATUSES[
                    order.status as keyof typeof ORDER_STATUSES
                  ];
                return (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-cream/30"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-medium text-navy hover:text-gold-dark"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-navy/70">
                      {order.buyerFirstName} {order.buyerLastName}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        label={statusInfo?.label ?? order.status}
                        color={statusInfo?.color ?? "gray"}
                      />
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-navy">
                      {formatCurrency(Number(order.total))}
                    </td>
                    <td className="px-4 py-3 text-navy/50">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
              {recentOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-navy/40"
                  >
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Status badge component (reused across admin pages)
// ---------------------------------------------------------------------------

function StatusBadge({ label, color }: { label: string; color: string }) {
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
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorMap[color] ?? colorMap.gray}`}
    >
      {label}
    </span>
  );
}
