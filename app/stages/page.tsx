import Link from "next/link";
import { curriculum } from "@/lib/content";
import StageGrid from "@/components/StageGrid";

export default function StagesPage() {
  const totalItems = curriculum.stages.reduce(
    (n, s) => n + s.topics.reduce((m, t) => m + t.items.length, 0),
    0
  );
  const totalCitations = curriculum.stages.reduce(
    (n, s) =>
      n +
      s.topics.reduce(
        (m, t) => m + t.items.reduce((k, i) => k + i.citations.length, 0),
        0
      ),
    0
  );

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-gold/80 hover:text-gold no-underline"
        >
          ← Back to the Study
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl text-parchment leading-tight">
          The 14 Stages
        </h1>
        <p className="text-parchment/70 text-sm sm:text-base mt-2 max-w-2xl">
          {totalItems.toLocaleString()} items, {totalCitations.toLocaleString()} citations.
          Pick any unlocked stage to drill its topics.
        </p>
      </header>

      <StageGrid />
    </div>
  );
}
