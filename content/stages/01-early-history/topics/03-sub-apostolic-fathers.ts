import type { Topic } from "@/lib/types";

export const subApostolicFathers: Topic = {
  id: "sub-apostolic-fathers",
  title: "The Sub-Apostolic Fathers",
  summary:
    "The first Christian writings outside the New Testament — the Didache, 1 Clement, the seven letters of Ignatius, Polycarp, the Shepherd of Hermas, the Epistle of Barnabas — composed by men who had known the Apostles or their immediate disciples.",
  learningObjectives: [
    "Date and locate each of the Apostolic Fathers' major works.",
    "Quote the Didache on baptism, fasting, and the Eucharist.",
    "State the year and circumstances of Polycarp's martyrdom.",
    "Show from Ignatius that the Eucharist was understood as the flesh of Christ from the apostolic generation.",
  ],
  primarySources: [
    "Didache (c. AD 50–110)",
    "1 Clement (c. AD 96)",
    "Seven letters of Ignatius of Antioch (c. AD 107)",
    "Polycarp, Letter to the Philippians; Martyrdom of Polycarp (~AD 155)",
    "Shepherd of Hermas (early–mid 2nd c.)",
    "Epistle of Barnabas",
    "Epistle to Diognetus",
    "Fragments of Papias of Hierapolis",
  ],
  items: [
    {
      id: "saf-001",
      kind: "identify-source",
      difficulty: 2,
      tags: ["didache", "two-ways"],
      prompt:
        "Identify the work that opens: 'There are two ways, one of life and one of death, and there is a great difference between the two ways.'",
      choices: [
        { id: "a", text: "Didache 1:1", rationale: "Correct. The Two Ways was the earliest catechism." },
        { id: "b", text: "Epistle of Barnabas 18:1" },
        { id: "c", text: "1 Clement 1:1" },
        { id: "d", text: "Hermas, Visions 1" },
      ],
      correctChoiceId: "a",
      citations: [
        {
          source: "Didache 1:1",
          quote:
            "There are two ways, one of life and one of death, and there is a great difference between the two ways.",
        },
      ],
      notes:
        "The 'Two Ways' material also appears in Barnabas 18–20; scholars dispute whether Barnabas or Didache used the other or a common source.",
    },
    {
      id: "saf-002",
      kind: "qa",
      difficulty: 2,
      tags: ["didache", "baptism"],
      prompt:
        "How does the Didache instruct Christians to baptize when running water is unavailable?",
      expectedAnswer:
        "If you have no running (living) water, baptize in other water; if you cannot in cold, then in warm. If you have neither, pour water three times on the head 'in the name of the Father and of the Son and of the Holy Spirit.' (Didache 7)",
      citations: [
        {
          source: "Didache 7:1–3",
          quote:
            "But concerning baptism, thus baptize ye: having first recited all these things, baptize 'in the name of the Father and of the Son and of the Holy Spirit' in running water. But if thou hast neither, pour water thrice upon the head 'in the name of the Father and of the Son and of the Holy Spirit.'",
        },
      ],
    },
    {
      id: "saf-003",
      kind: "qa",
      difficulty: 2,
      tags: ["polycarp", "martyrdom"],
      prompt:
        "Approximately when was St. Polycarp of Smyrna martyred, and what famous line did he speak to the proconsul who urged him to deny Christ?",
      expectedAnswer:
        "He was martyred c. AD 155–156, in Smyrna, by burning and then a dagger thrust. To the proconsul: 'Fourscore and six years have I served Him, and He never did me wrong; how then can I blaspheme my King who saved me?'",
      citations: [
        {
          source: "Martyrdom of Polycarp 9:3",
          quote:
            "Fourscore and six years have I been His servant, and He has done me no wrong. How then can I blaspheme my King who saved me?",
        },
      ],
    },
    {
      id: "saf-004",
      kind: "debate",
      difficulty: 5,
      tags: ["baptism", "infants", "baptist"],
      opponentTradition: "Baptist",
      opponentClaim:
        "Infant baptism is a later corruption. The New Testament shows only believer's baptism by immersion, after a personal profession of faith. The earliest Christians never baptized babies.",
      orthodoxRebuttal:
        "The New Testament repeatedly speaks of whole households baptized — Lydia (Acts 16:15), the Philippian jailer (16:33), Crispus (Acts 18:8), and the household of Stephanas (1 Cor 1:16) — and in the ancient Jewish-Hellenistic household, infants and small children were assumed members. The Lord Himself rebuked those who would prevent infants from being brought to Him (Lk 18:15–17: 'τα βρέφη' — literal newborns). The Apostolic Tradition of Hippolytus (early 3rd century, drawing on still earlier sources) explicitly directs: 'First baptize the little children. And each one of those who are able to speak for themselves, let them speak. But those who are not able to speak for themselves, let their parents or somebody belonging to their family speak for them.' (AT 21). Origen calls infant baptism a tradition received from the Apostles (Commentary on Romans 5:9; Homilies on Leviticus 8:3). St. Cyprian and a council of 66 African bishops in AD 253 take infant baptism for granted; the only question debated was whether to wait until the eighth day. St. Irenaeus (AH II.22.4) testifies that Christ 'came to save all through Himself; all, I say, who through Him are regenerated unto God — infants and little ones and children and youths and elder ones.' No record exists of any Father, Council, or local Church ever opposing or even questioning infant baptism until the 16th-century Anabaptists.",
      rejoinders: [
        {
          objection:
            "Hippolytus is third century. There's no first-century evidence of infant baptism.",
          reply:
            "There is no first-century evidence against it either. Hippolytus describes a 'tradition' he is preserving, not a novelty. Origen, just a generation after, calls it apostolic. The complete absence of any controversy over the practice in the patristic record — when fathers fought over far smaller questions — is itself decisive evidence that it was unanimous from the beginning.",
        },
        {
          objection:
            "Acts always speaks of baptism following belief. Infants can't believe.",
          reply:
            "Acts speaks of belief and baptism for the principal hearer; the household follows. The principle of household solidarity is Jewish-biblical (Gen 17:12 — circumcision on the eighth day, on the basis of the parents' faith). Colossians 2:11–12 explicitly parallels baptism with circumcision. To exclude infants is to make Christ's covenant narrower than Abraham's.",
        },
      ],
      citations: [
        {
          source: "Acts 16:15, 16:33; 18:8; 1 Cor 1:16",
          quote: "...and was baptized, she and her household.",
        },
        {
          source: "St. Hippolytus of Rome, Apostolic Tradition 21 (early 3rd c.)",
          quote:
            "Baptize first the children, and if they can speak for themselves let them do so. Otherwise, let their parents or other relatives speak for them.",
        },
        {
          source: "St. Irenaeus, Against Heresies II.22.4 (c. AD 180)",
          quote:
            "He came to save all through Himself — all, I say, who through Him are regenerated unto God: infants, and little children, and youths, and old men.",
        },
        {
          source:
            "St. Cyprian, Epistle 64.2 (To Fidus), c. AD 253 — synodal letter of 66 bishops",
          quote:
            "We all rather judged that the mercy and grace of God is not to be refused to any one born of man... if even to the greatest sinners... remission of sins is given — how much rather ought we to shrink from hindering an infant, who, being lately born, has not sinned.",
        },
      ],
    },
    {
      id: "saf-005",
      kind: "identify-source",
      difficulty: 3,
      tags: ["ignatius", "martyrdom"],
      prompt:
        "Identify the source of: 'I am the wheat of God, and let me be ground by the teeth of the wild beasts, that I may be found the pure bread of Christ.'",
      choices: [
        { id: "a", text: "Polycarp, on his way to the pyre" },
        { id: "b", text: "Ignatius of Antioch, Romans 4:1", rationale: "Correct. Written on the road to martyrdom (~AD 107)." },
        { id: "c", text: "Acts of the Scillitan Martyrs" },
        { id: "d", text: "Justin Martyr, Second Apology" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source: "St. Ignatius of Antioch, Romans 4:1 (~AD 107)",
          quote:
            "I am the wheat of God, and let me be ground by the teeth of the wild beasts, that I may be found the pure bread of Christ.",
        },
      ],
    },
    {
      id: "saf-006",
      kind: "qa",
      difficulty: 3,
      tags: ["hermas", "ecclesiology"],
      prompt:
        "In which work is the Church pictured as a tower under construction, built of stones (the faithful) tested before being fitted into the building?",
      expectedAnswer:
        "The Shepherd of Hermas — Visions 3 and Similitude 9 (early to mid 2nd century, Rome). The image becomes a fixed metaphor for the visible Church.",
      citations: [
        {
          source: "Shepherd of Hermas, Similitude 9.13.1",
          quote:
            "The tower is the Church; and the maidens are the holy spirits — none can enter the kingdom of God in any other way than by them.",
        },
      ],
    },
    {
      id: "saf-007",
      kind: "mcq",
      difficulty: 4,
      tags: ["ignatius", "eucharist"],
      prompt:
        "Which of the following did Ignatius of Antioch NOT call the Holy Eucharist?",
      choices: [
        { id: "a", text: "'The medicine of immortality' (Ephesians 20:2)" },
        { id: "b", text: "'The flesh of our Saviour Jesus Christ' (Smyrnaeans 7:1)" },
        { id: "c", text: "'A mere symbol of grace'", rationale: "Correct — Ignatius explicitly condemned those who reduced the Eucharist to symbol." },
        { id: "d", text: "'The antidote against death' (Ephesians 20:2)" },
      ],
      correctChoiceId: "c",
      citations: [
        {
          source: "St. Ignatius, Smyrnaeans 7:1 (~AD 107)",
          quote:
            "They abstain from the Eucharist and from prayer, because they confess not the Eucharist to be the flesh of our Saviour Jesus Christ, which suffered for our sins, and which the Father, of His goodness, raised up again.",
        },
        {
          source: "St. Ignatius, Ephesians 20:2",
          quote:
            "Breaking one and the same bread, which is the medicine of immortality, the antidote that we should not die but live for ever in Jesus Christ.",
        },
      ],
    },
    {
      id: "saf-008",
      kind: "qa",
      difficulty: 3,
      tags: ["didache", "fasting"],
      prompt:
        "What two days of the week does the Didache prescribe for Christian fasting?",
      expectedAnswer:
        "Wednesday (the fourth day) and Friday (the day of Preparation), distinguished from the Pharisaic Monday/Thursday fast (Didache 8:1).",
      citations: [
        {
          source: "Didache 8:1",
          quote:
            "Let not your fastings be with the hypocrites, for they fast on the second and the fifth day of the week; but do ye keep your fast on the fourth day and on the Preparation (Friday).",
        },
      ],
    },
  ],
};
