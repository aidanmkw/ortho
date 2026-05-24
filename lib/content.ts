import type { Curriculum } from "./types";
import { stage01 } from "@/content/stages/01-early-history";
import { stage02 } from "@/content/stages/02-church-fathers";
import { stage03 } from "@/content/stages/03-foundational-teaching";
import { stage04 } from "@/content/stages/04-heresies";
import { stage05 } from "@/content/stages/05-councils";
import { stage06 } from "@/content/stages/06-eo-vs-rcc";
import { stage07 } from "@/content/stages/07-eo-vs-protestants";
import { stage08 } from "@/content/stages/08-eo-vs-lds";
import { stage09 } from "@/content/stages/09-dogma";
import { stage10 } from "@/content/stages/10-saints";
import { stage11 } from "@/content/stages/11-practices";
import { stage12 } from "@/content/stages/12-scripture";
import { stage13 } from "@/content/stages/13-modern-issues";
import { stage14 } from "@/content/stages/14-final-trials";

export const curriculum: Curriculum = {
  stages: [
    stage01,
    stage02,
    stage03,
    stage04,
    stage05,
    stage06,
    stage07,
    stage08,
    stage09,
    stage10,
    stage11,
    stage12,
    stage13,
    stage14,
  ],
};

export function getStage(stageId: string) {
  return curriculum.stages.find((s) => s.id === stageId);
}

export function getTopic(stageId: string, topicId: string) {
  return getStage(stageId)?.topics.find((t) => t.id === topicId);
}

export function allItems() {
  return curriculum.stages.flatMap((s) =>
    s.topics.flatMap((t) => t.items.map((i) => ({ stage: s, topic: t, item: i })))
  );
}
