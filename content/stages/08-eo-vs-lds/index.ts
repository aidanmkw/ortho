import type { Stage } from "@/lib/types";

export const stage08: Stage = {
  id: "08-eo-vs-lds",
  order: 8,
  title: "EO vs Latter-day Saints",
  subtitle: "Restoration claims, theology of God, and Joseph Smith's history",
  description:
    "Engage Mormonism charitably and clearly. Meet first on the documented historical record (Joseph Smith Papers, First Vision accounts, Book of Abraham), then on the theology — where exaltation and theosis are surface twins but ontological opposites.",
  rank: "Priest",
  topics: [
    {
      id: "great-apostasy",
      title: "The 'Great Apostasy'",
      summary:
        "The LDS claim that the apostolic Church was lost shortly after the death of the Apostles, requiring restoration through Joseph Smith. Refuted by the unbroken patristic record.",
      learningObjectives: [
        "Quote Mt 16:18 and Mt 28:20 against apostasy.",
        "Demonstrate continuity of the apostolic Church through the first three centuries.",
      ],
      primarySources: [
        "Matthew 16:18; 28:20",
        "Eusebius, Ecclesiastical History (full)",
        "Ignatius's seven letters",
        "1 Clement",
      ],
      items: [
        {
          id: "lds-app-001",
          kind: "debate",
          difficulty: 4,
          tags: ["great-apostasy"],
          opponentTradition: "LDS",
          opponentClaim:
            "After the deaths of the Apostles, the Church fell into apostasy. The priesthood was lost, doctrines were corrupted, and the fullness of the Gospel had to be restored through the Prophet Joseph Smith in 1830.",
          orthodoxRebuttal:
            "The premise contradicts the Lord's own promise. He said: 'I will build my Church; and the gates of hell shall not prevail against it' (Mt 16:18). And 'Lo, I am with you always, even unto the end of the world' (Mt 28:20). The Holy Spirit was promised to abide forever (Jn 14:16). If the Church could be lost, then Christ's word failed — which is impossible. Beyond the dogmatic answer, the historical record is decisive. The chain of writings runs unbroken: 1 Clement (~96), the seven letters of Ignatius (~107), Polycarp (~110), the Didache, Justin Martyr (~155), Irenaeus (~180), Tertullian, Origen, Cyprian — and every one of these documents the same hierarchical, sacramental, episcopal Church confessing the divinity of Christ, infant baptism, the Real Presence, and apostolic succession. There is no patristic gap, no 'apostasy interval,' anywhere in the record. The continuous existence of the Orthodox Church from Pentecost to the present is a historical fact. The LDS thesis requires that the corruption happened so completely and so silently within thirty years of the Apostles that not one whisper of a 'restoration' attempt, not one preserved 'true' community, remains anywhere in the record — and then that Joseph Smith, alone in upstate New York in 1820, recovered what had been universally lost. The burden of proof is enormous and it has never been met.",
          rejoinders: [
            {
              objection: "Paul predicted the apostasy himself — 2 Thessalonians 2:3.",
              reply:
                "2 Th 2:3 prophesies the 'apostasia' and the 'man of sin' — but Paul connects it to the eschatological climax preceding the Day of the Lord, not to a complete loss of the Church. The same Paul who wrote that wrote 1 Tim 3:15 — the Church is the 'pillar and ground of the truth.' Both stand. A partial falling-away in the last days does not erase the Church's promised perpetuity.",
            },
          ],
          citations: [
            {
              source: "Matthew 16:18",
              quote:
                "Thou art Peter, and upon this rock I will build my Church, and the gates of hell shall not prevail against it.",
            },
            {
              source: "Matthew 28:20",
              quote: "Lo, I am with you alway, even unto the end of the world.",
            },
            {
              source: "1 Timothy 3:15",
              quote:
                "...the Church of the living God, the pillar and ground of the truth.",
            },
          ],
        },
      ],
    },
    {
      id: "first-vision",
      title: "The First Vision",
      summary:
        "Joseph Smith's account of seeing the Father and the Son in 1820 — and the four divergent accounts (1832, 1835, 1838, 1842), now publicly available on the LDS Joseph Smith Papers site.",
      learningObjectives: [
        "List the four First Vision accounts.",
        "Identify the principal contradictions between them.",
        "Engage charitably while pointing to the documentary record.",
      ],
      primarySources: [
        "Joseph Smith Papers, First Vision accounts (1832, 1835, 1838, 1842)",
        "LDS Gospel Topics Essay, 'First Vision Accounts'",
      ],
      items: [
        {
          id: "lds-fv-001",
          kind: "qa",
          difficulty: 4,
          tags: ["first-vision", "history"],
          prompt:
            "How many materially divergent first-person accounts of the First Vision did Joseph Smith leave, and where are they now publicly available?",
          expectedAnswer:
            "At least four — 1832 (handwritten, mentions only the Lord), 1835 (mentions 'many angels'), 1838 (the now-canonical account in Pearl of Great Price, mentioning two Personages), and 1842 (Wentworth Letter). All four are now publicly available at josephsmithpapers.org and acknowledged in the official LDS Gospel Topics Essay 'First Vision Accounts' (2013). The accounts differ on Joseph's age, the persons seen, what was said, and the circumstances.",
          citations: [
            { source: "Joseph Smith Papers — First Vision Accounts", url: "https://www.josephsmithpapers.org/" },
            { source: "LDS Church, Gospel Topics Essay: First Vision Accounts (2013)" },
          ],
        },
      ],
    },
    {
      id: "theosis-vs-exaltation",
      title: "Theosis vs Exaltation",
      summary:
        "The most important theological question in Orthodox-LDS dialogue. Orthodox theosis: created beings becoming partakers of the uncreated energies of the one eternal God by grace. LDS exaltation: humans progressing to become gods themselves, with their own creations and offspring.",
      learningObjectives: [
        "State the Lorenzo Snow couplet and identify its theological implications.",
        "Distinguish theosis (by grace, in God's energies) from ontological deification.",
        "Quote 2 Pet 1:4 with patristic gloss.",
      ],
      primarySources: [
        "Lorenzo Snow, 'As man now is, God once was; as God now is, man may become.'",
        "Joseph Smith, King Follett Discourse (1844)",
        "Athanasius, On the Incarnation 54.3",
        "Gregory Palamas, Triads",
      ],
      items: [
        {
          id: "lds-tv-001",
          kind: "debate",
          difficulty: 5,
          tags: ["theosis", "exaltation", "lorenzo-snow"],
          opponentTradition: "LDS",
          opponentClaim:
            "Orthodox theosis is essentially the same thing as Mormon exaltation — both teach that human beings can become divine. Athanasius said it: 'God became man so that man might become god.'",
          orthodoxRebuttal:
            "The verbal surface is similar; the metaphysics are opposite. (1) Orthodox theosis presupposes the absolute Creator/creature distinction. God is uncreated; we are created. We become 'partakers of the divine NATURE' (2 Pet 1:4) by grace — i.e., real participation in God's uncreated ENERGIES, not absorption into His essence and not becoming a second god. Athanasius is explicit (Against the Arians I.39): 'We are made sons of God, not as the Son is — not in essence — but by adoption.' We are deified by GRACE; the Son is God by NATURE. (2) Mormon exaltation reverses every premise. The Lorenzo Snow couplet teaches that God Himself was once a man who became God by progression. This implies that 'God' is a stage in a larger metaphysical structure — that there are many gods, that humans are of the same KIND as God, that God is not the uncreated source of all but rather a senior member of an eternal genealogy. This is precisely what Isaiah denies: 'Before me there was no God formed, neither shall there be after me' (Is 43:10). (3) Joseph Smith's King Follett Discourse (1844) makes the point explicit: 'God himself, the Father of us all, dwelt on an earth, the same as Jesus Christ himself did... and you have got to learn how to be Gods yourselves.' This is ontological transformation: humans become gods of their own worlds. Orthodoxy never teaches this. We become like God by participation, sharing in His glory — but we are forever creatures and He is forever the One God whom even the saints worship. (4) So when Athanasius writes 'God became man that man might become god,' he carefully glosses what he means in the next breath and throughout his corpus: by grace and adoption, not by nature; partaking the energies, not the essence; one God remains forever the Creator.",
          rejoinders: [
            {
              objection:
                "Psalm 82:6 and John 10:34 — 'I said, ye are gods.' Doesn't that prove plurality of gods?",
              reply:
                "Both passages denominate humans (in Ps 82, Israel's judges; in Jn 10, the auditors of Jesus) 'gods' in a derivative or judicial sense. Christ uses it in Jn 10 precisely to argue from lesser to greater — if Scripture can call mere men 'gods' in some sense, He whom the Father has set apart and sent can certainly be called the Son of God. Neither text licenses the idea that there are real, ontologically separate gods.",
            },
            {
              objection: "But you Orthodox call the saints theoi (gods).",
              reply:
                "In the patristic tradition we do — but always with the qualifier 'by grace' (kata charin), never 'by nature' (kata physin). The distinction is critical. We do not multiply gods; we share in the one God.",
            },
          ],
          citations: [
            {
              source: "St. Athanasius, Against the Arians I.39",
              quote:
                "But we are made sons of God, not as He is, by nature and truth, but according to grace and adoption, as men in fellowship through the Spirit.",
            },
            {
              source: "Isaiah 43:10–11",
              quote:
                "Before me there was no God formed, neither shall there be after me. I, even I, am the LORD; and beside me there is no saviour.",
            },
            {
              source: "Joseph Smith, King Follett Discourse (1844)",
              quote:
                "God himself, the Father of us all, dwelt on an earth, the same as Jesus Christ himself did... and you have got to learn how to be Gods yourselves.",
            },
            {
              source: "Symbol of Faith — 'I believe in one God, the Father Almighty, Maker of heaven and earth.'",
            },
          ],
        },
      ],
    },
    {
      id: "book-of-abraham",
      title: "The Book of Abraham",
      summary:
        "The papyri Joseph Smith claimed to translate as the writings of Abraham have been recovered (1966) and identified by Egyptologists as standard funerary texts — the Book of Breathings and the Book of the Dead — having nothing to do with Abraham.",
      learningObjectives: [
        "Date the recovery of the Joseph Smith Papyri.",
        "State the Egyptological consensus on their content.",
        "Engage charitably with the LDS apologetic responses.",
      ],
      primarySources: [
        "Joseph Smith Papyri (Metropolitan Museum, returned to LDS Church 1967)",
        "Robert Ritner, The Joseph Smith Egyptian Papyri (Smith-Pettit Foundation, 2013)",
        "LDS Gospel Topics Essay, 'Translation and Historicity of the Book of Abraham' (2014)",
      ],
      items: [
        {
          id: "lds-boa-001",
          kind: "qa",
          difficulty: 4,
          tags: ["book-of-abraham", "papyri"],
          prompt:
            "When were the Joseph Smith Papyri recovered, and what do Egyptologists (both LDS and non-LDS) identify them as?",
          expectedAnswer:
            "The papyri were rediscovered at the Metropolitan Museum of Art in 1966 and transferred to the LDS Church in November 1967. Egyptologists — including non-LDS (Klaus Baer of Chicago, Richard Parker of Brown, Robert Ritner) and LDS (John Gee, with significant qualifications) — identify them as standard Ptolemaic-era Egyptian funerary documents: the Book of Breathings made by Isis for her brother Osiris, and excerpts from the Book of the Dead. The hieroglyphic texts have nothing to do with Abraham. The LDS Church's 2014 Gospel Topics Essay acknowledges this and proposes a 'catalyst' theory of translation.",
          citations: [
            {
              source: "LDS Church, Gospel Topics Essay, 'Translation and Historicity of the Book of Abraham' (2014)",
              quote:
                "None of the characters on the papyrus fragments mentioned Abraham's name or any of the events recorded in the book of Abraham. Mormon and non-Mormon Egyptologists agree that the characters on the fragments do not match the translation given in the book of Abraham.",
            },
            { source: "Robert Ritner, The Joseph Smith Egyptian Papyri (2013)" },
          ],
        },
      ],
    },
  ],
};
