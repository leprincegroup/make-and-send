import Link from "next/link";
import { getProofQueue } from "@/server/queries/admin";
import { uploadProofAction, updateOrderStatusAction } from "@/server/actions/admin";
import { formatCurrency } from "@/lib/utils";
import { Image, AlertTriangle, ArrowRight, Clock } from "lucide-react";

export default async function AdminProofsPage() {
  const { needsProof, needsRevision } = await getProofQueue();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Proof Queue</h1>
        <p className="mt-1 text-sm text-navy/60">
          Orders that need proof creation or revision
        </p>
      </div>

      {/* Revision requests (priority) */}
      <section className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="size-4 text-orange-500" />
          <h2 className="text-lg font-bold text-navy">
            Revision Requests
            <span className="ml-2 inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700">
              {needsRevision.length}
            </span>
          </h2>
        </div>

        {needsRevision.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {needsRevision.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-orange-200 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-semibold text-navy hover:text-gold-dark"
                  >
                    {order.orderNumber}
                  </Link>
                  <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-700">
                    Revision
                  </span>
                </div>

                <div className="mb-3 space-y-1">
                  <p className="text-sm text-navy/70">
                    {order.buyerFirstName} {order.buyerLastName}
                  </p>
                  <p className="text-xs text-navy/50">
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""} &middot;{" "}
                    {formatCurrency(Number(order.total))}
                  </p>
                </div>

                {/* Show revision notes if available */}
                {"proofs" in order &&
                  order.proofs &&
                  (order.proofs as Array<{ revisionNotes?: string | null }>)
                    .length > 0 && (
                    <div className="mb-3 rounded-lg bg-orange-50 p-3">
                      <p className="text-xs font-semibold text-orange-700">
                        Customer notes:
                      </p>
                      <p className="mt-1 text-xs text-orange-700/80">
                        {(
                          order.proofs as Array<{
                            revisionNotes?: string | null;
                          }>
                        )[0]?.revisionNotes ?? "No notes provided"}
                      </p>
                    </div>
                  )}

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="inline-flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-cream transition-colors hover:bg-navy-light"
                  >
                    Upload New Proof
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-navy/[0.06] bg-white px-6 py-10 text-center">
            <p className="text-sm text-navy/40">No revision requests</p>
          </div>
        )}
      </section>

      {/* Needs proof */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Image className="size-4 text-indigo-500" />
          <h2 className="text-lg font-bold text-navy">
            Needs Proof
            <span className="ml-2 inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
              {needsProof.length}
            </span>
          </h2>
        </div>

        {needsProof.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {needsProof.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-navy/[0.08] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-semibold text-navy hover:text-gold-dark"
                  >
                    {order.orderNumber}
                  </Link>
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                    In Production
                  </span>
                </div>

                <div className="mb-3 space-y-1">
                  <p className="text-sm text-navy/70">
                    {order.buyerFirstName} {order.buyerLastName}
                  </p>
                  <p className="text-xs text-navy/50">
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""} &middot;{" "}
                    {formatCurrency(Number(order.total))}
                  </p>
                </div>

                {/* Recipients */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-navy/50">
                    Recipients:
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {order.items.slice(0, 3).map((item) => (
                      <span
                        key={item.id}
                        className="rounded-full bg-cream px-2 py-0.5 text-xs text-navy/60"
                      >
                        {item.recipientName}
                      </span>
                    ))}
                    {order.items.length > 3 && (
                      <span className="rounded-full bg-cream px-2 py-0.5 text-xs text-navy/40">
                        +{order.items.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-navy/40">
                    <Clock className="size-3" />
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="inline-flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-cream transition-colors hover:bg-navy-light"
                  >
                    Upload Proof
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-navy/[0.06] bg-white px-6 py-10 text-center">
            <p className="text-sm text-navy/40">
              No orders waiting for proofs
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
