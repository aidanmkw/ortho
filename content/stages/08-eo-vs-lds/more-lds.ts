import type { Topic } from "@/lib/types";

export const polygamy: Topic = {
  id: "polygamy",
  title: "Plural Marriage",
  summary:
    "Joseph Smith's polygamy and polyandry (documented in Doctrine & Covenants 132 and the Joseph Smith Papers); the 1890 Manifesto; post-Manifesto polygamy until c. 1904; fundamentalist Mormon continuance.",
  learningObjectives: [
    "Date D&C 132 and identify its content.",
    "Identify Joseph Smith's polyandrous sealings (marriages to women already married to other living men).",
    "Quote the LDS Gospel Topics Essay 'Plural Marriage in Kirtland and Nauvoo.'",
  ],
  primarySources: [
    "Doctrine & Covenants 132",
    "Joseph Smith Papers — affidavits, sealing records",
    "LDS Gospel Topics Essay: 'Plural Marriage in Kirtland and Nauvoo' (2014)",
    "LDS Gospel Topics Essay: 'The Manifesto and the End of Plural Marriage' (2014)",
  ],
  items: [
    {
      id: "lds-poly-001",
      kind: "qa",
      difficulty: 4,
      tags: ["polygamy", "joseph-smith"],
      prompt:
        "Approximately how many women did Joseph Smith marry as plural wives, and how many of those were sealed to him while still legally married to other living men?",
      expectedAnswer:
        "The LDS Church's own 2014 'Plural Marriage in Kirtland and Nauvoo' Gospel Topics Essay acknowledges Joseph Smith had 'sealings' to between 30 and 40 women in his lifetime. The essay states that some of these women — at least a third — were already legally married to other living men at the time of their sealing to Smith (polyandrous sealings). The essay notes: 'The youngest was Helen Mar Kimball, the daughter of Joseph's close friends Heber C. and Vilate Murray Kimball, who was sealed to Joseph several months before her 15th birthday.'",
      citations: [
        {
          source:
            "LDS Church, Gospel Topics Essay: 'Plural Marriage in Kirtland and Nauvoo' (2014)",
        },
        { source: "Doctrine & Covenants 132 (revealed 1843)" },
      ],
    },
  ],
};

export const priesthoodBan: Topic = {
  id: "priesthood-ban",
  title: "The Black Priesthood Ban (1852–1978)",
  summary:
    "Brigham Young's policy (1852) prohibited men of African descent from holding the LDS priesthood. Reversed by revelation through Spencer W. Kimball (1978). The 2013 LDS essay 'Race and the Priesthood' addresses the doctrinal teachings underlying the ban.",
  learningObjectives: [
    "Date the institution and reversal of the ban.",
    "Quote the 2013 Race and the Priesthood essay's repudiation.",
  ],
  primarySources: [
    "Brigham Young, sermons 1852–1855 (Journal of Discourses)",
    "Official Declaration 2 (1978)",
    "LDS Church, Gospel Topics Essay: 'Race and the Priesthood' (2013)",
  ],
  items: [
    {
      id: "lds-pb-001",
      kind: "qa",
      difficulty: 4,
      tags: ["race", "priesthood"],
      prompt:
        "What does the LDS Church's official 2013 Gospel Topics Essay 'Race and the Priesthood' say about the doctrines used to justify the 1852–1978 ban?",
      expectedAnswer:
        "The essay states: 'Today, the Church disavows the theories advanced in the past that black skin is a sign of divine disfavor or curse, or that it reflects unrighteous actions in a premortal life; that mixed-race marriages are a sin; or that blacks or people of any other race or ethnicity are inferior in any way to anyone else. Church leaders today unequivocally condemn all racism, past and present, in any form.' This is an official disavowal of teachings explicitly published by prophets, apostles, and General Authorities for over 125 years.",
      citations: [
        {
          source:
            "LDS Church, Gospel Topics Essay: 'Race and the Priesthood' (2013)",
          quote:
            "Today, the Church disavows the theories advanced in the past that black skin is a sign of divine disfavor or curse, or that it reflects unrighteous actions in a premortal life.",
        },
      ],
    },
  ],
};

export const bookOfMormonArch: Topic = {
  id: "book-of-mormon-archaeology",
  title: "Book of Mormon — Archaeology, Genetics, and Anachronisms",
  summary:
    "Pre-Columbian American archaeology and DNA studies fail to corroborate any element of Book of Mormon civilizations (Nephites, Lamanites, Jaredites). Multiple New World anachronisms (steel, horses, wheels, silk, barley) appear in the text but did not exist in pre-Columbian America.",
  learningObjectives: [
    "List the anachronisms.",
    "State the DNA / archaeological consensus on Native American origins.",
    "Engage charitably with FAIR Mormon apologetics.",
  ],
  primarySources: [
    "Smithsonian Institution, Statement on the Book of Mormon (1996, 2007)",
    "Simon G. Southerton, Losing a Lost Tribe: Native Americans, DNA, and the Mormon Church (2004)",
    "LDS Gospel Topics Essay: 'Book of Mormon and DNA Studies' (2014)",
  ],
  items: [
    {
      id: "lds-bom-001",
      kind: "qa",
      difficulty: 4,
      tags: ["book-of-mormon", "anachronism"],
      prompt:
        "Name three documented anachronisms in the Book of Mormon — items or animals named in the text that did not exist in the pre-Columbian Americas.",
      expectedAnswer:
        "Examples include: (1) Steel — used by Nephi for swords (1 Nephi 4:9) and Laban's sword 'of the most precious steel'; pre-Columbian Americans had no steel metallurgy. (2) Horses — repeatedly named (Enos 1:21; Alma 18:9–12) and used in Nephite/Lamanite warfare; horses were extinct in the Americas from c. 10,000 BC until Spanish reintroduction. (3) Wheeled chariots (Alma 18:9–12). (4) Silk and linen (Alma 1:29; Ether 9:17) — pre-Columbian peoples had no silk and no linen. (5) Domesticated cattle, oxen, sheep, swine (Enos 1:21; Ether 9:18) — none existed in the pre-Columbian Americas. (6) Barley (Mosiah 7:22) — no pre-Columbian American barley.",
      citations: [
        { source: "1 Nephi 4:9; Enos 1:21; Alma 1:29; Alma 18:9–12; Mosiah 7:22; Ether 9:17–18" },
        {
          source:
            "Smithsonian Institution, Statement on the Book of Mormon (1996 / revised 2007)",
        },
      ],
    },
  ],
};
