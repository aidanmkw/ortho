import type { Stage } from "@/lib/types";
import { apostolicEra } from "./topics/01-apostolic-era";
import { apostolicSuccession } from "./topics/02-apostolic-succession";
import { subApostolicFathers } from "./topics/03-sub-apostolic-fathers";
import { tenPersecutions } from "./topics/04-ten-persecutions";
import { earlyApologists } from "./topics/05-early-apologists";
import { earlyLiturgicalPatterns } from "./topics/06-early-liturgical-patterns";
import { edictOfMilan } from "./topics/07-edict-of-milan";
import { catacombsCreeds } from "./topics/08-catacombs-creeds";
import {
  apostolicSucessionLists,
  earlyChristianWriters,
  persecutionsDetail,
  earlyChurchOrder,
} from "./topics/09-quick-recall";

export const stage01: Stage = {
  id: "01-early-history",
  order: 1,
  title: "Early History",
  subtitle: "Pentecost to the Edict of Milan",
  era: "AD 33 – 313",
  description:
    "From the descent of the Holy Spirit upon the Twelve to Constantine's edict of religious liberty. Three centuries in which the apostolic Church spread from Jerusalem to every province of the empire under intermittent persecution, with every defining doctrine and practice of Orthodox Christianity already documented in the writings of those who knew the Apostles or their disciples.",
  rank: "Catechumen",
  topics: [
    apostolicEra,
    apostolicSuccession,
    subApostolicFathers,
    tenPersecutions,
    earlyApologists,
    earlyLiturgicalPatterns,
    edictOfMilan,
    catacombsCreeds,
    apostolicSucessionLists,
    earlyChristianWriters,
    persecutionsDetail,
    earlyChurchOrder,
  ],
};
