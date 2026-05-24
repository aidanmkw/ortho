import type { Stage } from "@/lib/types";
import {
  immaculateConception,
  azymes,
  indulgences,
  florence,
  augustineEast,
} from "./more-rcc";
import {
  vaticanII,
  marianDogmas,
  papalInfallibilityDeep,
} from "./even-more-rcc";

export const stage06: Stage = {
  id: "06-eo-vs-rcc",
  order: 6,
  title: "EO vs Roman Catholicism",
  subtitle: "Papacy, Filioque, purgatory, scholasticism",
  description:
    "The doctrinal divergences that have grown between Constantinople and Rome since the 9th century. Engage Rome at its best — the Catechism, Aquinas, Trent, Vatican I and II — and answer from the Fathers and Councils.",
  rank: "Priest",
  topics: [
    {
      id: "papal-supremacy",
      title: "Papal Supremacy & Infallibility",
      summary:
        "Vatican I (1870) defined the Pope's universal jurisdiction and infallibility. Orthodoxy confesses the Pope's ancient primacy of honor among equal patriarchs, with conciliar authority above any single see.",
      learningObjectives: [
        "State Pastor Aeternus's two definitions.",
        "Cite Honorius and other counter-examples.",
        "Defend the canon 28 of Chalcedon model of primacy among equals.",
      ],
      primarySources: [
        "Vatican I, Pastor Aeternus (1870)",
        "Canon 28 of Chalcedon (451)",
        "Acts of Constantinople III (681)",
        "Mark of Ephesus, writings against Florence (1438–9)",
      ],
      items: [
        {
          id: "rcc-pa-001",
          kind: "debate",
          difficulty: 5,
          tags: ["matthew-16", "petrine"],
          opponentTradition: "RCC",
          opponentClaim:
            "Matthew 16:18 makes Peter the rock and the foundation of the Church. The keys of the Kingdom were given to him personally and pass to his successors at Rome.",
          orthodoxRebuttal:
            "Two things must be said. (1) Patristic exegesis of Mt 16:18 is overwhelmingly that the 'rock' is Peter's CONFESSION ('thou art the Christ, the Son of the living God'), not Peter as person. Origen: 'If we too say, Thou art the Christ, the Son of the living God, then we also become a Peter — and to us also there might be said by the Word, Thou art Peter, etc. For a rock is every disciple of Christ' (Comm. on Matt XII.10–11). St. John Chrysostom on Mt 16: 'Upon this rock — that is, upon the faith of his confession' (Hom. 54 on Matt 1). Augustine, late in life, in his Retractations, explicitly says he no longer holds the personalist reading: 'Sometimes I have explained that this Peter, on whom Christ built His Church... and at other times that the rock is what Peter confessed' (Retract. I.21). The personalist reading is one option, never the universal one. (2) Even granting that Peter is the rock, the texts make him the rock of the WHOLE Church — not of Rome alone. Peter was bishop of Antioch first (Gal 2:11; tradition). If apostolic foundation founds an infallible primacy, Antioch would have it equally — and Antioch never did claim it. The whole episcopate inherits the keys (Mt 18:18 — given to all the disciples; Jn 20:23). The Petrine succession is exercised by every Orthodox bishop in his diocese, not by the Roman bishop alone. (3) Vatican I's claim of UNIVERSAL JURISDICTION is contradicted by canon 28 of Chalcedon, which gave Constantinople 'equal privileges' (isa presbeia) with Rome 'on account of equal political dignity.' The Pope was first AMONG equals, with privileges of honor and inter-jurisdictional appeal — not a universal monarch of bishops.",
          rejoinders: [
            {
              objection:
                "Without a single visible head, the Church fragments. Just look at the Orthodox jurisdictions.",
              reply:
                "The Orthodox Church is not fragmented in faith — every Orthodox jurisdiction confesses the same Symbol, the same seven Ecumenical Councils, the same liturgy and sacraments. Administrative-jurisdictional plurality is a different question. Conversely, Rome's 'visible head' has not prevented its own succession of contradictions — Vatican I, Vatican II, the multiple 'Roman' jurisdictions in Old Catholic, Anglican Use, and SSPX-style fragments.",
            },
            {
              objection: "But Peter is named first in all the apostle lists.",
              reply:
                "Yes — he is the 'first among equals' (prōtos), the spokesman of the Twelve. This is precisely the Orthodox understanding of primacy. The Pope of Rome was first among the five patriarchs (Rome, Constantinople, Alexandria, Antioch, Jerusalem) — until he claimed supremacy over them.",
            },
          ],
          citations: [
            {
              source: "Origen, Commentary on Matthew XII.10–11",
              quote:
                "If we too have said like Peter, Thou art the Christ, the Son of the living God, not as if flesh and blood revealed it to us, but by light from the Father in heaven shining in our heart, we become a Peter.",
            },
            {
              source: "St. John Chrysostom, Homily 54 on Matthew §3",
              quote:
                "Upon this rock — that is, upon the faith of the confession.",
            },
            {
              source: "St. Augustine, Retractations I.21",
              quote:
                "I have since most frequently so explained what was said by the Lord, 'Thou art Peter, and upon this rock I will build my Church,' that it should be understood as built upon Him whom Peter confessed.",
            },
            {
              source: "Canon 28 of Chalcedon (451)",
              quote:
                "Following in every way the decrees of the holy fathers... we also decree the same things regarding the privileges of the most holy Church of Constantinople, New Rome.",
            },
          ],
        },
      ],
    },
    {
      id: "purgatory",
      title: "Purgatory & Indulgences",
      summary:
        "The Latin doctrine of an interim state of purifying punishment for the saved, and the late-medieval system of indulgences drawing on a 'treasury of merits.' Refuted by St. Mark of Ephesus at Florence.",
      learningObjectives: [
        "Distinguish Orthodox eschatology from purgatorial doctrine.",
        "Cite Mark of Ephesus's First Homily on Purgatorial Fire.",
        "Address the medieval Western prooftexts (1 Cor 3:13–15; 2 Macc 12).",
      ],
      primarySources: [
        "St. Mark of Ephesus, First Homily on Purgatorial Fire (1438)",
        "Council of Florence (1438–9) — for the Latin position",
        "Council of Trent, Decree on Purgatory (1563)",
        "Confession of Dositheus (1672), Decree 18",
      ],
      items: [
        {
          id: "rcc-pur-001",
          kind: "debate",
          difficulty: 4,
          tags: ["eschatology", "intermediate-state"],
          opponentTradition: "RCC",
          opponentClaim:
            "1 Corinthians 3:13–15 teaches purgatory: the day will declare each man's work, and those whose works are burned will be saved 'as through fire' — a temporal purifying fire after death.",
          orthodoxRebuttal:
            "St. Mark of Ephesus's First Homily on Purgatorial Fire is the classic Orthodox answer. (1) The fire of 1 Cor 3 is the Day of the Lord — the eschatological judgment, not an intermediate state between particular and final judgment. (2) The patristic reading of this text varies — Origen, Chrysostom, Augustine all wrestle with it — but no Greek Father uses it to construct a third place of temporal purgation. (3) Orthodox eschatology confesses a real intermediate state where souls await the final judgment in a foretaste of joy or sorrow (the parable of Lazarus and the rich man, Lk 16:19–31; 2 Cor 5:8 'absent from the body, at home with the Lord'). The Church prays for the departed (Tertullian De Corona 3 — first reference) — but this is intercession, not the working off of temporal punishment. (4) The 16th-c. Latin system of indulgences quantifying purgatorial time, the 'Treasury of Merits,' and partial vs. plenary indulgences are foreign to the patristic mind. Mark refused to sign Florence on this point alone. The Synod of Jerusalem (1672, Confession of Dositheus, Decree 18) gives the conciliar Orthodox answer.",
          citations: [
            { source: "St. Mark of Ephesus, First Homily on Purgatorial Fire (1438)" },
            {
              source: "Confession of Dositheus (1672), Decree 18",
              quote:
                "We reject all the inventions of human reasoning concerning purgatorial fire... the souls of the departed are either at rest, or in tribulation, according as they have done.",
            },
            { source: "Luke 16:19–31; 2 Corinthians 5:8" },
          ],
        },
      ],
    },
    {
      id: "filioque-detailed",
      title: "Filioque (deep dive)",
      summary:
        "The Latin addition's origin, universalization, and refutation. The single article that, more than any other, divides the two communions.",
      learningObjectives: [
        "Distinguish ekporeusis from pempsis.",
        "Quote Photios's Mystagogy.",
        "Defend the conciliar prohibition (Ephesus, canon 7).",
      ],
      primarySources: [
        "St. Photios, Mystagogy of the Holy Spirit",
        "St. Mark of Ephesus, works against Florence",
        "Ephesus 431, canon 7",
        "Council of Florence (1438–9) decrees — for the Latin position",
      ],
      items: [
        {
          id: "rcc-fil-001",
          kind: "qa",
          difficulty: 3,
          tags: ["filioque", "creed"],
          prompt:
            "Where and when did the Filioque first become standard in the West, and when was it first chanted in the Mass at Rome itself?",
          expectedAnswer:
            "It appears in the local Council of Toledo (589, against Arian Visigoths) and spread through Frankish use under Charlemagne (Council of Aachen 809). It was first chanted in the Mass at Rome in 1014 under Pope Benedict VIII, at the request of the German Emperor Henry II — over four centuries after Constantinople I.",
          citations: [
            { source: "Mark of Ephesus, Capita Syllogistica" },
            { source: "Mansi, Collectio Conciliorum — Toledo, Aachen documents" },
          ],
        },
      ],
    },
    immaculateConception,
    azymes,
    indulgences,
    florence,
    augustineEast,
    vaticanII,
    marianDogmas,
    papalInfallibilityDeep,
  ],
};
