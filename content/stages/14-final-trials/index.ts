import type { Stage } from "@/lib/types";
import { moreScenarios } from "./more-trials";
import { moreFinal } from "./bulk-trials";
import { finalScenariosTwo } from "./mass-trials";
import { finalCapstoneRound } from "./final-trials";

export const stage14: Stage = {
  id: "14-final-trials",
  order: 14,
  title: "Final Trials",
  subtitle: "Capstone debate scenarios",
  description:
    "Full multi-turn debate scenarios across all previous stages. The Apologist is given the conversation partner, the opening claim, and must construct the response — citing Fathers, Councils, Scripture, and where useful the opponent's own confessional documents.",
  rank: "Apologist",
  topics: [
    {
      id: "scenarios",
      title: "Capstone Scenarios",
      summary:
        "Each item is a debate scenario with named interlocutor, opening claim, and the Orthodox case anchored throughout. Rejoinders simulate the back-and-forth.",
      learningObjectives: [
        "Synthesize materials from all 13 prior stages.",
        "Cite from memory in a real-time dialogue.",
        "Maintain charity, clarity, and the Orthodox ethos under pressure.",
      ],
      primarySources: ["All prior stages."],
      items: [
        {
          id: "fin-001",
          kind: "debate",
          difficulty: 5,
          tags: ["capstone", "lds"],
          opponentTradition: "LDS",
          opponentClaim:
            "A pair of clean-cut missionaries at your door: 'May we share a message about the restored Gospel of Jesus Christ? Through the Prophet Joseph Smith, the original Church of Christ was restored to the earth in 1830.'",
          orthodoxRebuttal:
            "Welcome them. The Orthodox approach: 'Brothers, thank you. I want to talk with you, but I'd like to begin with what the historical record says, before we discuss theology. The Lord said the gates of hell would not prevail against His Church (Mt 16:18); I want to ask whether the documentary record supports the claim that the Church was lost. Could we look together at three things: the unbroken chain of Christian writings from the first century forward; the multiple, divergent accounts Joseph Smith himself left of the First Vision (now on josephsmithpapers.org); and what Egyptologists say about the Joseph Smith Papyri rediscovered in 1966? If after that you still think there was a complete apostasy followed by Joseph Smith's restoration, we can move to the theological questions of God's nature, theosis vs. exaltation, and what the Apostolic Fathers taught about baptism and the Eucharist.' The strategy: (a) meet first on documented history, where the LDS missionary has often not been exposed to the church's own published essays; (b) when moving to theology, use the LDS member's own preference for Athanasius's 'God became man that man might become god' to draw out the radical metaphysical difference between Orthodox theosis (creatures becoming partakers of the uncreated energies by grace) and Mormon exaltation (creatures becoming gods); (c) invite, never argue down. Pray for them.",
          citations: [
            { source: "Mt 16:18" },
            { source: "Joseph Smith Papers, First Vision Accounts (LDS official site)" },
            { source: "LDS Gospel Topics Essay: 'Translation and Historicity of the Book of Abraham' (2014)" },
            { source: "Athanasius, On the Incarnation 54.3 (with full patristic context)" },
            { source: "Isaiah 43:10–11" },
          ],
          notes:
            "The Apologist's posture is missionary, not polemical. The goal is conversion, not victory. Charity is the first weapon and the last.",
        },
        {
          id: "fin-002",
          kind: "debate",
          difficulty: 5,
          tags: ["capstone", "reformed"],
          opponentTradition: "Reformed",
          opponentClaim:
            "A Reformed seminarian: 'You Orthodox add to Scripture with your traditions. Why should I trust the Fathers over the plain text of the Bible?'",
          orthodoxRebuttal:
            "'Because the Apostles trusted them. The 'Fathers' are not a competing authority — they are the men who knew the Apostles or their immediate disciples, and whose writings preceded the closing of the canon by several generations. When you read your Bible, you are already trusting the judgment of the Church that produced the canon (Carthage 397, Athanasius's Paschal Letter of 367). The same Church confessed infant baptism, the Real Presence, the Theotokos, episcopal succession, and the perpetual virginity — every one of these documented in the writings of the first 250 years. Either the Church got the canon right and the rest wrong (a strange split judgment), or the Church got both right because the same Holy Spirit guided her in both. Let's open Ignatius's letter to the Smyrnaeans together. He was writing in 107. He died for the same Lord we both confess. What he says about the Eucharist is on the table; let's read it without prejudice.'",
          citations: [
            { source: "St. Athanasius, Festal Letter 39 (367) — canon" },
            { source: "Council of Carthage (397)" },
            { source: "St. Ignatius, Smyrnaeans 7:1" },
            { source: "St. Irenaeus, Against Heresies III.3.1–4" },
          ],
        },
      ],
    },
    moreScenarios,
    moreFinal,
    finalScenariosTwo,
    finalCapstoneRound,
  ],
};
