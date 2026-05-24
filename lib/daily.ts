// Deterministic daily-trial item selector.
// Picks N items mixed across all stages, seeded by the day's date.

import { curriculum } from "./content";
import type { QAItem } from "./types";

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickDailyItems(
  dayKey: string,
  count = 10,
  bias?: { masteredIds?: Set<string> }
): QAItem[] {
  const all = curriculum.stages.flatMap((s) =>
    s.topics.flatMap((t) => t.items)
  );
  const rng = mulberry32(hashSeed(dayKey));

  // Light bias: include more items the user has NOT mastered.
  const unmastered = all.filter((i) => !bias?.masteredIds?.has(i.id));
  const pool = unmastered.length >= count ? unmastered : all;

  // Fisher-Yates with seeded RNG.
  const arr = [...pool];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(count, arr.length));
}

export function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}
