import digestive from "@/assets/product-digestive.jpg";
import sleep from "@/assets/product-sleep.jpg";
import stress from "@/assets/product-stress.jpg";
import energy from "@/assets/product-energy.jpg";
import detox from "@/assets/product-detox.jpg";
import immunity from "@/assets/product-immunity.jpg";

export type Category =
  | "digestive"
  | "sleep"
  | "stress"
  | "energy"
  | "detox"
  | "immunity";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: Category;
  categoryLabel: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  image: string;
  benefits: string[];
  ingredients: string[];
  preparation: string;
  description: string;
  bestSeller?: boolean;
}

export const categories: { id: Category; label: string; description: string }[] = [
  { id: "digestive", label: "Digestive Wellness", description: "Soothe and support gut balance after every meal." },
  { id: "sleep", label: "Better Sleep", description: "Drift into deep, restorative rest with calming botanicals." },
  { id: "stress", label: "Stress Relief", description: "Adaptogenic herbs to ease tension and quiet the mind." },
  { id: "energy", label: "Energy & Focus", description: "Clean, sustained vitality without the crash." },
  { id: "detox", label: "Detox", description: "Gentle daily cleansing to support liver and kidneys." },
  { id: "immunity", label: "Immunity", description: "Antioxidant-rich blends to strengthen your defenses." },
];

export const products: Product[] = [
  {
    slug: "after-meal-calm",
    name: "After-Meal Calm",
    tagline: "Mint, fennel & ginger digestive ritual",
    category: "digestive",
    categoryLabel: "Digestive Wellness",
    price: 28,
    compareAt: 34,
    rating: 4.9,
    reviews: 412,
    image: digestive,
    benefits: [
      "Eases bloating within 20 minutes",
      "Soothes the digestive tract",
      "Naturally caffeine-free",
    ],
    ingredients: ["Peppermint", "Fennel seed", "Ginger root", "Anise", "Chamomile"],
    preparation: "Steep 1 tsp in 200ml of 95°C water for 5 minutes. Best after meals.",
    description:
      "A Mediterranean-Moroccan digestive ritual passed down through generations. Bright peppermint and warming ginger meet fennel and anise to gently calm the stomach and dissolve heaviness after meals.",
    bestSeller: true,
  },
  {
    slug: "moonlight-blend",
    name: "Moonlight Blend",
    tagline: "Lavender, passionflower & valerian",
    category: "sleep",
    categoryLabel: "Better Sleep",
    price: 32,
    rating: 4.8,
    reviews: 287,
    image: sleep,
    benefits: [
      "Helps you fall asleep faster",
      "Reduces nighttime restlessness",
      "Wake up refreshed, no grogginess",
    ],
    ingredients: ["Lavender", "Passionflower", "Valerian root", "Lemon balm", "Chamomile"],
    preparation: "Steep 1 tsp in 200ml of 90°C water for 7 minutes. Sip 30 minutes before bed.",
    description:
      "A soft, floral nightcap built around clinically-studied sleep botanicals. Valerian and passionflower quiet a racing mind while lavender and lemon balm soothe the body into rest.",
    bestSeller: true,
  },
  {
    slug: "still-water",
    name: "Still Water",
    tagline: "Ashwagandha, rose & holy basil",
    category: "stress",
    categoryLabel: "Stress Relief",
    price: 34,
    rating: 4.9,
    reviews: 521,
    image: stress,
    benefits: [
      "Lowers cortisol naturally",
      "Restores emotional balance",
      "Adaptogenic & non-drowsy",
    ],
    ingredients: ["Ashwagandha", "Holy basil (Tulsi)", "Rose petals", "Rhodiola", "Licorice"],
    preparation: "Steep 1 tsp in 200ml of 95°C water for 6 minutes. Drink mid-afternoon.",
    description:
      "An adaptogenic blend to meet stressful days with grace. Ashwagandha and rhodiola support a calm nervous system while rose and tulsi soften the edges of the day.",
    bestSeller: true,
  },
  {
    slug: "golden-spark",
    name: "Golden Spark",
    tagline: "Ginger, turmeric & yerba mate",
    category: "energy",
    categoryLabel: "Energy & Focus",
    price: 30,
    rating: 4.7,
    reviews: 198,
    image: energy,
    benefits: [
      "Clean morning energy",
      "Sharpens mental focus",
      "No crash, no jitters",
    ],
    ingredients: ["Yerba mate", "Ginger", "Turmeric", "Cinnamon", "Black pepper"],
    preparation: "Steep 1 tsp in 200ml of 90°C water for 4 minutes. Best in the morning.",
    description:
      "A warming start to the day. Yerba mate delivers steady focus while turmeric and ginger awaken circulation and clarity from the inside out.",
  },
  {
    slug: "green-renewal",
    name: "Green Renewal",
    tagline: "Dandelion, nettle & milk thistle",
    category: "detox",
    categoryLabel: "Detox",
    price: 29,
    rating: 4.6,
    reviews: 154,
    image: detox,
    benefits: [
      "Supports liver function",
      "Gentle daily cleanse",
      "Naturally diuretic",
    ],
    ingredients: ["Dandelion root", "Nettle leaf", "Milk thistle", "Lemon peel", "Burdock"],
    preparation: "Steep 1 tsp in 200ml of 95°C water for 8 minutes. Drink daily for 14 days.",
    description:
      "Bitter herbs the Mediterranean way — a daily ritual to invite gentle renewal. Milk thistle and dandelion support the body's own cleansing pathways.",
  },
  {
    slug: "sun-shield",
    name: "Sun Shield",
    tagline: "Elderberry, echinacea & orange peel",
    category: "immunity",
    categoryLabel: "Immunity",
    price: 31,
    rating: 4.9,
    reviews: 376,
    image: immunity,
    benefits: [
      "Strengthens immune defenses",
      "Antioxidant-rich",
      "Soothing for sore throats",
    ],
    ingredients: ["Elderberry", "Echinacea", "Orange peel", "Rose hip", "Clove"],
    preparation: "Steep 1 tsp in 200ml of 95°C water for 7 minutes. Drink 1–2 cups daily.",
    description:
      "A sun-warmed blend of antioxidant-rich berries and citrus. Built to fortify your immune system through every season change.",
    bestSeller: true,
  },
];

export const bundles = [
  { slug: "sleep-bundle", name: "Sleep Sanctuary Bundle", items: ["moonlight-blend", "still-water"], price: 58, save: 18 },
  { slug: "digestive-bundle", name: "Digestive Reset Bundle", items: ["after-meal-calm", "green-renewal"], price: 52, save: 14 },
  { slug: "immunity-bundle", name: "Immunity Armor Bundle", items: ["sun-shield", "golden-spark"], price: 55, save: 16 },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
