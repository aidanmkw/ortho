import type { Topic } from "@/lib/types";

export const mcqPackEarly: Topic = {
  id: "early-mcq-pack",
  title: "Quick MCQ Pack — Early Church",
  summary: "Rapid-fire factual MCQs for warmup drilling.",
  learningObjectives: ["Drill core facts to mastery."],
  primarySources: ["Standard patristic and historical references"],
  items: [
    // ae-020 is fine — short distractors all equally plausible single-word answers.
    {
      id: "ae-020",
      kind: "mcq",
      difficulty: 1,
      tags: ["acts"],
      prompt: "In what city were the disciples first called 'Christians'?",
      choices: [
        { id: "a", text: "Jerusalem", rationale: "Wrong. The Mother Church but not where the term was first used." },
        { id: "b", text: "Antioch", rationale: "Correct. Acts 11:26." },
        { id: "c", text: "Rome", rationale: "Wrong. Christians were in Rome but the name originated in Antioch." },
        { id: "d", text: "Ephesus", rationale: "Wrong. Pauline city, not the origin of the name." },
      ],
      correctChoiceId: "b",
      citations: [{ source: "Acts 11:26" }],
    },
    {
      id: "ae-021",
      kind: "mcq",
      difficulty: 2,
      tags: ["paul", "missionary-journeys"],
      prompt: "How many missionary journeys does Acts record for St. Paul?",
      choices: [
        { id: "a", text: "Two — recorded in Acts 13-15 and 16-21.", rationale: "Wrong. Acts records three distinct journeys plus the final voyage to Rome." },
        { id: "b", text: "Three — plus the final voyage to Rome as a prisoner.", rationale: "Acts 13-14; 15:36-18:22; 18:23-21:17; voyage to Rome 27-28." },
        { id: "c", text: "Four — including the unrecorded journey to Spain.", rationale: "Wrong. Paul wrote of intending Spain (Rom 15:24), but Acts records no such journey." },
        { id: "d", text: "Five — including post-imprisonment journeys before martyrdom.", rationale: "Wrong. Tradition attests post-Acts journeys but Acts itself records three plus Rome." },
      ],
      correctChoiceId: "b",
      citations: [{ source: "Acts 13-28" }],
    },
    {
      id: "ae-022",
      kind: "mcq",
      difficulty: 2,
      tags: ["apostles"],
      prompt: "Who replaced Judas Iscariot among the Twelve?",
      choices: [
        { id: "a", text: "Matthias — chosen by lot in Acts 1:23-26.", rationale: "The Apostles cast lots between Matthias and Joseph Barsabbas; the lot fell on Matthias." },
        { id: "b", text: "Joseph called Barsabbas, surnamed Justus.", rationale: "Wrong. Joseph Barsabbas was the OTHER candidate; the lot did not fall on him." },
        { id: "c", text: "Paul — appointed directly by Christ on the road to Damascus.", rationale: "Wrong. Paul is called the Apostle but was not the replacement for Judas; he was added separately." },
        { id: "d", text: "Stephen — chosen as Judas's replacement before his martyrdom.", rationale: "Wrong. Stephen was a deacon (Acts 6), not a member of the Twelve." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Acts 1:15-26" }],
    },
    {
      id: "ae-023",
      kind: "mcq",
      difficulty: 2,
      tags: ["polycarp"],
      prompt:
        "Who was the bishop of Smyrna addressed in one of Ignatius's letters and later martyred c. AD 155?",
      choices: [
        { id: "a", text: "Polycarp — disciple of John the Theologian; martyred at age eighty-six.", rationale: "Bishop of Smyrna; martyred ~155-156. Letter to Polycarp is one of Ignatius's seven." },
        { id: "b", text: "Onesimus — bishop of Ephesus, the runaway slave from Paul's letter to Philemon.", rationale: "Wrong. Onesimus did become bishop (per Ignatius's Letter to Ephesians) but of Ephesus, not Smyrna." },
        { id: "c", text: "Damas — bishop of Magnesia, addressed in Ignatius's letter to that city.", rationale: "Wrong, but Damas IS a real figure — bishop of Magnesia, not Smyrna." },
        { id: "d", text: "Polybius — bishop of Tralles, who met Ignatius in Smyrna en route to Rome.", rationale: "Wrong, but Polybius IS a real figure — bishop of Tralles, who visited Ignatius in Smyrna." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Ignatius, Letter to Polycarp; Martyrdom of Polycarp (~AD 156)" }],
    },
    {
      id: "ae-024",
      kind: "mcq",
      difficulty: 3,
      tags: ["didache", "structure"],
      prompt: "Which of the following is NOT found in the Didache?",
      choices: [
        { id: "a", text: "The 'Two Ways' catechetical material on the way of life and the way of death.", rationale: "This is in the Didache, chapters 1-6." },
        { id: "b", text: "The Trinitarian baptismal formula 'in the name of the Father and of the Son and of the Holy Spirit.'", rationale: "This is in Didache 7." },
        { id: "c", text: "Eucharistic thanksgiving prayers for the cup and the bread.", rationale: "These are in Didache 9-10." },
        { id: "d", text: "A succession list of the bishops of Rome from Peter to Anencletus.", rationale: "Correct — the Didache deals with itinerant apostles and prophets, not papal succession. Such lists appear in Irenaeus and Hegesippus, not the Didache." },
      ],
      correctChoiceId: "d",
      citations: [{ source: "Didache (full text)" }],
    },
    {
      id: "ae-025",
      kind: "mcq",
      difficulty: 3,
      tags: ["dura-europos"],
      prompt: "What is significant about the house church at Dura-Europos (c. AD 235)?",
      choices: [
        {
          id: "a",
          text:
            "It is the earliest known purpose-adapted Christian church building, with frescoes of the Good Shepherd and biblical scenes.",
          rationale:
            "Excavated by Yale-French archaeologists in 1932 at the Syrian site of Dura-Europos. Pre-dates Constantine by nearly a century.",
        },
        {
          id: "b",
          text:
            "It is the only documented Christian site to predate Pentecost — built by John the Forerunner's disciples.",
          rationale: "Wrong. Christian sites by definition begin at Pentecost or later.",
        },
        {
          id: "c",
          text:
            "It is the location traditionally identified as where Sts. Peter and Paul met before the Council of Jerusalem.",
          rationale: "Wrong. Acts 15 locates that meeting in Jerusalem.",
        },
        {
          id: "d",
          text:
            "It is the earliest dated Christian basilica in the architectural sense, with apse, nave, and side aisles.",
          rationale:
            "Wrong. The basilica form developed under and after Constantine. Dura-Europos is a converted house, not a basilica.",
        },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Yale-French excavations of Dura-Europos, 1932" }],
    },
    {
      id: "ae-026",
      kind: "mcq",
      difficulty: 3,
      tags: ["constantine", "vision"],
      prompt: "What was the date of Constantine's victory at the Milvian Bridge?",
      choices: [
        { id: "a", text: "October 28, 312 — defeating Maxentius outside Rome.", rationale: "Eusebius Life of Constantine I; Lactantius On the Deaths of the Persecutors 44." },
        { id: "b", text: "May 11, 330 — the day of the dedication of the new capital.", rationale: "Wrong. That is the date of the dedication of Constantinople (Nova Roma), not the Milvian Bridge." },
        { id: "c", text: "September 14, 326 — the date the True Cross was rediscovered by Helena.", rationale: "Wrong. The Exaltation of the Cross commemorates the recovery by St. Helena, traditionally dated c. 326-328. Different event." },
        { id: "d", text: "June 25, 325 — the closing day of the First Ecumenical Council.", rationale: "Wrong. Nicaea I closed around July-August 325, after the council's work; not a battle." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Lactantius, On the Deaths of the Persecutors 44" }],
    },
    {
      id: "ae-027",
      kind: "mcq",
      difficulty: 4,
      tags: ["catechumenate"],
      prompt: "What was the 'disciplina arcani' (discipline of the secret) in the early Church?",
      choices: [
        {
          id: "a",
          text:
            "The early discipline of withholding deep mysteries (Eucharist, baptismal forms) from the unbaptized, revealed only in stages to catechumens.",
          rationale:
            "Cyril of Jerusalem's Mystagogical Catecheses were addressed only to the newly baptized for this reason. The practice fades after Constantine when persecution ends.",
        },
        {
          id: "b",
          text:
            "The monastic rule of silence at meals during Lent, traceable to St. Pachomius's koinobitic regulations.",
          rationale:
            "Wrong, but Pachomian silence at meals is a real Egyptian monastic practice. The disciplina arcani is a different institution.",
        },
        {
          id: "c",
          text:
            "The early Roman secret-society style of communication using the ichthys (fish) symbol to identify fellow Christians.",
          rationale:
            "Wrong, but the ichthys symbol IS a real Christian acrostic (Iēsous Christos Theou Yios Sōtēr). The disciplina arcani is a broader catechetical institution.",
        },
        {
          id: "d",
          text:
            "The Bishop of Rome's exclusive right to keep his theological correspondence secret from other patriarchates.",
          rationale: "Wrong. There is no such episcopal right; the term refers to a catechetical practice.",
        },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "St. Cyril of Jerusalem, Mystagogical Catecheses (~AD 350)" },
        { source: "St. Basil, On the Holy Spirit 27" },
      ],
    },
  ],
};
