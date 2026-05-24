"use client";

import { useEffect } from "react";
import { useProgress } from "./ProgressProvider";

export default function RankUpBanner() {
  const { rankUpEvent, clearRankUp } = useProgress();

  useEffect(() => {
    if (rankUpEvent) {
      const t = setTimeout(clearRankUp, 4500);
      return () => clearTimeout(t);
    }
  }, [rankUpEvent, clearRankUp]);

  if (!rankUpEvent) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 pt-3">
      <div
        className="parchment-card px-5 py-3 max-w-md w-full text-center pointer-events-auto cursor-pointer"
        onClick={clearRankUp}
        role="status"
      >
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
          You have been raised
        </div>
        <div className="text-parchment font-display text-xl mt-1">
          ☦ Now: {rankUpEvent}
        </div>
        <div className="text-xs text-parchment/60 mt-1">tap to dismiss</div>
      </div>
    </div>
  );
}
