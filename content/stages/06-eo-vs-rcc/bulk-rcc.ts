import type { Topic } from "@/lib/types";

export const clericalCelibacy: Topic = {
  id: "clerical-celibacy",
  title: "Mandatory Clerical Celibacy",
  summary: "The Western Latin discipline (formalized at the Lateran Councils of 1123 and 1139) of requiring all priests to be celibate. The Orthodox: married men are ordained presbyters and deacons; bishops are chosen from celibate monastics.",
  learningObjectives: ["Cite Trullo canon 13.", "Note 1 Tim 3:2 and Tit 1:6."],
  primarySources: ["Trullo, canon 13", "1 Timothy 3:2; Titus 1:6", "Lateran I (1123); Lateran II (1139)"],
  items: [
    {
      id: "rcc-cel-001",
      kind: "debate",
      difficulty: 4,
      tags: ["celibacy", "rcc"],
      opponentTradition: "RCC",
      opponentClaim: "Priestly celibacy is rooted in apostolic tradition (Mt 19:12; 1 Cor 7) and is the higher calling, freeing the priest for total devotion to Christ.",
      orthodoxRebuttal: "Celibacy IS a high calling (the monastic vocation in the Orthodox East has always honored it). But its UNIVERSAL mandate for the priesthood, as established at Lateran I (1123) and Lateran II (1139), is a Latin-medieval discipline, NOT apostolic tradition. The New Testament: 1 Tim 3:2 — 'A bishop must be... the husband of ONE wife'; Titus 1:6 — same of presbyters. Peter himself was married (Mt 8:14 — Peter's mother-in-law). Trullo canon 13 (692) explicitly defends the right of married men to be ordained and to continue marital cohabitation. The Orthodox practice — married presbyters, celibate bishops — preserves both biblical models without imposing one on all. The mandatory celibacy of the Latin Church has produced well-documented pastoral failures throughout the medieval and modern eras.",
      citations: [
        { source: "1 Timothy 3:2; Titus 1:6; Matthew 8:14" },
        { source: "Trullo (692), canon 13" },
        { source: "Lateran I (1123), canon 21; Lateran II (1139), canon 7" },
      ],
    },
  ],
};

export const scholasticism: Topic = {
  id: "scholasticism",
  title: "Scholasticism — Patristic Mind vs. Aristotelian System",
  summary: "The 12th-13th-century Western theological method, peaking in Aquinas's Summa, that organized doctrine around Aristotelian categories. Orthodox theology has remained anchored in the patristic apophatic and liturgical mind.",
  learningObjectives: ["Note the contrast in theological method.", "Cite Lossky."],
  primarySources: ["Aquinas, Summa Theologiae", "Lossky, Mystical Theology of the Eastern Church"],
  items: [
    {
      id: "rcc-sch-001",
      kind: "qa",
      difficulty: 4,
      tags: ["scholasticism", "lossky"],
      prompt: "What is the fundamental difference between scholastic and patristic theological method?",
      expectedAnswer: "Scholasticism (Anselm, Aquinas, the universities) seeks to articulate Christian doctrine as a coherent rational system, often using Aristotelian categories (substance/accidents, essence/existence, the four causes). It produces summae — encyclopedic syntheses. Patristic theology, by contrast, is more apophatic, doxological, and homiletic. It is anchored in the liturgy and in spiritual experience; it works by paradox where reason reaches its limits ('without confusion, without change'). Lossky: theology cannot be separated from prayer. Both methods have value, but the Orthodox East has consistently resisted reducing the Mystery to a system.",
      citations: [
        { source: "Vladimir Lossky, The Mystical Theology of the Eastern Church (1944)" },
        { source: "Evagrius Ponticus, Chapters on Prayer 60: 'If you are a theologian, you will pray truly; if you pray truly, you are a theologian.'" },
      ],
    },
  ],
};

