import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { loc, t } = useI18n();
  const name = loc(product.name);
  return (
    <div className="group flex flex-col">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden rounded-xl bg-cream aspect-[4/5]"
      >
        <img
          src={product.image}
          alt={name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.bestSeller && (
          <span className="absolute top-3 left-3 bg-ivory/90 text-ink text-[10px] tracking-[0.18em] uppercase px-2 py-1 rounded">
            {t("product.bestSeller")}
          </span>
        )}
      </Link>
      <div className="mt-4 flex-1 flex flex-col">
        <div className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">{loc(product.categoryLabel)}</div>
        <Link to="/product/$slug" params={{ slug: product.slug }} className="mt-1 font-serif text-xl">
          {name}
        </Link>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{loc(product.tagline)}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span>{product.rating}</span>
          <span>·</span>
          <span>{product.reviews} {t("product.reviews")}</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-medium">${product.price}</span>
            {product.compareAt && (
              <span className="text-xs text-muted-foreground line-through">${product.compareAt}</span>
            )}
          </div>
          <Button size="sm" variant="outline" onClick={() => add(product.slug)}>{t("product.add")}</Button>
        </div>
      </div>
    </div>
  );
}
