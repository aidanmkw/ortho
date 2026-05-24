import type { Topic } from "@/lib/types";

export const apostolicEra: Topic = {
  id: "apostolic-era",
  title: "The Apostolic Era",
  summary:
    "From Pentecost to the death of the last Apostle. The geographic explosion of the Gospel, the Jerusalem Council, and the apostolic foundations of the Church.",
  learningObjectives: [
    "Locate each Apostle's principal mission field and traditional place of martyrdom.",
    "Recite the decision of the Jerusalem Council (Acts 15) verbatim or in summary.",
    "Name the first bishop of Jerusalem and his manner of death.",
    "Trace the spread of the Gospel from Jerusalem to Rome by AD 64.",
  ],
  primarySources: [
    "Acts of the Apostles",
    "Eusebius, Ecclesiastical History, Books I–III",
    "Hegesippus, fragments preserved in Eusebius",
    "Origen, Commentary on Genesis (in Eusebius EH 3.1)",
  ],
  items: [
    {
      id: "ae-001",
      kind: "mcq",
      difficulty: 1,
      tags: ["pentecost", "acts"],
      prompt: "Where did the Apostles first receive the gift of the Holy Spirit?",
      choices: [
        { id: "a", text: "Jerusalem, in the upper room", rationale: "Correct. Acts 2:1–4." },
        { id: "b", text: "Galilee, on the mountain of the commission" },
        { id: "c", text: "Antioch, where they were first called Christians" },
        { id: "d", text: "Bethany, at the Ascension" },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Acts 2:1–4", scripture: "Acts 2:1–4" }],
    },
    {
      id: "ae-002",
      kind: "qa",
      difficulty: 2,
      tags: ["apostles", "geography"],
      prompt:
        "Which Apostle is traditionally said to have preached in Scythia and along the Black Sea coast, founding the See of Byzantium?",
      expectedAnswer:
        "St. Andrew the First-Called (Prōtoklētos), brother of Peter. He is the patronal Apostle of Constantinople, Russia, Romania, Scotland, and Greece.",
      citations: [
        {
          source:
            "Eusebius, Ecclesiastical History 3.1.1 (citing Origen, Commentary on Genesis Bk. 3)",
          quote:
            "Thomas... received Parthia as his allotted region; Andrew received Scythia, and John, Asia, where after his continuance there he died at Ephesus.",
        },
      ],
    },
    {
      id: "ae-003",
      kind: "mcq",
      difficulty: 2,
      tags: ["apostles", "jerusalem"],
      prompt: "Who served as the first bishop of Jerusalem?",
      choices: [
        { id: "a", text: "Peter" },
        { id: "b", text: "James the brother of the Lord", rationale: "Correct. Hegesippus and Clement of Alexandria both witness this. Eusebius EH 2.1.2–3." },
        { id: "c", text: "John the Theologian" },
        { id: "d", text: "Matthias" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source: "Eusebius, Ecclesiastical History 2.1.2–3, citing Hegesippus",
          quote:
            "James, the brother of the Lord, who, as there were many of this name, was surnamed the Just by all... received the government of the church with the apostles.",
        },
        { source: "Galatians 1:19; Acts 15:13–21; Acts 21:18" },
      ],
    },
    {
      id: "ae-004",
      kind: "chronology",
      difficulty: 3,
      tags: ["apostles", "timeline"],
      prompt:
        "Place the following events in chronological order, earliest first.",
      choices: [
        { id: "a", text: "Pentecost (Acts 2)" },
        { id: "b", text: "Martyrdom of James, son of Zebedee (Acts 12:2)" },
        { id: "c", text: "Apostolic Council of Jerusalem (Acts 15)" },
        { id: "d", text: "Martyrdom of James the Just, bishop of Jerusalem" },
      ],
      correctOrder: ["a", "b", "c", "d"],
      citations: [
        { source: "Acts 2 (~AD 30); Acts 12:2 (~AD 44); Acts 15 (~AD 49–50)" },
        {
          source:
            "Eusebius EH 2.23, citing Hegesippus and Josephus — martyrdom of James the Just c. AD 62",
        },
      ],
    },
    {
      id: "ae-005",
      kind: "debate",
      difficulty: 4,
      tags: ["ecclesiology", "succession"],
      opponentTradition: "Reformed",
      opponentClaim:
        "The Apostles never set up a hierarchical Church. The New Testament shows only autonomous congregations led by elders chosen by the people. Episcopal hierarchy was a later corruption.",
      orthodoxRebuttal:
        "Hierarchy is built into the apostolic mission itself. Acts 14:23 says Paul and Barnabas 'appointed presbyters in every church.' Titus 1:5 commands Titus to 'appoint presbyters in every city as I directed thee.' 1 Timothy 4:14 and 2 Timothy 1:6 describe ordination by the laying on of hands. Acts 15 documents a conciliar decision binding on all Gentile churches. By the close of the first century, St. Clement of Rome (~96) describes the Apostles' explicit foresight that disputes would arise about the episcopate and so they appointed bishops 'and afterwards gave instructions, that when these should fall asleep, other approved men should succeed to their ministry' (1 Clem 44:2). By ~107, St. Ignatius of Antioch can write to seven cities of Asia Minor presupposing a single bishop, a college of presbyters, and deacons in every one. Either the corruption was universal within ten years of the last Apostle — which is historically incredible — or the hierarchy is apostolic.",
      rejoinders: [
        {
          objection:
            "Ignatius's letters could be later forgeries puffing up bishops.",
          reply:
            "The middle recension (seven letters) is dated to ~107 by overwhelming scholarly consensus including Lightfoot, Schoedel, and modern critical editions. Polycarp of Smyrna's own letter, written soon after Ignatius's martyrdom, presupposes them as genuine.",
        },
        {
          objection:
            "In the Pauline epistles, 'episkopos' and 'presbyteros' are the same office.",
          reply:
            "In the New Testament they overlap because the three-fold ministry was crystallizing. By 1 Clement and Ignatius — both within the apostolic generation's living memory — the distinction is everywhere assumed. The Church is the interpretive community of her own apostolic deposit.",
        },
      ],
      citations: [
        { source: "Acts 14:23", scripture: "Acts 14:23" },
        { source: "Titus 1:5", scripture: "Titus 1:5" },
        { source: "1 Timothy 4:14; 2 Timothy 1:6" },
        {
          source: "St. Clement of Rome, 1 Clement 42:1–44:2 (~AD 96)",
          quote:
            "Our Apostles also knew, through our Lord Jesus Christ, that there would be strife on account of the office of the episcopate. For this reason, therefore, inasmuch as they had obtained a perfect foreknowledge of this, they appointed those who have already been mentioned, and afterwards gave instructions, that when these should fall asleep, other approved men should succeed to their ministry.",
        },
        {
          source: "St. Ignatius of Antioch, Magnesians 6:1 (~AD 107)",
          quote:
            "Your bishop presides in the place of God, and your presbyters in the place of the assembly of the apostles, along with your deacons.",
        },
      ],
    },
    {
      id: "ae-006",
      kind: "identify-source",
      difficulty: 3,
      tags: ["ignatius", "ecclesiology"],
      prompt:
        "Identify the author and work of this quotation: 'Wheresoever the bishop shall appear, there let the multitude be; even as wheresoever Jesus Christ is, there is the Catholic Church.'",
      choices: [
        { id: "a", text: "Clement of Rome, 1 Clement" },
        { id: "b", text: "Polycarp, Letter to the Philippians" },
        {
          id: "c",
          text: "Ignatius of Antioch, Letter to the Smyrnaeans 8:2",
          rationale:
            "Correct. The earliest extant use of the word 'Catholic' for the Church (~AD 107).",
        },
        { id: "d", text: "Didache" },
      ],
      correctChoiceId: "c",
      citations: [
        {
          source: "St. Ignatius of Antioch, Smyrnaeans 8:2 (~AD 107)",
          quote:
            "Wheresoever the bishop shall appear, there let the multitude be; even as wheresoever Jesus Christ is, there is the Catholic Church.",
        },
      ],
    },
    {
      id: "ae-007",
      kind: "qa",
      difficulty: 2,
      tags: ["jerusalem-council", "acts-15"],
      prompt:
        "What four prohibitions did the Apostolic Council of Jerusalem (Acts 15) impose on Gentile converts?",
      expectedAnswer:
        "(1) abstinence from things sacrificed to idols, (2) from blood, (3) from things strangled, and (4) from fornication.",
      citations: [
        {
          source: "Acts 15:28–29",
          scripture: "Acts 15:28–29",
          quote:
            "It seemed good to the Holy Spirit, and to us, to lay upon you no greater burden than these necessary things: that ye abstain from meats offered to idols, and from blood, and from things strangled, and from fornication.",
        },
      ],
    },
    {
      id: "ae-008",
      kind: "mcq",
      difficulty: 2,
      tags: ["peter", "martyrdom"],
      prompt:
        "According to the earliest tradition, in what manner was St. Peter put to death?",
      choices: [
        {
          id: "a",
          text: "Beheaded outside Rome",
          rationale: "This is the tradition for Paul, not Peter.",
        },
        {
          id: "b",
          text: "Crucified upside-down, at his own request",
          rationale:
            "Correct. Origen records the tradition; Eusebius preserves it.",
        },
        { id: "c", text: "Stoned at Jerusalem" },
        { id: "d", text: "Flayed alive in Babylon" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source:
            "Eusebius, Ecclesiastical History 3.1.2 (quoting Origen, Commentary on Genesis Bk. 3)",
          quote:
            "Peter appears to have preached through Pontus, Galatia, Bithynia, Cappadocia, and Asia, to the Jews of the dispersion. And at last, having come to Rome, he was crucified head-downwards; for he had requested that he might suffer in this way.",
        },
      ],
    },
  ],
};
