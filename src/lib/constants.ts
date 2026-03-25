export const SITE_NAME = "Make & Send";
export const SITE_DESCRIPTION =
  "Custom bobbleheads for every occasion. Design, personalize, and send unforgettable gifts to employees, clients, and loved ones.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://makeandsend.com";

export const MATERIAL_TIERS = {
  STANDARD: {
    name: "Standard",
    price: 89,
    description: "Great for gifts and fun",
    material: "Resin",
    features: [
      "Hand-sculpted from your photo",
      "High-quality resin material",
      "Custom base color",
      "Personalized plaque",
      "Gift-ready packaging",
    ],
  },
  PREMIUM: {
    name: "Premium",
    price: 129,
    description: "Enhanced detail and finish",
    material: "Hand-painted resin",
    features: [
      "Everything in Standard",
      "Hand-painted details",
      "Premium finish coating",
      "Multiple accessory options",
      "Priority production",
    ],
  },
  DELUXE: {
    name: "Deluxe",
    price: 189,
    description: "Museum-quality collectible",
    material: "Premium clay",
    features: [
      "Everything in Premium",
      "Artist-grade premium clay",
      "Ultra-detailed sculpting",
      "Custom accessories included",
      "Express production & shipping",
    ],
  },
} as const;

export type MaterialTierKey = keyof typeof MATERIAL_TIERS;

export const BULK_DISCOUNTS = [
  { minQuantity: 5, discount: 0.1, label: "10% off" },
  { minQuantity: 10, discount: 0.15, label: "15% off" },
  { minQuantity: 25, discount: 0.2, label: "20% off" },
] as const;

export const CATEGORIES = [
  { name: "Business & Office", slug: "business", icon: "Briefcase" },
  { name: "Sports & Hobbies", slug: "sports", icon: "Trophy" },
  { name: "Wedding & Couples", slug: "wedding", icon: "Heart" },
  { name: "Graduation", slug: "graduation", icon: "GraduationCap" },
  { name: "Music & Entertainment", slug: "music", icon: "Music" },
  { name: "Pets & Animals", slug: "pets", icon: "PawPrint" },
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
    title: "Choose Your Style",
    description:
      "Browse our collection of 200+ bobblehead templates across business, sports, wedding, and more.",
    icon: "Palette",
  },
  {
    step: 2,
    title: "Upload a Photo",
    description:
      "Send us a clear photo and our artists will sculpt an incredible likeness.",
    icon: "Camera",
  },
  {
    step: 3,
    title: "Approve Your Proof",
    description:
      "Review a digital proof before production. Request revisions until it's perfect.",
    icon: "Eye",
  },
  {
    step: 4,
    title: "Deliver Smiles",
    description:
      "We'll ship your custom bobblehead in gift-ready packaging, straight to the recipient.",
    icon: "Gift",
  },
] as const;

export const NAV_LINKS = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Catalog", href: "/catalog" },
  { label: "Pricing", href: "/pricing" },
  { label: "For Teams", href: "/for-teams" },
  { label: "For Sales", href: "/for-sales" },
] as const;
