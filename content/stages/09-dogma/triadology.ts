import type { Topic } from "@/lib/types";

export const triadology: Topic = {
  id: "triadology-deep",
  title: "Triadology — Ousia, Hypostasis, Energeia",
  summary:
    "Cappadocian vocabulary: one essence (ousia), three hypostases (Father, Son, Holy Spirit), distinguished by their personal properties; manifested ad extra through the divine energies (energeiai).",
  learningObjectives: [
    "Define ousia, hypostasis, prosopon, physis.",
    "State the Cappadocian distinction: what is common, what is proper.",
  ],
  primarySources: [
    "Basil, Letter 38 (To Gregory his Brother)",
    "Gregory the Theologian, Oration 31 (Theological Oration V)",
    "John of Damascus, Exact Exposition Bk I",
  ],
  items: [
    {
      id: "dog-tri-001",
      kind: "qa",
      difficulty: 4,
      tags: ["cappadocians", "vocabulary"],
      prompt:
        "State the Cappadocian distinction: 'What is common (koinon) in the Trinity, and what is proper (idion) to each Hypostasis?'",
      expectedAnswer:
        "What is common is the divine essence (ousia) — being, will, power, action, glory. What is proper distinguishes the three Hypostases: the Father is unbegotten (agennētos); the Son is begotten of the Father (gennētos); the Holy Spirit proceeds from the Father (ekporeutos). These personal properties cannot be exchanged. The Three share one essence but are distinguished by their hypostatic, relational properties — and only by these.",
      citations: [
        { source: "St. Basil the Great, Letter 38 (To Gregory)" },
        { source: "St. Gregory the Theologian, Oration 31.9" },
      ],
    },
    {
      id: "dog-tri-002",
      kind: "identify-source",
      difficulty: 4,
      tags: ["trinity", "monarchy"],
      prompt:
        "Identify the source: 'When I say God, I mean Father, Son, and Holy Spirit. For the Godhead is neither diffused beyond these nor confined within them.'",
      choices: [
        { id: "a", text: "Basil, On the Holy Spirit" },
        { id: "b", text: "Gregory the Theologian, Oration 38.8", rationale: "Correct. The 'Oration on the Theophany' (Christmas, AD 380)." },
        { id: "c", text: "Athanasius, Letters to Serapion" },
        { id: "d", text: "Cyril of Alexandria, Thesaurus" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source: "St. Gregory the Theologian, Oration 38.8 (On the Theophany)",
          quote:
            "When I speak of God, you must be illumined at once by one flash of light and by three. Three in Properties, or Hypostases, or, if any prefer so to call them, Persons... but One in respect of the Essence.",
        },
      ],
    },
  ],
};

export const angelology: Topic = {
  id: "angelology",
  title: "Angelology",
  summary:
    "The nine ranks of the heavenly hierarchy (Dionysian schema), the principal archangels (Michael, Gabriel, Raphael, Uriel, Selaphiel, Jegudiel, Barachiel, Jeremiel), and the Orthodox doctrine of guardian angels.",
  learningObjectives: [
    "Name the nine ranks per Dionysius.",
    "Cite Heb 1:14 on the ministry of angels.",
  ],
  primarySources: [
    "St. Dionysius the Areopagite, On the Celestial Hierarchy",
    "St. John of Damascus, Exact Exposition II.3",
    "Hebrews 1:14; Matthew 18:10",
  ],
  items: [
    {
      id: "dog-ang-001",
      kind: "qa",
      difficulty: 3,
      tags: ["angelology", "dionysius"],
      prompt:
        "Name the nine ranks of the heavenly hierarchy per St. Dionysius the Areopagite.",
      expectedAnswer:
        "First triad (highest, closest to God): Seraphim, Cherubim, Thrones. Second triad: Dominions, Virtues, Powers. Third triad (closest to creation): Principalities, Archangels, Angels.",
      citations: [
        { source: "St. Dionysius the Areopagite, On the Celestial Hierarchy, esp. chs. 6–9" },
      ],
    },
  ],
};
