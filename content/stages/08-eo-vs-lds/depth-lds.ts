import type { Topic } from "@/lib/types";

export const eternalFamilies: Topic = {
  id: "eternal-families",
  title: "Eternal Families / Celestial Marriage",
  summary:
    "The LDS doctrine that marriages sealed in the temple last into eternity, and that exalted Mormons procreate spiritual offspring in the celestial kingdom. Contrast with Mt 22:30 and the patristic doctrine of the resurrection.",
  learningObjectives: [
    "Quote Mt 22:30.",
    "State the LDS Doctrine & Covenants on celestial marriage.",
    "Identify the patristic understanding of glorified existence.",
  ],
  primarySources: [
    "Matthew 22:23–33 (Sadducees' question on resurrection)",
    "Doctrine & Covenants 131, 132",
  ],
  items: [
    {
      id: "lds-fam-001",
      kind: "debate",
      difficulty: 4,
      tags: ["eternal-marriage", "lds"],
      opponentTradition: "LDS",
      opponentClaim:
        "Families are eternal. A marriage sealed in a Mormon temple endures beyond death; we will be with our spouses and children forever.",
      orthodoxRebuttal:
        "The natural Christian longing — to be with those we love — is good and the Gospel does answer it. But the specific LDS doctrine of CELESTIAL marriage extending earthly procreative arrangements into eternity is contradicted by the Lord Himself. Matthew 22:30: 'For in the resurrection they neither marry, nor are given in marriage, but are as the angels of God in heaven.' This is precisely the question the Sadducees asked Him (the woman married to seven brothers in succession), and His answer is the inverse of the LDS doctrine. The resurrection life is qualitatively different — beyond the necessities of generation, beyond the bonds of the present age. We will be with each other AND with God in a communion that transcends marriage, not by losing it but by being fulfilled in something greater. The Orthodox confession: we love our spouses and children deeply in this life, pray for them after death, and trust that the communion of the saints will reunite us in Christ — but not through procreative pairings in the celestial worlds.",
      rejoinders: [
        {
          objection: "But God is a family — Father, Son, and Spirit.",
          reply:
            "The Trinity is one God in three Hypostases, not a 'family' of separate divine beings. The Father is not married to the Son's mother; the Son is eternally generated, not procreated. The triadic communion of God grounds our being-together but is not analogous to gendered, procreative human families. Orthodox theology of the family (e.g. Crestwood Conference 1988) honors marriage as a sacrament now without projecting it as the structure of eternity.",
        },
      ],
      citations: [
        {
          source: "Matthew 22:30",
          quote:
            "For in the resurrection they neither marry, nor are given in marriage, but are as the angels of God in heaven.",
        },
        { source: "Doctrine & Covenants 131:1–4 (for the contrast)" },
      ],
    },
  ],
};

export const ldsBibleTranslation: Topic = {
  id: "joseph-smith-translation",
  title: "The Joseph Smith Translation (JST)",
  summary:
    "Joseph Smith's 'inspired' revision of the King James Bible (begun 1830, never completed in his lifetime). It contains thousands of variants — additions, deletions, doctrinal alterations — without manuscript evidence.",
  learningObjectives: [
    "Note that the JST is not used as the official LDS Bible; the KJV is.",
    "Identify a sample doctrinal expansion (Genesis 50 inserts a prophecy of Joseph Smith by name).",
  ],
  primarySources: [
    "Joseph Smith Translation of the Bible (manuscripts at the Community of Christ archives)",
    "LDS Edition of the King James Bible (with JST footnotes)",
  ],
  items: [
    {
      id: "lds-jst-001",
      kind: "qa",
      difficulty: 4,
      tags: ["jst", "joseph-smith"],
      prompt:
        "What is the Joseph Smith Translation (JST), and how does the LDS Church currently treat it?",
      expectedAnswer:
        "Joseph Smith began an 'inspired revision' of the King James Bible in 1830; it was never completed in his lifetime. The full text resides with the Community of Christ (formerly RLDS); the LDS Church uses footnotes to selected JST variants in its KJV edition rather than the JST as its Bible. The JST contains thousands of departures from any known biblical manuscript tradition, including a prophecy in Genesis 50 (the JST inserts a foretelling of Joseph Smith by name through the dying patriarch Joseph) for which there is no manuscript witness.",
      citations: [
        { source: "JST Genesis 50 — additions in the Joseph Smith Manuscript" },
        { source: "LDS King James Bible — JST in footnotes (LDS Church, 1979)" },
      ],
    },
  ],
};

export const closingChristianStrategy: Topic = {
  id: "engaging-lds-charitably",
  title: "Charitable Engagement with Mormons",
  summary:
    "Tactics, posture, and language for fruitful conversations. The Apologist's first goal is the salvation of the person across the table, not winning a debate.",
  learningObjectives: [
    "Internalize the order: history first, theology second.",
    "Identify the Orthodox shibboleth ('one God, uncreated, the Father Almighty').",
  ],
  primarySources: [
    "James 1:19; 1 Pet 3:15",
    "Lives of the Holy Saints who converted unbelievers (Cosmas Aitolos, Innocent of Alaska)",
  ],
  items: [
    {
      id: "lds-eng-001",
      kind: "qa",
      difficulty: 3,
      tags: ["engagement", "missionary"],
      prompt:
        "What is the recommended order of topics when an Apologist engages an LDS missionary in conversation?",
      expectedAnswer:
        "(1) The historical record first — the unbroken patristic chain of writings, the Joseph Smith Papers' divergent First Vision accounts, the Egyptological consensus on the Joseph Smith Papyri, Book of Mormon archaeological/genetic problems. The LDS missionary has often been formed by the testimony of feeling rather than evidence and may not have read the church's own essays. (2) Theology second — and there start with the doctrine of God (one uncreated, eternal Creator vs. the Lorenzo Snow couplet and the eternal progression). Theosis vs. exaltation. (3) Throughout: charity, prayer, never speaking of Mormon family members or culture dismissively. The Apologist is a missionary, not a debater. James 1:19, 1 Pet 3:15.",
      citations: [
        { source: "1 Peter 3:15; James 1:19" },
      ],
    },
  ],
};
