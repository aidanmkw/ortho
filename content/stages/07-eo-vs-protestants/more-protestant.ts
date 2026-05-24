import type { Topic } from "@/lib/types";

export const eternalSecurity: Topic = {
  id: "eternal-security",
  title: "Once Saved, Always Saved",
  summary:
    "The doctrine — popular in many Baptist, Reformed, and non-denominational quarters — that the genuinely saved cannot lose salvation. Refuted by the patristic and Pauline teaching on perseverance and falling away.",
  learningObjectives: [
    "Quote the Pauline warnings on falling.",
    "Distinguish synergy from semi-Pelagianism.",
  ],
  primarySources: [
    "Hebrews 6:4–6; 10:26–31",
    "1 Corinthians 9:27 — Paul disciplines himself 'lest I be a castaway'",
    "St. John Chrysostom, Homilies on Hebrews",
  ],
  items: [
    {
      id: "prot-os-001",
      kind: "debate",
      difficulty: 4,
      tags: ["osas", "perseverance", "baptist", "reformed"],
      opponentTradition: "Baptist",
      opponentClaim:
        "Once saved, always saved. A truly born-again Christian cannot lose his salvation. John 10:28: 'I give unto them eternal life; and they shall never perish, neither shall any man pluck them out of my hand.'",
      orthodoxRebuttal:
        "John 10:28 is precious — but it is the Father's promise that no enemy can SNATCH the sheep away. It does not say the sheep cannot wander off. Two chapters earlier, the same Lord warned: 'If a man abide not in me, he is cast forth as a branch, and is withered; and men gather them, and cast them into the fire' (Jn 15:6). St. Paul, who calls himself an Apostle and an heir of eternal life, writes that he buffets his body 'lest, that by any means, when I have preached to others, I myself should be a castaway' (1 Cor 9:27). Hebrews 6:4–6 describes those who 'were once enlightened, and have tasted of the heavenly gift, and were made partakers of the Holy Ghost, and have tasted the good word of God, and the powers of the world to come' — and yet fall away. Hebrews 10:26 — 'For if we sin wilfully after that we have received the knowledge of the truth, there remaineth no more sacrifice for sins, but a certain fearful looking for of judgment.' Galatians 5:4 — 'Christ is become of no effect unto you, whosoever of you are justified by the law; ye are fallen from grace.' Salvation is not a moment in the past; it is a life of synergy — being saved (1 Cor 1:18), and working out our salvation (Phil 2:12) until we stand at last with Christ.",
      rejoinders: [
        {
          objection: "Then I can never have assurance.",
          reply:
            "You can have hope and confidence — in Christ, not in yourself. The Orthodox confession is one of synergy: God is faithful, and we cooperate by repentance, sacrament, prayer, and works of love. Our assurance is the same as St. Paul's: 'I am persuaded that he is able to keep that which I have committed unto him against that day' (2 Tim 1:12). We trust God's faithfulness, while we never presume on our own state.",
        },
      ],
      citations: [
        {
          source: "Hebrews 6:4–6",
          quote:
            "For it is impossible for those who were once enlightened, and have tasted of the heavenly gift, and were made partakers of the Holy Ghost... if they shall fall away, to renew them again unto repentance.",
        },
        {
          source: "1 Corinthians 9:27",
          quote:
            "I keep under my body, and bring it into subjection: lest that by any means, when I have preached to others, I myself should be a castaway.",
        },
        { source: "John 15:6; Galatians 5:4; Philippians 2:12; Hebrews 10:26" },
      ],
    },
  ],
};

