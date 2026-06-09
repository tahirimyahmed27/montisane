import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Montisane" },
      { name: "description", content: "Questions about our herbal teas, subscriptions or orders? We'd love to hear from you." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="container-x py-20 grid lg:grid-cols-2 gap-16 max-w-4xl">
      <div>
        <div className="eyebrow">Get in touch</div>
        <h1 className="mt-3 font-serif text-5xl">We're here to help.</h1>
        <p className="mt-4 text-muted-foreground">
          Reach our herbalists for product questions, custom rituals or wholesale inquiries.
          Most messages get a reply within one business day.
        </p>
        <div className="mt-8 space-y-2 text-sm">
          <div>hello@montisane.com</div>
          <div className="text-muted-foreground">Mon–Fri · 9am–6pm CET</div>
        </div>
      </div>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="grid gap-2"><Label>First name</Label><Input required /></div>
          <div className="grid gap-2"><Label>Last name</Label><Input required /></div>
        </div>
        <div className="grid gap-2"><Label>Email</Label><Input type="email" required /></div>
        <div className="grid gap-2"><Label>Message</Label><Textarea rows={6} required /></div>
        <Button type="submit" size="lg" className="w-full">Send message</Button>
      </form>
    </section>
  );
}
