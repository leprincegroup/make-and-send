export const SITE_NAME = "Make & Send";
export const SITE_DESCRIPTION =
  "Custom bobbleheads that close deals and celebrate teams. The sales outreach and employee recognition tool that sits on their desk, not in their trash.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://makeandsend.com";

export const PRODUCT = {
  name: "Custom Bobblehead",
  price: 129,
  description: "Hand-sculpted from your photo",
  material: "Hand-painted resin",
  features: [
    "Hand-sculpted from your photo",
    "Hand-painted details",
    "Premium resin material",
    "Custom branded plaque",
    "Premium gift-ready packaging",
    "Unlimited free revisions",
  ],
} as const;

// Keep for backward compat with existing code that references MATERIAL_TIERS
export const MATERIAL_TIERS = {
  STANDARD: { ...PRODUCT, name: "Standard" },
} as const;

export type MaterialTierKey = keyof typeof MATERIAL_TIERS;

export const BULK_DISCOUNTS = [
  { minQuantity: 5, discount: 0.1, label: "10% off" },
  { minQuantity: 10, discount: 0.15, label: "15% off" },
  { minQuantity: 25, discount: 0.2, label: "20% off" },
] as const;

export const OCCASIONS = [
  "Sales Outreach",
  "New Client Welcome",
  "Employee Birthdays",
  "Work Anniversaries",
  "Promotions",
  "Team Wins",
  "Client Retention",
] as const;

export const ORDER_STATUSES = {
  DRAFT: { label: "Draft", color: "gray" },
  PENDING_PAYMENT: { label: "Pending Payment", color: "yellow" },
  PAID: { label: "Paid", color: "blue" },
  IN_PRODUCTION: { label: "In Production", color: "indigo" },
  PROOF_READY: { label: "Proof Ready", color: "purple" },
  PROOF_APPROVED: { label: "Approved", color: "green" },
  PROOF_REVISION: { label: "Revision Requested", color: "orange" },
  SHIPPING: { label: "Shipping", color: "cyan" },
  DELIVERED: { label: "Delivered", color: "green" },
  CANCELLED: { label: "Cancelled", color: "red" },
} as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Upload a Photo",
    description:
      "Upload a clear photo of your prospect, team member, or client.",
    icon: "Camera",
  },
  {
    step: 2,
    title: "We Sculpt It",
    description:
      "Our artists hand-sculpt a custom bobblehead that captures their likeness perfectly.",
    icon: "Palette",
  },
  {
    step: 3,
    title: "Approve Your Proof",
    description:
      "Review a digital proof before production. Revisions are free and unlimited.",
    icon: "Eye",
  },
  {
    step: 4,
    title: "Land on Their Desk",
    description:
      "Gift-wrapped and shipped to their office. Your brand on their desk, permanently.",
    icon: "Gift",
  },
] as const;

export const NAV_LINKS = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "For Teams", href: "/for-teams" },
  { label: "For Sales", href: "/for-sales" },
  { label: "Track Order", href: "/dashboard/orders" },
] as const;
