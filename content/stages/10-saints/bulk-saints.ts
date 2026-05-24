import type { Topic } from "@/lib/types";

export const stephenFirstMartyr: Topic = {
  id: "stephen",
  title: "St. Stephen the First-Martyr (Protomartyr)",
  summary: "The first Christian martyr (Acts 6-7), one of the Seven Deacons, stoned outside Jerusalem c. AD 35. Saul of Tarsus consented to his death.",
  learningObjectives: ["Cite Acts 6-7.", "State his feast day (Dec 27)."],
  primarySources: ["Acts 6-7"],
  items: [
    {
      id: "saint-st-001",
      kind: "qa",
      difficulty: 1,
      tags: ["stephen"],
      prompt: "Who is the protomartyr of the Christian Church, and on what date is he commemorated?",
      expectedAnswer: "St. Stephen, the first of the Seven Deacons, stoned to death at Jerusalem c. AD 35. Saul (later Paul) consented to his death (Acts 8:1). Commemorated December 27.",
      citations: [{ source: "Acts 6:1-8:1" }],
    },
  ],
};

export const georgeTheTrophy: Topic = {
  id: "george",
  title: "St. George the Trophy-Bearer",
  summary: "Megalomartyr under Diocletian (martyred c. AD 303). Patron of Georgia, England, and many other lands. Iconography: mounted on a white horse, slaying the dragon.",
  learningObjectives: ["Identify his title 'Trophy-Bearer' (Tropaiophoros).", "Note his feast (April 23)."],
  primarySources: ["Synaxarion, April 23"],
  items: [
    {
      id: "saint-ge-001",
      kind: "mcq",
      difficulty: 2,
      tags: ["george"],
      prompt: "Why is St. George called the 'Trophy-Bearer' (Tropaiophoros)?",
      choices: [
        { id: "a", text: "Because he won the prize (trophy) of martyrdom by his confession.", rationale: "Correct. The dragon iconography symbolizes his victory over evil through martyrdom." },
        { id: "b", text: "Because he carried military trophies as a Roman officer." },
        { id: "c", text: "Because he founded the Order of the Garter." },
        { id: "d", text: "Because he wore a particular crown given by Constantine." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Synaxarion, April 23" }],
    },
  ],
};

export const nicholasOfMyra: Topic = {
  id: "nicholas-of-myra",
  title: "St. Nicholas of Myra",
  summary: "Bishop of Myra in Lycia (4th c.). Attended Nicaea (325). The historical St. Nicholas behind the Western 'Santa Claus.' Patron of sailors, children, and many lands.",
  learningObjectives: ["Identify him at Nicaea.", "Note his feast (December 6)."],
  primarySources: ["Synaxarion, December 6", "Methodius of Constantinople, Encomium on St. Nicholas"],
  items: [
    {
      id: "saint-nm-002",
      kind: "qa",
      difficulty: 2,
      tags: ["nicholas"],
      prompt: "Who was St. Nicholas of Myra, and what is his feast day?",
      expectedAnswer: "Bishop of Myra in Lycia (Asia Minor), 4th century. Attended the First Ecumenical Council at Nicaea (325). Famous for secret almsgiving (he provided dowries for three poor sisters by night), for striking Arius at the Council (per legend), and for many miracles. Patron of sailors and of children. Commemorated December 6 — the historical root of the Western Santa Claus tradition.",
      citations: [{ source: "Synaxarion, December 6" }],
    },
  ],
};

export const symeonStylites: Topic = {
  id: "symeon-stylites",
  title: "St. Symeon the Stylite",
  summary: "(c. 390-459) Syrian ascetic who lived 37 years atop a pillar near Aleppo. Founder of the 'stylite' or pillar-dwelling form of monasticism. Counselor to emperors and shepherds alike.",
  learningObjectives: ["Identify the stylite form of monasticism.", "Date Symeon's pillar-vigil (~37 years)."],
  primarySources: ["Theodoret of Cyrrhus, History of the Monks of Syria 26"],
  items: [
    {
      id: "saint-sy-001",
      kind: "qa",
      difficulty: 3,
      tags: ["stylites", "syria"],
      prompt: "Who was St. Symeon the Stylite, and what new form of monastic ascesis did he initiate?",
      expectedAnswer: "St. Symeon (c. 390-459) was a Syrian ascetic who lived 37 years on the top of a pillar (stylos) near Aleppo — initially shorter and later as high as 50 feet. He prayed, taught, and counseled visitors from below. He inaugurated the stylite tradition, followed by others (Daniel the Stylite, Alypius, Symeon the Younger). His feast is September 1.",
      citations: [{ source: "Theodoret of Cyrrhus, History of the Monks of Syria 26 (~AD 444)" }],
    },
  ],
};

export const macariusEgypt: Topic = {
  id: "macarius",
  title: "St. Macarius the Great of Egypt",
  summary: "(c. 300-391) Desert Father; founder of Scetis; author (or, by tradition, namesake) of the Fifty Spiritual Homilies.",
  learningObjectives: ["Identify Macarius's setting (Scetis).", "Note the Macarian Homilies."],
  primarySources: ["Spiritual Homilies (Pseudo-Macarius/Symeon)", "Apophthegmata Patrum"],
  items: [
    {
      id: "saint-mac-001",
      kind: "qa",
      difficulty: 3,
      tags: ["macarius", "desert"],
      prompt: "Where did St. Macarius the Great establish his monastic community, and for what literature is the Macarian tradition known?",
      expectedAnswer: "In Scetis (Wadi al-Natrun, Egyptian desert), c. 330. The Macarian tradition produced the Fifty Spiritual Homilies, which were enormously influential on later Christian mystical literature East and West (John Wesley translated parts into English). Modern scholarship attributes the Homilies to a 4th-century Syrian author sometimes called Symeon of Mesopotamia, but the Church received them under the name of Macarius and they are still circulated as 'Macarian.'",
      citations: [
        { source: "Pseudo-Macarius, Spiritual Homilies" },
        { source: "Palladius, Lausiac History 17" },
      ],
    },
  ],
};

export const ninaGeorgia: Topic = {
  id: "nina",
  title: "St. Nina, Equal-to-the-Apostles, Enlightener of Georgia",
  summary: "(~280-340) A young Cappadocian Christian woman taken captive to Iberia (Georgia), where her witness led to the conversion of King Mirian III and his nation in the 320s. Commemorated January 14.",
  learningObjectives: ["State her title 'Equal-to-the-Apostles.'"],
  primarySources: ["Rufinus, Ecclesiastical History 10.11"],
  items: [
    {
      id: "saint-ni-001",
      kind: "qa",
      difficulty: 3,
      tags: ["nina", "georgia"],
      prompt: "Who was St. Nina, and what was the consequence of her presence in Iberia (Georgia)?",
      expectedAnswer: "A young Cappadocian Christian, taken captive to Iberia in the early 4th century. Her ascetic life, prayers, and miracles led to the conversion of King Mirian III and Queen Nana, and to the Christianization of Georgia in the 320s. She is honored as 'Equal-to-the-Apostles' (Isapostolos) — the same rank as Sts. Helena, Vladimir, and Olga. Commemorated January 14.",
      citations: [{ source: "Rufinus of Aquileia, Ecclesiastical History 10.11 (~AD 402)" }],
    },
  ],
};

export const seraphimRose: Topic = {
  id: "seraphim-rose",
  title: "Father Seraphim Rose (1934-1982)",
  summary: "American Orthodox monastic, author, and missionary. Born Eugene Rose; co-founder of St. Herman of Alaska Monastery, Platina, CA. Not formally glorified but widely venerated; influential on the American Orthodox awakening.",
  learningObjectives: ["Identify his principal works.", "Note his role in introducing the Church to many converts."],
  primarySources: ["Fr. Seraphim Rose, Orthodoxy and the Religion of the Future (1975); Genesis, Creation and Early Man; Soul After Death"],
  items: [
    {
      id: "saint-sr-001",
      kind: "qa",
      difficulty: 3,
      tags: ["seraphim-rose", "american"],
      prompt: "Who was Father Seraphim Rose, and what monastery did he co-found?",
      expectedAnswer: "Born Eugene Rose in San Diego (1934), trained at Pomona College and the University of California in Eastern philosophy, converted to Orthodoxy under Archbishop John Maximovitch (1962), tonsured a monk in 1970, co-founded St. Herman of Alaska Monastery in Platina, California (1969-70 onward). He died 1982. His writings introduced thousands to Orthodoxy in the English-speaking world. He has not been formally glorified, but is widely venerated as a spiritual father by many in ROCOR and beyond.",
      citations: [{ source: "Damascene Christensen, Father Seraphim Rose: His Life and Works (2003)" }],
    },
  ],
};

export const ignatiusBrianchaninov: Topic = {
  id: "ignatius-brianchaninov",
  title: "St. Ignatius Brianchaninov",
  summary: "(1807-1867) Russian bishop, ascetical writer. His Arena (Approaches to the Lord) and Offering to Contemporary Monasticism are foundational 19th-century Russian Orthodox spiritual texts.",
  learningObjectives: ["Date his life.", "Identify his principal work."],
  primarySources: ["St. Ignatius Brianchaninov, The Arena; Ascetical Trials"],
  items: [
    {
      id: "saint-ib-001",
      kind: "qa",
      difficulty: 3,
      tags: ["brianchaninov"],
      prompt: "Who was St. Ignatius Brianchaninov, and what is his most read work in the English-speaking world?",
      expectedAnswer: "Russian Orthodox bishop and ascetic writer (1807-1867). Bishop of the Caucasus and Black Sea. His Arena (Priношeние Современному Монашеству, lit. 'Offering to Contemporary Monasticism') is widely read in the English-speaking world as a guide to the spiritual life, prayer, and the dangers of self-deception (prelest). Glorified 1988.",
      citations: [{ source: "St. Ignatius Brianchaninov, The Arena (English translation, Holy Trinity Monastery, Jordanville)" }],
    },
  ],
};

export const johnMaximovitch: Topic = {
  id: "john-maximovitch",
  title: "St. John (Maximovitch) of Shanghai and San Francisco",
  summary: "(1896-1966) Russian Orthodox bishop, missionary, and wonderworker. Served in Shanghai, Western Europe, and finally San Francisco. Glorified 1994 (ROCOR); 2008 (Moscow Patriarchate). Commemorated June 19/July 2.",
  learningObjectives: ["Date his life.", "Note his missionary service."],
  primarySources: ["Bernard Le Caro, St. John of Shanghai and San Francisco (2017)"],
  items: [
    {
      id: "saint-jm-001",
      kind: "qa",
      difficulty: 3,
      tags: ["john-maximovitch"],
      prompt: "Who was St. John Maximovitch, and when was he glorified?",
      expectedAnswer: "Russian Orthodox bishop (1896-1966), born Mikhail Maximovitch in Ukraine, became Bishop of Shanghai (1934-1946), then Western Europe (1951-1962), and finally San Francisco (1962-1966). Famous for ceaseless prayer, simple manner of life, vast missionary outreach (especially to non-Russians), and many miracles during and after his life. Glorified by ROCOR in 1994; reception of his glorification by the Moscow Patriarchate in 2008.",
      citations: [{ source: "Decision of glorification of the Russian Church Abroad, July 2, 1994" }],
    },
  ],
};

export const justinPopovic: Topic = {
  id: "justin-popovic",
  title: "St. Justin Popović",
  summary: "(1894-1979) Serbian Orthodox theologian, archimandrite of Ćelije Monastery, principal modern dogmatic theologian of the Serbian Church. Author of the three-volume Dogmatics. Glorified 2010.",
  learningObjectives: ["Date his life.", "Note his three-volume Dogmatics."],
  primarySources: ["St. Justin Popović, Dogmatics of the Orthodox Church (3 vols.)"],
  items: [
    {
      id: "saint-jp-001",
      kind: "qa",
      difficulty: 3,
      tags: ["justin-popovic"],
      prompt: "Who was St. Justin Popović, and for what work is he chiefly known?",
      expectedAnswer: "Serbian Orthodox theologian and monastic (1894-1979). Archimandrite of Ćelije Monastery in central Serbia for most of his later life under Communism. Wrote the three-volume Dogmatics of the Orthodox Church — the principal modern Serbian dogmatic theology — and a twelve-volume Lives of the Saints. He was the spiritual father of the great modern Serbian hierarchs (Athanasius Yevtich, Amphilochius Radović, Irenaeus Bulović). Glorified by the Serbian Church 2010.",
      citations: [{ source: "Decision of glorification, Serbian Orthodox Church, May 2, 2010" }],
    },
  ],
};
