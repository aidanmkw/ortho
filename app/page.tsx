import { curriculum } from "@/lib/content";
import PrimaryActions from "@/components/PrimaryActions";
import StageGrid from "@/components/StageGrid";

export default function Home() {
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
      {/* Compact hero */}
      <section className="mb-6 sm:mb-8">
        <h1 className="font-display text-2xl sm:text-4xl text-parchment leading-tight">
          Train as an Apologist.
        </h1>
        <p className="text-parchment/70 text-sm sm:text-base mt-2 max-w-2xl">
          Pick what to do right now — or scroll down to browse the 14
          stages of the curriculum.
        </p>
      </section>

      {/* The "what now?" panel — main entry point */}
      <PrimaryActions />

      {/* Curriculum browser */}
      <section id="stages" className="scroll-mt-20">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-base sm:text-xl font-display text-gold tracking-widest uppercase">
            The 14 Stages
          </h2>
          <div className="text-[11px] text-parchment/60">
            {totalItems.toLocaleString()} items · {totalCitations.toLocaleString()} citations
          </div>
        </div>
        <StageGrid />
      </section>
    </div>
  );
}
