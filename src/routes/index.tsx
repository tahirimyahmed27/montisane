import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { products, categories, bundles, getProduct } from "@/lib/products";
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/hero.jpg";
import lifestyleImg from "@/assets/lifestyle.jpg";
import { Leaf, ShieldCheck, Sparkles, Recycle, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Montisane — Tisanes traditionnelles pour le bien-être moderne" },
      { name: "description", content: "Tisanes médicinales premium — savoir marocain-méditerranéen pour sommeil, stress, digestion, énergie, détox et immunité." },
      { property: "og:title", content: "Montisane — Tisanes traditionnelles" },
      { property: "og:description", content: "Tisanes médicinales premium pour vos rituels quotidiens." },
      { property: "og:image", content: "/og-home.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { t, loc } = useI18n();
  const bestSellers = products.filter((p) => p.bestSeller);

  const benefits = [
    { icon: Leaf, title: t("home.benefits.natural"), body: t("home.benefits.naturalBody") },
    { icon: Sparkles, title: t("home.benefits.tradition"), body: t("home.benefits.traditionBody") },
    { icon: ShieldCheck, title: t("home.benefits.tested"), body: t("home.benefits.testedBody") },
    { icon: Recycle, title: t("home.benefits.sustainable"), body: t("home.benefits.sustainableBody") },
  ];

  const testimonials = [
    { name: "Sofia R.", text: t("home.test.0.text"), concern: loc({ fr: "Meilleur sommeil", en: "Better Sleep" }) },
    { name: "Daniel K.", text: t("home.test.1.text"), concern: loc({ fr: "Bien-être digestif", en: "Digestive Wellness" }) },
    { name: "Amira B.", text: t("home.test.2.text"), concern: loc({ fr: "Anti-stress", en: "Stress Relief" }) },
  ];

  const faqs = [0, 1, 2, 3].map((i) => ({ q: t(`home.faq.${i}.q`), a: t(`home.faq.${i}.a`) }));
  const journalCards = [
    { title: t("home.journal.0.title"), cat: t("home.journal.0.cat"), slug: "plantes-sommeil" },
    { title: t("home.journal.1.title"), cat: t("home.journal.1.cat"), slug: "digestion-mediterraneenne" },
    { title: t("home.journal.2.title"), cat: t("home.journal.2.cat"), slug: "adaptogenes" },
  ];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 lg:py-20">
          <div className="max-w-xl">
            <div className="eyebrow">{t("home.hero.eyebrow")}</div>
            <h1 className="mt-4 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
              {t("home.hero.title1")}<br />
              <span className="text-sage-deep italic">{t("home.hero.title2")}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t("home.hero.subtitle")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/shop">{t("home.hero.shop")}</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/about">{t("home.hero.story")}</Link></Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
                <span className="ml-1">4.9 / 5</span>
              </div>
              <span>{t("home.hero.daily")}</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-sage/20 rounded-3xl blur-3xl -z-10" />
            <img src={heroImg} alt="Herbal tea ritual" width={1600} height={1200}
              className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-cream/60">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          {benefits.map((b) => (
            <div key={b.title} className="flex flex-col items-center text-center">
              <b.icon className="h-7 w-7 text-sage-deep" />
              <div className="mt-3 font-serif text-lg">{b.title}</div>
              <div className="text-xs text-muted-foreground mt-1 max-w-[180px]">{b.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow">{t("home.best.eyebrow")}</div>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl">{t("home.best.title")}</h2>
          </div>
          <Link to="/shop" className="hidden md:inline text-sm underline underline-offset-4">{t("home.best.shopAll")}</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {bestSellers.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section className="bg-cream/60 border-y border-border">
        <div className="container-x py-20">
          <div className="text-center max-w-xl mx-auto">
            <div className="eyebrow">{t("home.concern.eyebrow")}</div>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl">{t("home.concern.title")}</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/shop"
                search={{ category: c.id } as any}
                className="group block bg-ivory rounded-xl p-6 border border-border hover:border-sage-deep transition-colors"
              >
                <div className="font-serif text-2xl">{loc(c.label)}</div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{loc(c.description)}</p>
                <span className="mt-4 inline-block text-xs underline underline-offset-4 group-hover:text-sage-deep">{t("home.concern.explore")}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24 grid lg:grid-cols-2 gap-12 items-center">
        <img src={lifestyleImg} alt="Hand-pouring herbal tea" loading="lazy" width={1400} height={1000}
          className="rounded-2xl w-full aspect-[5/4] object-cover" />
        <div className="max-w-md">
          <div className="eyebrow">{t("home.story.eyebrow")}</div>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">{t("home.story.title")}</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">{t("home.story.body")}</p>
          <Button asChild variant="link" className="mt-4 px-0"><Link to="/about">{t("home.story.read")}</Link></Button>
        </div>
      </section>

      <section className="bg-sage-deep text-ivory">
        <div className="container-x py-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <div className="eyebrow text-gold">{t("home.bundles.eyebrow")}</div>
              <h2 className="mt-2 font-serif text-4xl md:text-5xl">{t("home.bundles.title")}</h2>
            </div>
            <p className="text-sm opacity-80 max-w-sm">{t("home.bundles.copy")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {bundles.map((b) => {
              const items = b.items.map(getProduct).filter(Boolean);
              return (
                <div key={b.slug} className="bg-ivory text-ink rounded-xl p-6 flex flex-col">
                  <div className="flex gap-2 mb-4">
                    {items.map((p) => p && (
                      <img key={p.slug} src={p.image} alt={loc(p.name)} className="h-20 w-16 object-cover rounded bg-cream" />
                    ))}
                  </div>
                  <div className="font-serif text-2xl">{loc(b.name)}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {items.map((p) => p && loc(p.name)).join(" + ")}
                  </div>
                  <div className="mt-auto pt-4 flex items-end justify-between">
                    <div>
                      <div className="text-lg font-medium">${b.price}</div>
                      <div className="text-xs text-sage-deep">{t("home.bundles.save")} ${b.save}</div>
                    </div>
                    <Button asChild size="sm" variant="outline"><Link to="/bundles">{t("home.bundles.view")}</Link></Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <div className="text-center max-w-xl mx-auto">
          <div className="eyebrow">{t("home.test.eyebrow")}</div>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl">{t("home.test.title")}</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials.map((tt) => (
            <figure key={tt.name} className="bg-cream/60 border border-border rounded-xl p-8">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
              </div>
              <blockquote className="mt-4 font-serif text-xl leading-snug">"{tt.text}"</blockquote>
              <figcaption className="mt-6 text-sm">
                <div className="font-medium">{tt.name}</div>
                <div className="text-muted-foreground text-xs">{tt.concern} · {t("home.test.ritual")}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-cream/60 border-y border-border">
        <div className="container-x py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="eyebrow">{t("home.journal.eyebrow")}</div>
              <h2 className="mt-2 font-serif text-4xl md:text-5xl">{t("home.journal.title")}</h2>
            </div>
            <Link to="/journal" className="hidden md:inline text-sm underline underline-offset-4">{t("home.journal.all")}</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {journalCards.map((a) => (
              <article key={a.title} className="bg-ivory rounded-xl overflow-hidden border border-border">
                <div className="aspect-[4/3] bg-sage/20" />
                <div className="p-6">
                  <div className="eyebrow">{a.cat}</div>
                  <h3 className="mt-2 font-serif text-xl">{a.title}</h3>
                  <Link to="/journal/$slug" params={{ slug: a.slug }} className="mt-3 inline-block text-xs underline underline-offset-4">{t("home.journal.read")}</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24 grid lg:grid-cols-2 gap-12">
        <div>
          <div className="eyebrow">{t("home.faq.eyebrow")}</div>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl max-w-md">{t("home.faq.title")}</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`}>
              <AccordionTrigger className="font-serif text-lg text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="bg-sage-deep text-ivory">
        <div className="container-x py-20 text-center max-w-2xl mx-auto">
          <div className="eyebrow text-gold">{t("home.news.eyebrow")}</div>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">{t("home.news.title")}</h2>
          <p className="mt-4 opacity-80">{t("home.news.copy")}</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" placeholder="you@email.com" required
              className="bg-ivory text-ink placeholder:text-muted-foreground" />
            <Button type="submit" variant="secondary" size="lg" className="bg-gold text-ink hover:bg-gold/90">{t("home.news.subscribe")}</Button>
          </form>
        </div>
      </section>
    </>
  );
}
