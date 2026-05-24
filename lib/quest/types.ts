// Pixel quest type definitions.
// The quest reuses the main corpus (lib/content) for battle questions.

import type { QAItem } from "@/lib/types";

export type Sprite = {
  // Compact representation: rows of single chars; each char maps to a palette index.
  // " " is always transparent.
  rows: string[];
  // charMap maps single chars to hex colors. Use " " for transparent.
  palette: Record<string, string>;
  // pixel size hint (CSS px per pixel) — actual scaling done by renderer
  scale?: number;
};

export type PatronSaint = {
  id: string;
  name: string;
  title: string;          // e.g. "the Great", "of Alexandria"
  sprite: Sprite;
  // Passive bonus applied throughout the run.
  passive: {
    description: string;
    maxHpBonus?: number;
    maxFaithBonus?: number;
    // % chance an attack does double damage
    critChance?: number;
    // FP regen per turn
    faithRegen?: number;
    // Bonus to defend success
    defendBonus?: number;
  };
  // Short prayer-quote shown on selection.
  motto: string;
};

export type Item = {
  id: string;
  name: string;
  flavor: string;
  effect: string; // human description
  // Numeric effects
  maxHpBonus?: number;
  maxFaithBonus?: number;
  faithRegen?: number;
  // % multiplier on strike damage
  strikeMult?: number;
};

export type BossAttack = {
  // The opponent's claim. May reference a corpus item (preferred) or be inline.
  claim: string;
  // Four answer options for the player. Exactly one is correct.
  options: { text: string; correct: boolean; rationale?: string }[];
  // Damage if player picks wrong, healing if right (modifiers applied later).
  difficulty: 1 | 2 | 3 | 4 | 5;
  // Boss flavor when this attack is used.
  taunt?: string;
};

export type Boss = {
  id: string;
  name: string;
  title: string;          // e.g. "the Archheretic"
  tradition: string;      // shown in the HP bar
  // Sprite id (looked up in ALL_SPRITES).
  sprite: string;
  maxHp: number;
  // Pool of attacks: each round one is drawn. Cycle or random.
  attacks: BossAttack[];
  // Opening boss line.
  intro: string;
  // Said when boss is at ~50% HP.
  midline?: string;
  // Said on defeat.
  outro: string;
  // Quote shown on victory (a Father's word).
  victoryEpigraph?: { text: string; source: string };
};

export type DialogLine = {
  // Speaker id — "you" or a character id, or "narrator"
  speaker: string;
  text: string;
  // Optional sprite override for the line
  spriteOverride?: string;
};

export type Chapter = {
  id: string;
  number: number;
  era: string;          // "AD 107"
  location: string;     // "Antioch, on the road to Rome"
  title: string;
  // Background palette / motif id
  background: string;
  // Patron saint allied with the player this chapter.
  ally?: string;
  // Story before battle
  intro: DialogLine[];
  // Boss
  boss: Boss;
  // Story after battle
  outro: DialogLine[];
  // Reward
  reward: {
    xp: number;
    item?: string;      // Item id awarded
    healHp?: boolean;   // full heal
  };
};

export type HeroState = {
  name: string;
  patronId: string;
  level: number;
  xp: number;
  maxHp: number;
  hp: number;
  maxFaith: number;
  faith: number;
  items: string[];      // item ids
  rank: string;
};

export type AttackState = {
  // composite key: `${bossId}:${attackIdx}`
  bossId: string;
  attackIdx: number;
  attempts: number;
  correct: number;
  lastResult: "correct" | "wrong" | null;
  lastSeenAt: number;
};

export type QuestProgress = {
  version: 2;
  hero: HeroState | null;
  chapterIndex: number;        // 0-based, current chapter
  chaptersBeaten: string[];    // chapter ids beaten
  totalBattlesWon: number;
  totalBattlesLost: number;
  // Run start (epoch ms)
  startedAt: number;
  lastSavedAt: number;
  // Cosmetic
  hairColor: string;
  // Per-attack mastery tracking (learning analytics) — added later;
  // optional for backward compat with v2 saves before this field.
  attackStates?: Record<string, AttackState>;
};

export type ResolvedAttack = {
  attackIdx: number;          // index in boss.attacks
  bossId: string;
  pickedOptionText: string;
  pickedCorrect: boolean;
  correctOptionText: string;
  rationale?: string;
  claim: string;
};

export type BattleResult = "victory" | "defeat" | "ongoing";

export type RankTier = {
  min: number;
  rank: string;
};

export const QUEST_RANKS: RankTier[] = [
  { min: 0, rank: "Inquirer" },
  { min: 1, rank: "Catechumen" },
  { min: 3, rank: "Reader" },
  { min: 5, rank: "Subdeacon" },
  { min: 7, rank: "Deacon" },
  { min: 8, rank: "Priest" },
  { min: 9, rank: "Confessor" },
  { min: 10, rank: "Apologist" },
];

export type { QAItem };
