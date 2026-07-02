// Types for the 3D pilgrimage ("ΟΔΟΣ — The Pilgrim Road").
// The 3D quest reuses the 2D quest's chapter/boss corpus (lib/quest/chapters)
// for all battle content; these types cover only the world + save layer.

import type { Chapter } from "@/lib/quest/types";

/** What grows in a zone. */
export type TreeKind =
  | "pine"
  | "birch"
  | "cypress"
  | "olive"
  | "palm"
  | "dead"
  | "none";

/**
 * Per-zone biome: sun, air, and earth. The road runs through golden-hour
 * Mediterranean hills, snowbound pine country, and finally a starlit
 * waste — each chapter keeps its own weather.
 */
export type ZonePalette = {
  /** Sun position/energy. Negative elevation = night (sky hidden, moonlight). */
  sun: { elevation: number; azimuth: number; intensity: number; color: string };
  /** Atmosphere for the sky shader. */
  turbidity: number;
  rayleigh: number;
  /** Hemisphere fill light. */
  hemi: { sky: string; ground: string; intensity: number };
  fog: { color: string; near: number; far: number };
  exposure: number;
  /** Ground colors. */
  grass: string;
  dirt: string; // road + bare patches
  rock: string;
  /** World height above which terrain reads as snow (999 = never). */
  snowLine: number;
  trees: TreeKind;
  treeDensity: number; // 0..1
  grassDensity: number; // 0..1
  /** Night dressing. */
  stars?: boolean;
  aurora?: boolean;
  /** Falling snow instead of drifting motes. */
  snowfall?: boolean;
  /** 0..1: how dark the zone reads — drives lamp glow + player lantern. */
  gloom?: number;
};

/** A zone = one chapter of the corpus staged as a stretch of the road. */
export type ZoneDef = {
  /** 0-based station index along the road. */
  index: number;
  chapter: Chapter;
  palette: ZonePalette;
  /** Portrait-registry ids (drive the 3D costume builder). */
  bossId: string;
  allyId?: string;
  allyName?: string;
  /** First intro line spoken by the ally (their greeting), if any. */
  allyLine?: string;
  /** First narrator line of the chapter (shrine lore), if any. */
  narratorLine?: string;
};

/** Save file for the 3D pilgrimage — independent of the 2D quest save. */
export type PilgrimSave = {
  version: 1;
  /** player hair variant id (see HAIR_CHOICES). */
  hair: string;
  xp: number;
  light: number;
  beaten: string[]; // chapter ids
  checkpoint: number; // zone index to respawn into
  wins: number;
  losses: number;
  startedAt: number;
  lastSavedAt: number;
  /** persistent pilgrim health (healing is scarce). */
  hp: number;
  /** relic ids found in hermit caves. */
  relics: string[];
  /** wrong answers logged for The Doubt to replay: boss id + attack idx. */
  wrongLog: { b: string; a: number }[];
};

/** What the player is standing near (drives the interact button / prompts). */
export type NearTarget =
  | { kind: "boss"; zoneIdx: number }
  | { kind: "ally"; zoneIdx: number }
  | { kind: "shrine"; zoneIdx: number }
  | { kind: "gate"; zoneIdx: number }
  | { kind: "cave"; zoneIdx: number }
  | { kind: "chapel"; zoneIdx: number };

/** Callbacks from the engine up into React. */
export type EngineHooks = {
  onReady?: () => void;
  onZoneChange?: (zoneIdx: number) => void;
  onNear?: (target: NearTarget | null) => void;
  onLamp?: (zoneIdx: number, lampIdx: number) => void;
  /** Player stood on an answer plate long enough to commit it. */
  onPlateCommit?: (plateIdx: number) => void;
  /** A boss attack (bolt/scorch/wisp) connected with the player. */
  onPlayerHit?: (damage: number, kind: "bolt" | "scorch" | "wisp") => void;
  /** Player rushed the staggered boss — bonus damage window. */
  onSmite?: () => void;
  /** Player is close enough to a plate to read it (null = none). */
  onPlateFocus?: (plateIdx: number | null) => void;
  /** A bolt passed harmlessly through the player mid-dash. */
  onBoltDodged?: () => void;
  /** A false-claim wisp was popped by dashing through it. */
  onWispPopped?: () => void;
};

export type PlateState = "idle" | "dimmed" | "correct" | "wrong";