export const investedJudgment: Topic = {
  id: "sda",
  title: "Seventh-day Adventism",
  summary:
    "Ellen G. White, the Investigative Judgment (1844), Saturday Sabbatarianism, soul-sleep, conditional immortality. Refuted by patristic Sunday observance, the rich man and Lazarus, and the visible Church.",
  learningObjectives: [
    "Refute Saturday-only Sabbath observance from patristic Sunday assembly.",
    "Quote Lk 16:19–31 against soul-sleep.",
    "Note Ellen White's prophetic claims and their inconsistencies.",
  ],
  primarySources: [
    "Ellen G. White, The Great Controversy",
    "Seventh-day Adventist Fundamental Beliefs",
    "St. Ignatius, Magnesians 9 (against sabbatizing)",
  ],
  items: [
    {
      id: "prot-sda-001",
      kind: "debate",
      difficulty: 3,
      tags: ["sabbath", "sunday"],
      opponentTradition: "SDA",
      opponentClaim:
        "Saturday is the Sabbath, the seventh day, set apart at creation. Sunday observance was a 4th-century Roman innovation by Constantine. True Christians keep the Sabbath.",
      orthodoxRebuttal:
        "Sunday observance is not a 4th-century innovation; it is apostolic. Acts 20:7 — 'on the first day of the week, when the disciples came together to break bread.' 1 Cor 16:2 — 'upon the first day of the week.' Rev 1:10 — 'I was in the Spirit on the Lord's Day' (Greek: kyriakē hēmera, the technical term for Sunday). Within 75 years of the Apostles, St. Ignatius (~AD 107) writes: 'Those who lived in the ancient order have come to the possession of a new hope, no longer observing the Sabbath, but living in the observance of the Lord's Day, on which also our life sprang up again by Him and by His death' (Magnesians 9:1). The Didache (8:1) prescribes Christian fasts distinct from the Pharisaic Mon/Thu. The Epistle of Barnabas (15) likewise. Pliny the Younger (~AD 112) describes Christians meeting on a 'fixed day' before dawn — the Sunday, not the Sabbath. Constantine, in 321, simply made Sunday a civil holiday for an already universal Christian observance — he did not invent it. The Church kept the spiritual reality of the Sabbath (rest in Christ) on the day of the Resurrection from the apostolic generation forward.",
      citations: [
        { source: "Acts 20:7; 1 Cor 16:2; Revelation 1:10" },
        {
          source: "St. Ignatius, Magnesians 9:1 (~AD 107)",
          quote:
            "No longer observing the Sabbath, but living in the observance of the Lord's Day, on which also our life sprang up again.",
        },
        { source: "Didache 14:1; Epistle of Barnabas 15" },
        { source: "Justin Martyr, First Apology 67" },
      ],
    },
  ],
};

export const jwTrinity: Topic = {
  id: "jw-trinity",
  title: "Jehovah's Witnesses (Modern Arianism)",
  summary:
    "The Watchtower's denial of the Trinity, of Christ's divinity, and of the personhood of the Holy Spirit. The New World Translation's rendering of John 1:1 ('a god') and 1914 chronology.",
  learningObjectives: [
    "Refute the NWT rendering of John 1:1.",
    "Quote Colwell's rule in summary.",
    "Note 1914 and its failed predictions.",
  ],
  primarySources: [
    "Watchtower, New World Translation (1950 onward)",
    "Watchtower, Should You Believe in the Trinity? (1989 pamphlet)",
    "Greek NT (Nestle-Aland)",
  ],
  items: [
    {
      id: "prot-jw-001",
      kind: "debate",
      difficulty: 4,
      tags: ["jw", "trinity", "john-1"],
      opponentTradition: "JW",
      opponentClaim:
        "John 1:1 says 'the Word was a god,' not 'the Word was God.' Theos without the article means 'a god.' The Word is a mighty god but not Almighty God.",
      orthodoxRebuttal:
        "The Greek says καὶ θεὸς ἦν ὁ λόγος (kai theos ēn ho logos). The order — theos comes first, without article, before the verb — is grammatically a predicate nominative. In Greek, when a predicate noun precedes the verb without the article, it is typically definite or qualitative, NOT indefinite (Colwell's rule, formalized in 1933, but observed by all Greek grammarians). The Word is GOD — fully — in qualitative essence. If John had wanted 'a god' indefinitely, he would have written ho logos ēn theos tis or used a different construction. Every Greek-Christian writer for 1,800 years read it correctly: Origen, Athanasius, Chrysostom, Cyril, Augustine (in Latin), Aquinas, Calvin. The Watchtower's 1950 New World Translation is the FIRST to render it 'a god' — and the translators concealed their identities, none of whom held credentials in classical Greek. Furthermore, the same Gospel: John 20:28 — Thomas confesses Jesus: 'My Lord and my God!' (ho kyrios mou kai ho theos mou — with the article!) and Christ does not rebuke him. Hebrews 1:8 — the Father says to the Son, 'Thy throne, O God, is forever and ever.' Titus 2:13 — 'the great God and our Saviour Jesus Christ.'",
      rejoinders: [
        {
          objection: "But Jesus said 'the Father is greater than I' (Jn 14:28).",
          reply:
            "He speaks according to His Incarnate humanity. In His divinity, He and the Father are one (Jn 10:30). The Council of Nicaea (325) confessed this against Arius — and Watchtower theology is essentially Arianism revived.",
        },
        {
          objection: "Jesus prayed to the Father. He can't be God.",
          reply:
            "He prayed according to His humanity — the same humanity in which He grew, hungered, slept, and died. As eternal Son He is fully God; as incarnate Son He is also fully man and prays to His Father.",
        },
      ],
      citations: [
        { source: "John 1:1 (Greek)" },
        { source: "John 20:28; Hebrews 1:8; Titus 2:13" },
        {
          source: "E.C. Colwell, 'A Definite Rule for the Use of the Article in the Greek New Testament,' JBL 52 (1933): 12–21",
        },
      ],
    },
  ],
};

