"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useConfiguratorStore } from "@/stores/configurator-store";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Confetti, DoodleSmile, MiniSparkle } from "@/components/shared/illustrations";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const reset = useConfiguratorStore((s) => s.reset);

  // Clear the configurator state after successful order
  useEffect(() => {
    if (sessionId) {
      reset();
    }
  }, [sessionId, reset]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-5 py-16">
      <div className="mx-auto max-w-lg text-center">
        <div className="relative mb-8 inline-block">
          <div className="flex size-20 items-center justify-center rounded-full bg-mint/30">
            <CheckCircle className="size-10 text-navy" />
          </div>
          <MiniSparkle className="absolute -top-2 -right-3 size-6 text-gold" />
          <Confetti className="absolute -bottom-1 -left-4 size-8 text-coral" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-navy">
          Order{" "}
          <span className="font-accent text-coral italic">confirmed!</span>
        </h1>

        <p className="mt-4 text-navy/60 leading-relaxed">
          Your custom bobbleheads are on their way to being sculpted. We&apos;ll
          send you an email with your order details and tracking updates.
        </p>

        <div className="mt-8 rounded-3xl bg-white p-6 text-left shadow-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy/40">
            What happens next
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-navy">
                1
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">
                  Our artists begin sculpting
                </p>
                <p className="text-sm text-navy/50">
                  We start work on your bobbleheads within 24 hours
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-navy">
                2
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">
                  You approve the proof
                </p>
                <p className="text-sm text-navy/50">
                  We&apos;ll email you a digital proof — free revisions until
                  you&apos;re happy
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-navy">
                3
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">
                  We ship it to you
                </p>
                <p className="text-sm text-navy/50">
                  Gift-wrapped and delivered with tracking
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream hover:bg-navy/90 transition-colors"
            prefetch={false}
          >
            <Package className="size-4" />
            Track My Order
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border-2 border-navy/20 px-6 py-3 text-sm font-medium text-navy hover:bg-navy hover:text-cream transition-all"
          >
            Back to Home
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-navy/40">
          <DoodleSmile className="size-4" />
          <span>Thank you for choosing Make & Send</span>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}
