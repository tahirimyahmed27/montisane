import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { getJournalArticle } from "@/lib/journal";
import { getProduct, type Product } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { ArrowLeft } from "lucide-react";

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
  const { loc, lang } = useI18n();

  const related: Product[] = [];
  for (const slug of article.relatedProducts ?? []) {
    const p = getProduct(slug);
    if (p) related.push(p);
  }

  const contentLines = loc(article.content).split("\n");

  return (
    <>
      <section className="bg-cream/60 border-b border-border">
        <div className="container-x py-12 md:py-16 max-w-3xl mx-auto">
          <Link to="/journal" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ink underline underline-offset-4">
            <ArrowLeft className="h-4 w-4" />
            {lang === "fr" ? "Retour au journal" : "Back to journal"}
          </Link>
          <div className="mt-6">
            <div className="eyebrow">{loc(article.category)}</div>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">{loc(article.title)}</h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
              <span>{new Date(article.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span>·</span>
              <span>{article.readTime} {lang === "fr" ? "de lecture" : "read"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-12 max-w-3xl mx-auto">
        <div className="aspect-[4/3] bg-sage/20 rounded-xl mb-10" />

        <div className="prose prose-stone max-w-none">
          {contentLines.map((line, i) => {
            const trimmed = line.trim();
            if (trimmed.startsWith("## ")) {
              return <h2 key={i} className="font-serif text-2xl mt-10 mb-4">{trimmed.replace("## ", "")}</h2>;
            }
            if (trimmed.startsWith("**") && trimmed.includes("**")) {
              return <p key={i} className="font-medium mt-4">{trimmed.replace(/\*\*/g, "")}</p>;
            }
            if (trimmed.startsWith("- ")) {
              return <li key={i} className="ml-4">{trimmed.replace("- ", "")}</li>;
            }
            if (trimmed.match(/^\d+\. /)) {
              return <li key={i} className="ml-4">{trimmed.replace(/^\d+\. /, "")}</li>;
            }
            if (trimmed === "") return null;
            return <p key={i} className="text-muted-foreground leading-relaxed mt-4">{trimmed}</p>;
          })}
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-12">
            <h2 className="font-serif text-2xl mb-6">
              {lang === "fr" ? "Produits liés" : "Related products"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => p && <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
