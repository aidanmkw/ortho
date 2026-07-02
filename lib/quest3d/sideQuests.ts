// The Second Road: every expansion-corpus battle staged as an optional
// legendary duel at an off-road waystone. Pure data — the engine builds
// the sites, the app runs the fights through the normal battle system.

import { CHAPTERS } from "@/lib/quest/chapters";
import type { Chapter } from "@/lib/quest/types";
import { ROAD_CHAPTER_IDS } from "./zones";

export type SideDuel = {
  idx: number;
  chapter: Chapter;
  /** main-road zone this duel branches from */
  zone: number;
  /** which waystone slot in the zone (0 west, 1 east) */
  slot: 0 | 1;
};

/** Fixed waystone positions (x, local road-distance into the zone). */
export const DUEL_SLOTS: { x: number; local: number }[] = [
  { x: -27, local: 13 },
  { x: 27, local: 36 },
];

export function buildSideDuels(): SideDuel[] {
  const road = new Set<string>(ROAD_CHAPTER_IDS as readonly string[]);
  const pool = CHAPTERS.filter(
    (c) => c.kind !== "lesson" && c.boss && !road.has(c.id)
  );
  const used: Record<number, number> = {};
  const duels: SideDuel[] = [];
  pool.forEach((chapter, i) => {
    const zone = Math.min(12, Math.floor((i * 13) / pool.length));
    const slot = (Math.min(1, used[zone] ?? 0) as 0 | 1);
    used[zone] = (used[zone] ?? 0) + 1;
    if ((used[zone] ?? 0) > 2) return; // two waystones per zone at most
    duels.push({ idx: duels.length, chapter, zone, slot });
  });
  return duels;
}
