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

      <Link
        href="/quest"
        className="block mb-6 no-underline group"
      >
        <div
          className="parchment-card p-5 border-2 border-gold/40 hover:border-gold transition relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1a1024 0%, #28182c 50%, #2a1a08 100%)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl text-gold">☦</div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
                NEW · Pixel Quest
              </div>
              <div className="font-display text-xl text-parchment leading-tight">
                Orthodox Quest: Witness of the Witnesses
              </div>
              <div className="text-xs text-parchment/70 mt-1 italic">
                A modern Inquirer is pulled through time. 13 chapters from Antioch to the present, fighting boss-heretics by answering with the Fathers.
              </div>
            </div>
            <div className="text-gold text-2xl group-hover:translate-x-1 transition">→</div>
          </div>
        </div>
      </Link>

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
