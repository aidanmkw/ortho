// Pure progress logic. No React or DOM dependencies.

import { APOLOGIST_RANKS, type ApologistRank, type Difficulty } from "./types";

export type ItemRecord = {
  itemId: string;
  attempts: number;
  correct: number;
  // 0..1 - moving mastery score, exponential weighted.
  masteryScore: number;
  // FSRS-lite scheduling: memory stability (days until recall ~ target
  // retention) and difficulty (1..10). Replaces the old SM-2 interval/ease,
  // whose "ease hell" permanently over-scheduled lapsed items.
  stability: number;
  difficulty: number;
  // last seen / next due, epoch ms
  lastSeenAt: number;
  nextDueAt: number;
  // last result for UI: "correct" | "wrong" | "skipped" | null
  lastResult: "correct" | "wrong" | "skipped" | null;
};

export type ProgressState = {
  version: 3;
  xp: number;
  rank: ApologistRank;
  streakDays: number;
  // ISO date of the last day on which the player did at least one item.
  lastActiveDay: string | null;
  // Grace ("economia"): freezes that silently bridge a single missed day so a
  // lapse doesn't shame the user into losing everything. One refills each
  // calendar month, capped at 2.
  freezesAvailable: number;
  // "YYYY-MM" the freeze allotment was last refilled.
  freezeMonth: string | null;
  items: Record<string, ItemRecord>;
};

export const RANK_THRESHOLDS: { rank: ApologistRank; xp: number }[] = [
  { rank: "Inquirer", xp: 0 },
  { rank: "Catechumen", xp: 100 },
  { rank: "Reader", xp: 400 },
  { rank: "Subdeacon", xp: 1000 },
  { rank: "Deacon", xp: 2000 },
  { rank: "Priest", xp: 4000 },
  { rank: "Archpriest", xp: 7000 },
  { rank: "Confessor", xp: 11000 },
  { rank: "Apologist", xp: 18000 },
];

export function rankForXp(xp: number): ApologistRank {
  let current: ApologistRank = "Inquirer";
  for (const t of RANK_THRESHOLDS) {
    if (xp >= t.xp) current = t.rank;
  }
  return current;
}

export function nextRankInfo(xp: number) {
  for (let i = 0; i < RANK_THRESHOLDS.length; i++) {
    if (xp < RANK_THRESHOLDS[i].xp) {
      const prev = RANK_THRESHOLDS[i - 1] ?? RANK_THRESHOLDS[0];
      const t = RANK_THRESHOLDS[i];
      const pct = (xp - prev.xp) / (t.xp - prev.xp);
      return {
        nextRank: t.rank,
        xpToNext: t.xp - xp,
        pctToNext: Math.max(0, Math.min(1, pct)),
      };
    }
  }
  return { nextRank: null, xpToNext: 0, pctToNext: 1 };
}

export function xpForCorrect(difficulty: Difficulty, isFirstTry: boolean) {
  const base = [0, 10, 15, 25, 40, 60][difficulty] ?? 10;
  return isFirstTry ? base : Math.floor(base / 2);
}

// --- FSRS-lite scheduling ---------------------------------------------------

const DAY_MS = 86400000;
const TARGET_RETENTION = 0.9;

type Grade = "again" | "hard" | "good";

const INIT_STABILITY: Record<Grade, number> = { again: 0.4, hard: 1.0, good: 3.0 };
const INIT_DIFFICULTY: Record<Grade, number> = { again: 7.0, hard: 5.5, good: 4.5 };

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

// FSRS power-forgetting curve: R falls to ~0.9 at t = stability.
function retrievability(elapsedDays: number, stability: number): number {
  if (stability <= 0) return 0;
  return Math.pow(1 + elapsedDays / (9 * stability), -1);
}

function scheduleNext(
  prevStability: number,
  prevDifficulty: number,
  elapsedDays: number,
  grade: Grade,
  isFirst: boolean
): { stability: number; difficulty: number } {
  if (isFirst || prevStability <= 0) {
    return {
      stability: INIT_STABILITY[grade],
      difficulty: INIT_DIFFICULTY[grade],
    };
  }

  const R = retrievability(elapsedDays, prevStability);

  // Difficulty: wrong pushes harder, good eases; then mean-revert toward 5.
  const delta = grade === "again" ? 1.0 : grade === "hard" ? 0.3 : -0.15;
  let d = clamp(prevDifficulty + delta, 1, 10);
  d = clamp(d + 0.05 * (5 - d), 1, 10);

  let stability: number;
  if (grade === "again") {
    // Proportional lapse — recovery scales with prior stability, no full reset.
    stability = Math.max(0.4, prevStability * 0.4);
  } else {
    const ease = grade === "good" ? 3.0 : 0.5;
    const diffFactor = (11 - d) / 10;
    // Bigger gains when the card was actually due (low R) and not too hard.
    const mult = 1 + ease * diffFactor * clamp(1.15 - R, 0.05, 1.15);
    stability = Math.max(prevStability + 0.5, prevStability * mult);
  }

  return { stability, difficulty: d };
}

export function emptyProgress(): ProgressState {
  return {
    version: 3,
    xp: 0,
    rank: "Inquirer",
    streakDays: 0,
    lastActiveDay: null,
    freezesAvailable: 1,
    freezeMonth: null,
    items: {},
  };
}

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}

function monthKey(dayKey: string): string {
  return dayKey.slice(0, 7); // "YYYY-MM"
}

function daysBetween(a: string, b: string) {
  const da = new Date(a).getTime();
  const db = new Date(b).getTime();
  return Math.round((db - da) / 86400000);
}

