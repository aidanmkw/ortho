"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useProgress } from "@/components/ProgressProvider";
import { allItems } from "@/lib/content";
import DrillRunner from "@/components/DrillRunner";

export default function ReviewPage() {
  const { progress, hydrated } = useProgress();
  const items = useMemo(() => {
    if (!hydrated) return [];
    const now = Date.now();
    const universe = allItems().map(({ item }) => item);
    // Items that are due (have been seen, are due, and not mastered yet) — review them.
    const due = universe.filter((it) => {
      const r = progress.items[it.id];
      if (!r) return false;
      if (r.masteryScore >= 0.9) return false;
      if (r.nextDueAt > now + 86400000) return false; // not yet due
      return true;
    });
    // Also include items the user got WRONG on the last attempt, regardless of schedule.
    const wrong = universe.filter((it) => {
      const r = progress.items[it.id];
      return r && r.lastResult === "wrong";
    });
    const set = new Set<string>();
    const combined = [...wrong, ...due].filter((it) => {
      if (set.has(it.id)) return false;
      set.add(it.id);
      return true;
    });
    return combined.slice(0, 30);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  if (!hydrated) {
    return (
      <div className="text-parchment/60 animate-pulse">Loading review queue…</div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-gold/80 hover:text-gold no-underline"
        >
          ← Home
        </Link>
      </div>
      {items.length === 0 ? (
        <div className="parchment-card p-8 text-center">
          <div className="text-5xl text-gold mb-3">✓</div>
          <h2 className="font-display text-2xl text-parchment mb-2">
            Review queue clear
          </h2>
          <p className="text-parchment/70 mb-4">
            Nothing currently due. Either you haven't done a drill yet, or
            you've mastered everything you've seen. Drill a stage to add items
            to the spaced-repetition queue.
          </p>
          <Link
            href="/"
            className="btn-gold inline-block px-5 py-2 rounded text-sm no-underline"
          >
            Pick a stage
          </Link>
        </div>
      ) : (
        <DrillRunner
          items={items}
          stageTitle="Review Queue"
          topicTitle={`${items.length} items due`}
        />
      )}
    </div>
  );
}
