import type { Topic } from "@/lib/types";

export const johnTheTheologian: Topic = {
  id: "john-theologian",
  title: "St. John the Theologian",
  summary: "The Apostle and Evangelist John. Author of the Fourth Gospel, three Epistles, and the Apocalypse. The only Apostle to die a natural death. Feast: September 26; also May 8.",
  learningObjectives: ["Identify his three NT writings (besides the Gospel)."],
  primarySources: ["Gospel of John; 1, 2, 3 John; Revelation"],
  items: [
    {
      id: "saint-jt-001",
      kind: "qa",
      difficulty: 2,
      tags: ["john-theologian"],
      prompt: "Why does the Orthodox Church call St. John 'the Theologian'?",
      expectedAnswer: "Because his Gospel begins with the most exalted Trinitarian-Christological prologue in Scripture: 'In the beginning was the Word, and the Word was with God, and the Word was God' (Jn 1:1). His writings reveal the divine Logos and the Trinitarian life more directly than any other NT author. The Orthodox Church reserves the title 'Theologian' for only three persons: John the Evangelist, Gregory of Nazianzus, and Symeon the New Theologian.",
      citations: [{ source: "John 1:1-18" }],
    },
  ],
};

export const peterAndPaul: Topic = {
  id: "peter-and-paul",
  title: "Sts. Peter and Paul",
  summary: "The two chief Apostles (Korifaioi). Both martyred in Rome under Nero — Peter crucified upside-down, Paul beheaded. Their joint feast is June 29.",
  learningObjectives: ["Date their martyrdoms.", "State the joint feast."],
  primarySources: ["1 Clement 5; Eusebius EH 2.25; 3.1"],
  items: [
    {
      id: "saint-pp-001",
      kind: "qa",
      difficulty: 2,
      tags: ["peter", "paul"],
      prompt: "On what date is the joint feast of Sts. Peter and Paul observed?",
      expectedAnswer: "June 29. The next day (June 30) is the Synaxis of the Twelve Apostles. The 'Apostles' Fast' precedes the feast — a moveable fast beginning the Monday after All Saints' Sunday and ending June 28.",
      citations: [{ source: "Synaxarion, June 29" }],
    },
  ],
};

export const photiosTheGreat: Topic = {
  id: "photios-the-great",
  title: "St. Photios the Great",
  summary: "Patriarch of Constantinople (twice: 858-867, 877-886). One of the greatest minds of the Byzantine Church. Author of the Mystagogy of the Holy Spirit against the Filioque. Compiled the Library (Bibliotheca) — 280 ancient texts summarized.",
  learningObjectives: ["Identify the Mystagogy.", "Note the Photian Council (879-880)."],
  primarySources: ["St. Photios, Mystagogy of the Holy Spirit; Bibliotheca; Amphilochia"],
  items: [
    {
      id: "saint-ph-001",
      kind: "qa",
      difficulty: 4,
      tags: ["photios"],
      prompt: "What is the Library (Bibliotheca) of St. Photios?",
      expectedAnswer: "A massive compendium of book reviews — 280 chapters summarizing the contents of ancient Greek texts (pagan and Christian) that Photios had read. Many of the texts he describes are now lost; Photios is our principal witness for them. It is a kind of late-antique Britannica of classical and patristic literature. He composed it during his first patriarchate (858-867).",
      citations: [{ source: "St. Photios, Bibliotheca (also called Myriobiblos)" }],
    },
  ],
};

export const xeniaPetersburg: Topic = {
  id: "xenia",
  title: "St. Xenia of Petersburg",
  summary: "Fool-for-Christ (Yurodivaya), born ~1719, died ~1803. After her young husband's sudden death, she gave away all her possessions, dressed in his uniform, called herself by his name, and lived as a homeless wanderer in St. Petersburg, prophesying and healing. Glorified 1988.",
  learningObjectives: ["Date her life.", "Identify 'fool-for-Christ.'"],
  primarySources: ["Vita of St. Xenia (various Russian sources)"],
  items: [
    {
      id: "saint-xe-001",
      kind: "qa",
      difficulty: 3,
      tags: ["xenia", "fools-for-christ"],
      prompt: "Who was St. Xenia of Petersburg, and what is the spiritual category of 'Fool for Christ' (Yurodivy)?",
      expectedAnswer: "St. Xenia (c. 1719-1803) was a young noblewoman whose husband, Andrei, died suddenly. She gave away all she had to the poor, dressed in his uniform, took his name, and lived as a homeless street-wanderer in Petersburg for 45 years. She prophesied, healed, and disturbed the comfortable with biting humor. She is a 'Fool for Christ' (Yurodivy/Yurodivaya) — a category of ascetic ('we are fools for Christ's sake' — 1 Cor 4:10) who feigns madness or eccentricity to humble themselves and provoke salvific shock. Other famous fools: St. Symeon of Emesa (6th c.), St. Andrew the Fool of Constantinople, St. Basil the Blessed of Moscow. Glorified 1988.",
      citations: [{ source: "1 Corinthians 4:10; Synaxarion, January 24" }],
    },
  ],
};

