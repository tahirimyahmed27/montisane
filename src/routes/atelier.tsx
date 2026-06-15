import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Pencil, Trash2, Plus, Leaf, BookOpen } from "lucide-react";
import { toast } from "sonner";
import {
  useArticles,
  useProducts,
  useCustomArticles,
  useCustomProducts,
  upsertArticle,
  upsertProduct,
  deleteArticle,
  deleteProduct,
  slugify,
} from "@/lib/store";
import { articleCategories, type Article, type ArticleCategory } from "@/lib/articles";
import { categories as productCategories, type Category, type Product } from "@/lib/products";

export const Route = createFileRoute("/atelier")({
  head: () => ({
    meta: [
      { title: "Atelier — Montisane" },
      { name: "description", content: "Espace de gestion : ajouter, modifier ou supprimer produits et articles du journal." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AtelierPage,
});

function AtelierPage() {
  return (
    <section className="container-x py-16">
      <div className="mb-10">
        <div className="eyebrow">Atelier</div>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Espace de gestion</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Petit CRM pour gérer la collection Montisane. Les éléments ajoutés ici sont sauvegardés
          localement dans votre navigateur et s'affichent immédiatement sur la boutique et le journal.
        </p>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="articles"><BookOpen className="h-4 w-4 mr-2" /> Articles</TabsTrigger>
          <TabsTrigger value="products"><Leaf className="h-4 w-4 mr-2" /> Produits</TabsTrigger>
        </TabsList>
        <TabsContent value="articles" className="mt-8">
          <ArticlesManager />
        </TabsContent>
        <TabsContent value="products" className="mt-8">
          <ProductsManager />
        </TabsContent>
      </Tabs>
    </section>
  );
}

// =================== ARTICLES ===================
const emptyArticle = (): Article => ({
  slug: "",
  title: "",
  category: "Wellness",
  readTime: "5 min",
  author: "Équipe Montisane",
  date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  excerpt: "",
  image: "",
  body: [""],
});

function ArticlesManager() {
  const all = useArticles();
  const custom = useCustomArticles();
  const customSlugs = new Set(custom.map((a) => a.slug));
  const [editing, setEditing] = useState<Article | null>(null);

  const startNew = () => setEditing(emptyArticle());
  const startEdit = (a: Article) => setEditing({ ...a, body: [...a.body] });

  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl">Tous les articles</h2>
          <Button size="sm" onClick={startNew}><Plus className="h-4 w-4 mr-1" /> Nouveau</Button>
        </div>
        <ul className="divide-y border border-border rounded-lg bg-card">
          {all.map((a) => {
            const isCustom = customSlugs.has(a.slug);
            return (
              <li key={a.slug} className="p-4 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">{a.category}</span>
                    {isCustom && <span className="text-[10px] bg-gold/30 px-1.5 py-0.5 rounded">Custom</span>}
                  </div>
                  <div className="font-serif text-lg leading-tight mt-0.5 truncate">{a.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{a.author} · {a.readTime}</div>
                  <Link
                    to="/journal/$slug"
                    params={{ slug: a.slug }}
                    className="text-xs text-sage-deep hover:underline mt-1 inline-block"
                  >
                    Voir l'article →
                  </Link>
                </div>
                <div className="flex flex-col gap-1">
                  <Button size="icon" variant="ghost" onClick={() => startEdit(a)} aria-label="Modifier">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {isCustom && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        deleteArticle(a.slug);
                        toast.success("Article supprimé");
                        if (editing?.slug === a.slug) setEditing(null);
                      }}
                      aria-label="Supprimer"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        {editing ? (
          <ArticleForm
            value={editing}
            onCancel={() => setEditing(null)}
            onSave={(a) => {
              const finalSlug = a.slug || slugify(a.title);
              if (!finalSlug || !a.title.trim()) {
                toast.error("Titre requis");
                return;
              }
              upsertArticle({ ...a, slug: finalSlug, body: a.body.filter((p) => p.trim()) });
              toast.success("Article enregistré");
              setEditing(null);
            }}
          />
        ) : (
          <div className="border border-dashed border-border rounded-lg p-10 text-center text-muted-foreground">
            Sélectionnez un article à modifier, ou créez-en un nouveau.
          </div>
        )}
      </div>
    </div>
  );
}

function ArticleForm({
  value,
  onSave,
  onCancel,
}: {
  value: Article;
  onSave: (a: Article) => void;
  onCancel: () => void;
}) {
  const [a, setA] = useState<Article>(value);
  const update = <K extends keyof Article>(k: K, v: Article[K]) => setA((s) => ({ ...s, [k]: v }));

  return (
    <form
      className="bg-card border border-border rounded-lg p-6 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(a);
      }}
    >
      <h3 className="font-serif text-xl">{value.slug ? "Modifier l'article" : "Nouvel article"}</h3>
      <Field label="Titre">
        <Input value={a.title} onChange={(e) => update("title", e.target.value)} required />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Catégorie">
          <select
            value={a.category}
            onChange={(e) => update("category", e.target.value as ArticleCategory)}
            className="w-full bg-ivory border border-input rounded-md px-3 py-2 text-sm"
          >
            {articleCategories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Durée de lecture">
          <Input value={a.readTime} onChange={(e) => update("readTime", e.target.value)} placeholder="6 min" />
        </Field>
        <Field label="Auteur">
          <Input value={a.author} onChange={(e) => update("author", e.target.value)} />
        </Field>
        <Field label="Date">
          <Input value={a.date} onChange={(e) => update("date", e.target.value)} />
        </Field>
      </div>
      <Field label="Image (URL)">
        <Input value={a.image} onChange={(e) => update("image", e.target.value)} placeholder="https://..." />
      </Field>
      <Field label="Extrait">
        <Textarea value={a.excerpt} onChange={(e) => update("excerpt", e.target.value)} rows={2} />
      </Field>
      <Field label="Contenu (un paragraphe par ligne vide)">
        <Textarea
          value={a.body.join("\n\n")}
          onChange={(e) => update("body", e.target.value.split(/\n\s*\n/))}
          rows={10}
        />
      </Field>
      <div className="flex gap-3 pt-2">
        <Button type="submit">Enregistrer</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Annuler</Button>
      </div>
    </form>
  );
}

// =================== PRODUCTS ===================
const emptyProduct = (): Product => ({
  slug: "",
  name: "",
  tagline: "",
  category: "digestive",
  categoryLabel: "Digestive Wellness",
  price: 28,
  rating: 4.8,
  reviews: 0,
  image: "",
  benefits: [""],
  ingredients: [""],
  preparation: "Steep 1 tsp in 200ml of 95°C water for 5 minutes.",
  description: "",
});

function ProductsManager() {
  const all = useProducts();
  const custom = useCustomProducts();
  const customSlugs = new Set(custom.map((p) => p.slug));
  const [editing, setEditing] = useState<Product | null>(null);

  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl">Tous les produits</h2>
          <Button size="sm" onClick={() => setEditing(emptyProduct())}>
            <Plus className="h-4 w-4 mr-1" /> Nouveau
          </Button>
        </div>
        <ul className="divide-y border border-border rounded-lg bg-card">
          {all.map((p) => {
            const isCustom = customSlugs.has(p.slug);
            return (
              <li key={p.slug} className="p-4 flex items-center gap-3">
                <div className="w-14 h-14 rounded-md bg-cream overflow-hidden flex-shrink-0">
                  {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">{p.categoryLabel}</span>
                    {isCustom && <span className="text-[10px] bg-gold/30 px-1.5 py-0.5 rounded">Custom</span>}
                  </div>
                  <div className="font-serif text-lg leading-tight truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">${p.price.toFixed(2)} · ★ {p.rating}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <Button size="icon" variant="ghost" onClick={() => setEditing({ ...p })} aria-label="Modifier">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {isCustom && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        deleteProduct(p.slug);
                        toast.success("Produit supprimé");
                        if (editing?.slug === p.slug) setEditing(null);
                      }}
                      aria-label="Supprimer"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        {editing ? (
          <ProductForm
            value={editing}
            onCancel={() => setEditing(null)}
            onSave={(p) => {
              const finalSlug = p.slug || slugify(p.name);
              if (!finalSlug || !p.name.trim()) {
                toast.error("Nom requis");
                return;
              }
              upsertProduct({
                ...p,
                slug: finalSlug,
                benefits: p.benefits.filter((b) => b.trim()),
                ingredients: p.ingredients.filter((b) => b.trim()),
              });
              toast.success("Produit enregistré");
              setEditing(null);
            }}
          />
        ) : (
          <div className="border border-dashed border-border rounded-lg p-10 text-center text-muted-foreground">
            Sélectionnez un produit à modifier, ou créez-en un nouveau.
          </div>
        )}
      </div>
    </div>
  );
}

function ProductForm({
  value,
  onSave,
  onCancel,
}: {
  value: Product;
  onSave: (p: Product) => void;
  onCancel: () => void;
}) {
  const [p, setP] = useState<Product>(value);
  const update = <K extends keyof Product>(k: K, v: Product[K]) => setP((s) => ({ ...s, [k]: v }));

  return (
    <form
      className="bg-card border border-border rounded-lg p-6 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(p);
      }}
    >
      <h3 className="font-serif text-xl">{value.slug ? "Modifier le produit" : "Nouveau produit"}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nom">
          <Input value={p.name} onChange={(e) => update("name", e.target.value)} required />
        </Field>
        <Field label="Sous-titre">
          <Input value={p.tagline} onChange={(e) => update("tagline", e.target.value)} />
        </Field>
        <Field label="Catégorie">
          <select
            value={p.category}
            onChange={(e) => {
              const id = e.target.value as Category;
              const c = productCategories.find((x) => x.id === id);
              setP((s) => ({ ...s, category: id, categoryLabel: c?.label ?? s.categoryLabel }));
            }}
            className="w-full bg-ivory border border-input rounded-md px-3 py-2 text-sm"
          >
            {productCategories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </Field>
        <Field label="Prix (USD)">
          <Input type="number" step="0.01" value={p.price} onChange={(e) => update("price", parseFloat(e.target.value) || 0)} />
        </Field>
        <Field label="Note">
          <Input type="number" step="0.1" min="0" max="5" value={p.rating} onChange={(e) => update("rating", parseFloat(e.target.value) || 0)} />
        </Field>
        <Field label="Avis (nombre)">
          <Input type="number" value={p.reviews} onChange={(e) => update("reviews", parseInt(e.target.value) || 0)} />
        </Field>
      </div>
      <Field label="Image (URL)">
        <Input value={p.image} onChange={(e) => update("image", e.target.value)} placeholder="https://..." />
      </Field>
      <Field label="Description">
        <Textarea value={p.description} onChange={(e) => update("description", e.target.value)} rows={3} />
      </Field>
      <Field label="Bienfaits (un par ligne)">
        <Textarea
          value={p.benefits.join("\n")}
          onChange={(e) => update("benefits", e.target.value.split("\n"))}
          rows={3}
        />
      </Field>
      <Field label="Ingrédients (un par ligne)">
        <Textarea
          value={p.ingredients.join("\n")}
          onChange={(e) => update("ingredients", e.target.value.split("\n"))}
          rows={3}
        />
      </Field>
      <Field label="Préparation">
        <Textarea value={p.preparation} onChange={(e) => update("preparation", e.target.value)} rows={2} />
      </Field>
      <div className="flex gap-3 pt-2">
        <Button type="submit">Enregistrer</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Annuler</Button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs tracking-wide uppercase text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
