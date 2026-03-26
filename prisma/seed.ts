import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// ---------------------------------------------------------------------------
// Helper: URL-encode a template name for the placeholder image service
// ---------------------------------------------------------------------------
function placeholderUrl(name: string): string {
  const encoded = encodeURIComponent(name).replace(/%20/g, "+");
  return `https://placehold.co/600x800/FF6B35/white?text=${encoded}`;
}

// ---------------------------------------------------------------------------
// Category definitions
// ---------------------------------------------------------------------------
interface CategoryDef {
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
  templates: TemplateDef[];
}

interface TemplateDef {
  name: string;
  slug: string;
  description: string;
  isFeatured?: boolean;
  customizationOptions: Record<string, unknown>;
}

const categories: CategoryDef[] = [
  {
    name: "Business",
    slug: "business",
    description:
      "Professional bobbleheads perfect for corporate gifts, employee recognition, and office decor.",
    sortOrder: 1,
    templates: [
      {
        name: "Executive Suit",
        slug: "executive-suit",
        description:
          "Classic business suit bobblehead ideal for C-suite gifts and retirement celebrations.",
        isFeatured: true,
        customizationOptions: {
          bases: ["Black", "White", "Marble"],
          plaques: true,
          accessories: ["Glasses", "Briefcase", "Laptop"],
        },
      },
      {
        name: "Office Hero",
        slug: "office-hero",
        description:
          "Casual office attire bobblehead with customizable desk accessories.",
        customizationOptions: {
          bases: ["Black", "White", "Wood"],
          plaques: true,
          accessories: ["Coffee Mug", "Headset", "Notebook"],
        },
      },
      {
        name: "Sales Champion",
        slug: "sales-champion",
        description:
          "Celebrate top performers with a trophy-holding bobblehead.",
        customizationOptions: {
          bases: ["Gold", "Silver", "Black"],
          plaques: true,
          accessories: ["Trophy", "Medal", "Champagne"],
        },
      },
      {
        name: "Tech Founder",
        slug: "tech-founder",
        description:
          "Hoodie-and-jeans startup founder bobblehead for tech teams.",
        customizationOptions: {
          bases: ["Black", "White", "Neon"],
          plaques: true,
          accessories: ["Laptop", "Smartphone", "VR Headset"],
        },
      },
      {
        name: "Doctor Professional",
        slug: "doctor-professional",
        description:
          "White coat professional bobblehead for healthcare workers.",
        customizationOptions: {
          bases: ["White", "Blue", "Silver"],
          plaques: true,
          accessories: ["Stethoscope", "Clipboard", "Lab Coat"],
        },
      },
    ],
  },
  {
    name: "Sports",
    slug: "sports",
    description:
      "Action-packed sports bobbleheads for athletes, coaches, and fans.",
    sortOrder: 2,
    templates: [
      {
        name: "Basketball Star",
        slug: "basketball-star",
        description:
          "Dynamic basketball pose bobblehead with customizable jersey number.",
        isFeatured: true,
        customizationOptions: {
          bases: ["Court Floor", "Black", "Team Color"],
          plaques: true,
          accessories: ["Basketball", "Headband", "Wristband"],
        },
      },
      {
        name: "Soccer Player",
        slug: "soccer-player",
        description:
          "Mid-kick soccer player bobblehead with full kit customization.",
        customizationOptions: {
          bases: ["Grass", "Black", "White"],
          plaques: true,
          accessories: ["Soccer Ball", "Captain Armband", "Boots"],
        },
      },
      {
        name: "Baseball Slugger",
        slug: "baseball-slugger",
        description:
          "Home run swing pose bobblehead with bat and helmet options.",
        customizationOptions: {
          bases: ["Home Plate", "Dirt", "Black"],
          plaques: true,
          accessories: ["Bat", "Helmet", "Glove"],
        },
      },
      {
        name: "Football Quarterback",
        slug: "football-quarterback",
        description:
          "Throwing pose football bobblehead with jersey and helmet details.",
        customizationOptions: {
          bases: ["Turf", "Black", "Team Color"],
          plaques: true,
          accessories: ["Football", "Helmet", "Towel"],
        },
      },
      {
        name: "Golf Pro",
        slug: "golf-pro",
        description:
          "Elegant golf swing bobblehead perfect for tournament awards.",
        customizationOptions: {
          bases: ["Green", "Wood", "Black"],
          plaques: true,
          accessories: ["Golf Club", "Visor", "Golf Bag"],
        },
      },
    ],
  },
  {
    name: "Wedding",
    slug: "wedding",
    description:
      "Romantic wedding bobbleheads for cake toppers, favors, and keepsakes.",
    sortOrder: 3,
    templates: [
      {
        name: "Classic Couple",
        slug: "classic-couple",
        description:
          "Timeless bride and groom bobblehead set perfect as a cake topper.",
        isFeatured: true,
        customizationOptions: {
          bases: ["White", "Gold", "Rose Gold"],
          plaques: true,
          accessories: ["Bouquet", "Veil", "Top Hat"],
        },
      },
      {
        name: "Beach Wedding",
        slug: "beach-wedding",
        description:
          "Tropical-themed couple bobblehead with sandy base and palm trees.",
        customizationOptions: {
          bases: ["Sand", "Driftwood", "Shell"],
          plaques: true,
          accessories: ["Lei", "Sunglasses", "Flip Flops"],
        },
      },
      {
        name: "Garden Romance",
        slug: "garden-romance",
        description:
          "Floral garden setting bobblehead couple surrounded by flowers.",
        customizationOptions: {
          bases: ["Floral", "White", "Green"],
          plaques: true,
          accessories: ["Flower Crown", "Bouquet", "Butterfly"],
        },
      },
      {
        name: "Dance Floor Duo",
        slug: "dance-floor-duo",
        description:
          "First dance pose bobblehead capturing that magical moment.",
        customizationOptions: {
          bases: ["Mirror", "Black", "Silver"],
          plaques: true,
          accessories: ["Disco Ball", "Spotlight", "Confetti"],
        },
      },
    ],
  },
  {
    name: "Graduation",
    slug: "graduation",
    description:
      "Celebrate academic achievements with custom graduation bobbleheads.",
    sortOrder: 4,
    templates: [
      {
        name: "Cap and Gown",
        slug: "cap-and-gown",
        description:
          "Traditional graduation bobblehead with customizable school colors.",
        isFeatured: true,
        customizationOptions: {
          bases: ["Black", "School Color", "Wood"],
          plaques: true,
          accessories: ["Diploma", "Honor Cords", "Stole"],
        },
      },
      {
        name: "PhD Scholar",
        slug: "phd-scholar",
        description:
          "Doctoral regalia bobblehead with tam and academic hood.",
        customizationOptions: {
          bases: ["Mahogany", "Black", "Marble"],
          plaques: true,
          accessories: ["Dissertation", "Academic Hood", "Tam"],
        },
      },
      {
        name: "Diploma Toss",
        slug: "diploma-toss",
        description:
          "Celebratory cap-tossing pose bobblehead for the big moment.",
        customizationOptions: {
          bases: ["Black", "White", "School Color"],
          plaques: true,
          accessories: ["Flying Cap", "Confetti", "Diploma"],
        },
      },
      {
        name: "Future Leader",
        slug: "future-leader",
        description:
          "Inspirational pose bobblehead holding a diploma and looking ahead.",
        customizationOptions: {
          bases: ["Gold", "Black", "Silver"],
          plaques: true,
          accessories: ["Diploma", "Globe", "Book Stack"],
        },
      },
    ],
  },
  {
    name: "Music",
    slug: "music",
    description:
      "Rock out with custom music-themed bobbleheads for musicians and fans.",
    sortOrder: 5,
    templates: [
      {
        name: "Rock Guitarist",
        slug: "rock-guitarist",
        description:
          "Shredding guitar solo bobblehead with stage lighting base.",
        isFeatured: true,
        customizationOptions: {
          bases: ["Stage", "Black", "Flame"],
          plaques: true,
          accessories: ["Electric Guitar", "Sunglasses", "Leather Jacket"],
        },
      },
      {
        name: "DJ Mixer",
        slug: "dj-mixer",
        description:
          "Turntable-spinning DJ bobblehead with headphones and decks.",
        customizationOptions: {
          bases: ["Neon", "Black", "Purple"],
          plaques: true,
          accessories: ["Headphones", "Turntable", "Vinyl Record"],
        },
      },
      {
        name: "Jazz Saxophonist",
        slug: "jazz-saxophonist",
        description:
          "Smooth jazz player bobblehead with golden saxophone detail.",
        customizationOptions: {
          bases: ["Blue", "Gold", "Black"],
          plaques: true,
          accessories: ["Saxophone", "Fedora", "Microphone"],
        },
      },
      {
        name: "Pop Vocalist",
        slug: "pop-vocalist",
        description:
          "Center-stage vocalist bobblehead with microphone and spotlight.",
        customizationOptions: {
          bases: ["Pink", "Silver", "Stage"],
          plaques: true,
          accessories: ["Microphone", "Sparkle Cape", "Earpiece"],
        },
      },
      {
        name: "Drum Legend",
        slug: "drum-legend",
        description:
          "Behind-the-kit drummer bobblehead with full drum set base.",
        customizationOptions: {
          bases: ["Chrome", "Black", "Red"],
          plaques: true,
          accessories: ["Drumsticks", "Cymbal", "Bandana"],
        },
      },
    ],
  },
  {
    name: "Pets",
    slug: "pets",
    description:
      "Adorable pet bobbleheads to immortalize your furry, feathered, or scaly friends.",
    sortOrder: 6,
    templates: [
      {
        name: "Good Boy Dog",
        slug: "good-boy-dog",
        description:
          "Happy pup bobblehead with wagging tail and customizable collar.",
        isFeatured: true,
        customizationOptions: {
          bases: ["Grass", "Cushion", "Wood"],
          plaques: true,
          accessories: ["Bone", "Ball", "Bandana"],
        },
      },
      {
        name: "Royal Cat",
        slug: "royal-cat",
        description:
          "Regal feline bobblehead lounging on a throne-style base.",
        customizationOptions: {
          bases: ["Velvet", "Gold", "Marble"],
          plaques: true,
          accessories: ["Crown", "Fish Toy", "Bow Tie"],
        },
      },
      {
        name: "Pet and Owner",
        slug: "pet-and-owner",
        description:
          "Matching bobblehead set featuring you and your beloved pet together.",
        customizationOptions: {
          bases: ["Park Bench", "Couch", "Wood"],
          plaques: true,
          accessories: ["Leash", "Treat", "Matching Outfit"],
        },
      },
      {
        name: "Tropical Parrot",
        slug: "tropical-parrot",
        description:
          "Colorful parrot bobblehead perched on a branch with vibrant feathers.",
        customizationOptions: {
          bases: ["Branch", "Tropical", "Gold"],
          plaques: true,
          accessories: ["Pirate Hat", "Perch", "Fruit"],
        },
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Main seed function
// ---------------------------------------------------------------------------
async function main() {
  console.log("Seeding database...");

  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        sortOrder: cat.sortOrder,
        imageUrl: placeholderUrl(cat.name),
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        imageUrl: placeholderUrl(cat.name),
        sortOrder: cat.sortOrder,
      },
    });

    console.log(`  Category: ${category.name}`);

    for (const tpl of cat.templates) {
      const template = await prisma.template.upsert({
        where: { slug: tpl.slug },
        update: {
          name: tpl.name,
          description: tpl.description,
          categoryId: category.id,
          basePrice: 89,
          imageUrl: placeholderUrl(tpl.name),
          galleryUrls: [
            placeholderUrl(`${tpl.name}+1`),
            placeholderUrl(`${tpl.name}+2`),
            placeholderUrl(`${tpl.name}+3`),
          ],
          isActive: true,
          isFeatured: tpl.isFeatured ?? false,
          availableTiers: ["STANDARD", "PREMIUM", "DELUXE"],
          customizationOptions: tpl.customizationOptions,
        },
        create: {
          name: tpl.name,
          slug: tpl.slug,
          description: tpl.description,
          categoryId: category.id,
          basePrice: 89,
          imageUrl: placeholderUrl(tpl.name),
          galleryUrls: [
            placeholderUrl(`${tpl.name}+1`),
            placeholderUrl(`${tpl.name}+2`),
            placeholderUrl(`${tpl.name}+3`),
          ],
          isActive: true,
          isFeatured: tpl.isFeatured ?? false,
          availableTiers: ["STANDARD", "PREMIUM", "DELUXE"],
          customizationOptions: tpl.customizationOptions,
        },
      });

      console.log(
        `    Template: ${template.name}${tpl.isFeatured ? " (featured)" : ""}`
      );
    }
  }

  console.log("\nSeed complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
