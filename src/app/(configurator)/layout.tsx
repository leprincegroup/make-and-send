import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { ProgressStepper } from "@/components/configurator/progress-stepper";

export default function ConfiguratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Minimal header */}
      <header className="border-b border-navy/5">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 sm:px-8 py-4">
          <Link href="/" className="flex items-center shrink-0">
            <Logo className="h-7 w-auto" color="#1B1F3B" />
          </Link>
          <div className="flex-1 px-6">
            <ProgressStepper />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 sm:px-8 py-10 sm:py-14">
        {children}
      </main>
    </div>
  );
}
