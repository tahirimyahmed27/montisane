import { useSyncExternalStore } from "react";
import { baseArticles, type Article } from "@/lib/articles";
import { products as baseProducts, type Product } from "@/lib/products";

const ART_KEY = "montisane.articles.v1";
const PROD_KEY = "montisane.products.v1";

type Listener = () => void;
const listeners = new Set<Listener>();
const subscribe = (l: Listener) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const emit = () => listeners.forEach((l) => l());

function read<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}
function write<T>(key: string, value: T[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  emit();
}

// ---------- ARTICLES ----------
export function getCustomArticles(): Article[] {
  return read<Article>(ART_KEY);
}
export function getAllArticles(): Article[] {
  const custom = getCustomArticles();
  const customSlugs = new Set(custom.map((a) => a.slug));
  return [...custom, ...baseArticles.filter((a) => !customSlugs.has(a.slug))];
}
export function upsertArticle(a: Article) {
  const list = getCustomArticles();
  const idx = list.findIndex((x) => x.slug === a.slug);
  if (idx >= 0) list[idx] = a;
  else list.unshift(a);
  write(ART_KEY, list);
}
export function deleteArticle(slug: string) {
  write(
    ART_KEY,
    getCustomArticles().filter((a) => a.slug !== slug)
  );
}

// ---------- PRODUCTS ----------
export function getCustomProducts(): Product[] {
  return read<Product>(PROD_KEY);
}
export function getAllProducts(): Product[] {
  const custom = getCustomProducts();
  const customSlugs = new Set(custom.map((p) => p.slug));
  return [...custom, ...baseProducts.filter((p) => !customSlugs.has(p.slug))];
}
export function upsertProduct(p: Product) {
  const list = getCustomProducts();
  const idx = list.findIndex((x) => x.slug === p.slug);
  if (idx >= 0) list[idx] = p;
  else list.unshift(p);
  write(PROD_KEY, list);
}
export function deleteProduct(slug: string) {
  write(
    PROD_KEY,
    getCustomProducts().filter((p) => p.slug !== slug)
  );
}

// ---------- HOOKS ----------
export function useArticles(): Article[] {
  return useSyncExternalStore(
    subscribe,
    () => getAllArticles(),
    () => baseArticles
  );
}
export function useProducts(): Product[] {
  return useSyncExternalStore(
    subscribe,
    () => getAllProducts(),
    () => baseProducts
  );
}
export function useCustomArticles(): Article[] {
  return useSyncExternalStore(subscribe, getCustomArticles, () => []);
}
export function useCustomProducts(): Product[] {
  return useSyncExternalStore(subscribe, getCustomProducts, () => []);
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
