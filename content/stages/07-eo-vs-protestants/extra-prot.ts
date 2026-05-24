import type { Topic } from "@/lib/types";

export const westminster: Topic = {
  id: "westminster",
  title: "The Westminster Confession",
  summary: "The principal English-language Reformed confessional document (1646), produced by the Westminster Assembly during the English Civil War. Adopted by Presbyterians, Congregationalists, and Reformed Baptists (with adaptations).",
  learningObjectives: ["Date Westminster.", "Identify its principal articles on Scripture, predestination, and the Sabbath."],
  primarySources: ["Westminster Confession of Faith (1646)"],
  items: [
    {
      id: "prot-west-001",
      kind: "qa",
      difficulty: 3,
      tags: ["westminster"],
      prompt: "What is the Westminster Confession's position on the Sabbath, and how does it differ from the Orthodox approach to Sunday?",
      expectedAnswer: "Westminster Chapter XXI.7-8 teaches the 'Christian Sabbath' — Sunday observed with strict cessation of all but works of necessity and mercy, including thoughts and speech (the 'Puritan Sabbath'). Orthodoxy keeps Sunday as the Lord's Day, the day of the Resurrection — a day of joyful Eucharistic gathering, NOT of Sabbatarian restrictions. The Orthodox attend Liturgy and then celebrate; Sabbatarianism imports the Old Testament Sabbath ethic onto Sunday, which the Fathers did not do (Magnesians 9; Didache 14).",
      citations: [
        { source: "Westminster Confession of Faith (1646), Ch. XXI.7-8" },
        { source: "Ignatius, Magnesians 9:1 (against sabbatizing)" },
      ],
    },
  ],
};

export const quakers: Topic = {
  id: "quakers",
  title: "Quakers (Religious Society of Friends)",
  summary: "Founded by George Fox (1624-1691) in 17th-century England. Reject all outward sacraments, ordained ministry, and creeds in favor of the 'inner light.'",
  learningObjectives: ["Identify Fox and the founding period.", "State the Quaker rejection of sacraments."],
  primarySources: ["George Fox, Journal", "Robert Barclay, Apology for the True Christian Divinity (1676)"],
  items: [
    {
      id: "prot-qk-001",
      kind: "qa",
      difficulty: 4,
      tags: ["quakers"],
      prompt: "Why do Quakers reject the outward sacraments, and how would an Orthodox respond?",
      expectedAnswer: "The Quaker position (Robert Barclay's Apology) is that all true worship is 'in spirit and in truth' (Jn 4:24) and outward sacraments belong to the legal-Old-Covenant era, displaced by the immediate work of the inner light. The Orthodox response: the Lord Himself instituted the sacraments — He commanded baptism (Mt 28:19) and the Eucharist (Lk 22:19; 1 Cor 11:24-26). The Apostles practiced them (Acts 2:38, 41). 'Spirit and truth' refers to true vs. counterfeit worship, not material vs. spiritual. The Incarnation forever validates the material as bearer of the spiritual — to flee the body and matter in worship is, finally, Gnostic.",
      citations: [
        { source: "Matthew 28:19; Luke 22:19; Acts 2:38, 41" },
        { source: "Robert Barclay, Apology for the True Christian Divinity (1676)" },
      ],
    },
  ],
};

export const newApostolicReformation: Topic = {
  id: "nar",
  title: "New Apostolic Reformation (NAR)",
  summary: "Late 20th- / 21st-century movement (C. Peter Wagner et al.) claiming a restored 'fivefold ministry' including modern apostles and prophets, often with strong charismatic and dominionist emphases.",
  learningObjectives: ["Identify NAR's apostle-prophet claim.", "Cite the Orthodox understanding of apostolic succession."],
  primarySources: ["C. Peter Wagner, Apostles Today (2006)"],
  items: [
    {
      id: "prot-nar-001",
      kind: "qa",
      difficulty: 4,
      tags: ["nar", "apostolic-restoration"],
      prompt: "What is the New Apostolic Reformation's claim about apostles, and how does Orthodoxy respond?",
      expectedAnswer: "NAR teaches that the offices of apostle and prophet have been restored to the present church in living individuals, who exercise governance, prophecy, and signs and wonders alongside or above pastors. The Orthodox confession: the Apostles are unique — eyewitnesses of the risen Christ chosen by Him before His Ascension (Acts 1:21-22; 1 Cor 15:5-9; Gal 1:1). Bishops are successors of the Apostles in pastoral office, not in immediate revelation. The role of prophecy in the NT shifts after the apostolic foundation (Eph 2:20 — the Church 'built upon the foundation of the apostles and prophets'). NAR's living apostles are a novelty without patristic precedent.",
      citations: [
        { source: "Acts 1:21-22; Ephesians 2:20; 1 Corinthians 15:5-9" },
        { source: "C. Peter Wagner, Apostles Today (2006) — for the comparison" },
      ],
    },
  ],
};

