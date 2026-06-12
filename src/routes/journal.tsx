import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { journalArticles } from "@/lib/journal";
import { JournalCard } from "@/components/site/JournalCard";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Le Journal — Meditisane" },
      { name: "description", content: "Sagesse herbale, essais bien-être et remèdes traditionnels — par l'éditorial Meditisane." },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: Journal,
});

function Journal() {
  const { t, loc } = useI18n();
  const cats = [t("journal.cat.remedies"), t("journal.cat.wellness"), t("journal.cat.nutrition"), t("journal.cat.tradition")];
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sage/10 to-cream/60 border-b border-border">
        <div className="container-x py-20 md:py-24 text-center">
          <div className="eyebrow animate-fade-in">{t("journal.eyebrow")}</div>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl mx-auto">
            {t("journal.title")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explorez notre collection d'essais sur les plantes, la tradition herbale et le bien-être moderne.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="container-x py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl">{t("journal.all")}</h2>
            <p className="text-sm text-muted-foreground mt-1">{journalArticles.length} articles</p>
          </div>
        </div>
        
        {/* Category Pills - Optional but nice for filtering */}
        <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-border/40">
          {[t("journal.all"), ...cats].map((c) => (
            <button
              key={c}
              className="px-4 py-2 rounded-full text-sm border border-border bg-ivory hover:bg-sage/10 hover:border-sage-deep transition-all duration-200"
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container-x py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {journalArticles.map((article) => (
            <JournalCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="container-x py-20 mt-12">
        <div className="bg-sage-deep text-ivory rounded-2xl p-12 text-center">
          <h2 className="font-serif text-4xl mb-4">Découvrez nos nouvelles publications</h2>
          <p className="text-ivory/80 mb-6 max-w-md mx-auto">
            Recevez nos essais hebdomadaires directement dans votre boîte mail.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="vous@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-ivory text-ink placeholder:text-muted-foreground focus:outline-none"
            />
            <button className="px-6 py-3 bg-gold text-ink font-medium rounded-lg hover:bg-gold/90 transition">
              S'abonner
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
