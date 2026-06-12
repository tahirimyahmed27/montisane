import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";

export function AnnouncementBar() {
  const { t } = useI18n();
  return (
    <div className="bg-sage-deep text-ivory text-xs tracking-[0.18em] uppercase">
      <div className="container-x flex items-center justify-center gap-6 py-2.5">
        <span>{t("announce.freeShip")}</span>
        <span className="hidden md:inline opacity-60">·</span>
        <span className="hidden md:inline">{t("announce.newBundle")}</span>
        <span className="hidden md:inline opacity-60">·</span>
        <span className="hidden md:inline">{t("announce.subSave")}</span>
      </div>
    </div>
  );
}

export function Header() {
  const { count, setOpen } = useCart();
  const { t } = useI18n();
  const [mobile, setMobile] = useState(false);

  const nav = [
    { to: "/shop" as const, label: t("nav.shopAll") },
    { to: "/shop" as const, label: t("nav.bestSellers") },
    { to: "/bundles" as const, label: t("nav.bundles") },
    { to: "/journal" as const, label: t("nav.journal") },
    { to: "/about" as const, label: t("nav.ourStory") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-ivory/85 backdrop-blur border-b border-border/60">
      <AnnouncementBar />
      <div className="container-x flex h-16 items-center justify-between">
        <button className="lg:hidden -ml-2 p-2" aria-label={t("header.menu")} onClick={() => setMobile(true)}>
          <Menu className="h-5 w-5" />
        </button>

        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {nav.slice(0, 3).map((n) => (
            <Link key={n.label} to={n.to} className="hover:text-sage-deep transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="font-serif text-2xl tracking-[0.3em] lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          MEDITISANE
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden lg:flex items-center gap-8 text-sm mr-4">
            {nav.slice(3).map((n) => (
              <Link key={n.label} to={n.to} className="hover:text-sage-deep transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher className="mr-1" />
          <Button variant="ghost" size="icon" aria-label={t("header.search")}>
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label={t("header.cart")} onClick={() => setOpen(true)} className="relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-sage-deep text-ivory text-[10px] font-medium flex items-center justify-center">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>

      {mobile && (
        <div className="fixed inset-0 z-50 bg-ivory">
          <div className="container-x flex items-center justify-between h-16">
            <span className="font-serif text-xl tracking-[0.3em]">MEDITISANE</span>
            <button onClick={() => setMobile(false)} aria-label={t("header.close")}><X className="h-5 w-5" /></button>
          </div>
          <nav className="container-x flex flex-col gap-6 pt-8 text-2xl font-serif">
            {nav.map((n) => (
              <Link key={n.label} to={n.to} onClick={() => setMobile(false)}>
                {n.label}
              </Link>
            ))}
            <div className="pt-6 border-t border-border"><LanguageSwitcher /></div>
          </nav>
        </div>
      )}
    </header>
  );
}
