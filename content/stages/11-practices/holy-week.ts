import type { Topic } from "@/lib/types";

export const holyWeek: Topic = {
  id: "holy-week",
  title: "Holy Week",
  summary:
    "Lazarus Saturday, Palm Sunday, the four Bridegroom services, the Last Supper (Holy Thursday), the Twelve Gospels, the Royal Hours, the Lamentations, Holy Saturday, the Paschal Vigil and Liturgy.",
  learningObjectives: [
    "Order the services of Holy Week.",
    "Identify the Twelve Gospels of Holy Thursday Matins.",
    "State the central content of the Paschal Vigil.",
  ],
  primarySources: [
    "Triodion — Holy Week services",
    "Hieratikon — liturgies of Holy Saturday and Pascha",
  ],
  items: [
    {
      id: "prac-hw-001",
      kind: "qa",
      difficulty: 3,
      tags: ["holy-week", "twelve-gospels"],
      prompt:
        "What is the service of the 'Twelve Gospels' (Twelve Passion Readings) and when is it celebrated?",
      expectedAnswer:
        "It is the Matins of Holy Friday, served liturgically on the evening of Holy Thursday. Twelve Gospel passages narrating the Passion are read between the antiphons, with the priest emerging from the altar carrying the cross at the fifth Gospel ('Today He who hung the earth upon the waters is hung upon the tree'). The congregation stands the entire time, holding lit candles.",
      citations: [
        { source: "Triodion — Holy Thursday evening / Matins of Holy Friday" },
      ],
    },
    {
      id: "prac-hw-002",
      kind: "identify-source",
      difficulty: 4,
      tags: ["pascha", "paschal-homily"],
      prompt:
        "Identify the source: 'Let no one fear death, for the death of our Saviour has set us free. He has destroyed death by undergoing death... O Death, where is thy sting? O Hell, where is thy victory?'",
      choices: [
        { id: "a", text: "John of Damascus, Paschal Canon" },
        { id: "b", text: "John Chrysostom, Paschal Homily (Catechetical Homily)", rationale: "Correct — read aloud at the Paschal Vigil throughout the Orthodox world." },
        { id: "c", text: "Romanos the Melodist, Kontakion on Pascha" },
        { id: "d", text: "Gregory the Theologian, Oration 45" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source: "St. John Chrysostom, Paschal Homily (Catechetical Homily)",
          quote:
            "Let no one fear death, for the death of our Saviour has set us free. Christ is risen and the demons are fallen. Christ is risen, and the angels rejoice.",
        },
      ],
    },
  ],
};

export const vestments: Topic = {
  id: "vestments",
  title: "Liturgical Vestments",
  summary:
    "Sticharion, epitrachelion, zone, epimanikia, phelonion (priest); add: sakkos, omophorion, mitre, panagia (bishop). Each vestment has a symbolic-prayer assigned at vesting.",
  learningObjectives: [
    "Name the priest's vestments and their order of vesting.",
    "Identify what the omophorion symbolizes.",
  ],
  primarySources: [
    "Hieratikon — Order of Vesting",
    "Symeon of Thessalonica, On the Sacred Liturgy 80–84",
  ],
  items: [
    {
      id: "prac-vest-001",
      kind: "qa",
      difficulty: 3,
      tags: ["vestments"],
      prompt:
        "What does the bishop's omophorion symbolize?",
      expectedAnswer:
        "The omophorion (Greek: ὠμοφόριον, 'shoulder-borne') is the broad band of cloth worn around the bishop's neck and shoulders. It symbolizes the lost sheep carried home on the shoulders of the Good Shepherd (Lk 15:5) — and so the bishop's pastoral office. The bishop wears the great omophorion at major points of the liturgy and removes it after the Gospel as a sign that he yields to Christ Himself, who is then truly present in the Mysteries.",
      citations: [
        { source: "Luke 15:5; Isaiah 9:6" },
        { source: "Symeon of Thessalonica, On the Sacred Liturgy 82" },
      ],
    },
  ],
};

export const octoechos: Topic = {
  id: "octoechos",
  title: "The Octoechos (Eight-Tone System)",
  summary:
    "The eight modes of Byzantine liturgical chant, cycled weekly. Composed largely by St. John of Damascus. The Octoechos book governs the Sunday and weekday services from Pentecost to Lent.",
  learningObjectives: [
    "Name the eight tones.",
    "Identify the cyclical rotation.",
  ],
  primarySources: [
    "Octoechos (Paraklitiki)",
    "Traditional ascription to St. John of Damascus",
  ],
  items: [
    {
      id: "prac-oct-001",
      kind: "qa",
      difficulty: 3,
      tags: ["octoechos", "chant"],
      prompt:
        "How many tones (modes) are there in the Byzantine chant system, and on what cycle do they rotate?",
      expectedAnswer:
        "Eight tones, traditionally compiled by St. John of Damascus. They rotate weekly, beginning each week with Saturday Vespers and concluding the following Saturday evening. The cycle starts with Tone 1 on the Sunday of All Saints (first Sunday after Pentecost) and continues for eight weeks before repeating.",
      citations: [
        { source: "Octoechos / Paraklitiki" },
        { source: "Traditional Greek liturgical books" },
      ],
    },
  ],
};
