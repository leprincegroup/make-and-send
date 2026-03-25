"use client";

import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

interface TemplateCardProps {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  categoryName: string;
  basePrice: number;
  isFeatured: boolean;
  color: string;
}

export function TemplateCard({
  name,
  slug,
  categoryName,
  basePrice,
  isFeatured,
  color,
}: TemplateCardProps) {
  return (
    <Link
      href={`/template/${slug}`}
      className="group relative overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]"
    >
      <div
        className="relative aspect-[3/4] w-full"
        style={{ backgroundColor: color }}
      >
        {/* Decorative letter */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl font-accent opacity-10">{name.charAt(0)}</span>
        </div>

        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-4 right-4">
            <span className="inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy">
              Featured
            </span>
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-6 pt-16">
          <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-navy mb-2">
            {categoryName}
          </span>
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="text-sm text-white/80">From {formatCurrency(basePrice)}</p>
        </div>
      </div>
    </Link>
  );
}
