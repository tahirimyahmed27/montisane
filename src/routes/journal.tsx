import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "The Journal — Montisane" },
      { name: "description", content: "Herbal wisdom, wellness essays, and traditional remedies — from the Montisane editorial." },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: Journal,
});

const categories = ["Herbal Remedies", "Wellness", "Nutrition", "Traditional Wisdom"];
const articles = [
  { title: "5 evening herbs for deeper sleep", cat: "Herbal Remedies", read: "6 min" },
  { title: "The Mediterranean approach to digestion", cat: "Nutrition", read: "8 min" },
  { title: "Adaptogens, explained simply", cat: "Wellness", read: "5 min" },
  { title: "Inside an Atlas mountain cooperative", cat: "Traditional Wisdom", read: "10 min" },
  { title: "Why bitter herbs love your liver", cat: "Herbal Remedies", read: "7 min" },
  { title: "Building your morning ritual", cat: "Wellness", read: "4 min" },
];

function Journal() {
  return (
    <>
      <section className="bg-cream/60 border-b border-border">
        <div className="container-x py-16 text-center">
          <div className="eyebrow">The journal</div>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">Herbal wisdom, weekly.</h1>
        </div>
      </section>
      <section className="container-x py-16">
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", ...categories].map((c) => (
            <span key={c} className="px-4 py-1.5 rounded-full text-sm border border-border bg-ivory">{c}</span>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((a) => (
            <article key={a.title} className="bg-card rounded-xl overflow-hidden border border-border">
              <div className="aspect-[4/3] bg-sage/20" />
              <div className="p-6">
                <div className="eyebrow">{a.cat}</div>
                <h2 className="mt-2 font-serif text-xl">{a.title}</h2>
                <div className="mt-3 text-xs text-muted-foreground">{a.read} read</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
