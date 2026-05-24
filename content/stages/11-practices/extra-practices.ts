import type { Topic } from "@/lib/types";

export const greatCanon: Topic = {
  id: "great-canon",
  title: "The Great Canon of St. Andrew of Crete",
  summary: "A long penitential canon (~250 troparia) composed by St. Andrew of Crete (~660-740). Sung in four parts during the first week of Great Lent (Compline) and once more in full on the Thursday of the Fifth Week ('Stand of St. Mary of Egypt').",
  learningObjectives: ["Identify the author and feast.", "Note the lament-form of the troparia."],
  primarySources: ["Triodion — Great Canon of St. Andrew of Crete"],
  items: [
    {
      id: "prac-gc-001",
      kind: "qa",
      difficulty: 3,
      tags: ["great-canon"],
      prompt: "Who composed the Great Canon, and when is it chanted in the Lenten cycle?",
      expectedAnswer: "St. Andrew of Crete (~660-740). It is chanted in four parts during the first week of Great Lent (Monday-Thursday of Clean Week), at Great Compline. Then in its entirety on the Thursday of the Fifth Week of Lent ('The Stand of St. Mary of Egypt' / Mariegoy). Its refrain: 'Have mercy on me, O God, have mercy on me.' The canon walks through the Old and New Testaments applying every story to the soul's repentance.",
      citations: [{ source: "Triodion — Great Canon of St. Andrew of Crete" }],
    },
  ],
};

export const akathist: Topic = {
  id: "akathist",
  title: "The Akathist to the Theotokos",
  summary: "A celebrated 6th-century hymn (attributed traditionally to St. Romanos the Melodist or to Patriarch Sergius of Constantinople). 'Akathistos' means 'not seated' — sung standing. Twenty-four stanzas in alphabetical acrostic. Chanted in parts on the Fridays of Great Lent; in full on the Saturday of the Fifth Week.",
  learningObjectives: ["State the meaning of 'akathist.'", "Date the original akathist."],
  primarySources: ["Akathist to the Most Holy Theotokos (6th c.)"],
  items: [
    {
      id: "prac-ak-001",
      kind: "qa",
      difficulty: 3,
      tags: ["akathist"],
      prompt: "What does 'akathist' mean, and to what is the original Akathist Hymn addressed?",
      expectedAnswer: "Akathistos means 'not sitting' — sung while the people stand throughout. The original Akathist Hymn (6th century, traditionally attributed to Romanos the Melodist) is addressed to the Most Holy Theotokos. It has 24 stanzas in alphabetical acrostic (alpha to omega), alternating long stanzas (with the 'rejoice' refrain) and short ones with 'Alleluia.' It is chanted on the Saturday of the Fifth Week of Lent ('Akathist Saturday'), and in part at the Friday Compline of the first four weeks. Many later akathists to other saints and feasts have been composed on this model.",
      citations: [{ source: "Akathist Hymn (6th c.); Triodion, Akathist Saturday" }],
    },
  ],
};

export const proskomedia: Topic = {
  id: "proskomedia",
  title: "Proskomedia (Prothesis)",
  summary: "The preparatory rite of the Divine Liturgy in which the priest cuts the lamb (a square from the prosphora), pours wine and water into the chalice, and commemorates the saints and faithful living and departed by placing particles around the lamb on the diskos.",
  learningObjectives: ["Identify the order of preparation.", "State the symbolic significance."],
  primarySources: ["Hieratikon — Order of the Proskomedia"],
  items: [
    {
      id: "prac-pros-001",
      kind: "qa",
      difficulty: 4,
      tags: ["proskomedia"],
      prompt: "What is the Proskomedia, and what does the arrangement on the diskos signify?",
      expectedAnswer: "The Proskomedia (also Prothesis) is the rite of preparation done by the priest at a side table (the prothesis-altar) before the Liturgy proper begins. He cuts a square ('the Lamb') from the prosphora; pierces it with the spear; pours wine and water into the chalice. He then commemorates the Theotokos (placing a triangular particle to the right of the Lamb), the nine ranks of saints (in a row to the left), and the living and the departed (in two rows below). The diskos thus becomes an icon of the whole Church gathered around the Lamb — heaven and earth, the living and the dead.",
      citations: [{ source: "Hieratikon — Order of the Proskomedia" }],
    },
  ],
};

