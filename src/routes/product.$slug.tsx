import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from "@/components/site/ProductCard";
import { Star, Minus, Plus, Truck, ShieldCheck, RefreshCcw, Leaf } from "lucide-react";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Product not found — Montisane" }] };
    return {
      meta: [
        { title: `${p.name} — ${p.categoryLabel} | Montisane` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — Montisane` },
        { property: "og:description", content: p.tagline },
        { property: "og:image", content: p.image },
        { property: "og:type", content: "product" },
      ],
      links: [{ rel: "canonical", href: `/product/${p.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          description: p.description,
          image: p.image,
          offers: { "@type": "Offer", price: p.price, priceCurrency: "USD", availability: "https://schema.org/InStock" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews },
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="font-serif text-3xl">Tea not found</h1>
      <Button asChild className="mt-6"><Link to="/shop">Back to shop</Link></Button>
    </div>
  ),
  errorComponent: () => <div className="container-x py-32 text-center">Something went wrong.</div>,
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [sub, setSub] = useState(false);

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const price = sub ? product.price * 0.9 : product.price;

  return (
    <>
      <section className="container-x py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-cream rounded-2xl overflow-hidden aspect-[4/5]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[0,1,2,3].map((i) => (
                <div key={i} className="aspect-square bg-cream rounded-md overflow-hidden">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-80" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow">{product.categoryLabel}</div>
            <h1 className="mt-2 font-serif text-4xl md:text-5xl">{product.name}</h1>
            <p className="mt-2 text-muted-foreground">{product.tagline}</p>
            <div className="mt-4 flex items-center gap-3 text-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
              </div>
              <span>{product.rating}</span>
              <span className="text-muted-foreground">· {product.reviews} reviews</span>
            </div>

            <p className="mt-6 leading-relaxed">{product.description}</p>

            <div className="mt-8 space-y-3">
              <label className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer ${!sub ? "border-sage-deep bg-cream/40" : "border-border"}`}>
                <input type="radio" name="purchase" checked={!sub} onChange={() => setSub(false)} className="mt-1 accent-sage-deep" />
                <div className="flex-1">
                  <div className="font-medium flex justify-between"><span>One-time purchase</span><span>${product.price.toFixed(2)}</span></div>
                  <div className="text-xs text-muted-foreground">Ships once</div>
                </div>
              </label>
              <label className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer ${sub ? "border-sage-deep bg-cream/40" : "border-border"}`}>
                <input type="radio" name="purchase" checked={sub} onChange={() => setSub(true)} className="mt-1 accent-sage-deep" />
                <div className="flex-1">
                  <div className="font-medium flex justify-between">
                    <span>Subscribe & save <span className="ml-1 text-xs bg-gold/30 text-ink px-2 py-0.5 rounded-full">−10%</span></span>
                    <span>${(product.price * 0.9).toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Delivered every 1, 2, or 3 months. Cancel anytime.</div>
                </div>
              </label>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="inline-flex items-center border border-input rounded-md">
                <button className="p-3" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease"><Minus className="h-4 w-4" /></button>
                <span className="w-10 text-center">{qty}</span>
                <button className="p-3" onClick={() => setQty(qty + 1)} aria-label="Increase"><Plus className="h-4 w-4" /></button>
              </div>
              <Button size="lg" className="flex-1" onClick={() => add(product.slug, qty)}>
                Add to basket · ${(price * qty).toFixed(2)}
              </Button>
            </div>
            <Button variant="outline" size="lg" className="mt-3 w-full" onClick={() => { add(product.slug, qty); setOpen(false); window.location.href = "/checkout"; }}>
              Buy now
            </Button>

            <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
              {[
                { icon: Truck, label: "Free shipping over $60" },
                { icon: ShieldCheck, label: "Secure checkout" },
                { icon: RefreshCcw, label: "30-day guarantee" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center text-center gap-1 p-3 border border-border rounded-md">
                  <b.icon className="h-4 w-4 text-sage-deep" />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>

            <Accordion type="single" collapsible className="mt-10">
              <AccordionItem value="benefits">
                <AccordionTrigger className="font-serif text-lg">Benefits</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {product.benefits.map((b: string) => (
                       <li key={b} className="flex gap-2 items-start"><Leaf className="h-4 w-4 text-sage-deep mt-0.5" /> {b}</li>
                     ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ingredients">
                <AccordionTrigger className="font-serif text-lg">Ingredients</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{product.ingredients.join(" · ")}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="prep">
                <AccordionTrigger className="font-serif text-lg">How to prepare</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{product.preparation}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq">
                <AccordionTrigger className="font-serif text-lg">FAQs</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Caffeine-free unless noted. Safe for daily use. Consult your doctor if pregnant or on medication.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section className="bg-cream/60 border-y border-border">
        <div className="container-x py-16">
          <h2 className="font-serif text-3xl">Frequently bought together</h2>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