export function recordResult(
  state: ProgressState,
  itemId: string,
  difficulty: Difficulty,
  result: "correct" | "wrong" | "skipped"
): ProgressState {
  const now = Date.now();
  const today = todayKey();
  const prev: ItemRecord = state.items[itemId] ?? {
    itemId,
    attempts: 0,
    correct: 0,
    masteryScore: 0,
    stability: 0,
    difficulty: 5,
    lastSeenAt: 0,
    nextDueAt: 0,
    lastResult: null,
  };

  const isFirstTry = prev.attempts === 0;
  const wasCorrect = result === "correct";

  // Mastery: EMA toward 1 on correct, toward 0 on wrong, decays on skip.
  const target = wasCorrect ? 1 : result === "wrong" ? 0 : prev.masteryScore;
  const masteryScore = prev.masteryScore * 0.6 + target * 0.4;

  // FSRS-lite scheduling.
  const grade: Grade =
    result === "correct" ? "good" : result === "skipped" ? "hard" : "again";
  const elapsedDays = prev.lastSeenAt ? (now - prev.lastSeenAt) / DAY_MS : 0;
  const sched = scheduleNext(
    prev.stability,
    prev.difficulty,
    elapsedDays,
    grade,
    isFirstTry
  );
  // Interval to the target-retention point; with R=0.9 this is ~= stability.
  const intervalDays = 9 * sched.stability * (1 / TARGET_RETENTION - 1);

  const updatedItem: ItemRecord = {
    ...prev,
    attempts: prev.attempts + 1,
    correct: prev.correct + (wasCorrect ? 1 : 0),
    masteryScore,
    stability: sched.stability,
    difficulty: sched.difficulty,
    lastSeenAt: now,
    nextDueAt: now + Math.max(DAY_MS * 0.5, intervalDays * DAY_MS),
    lastResult: result,
  };

  // XP only awarded on first-try correct (anti-grinding).
  const xpAward = wasCorrect && isFirstTry ? xpForCorrect(difficulty, true) : 0;
  const xp = state.xp + xpAward;

  // Streak update — only when something was attempted today.
  let streakDays = state.streakDays;
  let lastActiveDay = state.lastActiveDay;
  let freezesAvailable = state.freezesAvailable;
  let freezeMonth = state.freezeMonth;

  // Monthly economia: refill one grace freeze at the start of each new month.
  const month = monthKey(today);
  if (freezeMonth !== month) {
    freezesAvailable = Math.min(2, freezesAvailable + 1);
    freezeMonth = month;
  }

  if (lastActiveDay !== today) {
    if (lastActiveDay) {
      const gap = daysBetween(lastActiveDay, today);
      if (gap === 1) {
        streakDays = streakDays + 1;
      } else if (gap === 2 && freezesAvailable > 0) {
        // Missed exactly one day — a grace freeze quietly bridges it.
        freezesAvailable -= 1;
        streakDays = streakDays + 1;
      } else {
        streakDays = 1;
      }
    } else {
      streakDays = 1;
    }
    lastActiveDay = today;
  }

  return {
    ...state,
    xp,
    rank: rankForXp(xp),
    streakDays,
    lastActiveDay,
    freezesAvailable,
    freezeMonth,
    items: { ...state.items, [itemId]: updatedItem },
  };
}

export function masteredItemCount(state: ProgressState, itemIds: string[]) {
  let n = 0;
  for (const id of itemIds) {
    const r = state.items[id];
    if (r && r.masteryScore >= 0.7 && r.correct >= 1) n++;
  }
  return n;
}

export function stageCompletionPct(state: ProgressState, itemIds: string[]) {
  if (itemIds.length === 0) return 0;
  return masteredItemCount(state, itemIds) / itemIds.length;
}

// Stage unlock rule: a stage is unlocked if the previous stage has been
// completed to at least 60% mastery, or if it is the first stage.
export function isStageUnlocked(
  state: ProgressState,
  stageOrder: number,
  priorStageItemIds: string[]
): boolean {
  if (stageOrder <= 1) return true;
  return stageCompletionPct(state, priorStageItemIds) >= 0.6;
}

const STORAGE_KEY = "ortho-apologist:progress:v1";

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const version = parsed.version as number | undefined;
    if (version !== 1 && version !== 2 && version !== 3) {
      return emptyProgress();
    }
    const state = parsed as unknown as ProgressState & {
      freezesAvailable?: number;
      freezeMonth?: string | null;
    };
    // v1 → +grace-freeze fields.
    if (version === 1) {
      state.freezesAvailable = 1;
      state.freezeMonth = null;
    }
    // v1/v2 → migrate each item record from SM-2 (intervalDays/ease) to
    // FSRS-lite (stability/difficulty), preserving due dates.
    if (version === 1 || version === 2) {
      const items: Record<string, ItemRecord> = {};
      for (const [id, raw0] of Object.entries(state.items ?? {})) {
        const old = raw0 as ItemRecord & { intervalDays?: number; ease?: number };
        items[id] = {
          itemId: old.itemId ?? id,
          attempts: old.attempts ?? 0,
          correct: old.correct ?? 0,
          masteryScore: old.masteryScore ?? 0,
          stability:
            old.stability ??
            (old.intervalDays && old.intervalDays > 0 ? old.intervalDays : 0.4),
          difficulty: old.difficulty ?? 5,
          lastSeenAt: old.lastSeenAt ?? 0,
          nextDueAt: old.nextDueAt ?? 0,
          lastResult: old.lastResult ?? null,
        };
      }
      state.items = items;
    }
    state.version = 3;
    return state;
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota or private mode — silently degrade */
  }
}

export { APOLOGIST_RANKS };
