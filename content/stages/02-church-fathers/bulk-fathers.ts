import type { Topic } from "@/lib/types";

export const apostolicFathersDepth: Topic = {
  id: "apostolic-fathers-depth",
  title: "Apostolic Fathers — Depth",
  summary: "Identifying and quoting the men who knew the Apostles.",
  learningObjectives: ["Match each Apostolic Father to his work and city."],
  primarySources: ["1 Clement; Letters of Ignatius; Polycarp; Hermas; Barnabas; Didache; Diognetus; Papias"],
  items: [
    {
      id: "cf-af-001",
      kind: "mcq",
      difficulty: 2,
      tags: ["ignatius", "cities"],
      prompt: "To which seven churches did St. Ignatius of Antioch write letters en route to martyrdom?",
      choices: [
        { id: "a", text: "Ephesus, Magnesia, Tralles, Rome, Philadelphia, Smyrna, and Polycarp (personally)", rationale: "Correct." },
        { id: "b", text: "The seven churches of Asia Minor in Revelation 2–3" },
        { id: "c", text: "Rome, Corinth, Galatia, Ephesus, Philippi, Colossae, Thessalonica" },
        { id: "d", text: "Jerusalem, Antioch, Alexandria, Rome, Constantinople, Athens, Carthage" },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Lightfoot, The Apostolic Fathers — Ignatius's middle recension" }],
    },
    {
      id: "cf-af-002",
      kind: "qa",
      difficulty: 3,
      tags: ["papias"],
      prompt: "Who was Papias of Hierapolis, and what does Eusebius preserve from his now-lost work?",
      expectedAnswer: "Papias was bishop of Hierapolis in Phrygia (early 2nd c.), a 'hearer of John and companion of Polycarp.' His five-book Exposition of the Sayings of the Lord is lost, but fragments preserved by Eusebius (EH 3.39) include the early tradition that Matthew wrote his Gospel in Hebrew/Aramaic, and that Mark was Peter's interpreter who recorded Peter's preaching.",
      citations: [{ source: "Eusebius, EH 3.39 (Papias fragments)" }],
    },
    {
      id: "cf-af-003",
      kind: "identify-source",
      difficulty: 3,
      tags: ["diognetus"],
      prompt: "Identify the source: 'Christians dwell in their own countries, but only as sojourners; they bear their share in all things as citizens, and they endure all hardships as strangers. Every foreign country is a fatherland to them, and every fatherland is foreign.'",
      choices: [
        { id: "a", text: "Justin Martyr, First Apology" },
        { id: "b", text: "Epistle to Diognetus 5", rationale: "Correct. Late 2nd or early 3rd c." },
        { id: "c", text: "Tertullian, Apologeticus" },
        { id: "d", text: "1 Peter" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "Epistle to Diognetus 5" }],
    },
  ],
};

export const cappadocianDepth: Topic = {
  id: "cappadocians-depth",
  title: "Cappadocians — Depth",
  summary: "Identifying each of the three Cappadocians more precisely.",
  learningObjectives: ["Match each brother/friend to his see and signature work."],
  primarySources: ["Basil, On the Holy Spirit; Hexaemeron", "Gregory the Theologian, Five Theological Orations", "Gregory of Nyssa, Catechetical Oration"],
  items: [
    {
      id: "cf-capd-001",
      kind: "mcq",
      difficulty: 3,
      tags: ["basil", "see"],
      prompt: "Which Cappadocian was bishop of Caesarea in Cappadocia?",
      choices: [
        { id: "a", text: "Basil the Great", rationale: "Correct (consecrated AD 370)." },
        { id: "b", text: "Gregory the Theologian (Nazianzen)" },
        { id: "c", text: "Gregory of Nyssa" },
        { id: "d", text: "Amphilochius of Iconium" },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Sozomen, EH 6.15" }],
    },
    {
      id: "cf-capd-002",
      kind: "qa",
      difficulty: 4,
      tags: ["macrina"],
      prompt: "Who was St. Macrina, and why is she called 'the Younger'?",
      expectedAnswer: "St. Macrina the Younger (~327–379) was the elder sister of Basil the Great and Gregory of Nyssa, and the spiritual mother of the family. She founded one of the earliest female monastic communities at Annesi. Her brother Gregory of Nyssa wrote her Life and the dialogue On the Soul and the Resurrection, depicting her on her deathbed teaching the Cappadocian eschatology. She is called 'the Younger' to distinguish her from her grandmother Macrina the Elder, a disciple of St. Gregory the Wonderworker.",
      citations: [
        { source: "St. Gregory of Nyssa, Life of Macrina" },
        { source: "St. Gregory of Nyssa, On the Soul and the Resurrection" },
      ],
    },
    {
      id: "cf-capd-003",
      kind: "qa",
      difficulty: 3,
      tags: ["basil", "monasticism"],
      prompt: "What is the lasting contribution of St. Basil the Great to Christian monasticism?",
      expectedAnswer: "Basil's Long Rules and Short Rules (Asketikon) gave Eastern monasticism its enduring form: cenobitic (communal), urban-engaged through hospitals and orphanages (the 'Basiliad' at Caesarea), balanced between prayer and work, and submitted to a single rule of life under an abbot. His Rules underlie virtually all later Eastern monastic legislation.",
      citations: [{ source: "St. Basil the Great, Asketikon (Long and Short Rules)" }],
    },
  ],
};

export const latinFathers: Topic = {
  id: "latin-fathers",
  title: "Latin Fathers Received by Orthodoxy",
  summary: "Ambrose, Jerome, Leo the Great, Gregory the Dialogist, and others — received with discernment.",
  learningObjectives: ["Match each Latin Father to his contribution.", "Note the areas of Western drift."],
  primarySources: ["Ambrose, On the Mysteries; On the Holy Spirit", "Jerome, Letters; Vulgate", "Leo I, Tome to Flavian", "Gregory the Dialogist, Dialogues"],
  items: [
    {
      id: "cf-lat-001",
      kind: "mcq",
      difficulty: 3,
      tags: ["ambrose"],
      prompt: "Which Latin bishop baptized Augustine, defied Empress Justina at the basilica, and excluded Theodosius from communion after Thessalonica?",
      choices: [
        { id: "a", text: "Ambrose of Milan (~339–397)", rationale: "Correct. All three events documented in Paulinus, Life of Ambrose." },
        { id: "b", text: "Jerome" },
        { id: "c", text: "Hilary of Poitiers" },
        { id: "d", text: "Pope Damasus" },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "Paulinus the Deacon, Life of St. Ambrose" },
        { source: "Augustine, Confessions VIII-IX" },
      ],
    },
    {
      id: "cf-lat-002",
      kind: "qa",
      difficulty: 3,
      tags: ["jerome", "vulgate"],
      prompt: "What translation project occupied St. Jerome from 382 to ~405, and what did it produce?",
      expectedAnswer: "His translation of the Bible into Latin from Hebrew (OT) and Greek (NT) — the Latin Vulgate. Commissioned by Pope Damasus. The Vulgate became the dominant Western biblical text for over a millennium. Jerome preferred the Hebrew text over the Septuagint for the OT, leading to his famous correspondence with Augustine on Galatians 2 and Jonah 4. Orthodoxy receives Jerome as a Father with reservation; his preference for Hebraica veritas is not the patristic mainstream East.",
      citations: [
        { source: "Augustine-Jerome correspondence (Letters 28, 71, 75, 82)" },
        { source: "Jerome, Prologues to the Vulgate" },
      ],
    },
    {
      id: "cf-lat-003",
      kind: "identify-source",
      difficulty: 4,
      tags: ["leo", "tome"],
      prompt: "Identify the dogmatic letter: 'Each form does what is proper to itself in communion with the other — the Word doing what is of the Word, the flesh accomplishing what is of the flesh.'",
      choices: [
        { id: "a", text: "Cyril of Alexandria, Twelve Anathemas" },
        { id: "b", text: "Pope Leo the Great, Tome to Flavian (449)", rationale: "Correct. Read into the Council of Chalcedon (451) which acclaimed 'Peter has spoken through Leo.'" },
        { id: "c", text: "Gregory the Theologian, Letter 101 to Cledonius" },
        { id: "d", text: "Definition of Chalcedon" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "Pope St. Leo the Great, Tome to Flavian (Epistle 28), AD 449" }],
    },
  ],
};

export const tertullianOrigen: Topic = {
  id: "tertullian-origen",
  title: "Tertullian and Origen — Received with Reservation",
  summary: "Two giants whose contributions are vast but who fell short of full reception.",
  learningObjectives: ["Identify why each is not a 'Father' tout court."],
  primarySources: ["Tertullian's many works; Origen's many works"],
  items: [
    {
      id: "cf-to-001",
      kind: "qa",
      difficulty: 3,
      tags: ["tertullian", "montanism"],
      prompt: "Why is Tertullian not universally received as a Father, despite the immense value of his early works?",
      expectedAnswer: "In his later years (after ~AD 207), Tertullian embraced Montanism (the 'New Prophecy' of Montanus, Priscilla, and Maximilla) — a rigorist apocalyptic movement that the Church rejected. His writings from this period (e.g., On Monogamy, On Modesty) display the schismatic spirit. The Church gratefully reads his Apologeticus, On the Prescription against Heretics, and Against Praxeas, while not numbering him among the Fathers in the strict sense.",
      citations: [{ source: "Jerome, On Illustrious Men 53" }],
    },
    {
      id: "cf-to-002",
      kind: "qa",
      difficulty: 4,
      tags: ["origen", "council-553"],
      prompt: "What teachings of Origen were anathematized by the Fifth Ecumenical Council (553)?",
      expectedAnswer: "(1) The pre-existence of souls; (2) apokatastasis — the eventual restoration even of demons; (3) successive worlds and reincarnation; (4) the resurrection body conceived as a spherical 'ethereal' body different from the present body. The Council, under Justinian, anathematized fifteen Origenist propositions. Origen as a person is generally not anathematized (the matter is debated); his erroneous teachings are. The Church gratefully retains his exegetical insights (Hexapla, commentaries) and his ascetical genius.",
      citations: [{ source: "Acts of Constantinople II (553), Anathemas Against Origen" }],
    },
  ],
};

export const philokaliaTopic: Topic = {
  id: "philokalia-topic",
  title: "The Philokalia",
  summary: "The 18th-century anthology compiled by Sts. Macarius of Corinth and Nicodemus the Hagiorite (Venice, 1782) — the canonical collection of patristic ascetical and mystical writings from the 4th–15th centuries.",
  learningObjectives: ["Date the Philokalia's first publication.", "Name 4–5 authors anthologized."],
  primarySources: ["The Philokalia, 5 vols. (English transl. Palmer/Ware/Sherrard)"],
  items: [
    {
      id: "cf-phil-001",
      kind: "qa",
      difficulty: 3,
      tags: ["philokalia"],
      prompt: "Who compiled the Philokalia, in what year, and where was it first published?",
      expectedAnswer: "Compiled by Sts. Macarius of Corinth and Nicodemus the Hagiorite at Mount Athos; first published in Venice in 1782. Translated into Slavonic by St. Paisius Velichkovsky (Dobrotolyubie, 1793) and into Russian by Theophan the Recluse and others (19th c.).",
      citations: [{ source: "Philokalia, Venice 1782 — title page" }],
    },
    {
      id: "cf-phil-002",
      kind: "mcq",
      difficulty: 4,
      tags: ["philokalia", "authors"],
      prompt: "Which of these is NOT a Philokalic author?",
      choices: [
        { id: "a", text: "Evagrius Ponticus" },
        { id: "b", text: "Maximus the Confessor" },
        { id: "c", text: "Gregory Palamas" },
        { id: "d", text: "Augustine of Hippo", rationale: "Correct — the Philokalia is wholly Greek; Augustine is not included." },
      ],
      correctChoiceId: "d",
      citations: [{ source: "Philokalia, Table of Contents — Greek 1782" }],
    },
  ],
};
