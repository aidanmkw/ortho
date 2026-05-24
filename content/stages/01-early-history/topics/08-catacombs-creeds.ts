import type { Topic } from "@/lib/types";

export const catacombsCreeds: Topic = {
  id: "catacombs-and-early-creeds",
  title: "Catacombs, Early Creeds & The Rule of Faith",
  summary:
    "The catacomb iconography of the early Roman Church; the 'Old Roman Symbol' and the Apostles' Creed; Irenaeus's 'Rule of Faith' and the corresponding regulae of Tertullian and Origen.",
  learningObjectives: [
    "Date the earliest catacomb frescoes (~2nd century).",
    "Quote Irenaeus's Rule of Faith.",
    "Trace the Apostles' Creed from the Old Roman Symbol.",
  ],
  primarySources: [
    "Catacomb of Priscilla (frescoes ~2nd c.)",
    "St. Irenaeus, Against Heresies I.10.1 (the Rule of Faith)",
    "Tertullian, De Praescriptione Haereticorum 13",
    "Origen, On First Principles, Preface",
  ],
  items: [
    {
      id: "cc-001",
      kind: "identify-source",
      difficulty: 3,
      tags: ["irenaeus", "rule-of-faith"],
      prompt:
        "Identify the source of this regula fidei: 'The Church, though dispersed throughout the whole world, even to the ends of the earth, has received from the Apostles and their disciples this faith: [in] one God, the Father Almighty, Maker of heaven, and earth, and the sea, and all things that are in them; and in one Christ Jesus, the Son of God, who became incarnate for our salvation; and in the Holy Spirit, who proclaimed through the prophets...'",
      choices: [
        { id: "a", text: "Origen, On First Principles" },
        { id: "b", text: "Tertullian, De Praescriptione" },
        { id: "c", text: "Irenaeus, Against Heresies I.10.1", rationale: "Correct — the earliest fully developed 'Rule of Faith.'" },
        { id: "d", text: "Old Roman Symbol" },
      ],
      correctChoiceId: "c",
      citations: [
        {
          source: "St. Irenaeus, Against Heresies I.10.1 (~AD 180)",
          quote:
            "The Church, though dispersed throughout the whole world, even to the ends of the earth, has received from the Apostles and their disciples this faith...",
        },
      ],
    },
    {
      id: "cc-002",
      kind: "mcq",
      difficulty: 3,
      tags: ["catacombs"],
      prompt:
        "Which Roman catacomb contains the famous 2nd-century 'Velatio' fresco — among the earliest known Christian images of the Theotokos and Child?",
      choices: [
        { id: "a", text: "Catacomb of Priscilla", rationale: "Correct. Via Salaria, Rome." },
        { id: "b", text: "Catacomb of Domitilla" },
        { id: "c", text: "Catacomb of Callixtus" },
        { id: "d", text: "Catacomb of San Sebastiano" },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "Catacomb of Priscilla (Via Salaria, Rome) — Velatio fresco, mid-2nd century" },
      ],
    },
    {
      id: "cc-003",
      kind: "qa",
      difficulty: 3,
      tags: ["apostles-creed"],
      prompt:
        "What is the relationship between the 'Old Roman Symbol' and the Apostles' Creed?",
      expectedAnswer:
        "The Old Roman Symbol (Romanum) is a baptismal creed in use at Rome by the late 2nd century, attested in fragments by Rufinus, Marcellus of Ancyra, and others. Over centuries it evolved into the form now called the Apostles' Creed, fixed in approximately its present wording by the 8th century in Gaul. The Apostles' Creed is widely used in the West for catechesis; the Orthodox East uses the Niceno-Constantinopolitan Symbol of 381 in the Liturgy.",
      citations: [
        { source: "Rufinus, Commentary on the Apostles' Creed (~AD 400)" },
        { source: "Marcellus of Ancyra, baptismal Symbol (~AD 340)" },
      ],
    },
  ],
};
