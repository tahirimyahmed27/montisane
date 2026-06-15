import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/thank-you")({
  head: () => ({ meta: [{ title: "Thank you — Montisane" }, { name: "robots", content: "noindex" }] }),
  component: ThankYou,
});

function ThankYou() {
  const { add } = useCart();
  const offer = products[3]; // Golden Spark or similar
  return (
    <div className="container-x py-16 max-w-3xl">
      <div className="text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-sage-deep text-ivory flex items-center justify-center">
          <Check className="h-7 w-7" />
        </div>
        <h1 className="mt-6 font-serif text-4xl md:text-5xl">Your ritual is on its way</h1>
        <p className="mt-3 text-muted-foreground">
          A confirmation has been sent to your email. Most orders ship within 24 hours.
        </p>
      </div>

      <div className="mt-12 p-8 rounded-2xl border-2 border-gold bg-gold/10 text-center">
        <div className="eyebrow text-clay">One-time special offer</div>
        <h2 className="mt-3 font-serif text-3xl">Add {offer.name} for 30% off</h2>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          Available only on this page. We'll add it to your shipment — no new checkout needed.
        </p>
        <div className="mt-4 flex items-center justify-center gap-3 text-sm">
          <span className="line-through text-muted-foreground">${offer.price}</span>
          <span className="font-medium text-lg">${(offer.price * 0.7).toFixed(2)}</span>
        </div>
        <Button size="lg" className="mt-6" onClick={() => add(offer.slug)}>Yes, add it to my order</Button>
        <div className="mt-3"><Link to="/" className="text-xs underline underline-offset-4">No thanks, continue</Link></div>
      </div>

      <div className="mt-12 text-center">
        <Button asChild variant="outline"><Link to="/shop">Continue shopping</Link></Button>
      </div>
    </div>
  );
}
