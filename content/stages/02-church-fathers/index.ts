import type { Stage } from "@/lib/types";
import {
  irenaeus,
  chrysostom,
  symeonNewTheologian,
  cyrilOfAlexandria,
} from "./more-fathers";

export const stage02: Stage = {
  id: "02-church-fathers",
  order: 2,
  title: "The Church Fathers",
  subtitle: "The minds of the Holy Spirit, from Clement to Palamas",
  era: "c. AD 90 – 1359",
  description:
    "Apostolic Fathers, Ante-Nicene, Cappadocian, Latin-received-by-Orthodoxy, the Byzantine mystics, and the hesychast settlement. Identify each Father's see, signature doctrine, principal works, and the heresies he refuted.",
  rank: "Reader",
  topics: [
    {
      id: "cappadocians",
      title: "The Cappadocian Fathers",
      summary:
        "Basil the Great, Gregory the Theologian, and Gregory of Nyssa — the brothers and friend who completed the Trinitarian theology of the 4th century.",
      learningObjectives: [
        "Distinguish ousia from hypostasis in Cappadocian usage.",
        "Quote Basil on the Holy Spirit.",
        "Identify the principal works of each Cappadocian.",
      ],
      primarySources: [
        "St. Basil, On the Holy Spirit; Hexaemeron; Letters",
        "St. Gregory the Theologian, Theological Orations 27–31",
        "St. Gregory of Nyssa, Catechetical Oration; On the Soul and the Resurrection",
      ],
      items: [
        {
          id: "cf-cap-001",
          kind: "identify-source",
          difficulty: 3,
          tags: ["basil", "holy-spirit"],
          prompt:
            "Identify the source: 'Through the Son who is one, the Holy Spirit, who is the bond of unity, is connected with the Father who is one. He completes the all-praised and blessed Trinity.'",
          choices: [
            { id: "a", text: "Athanasius, Letters to Serapion" },
            { id: "b", text: "Basil the Great, On the Holy Spirit 18.45", rationale: "Correct." },
            { id: "c", text: "Gregory of Nyssa, Against Eunomius" },
            { id: "d", text: "Cyril of Alexandria, Thesaurus" },
          ],
          correctChoiceId: "b",
          citations: [
            {
              source: "St. Basil the Great, On the Holy Spirit 18.45 (~AD 375)",
              quote:
                "Through the one Son the one Spirit is bound to the one Father, and through Himself completes the worthy-of-praise and blessed Trinity.",
            },
          ],
        },
        {
          id: "cf-cap-002",
          kind: "qa",
          difficulty: 2,
          tags: ["gregory-theologian", "five-orations"],
          prompt:
            "What are the 'Theological Orations,' and who delivered them — earning him the title 'the Theologian'?",
          expectedAnswer:
            "Five orations (Or. 27–31) delivered by St. Gregory of Nazianzus in 380 at Constantinople. They are the locus classicus for the doctrine of the Trinity, the divinity of the Son and Holy Spirit, and the limits of theological knowledge. Only three Fathers carry the title 'the Theologian' in the Orthodox liturgical tradition: St. John the Evangelist, St. Gregory of Nazianzus, and St. Symeon the New Theologian.",
          citations: [
            { source: "St. Gregory the Theologian, Orations 27–31" },
          ],
        },
        {
          id: "cf-cap-003",
          kind: "mcq",
          difficulty: 4,
          tags: ["cappadocians", "vocabulary"],
          prompt:
            "In Cappadocian usage, what is the precise relation between ousia and hypostasis?",
          choices: [
            { id: "a", text: "They are synonyms." },
            {
              id: "b",
              text: "Ousia is what the Three share (the divine essence/nature); hypostasis is what distinguishes each Person.",
              rationale: "Correct. This terminological settlement made Trinitarian confession precise.",
            },
            { id: "c", text: "Ousia is the manifestation; hypostasis is the hidden reality." },
            { id: "d", text: "Ousia is the Father; hypostasis is the Son." },
          ],
          correctChoiceId: "b",
          citations: [
            { source: "Basil, Letter 38 (To Gregory his Brother)" },
            { source: "Gregory the Theologian, Or. 29.16; Or. 31" },
          ],
        },
      ],
    },
    {
      id: "athanasius",
      title: "St. Athanasius the Great",
      summary:
        "Pope of Alexandria, defender of Nicaea, five times exiled, author of On the Incarnation and the Life of Antony.",
      learningObjectives: [
        "Quote Athanasius on the purpose of the Incarnation.",
        "Trace his five exiles.",
        "Identify the heresies he combated.",
      ],
      primarySources: [
        "St. Athanasius, On the Incarnation",
        "Against the Arians (Orations 1–3)",
        "Life of Antony",
        "Festal Letter 39 (367) — NT canon list",
      ],
      items: [
        {
          id: "cf-ath-001",
          kind: "identify-source",
          difficulty: 2,
          tags: ["athanasius", "theosis"],
          prompt:
            "Identify the source: 'For He was made man that we might be made God.'",
          choices: [
            { id: "a", text: "Irenaeus, Against Heresies V Preface" },
            {
              id: "b",
              text: "Athanasius, On the Incarnation 54.3",
              rationale:
                "Correct. The most famous patristic line on theosis. Irenaeus has an earlier, similar formulation.",
            },
            { id: "c", text: "Maximus the Confessor, Ambigua" },
            { id: "d", text: "Symeon the New Theologian, Hymn 50" },
          ],
          correctChoiceId: "b",
          citations: [
            {
              source: "St. Athanasius, On the Incarnation 54.3 (~AD 318)",
              quote: "Αὐτὸς γὰρ ἐνηνθρώπησεν, ἵνα ἡμεῖς θεοποιηθῶμεν — He became man that we might become god.",
            },
            {
              source: "St. Irenaeus, Against Heresies V Preface",
              quote:
                "The Word of God, Jesus Christ our Lord, did, through His transcendent love, become what we are, that He might bring us to be even what He is Himself.",
            },
          ],
        },
        {
          id: "cf-ath-002",
          kind: "qa",
          difficulty: 4,
          tags: ["athanasius", "canon"],
          prompt:
            "What document by St. Athanasius is the first known list of the twenty-seven books of the New Testament canon precisely as the Church received it?",
          expectedAnswer:
            "His 39th Festal (Paschal) Letter of AD 367, addressed to the Egyptian churches. He also lists the Old Testament books, distinguishing the canonical from those 'read but not in the canon.'",
          citations: [
            { source: "St. Athanasius, Festal Letter 39 (AD 367)" },
          ],
        },
        {
          id: "cf-ath-003",
          kind: "debate",
          difficulty: 5,
          tags: ["arianism", "trinity"],
          opponentTradition: "JW",
          opponentClaim:
            "The Son is the 'firstborn of all creation' (Col 1:15) — a created being, the first and most exalted creature, but not God in the same sense as the Father.",
          orthodoxRebuttal:
            "Prōtotokos in Col 1:15 does not mean 'first created' — the Greek for that would be prōtoktistos, which Paul does not use. In the LXX (Ps 89[88]:27) prōtotokos signifies rank and inheritance: 'And I will make him the firstborn, higher than the kings of the earth.' Paul immediately glosses his meaning in the next breath: 'for in Him were all things created' (Col 1:16) — He is the agent of creation, not a creature within it. To call the Maker of all things a creature is to make Him both creator and creature of Himself, which is incoherent. Athanasius, with the full force of the Greek: 'When did the Father create His own Wisdom? Was there a time when God was without His Word? Was there ever a moment when the Father lacked His own Image? To say so is blasphemy' (Orations Against the Arians I.20–25). The Council of Nicaea (325) defined precisely this: the Son is 'true God of true God, begotten not made, of one essence with the Father.'",
          rejoinders: [
            {
              objection:
                "John 1:1 in the NWT reads 'the Word was a god' (indefinite). Why is that wrong?",
              reply:
                "Greek has no indefinite article. Colwell's rule and Greek grammar normally treat a definite-predicate noun preceding the verb without article as definite or qualitative — the Word is God in essence. Furthermore, every Greek-Christian writer for the first 1,800 years before the Watchtower's NWT (1950) read it as 'the Word was God.' Origen, Chrysostom, Augustine, Aquinas, and Calvin all agree on this point against the JW reading.",
            },
            {
              objection:
                "Jesus says 'the Father is greater than I' (John 14:28). Doesn't that prove subordination of essence?",
              reply:
                "The greatness referred to is according to the Incarnate state (kata anthrōpinon), not the divine essence. Athanasius: 'The Word was God; but He became flesh, and so He says, the Father is greater than I — speaking of His human nature, in which He came under the divine economy' (Or. Against Arians I.58).",
            },
          ],
          citations: [
            {
              source: "St. Athanasius, Orations Against the Arians I.20",
              quote:
                "It is not lawful to say of God, 'there was a time when He was not'; for the Father is, and was, and ever shall be: and so likewise the Son, His own Word, is and was and ever shall be.",
            },
            {
              source: "Symbol of Faith of Nicaea (325)",
              quote:
                "We believe... in one Lord Jesus Christ, the Son of God, only-begotten of the Father, that is, of the essence of the Father, God of God, Light of Light, true God of true God, begotten not made, of one essence (homoousios) with the Father.",
            },
            { source: "Colossians 1:15–17; John 1:1–3; Hebrews 1:1–12" },
          ],
        },
      ],
    },
    {
      id: "john-of-damascus",
      title: "St. John of Damascus",
      summary:
        "Last of the Greek Fathers in the patristic chronology; systematic theologian and defender of icons under Muslim rule.",
      learningObjectives: [
        "Identify the parts of John's An Exact Exposition of the Orthodox Faith.",
        "Quote his defense of icons.",
        "Locate him in time and political setting (Umayyad Caliphate).",
      ],
      primarySources: [
        "An Exact Exposition of the Orthodox Faith (De Fide Orthodoxa)",
        "Three Treatises on the Divine Images",
        "Fountain of Knowledge (Pege Gnoseos)",
      ],
      items: [
        {
          id: "cf-jd-001",
          kind: "identify-source",
          difficulty: 3,
          tags: ["icons", "incarnation"],
          prompt:
            "Identify the source: 'I do not worship matter; I worship the Creator of matter who became matter for my sake, and deigned to inhabit matter, who worked out my salvation through matter.'",
          choices: [
            { id: "a", text: "Theodore the Studite, Antirrhetics" },
            {
              id: "b",
              text: "John of Damascus, On the Divine Images I.16",
              rationale: "Correct. The classic patristic answer to iconoclasm.",
            },
            { id: "c", text: "Nicephorus of Constantinople" },
            { id: "d", text: "Germanus of Constantinople" },
          ],
          correctChoiceId: "b",
          citations: [
            {
              source: "St. John of Damascus, On the Divine Images I.16 (~AD 730)",
              quote:
                "I do not worship matter; I worship the Creator of matter, who became matter for my sake, and deigned to inhabit matter, who worked out my salvation through matter.",
            },
          ],
        },
      ],
    },
    {
      id: "maximus",
      title: "St. Maximus the Confessor",
      summary:
        "Defender of the two wills of Christ against monothelitism — tongue cut out, right hand cut off, died in exile, vindicated at Constantinople III (681).",
      learningObjectives: [
        "Explain the doctrine of two wills (dyothelitism).",
        "Identify Maximus's principal works.",
        "Connect his theology to the cosmic recapitulation in Christ.",
      ],
      primarySources: [
        "Ambigua",
        "Disputation with Pyrrhus",
        "Mystagogy",
        "Chapters on Love",
      ],
      items: [
        {
          id: "cf-max-001",
          kind: "qa",
          difficulty: 4,
          tags: ["maximus", "two-wills"],
          prompt:
            "What heresy did St. Maximus the Confessor combat, and what was the cost of his confession?",
          expectedAnswer:
            "He combated monothelitism — the heresy that Christ has only one will, the divine. Maximus defended that the two natures of Christ each must have its own will and operation, lest Christ's humanity be incomplete. For refusing to subscribe to monothelite imperial policy under Constans II, he was tortured: his tongue was cut out and his right hand cut off, and he was exiled to the Caucasus, where he died in 662. He was vindicated nineteen years later at Constantinople III (680–681).",
          citations: [
            { source: "St. Maximus the Confessor, Disputation with Pyrrhus" },
            { source: "Acts of the Sixth Ecumenical Council (681)" },
          ],
        },
      ],
    },
    {
      id: "palamas",
      title: "St. Gregory Palamas",
      summary:
        "Archbishop of Thessalonica, defender of hesychasm, who articulated the distinction between God's unknowable essence and His participable, deifying energies.",
      learningObjectives: [
        "State the essence/energies distinction.",
        "Name the opponent and the councils that vindicated Palamas.",
        "Quote a Palamite saying on theosis.",
      ],
      primarySources: [
        "Triads in Defense of the Holy Hesychasts",
        "One Hundred and Fifty Chapters",
        "Homilies",
      ],
      items: [
        {
          id: "cf-pal-001",
          kind: "mcq",
          difficulty: 4,
          tags: ["palamas", "energies"],
          prompt:
            "Which councils of Constantinople (1341, 1347, 1351) vindicated St. Gregory Palamas's distinction between divine essence and divine energies?",
          choices: [
            { id: "a", text: "The Hesychast Councils", rationale: "Correct. Received in the East as carrying ecumenical weight." },
            { id: "b", text: "The Photian Councils" },
            { id: "c", text: "The Sixth Ecumenical Council" },
            { id: "d", text: "The Council of Florence" },
          ],
          correctChoiceId: "a",
          citations: [
            { source: "Synodal Tome of 1351 (Constantinople), affirming the Palamite distinction" },
          ],
        },
        {
          id: "cf-pal-002",
          kind: "debate",
          difficulty: 5,
          tags: ["palamas", "rcc", "grace"],
          opponentTradition: "RCC",
          opponentClaim:
            "Palamas's distinction between essence and energies is incoherent — it splits the simplicity of God. Created grace, as Aquinas teaches, is sufficient to explain sanctification without dividing the divine essence.",
          orthodoxRebuttal:
            "The distinction does not split simplicity; it preserves both God's transcendence (the essence, which no creature may know or share) and His real, deifying communion with us (the energies, which are God Himself, uncreated, given to the saints). This distinction is already present in Basil's letters (Ep. 234 to Amphilochius) and Cyril of Alexandria. Palamas only systematized it against Barlaam's critique of hesychasm. The alternative — created grace — makes salvation participation in something OTHER than God, which is precisely not theosis but moral elevation. 2 Peter 1:4 says we become 'partakers of the divine nature' (theias koinonoi physeos) — not partakers of a created substitute. The energies are how God Himself is the gift. The Hesychast councils (1341, 1347, 1351) dogmatized this; their decisions stand in the Synodikon of Orthodoxy, read every First Sunday of Lent.",
          rejoinders: [
            {
              objection: "But the divine simplicity is foundational doctrine.",
              reply:
                "Simplicity in the Orthodox tradition means God is not composed of parts, not that no real distinctions can be confessed in Him. The Trinity itself requires real distinctions (the hypostases). The essence/energies distinction is also real but not a composition: the energies are the essence in its outward, gracious motion. See Lossky's Mystical Theology of the Eastern Church, chapter 4.",
            },
          ],
          citations: [
            {
              source: "St. Basil the Great, Letter 234.1 (To Amphilochius)",
              quote:
                "We know our God from His energies; but we do not promise that we can approach the essence itself. For His energies descend to us, but His essence remains inaccessible.",
            },
            {
              source: "St. Gregory Palamas, One Hundred and Fifty Chapters, 75",
              quote:
                "The deifying gift is not a creature; it is uncreated, the very energy of God.",
            },
            { source: "Synodal Tome of 1351 — dogmatic affirmation" },
            { source: "2 Peter 1:4 — partakers of the divine nature" },
          ],
        },
      ],
    },
    irenaeus,
    chrysostom,
    cyrilOfAlexandria,
    symeonNewTheologian,
  ],
};
