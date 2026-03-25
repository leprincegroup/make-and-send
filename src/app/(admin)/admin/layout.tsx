import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { SITE_NAME } from "@/lib/constants";
import {
  LayoutDashboard,
  ShoppingCart,
  Image,
  Palette,
  Shield,
} from "lucide-react";

export const metadata = {
  title: `Admin | ${SITE_NAME}`,
  description: "Make & Send admin panel",
};

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Proofs", href: "/admin/proofs", icon: Image },
  { label: "Templates", href: "/admin/templates", icon: Palette },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simple auth: check cookie or query param
  // In production this would be replaced by proper session-based auth
  const cookieStore = await cookies();
  const hasAuthCookie = cookieStore.get("admin_key")?.value === "admin123";

  // If the cookie is not set we cannot check the query param in a layout
  // (layouts don't receive searchParams). Instead, the login gate is
  // handled by a thin middleware-like check in each page that sets the
  // cookie on first visit with ?key=admin123. See the helper below.

  if (!hasAuthCookie) {
    // Render a simple login gate
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="w-full max-w-sm rounded-2xl border border-navy/[0.08] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
          <div className="mb-6 flex items-center justify-center">
            <Logo className="h-8 w-auto text-navy" />
          </div>
          <h1 className="mb-2 text-center text-xl font-bold text-navy">
            Admin Access
          </h1>
          <p className="mb-6 text-center text-sm text-navy/60">
            Enter the admin key to continue
          </p>
          <form action="/admin/api/login" method="GET">
            <input
              type="password"
              name="key"
              placeholder="Admin key"
              required
              className="mb-4 w-full rounded-lg border border-navy/[0.08] bg-cream/40 px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-navy-light"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-navy text-cream">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
          <Link
            href="/admin"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label={`${SITE_NAME} admin home`}
          >
            <Logo className="h-6 w-auto" color="oklch(0.97 0.005 80)" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-cream/70 transition-colors hover:bg-white/10 hover:text-cream"
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Role indicator */}
        <div className="border-t border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-gold/20">
              <Shield className="size-4 text-gold" />
            </div>
            <div>
              <p className="text-xs font-semibold text-cream">Admin</p>
              <p className="text-xs text-cream/50">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-cream/40">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          {children}
        </div>
      </main>
    </div>
  );
}
