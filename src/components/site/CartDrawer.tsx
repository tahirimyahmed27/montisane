import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { products } from "@/lib/products";

export function CartDrawer() {
  const { open, setOpen, detailed, subtotal, setQty, remove, add, items } = useCart();
  const { t, loc } = useI18n();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const suggestion = products.find((p) => !items.some((i) => i.slug === p.slug));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col gap-0 p-0 bg-ivory">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle className="font-serif text-2xl">{t("cart.title")}</SheetTitle>
        </SheetHeader>

        <div className="px-6 py-4 border-b border-border bg-cream/60">
          {remaining > 0 ? (
            <p className="text-sm">
              {t("cart.away1")} <span className="font-medium text-sage-deep">${remaining.toFixed(2)}</span> {t("cart.away2")}
            </p>
          ) : (
            <p className="text-sm text-sage-deep font-medium">{t("cart.unlocked")}</p>
          )}
          <Progress value={progress} className="mt-2 h-1.5" />
        </div>

        <div className="flex-1 overflow-y-auto">
          {detailed.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground text-sm">
              {t("cart.empty")}
              <div className="mt-6">
                <Button asChild onClick={() => setOpen(false)}>
                  <Link to="/shop">{t("cart.discover")}</Link>
                </Button>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {detailed.map(({ product, qty, lineTotal }) => (
                <li key={product.slug} className="flex gap-4 p-6">
                  <img src={product.image} alt={loc(product.name)} className="h-24 w-20 object-cover rounded-md bg-cream" />
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <div className="font-medium">{loc(product.name)}</div>
                        <div className="text-xs text-muted-foreground">{loc(product.categoryLabel)}</div>
                      </div>
                      <button onClick={() => remove(product.slug)} aria-label="Remove">
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center border border-border rounded-md">
                        <button className="p-1.5" onClick={() => setQty(product.slug, qty - 1)} aria-label="Decrease">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{qty}</span>
                        <button className="p-1.5" onClick={() => setQty(product.slug, qty + 1)} aria-label="Increase">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="text-sm font-medium">${lineTotal.toFixed(2)}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {detailed.length > 0 && suggestion && (
            <div className="m-6 p-4 rounded-lg border border-dashed border-sage/60 bg-cream/50">
              <div className="eyebrow mb-2 text-xs">{t("cart.frequentlyBought")}</div>
              <div className="flex gap-3 items-center">
                <img src={suggestion.image} alt="" className="h-14 w-12 object-cover rounded" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{loc(suggestion.name)}</div>
                  <div className="text-xs text-muted-foreground">${suggestion.price}</div>
                </div>
                <Button size="sm" variant="outline" onClick={() => add(suggestion.slug)}>{t("cart.add")}</Button>
              </div>
            </div>
          )}
        </div>

        {detailed.length > 0 && (
          <div className="border-t border-border p-6 space-y-4 bg-ivory">
            <div className="flex justify-between text-sm">
              <span>{t("cart.subtotal")}</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <Button asChild size="lg" className="w-full" onClick={() => setOpen(false)}>
              <Link to="/checkout">{t("cart.checkout")} · ${subtotal.toFixed(2)}</Link>
            </Button>
            <p className="text-xs text-center text-muted-foreground">{t("cart.taxes")}</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
