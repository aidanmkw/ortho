import type { Topic } from "@/lib/types";

export const matthewSixteen: Topic = {
  id: "matthew-16",
  title: "Matthew 16:18 — The Rock",
  summary:
    "The classical Petrine text and its varied patristic readings.",
  learningObjectives: [
    "Quote three patristic readings: rock-as-Peter, rock-as-confession, rock-as-Christ.",
    "Note that no Greek Father uses Mt 16 to ground universal jurisdiction.",
  ],
  primarySources: [
    "Origen, Comm. on Matthew XII.10–11",
    "Chrysostom, Hom. 54 on Matthew",
    "Augustine, Retractations I.21",
    "Cyril of Alexandria, Comm. on John XII",
  ],
  items: [
    {
      id: "scr-mt16-001",
      kind: "mcq",
      difficulty: 4,
      tags: ["matthew-16", "patristic-exegesis"],
      prompt:
        "Which patristic interpretation of 'upon this rock I will build my Church' (Mt 16:18) is NOT found in the Greek Fathers?",
      choices: [
        { id: "a", text: "The Rock is the confession of Peter's faith." },
        { id: "b", text: "The Rock is Christ Himself, confessed by Peter." },
        { id: "c", text: "The Rock is the bishop of Rome and his successors with universal jurisdiction.", rationale: "Correct. No Greek Father reads Mt 16:18 as constituting Roman primacy with universal jurisdiction. Vatican I's reading is a Latin medieval and modern development." },
        { id: "d", text: "The Rock is Peter as type and exemplar of the apostolic confession." },
      ],
      correctChoiceId: "c",
      citations: [
        { source: "Origen, Commentary on Matthew XII.11" },
        { source: "Chrysostom, Homily 54 on Matthew §3" },
      ],
    },
  ],
};

export const johnSeventeen: Topic = {
  id: "john-17-unity",
  title: "John 17 — The High-Priestly Prayer",
  summary:
    "Christ's prayer for the unity of His disciples 'that they may all be one, as Thou, Father, art in me, and I in Thee, that they also may be in us; that the world may believe that Thou hast sent me' (Jn 17:21). The locus classicus for the visible unity of the Church.",
  learningObjectives: [
    "Quote Jn 17:21.",
    "Cite Cyril of Alexandria's commentary on the verse.",
  ],
  primarySources: [
    "John 17",
    "St. Cyril of Alexandria, Commentary on John, Book XI.11",
  ],
  items: [
    {
      id: "scr-j17-001",
      kind: "qa",
      difficulty: 3,
      tags: ["john-17", "unity"],
      prompt:
        "What does the Lord pray for in John 17:21, and why is the verse central for ecclesiology?",
      expectedAnswer:
        "He prays that His disciples 'may all be one, as Thou, Father, art in me, and I in Thee, that they also may be in us; that the world may believe that Thou hast sent me.' The unity is to be PARTICIPATED in the Trinitarian life and to be VISIBLE — for the world to see and believe. This rules out an 'invisible church' theory and grounds the call to ecumenical engagement on the basis of the apostolic faith, not at its expense.",
      citations: [
        { source: "John 17:21–23" },
        { source: "St. Cyril of Alexandria, Commentary on John Book XI.11" },
      ],
    },
  ],
};

export const romans5: Topic = {
  id: "romans-5",
  title: "Romans 5:12 — eph' hō",
  summary:
    "The single most consequential textual question for Western vs. Eastern soteriology — does death come because all sinned, or in Adam all sinned?",
  learningObjectives: [
    "Quote the Greek phrase.",
    "Trace the Vulgate's 'in quo' and Augustine's reading.",
  ],
  primarySources: [
    "Romans 5:12 — Greek and Vulgate",
    "Chrysostom, Hom. 10 on Romans",
    "Theodoret, Comm. on Romans",
    "Modern critical Greek NT editions (NA28, UBS5)",
  ],
  items: [
    {
      id: "scr-r5-001",
      kind: "qa",
      difficulty: 5,
      tags: ["romans-5", "ancestral-sin"],
      prompt:
        "Explain how the Latin Vulgate's translation of 'eph' hō' as 'in quo' shaped Augustine's doctrine of original sin, and how Greek-Fathers exegesis differs.",
      expectedAnswer:
        "Paul's Greek says 'death passed unto all men, eph' hō pantes hēmarton' — 'in that/because all sinned.' Jerome's Vulgate renders 'eph' hō' as 'in quo' — 'IN WHOM all sinned' — naturally suggesting that all sinned IN Adam (taking 'whom' as referring to Adam). Augustine, reading the Latin, built upon this the doctrine of inherited original sin as INHERITED GUILT: we are guilty in Adam, condemned for Adam's act. The Greek Fathers, reading the Greek, see no claim of inherited guilt — only that mortality and the fallen condition passed to all because all (in their own persons, in time) sin. Chrysostom: 'When [Adam] fell, even they who had not eaten of the tree did from him become mortal.' The Orthodox doctrine of ancestral sin preserves the seriousness of the Fall and the universal need of Christ's salvation, without imputing personal moral guilt for Adam's act.",
      citations: [
        { source: "Romans 5:12 — Greek text" },
        { source: "Vulgate, Romans 5:12 — Latin text" },
        { source: "St. John Chrysostom, Homily 10 on Romans" },
        { source: "St. Augustine, On Marriage and Concupiscence II.42 (for the comparison)" },
      ],
    },
  ],
};
