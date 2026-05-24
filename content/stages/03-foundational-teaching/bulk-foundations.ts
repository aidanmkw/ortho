import type { Topic } from "@/lib/types";

export const pneumatology: Topic = {
  id: "pneumatology-foundation",
  title: "Pneumatology — The Holy Spirit",
  summary: "The full divinity and hypostatic distinction of the Holy Spirit, against the Pneumatomachi.",
  learningObjectives: ["Cite Basil's On the Holy Spirit.", "Quote the 8th article of the Creed."],
  primarySources: ["Basil, On the Holy Spirit", "Symbol, 8th article", "John 14–16"],
  items: [
    {
      id: "ft-pn-001",
      kind: "qa",
      difficulty: 3,
      tags: ["holy-spirit", "macedonians"],
      prompt: "Who were the Pneumatomachi ('Spirit-fighters'), and at what council were they condemned?",
      expectedAnswer: "A 4th-century party (also called Macedonians, after Macedonius I of Constantinople) who, while accepting the Son's divinity at Nicaea, denied that the Holy Spirit is fully God. Condemned at Constantinople I (381), where the Symbol was completed with the 8th article confessing the Spirit as 'the Lord, the Giver of Life... who with the Father and the Son together is worshipped and glorified.'",
      citations: [
        { source: "Symbol of Constantinople (381), 8th article" },
        { source: "Basil the Great, On the Holy Spirit (~AD 375)" },
      ],
    },
    {
      id: "ft-pn-002",
      kind: "identify-source",
      difficulty: 4,
      tags: ["basil", "doxology"],
      prompt: "Identify the source of this argument: 'I have been taught to baptize in the name of the Father, and of the Son, and of the Holy Spirit; how could I deny baptizing the same way I confess?'",
      choices: [
        { id: "a", text: "Athanasius, Letters to Serapion" },
        { id: "b", text: "Basil the Great, On the Holy Spirit", rationale: "Correct. Basil defends the doxology 'with the Spirit.'" },
        { id: "c", text: "Gregory the Theologian, Oration 31" },
        { id: "d", text: "Cyril of Jerusalem, Mystagogical Catechesis I" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "St. Basil the Great, On the Holy Spirit 9-12, 27" }],
    },
  ],
};

export const energiesEssence: Topic = {
  id: "energies-essence-deep",
  title: "Essence and Energies",
  summary: "The distinction that lets us speak of true union with God while preserving His transcendence.",
  learningObjectives: ["Quote Basil's Letter 234.", "Cite the Synodal Tome of 1351."],
  primarySources: ["Basil, Letters 234, 235", "Gregory Palamas, 150 Chapters", "Synodal Tome of 1351"],
  items: [
    {
      id: "ft-ee-001",
      kind: "identify-source",
      difficulty: 4,
      tags: ["basil", "energies"],
      prompt: "Identify: 'We know our God from His energies; we do not promise to approach the essence itself. For His energies descend to us, but His essence remains inaccessible.'",
      choices: [
        { id: "a", text: "Basil the Great, Letter 234.1", rationale: "Correct. Pre-Palamite essence/energies distinction." },
        { id: "b", text: "Gregory Palamas, Triads III" },
        { id: "c", text: "Maximus the Confessor, Ambigua 7" },
        { id: "d", text: "John of Damascus, Exact Exposition I.4" },
      ],
      correctChoiceId: "a",
      citations: [{ source: "St. Basil the Great, Letter 234.1 (to Amphilochius)" }],
    },
  ],
};

