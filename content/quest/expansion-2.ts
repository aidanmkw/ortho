import type { Chapter } from "@/lib/quest/types";

// ===========================================================================
// EXPANSION CHAPTERS 2 — filling the gaps in centuries 6–11.
//
// These chapters match the Chapter type in lib/quest/types.ts exactly and use
// only existing backgrounds, portrait ids, and item ids. `number` fields are
// placeholders (201+) for re-numbering on integration.
//
// Authored attacks are intentionally short (1–2 each); the battle engine
// auto-augments every boss with live spaced-repetition questions from the
// study corpus.
//
// Portrait notes: figures without a dedicated portrait id (Justinian, the
// Origenist deacon, Symeon the New Theologian, Stephen of Nicomedia) use
// "narrator" / "st-anthony" / "you" as dialogue speakers, or a villain sprite
// that renders the closest available art (tempter, arius, iconoclast, humbert).
// St. John of Damascus has a dedicated portrait id (st-john-damascus).
// ===========================================================================

export const EXPANSION_CHAPTERS_2: Chapter[] = [
  // =========================================================================
  // CHAPTER 201 — THE FIFTH ECUMENICAL COUNCIL (AD 553, Constantinople)
  // 6th century. Justinian; the Three Chapters and Origenism condemned;
  // the symphony of Church and empire; Hagia Sophia as "heaven on earth."
  // =========================================================================
  {
    id: "ch201-constantinople-ii",
    number: 201,
    era: "AD 553",
    location: "Fifth Ecumenical Council, Constantinople",
    title: "Solomon, I Have Outdone Thee",
    background: "hagia-sophia",
    ally: "st-anthony",
    intro: [
      {
        speaker: "narrator",
        text: "Constantinople, under the great dome that Justinian raised. Sixteen years ago, walking into the finished Hagia Sophia, the emperor cried, 'Solomon, I have outdone thee!' Beneath that vault of gold, one hundred and sixty-five bishops now gather for the Fifth Ecumenical Council.",
      },
      {
        speaker: "st-anthony",
        text: "A century has passed since Chalcedon, $you. The Empire is torn: those who reject Chalcedon say it smells of Nestorius. To win them back, Justinian condemns the 'Three Chapters' — the person and writings of Theodore of Mopsuestia, Theodoret's words against Cyril, and the letter of Ibas to Maris — for they did breathe a Nestorian air.",
      },
      {
        speaker: "narrator",
        text: "The bishops also turn against a subtler poison. Among the monks of Palestine the speculations of Origen have bred again: that souls pre-existed their bodies, that even the demons shall at last be saved and all things restored as they were. The Council readies fifteen anathemas against it.",
      },
      {
        speaker: "st-anthony",
        text: "Mark the two dangers, $you. One man's writings flatter heresy; another man's brilliance soars past what was revealed and falls into fable. The Church holds the narrow road: she condemns the error but does not despise the mind. Justinian governs as Christian emperor — Church and empire in symphony, two gifts of the one God.",
      },
      {
        speaker: "narrator",
        text: "From a side aisle a learned deacon comes toward you, an admirer of Origen, his eyes bright with grand and limitless hopes for the cosmos. He thinks the bishops small-minded for fencing in the love of God.",
      },
      {
        speaker: "tempter",
        text: "So the synod would chain the boundless God to its little rules. Origen saw further than these bishops dare: every soul was once a pure mind, and in the end ALL shall be saved — the devil himself restored. Is God's mercy not infinite? Refute me, if you would shrink heaven to fit your fears.",
      },
    ],
    boss: {
      id: "boss-origenist-deacon",
      name: "The Origenist Deacon",
      title: "Speculator of the Endless Restoration",
      tradition: "Origenism",
      sprite: "tempter",
      maxHp: 230,
      intro:
        "Souls fell from a higher world into bodies; this life is their punishment and their school. And in the apokatastasis ALL shall return — every soul, every demon. Who are you to set a limit on the mercy of God?",
      midline:
        "You quote the bishops at me. But is it not a meaner God who lets even one soul be lost forever?",
      outro:
        "Anathema, then, upon the pre-existence of souls... upon the restoration of the demons... I had loved my own speculations more than the faith once delivered.",
      victoryEpigraph: {
        text:
          "If anyone asserts the fabulous pre-existence of souls, and shall assert the monstrous restoration which follows from it, let him be anathema.",
        source: "Anathemas against the Origenists, Fifth Ecumenical Council (553)",
      },
      attacks: [
        {
          claim:
            "Souls existed as pure minds before the world; weary of contemplating God, they cooled and fell into bodies. This life is exile. Is this not a nobler picture than your dull doctrine of creation?",
          options: [
            {
              text: "No — God creates each person, body and soul together, and calls it very good (Gen 1). The body is no prison; it is part of what God made and what Christ assumed and will raise. Souls did not pre-exist their bodies.",
              correct: true,
              rationale:
                "The Council's first anathema rejects the pre-existence of souls. Orthodox anthropology holds the human person as a unity of soul and body, created good, not a fallen mind imprisoned in flesh.",
            },
            {
              text: "You are right; the soul is a heavenly mind exiled in matter.",
              correct: false,
              rationale:
                "This Origenist (and Platonist) error was anathematized in 553. It denigrates the body, which God made good and Christ took up to save.",
            },
            {
              text: "The body is evil and only the soul is truly real.",
              correct: false,
              rationale:
                "A Gnostic/Manichaean error. Creation is good (Gen 1:31); the flesh is sanctified and will rise (1 Cor 15).",
            },
            {
              text: "Souls are mortal and perish with the body.",
              correct: false,
              rationale:
                "The opposite error. The soul is immortal, and the body too shall be raised at the last day (John 5:28–29).",
            },
          ],
          difficulty: 4,
          taunt: "The soul remembers a higher home!",
        },
        {
          claim:
            "In the end God shall be all in all — so even the devil and the damned must one day be saved, and hell emptied. This 'restoration of all things' is the truest mercy. Deny it and you make God cruel.",
          options: [
            {
              text: "Christ Himself warns of eternal punishment and a fire prepared for the devil and his angels (Matt 25:41, 46). God forces no one; love that cannot be refused is not love. The 'restoration of the demons' the Council anathematized.",
              correct: true,
              rationale:
                "The Council condemned the apokatastasis as taught by the Origenists — the doctrine that punishment ends and even demons are saved. Christ speaks of eternal punishment (Matt 25:46); God respects the freedom He gave.",
            },
            {
              text: "You are right; hell is temporary and all, even Satan, will be restored.",
              correct: false,
              rationale:
                "Precisely the universalist apokatastasis condemned in 553. Scripture speaks of punishment that is eternal (Matt 25:46; Mark 9:48).",
            },
            {
              text: "God simply annihilates the wicked, so none suffer at all.",
              correct: false,
              rationale:
                "Annihilationism is not the Church's teaching; the Lord speaks of an enduring state, not a ceasing to exist (Matt 25:46).",
            },
            {
              text: "God delights to damn most of mankind by sheer decree.",
              correct: false,
              rationale:
                "A later double-predestinarian error, equally false. 'God our Saviour will have all men to be saved' (1 Tim 2:4); the lost refuse Him, He does not refuse them.",
            },
          ],
          difficulty: 5,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "The Council condemned the Three Chapters and the errors of Origen, confessing afresh the one Christ of Nicaea, Constantinople, Ephesus, and Chalcedon. Under Hagia Sophia's great dome the bishops sealed the Fifth of the holy and Ecumenical Councils.",
      },
      {
        speaker: "st-anthony",
        text: "The Church reveres learning, $you, but bows to the Tradition handed down — she will not trade the Gospel for a beautiful guess. Justinian's law and worship would shape the world for a thousand years. Come; eastward now, to a monk in a desert cave who will save the icons under the sword of Islam.",
      },
    ],
    reward: { xp: 1, item: "synodikon", healHp: true },
  },

  // =========================================================================
  // CHAPTER 202 — ST. JOHN OF DAMASCUS & THE DEFENSE OF THE ICONS (c. AD 730)
  // 8th century. On the Divine Images, written from Mar Saba, beyond the reach
  // of the iconoclast emperor Leo III.
  // =========================================================================
  {
    id: "ch202-john-damascus",
    number: 202,
    era: "c. AD 730",
    location: "The Great Lavra of Mar Saba, the Judean wilderness",
    title: "The God of Matter",
    background: "desert",
    ally: "st-john-damascus",
    intro: [
      {
        speaker: "narrator",
        text: "The Judean desert. Cells cling to a cliff above a dry ravine — the Lavra of Mar Saba. Here, beyond the reach of the emperor in Constantinople, a former courtier of the Caliph writes by lamplight. In the capital, the Emperor Leo III has ordered the icons torn down and burned.",
      },
      {
        speaker: "st-john-damascus",
        text: "I am John, once treasurer to the Caliph in Damascus, now least of the monks of this Lavra. Word has come: Leo names the holy images idols and casts them into the fire. He thinks no edict of his can reach a monk in the lands of the Saracens — and so, by God's mercy, my pen is free.",
      },
      {
        speaker: "st-anthony",
        text: "Mark the irony, $you: under a Christian emperor the icons burn, while under the Muslim Caliph this monk may defend them freely. John writes three treatises, On the Divine Images, that will arm the whole Church. The iconoclasts cry 'Thou shalt not make graven images.' Help him answer.",
      },
      {
        speaker: "st-john-damascus",
        text: "Hear the heart of it: I do not worship matter, but I worship the God of matter, who became matter for my sake, and through matter worked my salvation. The Old Law forbade images because none had seen God. But now God has been seen — He took flesh. Shall I not draw what my eyes could have beheld?",
      },
      {
        speaker: "narrator",
        text: "An agent of the iconoclast court has tracked the writings to their source. He stands at the mouth of the cave, the Emperor's edict in his hand, certain that the second commandment forbids every image and that this monk is leading the faithful into idolatry.",
      },
      {
        speaker: "iconoclast",
        text: "Monk of the desert! The Emperor Leo, by God's authority, has condemned your painted idols. 'Thou shalt not make a graven image' — Scripture itself damns you. You bow to boards and pigment and call it piety. Defend your idolatry, if the wilderness has not addled your wits.",
      },
    ],
    boss: {
      id: "boss-iconoclast-edict",
      name: "The Iconoclast Edict",
      title: "Decree of Leo the Isaurian",
      tradition: "Iconoclasm",
      sprite: "iconoclast",
      maxHp: 235,
      intro:
        "'Thou shalt make no graven image.' The Law is plain. Your icons are idols, your veneration is worship stolen from God. The Emperor commands them burned. Submit.",
      midline:
        "You distinguish 'worship' from 'honor'? A monk's hair-splitting. Yet... the argument from the Incarnation troubles me.",
      outro:
        "The Incarnation changes all... God has been seen, and what is seen may be drawn. I had made the invisible God an excuse to deny that He became visible.",
      victoryEpigraph: {
        text:
          "I do not worship matter; I worship the God of matter, who became matter for my sake, and deigned to dwell in matter, who worked out my salvation through matter.",
        source: "St. John of Damascus, On the Divine Images I.16 (c. 730)",
      },
      attacks: [
        {
          claim:
            "'Thou shalt not make unto thee any graven image' (Exodus 20:4). The command is absolute. Every icon is a broken commandment. How do you escape the plain word of God?",
          options: [
            {
              text: "That law forbade images of the unseen God among a people prone to idolatry — 'you saw no form' (Deut 4:15). But now the Word has become flesh and been seen; we depict not the invisible Godhead but Christ as He truly appeared.",
              correct: true,
              rationale:
                "John of Damascus: the Old Testament ban guarded against idolatry when God had not been seen (Deut 4:15). The Incarnation changes everything — the invisible God became visible and so can be depicted in His humanity.",
            },
            {
              text: "You are right; all sacred images are forbidden idolatry.",
              correct: false,
              rationale:
                "This is iconoclasm, condemned at the Seventh Ecumenical Council (787). The same God who forbade images of the unseen also commanded the cherubim of the Ark (Exodus 25:18).",
            },
            {
              text: "The commandment is abolished and means nothing now.",
              correct: false,
              rationale:
                "Not abolished — fulfilled and rightly understood. It still forbids idolatry; it never forbade honoring the image of the incarnate Christ.",
            },
            {
              text: "We may make images but must never honor them in any way.",
              correct: false,
              rationale:
                "Scripture itself shows honor paid before sacred objects (the Ark, Ps 99:5, 'worship at His footstool'). Honor passes to the prototype, as John taught.",
            },
          ],
          difficulty: 4,
          taunt: "Graven images! The Law condemns you!",
        },
        {
          claim:
            "Even granting an image of Christ, you bow before it, kiss it, burn lamps to it. That is worship — latria — and worship belongs to God alone. You are idolaters by your own actions.",
          options: [
            {
              text: "We give icons honor (proskynesis), not the worship (latria) due to God alone; and the honor passes to the one depicted, not to the wood and paint. We venerate matter only because God Himself became matter to save us.",
              correct: true,
              rationale:
                "John's key distinction (later affirmed at Nicaea II, 787): latria (worship) for God alone; proskynesis (honor/veneration) for the saints and icons. 'The honor paid to the image passes to the prototype' (St. Basil).",
            },
            {
              text: "Yes, we render full worship to the icon itself.",
              correct: false,
              rationale:
                "That would be idolatry. The Church renders worship to God alone; icons receive relative honor that ascends to the prototype.",
            },
            {
              text: "The wood and paint themselves are holy and powerful.",
              correct: false,
              rationale:
                "We do not worship the material. Any grace is God's, and the honor is for the person depicted, not the substance.",
            },
            {
              text: "There is no difference between honor and worship at all.",
              correct: false,
              rationale:
                "There is a real difference, in word and in heart. We honor parents, kings, and saints; we worship God alone (cf. the distinct loyalties Scripture commands).",
            },
          ],
          difficulty: 5,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "John's treatises spread through the Church and could not be unwritten. The struggle would rage for a century, but at the Seventh Ecumenical Council in 787 the icons were restored, and finally in 843 the 'Triumph of Orthodoxy' sealed the victory. John of Damascus the Church names a Doctor and a defender of the holy images.",
      },
      {
        speaker: "st-john-damascus",
        text: "Because the Word became flesh, $you, the unseen has been seen, and what is seen may be honored. The icon preaches the Incarnation in silence. Now go forward — to the great city, where in time a humble monk will testify that God may be not only painted, but seen with living eyes.",
      },
    ],
    reward: { xp: 1, item: "icon-christ", healHp: true },
  },

  // =========================================================================
  // CHAPTER 203 — ST. SYMEON THE NEW THEOLOGIAN (c. AD 1000, Constantinople)
  // 11th century. The conscious experience of the Holy Spirit and the vision
  // of the divine light, against a merely formal religion; Stephen of Nicomedia.
  // =========================================================================
  {
    id: "ch203-symeon",
    number: 203,
    era: "c. AD 1000",
    location: "The Monastery of St. Mamas, Constantinople",
    title: "The Light That Is God",
    background: "hagia-sophia",
    ally: "st-anthony",
    intro: [
      {
        speaker: "narrator",
        text: "Constantinople. In a small monastery in the city, an abbot teaches his monks that the Holy Spirit is not a distant rumor but a fire to be known and felt — that a Christian may, even now, behold the uncreated light of God. The learned men of the patriarch's court find this scandalous.",
      },
      {
        speaker: "st-anthony",
        text: "Symeon, $you — they will call him the New Theologian, only the third in the Church's memory granted that name, after John the Evangelist and Gregory. As a young man he saw a great light surround him, and knew it for the glory of God. He insists the faith must be tasted, not merely recited.",
      },
      {
        speaker: "narrator",
        text: "Symeon turns from his monks. 'Do not say it is impossible to receive the Spirit of God,' he tells you. 'Do not say one can be saved without Him. Do not say a man can possess Him without knowing it. For God is light, and those whom He makes worthy see Him as light; they receive the light consciously, in tears and great joy.'",
      },
      {
        speaker: "st-anthony",
        text: "The court theologians say religion is enough kept outwardly — the rites, the rules, the right words. They distrust this talk of seeing God; they say it smacks of pride, that grace works unfelt. Their leader is Stephen, once archbishop of Nicomedia, the sharpest mind of the court. Stand with Symeon, $you.",
      },
      {
        speaker: "humbert",
        text: "Abbot of Mamas! The whole city rings with your strange claims. You say men SEE God, FEEL the Spirit like a flame? Where did you study? Who were your teachers? Theology belongs to trained minds and settled forms, not to your visions and tears. Defend this enthusiasm — if you can reason at all.",
      },
    ],
    boss: {
      id: "boss-court-theologian",
      name: "Stephen of Nicomedia",
      title: "Theologian of the Court",
      tradition: "Formalist Rationalism",
      sprite: "humbert",
      maxHp: 235,
      intro:
        "Grace works in the soul unseen and unfelt. To claim you SEE the light of God is pride and delusion. Keep the forms, say the prayers, trust the Church's order — and leave 'experience' to fanatics.",
      midline:
        "You answer me from the Scriptures and the Fathers, not from raw feeling? Hm. Perhaps this monk is no mere enthusiast.",
      outro:
        "The Fathers themselves saw the light... Moses' shining face, Tabor's glory, Stephen's vision of heaven. I had reduced the living God to a doctrine on a page.",
      victoryEpigraph: {
        text:
          "Do not say that it is impossible to receive the Spirit of God. Do not say that it is possible to be saved without Him. Do not say that one can possess Him without knowing it.",
        source: "St. Symeon the New Theologian, Hymns of Divine Love",
      },
      attacks: [
        {
          claim:
            "Grace is given silently in the sacraments and works in secret; no one perceives it. To claim you consciously FEEL the Holy Spirit is delusion and spiritual pride. Be content with the forms.",
          options: [
            {
              text: "The Spirit is given truly, to be known — 'the Spirit Himself beareth witness with our spirit' (Rom 8:16). Sacramental grace is real, but it is meant to bear conscious fruit: the saints knew the One they had received.",
              correct: true,
              rationale:
                "Symeon's central teaching: it is possible, even necessary, to know the Spirit one has received. Scripture testifies to a conscious witness of the Spirit (Rom 8:16; 1 John 4:13), against a merely formal or unconscious grace.",
            },
            {
              text: "You are right; grace is always unfelt and unknown.",
              correct: false,
              rationale:
                "This is the formalism Symeon opposed. The Spirit bears witness with our spirit (Rom 8:16); the saints were not ignorant of the grace at work in them.",
            },
            {
              text: "We are saved by our feelings, and the sacraments are useless.",
              correct: false,
              rationale:
                "The opposite error. Symeon honored the sacraments and the Church's order; he insisted only that grace is meant to be known, not that it bypasses the mysteries.",
            },
            {
              text: "Only great mystics receive the Spirit; ordinary Christians cannot.",
              correct: false,
              rationale:
                "Symeon taught that the Spirit is offered to every believer; the call to know God is for all, not an elite (cf. 'Do not say it is impossible to receive the Spirit').",
            },
          ],
          difficulty: 4,
          taunt: "Visions and tears! Pure enthusiasm!",
        },
        {
          claim:
            "No man may see God — 'no man hath seen God at any time' (John 1:18). Your talk of beholding a divine light is therefore either madness or blasphemy. God is utterly beyond sight.",
          options: [
            {
              text: "No one sees God's essence; but God grants the worthy to behold His uncreated light — Moses' shining face, the glory on Tabor, the light that filled the martyr Stephen. We see not the unknowable essence but the radiance of His grace.",
              correct: true,
              rationale:
                "The distinction (later formalized by St. Gregory Palamas) between God's unknowable essence and His uncreated energies/light, which the worthy do behold: Moses (Exod 34:29–35), the Transfiguration (Matt 17:2), Stephen (Acts 7:55). Symeon witnessed to this vision.",
            },
            {
              text: "You are right; God can be seen in no sense whatsoever.",
              correct: false,
              rationale:
                "Scripture records real visions of God's glory — Moses, Isaiah, the Transfiguration, Stephen. The essence is unseen; the divine light and glory are granted to the saints.",
            },
            {
              text: "We see God's very essence fully, just as He is in Himself.",
              correct: false,
              rationale:
                "No creature comprehends the divine essence; that essence remains beyond all knowing. What is beheld is the uncreated light, God's energies, not His essence.",
            },
            {
              text: "The 'light' is merely a poetic figure for understanding doctrine.",
              correct: false,
              rationale:
                "Symeon insisted the light is no metaphor but a real, conscious vision of God's glory granted to those He makes worthy.",
            },
          ],
          difficulty: 5,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "Stephen's circle prevailed for a time: Symeon was driven from his abbacy and exiled across the water to Paloukiton, near Chrysopolis. There he founded a new community and wrote on. The Church reveres him as Symeon the New Theologian, and his witness to the vision of the divine light would bloom, three centuries later, in the theology of St. Gregory Palamas.",
      },
      {
        speaker: "st-anthony",
        text: "The faith is not a museum of correct words, $you, but the living presence of the Holy Spirit, to be known and loved. The court could exile the man; it could not exile the light he saw. Come — the road of the centuries runs on, and there are saints still waiting in it.",
      },
    ],
    reward: { xp: 1, item: "prayer-rope", healHp: true },
  },
];
