import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/shared/logo";
import { SITE_NAME } from "@/lib/constants";
import {
  LayoutDashboard,
  ShoppingCart,
  Image,
  Palette,
  Shield,
  LogOut,
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

async function signOut() {
  "use server";

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // For now, any authenticated user is treated as admin.
  // Role-based checks can be added later via user_metadata or a DB role column.

  const displayName =
    user.user_metadata?.full_name || user.email || "Admin";

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

        {/* User info + sign out */}
        <div className="border-t border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-gold/20">
              <Shield className="size-4 text-gold" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-cream">
                {displayName}
              </p>
              <p className="text-xs text-cream/50">Admin</p>
            </div>
          </div>
          <form action={signOut} className="mt-3">
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-cream/50 transition-colors hover:bg-white/10 hover:text-cream"
            >
              <LogOut className="size-3.5" />
              Sign out
            </button>
          </form>
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
