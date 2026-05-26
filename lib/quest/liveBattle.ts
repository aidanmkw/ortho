// Wires quest battles to the live study corpus + spaced-repetition state.
//
// Bosses ship with a few hand-authored attacks for narrative flavor; this
// adapter augments them with real MCQ items drawn from lib/content, prioritized
// by the player's spaced-repetition state (due / previously-wrong / weak items
// first) and softly boosted toward items relevant to the boss. Answering a
// live attack records to the main scheduler, so every battle turn is retrieval
// practice on the player's actual weak points.

import { allItems } from "@/lib/content";
import type { QAItem } from "@/lib/types";
import type { ProgressState } from "@/lib/progress";
import type { Boss, BossAttack } from "./types";

const STOP = new Set([
  "heresy",
  "the",
  "and",
  "of",
  "pre",
  "vatican",
  "internal",
  "early",
]);

function bossKeywords(boss: Boss): string[] {
  const raw = `${boss.tradition} ${boss.name} ${boss.title}`.toLowerCase();
  const words = raw
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !STOP.has(w));
  // Stem to a 5-char prefix so "arian"/"arianism", "icon"/"iconoclasm" match.
  return Array.from(new Set(words.map((w) => w.slice(0, 5))));
}

function itemRelevance(item: QAItem, stems: string[]): number {
  const hay = `${item.tags.join(" ")} ${item.opponentTradition ?? ""} ${
    item.prompt ?? ""
  }`.toLowerCase();
  return stems.some((s) => hay.includes(s)) ? 3 : 0;
}

function srPriority(item: QAItem, progress: ProgressState, now: number): number {
  const rec = progress.items[item.id];
  if (!rec) return 2; // never seen — worth learning
  if (rec.lastResult === "wrong") return 5; // missed last time
  if (rec.nextDueAt > 0 && rec.nextDueAt <= now) return 4; // due for review
  if (rec.masteryScore < 0.5) return 3; // shaky
  return 1; // mastered — low priority
}

function itemToAttack(item: QAItem): BossAttack | null {
  if (item.kind !== "mcq" || !item.choices || !item.correctChoiceId) return null;
  const correct = item.choices.find((c) => c.id === item.correctChoiceId);
  if (!correct) return null;
  const distractors = item.choices
    .filter((c) => c.id !== item.correctChoiceId)
    .slice(0, 3);
  if (distractors.length < 1) return null;
  const options = [correct, ...distractors].map((c) => ({
    text: c.text,
    correct: c.id === item.correctChoiceId,
    rationale: c.rationale,
  }));
  return {
    claim: item.prompt ?? "",
    options,
    difficulty: item.difficulty,
    itemId: item.id,
  };
}

/**
 * Build up to `count` live BossAttacks for a boss, prioritized by SR state and
 * relevance. Deterministic enough to be stable within a session but lightly
 * jittered so repeat fights vary.
 */
export function liveAttacksForBoss(
  boss: Boss,
  progress: ProgressState,
  count = 6
): BossAttack[] {
  const now = Date.now();
  const stems = bossKeywords(boss);

  const mcq = allItems()
    .map((entry) => entry.item)
    .filter((i) => i.kind === "mcq" && i.choices && i.correctChoiceId);

  const scored = mcq
    .map((item) => ({
      item,
      score:
        srPriority(item, progress, now) +
        itemRelevance(item, stems) +
        Math.random() * 0.9,
    }))
    .sort((a, b) => b.score - a.score);

  const attacks: BossAttack[] = [];
  for (const { item } of scored) {
    const atk = itemToAttack(item);
    if (atk) attacks.push(atk);
    if (attacks.length >= count) break;
  }
  return attacks;
}

/** Return a copy of the boss with live corpus attacks appended to its authored ones. */
export function withLiveAttacks(boss: Boss, progress: ProgressState, count = 6): Boss {
  const live = liveAttacksForBoss(boss, progress, count);
  if (live.length === 0) return boss;
  return { ...boss, attacks: [...boss.attacks, ...live] };
}
