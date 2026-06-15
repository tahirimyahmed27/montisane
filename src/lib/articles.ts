import lifestyle from "@/assets/lifestyle.jpg";
import hero from "@/assets/hero.jpg";
import detox from "@/assets/product-detox.jpg";
import sleep from "@/assets/product-sleep.jpg";
import stress from "@/assets/product-stress.jpg";
import digestive from "@/assets/product-digestive.jpg";

export type ArticleCategory =
  | "Herbal Remedies"
  | "Wellness"
  | "Nutrition"
  | "Traditional Wisdom";

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  readTime: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
  body: string[];
}

export const articleCategories: ArticleCategory[] = [
  "Herbal Remedies",
  "Wellness",
  "Nutrition",
  "Traditional Wisdom",
];

export const baseArticles: Article[] = [
  {
    slug: "5-evening-herbs-for-deeper-sleep",
    title: "5 evening herbs for deeper sleep",
    category: "Herbal Remedies",
    readTime: "6 min",
    author: "Dr. Leila Aït-Mansour",
    date: "March 12, 2026",
    excerpt:
      "From valerian to passionflower, discover the botanical allies that quiet the mind and prepare the body for true rest.",
    image: sleep,
    body: [
      "Sleep is a ritual, not an event. Long before melatonin pills, Mediterranean and Moroccan grandmothers reached for a small earthenware teapot and a careful blend of soothing herbs. The brew was warm, slightly floral, and signaled to the nervous system that the day was complete.",
      "Valerian root remains the most studied of nighttime botanicals. It interacts gently with the GABA pathways in the brain — the same circuits targeted by prescription sleep aids, but with a far softer footprint. A 4 to 6 minute steep is enough to coax it into the cup.",
      "Passionflower, with its delicate purple bloom, calms looping thoughts. Combined with lemon balm — bright, citrussy, deeply ancient — it forms the backbone of our Moonlight Blend.",
      "Lavender is more than a perfume. Inhaled in steam, then sipped slowly, it lowers heart rate and shoulder tension within minutes. Add a single pinch; more becomes bitter.",
      "Finally, chamomile. The most familiar, the most underestimated. Choose whole flower heads, not dust. Brew at 90°C for 7 minutes. Drink without distraction. Sleep follows.",
    ],
  },
  {
    slug: "the-mediterranean-approach-to-digestion",
    title: "The Mediterranean approach to digestion",
    category: "Nutrition",
    readTime: "8 min",
    author: "Yasmine Berrada",
    date: "March 4, 2026",
    excerpt:
      "Why a small cup of mint tea after a meal does more for your gut than any modern supplement.",
    image: digestive,
    body: [
      "Walk into any home from Tangier to Tunis after lunch and you'll find the same scene: a small glass of bright green mint tea, slowly poured from above. It looks like a pleasure. It is also a sophisticated digestive ritual.",
      "Peppermint relaxes the smooth muscle of the intestinal wall. Within twenty minutes of sipping, gas pockets dissolve, bloating eases, and the heaviness of a generous meal lifts. This is not folklore — it is measurable physiology.",
      "Add fennel and anise, and you double the effect. These two seeds carry anethole, a natural antispasmodic that calms cramping and supports the gentle wave of peristalsis.",
      "A single rule: never steep digestive teas for more than 6 minutes. Bitter compounds released after that point can paradoxically slow digestion. Short, hot, fragrant — that is the Mediterranean way.",
    ],
  },
  {
    slug: "adaptogens-explained-simply",
    title: "Adaptogens, explained simply",
    category: "Wellness",
    readTime: "5 min",
    author: "Dr. Leila Aït-Mansour",
    date: "February 24, 2026",
    excerpt:
      "Ashwagandha, rhodiola, holy basil — what these herbs actually do, and what they don't.",
    image: stress,
    body: [
      "An adaptogen is a plant that helps your body respond to stress without overcorrecting. Think of it as a thermostat, not a furnace.",
      "Ashwagandha lowers cortisol over weeks, not minutes. Studies show meaningful drops after 30 days of consistent use. Patience is the active ingredient.",
      "Rhodiola is faster, sharper, and best in the morning. It supports mental endurance and is favored by airline pilots and shift workers.",
      "Holy basil, or tulsi, is the gentlest of the three. It softens the edges of an anxious day and pairs beautifully with rose petals.",
      "Adaptogens are not stimulants. They will not make you feel something dramatic on day one. What they do is quieter and more lasting: a steadier nervous system, a more even mood, sleep that feels earned.",
    ],
  },
  {
    slug: "inside-an-atlas-mountain-cooperative",
    title: "Inside an Atlas mountain cooperative",
    category: "Traditional Wisdom",
    readTime: "10 min",
    author: "Yasmine Berrada",
    date: "February 10, 2026",
    excerpt:
      "We spent a week with the women who hand-harvest the wild thyme and verbena that perfume our blends.",
    image: hero,
    body: [
      "The village sits at 1,800 meters, perched on a ridge above a valley of almond orchards. The women of the Tafraout cooperative have been gathering wild herbs from these slopes for four generations.",
      "Harvest begins at dawn, before the sun pulls the essential oils out of the leaves. The thyme is cut with a small curved knife, never pulled — pulling damages the root and ends next year's bloom.",
      "Back at the cooperative, the herbs are sorted on long cedar tables. The fragrance is overwhelming and exact: hot stone, lemon, mint, smoke.",
      "We pay above fair-trade rates and commit to multi-year contracts. This is not charity. It is the only way to protect a craft that takes a lifetime to learn and a single bad season to lose.",
    ],
  },
  {
    slug: "why-bitter-herbs-love-your-liver",
    title: "Why bitter herbs love your liver",
    category: "Herbal Remedies",
    readTime: "7 min",
    author: "Dr. Leila Aït-Mansour",
    date: "January 28, 2026",
    excerpt:
      "Dandelion, milk thistle, and burdock — the unsexy heroes of every detox tradition.",
    image: detox,
    body: [
      "We have lost our taste for bitter. Yet for most of human history, every meal began with something bitter — a leaf, a root, a small cup of something sharp. The bitterness was the point.",
      "Bitter compounds trigger a cascade: more saliva, more stomach acid, more bile from the liver. The body prepares itself to actually digest and absorb what comes next.",
      "Milk thistle, in particular, contains silymarin — a compound that protects liver cells from oxidative damage. It is one of the most studied liver botanicals in the world.",
      "A two-week cup-a-day ritual in spring and autumn is a beautiful inheritance. Your liver is quiet, but it notices.",
    ],
  },
  {
    slug: "building-your-morning-ritual",
    title: "Building your morning ritual",
    category: "Wellness",
    readTime: "4 min",
    author: "Yasmine Berrada",
    date: "January 14, 2026",
    excerpt:
      "Three minutes, one cup, zero scrolling. A small practice that changes the rest of your day.",
    image: lifestyle,
    body: [
      "A morning ritual does not need to be elaborate to be transformative. It needs to be consistent, it needs to be analog, and it needs to belong to you.",
      "Boil water. Choose a single tea — not a different one each day. Pour. Sit. Wait the full steep without reaching for a phone. That waiting is the practice.",
      "Drink the first sip with attention. Notice temperature, then aroma, then taste. This trains the nervous system into a state we rarely visit anymore: unhurried presence.",
      "Three minutes. One cup. Done before the world begins. It is, quietly, everything.",
    ],
  },
];
