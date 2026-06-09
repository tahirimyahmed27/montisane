import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { products, categories, bundles, getProduct } from "@/lib/products";
import heroImg from "@/assets/hero.jpg";
import lifestyleImg from "@/assets/lifestyle.jpg";
import { Leaf, ShieldCheck, Sparkles, Recycle, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Montisane — Traditional Herbal Teas for Modern Wellness" },
      { name: "description", content: "Premium medicinal herbal tea blends — Moroccan-Mediterranean wisdom for sleep, stress, digestion, energy, detox and immunity." },
      { property: "og:title", content: "Montisane — Traditional Herbal Teas" },
      { property: "og:description", content: "Premium medicinal herbal tea blends for daily rituals." },
      { property: "og:image", content: "/og-home.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const benefits = [
  { icon: Leaf, title: "100% Natural", body: "Whole-leaf herbs, no fillers, no flavorings." },
  { icon: Sparkles, title: "Traditional Wisdom", body: "Recipes rooted in Mediterranean herbal craft." },
  { icon: ShieldCheck, title: "Lab Tested", body: "Every batch screened for purity and potency." },
  { icon: Recycle, title: "Sustainable", body: "Compostable sachets and recyclable tins." },
];

const testimonials = [
  { name: "Sofia R.", text: "Moonlight Blend changed my evenings. I sleep deeper than I have in years.", concern: "Better Sleep" },
  { name: "Daniel K.", text: "After-Meal Calm is the only thing that quiets my reflux. Genuinely incredible.", concern: "Digestive Wellness" },
  { name: "Amira B.", text: "Still Water is my afternoon ritual. I feel grounded again, even on chaotic days.", concern: "Stress Relief" },
];

const faqs = [
  { q: "Are your teas caffeine-free?", a: "Most of our blends are 100% caffeine-free. Golden Spark contains yerba mate for clean energy — it's clearly labeled." },
  { q: "How long until I feel the effects?", a: "Digestive blends often work within 20 minutes. Adaptogens and sleep blends are best after 7–14 days of daily ritual use." },
  { q: "Are your blends safe during pregnancy?", a: "Some herbs are not recommended during pregnancy. Please consult your physician before use." },
  { q: "How are they packaged?", a: "In airtight recyclable tins with compostable pyramid sachets — no plastic, no microplastics in your cup." },
];

function HomePage() {
  const bestSellers = products.filter((p) => p.bestSeller);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 lg:py-20">
          <div className="max-w-xl">
            <div className="eyebrow">Moroccan-Mediterranean herbal craft</div>
            <h1 className="mt-4 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
              Ancient rituals.<br />
              <span className="text-sage-deep italic">Quietly modern.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Traditional medicinal teas, blended by herbalists. Crafted to support sleep,
              digestion, stress, immunity and energy — naturally, every day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/shop">Shop the collection</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/about">Our story</Link></Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
                <span className="ml-1">4.9 / 5</span>
              </div>
              <span>· 12,000+ daily rituals</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-sage/20 rounded-3xl blur-3xl -z-10" />
            <img src={heroImg} alt="Herbal tea ritual" width={1600} height={1200}
              className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
          </div>
        </div>
      </section>

      {/* BENEFITS */}
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

      {/* BEST SELLERS */}
      <section className="container-x py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow">Most loved</div>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl">Best sellers</h2>
          </div>
          <Link to="/shop" className="hidden md:inline text-sm underline underline-offset-4">Shop all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {bestSellers.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* SHOP BY CONCERN */}
      <section className="bg-cream/60 border-y border-border">
        <div className="container-x py-20">
          <div className="text-center max-w-xl mx-auto">
            <div className="eyebrow">Shop by health concern</div>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl">What does your body need today?</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/shop"
                search={{ category: c.id } as any}
                className="group block bg-ivory rounded-xl p-6 border border-border hover:border-sage-deep transition-colors"
              >
                <div className="font-serif text-2xl">{c.label}</div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                <span className="mt-4 inline-block text-xs underline underline-offset-4 group-hover:text-sage-deep">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="container-x py-24 grid lg:grid-cols-2 gap-12 items-center">
        <img src={lifestyleImg} alt="Hand-pouring herbal tea" loading="lazy" width={1400} height={1000}
          className="rounded-2xl w-full aspect-[5/4] object-cover" />
        <div className="max-w-md">
          <div className="eyebrow">Our story</div>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">A herbal tradition, gently modernized.</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Montisane began in a small kitchen in Marrakech, where generations of women blended
            herbs from the Atlas mountains to care for their families. Today we partner directly
            with cooperatives to bring those time-honored recipes — verified by modern science —
            into your daily ritual.
          </p>
          <Button asChild variant="link" className="mt-4 px-0"><Link to="/about">Read our story →</Link></Button>
        </div>
      </section>

      {/* BUNDLES */}
      <section className="bg-sage-deep text-ivory">
        <div className="container-x py-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <div className="eyebrow text-gold">Save more · Live well</div>
              <h2 className="mt-2 font-serif text-4xl md:text-5xl">Signature bundles</h2>
            </div>
            <p className="text-sm opacity-80 max-w-sm">Curated rituals — designed for a specific goal, priced to invite a full reset.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {bundles.map((b) => {
              const items = b.items.map(getProduct).filter(Boolean);
              return (
                <div key={b.slug} className="bg-ivory text-ink rounded-xl p-6 flex flex-col">
                  <div className="flex gap-2 mb-4">
                    {items.map((p) => p && (
                      <img key={p.slug} src={p.image} alt={p.name} className="h-20 w-16 object-cover rounded bg-cream" />
                    ))}
                  </div>
                  <div className="font-serif text-2xl">{b.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {items.map((p) => p?.name).join(" + ")}
                  </div>
                  <div className="mt-auto pt-4 flex items-end justify-between">
                    <div>
                      <div className="text-lg font-medium">${b.price}</div>
                      <div className="text-xs text-sage-deep">Save ${b.save}</div>
                    </div>
                    <Button asChild size="sm" variant="outline"><Link to="/bundles">View →</Link></Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-x py-24">
        <div className="text-center max-w-xl mx-auto">
          <div className="eyebrow">Real rituals</div>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl">Loved by herbal devotees</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="bg-cream/60 border border-border rounded-xl p-8">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
              </div>
              <blockquote className="mt-4 font-serif text-xl leading-snug">"{t.text}"</blockquote>
              <figcaption className="mt-6 text-sm">
                <div className="font-medium">{t.name}</div>
                <div className="text-muted-foreground text-xs">{t.concern} ritual</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* JOURNAL */}
      <section className="bg-cream/60 border-y border-border">
        <div className="container-x py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="eyebrow">The journal</div>
              <h2 className="mt-2 font-serif text-4xl md:text-5xl">Herbal wisdom, weekly</h2>
            </div>
            <Link to="/journal" className="hidden md:inline text-sm underline underline-offset-4">All articles</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "5 herbs for restful sleep", cat: "Wellness" },
              { title: "Why your gut loves bitter herbs", cat: "Nutrition" },
              { title: "Inside an Atlas herb cooperative", cat: "Traditional Wisdom" },
            ].map((a) => (
              <article key={a.title} className="bg-ivory rounded-xl overflow-hidden border border-border">
                <div className="aspect-[4/3] bg-sage/20" />
                <div className="p-6">
                  <div className="eyebrow">{a.cat}</div>
                  <h3 className="mt-2 font-serif text-xl">{a.title}</h3>
                  <Link to="/journal" className="mt-3 inline-block text-xs underline underline-offset-4">Read more →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-24 grid lg:grid-cols-2 gap-12">
        <div>
          <div className="eyebrow">FAQ</div>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl max-w-md">Questions, gently answered.</h2>
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

      {/* NEWSLETTER */}
      <section className="bg-sage-deep text-ivory">
        <div className="container-x py-20 text-center max-w-2xl mx-auto">
          <div className="eyebrow text-gold">Join the ritual</div>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">10% off your first ritual</h2>
          <p className="mt-4 opacity-80">
            Subscribe for slow living essays, herbal guides and member-only releases.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" placeholder="you@email.com" required
              className="bg-ivory text-ink placeholder:text-muted-foreground" />
            <Button type="submit" variant="secondary" size="lg" className="bg-gold text-ink hover:bg-gold/90">Subscribe</Button>
          </form>
        </div>
      </section>
    </>
  );
}
