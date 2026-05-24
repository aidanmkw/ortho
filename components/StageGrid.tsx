"use client";

import Link from "next/link";
import { curriculum } from "@/lib/content";
import { useProgress } from "./ProgressProvider";
import {
  isStageUnlocked,
  stageCompletionPct,
  masteredItemCount,
} from "@/lib/progress";

export default function StageGrid() {
  const { progress, hydrated } = useProgress();

  const stages = curriculum.stages;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stages.map((stage, i) => {
        const itemIds = stage.topics.flatMap((t) =>
          t.items.map((it) => it.id)
        );
        const priorStage = stages[i - 1];
        const priorIds = priorStage
          ? priorStage.topics.flatMap((t) => t.items.map((it) => it.id))
          : [];
        const unlocked = hydrated
          ? isStageUnlocked(progress, stage.order, priorIds)
          : stage.order === 1;
        const pct = hydrated ? stageCompletionPct(progress, itemIds) : 0;
        const mastered = hydrated ? masteredItemCount(progress, itemIds) : 0;

        const content = (
          <div
            className={`parchment-card p-4 sm:p-5 block transition h-full ${
              unlocked ? "hover:border-gold/60" : "opacity-60"
            }`}
          >
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-gold text-[10px] tracking-[0.25em] uppercase">
                Stage {stage.order.toString().padStart(2, "0")}
              </span>
              <span className="text-parchment/60 text-[10px]">
                {itemIds.length} items
              </span>
            </div>
            <div className="text-parchment text-base sm:text-lg font-semibold mb-1 leading-tight">
              {stage.title}
            </div>
            <div className="text-parchment/60 text-xs sm:text-sm mb-2 italic line-clamp-2">
              {stage.subtitle}
            </div>
            {stage.era && (
              <div className="text-[10px] text-gold/70 mb-2">{stage.era}</div>
            )}

            <div className="h-1 bg-parchment/10 rounded my-3 overflow-hidden">
              <div
                className="h-full bg-gold transition-all"
                style={{ width: `${pct * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-parchment/60">
              <span>
                {mastered} / {itemIds.length} mastered
              </span>
              <span className="text-gold/80">→ {stage.rank}</span>
            </div>
            {!unlocked && (
              <div className="mt-3 text-[10px] text-crimson/80">
                🔒 Reach 60% mastery in Stage {stage.order - 1} to unlock
              </div>
            )}
          </div>
        );

        return unlocked ? (
          <Link
            key={stage.id}
            href={`/stage/${stage.id}`}
            className="no-underline"
          >
            {content}
          </Link>
        ) : (
          <div key={stage.id} className="no-underline cursor-not-allowed">
            {content}
          </div>
        );
      })}
    </div>
  );
}
