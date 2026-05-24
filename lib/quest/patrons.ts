import type { PatronSaint } from "./types";
import {
  spriteCatherine,
  spriteGeorge,
  spriteMaryEgypt,
  spriteSeraphim,
} from "./sprites";

export const PATRONS: PatronSaint[] = [
  {
    id: "st-catherine",
    name: "St. Catherine",
    title: "of Alexandria",
    sprite: spriteCatherine,
    passive: {
      description:
        "+15 Max Faith. The wisdom of fifty philosophers; +10% crit on QUOTE.",
      maxFaithBonus: 15,
      critChance: 0.10,
    },
    motto:
      "She debated fifty pagan philosophers and converted them. Now she debates for you.",
  },
  {
    id: "st-george",
    name: "St. George",
    title: "the Trophy-Bearer",
    sprite: spriteGeorge,
    passive: {
      description:
        "+20 Max HP. The dragon-slayer's courage: take a hit and rise.",
      maxHpBonus: 20,
    },
    motto: "He cast down the serpent. He will not let you fall.",
  },
  {
    id: "st-mary-egypt",
    name: "St. Mary",
    title: "of Egypt",
    sprite: spriteMaryEgypt,
    passive: {
      description:
        "+2 Faith regen per turn. Forty-seven years of repentance in the desert taught her endurance.",
      faithRegen: 2,
    },
    motto: "No sin is too great for the love of Christ.",
  },
  {
    id: "st-seraphim",
    name: "St. Seraphim",
    title: "of Sarov",
    sprite: spriteSeraphim,
    passive: {
      description:
        "+10% chance to perfectly DEFEND. 'Acquire the Spirit of peace.'",
      defendBonus: 0.15,
      maxFaithBonus: 5,
    },
    motto:
      "Acquire the Spirit of peace, and a thousand souls around you will be saved.",
  },
];

export function getPatron(id: string): PatronSaint | undefined {
  return PATRONS.find((p) => p.id === id);
}
