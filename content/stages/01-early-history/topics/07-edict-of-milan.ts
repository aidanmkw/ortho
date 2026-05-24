import type { Topic } from "@/lib/types";

export const edictOfMilan: Topic = {
  id: "edict-of-milan",
  title: "The Edict of Milan & St. Constantine the Great",
  summary:
    "The Edict of Milan (313) by which Constantine and Licinius granted freedom of religion to all and restored property to the Christians. The end of the era of persecution and the convocation of the First Ecumenical Council.",
  learningObjectives: [
    "Date and quote the Edict of Milan.",
    "Describe Constantine's vision before the Milvian Bridge.",
    "Defend Orthodoxy against the secular and Protestant 'Constantinian fall' narrative.",
    "Connect the Edict to the convocation of Nicaea I in 325.",
  ],
  primarySources: [
    "Lactantius, On the Deaths of the Persecutors 48 (full Latin text of the Edict)",
    "Eusebius, Life of Constantine I.28–31; III.1–21",
    "Eusebius, EH IX.9–10",
    "Acts of the Council of Nicaea (325)",
  ],
  items: [
    {
      id: "em-001",
      kind: "qa",
      difficulty: 1,
      tags: ["edict", "constantine", "licinius"],
      prompt:
        "In what year was the Edict of Milan issued, and by which two emperors?",
      expectedAnswer:
        "AD 313, jointly by Constantine in the West and Licinius in the East — at their meeting in Mediolanum (Milan). It established universal religious liberty and restored confiscated Christian property.",
      citations: [
        {
          source:
            "Lactantius, On the Deaths of the Persecutors 48 (preserving the full Latin text)",
          quote:
            "We have given unto Christians, and to all others, freedom in the practice of their religion, that whatsoever divinity dwells in the heavenly seat may be propitious unto us...",
        },
      ],
    },
    {
      id: "em-002",
      kind: "mcq",
      difficulty: 2,
      tags: ["milvian-bridge", "vision"],
      prompt:
        "What sign did Constantine reportedly see in the sky before the Battle of the Milvian Bridge (312)?",
      choices: [
        { id: "a", text: "A lamb upon an altar" },
        {
          id: "b",
          text: "A cross of light with the words 'in this sign conquer' (ἐν τούτῳ νίκα / in hoc signo vinces)",
          rationale: "Correct. Eusebius's Life of Constantine 1.28 — recounting what Constantine himself swore under oath.",
        },
        { id: "c", text: "The Star of Bethlehem" },
        { id: "d", text: "A pillar of fire" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source: "Eusebius, Life of Constantine 1.28",
          quote:
            "About the time of the midday sun... he said that he saw with his own eyes the trophy of a cross of light in the heavens, above the sun, and bearing the inscription, 'Conquer by this.'",
        },
      ],
    },
    {
      id: "em-003",
      kind: "debate",
      difficulty: 5,
      tags: ["constantine", "fall-narrative"],
      opponentTradition: "Reformed",
      opponentClaim:
        "The 'pure' apostolic faith ended with Constantine. He politicized Christianity, imposed Greek metaphysics on simple Galilean fishermen, and corrupted the Church into a state religion. The Reformation recovered the lost Apostolic faith.",
      orthodoxRebuttal:
        "Every feature of post-Constantinian Christianity which Reformed apologists call corruption is documented in the pre-Constantinian witness. Hierarchical episcopate: Ignatius (107), 1 Clement (96). Real Presence: Ignatius, Justin, Irenaeus — all pre-Constantinian. Infant baptism: Hippolytus, Origen, Cyprian — pre-Constantinian. Prayer for the dead: Tertullian's De Corona (211), the Roman catacombs second century. Intercession of saints: Martyrdom of Polycarp (155). The veneration of the Theotokos: the prayer 'Sub Tuum Praesidium' (Greek papyrus, ~AD 250). Holy images: catacomb frescoes from the 2nd century onward. The seven mysteries: documented before 313. Sunday observance: Justin Martyr 155. Liturgical fasting: Didache. So the burden of proof falls on the 'Constantinian-fall' thesis to show even one of these as a Constantinian-era novelty — and it cannot. Furthermore, Constantine himself did not legislate doctrine; he convoked councils which exercised their own conciliar authority. Athanasius famously stood AGAINST Constantine's son Constantius II (who became Arian) — 'Athanasius contra mundum.' If the Church had been merely the imperial chaplaincy, this could not happen. The myth of a 'Constantinian fall' was constructed by 16th-century polemicists to license the Reformation's break from the apostolic order. It has no patristic, archaeological, or historical support.",
      rejoinders: [
        {
          objection: "But the Trinity language is post-Nicene Greek metaphysics, not biblical.",
          reply:
            "The Greek term 'trias' is in Theophilus of Antioch in 180. The Logos theology is in John's Gospel. The 'one God in three' is in Matthew 28:19, 2 Corinthians 13:14, and the apostolic baptismal formula. Nicaea did not invent doctrine; it ratified what the Church already confessed against Arius's innovation.",
        },
      ],
      citations: [
        {
          source: "St. Athanasius, History of the Arians 33; cf. Apol. against the Arians",
          quote:
            "If we lose our faith, what is the benefit of being friends with the world? — Athanasius before Constantius II.",
        },
        {
          source: "Sub Tuum Praesidium — Greek papyrus P. Rylands 470 (c. AD 250)",
          quote:
            "Beneath thy compassion, we take refuge, O Theotokos: do not despise our petitions in time of trouble.",
        },
        {
          source: "Tertullian, De Corona 3 (~AD 211)",
          quote:
            "We make oblations for the dead on the anniversary of their birth into eternal life.",
        },
      ],
    },
    {
      id: "em-004",
      kind: "qa",
      difficulty: 3,
      tags: ["nicaea", "council"],
      prompt:
        "What council did Constantine convoke twelve years after the Edict of Milan, and to address what crisis?",
      expectedAnswer:
        "The First Ecumenical Council at Nicaea (AD 325), to address the Arian heresy concerning the divinity of the Son. Three hundred and eighteen Fathers attended. The Council issued the original Symbol of Faith confessing the Son as 'homoousios' (consubstantial) with the Father, and twenty canons including the principle of the dating of Pascha.",
      citations: [
        {
          source: "Eusebius, Life of Constantine III.4–15",
        },
        {
          source: "The Acts of the Council of Nicaea (325) — Symbol of Faith and 20 canons",
        },
      ],
    },
  ],
};
