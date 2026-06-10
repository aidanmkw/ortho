// Types for the 3D icon-world pilgrimage ("ΟΔΟΣ — The Pilgrim Road").
// The 3D quest reuses the 2D quest's chapter/boss corpus (lib/quest/chapters)
// for all battle content; these types cover only the world + save layer.

import type { Chapter } from "@/lib/quest/types";

/** What kind of stylized icon-trees a zone grows. */
export type TreeKind = "olive" | "cypress" | "palm" | "bare" | "none";

/**
 * Per-zone palette — every zone is "written" like a register of one long
 * icon: gold sky throughout, but each era keeps its own earth and air.
 */
export type ZonePalette = {
  skyTop: string;
  skyHorizon: string;
  fog: string;
  ground: string;
  road: string;
  /** [base, face, highlight] banding for the stepped icon-mountains. */
  mountain: [string, string, string];
  trees: TreeKind;
  /** Draw a starfield (used by the final "Beyond Time" zone). */
  stars?: boolean;
  /** 0..1 how dark the zone reads — drives lamp glow strength. */
  gloom?: number;
};

/** A zone = one chapter of the corpus staged as a stretch of the road. */
export type ZoneDef = {
  /** 0-based station index along the road. */
  index: number;
  chapter: Chapter;
  palette: ZonePalette;
  /** Sprite ids resolved to /public/sprites filenames. */
  bossSprite: string;
  allySprite?: string;
  allyName?: string;
  /** First intro line spoken by the ally (their greeting), if any. */
  allyLine?: string;
  /** First narrator line of the chapter (shrine lore), if any. */
  narratorLine?: string;
};

/** Save file for the 3D pilgrimage — independent of the 2D quest save. */
export type PilgrimSave = {
  version: 1;
  /** player sprite variant: black | brown | blond | auburn | dark | silver */
  hair: string;
  xp: number;
  light: number;
  beaten: string[]; // chapter ids
  checkpoint: number; // zone index to respawn into
  wins: number;
  losses: number;
  startedAt: number;
  lastSavedAt: number;
};

/** What the player is standing near (drives the interact button / prompts). */
export type NearTarget =
  | { kind: "boss"; zoneIdx: number }
  | { kind: "ally"; zoneIdx: number }
  | { kind: "shrine"; zoneIdx: number }
  | { kind: "gate"; zoneIdx: number };

/** Callbacks from the engine up into React. */
export type EngineHooks = {
  onReady?: () => void;
  onZoneChange?: (zoneIdx: number) => void;
  onNear?: (target: NearTarget | null) => void;
  onLamp?: (zoneIdx: number, lampIdx: number) => void;
  /** Player stood on an answer plate long enough to commit it. */
  onPlateCommit?: (plateIdx: number) => void;
};

export type PlateState = "idle" | "dimmed" | "correct" | "wrong";
