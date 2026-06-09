import digestive from "@/assets/product-digestive.jpg";
import sleep from "@/assets/product-sleep.jpg";
import stress from "@/assets/product-stress.jpg";
import energy from "@/assets/product-energy.jpg";
import detox from "@/assets/product-detox.jpg";
import immunity from "@/assets/product-immunity.jpg";
import type { Loc } from "./i18n";

export type Category =
  | "digestive"
  | "sleep"
  | "stress"
  | "energy"
  | "detox"
  | "immunity";

export interface Product {
  slug: string;
  name: Loc;
  tagline: Loc;
  category: Category;
  categoryLabel: Loc;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  image: string;
  benefits: Loc[];
  ingredients: Loc[];
  preparation: Loc;
  description: Loc;
  bestSeller?: boolean;
}

const catLabels: Record<Category, Loc> = {
  digestive: { fr: "Bien-être digestif", en: "Digestive Wellness" },
  sleep: { fr: "Meilleur sommeil", en: "Better Sleep" },
  stress: { fr: "Anti-stress", en: "Stress Relief" },
  energy: { fr: "Énergie & focus", en: "Energy & Focus" },
  detox: { fr: "Détox", en: "Detox" },
  immunity: { fr: "Immunité", en: "Immunity" },
};

export const categories: { id: Category; label: Loc; description: Loc }[] = [
  { id: "digestive", label: catLabels.digestive, description: { fr: "Apaiser et soutenir l'équilibre intestinal après chaque repas.", en: "Soothe and support gut balance after every meal." } },
  { id: "sleep", label: catLabels.sleep, description: { fr: "Glissez vers un sommeil profond et réparateur avec des plantes apaisantes.", en: "Drift into deep, restorative rest with calming botanicals." } },
  { id: "stress", label: catLabels.stress, description: { fr: "Plantes adaptogènes pour apaiser les tensions et calmer le mental.", en: "Adaptogenic herbs to ease tension and quiet the mind." } },
  { id: "energy", label: catLabels.energy, description: { fr: "Vitalité propre et durable, sans coup de barre.", en: "Clean, sustained vitality without the crash." } },
  { id: "detox", label: catLabels.detox, description: { fr: "Nettoyage quotidien doux pour soutenir le foie et les reins.", en: "Gentle daily cleansing to support liver and kidneys." } },
  { id: "immunity", label: catLabels.immunity, description: { fr: "Mélanges riches en antioxydants pour renforcer vos défenses.", en: "Antioxidant-rich blends to strengthen your defenses." } },
];

