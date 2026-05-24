import type { Topic } from "@/lib/types";

export const marcionism: Topic = {
  id: "marcionism",
  title: "Marcionism",
  summary: "Marcion of Sinope (~AD 144) rejected the OT entirely, taught that the God of the OT is a different (lesser) Demiurge than the Father of Jesus Christ, and reduced the NT to a heavily edited Luke + ten Pauline epistles. The most consequential 2nd-century heresy.",
  learningObjectives: ["Identify Marcion's canonical proposal.", "Note Tertullian's five-book refutation."],
  primarySources: ["Tertullian, Against Marcion (5 books)"],
  items: [
    {
      id: "her-mar-001",
      kind: "qa",
      difficulty: 3,
      tags: ["marcion", "canon"],
      prompt: "What Bible did Marcion produce, and how did the Church respond?",
      expectedAnswer: "Marcion produced the first 'Christian' canon: a truncated Gospel of Luke (purged of Jewish elements) and ten Pauline epistles (Galatians, 1 Corinthians, 2 Corinthians, Romans 1-14, 1 Thessalonians, 2 Thessalonians, Ephesians/Laodiceans, Colossians, Philippians, Philemon — also edited). He REJECTED the entire OT and Matthew, Mark, John, Acts, and the General Epistles. The Church responded by explicitly defining the catholic canon as both Testaments together — Irenaeus AH III lists the four Gospels; Tertullian wrote five books Against Marcion; the Muratorian Fragment (c. 170-200) shows the catholic canon as widely received by Rome by then. Marcion's heresy may have been the principal historical catalyst for the formal definition of the Christian canon.",
      citations: [
        { source: "Tertullian, Against Marcion (5 books, ~AD 207)" },
        { source: "Irenaeus, AH I.27; III.1, 11" },
      ],
    },
  ],
};

export const tritheism: Topic = {
  id: "tritheism",
  title: "Tritheism",
  summary: "The heresy of holding the Three Persons of the Trinity as three separate Gods. Refuted by all the Cappadocians as a misreading of their own hypostasis-language.",
  learningObjectives: ["Cite Gregory of Nyssa's That There Are Not Three Gods.", "Distinguish three Persons from three Gods."],
  primarySources: ["Gregory of Nyssa, That There Are Not Three Gods (To Ablabius)"],
  items: [
    {
      id: "her-tri-001",
      kind: "qa",
      difficulty: 4,
      tags: ["tritheism", "gregory-nyssa"],
      prompt: "How does St. Gregory of Nyssa answer the charge of tritheism in his letter To Ablabius?",
      expectedAnswer: "Gregory replies that the unity of God is grounded in the unity of operation (energeia) of the Three: all things that God works toward us — creation, providence, salvation, sanctification — are accomplished by the Three together in a single, inseparable operation flowing from the Father through the Son in the Holy Spirit. We do not say 'three farmers' for three men plowing together; we recognize farming as one action. So with the divine operation: one operation reveals one essence. Therefore Father, Son, and Spirit are one God in one operation, though three Hypostases.",
      citations: [
        { source: "St. Gregory of Nyssa, That There Are Not Three Gods (To Ablabius)" },
      ],
    },
  ],
};

export const judaizers: Topic = {
  id: "judaizers",
  title: "The Judaizers",
  summary: "The earliest doctrinal controversy in the Christian Church (Acts 15; Galatians): the demand that Gentile converts be circumcised and keep the Mosaic law. Settled at the Council of Jerusalem (~AD 49).",
  learningObjectives: ["Identify the Council of Jerusalem.", "Quote Galatians."],
  primarySources: ["Acts 15; Galatians"],
  items: [
    {
      id: "her-jud-001",
      kind: "qa",
      difficulty: 2,
      tags: ["judaizers"],
      prompt: "What did the Judaizers demand of Gentile converts, and how did the Apostolic Council answer them?",
      expectedAnswer: "They demanded that Gentile converts be circumcised and keep the Mosaic law (Acts 15:1). The Council of Jerusalem (~AD 49), recorded in Acts 15, ruled that Gentiles need not be circumcised, but should abstain from things sacrificed to idols, blood, things strangled, and fornication. Paul's epistle to the Galatians treats the same controversy theologically: salvation is by faith in Christ apart from the works of the Mosaic law (circumcision, kosher, Sabbath), though the moral law remains binding.",
      citations: [{ source: "Acts 15; Galatians 2-3" }],
    },
  ],
};

export const eutychianism: Topic = {
  id: "eutychianism-deep",
  title: "Eutychianism — Detail",
  summary: "Eutyches, archimandrite of a Constantinopolitan monastery (~378-454). Held that 'before the union there were two natures, after the union there is only one nature' — a confusion of natures denounced by Chalcedon as monophysite.",
  learningObjectives: ["Identify Eutyches.", "State the slogan."],
  primarySources: ["Acts of Chalcedon (451)"],
  items: [
    {
      id: "her-eut-001",
      kind: "mcq",
      difficulty: 4,
      tags: ["eutyches"],
      prompt: "What office did Eutyches hold, and at what council was he initially supported then later condemned?",
      choices: [
        { id: "a", text: "Archimandrite at Constantinople; initially supported at the Latrocinium of Ephesus (449), then condemned at Chalcedon (451).", rationale: "Correct." },
        { id: "b", text: "Bishop of Alexandria; supported at Ephesus then condemned at Constantinople I." },
        { id: "c", text: "Patriarch of Antioch; condemned at Ephesus 431." },
        { id: "d", text: "Bishop of Rome; condemned at Constantinople II." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Acts of Chalcedon (451)" }],
    },
  ],
};

export const sergianismHeresy: Topic = {
  id: "sergianism-as-error",
  title: "Sergianism (Theological Diagnosis)",
  summary: "From a traditionalist Orthodox standpoint, Sergianism (the 1927 Declaration submitting the Russian Church to the atheist Soviet state) is not merely a disciplinary error but an ecclesiological one — letting the Caesar govern the Church.",
  learningObjectives: ["State the traditionalist critique.", "Distinguish from canonical Moscow Patriarchate position."],
  primarySources: ["Met. Joseph of Petrograd, letters 1927-30"],
  items: [
    {
      id: "her-srg-001",
      kind: "qa",
      difficulty: 5,
      tags: ["sergianism"],
      prompt: "What is the theological essence of the traditionalist critique of Sergianism?",
      expectedAnswer: "That the 1927 Declaration of Met. Sergius reversed the apostolic order: the Church should obey God rather than men when the state demands the abandonment of Truth (Acts 5:29). By pledging the Church's loyalty to the atheist Soviet state and calling its enemies 'our enemies,' Sergius effectively let the Caesar govern the Church — and in particular forbade the Church to confess its persecuted martyrs. From this standpoint Sergianism is not just a prudential mistake but an ecclesiological heresy: the Church becoming an arm of a hostile state. The current Moscow Patriarchate rejects this critique; ROCOR before 2007 maintained it; many traditionalist groups still maintain it.",
      citations: [
        { source: "Met. Joseph of Petrograd, Epistle of 1927" },
        { source: "Acts 5:29" },
      ],
    },
  ],
};
