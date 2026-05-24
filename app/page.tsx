import Link from "next/link";
import { curriculum } from "@/lib/content";
import RankBadge from "@/components/RankBadge";
import StageGrid from "@/components/StageGrid";
import DailyCard from "@/components/DailyCard";
import QuickStart from "@/components/QuickStart";

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
      <section className="mb-8 sm:mb-12">
        <h1 className="font-display text-3xl sm:text-5xl text-parchment mb-3 leading-tight">
          Train as an Apologist.
        </h1>
        <p className="text-parchment/80 max-w-3xl text-base sm:text-lg leading-relaxed">
          Fourteen stages. Thousands of cited questions. Every answer
          anchored to a Father, a Council, or Scripture. Every debate
          drill drawn from the actual claims of Rome, the Reformers, and
          the Latter-day Saints — answered by Photios, Mark of Ephesus,
          Athanasius, the Cappadocians, and the unbroken witness of the
          Church.
        </p>
      </section>

      <QuickStart />

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <RankBadge />
        <DailyCard />
      </div>

      <div className="gold-rule mb-8" />

      <div className="flex flex-wrap gap-3 text-xs text-parchment/70 mb-6">
        <Stat label="Stages" value={curriculum.stages.length} />
        <Stat
          label="Topics"
          value={curriculum.stages.reduce((n, s) => n + s.topics.length, 0)}
        />
        <Stat label="Items" value={totalItems} />
        <Stat label="Citations" value={totalCitations} />
      </div>

      <section>
        <h2 className="text-base sm:text-xl font-display text-gold mb-5 tracking-widest uppercase">
          The Path
        </h2>
        <StageGrid />
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="parchment-card px-3 py-2 text-center min-w-[80px]">
      <div className="text-gold text-base">{value.toLocaleString()}</div>
      <div className="text-[9px] uppercase tracking-widest text-parchment/60">
        {label}
      </div>
    </div>
  );
}
