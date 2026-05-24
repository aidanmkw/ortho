import type { Topic } from "@/lib/types";

export const bioethics: Topic = {
  id: "bioethics",
  title: "Bioethics: Abortion, IVF, End-of-Life",
  summary:
    "The Orthodox position on abortion (unequivocal opposition from Didache 2:2), IVF (problematic on theology of marriage and embryos), and end-of-life questions.",
  learningObjectives: [
    "Cite Didache 2:2 against abortion.",
    "State the consensus of Orthodox jurisdictions on abortion.",
  ],
  primarySources: [
    "Didache 2:2",
    "Council in Trullo (692), canon 91",
    "St. Basil the Great, Canonical Letters 188:2",
    "Bases of the Social Concept of the Russian Orthodox Church (2000), Part XII",
  ],
  items: [
    {
      id: "mod-bio-001",
      kind: "identify-source",
      difficulty: 3,
      tags: ["abortion", "didache"],
      prompt:
        "Identify the source of this command, written within the apostolic generation: 'Thou shalt not procure abortion, nor commit infanticide.'",
      choices: [
        { id: "a", text: "Didache 2:2", rationale: "Correct. The Two Ways (c. AD 50–110)." },
        { id: "b", text: "Epistle of Barnabas 19:5" },
        { id: "c", text: "Hippolytus, Apostolic Tradition 16" },
        { id: "d", text: "Tertullian, Apology 9" },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "Didache 2:2 (c. AD 50–110)" },
        { source: "Epistle of Barnabas 19:5 (parallel)" },
      ],
    },
  ],
};

export const sergianism: Topic = {
  id: "sergianism",
  title: "Sergianism & the Catacomb Church",
  summary:
    "Metropolitan Sergius (Stragorodsky)'s 1927 Declaration submitting the Moscow Patriarchate to the atheist Soviet state. The Catacomb (True Orthodox) response, the ROCOR position, and the 2007 reconciliation.",
  learningObjectives: [
    "State the date of Sergius's Declaration.",
    "Identify the responses of the Catacomb Church and ROCOR.",
    "Note the 2007 reunion of Moscow Patriarchate and ROCOR.",
  ],
  primarySources: [
    "Met. Sergius, Declaration of 29 July 1927",
    "Letters of the Catacomb hierarchs (Hilarion Troitsky, Joseph of Petrograd)",
    "Act of Canonical Communion (Moscow / ROCOR, 17 May 2007)",
  ],
  items: [
    {
      id: "mod-srg-001",
      kind: "qa",
      difficulty: 4,
      tags: ["sergianism", "russia"],
      prompt:
        "What was Met. Sergius's 1927 Declaration, and what was its consequence for Russian Orthodox unity?",
      expectedAnswer:
        "On 29 July 1927, Met. Sergius of Nizhni-Novgorod, acting Patriarchal Locum-Tenens, issued a Declaration to the Russian Church and people pledging full civic loyalty to the Soviet state and treating its 'joys and sorrows' as the Church's own. The Declaration was rejected by many bishops and clergy as a betrayal of the Church under persecution. The non-commemorating remnant became the Catacomb Church; the Russian Church Abroad (ROCOR) broke communion with the Moscow Patriarchate. The MP and ROCOR did not reunite until 17 May 2007.",
      citations: [
        { source: "Declaration of Met. Sergius (29 July 1927)" },
        { source: "Act of Canonical Communion (17 May 2007)" },
      ],
    },
  ],
};

export const ukraine: Topic = {
  id: "ukraine",
  title: "Ukraine — OCU and UOC-MP",
  summary:
    "The 2018 Tomos of Autocephaly from the Ecumenical Patriarchate to the new Orthodox Church of Ukraine (OCU), creating a deep canonical dispute with the Moscow Patriarchate. The position is contested across Orthodoxy; the Apologist should know the arguments without taking partisan sides.",
  learningObjectives: [
    "State the date of the Tomos.",
    "Summarize the canonical arguments for and against.",
  ],
  primarySources: [
    "Tomos of Autocephaly of the OCU (6 January 2019)",
    "Synodal letters of the Moscow Patriarchate, 2018–present",
    "Statements from autocephalous Churches (varied recognition)",
  ],
  items: [
    {
      id: "mod-ukr-001",
      kind: "qa",
      difficulty: 4,
      tags: ["ukraine", "autocephaly"],
      prompt:
        "When was the Tomos of Autocephaly granted to the Orthodox Church of Ukraine (OCU), and what is its current canonical status?",
      expectedAnswer:
        "The Tomos was issued by Ecumenical Patriarch Bartholomew on 6 January 2019. The OCU is recognized by Constantinople, Alexandria, Greece, and Cyprus; not recognized by Moscow, Antioch, Serbia, and others. The Ukrainian Orthodox Church under Met. Onufriy (formerly UOC-MP) remains in communion with Moscow. The dispute is unresolved and is the largest canonical fracture in Orthodoxy since the schism with the Oriental Orthodox in the 5th century.",
      citations: [
        { source: "Tomos of Autocephaly, 6 January 2019" },
        { source: "Various synodal letters of autocephalous churches" },
      ],
    },
  ],
};

export const americanJurisdictions: Topic = {
  id: "american-jurisdictions",
  title: "American Orthodox Jurisdictions",
  summary:
    "The canonical anomaly of multiple jurisdictions in the diaspora — OCA, Greek Archdiocese, Antiochian, ROCOR, Serbian, Romanian, Bulgarian, etc. Origin in immigration patterns; current discussion of an American autocephaly.",
  learningObjectives: [
    "List the major American Orthodox jurisdictions.",
    "Explain the canonical 'one bishop per city' rule and how diaspora has compromised it.",
  ],
  primarySources: [
    "Assembly of Canonical Orthodox Bishops of the USA (since 2010)",
    "OCA Statement of Autocephaly (1970)",
  ],
  items: [
    {
      id: "mod-am-001",
      kind: "mcq",
      difficulty: 3,
      tags: ["american-orthodoxy"],
      prompt:
        "Which Orthodox jurisdiction in America was granted autocephaly by the Moscow Patriarchate in 1970, though that autocephaly is not universally recognized?",
      choices: [
        { id: "a", text: "Orthodox Church in America (OCA)", rationale: "Correct. Granted by Moscow 10 April 1970." },
        { id: "b", text: "Greek Orthodox Archdiocese of America (GOA)" },
        { id: "c", text: "Antiochian Christian Archdiocese (ACROD)" },
        { id: "d", text: "Russian Orthodox Church Outside Russia (ROCOR)" },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "OCA Tomos of Autocephaly (10 April 1970, Moscow)" },
      ],
    },
  ],
};
