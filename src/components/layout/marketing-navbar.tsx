"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";

export function MarketingNavbar({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const isDark = variant === "dark";

  return (
    <header className={`sticky top-0 z-40 w-full transition-colors ${
      isDark
        ? "bg-navy/95 backdrop-blur-sm border-b border-white/10"
        : "bg-cream/95 backdrop-blur-sm border-b border-navy/5"
    }`}>
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center">
          <Logo
            className="h-8 w-auto"
            color={isDark ? "#F5F0E8" : "#1B1F3B"}
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isDark
                    ? "text-cream/70 hover:text-cream hover:bg-white/10"
                    : "text-navy/60 hover:text-navy hover:bg-navy/5"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex">
          <Link
            href="/create"
            className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-navy hover:bg-gold-dark shadow-lg shadow-gold/20 transition-all hover:shadow-xl hover:shadow-gold/30 hover:-translate-y-0.5"
          >
            Design Yours
          </Link>
        </div>

        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={`inline-flex size-10 items-center justify-center rounded-lg transition-colors ${isDark ? "text-cream hover:bg-white/10" : "text-navy hover:bg-navy/5"}`}
            >
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-navy text-cream border-navy">
              <SheetHeader>
                <SheetTitle className="text-cream">{SITE_NAME}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 mt-6" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex w-full rounded-xl px-4 py-3 text-base font-medium text-cream/80 transition-colors hover:bg-white/10 hover:text-cream"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6 px-2">
                  <Link
                    href="/create"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-gold-dark transition-all"
                  >
                    Design Yours
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
