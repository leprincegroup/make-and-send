import Link from "next/link";
import { Logo } from "@/components/shared/logo";

const footerLinks = {
  Product: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "For Teams", href: "/for-teams" },
    { label: "For Sales", href: "/for-sales" },
    { label: "Start Creating", href: "/create" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Support: [
    { label: "FAQ", href: "/pricing#faq" },
    { label: "Track Order", href: "/dashboard/orders" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Log in", href: "/login" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo className="h-8 w-auto" color="#F5F0E8" />
            <p className="text-sm text-cream/60 leading-relaxed max-w-xs">
              Custom bobbleheads that close deals and celebrate teams. The gift that stays on their desk.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/60 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} Make & Send. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-cream/40 hover:text-cream/70 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-cream/40 hover:text-cream/70 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
