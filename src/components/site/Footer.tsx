import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-cream">
      <div className="container-x py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 max-w-md">
          <div className="font-serif text-2xl tracking-[0.3em]">MONTISANE</div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Traditional Moroccan and Mediterranean herbal teas, blended for modern wellness.
            Naturally sourced, ethically packaged, made to support your daily rituals.
          </p>
          <form className="mt-6 flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="Your email" className="bg-ivory" required />
            <Button type="submit" variant="default">Subscribe</Button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">Join 12,000+ readers — 10% off your first order.</p>
        </div>

        <div>
          <div className="eyebrow mb-4">Shop</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop">All teas</Link></li>
            <li><Link to="/bundles">Bundles</Link></li>
            <li><Link to="/shop">Subscriptions</Link></li>
            <li><Link to="/shop">Gift cards</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">Brand</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about">Our story</Link></li>
            <li><Link to="/journal">Journal</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Montisane. All rights reserved.</span>
          <div className="flex gap-5">
            <span>Privacy</span><span>Terms</span><span>Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
