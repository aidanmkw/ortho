import Link from "next/link";
import { notFound } from "next/navigation";
import { getStage, curriculum } from "@/lib/content";
import TopicProgress from "@/components/TopicProgress";

export function generateStaticParams() {
  return curriculum.stages.map((s) => ({ stageId: s.id }));
}

export default function StagePage({
  params,
}: {
  params: { stageId: string };
}) {
  const stage = getStage(params.stageId);
  if (!stage) notFound();

  const totalItems = stage.topics.reduce((n, t) => n + t.items.length, 0);
  const debateItems = stage.topics.reduce(
    (n, t) => n + t.items.filter((i) => i.kind === "debate").length,
    0
  );

  return (
    <div>
      <div className="mb-6">
        <Link href="/" className="text-sm text-gold/80 hover:text-gold no-underline">
          ← All Stages
        </Link>
      </div>

      <header className="mb-10">
        <div className="text-gold text-xs tracking-[0.3em] uppercase mb-2">
          Stage {stage.order.toString().padStart(2, "0")}
          {stage.era && <span className="ml-3 text-gold/60">{stage.era}</span>}
        </div>
        <h1 className="font-display text-4xl text-parchment mb-3">
          {stage.title}
        </h1>
        <div className="text-parchment/70 italic mb-5">{stage.subtitle}</div>
        <p className="text-parchment/80 max-w-3xl leading-relaxed">
          {stage.description}
        </p>
        <div className="gold-rule my-6" />
        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href={`/drill/${stage.id}`}
            className="btn-gold px-5 py-2 rounded no-underline"
          >
            ▶ Begin Drill ({totalItems} items)
          </Link>
          {debateItems > 0 && (
            <Link
              href={`/debate/${stage.id}`}
              className="btn-quiet px-5 py-2 rounded no-underline"
            >
              ⚔ Cross-Examination ({debateItems})
            </Link>
          )}
          <div className="text-parchment/50 self-center text-xs ml-2">
            Rank earned: <span className="text-gold">{stage.rank}</span>
          </div>
        </div>
      </header>

      <section>
        <h2 className="text-lg font-display text-gold mb-4 tracking-widest uppercase">
          Topics
        </h2>
        <div className="grid gap-4">
          {stage.topics.map((topic) => (
            <div key={topic.id} className="parchment-card p-5">
              <div className="flex justify-between items-start gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-parchment text-lg font-semibold">
                    {topic.title}
                  </h3>
                  <p className="text-parchment/70 text-sm mt-1 max-w-3xl">
                    {topic.summary}
                  </p>
                  <TopicProgress itemIds={topic.items.map((i) => i.id)} />
                </div>
                <Link
                  href={`/drill/${stage.id}/${topic.id}`}
                  className="btn-quiet px-3 py-1.5 rounded text-xs no-underline whitespace-nowrap"
                >
                  Drill ({topic.items.length})
                </Link>
              </div>
              {topic.learningObjectives.length > 0 && (
                <details className="mt-3 text-sm">
                  <summary className="cursor-pointer text-gold/80 hover:text-gold">
                    Learning objectives & sources
                  </summary>
                  <div className="mt-3 grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-gold/60 mb-2">
                        Objectives
                      </div>
                      <ul className="text-parchment/75 space-y-1 list-disc list-inside">
                        {topic.learningObjectives.map((o, i) => (
                          <li key={i}>{o}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-gold/60 mb-2">
                        Primary sources
                      </div>
                      <ul className="text-parchment/75 space-y-1 list-disc list-inside">
                        {topic.primarySources.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </details>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
