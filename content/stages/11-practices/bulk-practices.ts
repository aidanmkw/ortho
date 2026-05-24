import type { Topic } from "@/lib/types";

export const liturgyDetails: Topic = {
  id: "liturgy-details",
  title: "Liturgy of the Faithful — Details",
  summary: "The principal moments of the Anaphora: the Dialogue, the Preface, the Sanctus, the Words of Institution, the Anamnesis-Offering, the Epiclesis, the Intercessions, and the Doxology.",
  learningObjectives: ["Name the moments of the Anaphora.", "State the Orthodox emphasis on the Epiclesis."],
  primarySources: ["Hieratikon — Anaphora of St. John Chrysostom; St. Basil"],
  items: [
    {
      id: "prac-lit-001",
      kind: "qa",
      difficulty: 4,
      tags: ["epiclesis", "anaphora"],
      prompt: "What is the Epiclesis, and why does the Orthodox Church locate the consecration of the Eucharistic gifts there rather than at the Words of Institution alone?",
      expectedAnswer: "The Epiclesis (invocation) is the moment in the Anaphora when the priest calls upon the Father to send the Holy Spirit to change the gifts of bread and wine into the Body and Blood of Christ. In the Orthodox tradition, the entire Anaphora is consecratory, but the climactic moment is the Epiclesis. This is in contrast to the Latin tradition (settled in the medieval West) which locates the consecration at the Words of Institution ('This is my Body'). The Orthodox-Latin difference on this point was a contested issue at Florence (1438-9).",
      citations: [
        { source: "Anaphora of St. John Chrysostom — Epiclesis" },
        { source: "Mark of Ephesus, On the Words of Consecration (against the Latins)" },
      ],
    },
  ],
};

export const prayerRule: Topic = {
  id: "prayer-rule",
  title: "The Prayer Rule",
  summary: "The personal rule of prayer prescribed by one's spiritual father: typically morning and evening prayers (from the prayer book), the Jesus Prayer, occasional psalms and akathists, and at advanced stages prostrations and the prayer rope.",
  learningObjectives: ["Identify the components of a basic Orthodox prayer rule."],
  primarySources: ["Old Orthodox Prayer Book; Jordanville Prayer Book", "St. Theophan the Recluse, The Path to Salvation"],
  items: [
    {
      id: "prac-pr-001",
      kind: "qa",
      difficulty: 3,
      tags: ["prayer-rule"],
      prompt: "What are the typical elements of a beginner's Orthodox prayer rule?",
      expectedAnswer: "(1) Morning prayers from the prayer book — generally 5-15 minutes, including the Trisagion, Lord's Prayer, troparia, and intercessions. (2) Evening prayers — similar length, with examination of conscience. (3) Mealtime grace and thanksgiving. (4) The Jesus Prayer at moments of waiting or distraction. (5) Saturday Vespers and Sunday Liturgy. As one matures, the spiritual father may prescribe a specific number of Jesus Prayers with the prayer rope (chotki/komboskini), the Psalter (especially the 17th kathisma at night), the akathist to the Theotokos, and so on. Always under obedience, never self-imposed.",
      citations: [
        { source: "Jordanville Prayer Book — Morning and Evening Rule" },
        { source: "St. Theophan the Recluse, The Path to Salvation" },
      ],
    },
  ],
};

