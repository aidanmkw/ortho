import type { Stage } from "@/lib/types";
import {
  christology,
  mariology,
  anthropology,
} from "./more-foundations";
import {
  pneumatology,
  energiesEssence,
  fall,
  baptismFoundation,
  dyothelitism,
} from "./bulk-foundations";
import {
  communionSaints,
  eucharistFoundation,
  marriage,
  ordination,
  unction,
} from "./more-foundations-2";

export const stage03: Stage = {
  id: "03-foundational-teaching",
  order: 3,
  title: "Foundational Teaching",
  subtitle: "Trinity, Incarnation, Salvation, Sacraments",
  description:
    "The core dogmas of Orthodoxy: Holy Trinity, hypostatic union, theosis as the telos of salvation, the seven mysteries, and Mariology. Each doctrine drilled with patristic warrant.",
  rank: "Subdeacon",
  topics: [
    {
      id: "trinity",
      title: "The Holy Trinity",
      summary:
        "One God in three Hypostases — Father, Son, and Holy Spirit — of one essence and undivided, distinguished by the Father's monarchy, the Son's eternal generation, and the Spirit's eternal procession.",
      learningObjectives: [
        "Recite the Niceno-Constantinopolitan Symbol from memory.",
        "Distinguish ousia, hypostasis, and prosopon.",
        "Locate the monarchy of the Father in the Cappadocian tradition.",
      ],
      primarySources: [
        "Symbol of Faith (Niceno-Constantinopolitan, 381)",
        "St. Gregory the Theologian, Theological Orations",
        "St. John of Damascus, Exact Exposition I",
      ],
      items: [
        {
          id: "ft-tri-001",
          kind: "qa",
          difficulty: 2,
          tags: ["creed"],
          prompt:
            "What is the Orthodox confession concerning the procession of the Holy Spirit, and from which Scripture is it drawn?",
          expectedAnswer:
            "The Holy Spirit proceeds from the Father — and only from the Father. The Lord Himself says, 'When the Comforter is come, whom I will send unto you from the Father, even the Spirit of truth, who proceedeth from the Father, He shall testify of me.' (John 15:26). The Symbol of Faith repeats: 'And in the Holy Spirit, the Lord, the Giver of Life, who proceedeth from the Father.'",
          citations: [
            { source: "John 15:26", scripture: "John 15:26" },
            {
              source: "Niceno-Constantinopolitan Symbol (381) — 8th article",
              quote:
                "And in the Holy Spirit, the Lord, the Giver of Life, who proceedeth from the Father, who with the Father and the Son together is worshipped and glorified, who spake by the prophets.",
            },
          ],
        },
        {
          id: "ft-tri-002",
          kind: "debate",
          difficulty: 5,
          tags: ["filioque"],
          opponentTradition: "RCC",
          opponentClaim:
            "The Spirit proceeds from the Father AND the Son (Filioque). This is taught by St. Augustine and was accepted in the West for over a millennium before the schism.",
          orthodoxRebuttal:
            "Three objections: (1) Conciliarly: the Symbol of Faith was promulgated by Constantinople I (381) in its final form. The Third Ecumenical Council (Ephesus, 431) forbade any addition under penalty of deposition (canon 7). The unilateral Western addition therefore violates ecumenical conciliarity. (2) Scripturally: the Lord says the Spirit 'proceedeth (ekporeuetai) from the Father' (Jn 15:26) — never 'and from the Son.' Patristic distinction: ekporeusis (eternal hypostatic procession, of the Father alone) is different from temporal mission or sending (pempsis), which is from the Father through the Son. (3) Theologically: Filioque blurs the monarchy of the Father. The Father is the sole arche, the principle of unity. Two principles in God collapses into either subordinationism (the Spirit becomes secondary) or dyarchy. St. Photios in the Mystagogy of the Holy Spirit, and St. Mark of Ephesus at Florence (1438–39), exhaustively answered this. The Council of Florence agreement was repudiated by the Orthodox laity upon Mark's return; Mark alone refused to sign, and his refusal was the rejection of all the East.",
          rejoinders: [
            {
              objection: "But Augustine taught Filioque, and he is a Father.",
              reply:
                "Augustine's De Trinitate IV–V develops a model in which the Spirit proceeds 'principaliter' from the Father, but also from the Son. Even Augustine qualifies. The East received Augustine on grace and sin with reservation precisely because his Trinitarian model differed from the Greek Fathers and was made dogmatic in the West only later. A local Father's view, even a great one, does not bind the Church against conciliar definitions.",
            },
            {
              objection:
                "Lyon (1274) and Florence (1439) are also ecumenical councils. They affirm Filioque.",
              reply:
                "From the Orthodox standpoint, neither is ecumenical. They were not received by the Orthodox laity and bishops — and reception by the whole Church is the criterion. St. Mark of Ephesus refused to sign Florence; on his return the Greek bishops who had signed publicly repudiated their signatures. A council without reception is not ecumenical.",
            },
          ],
          citations: [
            { source: "John 15:26 — ekporeuetai para tou Patros" },
            { source: "Ephesus 431, canon 7 — prohibition of additions to the Creed" },
            { source: "St. Photios, Mystagogy of the Holy Spirit" },
            { source: "St. Mark of Ephesus, Against the Latins; speech at Florence (1439)" },
            {
              source: "Synodal Letter of the Eastern Patriarchs (1848)",
              quote:
                "The single article concerning the procession of the Holy Spirit is the most pernicious, perilous and detestable of the [Latin] errors.",
            },
          ],
        },
      ],
    },
    {
      id: "soteriology",
      title: "Salvation as Theosis",
      summary:
        "Salvation is participation in the uncreated life of God — recapitulation in Christ, Christus Victor over death, and the deification of the whole human person, body and soul.",
      learningObjectives: [
        "State the four classical models of atonement and the Orthodox emphasis.",
        "Quote 2 Peter 1:4 and patristic glosses upon it.",
        "Contrast theosis with the Western juridical / penal substitution paradigm.",
      ],
      primarySources: [
        "St. Athanasius, On the Incarnation",
        "St. Irenaeus, Against Heresies V Preface; III–IV",
        "St. Maximus the Confessor, Ambigua 41",
        "2 Peter 1:4",
      ],
      items: [
        {
          id: "ft-sot-001",
          kind: "qa",
          difficulty: 3,
          tags: ["theosis"],
          prompt:
            "What is the Orthodox doctrine of theosis (deification), and which Scripture verses are foundational to it?",
          expectedAnswer:
            "Theosis is the dynamic, lifelong participation of the human person in the uncreated energies of God — to become 'partakers of the divine nature' (2 Pet 1:4) by grace, not by nature. We become by grace what God is by nature. Foundational verses: 2 Pet 1:4; John 17:21–23 ('that they all may be one... as we are one'); 1 John 3:2 ('we shall be like Him, for we shall see Him as He is'); Ps 82:6 (LXX 81:6) / John 10:34 ('I said, ye are gods').",
          citations: [
            { source: "2 Peter 1:4" },
            { source: "Athanasius, On the Incarnation 54.3" },
            { source: "Gregory the Theologian, Oration 30.21" },
            { source: "Maximus the Confessor, Ambigua 41" },
          ],
        },
        {
          id: "ft-sot-002",
          kind: "debate",
          difficulty: 5,
          tags: ["atonement", "reformed", "penal-substitution"],
          opponentTradition: "Reformed",
          opponentClaim:
            "Christ died as the legal substitute, bearing the Father's wrath against sinners. Penal substitutionary atonement is the heart of the Gospel — without it, the Cross has no meaning.",
          orthodoxRebuttal:
            "The Cross is the center of the Gospel; the question is the interpretive frame. The Fathers offer several converging images: ransom (Mk 10:45; Athanasius), recapitulation (Eph 1:10; Irenaeus AH V), Christus Victor (Col 2:15; Athanasius De Incarn. 25), sacrifice (Heb 9–10), and theosis (Athanasius). What they universally do NOT teach is that the Father pours out punitive wrath on the Son to legally satisfy His own justice. Anselm's Cur Deus Homo (1098) reframed the Cross in feudal-juridical categories; Calvin made it penal. But Athanasius: 'It was not meet that, while the law fixed the destruction of human nature, our Lord should remain in death' — the Cross saves us from death and corruption, not from the Father. Gregory the Theologian (Or. 45.22) explicitly argues that the ransom was NOT paid to the Father: 'To whom was that blood offered that was shed for us, and why was it shed? Not to the evil one — fie upon that! And if to the Father, I ask, how? For it was not by Him that we were being oppressed... But it is evident that the Father accepts Him, but neither asked for Him nor demanded Him.' The Orthodox frame: God the Father is not against us; the Son does not save us from the Father; the Cross is the Father's self-gift, in the Son, by the Spirit, for the salvation of the world.",
          rejoinders: [
            {
              objection:
                "But Isaiah 53 says God 'laid on Him the iniquity of us all' — that IS penal substitution.",
              reply:
                "Isaiah 53 is read by the Fathers (Cyril of Alex., Chrysostom) as substitutionary in the sense that He bears the consequences of our sin (death, suffering, separation) — not as the Father's punitive wrath. He suffers AT the hands of sinners, and FOR them, not from the hands of the Father.",
            },
            {
              objection: "Without penal substitution, what does the Cross actually accomplish?",
              reply:
                "It defeats death and the devil (Heb 2:14–15; Col 2:15); ransoms us from bondage (Mk 10:45); reconciles us to God by union with His own humanity (2 Cor 5:18–19); and unites our human nature, in His Person, to God so that we may share in the divine life. The Cross saves us not from God but for God.",
            },
          ],
          citations: [
            {
              source: "St. Gregory the Theologian, Oration 45.22 (On Holy Pascha)",
              quote:
                "The Father accepts [the sacrifice], but neither asked for it nor demanded it; but on account of the Incarnation, and because humanity must be sanctified by the humanity of God.",
            },
            {
              source: "St. Athanasius, On the Incarnation 25",
              quote:
                "The death of all was accomplished in the Lord's body, and also death and corruption were utterly destroyed because of the indwelling Word.",
            },
            { source: "Hebrews 2:14–15; Colossians 2:15; 2 Cor 5:18–19" },
          ],
        },
      ],
    },
    christology,
    mariology,
    anthropology,
    pneumatology,
    energiesEssence,
    fall,
    baptismFoundation,
    dyothelitism,
    communionSaints,
    eucharistFoundation,
    marriage,
    ordination,
    unction,
  ],
};
