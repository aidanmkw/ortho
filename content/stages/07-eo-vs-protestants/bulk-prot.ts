import type { Topic } from "@/lib/types";

export const tongues: Topic = {
  id: "tongues-detail",
  title: "Tongues — Pentecost vs. Pentecostal Glossolalia",
  summary: "Acts 2 tongues were intelligible foreign languages; modern Pentecostal ecstatic speech is not. The patristic tradition recognizes charismatic gifts in the saints but never required tongues as the test of Spirit-reception.",
  learningObjectives: ["Cite Acts 2:6-11.", "Distinguish from later ecstatic utterance."],
  primarySources: ["Acts 2; 1 Corinthians 12-14", "John Chrysostom, Homilies on 1 Corinthians 29"],
  items: [
    {
      id: "prot-tong-001",
      kind: "qa",
      difficulty: 3,
      tags: ["tongues", "pentecost"],
      prompt: "Describe what 'tongues' meant at Pentecost (Acts 2) and how it differs from modern Pentecostal glossolalia.",
      expectedAnswer: "At Pentecost (Acts 2:4-11), the Apostles spoke 'other tongues' (heterais glōssais) that were immediately recognized by the hearers as their own native languages — Parthians, Medes, Elamites, residents of Mesopotamia, Judea, Cappadocia, Pontus, Asia, Phrygia, Pamphylia, Egypt, Libya, Rome, Crete, and Arabia. The miracle was intelligible-speech-by-divine-gift across language barriers, for the immediate missionary task. Modern Pentecostal glossolalia is, by self-description, ecstatic vocalization not corresponding to any human language. The two phenomena are not the same thing.",
      citations: [{ source: "Acts 2:4-11" }],
    },
  ],
};

export const calvinism5Points: Topic = {
  id: "calvin-5-points",
  title: "TULIP — Point by Point",
  summary: "Each of the five Calvinist points refuted from Scripture and patristic teaching.",
  learningObjectives: ["Refute each TULIP point with one biblical text and one patristic citation."],
  primarySources: ["Canons of Dort (1619)", "Westminster Confession (1646)"],
  items: [
    {
      id: "prot-cal-001",
      kind: "debate",
      difficulty: 5,
      tags: ["limited-atonement", "tulip"],
      opponentTradition: "Reformed",
      opponentClaim: "Limited atonement: Christ died only for the elect — not for all men. John 10:15 — 'I lay down my life for the sheep.' If He died for everyone, all would necessarily be saved.",
      orthodoxRebuttal: "Scripture flatly contradicts limited atonement. 1 Timothy 2:4-6 — God 'will have all men to be saved... who gave himself a ransom for all.' 1 John 2:2 — Christ 'is the propitiation for our sins; and not for ours only, but also for the sins of the WHOLE WORLD.' Hebrews 2:9 — Jesus 'should taste death for every man.' 2 Peter 3:9 — 'not willing that any should perish.' Titus 2:11 — 'the grace of God that bringeth salvation hath appeared to all men.' Christ's atonement is universally sufficient and intended; whether one is saved depends on synergistic response, not on whether the atonement extends to him. John 10:15 says Christ lays down His life for the sheep — true — but does not say He died ONLY for them. The 'for the sheep' is positive identification, not negative exclusion of all others. The patristic consensus: Christ died for all; not all are saved, because of free human refusal.",
      citations: [
        { source: "1 Timothy 2:4-6; 1 John 2:2; Hebrews 2:9; 2 Peter 3:9; Titus 2:11" },
        { source: "Confession of Dositheus (1672), Decree 3 — explicitly rejects limited atonement" },
      ],
    },
    {
      id: "prot-cal-002",
      kind: "debate",
      difficulty: 5,
      tags: ["irresistible-grace", "tulip"],
      opponentTradition: "Reformed",
      opponentClaim: "Irresistible grace: when God draws the elect, they CANNOT refuse. John 6:44 — 'No man can come to me, except the Father which hath sent me draw him.'",
      orthodoxRebuttal: "John 6:44 is true: no one can come without the Father's drawing. The error is in adding 'and the drawn cannot refuse.' Scripture documents grace being refused: Acts 7:51 — 'Ye stiffnecked... ye do always RESIST the Holy Spirit.' Matthew 23:37 — 'How often would I have gathered thy children together... and ye WOULD NOT!' Hebrews 10:29 — those who 'have done despite unto the Spirit of grace.' Jeremiah 7:13 — 'I spake unto you, rising up early and speaking, but ye heard not.' Grace is freely offered and powerfully effective, but it is also resistible by the gnomic will. The Orthodox doctrine is synergeia: God's grace and human freedom together work out salvation. To make grace irresistible is to reduce the human person to a puppet — the very opposite of the image of God created free.",
      citations: [
        { source: "Acts 7:51; Matthew 23:37; Hebrews 10:29; Jeremiah 7:13" },
        { source: "John Cassian, Conferences XIII" },
      ],
    },
  ],
};

