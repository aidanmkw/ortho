import type { Stage } from "@/lib/types";

export const stage11: Stage = {
  id: "11-practices",
  order: 11,
  title: "Church Practices",
  subtitle: "Liturgy, fasting, prayer, iconography, calendar",
  description:
    "The lived life of the Church — Divine Liturgy, the daily cycle, the four fasts, confession, the Jesus Prayer, holy week, icons, vestments. The doing without which the dogma cannot be known.",
  rank: "Confessor",
  topics: [
    {
      id: "divine-liturgy",
      title: "The Divine Liturgy",
      summary:
        "The Liturgies of Sts. John Chrysostom, Basil the Great, and the Presanctified Gifts (St. Gregory the Dialogist). Structure: Liturgy of the Catechumens (Word), Liturgy of the Faithful (Eucharist).",
      learningObjectives: [
        "Identify which Liturgy is served on which days.",
        "State the two principal parts.",
        "Name the central anaphoral act (epiclesis).",
      ],
      primarySources: [
        "Hieratikon (priest's service book)",
        "Nicholas Cabasilas, Commentary on the Divine Liturgy",
      ],
      items: [
        {
          id: "prac-dl-001",
          kind: "qa",
          difficulty: 2,
          tags: ["liturgy"],
          prompt:
            "When is the Liturgy of St. Basil the Great served instead of the Liturgy of St. John Chrysostom?",
          expectedAnswer:
            "Ten times a year: the five Sundays of Great Lent, Holy Thursday, Holy Saturday, the Eves of Nativity and Theophany (or on the feast itself if it falls on a Sunday or Monday), and the feast of St. Basil (January 1).",
          citations: [{ source: "Typikon and Hieratikon — established rubrics" }],
        },
      ],
    },
    {
      id: "jesus-prayer",
      title: "The Jesus Prayer & Hesychasm",
      summary:
        "The continual prayer 'Lord Jesus Christ, Son of God, have mercy on me, a sinner.' Hesychasm — stillness, attentiveness, the descent of the mind into the heart.",
      learningObjectives: [
        "Quote the full Jesus Prayer.",
        "Trace its scriptural roots (Lk 18:38).",
        "Identify the Philokalia and its compilers.",
      ],
      primarySources: [
        "Philokalia (compiled by Sts. Macarius of Corinth and Nicodemus the Hagiorite, 1782)",
        "The Way of a Pilgrim (19th c. Russian)",
        "St. Gregory of Sinai, On Stillness",
      ],
      items: [
        {
          id: "prac-jp-001",
          kind: "qa",
          difficulty: 2,
          tags: ["jesus-prayer"],
          prompt:
            "What are the principal scriptural roots of the Jesus Prayer?",
          expectedAnswer:
            "The cry of the blind man near Jericho (Lk 18:38, repeated 18:39): 'Jesus, Son of David, have mercy on me!'; the publican's prayer (Lk 18:13): 'God, be merciful to me a sinner'; St. Paul's command to 'pray without ceasing' (1 Th 5:17); and the confession 'no man can say Jesus is Lord but by the Holy Spirit' (1 Cor 12:3).",
          citations: [
            { source: "Luke 18:13, 38; 1 Thess 5:17; 1 Cor 12:3" },
          ],
        },
      ],
    },
    {
      id: "fasting",
      title: "Fasting",
      summary:
        "Weekly (Wed/Fri), the four seasonal fasts (Great Lent, Apostles', Dormition, Nativity), and the discipline of approaching the Mysteries.",
      learningObjectives: [
        "Name the four seasonal fasts.",
        "Trace Wed/Fri fasting to the Didache.",
      ],
      primarySources: [
        "Didache 8:1",
        "Typikon of St. Sabbas",
        "St. Basil, Sermons on Fasting 1–2",
      ],
      items: [
        {
          id: "prac-fast-001",
          kind: "qa",
          difficulty: 2,
          tags: ["fasting"],
          prompt:
            "What are the four major fasting seasons of the Orthodox year?",
          expectedAnswer:
            "(1) Great Lent (the seven weeks before Pascha — 40 days plus Holy Week); (2) the Apostles' Fast (from the Monday after All Saints' Sunday until June 29, variable length); (3) the Dormition Fast (August 1–14); (4) the Nativity Fast (November 15–December 24).",
          citations: [{ source: "Typikon; the Triodion, Pentecostarion, and Menaion" }],
        },
      ],
    },
  ],
};
