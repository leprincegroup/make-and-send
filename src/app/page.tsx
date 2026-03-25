import Link from "next/link";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Truck,
  Camera,
  Palette,
  Eye,
  Gift,
  Users,
  Target,
  Heart,
  TrendingUp,
} from "lucide-react";
import { MarketingNavbar } from "@/components/layout/marketing-navbar";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { TestimonialsSection } from "@/components/marketing/testimonials";
import {
  DoodleStar,
  DoodleCamera,
  DoodleSwirl,
  DoodleSmile,
  DoodleGift,
  MiniSparkle,
  BobbleheadSuit,
  BobbleheadCasual,
  BobbleheadGift,
  BobbleheadDesk,
} from "@/components/shared/illustrations";

/* ─── How it Works Steps ─── */
const STEPS = [
  {
    num: 1,
    icon: Camera,
    title: "Upload a photo",
    desc: "One clear photo is all we need. We handle the rest — custom outfit, company logos, and all.",
    doodle: DoodleCamera,
  },
  {
    num: 2,
    icon: Palette,
    title: "We sculpt it",
    desc: "Our artists hand-sculpt a one-of-a-kind bobblehead. No templates. True likeness.",
    doodle: DoodleSwirl,
  },
  {
    num: 3,
    icon: Eye,
    title: "Approve the proof",
    desc: "Review your digital proof. Request unlimited free revisions until it's perfect.",
    doodle: DoodleSmile,
  },
  {
    num: 4,
    icon: Gift,
    title: "Land on their desk",
    desc: "Gift-wrapped and shipped directly. Your brand, their desk, permanent visibility.",
    doodle: DoodleGift,
  },
];

/* ─── Use Cases ─── */
const USE_CASES = [
  {
    title: "Sales Outreach",
    description:
      "Stop sending cold emails that get ignored. Send a gift that lands on their desk and stays there. Cold gifting outperforms cold calling 3-to-1.",
    tag: "Cold Gifting",
    icon: Target,
    bobblehead: BobbleheadSuit,
  },
  {
    title: "Employee Recognition",
    description:
      "Birthdays, promotions, work anniversaries. A bobblehead says 'we see you' in a way a gift card never will. Boost retention and morale.",
    tag: "Team Culture",
    icon: Users,
    bobblehead: BobbleheadCasual,
  },
  {
    title: "Client Welcome",
    description:
      "Onboarding a new enterprise client? Send their champion a bobblehead. It says 'we invested in you' before the kickoff call.",
    tag: "Client Success",
    icon: Heart,
    bobblehead: BobbleheadGift,
  },
  {
    title: "Brand Amplification",
    description:
      "Every bobblehead wears a custom outfit with your company logo. Your brand sits on their desk for years — the ultimate conversation starter.",
    tag: "Brand Visibility",
    icon: TrendingUp,
    bobblehead: BobbleheadDesk,
  },
];

/* ─── Placeholder companies for logo bar ─── */
const LOGO_COMPANIES = [
  "Stripe",
  "Notion",
  "Linear",
  "Vercel",
  "Figma",
  "Loom",
];

