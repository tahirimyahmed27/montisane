import { createFileRoute } from "@tanstack/react-router";
import lifestyle from "@/assets/lifestyle.jpg";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Notre histoire — Montisane" },
      { name: "description", content: "L'histoire de Montisane — tradition herbale marocaine-méditerranéenne pour le bien-être moderne." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  const cards = [0, 1, 2].map((i) => ({ t: t(`about.c${i}.t`), b: t(`about.c${i}.b`) }));
  return (
    <>
      <section className="container-x py-20 text-center max-w-2xl">
        <div className="eyebrow">{t("about.eyebrow")}</div>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl">{t("about.title")}</h1>
        <p className="mt-6 text-lg text-muted-foreground">{t("about.intro")}</p>
      </section>
      <img src={lifestyle} alt="" className="w-full max-h-[60vh] object-cover" loading="lazy" />
      <section className="container-x py-20 grid md:grid-cols-3 gap-12 max-w-4xl">
        {cards.map((c) => (
          <div key={c.t}>
            <h3 className="font-serif text-2xl">{c.t}</h3>
            <p className="mt-3 text-muted-foreground">{c.b}</p>
          </div>
        ))}
      </section>
    </>
  );
}
