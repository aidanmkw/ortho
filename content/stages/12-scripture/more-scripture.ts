import type { Topic } from "@/lib/types";

export const hermeneutics: Topic = {
  id: "patristic-hermeneutics",
  title: "Patristic Hermeneutics",
  summary:
    "The fourfold sense (literal, allegorical/typological, tropological/moral, anagogical). The Antiochene historical reading and the Alexandrian allegorical reading. The consensus patrum as the rule of interpretation.",
  learningObjectives: [
    "State the fourfold sense.",
    "Cite Vincent of Lérins's canon.",
  ],
  primarySources: [
    "St. John Cassian, Conferences 14",
    "St. Vincent of Lérins, Commonitorium",
    "St. Augustine, On Christian Doctrine",
  ],
  items: [
    {
      id: "scr-her-001",
      kind: "identify-source",
      difficulty: 4,
      tags: ["vincent-lerins"],
      prompt:
        "Identify the source: 'In the Catholic Church itself, all possible care must be taken that we hold that faith which has been believed everywhere, always, by all.'",
      choices: [
        { id: "a", text: "Augustine, Retractations" },
        { id: "b", text: "Vincent of Lérins, Commonitorium 2.6 (~AD 434)", rationale: "Correct. Quod ubique, quod semper, quod ab omnibus." },
        { id: "c", text: "Athanasius, Letter to Serapion" },
        { id: "d", text: "John of Damascus, Dialectica" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source: "St. Vincent of Lérins, Commonitorium 2.6",
          quote: "Quod ubique, quod semper, quod ab omnibus.",
        },
      ],
    },
  ],
};

export const johnSix: Topic = {
  id: "john-six",
  title: "John 6 (The Eucharistic Discourse)",
  summary:
    "The Lord's discourse on eating His flesh and drinking His blood. Patristic exegesis read it as the Eucharist; the 16th-century symbolic reading is an innovation.",
  learningObjectives: [
    "Quote Jn 6:53–58.",
    "Cite Ignatius and Justin as the earliest realist readers.",
  ],
  primarySources: [
    "John 6:22–71",
    "Ignatius of Antioch, Smyrnaeans 7:1",
    "Justin Martyr, First Apology 66",
  ],
  items: [
    {
      id: "scr-j6-001",
      kind: "debate",
      difficulty: 4,
      tags: ["eucharist", "john-6", "evangelical"],
      opponentTradition: "NonDenom",
      opponentClaim:
        "John 6 is spiritual, not eucharistic. Jesus interprets it in v. 63: 'The flesh profits nothing; the words I speak are spirit and life.'",
      orthodoxRebuttal:
        "Three answers. (1) The 'flesh' (sarx) in v. 63 is the same Greek word used everywhere in John for the fallen, this-worldly mode of being (Jn 1:13; 3:6; 8:15). It is NOT the same referent as 'my flesh' (he sarx mou) in v. 54. Christ is saying 'the (mode of) flesh' — the carnal mind, the merely natural understanding — cannot grasp what He says about His flesh. Faith and the Spirit are required. (2) The disciples leave in v. 66 because the saying is intolerable. If He had meant 'this is merely a symbol,' He could have called them back and corrected the misunderstanding — as He does for other parables (Mt 13:36). Instead He doubles down: 'Will ye also go away?' (v. 67). (3) The earliest readers of this Gospel — Ignatius (~107, who personally knew the Apostle John and the community of his Gospel) and Justin (~155) — read it as eucharistic realism. The symbolic reading appears nowhere in Christian writing until the Reformation.",
      citations: [
        { source: "John 6:53–66" },
        { source: "Ignatius of Antioch, Smyrnaeans 7:1" },
        { source: "Justin Martyr, First Apology 66" },
        { source: "Cyril of Jerusalem, Mystagogical Catechesis IV.6" },
      ],
    },
  ],
};

export const oralAndWritten: Topic = {
  id: "oral-and-written",
  title: "Oral and Written Tradition (2 Thess 2:15)",
  summary:
    "St. Paul commands the Thessalonians to hold both the oral and the written apostolic tradition. The principle of sola scriptura — Scripture alone, against any 'tradition' — cannot stand here.",
  learningObjectives: [
    "Quote 2 Th 2:15.",
    "Show that the canon of Scripture itself is a tradition.",
  ],
  primarySources: ["2 Thessalonians 2:15", "1 Corinthians 11:2"],
  items: [
    {
      id: "scr-tr-001",
      kind: "identify-source",
      difficulty: 2,
      tags: ["tradition", "scripture"],
      prompt:
        "Identify the verse: 'Therefore, brethren, stand fast, and hold the traditions which ye have been taught, whether by word, or our epistle.'",
      choices: [
        { id: "a", text: "1 Corinthians 11:2" },
        { id: "b", text: "2 Thessalonians 2:15", rationale: "Correct." },
        { id: "c", text: "Hebrews 13:8" },
        { id: "d", text: "Jude 3" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "2 Thessalonians 2:15 (KJV)" }],
    },
  ],
};
