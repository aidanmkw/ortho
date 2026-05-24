import type { Topic } from "@/lib/types";

export const constantinopleI: Topic = {
  id: "constantinople-i",
  title: "Constantinople I (381)",
  summary:
    "150 Fathers under Theodosius. Condemned the Macedonian heresy (denying the divinity of the Spirit). Completed the Symbol of Faith. Issued canon 3 on Constantinople's primacy ('New Rome').",
  learningObjectives: [
    "Quote the eighth article of the Creed.",
    "Identify Gregory the Theologian's role.",
    "State canon 3 on Constantinople.",
  ],
  primarySources: [
    "Niceno-Constantinopolitan Symbol (381)",
    "St. Gregory the Theologian, Theological Orations",
    "Canon 3 of Constantinople I",
  ],
  items: [
    {
      id: "co-c1-001",
      kind: "identify-source",
      difficulty: 3,
      tags: ["creed", "holy-spirit"],
      prompt:
        "Identify the source: 'And in the Holy Spirit, the Lord, the Giver of Life, who proceedeth from the Father, who with the Father and the Son together is worshipped and glorified, who spake by the prophets.'",
      choices: [
        { id: "a", text: "Symbol of Nicaea (325)" },
        {
          id: "b",
          text: "Symbol of Constantinople I (381) — 8th article",
          rationale:
            "Correct. The 8th article on the Holy Spirit was added at this council. Nicaea ended with 'And in the Holy Spirit' — the elaboration is Constantinople I.",
        },
        { id: "c", text: "Definition of Chalcedon" },
        { id: "d", text: "Tome of Leo" },
      ],
      correctChoiceId: "b",
      citations: [
        { source: "Niceno-Constantinopolitan Symbol (381), Article 8" },
      ],
    },
  ],
};

export const ephesus: Topic = {
  id: "ephesus",
  title: "Ephesus (431)",
  summary:
    "Third Ecumenical Council. Convoked against Nestorius, patriarch of Constantinople, who refused the title Theotokos. Cyril of Alexandria presiding. The conciliar definition affirms one Christ, one Person, with the Virgin as truly the Mother of God in flesh.",
  learningObjectives: [
    "State the conciliar definition on Theotokos.",
    "Quote Cyril's First or Third Letter to Nestorius.",
  ],
  primarySources: [
    "Acts of the Council of Ephesus (431)",
    "St. Cyril of Alexandria, Letters to Nestorius",
  ],
  items: [
    {
      id: "co-eph-001",
      kind: "qa",
      difficulty: 3,
      tags: ["ephesus", "theotokos"],
      prompt:
        "What did the Council of Ephesus (431) decree concerning the title Theotokos, and what was the consequence for Nestorius?",
      expectedAnswer:
        "The Council, presided over by St. Cyril of Alexandria, affirmed Mary as truly Theotokos (God-Bearer), since the one she bore is in His Person the eternal Son of God. Nestorius was deposed from the see of Constantinople and anathematized. Cyril's Twelve Anathemas were ratified.",
      citations: [
        { source: "Acts of the Council of Ephesus (431)" },
      ],
    },
  ],
};

export const photianCouncil: Topic = {
  id: "photian-council",
  title: "Constantinople IV (879–880) — The Photian Council",
  summary:
    "Held under St. Photios the Great. Condemned the addition of Filioque to the Symbol. Received in the East as an Ecumenical Council; received in the medieval West for a time, then displaced by Rome's 1014 Filioque adoption.",
  learningObjectives: [
    "Identify Photios as the presiding hierarch.",
    "State the council's anti-Filioque definition.",
  ],
  primarySources: [
    "Acts of Constantinople 879–880",
    "St. Photios, Mystagogy of the Holy Spirit",
  ],
  items: [
    {
      id: "co-pho-001",
      kind: "qa",
      difficulty: 4,
      tags: ["photios", "filioque", "council"],
      prompt:
        "What did the Council of Constantinople 879–880 decree concerning the Symbol of Faith?",
      expectedAnswer:
        "It explicitly forbade any addition to or subtraction from the Symbol of Faith as promulgated by the Second Ecumenical Council. The decision was a direct conciliar response to the Frankish addition of Filioque. Pope John VIII, through his legates, signed in agreement; the West subsequently reversed course.",
      citations: [
        { source: "Acts of Constantinople 879–880, Definition" },
        { source: "St. Photios, Mystagogy of the Holy Spirit" },
      ],
    },
  ],
};

export const hesychastCouncils: Topic = {
  id: "hesychast-councils",
  title: "The Hesychast Councils (1341, 1347, 1351)",
  summary:
    "Three constantinopolitan councils that vindicated St. Gregory Palamas and dogmatized the essence/energies distinction against the criticisms of Barlaam, Akindynos, and Gregoras.",
  learningObjectives: [
    "State the Palamite distinction.",
    "Cite the Synodal Tome of 1351.",
  ],
  primarySources: [
    "Synodal Tome of 1351",
    "Synodikon of Orthodoxy (read first Sunday of Lent)",
    "St. Gregory Palamas, Triads",
  ],
  items: [
    {
      id: "co-hes-001",
      kind: "qa",
      difficulty: 4,
      tags: ["palamas", "essence-energies"],
      prompt:
        "What is the dogmatic content of the Hesychast Councils (1341, 1347, 1351), and where is their definition liturgically recalled?",
      expectedAnswer:
        "They dogmatized the real distinction in God between His unknowable essence (which no creature may participate) and His divine, uncreated energies (which are God Himself in His outward, gracious motion and through which the saints are deified). The councils' definitions are read every First Sunday of Lent in the Synodikon of Orthodoxy, alongside the affirmation of icons.",
      citations: [
        { source: "Synodal Tome of 1351" },
        { source: "Synodikon of Orthodoxy — Triumph of Orthodoxy, First Sunday of Lent" },
      ],
    },
  ],
};
