"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useConfiguratorStore,
  type ShippingAddress,
  emptyAddress,
} from "@/stores/configurator-store";
import { PRODUCT, BULK_DISCOUNTS } from "@/lib/constants";
import { formatCurrency, cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Gift,
  MapPin,
  Camera,
  User,
  Loader2,
  Lock,
  Truck,
  Users,
} from "lucide-react";
import { MiniSparkle } from "@/components/shared/illustrations";

function AddressForm({
  address,
  onChange,
  idPrefix,
}: {
  address: ShippingAddress;
  onChange: (updates: Partial<ShippingAddress>) => void;
  idPrefix: string;
}) {
  const inputClass =
    "h-10 rounded-xl border-navy/10 bg-cream/30 text-sm text-navy placeholder:text-navy/30 focus-visible:border-gold focus-visible:ring-gold/30";

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${idPrefix}-firstName`}
            className="mb-1 block text-xs font-medium text-navy/50"
          >
            First name
          </label>
          <Input
            id={`${idPrefix}-firstName`}
            value={address.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            placeholder="John"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor={`${idPrefix}-lastName`}
            className="mb-1 block text-xs font-medium text-navy/50"
          >
            Last name
          </label>
          <Input
            id={`${idPrefix}-lastName`}
            value={address.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            placeholder="Doe"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor={`${idPrefix}-address`}
          className="mb-1 block text-xs font-medium text-navy/50"
        >
          Address
        </label>
        <Input
          id={`${idPrefix}-address`}
          value={address.address}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder="123 Main Street"
          className={inputClass}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label
            htmlFor={`${idPrefix}-city`}
            className="mb-1 block text-xs font-medium text-navy/50"
          >
            City
          </label>
          <Input
            id={`${idPrefix}-city`}
            value={address.city}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="New York"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor={`${idPrefix}-state`}
            className="mb-1 block text-xs font-medium text-navy/50"
          >
            State
          </label>
          <Input
            id={`${idPrefix}-state`}
            value={address.state}
            onChange={(e) => onChange({ state: e.target.value })}
            placeholder="NY"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor={`${idPrefix}-zip`}
            className="mb-1 block text-xs font-medium text-navy/50"
          >
            ZIP
          </label>
          <Input
            id={`${idPrefix}-zip`}
            value={address.zip}
            onChange={(e) => onChange({ zip: e.target.value })}
            placeholder="10001"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const people = useConfiguratorStore((s) => s.people);
  const isGift = useConfiguratorStore((s) => s.isGift);
  const giftMessage = useConfiguratorStore((s) => s.giftMessage);
  const shipToOneAddress = useConfiguratorStore((s) => s.shipToOneAddress);
  const sharedAddress = useConfiguratorStore((s) => s.sharedAddress);
  const buyerEmail = useConfiguratorStore((s) => s.buyerEmail);
  const setIsGift = useConfiguratorStore((s) => s.setIsGift);
  const setGiftMessage = useConfiguratorStore((s) => s.setGiftMessage);
  const setShipToOneAddress = useConfiguratorStore((s) => s.setShipToOneAddress);
  const setSharedAddress = useConfiguratorStore((s) => s.setSharedAddress);
  const setBuyerEmail = useConfiguratorStore((s) => s.setBuyerEmail);
  const updatePerson = useConfiguratorStore((s) => s.updatePerson);
  const setStep = useConfiguratorStore((s) => s.setStep);

  useEffect(() => {
    setStep(3);
  }, [setStep]);

  // Redirect if no people with photos
  useEffect(() => {
    const hasPhoto = people.some((p) => p.photoUrl);
    if (!hasPhoto && people.length > 0) {
      router.push("/create/photo");
    }
  }, [people, router]);

  const handleBack = useCallback(() => {
    setStep(2);
    router.push("/create/preview");
  }, [setStep, router]);

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

  // Validation
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail);
  const isSharedAddressValid =
    !shipToOneAddress ||
    (sharedAddress.firstName.trim() !== "" &&
      sharedAddress.address.trim() !== "" &&
      sharedAddress.city.trim() !== "" &&
      sharedAddress.state.trim() !== "" &&
      sharedAddress.zip.trim() !== "");
  const areIndividualAddressesValid =
    shipToOneAddress ||
    people.every(
      (p) =>
        p.shippingAddress.firstName.trim() !== "" &&
        p.shippingAddress.address.trim() !== "" &&
        p.shippingAddress.city.trim() !== "" &&
        p.shippingAddress.state.trim() !== "" &&
        p.shippingAddress.zip.trim() !== ""
    );
  const canCheckout =
    isEmailValid && isSharedAddressValid && areIndividualAddressesValid;

  const handleCheckout = useCallback(async () => {
    if (!canCheckout) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          people: people.map((p) => ({
            recipientName: p.recipientName,
            plaqueText: p.plaqueText,
            photoUrl: p.photoUrl,
            photoName: p.photoName,
            shippingAddress: shipToOneAddress ? undefined : p.shippingAddress,
          })),
          isGift,
          giftMessage,
          shipToOneAddress,
          sharedAddress: shipToOneAddress ? sharedAddress : undefined,
          buyerEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  }, [
    canCheckout,
    people,
    isGift,
    giftMessage,
    shipToOneAddress,
    sharedAddress,
    buyerEmail,
  ]);

  return (
    <div className="space-y-6 sm:space-y-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-navy">
          <span className="font-accent text-coral italic">Checkout</span>
        </h1>
        <p className="mt-2 text-sm text-navy/60">
          Review your order and complete your purchase
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Left: forms */}
        <div className="space-y-5">
          {/* Order items preview */}
          <div className="rounded-3xl bg-white border border-navy/5 p-5 shadow-sm">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy/40">
              Your Bobbleheads ({quantity})
            </h2>
            <div className="space-y-2">
              {people.map((person, i) => (
                <div
                  key={person.id}
                  className="flex items-center gap-3 rounded-2xl bg-cream/50 p-3"
                >
                  {person.photoUrl ? (
                    <div className="size-10 shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={person.photoUrl}
                        alt={person.photoName}
                        className="size-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-cream">
                      <Camera className="size-4 text-navy/30" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-navy">
                      {person.recipientName || `Person ${i + 1}`}
                    </p>
                    {person.plaqueText && (
                      <p className="truncate text-xs text-navy/40">
                        &ldquo;{person.plaqueText}&rdquo;
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-sm font-medium text-navy/50">
                    {formatCurrency(unitPrice)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-navy/5 pt-3">
              <span className="text-xs text-navy/40">
                Custom Bobblehead
              </span>
              <button
                onClick={handleBack}
                className="text-xs font-medium text-coral hover:underline"
              >
                Edit order
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="rounded-3xl bg-white border border-navy/5 p-5 shadow-sm">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy/40">
              Your Email
            </h2>
            <Input
              type="email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-10 rounded-xl border-navy/10 bg-cream/30 text-sm text-navy placeholder:text-navy/30 focus-visible:border-gold focus-visible:ring-gold/30"
            />
            <p className="mt-1.5 text-[10px] text-navy/30">
              We&apos;ll send order updates and your digital proof here
            </p>
          </div>

          {/* Shipping */}
          <div className="rounded-3xl bg-white border border-navy/5 p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-navy/5">
                <Truck className="size-4.5 text-navy/60" />
              </div>
              <h2 className="text-sm font-semibold text-navy">Shipping</h2>
            </div>

            {/* Toggle: one address vs individual */}
            {people.length > 1 && (
              <div className="mb-5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShipToOneAddress(true)}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-2.5 text-xs font-medium transition-all",
                    shipToOneAddress
                      ? "border-gold bg-gold/10 text-navy"
                      : "border-navy/10 text-navy/50 hover:border-navy/20"
                  )}
                >
                  <MapPin className="size-3.5" />
                  One address
                </button>
                <button
                  onClick={() => setShipToOneAddress(false)}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-2.5 text-xs font-medium transition-all",
                    !shipToOneAddress
                      ? "border-gold bg-gold/10 text-navy"
                      : "border-navy/10 text-navy/50 hover:border-navy/20"
                  )}
                >
                  <Users className="size-3.5" />
                  Individual addresses
                </button>
              </div>
            )}

            {shipToOneAddress ? (
              <div>
                <p className="mb-3 text-xs text-navy/40">
                  All bobbleheads ship to this address
                </p>
                <AddressForm
                  address={sharedAddress}
                  onChange={(updates) => setSharedAddress(updates)}
                  idPrefix="shared"
                />
              </div>
            ) : (
              <div className="space-y-5">
                {people.map((person, i) => (
                  <div key={person.id}>
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex size-6 items-center justify-center rounded-full bg-gold/20 text-[10px] font-bold text-navy">
                        {i + 1}
                      </div>
                      <span className="text-xs font-semibold text-navy">
                        {person.recipientName || `Person ${i + 1}`}
                      </span>
                    </div>
                    <AddressForm
                      address={person.shippingAddress}
                      onChange={(updates) =>
                        updatePerson(person.id, {
                          shippingAddress: {
                            ...person.shippingAddress,
                            ...updates,
                          },
                        })
                      }
                      idPrefix={`person-${i}`}
                    />
                    {i < people.length - 1 && (
                      <div className="mt-5 border-t border-navy/5" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gift option */}
          <div className="rounded-3xl bg-white border border-navy/5 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-gold/10">
                  <Gift className="size-4.5 text-gold-dark" />
                </div>
                <h2 className="text-sm font-semibold text-navy">
                  Gift Option
                </h2>
              </div>
              <button
                onClick={() => setIsGift(!isGift)}
                className={cn(
                  "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors",
                  isGift ? "bg-gold" : "bg-navy/15"
                )}
                role="switch"
                aria-checked={isGift}
                aria-label="Toggle gift option"
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block size-5 rounded-full bg-white shadow-sm ring-0 transition-transform mt-1",
                    isGift ? "translate-x-6 ml-0" : "translate-x-1"
                  )}
                />
              </button>
            </div>
            {isGift && (
              <div className="mt-4">
                <label
                  htmlFor="giftMessage"
                  className="mb-1 block text-xs font-medium text-navy/50"
                >
                  Gift message
                </label>
                <textarea
                  id="giftMessage"
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Write a personal message for the recipient..."
                  rows={3}
                  className="w-full rounded-xl border border-navy/10 bg-cream/30 px-4 py-3 text-sm text-navy placeholder:text-navy/30 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30"
                />
              </div>
            )}
          </div>

          {/* Error message */}
          {error && (
            <div className="rounded-2xl bg-coral/10 p-4 text-sm text-coral">
              {error}
            </div>
          )}
        </div>

        {/* Right: order summary (desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-20 rounded-3xl bg-navy p-6 text-cream">
            <div className="relative">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-cream/40">
                Order Summary
              </h2>
              <MiniSparkle className="absolute -top-1 -right-1 size-5 text-gold/40" />
            </div>

            {/* People thumbnails */}
            <div className="mb-4 space-y-2">
              {people.slice(0, 3).map((person, i) => (
                <div key={person.id} className="flex items-center gap-2">
                  {person.photoUrl ? (
                    <div className="size-8 shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={person.photoUrl}
                        alt={person.photoName}
                        className="size-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <User className="size-4 text-cream/40" />
                    </div>
                  )}
                  <span className="truncate text-sm text-cream/70">
                    {person.recipientName || `Person ${i + 1}`}
                  </span>
                </div>
              ))}
              {people.length > 3 && (
                <p className="text-xs text-cream/40 pl-10">
                  +{people.length - 3} more
                </p>
              )}
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-cream/50">Custom Bobblehead</span>
                <span>{formatCurrency(unitPrice)}/each</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream/50">Quantity</span>
                <span>{quantity}</span>
              </div>
              {isGift && (
                <div className="flex justify-between">
                  <span className="text-cream/50">Gift wrap</span>
                  <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold text-gold">
                    Included
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-cream/50">
                  {formatCurrency(unitPrice)} x {quantity}
                </span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-mint">
                  <span>
                    Bulk discount ({(discount * 100).toFixed(0)}%)
                  </span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-cream/50">Shipping</span>
                <span className="font-medium text-mint">Free</span>
              </div>
              <div className="flex justify-between pt-2 text-xl font-bold">
                <span>Total</span>
                <span className="text-gold">{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={!canCheckout || isLoading}
              className={cn(
                "mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all",
                canCheckout && !isLoading
                  ? "bg-gold text-navy hover:bg-gold-dark shadow-lg shadow-gold/25"
                  : "bg-white/10 text-cream/30 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="size-4" />
                  Place Order
                </>
              )}
            </button>

            {!canCheckout && !isLoading && (
              <p className="mt-2 text-center text-[10px] text-cream/30">
                {!isEmailValid
                  ? "Enter a valid email to continue"
                  : "Complete shipping details to continue"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: back button */}
      <div className="lg:hidden">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-full border-2 border-navy/20 px-5 py-2.5 text-sm font-medium text-navy hover:bg-navy hover:text-cream transition-all"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>
      </div>

      {/* Mobile fixed bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-navy/10 bg-white/95 backdrop-blur-sm px-5 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-navy/50">
              {quantity} {quantity === 1 ? "bobblehead" : "bobbleheads"}
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
            onClick={handleCheckout}
            disabled={!canCheckout || isLoading}
            className={cn(
              "rounded-full px-6 py-3 text-sm font-semibold transition-all",
              canCheckout && !isLoading
                ? "bg-gold text-navy hover:bg-gold-dark shadow-lg shadow-gold/25"
                : "bg-navy/10 text-navy/30 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <Lock className="mr-1.5 inline size-3.5" />
                Place Order
              </>
            )}
          </button>
        </div>
      </div>

      {/* Desktop: back button */}
      <div className="hidden lg:block sticky bottom-0 -mx-5 sm:-mx-8 border-t border-navy/5 bg-white/95 px-5 sm:px-8 py-4 backdrop-blur-sm">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-full border-2 border-navy/20 px-5 py-2.5 text-sm font-medium text-navy hover:bg-navy hover:text-cream transition-all"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>
      </div>
    </div>
  );
}
