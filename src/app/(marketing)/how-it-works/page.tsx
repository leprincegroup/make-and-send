import type { Metadata } from "next";
import Link from "next/link";
import {
  Camera,
  Palette,
  Eye,
  Gift,
  ArrowRight,
  Clock,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import {
  DoodleCamera,
  DoodleSwirl,
  DoodleSmile,
  DoodleGift,
  DoodleStar,
  MiniSparkle,
  DoodleHeart,
  SquigglyUnderline,
  FloatingDots,
  BouncyArrow,
  Confetti,
  WobblyCircle,
} from "@/components/shared/illustrations";

export const metadata: Metadata = {
  title: "How It Works | Make & Send",
};

const DETAILED_STEPS = [
  {
    icon: Camera,
    doodle: DoodleCamera,
    title: "Upload a photo",
    summary: "A clear photo is all we need. Upload one for your prospect, new hire, or top performer.",
    details: [
      "One good photo — we sculpt the full body, outfit, and likeness",
      "Our artists capture every detail — glasses, hairstyle, clothing, and accessories",
      "Add special requests for outfit, pose, accessories, or company branding",
    ],
  },
  {
    icon: Palette,
    doodle: DoodleSwirl,
    title: "We sculpt it",
    summary: "Our artists hand-sculpt a custom bobblehead from scratch. True likeness, no templates.",
    details: [
      "Every bobblehead is sculpted from scratch — no templates, no shortcuts",
      "AI-assisted tools help our artists capture the perfect likeness",
      "Choose the outfit, pose, base style, and plaque text",
    ],
  },
  {
    icon: Eye,
    doodle: DoodleSmile,
    title: "Approve the proof",
    summary: "Review your digital proof. Revisions are free and unlimited.",
    details: [
      "Receive a detailed digital proof within 3-5 business days",
      "Request unlimited free revisions until you are 100% satisfied",
      "View your proof from every angle with our interactive viewer",
    ],
  },
  {
    icon: Gift,
    doodle: DoodleGift,
    title: "Land on their desk",
    summary: "Gift-wrapped and shipped directly to their door or office. Your brand, their desk, permanent visibility.",
    details: [
      "Every bobblehead ships in beautiful, gift-ready packaging",
      "Ship directly to the recipient's office with an optional personalized message",
      "Track your order from production through delivery in real time",
    ],
  },
];

const EXPECTATIONS = [
  {
    icon: Clock,
    title: "Turnaround Time",
    description:
      "Standard production takes 2-3 weeks from proof approval. Need it faster? Premium and Deluxe tiers include priority and express options that can cut that to 7-10 business days.",
  },
  {
    icon: RotateCcw,
    title: "Revision Policy",
    description:
      "We want you to love your bobblehead. That is why every order includes unlimited free revisions on your digital proof. We will keep refining until it is perfect before production begins.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guarantee",
    description:
      "Every bobblehead is hand-sculpted by real artists and inspected for quality. If your bobblehead arrives damaged or does not match your approved proof, we will remake it at no cost.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* ── HERO ── Dark navy ── */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute top-20 left-10 size-72 rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 size-96 rounded-full bg-gold/10 blur-3xl" />
        <DoodleStar className="absolute top-16 right-[12%] size-8 text-gold/20 animate-pulse" />
        <MiniSparkle className="absolute bottom-20 left-[15%] size-5 text-gold/15 animate-pulse [animation-delay:1s]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              From photo to impact
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream leading-[1.1]">
              How we bring your{" "}
              <span className="relative inline-block">
                <span className="font-accent text-gold italic">bobblehead</span>
                <SquigglyUnderline className="absolute -bottom-2 left-0 w-full h-3 text-gold/40" />
              </span>{" "}
              to life
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-cream/70 leading-relaxed max-w-2xl mx-auto">
              Four simple steps from a photo on your phone to a hand-sculpted
              gift on their desk. Whether it&apos;s a cold prospect or a valued team member.
            </p>
          </div>
        </div>
      </section>

      {/* ── DETAILED STEPS ── Cream background with timeline ── */}
      <section className="relative bg-cream py-24 sm:py-32 overflow-hidden">
        <FloatingDots className="absolute inset-0 w-full h-full text-navy" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-coral">
              Simple as 1-2-3-4
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
              Four easy{" "}
              <span className="relative inline-block">
                <span className="font-accent text-coral italic">steps</span>
                <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-coral/30" />
              </span>
            </h2>
          </div>

          <div className="relative mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Timeline connector (desktop only) */}
            <div
              className="absolute top-[3.25rem] left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] hidden h-0.5 bg-navy/10 lg:block"
              aria-hidden="true"
            />

            {DETAILED_STEPS.map((step, i) => (
              <div key={step.title} className="relative">
                {/* Timeline dot (desktop) */}
                <div
                  className="absolute top-[2.75rem] left-1/2 z-10 hidden size-3.5 -translate-x-1/2 rounded-full bg-coral ring-4 ring-cream lg:block"
                  aria-hidden="true"
                />

                <div className="group rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-navy text-cream">
                    <step.icon className="size-6" />
                  </div>
                  <step.doodle className="absolute top-14 right-10 size-10 text-navy/[0.06] transition-all group-hover:text-coral/20" />
                  <span className="absolute top-14 right-14 text-5xl font-bold text-navy/5 font-accent">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm text-navy/60 leading-relaxed">
                    {step.summary}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2.5 text-sm text-navy/60"
                      >
                        <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-coral" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── White background ── */}
      <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
        <Confetti className="absolute top-0 right-0 w-32 h-32 opacity-40" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-coral">
              No surprises
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
              What to{" "}
              <span className="relative inline-block">
                <span className="font-accent text-coral italic">expect</span>
                <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-coral/30" />
              </span>
            </h2>
            <p className="mt-4 text-navy/60 text-lg max-w-2xl mx-auto">
              No surprises. Just a clear, reliable process from order to delivery.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {EXPECTATIONS.map((item) => (
              <div
                key={item.title}
                className="group relative rounded-3xl bg-cream p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative mb-6">
                  <WobblyCircle className="absolute -top-2 -left-2 size-20 text-coral/10 transition-all group-hover:text-coral/20" />
                  <div className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-navy text-cream">
                    <item.icon className="size-6" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-3 text-sm text-navy/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── Navy background ── */}
      <section className="bg-navy py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gold/5 blur-3xl" />
        <DoodleHeart className="absolute bottom-16 left-[10%] size-10 text-coral/10" />
        <MiniSparkle className="absolute top-20 right-[15%] size-6 text-gold/15 animate-pulse" />

        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-10 text-center">
          <DoodleSmile className="mx-auto size-14 text-gold/30 mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream leading-tight">
            Ready to get{" "}
            <span className="relative inline-block">
              <span className="font-accent text-gold italic">started</span>
              <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-gold/40" />
            </span>
            ?
          </h2>
          <p className="mt-4 text-lg text-cream/60">
            Upload a photo and we handle the rest. No payment until you approve
            your proof.
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