export const memorials: Topic = {
  id: "memorials-panikhida",
  title: "Memorials & the Saturdays of Souls",
  summary: "The Orthodox Church prays for the departed at every Divine Liturgy and on special days: the panikhida (memorial service), the Saturday of Souls (multiple in the year), the 3rd/9th/40th day and one-year anniversary memorials, the koliva.",
  learningObjectives: ["Identify the Saturdays of Souls.", "State the significance of koliva."],
  primarySources: ["Triodion — Saturdays of Souls services", "Symeon of Thessalonica, On the Funeral Rites"],
  items: [
    {
      id: "prac-mem-001",
      kind: "qa",
      difficulty: 3,
      tags: ["memorials", "saturday-of-souls"],
      prompt: "When are the principal Saturdays of Souls observed in the Orthodox liturgical year?",
      expectedAnswer: "(1) Meatfare Saturday (before Meatfare Sunday, ten days before Lent begins). (2) The second, third, and fourth Saturdays of Great Lent. (3) Saturday of Pentecost (Trinity Saturday — the day before Pentecost). (4) Saint Demetrius Saturday (the Saturday before October 26, in the Russian tradition). These are the days when the Church corporately prays for all the departed faithful.",
      citations: [
        { source: "Triodion — Meatfare Saturday and Lenten Soul-Saturdays" },
        { source: "Pentecostarion — Trinity Saturday" },
      ],
    },
    {
      id: "prac-mem-002",
      kind: "qa",
      difficulty: 3,
      tags: ["koliva"],
      prompt: "What is koliva, and at what services is it offered?",
      expectedAnswer: "Koliva is a dish of boiled wheat berries, sweetened with honey or sugar, often combined with nuts, raisins, pomegranate, sesame, and powdered sugar. It symbolizes the resurrection — citing John 12:24 ('Except a corn of wheat fall into the ground and die, it abideth alone: but if it die, it bringeth forth much fruit'). It is offered at memorial services (panikhida) for the departed, on the Saturdays of Souls, and at the feasts of saints (most notably St. Theodore the Recruit, First Saturday of Lent).",
      citations: [
        { source: "John 12:24" },
        { source: "Trebnik (Book of Needs) — Order for Memorials" },
      ],
    },
  ],
};

export const incense: Topic = {
  id: "incense",
  title: "Incense",
  summary: "The use of incense in the Orthodox liturgy: ascending prayer (Ps 140:2 / Rev 5:8), the divine presence (Ex 30:7-8), the offering of self.",
  learningObjectives: ["Cite Psalm 140:2.", "Note Revelation 5:8."],
  primarySources: ["Psalm 140:2 (LXX 141:2 MT); Revelation 5:8", "Exodus 30:7-8"],
  items: [
    {
      id: "prac-inc-001",
      kind: "identify-source",
      difficulty: 3,
      tags: ["incense"],
      prompt: "Identify the verse chanted by the priest as he censes at Vespers: 'Let my prayer arise in Thy sight as incense, and let the lifting up of my hands be an evening sacrifice.'",
      choices: [
        { id: "a", text: "Psalm 50 (LXX)" },
        { id: "b", text: "Psalm 140:2 (LXX 141:2 MT)", rationale: "Correct. The 'Let my prayer arise' is sung at Vespers and at the Liturgy of the Presanctified." },
        { id: "c", text: "Psalm 102:1" },
        { id: "d", text: "Psalm 33:1" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "Psalm 140:2 LXX (141:2 in MT numbering)" }],
    },
  ],
};

export const tonsure: Topic = {
  id: "tonsure",
  title: "Tonsure",
  summary: "The cutting of hair as a sign of dedication: at baptism (a small clipping in the form of a cross), at reader's tonsure, at monastic tonsure (rasophore, stavrophore, great schema).",
  learningObjectives: ["Identify the three monastic grades."],
  primarySources: ["Trebnik (Book of Needs) — Orders of Tonsure"],
  items: [
    {
      id: "prac-ton-001",
      kind: "qa",
      difficulty: 3,
      tags: ["monasticism", "tonsure"],
      prompt: "What are the three monastic grades in the Eastern monastic tradition?",
      expectedAnswer: "(1) Rasophore (one who wears the rason / habit) — the first stage, novice fully clothed in monastic dress but without lifelong vows. (2) Stavrophore (cross-bearer) — the 'little schema,' lifelong vows of poverty, chastity, and obedience. (3) Megaloschemos (great schema) — the highest monastic grade, with stricter rule. Not all monks proceed to the great schema; many remain stavrophore for life. Each tonsure receives a new name in religion.",
      citations: [{ source: "Trebnik — Order of the Great Angelic Schema" }],
    },
  ],
};
