import type { Topic } from "@/lib/types";

export const docetism: Topic = {
  id: "docetism",
  title: "Docetism",
  summary: "The early heresy that Christ only seemed (dokein) to have a body. Refuted by St. Ignatius and 1 John.",
  learningObjectives: ["Quote 1 John 4:2-3.", "Cite Ignatius against the Docetists."],
  primarySources: ["1 John 4:2-3; 2 John 7", "Ignatius, Smyrnaeans 1-7; Trallians 9-10"],
  items: [
    {
      id: "her-doc-001",
      kind: "identify-source",
      difficulty: 3,
      tags: ["docetism", "ignatius"],
      prompt: "Identify the source: 'For if these things were done by our Lord only in appearance, then I also am bound only in appearance.'",
      choices: [
        { id: "a", text: "Polycarp, To the Philippians" },
        { id: "b", text: "Ignatius of Antioch, Trallians 10", rationale: "Correct. ~AD 107." },
        { id: "c", text: "1 John 4:2-3" },
        { id: "d", text: "Tertullian, Against Marcion" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "St. Ignatius, Trallians 10 (~AD 107)" }],
    },
    {
      id: "her-doc-002",
      kind: "qa",
      difficulty: 2,
      tags: ["docetism", "scripture"],
      prompt: "Which Johannine verse provides the scriptural test for Docetism?",
      expectedAnswer: "1 John 4:2-3 — 'Hereby know ye the Spirit of God: Every spirit that confesseth that Jesus Christ is come in the flesh is of God; and every spirit that confesseth not that Jesus Christ is come in the flesh is not of God: and this is that spirit of antichrist.'",
      citations: [{ source: "1 John 4:2-3; cf. 2 John 7" }],
    },
  ],
};

export const sabellianism: Topic = {
  id: "sabellianism",
  title: "Sabellianism / Modalism",
  summary: "The doctrine that Father, Son, and Spirit are not distinct hypostases but successive modes of the same Person. Also called Patripassianism (since on this view the Father suffered).",
  learningObjectives: ["State why modalism is unacceptable.", "Identify the Cappadocian answer."],
  primarySources: ["Hippolytus, Refutation 9", "Tertullian, Against Praxeas"],
  items: [
    {
      id: "her-sab-001",
      kind: "qa",
      difficulty: 3,
      tags: ["modalism"],
      prompt: "Why is Modalism (Sabellianism) heretical?",
      expectedAnswer: "It denies the eternal personal distinction of Father, Son, and Holy Spirit, reducing them to three roles or appearances of one indistinct God. It contradicts the baptism of Christ (where the three are simultaneously present — Father speaking, Son baptized, Spirit descending — Mt 3:16-17), the high-priestly prayer (Jn 17), and the apostolic baptismal formula (Mt 28:19). It also leads to Patripassianism — the absurdity that the Father suffered on the cross.",
      citations: [
        { source: "Matthew 3:16-17; John 17; Matthew 28:19" },
        { source: "Tertullian, Against Praxeas" },
      ],
    },
  ],
};

export const apollinarianism: Topic = {
  id: "apollinarianism",
  title: "Apollinarianism",
  summary: "The 4th-century heresy of Apollinaris of Laodicea: Christ assumed a human body and soul but no human mind (nous); the divine Logos replaced the human mind. Refuted by Gregory the Theologian.",
  learningObjectives: ["State the Apollinarian thesis.", "Quote Gregory: 'what is not assumed is not healed.'"],
  primarySources: ["Gregory the Theologian, Letter 101 to Cledonius"],
  items: [
    {
      id: "her-apo-001",
      kind: "identify-source",
      difficulty: 4,
      tags: ["apollinarian", "gregory-theologian"],
      prompt: "Identify the source: 'That which He has not assumed He has not healed; but that which is united to His Godhead is also saved.'",
      choices: [
        { id: "a", text: "Athanasius, On the Incarnation" },
        { id: "b", text: "Gregory the Theologian, Letter 101 to Cledonius", rationale: "Correct. Against Apollinaris." },
        { id: "c", text: "Basil, Letters" },
        { id: "d", text: "Cyril of Alexandria, On the Unity of Christ" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source: "St. Gregory the Theologian, Letter 101 to Cledonius",
          quote: "What is not assumed is not healed; but that which is united to God is saved.",
        },
      ],
    },
  ],
};

export const monophysitism: Topic = {
  id: "monophysitism",
  title: "Monophysitism / Eutychianism",
  summary: "Eutyches's teaching that after the union, Christ has only one nature (mone physis) — the divine swallowing or absorbing the human. Condemned at Chalcedon (451).",
  learningObjectives: ["Distinguish Eutychian monophysitism from Miaphysitism of the Oriental Orthodox.", "State Chalcedon's response."],
  primarySources: ["Tome of Leo (449)", "Definition of Chalcedon (451)"],
  items: [
    {
      id: "her-mph-001",
      kind: "qa",
      difficulty: 4,
      tags: ["monophysitism", "miaphysitism"],
      prompt: "Distinguish Eutychian monophysitism from the miaphysite Christology of the Oriental Orthodox.",
      expectedAnswer: "Eutyches (5th c.) held that after the union, Christ's humanity was so absorbed by His divinity that 'after the union there is only one nature.' This was condemned at Chalcedon (451). The Oriental Orthodox (Coptic, Armenian, Syriac, Ethiopian, Eritrean, Indian) hold a 'miaphysite' Christology following Cyril of Alexandria's formula 'one incarnate nature of God the Word' (mia physis tou Theou Logou sesarkōmenē), but they emphatically reject Eutychian absorption: the humanity is fully preserved within the one composite nature. Modern Christological dialogues (Chambésy 1989-1990) have produced agreements on the Christological substance, though the canonical-juridical question of the Council of Chalcedon's reception remains.",
      citations: [
        { source: "Cyril of Alexandria, Letter 39 (Laetentur Caeli)" },
        { source: "Second Agreed Statement of the Joint Commission, Chambésy 1990" },
      ],
    },
  ],
};

