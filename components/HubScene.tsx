"use client";

import Link from "next/link";
import * as React from "react";
import { useMemo } from "react";
import { useProgress } from "./ProgressProvider";
import { nextRankInfo } from "@/lib/progress";

type HotspotData = {
  href: string;
  label: string;
  sublabel?: string;
  // percentages of the image (0-100)
  x: number;
  y: number;
  w: number;
  h: number;
  accent: "gold" | "purple" | "crimson" | "muted";
  badge?: string;
  disabled?: boolean;
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function HubScene() {
  const { progress, hydrated } = useProgress();

  const stats = useMemo(() => {
    const items = Object.values(progress.items);
    const playedToday = items.filter(
      (i) => new Date(i.lastSeenAt).toDateString() === new Date().toDateString()
    ).length;
    const dueReview = items.filter(
      (i) =>
        i.lastResult === "wrong" ||
        (i.nextDueAt > 0 && i.nextDueAt <= Date.now())
    ).length;
    const mastered = items.filter((i) => i.masteryScore >= 0.7).length;
    return { playedToday, dueReview, mastered };
  }, [progress]);

  const isNew =
    hydrated &&
    progress.xp === 0 &&
    Object.keys(progress.items).length === 0;

  // Loading shimmer matches the scene's aspect (4:3) so layout doesn't jump
  if (!hydrated) {
    return (
      <div className="mb-10">
        <div className="parchment-card p-3 mb-4 h-10 animate-pulse" />
        <div
          className="w-full rounded-lg border-2 border-gold/40 bg-[#14110c] animate-pulse"
          style={{ aspectRatio: "4 / 3" }}
        />
      </div>
    );
  }

  const next = nextRankInfo(progress.xp);

  const hotspots: HotspotData[] = [
    // Upper-left: sword + shield → Quest
    {
      href: "/quest",
      label: "Orthodox Quest",
      sublabel: "Story Mode · JRPG",
      x: 3,
      y: 4,
      w: 30,
      h: 40,
      accent: "purple",
    },
    // Upper-right: scroll → Daily Trial
    {
      href: "/daily",
      label: "Daily Trial",
      sublabel:
        stats.playedToday >= 10
          ? "Done today ✓"
          : stats.playedToday > 0
            ? `Continue ${stats.playedToday}/10`
            : "10 mixed questions",
      x: 64,
      y: 3,
      w: 33,
      h: 42,
      accent: "gold",
      badge: stats.playedToday >= 10 ? "✓" : undefined,
    },
    // Lower-left: icon + vigil lamp → Review (learn from mistakes / penance)
    {
      href: stats.dueReview > 0 ? "/review" : "/stages",
      label:
        stats.dueReview > 0 ? `Review · ${stats.dueReview} due` : "Nothing to review",
      sublabel:
        stats.dueReview > 0
          ? "Learn from mistakes"
          : "Drill a stage to add items",
      x: 2,
      y: 47,
      w: 30,
      h: 50,
      accent: "crimson",
      disabled: stats.dueReview === 0,
    },
    // Lower-right: open codex on desk → Curriculum / Stages
    {
      href: "/stages",
      label: "Curriculum",
      sublabel: "14 stages · drill any topic",
      x: 60,
      y: 55,
      w: 38,
      h: 42,
      accent: "muted",
    },
    // Center: arched doorway → The Library (lives of the saints)
    {
      href: "/library",
      label: "The Library",
      sublabel: "Lives of the saints",
      x: 38,
      y: 22,
      w: 24,
      h: 65,
      accent: "gold",
    },
  ];

  return (
    // Escape the layout's padding and max-width so the scene goes edge to edge.
    // The site header is ~72px tall (mobile) / ~90px tall (>= sm); the hub
    // fills everything beneath it. Negative margins offset main's px/py.
    <div className="-mx-4 sm:-mx-6 -my-6 sm:-my-10 -mb-24 sm:-mb-10 bg-[#0c0a08] min-h-[calc(100dvh-68px)] sm:min-h-[calc(100dvh-86px)] flex flex-col relative overflow-hidden">
      {/* Status HUD pinned to top */}
      <div className="relative z-20 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-gradient-to-b from-black/85 to-transparent">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
            Rank
          </span>
          <span className="font-display text-base sm:text-lg text-parchment">
            {progress.rank}
          </span>
          <span className="text-gold font-mono text-xs sm:text-sm">
            {progress.xp.toLocaleString()} XP
          </span>
          {progress.streakDays > 0 && (
            <span className="text-xs text-parchment/70">
              🔥 {progress.streakDays}-day streak
            </span>
          )}
          {progress.freezesAvailable > 0 && (
            <span
              className="text-xs text-parchment/55"
              title="Grace: a single missed day won't break your streak."
            >
              🕊 grace
            </span>
          )}
          {stats.mastered > 0 && (
            <span className="text-xs text-parchment/60 hidden sm:inline">
              · {stats.mastered} mastered
            </span>
          )}
        </div>
        {next.nextRank && (
          <div className="text-[10px] text-parchment/60">
            {next.xpToNext} XP → {next.nextRank}
          </div>
        )}
      </div>

      {/* Review call-to-action — the primary daily action when items are due */}
      {stats.dueReview > 0 && (
        <div className="relative z-20 px-4 pt-1">
          <Link
            href="/review"
            className="mx-auto max-w-md flex items-center justify-center gap-2 no-underline rounded-lg border-2 border-crimson/70 bg-gradient-to-br from-[#1a0808] to-[#0c0a08] px-4 py-2.5 text-center hover:border-crimson transition animate-[pulse_3s_ease-in-out_infinite]"
          >
            <span className="text-crimson text-lg">↻</span>
            <span className="font-display text-parchment text-sm sm:text-base">
              {stats.dueReview} {stats.dueReview === 1 ? "item" : "items"} ready
              to review
            </span>
            <span className="text-crimson/80 text-sm">→</span>
          </Link>
        </div>
      )}

      {/* Painting centered in remaining space */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-1 sm:px-2 py-1">
        <div className="relative w-full max-w-5xl">
          <img
            src={`${BASE}/hub/study.webp`}
            alt="Your study — tap an object to begin"
            className="w-full h-auto block select-none rounded shadow-2xl shadow-black/80"
            draggable={false}
          />
          {hotspots.map((h) => (
            <Hotspot key={h.label} {...h} />
          ))}
        </div>
      </div>

      {/* Caption pinned to bottom */}
      <div className="relative z-20 px-4 pb-3 pt-2 text-center bg-gradient-to-t from-black/85 to-transparent">
        <p className="text-parchment/60 text-[11px] sm:text-xs italic">
          Tap an object in the room to begin.
        </p>
        <div className="mt-1 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new Event("open-devotional"))
            }
            className="text-[11px] sm:text-xs text-gold/80 hover:text-gold underline-offset-2 hover:underline"
          >
            ✛ Today&rsquo;s Devotional
          </button>
          <Link
            href="/commonplace"
            className="text-[11px] sm:text-xs text-gold/80 hover:text-gold no-underline underline-offset-2 hover:underline"
          >
            ★ Commonplace Book
          </Link>
          <Link
            href="/reliquary"
            className="text-[11px] sm:text-xs text-gold/80 hover:text-gold no-underline underline-offset-2 hover:underline"
          >
            ✦ Reliquary
          </Link>
        </div>
      </div>

      {/* First-time tutorial overlay — dismissible scrim with the legend */}
      {isNew && <FirstTimeOverlay />}
    </div>
  );
}

function FirstTimeOverlay() {
  const [dismissed, setDismissed] = React.useState(false);
  if (dismissed) return null;
  return (
    <div
      className="absolute inset-0 z-30 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setDismissed(true)}
      role="button"
      aria-label="Dismiss tutorial"
    >
      <div className="parchment-card p-5 max-w-md border-2 border-gold/60 bg-gradient-to-br from-[#1a1408] to-[#0c0a08]">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold/90 mb-2">
          Welcome, Inquirer
        </div>
        <p className="text-parchment text-sm sm:text-base leading-relaxed mb-3">
          You are standing in your study. Tap any object in the room to begin:
        </p>
        <ul className="text-xs sm:text-sm text-parchment/85 space-y-1.5">
          <li>
            <span className="text-gold">⚔</span> The <strong>sword &amp; shield</strong> open the
            Quest — a story-driven journey through Church history.
          </li>
          <li>
            <span className="text-gold">📜</span> The <strong>scroll</strong> is your Daily Trial —
            10 questions, ~5 minutes. <em>Start here.</em>
          </li>
          <li>
            <span className="text-gold">🕯️</span> The <strong>icon corner</strong> is for Review —
            items you got wrong come back here.
          </li>
          <li>
            <span className="text-gold">📖</span> The <strong>open codex</strong> opens the full
            Curriculum — 14 stages of training.
          </li>
          <li>
            <span className="text-gold">🚪</span> The <strong>doorway</strong> leads to the Library
            — lives of the saints.
          </li>
        </ul>
        <div className="mt-4 text-center text-[10px] uppercase tracking-[0.3em] text-gold/70">
          Tap anywhere to enter
        </div>
      </div>
    </div>
  );
}

function Hotspot({
  href,
  label,
  sublabel,
  x,
  y,
  w,
  h,
  accent,
  badge,
  disabled,
}: HotspotData) {
  const ring: Record<HotspotData["accent"], string> = {
    gold: "ring-gold/0 group-hover:ring-gold/80 group-focus:ring-gold/80",
    purple:
      "ring-byzantine/0 group-hover:ring-byzantine group-focus:ring-byzantine",
    crimson:
      "ring-crimson/0 group-hover:ring-crimson/90 group-focus:ring-crimson/90",
    muted:
      "ring-parchment/0 group-hover:ring-parchment/70 group-focus:ring-parchment/70",
  };
  const border: Record<HotspotData["accent"], string> = {
    gold: "border-gold/70",
    purple: "border-byzantine",
    crimson: "border-crimson/80",
    muted: "border-parchment/50",
  };
  const textCol: Record<HotspotData["accent"], string> = {
    gold: "text-gold",
    purple: "text-[#d6b8e8]",
    crimson: "text-[#ff8a8a]",
    muted: "text-parchment",
  };

  return (
    <Link
      href={href}
      aria-label={label}
      aria-disabled={disabled || undefined}
      className={`absolute group block no-underline outline-none ${disabled ? "pointer-events-none opacity-60" : ""}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}%`,
        height: `${h}%`,
      }}
    >
      {/* Hover/focus glow over the object */}
      <div
        className={`absolute inset-0 rounded-md ring-2 transition duration-200 ${ring[accent]}`}
        aria-hidden
      />

      {/* Persistent label chip anchored at bottom of the region */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 bottom-1 sm:bottom-2 max-w-[95%] bg-black/80 backdrop-blur-sm border ${border[accent]} px-2 py-1 rounded-md text-center group-hover:bg-black/95 transition pointer-events-none`}
      >
        <div
          className={`text-[10px] sm:text-xs font-display leading-tight ${textCol[accent]} whitespace-nowrap`}
        >
          {label}
        </div>
        {sublabel && (
          <div className="text-[8px] sm:text-[10px] text-parchment/70 leading-tight mt-0.5 whitespace-nowrap">
            {sublabel}
          </div>
        )}
      </div>

      {badge && (
        <span className="absolute top-1 right-1 bg-gold text-[#0c0a08] text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
          {badge}
        </span>
      )}
    </Link>
  );
}
