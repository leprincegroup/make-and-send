import type { Metadata } from "next";
import {
  Users,
  Zap,
  Eye,
  Wallet,
  LayoutDashboard,
  BadgePercent,
  Link2,
  Settings,
  Gift,
} from "lucide-react";
import { WaitlistForm } from "@/components/marketing/waitlist-form";
import {
  DoodleStar,
  MiniSparkle,
  DoodleHeart,
  SquigglyUnderline,
  FloatingDots,
  Confetti,
  WobblyCircle,
  DoodleSmile,
} from "@/components/shared/illustrations";

export const metadata: Metadata = {
  title: "For Teams | Make & Send",
};

const FEATURES = [
  {
    icon: Link2,
    title: "HR Integration",
    description:
      "Connect BambooHR, Rippling, Gusto, or any HRIS. We pull birthdays, anniversaries, and milestones automatically so nobody gets missed. Ever.",
  },
  {
    icon: Zap,
    title: "Automated Ordering",
    description:
      "Set your rules and we handle everything. When a milestone hits, a custom bobblehead is sculpted, approved, and shipped — no manual work.",
  },
  {
    icon: Eye,
    title: "Proofing Workflow",
    description:
      "Managers can review and approve proofs before production. Match your org's approval structure so the right people sign off.",
  },
  {
    icon: Wallet,
    title: "Budget Management",
    description:
      "Set budgets per team, department, or company-wide. Track spend in real time. No surprises at quarter-end.",
  },
  {
    icon: LayoutDashboard,
    title: "Team Dashboard",
    description:
      "See every order, upcoming milestone, and delivery status in one dashboard. Know exactly who's being celebrated and when.",
  },
  {
    icon: BadgePercent,
    title: "Bulk Discounts",
    description:
      "Volume pricing kicks in automatically. 10% off at 5, 15% at 10, 20% at 25+. Enterprise pricing available for larger teams.",
  },
];

const TEAM_STEPS = [
  {
    icon: Link2,
    title: "Connect your HR system",
    description:
      "Integrate your HRIS in minutes. We support BambooHR, Rippling, Gusto, Workday, and more. Employee data is encrypted and never shared.",
  },
  {
    icon: Settings,
    title: "Set your rules",
    description:
      "Choose which milestones trigger a gift: birthdays, work anniversaries, promotions, or custom events. Set budgets and approval workflows to match your org.",
  },
  {
    icon: Gift,
    title: "We handle the rest",
    description:
      "When a milestone hits, we sculpt a custom bobblehead from their photo, route the proof for approval, produce it, and ship it gift-wrapped to their desk. You do nothing.",
  },
];

export default function ForTeamsPage() {
  return (
    <>
      {/* ── HERO ── Dark navy ── */}
      <section className="relative bg-gradient-to-br from-navy via-[#1a2420] to-navy overflow-hidden">
        <div className="absolute top-20 left-10 size-72 rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 size-96 rounded-full bg-gold/10 blur-3xl" />
        <DoodleStar className="absolute top-16 right-[12%] size-8 text-gold/20 animate-pulse" />
        <MiniSparkle className="absolute bottom-20 left-[15%] size-5 text-gold/15 animate-pulse [animation-delay:1s]" />
        <DoodleHeart className="absolute top-32 left-[8%] size-7 text-coral/15 animate-pulse [animation-delay:2s]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-gold backdrop-blur-sm">
              <Users className="size-4" />
              Built for companies that keep their best people
            </p>
            <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream leading-[1.1]">
              Make your team feel{" "}
              <span className="relative inline-block">
                <span className="font-accent text-gold italic">seen.</span>
                <SquigglyUnderline className="absolute -bottom-2 left-0 w-full h-3 text-gold/40" />
              </span>{" "}
              Watch retention follow.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-cream/70 leading-relaxed max-w-2xl mx-auto">
              Automate milestone gifting with hand-sculpted bobbleheads.
              Birthdays, anniversaries, promotions — each one says &apos;you
              matter here&apos; louder than any email or Slack message ever
              could.
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── White background ── */}
      <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
        <Confetti className="absolute top-0 right-0 w-32 h-32 opacity-40" />
        <Confetti className="absolute bottom-0 left-0 w-32 h-32 opacity-30 rotate-180" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-coral">
              Everything you need to build culture
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
              Powerful{" "}
              <span className="relative inline-block">
                <span className="font-accent text-coral italic">tools</span>
                <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-coral/30" />
              </span>{" "}
              for people teams
            </h2>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-3xl bg-cream p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative mb-6">
                  <WobblyCircle className="absolute -top-2 -left-2 size-20 text-coral/[0.07] transition-all group-hover:text-coral/15" />
                  <div className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-navy text-cream">
                    <feature.icon className="size-6" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-navy">{feature.title}</h3>
                <p className="mt-2 text-sm text-navy/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS FOR TEAMS ── Cream background ── */}
      <section className="relative bg-cream py-24 sm:py-32 overflow-hidden">
        <FloatingDots className="absolute inset-0 w-full h-full text-navy" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-coral">
              Three simple steps
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
              How it works for{" "}
              <span className="relative inline-block">
                <span className="font-accent text-coral italic">teams</span>
                <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-coral/30" />
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {TEAM_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="group relative rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-navy text-cream">
                  <step.icon className="size-6" />
                </div>
                <span className="absolute top-6 right-6 text-5xl font-bold text-navy/5 font-accent">
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-navy/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST CTA ── Navy background ── */}
      <section className="bg-navy py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gold/5 blur-3xl" />
        <DoodleSmile className="absolute top-12 left-[10%] size-12 text-gold/10" />
        <DoodleHeart className="absolute bottom-16 right-[12%] size-10 text-coral/10" />
        <MiniSparkle className="absolute top-1/3 right-[8%] size-6 text-gold/15 animate-pulse" />

        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-10 text-center">
          <Confetti className="mx-auto w-20 h-20 mb-4 opacity-60" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream leading-tight">
            Ready to build a culture people don&apos;t want to{" "}
            <span className="relative inline-block">
              <span className="font-accent text-gold italic">leave?</span>
              <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-gold/40" />
            </span>
          </h2>
          <p className="mt-4 text-lg text-cream/60">
            Join the waitlist. Be first to automate meaningful, personal
            recognition that your team will actually remember.
          </p>
          <WaitlistForm variant="dark" />
        </div>
      </section>
    </>
  );
}
