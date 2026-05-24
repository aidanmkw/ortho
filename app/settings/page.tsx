"use client";

import Link from "next/link";
import { useState } from "react";
import { useProgress } from "@/components/ProgressProvider";
import { nextRankInfo } from "@/lib/progress";

export default function SettingsPage() {
  const { progress, hydrated, reset } = useProgress();
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-gold/80 hover:text-gold no-underline"
        >
          ← Home
        </Link>
      </div>

      <h1 className="font-display text-3xl text-parchment mb-6">Settings</h1>

      {hydrated && (
        <section className="parchment-card p-5 mb-5">
          <h2 className="font-display text-lg text-gold mb-3">Progress</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Stat label="Rank" value={progress.rank} />
            <Stat label="Total XP" value={progress.xp.toLocaleString()} />
            <Stat label="Streak" value={`${progress.streakDays} day${progress.streakDays === 1 ? "" : "s"}`} />
            <Stat
              label="Items seen"
              value={Object.keys(progress.items).length.toString()}
            />
            <Stat
              label="Items mastered"
              value={Object.values(progress.items)
                .filter((i) => i.masteryScore >= 0.7)
                .length.toString()}
            />
            <Stat
              label="To next rank"
              value={`${nextRankInfo(progress.xp).xpToNext} XP`}
            />
          </div>
        </section>
      )}

      <section className="parchment-card p-5 mb-5">
        <h2 className="font-display text-lg text-gold mb-3">Reset progress</h2>
        <p className="text-parchment/70 text-sm mb-4">
          Clears your XP, rank, streak, and all per-item progress. Use sparingly.
        </p>
        {!confirm ? (
          <button
            onClick={() => setConfirm(true)}
            className="btn-quiet px-4 py-2 rounded text-sm"
          >
            Reset progress…
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setConfirm(false)}
              className="btn-quiet px-4 py-2 rounded text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                reset();
                setConfirm(false);
              }}
              className="bg-crimson text-parchment px-4 py-2 rounded text-sm font-semibold"
            >
              Yes, reset everything
            </button>
          </div>
        )}
      </section>

      <section className="parchment-card p-5">
        <h2 className="font-display text-lg text-gold mb-3">About</h2>
        <p className="text-parchment/70 text-sm leading-relaxed">
          The Orthodox Apologist — gamified training in Eastern Orthodox
          theology and apologetics. Every answer cites a Father, a Council,
          or Scripture. Content drawn from the Apostolic Fathers, the Greek
          Patristic tradition, the Seven Ecumenical Councils, and the
          witness of the saints. Progress is stored locally in your browser
          (no account required). Δόξα τῷ Θεῷ πάντων ἕνεκεν.
        </p>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-gold/70">
        {label}
      </div>
      <div className="text-parchment text-base">{value}</div>
    </div>
  );
}
