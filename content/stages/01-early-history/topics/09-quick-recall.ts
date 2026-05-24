import type { Topic } from "@/lib/types";

export const apostolicSucessionLists: Topic = {
  id: "succession-lists",
  title: "Apostolic Succession Lists (Early Sees)",
  summary:
    "The four ancient apostolic sees and the early documented succession from the apostles.",
  learningObjectives: [
    "Match each ancient see to its founding apostle(s).",
    "Identify the documenting source.",
  ],
  primarySources: [
    "Eusebius, Ecclesiastical History III–IV",
    "Irenaeus, Against Heresies III.3",
    "Hegesippus (in Eusebius)",
  ],
  items: [
    {
      id: "ae-009",
      kind: "mcq",
      difficulty: 2,
      tags: ["sees", "apostles"],
      prompt: "Who founded the See of Antioch?",
      choices: [
        { id: "a", text: "Peter (founded), Evodius (1st bishop), Ignatius (2nd or 3rd)", rationale: "Correct. Eusebius EH 3.36." },
        { id: "b", text: "Paul" },
        { id: "c", text: "John the Theologian" },
        { id: "d", text: "Matthew" },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Eusebius, Ecclesiastical History 3.36" }],
    },
    {
      id: "ae-010",
      kind: "mcq",
      difficulty: 2,
      tags: ["sees", "alexandria"],
      prompt: "Who founded the See of Alexandria?",
      choices: [
        { id: "a", text: "Mark the Evangelist", rationale: "Correct. The Coptic and Greek Patriarchates of Alexandria both claim apostolic succession from Mark." },
        { id: "b", text: "Athanasius" },
        { id: "c", text: "Origen" },
        { id: "d", text: "Apollos" },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Eusebius, EH 2.16; 2.24" }],
    },
    {
      id: "ae-011",
      kind: "mcq",
      difficulty: 3,
      tags: ["constantinople"],
      prompt:
        "Who is traditionally identified as the first bishop of Byzantium (later Constantinople)?",
      choices: [
        { id: "a", text: "St. Andrew the First-Called (consecrated St. Stachys, one of the Seventy)", rationale: "Correct. The unbroken episcopal list runs from St. Stachys." },
        { id: "b", text: "St. Paul" },
        { id: "c", text: "St. John Chrysostom" },
        { id: "d", text: "St. Gregory the Theologian" },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "Synaxarion of Constantinople — Apostle Stachys, October 31" },
      ],
    },
    {
      id: "ae-012",
      kind: "qa",
      difficulty: 3,
      tags: ["pentarchy"],
      prompt:
        "Name the five ancient patriarchates (the Pentarchy) in their canonical order of honor.",
      expectedAnswer:
        "(1) Rome, (2) Constantinople, (3) Alexandria, (4) Antioch, (5) Jerusalem. The order was confirmed by Canon 3 of Constantinople I (381) which placed Constantinople second after Rome, and by Chalcedon Canon 28 (451).",
      citations: [
        { source: "Constantinople I, canon 3" },
        { source: "Chalcedon, canon 28" },
      ],
    },
  ],
};

export const earlyChristianWriters: Topic = {
  id: "early-writers-quick",
  title: "Quick-Recall: Early Christian Writers",
  summary: "Rapid identification of pre-Nicene authors and their works.",
  learningObjectives: ["Match author to work."],
  primarySources: ["The Ante-Nicene Fathers corpus"],
  items: [
    {
      id: "ae-013",
      kind: "mcq",
      difficulty: 2,
      tags: ["clement-alexandria"],
      prompt: "Who wrote the Stromateis ('Miscellanies')?",
      choices: [
        { id: "a", text: "Clement of Alexandria", rationale: "Correct. c. AD 200." },
        { id: "b", text: "Clement of Rome" },
        { id: "c", text: "Origen" },
        { id: "d", text: "Hippolytus" },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Clement of Alexandria, Stromateis (c. AD 200)" }],
    },
    {
      id: "ae-014",
      kind: "mcq",
      difficulty: 3,
      tags: ["tertullian"],
      prompt:
        "Which Latin Father coined the term 'Trinitas' in Latin and wrote 'the blood of the Christians is seed'?",
      choices: [
        { id: "a", text: "Cyprian" },
        { id: "b", text: "Tertullian", rationale: "Correct. Adversus Praxean for 'Trinitas'; Apologeticus 50 for the famous line." },
        { id: "c", text: "Lactantius" },
        { id: "d", text: "Novatian" },
      ],
      correctChoiceId: "b",
      citations: [
        { source: "Tertullian, Against Praxeas 3 — first Latin use of 'Trinitas'" },
        { source: "Tertullian, Apologeticus 50" },
      ],
    },
    {
      id: "ae-015",
      kind: "mcq",
      difficulty: 3,
      tags: ["origen"],
      prompt: "Which work of Origen was an apology against the pagan philosopher Celsus's 'True Word'?",
      choices: [
        { id: "a", text: "On First Principles" },
        { id: "b", text: "Hexapla" },
        { id: "c", text: "Against Celsus (Contra Celsum)", rationale: "Correct. Eight books, c. AD 248." },
        { id: "d", text: "Homilies on Genesis" },
      ],
      correctChoiceId: "c",
      citations: [{ source: "Origen, Contra Celsum (~AD 248)" }],
    },
    {
      id: "ae-016",
      kind: "qa",
      difficulty: 3,
      tags: ["hippolytus"],
      prompt: "What 3rd-century Roman work, attributed to Hippolytus, describes a full baptismal liturgy with renunciations and a triple-immersion?",
      expectedAnswer:
        "The Apostolic Tradition (Traditio Apostolica), attributed to St. Hippolytus of Rome (early 3rd century). It describes a fully developed baptismal liturgy including the renunciations of Satan, anointing with the oil of exorcism, triple immersion in the name of the Trinity, anointing with chrism, and reception of the Eucharist immediately after.",
      citations: [
        { source: "St. Hippolytus, Apostolic Tradition (early 3rd c.)" },
      ],
    },
  ],
};

export const persecutionsDetail: Topic = {
  id: "persecutions-quick",
  title: "Quick-Recall: Persecutions",
  summary: "Persecutions by emperor and notable martyrs.",
  learningObjectives: ["Match emperor to year and notable martyr."],
  primarySources: ["Eusebius EH V-VIII; Lactantius"],
  items: [
    {
      id: "tp-008",
      kind: "mcq",
      difficulty: 2,
      tags: ["domitian"],
      prompt: "Under which emperor was St. John the Theologian exiled to Patmos?",
      choices: [
        { id: "a", text: "Nero" },
        { id: "b", text: "Domitian", rationale: "Correct. c. AD 95. Eusebius EH 3.18." },
        { id: "c", text: "Trajan" },
        { id: "d", text: "Hadrian" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "Eusebius, EH 3.18; Revelation 1:9" }],
    },
    {
      id: "tp-009",
      kind: "mcq",
      difficulty: 3,
      tags: ["perpetua"],
      prompt: "Under whose reign were Sts. Perpetua and Felicity martyred (AD 203, Carthage)?",
      choices: [
        { id: "a", text: "Septimius Severus", rationale: "Correct." },
        { id: "b", text: "Marcus Aurelius" },
        { id: "c", text: "Decius" },
        { id: "d", text: "Valerian" },
      ],
      correctChoiceId: "a",
      citations: [{ source: "The Passion of Perpetua and Felicity (~AD 203)" }],
    },
    {
      id: "tp-010",
      kind: "qa",
      difficulty: 3,
      tags: ["cyprian"],
      prompt:
        "Under which emperor was St. Cyprian of Carthage martyred, and in what year?",
      expectedAnswer:
        "St. Cyprian was beheaded under Valerian on September 14, 258. He is commemorated August 31 in the Orthodox calendar.",
      citations: [
        { source: "Acts of Cyprian; Pontius, Life of Cyprian" },
      ],
    },
    {
      id: "tp-011",
      kind: "qa",
      difficulty: 3,
      tags: ["forty-martyrs-sebaste"],
      prompt:
        "Who were the Forty Martyrs of Sebaste, and when were they martyred?",
      expectedAnswer:
        "Forty Christian Roman soldiers of the Twelfth Legion, martyred at Sebaste in Armenia in 320 under Licinius. Forced to stand naked through the freezing night in a lake; one apostatized and ran to the warm bathhouse, dying immediately; a pagan guard, seeing this, converted and took his place. All forty are commemorated March 9.",
      citations: [
        { source: "St. Basil the Great, Homily 19 (On the Forty Martyrs)" },
        { source: "St. Gregory of Nyssa, On the Forty Martyrs" },
      ],
    },
  ],
};

export const earlyChurchOrder: Topic = {
  id: "early-church-order",
  title: "Quick-Recall: Early Church Order",
  summary: "Offices, practices, and structures of the early Church.",
  learningObjectives: ["Identify early Church offices and practices."],
  primarySources: ["Didache; Apostolic Constitutions; Apostolic Tradition"],
  items: [
    {
      id: "as-007",
      kind: "mcq",
      difficulty: 3,
      tags: ["lectors", "minor-orders"],
      prompt:
        "Which 3rd-century Roman work first attests the order of the lector (anagnōstēs / reader) in the Church?",
      choices: [
        { id: "a", text: "Apostolic Tradition of Hippolytus (early 3rd c.)", rationale: "Correct. Also attested in Tertullian, On the Prescription 41." },
        { id: "b", text: "Didache" },
        { id: "c", text: "1 Clement" },
        { id: "d", text: "Letter of Polycarp" },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "Hippolytus, Apostolic Tradition 11 (lectors)" },
        { source: "Tertullian, De Praescriptione 41" },
      ],
    },
    {
      id: "as-008",
      kind: "qa",
      difficulty: 3,
      tags: ["catechumenate"],
      prompt:
        "How long was the catechumenate in the early Church, and when were catechumens baptized?",
      expectedAnswer:
        "Typically two to three years (Hippolytus, Apostolic Tradition 17). Baptisms were ordinarily performed at the Paschal Vigil (Holy Saturday night → Pascha morning). Theophany (January 6) also became a common baptismal day, especially in the East.",
      citations: [
        { source: "St. Hippolytus, Apostolic Tradition 17, 20–21" },
        { source: "Tertullian, On Baptism 19" },
      ],
    },
    {
      id: "as-009",
      kind: "mcq",
      difficulty: 4,
      tags: ["clement-rome", "name"],
      prompt:
        "St. Clement, third bishop of Rome (or fourth, including Peter) and author of 1 Clement, is identified by Origen and Eusebius with which figure in the New Testament?",
      choices: [
        { id: "a", text: "Clement of Phil 4:3, Paul's fellow-laborer", rationale: "Correct. Identified by Origen on John 1:29 and Eusebius EH 3.15." },
        { id: "b", text: "Linus of 2 Tim 4:21" },
        { id: "c", text: "Demas of 2 Tim 4:10" },
        { id: "d", text: "Onesiphorus of 2 Tim 1:16" },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "Origen, Commentary on John I.29" },
        { source: "Eusebius, EH 3.15" },
      ],
    },
  ],
};
