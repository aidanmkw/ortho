import type { Topic } from "@/lib/types";

export const gnosticism: Topic = {
  id: "gnosticism",
  title: "Gnosticism",
  summary:
    "Second-century dualist and elitist systems (Valentinus, Basilides, Marcion). The flesh was evil, the material God of the OT was a lower demiurge, salvation was secret knowledge (gnosis) for the few. Refuted in full by St. Irenaeus.",
  learningObjectives: [
    "Name three principal Gnostic teachers and the school of each.",
    "State the Orthodox doctrine of creation against dualism.",
    "Identify Irenaeus and his anti-Gnostic work.",
  ],
  primarySources: [
    "St. Irenaeus, Against Heresies (Adversus Haereses)",
    "St. Hippolytus, Refutation of All Heresies",
    "Nag Hammadi corpus (for Gnostic primary sources)",
  ],
  items: [
    {
      id: "her-gno-001",
      kind: "qa",
      difficulty: 2,
      tags: ["irenaeus", "gnostics"],
      prompt:
        "Which Father wrote the foundational five-book refutation of Gnosticism, and approximately when?",
      expectedAnswer:
        "St. Irenaeus of Lyon, Against Heresies (Adversus Haereses), c. AD 180. Bishop of Lugdunum (Lyon); disciple of St. Polycarp, who was disciple of St. John the Theologian.",
      citations: [{ source: "St. Irenaeus of Lyon, Against Heresies (c. AD 180)" }],
    },
    {
      id: "her-gno-002",
      kind: "mcq",
      difficulty: 3,
      tags: ["marcion", "canon"],
      prompt:
        "Marcion of Sinope (~AD 140) is significant in canonical history because:",
      choices: [
        {
          id: "a",
          text: "He produced the first attempt at a 'New Testament' canon — a truncated Luke and ten Pauline epistles — rejecting the entire Old Testament.",
          rationale: "Correct. His radical pruning forced the Church to articulate her own canon explicitly.",
        },
        { id: "b", text: "He translated the Septuagint into Latin." },
        { id: "c", text: "He composed the Apostles' Creed." },
        { id: "d", text: "He defended the Old Testament against the Gnostics." },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "Tertullian, Against Marcion, five books (~AD 207)" },
        { source: "St. Irenaeus, Against Heresies I.27" },
      ],
    },
    {
      id: "her-gno-003",
      kind: "identify-source",
      difficulty: 4,
      tags: ["irenaeus", "recapitulation"],
      prompt:
        "Identify the source of: 'He became what we are, that He might bring us to be even what He is Himself.'",
      choices: [
        { id: "a", text: "Athanasius, On the Incarnation" },
        { id: "b", text: "Irenaeus, Against Heresies V Preface", rationale: "Correct — written ~30 years before Athanasius's similar formula." },
        { id: "c", text: "Origen, On First Principles" },
        { id: "d", text: "Tertullian, Against Praxeas" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source: "St. Irenaeus, Against Heresies V Preface",
          quote:
            "The Word of God, Jesus Christ our Lord, did, through His transcendent love, become what we are, that He might bring us to be even what He is Himself.",
        },
      ],
    },
  ],
};

export const monothelitism: Topic = {
  id: "monothelitism",
  title: "Monothelitism & Monoenergism",
  summary:
    "Seventh-century imperial compromise asserting Christ has only one will (the divine), to reconcile the Chalcedonian and non-Chalcedonian parties. Refuted by St. Maximus the Confessor; condemned at Constantinople III (681).",
  learningObjectives: [
    "State the dyothelite doctrine: two natures, two wills, two operations.",
    "Connect monothelitism to the Honorius case.",
  ],
  primarySources: [
    "St. Maximus the Confessor, Disputation with Pyrrhus",
    "Acts of Constantinople III (681)",
    "Pope Leo II's confirmation letter (682)",
  ],
  items: [
    {
      id: "her-mon-001",
      kind: "qa",
      difficulty: 3,
      tags: ["maximus", "two-wills"],
      prompt:
        "Why is dyothelitism (two wills in Christ) necessary, and what would denying it imply?",
      expectedAnswer:
        "A nature without its own will is a nature less than complete. To deny Christ a human will is to deny that He took on a full human nature. He could not then have prayed in Gethsemane 'not my will but Thine be done' (Lk 22:42), where the human will of Christ submits in obedience to the divine. Maximus: in Christ, two natural wills concur perfectly — He is one Person who wills divinely in His divinity, and humanly in His humanity, with the humanity always free yet always conformed to the divine.",
      citations: [
        { source: "Luke 22:42" },
        {
          source: "Definition of the Sixth Ecumenical Council (681)",
          quote:
            "We proclaim equally two natural wills or wills in Him and two natural operations, without division, without change, without separation, without confusion.",
        },
      ],
    },
  ],
};

