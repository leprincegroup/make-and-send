export interface MockTemplate {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  categorySlug: string;
  categoryName: string;
  basePrice: number;
  isFeatured: boolean;
  description: string;
  color: string;
}

export const MOCK_TEMPLATES: MockTemplate[] = [
  // Business & Office — warm tans/golds
  { id: "biz-1", name: "The Executive", slug: "the-executive", categorySlug: "business", categoryName: "Business & Office", basePrice: 89, isFeatured: true, color: "#E8D5B7", description: "Command the boardroom with this sharp-suited executive bobblehead. Perfect for the boss who has everything.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "biz-2", name: "Corner Office", slug: "corner-office", categorySlug: "business", categoryName: "Business & Office", basePrice: 89, isFeatured: false, color: "#D4C4A0", description: "Celebrate that big promotion with a corner-office-worthy bobblehead. Desk accessory of the year.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "biz-3", name: "Team Player", slug: "team-player", categorySlug: "business", categoryName: "Business & Office", basePrice: 89, isFeatured: false, color: "#F0E0C8", description: "For the colleague who always brings donuts and good vibes. The ultimate team spirit gift.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "biz-4", name: "The Closer", slug: "the-closer", categorySlug: "business", categoryName: "Business & Office", basePrice: 89, isFeatured: false, color: "#E0D0B0", description: "For the sales legend who never misses a quota. Seal the deal with this power pose.", imageUrl: "/placeholder-bobblehead.png" },

  // Sports & Hobbies — soft blues
  { id: "spt-1", name: "The MVP", slug: "the-mvp", categorySlug: "sports", categoryName: "Sports & Hobbies", basePrice: 89, isFeatured: true, color: "#B7D5E8", description: "Score big with this trophy-ready sports bobblehead. Perfect for athletes and fans alike.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "spt-2", name: "Home Run Hero", slug: "home-run-hero", categorySlug: "sports", categoryName: "Sports & Hobbies", basePrice: 89, isFeatured: false, color: "#A0C8E0", description: "Knock it out of the park with this baseball-themed bobblehead. Batter up!", imageUrl: "/placeholder-bobblehead.png" },
  { id: "spt-3", name: "Marathon Runner", slug: "marathon-runner", categorySlug: "sports", categoryName: "Sports & Hobbies", basePrice: 89, isFeatured: false, color: "#C0D8F0", description: "Celebrate that personal best with a running bobblehead. Every mile was worth it.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "spt-4", name: "Golf Pro", slug: "golf-pro", categorySlug: "sports", categoryName: "Sports & Hobbies", basePrice: 89, isFeatured: false, color: "#B0D0E8", description: "For the weekend warrior who dreams of the Masters. Hole in one guaranteed.", imageUrl: "/placeholder-bobblehead.png" },

  // Wedding & Couples — soft pinks
  { id: "wed-1", name: "Happy Couple", slug: "happy-couple", categorySlug: "wedding", categoryName: "Wedding & Couples", basePrice: 89, isFeatured: true, color: "#E8B7D5", description: "Celebrate your love story with this adorable couple bobblehead. The perfect wedding keepsake.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "wed-2", name: "First Dance", slug: "first-dance", categorySlug: "wedding", categoryName: "Wedding & Couples", basePrice: 89, isFeatured: false, color: "#F0C0D8", description: "Capture that magical first dance moment forever. A romantic anniversary gift.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "wed-3", name: "Just Married", slug: "just-married", categorySlug: "wedding", categoryName: "Wedding & Couples", basePrice: 89, isFeatured: false, color: "#E0A8C8", description: "The perfect cake topper turned desk companion. Newlywed bliss in bobblehead form.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "wed-4", name: "Love Birds", slug: "love-birds", categorySlug: "wedding", categoryName: "Wedding & Couples", basePrice: 89, isFeatured: false, color: "#F8D0E0", description: "For the couple that finishes each other's sentences. Two heads that bob in sync.", imageUrl: "/placeholder-bobblehead.png" },

  // Graduation — soft greens
  { id: "grad-1", name: "The Graduate", slug: "the-graduate", categorySlug: "graduation", categoryName: "Graduation", basePrice: 89, isFeatured: true, color: "#D5E8B7", description: "Toss that cap in the air! Celebrate academic achievement with this proud graduate.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "grad-2", name: "Dean's List", slug: "deans-list", categorySlug: "graduation", categoryName: "Graduation", basePrice: 89, isFeatured: false, color: "#C8E0A0", description: "For the overachiever who earned every honor. Summa cum laude in bobblehead form.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "grad-3", name: "Class of 2026", slug: "class-of-2026", categorySlug: "graduation", categoryName: "Graduation", basePrice: 89, isFeatured: false, color: "#E0F0C0", description: "Mark the milestone year with a custom graduation bobblehead. Memories that bob.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "grad-4", name: "PhD Scholar", slug: "phd-scholar", categorySlug: "graduation", categoryName: "Graduation", basePrice: 89, isFeatured: false, color: "#D0E8B0", description: "Years of research, one incredible bobblehead. For the doctor in the family.", imageUrl: "/placeholder-bobblehead.png" },

  // Music & Entertainment — soft purples
  { id: "mus-1", name: "Rock Star", slug: "rock-star", categorySlug: "music", categoryName: "Music & Entertainment", basePrice: 89, isFeatured: true, color: "#D5B7E8", description: "Turn up the volume with this guitar-wielding rock star bobblehead. Stage presence guaranteed.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "mus-2", name: "DJ Spin", slug: "dj-spin", categorySlug: "music", categoryName: "Music & Entertainment", basePrice: 89, isFeatured: false, color: "#C8A0E0", description: "Drop the beat with this turntable-ready DJ bobblehead. The party never stops.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "mus-3", name: "Karaoke King", slug: "karaoke-king", categorySlug: "music", categoryName: "Music & Entertainment", basePrice: 89, isFeatured: false, color: "#E0C8F0", description: "For the one who always grabs the mic. Every song is their signature song.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "mus-4", name: "Orchestra Pro", slug: "orchestra-pro", categorySlug: "music", categoryName: "Music & Entertainment", basePrice: 89, isFeatured: false, color: "#D0B0E8", description: "Classical elegance meets bobblehead fun. Conduct your desk symphony.", imageUrl: "/placeholder-bobblehead.png" },

  // Pets & Animals — soft teals
  { id: "pet-1", name: "Best Buddy", slug: "best-buddy", categorySlug: "pets", categoryName: "Pets & Animals", basePrice: 89, isFeatured: true, color: "#B7E8D5", description: "Immortalize your furry best friend in bobblehead form. Tail wags included.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "pet-2", name: "Cat Person", slug: "cat-person", categorySlug: "pets", categoryName: "Pets & Animals", basePrice: 89, isFeatured: false, color: "#A0E0C8", description: "For the proud cat parent. Your feline overlord deserves a bobblehead throne.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "pet-3", name: "Puppy Love", slug: "puppy-love", categorySlug: "pets", categoryName: "Pets & Animals", basePrice: 89, isFeatured: false, color: "#C0F0E0", description: "Capture that puppy energy forever. The bobble matches the bounce.", imageUrl: "/placeholder-bobblehead.png" },
  { id: "pet-4", name: "Zoo Keeper", slug: "zoo-keeper", categorySlug: "pets", categoryName: "Pets & Animals", basePrice: 89, isFeatured: false, color: "#B0E8D0", description: "For the animal lover with a whole menagerie. One bobblehead to rule them all.", imageUrl: "/placeholder-bobblehead.png" },
];
