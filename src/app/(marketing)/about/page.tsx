import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gem, Eye, PartyPopper } from "lucide-react";
import {
  DoodleStar,
  MiniSparkle,
  DoodleHeart,
  SquigglyUnderline,
  FloatingDots,
  Confetti,
  WobblyCircle,
  DoodleSmile,
  BouncyArrow,
} from "@/components/shared/illustrations";

export const metadata: Metadata = {
  title: "About | Make & Send",
};

const VALUES = [
  {
    icon: Gem,
    title: "Craftsmanship",
    description:
      "Every bobblehead is hand-sculpted by skilled artists who obsess over the details. This isn't mass-produced swag. It's a one-of-a-kind piece that tells the recipient: we invested real effort in you.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "No hidden fees, no surprise charges. You see a digital proof before production, and revisions are always free. We believe trust is built through honesty — with our customers and theirs.",
  },
  {
    icon: PartyPopper,
    title: "Impact",
    description:
      "We measure success by the meetings booked, the retention improved, and the smiles created. From the moment someone unwraps their bobblehead to the years it lives on their desk, every detail is designed to create lasting impact.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── Dark navy ── */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute top-20 left-10 size-72 rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 size-96 rounded-full bg-gold/10 blur-3xl" />
        <DoodleStar className="absolute top-16 right-[12%] size-8 text-gold/20 animate-pulse" />
        <DoodleHeart className="absolute bottom-20 left-[10%] size-7 text-coral/15 animate-pulse [animation-delay:1s]" />
        <MiniSparkle className="absolute top-32 left-[20%] size-5 text-gold/15 animate-pulse [animation-delay:0.5s]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Our story
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream leading-[1.1]">
              We believe business is{" "}
              <span className="relative inline-block">
                <span className="font-accent text-gold italic">personal</span>
                <SquigglyUnderline className="absolute -bottom-2 left-0 w-full h-3 text-gold/40" />
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-cream/70 leading-relaxed max-w-2xl mx-auto">
              Make & Send was built on one idea: the companies that make people
              feel valued — employees and clients alike — are the ones that win.
            </p>
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── Cream background ── */}
      <section className="relative bg-cream py-24 sm:py-32 overflow-hidden">
        <FloatingDots className="absolute inset-0 w-full h-full text-navy" />
        <DoodleSmile className="absolute top-20 right-[5%] size-12 text-navy/[0.05]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-coral">
              How it started
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy">
              From a single gift to a company{" "}
              <span className="relative inline-block">
                <span className="font-accent text-coral italic">mission</span>
                <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-coral/30" />
              </span>
            </h2>

            <div className="mt-10 space-y-6 text-base text-navy/70 leading-relaxed">
              <p>
                It started with a sales outreach problem. Our founder was tired
                of sending cold emails that disappeared into the void. One day,
                on a whim, he sent a prospect a custom bobblehead. The response?
                An immediate meeting and eventually a six-figure deal.
              </p>
              <p>
                Then something else happened. He sent one to a team member for
                their work anniversary. The reaction was electric — photos on
                Slack, a permanent desk fixture, and a teammate who felt
                genuinely seen. Two use cases, one product, same powerful result.
              </p>
              <p>
                Make & Send was born to scale that magic. We partnered with
                talented artists, built a seamless platform, and created a
                process that turns a single photo into a hand-sculpted
                conversation starter. Today, we help sales teams close deals and
                people teams build cultures worth staying for.
              </p>
              <p>
                We are still a small team with a big ambition: to become the
                most effective gifting platform for businesses. One bobblehead at
                a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── White background ── */}
      <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
        <Confetti className="absolute top-0 right-0 w-32 h-32 opacity-40" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-coral">
              What drives us
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
              Our{" "}
              <span className="relative inline-block">
                <span className="font-accent text-coral italic">values</span>
                <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-coral/30" />
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="group relative rounded-3xl bg-cream p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative mb-6">
                  <WobblyCircle className="absolute -top-2 -left-2 size-20 text-coral/[0.07] transition-all group-hover:text-coral/15" />
                  <div className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-navy text-cream">
                    <value.icon className="size-6" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-navy">{value.title}</h3>
                <p className="mt-3 text-sm text-navy/60 leading-relaxed">
                  {value.description}
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
            Ready to make business{" "}
            <span className="relative inline-block">
              <span className="font-accent text-gold italic">personal</span>
              <SquigglyUnderline className="absolute -bottom-1 left-0 w-full h-2.5 text-gold/40" />
            </span>
            ?
          </h2>
          <p className="mt-4 text-lg text-cream/60">
            Send a gift that creates real impact. For your prospects, your team, or anyone who deserves to feel valued.
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
