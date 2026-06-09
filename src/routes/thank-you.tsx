import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/thank-you")({
  head: () => ({ meta: [{ title: "Merci — Montisane" }, { name: "robots", content: "noindex" }] }),
  component: ThankYou,
});

function ThankYou() {
  const { add } = useCart();
  const { t, loc } = useI18n();
  const offer = products[3];
  return (
    <div className="container-x py-16 max-w-3xl">
      <div className="text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-sage-deep text-ivory flex items-center justify-center">
          <Check className="h-7 w-7" />
        </div>
        <h1 className="mt-6 font-serif text-4xl md:text-5xl">{t("thanks.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("thanks.copy")}</p>
      </div>

      <div className="mt-12 p-8 rounded-2xl border-2 border-gold bg-gold/10 text-center">
        <div className="eyebrow text-clay">{t("thanks.offer.eyebrow")}</div>
        <h2 className="mt-3 font-serif text-3xl">{t("thanks.offer.title1")} {loc(offer.name)} {t("thanks.offer.title2")}</h2>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">{t("thanks.offer.copy")}</p>
        <div className="mt-4 flex items-center justify-center gap-3 text-sm">
          <span className="line-through text-muted-foreground">${offer.price}</span>
          <span className="font-medium text-lg">${(offer.price * 0.7).toFixed(2)}</span>
        </div>
        <Button size="lg" className="mt-6" onClick={() => add(offer.slug)}>{t("thanks.offer.add")}</Button>
        <div className="mt-3"><Link to="/" className="text-xs underline underline-offset-4">{t("thanks.offer.no")}</Link></div>
      </div>

      <div className="mt-12 text-center">
        <Button asChild variant="outline"><Link to="/shop">{t("thanks.continue")}</Link></Button>
      </div>
    </div>
  );
}