export const products: Product[] = [
  {
    slug: "after-meal-calm",
    name: { fr: "After-Meal Calm", en: "After-Meal Calm" },
    tagline: { fr: "Rituel digestif menthe, fenouil & gingembre", en: "Mint, fennel & ginger digestive ritual" },
    category: "digestive",
    categoryLabel: catLabels.digestive,
    price: 28,
    compareAt: 34,
    rating: 4.9,
    reviews: 412,
    image: digestive,
    benefits: [
      { fr: "Soulage les ballonnements en 20 minutes", en: "Eases bloating within 20 minutes" },
      { fr: "Apaise le système digestif", en: "Soothes the digestive tract" },
      { fr: "Naturellement sans caféine", en: "Naturally caffeine-free" },
    ],
    ingredients: [
      { fr: "Menthe poivrée", en: "Peppermint" },
      { fr: "Graine de fenouil", en: "Fennel seed" },
      { fr: "Racine de gingembre", en: "Ginger root" },
      { fr: "Anis", en: "Anise" },
      { fr: "Camomille", en: "Chamomile" },
    ],
    preparation: { fr: "Infusez 1 c. à c. dans 200 ml d'eau à 95 °C pendant 5 minutes. À déguster après les repas.", en: "Steep 1 tsp in 200ml of 95°C water for 5 minutes. Best after meals." },
    description: { fr: "Un rituel digestif méditerranéen-marocain transmis de génération en génération. La menthe poivrée éclatante et le gingembre réchauffant rencontrent le fenouil et l'anis pour apaiser doucement l'estomac et dissoudre la lourdeur après les repas.", en: "A Mediterranean-Moroccan digestive ritual passed down through generations. Bright peppermint and warming ginger meet fennel and anise to gently calm the stomach and dissolve heaviness after meals." },
    bestSeller: true,
  },
  {
    slug: "moonlight-blend",
    name: { fr: "Moonlight Blend", en: "Moonlight Blend" },
    tagline: { fr: "Lavande, passiflore & valériane", en: "Lavender, passionflower & valerian" },
    category: "sleep",
    categoryLabel: catLabels.sleep,
    price: 32,
    rating: 4.8,
    reviews: 287,
    image: sleep,
    benefits: [
      { fr: "Aide à s'endormir plus vite", en: "Helps you fall asleep faster" },
      { fr: "Réduit l'agitation nocturne", en: "Reduces nighttime restlessness" },
      { fr: "Réveil reposé, sans somnolence", en: "Wake up refreshed, no grogginess" },
    ],
    ingredients: [
      { fr: "Lavande", en: "Lavender" },
      { fr: "Passiflore", en: "Passionflower" },
      { fr: "Racine de valériane", en: "Valerian root" },
      { fr: "Mélisse", en: "Lemon balm" },
      { fr: "Camomille", en: "Chamomile" },
    ],
    preparation: { fr: "Infusez 1 c. à c. dans 200 ml d'eau à 90 °C pendant 7 minutes. À siroter 30 minutes avant le coucher.", en: "Steep 1 tsp in 200ml of 90°C water for 7 minutes. Sip 30 minutes before bed." },
    description: { fr: "Une tisane florale du soir construite autour de plantes du sommeil étudiées cliniquement. Valériane et passiflore apaisent un mental agité tandis que lavande et mélisse bercent le corps vers le repos.", en: "A soft, floral nightcap built around clinically-studied sleep botanicals. Valerian and passionflower quiet a racing mind while lavender and lemon balm soothe the body into rest." },
    bestSeller: true,
  },
  {
    slug: "still-water",
    name: { fr: "Still Water", en: "Still Water" },
    tagline: { fr: "Ashwagandha, rose & basilic sacré", en: "Ashwagandha, rose & holy basil" },
    category: "stress",
    categoryLabel: catLabels.stress,
    price: 34,
    rating: 4.9,
    reviews: 521,
    image: stress,
    benefits: [
      { fr: "Réduit naturellement le cortisol", en: "Lowers cortisol naturally" },
      { fr: "Restaure l'équilibre émotionnel", en: "Restores emotional balance" },
      { fr: "Adaptogène & non sédatif", en: "Adaptogenic & non-drowsy" },
    ],
    ingredients: [
      { fr: "Ashwagandha", en: "Ashwagandha" },
      { fr: "Basilic sacré (Tulsi)", en: "Holy basil (Tulsi)" },
      { fr: "Pétales de rose", en: "Rose petals" },
      { fr: "Rhodiola", en: "Rhodiola" },
      { fr: "Réglisse", en: "Licorice" },
    ],
    preparation: { fr: "Infusez 1 c. à c. dans 200 ml d'eau à 95 °C pendant 6 minutes. À boire en milieu d'après-midi.", en: "Steep 1 tsp in 200ml of 95°C water for 6 minutes. Drink mid-afternoon." },
    description: { fr: "Un mélange adaptogène pour accueillir les journées stressantes avec grâce. Ashwagandha et rhodiola soutiennent un système nerveux apaisé tandis que rose et tulsi adoucissent les contours de la journée.", en: "An adaptogenic blend to meet stressful days with grace. Ashwagandha and rhodiola support a calm nervous system while rose and tulsi soften the edges of the day." },
    bestSeller: true,
  },
  {
    slug: "golden-spark",
    name: { fr: "Golden Spark", en: "Golden Spark" },
    tagline: { fr: "Gingembre, curcuma & yerba maté", en: "Ginger, turmeric & yerba mate" },
    category: "energy",
    categoryLabel: catLabels.energy,
    price: 30,
    rating: 4.7,
    reviews: 198,
    image: energy,
    benefits: [
      { fr: "Énergie matinale propre", en: "Clean morning energy" },
      { fr: "Aiguise la concentration mentale", en: "Sharpens mental focus" },
      { fr: "Pas de coup de barre, pas de nervosité", en: "No crash, no jitters" },
    ],
    ingredients: [
      { fr: "Yerba maté", en: "Yerba mate" },
      { fr: "Gingembre", en: "Ginger" },
      { fr: "Curcuma", en: "Turmeric" },
      { fr: "Cannelle", en: "Cinnamon" },
      { fr: "Poivre noir", en: "Black pepper" },
    ],
    preparation: { fr: "Infusez 1 c. à c. dans 200 ml d'eau à 90 °C pendant 4 minutes. À déguster le matin.", en: "Steep 1 tsp in 200ml of 90°C water for 4 minutes. Best in the morning." },
    description: { fr: "Un démarrage réchauffant pour la journée. Le yerba maté apporte une concentration stable tandis que curcuma et gingembre réveillent la circulation et la clarté de l'intérieur.", en: "A warming start to the day. Yerba mate delivers steady focus while turmeric and ginger awaken circulation and clarity from the inside out." },
  },
  {
    slug: "green-renewal",
    name: { fr: "Green Renewal", en: "Green Renewal" },
    tagline: { fr: "Pissenlit, ortie & chardon-marie", en: "Dandelion, nettle & milk thistle" },
    category: "detox",
    categoryLabel: catLabels.detox,
    price: 29,
    rating: 4.6,
    reviews: 154,
    image: detox,
    benefits: [
      { fr: "Soutient la fonction hépatique", en: "Supports liver function" },
      { fr: "Cure quotidienne douce", en: "Gentle daily cleanse" },
      { fr: "Naturellement diurétique", en: "Naturally diuretic" },
    ],
    ingredients: [
      { fr: "Racine de pissenlit", en: "Dandelion root" },
      { fr: "Feuille d'ortie", en: "Nettle leaf" },
      { fr: "Chardon-Marie", en: "Milk thistle" },
      { fr: "Zeste de citron", en: "Lemon peel" },
      { fr: "Bardane", en: "Burdock" },
    ],
    preparation: { fr: "Infusez 1 c. à c. dans 200 ml d'eau à 95 °C pendant 8 minutes. À boire quotidiennement pendant 14 jours.", en: "Steep 1 tsp in 200ml of 95°C water for 8 minutes. Drink daily for 14 days." },
    description: { fr: "Des plantes amères à la méditerranéenne — un rituel quotidien pour inviter au renouvellement. Le chardon-Marie et le pissenlit soutiennent les voies naturelles de nettoyage du corps.", en: "Bitter herbs the Mediterranean way — a daily ritual to invite gentle renewal. Milk thistle and dandelion support the body's own cleansing pathways." },
  },
  {
    slug: "sun-shield",
    name: { fr: "Sun Shield", en: "Sun Shield" },
    tagline: { fr: "Sureau, échinacée & écorce d'orange", en: "Elderberry, echinacea & orange peel" },
    category: "immunity",
    categoryLabel: catLabels.immunity,
    price: 31,
    rating: 4.9,
    reviews: 376,
    image: immunity,
    benefits: [
      { fr: "Renforce les défenses immunitaires", en: "Strengthens immune defenses" },
      { fr: "Riche en antioxydants", en: "Antioxidant-rich" },
      { fr: "Apaisant pour les maux de gorge", en: "Soothing for sore throats" },
    ],
    ingredients: [
      { fr: "Sureau", en: "Elderberry" },
      { fr: "Échinacée", en: "Echinacea" },
      { fr: "Écorce d'orange", en: "Orange peel" },
      { fr: "Cynorrhodon", en: "Rose hip" },
      { fr: "Clou de girofle", en: "Clove" },
    ],
    preparation: { fr: "Infusez 1 c. à c. dans 200 ml d'eau à 95 °C pendant 7 minutes. Boire 1 à 2 tasses par jour.", en: "Steep 1 tsp in 200ml of 95°C water for 7 minutes. Drink 1–2 cups daily." },
    description: { fr: "Un mélange ensoleillé de baies et d'agrumes riches en antioxydants. Conçu pour fortifier votre système immunitaire à chaque changement de saison.", en: "A sun-warmed blend of antioxidant-rich berries and citrus. Built to fortify your immune system through every season change." },
    bestSeller: true,
  },
];

export const bundles: { slug: string; name: Loc; items: string[]; price: number; save: number }[] = [
  { slug: "sleep-bundle", name: { fr: "Coffret Sanctuaire du Sommeil", en: "Sleep Sanctuary Bundle" }, items: ["moonlight-blend", "still-water"], price: 58, save: 18 },
  { slug: "digestive-bundle", name: { fr: "Coffret Reset Digestif", en: "Digestive Reset Bundle" }, items: ["after-meal-calm", "green-renewal"], price: 52, save: 14 },
  { slug: "immunity-bundle", name: { fr: "Coffret Armure Immunité", en: "Immunity Armor Bundle" }, items: ["sun-shield", "golden-spark"], price: 55, save: 16 },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
