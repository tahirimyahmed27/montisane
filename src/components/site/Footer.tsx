import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border bg-cream">
      <div className="container-x py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 max-w-md">
          <div className="font-serif text-2xl tracking-[0.3em]">MONTISANE</div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t("footer.tagline")}</p>
          <form className="mt-6 flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder={t("footer.emailPlaceholder")} className="bg-ivory" required />
            <Button type="submit" variant="default">{t("footer.subscribe")}</Button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">{t("footer.newsletterCopy")}</p>
        </div>

        <div>
          <div className="eyebrow mb-4">{t("footer.shop")}</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop">{t("footer.allTeas")}</Link></li>
            <li><Link to="/bundles">{t("footer.bundles")}</Link></li>
            <li><Link to="/shop">{t("footer.subscriptions")}</Link></li>
            <li><Link to="/shop">{t("footer.giftCards")}</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">{t("footer.brand")}</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about">{t("footer.ourStory")}</Link></li>
            <li><Link to="/journal">{t("footer.journal")}</Link></li>
            <li><Link to="/contact">{t("footer.contact")}</Link></li>
            <li><Link to="/faq">{t("footer.faq")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Montisane. {t("footer.rights")}</span>
          <div className="flex gap-5">
            <span>{t("footer.privacy")}</span><span>{t("footer.terms")}</span><span>{t("footer.shipping")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
