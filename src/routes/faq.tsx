import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Montisane" },
      { name: "description", content: "Answers to common questions about Montisane herbal teas, subscriptions and shipping." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQ,
});

const groups = [
  {
    title: "Our teas",
    items: [
      { q: "Are your teas caffeine-free?", a: "Most blends are caffeine-free. Golden Spark contains yerba mate — clearly labeled." },
      { q: "Are they organic?", a: "All ingredients are sourced from certified organic herbalists or cooperatives." },
      { q: "How long do effects take?", a: "Digestive blends can work in 20 minutes. Adaptogens unfold over 7–14 days." },
    ],
  },
  {
    title: "Orders & shipping",
    items: [
      { q: "Do you ship internationally?", a: "Yes — to 35+ countries. Shipping is free over $60 in the US, $80 internationally." },
      { q: "How fast is shipping?", a: "Standard 4–6 business days. Express 1–2 business days." },
      { q: "What's your return policy?", a: "Try any tea risk-free for 30 days. If you don't love it, we'll refund you." },
    ],
  },
  {
    title: "Subscriptions",
    items: [
      { q: "How does subscribe & save work?", a: "Choose delivery every 1, 2 or 3 months and save 10% on every order." },
      { q: "Can I cancel anytime?", a: "Yes — pause, skip or cancel from your account at any time, no questions asked." },
    ],
  },
];

function FAQ() {
  return (
    <section className="container-x py-20 max-w-3xl">
      <div className="eyebrow text-center">Help center</div>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl text-center">Frequently asked</h1>
      {groups.map((g) => (
        <div key={g.title} className="mt-12">
          <h2 className="font-serif text-2xl mb-4">{g.title}</h2>
          <Accordion type="single" collapsible>
            {g.items.map((it, i) => (
              <AccordionItem key={i} value={`${g.title}-${i}`}>
                <AccordionTrigger className="text-left font-serif text-lg">{it.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{it.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </section>
  );
}
