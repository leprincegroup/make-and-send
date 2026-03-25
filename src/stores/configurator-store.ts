"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { MaterialTierKey } from "@/lib/constants";

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export const emptyAddress: ShippingAddress = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "US",
};

export interface OrderPerson {
  id: string;
  photoUrl: string;
  photoName: string;
  recipientName: string;
  plaqueText: string;
  shippingAddress: ShippingAddress;
}

interface ConfiguratorState {
  step: number;
  people: OrderPerson[];
  materialTier: MaterialTierKey;
  isGift: boolean;
  giftMessage: string;
  shipToOneAddress: boolean;
  sharedAddress: ShippingAddress;
  buyerEmail: string;
}

interface ConfiguratorActions {
  addPerson: (person: OrderPerson) => void;
  updatePerson: (id: string, updates: Partial<Omit<OrderPerson, "id">>) => void;
  removePerson: (id: string) => void;
  setMaterialTier: (tier: MaterialTierKey) => void;
  setIsGift: (isGift: boolean) => void;
  setGiftMessage: (message: string) => void;
  setShipToOneAddress: (value: boolean) => void;
  setSharedAddress: (address: Partial<ShippingAddress>) => void;
  setBuyerEmail: (email: string) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

const initialState: ConfiguratorState = {
  step: 1,
  people: [],
  materialTier: "STANDARD",
  isGift: false,
  giftMessage: "",
  shipToOneAddress: true,
  sharedAddress: { ...emptyAddress },
  buyerEmail: "",
};

export function createPersonId() {
  return `person_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function createEmptyPerson(): OrderPerson {
  return {
    id: createPersonId(),
    photoUrl: "",
    photoName: "",
    recipientName: "",
    plaqueText: "",
    shippingAddress: { ...emptyAddress },
  };
}

export const useConfiguratorStore = create<ConfiguratorState & ConfiguratorActions>()(
  persist(
    (set) => ({
      ...initialState,

      addPerson: (person) =>
        set((state) => ({ people: [...state.people, person] })),

      updatePerson: (id, updates) =>
        set((state) => ({
          people: state.people.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      removePerson: (id) =>
        set((state) => ({
          people: state.people.filter((p) => p.id !== id),
        })),

      setMaterialTier: (tier) => set({ materialTier: tier }),

      setIsGift: (isGift) => set({ isGift }),

      setGiftMessage: (message) => set({ giftMessage: message }),

      setShipToOneAddress: (value) => set({ shipToOneAddress: value }),

      setSharedAddress: (address) =>
        set((state) => ({
          sharedAddress: { ...state.sharedAddress, ...address },
        })),

      setBuyerEmail: (email) => set({ buyerEmail: email }),

      setStep: (step) => set({ step }),

      reset: () => set(initialState),
    }),
    {
      name: "configurator-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
