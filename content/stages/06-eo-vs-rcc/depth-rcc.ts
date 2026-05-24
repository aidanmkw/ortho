import type { Topic } from "@/lib/types";

// Additional cross-examination drills sharpening the EO-vs-RCC engagement.

export const purgatoryDeep: Topic = {
  id: "purgatory-deep",
  title: "Purgatory — Specific Texts",
  summary:
    "The Roman prooftexts for purgatorial fire (1 Cor 3:13–15; 2 Maccabees 12:39–46) and their Orthodox readings.",
  learningObjectives: [
    "Read 1 Cor 3:13–15 in patristic exegesis.",
    "Address 2 Maccabees on prayer for the dead without inferring purgatory.",
  ],
  primarySources: [
    "1 Corinthians 3:10–17",
    "2 Maccabees 12:39–46",
    "Mark of Ephesus, First Homily on Purgatorial Fire",
  ],
  items: [
    {
      id: "rcc-purd-001",
      kind: "debate",
      difficulty: 4,
      tags: ["purgatory", "2-maccabees"],
      opponentTradition: "RCC",
      opponentClaim:
        "2 Maccabees 12:39–46 records Judas Maccabeus offering sacrifice for the dead. This supports both prayer for the dead AND a state of purgation in which such prayers can be applied.",
      orthodoxRebuttal:
        "Two things. (1) The Orthodox Church receives 2 Maccabees as Scripture (it is in our canon — the Reformers cut it) and indeed prays for the dead, as the Church has always done (Tertullian, De Corona 3, c. 211). On this we may agree against the Protestant rejection of the practice. (2) But 2 Maccabees 12 does NOT teach a purgatorial INTERMEDIATE state of temporal punishment to which Christ's merits and the indulgence-system apply. It teaches the legitimacy of intercession for the departed — which the Orthodox practice in the panikhida, the Saturday of Souls, the memorial koliva. The Latin elaboration — that there is a third place between heaven and hell, that souls there suffer purgative fire for a measurable duration, that the Pope can shorten that duration via indulgences drawn from the treasury of merits — is read INTO the verse, not OUT of it. Mark of Ephesus distinguished the realities precisely at Florence: prayer for the dead, yes; purgatorial fire as a juridical category, no.",
      citations: [
        { source: "2 Maccabees 12:39–46 (received as canonical in the Orthodox Church)" },
        {
          source: "Tertullian, De Corona 3 (~AD 211)",
          quote:
            "We offer oblations for the dead on the anniversary of their birth into eternity.",
        },
        { source: "St. Mark of Ephesus, First Homily on Purgatorial Fire (1438)" },
      ],
    },
  ],
};

export const createdGraceDeep: Topic = {
  id: "created-grace-deep",
  title: "Created Grace vs. Uncreated Energies",
  summary:
    "Thomistic 'created grace' as a created medium between the creature and God vs. the Palamite uncreated energies. The dividing line on the metaphysics of salvation.",
  learningObjectives: [
    "Distinguish created grace from divine energies.",
    "Quote Palamas on uncreated grace.",
  ],
  primarySources: [
    "Thomas Aquinas, Summa Theologiae I-II.110",
    "Gregory Palamas, Triads III.1",
    "Synodal Tome of 1351",
  ],
  items: [
    {
      id: "rcc-cg-001",
      kind: "debate",
      difficulty: 5,
      tags: ["grace", "palamas", "aquinas"],
      opponentTradition: "RCC",
      opponentClaim:
        "Aquinas's account of habitual sanctifying grace as a created quality infused into the soul is sufficient to explain salvation without the metaphysical complications of essence/energies in God.",
      orthodoxRebuttal:
        "If sanctifying grace is CREATED, then what the saint participates in is a creature — not God Himself. But the Lord said 'I am the vine, ye are the branches' (Jn 15:5) — direct union, not mediation through a created tertium quid. 2 Peter 1:4 says we become 'partakers of the divine NATURE' — by which is meant, in Palamas's reading, the uncreated energies (not the essence, which no creature shares). If grace is created, then deification is union with a creature, which Christianity has always denied. Aquinas's framework was developed in response to Aristotelian metaphysical anxieties about pantheism; the Palamite framework answers the SAME concern (we don't participate the essence) with a different solution (we participate the uncreated energies, which are God in His outgoing motion). The Orthodox account preserves both God's transcendence and the reality of theosis.",
      citations: [
        { source: "John 15:5; 2 Peter 1:4" },
        {
          source: "St. Gregory Palamas, Triads III.1.34",
          quote:
            "The deifying gift of the Spirit is not the essence of God, but neither is it a creature; it is the energy of God by which we share in His life.",
        },
        { source: "Aquinas, Summa Theologiae I-II.110.2 — for the comparison" },
      ],
    },
  ],
};

export const petrineTextsDeep: Topic = {
  id: "petrine-deep",
  title: "Petrine Texts — Patristic Exegesis",
  summary:
    "The three classical Petrine texts (Mt 16:18, Lk 22:31–32, Jn 21:15–17) and the variety of patristic readings — none of which yield the Vatican I doctrine of universal jurisdiction.",
  learningObjectives: [
    "Identify the three Petrine texts.",
    "Cite Augustine's mature view in the Retractations.",
    "Show that the rock-as-confession reading is dominant in the Greek Fathers.",
  ],
  primarySources: [
    "Mt 16:18–19; Lk 22:31–32; Jn 21:15–17",
    "Origen, Commentary on Matthew XII.10–11",
    "Chrysostom, Homily 54 on Matthew",
    "Augustine, Retractations I.21",
  ],
  items: [
    {
      id: "rcc-pet-001",
      kind: "qa",
      difficulty: 4,
      tags: ["matthew-16", "petrine"],
      prompt:
        "In St. Augustine's Retractations (early 5th c.), which of two readings of Mt 16:18 does he say he came to prefer in his maturity?",
      expectedAnswer:
        "In Retractations I.21, Augustine writes that of the two readings — (a) the Rock is Peter himself, or (b) the Rock is what Peter confessed (Christ) — he frequently came to prefer the latter (the Rock is Christ, confessed by Peter). He leaves both as legitimate but signals the personalist reading is not the only valid patristic option, even in Latin tradition.",
      citations: [
        {
          source: "St. Augustine, Retractations I.21 (~AD 426)",
          quote:
            "I have since most frequently so explained what was said by the Lord, 'Thou art Peter, and upon this rock I will build my Church,' that it should be understood as built upon Him whom Peter confessed.",
        },
      ],
    },
  ],
};