export const matronaMoscow: Topic = {
  id: "matrona-moscow",
  title: "St. Matrona of Moscow",
  summary: "(1881-1952) Russian blind clairvoyant and healer. Lived through the Soviet period as a humble laywoman, prophesying and consoling thousands. Glorified 1999 (Moscow Patriarchate).",
  learningObjectives: ["Date her life.", "Note her glorification."],
  primarySources: ["Various Russian sources; Akathist to St. Matrona"],
  items: [
    {
      id: "saint-mat-001",
      kind: "qa",
      difficulty: 3,
      tags: ["matrona"],
      prompt: "Who was St. Matrona of Moscow, and when was she glorified?",
      expectedAnswer: "St. Matrona Nikonova (1881-1952), born blind in a village near Tula, lived a hidden ascetic life in Moscow under Stalin. She received thousands of visitors who came for prayer, healing, and counsel. She is reported to have predicted World War II, the war's outcome, and many personal events with precision. Glorified by the Moscow Patriarchate in 1999. Her relics rest at the Pokrovsky Stavropegic Monastery in Moscow, where pilgrims still come daily.",
      citations: [{ source: "Decision of glorification, Moscow Patriarchate, October 2, 1999" }],
    },
  ],
};

export const optinaElders: Topic = {
  id: "optina-elders",
  title: "The Optina Elders",
  summary: "A succession of fourteen spiritual elders (startsy) at Optina Pustyn Monastery (~125 miles south of Moscow) from 1829 to 1923. Counselors to Tsars, peasants, and intellectuals — Dostoevsky, Tolstoy, Soloviev all visited. The most famous: Leonid, Macarius, Ambrose, Anatoly the Elder, Joseph, Barsanuphius, Anatoly the Younger, Nektary.",
  learningObjectives: ["Name 2-3 Optina elders.", "Note Ambrose as the model for Dostoevsky's Zosima."],
  primarySources: ["Lives of the Optina Elders (Holy Trinity Monastery, Jordanville)"],
  items: [
    {
      id: "saint-opt-001",
      kind: "qa",
      difficulty: 3,
      tags: ["optina"],
      prompt: "Who was St. Ambrose of Optina, and what literary figure did he inspire?",
      expectedAnswer: "St. Ambrose of Optina (1812-1891) was the most famous of the Optina Elders. Plagued by illness from his youth, he lived as a hieromonk at Optina from 1839 until his death, becoming the principal spiritual father at Optina from the 1860s. Dostoevsky visited him in 1878 and modeled the elder Zosima in The Brothers Karamazov on Ambrose (and to a lesser degree on Tikhon of Zadonsk). Ambrose received daily hundreds of visitors from every social class. Glorified 1988.",
      citations: [
        { source: "Lives of the Optina Elders, vol. III (Holy Trinity Publications)" },
        { source: "Joseph Frank, Dostoevsky, vol. V — visit to Optina" },
      ],
    },
  ],
};

export const innocentAlaska: Topic = {
  id: "innocent-alaska",
  title: "St. Innocent of Alaska",
  summary: "(1797-1879) Born John Veniaminov; Russian Orthodox missionary in Alaska (1824-1838), then in Yakutia and the Russian Far East. Later Metropolitan of Moscow (1868-79). Apostle to America. Translated Scripture and liturgy into Aleut and other native languages.",
  learningObjectives: ["Date his Alaska mission.", "State his later role as Met. of Moscow."],
  primarySources: ["Innocent's letters and journals; Lives by Pierre Pascal and Paul Garrett"],
  items: [
    {
      id: "saint-in-001",
      kind: "qa",
      difficulty: 3,
      tags: ["innocent", "alaska"],
      prompt: "Who was St. Innocent of Alaska, and what was his missionary contribution?",
      expectedAnswer: "Ioann (John) Popov-Veniaminov (1797-1879). A Russian priest, then bishop, then Metropolitan of Moscow. Served as missionary in Russian Alaska (Unalaska, Sitka) from 1824 to 1838, then in eastern Siberia. He learned Aleut and other native languages, translated Scripture and liturgical texts, and wrote Indication of the Way to the Kingdom of Heaven (1833, a catechism in Aleut and Russian still in use). Returned to Russia as Bishop, then in 1868 became Metropolitan of Moscow (the highest ecclesiastical post in pre-Soviet Russia). Glorified 1977 (OCA). The OCA observes him as Apostle to America.",
      citations: [{ source: "Paul Garrett, St. Innocent, Apostle to America (1979)" }],
    },
  ],
};

export const isaacOfSyria: Topic = {
  id: "isaac-of-syria",
  title: "St. Isaac of Syria (Isaac the Syrian)",
  summary: "(~613-700) East Syriac (Church of the East) bishop turned hermit, who briefly served as bishop of Nineveh before retiring to ascetic life. His Ascetical Homilies (in Greek translation from the original Syriac) became foundational in Byzantine, Greek, and Russian monastic literature — beloved by Dostoevsky, Theophan the Recluse, Silouan of Athos.",
  learningObjectives: ["Note his pre-schism East Syriac roots.", "Identify his Ascetical Homilies."],
  primarySources: ["St. Isaac of Syria, Ascetical Homilies"],
  items: [
    {
      id: "saint-is-001",
      kind: "qa",
      difficulty: 4,
      tags: ["isaac-syrian"],
      prompt: "What is unusual about St. Isaac of Syria's reception in Orthodox tradition?",
      expectedAnswer: "St. Isaac was a 7th-century member of the Church of the East — the so-called 'Nestorian' communion that broke with the Council of Ephesus. His writings were nonetheless received with extraordinary love into the Greek monastic and Orthodox tradition through their early translation into Greek. His Ascetical Homilies are revered as foundational ascetic literature, his name appears in the Synaxarion (January 28), and his teaching on love, the depth of God's mercy, and the bitterness of estrangement from Him has shaped generations of Orthodox spirituality. The case shows that the Spirit's gifts may exceed canonical boundaries while the Church discerns and receives.",
      citations: [{ source: "Sebastian Brock, ed., The Wisdom of Saint Isaac the Syrian" }],
    },
  ],
};
