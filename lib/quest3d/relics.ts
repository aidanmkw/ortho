// Relics: passive build-changers found in hermit caves along the road.
// Effect logic lives in the app layer, keyed by id.

export type Relic = { id: string; name: string; icon: string; desc: string };

export const RELICS: Record<string, Relic> = {
  censer: {
    id: "censer",
    name: "Censer of Smyrna",
    icon: "⚱",
    desc: "Dash through a claim-bolt to catch it as incense: +1 Light.",
  },
  rope: {
    id: "rope",
    name: "Anthony's Rope",
    icon: "➰",
    desc: "A saint's blessing turns aside two wrong answers instead of one.",
  },
  pen: {
    id: "pen",
    name: "Damascene's Pen",
    icon: "✒",
    desc: "The Spirit of Truth costs 2 Light instead of 3.",
  },
  psalter: {
    id: "psalter",
    name: "Pocket Psalter",
    icon: "📖",
    desc: "+15 maximum health.",
  },
  wheel: {
    id: "wheel",
    name: "Catherine's Wheel",
    icon: "☸",
    desc: "Smiting a staggered adversary deals double damage.",
  },
};

/** Which cave grants which relic, by zone index. */
export const CAVE_RELIC: Record<number, string> = {
  1: "censer",
  4: "rope",
  6: "pen",
  9: "psalter",
  11: "wheel",
};

export const CAVE_ZONES = [1, 4, 6, 9, 11];
export const CHAPEL_ZONES = [0, 2, 5, 8, 12];
