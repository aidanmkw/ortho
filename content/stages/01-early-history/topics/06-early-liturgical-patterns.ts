import type { Topic } from "@/lib/types";

export const earlyLiturgicalPatterns: Topic = {
  id: "early-liturgical-patterns",
  title: "Early Liturgical Patterns",
  summary:
    "Sunday assembly, Wednesday and Friday fasts, Trinitarian baptism, eucharistic prayers, catacomb iconography, and prayer for the dead — already documented in the first three centuries.",
  learningObjectives: [
    "Reconstruct the Sunday assembly from Justin's First Apology 65–67.",
    "Date the universal observance of Sunday as the Lord's Day.",
    "Show that the Eucharist was understood as the real Body and Blood of Christ from the apostolic generation.",
    "Identify the earliest references to prayer for the dead and to intercession of saints.",
  ],
  primarySources: [
    "St. Justin Martyr, First Apology 61–67",
    "Didache 9–10, 14",
    "St. Hippolytus of Rome, Apostolic Tradition (early 3rd c.)",
    "Catacomb frescoes (Priscilla, Callixtus, Domitilla — Rome)",
    "Pliny, Epistles 10.96",
    "Acts of Perpetua and Felicity (intercession passage)",
  ],
  items: [
    {
      id: "elp-001",
      kind: "identify-source",
      difficulty: 3,
      tags: ["justin", "liturgy", "sunday"],
      prompt:
        "Identify the source of this description of Sunday worship: 'On the day called Sunday, all who live in cities or in the country gather together to one place, and the memoirs of the apostles or the writings of the prophets are read, as long as time permits...'",
      choices: [
        { id: "a", text: "Didache 9 (~AD 50-110) — eucharistic prayers from the apostolic generation.", rationale: "Wrong, but Didache 9 IS a real early text about the Eucharist. The Sunday-assembly DESCRIPTION above is Justin's 1 Apol 67." },
        { id: "b", text: "Pliny the Younger, Letter to Trajan (~AD 112) — describing Christian morning gatherings.", rationale: "Wrong, but Pliny's letter (Epistles 10.96) IS a real source about early Christian worship. The text quoted is Justin's." },
        {
          id: "c",
          text: "Justin Martyr, First Apology 67 (c. AD 155) — the earliest detailed Sunday Liturgy description.",
          rationale: "The classic patristic source on the order of the Sunday Eucharistic assembly.",
        },
        { id: "d", text: "Tertullian, Apologeticus 39 (~AD 197) — describing the agape feast and Christian charity.", rationale: "Wrong, but Tertullian's Apologeticus 39 IS a real source describing Christian assembly. The quote is Justin's." },
      ],
      correctChoiceId: "c",
      citations: [
        {
          source: "St. Justin Martyr, First Apology 67",
          quote:
            "On the day called Sunday, all who live in cities or in the country gather together to one place, and the memoirs of the apostles or the writings of the prophets are read... Then we all rise together and pray... bread is brought, and wine and water, and the president in like manner offers prayers and thanksgivings, according to his ability, and the people assent, saying Amen.",
        },
      ],
    },
    {
      id: "elp-002",
      kind: "mcq",
      difficulty: 2,
      tags: ["sunday", "lords-day"],
      prompt:
        "From the first century, on which day of the week did Christians meet for the Eucharist?",
      choices: [
        { id: "a", text: "The Sabbath (Saturday)" },
        {
          id: "b",
          text: "The Lord's Day (Sunday, the eighth day, the day of the Resurrection)",
          rationale:
            "Correct. Documented in Acts 20:7, 1 Cor 16:2, Rev 1:10, Didache 14, Ignatius Magnesians 9:1, Justin 1 Apol 67, Pliny Ep 10.96.",
        },
        { id: "c", text: "Both — Sabbath morning and Sunday evening" },
        { id: "d", text: "Wednesday" },
      ],
      correctChoiceId: "b",
      citations: [
        { source: "Acts 20:7; 1 Cor 16:2; Rev 1:10" },
        {
          source: "Didache 14:1",
          quote:
            "And on the Lord's Day of the Lord, gather together, break bread and give thanks, having first confessed your transgressions, that your sacrifice may be pure.",
        },
        {
          source: "St. Ignatius of Antioch, Magnesians 9:1",
          quote:
            "Those who were brought up in the ancient order of things have come to the possession of a new hope, no longer observing the Sabbath, but living in the observance of the Lord's Day, on which also our life sprang up again by Him and by His death.",
        },
      ],
    },
    {
      id: "elp-003",
      kind: "qa",
      difficulty: 4,
      tags: ["didache", "eucharist"],
      prompt:
        "What is the earliest known eucharistic prayer text, and approximately when was it written?",
      expectedAnswer:
        "Didache 9–10 (eucharistic prayers in two forms — cup, then bread; and a long thanksgiving after the meal). The Didache is usually dated c. AD 50–110 — overlapping the writing of the New Testament itself.",
      citations: [
        {
          source: "Didache 9–10",
          quote:
            "We thank Thee, our Father, for the holy vine of David, Thy servant, which Thou hast made known to us through Jesus, Thy servant... As this broken bread was scattered upon the mountains and was gathered together and became one, so let Thy Church be gathered together from the ends of the earth into Thy kingdom.",
        },
      ],
    },
    {
      id: "elp-004",
      kind: "debate",
      difficulty: 5,
      tags: ["eucharist", "real-presence", "baptist"],
      opponentTradition: "Baptist",
      opponentClaim:
        "The Lord's Supper in the early Church was simply a memorial meal. The idea that the bread and wine become the real Body and Blood of Christ is a later medieval development.",
      orthodoxRebuttal:
        "The realism is everywhere in the earliest writers, not in the medieval West only. St. Ignatius of Antioch (~AD 107) is explicit: 'They abstain from the Eucharist and from prayer, because they do not confess the Eucharist to be the flesh of our Saviour Jesus Christ, the flesh which suffered for our sins and which the Father in His goodness raised up again' (Smyrnaeans 7:1). St. Justin Martyr (~AD 155): 'Not as common bread and common drink do we receive these; but in like manner as Jesus Christ our Saviour, having been made flesh by the Word of God, had both flesh and blood for our salvation, so likewise we have been taught that the food which is blessed by the prayer of His word, and from which our blood and flesh by transmutation are nourished, is the flesh and blood of that Jesus who was made flesh' (1 Apol 66). St. Irenaeus, c. AD 180, against the Gnostics: 'He has acknowledged the cup, which is a part of creation, as His own blood, from which He bestows increase upon our blood; and the bread, also a part of creation, He has established as His own body, from which He gives increase to our bodies' (AH IV.18.5). St. Cyril of Jerusalem's Mystagogical Catecheses (4th c.) cannot be more direct: 'Do not, therefore, consider the bread and wine as simply that... Christ on a certain occasion discoursing with the Jews said, Except ye eat my flesh and drink my blood, ye have no life in you... Wherefore with full assurance let us partake as of the Body and Blood of Christ.' (Cat. Myst. IV.6, 9). There is no patristic dissent from this view, in any era, on any continent, from any school. The 16th-century Zwinglian symbolic reading is the innovation.",
      rejoinders: [
        {
          objection:
            "Jesus said 'Do this in remembrance of me' — that's clearly memorialism.",
          reply:
            "The Greek anamnesis (1 Cor 11:24) is not the modern English 'memory of a past event'; in Jewish-Hebraic usage (Lev 24:7; Num 10:10) it denotes a sacrificial bringing-into-present of the saving act. The Passover Haggadah commands 'In every generation a man is bound to look upon himself as if he himself had come out of Egypt' — not as if he were remembering it. The Eucharist is the anamnesis of the once-for-all Cross — its participatory making-present, not merely its recollection.",
        },
        {
          objection: "John 6 is spiritual; Jesus interprets it in v. 63 — 'the flesh profits nothing.'",
          reply:
            "v. 63 says 'the flesh' (sarx) — which everywhere in St. John (esp. Jn 3:6, 8:15) signifies the fallen, this-worldly mode of being. It does NOT undo 'my flesh' (he sarx mou) of v. 54. The disciples leave in v. 66 precisely because they cannot accept what He said — and Christ does not call them back to correct a misunderstanding. The first explicit John-6 exegesis in writing — Ignatius's letter to the Smyrnaeans — gives precisely the realist reading, twenty years after the Apostle's death.",
        },
      ],
      citations: [
        {
          source: "St. Ignatius of Antioch, Smyrnaeans 7:1 (~AD 107)",
          quote:
            "They abstain from the Eucharist and from prayer, because they confess not the Eucharist to be the flesh of our Saviour Jesus Christ.",
        },
        {
          source: "St. Justin Martyr, First Apology 66 (~AD 155)",
          quote:
            "Not as common bread and common drink do we receive these... the food which is blessed by the prayer of His word, and from which our blood and flesh by transmutation are nourished, is the flesh and blood of that Jesus who was made flesh.",
        },
        {
          source: "St. Irenaeus, Against Heresies IV.18.5 (~AD 180)",
          quote:
            "When, therefore, the mingled cup and the manufactured bread receives the Word of God, and the Eucharist of the blood and the body of Christ is made, from which things the substance of our flesh is increased and supported...",
        },
        {
          source: "St. Cyril of Jerusalem, Mystagogical Catechesis IV.6, 9",
          quote:
            "He once in Cana of Galilee turned water into wine, akin to blood; and is it incredible that He should have turned wine into blood?",
        },
      ],
    },
    {
      id: "elp-005",
      kind: "mcq",
      difficulty: 3,
      tags: ["fasting"],
      prompt:
        "Which two weekly fast days does the Didache prescribe — explicitly to distinguish Christian fasting from Pharisaic practice?",
      choices: [
        { id: "a", text: "Monday and Thursday — the days the Pharisees fasted, deliberately avoided by Christians.", rationale: "Wrong, but in fact the Didache says Mon/Thu was the PHARISAIC pattern Christians explicitly DIDN'T use. The Christian days are Wed/Fri." },
        { id: "b", text: "Saturday and Sunday — the two Sabbaths of the new covenant.", rationale: "Wrong. Sat/Sun are NEVER strict fasting days in the Orthodox typikon (Canon 64 of the Apostolic Canons forbids it, except for Holy Saturday)." },
        {
          id: "c",
          text: "Wednesday (the fourth day, the betrayal) and Friday (the Preparation, the crucifixion).",
          rationale: "Didache 8:1: 'Let not your fastings be with the hypocrites, for they fast on the second and the fifth day of the week; but do ye keep your fast on the fourth day and on the Preparation.' Same pattern in the Orthodox typikon today.",
        },
        { id: "d", text: "Tuesday and Friday — the days associated with the Lord's arrest and crucifixion.", rationale: "Wrong. The Lord's arrest was Wednesday night-Thursday in Synoptic chronology; the days of Christian fasting are Wed and Fri (not Tue and Fri)." },
      ],
      correctChoiceId: "c",
      citations: [
        { source: "Didache 8:1" },
        { source: "Tertullian, On Fasting; Apostolic Constitutions VII.23 — same weekly pattern" },
      ],
    },
  ],
};
