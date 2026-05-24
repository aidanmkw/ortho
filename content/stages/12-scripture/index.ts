import type { Stage } from "@/lib/types";
import {
  hermeneutics,
  johnSix,
  oralAndWritten,
} from "./more-scripture";
import {
  matthewSixteen,
  johnSeventeen,
  romans5,
} from "./disputed-texts";

export const stage12: Stage = {
  id: "12-scripture",
  order: 12,
  title: "Scripture",
  subtitle: "Septuagint, canon, deuterocanon, hermeneutics",
  description:
    "The Bible the Apostles read and quoted (LXX), the canon as discerned by the Church, the so-called Apocrypha, and patristic hermeneutics — anchored against the Reformation's pruning of the OT and against modernist scholarship.",
  rank: "Confessor",
  topics: [
    {
      id: "septuagint",
      title: "The Septuagint",
      summary:
        "The Greek translation of the Hebrew Scriptures by the seventy elders in Alexandria (3rd–2nd c. BC). The Bible of the Apostles — over 80% of NT OT citations follow the LXX text against the Masoretic.",
      learningObjectives: [
        "State the LXX's role as the Apostles' Bible.",
        "Cite Mt 1:23 / Is 7:14 — parthenos vs. almah.",
      ],
      primarySources: [
        "The Letter of Aristeas (legendary account of the Seventy)",
        "Philo, Life of Moses II.25–44",
        "Justin Martyr, Dialogue with Trypho 71–73",
      ],
      items: [
        {
          id: "scr-lxx-001",
          kind: "qa",
          difficulty: 3,
          tags: ["septuagint", "isaiah-7-14"],
          prompt:
            "Why is the Septuagint's reading of Isaiah 7:14 significant for the Apostolic preaching of Christ?",
          expectedAnswer:
            "The LXX translates the Hebrew almah as parthenos (virgin), giving 'a virgin shall conceive.' St. Matthew (1:23), writing in Greek, follows the LXX exactly. The Hebrew text underlying the later Masoretic edition is ambiguous (almah may mean 'young woman'), but the Apostolic Church received the LXX as its Scripture, and the Virgin's conception is read out of the LXX text. Justin Martyr's Dialogue with Trypho 71–73 already engages the dispute with Hellenistic Jews over precisely this rendering.",
          citations: [
            {
              source: "Isaiah 7:14 LXX; Matthew 1:23",
              quote:
                "Ἰδοὺ ἡ παρθένος ἐν γαστρὶ ἕξει — Behold, the virgin shall conceive.",
            },
            { source: "St. Justin Martyr, Dialogue with Trypho 71–73" },
          ],
        },
      ],
    },
    {
      id: "canon",
      title: "The Old Testament Canon",
      summary:
        "The Orthodox Old Testament — 49 books, including the ten or so 'anaginōskomena' (read in the Church) that the Reformers cut. The Apostles quoted from these, and the Church received them.",
      learningObjectives: [
        "List the principal anaginōskomena.",
        "Date their universal rejection by Protestants.",
        "Cite NT use of these books (Wisdom in Hebrews; Sirach in James).",
      ],
      primarySources: [
        "Council of Carthage (397) — canon list",
        "Council in Trullo (692), canon 2 — receives Apostolic Canon 85",
        "St. Athanasius, Festal Letter 39",
        "Confession of Dositheus (1672), Decree 3",
      ],
      items: [
        {
          id: "scr-can-001",
          kind: "debate",
          difficulty: 5,
          tags: ["canon", "deuterocanon"],
          opponentTradition: "Reformed",
          opponentClaim:
            "The Apocrypha (Tobit, Wisdom, Sirach, Maccabees, etc.) are not Scripture. They were rejected by the Jews and added later by the Roman Church.",
          orthodoxRebuttal:
            "Three answers. (1) The Apostles quoted from these books. Hebrews 11:35 ('Others were tortured, not accepting deliverance, that they might obtain a better resurrection') refers directly to 2 Maccabees 7 — the martyrdom of the seven brothers and their mother. James 1:13 (God 'cannot be tempted with evil') echoes Sirach 15:11–20. Jude 9 (Michael disputing the body of Moses) draws from the Assumption of Moses tradition; Jude 14–15 quotes 1 Enoch directly. (2) These books were in the LXX — the Bible of the Apostolic Church — and were retained in every Christian canon of the first 1,500 years. Carthage (397), Trullo (692), and the Confession of Dositheus (1672) all list them. (3) The Jewish rejection of these books was after the Apostolic era — at Jamnia (c. 90, contested as to its precise decisions) and crystallized in the Masoretic tradition. To follow the post-Christian rabbinic decision against the Christian usage is to undo the apostolic deposit. Luther himself wished to remove Hebrews, James, Jude, and Revelation from the New Testament for similar a priori reasons; he eventually relented on those, but cut the Old Testament. The Reformation principle 'sola scriptura' selected its own scripture by external criteria — which is precisely the problem.",
          rejoinders: [
            {
              objection: "But Jerome objected to the deuterocanon as not in the Hebrew canon.",
              reply:
                "Jerome had a preference for the Hebraica veritas, but he translated and retained the deuterocanon in the Vulgate. Augustine and the African councils overruled him. Jerome's preference never became the rule of the Church.",
            },
          ],
          citations: [
            { source: "Hebrews 11:35 (referring to 2 Macc 7)" },
            { source: "Council of Carthage (397), canon 24 — canon list" },
            { source: "Council in Trullo (692), canon 2" },
            {
              source: "Confession of Dositheus (1672), Decree 3",
              quote:
                "We deem [the deuterocanonical books] to be canonical books of the Scripture, and call them sacred Scripture.",
            },
          ],
        },
      ],
    },
    hermeneutics,
    johnSix,
    oralAndWritten,
    matthewSixteen,
    johnSeventeen,
    romans5,
  ],
};
