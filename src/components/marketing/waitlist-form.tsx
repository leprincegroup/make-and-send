"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export function WaitlistForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isDark = variant === "dark"

  return (
    <form
      className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        type="email"
        placeholder="you@company.com"
        className={`h-13 flex-1 rounded-full border-2 px-5 text-base ${
          isDark
            ? "border-white/20 bg-white/10 text-cream placeholder:text-cream/50 focus-visible:border-gold focus-visible:ring-gold/30"
            : "border-navy/15 bg-white text-navy placeholder:text-navy/40 focus-visible:border-gold focus-visible:ring-gold/30"
        }`}
        aria-label="Email address"
      />
      <Button
        type="submit"
        className="h-13 rounded-full bg-gold px-7 text-base font-semibold text-navy hover:bg-gold-dark shadow-lg shadow-gold/25 transition-all hover:shadow-xl hover:shadow-gold/35 hover:-translate-y-0.5"
      >
        Join the Waitlist
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </form>
  )
}
