import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Montisane" },
      { name: "description", content: "Réponses aux questions fréquentes sur les tisanes Montisane, les abonnements et la livraison." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQ,
});

function FAQ() {
  const { t } = useI18n();
  const groups = [
    { title: t("faq.g0.title"), items: [0, 1, 2].map((i) => ({ q: t(`faq.g0.${i}.q`), a: t(`faq.g0.${i}.a`) })) },
    { title: t("faq.g1.title"), items: [0, 1, 2].map((i) => ({ q: t(`faq.g1.${i}.q`), a: t(`faq.g1.${i}.a`) })) },
    { title: t("faq.g2.title"), items: [0, 1].map((i) => ({ q: t(`faq.g2.${i}.q`), a: t(`faq.g2.${i}.a`) })) },
  ];
  return (
    <section className="container-x py-20 max-w-3xl">
      <div className="eyebrow text-center">{t("faq.eyebrow")}</div>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl text-center">{t("faq.title")}</h1>
      {groups.map((g) => (
        <div key={g.title} className="mt-12">
          <h2 className="font-serif text-2xl mb-4">{g.title}</h2>
          <Accordion type="single" collapsible>
            {g.items.map((it, i) => (
              <AccordionItem key={i} value={`${g.title}-${i}`}>
                <AccordionTrigger className="text-left font-serif text-lg">{it.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{it.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </section>
  );
}
