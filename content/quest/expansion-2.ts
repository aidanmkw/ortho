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
        text: "Light pours down in shafts from forty windows ringing a dome that seems to float on air itself. Gold mosaic glimmers across acres of vaulting; the marble is veined like frozen rivers. This is Hagia Sophia, the Holy Wisdom, raised by Justinian. Sixteen years ago, walking into the finished church, the emperor cried out: 'Solomon, I have outdone thee!'",
      },
      {
        speaker: "narrator",
        text: "Beneath that floating vault one hundred and sixty-five bishops are assembling. Censers swing; the smell of beeswax and incense hangs in the air. The year is five hundred and fifty-three. They have come for the Fifth of the Holy and Ecumenical Councils.",
      },
      {
        speaker: "you",
        text: "St. Anthony — why call another council? I thought Chalcedon had settled how to speak of Christ.",
      },
      {
        speaker: "st-anthony",
        text: "It settled the truth, $you, but not the peace. A century has passed, and the Empire is torn. Whole provinces — Egypt, Syria — reject Chalcedon. They say its talk of 'two natures' smells of Nestorius, who once split Christ into two sons. Justinian would heal the breach and bring them home.",
      },
      {
        speaker: "you",
        text: "And how does he mean to heal it?",
      },
      {
        speaker: "st-anthony",
        text: "By condemning the 'Three Chapters' — the person and writings of Theodore of Mopsuestia, certain words of Theodoret written against holy Cyril, and a letter of Ibas to Maris the Persian. These men were of the Nestorian school, and their writings do breathe its air. Justinian hopes that, seeing them anathematized, the doubters will accept Chalcedon at last.",
      },
      {
        speaker: "you",
        text: "But two of those men died in the peace of the Church, did they not? Is it just to condemn the dead?",
      },
      {
        speaker: "st-anthony",
        text: "A hard question, and the bishops feel its weight — even Pope Vigilius will waver for years before he yields. Yet the Council judges not the men's souls, which are in God's hand, but their teaching, which still poisons the living. The error is what must be named.",
      },
      {
        speaker: "narrator",
        text: "Yet a subtler poison troubles the fathers, drifting in from the desert monasteries of Palestine. Among the learned monks the old speculations of Origen of Alexandria have bred again — and grown wilder than the master ever taught.",
      },
      {
        speaker: "st-anthony",
        text: "They teach that souls existed before their bodies, as bare minds contemplating God; that they cooled in their love and fell into flesh as punishment; and that in the end ALL shall be restored exactly as they were — the apokatastasis — every soul, every demon, even Satan himself made pure again, and hell at last emptied. The Council readies fifteen anathemas against it.",
      },
      {
        speaker: "you",
        text: "But is that not generous? It sounds like a man trying to make God's mercy bigger, not smaller.",
      },
      {
        speaker: "st-anthony",
        text: "It is generosity untethered from what was revealed, $you — and that is the danger. Origen was a great mind; the Church owes him much. But brilliance that soars past Scripture lands in fable. Mark the two dangers under this dome: one man's writings flatter old heresy; another man's genius outruns the Gospel. The Church holds the narrow road — she condemns the error yet does not despise the mind that erred.",
      },
      {
        speaker: "you",
        text: "And the emperor sits in the council itself? A layman among bishops?",
      },
      {
        speaker: "st-anthony",
        text: "Justinian rules as a Christian emperor, and dreams of symphony — Church and empire as two harmonies of the one God, the priesthood tending souls, the throne tending order. His law and his liturgy will shape the world for a thousand years. But the defining of doctrine he leaves to the bishops. Watch, now — not every learned man here loves the narrow road.",
      },
      {
        speaker: "you",
        text: "If Origen was so revered, how did the Church come to fence him in? It seems a hard thing to turn against a teacher you once loved.",
      },
      {
        speaker: "st-anthony",
        text: "It is hard, and it is a mercy. A river is loved for its waters, yet the city builds banks lest it drown the streets. The Council does not curse the man's memory so much as the errors that overflowed from his disciples — that the soul fell from heaven into the body, that hell is a passing thing, that the end simply repeats the beginning. These the bishops will dam, that the faithful not be swept away.",
      },
      {
        speaker: "you",
        text: "Then the test is never the man's brilliance, but whether his teaching agrees with what was handed down.",
      },
      {
        speaker: "st-anthony",
        text: "You learn quickly, $you. 'Hold fast the traditions which ye have been taught,' the Apostle wrote (2 Thess 2:15). The measure is the apostolic deposit, confessed by the councils — not the dazzle of a single mind, however great.",
      },
      {
        speaker: "narrator",
        text: "From a side aisle a deacon approaches, young and ardent, an admirer of Origen. His eyes are bright with grand and limitless hopes for the whole cosmos, and he thinks the assembled bishops small-minded men fencing in the boundless love of God.",
      },
      {
        speaker: "origenist-deacon",
        text: "So the synod would chain the infinite God to its little rules! Tell me, stranger — Origen saw further than these timid bishops dare. Every soul was once a pure mind near to God; this world of flesh is our school and our exile. And in the end ALL shall return home — yes, the devil himself restored. Is the mercy of God not infinite? Refute me, if you would shrink heaven down to fit your fears.",
      },
    ],
    boss: {
      id: "boss-origenist-deacon",
      name: "The Origenist Deacon",
      title: "Speculator of the Endless Restoration",
      tradition: "Origenism",
      sprite: "origenist-deacon",
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
        speaker: "origenist-deacon",
        text: "Anathema, then, upon the pre-existence of souls... upon the restoration of the demons. I had loved my own speculations more than the faith once delivered. The narrow road — it is wider than I thought, and it goes somewhere my cleverness could not.",
      },
      {
        speaker: "narrator",
        text: "The Council condemned the Three Chapters and the errors of Origen, and confessed afresh the one Christ proclaimed at Nicaea, Constantinople, Ephesus, and Chalcedon. Beneath the great dome the bishops sealed the Fifth of the Holy and Ecumenical Councils.",
      },
      {
        speaker: "you",
        text: "So the Church loves learning, yet she would not follow even her own great teacher past the edge of what was revealed.",
      },
      {
        speaker: "st-anthony",
        text: "Just so, $you. She reveres the mind but bows to the Tradition handed down; she will not trade the Gospel for a beautiful guess. Remember it. The cleverest errors are the ones that flatter our hopes.",
      },
      {
        speaker: "st-anthony",
        text: "Justinian's law and worship will outlast his empire. But two centuries hence a new storm breaks — a Christian emperor will order the holy images burned. Come; eastward now, to a cave in the Judean wilderness, where a monk beyond his reach will take up the pen to save the icons. Take my hand.",
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
        text: "The hand of God lifts and sets you down in heat and silence. A gorge of bone-white rock falls away beneath your sandals; far below, a thread of green marks a dry streambed. Cut into the cliff face, like nests of swallows, are dozens of small cells and a cluster of domed chapels. This is the Great Lavra of Mar Saba, in the Judean wilderness.",
      },
      {
        speaker: "narrator",
        text: "From a cell lit by a single oil lamp, the scratch of a reed pen falls silent. A monk in a worn black habit looks up. His Greek is courtly, his hands soft for a hermit's — the hands of a man who once handled gold.",
      },
      {
        speaker: "st-john-damascus",
        text: "Peace to you, traveler. I am John, once chief treasurer to the Caliph in Damascus, now the least of the monks of this Lavra. You have come at a grievous hour. Word reaches us from the capital: the Emperor Leo names the holy images idols, and casts them into the fire.",
      },
      {
        speaker: "you",
        text: "The Emperor? A Christian emperor is burning Christian images? Why?",
      },
      {
        speaker: "st-john-damascus",
        text: "He has seen the armies of Islam sweep across the world, and their cry against all images haunts him. He thinks God has punished us for our icons, that we have broken the commandment. So he would purge them — and silence any who object.",
      },
      {
        speaker: "you",
        text: "Then how do you dare write against him? Are you not his subject?",
      },
      {
        speaker: "st-john-damascus",
        text: "Here is the marvel of God's providence: I live in the lands of the Saracens, beyond the reach of the Emperor's soldiers. His edict cannot touch a monk in this cave. Under the Christian emperor the icons burn; under the Muslim Caliph my pen is free. So I write — three treatises, On the Divine Images — that the whole Church may have an answer.",
      },
      {
        speaker: "st-anthony",
        text: "Attend to this man, $you. His words will outlive the emperor who hates them; the Church will one day name him a Doctor. But first you must understand what the iconoclasts truly claim, for it sounds like piety. They quote the Law against him: 'Thou shalt not make a graven image.'",
      },
      {
        speaker: "you",
        text: "And it is a true commandment. How do you answer it?",
      },
      {
        speaker: "st-john-damascus",
        text: "I answer with the whole of Scripture, not a single verse torn from it. Why did the Law forbid images? Because Israel had seen no form of God — 'you heard a voice but saw no likeness' (Deut 4:15) — and a people prone to idolatry would have carved the unseen God into a calf. The ban guarded against confusing the Creator with a thing.",
      },
      {
        speaker: "you",
        text: "But that danger remains. What has changed?",
      },
      {
        speaker: "st-john-damascus",
        text: "Everything has changed! The invisible God became visible. The Word took flesh and walked, was seen, was touched, was crucified. I do not paint the unknowable Godhead — that I cannot and dare not. I paint Christ as He truly appeared, as the apostles beheld Him. Shall I refuse to draw what my own eyes could have seen?",
      },
      {
        speaker: "you",
        text: "But the Emperor says the icons are no different from the idols of the pagans. How do you answer that?",
      },
      {
        speaker: "st-john-damascus",
        text: "The idol depicts a false god, a thing that is not. The icon depicts the true God who has come in the flesh, and His saints who reflect His glory. And mark the difference in what we render: to God alone belongs latreia, worship; to the icon and the saint we give only proskynesis, honor — and that honor does not rest on the wood, but passes through it to the One depicted, as a kiss given to a letter is meant for the friend who wrote it.",
      },
      {
        speaker: "you",
        text: "Did the saints before us make images, or is this something new?",
      },
      {
        speaker: "st-john-damascus",
        text: "New? Walk the catacombs of Rome, where the martyrs painted Christ the Shepherd and the Virgin and her Child upon the very tombs, while the lions still hungered. The same God who said 'make no graven image' commanded Moses to weave cherubim of gold above the Ark and over the veil (Exod 25:18). Forbidden was the worship of false gods — never the sacred image rightly used.",
      },
      {
        speaker: "st-john-damascus",
        text: "Hear the heart of it, then: I do not worship matter, but I worship the God of matter, who became matter for my sake, and dwelt in matter, and through matter worked out my salvation. The honor I give the image does not stop at the wood and paint — it passes to the One depicted.",
      },
      {
        speaker: "narrator",
        text: "A shadow falls across the mouth of the cave. An agent of the iconoclast court has tracked the writings to their source, a rolled edict in his fist and the Emperor's seal upon it. He looks at the monk's icons stacked against the wall — Christ, the Theotokos, the saints — and his lip curls.",
      },
      {
        speaker: "iconoclast",
        text: "Monk of the desert! The Emperor Leo, by the authority of God, has condemned your painted idols. 'Thou shalt not make a graven image' — Scripture itself damns you. You bow before boards and pigment, you kiss them, you burn lamps to them, and you call it piety! Defend your idolatry, if the wilderness has not yet addled your wits.",
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
        speaker: "iconoclast",
        text: "The Incarnation changes all... God has been seen, and what is seen may be drawn. I had made the invisible God an excuse to deny that He became visible. I will carry no edict back. Let the Emperor burn what he will — he cannot unmake the flesh of Christ.",
      },
      {
        speaker: "narrator",
        text: "The agent withdrew into the desert glare. John's treatises spread through the Church and could not be unwritten. The struggle would rage another century, but at the Seventh Ecumenical Council in 787 the icons were restored, and in 843 the 'Triumph of Orthodoxy' sealed the victory for good.",
      },
      {
        speaker: "you",
        text: "So the whole quarrel turned upon the Incarnation itself — on whether God had truly become visible.",
      },
      {
        speaker: "st-john-damascus",
        text: "You have understood, $you. The icon is no decoration; it preaches the Incarnation in silence. Because the Word became flesh, the unseen has been seen, and what is seen may be honored. Deny the icon and you whisper, in the end, that God never truly took our flesh.",
      },
      {
        speaker: "st-anthony",
        text: "Carry that with you. We go now to the great city, to Constantinople in a later age — where a humble monk will dare to say that God may be not only painted on a board, but seen, even now, with living eyes, as a Light that no edict can extinguish.",
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
        text: "Constantinople again, but generations later — the year a thousand draws near. The mosaics of Hagia Sophia still blaze with gold, but the city has grown comfortable, its faith grown careful. You stand in the courtyard of a small monastery near the western walls: the house of St. Mamas. From the chapel comes the murmur of monks at prayer, and over it one voice, urgent and alive.",
      },
      {
        speaker: "st-anthony",
        text: "That is the abbot, $you. Symeon. The Church will give him a name granted to only two others before him — John the Evangelist, and Gregory the Theologian. They will call him Symeon the New Theologian. Not for his learning, but for what he has seen.",
      },
      {
        speaker: "you",
        text: "What has he seen?",
      },
      {
        speaker: "st-anthony",
        text: "As a young man, before he ever took the habit, he stood one night at prayer and a great light surrounded him — a radiance not of the sun nor of any lamp, that flooded him with tears and an unbearable joy. He knew it, beyond all doubt, for the glory of the living God. From that hour he has insisted the faith must be tasted, not merely recited.",
      },
      {
        speaker: "narrator",
        text: "The abbot comes out into the light of the courtyard, his face worn thin by fasting and bright with something else. He sees you, and speaks as though continuing a sermon he cannot stop: 'Do not say it is impossible to receive the Spirit of God! Do not say one may be saved without Him! Do not say a man may possess Him and not know it! For God is light, and those whom He makes worthy behold Him as light — they receive the light consciously, in tears and great joy.'",
      },
      {
        speaker: "you",
        text: "He speaks of seeing God now, in this life? I had thought such things were only for the age to come.",
      },
      {
        speaker: "st-anthony",
        text: "That is precisely the scandal, $you. Symeon does not deny the rites, the rules, the sacraments — he reveres them. But he insists grace is given to be KNOWN. The learned men of the patriarch's court find this intolerable. They say religion is enough if it is kept outwardly: the right words, the right forms, the right order. To claim you feel the Spirit, that you see the glory — they call it pride and delusion.",
      },
      {
        speaker: "you",
        text: "But is that not a danger? A man could mistake his own feelings, even some demon's flattery, for the light of God.",
      },
      {
        speaker: "st-anthony",
        text: "A real danger, and Symeon knows it well — which is why he never tells a soul to chase visions. He says: humble yourself, repent with tears, obey your spiritual father, keep the commandments. Only then, to the humble and not the proud, may God grant the gift. The counterfeit always feeds pride; the true light burns it away and leaves only sorrow for sin and a great, quiet joy.",
      },
      {
        speaker: "you",
        text: "And does Scripture truly speak of such a thing? Or is it only the experience of monks?",
      },
      {
        speaker: "st-anthony",
        text: "Remember the words you will hear: 'The Spirit Himself beareth witness with our spirit that we are the children of God' (Rom 8:16). Moses came down from the mountain with his face shining so the people could not look on him. Christ was transfigured on Tabor and His garments became as light. The deacon Stephen, dying, saw the heavens opened and the glory of God. Symeon claims nothing the Scriptures have not already promised.",
      },
      {
        speaker: "you",
        text: "And who leads them?",
      },
      {
        speaker: "st-anthony",
        text: "Stephen, once archbishop of Nicomedia — the sharpest mind of the court, a man who can shred an argument like parchment. He will try to make Symeon look a wild enthusiast, an unlettered fanatic weeping over visions. Do not let him. Stand with the abbot, and answer not from feeling but from the Scriptures and the Fathers.",
      },
      {
        speaker: "you",
        text: "But if grace is given in the sacraments — in baptism, in the Eucharist — why does Symeon press so hard that it be FELT? Is the gift not enough, whether we sense it or not?",
      },
      {
        speaker: "st-anthony",
        text: "The gift is real either way, $you, and Symeon never doubts the mysteries. But picture a man who owns a treasure and never once opens the chest, never knows what he holds. So the court would have it: grace locked away, unopened, the Christian's life a round of forms with the Giver Himself a stranger. Symeon cries out: open the chest! The Spirit was given that you might KNOW the One you received, and be changed by Him.",
      },
      {
        speaker: "you",
        text: "Then the quarrel is whether God means to be a distant rule-giver or a present fire.",
      },
      {
        speaker: "st-anthony",
        text: "Exactly so. And do not mistake the court for villains, $you. They fear pride; they have seen false mystics deceive the simple, and they guard the Church's order against every wild claim. Their caution is not wholly wrong — only it has hardened into a wall against the living God. Help the abbot show them the difference between the fanatic and the saint.",
      },
      {
        speaker: "narrator",
        text: "A figure in fine ecclesiastical robes detaches itself from a knot of clerics in the cloister. His bearing is cold, precise, certain. He has watched Symeon long enough; now he turns the full weight of his learning upon you.",
      },
      {
        speaker: "stephen-nicomedia",
        text: "So! Another disciple of the abbot of Mamas. The whole city rings with his strange claims — that men SEE God, that they FEEL the Spirit burning in them like a flame. Tell me, novice: where did your master study? Under what teachers? Theology belongs to trained minds and to the settled forms of the Church, not to visions and weeping in the dark. Defend this enthusiasm — if indeed you can reason at all.",
      },
    ],
    boss: {
      id: "boss-court-theologian",
      name: "Stephen of Nicomedia",
      title: "Theologian of the Court",
      tradition: "Formalist Rationalism",
      sprite: "stephen-nicomedia",
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
        speaker: "stephen-nicomedia",
        text: "The Fathers themselves saw the light... Moses' shining face, the glory upon Tabor, the heaven that opened to the martyr Stephen. I had reduced the living God to a doctrine on a page, and called my deafness wisdom.",
      },
      {
        speaker: "narrator",
        text: "Yet Stephen's circle prevailed for a time. Symeon was driven from his abbacy and exiled across the water to Paloukiton, near Chrysopolis. There he founded a new community and went on writing his Hymns of Divine Love until his repose. The Church reveres him as Symeon the New Theologian.",
      },
      {
        speaker: "you",
        text: "So they could silence the abbot, but not the thing he had seen.",
      },
      {
        speaker: "st-anthony",
        text: "Never the thing he saw. The faith is no museum of correct words, $you, but the living presence of the Holy Spirit, to be known and loved. The court could exile the man; it could not exile the Light.",
      },
      {
        speaker: "st-anthony",
        text: "And mark this well, for the road ahead returns to it: three centuries from now, on the Holy Mountain, a monk named Gregory Palamas will take up Symeon's witness and forge it into a teaching that defends the whole Church. The seed sown here blooms there. Come — the centuries run on, and saints are still waiting in them.",
      },
    ],
    reward: { xp: 1, item: "prayer-rope", healHp: true },
  },
];
