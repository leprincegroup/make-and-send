"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useConfiguratorStore,
  createEmptyPerson,
  type OrderPerson,
} from "@/stores/configurator-store";
import { PRODUCT, BULK_DISCOUNTS } from "@/lib/constants";
import { formatCurrency, cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  X,
  User,
  Sun,
  Maximize,
  Percent,
  ArrowRight,
  UserPlus,
  Camera,
  Loader2,
} from "lucide-react";

function PersonCard({
  person,
  index,
  onUpdate,
  onRemove,
  canRemove,
}: {
  person: OrderPerson;
  index: number;
  onUpdate: (id: string, updates: Partial<Omit<OrderPerson, "id">>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Clean up local preview blob URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      setUploadError(null);

      // Show instant local preview
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);

      // Upload to server for persistent storage
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Upload failed");
        }

        const { url } = await res.json();
        onUpdate(person.id, { photoUrl: url, photoName: file.name });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Upload failed";
        setUploadError(message);
        // Clear the preview since the upload failed
        setPreviewUrl(null);
        URL.revokeObjectURL(localUrl);
      } finally {
        setUploading(false);
      }
    },
    [person.id, onUpdate]
  );

  // Use the persisted URL from the store, or the local preview while uploading
  const displayUrl = person.photoUrl || previewUrl;

  return (
    <div className="rounded-3xl bg-white border border-navy/5 p-5 sm:p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-navy">
            {index + 1}
          </div>
          <span className="text-sm font-semibold text-navy">
            {person.recipientName || `Person ${index + 1}`}
          </span>
        </div>
        {canRemove && (
          <button
            onClick={() => onRemove(person.id)}
            className="flex size-7 items-center justify-center rounded-full text-navy/30 hover:bg-coral/10 hover:text-coral transition-colors"
            aria-label={`Remove person ${index + 1}`}
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
        {/* Photo upload */}
        <div>
          {displayUrl ? (
            <div className="relative">
              <div className="relative size-[140px] overflow-hidden rounded-2xl border-2 border-navy/10">
                <img
                  src={displayUrl}
                  alt={person.photoName}
                  className="absolute inset-0 size-full object-cover"
                />
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-navy/40">
                    <Loader2 className="size-6 text-white animate-spin" />
                  </div>
                )}
              </div>
              {!uploading && (
                <button
                  onClick={() => {
                    if (previewUrl) {
                      URL.revokeObjectURL(previewUrl);
                      setPreviewUrl(null);
                    }
                    onUpdate(person.id, { photoUrl: "", photoName: "" });
                  }}
                  className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-coral text-white shadow-sm transition-transform hover:scale-110"
                  aria-label="Remove photo"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex size-[140px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-navy/20 bg-cream/50 transition-all hover:border-navy/30 hover:bg-cream"
            >
              <Camera className="size-6 text-navy/40 mb-1" />
              <span className="text-xs font-medium text-navy/50">
                Add photo
              </span>
            </button>
          )}
          {uploadError && (
            <p className="mt-1.5 text-[11px] text-coral">{uploadError}</p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => handleFile(e.target.files)}
            className="hidden"
          />
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-navy/50">
              Recipient name
            </label>
            <Input
              value={person.recipientName}
              onChange={(e) =>
                onUpdate(person.id, { recipientName: e.target.value })
              }
              placeholder="e.g. Sarah Johnson"
              className="h-10 rounded-xl border-navy/10 bg-cream/30 text-sm text-navy placeholder:text-navy/30 focus-visible:border-gold focus-visible:ring-gold/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-navy/50">
              Plaque text <span className="text-navy/30">(optional)</span>
            </label>
            <Input
              value={person.plaqueText}
              onChange={(e) =>
                onUpdate(person.id, {
                  plaqueText: e.target.value.slice(0, 30),
                })
              }
              placeholder="e.g. World's Best Boss"
              maxLength={30}
              className="h-10 rounded-xl border-navy/10 bg-cream/30 text-sm text-navy placeholder:text-navy/30 focus-visible:border-gold focus-visible:ring-gold/30"
            />
            <span className="mt-0.5 block text-right text-[10px] text-navy/30">
              {person.plaqueText.length}/30
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreatePage() {
  const router = useRouter();

  const people = useConfiguratorStore((s) => s.people);
  const addPerson = useConfiguratorStore((s) => s.addPerson);
  const updatePerson = useConfiguratorStore((s) => s.updatePerson);
  const removePerson = useConfiguratorStore((s) => s.removePerson);
  const setStep = useConfiguratorStore((s) => s.setStep);

  useEffect(() => {
    setStep(1);
  }, [setStep]);

  // Add first person if empty
  useEffect(() => {
    if (people.length === 0) {
      addPerson(createEmptyPerson());
    }
  }, [people.length, addPerson]);

  const handleAddPerson = useCallback(() => {
    addPerson(createEmptyPerson());
  }, [addPerson]);

  const handleContinue = useCallback(() => {
    const hasPhoto = people.some((p) => p.photoUrl);
    if (hasPhoto) {
      setStep(2);
      router.push("/create/preview");
    }
  }, [people, setStep, router]);

  // Price calculation
  const quantity = people.length;
  const unitPrice = PRODUCT.price;
  const subtotal = unitPrice * quantity;
  const applicableDiscount = [...BULK_DISCOUNTS]
    .reverse()
    .find((d) => quantity >= d.minQuantity);
  const discount = applicableDiscount ? applicableDiscount.discount : 0;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;
  const hasPhoto = people.some((p) => p.photoUrl);

  return (
    <div className="space-y-6 sm:space-y-8 pb-24">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">
          Create your{" "}
          <span className="font-accent text-coral italic">bobbleheads</span>
        </h1>
        <p className="mt-2 text-sm text-navy/60">
          Add a photo for each person. We sculpt the rest.
        </p>
        <p className="mt-1 text-sm font-semibold text-navy">
          {formatCurrency(PRODUCT.price)} per bobblehead
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Left: People cards */}
        <div className="space-y-6">
          {/* People cards */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-navy/40">
                People ({people.length})
              </h2>
              {people.length >= 5 && discount > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gold/20 px-2.5 py-0.5 text-[10px] font-semibold text-navy">
                  <Percent className="size-3" />
                  {(discount * 100).toFixed(0)}% bulk discount applied
                </span>
              )}
            </div>
            <div className="space-y-4">
              {people.map((person, i) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  index={i}
                  onUpdate={updatePerson}
                  onRemove={removePerson}
                  canRemove={people.length > 1}
                />
              ))}
            </div>

            {/* Add another person */}
            <button
              onClick={handleAddPerson}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-navy/15 py-4 text-sm font-medium text-navy/50 transition-all hover:border-navy/30 hover:text-navy hover:bg-cream/50"
            >
              <UserPlus className="size-4" />
              Add another person
            </button>

            {/* Bulk discount hints */}
            {people.length < 5 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {BULK_DISCOUNTS.map((bd) => (
                  <span
                    key={bd.minQuantity}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium",
                      people.length >= bd.minQuantity
                        ? "bg-gold/20 text-navy"
                        : "bg-cream text-navy/30"
                    )}
                  >
                    <Percent className="size-2.5" />
                    {bd.minQuantity}+ people: {bd.label}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Photo guidelines */}
          <details className="rounded-2xl bg-cream/70 px-5 py-4 text-sm group">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-navy list-none [&::-webkit-details-marker]:hidden">
              Photo tips for best results
              <span className="text-navy/30 group-open:rotate-180 transition-transform">
                &#9660;
              </span>
            </summary>
            <ul className="mt-3 space-y-2 text-navy/60">
              <li className="flex items-start gap-2">
                <User className="size-4 mt-0.5 shrink-0 text-navy/40" />
                Clear photo — we sculpt the full body, outfit, and details
              </li>
              <li className="flex items-start gap-2">
                <Sun className="size-4 mt-0.5 shrink-0 text-navy/40" />
                Good, even lighting without harsh shadows
              </li>
              <li className="flex items-start gap-2">
                <Maximize className="size-4 mt-0.5 shrink-0 text-navy/40" />
                High resolution (at least 500x500 pixels)
              </li>
            </ul>
          </details>
        </div>

        {/* Right: Order summary (desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-20 rounded-3xl bg-navy p-6 text-cream">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-cream/40">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-cream/50">Custom Bobblehead</span>
                <span>{formatCurrency(unitPrice)}/each</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream/50">People</span>
                <span>{quantity}</span>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-cream/50">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-mint">
                  <span>Bulk ({(discount * 100).toFixed(0)}% off)</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 text-lg font-bold">
                <span>Total</span>
                <span className="text-gold">{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              onClick={handleContinue}
              disabled={!hasPhoto}
              className={cn(
                "mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all",
                hasPhoto
                  ? "bg-gold text-navy hover:bg-gold-dark shadow-lg shadow-gold/25"
                  : "bg-white/10 text-cream/30 cursor-not-allowed"
              )}
            >
              Continue to Preview
              <ArrowRight className="size-4" />
            </button>

            {!hasPhoto && (
              <p className="mt-2 text-center text-[10px] text-cream/30">
                Upload at least one photo to continue
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-navy/10 bg-white/95 backdrop-blur-sm px-5 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-navy/50">
              {quantity} {quantity === 1 ? "person" : "people"} &middot;{" "}
              {formatCurrency(unitPrice)}/each
            </p>
            <p className="text-lg font-bold text-navy">
              {formatCurrency(total)}
              {discount > 0 && (
                <span className="ml-1.5 text-xs font-medium text-mint">
                  {(discount * 100).toFixed(0)}% off
                </span>
              )}
            </p>
          </div>
          <button
            onClick={handleContinue}
            disabled={!hasPhoto}
            className={cn(
              "rounded-full px-6 py-3 text-sm font-semibold transition-all",
              hasPhoto
                ? "bg-gold text-navy hover:bg-gold-dark shadow-lg shadow-gold/25"
                : "bg-navy/10 text-navy/30 cursor-not-allowed"
            )}
          >
            Checkout
            <ArrowRight className="ml-1.5 inline size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
