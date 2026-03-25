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
} from "@/components/ui/sheet";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";

export function MarketingNavbar({ variant: _variant = "dark" }: { variant?: "light" | "dark" } = {}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 pointer-events-none">
      <nav
        className="pointer-events-auto mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full bg-navy/90 px-3 pl-6 backdrop-blur-md shadow-lg shadow-black/10"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Logo className="h-6 w-auto" color="#F5F0E8" />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-cream/75 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA + Login */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/login"
            className="px-4 py-1.5 text-sm font-medium text-cream/60 transition-colors hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="/create"
            className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-2 text-sm font-semibold text-navy transition-all hover:bg-gold-dark hover:scale-[1.03] active:scale-[0.98]"
          >
            Start Creating
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex size-10 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-navy text-cream border-navy">
              <SheetHeader>
                <SheetTitle className="text-cream">{SITE_NAME}</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1 px-4" aria-label="Mobile navigation">
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
                <div className="mt-4 border-t border-white/10 pt-4">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex w-full rounded-xl px-4 py-3 text-base font-medium text-cream/60 transition-colors hover:bg-white/10 hover:text-cream"
                  >
                    Log in
                  </Link>
                </div>
                <div className="mt-4 px-2">
                  <Link
                    href="/create"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-gold-dark"
                  >
                    Start Creating
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
