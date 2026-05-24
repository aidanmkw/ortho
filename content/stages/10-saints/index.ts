import type { Stage } from "@/lib/types";
import {
  apostles,
  maryOfEgypt,
  newMartyrs,
  greekModern,
} from "./more-saints";
import { antony, sergiusOfRadonezh, americanSaints } from "./desert-depth";
import {
  stephenFirstMartyr,
  georgeTheTrophy,
  nicholasOfMyra,
  symeonStylites,
  macariusEgypt,
  ninaGeorgia,
  seraphimRose,
  ignatiusBrianchaninov,
  johnMaximovitch,
  justinPopovic,
} from "./bulk-saints";
import { saintsFactsPack } from "./mass-saints";
import {
  johnTheTheologian,
  peterAndPaul,
  photiosTheGreat,
  xeniaPetersburg,
  matronaMoscow,
  optinaElders,
  innocentAlaska,
  isaacOfSyria,
} from "./extra-saints";
import { saintsFinalPack } from "./final-saints";

export const stage10: Stage = {
  id: "10-saints",
  order: 10,
  title: "Famous Saints",
  subtitle: "Apostles, martyrs, confessors, ascetics, hierarchs",
  description:
    "The cloud of witnesses (Heb 12:1). Lives, miracles, teachings, and feasts of the Apostles, the Twelve, the Three Hierarchs, the desert and Russian saints, the Greek and modern saints, and the New Martyrs.",
  rank: "Archpriest",
  topics: [
    {
      id: "three-hierarchs",
      title: "The Three Hierarchs",
      summary:
        "Sts. Basil the Great, Gregory the Theologian, and John Chrysostom — jointly commemorated January 30 — pillars of the 4th-century Church.",
      learningObjectives: [
        "Identify each Hierarch's see and dates.",
        "Match each to his principal works.",
        "State the reason for their joint feast (the 11th-century vision at Constantinople).",
      ],
      primarySources: [
        "St. Basil — On the Holy Spirit; Hexaemeron; Letters",
        "St. Gregory — Five Theological Orations",
        "St. John Chrysostom — Homilies on Matthew, on John, on Romans",
      ],
      items: [
        {
          id: "saint-3h-001",
          kind: "qa",
          difficulty: 2,
          tags: ["three-hierarchs"],
          prompt:
            "On what date are the Three Hierarchs jointly commemorated, and why is their joint feast observed?",
          expectedAnswer:
            "January 30. The joint feast was established in the 11th century under Emperor Alexios I Komnenos after a vision granted to St. John Mauropous, Bishop of Euchaita, in which the three saints appeared together to settle a popular dispute over which was greatest — declaring themselves equal before God and asking for one common feast.",
          citations: [
            { source: "Synaxarion, January 30 — Vita of St. John Mauropous" },
          ],
        },
      ],
    },
    {
      id: "desert-fathers",
      title: "The Desert Fathers",
      summary:
        "Anthony the Great (251–356), Pachomius, Macarius the Great, Sisoes, Poemen, Arsenius, Moses the Ethiopian — the founders of Christian monasticism in the Egyptian and Palestinian deserts.",
      learningObjectives: [
        "Identify St. Anthony as the father of monasticism.",
        "Quote one apophthegm from the Gerontikon.",
        "Trace the spread of monasticism from Egypt to Cappadocia (Basil) and beyond.",
      ],
      primarySources: [
        "St. Athanasius, Life of Antony",
        "Apophthegmata Patrum (Sayings of the Desert Fathers) — alphabetic & systematic",
        "Palladius, Lausiac History",
        "John Cassian, Conferences",
      ],
      items: [
        {
          id: "saint-df-001",
          kind: "identify-source",
          difficulty: 3,
          tags: ["desert", "apophthegmata"],
          prompt:
            "Identify the saying: 'Abba Sisoes said, Seek God, and not where God dwells.'",
          choices: [
            { id: "a", text: "Apophthegmata Patrum, Sisoes 14", rationale: "Correct — from the alphabetic collection of the Gerontikon." },
            { id: "b", text: "Cassian, Conferences 9" },
            { id: "c", text: "Macarius, Spiritual Homilies 4" },
            { id: "d", text: "Evagrius, Praktikos 8" },
          ],
          correctChoiceId: "a",
          citations: [{ source: "Apophthegmata Patrum, Abba Sisoes 14" }],
        },
      ],
    },
    {
      id: "russian-saints",
      title: "Russian Saints",
      summary:
        "Vladimir, Olga, Sergius of Radonezh, Seraphim of Sarov, the Optina Elders, John of Kronstadt, Patriarch Tikhon, the Royal New Martyrs, John Maximovitch.",
      learningObjectives: [
        "Trace the Christianization of Rus' (988).",
        "Identify St. Seraphim's principal teaching on the acquisition of the Holy Spirit.",
      ],
      primarySources: [
        "Tale of Bygone Years (Povest' Vremennykh Let), 988 baptism",
        "Conversation of St. Seraphim with Nicholas Motovilov (1831)",
        "Lives of the Optina Elders",
      ],
      items: [
        {
          id: "saint-rus-001",
          kind: "qa",
          difficulty: 3,
          tags: ["seraphim", "holy-spirit"],
          prompt:
            "What did St. Seraphim of Sarov teach to Nicholas Motovilov is the true aim of the Christian life?",
          expectedAnswer:
            "'The acquisition of the Holy Spirit of God.' Prayer, fasting, vigil, almsgiving, and every Christian virtue are not ends in themselves; they are the means by which the Spirit is acquired. In the famous Conversation (1831) Seraphim was transfigured in light before Motovilov as proof.",
          citations: [
            {
              source: "Conversation of St. Seraphim with Motovilov on the Aim of the Christian Life (1831)",
              quote:
                "The true aim of our Christian life consists in the acquisition of the Holy Spirit of God. As for fasts, vigils, prayer, almsgiving, and every good deed done for Christ's sake, they are only means of acquiring the Holy Spirit of God.",
            },
          ],
        },
      ],
    },
    apostles,
    maryOfEgypt,
    newMartyrs,
    greekModern,
    antony,
    sergiusOfRadonezh,
    americanSaints,
    stephenFirstMartyr,
    georgeTheTrophy,
    nicholasOfMyra,
    symeonStylites,
    macariusEgypt,
    ninaGeorgia,
    seraphimRose,
    ignatiusBrianchaninov,
    johnMaximovitch,
    justinPopovic,
    johnTheTheologian,
    peterAndPaul,
    photiosTheGreat,
    xeniaPetersburg,
    matronaMoscow,
    optinaElders,
    innocentAlaska,
    isaacOfSyria,
    saintsFactsPack,
    saintsFinalPack,
  ],
};
