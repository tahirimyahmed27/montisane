import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/shop", label: "Shop All" },
  { to: "/shop", label: "Best Sellers", search: { sort: "popular" } as const },
  { to: "/bundles", label: "Bundles" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "Our Story" },
  { to: "/atelier", label: "Atelier" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-sage-deep text-ivory text-xs tracking-[0.18em] uppercase">
      <div className="container-x flex items-center justify-center gap-6 py-2.5">
        <span>Free shipping over $60</span>
        <span className="hidden md:inline opacity-60">·</span>
        <span className="hidden md:inline">New: Sleep Sanctuary Bundle</span>
        <span className="hidden md:inline opacity-60">·</span>
        <span className="hidden md:inline">Subscribe & save 10%</span>
      </div>
    </div>
  );
}

export function Header() {
  const { count, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ivory/85 backdrop-blur border-b border-border/60">
      <AnnouncementBar />
      <div className="container-x flex h-16 items-center justify-between">
        <button className="lg:hidden -ml-2 p-2" aria-label="Menu" onClick={() => setMobile(true)}>
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
          MONTISANE
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden lg:flex items-center gap-8 text-sm mr-4">
            {nav.slice(3).map((n) => (
              <Link key={n.label} to={n.to} className="hover:text-sage-deep transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Cart" onClick={() => setOpen(true)} className="relative">
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
            <span className="font-serif text-xl tracking-[0.3em]">MONTISANE</span>
            <button onClick={() => setMobile(false)} aria-label="Close"><X className="h-5 w-5" /></button>
          </div>
          <nav className="container-x flex flex-col gap-6 pt-8 text-2xl font-serif">
            {nav.map((n) => (
              <Link key={n.label} to={n.to} onClick={() => setMobile(false)}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
