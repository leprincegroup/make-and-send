import {
  DoodleStar,
  MiniSparkle,
  SquigglyUnderline,
  Confetti,
  FloatingDots,
} from "@/components/shared/illustrations";

/* ─── Types ─── */

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  result: string;
  variant?: "light" | "dark";
}

/* ─── TestimonialCard ─── */

export function TestimonialCard({
  quote,
  name,
  title,
  company,
  result,
  variant = "light",
}: TestimonialCardProps) {
  const isLight = variant === "light";

  return (
    <div
      className={`group relative rounded-3xl p-8 transition-all hover:-translate-y-1 ${
        isLight
          ? "bg-white shadow-sm hover:shadow-lg hover:bg-gold/5"
          : "bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10"
      }`}
    >
      {/* Decorative quote mark */}
      <span
        className={`absolute top-6 left-8 text-6xl font-accent leading-none select-none ${
          isLight ? "text-gold/20" : "text-gold/30"
        }`}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote */}
      <blockquote
        className={`relative mt-8 text-base leading-relaxed ${
          isLight ? "text-navy/80" : "text-cream/80"
        }`}
      >
        {quote}
      </blockquote>

      {/* Divider */}
      <div
        className={`mt-6 h-px w-12 ${
          isLight ? "bg-navy/10" : "bg-white/10"
        }`}
      />

      {/* Attribution */}
      <div className="mt-4">
        <p
          className={`text-sm font-bold ${
            isLight ? "text-navy" : "text-cream"
          }`}
        >
          {name}
        </p>
        <p
          className={`mt-0.5 text-sm ${
            isLight ? "text-navy/50" : "text-cream/50"
          }`}
        >
          {title} at {company}
        </p>
      </div>

      {/* Result pill */}
      <span
        className={`mt-4 inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide ${
          isLight
            ? "bg-gold/10 text-gold-dark"
            : "bg-gold/15 text-gold"
        }`}
      >
        {result}
      </span>

      {/* Hover doodle */}
      <MiniSparkle
        className={`absolute bottom-5 right-5 size-5 transition-all opacity-0 group-hover:opacity-100 group-hover:scale-110 ${
          isLight ? "text-gold/25" : "text-gold/30"
        }`}
      />
    </div>
  );
}

/* ─── Data ─── */

const TESTIMONIALS: Omit<TestimonialCardProps, "variant">[] = [
  {
    quote:
      "We sent bobbleheads to 30 cold prospects. 22 booked meetings. Our VP of Sales now calls it 'the secret weapon.'",
    name: "Marcus Chen",
    title: "Head of Business Development",
    company: "Relay Commerce",
    result: "73% meeting rate",
  },
  {
    quote:
      "Every new hire gets a bobblehead on their first day. It's become part of our culture. People literally show them off on LinkedIn.",
    name: "Sarah Okonkwo",
    title: "VP of People",
    company: "Driftwood Labs",
    result: "+34% eNPS score",
  },
  {
    quote:
      "I sent one to a prospect who'd ghosted me for 6 months. She called me the next day laughing. We closed a $180K deal.",
    name: "Jake Morrison",
    title: "Enterprise AE",
    company: "CloudScale",
    result: "$180K deal closed",
  },
];

/* ─── TestimonialsSection ─── */

export function TestimonialsSection() {
  return (
    <section className="relative bg-cream py-24 sm:py-32 overflow-hidden">
      <FloatingDots className="absolute inset-0 w-full h-full text-navy" />

      {/* Decorative doodles */}
      <DoodleStar className="absolute top-16 right-[10%] size-8 text-gold/15 animate-pulse" />
      <MiniSparkle className="absolute bottom-20 left-[8%] size-6 text-coral/15 animate-pulse [animation-delay:1s]" />
      <Confetti className="absolute top-8 left-[5%] w-28 h-28 opacity-30" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-coral">
            Real results
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
            What our customers{" "}
            <span className="relative inline-block">
              <span className="font-accent text-coral italic">say</span>
              <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-coral/30" />
            </span>
          </h2>
        </div>

        {/* Testimonial grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              {...testimonial}
              variant="light"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
