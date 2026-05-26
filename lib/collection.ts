// The Reliquary — a collection of rewards earned by completing trials.
//
// Variable reward (the Hook-model dopamine driver), but sourced honestly from
// the tradition: most draws are a "saying" of a Father/saint; rarer draws are
// a "relic" (a quest item). Drawing is seeded so a given day's reward is
// stable, and the collection persists in localStorage.

import { saints } from "./saints";
import { ITEMS } from "./quest/items";

export type Reward = {
  id: string;
  kind: "saying" | "relic";
  rarity: "common" | "rare";
  title: string;
  text: string;
  source?: string;
};

export type CollectedReward = Reward & { collectedAt: number; count: number };

const STORAGE_KEY = "reliquary:v1";
export const RELIQUARY_EVENT = "reliquary-changed";

// --- Reward pools -----------------------------------------------------------

const SAYINGS: Reward[] = saints
  .filter((s) => s.quote && s.quote.text)
  .map((s) => ({
    id: `saying:${s.slug}`,
    kind: "saying" as const,
    rarity: "common" as const,
    title: s.name,
    text: s.quote!.text,
    source: s.quote!.source,
  }));

const RELICS: Reward[] = Object.values(ITEMS).map((it) => ({
  id: `relic:${it.id}`,
  kind: "relic" as const,
  rarity: "rare" as const,
  title: it.name,
  text: it.flavor,
}));

// --- Storage ----------------------------------------------------------------

export function loadCollection(): CollectedReward[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CollectedReward[]) : [];
  } catch {
    return [];
  }
}

function persist(list: CollectedReward[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(RELIQUARY_EVENT));
  } catch {
    /* ignore quota */
  }
}

// --- Seeded RNG (shared style with daily.ts) --------------------------------

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Roll a reward for a given seed (e.g. the day key). ~15% chance of a relic. */
export function rollReward(seed: string): Reward {
  const rng = mulberry32(hashSeed(seed));
  const isRare = rng() < 0.15 && RELICS.length > 0;
  const pool = isRare ? RELICS : SAYINGS;
  return pool[Math.floor(rng() * pool.length)];
}

/** Add a reward to the collection. Returns {reward, isNew}. */
export function collectReward(reward: Reward): { reward: Reward; isNew: boolean } {
  const list = loadCollection();
  const existing = list.find((r) => r.id === reward.id);
  if (existing) {
    existing.count += 1;
    persist(list);
    return { reward, isNew: false };
  }
  list.unshift({ ...reward, collectedAt: Date.now(), count: 1 });
  persist(list);
  return { reward, isNew: true };
}
