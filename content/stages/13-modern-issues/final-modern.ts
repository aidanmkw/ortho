import type { Topic } from "@/lib/types";

export const modernFinalPack: Topic = {
  id: "modern-final-pack",
  title: "Modern — Final Pack",
  summary: "Final MCQs on modern Orthodox issues.",
  learningObjectives: ["Drill the modern landscape."],
  primarySources: ["Contemporary synodal documents"],
  items: [
    {
      id: "mod-fin-001",
      kind: "mcq",
      difficulty: 3,
      tags: ["paris-school"],
      prompt: "What was the 'Paris School' of Russian Orthodox theology in the 20th century?",
      choices: [
        {
          id: "a",
          text:
            "Russian émigré theologians at the St. Sergius Institute in Paris from 1925 — Bulgakov, Lossky, Florovsky, Schmemann, Meyendorff.",
          rationale:
            "After the Bolshevik Revolution, the Russian intellectual emigration formed St. Sergius (1925), which became the crucible of modern Orthodox theology in dialogue with the West.",
        },
        {
          id: "b",
          text:
            "An 11th-century Constantinopolitan circle around the philosopher John Italos, condemned for over-Platonizing Trinitarian theology.",
          rationale:
            "Wrong — but John Italos was a real figure condemned by a synod of 1082 for excessive Platonism. The 'Paris School' is twentieth-century, not eleventh.",
        },
        {
          id: "c",
          text:
            "A reformist movement among 19th-century Russian seminarians at the Moscow Theological Academy under Metropolitan Filaret Drozdov.",
          rationale:
            "Wrong. Filaret (1782-1867) led a real reform of Russian theological education, but the 'Paris School' is the post-1917 emigration.",
        },
        {
          id: "d",
          text:
            "A medieval mystical movement of women anchorites in southern France, comparable to the Beguines of the Low Countries.",
          rationale:
            "Wrong, and a Western Catholic movement (the Beguines/Beghards) — not Russian Orthodox at all.",
        },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "Andrew Louth, Modern Orthodox Thinkers (2015)" },
        { source: "Aidan Nichols, Theology in the Russian Diaspora (1989)" },
      ],
    },
    {
      id: "mod-fin-002",
      kind: "mcq",
      difficulty: 3,
      tags: ["st-vladimirs"],
      prompt: "What is St. Vladimir's Orthodox Theological Seminary?",
      choices: [
        {
          id: "a",
          text:
            "The flagship seminary of the Orthodox Church in America (OCA), founded 1938, located in Yonkers, New York.",
          rationale:
            "Schmemann, Meyendorff, and Hopko taught there; St Vladimir's Seminary Press is the principal English-language Orthodox theological publisher in North America.",
        },
        {
          id: "b",
          text:
            "The pre-Revolutionary academy of Kyiv, founded by St. Vladimir himself in 988, destroyed by the Soviets in 1922.",
          rationale:
            "Wrong. The Kyiv-Mohyla Academy is the historic Kyivan school, founded 1632 — not 988. St. Vladimir's in Yonkers is twentieth century.",
        },
        {
          id: "c",
          text:
            "A Russian Orthodox cathedral in Sevastopol commemorating the baptism of Rus' (988).",
          rationale:
            "Wrong, but St. Vladimir's Cathedral in Sevastopol IS a real building (commemorating Vladimir's baptism). The seminary is a different thing.",
        },
        {
          id: "d",
          text:
            "A Constantinopolitan academy founded under Patriarch Photios in the late 9th century to train missionaries to the Slavs.",
          rationale:
            "Wrong, but Photios DID train missionaries to the Slavs (Cyril and Methodius). The seminary in question is a 20th-c. American institution.",
        },
      ],
      correctChoiceId: "a",
      citations: [{ source: "St. Vladimir's Orthodox Theological Seminary, Yonkers NY" }],
    },
    {
      id: "mod-fin-003",
      kind: "mcq",
      difficulty: 3,
      tags: ["holy-trinity-seminary"],
      prompt: "What is Holy Trinity Orthodox Seminary at Jordanville?",
      choices: [
        {
          id: "a",
          text:
            "The seminary of the Russian Orthodox Church Outside Russia (ROCOR), located in Jordanville, New York, since 1948.",
          rationale:
            "More traditional in liturgical and pastoral style than St. Vladimir's; associated with the Holy Trinity Monastery on the same campus.",
        },
        {
          id: "b",
          text:
            "The principal theological academy of the Moscow Patriarchate, located at the Trinity-Sergius Lavra outside Moscow.",
          rationale:
            "Wrong — but the Moscow Theological Academy at Sergiyev Posad is a real, ancient institution. Jordanville is its ROCOR-American counterpart.",
        },
        {
          id: "c",
          text:
            "The Antiochian Archdiocese's seminary in Pennsylvania, founded by Patriarch Ignatius IV in the 1980s.",
          rationale:
            "Wrong. The Antiochian Archdiocese partners with St. Vladimir's and Balamand (Lebanon); it has no separate American seminary.",
        },
        {
          id: "d",
          text:
            "A Greek Orthodox theological school of the Ecumenical Patriarchate at the Phanar in Istanbul, closed by Turkey in 1971.",
          rationale:
            "Wrong — but Halki Theological School (closed 1971 by Turkey) is real and a sore point in Greek-Turkish relations. Jordanville is an American ROCOR institution.",
        },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Holy Trinity Orthodox Seminary, Jordanville NY" }],
    },
    {
      id: "mod-fin-004",
      kind: "mcq",
      difficulty: 4,
      tags: ["crete-2016"],
      prompt: "What was the Holy and Great Council of Crete (June 2016)?",
      choices: [
        {
          id: "a",
          text:
            "A long-prepared pan-Orthodox synod attended by ten of the fourteen autocephalous Churches; its documents on ecumenism, marriage, and fasting remain contested.",
          rationale:
            "Russia, Antioch, Bulgaria, and Georgia withdrew before the council met. Its decisions have been received unevenly across world Orthodoxy.",
        },
        {
          id: "b",
          text:
            "A council convened by Patriarch Bartholomew at Chambésy that formally lifted the anathemas of 1054 between Rome and Constantinople.",
          rationale:
            "Wrong. The 1054 anathemas were lifted by Athenagoras and Paul VI in 1965 — long before Crete and at Constantinople/Rome, not Chambésy.",
        },
        {
          id: "c",
          text:
            "A reunion council between the Orthodox and the Oriental (non-Chalcedonian) Churches that lifted mutual anathemas after fifteen centuries.",
          rationale:
            "Wrong. The Orthodox-Oriental dialogue produced the Chambésy agreements (1989-1990) but no formal reunion has occurred.",
        },
        {
          id: "d",
          text:
            "A council that defined the canonical status of the Ukrainian Orthodox Church (OCU) and its independence from Moscow.",
          rationale:
            "Wrong. The OCU received its Tomos in January 2019 from Constantinople alone, not from a pan-Orthodox council.",
        },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "Documents of the Holy and Great Council, Crete, June 2016" },
      ],
    },
    {
      id: "mod-fin-005",
      kind: "mcq",
      difficulty: 3,
      tags: ["sergianism"],
      prompt: "What does 'Sergianism' refer to in current Russian Orthodox discourse?",
      choices: [
        {
          id: "a",
          text:
            "The 1927 Declaration of Metropolitan Sergius pledging loyalty of the Church to the Soviet state — used today as shorthand for any clerical compromise with secular power.",
          rationale:
            "Sergius's pledge that the joys and sorrows of the USSR would be the Church's own. Traditionalists charge the current Moscow leadership with renewed Sergianism toward the Russian state.",
        },
        {
          id: "b",
          text:
            "The school of monastic spirituality founded by St. Sergius of Radonezh in the 14th century at the Trinity-Sergius Lavra.",
          rationale:
            "Wrong. St. Sergius of Radonezh and the Lavra tradition are entirely positive; 'Sergianism' is a pejorative tied to Metropolitan Sergius Stragorodsky (d. 1944).",
        },
        {
          id: "c",
          text:
            "The 19th-century liturgical reform that introduced Russian vernacular into parts of the Slavonic liturgy under Patriarch Sergius.",
          rationale:
            "Wrong. No such reform occurred under a 'Patriarch Sergius'; Russian liturgical language remains primarily Slavonic.",
        },
        {
          id: "d",
          text:
            "The historiographical school of Sergei Solovyov that interpreted Russian history through the lens of Orthodox messianic destiny.",
          rationale:
            "Wrong — but Sergei Solovyov (1820-1879) WAS a real Russian historian. 'Sergianism' refers to a 20th-century church-state controversy.",
        },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "Declaration of Metropolitan Sergius, 29 July 1927" },
        { source: "Russian Catacomb Church writings; ROCOR pre-2007 documentation" },
      ],
    },
  ],
};
