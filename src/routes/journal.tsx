import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { articleCategories } from "@/lib/articles";
import { useArticles } from "@/lib/store";

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

function Journal() {
  const articles = useArticles();
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(
    () => (active === "All" ? articles : articles.filter((a) => a.category === active)),
    [articles, active]
  );

  return (
    <>
      <section className="bg-cream/60 border-b border-border">
        <div className="container-x py-16 text-center">
          <div className="eyebrow">The journal</div>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">Herbal wisdom, weekly.</h1>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Essays, remedies, and traditional knowledge from our herbalists and Atlas mountain partners.
          </p>
        </div>
      </section>
      <section className="container-x py-16">
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", ...articleCategories].map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                active === c
                  ? "bg-sage-deep text-ivory border-sage-deep"
                  : "bg-ivory border-border hover:border-sage-deep"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((a) => (
            <article key={a.slug} className="group bg-card rounded-xl overflow-hidden border border-border flex flex-col">
              <Link to="/journal/$slug" params={{ slug: a.slug }} className="block aspect-[4/3] overflow-hidden bg-sage/20">
                {a.image && (
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </Link>
              <div className="p-6 flex-1 flex flex-col">
                <div className="eyebrow">{a.category}</div>
                <h2 className="mt-2 font-serif text-xl leading-snug">
                  <Link to="/journal/$slug" params={{ slug: a.slug }} className="hover:text-sage-deep">
                    {a.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3 flex-1">{a.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{a.readTime} read</span>
                  <Link
                    to="/journal/$slug"
                    params={{ slug: a.slug }}
                    className="text-sm font-medium text-sage-deep hover:underline"
                  >
                    Lire la suite →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