export const adoptionism: Topic = {
  id: "adoptionism",
  title: "Adoptionism",
  summary: "The teaching that Christ was a mere man adopted by God at His baptism or resurrection. Earliest form: Theodotus the Tanner; later: Paul of Samosata (Antioch, 3rd c.).",
  learningObjectives: ["Identify Paul of Samosata.", "Note the Council of Antioch (268)."],
  primarySources: ["Eusebius EH 7.27-30"],
  items: [
    {
      id: "her-adop-001",
      kind: "mcq",
      difficulty: 3,
      tags: ["adoptionism", "paul-of-samosata"],
      prompt: "Which 3rd-century bishop was deposed for adoptionism at the Council of Antioch (268)?",
      choices: [
        { id: "a", text: "Paul of Samosata", rationale: "Correct. Eusebius EH 7.30." },
        { id: "b", text: "Sabellius" },
        { id: "c", text: "Theodotus the Cobbler" },
        { id: "d", text: "Beryllus of Bostra" },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Eusebius, EH 7.27-30" }],
    },
  ],
};

export const manicheism: Topic = {
  id: "manicheism",
  title: "Manichaeism",
  summary: "Mani (216–276), Persian founder of a dualist religion blending Zoroastrian, Christian, and Buddhist elements. Augustine was a Manichaean for nine years before his conversion.",
  learningObjectives: ["Identify Mani.", "Note Augustine's Manichaean past."],
  primarySources: ["Augustine, Confessions III-IX", "Augustine, Against the Manichaeans"],
  items: [
    {
      id: "her-mani-001",
      kind: "qa",
      difficulty: 3,
      tags: ["manichaeism", "augustine"],
      prompt: "How long was Augustine a Manichaean before his conversion to Christianity?",
      expectedAnswer: "Nine years (c. 373–382), as an 'auditor' (not one of the inner-circle 'elect'). His struggle with Manichaean dualism — the eternal cosmic battle of good and evil, the rejection of matter — shaped his subsequent anti-Manichaean writings and influenced his theology in lasting ways.",
      citations: [{ source: "St. Augustine, Confessions III-V" }],
    },
  ],
};

export const eunomianism: Topic = {
  id: "eunomianism",
  title: "Eunomianism (Neo-Arianism / Anomoianism)",
  summary: "The radical late-4th-century Arian position of Aetius and Eunomius: the Son is unlike (anomoios) the Father in essence. Refuted by Basil's Against Eunomius and Gregory of Nyssa.",
  learningObjectives: ["State Eunomius's position.", "Cite Basil's response."],
  primarySources: ["Basil, Against Eunomius (3 books)", "Gregory of Nyssa, Contra Eunomium (12 books)"],
  items: [
    {
      id: "her-eun-001",
      kind: "qa",
      difficulty: 4,
      tags: ["eunomius", "anomoian"],
      prompt: "What did Eunomius teach about the relation of the Son to the Father, and how did the Cappadocians refute him?",
      expectedAnswer: "Eunomius held that the Son is 'unlike' (anomoios) the Father in essence — the most extreme form of Arianism. He further claimed knowledge of the divine essence (definable as 'Unbegottenness'). Basil's Against Eunomius and Gregory of Nyssa's twelve-book Contra Eunomium refute him on two fronts: (1) the Son is consubstantial (homoousios) with the Father, as confessed at Nicaea; (2) the divine essence is unknowable to creatures — we know God through His energies (Basil, Letter 234). The Cappadocian apophatic/cataphatic synthesis answers Eunomius's rationalism.",
      citations: [
        { source: "St. Basil the Great, Against Eunomius" },
        { source: "St. Gregory of Nyssa, Contra Eunomium" },
      ],
    },
  ],
};

export const nestorianismDeep: Topic = {
  id: "nestorianism-deep",
  title: "Nestorianism — Deep",
  summary: "The Christology of Nestorius (consecrated patriarch of Constantinople 428): two persons (one divine, one human) loosely conjoined; rejection of Theotokos. Condemned at Ephesus (431).",
  learningObjectives: ["State Cyril's Twelve Anathemas (in summary).", "Identify the 'two sons' problem."],
  primarySources: ["Cyril, Letters 4, 17 (Twelve Anathemas)", "Acts of Ephesus (431)"],
  items: [
    {
      id: "her-nesd-001",
      kind: "qa",
      difficulty: 4,
      tags: ["nestorius", "cyril"],
      prompt: "Why did St. Cyril of Alexandria charge Nestorius with implicitly teaching 'two Sons'?",
      expectedAnswer: "Nestorius refused to say 'God was born of Mary' or 'God suffered' — only that 'Christ' was born and suffered. Cyril argued this divided Christ into a divine Son (the Logos) and a human son (Jesus), tied only by moral or relational union (synapheia), not by genuine hypostatic unity. If the One born of Mary is not also truly God, then there are two distinct subjects in Christ — two sons — and our salvation, which requires the suffering and dying of God's own Son in our flesh, is undone.",
      citations: [
        { source: "St. Cyril of Alexandria, Second Letter to Nestorius" },
        { source: "St. Cyril, On the Unity of Christ" },
      ],
    },
  ],
};
