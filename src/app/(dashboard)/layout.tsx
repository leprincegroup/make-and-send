import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { SITE_NAME } from "@/lib/constants";
import { MiniSparkle } from "@/components/shared/illustrations";

export const metadata = {
  title: `Dashboard | ${SITE_NAME}`,
  description: "Manage your Make & Send orders",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream/40">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-gold/20 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-navy transition-opacity hover:opacity-80"
            aria-label={`${SITE_NAME} home`}
          >
            <Logo className="h-7 w-auto" />
          </Link>

          <div className="flex items-center gap-3">
            <MiniSparkle className="h-4 w-4 text-gold" />
            <span className="text-sm text-navy/60">My Orders</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
    </div>
  );
}
