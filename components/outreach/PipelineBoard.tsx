"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useOutreach } from "@/components/outreach/OutreachProvider";
import {
  STAGES,
  platformMeta,
  stageMeta,
  type Influencer,
  type Stage,
} from "@/lib/outreach/types";

const LINEAR: Stage[] = ["prospect", "contacted", "replied", "agreed", "featured", "posted"];

function fmtFollowers(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

function Card({ inf }: { inf: Influencer }) {
  const { setStage, removeInfluencer } = useOutreach();
  const pm = platformMeta(inf.platform);
  const idx = LINEAR.indexOf(inf.stage);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate font-semibold text-neutral-100">{inf.name || inf.handle}</div>
          <div className="truncate text-xs text-neutral-500">{inf.handle}</div>
        </div>
        <span className={`shrink-0 text-lg ${pm.tone}`} title={pm.label}>
          {pm.glyph}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-400">
        <span className="rounded bg-white/5 px-1.5 py-0.5">{inf.niche || "—"}</span>
        <span className="rounded bg-white/5 px-1.5 py-0.5">{fmtFollowers(inf.followers)} followers</span>
      </div>

      {inf.topPost ? (
        <p className="mt-2 line-clamp-2 text-[11px] leading-snug text-neutral-500">{inf.topPost}</p>
      ) : null}

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Move back"
            disabled={idx <= 0}
            onClick={() => idx > 0 && setStage(inf.id, LINEAR[idx - 1])}
            className="grid h-6 w-6 place-items-center rounded border border-white/10 text-neutral-400 enabled:hover:bg-white/10 disabled:opacity-30"
          >
            ◀
          </button>
          <button
            type="button"
            aria-label="Advance"
            disabled={idx === -1 || idx >= LINEAR.length - 1}
            onClick={() => idx >= 0 && idx < LINEAR.length - 1 && setStage(inf.id, LINEAR[idx + 1])}
            className="grid h-6 w-6 place-items-center rounded border border-white/10 text-neutral-400 enabled:hover:bg-white/10 disabled:opacity-30"
          >
            ▶
          </button>
        </div>
        <div className="flex items-center gap-1 text-[11px]">
          <Link
            href="/outreach/dm"
            className="rounded border border-white/10 px-2 py-1 text-amber-300 no-underline hover:bg-white/5"
          >
            DM
          </Link>
          <button
            type="button"
            onClick={() => setStage(inf.id, inf.stage === "passed" ? "prospect" : "passed")}
            className="rounded border border-white/10 px-2 py-1 text-neutral-400 hover:bg-white/5"
          >
            {inf.stage === "passed" ? "revive" : "pass"}
          </button>
          <button
            type="button"
            aria-label="Delete"
            onClick={() => removeInfluencer(inf.id)}
            className="rounded border border-white/10 px-2 py-1 text-neutral-500 hover:bg-red-500/10 hover:text-red-300"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PipelineBoard() {
  const { state, hydrated } = useOutreach();

  const byStage = useMemo(() => {
    const map = new Map<Stage, Influencer[]>();
    for (const s of STAGES) map.set(s.id, []);
    for (const inf of state.influencers) map.get(inf.stage)?.push(inf);
    return map;
  }, [state.influencers]);

  const stats = useMemo(() => {
    const total = state.influencers.length;
    const contacted = state.influencers.filter((i) =>
      ["contacted", "replied", "agreed", "featured", "posted"].includes(i.stage)
    ).length;
    const replied = state.influencers.filter((i) =>
      ["replied", "agreed", "featured", "posted"].includes(i.stage)
    ).length;
    const posted = state.influencers.filter((i) => i.stage === "posted").length;
    const rate = contacted > 0 ? Math.round((replied / contacted) * 100) : 0;
    return { total, contacted, posted, rate };
  }, [state.influencers]);

  if (!hydrated) {
    return <div className="py-20 text-center text-sm text-neutral-500">Loading your pipeline…</div>;
  }

  return (
    <div>
      <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { k: "Prospects", v: String(stats.total) },
          { k: "DMs sent", v: String(stats.contacted) },
          { k: "Reply rate", v: `${stats.rate}%` },
          { k: "Posted", v: String(stats.posted) },
        ].map((s) => (
          <div key={s.k} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-2xl font-bold text-neutral-100">{s.v}</div>
            <div className="text-xs uppercase tracking-wide text-neutral-500">{s.k}</div>
          </div>
        ))}
      </section>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">Pipeline</h2>
        <Link
          href="/outreach/prospects"
          className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-300 no-underline hover:bg-amber-400/20"
        >
          + Add prospect
        </Link>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <div className="flex min-w-max gap-3">
          {STAGES.map((s) => {
            const items = byStage.get(s.id) ?? [];
            return (
              <div key={s.id} className="w-64 shrink-0">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.accent }} />
                    <span className="text-sm font-semibold text-neutral-200">{s.label}</span>
                  </div>
                  <span className="rounded bg-white/5 px-1.5 text-xs text-neutral-500">{items.length}</span>
                </div>
                <p className="mb-2 text-[11px] italic text-neutral-600">{s.hint}</p>
                <div className="flex flex-col gap-2">
                  {items.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/10 py-6 text-center text-[11px] text-neutral-700">
                      empty
                    </div>
                  ) : (
                    items.map((inf) => <Card key={inf.id} inf={inf} />)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-[11px] text-neutral-600">
        Tip: use ◀ ▶ to move a creator along the pipeline. Everything is saved in this browser only.
      </p>
    </div>
  );
}
