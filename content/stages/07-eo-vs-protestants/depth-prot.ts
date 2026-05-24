import type { Topic } from "@/lib/types";

export const reformedTulip: Topic = {
  id: "reformed-tulip",
  title: "Reformed — TULIP & The Synod of Dort",
  summary:
    "Total depravity, Unconditional election, Limited atonement, Irresistible grace, Perseverance of the saints. The five points crystallized at Dort (1618–9) against the Arminian Remonstrants.",
  learningObjectives: [
    "Refute each of the five points from Scripture and the Fathers.",
  ],
  primarySources: [
    "Canons of Dort (1619)",
    "Westminster Confession of Faith (1646)",
    "St. John Chrysostom, Homilies on Romans",
    "St. John Cassian, Conferences XIII",
  ],
  items: [
    {
      id: "prot-tul-001",
      kind: "debate",
      difficulty: 5,
      tags: ["calvinism", "election", "predestination"],
      opponentTradition: "Reformed",
      opponentClaim:
        "God unconditionally elects some to salvation and passes over the rest. Romans 9 is decisive: 'Jacob have I loved, but Esau have I hated.' Faith itself is a gift God gives only to the elect.",
      orthodoxRebuttal:
        "Three answers. (1) Romans 9–11 must be read AS A UNIT, with Paul's own conclusion in 11:32: 'For God hath concluded them all in unbelief, that he might have mercy upon all.' The argument of the chapters is not about individual eternal destinies but about the FREEDOM of God's election of peoples — first Israel, then the Gentiles — and the mystery of His mercy that does not discriminate. (2) The Pauline use of 'Esau have I hated' (Mal 1:2–3) is a Hebraism. Lk 14:26 — 'If any man come to me, and hate not his father and mother and wife and children and brethren and sisters, yea, and his own life also, he cannot be my disciple.' The Lord clearly does not command murderous hatred; the Hebrew/Greek idiom expresses comparative preference. So 'Jacob have I loved, but Esau have I hated' means 'I have chosen Jacob over Esau' — for the unfolding of the covenant line. (3) Universal salvific intention is the explicit teaching of 1 Tim 2:4: 'God will have all men to be saved.' 2 Pet 3:9: 'not willing that any should perish, but that all should come to repentance.' The patristic consensus reads these texts as Paul does: God's election is real, but it operates in synergy with human freedom, never overriding it. John Cassian's Conferences XIII (against an extreme Augustinianism) presents the Eastern view: God provides grace universally; we cooperate or resist.",
      rejoinders: [
        {
          objection: "But if grace is resistible, salvation depends on us — and that's Pelagianism.",
          reply:
            "It is not. The Orthodox confession is that the FIRST grace, the prevenient grace that enables any response at all, is wholly God's. Our cooperation is itself enabled by grace. The crucial point is that this enabling does NOT necessitate the will; it heals and frees it. The will, once freed, may yield or resist. This is synergy: grace and freedom together. Far from Pelagianism, it is the very anti-Pelagian point St. John Cassian was making against the Roman extremes of his day.",
        },
        {
          objection: "Total depravity: man is dead in sin, unable to respond.",
          reply:
            "Eph 2:1 — 'dead in trespasses' — is read by the Fathers as moral, not metaphysical death. The image of God in man is wounded, not erased. Dead men can still hear: 'My sheep hear my voice' (Jn 10:27). The Reformed reading of total depravity (the image erased; the will incapable of any movement) is foreign to the patristic tradition.",
        },
      ],
      citations: [
        { source: "Romans 9:13; 11:32" },
        { source: "1 Timothy 2:4; 2 Peter 3:9; John 10:27" },
        { source: "St. John Cassian, Conferences XIII (early 5th c.)" },
        { source: "Confession of Dositheus (1672), Decree 3" },
      ],
    },
  ],
};

