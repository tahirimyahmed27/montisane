import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, categories, type Category } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Boutique de tisanes — Montisane" },
      { name: "description", content: "Découvrez toute la collection de tisanes médicinales Montisane — sommeil, stress, digestion, énergie, détox et immunité." },
      { property: "og:title", content: "Boutique — Montisane" },
      { property: "og:description", content: "Toutes les tisanes médicinales Montisane." },
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
  const { t, loc } = useI18n();
  const [active, setActive] = useState<Category | "all">(search.category ?? "all");
  const [sort, setSort] = useState<string>(search.sort ?? "popular");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = products;
    if (active !== "all") list = list.filter((p) => p.category === active);
    if (query) list = list.filter((p) => (loc(p.name) + " " + loc(p.tagline)).toLowerCase().includes(query.toLowerCase()));
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      default: list = [...list].sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [active, sort, query, loc]);

  return (
    <>
      <section className="bg-cream/60 border-b border-border">
        <div className="container-x py-16 text-center">
          <div className="eyebrow">{t("shop.eyebrow")}</div>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">{t("shop.title")}</h1>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">{t("shop.subtitle")}</p>
        </div>
      </section>

      <section className="container-x py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterChip active={active === "all"} onClick={() => setActive("all")}>{t("shop.all")}</FilterChip>
            {categories.map((c) => (
              <FilterChip key={c.id} active={active === c.id} onClick={() => setActive(c.id)}>
                {loc(c.label)}
              </FilterChip>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("shop.search")} className="pl-9 w-56 bg-ivory" />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-ivory border border-input rounded-md px-3 text-sm"
            >
              <option value="popular">{t("shop.sort.popular")}</option>
              <option value="rating">{t("shop.sort.rating")}</option>
              <option value="price-asc">{t("shop.sort.asc")}</option>
              <option value="price-desc">{t("shop.sort.desc")}</option>
            </select>
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">{t("shop.empty")}</div>
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
