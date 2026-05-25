"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useProgress } from "./ProgressProvider";
import { nextRankInfo } from "@/lib/progress";

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/**
 * The main "what do you want to do" panel on the home page.
 * Replaces the older QuickStart + Quest CTA + DailyCard + RankBadge stack.
 */
export default function PrimaryActions() {
  const { progress, hydrated } = useProgress();
  const today = todayKey();

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

  if (!hydrated) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 animate-pulse">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="parchment-card p-5 h-28 text-parchment/30"
          />
        ))}
      </div>
    );
  }

  const isNew = progress.xp === 0 && Object.keys(progress.items).length === 0;
  const next = nextRankInfo(progress.xp);

  return (
    <div className="mb-10">
      {/* Status strip */}
      <div className="parchment-card p-4 mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-3 flex-wrap">
          {isNew ? (
            <span className="font-display text-lg text-parchment">
              Welcome.
            </span>
          ) : (
            <>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
                Rank
              </span>
              <span className="font-display text-lg text-parchment">
                {progress.rank}
              </span>
              <span className="text-gold text-sm font-mono">
                {progress.xp.toLocaleString()} XP
              </span>
              {progress.streakDays > 0 && (
                <span className="text-xs text-parchment/70">
                  🔥 {progress.streakDays}-day streak
                </span>
              )}
              {stats.mastered > 0 && (
                <span className="text-xs text-parchment/60">
                  · {stats.mastered} mastered
                </span>
              )}
            </>
          )}
        </div>
        {next.nextRank && !isNew && (
          <div className="text-[10px] text-parchment/60">
            {next.xpToNext} XP → {next.nextRank}
          </div>
        )}
      </div>

      {isNew ? (
        // First-time view: simple choice between Quest and Study
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionCard
            href="/quest"
            accent="purple"
            kicker="STORY · PIXEL GAME"
            title="Begin Quest"
            subtitle="Time-travel through Church history. 13 chapters with bosses, items, levels. Best on phone."
            cta="▶ Start"
          />
          <ActionCard
            href="/daily"
            accent="gold"
            kicker="STUDY · QUICK START"
            title="Daily Trial"
            subtitle="Ten mixed questions to see what the app teaches. ~5 minutes."
            cta="▶ Try it"
          />
        </div>
      ) : (
        // Returning view: the four things you might want to do now
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionCard
            href="/daily"
            accent="gold"
            kicker="TODAY"
            title="Daily Trial"
            subtitle={`Ten mixed questions for ${today}. Refreshes at midnight.`}
            cta={
              stats.playedToday > 0
                ? `Continue (${stats.playedToday}/10)`
                : "▶ Begin"
            }
            badge={stats.playedToday >= 10 ? "✓ Done today" : undefined}
          />
          <ActionCard
            href="/quest"
            accent="purple"
            kicker="STORY MODE"
            title="Orthodox Quest"
            subtitle="The pixel JRPG. Continue your campaign, or open the Sparring Hall to re-fight any boss."
            cta="▶ Open"
          />
          <ActionCard
            href={stats.dueReview > 0 ? "/review" : "#stages"}
            accent={stats.dueReview > 0 ? "crimson" : "muted"}
            kicker="LEARN FROM MISTAKES"
            title={
              stats.dueReview > 0
                ? `Review · ${stats.dueReview} due`
                : "Nothing to review"
            }
            subtitle={
              stats.dueReview > 0
                ? "Items you got wrong, plus items due via spaced repetition."
                : "Drill a stage below to add items to the queue."
            }
            cta={stats.dueReview > 0 ? "↻ Review" : "↓ Pick a stage"}
            disabled={stats.dueReview === 0}
          />
          <ActionCard
            href="#stages"
            accent="muted"
            kicker="CURRICULUM"
            title="Browse Stages"
            subtitle="14 stages, 286 topics, 544 cited items. Pick any unlocked stage to drill."
            cta="↓ See all"
          />
        </div>
      )}
    </div>
  );
}

function ActionCard({
  href,
  accent,
  kicker,
  title,
  subtitle,
  cta,
  badge,
  disabled,
}: {
  href: string;
  accent: "gold" | "purple" | "crimson" | "muted";
  kicker: string;
  title: string;
  subtitle: string;
  cta: string;
  badge?: string;
  disabled?: boolean;
}) {
  const styles: Record<string, string> = {
    gold: "border-gold/60 hover:border-gold bg-gradient-to-br from-[#1a1408] to-[#0c0a08]",
    purple:
      "border-byzantine hover:border-gold/80 bg-gradient-to-br from-[#1a1024] to-[#0c0a08]",
    crimson:
      "border-crimson/70 hover:border-crimson bg-gradient-to-br from-[#1a0808] to-[#0c0a08]",
    muted:
      "border-parchment/20 hover:border-gold/60 bg-gradient-to-br from-[#14110c] to-[#0c0a08]",
  };
  const kickerColors: Record<string, string> = {
    gold: "text-gold/90",
    purple: "text-[#c4a0d8]",
    crimson: "text-crimson/90",
    muted: "text-parchment/60",
  };

  return (
    <Link
      href={href}
      className={`parchment-card p-5 block no-underline border-2 transition relative ${styles[accent]} ${disabled ? "opacity-60 pointer-events-none" : ""}`}
    >
      <div className="flex justify-between items-start gap-3 mb-2">
        <div
          className={`text-[10px] uppercase tracking-[0.3em] ${kickerColors[accent]}`}
        >
          {kicker}
        </div>
        {badge && (
          <span className="text-[10px] text-gold/80 bg-gold/10 border border-gold/30 px-2 py-0.5 rounded">
            {badge}
          </span>
        )}
      </div>
      <h3 className="font-display text-xl text-parchment leading-tight mb-2">
        {title}
      </h3>
      <p className="text-parchment/70 text-sm leading-relaxed mb-3">
        {subtitle}
      </p>
      <div className="text-gold text-sm font-medium">{cta}</div>
    </Link>
  );
}
