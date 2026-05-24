import type { Topic } from "@/lib/types";

export const immaculateConception: Topic = {
  id: "immaculate-conception",
  title: "The Immaculate Conception",
  summary:
    "Pius IX's dogma of 1854 — that Mary was, from the first instant of her conception, preserved free from all stain of original sin. The Orthodox confess Mary as Panagia (All-Holy) but reject the Roman definition.",
  learningObjectives: [
    "State the 1854 definition (Ineffabilis Deus).",
    "Show that the definition presupposes Augustinian inherited guilt.",
    "Note Aquinas's own rejection of the doctrine before its 19th-century definition.",
  ],
  primarySources: [
    "Pope Pius IX, Ineffabilis Deus (1854)",
    "Thomas Aquinas, Summa Theologiae III.27.2 (rejecting the doctrine in his own day)",
    "Photios; Mark of Ephesus; Bulgakov; Lossky",
  ],
  items: [
    {
      id: "rcc-ic-001",
      kind: "debate",
      difficulty: 4,
      tags: ["mariology", "immaculate-conception"],
      opponentTradition: "RCC",
      opponentClaim:
        "Mary was conceived without original sin (the Immaculate Conception, 1854). She had to be sinless to be a fitting vessel for the sinless Son of God.",
      orthodoxRebuttal:
        "Three answers. (1) The Orthodox doctrine of ancestral sin does not require an 'immaculate conception' of Mary to keep her holy: she inherits, with every human, mortality and the consequences of the Fall — not personal guilt for Adam's sin. So the entire problem the 1854 dogma was built to solve does not exist on the Orthodox account of Romans 5:12. (2) Even within the Latin tradition, the doctrine was disputed until 1854. St. Thomas Aquinas himself denied it (Summa Theol. III.27.2): if Christ alone is the universal Redeemer, Mary too required redemption by her Son — and indeed she says so herself (Lk 1:47: 'my spirit hath rejoiced in God my SAVIOUR'). The Franciscan-Dominican controversy on the question shows the doctrine was not 'always believed.' (3) The Orthodox confession of Mary as 'Panagia' (All-Holy), Aeiparthenos (Ever-Virgin), Theotokos, magnifies her in liturgy more fully than the West — but always within the absolute Creator/creature distinction and the universal need of all human beings, the Theotokos included, of redemption by Christ.",
      rejoinders: [
        {
          objection:
            "But Luke 1:28 — 'highly favored' (kecharitōmenē) — implies fullness of grace from the beginning.",
          reply:
            "Kecharitōmenē is the perfect passive participle: 'one who has been graced.' It denotes Mary's unique election and gracious endowment, but it does not entail that she was conceived without the consequences of the Fall. The Orthodox liturgy sings of her as Πανάγιος ('all-holy') by the grace of her Son — by His grace, not as a precondition for it.",
        },
      ],
      citations: [
        {
          source: "Luke 1:46–47",
          quote:
            "My soul doth magnify the Lord, and my spirit hath rejoiced in God my Saviour.",
        },
        {
          source: "St. Thomas Aquinas, Summa Theologiae III.27.2",
          quote:
            "If the soul of the Blessed Virgin had never been infected by original sin, this would have lessened the dignity of Christ as the universal Saviour of all.",
        },
        { source: "Pope Pius IX, Ineffabilis Deus (1854) — for comparison" },
      ],
    },
  ],
};

export const azymes: Topic = {
  id: "azymes",
  title: "Azymes (Unleavened Bread)",
  summary:
    "The Latin use of unleavened bread (azyma) in the Eucharist vs. the Orthodox leavened prosphora. The Cerularius-Humbert clash of 1054 turned on this.",
  learningObjectives: [
    "Identify the symbolic significance of leavened bread.",
    "Cite Nicholas Cabasilas on the Eucharistic bread.",
  ],
  primarySources: [
    "Nicholas Cabasilas, Commentary on the Divine Liturgy",
    "Patriarch Michael Cerularius, correspondence with Pope Leo IX (1054)",
  ],
  items: [
    {
      id: "rcc-az-001",
      kind: "qa",
      difficulty: 3,
      tags: ["eucharist", "azymes"],
      prompt:
        "Why does the Orthodox Church use leavened bread (artos) in the Eucharist, and what does the leaven signify?",
      expectedAnswer:
        "Leavened bread signifies the living, resurrected Christ — bread enlivened by leaven as the human nature of Christ is enlivened by the Spirit. The unleavened bread of Passover is Old Covenant; the New Covenant Pascha gives the living Lamb. The four Greek Liturgies (Chrysostom, Basil, James, Mark) all use leavened bread without exception in the apostolic and patristic tradition.",
      citations: [
        { source: "Nicholas Cabasilas, Commentary on the Divine Liturgy" },
        { source: "Symeon of Thessalonica, On the Sacred Liturgy" },
      ],
    },
  ],
};