export const transubstantiation: Topic = {
  id: "transubstantiation",
  title: "Transubstantiation",
  summary: "The Latin scholastic doctrine (Lateran IV 1215; Trent 1551) that in the Eucharist the 'substance' of bread and wine is changed to the substance of Christ's body and blood, while the 'accidents' (taste, appearance) remain. The Orthodox confess the Real Presence but reject the Aristotelian framework.",
  learningObjectives: ["Distinguish Orthodox metabole from Latin transubstantiatio.", "Cite Confession of Dositheus."],
  primarySources: ["Lateran IV (1215); Trent (1551), Session 13", "Confession of Dositheus (1672), Decree 17"],
  items: [
    {
      id: "rcc-tran-001",
      kind: "qa",
      difficulty: 4,
      tags: ["eucharist", "metabole"],
      prompt: "How does the Orthodox confession of Eucharistic change (metabole) differ from Roman transubstantiation?",
      expectedAnswer: "Both confess the Real Presence — that after the consecration the bread and wine ARE truly Christ's Body and Blood. The Orthodox use the patristic Greek metabole (change, transformation) and prefer not to specify the metaphysical mechanism. The Latin doctrine of transubstantiation defines the change using Aristotelian categories: the 'substance' changes while the 'accidents' remain. The Orthodox accept the Real Presence as a Mystery, refusing to dissect it with Greek philosophical scaffolding the Fathers did not use. The Confession of Dositheus (1672, Decree 17) affirms metabole and uses the word 'transubstantiation' (metousiōsis) in a non-Aristotelian sense — to insist on the reality of the change against Calvinizing tendencies, not to adopt the Latin framework.",
      citations: [
        { source: "Confession of Dositheus (1672), Decree 17" },
        { source: "John of Damascus, Exact Exposition IV.13" },
      ],
    },
  ],
};

export const papalUniversalJurisdiction: Topic = {
  id: "universal-jurisdiction",
  title: "Universal Jurisdiction",
  summary: "Vatican I's claim that the Pope has direct, ordinary, immediate, episcopal jurisdiction over every diocese on earth. The Orthodox: each bishop is the head of his diocese; the Pope is first among equals.",
  learningObjectives: ["Quote Pastor Aeternus.", "Cite the conciliar canon 28 of Chalcedon."],
  primarySources: ["Vatican I, Pastor Aeternus (1870), Chs. 3-4", "Chalcedon, canon 28"],
  items: [
    {
      id: "rcc-uj-001",
      kind: "debate",
      difficulty: 5,
      tags: ["papal-jurisdiction"],
      opponentTradition: "RCC",
      opponentClaim: "The Pope holds 'full and supreme power of jurisdiction over the universal Church,' a power which is 'ordinary and immediate' over every diocese and every member of the faithful (Pastor Aeternus, 1870).",
      orthodoxRebuttal: "Vatican I's claim has no warrant in the first-millennium Church. (1) Each ancient apostolic see (Rome, Constantinople, Alexandria, Antioch, Jerusalem) governed its own province under its own primate. The Pope did not consecrate bishops outside his patriarchate, did not collect taxes from other sees, did not depose bishops in other patriarchates — these are all features of 'ordinary and immediate' jurisdiction missing from the first millennium. (2) The first seven Ecumenical Councils were convoked by emperors, not Popes. The Pope sent legates and confirmed decisions, but did not preside ex cathedra over the conciliar process. (3) Canon 28 of Chalcedon (451) declares Constantinople has 'equal privileges' (isa presbeia) with Rome on account of equal political dignity — incompatible with Vatican I's monarchy. The Roman legates protested canon 28 unsuccessfully. (4) The Orthodox doctrine, articulated in the encyclical of the Eastern Patriarchs (1848), is that the Holy Spirit guides the Church through the consensus of bishops in council, received by the whole Body. No single bishop holds ordinary universal jurisdiction.",
      citations: [
        { source: "Vatican I, Pastor Aeternus (1870), Chapter 3" },
        { source: "Chalcedon (451), canon 28" },
        { source: "Encyclical of the Eastern Patriarchs (1848)" },
      ],
    },
  ],
};

