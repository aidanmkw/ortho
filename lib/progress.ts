// Pure progress logic. No React or DOM dependencies.

import { APOLOGIST_RANKS, type ApologistRank, type Difficulty } from "./types";

export type ItemRecord = {
  itemId: string;
  attempts: number;
  correct: number;
  // 0..1 - moving mastery score, exponential weighted.
  masteryScore: number;
  // SM-2 lite: interval in days; ease factor.
  intervalDays: number;
  ease: number;
  // last seen / next due, epoch ms
  lastSeenAt: number;
  nextDueAt: number;
  // last result for UI: "correct" | "wrong" | "skipped" | null
  lastResult: "correct" | "wrong" | "skipped" | null;
};

export type ProgressState = {
  version: 1;
  xp: number;
  rank: ApologistRank;
  streakDays: number;
  // ISO date of the last day on which the player did at least one item.
  lastActiveDay: string | null;
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

export function emptyProgress(): ProgressState {
  return {
    version: 1,
    xp: 0,
    rank: "Inquirer",
    streakDays: 0,
    lastActiveDay: null,
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
  const prev = state.items[itemId] ?? {
    itemId,
    attempts: 0,
    correct: 0,
    masteryScore: 0,
    intervalDays: 0,
    ease: 2.5,
    lastSeenAt: 0,
    nextDueAt: 0,
    lastResult: null,
  };

  const isFirstTry = prev.attempts === 0;
  const wasCorrect = result === "correct";

  // Mastery: EMA toward 1 on correct, toward 0 on wrong, decays on skip.
  const target = wasCorrect ? 1 : result === "wrong" ? 0 : prev.masteryScore;
  const masteryScore = prev.masteryScore * 0.6 + target * 0.4;

  // SM-2 lite scheduling.
  let interval = prev.intervalDays;
  let ease = prev.ease;
  if (wasCorrect) {
    if (interval === 0) interval = 1;
    else if (interval === 1) interval = 3;
    else interval = Math.round(interval * ease);
    ease = Math.max(1.3, ease + 0.1);
  } else if (result === "wrong") {
    interval = 0;
    ease = Math.max(1.3, ease - 0.2);
  }

  const updatedItem: ItemRecord = {
    ...prev,
    attempts: prev.attempts + 1,
    correct: prev.correct + (wasCorrect ? 1 : 0),
    masteryScore,
    intervalDays: interval,
    ease,
    lastSeenAt: now,
    nextDueAt: now + interval * 86400000,
    lastResult: result,
  };

  // XP only awarded on first-try correct (anti-grinding).
  const xpAward = wasCorrect && isFirstTry ? xpForCorrect(difficulty, true) : 0;
  const xp = state.xp + xpAward;

  // Streak update — only when something was attempted today.
  let streakDays = state.streakDays;
  let lastActiveDay = state.lastActiveDay;
  if (lastActiveDay !== today) {
    if (lastActiveDay) {
      const gap = daysBetween(lastActiveDay, today);
      streakDays = gap === 1 ? streakDays + 1 : 1;
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
    const parsed = JSON.parse(raw) as ProgressState;
    if (parsed.version !== 1) return emptyProgress();
    return parsed;
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