export const indulgences: Topic = {
  id: "indulgences",
  title: "Indulgences & the Treasury of Merits",
  summary:
    "The late-medieval Western system whereby the Pope draws from a 'treasury of merits' of Christ and the saints to remit the temporal punishment of sin. Triggered the Reformation; foreign to the patristic mind.",
  learningObjectives: [
    "Trace the history from confessor-priests issuing pardons to Tetzel's preaching (1517).",
    "State the Orthodox position: penance heals; God forgives; no juridical accounting.",
  ],
  primarySources: [
    "Council of Trent, Decree on Indulgences (1563)",
    "Luther, 95 Theses (1517)",
    "Confession of Dositheus (1672), Decree 18",
  ],
  items: [
    {
      id: "rcc-ind-001",
      kind: "qa",
      difficulty: 3,
      tags: ["indulgences"],
      prompt:
        "What is the Orthodox position on indulgences and the 'treasury of merits'?",
      expectedAnswer:
        "We reject both. There is no quantifiable juridical accounting of sin and merit in the Orthodox doctrine. Sin is healed by repentance, confession, and synergy with grace; God forgives by mercy, not by ledger. The 'treasury of merits' from which the Pope distributes credit is foreign to Scripture, the Fathers, and the Councils. The Confession of Dositheus (1672, Decree 18) explicitly excludes it.",
      citations: [
        { source: "Confession of Dositheus (1672), Decree 18" },
        { source: "1 John 1:9; Lk 18:13–14; the practice of patristic penance (Basil, Letters 217)" },
      ],
    },
  ],
};

export const florence: Topic = {
  id: "council-of-florence",
  title: "Council of Florence (1438–9) & Mark of Ephesus",
  summary:
    "The reunion council under Byzantine political pressure. The Greek delegation, except Mark of Ephesus, signed. The Orthodox laity and most of the bishops repudiated the union on return; St. Mark alone refused to sign.",
  learningObjectives: [
    "Name the four points Florence required of the Greeks (Filioque, Purgatory, Azymes, Papal primacy).",
    "State why Florence is not received as ecumenical by Orthodoxy.",
  ],
  primarySources: [
    "Acts of the Council of Florence (1438–9)",
    "Mark of Ephesus, Encyclical Letter to all Orthodox Christians",
  ],
  items: [
    {
      id: "rcc-flo-001",
      kind: "qa",
      difficulty: 4,
      tags: ["florence", "mark-of-ephesus"],
      prompt:
        "Which four doctrinal points did the Council of Florence (1438–9) require the Greeks to accept, and which bishop alone refused to sign?",
      expectedAnswer:
        "(1) the Filioque, (2) purgatory, (3) the use of unleavened bread (azymes), and (4) papal primacy with universal jurisdiction. St. Mark of Ephesus alone among the Greek hierarchs refused to sign. Pope Eugene IV is reported to have said on hearing this, 'Then we have done nothing.'",
      citations: [
        { source: "Mark of Ephesus, Encyclical Letter (1440–1441)" },
        { source: "Acts of the Council of Florence (1438–9)" },
      ],
    },
  ],
};

export const augustineEast: Topic = {
  id: "augustine-east",
  title: "Augustine of Hippo in the Orthodox Reception",
  summary:
    "Augustine is venerated as a saint in the Orthodox Church (feast: June 15), but his views on grace, predestination, and the Filioque are not received as binding. The Orthodox East reads Augustine selectively, against a Greek-patristic standard.",
  learningObjectives: [
    "Identify the areas where Augustine is received and where he is critiqued.",
    "Quote the Confession of Dositheus on Augustinian predestinarianism.",
  ],
  primarySources: [
    "St. Augustine, Confessions; City of God; On the Trinity; Anti-Pelagian Writings",
    "St. Photios, Mystagogy of the Holy Spirit",
    "St. John Cassian, Conferences",
    "Confession of Dositheus (1672), Decree 3",
  ],
  items: [
    {
      id: "rcc-aug-001",
      kind: "qa",
      difficulty: 4,
      tags: ["augustine"],
      prompt:
        "Is St. Augustine a saint in the Orthodox Church, and are his theological views received as dogma?",
      expectedAnswer:
        "He is venerated as a saint (Blessed Augustine, June 15). His Confessions and pastoral works are received warmly. But his Trinitarian model (with the Filioque seed), his strong predestinarianism, his doctrine of original sin and its juridical inheritance, and several aspects of his sacramental theology are NOT received as Orthodox dogma. The East reads Augustine in the light of the Greek Fathers, never above them.",
      citations: [
        { source: "Confession of Dositheus (1672), Decree 3 — on predestination" },
        { source: "St. John Cassian, Conferences XIII — corrective to extreme Augustinianism" },
      ],
    },
  ],
};
