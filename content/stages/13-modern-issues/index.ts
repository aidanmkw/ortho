import type { Stage } from "@/lib/types";
import {
  bioethics,
  sergianism,
  ukraine,
  americanJurisdictions,
} from "./more-modern";
import {
  evolution,
  sexualityMarriage,
  ivf,
  trueOrthodox,
  westernRite,
} from "./bulk-modern";

export const stage13: Stage = {
  id: "13-modern-issues",
  order: 13,
  title: "Modern Issues",
  subtitle: "Calendars, jurisdictions, ecumenism, bioethics",
  description:
    "Old vs. Revised Julian, Sergianism, ecumenism, the Council of Crete (2016), jurisdictional plurality in the diaspora, abortion, marriage, evolution.",
  rank: "Apologist (in formation)",
  topics: [
    {
      id: "calendar",
      title: "The Calendar Question",
      summary:
        "The 1923 Constantinople Congress's introduction of the Revised Julian Calendar, and the resulting division between Old Calendarist and New Calendar jurisdictions. The Paschalion remains Julian everywhere except Finland.",
      learningObjectives: [
        "Distinguish the Julian, Gregorian, and Revised Julian calendars.",
        "Identify which Orthodox Churches use which.",
        "State the Paschalion exception.",
      ],
      primarySources: [
        "Acts of the Constantinople Congress (1923)",
        "Encyclicals of the Synods of the Russian Church Abroad, Old Calendarist GOC",
      ],
      items: [
        {
          id: "mod-cal-001",
          kind: "qa",
          difficulty: 3,
          tags: ["calendar"],
          prompt:
            "Which Orthodox Churches today follow the Old (Julian) Calendar in their full annual cycle, and which follow the Revised Julian?",
          expectedAnswer:
            "Old Calendar (Julian) in everything: Russian (Moscow Patriarchate), Serbian, Georgian, Polish, Jerusalem, and Mt. Athos (under Constantinople but Old Calendar). Revised Julian (since 1923–1924): Constantinople, Alexandria, Antioch, Greek (Greece, Albania), Romanian, Bulgarian, OCA. The Paschalion (calculation of Pascha) remains Julian for all except the Finnish Church.",
          citations: [
            { source: "Acts of the Constantinople Congress (1923)" },
            { source: "Various jurisdictions' own typikons" },
          ],
        },
      ],
    },
    {
      id: "ecumenism",
      title: "Ecumenism",
      summary:
        "The 1965 mutual lifting of the 1054 anathemas; WCC participation; the Balamand statement (1993); Crete (2016). The Orthodox concern that 'ecumenism' shade into 'branch theory.'",
      learningObjectives: [
        "Identify the 1965 mutual lifting of the 1054 anathemas.",
        "State the traditionalist Orthodox concern about ecumenism.",
        "Cite St. Justin Popović's writings.",
      ],
      primarySources: [
        "Common Declaration of Pope Paul VI and Patriarch Athenagoras (1965)",
        "St. Justin Popović, The Orthodox Church and Ecumenism",
        "Council of Crete documents (2016)",
      ],
      items: [
        {
          id: "mod-ecu-001",
          kind: "qa",
          difficulty: 3,
          tags: ["1965-anathemas"],
          prompt:
            "What act took place at Constantinople and Rome on 7 December 1965?",
          expectedAnswer:
            "Patriarch Athenagoras of Constantinople and Pope Paul VI mutually 'consigned to oblivion' the anathemas of 1054 between Cardinal Humbert and Patriarch Michael Cerularius. The act was personal and ceremonial — it did not in itself dissolve any of the doctrinal differences (Filioque, papal supremacy, purgatory, etc.) — but symbolically opened the modern dialogue.",
          citations: [
            { source: "Common Declaration of Pope Paul VI and Patriarch Athenagoras, 7 December 1965" },
          ],
        },
      ],
    },
    bioethics,
    sergianism,
    ukraine,
    americanJurisdictions,
    evolution,
    sexualityMarriage,
    ivf,
    trueOrthodox,
    westernRite,
  ],
};
