import type { Topic } from "@/lib/types";

export const athanasiusDepth: Topic = {
  id: "athanasius-depth",
  title: "Athanasius — Depth Pack",
  summary: "Multiple drill items on the Pope of Alexandria, defender of Nicaea.",
  learningObjectives: ["Know the major Athanasian works."],
  primarySources: ["Athanasius, On the Incarnation; Orations Against Arians; Life of Antony"],
  items: [
    {
      id: "cf-athd-001",
      kind: "mcq",
      difficulty: 2,
      tags: ["athanasius"],
      prompt: "How old was Athanasius when he wrote On the Incarnation?",
      choices: [
        { id: "a", text: "Around twenty (~AD 318), before Nicaea", rationale: "Correct. A young deacon, decades before he was bishop." },
        { id: "b", text: "About fifty, during his exile" },
        { id: "c", text: "Around seventy, in retirement" },
        { id: "d", text: "Exact date unknown" },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Quasten, Patrology III; cf. Khaled Anatolios, Athanasius (2004)" }],
    },
    {
      id: "cf-athd-002",
      kind: "qa",
      difficulty: 3,
      tags: ["athanasius", "festal-letters"],
      prompt: "What was the function of Athanasius's annual Festal Letters?",
      expectedAnswer: "As Pope of Alexandria, Athanasius issued an annual letter to his diocese (and beyond) announcing the date of Pascha and accompanying it with pastoral teaching. The series ran from 329 to ~373. The 39th Festal Letter (367) is the first known authoritative list of the 27 books of the New Testament canon.",
      citations: [{ source: "St. Athanasius, Festal Letters" }],
    },
    {
      id: "cf-athd-003",
      kind: "identify-source",
      difficulty: 3,
      tags: ["athanasius", "deification"],
      prompt: "Identify the source of: 'The Word was made man so that we might be made God.'",
      choices: [
        { id: "a", text: "Irenaeus, AH V Preface" },
        { id: "b", text: "Athanasius, On the Incarnation 54.3", rationale: "Correct. The classical formula." },
        { id: "c", text: "Maximus the Confessor, Ambigua 41" },
        { id: "d", text: "Cyril of Alexandria, On the Unity of Christ" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "Athanasius, On the Incarnation 54.3" }],
    },
  ],
};

export const cyrilOfJerusalem: Topic = {
  id: "cyril-jerusalem",
  title: "St. Cyril of Jerusalem",
  summary: "(c. 313-386) Bishop of Jerusalem; author of the Catechetical Lectures (twenty-three) and Mystagogical Catecheses (five) explaining baptism, chrismation, and the Eucharist to the newly-illumined.",
  learningObjectives: ["Identify the Mystagogical Catecheses."],
  primarySources: ["Cyril of Jerusalem, Catechetical Lectures; Mystagogical Catecheses"],
  items: [
    {
      id: "cf-cyj-001",
      kind: "qa",
      difficulty: 3,
      tags: ["cyril-jerusalem"],
      prompt: "What are the 'Mystagogical Catecheses' of St. Cyril of Jerusalem?",
      expectedAnswer: "Five lectures delivered to the newly-baptized in the week after Pascha (mid-4th century), explaining the rituals of baptism, chrismation, and the Eucharist that had just been performed for them. They are a primary source for 4th-century Jerusalem liturgical practice and for the unbroken sacramental realism of the early Church.",
      citations: [{ source: "St. Cyril of Jerusalem, Mystagogical Catecheses I-V" }],
    },
  ],
};

export const johnCassian: Topic = {
  id: "john-cassian",
  title: "St. John Cassian",
  summary: "(~360-435) Born in Scythia Minor; learned monasticism in Egypt under the desert fathers; later founded monasteries in Marseilles. Wrote the Institutes and the Conferences — the principal channel of Eastern monastic wisdom into the Latin West.",
  learningObjectives: ["Identify his bridge role between East and West.", "Note his Conferences XIII against extreme Augustinianism."],
  primarySources: ["John Cassian, Institutes; Conferences"],
  items: [
    {
      id: "cf-cas-001",
      kind: "qa",
      difficulty: 4,
      tags: ["cassian", "synergy"],
      prompt: "What is the burden of John Cassian's Conference XIII (On the Protection of God)?",
      expectedAnswer: "A nuanced defense of synergy — God's grace and human free response — against extreme Augustinian predestinarianism. Without denying the priority of grace, Cassian insists that humans must respond to grace and that we are not mere passive recipients of an irresistible decree. The Western 'Semi-Pelagian' label later attached to Cassian misrepresents him; the East simply recognized his teaching as the synergeia of the Greek Fathers. He is a canonized saint in both East and West (East: February 29).",
      citations: [{ source: "John Cassian, Conferences XIII" }],
    },
  ],
};

export const ephremSyrian: Topic = {
  id: "ephrem-syrian",
  title: "St. Ephrem the Syrian",
  summary: "(c. 306-373) Syriac poet-theologian; deacon of Edessa. Composed thousands of hymns (madroshe) used in liturgy. Master of paradox: theology in song. 'Lyre of the Holy Spirit.'",
  learningObjectives: ["Identify Ephrem's title 'Lyre of the Holy Spirit.'", "Note his Prayer used at Lenten services."],
  primarySources: ["St. Ephrem the Syrian, Hymns on Paradise; Hymns on the Nativity; Prayer of St. Ephrem"],
  items: [
    {
      id: "cf-eph-001",
      kind: "qa",
      difficulty: 3,
      tags: ["ephrem", "prayer-of-ephrem"],
      prompt: "Quote the Prayer of St. Ephrem used at Lenten services in the Orthodox Church.",
      expectedAnswer: "'O Lord and Master of my life, take from me the spirit of sloth, despair, lust of power, and idle talk. But give rather the spirit of chastity, humility, patience, and love to thy servant. Yea, O Lord and King, grant me to see my own transgressions, and not to judge my brother, for blessed art thou, unto ages of ages. Amen.' (Prostrations are made between the petitions.)",
      citations: [{ source: "Triodion — Prayer of St. Ephrem the Syrian, used in Lenten services" }],
    },
  ],
};

export const dionysiusAreo: Topic = {
  id: "dionysius-areopagite",
  title: "St. Dionysius the Areopagite (the Corpus)",
  summary: "The four works (Divine Names, Mystical Theology, Celestial Hierarchy, Ecclesiastical Hierarchy) plus letters, attributed in their own text to the Athenian convert of Acts 17:34. Modern scholarship dates them ~AD 500. Their authority in the Orthodox tradition is unquestioned, regardless of authorship.",
  learningObjectives: ["Name the four Dionysian works."],
  primarySources: ["The Corpus Areopagiticum"],
  items: [
    {
      id: "cf-dio-001",
      kind: "qa",
      difficulty: 4,
      tags: ["dionysius"],
      prompt: "Name the four principal works of the Dionysian corpus and the basic content of each.",
      expectedAnswer: "(1) On the Divine Names — the names by which Scripture and worship refer to God (Good, Being, Life, Wisdom, etc.). (2) On the Mystical Theology — apophatic ascent: knowing God by unknowing. (3) On the Celestial Hierarchy — the nine ranks of angels and their mediation. (4) On the Ecclesiastical Hierarchy — bishop, presbyter, deacon as image of the heavenly orders; the sacraments. Plus the ten Letters.",
      citations: [{ source: "Dionysius the Areopagite, Corpus Dionysiacum (5th-6th c.)" }],
    },
  ],
};
