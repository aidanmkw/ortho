import Link from "next/link";
import { curriculum } from "@/lib/content";

export default function Home() {
  return (
    <div>
      <section className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl text-parchment mb-3">
          Train as an Apologist.
        </h1>
        <p className="text-parchment/80 max-w-3xl text-lg leading-relaxed">
          Fourteen stages. Thousands of cited questions. Every answer
          anchored to a Father, a Council, or Scripture. Every debate
          drill drawn from the actual claims of Rome, the Reformers, and
          the Latter-day Saints — answered by Photios, Mark of Ephesus,
          Athanasius, the Cappadocians, and the unbroken witness of the
          Church.
        </p>
        <div className="gold-rule my-8" />
        <div className="flex flex-wrap gap-4 text-sm text-parchment/70">
          <span>
            <span className="text-gold">{curriculum.stages.length}</span> stages
          </span>
          <span>·</span>
          <span>
            <span className="text-gold">
              {curriculum.stages.reduce((n, s) => n + s.topics.length, 0)}
            </span>{" "}
            topics
          </span>
          <span>·</span>
          <span>
            <span className="text-gold">
              {curriculum.stages.reduce(
                (n, s) =>
                  n + s.topics.reduce((m, t) => m + t.items.length, 0),
                0
              )}
            </span>{" "}
            items authored
          </span>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-display text-gold mb-6 tracking-widest uppercase">
          The Path
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {curriculum.stages.map((stage) => (
            <Link
              key={stage.id}
              href={`/stage/${stage.id}`}
              className="parchment-card p-5 block no-underline transition hover:border-gold/60"
            >
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-gold text-xs tracking-[0.25em] uppercase">
                  Stage {stage.order.toString().padStart(2, "0")}
                </span>
                <span className="text-parchment/60 text-xs">
                  {stage.topics.reduce((n, t) => n + t.items.length, 0)}{" "}
                  items
                </span>
              </div>
              <div className="text-parchment text-lg font-semibold mb-1">
                {stage.title}
              </div>
              <div className="text-parchment/60 text-sm mb-3 italic">
                {stage.subtitle}
              </div>
              {stage.era && (
                <div className="text-xs text-gold/70 mb-3">{stage.era}</div>
              )}
              <p className="text-parchment/70 text-sm leading-relaxed line-clamp-3">
                {stage.description}
              </p>
              <div className="mt-4 text-xs text-gold/80">
                Rank: <span className="text-parchment">{stage.rank}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
