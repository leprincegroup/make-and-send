"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import type { MockTemplate } from "@/lib/mock-templates";

interface Tier {
  key: "STANDARD" | "PREMIUM" | "DELUXE";
  name: string;
  price: number;
  description: string;
  material: string;
  features: readonly string[];
}

interface TemplateDetailClientProps {
  template: MockTemplate;
  tiers: Tier[];
}

export function TemplateDetailClient({
  template,
  tiers,
}: TemplateDetailClientProps) {
  const [selectedTier, setSelectedTier] = useState<string>("STANDARD");
  const selectedTierData = tiers.find((t) => t.key === selectedTier);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12 sm:py-16">
        {/* Back link */}
        <Link
          href="/catalog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-navy/60 transition-colors hover:text-navy"
        >
          <ArrowLeft className="size-4" />
          Back to Catalog
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image area */}
          <div
            className="relative aspect-[3/4] overflow-hidden rounded-3xl"
            style={{ backgroundColor: template.color }}
          >
            {/* Decorative letter */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[12rem] font-accent opacity-10">
                {template.name.charAt(0)}
              </span>
            </div>

            {/* Featured badge */}
            {template.isFeatured && (
              <div className="absolute top-6 right-6">
                <span className="inline-block rounded-full bg-gold px-4 py-1.5 text-xs font-bold text-navy">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <span className="inline-block rounded-full bg-cream px-4 py-1.5 text-xs font-semibold text-navy mb-4">
                {template.categoryName}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-navy">
                {template.name}
              </h1>
              <p className="mt-4 text-base text-navy/60 leading-relaxed">
                {template.description}
              </p>
            </div>

            {/* Tier pricing cards */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy/40">
                Choose your quality tier
              </h2>
              <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Quality tier">
                {tiers.map((tier, i) => {
                  const isSelected = selectedTier === tier.key;
                  const isPopular = i === 1;
                  return (
                    <button
                      key={tier.key}
                      onClick={() => setSelectedTier(tier.key)}
                      role="radio"
                      aria-checked={isSelected}
                      className={cn(
                        "relative rounded-3xl p-5 text-left transition-all",
                        isSelected
                          ? "bg-navy text-cream ring-4 ring-gold/30 shadow-lg"
                          : "bg-cream text-navy hover:shadow-md hover:-translate-y-0.5"
                      )}
                    >
                      {isPopular && (
                        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-0.5 text-[10px] font-bold text-navy uppercase tracking-wider">
                          Popular
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">{tier.name}</span>
                        {isSelected && (
                          <div className="flex size-5 items-center justify-center rounded-full bg-gold">
                            <Check className="size-3 text-navy" />
                          </div>
                        )}
                      </div>
                      <p className={cn(
                        "mt-2 text-2xl font-bold",
                        isSelected ? "text-gold" : "text-navy"
                      )}>
                        {formatCurrency(tier.price)}
                      </p>
                      <p className={cn(
                        "text-xs mt-0.5",
                        isSelected ? "text-cream/60" : "text-navy/50"
                      )}>
                        {tier.material}
                      </p>
                      <ul className="mt-3 space-y-1">
                        {tier.features.slice(0, 3).map((feature) => (
                          <li
                            key={feature}
                            className={cn(
                              "flex items-start gap-1.5 text-[11px]",
                              isSelected ? "text-cream/70" : "text-navy/60"
                            )}
                          >
                            <Sparkles className={cn(
                              "size-3 mt-0.5 shrink-0",
                              isSelected ? "text-gold" : "text-coral"
                            )} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/create/template?selected=${template.slug}`}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-navy hover:bg-gold-dark shadow-lg shadow-gold/25 transition-all hover:shadow-xl hover:shadow-gold/35 hover:-translate-y-0.5"
              >
                Start Customizing
                {selectedTierData && (
                  <span className="ml-2 text-navy/60">
                    - {formatCurrency(selectedTierData.price)}
                  </span>
                )}
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-full border-2 border-navy/20 px-6 py-3.5 text-sm font-medium text-navy hover:bg-navy hover:text-cream transition-all"
              >
                Back to Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
