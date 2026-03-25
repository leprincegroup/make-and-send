import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronDown, Check } from "lucide-react";
import { PRODUCT, BULK_DISCOUNTS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import {
  DoodleStar,
  MiniSparkle,
  SquigglyUnderline,
  FloatingDots,
  DoodleSmile,
  DoodleHeart,
  BouncyArrow,
  Confetti,
} from "@/components/shared/illustrations";

export const metadata: Metadata = {
  title: "Pricing | Make & Send",
};

const FAQS = [
  {
    question: "What is included in the price?",
    answer:
      "Every bobblehead includes hand-sculpting from your photo, hand-painted details, a personalized plaque, gift-ready packaging, and unlimited free revisions on your digital proof. Shipping is calculated at checkout.",
  },
  {
    question: "How long does it take?",
    answer:
      "After your proof is approved, production takes 2-3 weeks. We'll send you a digital proof within a few days of your order. Rush options are available for time-sensitive gifts.",
  },
  {
    question: "What if I am not happy with my proof?",
    answer:
      "Every order includes unlimited free revisions. Our artists will keep refining your digital proof until you are 100% satisfied before we begin production. You are never charged until you approve.",
  },
  {
    question: "Can I order for multiple people at once?",
    answer:
      "Absolutely! Our flow is designed for multi-person orders — whether that's a sales campaign targeting 20 prospects or a team celebration. Each person gets their own photo, name, and plaque text. Volume discounts apply automatically.",
  },
  {
    question: "Do you offer bulk or corporate pricing?",
    answer:
      "Yes! Automatic volume discounts: 10% off for 5+, 15% for 10+, 20% for 25+. For sales teams or companies with 50+ orders, contact us for custom enterprise pricing with dedicated account support.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute top-20 left-10 size-72 rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 size-96 rounded-full bg-gold/10 blur-3xl" />
        <DoodleStar className="absolute top-16 right-[10%] size-8 text-gold/20 animate-pulse" />
        <MiniSparkle className="absolute bottom-24 left-[18%] size-5 text-gold/15 animate-pulse [animation-delay:1s]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              One product. Clear ROI.
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream leading-[1.1]">
              Simple, transparent{" "}
              <span className="relative inline-block">
                <span className="font-accent text-gold italic">pricing</span>
                <SquigglyUnderline className="absolute -bottom-2 left-0 w-full h-3 text-gold/40" />
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-cream/70 leading-relaxed max-w-2xl mx-auto">
              One price, no tiers, no upsells. Volume discounts for teams and
              sales campaigns. The cost of one gift is less than one wasted hour
              of cold outreach.
            </p>
          </div>
        </div>
      </section>

      {/* ── SINGLE PRODUCT PRICING ── */}
      <section className="relative bg-cream py-24 sm:py-32 overflow-hidden">
        <FloatingDots className="absolute inset-0 w-full h-full text-navy" />

        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
          <div className="relative rounded-3xl bg-white p-8 sm:p-12 shadow-lg text-center">
            <DoodleStar className="absolute top-6 right-6 size-8 text-gold/20" />

            <h2 className="text-lg font-bold text-navy">
              {PRODUCT.name}
            </h2>
            <p className="mt-1 text-sm text-navy/50">{PRODUCT.material}</p>

            <div className="mt-6 flex items-baseline justify-center gap-1">
              <span className="text-6xl sm:text-7xl font-bold text-navy">
                {formatCurrency(PRODUCT.price)}
              </span>
              <span className="text-lg text-navy/40">/each</span>
            </div>
            <p className="mt-2 text-navy/50">{PRODUCT.description}</p>

            <ul className="mt-8 mx-auto max-w-sm space-y-3 text-left">
              {PRODUCT.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-navy/70"
                >
                  <Check className="size-4 mt-0.5 shrink-0 text-gold" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/create"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-gold px-10 h-14 text-base font-semibold text-navy hover:bg-gold-dark shadow-lg shadow-gold/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Start creating
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── VOLUME DISCOUNTS ── */}
      <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
        <Confetti className="absolute top-0 right-0 w-32 h-32 opacity-40" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-coral">
              Order more, save more
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
              Volume{" "}
              <span className="relative inline-block">
                <span className="font-accent text-coral italic">discounts</span>
                <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-coral/30" />
              </span>
            </h2>
            <p className="mt-4 text-navy/60 text-lg max-w-2xl mx-auto">
              Running a sales campaign or celebrating your whole team? The more
              you send, the more you save.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl rounded-3xl bg-cream p-8 shadow-sm">
            <div className="overflow-hidden rounded-2xl bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-navy/10">
                    <th className="px-6 py-4 text-sm font-semibold text-navy">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-navy">
                      Discount
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-navy">
                      Price per unit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-navy/5">
                    <td className="px-6 py-4 text-sm text-navy/70">
                      1-4 units
                    </td>
                    <td className="px-6 py-4 text-sm text-navy/70">
                      Standard pricing
                    </td>
                    <td className="px-6 py-4 text-sm text-navy/70">
                      {formatCurrency(PRODUCT.price)}/each
                    </td>
                  </tr>
                  {BULK_DISCOUNTS.map((tier) => (
                    <tr
                      key={tier.minQuantity}
                      className="border-b border-navy/5 last:border-b-0"
                    >
                      <td className="px-6 py-4 text-sm text-navy/70">
                        {tier.minQuantity}+ units
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-gold/20 px-3 py-0.5 text-sm font-semibold text-navy">
                          {tier.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-navy">
                        {formatCurrency(
                          Math.round(PRODUCT.price * (1 - tier.discount))
                        )}
                        /each
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-sm text-navy/50">
              Discounts apply automatically at checkout. Need 50+ units?{" "}
              <Link
                href="/for-teams"
                className="text-coral underline hover:text-coral-light"
              >
                Contact us for custom pricing.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faq"
        className="relative bg-cream py-24 sm:py-32 overflow-hidden"
      >
        <FloatingDots className="absolute inset-0 w-full h-full text-navy" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-coral">
              Got questions?
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
              Frequently asked{" "}
              <span className="relative inline-block">
                <span className="font-accent text-coral italic">questions</span>
                <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-coral/30" />
              </span>
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-3xl space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-3xl bg-white p-6 shadow-sm transition-all hover:shadow-lg [&[open]]:shadow-lg"
              >
                <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-navy list-none [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown className="size-5 text-navy/40 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-sm text-navy/60 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-navy py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gold/5 blur-3xl" />
        <DoodleHeart className="absolute bottom-16 left-[10%] size-10 text-coral/10" />
        <MiniSparkle className="absolute top-20 right-[15%] size-6 text-gold/15 animate-pulse" />

        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-10 text-center">
          <DoodleSmile className="mx-auto size-14 text-gold/30 mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream leading-tight">
            Ready to invest in relationships that pay{" "}
            <span className="relative inline-block">
              <span className="font-accent text-gold italic">off</span>
              <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-gold/40" />
            </span>
            ?
          </h2>
          <p className="mt-4 text-lg text-cream/60">
            Send a gift that closes deals and builds loyalty. No payment until
            you approve your proof.
          </p>
          <div className="mt-8">
            <BouncyArrow className="mx-auto size-10 text-gold/30 mb-4 rotate-90" />
          </div>
          <Link
            href="/create"
            className="inline-flex items-center justify-center rounded-full bg-gold px-8 h-14 text-base font-semibold text-navy hover:bg-gold-dark shadow-lg shadow-gold/25 transition-all hover:shadow-xl hover:shadow-gold/35 hover:-translate-y-0.5"
          >
            Start creating
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