export const onceSavedAlwaysSaved: Topic = {
  id: "perseverance",
  title: "Perseverance of the Saints",
  summary: "The fifth point of TULIP, and a different question from eternal security in general. The Reformed claim: the truly regenerate cannot lose salvation.",
  learningObjectives: ["State the Reformed P.", "Cite Hebrews 6 and 10 again with full context."],
  primarySources: ["Canons of Dort, Article V", "Hebrews 6:4-6; 10:26-31; 2 Peter 2:20-22"],
  items: [
    {
      id: "prot-pers-001",
      kind: "qa",
      difficulty: 4,
      tags: ["perseverance", "apostasy"],
      prompt: "Cite three New Testament texts on the possibility of falling away from a state of grace.",
      expectedAnswer: "(1) Hebrews 6:4-6 — those who were 'enlightened, tasted of the heavenly gift, and were made partakers of the Holy Ghost' can yet 'fall away.' (2) Hebrews 10:26-31 — 'if we sin wilfully after that we have received the knowledge of the truth, there remaineth no more sacrifice for sins.' (3) 2 Peter 2:20-22 — those who escaped the pollutions of the world through Christ are 'again entangled therein, and overcome'; their latter end is worse than the beginning. Galatians 5:4; 1 Tim 1:19-20; Revelation 2:5 all support the same.",
      citations: [
        { source: "Hebrews 6:4-6; 10:26-31; 2 Peter 2:20-22; Galatians 5:4; 1 Timothy 1:19-20" },
      ],
    },
  ],
};

export const saints: Topic = {
  id: "saints-intercession",
  title: "Intercession of the Saints",
  summary: "The Protestant rejection of asking saints to pray for us, answered from Scripture (Rev 5:8) and patristic practice.",
  learningObjectives: ["Cite Revelation 5:8.", "Quote Martyrdom of Polycarp on commemoration of martyrs."],
  primarySources: ["Revelation 5:8; 8:3-4", "Martyrdom of Polycarp 17-18"],
  items: [
    {
      id: "prot-sai-001",
      kind: "debate",
      difficulty: 4,
      tags: ["saints", "intercession"],
      opponentTradition: "Reformed",
      opponentClaim: "1 Timothy 2:5 — 'There is one mediator between God and men, the man Christ Jesus.' Praying to saints introduces additional mediators, contradicting the unique mediation of Christ.",
      orthodoxRebuttal: "1 Tim 2:5 affirms the unique SAVING mediation of Christ — He alone reconciles us to the Father through His blood. It does not forbid intercessory prayer. Indeed, two verses earlier (1 Tim 2:1) Paul commands believers to make 'supplications, prayers, intercessions, and giving of thanks, for all men.' We pray for one another — and this is not a 'second mediator' violating Christ's unique mediation. The saints, alive in Christ (Lk 20:38 — 'all live unto Him'), continue to pray for the Church. Revelation 5:8 — the twenty-four elders fall before the Lamb, having 'golden vials full of incense, which are the prayers of the saints.' Revelation 8:3-4 — the prayers of the saints rise before the altar in heaven. The communion of saints includes both the living and those who have fallen asleep in Christ, all in one Body. Polycarp's martyrs were commemorated annually 'with joy and gladness' (Martyrdom of Polycarp 18) — the practice is apostolic.",
      citations: [
        { source: "1 Timothy 2:1-5; Revelation 5:8; 8:3-4; Luke 20:38" },
        { source: "Martyrdom of Polycarp 18 (~AD 156)" },
      ],
    },
  ],
};

