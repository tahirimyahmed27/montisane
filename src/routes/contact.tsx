import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Montisane" },
      { name: "description", content: "Questions sur nos tisanes, abonnements ou commandes ? Nous serions ravis d'échanger." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  return (
    <section className="container-x py-20 grid lg:grid-cols-2 gap-16 max-w-4xl">
      <div>
        <div className="eyebrow">{t("contact.eyebrow")}</div>
        <h1 className="mt-3 font-serif text-5xl">{t("contact.title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("contact.intro")}</p>
        <div className="mt-8 space-y-2 text-sm">
          <div>hello@montisane.com</div>
          <div className="text-muted-foreground">{t("contact.hours")}</div>
        </div>
      </div>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="grid gap-2"><Label>{t("contact.first")}</Label><Input required /></div>
          <div className="grid gap-2"><Label>{t("contact.last")}</Label><Input required /></div>
        </div>
        <div className="grid gap-2"><Label>{t("contact.email")}</Label><Input type="email" required /></div>
        <div className="grid gap-2"><Label>{t("contact.message")}</Label><Textarea rows={6} required /></div>
        <Button type="submit" size="lg" className="w-full">{t("contact.send")}</Button>
      </form>
    </section>
  );
}