export default function HomePage() {
  return (
    <>
      <MarketingNavbar variant="dark" />
      <main className="bg-cream">

        {/* ────────────────────────────────────────────────────
            1. HERO — Warm full-bleed with photo-like overlay
        ──────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-navy-light to-[#4A4660]">
          {/* Warm overlay gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,160,84,0.12)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

          {/* Subtle decorative elements */}
          <DoodleStar className="absolute top-24 right-[12%] size-6 text-gold/20 animate-float" />
          <MiniSparkle className="absolute bottom-32 left-[15%] size-5 text-gold/15 animate-pulse [animation-delay:1s]" />

          <div className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-10 py-32 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-cream leading-[1.1]">
              The gift that sits on their{" "}
              <span className="font-accent text-gold italic">desk</span>
              , not in their trash
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-cream/70 leading-relaxed max-w-2xl mx-auto">
              Custom bobbleheads that warm up cold prospects, celebrate your team,
              and keep your brand visible for years. Not another gift card.
              A conversation starter.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/create"
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 h-14 text-base font-semibold text-navy hover:bg-gold-dark shadow-lg shadow-gold/25 transition-all hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5"
              >
                Send your first gift
                <ArrowRight className="ml-2 size-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-cream/30 h-14 px-8 text-base text-cream/80 hover:text-cream hover:border-cream/60 transition-colors"
              >
                See how it works
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {[
                { icon: Sparkles, text: "Hand-sculpted" },
                { icon: Shield, text: "Satisfaction guaranteed" },
                { icon: Truck, text: "Bulk pricing for teams" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-cream/60"
                >
                  <badge.icon className="size-4 text-gold/70" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────
            2. LOGO BAR — "Trusted by teams at"
        ──────────────────────────────────────────────────── */}
        <section className="bg-cream border-b border-navy/5">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12 sm:py-16">
            <p className="text-center text-sm font-medium uppercase tracking-wider text-navy/40">
              Trusted by teams at
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {LOGO_COMPANIES.map((name) => (
                <span
                  key={name}
                  className="text-lg sm:text-xl font-semibold text-navy/20 tracking-wide select-none"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────
            3. VALUE PROP — Big centered heading
        ──────────────────────────────────────────────────── */}
        <section className="bg-cream py-32 sm:py-40">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10 text-center">
            <AnimateOnScroll animation="fade-in-up">
              <p className="text-sm font-semibold uppercase tracking-wider text-coral">
                Why bobbleheads
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-6xl font-bold text-navy leading-tight">
                Making outreach{" "}
                <span className="font-accent text-coral italic">unforgettable</span>
              </h2>
              <p className="mt-6 text-lg sm:text-xl text-navy/60 leading-relaxed max-w-2xl mx-auto">
                Gift cards get tossed. Swag gets forgotten. A custom bobblehead of your
                prospect or team member? That sits on their desk for years, starting
                conversations every single day.
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────
            4. HOW IT WORKS — 4 bordered cards on cream
        ──────────────────────────────────────────────────── */}
        <section className="bg-cream pb-32 sm:pb-40">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-coral">
                Simple as 1-2-3-4
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
                How it{" "}
                <span className="font-accent text-coral italic">works</span>
              </h2>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <AnimateOnScroll key={step.title} animation="fade-in-up" delay={i * 120}>
                  <div className="group relative rounded-2xl border border-navy/[0.08] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.05)] hover:-translate-y-1">
                    {/* Numbered badge */}
                    <div className="mb-5 inline-flex size-10 items-center justify-center rounded-full bg-gold text-navy text-sm font-bold">
                      {step.num}
                    </div>

                    {/* Soft pink illustration area */}
                    <div className="mb-5 flex h-32 items-center justify-center rounded-xl bg-pink-soft">
                      <step.doodle className="size-16 text-navy/30 transition-transform group-hover:scale-110" />
                    </div>

                    <h3 className="text-lg font-bold text-navy">{step.title}</h3>
                    <p className="mt-2 text-sm text-navy/60 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* CTA after steps */}
            <div className="mt-14 flex justify-center">
              <Link
                href="/create"
                className="inline-flex items-center justify-center rounded-full border-2 border-navy px-8 h-12 text-sm font-semibold text-navy hover:bg-navy hover:text-cream transition-all"
              >
                Start with a photo
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────
            5. USE CASES — 2-col bordered cards
        ──────────────────────────────────────────────────── */}
        <section className="bg-cream py-32 sm:py-40">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-coral">
                Built for business results
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
                Four powerful{" "}
                <span className="font-accent text-coral italic">ways</span>{" "}
                to win
              </h2>
              <p className="mt-4 text-lg text-navy/60 max-w-2xl mx-auto">
                Whether you are warming up a cold prospect or celebrating a team win,
                a custom bobblehead creates a lasting impression no email ever could.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {USE_CASES.map((uc, i) => (
                <AnimateOnScroll
                  key={uc.title}
                  animation={i % 2 === 0 ? "fade-in-left" : "fade-in-right"}
                  delay={i * 100}
                >
                  <div className="group rounded-2xl border border-navy/[0.08] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.05)] hover:-translate-y-1">
                    {/* Pink illustration box */}
                    <div className="mb-6 flex h-40 items-center justify-center rounded-xl bg-pink-soft">
                      <uc.bobblehead className="size-20 text-navy/25 transition-transform group-hover:scale-110" />
                    </div>

                    {/* Tag pill */}
                    <span className="inline-flex items-center rounded-full border border-navy/[0.08] px-3 py-1 text-xs font-semibold text-navy/60">
                      {uc.tag}
                    </span>

                    <h3 className="mt-3 text-xl font-bold text-navy">{uc.title}</h3>
                    <p className="mt-2 text-sm text-navy/60 leading-relaxed">
                      {uc.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────
            6. TESTIMONIALS
        ──────────────────────────────────────────────────── */}
        <TestimonialsSection />

        {/* ────────────────────────────────────────────────────
            7. DARK GREEN CTA SECTION
        ──────────────────────────────────────────────────── */}
        <section className="bg-forest py-32 sm:py-40 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-gold/5 blur-3xl" />
          <MiniSparkle className="absolute top-16 right-[10%] size-5 text-gold/15 animate-pulse" />
          <DoodleStar className="absolute bottom-20 left-[8%] size-8 text-gold/10" />

          <div className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-10 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream leading-tight">
              Ready to make outreach{" "}
              <span className="font-accent text-gold italic">unforgettable</span>?
            </h2>
            <p className="mt-6 text-lg text-cream/60 max-w-xl mx-auto">
              Start sending gifts that actually move the needle. Custom bobbleheads
              for sales outreach, employee recognition, and client success.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/create"
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 h-14 text-base font-semibold text-navy hover:bg-gold-dark shadow-lg shadow-gold/25 transition-all hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5"
              >
                Send your first gift
                <ArrowRight className="ml-2 size-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-cream/30 h-14 px-8 text-base text-cream/70 hover:text-cream hover:border-cream/60 transition-colors"
              >
                See how it works
              </Link>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