export const traditionContent: Topic = {
  id: "tradition-content",
  title: "What Tradition Contains",
  summary: "The capital-T Holy Tradition consists of: Scripture, Symbol of Faith, Ecumenical Councils, the Fathers, the canons, the liturgy, iconography, the lives of saints — not 'extra rules' but the living transmission of the Gospel itself.",
  learningObjectives: ["List the contents of Tradition.", "Cite 2 Th 2:15."],
  primarySources: ["2 Thessalonians 2:15", "Vincent of Lérins, Commonitorium"],
  items: [
    {
      id: "prot-tr-001",
      kind: "qa",
      difficulty: 3,
      tags: ["tradition"],
      prompt: "What does Holy Tradition (capital T) contain, in the Orthodox confession?",
      expectedAnswer: "Holy Tradition is the living transmission of the faith from the Apostles to the present. It contains: (1) Scripture itself (recognized BY the Church as canonical); (2) the Symbol of Faith (the Creed); (3) the dogmatic and canonical decisions of the seven Ecumenical Councils; (4) the writings of the Fathers in their consensus; (5) the apostolic canons and conciliar canons; (6) the liturgy and its hymnography; (7) iconography; (8) the lives of the saints and their teachings; (9) the inherited spiritual praxis (fasting, prayer rules, asceticism). Tradition is not a body of rules added to Scripture; it is the very mode in which the Church receives, interprets, and lives Scripture.",
      citations: [
        { source: "2 Thessalonians 2:15; 3:6" },
        { source: "Vincent of Lérins, Commonitorium" },
        { source: "Florovsky, 'The Function of Tradition in the Ancient Church'" },
      ],
    },
  ],
};

export const lutheranOrthodox: Topic = {
  id: "lutheran-correspondence",
  title: "Patriarch Jeremias II and the Lutherans (1573-1581)",
  summary: "The historic correspondence between Patriarch Jeremias II of Constantinople and the Tübingen Lutheran theologians, in which the Patriarch courteously but firmly explained why Orthodoxy could not accept the Augsburg Confession. The Lutherans broke off correspondence.",
  learningObjectives: ["Date the correspondence (1573-1581).", "Cite Jeremias's principal points."],
  primarySources: ["Acta et Scripta Theologorum Wirtembergensium et Patriarchae Constantinopolitani D. Hieremiae (1584)"],
  items: [
    {
      id: "prot-jer-001",
      kind: "qa",
      difficulty: 4,
      tags: ["lutheran", "jeremias"],
      prompt: "Who was Patriarch Jeremias II, and what historic correspondence did he conduct with the Lutherans?",
      expectedAnswer: "Jeremias II Tranos was Patriarch of Constantinople three times (1572-79; 1580-84; 1587-95). Tübingen Lutheran theologians (notably Jacob Andreae and Martin Crusius) sent him a Greek translation of the Augsburg Confession in 1573, hoping for recognition. Jeremias gave three carefully-argued responses (1576, 1579, 1581) explaining why Orthodoxy could not accept it — citing the patristic and conciliar tradition on free will, the sacraments, monasticism, the invocation of saints, fasting, the Septuagint canon, etc. After his third reply, he wrote: 'we beg you to trouble us no further on these matters... Go your own way, and write no more concerning dogmas; but if you do write, write only for friendship's sake.' The Lutherans broke off correspondence.",
      citations: [{ source: "Acta et Scripta Theologorum Wirtembergensium et Patriarchae Constantinopolitani (Wittenberg, 1584)" }],
    },
  ],
};
