import { createFileRoute } from "@tanstack/react-router";
import lifestyle from "@/assets/lifestyle.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our story — Montisane" },
      { name: "description", content: "The Montisane story — Moroccan-Mediterranean herbal tradition for modern wellness." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="container-x py-20 text-center max-w-2xl">
        <div className="eyebrow">Our story</div>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl">A herbal tradition, gently modernized.</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Montisane was born from a kitchen in Marrakech and refined in laboratories in Lisbon.
          We honor the wisdom of the women who came before us — and the science that proves they were right.
        </p>
      </section>
      <img src={lifestyle} alt="" className="w-full max-h-[60vh] object-cover" loading="lazy" />
      <section className="container-x py-20 grid md:grid-cols-3 gap-12 max-w-4xl">
        {[
          { t: "Sourced with care", b: "We partner directly with herbal cooperatives in Morocco, Spain and Italy." },
          { t: "Verified by science", b: "Every batch is third-party tested for purity, potency and heavy metals." },
          { t: "Packaged with respect", b: "Recyclable tins. Compostable sachets. Zero plastic in your cup." },
        ].map((c) => (
          <div key={c.t}>
            <h3 className="font-serif text-2xl">{c.t}</h3>
            <p className="mt-3 text-muted-foreground">{c.b}</p>
          </div>
        ))}
      </section>
    </>
  );
}
