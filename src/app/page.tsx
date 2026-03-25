import Link from "next/link";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";
import { WaitlistForm } from "@/components/marketing/waitlist-form";
import {
  Camera,
  Palette,
  Eye,
  Gift,
  ArrowRight,
  Sparkles,
  Shield,
  Truck,
  Users,
  TrendingUp,
  Zap,
  Heart,
  Star,
  CalendarHeart,
  Target,
  BarChart3,
} from "lucide-react";
import { MarketingNavbar } from "@/components/layout/marketing-navbar";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { TestimonialsSection } from "@/components/marketing/testimonials";
import { ShowcaseSection } from "@/components/marketing/showcase";
import { MATERIAL_TIERS, OCCASIONS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import {
  DoodleStar,
  DoodleHeart,
  DoodleSmile,
  DoodleCamera,
  DoodleGift,
  SquigglyUnderline,
  Confetti,
  MiniSparkle,
  WobblyCircle,
  FloatingDots,
  BouncyArrow,
  DoodleSwirl,
  BobbleheadSuit,
  BobbleheadTeam,
  BobbleheadDesk,
  BobbleheadWobble,
} from "@/components/shared/illustrations";

const STEPS = [
  { icon: Camera, title: "Upload a photo", desc: "One clear photo is all we need. We sculpt the full figure — custom outfit, company logos, and all.", doodle: DoodleCamera },
  { icon: Palette, title: "We sculpt it", desc: "Our artists hand-sculpt a one-of-a-kind bobblehead. No templates. True likeness.", doodle: DoodleSwirl },
  { icon: Eye, title: "Approve the proof", desc: "Review your digital proof. Request unlimited free revisions until it's perfect.", doodle: DoodleSmile },
  { icon: Gift, title: "Land on their desk", desc: "Gift-wrapped and shipped directly. Your brand, their desk, permanent visibility.", doodle: DoodleGift },
];

export default function HomePage() {
  return (
    <>
      <MarketingNavbar variant="dark" />
      <main>
        {/* ── HERO ── Dark navy, bold, warm ── */}
        <section className="relative bg-gradient-to-br from-navy via-navy to-[#2a1f1a] overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-20 left-10 size-72 rounded-full bg-coral/15 blur-3xl" />
          <div className="absolute bottom-10 right-10 size-96 rounded-full bg-gold/15 blur-3xl" />

          {/* Doodle decorations */}
          <DoodleStar className="absolute top-16 right-[15%] size-8 text-gold/30 animate-float" />
          <DoodleStar className="absolute top-32 left-[12%] size-6 text-coral/25 animate-wobble [animation-delay:1s]" />
          <MiniSparkle className="absolute bottom-24 left-[20%] size-5 text-gold/20 animate-pulse [animation-delay:0.5s]" />
          <MiniSparkle className="absolute top-40 right-[8%] size-4 text-mint/30 animate-float [animation-delay:1.5s]" />
          <DoodleHeart className="absolute bottom-32 right-[18%] size-7 text-coral/20 animate-wobble [animation-delay:2s]" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-24 sm:py-32 lg:py-40">
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-gold backdrop-blur-sm">
                <Sparkles className="size-4" />
                The gifting tool that closes deals & retains talent
              </p>

              <h1 className="mt-8 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-cream leading-[1.1]">
                The gift that sits on their desk, not in their{" "}
                <span className="relative inline-block">
                  <span className="font-accent text-gold italic">trash</span>
                  <SquigglyUnderline className="absolute -bottom-2 left-0 w-full h-3 text-gold/40" />
                </span>
              </h1>

              <p className="mt-8 text-lg sm:text-xl text-cream/70 leading-relaxed max-w-2xl mx-auto">
                Custom bobbleheads that close cold prospects, celebrate your team, and keep your brand visible for years. Not another gift card. A conversation starter.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/create"
                  className="inline-flex items-center justify-center rounded-full bg-gold px-8 h-14 text-base font-semibold text-navy hover:bg-gold-dark shadow-lg shadow-gold/25 transition-all hover:shadow-xl hover:shadow-gold/35 hover:-translate-y-0.5"
                >
                  Send your first gift
                  <ArrowRight className="ml-2 size-4" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center rounded-full h-14 px-8 text-base text-cream/80 hover:text-cream hover:bg-white/10 transition-colors"
                >
                  See how it works
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-cream/50">
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles className="size-4 text-gold/70" />
                  <span>Hand-sculpted</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="size-4 text-gold/70" />
                  <span>Satisfaction guaranteed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="size-4 text-gold/70" />
                  <span>Bulk pricing for teams</span>
                </div>
              </div>

              {/* Animated bobblehead hero illustration */}
              <div className="mt-16 flex justify-center">
                <div className="relative">
                  <div className="animate-float">
                    <BobbleheadWobble className="size-40 sm:size-52 lg:size-64 text-gold/40" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 w-32 rounded-full bg-black/10 blur-md" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── Cream background ── */}
        <section className="relative bg-cream py-24 sm:py-32 overflow-hidden">
          <FloatingDots className="absolute inset-0 w-full h-full text-navy" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-coral">
                From photo to closed deal
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
                How it{" "}
                <span className="relative inline-block">
                  <span className="font-accent text-coral italic">works</span>
                  <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-coral/30" />
                </span>
              </h2>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <AnimateOnScroll key={step.title} animation="fade-in-up" delay={i * 150}>
                  <div
                    className="group relative rounded-3xl bg-white/80 backdrop-blur-sm p-8 shadow-sm ring-1 ring-navy/5 transition-all hover:shadow-lg hover:-translate-y-1 hover:ring-gold/20"
                  >
                    <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-navy text-cream">
                      <step.icon className="size-6" />
                    </div>
                    {/* Doodle decoration */}
                    <step.doodle className="absolute top-5 right-5 size-10 text-navy/[0.06] transition-all group-hover:text-coral/20 group-hover:scale-110" />
                    <span className="absolute top-6 right-6 text-5xl font-bold text-navy/5 font-accent">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-bold text-navy">{step.title}</h3>
                    <p className="mt-2 text-sm text-navy/60 leading-relaxed">{step.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Bouncy arrow pointing to CTA */}
            <div className="mt-12 flex flex-col items-center gap-4">
              <BouncyArrow className="size-12 text-coral/40 rotate-90" />
              <Link
                href="/create"
                className="inline-flex items-center justify-center rounded-full bg-navy px-8 h-12 text-sm font-semibold text-cream hover:bg-navy-light transition-all"
              >
                Start with a photo
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── PERFECT FOR EVERY OCCASION ── White background ── */}
        <section className="relative bg-gradient-to-b from-white via-white to-cream/50 py-24 sm:py-32 overflow-hidden">
          <Confetti className="absolute top-0 right-0 w-40 h-40 opacity-60" />
          <Confetti className="absolute bottom-0 left-0 w-40 h-40 opacity-40 rotate-180" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-coral">
                One product, two powerful use cases
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
                Built for business{" "}
                <span className="relative inline-block">
                  <span className="font-accent text-coral italic">results</span>
                  <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-coral/30" />
                </span>
              </h2>
              <p className="mt-4 text-navy/60 text-lg max-w-2xl mx-auto">
                Whether you're warming up a cold prospect or celebrating a team win, a custom bobblehead creates a lasting impression no email ever could.
              </p>
            </div>

            {/* Occasion pills */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {OCCASIONS.map((occasion) => (
                <span
                  key={occasion}
                  className="rounded-full bg-cream px-5 py-2.5 text-sm font-medium text-navy border border-navy/10 transition-all hover:bg-navy hover:text-cream hover:border-navy cursor-default"
                >
                  {occasion}
                </span>
              ))}
            </div>

            {/* Visual showcase — 3 cards showing what makes it special */}
            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              <AnimateOnScroll animation="fade-in-up" delay={0}>
                <div className="group relative rounded-3xl bg-gradient-to-br from-gold/10 to-coral/10 p-8 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative mx-auto mb-6">
                    <WobblyCircle className="mx-auto size-24 text-gold/30" />
                    <BobbleheadSuit className="absolute inset-0 m-auto size-16 text-navy" />
                  </div>
                  <h3 className="text-lg font-bold text-navy">Close cold prospects</h3>
                  <p className="mt-2 text-sm text-navy/60 leading-relaxed">
                    Send a full-body custom bobblehead of your prospect — wearing their company tee with your logo on the sleeve. They share it on LinkedIn, take your call. 3x higher response than email.
                  </p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-in-up" delay={150}>
                <div className="group relative rounded-3xl bg-gradient-to-br from-coral/10 to-mint/10 p-8 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative mx-auto mb-6">
                    <WobblyCircle className="mx-auto size-24 text-coral/30" />
                    <BobbleheadTeam className="absolute inset-0 m-auto size-16 text-navy" />
                  </div>
                  <h3 className="text-lg font-bold text-navy">Celebrate your team</h3>
                  <p className="mt-2 text-sm text-navy/60 leading-relaxed">
                    Birthdays, promotions, work anniversaries. A bobblehead says 'we see you' in a way a gift card never will. Boost retention and morale.
                  </p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-in-up" delay={300}>
                <div className="group relative rounded-3xl bg-gradient-to-br from-mint/10 to-gold/10 p-8 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative mx-auto mb-6">
                    <WobblyCircle className="mx-auto size-24 text-mint/30" />
                    <BobbleheadDesk className="absolute inset-0 m-auto size-16 text-navy" />
                  </div>
                  <h3 className="text-lg font-bold text-navy">Amplify your brand</h3>
                  <p className="mt-2 text-sm text-navy/60 leading-relaxed">
                    Custom outfit with your company logo. Sits on their desk for years. Colleagues ask about it. Your brand becomes a daily conversation starter.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* ── USE CASES ── Navy background ── */}
        <section className="relative bg-navy py-24 sm:py-32 overflow-hidden">
          <DoodleStar className="absolute top-12 left-[8%] size-10 text-gold/15 animate-float" />
          <MiniSparkle className="absolute bottom-20 right-[10%] size-6 text-coral/15 animate-pulse [animation-delay:1s]" />
          <DoodleHeart className="absolute top-1/2 right-[5%] size-8 text-gold/10 animate-wobble [animation-delay:2s]" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                Two ways to grow
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
                Two powerful{" "}
                <span className="font-accent text-gold italic">ways</span>{" "}
                to win
              </h2>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              {/* For Teams */}
              <AnimateOnScroll animation="fade-in-left">
              <div className="relative rounded-3xl bg-white/5 border border-white/10 p-10 backdrop-blur-sm overflow-hidden">
                <Confetti className="absolute -top-4 -right-4 w-32 h-32 opacity-20" />
                <div className="relative">
                  <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-gold/20 text-gold mb-6">
                    <Users className="size-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-cream">For Teams</h3>
                  <p className="mt-3 text-cream/60 leading-relaxed">
                    Automate gifting for birthdays, milestones, and wins. Connect your HR system and never miss a moment that matters to your people.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      { icon: CalendarHeart, text: "Auto-order for birthdays & anniversaries" },
                      { icon: Zap, text: "Connect BambooHR, Rippling, Gusto" },
                      { icon: BarChart3, text: "Track engagement & measure impact" },
                    ].map((item) => (
                      <li key={item.text} className="flex items-center gap-3 text-sm text-cream/70">
                        <item.icon className="size-4 text-gold shrink-0" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/for-teams"
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-navy hover:bg-gold-dark transition-colors"
                  >
                    Learn more
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </div>
              </div>
              </AnimateOnScroll>

              {/* For Sales */}
              <AnimateOnScroll animation="fade-in-right">
              <div className="relative rounded-3xl bg-white/5 border border-white/10 p-10 backdrop-blur-sm overflow-hidden">
                <DoodleStar className="absolute top-6 right-6 size-12 text-coral/10" />
                <div className="relative">
                  <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-coral/20 text-coral-light mb-6">
                    <Target className="size-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-cream">For Sales</h3>
                  <p className="mt-3 text-cream/60 leading-relaxed">
                    Stop sending cold emails that get ignored. Send a gift that lands on their desk and stays there. Cold gifting outperforms cold calling 3-to-1.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      { icon: Heart, text: "Personalized gift landing pages" },
                      { icon: TrendingUp, text: "Track views & engagement" },
                      { icon: Star, text: "CRM integration (HubSpot, Salesforce)" },
                    ].map((item) => (
                      <li key={item.text} className="flex items-center gap-3 text-sm text-cream/70">
                        <item.icon className="size-4 text-coral-light shrink-0" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/for-sales"
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-coral px-6 py-2.5 text-sm font-semibold text-white hover:bg-coral-light transition-colors"
                  >
                    Learn more
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </div>
              </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <TestimonialsSection />

        {/* ── SHOWCASE ── */}
        <ShowcaseSection />

        {/* ── PRICING ── Cream background ── */}
        <section className="relative bg-cream py-24 sm:py-32 overflow-hidden">
          <FloatingDots className="absolute inset-0 w-full h-full text-navy" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-coral">
                Invest in results
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
                Simple, transparent{" "}
                <span className="relative inline-block">
                  <span className="font-accent text-coral italic">pricing</span>
                  <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-coral/30" />
                </span>
              </h2>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              {(Object.entries(MATERIAL_TIERS) as [string, typeof MATERIAL_TIERS[keyof typeof MATERIAL_TIERS]][]).map(
                ([key, tier], i) => {
                  const isPopular = i === 1;
                  return (
                    <div
                      key={key}
                      className={`relative rounded-3xl p-8 transition-all hover:-translate-y-1 ${
                        isPopular
                          ? "bg-navy text-cream shadow-2xl shadow-navy/20 ring-4 ring-gold/30 scale-105"
                          : "bg-white shadow-sm hover:shadow-lg"
                      }`}
                    >
                      {isPopular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold text-navy uppercase tracking-wider">
                          Most Popular
                        </span>
                      )}
                      {/* Doodle on popular card */}
                      {isPopular && <DoodleStar className="absolute top-4 right-4 size-8 text-gold/20" />}
                      <h3 className={`text-lg font-bold ${isPopular ? "text-cream" : "text-navy"}`}>
                        {tier.name}
                      </h3>
                      <p className={`mt-1 text-sm ${isPopular ? "text-cream/60" : "text-navy/50"}`}>
                        {tier.material}
                      </p>
                      <div className="mt-6 flex items-baseline gap-1">
                        <span className={`text-5xl font-bold ${isPopular ? "text-gold" : "text-navy"}`}>
                          {formatCurrency(tier.price)}
                        </span>
                        <span className={`text-sm ${isPopular ? "text-cream/50" : "text-navy/40"}`}>
                          /each
                        </span>
                      </div>
                      <p className={`mt-2 text-sm ${isPopular ? "text-cream/60" : "text-navy/50"}`}>
                        {tier.description}
                      </p>
                      <ul className="mt-8 space-y-3">
                        {tier.features.map((feature) => (
                          <li
                            key={feature}
                            className={`flex items-start gap-3 text-sm ${
                              isPopular ? "text-cream/80" : "text-navy/70"
                            }`}
                          >
                            <Sparkles className={`size-4 mt-0.5 shrink-0 ${isPopular ? "text-gold" : "text-coral"}`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/create"
                        className={`mt-8 flex w-full items-center justify-center rounded-full h-12 font-semibold transition-all ${
                          isPopular
                            ? "bg-gold text-navy hover:bg-gold-dark shadow-lg shadow-gold/25"
                            : "bg-navy text-cream hover:bg-navy-light"
                        }`}
                      >
                        Get started
                      </Link>
                    </div>
                  );
                }
              )}
            </div>

            <p className="mt-10 text-center text-sm text-navy/50">
              Volume discounts available: 10% off 5+, 15% off 10+, 20% off 25+
            </p>
          </div>
        </section>

        {/* ── CTA / WAITLIST ── Navy background ── */}
        <section className="bg-navy py-24 sm:py-32 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gold/5 blur-3xl" />
          <DoodleSmile className="absolute top-12 left-[10%] size-12 text-gold/10" />
          <DoodleHeart className="absolute bottom-16 right-[12%] size-10 text-coral/10" />
          <MiniSparkle className="absolute top-1/3 right-[8%] size-6 text-gold/15 animate-pulse" />

          <div className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-10 text-center">
            <Confetti className="mx-auto w-24 h-24 mb-4 opacity-70" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream leading-tight">
              Ready to close more{" "}
              <span className="relative inline-block">
                <span className="font-accent text-gold italic">deals</span>
                <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-gold/40" />
              </span>
              ?
            </h2>
            <p className="mt-4 text-lg text-cream/60">
              Start sending gifts that actually move the needle. Custom bobbleheads for sales outreach and employee recognition.
            </p>
            <WaitlistForm variant="dark" />
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
