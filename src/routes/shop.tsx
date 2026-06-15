import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categories, type Category } from "@/lib/products";
import { useProducts } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop herbal teas — Montisane" },
      { name: "description", content: "Browse the full collection of Montisane medicinal herbal teas — for sleep, stress, digestion, energy, detox and immunity." },
      { property: "og:title", content: "Shop — Montisane" },
      { property: "og:description", content: "Browse all Montisane medicinal herbal tea blends." },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    category: (s.category as Category | undefined) ?? undefined,
    sort: (s.sort as string | undefined) ?? undefined,
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const [active, setActive] = useState<Category | "all">(search.category ?? "all");
  const [sort, setSort] = useState<string>(search.sort ?? "popular");
  const [query, setQuery] = useState("");

  const products = useProducts();
  const filtered = useMemo(() => {
    let list = products;
    if (active !== "all") list = list.filter((p) => p.category === active);
    if (query) list = list.filter((p) => (p.name + p.tagline).toLowerCase().includes(query.toLowerCase()));
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      default: list = [...list].sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [products, active, sort, query]);

  return (
    <>
      <section className="bg-cream/60 border-b border-border">
        <div className="container-x py-16 text-center">
          <div className="eyebrow">The collection</div>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">Herbal tea, every ritual.</h1>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Single-origin botanicals, blended with intention. Find the ritual your body is asking for.
          </p>
        </div>
      </section>

      <section className="container-x py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterChip active={active === "all"} onClick={() => setActive("all")}>All</FilterChip>
            {categories.map((c) => (
              <FilterChip key={c.id} active={active === c.id} onClick={() => setActive(c.id)}>
                {c.label}
              </FilterChip>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search teas" className="pl-9 w-56 bg-ivory" />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-ivory border border-input rounded-md px-3 text-sm"
            >
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No teas match — try another filter.</div>
        )}
      </section>
    </>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
        active ? "bg-sage-deep text-ivory border-sage-deep" : "bg-ivory border-border hover:border-sage-deep"
      }`}
    >
      {children}
    </button>
  );
}
