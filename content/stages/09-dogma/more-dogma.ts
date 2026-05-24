import type { Topic } from "@/lib/types";

export const eschatology: Topic = {
  id: "eschatology",
  title: "Eschatology — Last Things",
  summary:
    "Particular and general judgment, the resurrection of the body, the intermediate state, the rejection of apokatastasis (553), the Orthodox liturgical eschatology.",
  learningObjectives: [
    "State the Orthodox doctrine of the intermediate state.",
    "Note the conciliar condemnation of apokatastasis (universal salvation).",
    "Present the toll-houses debate without taking a confessional side.",
  ],
  primarySources: [
    "Acts of Constantinople II (553) — anathemas against Origenism",
    "St. Cyril of Jerusalem, Catechesis 15 (on the Second Coming)",
    "Lk 16:19–31; 2 Cor 5:8; Rev 6:9–11; 1 Th 4:13–17",
  ],
  items: [
    {
      id: "dog-esc-001",
      kind: "mcq",
      difficulty: 4,
      tags: ["apokatastasis", "origen"],
      prompt:
        "Which Ecumenical Council anathematized the doctrine of apokatastasis (universal restoration of all rational beings, including demons)?",
      choices: [
        { id: "a", text: "Constantinople II (553)", rationale: "Correct. Fifteen anathemas against the Origenists." },
        { id: "b", text: "Constantinople III (681)" },
        { id: "c", text: "Nicaea II (787)" },
        { id: "d", text: "Constantinople IV (879–880)" },
      ],
      correctChoiceId: "a",
      citations: [
        {
          source: "Acts of Constantinople II (553), Anathemas Against Origen",
          quote:
            "If anyone shall say that the punishment of demons and of impious men is only temporary, and will one day have an end... let him be anathema.",
        },
      ],
    },
    {
      id: "dog-esc-002",
      kind: "qa",
      difficulty: 3,
      tags: ["intermediate-state"],
      prompt:
        "What does the Orthodox Church confess concerning the state of the soul between death and the general resurrection?",
      expectedAnswer:
        "The soul remains conscious and experiences a foretaste of its final lot — joy in the presence of God for the righteous, sorrow and the absence of God for those who rejected Him. The body returns to the dust until the general resurrection, when the soul is reunited with a glorified body. The Church prays for the departed because they are alive in Christ (Lk 16:19–31; Rev 6:9–11). The full beatitude or condemnation awaits the general resurrection.",
      citations: [
        { source: "Luke 16:19–31; 2 Corinthians 5:8; Revelation 6:9–11" },
        { source: "St. John Chrysostom, Homilies on Matthew 31" },
      ],
    },
  ],
};

export const ancestralSin: Topic = {
  id: "ancestral-sin",
  title: "Ancestral Sin (not Inherited Guilt)",
  summary:
    "The Orthodox doctrine that we inherit from Adam mortality, corruptibility, and the disordered passions — but NOT personal moral guilt for his act. Distinct from the Augustinian Latin doctrine of original-sin-as-inherited-guilt.",
  learningObjectives: [
    "Cite Romans 5:12 in the correct Greek reading.",
    "Cite Ezekiel 18:20 against inherited guilt.",
    "Quote a Greek Father on the consequences of Adam's fall.",
  ],
  primarySources: [
    "Romans 5:12 (Greek)",
    "Ezekiel 18:20",
    "St. John Chrysostom, Homilies on Romans 10",
    "St. Cyril of Alexandria, Commentary on Romans",
    "John Romanides, The Ancestral Sin",
  ],
  items: [
    {
      id: "dog-as-001",
      kind: "qa",
      difficulty: 4,
      tags: ["ancestral-sin", "romans-5"],
      prompt:
        "Translate the key clause of Romans 5:12 — 'eph' hō pantes hēmarton' — and contrast it with the Latin Vulgate's rendering.",
      expectedAnswer:
        "The Greek 'eph' hō pantes hēmarton' means 'in that/because all sinned' — death came to all because all sinned (in their own persons). The Latin Vulgate translated 'eph' hō' as 'in quo' — 'in whom' — suggesting that all sinned IN Adam, which is grammatically possible but is contested in Greek. The Greek Fathers (Chrysostom, Cyril of Alexandria) read 'because' or 'on the condition that.' Augustine, reading the Latin, developed the doctrine of inherited guilt; this doctrine was therefore built on a particular reading of a Latin translation, not directly on the Greek of Paul.",
      citations: [
        { source: "Romans 5:12 — Greek text" },
        { source: "St. John Chrysostom, Homily 10 on Romans" },
        { source: "Vulgate, Romans 5:12" },
      ],
    },
  ],
};

export const ecclesiology: Topic = {
  id: "ecclesiology",
  title: "Ecclesiology — One, Holy, Catholic, Apostolic",
  summary:
    "The Symbol's four marks of the Church. Conciliarity, autocephaly, primacy without supremacy, and the visible/invisible question.",
  learningObjectives: [
    "Quote the Symbol's four marks.",
    "Cite Cyprian on the unity of the Church.",
    "Refute the 'invisible Church' theory.",
  ],
  primarySources: [
    "Symbol of Faith — 9th article",
    "St. Cyprian, De Unitate Ecclesiae",
    "St. Ignatius, Smyrnaeans 8",
  ],
  items: [
    {
      id: "dog-ec-001",
      kind: "identify-source",
      difficulty: 3,
      tags: ["cyprian", "church-unity"],
      prompt:
        "Identify the source of: 'He cannot have God for his Father who has not the Church for his mother.'",
      choices: [
        { id: "a", text: "Augustine, City of God" },
        { id: "b", text: "Cyprian, On the Unity of the Catholic Church 6", rationale: "Correct. ~AD 251." },
        { id: "c", text: "Irenaeus, Against Heresies III" },
        { id: "d", text: "John Chrysostom, On the Priesthood" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source: "St. Cyprian of Carthage, De Unitate Ecclesiae 6 (~AD 251)",
          quote:
            "He cannot have God for his Father who has not the Church for his mother.",
        },
      ],
    },
  ],
};

export const sacraments: Topic = {
  id: "seven-mysteries",
  title: "The Seven Mysteries (Sacraments)",
  summary:
    "Baptism, Chrismation, Eucharist, Confession, Holy Unction, Marriage, Ordination. The 'seven' enumeration is conventional; all are participation in the same uncreated grace of Christ.",
  learningObjectives: [
    "List the seven and their biblical foundations.",
    "Distinguish sacrament as participation from sacrament as juridical sign.",
  ],
  primarySources: [
    "St. Nicholas Cabasilas, The Life in Christ",
    "St. Dionysios the Areopagite, Ecclesiastical Hierarchy",
    "Confession of Dositheus (1672), Decrees 15–17",
  ],
  items: [
    {
      id: "dog-sac-001",
      kind: "mcq",
      difficulty: 2,
      tags: ["seven-mysteries"],
      prompt:
        "Which of the following is NOT among the seven mysteries of the Orthodox Church?",
      choices: [
        { id: "a", text: "Baptism" },
        { id: "b", text: "Chrismation" },
        { id: "c", text: "Foot-washing", rationale: "Correct — practiced in some traditions but not enumerated among the seven sacramental mysteries." },
        { id: "d", text: "Holy Unction" },
      ],
      correctChoiceId: "c",
      citations: [
        { source: "Confession of Dositheus (1672), Decree 15" },
      ],
    },
  ],
};
