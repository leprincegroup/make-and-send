"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useConfiguratorStore,
  type OrderPerson,
} from "@/stores/configurator-store";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Loader2,
  Eye,
  Glasses,
  Shirt,
  Smile,
  Palette,
  Hand,
  ImageOff,
} from "lucide-react";
import type { PreviewResult } from "@/types/preview";

type PreviewMap = Record<string, PreviewResult>;
type LoadingMap = Record<string, boolean>;
type ErrorMap = Record<string, string | null>;

function PreviewCard({
  person,
  index,
  preview,
  isLoading,
  error,
  onGenerate,
}: {
  person: OrderPerson;
  index: number;
  preview: PreviewResult | null;
  isLoading: boolean;
  error: string | null;
  onGenerate: () => void;
}) {
  return (
    <div className="rounded-3xl bg-white border border-navy/5 p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex size-7 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-navy">
          {index + 1}
        </div>
        <span className="text-sm font-semibold text-navy">
          {person.recipientName || `Person ${index + 1}`}
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Left: uploaded photo */}
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-navy/40">
            Your Photo
          </p>
          {person.photoUrl ? (
            <div className="relative aspect-square w-full max-w-[240px] overflow-hidden rounded-2xl border-2 border-navy/10">
              <img
                src={person.photoUrl}
                alt={person.photoName || "Uploaded photo"}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          ) : (
            <div className="flex aspect-square w-full max-w-[240px] items-center justify-center rounded-2xl border-2 border-dashed border-navy/15 bg-cream/50">
              <ImageOff className="size-8 text-navy/20" />
            </div>
          )}
        </div>

        {/* Right: AI analysis or generate button */}
        <div className="flex flex-col">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-navy/40">
            Bobblehead Preview
          </p>

          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onRetry={onGenerate} />
          ) : preview ? (
            <AnalysisDisplay analysis={preview.analysis} />
          ) : (
            <GeneratePrompt onGenerate={onGenerate} />
          )}
        </div>
      </div>

      {/* Generated image and prompt area */}
      {preview && (
        <div className="mt-5">
          {/* AI-generated bobblehead image */}
          {preview.imageUrl ? (
            <div className="mb-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-navy/40">
                AI-Generated Bobblehead
              </p>
              <div className="relative aspect-square w-full max-w-[320px] mx-auto overflow-hidden rounded-2xl border-2 border-gold/20 shadow-lg">
                <img
                  src={preview.imageUrl}
                  alt="AI-generated bobblehead preview"
                  className="absolute inset-0 size-full object-contain bg-white"
                />
              </div>
            </div>
          ) : (
            <div className="mb-4 flex items-center justify-center rounded-2xl border-2 border-dashed border-navy/10 bg-gradient-to-br from-coral/5 to-gold/5 p-8">
              <div className="text-center">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-gold/20">
                  <Sparkles className="size-5 text-gold-dark" />
                </div>
                <p className="text-sm font-semibold text-navy/60">
                  Image generation unavailable
                </p>
                <p className="mt-1 text-xs text-navy/40">
                  The preview prompt is shown below
                </p>
              </div>
            </div>
          )}

          <div className="rounded-2xl bg-cream/70 p-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-navy/40">
              Preview Description
            </p>
            <p className="text-sm leading-relaxed text-navy/70">
              {preview.prompt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-coral/5 to-gold/5 p-6">
      <div className="relative">
        <div className="size-16 rounded-full border-4 border-gold/20 border-t-gold animate-spin" />
        <Sparkles className="absolute inset-0 m-auto size-6 text-gold animate-pulse" />
      </div>
      <p className="mt-4 text-sm font-semibold text-navy/60">
        Generating your bobblehead...
      </p>
      <p className="mt-1 text-xs text-navy/40">
        Our AI is analyzing your photo and creating a preview
      </p>
    </div>
  );
}

function ErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-coral/5 p-6">
      <p className="text-sm text-coral">{error}</p>
      <button
        onClick={onRetry}
        className="mt-3 rounded-full bg-coral/10 px-4 py-2 text-xs font-semibold text-coral hover:bg-coral/20 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

function GeneratePrompt({ onGenerate }: { onGenerate: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-navy/10 bg-cream/30 p-6">
      <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-gold/10">
        <Eye className="size-5 text-gold-dark" />
      </div>
      <p className="text-sm font-medium text-navy/60">
        Ready to preview your bobblehead
      </p>
      <button
        onClick={onGenerate}
        className="mt-4 flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy shadow-md shadow-gold/20 hover:bg-gold-dark transition-all"
      >
        <Sparkles className="size-4" />
        Generate Preview
      </button>
    </div>
  );
}

function AnalysisDisplay({
  analysis,
}: {
  analysis: PreviewResult["analysis"];
}) {
  const details = [
    { icon: Smile, label: "Appearance", value: analysis.appearance },
    { icon: Palette, label: "Hair", value: analysis.hairStyle },
    { icon: Eye, label: "Features", value: analysis.facialFeatures },
    {
      icon: Glasses,
      label: "Glasses",
      value: analysis.glasses ? "Yes" : "No",
    },
    { icon: Shirt, label: "Outfit", value: analysis.outfit },
    { icon: Hand, label: "Pose", value: analysis.suggestedPose },
  ];

  return (
    <div className="flex-1 space-y-2.5">
      {details.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-start gap-2.5">
          <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-cream">
            <Icon className="size-3.5 text-navy/40" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-navy/40">
              {label}
            </p>
            <p className="text-sm text-navy/70">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PreviewPage() {
  const router = useRouter();

  const people = useConfiguratorStore((s) => s.people);
  const previewData = useConfiguratorStore((s) => s.previewData);
  const setPreviewData = useConfiguratorStore((s) => s.setPreviewData);
  const setStep = useConfiguratorStore((s) => s.setStep);

  const [loadingMap, setLoadingMap] = useState<LoadingMap>({});
  const [errorMap, setErrorMap] = useState<ErrorMap>({});

  // Initialize local preview state from store
  const [localPreviews, setLocalPreviews] = useState<PreviewMap>(
    previewData || {}
  );

  useEffect(() => {
    setStep(2);
  }, [setStep]);

  // Redirect if no people have photos
  useEffect(() => {
    const hasPhoto = people.some((p) => p.photoUrl);
    if (!hasPhoto && people.length > 0) {
      router.push("/create/photo");
    }
  }, [people, router]);

  const handleGenerate = useCallback(
    async (person: OrderPerson) => {
      setLoadingMap((prev) => ({ ...prev, [person.id]: true }));
      setErrorMap((prev) => ({ ...prev, [person.id]: null }));

      try {
        const res = await fetch("/api/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            photoUrl: person.photoUrl,
            recipientName: person.recipientName,
            plaqueText: person.plaqueText,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Preview generation failed");
        }

        const result = data as PreviewResult;
        setLocalPreviews((prev) => {
          const next = { ...prev, [person.id]: result };
          setPreviewData(next);
          return next;
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setErrorMap((prev) => ({ ...prev, [person.id]: message }));
      } finally {
        setLoadingMap((prev) => ({ ...prev, [person.id]: false }));
      }
    },
    [setPreviewData]
  );

  const handleGenerateAll = useCallback(() => {
    const peopleWithPhotos = people.filter((p) => p.photoUrl);
    for (const person of peopleWithPhotos) {
      if (!localPreviews[person.id]) {
        handleGenerate(person);
      }
    }
  }, [people, localPreviews, handleGenerate]);

  const handleContinue = useCallback(() => {
    setStep(3);
    router.push("/create/checkout");
  }, [setStep, router]);

  const handleBack = useCallback(() => {
    setStep(1);
    router.push("/create/photo");
  }, [setStep, router]);

  const peopleWithPhotos = people.filter((p) => p.photoUrl);
  const allPreviewed = peopleWithPhotos.every(
    (p) => localPreviews[p.id] != null
  );
  const anyLoading = Object.values(loadingMap).some(Boolean);

  return (
    <div className="space-y-6 sm:space-y-8 pb-24">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">
          Preview your{" "}
          <span className="font-accent text-coral italic">bobbleheads</span>
        </h1>
        <p className="mt-2 text-sm text-navy/60">
          See what your custom bobbleheads will look like before ordering
        </p>
      </div>

      {/* Generate All button */}
      {peopleWithPhotos.length > 1 && !allPreviewed && (
        <div className="flex justify-center">
          <button
            onClick={handleGenerateAll}
            disabled={anyLoading}
            className={cn(
              "flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all",
              anyLoading
                ? "bg-navy/10 text-navy/30 cursor-not-allowed"
                : "bg-gold text-navy hover:bg-gold-dark shadow-md shadow-gold/20"
            )}
          >
            {anyLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                Generate All Previews
              </>
            )}
          </button>
        </div>
      )}

      {/* Preview cards */}
      <div className="space-y-6">
        {peopleWithPhotos.map((person, i) => (
          <PreviewCard
            key={person.id}
            person={person}
            index={i}
            preview={localPreviews[person.id] || null}
            isLoading={loadingMap[person.id] || false}
            error={errorMap[person.id] || null}
            onGenerate={() => handleGenerate(person)}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-full border-2 border-navy/20 px-5 py-2.5 text-sm font-medium text-navy hover:bg-navy hover:text-cream transition-all"
        >
          <ArrowLeft className="size-4" />
          Adjust Photos
        </button>

        <button
          onClick={handleContinue}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all",
            "bg-gold text-navy hover:bg-gold-dark shadow-lg shadow-gold/25"
          )}
        >
          Looks Great!
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