export const fall: Topic = {
  id: "the-fall",
  title: "The Fall (Genesis 3)",
  summary: "The Orthodox reading of Adam's transgression and its consequences for human nature.",
  learningObjectives: ["State the Orthodox doctrine of the consequences of the Fall.", "Distinguish from the Augustinian-Calvinist reading."],
  primarySources: ["Genesis 3", "Romans 5:12–21", "Irenaeus, AH III.18; V.21", "Athanasius, On the Incarnation 3–10"],
  items: [
    {
      id: "ft-fall-001",
      kind: "qa",
      difficulty: 3,
      tags: ["fall", "consequences"],
      prompt: "What are the principal consequences of the Fall on human nature according to the Orthodox patristic tradition?",
      expectedAnswer: "(1) Mortality and bodily corruption — 'in the day thou eatest thereof thou shalt surely die.' (2) Subjection to the passions and to the demons. (3) Loss of intimate communion with God; expulsion from Paradise. (4) Loss of clear vision of the image of God in oneself, though the image is not erased. (5) The natural will (thelēma physikon) remains, but the gnomic will (thelēma gnomikon — deliberative choice) becomes unstable. NOT inherited personal guilt for Adam's sin.",
      citations: [
        { source: "Genesis 3:14–24" },
        { source: "St. Athanasius, On the Incarnation 3–4" },
        { source: "St. Maximus the Confessor, Quaestiones ad Thalassium 21" },
      ],
    },
  ],
};

export const baptismFoundation: Topic = {
  id: "baptism-foundation",
  title: "Baptism — Foundations",
  summary: "Baptism as the new birth (Jn 3:5), incorporation into Christ's death and resurrection (Rom 6), seal of the Spirit, and entry into the Church.",
  learningObjectives: ["Cite the principal baptismal texts.", "Describe Orthodox triple immersion."],
  primarySources: ["John 3:5; Romans 6:3-4; Galatians 3:27; Titus 3:5; 1 Peter 3:21"],
  items: [
    {
      id: "ft-bap-001",
      kind: "qa",
      difficulty: 2,
      tags: ["baptism", "form"],
      prompt: "What is the Orthodox baptismal form, and what does each immersion signify?",
      expectedAnswer: "Triple immersion in the name of the Father, and of the Son, and of the Holy Spirit (Mt 28:19). Each immersion-and-emergence symbolizes Christ's three days in the tomb and His resurrection (Rom 6:3-4). The Trinitarian invocation is mandatory; the immersion is also normative (with pouring acceptable in emergencies, per Didache 7).",
      citations: [
        { source: "Matthew 28:19; Romans 6:3-4" },
        { source: "Didache 7:1-3" },
      ],
    },
    {
      id: "ft-bap-002",
      kind: "qa",
      difficulty: 3,
      tags: ["chrismation"],
      prompt: "What is Chrismation, and when is it administered in the Orthodox Church?",
      expectedAnswer: "Chrismation is the sacramental anointing with Holy Chrism (myron) consecrated by a synod of bishops. It is the 'seal of the gift of the Holy Spirit' (cf. Acts 8:14-17; 19:1-7; 2 Cor 1:21-22) administered immediately after baptism — including for infants. It is the Orthodox equivalent of the Roman Confirmation, but is NOT delayed until later years. The Orthodox child receives baptism, chrismation, and Eucharist as a unified initiation.",
      citations: [
        { source: "Acts 8:14-17; 2 Corinthians 1:21-22; 1 John 2:20, 27" },
        { source: "St. Cyril of Jerusalem, Mystagogical Catechesis III" },
      ],
    },
  ],
};

export const dyothelitism: Topic = {
  id: "dyothelitism-deep",
  title: "Dyothelitism — Two Wills",
  summary: "Christ has a divine and a human will; the human will is real, complete, and freely conformed to the divine.",
  learningObjectives: ["State the Sixth Council's definition.", "Cite Gethsemane (Lk 22:42)."],
  primarySources: ["Acts of Constantinople III (681)", "Maximus the Confessor, Disputation with Pyrrhus"],
  items: [
    {
      id: "ft-dy-001",
      kind: "identify-source",
      difficulty: 4,
      tags: ["maximus", "gethsemane"],
      prompt: "Identify the saying: 'It belongs to His humanity to fear, to be in agony, and to pray; for these are the things by which He shows what is His as man, and reveals our nature truly assumed.'",
      choices: [
        { id: "a", text: "Cyril of Alexandria, On the Unity of Christ" },
        { id: "b", text: "Maximus the Confessor, Opuscula Theologica", rationale: "Correct. From his anti-monothelite writings." },
        { id: "c", text: "John of Damascus, Exact Exposition III.18" },
        { id: "d", text: "Theodoret, Eranistes" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "St. Maximus the Confessor, Opuscula Theologica et Polemica" }],
    },
  ],
};
