import { createFileRoute, Link } from "@tanstack/react-router";
import { bundles, getProduct } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/bundles")({
  head: () => ({
    meta: [
      { title: "Wellness bundles — Montisane" },
      { name: "description", content: "Curated herbal tea bundles for sleep, digestion and immunity. Save up to 25%." },
    ],
    links: [{ rel: "canonical", href: "/bundles" }],
  }),
  component: BundlesPage,
});

function BundlesPage() {
  const { add } = useCart();
  return (
    <>
      <section className="bg-cream/60 border-b border-border">
        <div className="container-x py-16 text-center">
          <div className="eyebrow">Save · Live well</div>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">Signature bundles</h1>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Goal-driven herbal rituals, lovingly bundled and priced to invite a full reset.
          </p>
        </div>
      </section>

      <section className="container-x py-16 grid md:grid-cols-3 gap-8">
        {bundles.map((b) => {
          const items = b.items.map(getProduct).filter(Boolean);
          const original = items.reduce((s, p) => s + (p?.price ?? 0), 0);
          return (
            <div key={b.slug} className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
              <div className="bg-cream flex gap-3 p-8 justify-center">
                {items.map((p) => p && (
                  <img key={p.slug} src={p.image} alt={p.name} className="h-44 w-32 object-cover rounded" />
                ))}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="font-serif text-2xl">{b.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Includes: {items.map((p) => p?.name).join(", ")}
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-xl font-medium">${b.price}</span>
                  <span className="text-sm text-muted-foreground line-through">${original}</span>
                  <span className="ml-auto text-xs bg-gold/30 text-ink px-2 py-1 rounded-full">Save ${b.save}</span>
                </div>
                <Button className="mt-6" onClick={() => items.forEach((p) => p && add(p.slug))}>
                  Add bundle to basket
                </Button>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
