import type { Topic } from "@/lib/types";

export const antony: Topic = {
  id: "antony-great",
  title: "St. Anthony the Great",
  summary:
    "Father of monasticism (c. 251–356). Withdrew to the Egyptian desert; his life by St. Athanasius became the founding document of Christian monastic spirituality.",
  learningObjectives: [
    "State Anthony's dates and longevity (105 years).",
    "Quote one Antonine saying.",
    "Identify Athanasius's Life of Antony.",
  ],
  primarySources: [
    "St. Athanasius, Life of Antony (~AD 360)",
    "Apophthegmata Patrum, Anthony 1–38",
  ],
  items: [
    {
      id: "saint-ant-001",
      kind: "identify-source",
      difficulty: 3,
      tags: ["antony", "desert"],
      prompt:
        "Identify the saying: 'I no longer fear God; I love Him.'",
      choices: [
        { id: "a", text: "Apophthegmata Patrum, Abba Anthony 32", rationale: "Correct." },
        { id: "b", text: "Macarius the Great, Spiritual Homilies" },
        { id: "c", text: "Symeon the New Theologian, Catechesis 28" },
        { id: "d", text: "Isaac of Syria, Ascetical Homilies" },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "Apophthegmata Patrum, Abba Anthony 32" },
      ],
    },
    {
      id: "saint-ant-002",
      kind: "qa",
      difficulty: 2,
      tags: ["athanasius", "life-of-antony"],
      prompt:
        "Who wrote the Life of Antony, and what was its historical impact?",
      expectedAnswer:
        "St. Athanasius the Great wrote the Life of Antony c. AD 360. It was translated into Latin within a generation and became the foundational document of Christian monastic spirituality East and West. Augustine reports in his Confessions (VIII.6) that hearing of Antony's life moved him to his own conversion.",
      citations: [
        { source: "St. Athanasius, Life of Antony" },
        { source: "St. Augustine, Confessions VIII.6 (~AD 397)" },
      ],
    },
  ],
};

export const sergiusOfRadonezh: Topic = {
  id: "sergius-radonezh",
  title: "St. Sergius of Radonezh",
  summary:
    "(1314–1392) Founder of the Trinity-Sergius Lavra; the principal figure of the Russian monastic and national revival of the 14th century; spiritual father of the prince who would defeat the Mongols at Kulikovo (1380).",
  learningObjectives: [
    "Identify the Trinity-Sergius Lavra.",
    "Date and name the battle blessed by Sergius.",
  ],
  primarySources: [
    "St. Epiphanius the Wise, Life of St. Sergius of Radonezh",
  ],
  items: [
    {
      id: "saint-ser-001",
      kind: "qa",
      difficulty: 3,
      tags: ["sergius", "russia"],
      prompt:
        "What battle did St. Sergius of Radonezh bless Grand Prince Dmitry of Moscow before, and what was its outcome?",
      expectedAnswer:
        "The Battle of Kulikovo, September 8, 1380. The Russians under Dmitry Donskoy defeated the Tatar-Mongol forces under Mamai — the first major Russian victory after over a century of Mongol-Tatar yoke. Sergius blessed Dmitry and sent two of his own monks, Peresvet and Oslyabya (both formerly warriors), who fell in battle.",
      citations: [
        { source: "St. Epiphanius the Wise, Life of St. Sergius of Radonezh" },
      ],
    },
  ],
};

export const americanSaints: Topic = {
  id: "american-saints",
  title: "American Saints",
  summary:
    "St. Herman of Alaska (1756–1837), St. Innocent of Alaska (1797–1879), St. Tikhon (1865–1925, also Patriarch of Moscow), St. Raphael of Brooklyn (1860–1915), St. John Maximovitch of Shanghai and San Francisco (1896–1966), St. Sebastian Dabovich.",
  learningObjectives: [
    "Identify each American saint's dates and contribution.",
    "Date the foundation of the Russian Orthodox mission in Alaska (1794).",
  ],
  primarySources: [
    "Lives of the American saints (OCA, ROCOR glorifications)",
    "Father Seraphim Rose, St. Herman: Apostle to America",
  ],
  items: [
    {
      id: "saint-am-001",
      kind: "qa",
      difficulty: 3,
      tags: ["herman-of-alaska", "alaska-mission"],
      prompt:
        "When did the Russian Orthodox mission to Alaska begin, and who was its most famous member?",
      expectedAnswer:
        "The mission began on Kodiak Island in 1794 with a band of 10 monks from Valaam, including St. Herman. St. Herman remained alone after the others returned or died, serving the Aleut people on Spruce Island near Kodiak. He reposed in 1837 and was canonized in 1970 as the first Orthodox saint of America.",
      citations: [
        { source: "OCA glorification of St. Herman (August 9, 1970)" },
      ],
    },
  ],
};
