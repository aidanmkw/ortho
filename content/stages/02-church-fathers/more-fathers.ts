import type { Topic } from "@/lib/types";

export const irenaeus: Topic = {
  id: "irenaeus",
  title: "St. Irenaeus of Lyon",
  summary:
    "Disciple of Polycarp (who was disciple of John the Theologian). Bishop of Lugdunum. Author of Against Heresies — the foundational anti-Gnostic treatise, witness to the rule of faith and apostolic succession.",
  learningObjectives: [
    "Identify Irenaeus's living link to the Apostle John (through Polycarp).",
    "Quote his recapitulation theology.",
  ],
  primarySources: [
    "St. Irenaeus, Against Heresies (Adversus Haereses), five books, ~AD 180",
    "Demonstration of the Apostolic Preaching",
  ],
  items: [
    {
      id: "cf-ire-001",
      kind: "qa",
      difficulty: 2,
      tags: ["irenaeus", "succession"],
      prompt:
        "Through what living chain does Irenaeus connect his teaching to the Apostle John?",
      expectedAnswer:
        "Irenaeus was a disciple of St. Polycarp of Smyrna; Polycarp was a disciple of St. John the Theologian. Irenaeus appeals to this two-link chain in his Letter to Florinus (preserved in Eusebius EH 5.20) and uses Polycarp's teaching as the personal touchstone of apostolic doctrine.",
      citations: [
        {
          source: "St. Irenaeus, Letter to Florinus (preserved in Eusebius EH 5.20)",
          quote:
            "I remember the very place in which the blessed Polycarp sat as he discoursed, and his going out and coming in, and the manner of his life, and his physical appearance, and his discourses to the people, and the accounts which he gave of his intercourse with John and with the others who had seen the Lord.",
        },
      ],
    },
  ],
};

export const chrysostom: Topic = {
  id: "chrysostom",
  title: "St. John Chrysostom (the Golden-Mouth)",
  summary:
    "Archbishop of Constantinople. Greatest preacher of the patristic era. Composed the Liturgy that bears his name. Exiled twice; died en route to his last exile (407). Author of vast homilies on virtually every book of the Bible.",
  learningObjectives: [
    "Identify the Divine Liturgy of St. John Chrysostom.",
    "Quote his teaching on almsgiving and Lazarus.",
  ],
  primarySources: [
    "Homilies on Matthew, John, Romans, 1 Corinthians, Hebrews",
    "On the Priesthood",
    "Homilies on Lazarus",
    "The Divine Liturgy bearing his name",
  ],
  items: [
    {
      id: "cf-chr-001",
      kind: "identify-source",
      difficulty: 3,
      tags: ["chrysostom", "eucharist"],
      prompt:
        "Identify the source: 'When you see the Lord's blood that has flowed from His side, then take it... It is the body and blood not man's but the Lord's — be ye not bowed down to the world but reach upward.'",
      choices: [
        { id: "a", text: "St. Cyril of Jerusalem, Mystagogical Catecheses" },
        { id: "b", text: "St. John Chrysostom, Homilies on Matthew 82", rationale: "Correct." },
        { id: "c", text: "St. Ambrose, On the Mysteries" },
        { id: "d", text: "St. Justin Martyr, First Apology" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source: "St. John Chrysostom, Homily 82 on Matthew (~AD 391)",
          quote:
            "How many of you now say, I wish I could see His form, His clothing, His shoes! Lo! you see Him; you touch Him; you eat Him.",
        },
      ],
    },
  ],
};

export const symeonNewTheologian: Topic = {
  id: "symeon-new-theologian",
  title: "St. Symeon the New Theologian",
  summary:
    "(949–1022) The third Father to bear the title 'the Theologian.' Witness to the conscious experience of God's grace, vision of the divine and uncreated Light, and the necessity of a spiritual father.",
  learningObjectives: [
    "Identify the three 'Theologians' in the Orthodox liturgical tradition.",
    "Quote Symeon on the conscious experience of grace.",
  ],
  primarySources: [
    "St. Symeon the New Theologian, Hymns of Divine Love",
    "Catechetical Discourses",
    "Three Theological Discourses",
  ],
  items: [
    {
      id: "cf-sym-001",
      kind: "qa",
      difficulty: 3,
      tags: ["theologians"],
      prompt:
        "Which three Fathers carry the title 'the Theologian' in the Orthodox liturgical tradition?",
      expectedAnswer:
        "(1) St. John the Theologian — the Apostle and Evangelist; (2) St. Gregory the Theologian — of Nazianzus; (3) St. Symeon the New Theologian — of Constantinople (949–1022).",
      citations: [
        { source: "Orthodox Synaxarion; liturgical kontakia of the three saints" },
      ],
    },
  ],
};

export const cyrilOfAlexandria: Topic = {
  id: "cyril-alexandria",
  title: "St. Cyril of Alexandria",
  summary:
    "Pope of Alexandria. The hero of the Council of Ephesus (431). Defender of the Theotokos against Nestorius. Author of On the Unity of Christ — the locus classicus of Orthodox Christology.",
  learningObjectives: [
    "Identify Cyril's role at Ephesus.",
    "Quote a Cyrilline Christological formula.",
  ],
  primarySources: [
    "St. Cyril of Alexandria, On the Unity of Christ",
    "Letters to Nestorius (esp. 2 and 3 — the Twelve Anathemas)",
    "Commentary on John",
  ],
  items: [
    {
      id: "cf-cyr-001",
      kind: "qa",
      difficulty: 4,
      tags: ["cyril", "ephesus"],
      prompt:
        "What was St. Cyril's role at the Third Ecumenical Council, and what did the Council decree concerning the title Theotokos?",
      expectedAnswer:
        "St. Cyril of Alexandria presided at the Council of Ephesus (431) in the place of the entire Eastern episcopate. The Council deposed Nestorius and dogmatically affirmed that the Virgin Mary is truly Theotokos (God-Bearer), since the One she bore is in His person the eternal Son of God. Cyril's Twelve Anathemas were ratified by the Council and incorporated into its definition. The conciliar judgment: 'If anyone does not confess that Emmanuel is in truth God and that the holy Virgin is therefore Theotokos, since she gave birth in flesh to the Word of God become flesh, let him be anathema.'",
      citations: [
        { source: "Acts of the Council of Ephesus (431)" },
        { source: "St. Cyril, Twelve Anathemas (Anathema 1)" },
      ],
    },
  ],
};
