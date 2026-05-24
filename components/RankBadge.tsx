"use client";

import { useProgress } from "./ProgressProvider";
import { nextRankInfo } from "@/lib/progress";

export default function RankBadge() {
  const { progress, hydrated } = useProgress();
  if (!hydrated) {
    return (
      <div className="parchment-card p-4 text-sm text-parchment/40 animate-pulse">
        Loading rank...
      </div>
    );
  }

  const { nextRank, xpToNext, pctToNext } = nextRankInfo(progress.xp);

  return (
    <div className="parchment-card p-4">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold/70">
            Rank
          </div>
          <div className="text-parchment text-xl font-display">
            {progress.rank}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold/70">
            XP
          </div>
          <div className="text-gold text-xl font-mono">
            {progress.xp.toLocaleString()}
          </div>
        </div>
      </div>
      {nextRank && (
        <div className="mt-3">
          <div className="text-[10px] text-parchment/60 mb-1">
            {xpToNext} XP → {nextRank}
          </div>
          <div className="h-1.5 bg-parchment/10 rounded overflow-hidden">
            <div
              className="h-full bg-gold transition-all"
              style={{ width: `${pctToNext * 100}%` }}
            />
          </div>
        </div>
      )}
      {progress.streakDays > 0 && (
        <div className="mt-3 flex items-center justify-between text-[10px] text-parchment/60">
          <span>
            🔥 <span className="text-gold">{progress.streakDays}</span>-day streak
          </span>
          <span>
            {Object.values(progress.items).filter((i) => i.masteryScore >= 0.7).length} mastered
          </span>
        </div>
      )}
    </div>
  );
}