export const reunionAttempts: Topic = {
  id: "reunion-attempts",
  title: "Reunion Attempts — Lyon, Florence, Modern",
  summary: "The two great medieval reunion councils (Lyon II 1274, Florence 1438-9) both failed in reception by the Orthodox laity. Modern dialogues (Balamand 1993, Ravenna 2007) have produced limited theological convergence.",
  learningObjectives: ["Name the two failed medieval reunion councils.", "State the modern dialogue documents."],
  primarySources: ["Acts of Lyon II (1274); Florence (1438-9)", "Balamand Statement (1993); Ravenna Document (2007)"],
  items: [
    {
      id: "rcc-reu-001",
      kind: "qa",
      difficulty: 4,
      tags: ["lyon", "florence", "ravenna"],
      prompt: "Name the two medieval reunion councils and the principal Orthodox figure who refused union at Florence.",
      expectedAnswer: "Lyon II (1274) — under Emperor Michael VIII Palaiologos, who signed under crusader military pressure; rejected by the Orthodox population on his death. Florence (1438-9) — under Emperor John VIII Palaiologos, with the Byzantines hoping for Western aid against the Turks; signed by most Greek bishops but rejected by the laity on return. St. Mark of Ephesus alone among the Greek bishops refused to sign; his confessional courage became the reference point for Orthodox identity against Latin reunion on Latin terms.",
      citations: [
        { source: "Mark of Ephesus, Encyclical Letter (1440-41)" },
        { source: "Joseph Gill, The Council of Florence (1959) — for the historical narrative" },
      ],
    },
  ],
};

export const filioqueHistory: Topic = {
  id: "filioque-history",
  title: "Filioque — Historical Timeline",
  summary: "How and when the Latin addition to the Symbol spread.",
  learningObjectives: ["Date Toledo (589), Aachen (809), Rome's adoption (1014)."],
  primarySources: ["Mansi, Collectio Conciliorum"],
  items: [
    {
      id: "rcc-filh-001",
      kind: "chronology",
      difficulty: 4,
      tags: ["filioque", "timeline"],
      prompt: "Order these events in the spread of Filioque, earliest first.",
      choices: [
        { id: "a", text: "Third Council of Toledo (589) — local council adds Filioque against Visigothic Arianism" },
        { id: "b", text: "Council of Aachen (809) — Charlemagne pushes Filioque universally in Frankish use" },
        { id: "c", text: "Photios's Mystagogy and the Photian Council (879-880) — Eastern repudiation" },
        { id: "d", text: "Pope Benedict VIII chants Filioque in the Roman Mass (1014)" },
      ],
      correctOrder: ["a", "b", "c", "d"],
      citations: [
        { source: "Toledo III (589); Aachen (809); Constantinople 879-880; Roman adoption 1014" },
      ],
    },
  ],
};

export const ecclesiologyRome: Topic = {
  id: "ecclesiology-rome",
  title: "Roman vs. Orthodox Ecclesiology",
  summary: "Two ecclesiologies: monarchical (the universal Church gathered around the Pope) vs. eucharistic-conciliar (the universal Church is each local Church in communion with all others around its bishop).",
  learningObjectives: ["State the eucharistic ecclesiology of the East.", "Cite Afanasiev, Zizioulas."],
  primarySources: ["Afanasiev, The Church of the Holy Spirit", "Zizioulas, Being as Communion"],
  items: [
    {
      id: "rcc-eccl-001",
      kind: "qa",
      difficulty: 4,
      tags: ["ecclesiology", "eucharistic-ecclesiology"],
      prompt: "What is 'eucharistic ecclesiology,' and who is its principal modern Orthodox theologian?",
      expectedAnswer: "Eucharistic ecclesiology, articulated principally by Fr. Nicholas Afanasiev (1893-1966) and developed by Met. John Zizioulas, holds that the local Church gathered around its bishop in the celebration of the Eucharist IS the Church in its fullness — not a 'part' of a larger universal organization. The universal Church is not above the local; it is the communion of all local Churches confessing the same faith. This contrasts with Roman 'universal ecclesiology' where the local is a delegated subunit of the universal monarchy.",
      citations: [
        { source: "Nicholas Afanasiev, The Church of the Holy Spirit (1971)" },
        { source: "John Zizioulas, Being as Communion (1985)" },
      ],
    },
  ],
};