export const wordOfFaith: Topic = {
  id: "word-of-faith",
  title: "Pentecostal / Word-of-Faith",
  summary:
    "Tongues as the necessary sign of Spirit baptism; healing on demand; the prosperity Gospel (Hagin, Copeland). Refuted by the Orthodox theology of the cross, asceticism, and synergy.",
  learningObjectives: [
    "Refute 'initial physical evidence' (tongues required).",
    "Confront the prosperity Gospel from the Beatitudes and the Cross.",
  ],
  primarySources: [
    "Assemblies of God, Statement of Fundamental Truths #7",
    "Kenneth Hagin, Believer's Authority",
    "St. John Chrysostom, Homilies on Lazarus (against wealth-Gospel)",
  ],
  items: [
    {
      id: "prot-pent-001",
      kind: "debate",
      difficulty: 4,
      tags: ["tongues", "spirit-baptism"],
      opponentTradition: "Pentecostal",
      opponentClaim:
        "Speaking in tongues is the initial physical evidence of being baptized in the Holy Spirit. If you haven't spoken in tongues, you haven't received the Spirit.",
      orthodoxRebuttal:
        "St. Paul explicitly contradicts this. 1 Cor 12:30 — 'Do all speak with tongues?' The implied answer is NO. Tongues was a gift given to some, not the test of having the Spirit. The fruit of the Spirit is named in Galatians 5:22–23: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control. THIS is the test the Lord Himself appoints (Mt 7:16: 'by their fruits ye shall know them'). At Pentecost, the tongues were intelligible foreign languages spoken for missionary purposes (Acts 2:6–11), not the ecstatic babbling of modern Pentecostal experience. The Orthodox doctrine of Spirit baptism: every baptized Christian is anointed with the Holy Spirit in Chrismation (the 'seal of the gift of the Holy Spirit') — 1 Jn 2:20, 27; 2 Cor 1:21–22. No second-blessing experience is required. Many of the greatest saints in history — Anthony, Basil, Chrysostom, Seraphim of Sarov — never reported speaking in tongues, and yet were Spirit-filled vessels.",
      citations: [
        {
          source: "1 Corinthians 12:30",
          quote:
            "Have all the gifts of healing? do all speak with tongues? do all interpret?",
        },
        {
          source: "Galatians 5:22–23",
          quote:
            "The fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance.",
        },
        {
          source: "Acts 2:6–11 — the languages of Pentecost are real human languages, recognized by their hearers.",
        },
      ],
    },
  ],
};

export const dispensationalism: Topic = {
  id: "dispensationalism",
  title: "Dispensationalism & End-Times Speculation",
  summary:
    "Darby, Scofield, the Rapture, the pre-tribulation timeline, Christian Zionism's reading of Romans 9–11. Foreign to the patristic mind.",
  learningObjectives: [
    "Note the 19th-century origin of dispensationalism.",
    "Cite 1 Th 4:17 in patristic exegesis vs. the 'secret rapture.'",
  ],
  primarySources: [
    "John Nelson Darby (1800–1882) and the Plymouth Brethren",
    "C.I. Scofield, Scofield Reference Bible (1909)",
    "Hal Lindsey, The Late, Great Planet Earth (1970)",
  ],
  items: [
    {
      id: "prot-disp-001",
      kind: "qa",
      difficulty: 3,
      tags: ["dispensationalism", "rapture"],
      prompt:
        "When did the dispensationalist 'secret rapture' doctrine arise, and is it found anywhere in patristic exegesis?",
      expectedAnswer:
        "It arose in the 1830s among the Plymouth Brethren, principally through John Nelson Darby (c. 1827–1830 onward), and was popularized by the Scofield Reference Bible (1909). It is found NOWHERE in the patristic tradition. The Fathers read 1 Th 4:17 ('caught up... to meet the Lord in the air') in the ancient Greek sense of 'apantēsis' — the meeting of dignitaries outside the city, after which they return TOGETHER into the city. The faithful meet Christ in the air to escort Him in His Second Coming — not to escape to heaven for seven years before a tribulation.",
      citations: [
        { source: "1 Thessalonians 4:17" },
        { source: "Chrysostom, Homilies on 1 Thessalonians" },
        { source: "Tertullian, On the Resurrection of the Dead 41" },
      ],
    },
  ],
};
