import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Lock } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Checkout — Montisane" }, { name: "robots", content: "noindex" }],
  }),
  component: CheckoutPage,
});

const steps = ["Information", "Shipping", "Payment"];

function CheckoutPage() {
  const { detailed, subtotal, clear, add, items } = useCart();
  const [step, setStep] = useState(0);
  const [shipMethod, setShipMethod] = useState("standard");
  const [promo, setPromo] = useState("");
  const navigate = useNavigate();

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : shipMethod === "express" ? 14 : 6;
  const discount = promo.toLowerCase() === "ritual10" ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  // upsell suggestion
  const upsell = ["after-meal-calm", "moonlight-blend", "sun-shield"]
    .map((s) => detailed.every((d) => d.product.slug !== s) ? s : null)
    .filter(Boolean)[0];

  if (detailed.length === 0) {
    return (
      <div className="container-x py-32 text-center">
        <h1 className="font-serif text-3xl">Your basket is empty</h1>
        <Button asChild className="mt-6"><Link to="/shop">Discover our teas</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-x py-10 lg:py-16">
      <div className="grid lg:grid-cols-[1fr_420px] gap-12">
        <div>
          <h1 className="font-serif text-3xl mb-2">Secure checkout</h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Lock className="h-3 w-3" /> SSL encrypted · Guest checkout welcome</div>

          {/* Stepper */}
          <ol className="mt-8 flex items-center gap-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 flex-1">
                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs ${
                  i < step ? "bg-sage-deep text-ivory" : i === step ? "bg-ink text-ivory" : "bg-cream text-muted-foreground"
                }`}>
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className={`text-sm ${i === step ? "font-medium" : "text-muted-foreground"}`}>{s}</span>
                {i < steps.length - 1 && <div className="flex-1 h-px bg-border" />}
              </li>
            ))}
          </ol>

          {/* Steps */}
          <form
            className="mt-10 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (step < steps.length - 1) setStep(step + 1);
              else {
                clear();
                navigate({ to: "/thank-you" });
              }
            }}
          >
            {step === 0 && (
              <>
                <h2 className="font-serif text-xl">Contact</h2>
                <Field label="Email"><Input type="email" required placeholder="you@email.com" /></Field>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="First name"><Input required /></Field>
                  <Field label="Last name"><Input required /></Field>
                </div>
                <Field label="Phone (optional)"><Input type="tel" /></Field>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="font-serif text-xl">Shipping address</h2>
                <Field label="Address"><Input required /></Field>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="City"><Input required /></Field>
                  <Field label="Postal code"><Input required /></Field>
                </div>
                <Field label="Country"><Input defaultValue="United States" required /></Field>

                <div className="mt-6 space-y-2">
                  <h3 className="font-medium">Shipping method</h3>
                  {[
                    { id: "standard", label: "Standard (4–6 days)", price: subtotal >= FREE_SHIPPING_THRESHOLD ? "Free" : "$6.00" },
                    { id: "express", label: "Express (1–2 days)", price: "$14.00" },
                  ].map((m) => (
                    <label key={m.id} className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer ${shipMethod === m.id ? "border-sage-deep bg-cream/40" : "border-border"}`}>
                      <span className="flex items-center gap-3">
                        <input type="radio" name="ship" checked={shipMethod === m.id} onChange={() => setShipMethod(m.id)} className="accent-sage-deep" />
                        {m.label}
                      </span>
                      <span className="font-medium">{m.price}</span>
                    </label>
                  ))}
                </div>

                {upsell && (
                  <div className="mt-6 p-5 rounded-xl border border-dashed border-gold bg-gold/10">
                    <div className="eyebrow text-clay">One-time offer · Save 20%</div>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <p className="text-sm">Add a second box and save 20% — only at checkout.</p>
                      <Button type="button" size="sm" variant="default" onClick={() => upsell && add(upsell)}>Add & save</Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="font-serif text-xl">Payment</h2>
                <Field label="Card number"><Input placeholder="1234 5678 9012 3456" required /></Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry"><Input placeholder="MM / YY" required /></Field>
                  <Field label="CVC"><Input placeholder="123" required /></Field>
                </div>
                <Field label="Name on card"><Input required /></Field>
              </>
            )}

            <div className="pt-6 flex justify-between items-center">
              {step > 0 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="text-sm underline underline-offset-4">
                  ← Back
                </button>
              ) : <span />}
              <Button type="submit" size="lg">
                {step < steps.length - 1 ? "Continue" : `Place order · $${total.toFixed(2)}`}
              </Button>
            </div>
          </form>
        </div>

        {/* Order summary */}
        <aside className="bg-cream/60 border border-border rounded-xl p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-serif text-xl mb-4">Order summary</h2>
          <ul className="divide-y divide-border">
            {detailed.map(({ product, qty, lineTotal }) => (
              <li key={product.slug} className="flex gap-3 py-3">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="h-16 w-14 object-cover rounded-md bg-ivory" />
                  <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-sage-deep text-ivory text-[10px] rounded-full flex items-center justify-center">{qty}</span>
                </div>
                <div className="flex-1 text-sm">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-xs text-muted-foreground">{product.categoryLabel}</div>
                </div>
                <div className="text-sm">${lineTotal.toFixed(2)}</div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2">
            <Input placeholder="Discount code" value={promo} onChange={(e) => setPromo(e.target.value)} className="bg-ivory" />
            <Button type="button" variant="outline" onClick={() => {}}>Apply</Button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Try <span className="font-mono">RITUAL10</span> for 10% off</p>

          <dl className="mt-5 space-y-2 text-sm">
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
            {discount > 0 && <Row label="Discount" value={`−$${discount.toFixed(2)}`} />}
            <div className="border-t border-border pt-3 flex justify-between text-base font-medium">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </dl>
          <div className="mt-4 text-xs text-muted-foreground">{items.length} items · taxes included</div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>;
}
