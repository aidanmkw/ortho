import type { Stage } from "@/lib/types";
import {
  eternalSecurity,
  investedJudgment,
  jwTrinity,
  wordOfFaith,
  dispensationalism,
} from "./more-protestant";
import { anglicanism, methodist } from "./even-more-prot";
import {
  reformedTulip,
  invisibleChurch,
  totalDepravity,
} from "./depth-prot";

export const stage07: Stage = {
  id: "07-eo-vs-protestants",
  order: 7,
  title: "EO vs Protestantism",
  subtitle: "Sola Scriptura, Sola Fide, and every major denomination",
  description:
    "The Reformation's five solas, the principal Protestant denominations from Lutheran to Pentecostal, and the most common Orthodox-versus-Protestant exchanges — answered from Scripture itself and the unbroken patristic mind.",
  rank: "Priest",
  topics: [
    {
      id: "sola-scriptura",
      title: "Sola Scriptura",
      summary:
        "The Reformation principle that Scripture alone is the rule of faith. Refuted from Scripture, from history, and from the unworkability of the position itself.",
      learningObjectives: [
        "Quote 2 Th 2:15 and 1 Tim 3:15.",
        "Show that the Church determined the canon of Scripture.",
        "Demonstrate the empirical failure of perspicuity.",
      ],
      primarySources: [
        "2 Thessalonians 2:15",
        "1 Timothy 3:15",
        "St. Vincent of Lérins, Commonitorium",
        "St. Irenaeus, Against Heresies III",
      ],
      items: [
        {
          id: "prot-ss-001",
          kind: "debate",
          difficulty: 5,
          tags: ["sola-scriptura"],
          opponentTradition: "Reformed",
          opponentClaim:
            "Scripture alone is the final authority for faith and practice (sola scriptura). All extra-biblical traditions are human inventions to be rejected.",
          orthodoxRebuttal:
            "Five answers. (1) Scripture does not teach sola scriptura. The most often-cited proof, 2 Tim 3:16, says Scripture is theopneustos (God-breathed) and 'profitable for teaching, for reproof, for correction, for training in righteousness' — but it does NOT say Scripture is the sole rule. Paul, who wrote that very letter, also wrote two chapters earlier: 'continue thou in the things which thou hast learned and hast been assured of, knowing of whom thou hast learned them' (2 Tim 3:14) — and in 2 Thessalonians 2:15: 'Therefore, brethren, stand fast, and hold the traditions which ye have been taught, whether by word, or our epistle.' Paradosis (tradition) — both oral and written — is the apostolic deposit. (2) Scripture cannot establish its own canon. Which 27 books are New Testament? Which 39 or 49 are Old Testament? The list is not given anywhere in Scripture. The Church discerned the canon over four centuries, by conciliar judgment (Carthage 397, Trullo 692). To use the canon is to depend on the Church's judgment about it. (3) Perspicuity has empirically failed. Thirty thousand-plus Protestant denominations divide irreconcilably over baptism, Eucharist, justification, predestination, eschatology, ordination of women, sexual ethics — and every faction reads the SAME Scripture. The principle does not produce unity. 2 Peter 3:16 already warns that the unlearned and unstable twist Scripture 'to their own destruction.' (4) The Church preceded the New Testament. The Apostles preached, taught, baptized, celebrated the Eucharist, and ordained successors for decades before a single Gospel was written. The Church is the matrix of Scripture, not its product. (5) St. Vincent of Lérins (5th c.) gives the patristic rule: 'In the Catholic Church itself, all possible care must be taken that we hold that faith which has been believed everywhere, always, by all' (Commonitorium 2.6) — the famous quod ubique, quod semper, quod ab omnibus. Scripture is interpreted within this consensus, not against it.",
          rejoinders: [
            {
              objection:
                "But the early Bereans 'examined the Scriptures daily to see whether these things were so' (Acts 17:11).",
              reply:
                "Yes — but the Scriptures they examined were the Old Testament, and the criterion was whether Paul's PREACHING (his oral apostolic tradition) was consistent with it. The Bereans had no New Testament. The text actually shows tradition being tested by, and confirmed in, Scripture — not Scripture standing alone.",
            },
            {
              objection: "The Reformers rejected only HUMAN tradition, not apostolic tradition.",
              reply:
                "If they could be persuaded that infant baptism, episcopal succession, the Real Presence, the Eucharistic sacrifice, and the perpetual virginity of the Theotokos are apostolic — documented in the writings of those who knew the Apostles — they would have to accept them. They rejected such testimonies precisely because they assumed sola scriptura at the outset. The argument is circular.",
            },
          ],
          citations: [
            {
              source: "2 Thessalonians 2:15",
              quote:
                "So then, brethren, stand fast, and hold the traditions which ye have been taught, whether by word, or our epistle.",
            },
            {
              source: "1 Timothy 3:15",
              quote:
                "...that thou mayest know how thou oughtest to behave thyself in the house of God, which is the church of the living God, the pillar and ground of the truth.",
            },
            {
              source: "St. Irenaeus, Against Heresies III.4.1",
              quote:
                "Suppose there arise a dispute relative to some important question among us, should we not have recourse to the most ancient Churches with which the Apostles held constant intercourse, and learn from them what is certain and clear in regard to the present question?",
            },
            {
              source: "St. Vincent of Lérins, Commonitorium 2.6",
              quote: "Quod ubique, quod semper, quod ab omnibus.",
            },
          ],
        },
      ],
    },
    {
      id: "sola-fide",
      title: "Sola Fide (Faith Alone)",
      summary:
        "The Reformation principle that justification is by faith alone, apart from works. Refuted by James 2 — and by the entire patristic teaching of synergy and theosis.",
      learningObjectives: [
        "Quote James 2:14–26 verbatim or in summary.",
        "Show the patristic teaching of synergeia.",
        "Contrast Reformed imputation with the Orthodox doctrine of real participation.",
      ],
      primarySources: [
        "James 2:14–26",
        "Matthew 25:31–46",
        "Romans 2:6–13",
        "St. John Chrysostom, Homilies on Romans, on James",
      ],
      items: [
        {
          id: "prot-sf-001",
          kind: "debate",
          difficulty: 5,
          tags: ["sola-fide", "james-2", "justification"],
          opponentTradition: "Lutheran",
          opponentClaim:
            "Justification is by faith alone. Works follow, but they do not justify. Romans 3:28 — 'a man is justified by faith apart from the works of the law.'",
          orthodoxRebuttal:
            "Three things. (1) The only place in Scripture where 'faith alone' (pistis monon) appears with 'justify' is James 2:24 — and it explicitly DENIES the formula: 'Ye see then how that BY WORKS a man is justified, and NOT BY FAITH ONLY.' Luther's own discomfort with James was so great that he wished to remove it from the canon and famously called it an 'epistle of straw' (Preface to the New Testament, 1522). (2) Paul's 'works of the law' (erga nomou) in Romans 3:28 is the technical phrase for circumcision, kosher laws, Sabbath observance — the ethnic Jewish boundary markers — not works of mercy and love. Paul himself, two chapters earlier, says God 'will render to every man according to his deeds... eternal life to them who by patient continuance in well-doing seek for glory and honour and immortality' (Rom 2:6–7). And the Lord at the Last Judgment (Mt 25) separates the sheep and goats by works of mercy — explicitly. The Pauline-Jacobean coherence is: faith without works is dead; works without faith are servile. Living faith works through love (Gal 5:6). (3) The patristic tradition is unanimous on synergy. St. John Chrysostom: 'For grace, though it be grace, saves the willing' (Hom. on Heb 12). 1 Cor 3:9 — 'we are God's fellow-workers' (synergoi). Phil 2:12–13 — 'work out your own salvation with fear and trembling; for it is God which worketh in you both to will and to work.' Orthodox justification is not a forensic-imputed verdict from outside but a real ontological participation in the life of Christ — theosis. The grain of truth in 'sola fide' is that faith is the gate; the error is that the new life of works of love is not a separable consequence but the very content of being saved.",
          rejoinders: [
            {
              objection:
                "But if works contribute, no one can be sure of salvation — the conscience cannot rest.",
              reply:
                "The Orthodox confession is that we rest in CHRIST, not in our works. Works of love are the fruit of being grafted into Christ; they prove the union but do not earn it. The Orthodox ascetic struggles his whole life to cooperate with grace, not because grace is insufficient, but because love must be lived to be real. Confidence rests not on having amassed enough merit but on being in the Church of Christ, partaking of His Body and Blood.",
            },
            {
              objection:
                "Romans 4: Abraham was justified by faith BEFORE he was circumcised.",
              reply:
                "Yes — and the same Abraham is in James 2:21 said to have been 'justified by works when he had offered Isaac his son upon the altar.' The two texts agree because they are speaking of the same reality from different angles: Abraham's faith was a living, working faith. Genesis 15 and Genesis 22 are not in conflict; they show one trajectory of faith made visible in obedience.",
            },
          ],
          citations: [
            {
              source: "James 2:24",
              quote:
                "Ye see then how that by works a man is justified, and not by faith only.",
            },
            {
              source: "Matthew 25:34–40",
              quote:
                "Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me.",
            },
            { source: "Romans 2:6–10; Galatians 5:6; Philippians 2:12–13" },
            {
              source: "St. John Chrysostom, Homilies on Romans 7 (on Rom 4)",
              quote:
                "Faith alone justifies — but not without love. For faith without love is the faith of demons (Jas 2:19); the faith that justifies is the faith that worketh by love.",
            },
          ],
        },
      ],
    },
    {
      id: "icons-vs-protestant",
      title: "Icons (against the iconoclast charge)",
      summary:
        "The Protestant charge of idolatry, and the patristic-incarnational answer.",
      learningObjectives: [
        "Quote Exodus 25 alongside the second commandment.",
        "Distinguish proskynesis from latreia.",
      ],
      primarySources: [
        "Exodus 20:4–5 with 25:18–22",
        "Numbers 21:8–9",
        "John of Damascus, On the Divine Images",
        "Definition of Nicaea II (787)",
      ],
      items: [
        {
          id: "prot-icn-001",
          kind: "qa",
          difficulty: 3,
          tags: ["icons"],
          prompt:
            "What two sets of biblical passages together show that the Second Commandment forbids only false-god images, not all sacred images?",
          expectedAnswer:
            "(a) Exodus 25:18–22 — God commands Moses to make cherubim of beaten gold above the Mercy Seat; and Exodus 26:31 — cherubim embroidered on the Tabernacle veil; (b) Numbers 21:8–9 — God commands Moses to make a bronze serpent for the healing of Israel, which Christ identifies as a type of Himself (Jn 3:14). Therefore the Second Commandment forbids worshipping CREATED THINGS AS GODS, not making sacred images at God's own command.",
          citations: [
            { source: "Exodus 20:4–5; 25:18–22; 26:31; Numbers 21:8–9; John 3:14" },
          ],
        },
      ],
    },
    {
      id: "denominational-tracks",
      title: "Per-Denomination Tracks (overview)",
      summary:
        "Lutheran, Reformed, Anglican, Methodist, Baptist, Pentecostal, Non-Denominational, SDA, JW — confessional documents, key claims, and Orthodox responses. (Each becomes its own deep track as content matures.)",
      learningObjectives: [
        "Match each denomination to its founding figure, century, and confessional document.",
        "Identify the chief point at which each diverges from the patristic mind.",
      ],
      primarySources: [
        "Book of Concord (Lutheran)",
        "Three Forms of Unity (Reformed)",
        "39 Articles (Anglican)",
        "Articles of Religion (Methodist)",
        "Baptist Faith & Message",
        "Assemblies of God Statement of Fundamental Truths",
        "Seventh-day Adventist Fundamental Beliefs",
        "JW: Watchtower's Insight on the Scriptures",
      ],
      items: [
        {
          id: "prot-den-001",
          kind: "mcq",
          difficulty: 3,
          tags: ["lutheran", "consubstantiation"],
          prompt:
            "Which Lutheran confessional document states 'the body and blood of Christ are truly and substantially present, and are truly distributed with those things that are seen, bread and wine, to those who receive the Sacrament'?",
          choices: [
            { id: "a", text: "Heidelberg Catechism" },
            { id: "b", text: "Augsburg Confession, Art. X", rationale: "Correct. (1530)" },
            { id: "c", text: "Westminster Confession" },
            { id: "d", text: "Anglican 39 Articles" },
          ],
          correctChoiceId: "b",
          citations: [
            {
              source: "Augsburg Confession (1530), Article X",
              quote:
                "Of the Supper of the Lord they teach that the body and blood of Christ are truly present and are distributed to those who eat in the Supper of the Lord.",
            },
          ],
        },
        {
          id: "prot-den-002",
          kind: "qa",
          difficulty: 3,
          tags: ["calvinism", "tulip"],
          prompt:
            "What are the five points of Calvinism (TULIP), and at which synod were they articulated against the Remonstrants?",
          expectedAnswer:
            "Total depravity, Unconditional election, Limited atonement, Irresistible grace, Perseverance of the saints. Articulated at the Synod of Dort (1618–1619) in response to the Arminian Remonstrance of 1610.",
          citations: [
            { source: "Canons of Dort (1619) — Five Articles Against the Remonstrants" },
          ],
        },
        {
          id: "prot-den-003",
          kind: "debate",
          difficulty: 4,
          tags: ["baptist", "baptism", "regeneration"],
          opponentTradition: "Baptist",
          opponentClaim:
            "Baptism is symbolic only — a public profession of faith by a believer. It has no salvific power and does not 'regenerate.'",
          orthodoxRebuttal:
            "The New Testament writers say the opposite repeatedly. Acts 2:38 — 'Repent and be baptized for the remission of sins.' Acts 22:16 — 'Arise, be baptized and wash away thy sins.' Romans 6:3–4 — baptized INTO Christ's death, buried with Him by baptism into death. Galatians 3:27 — 'as many of you as have been baptized into Christ have put on Christ.' Titus 3:5 — 'He saved us by the washing of regeneration and renewing of the Holy Ghost.' 1 Peter 3:21 — 'baptism doth now save us.' John 3:5 — 'except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.' The patristic witness is unanimous from the Didache forward: baptism is the new birth, the entrance into Christ, the seal of the Spirit. Justin Martyr (1 Apol 61) calls baptism 'regeneration' (anagennēsis) by name. The Zwinglian symbolic reading is a 16th-century innovation against eight centuries of consensus.",
          rejoinders: [
            {
              objection: "But the thief on the cross was saved without baptism.",
              reply:
                "He was — by the personal word of Christ on the cross. The Church has always confessed that God is not bound by His mysteries; He saves whom He wills, by whatever means He wills. But the ordinary means He gave US — His Church — is baptism. To make the extraordinary case the rule is to abolish the rule.",
            },
            {
              objection: "1 Cor 1:17 — 'Christ sent me NOT to baptize, but to preach the Gospel.'",
              reply:
                "Paul says this because of the partisanship at Corinth — some saying 'I am of Paul, I of Apollos.' Paul disclaims baptizing many at Corinth himself; he does NOT deny that baptism is necessary. He baptized Crispus, Gaius, and the household of Stephanas (1 Cor 1:14, 16). Every other Pauline text on baptism (Rom 6, Gal 3, Titus 3) makes it constitutive of salvation.",
            },
          ],
          citations: [
            { source: "Acts 2:38; 22:16; John 3:5; Rom 6:3–4; Gal 3:27; Titus 3:5; 1 Pet 3:21" },
            {
              source: "St. Justin Martyr, First Apology 61",
              quote:
                "Then they are brought by us where there is water, and are regenerated... For Christ also said, 'Unless ye be born again, ye shall not enter into the kingdom of heaven.'",
            },
          ],
        },
      ],
    },
    eternalSecurity,
    investedJudgment,
    jwTrinity,
    wordOfFaith,
    dispensationalism,
    anglicanism,
    methodist,
    reformedTulip,
    invisibleChurch,
    totalDepravity,
  ],
};
