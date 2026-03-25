"use client";

import { useConfiguratorStore } from "@/stores/configurator-store";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const STEPS = [
  { label: "Create", path: "/create/photo" },
  { label: "Preview", path: "/create/preview" },
  { label: "Checkout", path: "/create/checkout" },
];

export function ProgressStepper() {
  const currentStep = useConfiguratorStore((s) => s.step);
  const setStep = useConfiguratorStore((s) => s.setStep);
  const router = useRouter();

  const handleStepClick = (stepNum: number, path: string) => {
    if (stepNum <= currentStep) {
      setStep(stepNum);
      router.push(path);
    }
  };

  return (
    <nav aria-label="Order progress" className="flex items-center justify-center gap-0">
      {STEPS.map((step, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;
        const isFuture = stepNum > currentStep;
        const isClickable = stepNum <= currentStep;

        return (
          <div key={step.label} className="flex items-center">
            {i > 0 && (
              <div
                className={cn(
                  "h-0.5 w-10 sm:w-16 lg:w-24",
                  isCompleted ? "bg-navy" : "bg-navy/10"
                )}
              />
            )}
            <button
              onClick={() => handleStepClick(stepNum, step.path)}
              disabled={!isClickable}
              className={cn(
                "flex items-center gap-2 rounded-full px-1 py-1 transition-all",
                isClickable && !isCurrent && "cursor-pointer hover:opacity-80",
                !isClickable && "cursor-default"
              )}
              aria-label={`Step ${stepNum}: ${step.label}`}
              aria-current={isCurrent ? "step" : undefined}
            >
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all",
                  isCompleted && "bg-navy text-cream",
                  isCurrent && "bg-gold text-navy",
                  isFuture && "bg-navy/10 text-navy/40"
                )}
              >
                {isCompleted ? <Check className="size-4" /> : stepNum}
              </div>
              <span
                className={cn(
                  "text-xs font-medium sm:inline",
                  isCompleted && "text-navy",
                  isCurrent && "text-navy font-semibold",
                  isFuture && "text-navy/40"
                )}
              >
                {step.label}
              </span>
            </button>
          </div>
        );
      })}
    </nav>
  );
}
