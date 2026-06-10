// Builds the 13 stations of the Pilgrim Road from the 2D quest corpus.
// Only the base battle chapters form the road — one zone per chapter,
// in chronological order (the corpus' lesson chapters are not staged).

import { CHAPTERS } from "@/lib/quest/chapters";
import { PORTRAITS } from "@/lib/quest/portraits";
import type { ZoneDef, ZonePalette } from "./types";

/** The canonical pilgrimage arc, in road order. */
export const ROAD_CHAPTER_IDS = [
  "ch1-antioch",
  "ch2-catacombs",
  "ch3-nicaea",
  "ch4-desert",
  "ch5-chalcedon",
  "ch6-icons",
  "ch7-schism",
  "ch8-florence",
  "ch9-soviets",
  "ch10-modern",
  "ch10b-reformed",
  "ch10c-atheist",
  "ch11-doubt",
] as const;

// Gold sky everywhere — the icon's uncreated light — but each era keeps
// its own earth: dusty Antioch, umber catacombs, blazing desert, cold
// Soviet steel, and finally the starlit void of the last adversary.
const PALETTES: Record<string, ZonePalette> = {
  "ch1-antioch": {
    skyTop: "#f7df8e",
    skyHorizon: "#c98f33",
    fog: "#e3c178",
    ground: "#c29c55",
    road: "#e0cb96",
    mountain: ["#a06a32", "#c89454", "#ecd29c"],
    trees: "olive",
  },
  "ch2-catacombs": {
    skyTop: "#8a6a2e",
    skyHorizon: "#3c2a14",
    fog: "#41301d",
    ground: "#4a3526",
    road: "#5f4a36",
    mountain: ["#3a2818", "#56402a", "#7d6243"],
    trees: "none",
    gloom: 0.75,
  },
  "ch3-nicaea": {
    skyTop: "#f8e49a",
    skyHorizon: "#cf9a3c",
    fog: "#e4cd96",
    ground: "#b3a385",
    road: "#d8cdb1",
    mountain: ["#6e7488", "#929aae", "#c5cad8"],
    trees: "cypress",
  },
  "ch4-desert": {
    skyTop: "#f8e093",
    skyHorizon: "#d49336",
    fog: "#ecc887",
    ground: "#d4a356",
    road: "#e9cd8e",
    mountain: ["#9c5530", "#c07848", "#e8b380",],
    trees: "palm",
  },
  "ch5-chalcedon": {
    skyTop: "#f6dd92",
    skyHorizon: "#c6913a",
    fog: "#dfc491",
    ground: "#c0ab8d",
    road: "#ddd0b0",
    mountain: ["#7c6a80", "#9d8aa0", "#cabccc"],
    trees: "cypress",
  },
  "ch6-icons": {
    skyTop: "#fae6a0",
    skyHorizon: "#d6a23e",
    fog: "#ecd49a",
    ground: "#c4ac74",
    road: "#e4d4a4",
    mountain: ["#8a7438", "#b09a52", "#d8c684"],
    trees: "cypress",
  },
  "ch7-schism": {
    skyTop: "#e8cc80",
    skyHorizon: "#94733a",
    fog: "#bca77a",
    ground: "#a3957b",
    road: "#c2b694",
    mountain: ["#5e6474", "#7e8494", "#aab0c0"],
    trees: "cypress",
    gloom: 0.25,
  },
  "ch8-florence": {
    skyTop: "#f0d488",
    skyHorizon: "#b87e38",
    fog: "#d8b886",
    ground: "#b29a82",
    road: "#d2bfa2",
    mountain: ["#8a5a44", "#ac7858", "#d2a684"],
    trees: "cypress",
  },
  "ch9-soviets": {
    skyTop: "#b89a50",
    skyHorizon: "#564828",
    fog: "#6e685c",
    ground: "#67696d",
    road: "#7d7f83",
    mountain: ["#3e4248", "#565a60", "#e8e8ec"],
    trees: "bare",
    gloom: 0.55,
  },
  "ch10-modern": {
    skyTop: "#e6cc84",
    skyHorizon: "#9e7c3c",
    fog: "#c2ad88",
    ground: "#8d8678",
    road: "#aaa292",
    mountain: ["#6a665c", "#8c887c", "#b8b4a8"],
    trees: "bare",
  },
  "ch10b-reformed": {
    skyTop: "#ecd28a",
    skyHorizon: "#a8843e",
    fog: "#cab490",
    ground: "#968c7a",
    road: "#b4aa96",
    mountain: ["#73685a", "#958a7a", "#c0b6a6"],
    trees: "olive",
  },
  "ch10c-atheist": {
    skyTop: "#b08a40",
    skyHorizon: "#3a3020",
    fog: "#4a4438",
    ground: "#5e584e",
    road: "#746e62",
    mountain: ["#36322c", "#4e4a42", "#6e6a60"],
    trees: "bare",
    stars: true,
    gloom: 0.5,
  },
  "ch11-doubt": {
    skyTop: "#241c30",
    skyHorizon: "#0a0810",
    fog: "#120e1c",
    ground: "#161020",
    road: "#241c32",
    mountain: ["#080610", "#100c1a", "#1e1830"],
    trees: "none",
    stars: true,
    gloom: 1,
  },
};

const FALLBACK: ZonePalette = PALETTES["ch1-antioch"];

function spriteFile(id: string): string {
  return PORTRAITS[id]?.image ?? `${id}.webp`;
}

export function buildZones(): ZoneDef[] {
  const byId = new Map(CHAPTERS.map((c) => [c.id, c]));
  const zones: ZoneDef[] = [];
  ROAD_CHAPTER_IDS.forEach((id, index) => {
    const chapter = byId.get(id);
    if (!chapter || !chapter.boss) return;
    const ally = chapter.ally;
    const allyLine = ally
      ? chapter.intro.find((l) => l.speaker === ally)?.text
      : undefined;
    const narratorLine = chapter.intro.find(
      (l) => l.speaker === "narrator"
    )?.text;
    zones.push({
      index,
      chapter,
      palette: PALETTES[id] ?? FALLBACK,
      bossSprite: spriteFile(chapter.boss.sprite),
      allySprite: ally ? spriteFile(ally) : undefined,
      allyName: ally ? PORTRAITS[ally]?.name ?? ally : undefined,
      allyLine,
      narratorLine,
    });
  });
  return zones;
}
