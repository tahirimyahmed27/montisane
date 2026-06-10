import type { Loc } from "@/lib/i18n";

export interface JournalArticle {
  slug: string;
  title: Loc;
  category: Loc;
  readTime: string;
  date: string;
  excerpt: Loc;
  content: Loc;
  relatedProducts?: string[];
}

export const journalArticles: JournalArticle[] = [
  {
    slug: "plantes-sommeil",
    title: {
      fr: "5 plantes du soir pour un sommeil profond",
      en: "5 evening herbs for deeper sleep",
    },
    category: { fr: "Remèdes herbaux", en: "Herbal Remedies" },
    readTime: "6 min",
    date: "2026-05-15",
    excerpt: {
      fr: "La valériane, la passiflore, la mélisse, la lavande et le tilleul constituent le cocktail le plus étudié pour un sommeil réparateur sans accoutumance.",
      en: "Valerian, passionflower, lemon balm, lavender, and linden form the most studied cocktail for restorative sleep without dependency.",
    },
    content: {
      fr: `Le sommeil est la pierre angulaire du bien-être. Pourtant, un adulte sur trois se plaint de nuits agitées. Les somnifères chimiques fonctionnent, mais au prix d'une dépendance et d'un réveil groggy. Les plantes, elles, travaillent avec votre biologie.

## 1. Valériane (Valeriana officinalis)
Reine des tisanes du sommeil, la valériane augmente le GABA — le neurotransmetteur du calme. Les études montrent une amélioration significative de la qualité du sommeil dès la première semaine.

## 2. Passiflore (Passiflora incarnata)
Originaire d'Amérique centrale, elle réduit l'anxiété pré-sommeil. Idéale si votre esprit tourne en boucle au coucher.

## 3. Mélisse (Melissa officinalis)
Douce et citronnée, elle abaisse le cortisol et apaise le système nerveux. Parfaite pour les personnes sensibles.

## 4. Lavande (Lavandula angustifolia)
Son arôme seul diminue la fréquence cardiaque. En infusion, elle prolonge la phase de sommeil profond.

## 5. Tilleul (Tilia cordata)
Traditionnellement utilisé en Europe du Nord, il relaxe les muscles et favorise l'endormissement naturel.

## Le rituel Montisane
Notre Moonlight Blend combine ces cinq plantes dans des proportions étudiées — sans excipients, sans arômes ajoutés. Un sachet, dix minutes avant le coucher. Laissez la nuit faire son œuvre.`,
      en: `Sleep is the cornerstone of wellness. Yet one in three adults complains of restless nights. Chemical sleep aids work, but at the cost of dependency and groggy mornings. Herbs, on the other hand, work with your biology.

## 1. Valerian (Valeriana officinalis)
The queen of sleep herbs, valerian increases GABA — the calm neurotransmitter. Studies show significant improvement in sleep quality within the first week.

## 2. Passionflower (Passiflora incarnata)
Native to Central America, it reduces pre-sleep anxiety. Ideal if your mind races at bedtime.

## 3. Lemon Balm (Melissa officinalis)
Gentle and lemony, it lowers cortisol and soothes the nervous system. Perfect for sensitive individuals.

## 4. Lavender (Lavandula angustifolia)
Its aroma alone reduces heart rate. As an infusion, it prolongs deep sleep phases.

## 5. Linden (Tilia cordata)
Traditionally used in Northern Europe, it relaxes muscles and promotes natural drowsiness.

## The Montisane Ritual
Our Moonlight Blend combines these five herbs in studied proportions — no fillers, no added flavors. One sachet, ten minutes before bed. Let the night do its work.`,
    },
    relatedProducts: ["moonlight-blend"],
  },
  {
    slug: "digestion-mediterraneenne",
    title: {
      fr: "L'approche méditerranéenne de la digestion",
      en: "The Mediterranean approach to digestion",
    },
    category: { fr: "Nutrition", en: "Nutrition" },
    readTime: "8 min",
    date: "2026-04-22",
    excerpt: {
      fr: "Anis, fenouil, cumin et romarin : comment les cuisines du pourtour méditerranéen ont résolu les problèmes digestifs il y a des siècles.",
      en: "Anise, fennel, cumin, and rosemary: how Mediterranean cuisines solved digestive issues centuries ago.",
    },
    content: {
      fr: `Dans la cuisine méditerranéenne, le repas ne se termine jamais sans une tisane digestive. Ce n'est pas une coutume décorative — c'est une médecine empirique millénaire.

## Les quatre piliers digestifs

**Anis vert (Pimpinella anisum)** : carminatif puissant, il relaxe les muscles lisses de l'intestin et élimine les gaz.

**Fenouil (Foeniculum vulgare)** : sa teneur en anéthol stimule les sécrétions gastriques et réduit les ballonnements post-prandiaux.

**Cumin (Cuminum cyminum)** : utilisé depuis l'Égypte antique, il active les enzymes pancréatiques et accélère le transit.

**Romarin (Rosmarinus officinalis)** : cholérétique et cholagogue, il stimule la production de bile et facilite l'émulsion des graisses.

## Le timing est tout
Boire une tisane digestive **20 minutes après** le repas permet aux principes actifs d'agir au moment précis où l'estomac a besoin de soutien — pas avant, ce qui diluerait les sucs gastriques.

Notre After-Meal Calm associe ces quatre plantes à un soupçon de menthe poivrée pour une fraîcheur immédiate. Testé en laboratoire, chaque lot garantit 2,5 % d'huiles essentielles totales.`,
      en: `In Mediterranean cuisine, a meal never ends without a digestive herbal tea. This is not a decorative custom — it is millennia-old empirical medicine.

## The Four Digestive Pillars

**Anise (Pimpinella anisum)**: A powerful carminative, it relaxes smooth intestinal muscles and eliminates gas.

**Fennel (Foeniculum vulgare)**: Its anethole content stimulates gastric secretions and reduces post-meal bloating.

**Cumin (Cuminum cyminum)**: Used since ancient Egypt, it activates pancreatic enzymes and speeds transit.

**Rosemary (Rosmarinus officinalis)**: Choleretic and cholagogue, it stimulates bile production and facilitates fat emulsification.

## Timing Is Everything
Drinking a digestive tea **20 minutes after** a meal allows the active compounds to act at the precise moment the stomach needs support — not before, which would dilute gastric juices.

Our After-Meal Calm combines these four herbs with a hint of peppermint for immediate freshness. Lab-tested, each batch guarantees 2.5% total essential oils.`,
    },
    relatedProducts: ["after-meal-calm"],
  },
  {
    slug: "adaptogenes",
    title: {
      fr: "Les adaptogènes, simplement expliqués",
      en: "Adaptogens, explained simply",
    },
    category: { fr: "Bien-être", en: "Wellness" },
    readTime: "5 min",
    date: "2026-03-10",
    excerpt: {
      fr: "Rhodiola, ashwagandha, schisandra : ces plantes qui aident votre corps à s'adapter au stress sans l'épuiser.",
      en: "Rhodiola, ashwagandha, schisandra: these plants help your body adapt to stress without depleting it.",
    },
    content: {
      fr: `Le terme « adaptogène » date des années 1940, mais le concept est bien plus ancien. En médecine ayurvédique et chinoise, certaines plantes étaient réservées aux guerriers et aux érudits pour maintenir leur vigueur en période de tension.

## Qu'est-ce qu'un adaptogène ?
Un adaptogène est une substance qui :
1. Augmente la résistance au stress (physique, chimique ou biologique)
2. Possède un effet normalisant — il calme si vous êtes excité, et stimule si vous êtes fatigué
3. Est non toxique à dose normale

## Les trois stars

**Rhodiola rosea** : originaire des montagnes froides, elle améliore la concentration et réduit la fatigue mentale. Les études montrent des effets dès 3–5 jours.

**Ashwagandha (Withania somnifera)** : la reine de l'Ayurveda. Elle abaisse le cortisol salivaire de 30 % en moyenne sur 60 jours.

**Schisandra chinensis** : baie aux cinq saveurs, elle soutient le foie, la concentration et l'endurance physique.

## Comment les intégrer
Les adaptogènes ne sont pas des pilules magiques. Ils fonctionnent en complément d'un sommeil suffisant, d'une alimentation équilibrée et de mouvement régulier. Leur force réside dans la constance — pas dans la dose.

Notre Still Water contient rhodiola et schisandra dans une formule conçue pour les après-midi difficiles. Sans caféine, sans sucre.`,
      en: `The term "adaptogen" dates back to the 1940s, but the concept is much older. In Ayurvedic and Chinese medicine, certain herbs were reserved for warriors and scholars to maintain their vigor during stressful times.

## What Is an Adaptogen?
An adaptogen is a substance that:
1. Increases resistance to stress (physical, chemical, or biological)
2. Has a normalizing effect — calming if you are overstimulated, stimulating if you are fatigued
3. Is non-toxic at normal doses

## The Three Stars

**Rhodiola rosea**: From cold mountain regions, it improves concentration and reduces mental fatigue. Studies show effects within 3–5 days.

**Ashwagandha (Withania somnifera)**: The queen of Ayurveda. It lowers salivary cortisol by an average of 30% over 60 days.

**Schisandra chinensis**: The five-flavor berry, it supports the liver, concentration, and physical endurance.

## How to Integrate Them
Adaptogens are not magic pills. They work alongside sufficient sleep, balanced nutrition, and regular movement. Their strength lies in consistency — not dosage.

Our Still Water contains rhodiola and schisandra in a formula designed for difficult afternoons. No caffeine, no sugar.`,
    },
    relatedProducts: ["still-water"],
  },
  {
    slug: "cooperative-atlas",
    title: {
      fr: "Au cœur d'une coopérative des montagnes de l'Atlas",
      en: "Inside an Atlas mountain cooperative",
    },
    category: { fr: "Sagesse traditionnelle", en: "Traditional Wisdom" },
    readTime: "10 min",
    date: "2026-02-18",
    excerpt: {
      fr: "Voyage au Maroc, à la rencontre des femmes qui cultivent et séchèrent les plantes que nous infusons chaque soir.",
      en: "Journey to Morocco to meet the women who grow and dry the plants we infuse each evening.",
    },
    content: {
      fr: `À 1 800 mètres d'altitude, dans le Haut Atlas marocain, le village d'Imlchil semble figé dans le temps. Pourtant, c'est ici que le futur de la phytothérapie marocaine se dessine.

## Une transmission matrilinéaire
Le savoir herboriste se transmet de mère en fille depuis des générations. Chaque famille possède ses propres « secrets » — des proportions de mélanges, des techniques de séchage à l'ombre, des moments de récolte dictés par le calendrier lunaire.

## Le processus
1. **Récolte manuelle** : les feuilles sont cueillies au stade optimal de maturité, généralement au lever du jour pour préserver les huiles essentielles volatiles.
2. **Séchage traditionnel** : pas de dessiccateurs industriels. Les plantes sont étalées sur des nattes en roseau dans des greniers ventilés naturellement.
3. **Triage minutieux** : chaque feuille est inspectée à la main. Les tiges trop ligneuses sont éliminées.
4. **Conditionnement** : dans des sacs en jute, jamais de plastique.

## L'impact économique
Avant l'arrivée de la coopérative, ces femmes vendaient leurs récoltes à des intermédiaires pour une fraction de leur valeur. Aujourd'hui, elles perçoivent un prix équitable, formées à la certification biologique et à la traçabilité des lots.

## Pourquoi cela change le goût
Un herbier industriel séché à 60 °C en 4 heures conserve la couleur — mais perd jusqu'à 40 % de ses huiles essentielles. Notre séchage naturel sur 5 à 7 jours préserve l'intégrité aromatique et thérapeutique.

C'est cette différence que vous ressentez dans votre tasse.`,
      en: `At 1,800 meters altitude, in the Moroccan High Atlas, the village of Imlchil seems frozen in time. Yet this is where the future of Moroccan herbal medicine is being shaped.

## A Matrilineal Heritage
Herbal knowledge has been passed from mother to daughter for generations. Each family has its own "secrets" — blend proportions, shade-drying techniques, harvest times dictated by the lunar calendar.

## The Process
1. **Hand Harvesting**: Leaves are picked at optimal maturity, usually at dawn to preserve volatile essential oils.
2. **Traditional Drying**: No industrial dehydrators. Plants are spread on reed mats in naturally ventilated lofts.
3. **Careful Sorting**: Every leaf is hand-inspected. Overly woody stems are removed.
4. **Packaging**: In jute bags, never plastic.

## The Economic Impact
Before the cooperative, these women sold their harvests to middlemen for a fraction of their value. Today, they receive fair prices, trained in organic certification and lot traceability.

## Why It Changes the Taste
An industrial herb dryer at 60°C for 4 hours preserves color — but loses up to 40% of essential oils. Our natural 5–7 day drying preserves aromatic and therapeutic integrity.

That is the difference you taste in your cup.`,
    },
  },
  {
    slug: "plantes-ameres",
    title: {
      fr: "Pourquoi les plantes amères aiment votre foie",
      en: "Why bitter herbs love your liver",
    },
    category: { fr: "Remèdes herbaux", en: "Herbal Remedies" },
    readTime: "7 min",
    date: "2026-01-30",
    excerpt: {
      fr: "Gentiane, artichaut et chardon-Marie stimulent la bile et réveillent la digestion — découvrez pourquoi l'amertume est un signal santé.",
      en: "Gentian, artichoke, and milk thistle stimulate bile and wake up digestion — discover why bitterness is a health signal.",
    },
    content: {
      fr: `Le goût amer est le parent pauvre de la gastronomie moderne. On l'atténue, on le masque, on le remplace par le sucré. Pourtant, physiologiquement, c'est peut-être le goût le plus important.

## Le réflexe gustatif amar
Quand les récepteurs amers de votre langue sont stimulés, ils envoient un signal direct au système nerveux entérique — le « cerveau intestinal ». Résultat :
- Augmentation de la sécrétion de salive
- Stimulation de l'acide chlorhydrique gastrique
- Production de bile et d'enzymes pancréatiques
- Renforcement du péristaltisme

## Trois plantes à connaître

**Gentiane (Gentiana lutea)** : la plus puissante des toniques amers européens. Elle relance une digestion atone en 15–20 minutes.

**Chardon-Marie (Silybum marianum)** : son silymarine protège les hépatocytes des toxines et favorise la régénération cellulaire.

**Artichaut (Cynara scolymus)** : riche en cynarine, il abaisse les triglycérides et stimule l'élimination biliaire.

## Le paradoxe du goût
Contrairement à ce qu'on pourrait penser, les plantes amères ne s'accommodent pas du sucre. Le sucre neutralise le signal gustatif et réduit leur efficacité de moitié. C'est pourquoi nos infusions amères sont naturellement non sucrées — et pourquoi nous recommandons de les déguster sans miel.

Notre Green Renewal combine gentiane et chardon-Marie dans une formule matinale conçue pour réveiller le métabolisme.`,
      en: `Bitter taste is the poor relation of modern gastronomy. We dull it, mask it, replace it with sweetness. Yet physiologically, it may be the most important taste.

## The Bitter Taste Reflex
When bitter receptors on your tongue are stimulated, they send a direct signal to the enteric nervous system — the "gut brain." The result:
- Increased saliva secretion
- Stimulation of gastric hydrochloric acid
- Bile and pancreatic enzyme production
- Enhanced peristalsis

## Three Herbs to Know

**Gentian (Gentiana lutea)**: The most powerful European bitter tonic. It jump-starts sluggish digestion in 15–20 minutes.

**Milk Thistle (Silybum marianum)**: Its silymarin protects hepatocytes from toxins and promotes cell regeneration.

**Artichoke (Cynara scolymus)**: Rich in cynarin, it lowers triglycerides and stimulates biliary elimination.

## The Taste Paradox
Contrary to what one might think, bitter herbs do not go well with sugar. Sugar neutralizes the taste signal and reduces their effectiveness by half. That is why our bitter infusions are naturally unsweetened — and why we recommend tasting them without honey.

Our Green Renewal combines gentian and milk thistle in a morning formula designed to wake up the metabolism.`,
    },
    relatedProducts: ["green-renewal"],
  },
  {
    slug: "rituel-matin",
    title: {
      fr: "Construire votre rituel matinal",
      en: "Building your morning ritual",
    },
    category: { fr: "Bien-être", en: "Wellness" },
    readTime: "4 min",
    date: "2026-01-08",
    excerpt: {
      fr: "Comment les 20 premières minutes de votre journée dictent votre énergie, votre humeur et votre résistance au stress.",
      en: "How the first 20 minutes of your day dictate your energy, mood, and stress resilience.",
    },
    content: {
      fr: `Le matin n'est pas une course contre la montre. C'est une fondation. Les neurosciences le confirment : la façon dont vous commencez votre journée influence votre cascade hormonale pour les 8 heures suivantes.

## Les trois ingrédients d'un bon matin

**1. Lumière naturelle (2–5 min)**
Exposer vos rétines à la lumière du jour dans les 30 minutes suivant le réveil réinitialise votre horloge circadienne et stimule la sérotonine.

**2. Hydratation consciente (5 min)**
Après 7–8 heures sans eau, votre corps est déshydraté. Pas de café immédiatement — une tisane tiède ou un verre d'eau citronnée prépare votre système digestif.

**3. Intention (10 min)**
Pas de méditation forcée. Juste un moment de silence : écrivez trois priorités, respirez profondément, ou savourez votre tisane sans écran.

## Notre rituel recommandé
- 6h45 : réveil, ouverture des volets
- 7h00 : infusion Green Renewal (gentiane, chardon-Marie, romarin)
- 7h10 : 5 étirements doux
- 7h20 : petit-déjeuner
- 7h45 : début de la journée, concentré

La gentiane du matin stimule la bile et prépare l'estomac à recevoir la nourriture. Le romarin améliore la circulation cérébrale. Et l'absence de caféine évite le pic de cortisol trop précoce.

Un rituel ne se construit pas en un jour. Il se construit en répétant les mêmes gestes aimants, jusqu'à ce qu'ils deviennent aussi naturels que respirer.`,
      en: `Morning is not a race against the clock. It is a foundation. Neuroscience confirms it: how you start your day influences your hormonal cascade for the next 8 hours.

## The Three Ingredients of a Good Morning

**1. Natural Light (2–5 min)**
Exposing your retinas to daylight within 30 minutes of waking resets your circadian clock and stimulates serotonin.

**2. Conscious Hydration (5 min)**
After 7–8 hours without water, your body is dehydrated. No coffee immediately — a warm herbal tea or a glass of lemon water prepares your digestive system.

**3. Intention (10 min)**
No forced meditation. Just a moment of silence: write three priorities, breathe deeply, or savor your tea without a screen.

## Our Recommended Ritual
- 6:45 AM: Wake up, open the shutters
- 7:00 AM: Brew Green Renewal (gentian, milk thistle, rosemary)
- 7:10 AM: 5 gentle stretches
- 7:20 AM: Breakfast
- 7:45 AM: Start the day, focused

Morning gentian stimulates bile and prepares the stomach to receive food. Rosemary improves cerebral circulation. And the absence of caffeine avoids an overly early cortisol spike.

A ritual is not built in a day. It is built by repeating the same loving gestures, until they become as natural as breathing.`,
    },
    relatedProducts: ["green-renewal", "golden-spark"],
  },
];

export function getJournalArticle(slug: string): JournalArticle | undefined {
  return journalArticles.find((a) => a.slug === slug);
}