export const antidoron: Topic = {
  id: "antidoron",
  title: "Antidoron",
  summary: "The blessed bread distributed at the end of the Divine Liturgy. Greek 'anti-doron' — 'in place of the gift' (i.e., in place of the Body of Christ, for those who did not commune). All present — Orthodox and inquirers — may receive antidoron.",
  learningObjectives: ["State the meaning of antidoron."],
  primarySources: ["Symeon of Thessalonica, On the Sacred Liturgy"],
  items: [
    {
      id: "prac-ant-001",
      kind: "qa",
      difficulty: 2,
      tags: ["antidoron"],
      prompt: "What is antidoron, and who may receive it?",
      expectedAnswer: "Blessed bread distributed at the end of the Divine Liturgy. The remaining portion of the prosphora (after the Lamb has been cut out for the Eucharist itself) is blessed and given to the faithful. The name 'antidoron' means 'instead of the gift' — symbolically a substitute for those who did not commune. All present — Orthodox who did and did not commune, and even inquirers and visitors of good will — may receive antidoron.",
      citations: [{ source: "Symeon of Thessalonica, On the Sacred Liturgy" }],
    },
  ],
};

export const blessingHouse: Topic = {
  id: "house-blessing",
  title: "The House Blessing (Theophany Water)",
  summary: "After Theophany (January 6 — the Baptism of the Lord), the priest visits the homes of the faithful and blesses each with the Theophany water sanctified on the feast.",
  learningObjectives: ["State the date and significance."],
  primarySources: ["Trebnik — Order of the Great Blessing of Waters"],
  items: [
    {
      id: "prac-hb-001",
      kind: "qa",
      difficulty: 2,
      tags: ["theophany", "house-blessing"],
      prompt: "What is the significance of Theophany water and the annual house blessing?",
      expectedAnswer: "On Theophany (January 6) the Church blesses water in the Great Blessing of Waters, recalling the Lord's own baptism in the Jordan, which (per the Fathers) sanctified all waters. The faithful drink the water, take it home, and the priest visits each home in the weeks following to bless the house, the people, and all things in it, sprinkling them with Theophany water. The Theophany water is venerated by tradition as not corrupting through the year. The annual visit is also a pastoral opportunity for the priest to know his flock at home.",
      citations: [
        { source: "Trebnik — Great Blessing of Waters" },
        { source: "Trebnik — Order of the Blessing of a Home on Theophany" },
      ],
    },
  ],
};

export const fastingDetail: Topic = {
  id: "fasting-detail",
  title: "Fasting — What and How",
  summary: "Traditional Orthodox fasting abstains from meat, fish, dairy, eggs, and (on stricter days) wine and oil. Distinct from purely-symbolic fasts. The bodily discipline is the outward of an inner ascesis of prayer and almsgiving.",
  learningObjectives: ["List the four categories of foods abstained from.", "Note Wed/Fri throughout the year."],
  primarySources: ["Typikon — Order of Fasting"],
  items: [
    {
      id: "prac-fd-001",
      kind: "qa",
      difficulty: 3,
      tags: ["fasting", "rules"],
      prompt: "What does traditional Orthodox fasting abstain from?",
      expectedAnswer: "On strict fasting days: meat (red meat, fowl), fish (with backbone — shellfish often permitted), dairy (milk, butter, cheese), eggs, wine (and other alcohol), and oil (cooking oil — olive oil especially in Mediterranean traditions). On Wednesdays and Fridays throughout the year, plus the four major fasts (Great Lent, Apostles', Dormition, Nativity). Fish, wine, and oil are permitted on some days within the fasts (especially on feast days falling within a fast). The discipline always serves the soul, not the body: 'true fasting is the alienation from evil' (Basil, Sermon on Fasting).",
      citations: [
        { source: "Typikon — Order of Fasting; Pedalion (Rudder)" },
        { source: "Basil the Great, Sermon on Fasting 1" },
      ],
    },
  ],
};
