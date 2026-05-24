import type { Topic } from "@/lib/types";

export const ascension: Topic = {
  id: "ascension",
  title: "The Ascension",
  summary: "Forty days after Pascha, Christ ascended bodily into heaven (Acts 1:9-11). He sits at the right hand of the Father, His humanity glorified, and will return in like manner.",
  learningObjectives: ["Cite Acts 1:9-11.", "State the dogmatic significance."],
  primarySources: ["Luke 24:50-53; Acts 1:6-11; Mark 16:19"],
  items: [
    {
      id: "dog-asc-001",
      kind: "qa",
      difficulty: 2,
      tags: ["ascension"],
      prompt: "What is the dogmatic significance of the Ascension?",
      expectedAnswer: "Christ's humanity — glorified, body and soul — is taken up into the heavenly realm and seated at the right hand of the Father. This means: (1) human nature, in Christ, is brought into the divine glory — a foretaste of our own promised glorification; (2) His ministry continues as our eternal Intercessor (Heb 7:25); (3) the Holy Spirit is sent (Acts 2) in His absence; (4) He will return in like manner (Acts 1:11). The Ascension is the conclusion of the Incarnation's earthly arc and the inauguration of the apostolic mission.",
      citations: [{ source: "Acts 1:6-11; Hebrews 7:25; 4:14-16" }],
    },
  ],
};

export const transfiguration: Topic = {
  id: "transfiguration",
  title: "The Transfiguration",
  summary: "Christ revealed His divine glory to Peter, James, and John on Mount Tabor (Mt 17:1-9; Mk 9:2-10; Lk 9:28-36). Central in Orthodox theology as proof of the divinity made visible and of the uncreated Light.",
  learningObjectives: ["Cite Mt 17:1-9.", "Note the Palamite reading."],
  primarySources: ["Matthew 17:1-9; Mark 9:2-10; Luke 9:28-36; 2 Peter 1:16-18"],
  items: [
    {
      id: "dog-tr-001",
      kind: "qa",
      difficulty: 3,
      tags: ["transfiguration", "uncreated-light"],
      prompt: "How does St. Gregory Palamas read the Transfiguration?",
      expectedAnswer: "The Light that shone from Christ on Mount Tabor (Mt 17:2) was not a created phenomenon but the UNCREATED Light of His own Divinity — manifested through His humanity. The Apostles, who beheld it, saw the divine ENERGY (not the unknowable essence) of God Himself. The saints, in their measure, are progressively transfigured by this same uncreated Light. The Transfiguration is therefore not merely a past event but the pattern of theosis — what we are called to. The Feast: August 6.",
      citations: [
        { source: "Matthew 17:1-9; 2 Peter 1:16-18" },
        { source: "St. Gregory Palamas, Homily 34 (On the Transfiguration)" },
      ],
    },
  ],
};

export const prayerForDead: Topic = {
  id: "prayer-for-dead",
  title: "Prayer for the Departed",
  summary: "The Orthodox practice — documented from Tertullian (~211) and the catacombs forward — of praying for those who have fallen asleep in Christ. The Eucharist itself contains intercession for the departed.",
  learningObjectives: ["Cite Tertullian De Corona 3 and 2 Macc 12.", "Distinguish from purgatorial application."],
  primarySources: ["2 Maccabees 12:39-46; Tertullian, De Corona 3"],
  items: [
    {
      id: "dog-pfd-001",
      kind: "qa",
      difficulty: 3,
      tags: ["prayer-for-dead"],
      prompt: "On what basis does the Orthodox Church pray for the departed?",
      expectedAnswer: "(1) The communion of saints — the departed are alive in Christ (Lk 20:38) and members of His Body. We pray for them as for all members. (2) Patristic and apostolic example: Tertullian, De Corona 3 (~AD 211) — 'we offer oblations for the dead on the anniversary of their birth into eternal life'; 2 Maccabees 12:39-46 — Judas Maccabeus offers sacrifice for fallen soldiers. (3) The Divine Liturgy itself contains explicit intercession for the departed in the prothesis and the anaphora. (4) The Saturdays of Souls and the panikhida are the corporate expression. NOT a purgatorial application; the practice is intercession on behalf of those alive in Christ.",
      citations: [
        { source: "2 Maccabees 12:39-46; Luke 20:38" },
        { source: "Tertullian, De Corona 3 (~AD 211)" },
      ],
    },
  ],
};

export const repentance: Topic = {
  id: "repentance",
  title: "Repentance (Metanoia)",
  summary: "The central practice of the Christian life. Metanoia — a 'change of mind' that reorients the whole person toward God. Not a single act but a continuous turning.",
  learningObjectives: ["Define metanoia.", "Cite Mt 4:17."],
  primarySources: ["Matthew 4:17", "John Climacus, Ladder of Divine Ascent, Step 5"],
  items: [
    {
      id: "dog-rep-001",
      kind: "qa",
      difficulty: 2,
      tags: ["repentance", "metanoia"],
      prompt: "What is metanoia, and how does it differ from mere regret?",
      expectedAnswer: "Metanoia (μετάνοια) literally means 'change of mind' — a fundamental reorientation of the nous, the heart, the will, the whole person — turning away from sin and toward God. It is more than regret over past actions; it is the active acquiring of a new mind, the mind of Christ. The Lord's first preached word (Mt 4:17): 'Metanoeite — repent — for the kingdom of heaven is at hand.' Repentance is the lifelong work of the Christian, not a one-time act. Confession is its sacramental form; the Jesus Prayer ('have mercy on me, a sinner') is its continuous form.",
      citations: [
        { source: "Matthew 4:17; Acts 2:38" },
        { source: "St. John Climacus, Ladder of Divine Ascent, Step 5" },
      ],
    },
  ],
};

export const humility: Topic = {
  id: "humility",
  title: "Humility",
  summary: "In Orthodox spirituality, humility (tapeinophrosynē) is the mother of all virtues. The Lord Himself: 'learn of me; for I am meek and lowly in heart' (Mt 11:29).",
  learningObjectives: ["Cite Mt 11:29 and Phil 2:5-8."],
  primarySources: ["Philippians 2:5-8", "John Climacus, Ladder Step 25"],
  items: [
    {
      id: "dog-hu-001",
      kind: "qa",
      difficulty: 3,
      tags: ["humility"],
      prompt: "How does Climacus describe humility in the Ladder of Divine Ascent?",
      expectedAnswer: "St. John Climacus (Ladder Step 25) calls humility 'a nameless grace in the soul, its name known only to those who have learned it by experience.' It is the soul's recognition of its absolute nothingness apart from God; the spontaneous taking of the last place; the inability to be offended. Climacus distinguishes it from false humility (which is a subtle pride). True humility is the ground of every other virtue and the only soil in which divine grace can take root.",
      citations: [{ source: "St. John Climacus, Ladder of Divine Ascent, Step 25" }],
    },
  ],
};
