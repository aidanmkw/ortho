import type { Topic } from "@/lib/types";

export const finalEarlyPack2: Topic = {
  id: "final-early-pack-2",
  title: "Early Church — Final Pack",
  summary: "Last round of MCQs on the apostolic and sub-apostolic era.",
  learningObjectives: ["Drill remaining facts to mastery."],
  primarySources: ["Various standard references"],
  items: [
    {
      id: "ae-040",
      kind: "mcq",
      difficulty: 2,
      tags: ["seven-deacons"],
      prompt: "How many Deacons did the Apostles appoint in Acts 6 to serve tables?",
      choices: [
        { id: "a", text: "Seven — Stephen, Philip, Prochorus, Nicanor, Timon, Parmenas, and Nicolas.", rationale: "Acts 6:5. They were chosen to serve the Hellenist widows so the Twelve could focus on prayer and the word." },
        { id: "b", text: "Twelve — matching the Twelve Apostles in number for symbolic completeness.", rationale: "Wrong. The number was seven, not twelve. Acts 6:3." },
        { id: "c", text: "Three — Stephen, Philip, and Nicanor; the others were added in later chapters of Acts.", rationale: "Wrong. All seven were chosen at once in Acts 6:5." },
        { id: "d", text: "Seventy — corresponding to the Seventy disciples sent in Luke 10.", rationale: "Wrong. The Seventy are a different group (Lk 10:1); the Acts 6 deacons are seven." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Acts 6:1-7" }],
    },
    {
      id: "ae-041",
      kind: "mcq",
      difficulty: 2,
      tags: ["seventy"],
      prompt: "How many disciples did the Lord send out in Luke 10?",
      choices: [
        { id: "a", text: "Seventy (or seventy-two in some manuscripts) — sent two by two before His face.", rationale: "Lk 10:1. Textual witnesses vary between 70 and 72; the Orthodox Synaxis of the Seventy follows the 70 reading." },
        { id: "b", text: "Twelve — but this time also Joses and Matthias, making fourteen in total.", rationale: "Wrong. The Twelve were sent in Lk 9:1; the Seventy are a distinct, broader commission in Lk 10." },
        { id: "c", text: "One hundred and twenty — the number who gathered in the upper room before Pentecost.", rationale: "Wrong. The 120 are mentioned in Acts 1:15 at Pentecost, not as those sent in Lk 10." },
        { id: "d", text: "Three thousand — those who would be baptized at Pentecost.", rationale: "Wrong. Acts 2:41 — the 3,000 baptized at Pentecost are a separate event." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Luke 10:1-20; Synaxarion of the Seventy (Orthodox Synaxis, January 4)" }],
    },
    {
      id: "ae-042",
      kind: "mcq",
      difficulty: 3,
      tags: ["ignatius-letters"],
      prompt: "Where was St. Ignatius of Antioch martyred c. AD 107?",
      choices: [
        { id: "a", text: "Rome — devoured by wild beasts in the amphitheater, in the reign of Trajan.", rationale: "Eusebius EH 3.36. Ignatius wrote his seven letters en route to Rome, longing for martyrdom there." },
        { id: "b", text: "Antioch — burned at the stake in his own city by the Roman garrison.", rationale: "Wrong. He was arrested in Antioch but sent to Rome for execution." },
        { id: "c", text: "Smyrna — crucified outside the city walls alongside Polycarp's predecessors.", rationale: "Wrong. He stopped at Smyrna en route (where he met Polycarp), but was not martyred there." },
        { id: "d", text: "Ephesus — beheaded near the tomb of John the Theologian.", rationale: "Wrong. He sent a letter to the Ephesians from Smyrna but did not stop at Ephesus." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Eusebius, EH 3.36" }],
    },
    {
      id: "ae-043",
      kind: "mcq",
      difficulty: 4,
      tags: ["clement-of-rome-name"],
      prompt:
        "Who does Irenaeus identify as the first bishop of Rome in his succession list (Against Heresies III.3.3)?",
      choices: [
        { id: "a", text: "Linus (mentioned in 2 Tim 4:21), with Anencletus second and Clement third.", rationale: "Irenaeus, AH III.3.3. Peter and Paul are reckoned as founders, not as numbered bishops." },
        { id: "b", text: "Peter himself, counted as the first bishop and martyred under Nero in 64.", rationale: "Wrong. Peter is named as FOUNDER alongside Paul; Linus is the first of the line of bishops they appointed." },
        { id: "c", text: "Paul, who lived longer at Rome than Peter according to Irenaeus's chronology.", rationale: "Wrong. Paul is co-founder; the line begins with Linus." },
        { id: "d", text: "Cletus, who Irenaeus identifies as a separate figure from Anencletus.", rationale: "Wrong. Irenaeus uses 'Anencletus' (which Eusebius later writes as Cletus and Anencletus — possibly the same man split in two)." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Irenaeus, AH III.3.3; 2 Tim 4:21" }],
    },
    {
      id: "ae-044",
      kind: "mcq",
      difficulty: 3,
      tags: ["quartodeciman"],
      prompt: "What was the Quartodeciman controversy of the 2nd century?",
      choices: [
        {
          id: "a",
          text:
            "Whether to keep Pascha on the 14th of Nisan (Jewish-style, fixed day) or on the Sunday after the first spring full moon.",
          rationale:
            "Polycrates of Ephesus defended the 14th of Nisan; Victor of Rome the Sunday observance. Settled at Nicaea (325) in favor of Sunday.",
        },
        {
          id: "b",
          text:
            "Whether Christ's Last Supper was eaten on the 14th of Nisan or the 13th — the Synoptic vs. Johannine chronology problem.",
          rationale:
            "Wrong, although the Synoptic/Johannine chronology IS a real biblical-criticism question. The Quartodeciman controversy is about the date of Pascha, not the chronology of Holy Week.",
        },
        {
          id: "c",
          text:
            "Whether the Eucharist could be celebrated on a fast day, debated between Tertullian and Cyprian.",
          rationale:
            "Wrong. Tertullian and Cyprian addressed many things; the Eucharist-on-fast-day question is not 'Quartodeciman.'",
        },
        {
          id: "d",
          text:
            "Whether the Filioque should be added to the Western recension of the Symbol of Faith.",
          rationale:
            "Wrong, and an anachronism — Filioque is a 6th-c.+ controversy; Quartodeciman is 2nd-c.",
        },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Eusebius EH 5.23-25; Acts of Nicaea (325)" }],
    },
    {
      id: "ae-045",
      kind: "mcq",
      difficulty: 4,
      tags: ["sinaiticus"],
      prompt: "What is the approximate date of the earliest extant near-complete manuscript of the New Testament?",
      choices: [
        { id: "a", text: "The 4th century — Codex Sinaiticus (mid-4th c.) and Codex Vaticanus (4th c.).", rationale: "Earlier MSS exist only as fragments (P52 of John ~125; P46 of Pauline letters ~200). Sinaiticus is the earliest near-complete NT." },
        { id: "b", text: "The 1st century — the original Pauline letters as preserved at the church of Antioch.", rationale: "Wrong. The original autographs do not survive; the earliest copies we have are from the 2nd-4th centuries." },
        { id: "c", text: "The 8th century — the great Carolingian uncial codices commissioned by Charlemagne.", rationale: "Wrong. Carolingian manuscripts are real, but the earliest near-complete Greek NT is 4th-century Sinaiticus/Vaticanus." },
        { id: "d", text: "The 13th century — the earliest preserved Greek MS, since older copies were destroyed in 1204.", rationale: "Wrong. The 1204 sack of Constantinople did destroy MSS but earlier copies (4th c. on) survived elsewhere." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Bruce Metzger, The Text of the New Testament (4th ed., 2005)" }],
    },
    {
      id: "ae-046",
      kind: "mcq",
      difficulty: 4,
      tags: ["fragment-p52"],
      prompt: "What is Rylands Papyrus P52, and why is it significant?",
      choices: [
        { id: "a", text: "A credit-card-sized fragment of John 18 (~AD 125-150) — the earliest extant New Testament manuscript fragment.", rationale: "Held at the John Rylands Library in Manchester. Evidence that John's Gospel was in circulation in Egypt by ~125, mere decades after composition." },
        { id: "b", text: "A complete codex of the Pauline epistles dated to the late 2nd century.", rationale: "Wrong, but P46 IS a near-complete papyrus of the Pauline letters from c. AD 200 — a different manuscript." },
        { id: "c", text: "A 4th-century papyrus copy of the Septuagint Psalms recovered from the Egyptian desert.", rationale: "Wrong. Papyrus copies of the LXX exist (e.g., P. Bodmer XXIV, 3rd-4th c.) but P52 is a NT fragment." },
        { id: "d", text: "A Gnostic Gospel of Mary fragment found at Oxyrhynchus and published in 1903.", rationale: "Wrong, although Gnostic Mary fragments DO exist at Oxyrhynchus (P. Oxy. 3525, P. Ryl. 463). P52 is the canonical John 18." },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "John Rylands University Library, Greek Papyrus 457 (P52)" },
        { source: "C.H. Roberts, An Unpublished Fragment of the Fourth Gospel (1935)" },
      ],
    },
  ],
};
