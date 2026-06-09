import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Le Journal — Montisane" },
      { name: "description", content: "Sagesse herbale, essais bien-être et remèdes traditionnels — par l'éditorial Montisane." },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: Journal,
});

function Journal() {
  const { t } = useI18n();
  const cats = [t("journal.cat.remedies"), t("journal.cat.wellness"), t("journal.cat.nutrition"), t("journal.cat.tradition")];
  const articles = [
    { title: t("journal.a0"), cat: t("journal.cat.remedies"), read: "6 min" },
    { title: t("journal.a1"), cat: t("journal.cat.nutrition"), read: "8 min" },
    { title: t("journal.a2"), cat: t("journal.cat.wellness"), read: "5 min" },
    { title: t("journal.a3"), cat: t("journal.cat.tradition"), read: "10 min" },
    { title: t("journal.a4"), cat: t("journal.cat.remedies"), read: "7 min" },
    { title: t("journal.a5"), cat: t("journal.cat.wellness"), read: "4 min" },
  ];
  return (
    <>
      <section className="bg-cream/60 border-b border-border">
        <div className="container-x py-16 text-center">
          <div className="eyebrow">{t("journal.eyebrow")}</div>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">{t("journal.title")}</h1>
        </div>
      </section>
      <section className="container-x py-16">
        <div className="flex flex-wrap gap-2 mb-10">
          {[t("journal.all"), ...cats].map((c) => (
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
                <div className="mt-3 text-xs text-muted-foreground">{a.read} {t("journal.read")}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
