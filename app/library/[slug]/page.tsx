import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORY_LABELS, getSaint, saints } from "@/lib/saints";
import RandomNextSaint from "@/components/RandomNextSaint";

export function generateStaticParams() {
  return saints.map((s) => ({ slug: s.slug }));
}

export default function SaintPage({
  params,
}: {
  params: { slug: string };
}) {
  const saint = getSaint(params.slug);
  if (!saint) notFound();

  return (
    <article className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/library"
          className="text-sm text-gold/80 hover:text-gold no-underline"
        >
          ← The Library
        </Link>
      </div>

      <header className="mb-6 pb-6 border-b border-gold/20">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80 mb-2">
          {saint.categories
            .map((c) => CATEGORY_LABELS[c])
            .join(" · ")}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-parchment leading-tight">
          {saint.name}
        </h1>
        {saint.title && (
          <p className="font-display italic text-parchment/70 text-lg mt-1">
            {saint.title}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-parchment/70">
          <span>
            <span className="text-gold/80">Feast: </span>
            {saint.feastDay}
          </span>
          <span>
            <span className="text-gold/80">Century: </span>
            {saint.century}
          </span>
          {saint.dates && (
            <span>
              <span className="text-gold/80">Dates: </span>
              {saint.dates}
            </span>
          )}
        </div>
      </header>

      <div className="space-y-4 text-parchment/90 text-base sm:text-lg leading-relaxed">
        {saint.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {saint.quote && (
        <blockquote className="my-8 border-l-4 border-gold/60 pl-4 sm:pl-6 italic text-parchment/85">
          <p className="text-base sm:text-lg leading-relaxed">
            &ldquo;{saint.quote.text}&rdquo;
          </p>
          {saint.quote.source && (
            <footer className="text-xs text-parchment/60 mt-2 not-italic">
              — {saint.quote.source}
            </footer>
          )}
        </blockquote>
      )}

      <div className="mt-10 pt-6 border-t border-gold/20 flex flex-wrap gap-3">
        <Link
          href="/library"
          className="px-4 py-2 border border-parchment/30 text-parchment/80 hover:border-gold hover:text-gold rounded no-underline text-sm"
        >
          ← All saints
        </Link>
        <RandomNextSaint currentSlug={saint.slug} />
      </div>
    </article>
  );
}
