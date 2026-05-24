import type { Item } from "./types";

export const ITEMS: Record<string, Item> = {
  "prayer-rope": {
    id: "prayer-rope",
    name: "Prayer Rope",
    flavor: "100 knots of black wool. Each knot, a Jesus Prayer.",
    effect: "+3 Faith regen per turn",
    faithRegen: 3,
  },
  "icon-christ": {
    id: "icon-christ",
    name: "Icon of Christ",
    flavor: "Encaustic, in the manner of Sinai. The face that does not fade.",
    effect: "+15 Max HP",
    maxHpBonus: 15,
  },
  "icon-theotokos": {
    id: "icon-theotokos",
    name: "Icon of the Theotokos",
    flavor: "She who bore the Word. Beneath her compassion you take refuge.",
    effect: "+10 Max Faith",
    maxFaithBonus: 10,
  },
  "relic-cross": {
    id: "relic-cross",
    name: "Splinter of the True Cross",
    flavor: "A relic from the finding of the Cross by St. Helena (326).",
    effect: "STRIKE deals 1.25x damage",
    strikeMult: 1.25,
  },
  "tome-leo": {
    id: "tome-leo",
    name: "Tome of Leo",
    flavor: "'Peter has spoken through Leo.' — the cry at Chalcedon.",
    effect: "+20 Max HP, +5 Max Faith",
    maxHpBonus: 20,
    maxFaithBonus: 5,
  },
  "philokalia": {
    id: "philokalia",
    name: "The Philokalia",
    flavor:
      "Five volumes of patristic wisdom. Compiled by Sts. Macarius and Nicodemus, 1782.",
    effect: "+5 Faith regen; STRIKE deals 1.15x damage",
    faithRegen: 5,
    strikeMult: 1.15,
  },
  "epitrachelion": {
    id: "epitrachelion",
    name: "Epitrachelion",
    flavor:
      "The priestly stole, the yoke of Christ. Worn from ordination forever.",
    effect: "+25 Max HP, +15 Max Faith",
    maxHpBonus: 25,
    maxFaithBonus: 15,
  },
  "synodikon": {
    id: "synodikon",
    name: "The Synodikon",
    flavor:
      "The conciliar memory of the Church, read every First Sunday of Lent.",
    effect: "+10 Max HP, STRIKE 1.2x",
    maxHpBonus: 10,
    strikeMult: 1.2,
  },
};

export function getItem(id: string): Item | undefined {
  return ITEMS[id];
}
