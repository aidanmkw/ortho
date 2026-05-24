import type { Topic } from "@/lib/types";

export const christology: Topic = {
  id: "christology",
  title: "Christology",
  summary:
    "One Person of the Word made flesh in two natures, divine and human, united without confusion, without change, without division, without separation. The Chalcedonian definition + the dyothelite refinement of Constantinople III.",
  learningObjectives: [
    "Recite the four Chalcedonian adverbs.",
    "Distinguish nature (physis), person (hypostasis), and will (thelēma).",
  ],
  primarySources: [
    "Definition of Chalcedon (451)",
    "St. Cyril of Alexandria, On the Unity of Christ",
    "St. Maximus the Confessor, Disputation with Pyrrhus",
  ],
  items: [
    {
      id: "ft-chr-001",
      kind: "qa",
      difficulty: 3,
      tags: ["christology", "chalcedon"],
      prompt:
        "Recite the four Chalcedonian adverbs describing the union of natures in Christ.",
      expectedAnswer:
        "Inconfusedly, unchangeably, indivisibly, inseparably (ἀσυγχύτως, ἀτρέπτως, ἀδιαιρέτως, ἀχωρίστως). The first two safeguard the integrity of each nature against monophysite confusion; the last two safeguard the unity of the Person against Nestorian separation.",
      citations: [
        {
          source: "Definition of Chalcedon (451)",
          quote:
            "...in two natures, inconfusedly, unchangeably, indivisibly, inseparably; the distinction of natures being by no means taken away by the union, but rather the property of each nature being preserved.",
        },
      ],
    },
  ],
};

export const mariology: Topic = {
  id: "mariology-foundation",
  title: "Mariology Foundations",
  summary:
    "Theotokos (Mother of God), Aeiparthenos (Ever-Virgin), Panagia (All-Holy). The dogmatic basis of the Orthodox veneration of Mary.",
  learningObjectives: [
    "Defend the title Theotokos as Christological.",
    "Recite the Theotokion of the Anaphora.",
  ],
  primarySources: [
    "Acts of Ephesus (431)",
    "Acts of Constantinople II (553) — Aeiparthenos",
    "Acts of Nicaea II (787)",
    "Sub Tuum Praesidium (P. Rylands 470, c. 250)",
  ],
  items: [
    {
      id: "ft-mar-001",
      kind: "identify-source",
      difficulty: 3,
      tags: ["mariology", "sub-tuum"],
      prompt:
        "Identify the earliest known prayer to the Theotokos, dating from approximately AD 250 (Greek papyrus, Rylands 470):",
      choices: [
        { id: "a", text: "Akathist Hymn" },
        {
          id: "b",
          text: "Sub Tuum Praesidium (Ὑπὸ τὴν σὴν εὐσπλαγχνίαν)",
          rationale: "Correct. Greek papyrus P. Rylands 470, dated c. AD 250.",
        },
        { id: "c", text: "Megalynarion" },
        { id: "d", text: "Axion Estin" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source: "P. Rylands 470 (c. AD 250)",
          quote:
            "Ὑπὸ τὴν σὴν εὐσπλαγχνίαν καταφεύγομεν, Θεοτόκε. — Beneath thy compassion we take refuge, O Theotokos.",
        },
      ],
    },
  ],
};

export const anthropology: Topic = {
  id: "anthropology",
  title: "Anthropology — Image and Likeness",
  summary:
    "Man created in the image of God (Gen 1:26) and called to grow into the divine likeness. The Fall wounded but did not erase the image. Salvation as the restoration and perfection of the imago Dei in Christ.",
  learningObjectives: [
    "Distinguish image (eikōn) from likeness (homoiōsis) per Irenaeus.",
    "Quote Genesis 1:26.",
  ],
  primarySources: [
    "Genesis 1:26–27",
    "St. Irenaeus, Against Heresies V.6, V.16",
    "St. Athanasius, Against the Heathen 30–34",
    "St. Maximus the Confessor, Ambigua 7",
  ],
  items: [
    {
      id: "ft-anth-001",
      kind: "qa",
      difficulty: 4,
      tags: ["anthropology", "image-likeness"],
      prompt:
        "How does the patristic tradition distinguish 'image' from 'likeness' in Genesis 1:26?",
      expectedAnswer:
        "St. Irenaeus and the tradition after him distinguish image (eikōn, what we are by creation — rational, free, capable of God) from likeness (homoiōsis, the goal: actual conformity to God through virtue and grace). The image is given; the likeness is achieved by synergy. The Fall wounded both but did not destroy them; Christ restores the image and brings us forward into the likeness through theosis.",
      citations: [
        { source: "Genesis 1:26 — 'Let us make man in our image, after our likeness.'" },
        { source: "St. Irenaeus, Against Heresies V.6.1; V.16.2" },
        { source: "St. Maximus the Confessor, Ambigua 7" },
      ],
    },
  ],
};