export const invisibleChurch: Topic = {
  id: "invisible-church",
  title: "The 'Invisible Church'",
  summary:
    "Luther's and Calvin's distinction between the visible and invisible Church — the elect known only to God. Foreign to the patristic ecclesiology of one visible body.",
  learningObjectives: [
    "Quote Mt 16:18 + 18:17 on the visible Church.",
    "Cite Cyprian on visible unity.",
  ],
  primarySources: [
    "Mt 16:18; 18:17; Eph 4:4–6",
    "St. Cyprian, De Unitate Ecclesiae 4–6",
  ],
  items: [
    {
      id: "prot-iv-001",
      kind: "debate",
      difficulty: 4,
      tags: ["invisible-church", "ecclesiology"],
      opponentTradition: "Reformed",
      opponentClaim:
        "The true Church is invisible — composed of the elect known only to God, scattered across denominations. Visible institutional unity isn't necessary; doctrinal agreement on essentials is.",
      orthodoxRebuttal:
        "Three difficulties. (1) The Lord said 'I will build my Church' (Mt 16:18 — singular, visible, definite article) — not 'my invisible network of true believers.' And He gave it visible procedures: 'tell it unto the church; but if he neglect to hear the church, let him be unto thee as an heathen man' (Mt 18:17). An invisible church cannot be told something or be neglected to hear. (2) The 'essentials vs. non-essentials' move begs the question. WHO decides what is essential? Christ, you say — but interpreted by whom? Five years of conversation with serious Protestants of different confessions on baptism, Eucharist, justification, polity, and eschatology shows there is no agreement on what counts as essential. (3) Empirically: 30,000+ Protestant denominations. The 'invisible church' hypothesis salvages this by saying they're all really one underneath — but this is unfalsifiable. The patristic Church, by contrast, met in councils, deposed bishops who taught false doctrine, anathematized heresies, and could be PHYSICALLY POINTED TO — by Irenaeus listing succession (~180), by Eusebius mapping sees (~325), by every age since.",
      citations: [
        { source: "Mt 16:18; 18:17; Eph 4:4–6" },
        {
          source: "St. Cyprian, De Unitate Ecclesiae 5",
          quote:
            "There is one Church, which is divided in its progress... like rays from the sun — many, but united in their source.",
        },
      ],
    },
  ],
};

export const totalDepravity: Topic = {
  id: "total-depravity",
  title: "Total Depravity",
  summary:
    "The Reformed (and modern evangelical) doctrine that fallen man is utterly incapable of any movement toward God. Refuted by the patristic anthropology of the wounded image.",
  learningObjectives: [
    "Cite the Greek Fathers on the image of God in fallen man.",
    "Read Eph 2:1 in patristic exegesis.",
  ],
  primarySources: [
    "Ephesians 2:1–10",
    "St. John Chrysostom, Homilies on Ephesians",
    "St. Macarius the Great, Spiritual Homilies",
  ],
  items: [
    {
      id: "prot-td-001",
      kind: "qa",
      difficulty: 4,
      tags: ["total-depravity", "image-of-god"],
      prompt:
        "How do the Greek Fathers read 'dead in trespasses' (Eph 2:1), and how does this differ from the Reformed doctrine of total depravity?",
      expectedAnswer:
        "The Greek Fathers (Chrysostom, Cyril, John of Damascus) read 'dead' (nekrous) as MORAL death — the soul cut off from the life of God, weakened, prone to sin, but with the image of God still present (Gen 1:26; Jas 3:9). The will is wounded, not abolished. The Reformed doctrine of total depravity goes further: fallen man is INCAPABLE of any movement toward God whatsoever; only irresistible grace can move him. The Orthodox view is synergy: God's grace is the necessary cause of any salvific response, but the wounded will, healed by grace, can also resist or cooperate. We are sick, not dead in the absolute sense.",
      citations: [
        { source: "Ephesians 2:1; James 3:9; Genesis 1:26" },
        {
          source: "St. John Chrysostom, Homily 4 on Ephesians",
        },
      ],
    },
  ],
};