export const pelagianism: Topic = {
  id: "pelagianism",
  title: "Pelagianism & Semi-Pelagianism",
  summary:
    "The British monk Pelagius (early 5th c.) denied original sin and held that grace is no more than aid to a will that is intrinsically sufficient. Augustine answered him in the West. The Orthodox East holds a different anthropology than the Latin West but unambiguously rejects Pelagius.",
  learningObjectives: [
    "Distinguish Orthodox ancestral sin from Augustinian inherited guilt.",
    "Show that the East rejected Pelagius without adopting Augustinian predestination.",
  ],
  primarySources: [
    "St. Augustine, On Nature and Grace; Against Pelagius",
    "Council of Carthage (418) — condemned Pelagius",
    "St. John Cassian, Conferences (esp. Conf. XIII)",
  ],
  items: [
    {
      id: "her-pel-001",
      kind: "debate",
      difficulty: 5,
      tags: ["original-sin", "ancestral-sin", "rcc", "reformed"],
      opponentTradition: "Reformed",
      opponentClaim:
        "Romans 5:12 says 'death passed upon all men, for that all have sinned' — proving that we inherit Adam's guilt. The Orthodox denial of inherited guilt is a denial of original sin and is therefore Pelagian.",
      orthodoxRebuttal:
        "The denial is not of inherited consequences but of inherited GUILT. The Greek 'eph' hō' in Rom 5:12 means 'because' or 'in that' — i.e., death came to all because all sinned (in their own persons). The Latin Vulgate translated 'eph' hō' as 'in quo' ('in whom'), suggesting all sinned IN Adam, and Augustine, who read Paul in Latin, built the doctrine of inherited guilt on this misreading. Modern Catholic exegesis acknowledges the Greek meaning. The Greek Fathers (Chrysostom, Cyril of Alexandria, Theodoret, Photios) read the Greek correctly: we inherit MORTALITY and CORRUPTIBILITY from Adam (1 Cor 15:21–22), the existential condition of being subject to death, the passions, and the disordered inclinations — but we do not inherit a personal moral debt for an act we did not commit. Ezekiel 18:20 — 'the son shall not bear the iniquity of the father.' The Orthodox doctrine of ANCESTRAL sin therefore preserves both (a) the gravity of Adam's fall and the universal need of Christ's salvation, and (b) the personal moral responsibility of each human soul. This is decidedly NOT Pelagianism: Pelagius denied that we need grace at all; Orthodoxy confesses that we cannot be saved without Christ's grace cooperating with our willing response (synergeia). Two errors lie at opposite poles — Pelagianism (we can save ourselves) and Augustinian predestinarianism (God saves the elect alone irresistibly). Orthodoxy walks between them.",
      rejoinders: [
        {
          objection:
            "But why are infants baptized if not to wash away inherited guilt?",
          reply:
            "Infants are baptized to be united to Christ, incorporated into the Body of the Church, born again of water and Spirit (Jn 3:5), made partakers of the death and resurrection of Christ, and given the indwelling of the Holy Spirit unto the healing of fallen nature. We do not baptize them to acquit them of a juridical guilt they cannot have incurred.",
        },
        {
          objection:
            "Without inherited guilt, where does total depravity come from?",
          reply:
            "There is no 'total depravity' in the Orthodox confession. The image of God in man is wounded by the Fall, the will is sick and inclined to passion, but the image is not erased. We are not abominations to God; we are sick patients being healed in the hospital of the Church.",
        },
      ],
      citations: [
        { source: "Romans 5:12 (Greek)" },
        {
          source: "Ezekiel 18:20",
          quote:
            "The son shall not bear the iniquity of the father, neither shall the father bear the iniquity of the son.",
        },
        {
          source: "St. John Chrysostom, Homily 10 on Romans",
          quote:
            "What does 'for that all have sinned' mean? — That when he fell, even they that had not eaten of the tree did all of them from him become mortal.",
        },
        { source: "John Cassian, Conferences XIII" },
      ],
    },
  ],
};

export const arianismDeep: Topic = {
  id: "arianism-deep",
  title: "Arianism — Deep Dive",
  summary:
    "The longer story of Arius's heresy and its semi-Arian aftermaths (homoiousios, anomoianism, Eunomianism). 'Athanasius contra mundum.' Vindicated only at Constantinople I (381).",
  learningObjectives: [
    "Distinguish homoousios, homoiousios, homoios, and anomoios.",
    "Describe Athanasius's five exiles.",
    "Identify Basil's role at Constantinople I.",
  ],
  primarySources: [
    "St. Athanasius, Orations Against the Arians; On the Nicene Decrees",
    "Symbol of Faith (Niceno-Constantinopolitan, 381)",
    "St. Hilary of Poitiers, On the Trinity",
  ],
  items: [
    {
      id: "her-arid-001",
      kind: "mcq",
      difficulty: 4,
      tags: ["arianism", "vocabulary"],
      prompt:
        "Which Greek term was the Nicene watchword for the Son's divinity, distinguishing it from the semi-Arian compromise?",
      choices: [
        {
          id: "a",
          text: "ὁμοούσιος (homoousios) — 'of one essence/substance'",
          rationale: "Correct. The semi-Arian 'homoiousios' differs by a single iota.",
        },
        { id: "b", text: "ὁμοιούσιος (homoiousios) — 'of like essence'" },
        { id: "c", text: "ὑπερούσιος (hyperousios) — 'beyond essence'" },
        { id: "d", text: "ἑνούσιος (henousios) — 'of unitive essence'" },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "Symbol of Nicaea (325)" },
        { source: "St. Athanasius, De Decretis Nicaenae Synodi" },
      ],
    },
    {
      id: "her-arid-002",
      kind: "qa",
      difficulty: 4,
      tags: ["athanasius"],
      prompt:
        "How many times was St. Athanasius exiled, and over what total span?",
      expectedAnswer:
        "Five exiles, over approximately 17 years out of 45 as bishop of Alexandria (consecrated 328; died 373). The exiles were under Constantine (1st), Constantius II (2nd, 3rd, 4th), and Julian the Apostate (5th).",
      citations: [
        { source: "St. Athanasius, History of the Arians; Apology against the Arians" },
        { source: "Socrates, Ecclesiastical History" },
      ],
    },
  ],
};