export const churchOfChrist: Topic = {
  id: "church-of-christ",
  title: "Churches of Christ (Stone-Campbell Restoration)",
  summary: "American Restoration Movement (early 19th c.): Barton Stone, Thomas and Alexander Campbell. Emphasis on Bible-only, weekly Lord's Supper, baptism by immersion for remission of sins, no instrumental music in worship, no denominations.",
  learningObjectives: ["Identify the Stone-Campbell origins.", "Note distinctives."],
  primarySources: ["Alexander Campbell, The Christian System (1839)"],
  items: [
    {
      id: "prot-coc-001",
      kind: "qa",
      difficulty: 3,
      tags: ["churches-of-christ"],
      prompt: "What is distinctive about Churches of Christ (Stone-Campbell movement), and where do they overlap with Orthodox practice?",
      expectedAnswer: "Distinctives: weekly Communion (every Sunday), baptism by full immersion for remission of sins (closer to Orthodox sacramental theology than most Protestants), a cappella worship (no instruments), congregational autonomy, rejection of denominationalism, claim to be 'the New Testament church.' Overlaps: weekly Eucharist, baptismal regeneration confession. Divergences: rejection of Tradition, of the apostolic succession, of the Trinity-as-confessed-in-Nicaea (some streams), of sacraments beyond baptism and Communion.",
      citations: [{ source: "Alexander Campbell, The Christian System (1839)" }],
    },
  ],
};

export const dispensationalismDeep: Topic = {
  id: "dispensationalism-deep",
  title: "Dispensationalism and Christian Zionism",
  summary: "The Darby-Scofield system divides salvation history into seven 'dispensations' and reads Romans 9-11 as predicting a future restoration of national Israel and a rebuilt temple with sacrifices. Christian Zionism (popular in many American Evangelical quarters) draws political conclusions from this reading.",
  learningObjectives: ["Note the seven dispensations.", "Contrast with patristic supersession."],
  primarySources: ["C.I. Scofield, Reference Bible (1909)"],
  items: [
    {
      id: "prot-disp-002",
      kind: "qa",
      difficulty: 4,
      tags: ["dispensationalism", "israel"],
      prompt: "How does dispensationalist eschatology differ from the patristic Orthodox reading of Romans 9-11?",
      expectedAnswer: "Dispensationalism reads Romans 11 ('all Israel shall be saved') as predicting the future political and religious restoration of national, ethnic Israel — rebuilt temple, restored animal sacrifices, etc. Patristic Orthodox reading: 'Israel' in Romans 9-11 refers to the FAITHFUL — Jewish believers in Christ together with grafted-in Gentiles (Rom 11:17-24) — which together form the Israel of God (Gal 6:16). The promises to Israel are fulfilled in the Church, the Body of Christ. The Cross of Christ once-for-all (Heb 10) makes a future restoration of animal sacrifices unthinkable — it would be a rejection of Christ's perfect sacrifice. The Orthodox love and pray for the Jewish people, hope for their salvation, but reject the dispensationalist political-theological scheme.",
      citations: [
        { source: "Romans 9-11; Galatians 6:16; Hebrews 10" },
        { source: "Chrysostom, Homilies on Romans" },
      ],
    },
  ],
};

export const oneness: Topic = {
  id: "oneness-pentecostal",
  title: "Oneness Pentecostalism / Modalism Revived",
  summary: "Modern 'Oneness' Pentecostal denominations (United Pentecostal Church International; Apostolic Church) teach that Jesus alone is the one God; Father, Son, and Holy Spirit are not three distinct hypostases but successive modes. Essentially a revival of Sabellian modalism. They baptize 'in the name of Jesus only,' not in the Trinitarian formula.",
  learningObjectives: ["Identify Oneness as Modalism revived.", "Cite Mt 28:19."],
  primarySources: ["David K. Bernard, The Oneness of God (1983)"],
  items: [
    {
      id: "prot-one-001",
      kind: "debate",
      difficulty: 4,
      tags: ["oneness", "modalism", "baptismal-formula"],
      opponentTradition: "Pentecostal",
      opponentClaim: "We baptize 'in the name of Jesus only' (Acts 2:38), not in the Trinitarian formula. Father, Son, and Spirit are titles of the one God who is Jesus.",
      orthodoxRebuttal: "Three answers. (1) Mt 28:19 — the Lord Himself COMMANDS: 'Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost.' The verse is unambiguous and triadic. (2) Acts 2:38 ('be baptized in the name of Jesus Christ') is shorthand for 'be baptized as Christians' / 'as those who confess Jesus.' Peter is contrasting Christian baptism with Jewish ritual washings. The Trinitarian content is the underlying form. (3) The patristic baptismal practice from the Didache (~AD 50-110) is unanimously triadic: 'baptize in the name of the Father, and of the Son, and of the Holy Spirit.' (Didache 7). The earliest Christian writings know nothing of Jesus-only baptism. Oneness Pentecostalism is a 1913-1916 American invention (Frank Ewart, Glenn Cook). It also collapses Father, Son, and Spirit into one Person — Sabellian modalism — already condemned in the 3rd century.",
      citations: [
        { source: "Matthew 28:19; Didache 7:1-3" },
        { source: "Tertullian, Against Praxeas (against modalism)" },
      ],
    },
  ],
};
