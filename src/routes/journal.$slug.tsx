import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { getJournalArticle, journalArticles } from "@/lib/journal";
import { getProduct, type Product } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { ArrowLeft, Share2, Calendar } from "lucide-react";

export const Route = createFileRoute("/journal/$slug")({
  head: ({ params }) => {
    const article = getJournalArticle(params.slug);
    const title = article?.title.fr ?? "Article";
    return {
      meta: [
        { title: `${title} — Le Journal | Montisane` },
        { name: "description", content: article?.excerpt.fr ?? "" },
      ],
      links: [{ rel: "canonical", href: `/journal/${params.slug}` }],
    };
  },
  loader: ({ params }) => {
    const article = getJournalArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  notFoundComponent: () => {
    const { t } = useI18n();
    return (
      <div className="container-x py-20 text-center">
        <h1 className="font-serif text-4xl">{t("journal.notFound")}</h1>
        <Link to="/journal" className="mt-4 inline-block underline underline-offset-4">
          {t("journal.back")}
        </Link>
      </div>
    );
  },
  errorComponent: () => {
    const { t } = useI18n();
    return (
      <div className="container-x py-20 text-center">
        <h1 className="font-serif text-4xl">{t("error.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("error.copy")}</p>
        <Link to="/journal" className="mt-4 inline-block underline underline-offset-4">
          {t("journal.back")}
        </Link>
      </div>
    );
  },
  component: JournalArticlePage,
});

function JournalArticlePage() {
  const { article } = Route.useLoaderData();
  const { loc, lang, t } = useI18n();

  const related: Product[] = [];
  for (const slug of article.relatedProducts ?? []) {
    const p = getProduct(slug);
    if (p) related.push(p);
  }

  const contentLines = loc(article.content).split("\n");

  // Get related articles (excluding current one)
  const relatedArticles = journalArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${loc(article.title)} - ${loc(article.excerpt)}`;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sage/10 to-cream/60 border-b border-border">
        <div className="container-x py-12 md:py-16 max-w-3xl mx-auto">
          {/* Back Button */}
          <Link
            to="/journal"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ink underline underline-offset-4 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t("journal.back")}
          </Link>

          {/* Header */}
          <div className="mt-8">
            <div className="inline-flex">
              <span className="text-xs font-medium tracking-widest uppercase bg-sage/10 text-sage-deep px-3 py-1 rounded-full">
                {loc(article.category)}
              </span>
            </div>

            <h1 className="mt-5 font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
              {loc(article.title)}
            </h1>

            {/* Meta Information */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(article.date).toLocaleDateString(
                    lang === "fr" ? "fr-FR" : "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </span>
              </div>
              <span>·</span>
              <span>{article.readTime} {t("journal.minRead")}</span>
              <span>·</span>
              <span className="text-xs">{loc(article.excerpt).length} mots</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-x py-12 md:py-16 max-w-3xl mx-auto">
        {/* Featured Image */}
        <div className="aspect-[16/9] bg-gradient-to-br from-sage/20 to-cream/40 rounded-2xl mb-12 overflow-hidden border border-border/40" />

        {/* Article Content */}
        <article className="prose prose-stone max-w-none">
          {contentLines.map((line, i) => {
            const trimmed = line.trim();
            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={i} className="font-serif text-3xl mt-12 mb-6 text-ink">
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }
            if (trimmed.startsWith("**") && trimmed.includes("**")) {
              return (
                <p key={i} className="font-semibold text-lg mt-6 mb-4 text-ink">
                  {trimmed.replace(/\*\*/g, "")}
                </p>
              );
            }
            if (trimmed.startsWith("- ")) {
              return (
                <li key={i} className="ml-6 mt-2 text-muted-foreground leading-relaxed">
                  {trimmed.replace("- ", "")}
                </li>
              );
            }
            if (trimmed.match(/^\d+\. /)) {
              return (
                <li key={i} className="ml-6 mt-2 text-muted-foreground leading-relaxed">
                  {trimmed.replace(/^\d+\. /, "")}
                </li>
              );
            }
            if (trimmed === "") return null;
            return (
              <p key={i} className="text-muted-foreground leading-relaxed mt-4 text-lg">
                {trimmed}
              </p>
            );
          })}
        </article>

        {/* Share & Social */}
        <div className="mt-12 pt-8 border-t border-border flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">Partager:</span>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: loc(article.title),
                  text: loc(article.excerpt),
                  url: shareUrl,
                });
              } else {
                navigator.clipboard.writeText(shareUrl);
              }
            }}
            className="inline-flex items-center gap-2 text-sm text-sage-deep hover:text-sage-deep/80 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            Partager
          </button>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="container-x py-16 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl mb-8">
              {t("journal.relatedProducts")}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => p && <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Related Articles */}
      <section className="container-x py-16 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl">
              À découvrir aussi
            </h2>
            <Link
              to="/journal"
              className="text-sm text-sage-deep hover:text-sage-deep/80 underline underline-offset-4"
            >
              Tous les articles
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                to="/journal/$slug"
                params={{ slug: a.slug }}
                className="group block p-5 bg-card border border-border rounded-xl hover:border-sage-deep hover:shadow-md transition-all duration-300"
              >
                <div className="text-xs font-medium tracking-widest uppercase text-sage-deep mb-2">
                  {loc(a.category)}
                </div>
                <h3 className="font-serif text-lg group-hover:text-sage-deep transition-colors">
                  {loc(a.title)}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">
                  {a.readTime} {t("journal.read")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-x py-16">
        <div className="bg-sage-deep text-ivory rounded-2xl p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl mb-4">Continuez votre voyage</h2>
          <p className="text-ivory/80 mb-6">
            Explorez tous nos articles et découvrez les secrets des plantes traditionnelles.
          </p>
          <Link
            to="/journal"
            className="inline-block px-6 py-3 bg-gold text-ink font-medium rounded-lg hover:bg-gold/90 transition"
          >
            Voir tous les articles
          </Link>
        </div>
      </section>
    </>
  );
}
