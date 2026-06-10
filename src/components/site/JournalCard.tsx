import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { JournalArticle } from "@/lib/journal";

interface JournalCardProps {
  article: JournalArticle;
}

export function JournalCard({ article }: JournalCardProps) {
  const { loc, t } = useI18n();

  return (
    <article className="group flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border hover:border-sage-deep transition-all duration-300 hover:shadow-lg">
      {/* Image Section */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-sage/20 to-cream/40">
        <div className="absolute inset-0 bg-sage/10 group-hover:bg-sage/20 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl opacity-40">🌿</div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-7 flex-1 flex flex-col">
        {/* Category Badge */}
        <div className="inline-flex">
          <span className="text-xs font-medium tracking-widest uppercase text-sage-deep bg-sage/10 px-3 py-1 rounded-full">
            {loc(article.category)}
          </span>
        </div>

        {/* Title */}
        <Link
          to="/journal/$slug"
          params={{ slug: article.slug }}
          className="mt-4 font-serif text-xl md:text-2xl leading-tight text-ink hover:text-sage-deep transition-colors"
        >
          {loc(article.title)}
        </Link>

        {/* Excerpt - Now Visible */}
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {loc(article.excerpt)}
        </p>

        {/* Meta Information */}
        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            ⏱️ {article.readTime} {t("journal.read")}
          </span>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-border/40" />

        {/* Read More Button */}
        <Link
          to="/journal/$slug"
          params={{ slug: article.slug }}
          className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-sage-deep hover:text-sage transition-colors group/link"
        >
          {t("journal.readMore")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
