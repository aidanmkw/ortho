"use client";

import Link from "next/link";
import { useProgress } from "./ProgressProvider";

export default function QuickStart() {
  const { progress, hydrated } = useProgress();

  if (!hydrated) {
    return (
      <div className="parchment-card p-5 mb-6 animate-pulse text-parchment/40">
        Loading…
      </div>
    );
  }

  const isNew = progress.xp === 0 && Object.keys(progress.items).length === 0;

  if (isNew) {
    return (
      <div className="parchment-card p-5 mb-6 border-gold/40">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80 mb-2">
          Welcome
        </div>
        <h2 className="font-display text-xl text-parchment mb-2">
          Start with the Daily Trial.
        </h2>
        <p className="text-parchment/70 text-sm mb-4 leading-relaxed">
          Ten mixed items pulled from across the curriculum — a quick way to
          see what the game is. Earn your first XP, get on a streak, then dig
          into Stage 1.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/daily"
            className="btn-gold px-4 py-2 rounded text-sm no-underline"
          >
            ▶ Begin Daily Trial
          </Link>
          <Link
            href="/stage/01-early-history"
            className="btn-quiet px-4 py-2 rounded text-sm no-underline"
          >
            Or start Stage 1
          </Link>
        </div>
      </div>
    );
  }

  // Find a sensible "continue" target: first stage with progress but not mastered.
  const reviewDue = Object.values(progress.items).filter(
    (i) => i.lastResult === "wrong" || (i.nextDueAt > 0 && i.nextDueAt <= Date.now())
  ).length;

  return (
    <div className="parchment-card p-5 mb-6">
      <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80 mb-2">
        Welcome back
      </div>
      <h2 className="font-display text-xl text-parchment mb-2">
        Today's path.
      </h2>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/daily"
          className="btn-gold px-4 py-2 rounded text-sm no-underline"
        >
          ▶ Daily Trial
        </Link>
        {reviewDue > 0 && (
          <Link
            href="/review"
            className="btn-quiet px-4 py-2 rounded text-sm no-underline"
          >
            ↻ Review {reviewDue} item{reviewDue === 1 ? "" : "s"}
          </Link>
        )}
        <Link
          href="/settings"
          className="btn-quiet px-4 py-2 rounded text-sm no-underline"
        >
          Progress
        </Link>
      </div>
    </div>
  );
}
