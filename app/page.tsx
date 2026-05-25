import { curriculum } from "@/lib/content";
import HubScene from "@/components/HubScene";
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
      {/* Visual-novel hub: tap an object in the study to begin */}
      <HubScene />

      {/* Curriculum browser (reached by tapping the codex above, or scrolling) */}
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
