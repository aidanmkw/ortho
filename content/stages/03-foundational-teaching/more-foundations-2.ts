import type { Topic } from "@/lib/types";

export const communionSaints: Topic = {
  id: "communion-of-saints",
  title: "The Communion of Saints",
  summary: "The Orthodox confession that the saints in heaven and the faithful on earth are one Body, in continuous mutual intercession through Christ.",
  learningObjectives: ["Cite Hebrews 12:1, Revelation 5:8."],
  primarySources: ["Hebrews 12:1; Revelation 5:8; 6:9-11; 8:3-4"],
  items: [
    {
      id: "ft-cs-001",
      kind: "identify-source",
      difficulty: 2,
      tags: ["communion-of-saints"],
      prompt: "Identify: 'Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight...'",
      choices: [
        { id: "a", text: "Hebrews 12:1", rationale: "Correct." },
        { id: "b", text: "Romans 8:35" },
        { id: "c", text: "1 Corinthians 9:24" },
        { id: "d", text: "Philippians 3:14" },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Hebrews 12:1" }],
    },
    {
      id: "ft-cs-002",
      kind: "qa",
      difficulty: 3,
      tags: ["intercession"],
      prompt: "Does Scripture record the saints in heaven praying for the saints on earth?",
      expectedAnswer: "Yes. Revelation 5:8 — the twenty-four elders fall before the Lamb 'having every one of them harps, and golden vials full of incense, which are the prayers of the saints.' Revelation 6:9-11 — the souls of the martyrs cry out to God 'how long, O Lord, dost thou not judge and avenge our blood?' Revelation 8:3-4 — an angel offers 'much incense, that he should offer it with the prayers of all saints upon the golden altar.' The saints in heaven are alive, conscious, and engaged in intercessory prayer.",
      citations: [{ source: "Revelation 5:8; 6:9-11; 8:3-4" }],
    },
  ],
};

export const eucharistFoundation: Topic = {
  id: "eucharist-foundation",
  title: "The Eucharist — Foundations",
  summary: "The central sacrament of the Christian life. Real presence, sacrifice, communion, anamnesis, source and summit.",
  learningObjectives: ["State the four aspects.", "Cite the patristic realism."],
  primarySources: ["Matthew 26:26-29; Mark 14:22-25; Luke 22:14-20; 1 Corinthians 10-11; John 6"],
  items: [
    {
      id: "ft-euc-001",
      kind: "qa",
      difficulty: 3,
      tags: ["eucharist", "real-presence"],
      prompt: "State four aspects of the Eucharist in Orthodox theology.",
      expectedAnswer: "(1) Real Presence — the bread and wine, after the Epiclesis, ARE the Body and Blood of Christ. (2) Sacrifice — the same one Sacrifice of Calvary is made present, not repeated. (3) Communion — the faithful eat and drink the same Christ, becoming one Body in Him (1 Cor 10:17). (4) Anamnesis — a sacramental memorial making the saving acts of Christ present, not merely recalling them mentally.",
      citations: [
        { source: "1 Corinthians 10:16-17; 11:23-29" },
        { source: "Ignatius, Smyrnaeans 7:1; Justin Martyr, 1 Apol 66" },
      ],
    },
    {
      id: "ft-euc-002",
      kind: "qa",
      difficulty: 4,
      tags: ["eucharist", "frequency"],
      prompt: "How often did early Christians receive Holy Communion, and how often should an Orthodox Christian commune today?",
      expectedAnswer: "Early Christians received at every Sunday Liturgy (Acts 2:42; Justin's First Apology). The pattern continued for centuries; medieval and post-medieval factors led to less frequent reception. Today, the practice varies: many Orthodox jurisdictions (especially the Greek and the OCA) encourage frequent communion under the guidance of one's spiritual father (often weekly); the Russian tradition has historically been more cautious. Always: preparation by prayer, fasting (from food and water from midnight), and recent confession.",
      citations: [
        { source: "Acts 2:42; Justin Martyr, First Apology 67" },
        { source: "Various contemporary patriarchal encyclicals encouraging frequent communion" },
      ],
    },
  ],
};

export const marriage: Topic = {
  id: "marriage",
  title: "Marriage as a Sacrament",
  summary: "Marriage in the Orthodox tradition: the sacramental union of one man and one woman, image of Christ's union with the Church (Eph 5). The crowning rite — not the exchange of vows — is the moment of sacramental union.",
  learningObjectives: ["Identify the crowning.", "Cite Eph 5:32 (Greek mysterion)."],
  primarySources: ["Genesis 2:24; Matthew 19; Ephesians 5:22-33", "Trebnik — Office of Crowning"],
  items: [
    {
      id: "ft-marr-001",
      kind: "qa",
      difficulty: 3,
      tags: ["marriage", "crowning"],
      prompt: "What is the central liturgical action of the Orthodox marriage rite, and what does it symbolize?",
      expectedAnswer: "The Crowning. The priest places crowns on the heads of the bride and groom, signifying (a) the martyric crown of those willing to die to self for the other, (b) the royal crown of kings of their household, (c) the eschatological crown of glory awaiting the faithful. The crowns are exchanged three times. The rite does not include vows in the Western sense; the union is sacramentally established by the Church through the prayers of the priest, not by mutual contract.",
      citations: [{ source: "Trebnik (Book of Needs) — Office of Crowning" }],
    },
  ],
};

export const ordination: Topic = {
  id: "ordination",
  title: "Ordination (Cheirotonia)",
  summary: "The sacramental laying-on of hands by a bishop, transmitting the apostolic grace of orders. Bishops are ordained by at least three other bishops; presbyters and deacons by their own bishop.",
  learningObjectives: ["State the rules of ordination.", "Cite 1 Tim 4:14 and 2 Tim 1:6."],
  primarySources: ["1 Timothy 4:14; 2 Timothy 1:6", "Apostolic Canon 1-2"],
  items: [
    {
      id: "ft-ord-001",
      kind: "qa",
      difficulty: 3,
      tags: ["ordination"],
      prompt: "What are the canonical requirements for the ordination of a bishop in the Orthodox Church?",
      expectedAnswer: "At least three bishops must consecrate a new bishop (Apostolic Canon 1, Nicaea canon 4). The bishop must be a tonsured monk (or widowed/celibate) — never a married man (Trullo canon 12). He is elected by a synod of bishops. The consecration takes place during the Divine Liturgy at the moment between the Trisagion and the reading of the Epistle. The hands of the consecrating bishops are laid on the candidate's head with the gospel book; the chief consecrator pronounces the prayer of consecration ('the divine grace... ordains the most-honored deacon/priest N. to be bishop of the city of N.').",
      citations: [
        { source: "Apostolic Canon 1; First Council of Nicaea (325), canon 4" },
        { source: "Hieratikon — Order of the Consecration of a Bishop" },
      ],
    },
  ],
};

export const unction: Topic = {
  id: "unction",
  title: "Holy Unction (Anointing of the Sick)",
  summary: "The mystery of anointing with blessed oil for the healing of body and soul, instituted by the Lord (Mk 6:13) and commanded by the Apostle James (Jas 5:14-16). Distinct from the Latin 'last rites.'",
  learningObjectives: ["Cite James 5:14-16.", "Distinguish from extreme unction."],
  primarySources: ["James 5:14-16", "Trebnik — Office of Holy Unction"],
  items: [
    {
      id: "ft-un-001",
      kind: "qa",
      difficulty: 3,
      tags: ["unction"],
      prompt: "How does the Orthodox practice of Holy Unction differ from the Roman 'Last Rites'?",
      expectedAnswer: "Holy Unction is for the HEALING of the living, body and soul — not as a deathbed rite alone. Any baptized Orthodox Christian who is ill (physically or spiritually) may receive it. The traditional order requires seven priests reading seven epistles, seven gospels, and praying seven prayers, anointing the recipient seven times — though in practice today this is often abbreviated. In many Orthodox jurisdictions the entire congregation may be anointed during Holy Week (Wednesday). The Latin 'extreme unction' (so called from c. 1150) was reserved for the dying; Vatican II (Sacrosanctum Concilium 73, 1963) reformed this back toward the original healing meaning.",
      citations: [
        { source: "James 5:14-16; Mark 6:13" },
        { source: "Trebnik — Office of Holy Unction" },
      ],
    },
  ],
};
