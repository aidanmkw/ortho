import type { Topic } from "@/lib/types";

export const modernFactsPack: Topic = {
  id: "modern-facts-pack",
  title: "Modern Issues — Quick Recall",
  summary: "MCQ pack on modern Orthodox issues and global situation.",
  learningObjectives: ["Drill the modern landscape."],
  primarySources: ["Various contemporary synodal documents"],
  items: [
    {
      id: "mod-fp-001",
      kind: "mcq",
      difficulty: 2,
      tags: ["autocephaly"],
      prompt: "What does 'autocephalous' mean of an Orthodox Church?",
      choices: [
        {
          id: "a",
          text:
            "Self-headed — governed by its own synod and primate, in full communion with the rest of Orthodoxy.",
          rationale:
            "From Greek autos + kephalē, 'self-headed.' An autocephalous Church has full canonical independence in administration while remaining one in faith with the rest of the Orthodox communion.",
        },
        {
          id: "b",
          text:
            "Self-headed — like a national Protestant denomination, no longer in sacramental communion with other Churches.",
          rationale:
            "Wrong. Autocephaly is administrative; communion with all Orthodox is preserved.",
        },
        {
          id: "c",
          text:
            "Under the universal jurisdiction of the Ecumenical Patriarch as primus inter pares.",
          rationale:
            "Wrong. The Ecumenical Patriarch holds primacy of honor, not universal jurisdiction over other autocephalous Churches.",
        },
        {
          id: "d",
          text:
            "Recognized only by the Patriarch of Constantinople, not by Moscow or the others.",
          rationale:
            "Wrong. That describes the contested status of certain new Churches (e.g., OCU), not autocephaly itself.",
        },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Standard Orthodox ecclesiology; Tomos of Autocephaly procedure" }],
    },
    {
      id: "mod-fp-002",
      kind: "mcq",
      difficulty: 3,
      tags: ["patriarchates"],
      prompt:
        "How many autocephalous Orthodox Churches are broadly recognized today?",
      choices: [
        {
          id: "a",
          text:
            "Approximately fourteen to fifteen (the exact count depends on the disputed status of the OCA and OCU).",
          rationale:
            "Constantinople, Alexandria, Antioch, Jerusalem, Russia, Serbia, Romania, Bulgaria, Georgia, Cyprus, Greece, Poland, Albania, Czech Lands and Slovakia, plus OCA and OCU with partial recognition.",
        },
        {
          id: "b",
          text:
            "Five — corresponding to the ancient Pentarchy of Rome, Constantinople, Alexandria, Antioch, and Jerusalem.",
          rationale:
            "Wrong. The Pentarchy is a first-millennium model; Rome left in 1054 and new autocephalous Churches were granted to Russia, Serbia, Romania, etc.",
        },
        {
          id: "c",
          text:
            "Nine — Constantinople plus the eight 'patriarchates' established by Justinian I's Novella 131.",
          rationale:
            "Wrong. Justinian's legislation does not enumerate autocephalous Churches in the modern sense.",
        },
        {
          id: "d",
          text:
            "Twenty-six — the same number of autocephalous Eastern Catholic Churches recognized by Rome.",
          rationale:
            "Wrong, and conflates the Catholic 'sui iuris' Churches with autocephalous Orthodoxy.",
        },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "Diptychs of the autocephalous Churches; OCA Tomos (1970); OCU Tomos (2019)" },
      ],
    },
    {
      id: "mod-fp-003",
      kind: "mcq",
      difficulty: 3,
      tags: ["ecumenical-patriarch"],
      prompt: "Where does the Ecumenical Patriarch reside today?",
      choices: [
        {
          id: "a",
          text:
            "At the Phanar — the Greek quarter of Istanbul (Constantinople), where the patriarchate has been since 1599.",
          rationale:
            "The cathedral is the Church of St. George at the Phanar. The patriarch has remained in Constantinople through the Ottoman and modern Turkish periods.",
        },
        {
          id: "b",
          text:
            "At the Holy Monastery of Vatopedi on Mount Athos, since the Ottoman conquest of Constantinople in 1453.",
          rationale:
            "Wrong. The patriarchate has always remained in Constantinople; it relocated within the city but never to Athos.",
        },
        {
          id: "c",
          text:
            "At Bartholomew House in Geneva, headquarters of the World Council of Churches representation since 1948.",
          rationale:
            "Wrong. The Phanar maintains a permanent representation at Geneva but the patriarchate itself is in Istanbul.",
        },
        {
          id: "d",
          text:
            "At the Cathedral of the Annunciation in Athens, since the Greek War of Independence (1830).",
          rationale:
            "Wrong. The Church of Greece (Athens) is a separate autocephalous Church, not the seat of the Ecumenical Patriarch.",
        },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Ecumenical Patriarchate of Constantinople — patriarchate.org" }],
    },
    {
      id: "mod-fp-004",
      kind: "mcq",
      difficulty: 3,
      tags: ["athos"],
      prompt: "On what peninsula is Mount Athos, the self-governing monastic republic?",
      choices: [
        {
          id: "a",
          text:
            "The easternmost finger of the Chalkidiki Peninsula in northern Greece, jutting into the Aegean.",
          rationale:
            "The 'Holy Mountain' (Hagion Oros) is the easternmost of the three Chalkidiki fingers. 20 ruling monasteries; women forbidden by ancient typikon (the 'Avaton').",
        },
        {
          id: "b",
          text:
            "The Crimean Peninsula, near the ancient see of Chersonesus where Sts. Cyril and Methodius were sent.",
          rationale: "Wrong. Athos is in Greece, not Crimea.",
        },
        {
          id: "c",
          text:
            "The Mani Peninsula in the southern Peloponnese, between the Messenian and Laconian gulfs.",
          rationale:
            "Wrong. Mani is in the southern Peloponnese and is famous for its towers and Byzantine churches, but is not Athos.",
        },
        {
          id: "d",
          text:
            "Cape Sounion at the southeastern tip of Attica, near the ancient temple of Poseidon.",
          rationale: "Wrong. Cape Sounion is in southern Attica, not a monastic republic.",
        },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Hagioritic Typikon (since AD 972)" }],
    },
    {
      id: "mod-fp-005",
      kind: "mcq",
      difficulty: 3,
      tags: ["athos", "20-monasteries"],
      prompt: "How many ruling monasteries are on Mount Athos?",
      choices: [
        {
          id: "a",
          text: "Twenty — seventeen Greek, one Russian (Panteleimonos), one Serbian (Hilandar), one Bulgarian (Zografou).",
          rationale: "Fixed by ancient typikon. No new ruling monastery has been added since the medieval period.",
        },
        {
          id: "b",
          text:
            "Twelve — one for each of the Apostles, established by Athanasios the Athonite in the 10th century.",
          rationale: "Wrong. Athanasios founded the Great Lavra (963) but Athos eventually grew to twenty monasteries.",
        },
        {
          id: "c",
          text:
            "Twenty-four — one for each of the Elders before the Throne in Revelation 4:4.",
          rationale: "Wrong. The number is twenty, not twenty-four.",
        },
        {
          id: "d",
          text:
            "Forty — including the sketes and kellia subordinate to the ruling houses.",
          rationale:
            "Wrong. There are many sketes and kellia, but they are dependencies, not ruling monasteries. Twenty ruling monasteries.",
        },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Hagioritic Typikon; current diptychs of Athonite monasteries" }],
    },
    {
      id: "mod-fp-006",
      kind: "mcq",
      difficulty: 4,
      tags: ["holy-synod"],
      prompt: "What is the Holy Synod of the Russian Orthodox Church today?",
      choices: [
        {
          id: "a",
          text:
            "The supreme governing council, chaired by the Patriarch of Moscow, composed of permanent and rotating member-bishops.",
          rationale:
            "Reconstituted after the 1917-18 Local Council restored the patriarchate (abolished by Peter the Great in 1721). Permanent members include the metropolitans of certain key sees; rotating ones serve a half-year term.",
        },
        {
          id: "b",
          text:
            "The lay assembly of elected delegates that elects the Patriarch and votes on doctrine.",
          rationale:
            "Wrong. The Russian Local Council (Pomestnyi Sobor) includes laity, but the Holy Synod is an episcopal body.",
        },
        {
          id: "c",
          text:
            "The body of state-appointed clergy supervising the Church — abolished after the 1917 Revolution and never restored.",
          rationale:
            "Wrong. That describes Peter the Great's Synod (1721-1917). It WAS restored in modified form after 1918.",
        },
        {
          id: "d",
          text:
            "An advisory committee of the patriarchates of Constantinople, Alexandria, and Antioch concerning Russian matters.",
          rationale: "Wrong. The Russian Holy Synod is internal to the Russian Church.",
        },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Statute of the Russian Orthodox Church (2000, amended 2008, 2013)" }],
    },
  ],
};
