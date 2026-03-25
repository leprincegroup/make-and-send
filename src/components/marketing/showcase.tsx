import {
  DoodleStar,
  MiniSparkle,
  DoodleGift,
  SquigglyUnderline,
  BobbleheadSuit,
  BobbleheadCasual,
  BobbleheadGift,
  BobbleheadDesk,
} from "@/components/shared/illustrations";

type BobbleheadIcon = typeof BobbleheadSuit;

const SHOWCASE_CARDS: {
  title: string;
  gradient: string;
  description: string;
  tag: string;
  tagColor: string;
  icon: BobbleheadIcon;
}[] = [
  {
    title: "Sales Outreach",
    gradient: "from-gold to-coral",
    description:
      "Sarah's prospect hadn't replied in 3 months. She sent a custom bobblehead wearing their company colors. Meeting booked in 48 hours.",
    tag: "Cold Gifting",
    tagColor: "bg-gold/20 text-gold",
    icon: BobbleheadSuit,
  },
  {
    title: "Employee Birthday",
    gradient: "from-coral to-mint",
    description:
      "When Jake hit his 5-year anniversary, his team surprised him with a bobblehead in his favorite hiking gear. It hasn't left his desk since.",
    tag: "Team Recognition",
    tagColor: "bg-coral/20 text-coral-light",
    icon: BobbleheadCasual,
  },
  {
    title: "Client Welcome Gift",
    gradient: "from-mint to-gold",
    description:
      "Onboarding a new enterprise client? Send their champion a bobblehead. It says 'we invested in you' before the kickoff call.",
    tag: "Client Success",
    tagColor: "bg-mint/20 text-mint",
    icon: BobbleheadGift,
  },
  {
    title: "Company Branding",
    gradient: "from-gold to-navy-light",
    description:
      "Every bobblehead wears a custom outfit with your company logo. Your brand sits on their desk for years — the ultimate conversation starter.",
    tag: "Brand Amplification",
    tagColor: "bg-gold/20 text-gold",
    icon: BobbleheadDesk,
  },
];

export function ShowcaseSection() {
  return (
    <section className="relative bg-navy py-24 sm:py-32 overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 size-96 rounded-full bg-coral/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 size-80 rounded-full bg-gold/5 blur-3xl" />

      {/* Doodle decorations */}
      <DoodleStar className="absolute top-16 right-[12%] size-8 text-gold/15 animate-pulse" />
      <MiniSparkle className="absolute top-1/3 left-[6%] size-5 text-coral/15 animate-pulse [animation-delay:0.8s]" />
      <DoodleGift className="absolute bottom-20 right-[8%] size-10 text-gold/10 animate-pulse [animation-delay:1.5s]" />
      <MiniSparkle className="absolute bottom-32 left-[15%] size-4 text-mint/15 animate-pulse [animation-delay:2s]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            See it in action
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
            Stories from the{" "}
            <span className="relative inline-block">
              <span className="font-accent text-gold italic">field</span>
              <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-gold/40" />
            </span>
          </h2>
        </div>

        {/* 2x2 card grid */}
        <div className="mt-16 grid gap-6 sm:gap-8 lg:grid-cols-2">
          {SHOWCASE_CARDS.map((card) => (
            <div
              key={card.title}
              className="group rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 backdrop-blur-sm transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-black/15 hover:border-white/20"
            >
              {/* Visual placeholder area */}
              <div
                className={`relative h-48 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center overflow-hidden animate-gradient`}
              >
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
                <div className="relative flex size-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <card.icon className="size-14 text-white" />
                </div>
              </div>

              {/* Tag + description */}
              <div className="mt-5 flex flex-col gap-3">
                <span
                  className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${card.tagColor}`}
                >
                  {card.tag}
                </span>
                <h3 className="text-lg font-bold text-cream">{card.title}</h3>
                <p className="text-sm text-cream/60 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
