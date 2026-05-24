import type { Topic } from "@/lib/types";

export const apostles: Topic = {
  id: "twelve-apostles",
  title: "The Twelve Apostles",
  summary:
    "Their sees, missions, and manner of martyrdom. The geographic explosion of the Gospel by the men who had walked with the Lord.",
  learningObjectives: [
    "Match each Apostle to his principal mission field.",
    "Identify the only Apostle to die a natural death (John).",
  ],
  primarySources: [
    "Eusebius, Ecclesiastical History 3.1",
    "Acts of the Apostles",
    "Origen, Commentary on Genesis (in Eusebius EH 3.1)",
  ],
  items: [
    {
      id: "saint-ap-001",
      kind: "mcq",
      difficulty: 3,
      tags: ["apostles", "martyrdom"],
      prompt:
        "Which of the Twelve Apostles is the only one whom the universal tradition does NOT identify as a martyr?",
      choices: [
        { id: "a", text: "St. Andrew (martyred in Patras)" },
        { id: "b", text: "St. Thomas (martyred in India)" },
        { id: "c", text: "St. John the Theologian — died of natural causes in old age at Ephesus.", rationale: "Correct. The tradition is universal that John died last of the Apostles, at great age." },
        { id: "d", text: "St. Bartholomew (flayed in Armenia)" },
      ],
      correctChoiceId: "c",
      citations: [
        { source: "Eusebius EH 3.1, 3.23" },
        { source: "Polycrates of Ephesus in Eusebius EH 5.24" },
      ],
    },
    {
      id: "saint-ap-002",
      kind: "qa",
      difficulty: 2,
      tags: ["paul"],
      prompt:
        "Where and how did St. Paul die, and approximately when?",
      expectedAnswer:
        "He was beheaded outside Rome under Nero, c. AD 64–67 — Roman citizenship prevented him from being crucified like St. Peter. His martyrdom is attested by 1 Clement 5 (c. 96) and by Tertullian (Scorpiace 15; De Praescriptione 36).",
      citations: [
        {
          source: "St. Clement of Rome, 1 Clement 5 (~AD 96)",
          quote:
            "Paul... having taught righteousness unto the whole world, and come to the extremity of the West, and having borne witness before rulers, so departed from the world and went unto the holy place.",
        },
      ],
    },
  ],
};

export const maryOfEgypt: Topic = {
  id: "mary-of-egypt",
  title: "St. Mary of Egypt",
  summary:
    "Former prostitute, who fled to the Egyptian desert in repentance and lived 47 years in extreme asceticism. Commemorated April 1 and the Fifth Sunday of Great Lent. Her vita is read in full at the Great Canon of St. Andrew of Crete.",
  learningObjectives: [
    "State her dates (c. 344 – c. 421).",
    "Identify her commemoration on the Fifth Sunday of Lent.",
  ],
  primarySources: [
    "St. Sophronius of Jerusalem, Life of Mary of Egypt (~AD 630)",
  ],
  items: [
    {
      id: "saint-me-001",
      kind: "qa",
      difficulty: 2,
      tags: ["mary-of-egypt", "lent"],
      prompt:
        "Why is St. Mary of Egypt commemorated on the Fifth Sunday of Great Lent in the Orthodox Church?",
      expectedAnswer:
        "She is held up as the supreme exemplar of repentance — that no sin is so grave it cannot be wiped clean by tears and a life turned wholly to Christ. The Fifth Sunday's commemoration concludes the Lenten ascent to Pascha with the testimony of a former harlot become holy through 47 years of desert repentance.",
      citations: [
        { source: "St. Sophronius of Jerusalem, Life of Mary of Egypt" },
        { source: "Triodion — Fifth Sunday of Great Lent" },
      ],
    },
  ],
};

export const newMartyrs: Topic = {
  id: "new-martyrs",
  title: "The New Martyrs of the 20th Century",
  summary:
    "The Soviet, Ottoman, and other 20th-century martyrs — the Royal Romanov Family, Hilarion (Troitsky), Elizabeth the Grand Duchess, Justin Popović's witness, and the hundreds of thousands of Russian, Greek, Romanian, Serbian, and Ukrainian Orthodox killed for the faith.",
  learningObjectives: [
    "Identify the Romanov family's date of martyrdom (16/17 July 1918).",
    "Name three Russian new martyrs.",
  ],
  primarySources: [
    "Lives of the Russian New Martyrs (Eugene Trubetskoy; Hilarion Troitsky)",
    "Decisions of glorification of the Russian Church (1981 ROCOR; 2000 Moscow Patriarchate)",
  ],
  items: [
    {
      id: "saint-nm-001",
      kind: "qa",
      difficulty: 3,
      tags: ["new-martyrs", "romanovs"],
      prompt:
        "On what date was the Royal Family of Russia martyred, and where?",
      expectedAnswer:
        "On the night of 16–17 July 1918, in the basement of the Ipatiev House in Yekaterinburg. The Bolsheviks shot and bayoneted Tsar Nicholas II, Tsaritsa Alexandra, the four Grand Duchesses (Olga, Tatiana, Maria, Anastasia), and Tsarevich Alexei, along with their physician Dr. Botkin, the cook, the maid, and the footman. They were glorified by the ROCOR in 1981 and by the Moscow Patriarchate in 2000 as Passion-Bearers (a particular Russian category of saintly martyrdom). Commemoration: July 4 (Julian) / July 17 (Gregorian).",
      citations: [
        { source: "Decision of glorification, Moscow Patriarchate, August 2000" },
      ],
    },
  ],
};

export const greekModern: Topic = {
  id: "greek-modern",
  title: "Modern Greek Saints",
  summary:
    "Cosmas Aitolos, Nektarios of Aegina, Paisios of Mount Athos, Porphyrios of Kavsokalyvia, Iakovos Tsalikis.",
  learningObjectives: [
    "Identify each saint's dates and principal contribution.",
    "Quote one saying from St. Paisios.",
  ],
  primarySources: [
    "Elder Paisios, Spiritual Counsels (six volumes)",
    "Elder Porphyrios, Wounded by Love",
    "Vita of St. Nektarios (1846–1920)",
  ],
  items: [
    {
      id: "saint-grk-001",
      kind: "qa",
      difficulty: 2,
      tags: ["paisios"],
      prompt:
        "When was St. Paisios of Mount Athos glorified by the Ecumenical Patriarchate, and what are his dates?",
      expectedAnswer:
        "He was born Arsenios Eznepidis (1924–1994) in Pontian Cappadocia, raised in Konitsa, Greece. He served on Mount Athos and at the Stomion Monastery; he died July 12, 1994. He was glorified by the Ecumenical Patriarchate on January 13, 2015. Commemoration: July 12.",
      citations: [
        { source: "Ecumenical Patriarchate, Synodical decision of glorification (January 13, 2015)" },
        { source: "Elder Paisios, Spiritual Counsels (Holy Monastery of Souroti)" },
      ],
    },
  ],
};
