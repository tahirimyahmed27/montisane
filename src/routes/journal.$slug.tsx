import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { baseArticles } from "@/lib/articles";
import { useArticles } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = baseArticles.find((a) => a.slug === params.slug) ?? null;
    return { article, slug: params.slug };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Article — Montisane" }] };
    return {
      meta: [
        { title: `${a.title} — Montisane Journal` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:image", content: a.image },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/journal/${a.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="font-serif text-3xl">Article not found</h1>
      <Button asChild className="mt-6"><Link to="/journal">Back to journal</Link></Button>
    </div>
  ),
  errorComponent: () => <div className="container-x py-32 text-center">Something went wrong.</div>,
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useLoaderData();
  const all = useArticles();
  const article = all.find((a) => a.slug === slug);

  if (!article) {
    throw notFound();
  }

  const related = all.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article>
      <section className="bg-cream/60 border-b border-border">
        <div className="container-x py-12 lg:py-20 max-w-3xl">
          <Link to="/journal" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-sage-deep">
            <ArrowLeft className="h-4 w-4" /> Journal
          </Link>
          <div className="eyebrow mt-6">{article.category}</div>
          <h1 className="mt-3 font-serif text-4xl md:text-6xl leading-tight">{article.title}</h1>
          <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{article.author}</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime} read</span>
          </div>
        </div>
      </section>

      {article.image && (
        <div className="container-x py-10">
          <div className="aspect-[16/8] overflow-hidden rounded-2xl bg-cream max-w-5xl mx-auto">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <section className="container-x pb-20">
        <div className="max-w-2xl mx-auto">
          <p className="font-serif text-2xl leading-relaxed text-ink/90 first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-2 first-letter:leading-none">
            {article.body[0]}
          </p>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink/85">
            {article.body.slice(1).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <div className="text-sm text-muted-foreground">Written by</div>
            <div className="mt-1 font-serif text-xl">{article.author}</div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-cream/60 border-t border-border">
          <div className="container-x py-16">
            <h2 className="font-serif text-3xl">Continue reading</h2>
            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to="/journal/$slug"
                  params={{ slug: a.slug }}
                  className="group bg-card rounded-xl overflow-hidden border border-border"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-sage/20">
                    {a.image && (
                      <img src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="eyebrow">{a.category}</div>
                    <div className="mt-2 font-serif text-lg">{a.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
