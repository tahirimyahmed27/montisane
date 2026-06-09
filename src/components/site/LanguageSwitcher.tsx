import { useI18n, type Lang } from "@/lib/i18n";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();
  const opts: Lang[] = ["fr", "en"];
  return (
    <div className={`inline-flex items-center gap-1 text-xs ${className}`} role="group" aria-label="Language">
      {opts.map((l, i) => (
        <span key={l} className="flex items-center">
          <button
            type="button"
            onClick={() => setLang(l)}
            className={`uppercase tracking-wider px-1.5 py-1 transition-colors ${
              lang === l ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={lang === l}
          >
            {l}
          </button>
          {i < opts.length - 1 && <span className="text-muted-foreground/60">/</span>}
        </span>
      ))}
    </div>
  );
}
