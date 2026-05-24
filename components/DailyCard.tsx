"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useProgress } from "./ProgressProvider";

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function DailyCard() {
  const { progress, hydrated } = useProgress();
  const today = useMemo(todayKey, []);

  if (!hydrated) {
    return (
      <div className="parchment-card p-4 text-sm text-parchment/40 animate-pulse">
        Loading daily...
      </div>
    );
  }

  const playedToday =
    progress.lastActiveDay === today
      ? Object.values(progress.items).filter(
          (i) => new Date(i.lastSeenAt).toDateString() === new Date().toDateString()
        ).length
      : 0;

  return (
    <Link
      href="/daily"
      className="parchment-card p-4 no-underline hover:border-gold/60 transition block"
    >
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold/70">
            Daily Trial
          </div>
          <div className="text-parchment text-xl font-display">
            10 mixed items
          </div>
          <div className="text-parchment/60 text-[11px] mt-1">
            Fresh today — covers all unlocked stages
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold/70">
            Today
          </div>
          <div className="text-gold text-xl font-mono">
            {playedToday}
            <span className="text-parchment/40 text-sm">/10</span>
          </div>
        </div>
      </div>
      <div className="mt-3 text-[10px] text-gold/80">
        Begin Daily →
      </div>
    </Link>
  );
}
