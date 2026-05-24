import type { Topic } from "@/lib/types";

export const greatFeasts: Topic = {
  id: "great-feasts",
  title: "The Twelve Great Feasts",
  summary:
    "The Twelve Great Feasts of the Orthodox liturgical year. Eight are 'feasts of the Lord' and four are 'feasts of the Theotokos.' Pascha — the 'Feast of feasts' — stands above the Twelve.",
  learningObjectives: [
    "List the Twelve Great Feasts in calendar order.",
    "Distinguish feasts of the Lord from feasts of the Theotokos.",
  ],
  primarySources: [
    "Typikon",
    "Menaion, Triodion, Pentecostarion",
  ],
  items: [
    {
      id: "prac-gf-001",
      kind: "qa",
      difficulty: 3,
      tags: ["feasts", "liturgical-year"],
      prompt:
        "List the Twelve Great Feasts of the Orthodox year in calendar order (beginning September 1, the start of the liturgical year).",
      expectedAnswer:
        "(1) Nativity of the Theotokos — September 8. (2) Exaltation of the Cross — September 14. (3) Entrance of the Theotokos into the Temple — November 21. (4) Nativity of the Lord — December 25. (5) Theophany (Baptism of the Lord) — January 6. (6) Meeting of the Lord — February 2. (7) Annunciation — March 25. (8) Entry of the Lord into Jerusalem (Palm Sunday — moveable). (9) Ascension of the Lord (40 days after Pascha — moveable). (10) Pentecost (50 days after Pascha — moveable). (11) Transfiguration — August 6. (12) Dormition of the Theotokos — August 15. Pascha itself stands above the Twelve as the Feast of feasts.",
      citations: [
        { source: "Typikon of the Great Church of Christ; Menaion" },
      ],
    },
  ],
};

export const paschaCalculation: Topic = {
  id: "pascha-calculation",
  title: "The Paschalion — Calculating Pascha",
  summary:
    "The First Ecumenical Council (Nicaea, 325) set the rule: Pascha is the first Sunday after the first full moon on or after the vernal equinox, never coinciding with Jewish Passover. The Orthodox follow the Julian Paschalion universally (except the Finnish Church).",
  learningObjectives: [
    "State the Nicene rule for Pascha.",
    "Distinguish the Julian Paschalion from Western Easter.",
  ],
  primarySources: [
    "Acts of Nicaea (325), Pascha decree (preserved in Constantine's encyclical)",
    "Apostolic Canon 7",
  ],
  items: [
    {
      id: "prac-pas-001",
      kind: "qa",
      difficulty: 4,
      tags: ["pascha", "nicaea"],
      prompt:
        "What is the Nicene rule for the date of Pascha, and how does the Orthodox Paschalion differ from the Western (Gregorian) Easter?",
      expectedAnswer:
        "Pascha is the first Sunday following the first full moon on or after the vernal equinox, and must NEVER coincide with the Jewish Passover (which is itself fixed to 14 Nisan). The Orthodox compute the equinox and the paschal moon using the Julian calendar; the West, using the Gregorian. The two coincide in some years, diverge in others — Orthodox Pascha is never before Western Easter and may be one to five weeks later.",
      citations: [
        { source: "Nicaea I (325), conciliar decree on the Paschalion" },
        { source: "Apostolic Canon 7" },
      ],
    },
  ],
};

export const iconography: Topic = {
  id: "iconography",
  title: "Iconography",
  summary:
    "The theology of the icon: the Incarnation grounds the image; matter sanctified can mediate grace. The practice: egg tempera, gold leaf, board prep, the Hermeneia of Dionysius of Fourna; the painter's rule of life.",
  learningObjectives: [
    "State the dogmatic ground of icons (Nicaea II).",
    "Distinguish proskynesis from latreia.",
    "Identify the iconographer's spiritual discipline.",
  ],
  primarySources: [
    "Acts of Nicaea II (787)",
    "St. John of Damascus, On the Divine Images",
    "Dionysius of Fourna, Hermeneia of the Painters' Art (~AD 1730)",
    "Leonid Ouspensky, Theology of the Icon",
  ],
  items: [
    {
      id: "prac-ico-001",
      kind: "qa",
      difficulty: 3,
      tags: ["icons", "nicaea-ii"],
      prompt:
        "How does the Definition of Nicaea II (787) distinguish the honor due to icons from the worship due to God alone?",
      expectedAnswer:
        "The Definition uses the Greek terms 'proskynesis' (honor, reverence — what we may give to created things in their function as bearers of the holy) and 'latreia' (worship, adoration, what is due to God alone). 'For the honor paid to the image passes on to that which the image represents... but true worship (latreia) is reserved for the divine nature alone.'",
      citations: [
        {
          source: "Definition of the Seventh Ecumenical Council (787)",
          quote:
            "We define... that the honorable and life-giving Cross, also the holy icons... should be set forth in the holy churches of God, on the sacred vessels and vestments... For the honor which is paid to the image passes on to that which the image represents.",
        },
      ],
    },
  ],
};

export const confession: Topic = {
  id: "confession",
  title: "Confession & Spiritual Fatherhood",
  summary:
    "The mystery of repentance, exomologesis. Confession to a priest who absolves in the name of Christ, by the authority of John 20:23. Spiritual fatherhood as the framework of confession.",
  learningObjectives: [
    "Cite John 20:23.",
    "Explain why confession to a priest is normative.",
  ],
  primarySources: [
    "John 20:21–23; James 5:16",
    "St. Basil the Great, Letters 217 (canons on penance)",
  ],
  items: [
    {
      id: "prac-con-001",
      kind: "debate",
      difficulty: 4,
      tags: ["confession", "evangelical"],
      opponentTradition: "NonDenom",
      opponentClaim:
        "I confess directly to God; I don't need a priest. The Bible says 'if we confess our sins, He is faithful and just to forgive us' (1 Jn 1:9).",
      orthodoxRebuttal:
        "1 Jn 1:9 is true — every Christian confesses to God and is forgiven by God. The question is whether HOW we confess is also given in Scripture. James 5:16 — 'Confess your faults one to another' — establishes confession as a communal act. John 20:23 is decisive: 'Whose soever sins ye remit, they are remitted unto them; and whose soever sins ye retain, they are retained.' The Lord gives this authority specifically to the Apostles, and through them to their successors. The sacramental confession to a priest is not an obstacle between you and God; it is the visible-sacramental form in which God's forgiveness, which He works directly, is sealed and applied to you with the assurance of His Apostolic Church. Patristic witness: Didache 4:14 — 'In the church thou shalt confess thy transgressions'; Tertullian, De Paenitentia 9–10; Origen, Homilies on Leviticus 2.4; Basil, Letter 217. Furthermore, the spiritual father provides what private confession cannot: counsel, accountability, repentance directed to the actual roots of sin, and the medicine of obedience.",
      citations: [
        { source: "John 20:21–23; James 5:16; 1 John 1:9" },
        { source: "Didache 4:14; 14:1" },
        { source: "St. Basil the Great, Letters 217 (Canonical Epistles)" },
      ],
    },
  ],
};
