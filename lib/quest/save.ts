import type { QuestProgress, HeroState } from "./types";
import { QUEST_RANKS } from "./types";

const KEY = "quest:progress:v2";

export function emptyProgress(): QuestProgress {
  return {
    version: 2,
    hero: null,
    chapterIndex: 0,
    chaptersBeaten: [],
    totalBattlesWon: 0,
    totalBattlesLost: 0,
    startedAt: 0,
    lastSavedAt: 0,
    hairColor: "#7a4f1d",
  };
}

export function loadProgress(): QuestProgress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as QuestProgress;
    if (parsed.version !== 2) return emptyProgress();
    return parsed;
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(p: QuestProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ ...p, lastSavedAt: Date.now() })
    );
  } catch {}
}

export function clearProgress() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {}
}

export function rankForLevel(level: number): string {
  let r = "Inquirer";
  for (const t of QUEST_RANKS) {
    if (level >= t.min) r = t.rank;
  }
  return r;
}

export function createHero(name: string, patronId: string): HeroState {
  return {
    name: name.slice(0, 16).trim() || "Inquirer",
    patronId,
    level: 0,
    xp: 0,
    maxHp: 100,
    hp: 100,
    maxFaith: 30,
    faith: 30,
    items: [],
    rank: "Inquirer",
  };
}
