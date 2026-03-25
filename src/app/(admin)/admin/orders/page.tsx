import Link from "next/link";
import { getAllOrders } from "@/server/queries/admin";
import { formatCurrency } from "@/lib/utils";
import { ORDER_STATUSES } from "@/lib/constants";
import type { OrderStatus } from "@prisma/client";

const ALL_STATUSES = Object.keys(ORDER_STATUSES) as OrderStatus[];

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { status: statusFilter, page: pageParam } = await searchParams;

  const status = ALL_STATUSES.includes(statusFilter as OrderStatus)
    ? (statusFilter as OrderStatus)
    : undefined;
  const page = pageParam ? Math.max(1, parseInt(pageParam as string, 10)) : 1;

  const { orders, total, pageSize } = await getAllOrders(status, page);
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Orders</h1>
          <p className="mt-1 text-sm text-navy/60">
            {total} order{total !== 1 ? "s" : ""} total
          </p>
        </div>
      </div>

      {/* Status filter */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Link
          href="/admin/orders"
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            !status
              ? "bg-navy text-cream"
              : "bg-navy/5 text-navy/60 hover:bg-navy/10"
          }`}
        >
          All
        </Link>
        {ALL_STATUSES.map((s) => {
          const info = ORDER_STATUSES[s];
          const isActive = status === s;
          return (
            <Link
              key={s}
              href={`/admin/orders?status=${s}`}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                isActive
                  ? "bg-navy text-cream"
                  : "bg-navy/5 text-navy/60 hover:bg-navy/10"
              }`}
            >
              {info.label}
            </Link>
          );
        })}
      </div>

      {/* Orders table */}
      <div className="overflow-hidden rounded-xl border border-navy/[0.08] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy/[0.06] bg-cream/40">
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-navy/70">
                  Order #
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-navy/70">
                  Customer
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-navy/70">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-navy/70 text-center">
                  Items
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-navy/70 text-right">
                  Total
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-navy/70">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/[0.04]">
              {orders.map((order) => {
                const statusInfo =
                  ORDER_STATUSES[
                    order.status as keyof typeof ORDER_STATUSES
                  ];
                return (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-cream/30"
                  >
                    <td className="whitespace-nowrap px-4 py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-medium text-navy hover:text-gold-dark"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-navy">
                        {order.buyerFirstName} {order.buyerLastName}
                      </div>
                      <div className="text-xs text-navy/50">
                        {order.buyerEmail}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <StatusBadge
                        label={statusInfo?.label ?? order.status}
                        color={statusInfo?.color ?? "gray"}
                      />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-center text-navy/70">
                      {order.items.length}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-navy">
                      {formatCurrency(Number(order.total))}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-navy/50">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-navy/40"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-navy/[0.06] px-4 py-3">
            <p className="text-xs text-navy/50">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`/admin/orders?${status ? `status=${status}&` : ""}page=${page - 1}`}
                  className="rounded-lg border border-navy/[0.08] px-3 py-1.5 text-xs font-medium text-navy/70 transition-colors hover:bg-cream/50"
                >
                  Previous
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`/admin/orders?${status ? `status=${status}&` : ""}page=${page + 1}`}
                  className="rounded-lg border border-navy/[0.08] px-3 py-1.5 text-xs font-medium text-navy/70 transition-colors hover:bg-cream/50"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
