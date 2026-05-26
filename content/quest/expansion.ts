import type { Chapter } from "@/lib/quest/types";

// ===========================================================================
// EXPANSION CHAPTERS — filling the gaps in centuries 2–11.
//
// These chapters match the Chapter type in lib/quest/types.ts exactly and use
// only existing backgrounds, portrait ids, and item ids. `number` fields are
// placeholders (101+) for re-numbering on integration.
//
// Authored attacks are intentionally short (1–2 each); the battle engine
// auto-augments every boss with live spaced-repetition questions from the
// study corpus.
//
// Portrait notes: figures without a dedicated portrait id (Polycarp, the
// Cappadocians, John Chrysostom, Maximus the Confessor, Cyril & Methodius,
// Photius, St. Vladimir) use "narrator" / "st-anthony" / "you" as dialogue
// speakers, or a descriptive speaker id that renders no portrait (acceptable).
// Bosses without a portrait reuse the closest existing villain sprite or
// "tempter".
// ===========================================================================

export const EXPANSION_CHAPTERS: Chapter[] = [
  // =========================================================================
  // CHAPTER 101 — THE MARTYRDOM OF POLYCARP (AD 155, Smyrna)
  // 2nd century. Bridges between Ch.1 (Ignatius, 107) and Ch.2 (Decian, 250).
  // =========================================================================
  {
    id: "ch101-polycarp",
    number: 101,
    era: "AD 155",
    location: "The Stadium of Smyrna",
    title: "Eighty-Six Years",
    background: "road-roman",
    ally: "st-anthony",
    intro: [
      {
        speaker: "narrator",
        text: "Smyrna, jewel of the Asian coast. The stadium is packed to its highest tier, and the crowd roars like a single beast. The smell of dust and torches and pitch hangs in the air. A festival mob, drunk on wine and blood, chants for the death of the old man they have dragged from his hiding place in a farmhouse outside the walls.",
      },
      {
        speaker: "narrator",
        text: "They had hunted him for days. When the soldiers found him at last, he ordered a meal set before them, and asked only for one hour to pray. He prayed for two — for every soul he had ever met, and for the whole Church throughout the world.",
      },
      {
        speaker: "st-anthony",
        text: "Half a century has passed since Ignatius went to the lions, $you. The bishop they hunt today is Polycarp — and he is no ordinary bishop. As a young man he sat at the feet of John, the beloved disciple, the Apostle who leaned on the Lord's breast at the Supper.",
      },
      {
        speaker: "you",
        text: "He knew an Apostle? An actual eyewitness of Christ?",
      },
      {
        speaker: "st-anthony",
        text: "He knew John, and John knew the Lord. Polycarp would tell how John fled the public bath at Ephesus when the heretic Cerinthus entered — 'lest the roof fall, for the enemy of truth is within.' What you receive today comes to you across only two pairs of hands: from Christ, to John, to this old man in the sand.",
      },
      {
        speaker: "narrator",
        text: "He stands in the center of the arena now — white-bearded, unbound, strangely calm, as if he were the only man present not afraid. Above him the proconsul Statius Quadratus leans forward from his marble seat.",
      },
      {
        speaker: "narrator",
        text: "'Have respect for your age, old man,' the proconsul calls. 'Swear by the genius of Caesar. Say, \"Away with the atheists.\" Revile Christ, and I release you.'",
      },
      {
        speaker: "you",
        text: "Atheists? They call Christians atheists?",
      },
      {
        speaker: "st-anthony",
        text: "Because we will not bow to their many gods, they say we believe in none at all. To Rome, a man who refuses the public cult is a danger to the whole city — for if the gods are slighted, they reason, the gods will send plague and famine on all. To be a Christian here is to be an enemy of the people.",
      },
      {
        speaker: "narrator",
        text: "Polycarp lifts his head and looks slowly across the crowd. Then he raises his hand toward them — the howling, pagan mob — and says, 'Away with the atheists.' A ripple of confusion runs through the stands. He has turned their own word against them.",
      },
      {
        speaker: "narrator",
        text: "'Swear,' the proconsul presses, 'and I set you free. Reproach Christ.' The old man answers, and his voice is steady enough to carry to the highest tier.",
      },
      {
        speaker: "narrator",
        text: "'Eighty and six years have I served Him, and He has done me no wrong. How then can I blaspheme my King who saved me?'",
      },
      {
        speaker: "you",
        text: "Eighty-six years. He has been a Christian longer than most men live.",
      },
      {
        speaker: "st-anthony",
        text: "He has never known a world without Christ in it. And mark his answer well, $you — he does not argue, he does not bargain. He simply confesses loyalty to a King. The proconsul will threaten him with beasts, then with fire, and to each threat the old man will only smile.",
      },
      {
        speaker: "st-anthony",
        text: "The proconsul will offer escape after escape. Each is a snare. And the officer of the games has marked you — he thinks a younger man, a stranger, can be made to recant where Polycarp will not. He comes to break you first, and parade your fall before the bishop's eyes.",
      },
      {
        speaker: "centurion",
        text: "You there — friend of the old fool. He will burn within the hour, and his god will not lift one finger to save him. Why share his pyre? A pinch of incense, a word for Caesar, and you walk free into the sunlight. Be sensible, Christ-follower. Answer me — or join him on the wood.",
      },
    ],
    boss: {
      id: "boss-smyrna-proconsul",
      name: "Statius Quadratus",
      title: "Proconsul of Asia",
      tradition: "Pagan Rome",
      sprite: "centurion",
      maxHp: 150,
      intro:
        "The old man chose the fire. Foolishness! Reverence Caesar, curse the dead Galilean, and live. What is one word against the gods?",
      midline:
        "You speak as he spoke. Do all you Christians share one stubborn tongue?",
      outro:
        "Then burn with him! ...Yet the crowd has gone quiet. They watched the old man die, and not one of them rejoiced.",
      victoryEpigraph: {
        text:
          "Eighty and six years have I served Him, and He has done me no wrong; how then can I blaspheme my King who saved me?",
        source: "St. Polycarp of Smyrna, Martyrdom of Polycarp 9 (c. 155)",
      },
      attacks: [
        {
          claim:
            "It is a small thing. Swear by the fortune of Caesar, say 'Away with the atheists,' and you go home. Why die for a word?",
          options: [
            {
              text: "The public act IS the denial. I will not honor Caesar as a god — 'Away with the atheists' I will say only of the demons you serve.",
              correct: true,
              rationale:
                "Polycarp's own retort (Martyrdom 9): he gestured at the pagan crowd and said it of them. A cultic act before Caesar's image is apostasy, regardless of one's private heart.",
            },
            {
              text: "Fine — I will swear the oath. God knows my heart belongs to Christ.",
              correct: false,
              rationale:
                "This is the libellatici compromise condemned after the persecutions. The outward act of worship is itself the betrayal.",
            },
            {
              text: "Caesar may be honored as a god among the others; there is room for many.",
              correct: false,
              rationale: "Outright apostasy. 'Thou shalt have no other gods before Me' (Exodus 20:3).",
            },
            {
              text: "I will curse Christ, since words are only air.",
              correct: false,
              rationale:
                "To deny Christ before men is to be denied before the Father (Matt 10:33). The martyrs counted the cost and chose Him.",
            },
          ],
          difficulty: 3,
          taunt: "One word! So little breath to save your life!",
        },
        {
          claim:
            "When the old man is ash, you will gather his bones like trinkets. Worshipping a corpse — is this not the same idolatry you accuse us of?",
          options: [
            {
              text: "We honor the relics of the martyrs as more precious than gold, but we worship Christ alone — they are His witnesses, not gods.",
              correct: true,
              rationale:
                "The Smyrnaeans wrote that they took up Polycarp's bones, 'more precious than costly stones,' to keep his memory — veneration of relics, distinct from the worship due to Christ (Martyrdom 17–18).",
            },
            {
              text: "Yes, we will worship the bones as a new god.",
              correct: false,
              rationale: "Calumny the early Church explicitly rejected. The martyr is venerated; Christ alone is worshipped.",
            },
            {
              text: "We care nothing for the body once the soul departs.",
              correct: false,
              rationale:
                "The Church does honor the bodies of the saints, for the body too is sanctified and will rise (1 Cor 15).",
            },
            {
              text: "The bones have magic power of their own.",
              correct: false,
              rationale: "A pagan reduction. Any grace is Christ's, working through His holy ones.",
            },
          ],
          difficulty: 2,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "They bound the old man to the stake, but he asked not to be nailed: 'Leave me thus. He who gives me strength to endure the fire will grant me to remain in the flames unmoved.' He lifted his eyes and gave thanks, as over a chalice, that he was counted worthy to share the cup of the martyrs.",
      },
      {
        speaker: "narrator",
        text: "The flames rose around him, and the Smyrnaeans would later swear the fire arched over him like a sail filled with wind, refusing to consume him, until at last a soldier was sent forward with a dagger. The crowd that had howled for his blood fell silent.",
      },
      {
        speaker: "centurion",
        text: "...He died as if he were going home. Not one scream. I have watched a thousand men die, stranger. I have never watched one die like that.",
      },
      {
        speaker: "narrator",
        text: "At dawn the Christians crept back and gathered up his bones, 'more precious than costly gems and finer than gold,' to keep his memory and to celebrate the day of his birth — the day he died.",
      },
      {
        speaker: "you",
        text: "The day he died... they call it his birthday?",
      },
      {
        speaker: "st-anthony",
        text: "To the Church, the death of a martyr is a birth into life. Thus began the keeping of the saints' feast days, $you — on the very date of their martyrdom. Polycarp learned the faith from John, and John from the Lord. The chain is unbroken, and now a link of it runs through you.",
      },
      {
        speaker: "st-anthony",
        text: "Come. The next foe will not fight with fire. He fights with reasons — for the world is about to ask the Church whether her faith can stand among the philosophers. Take my hand. We go to Rome.",
      },
    ],
    reward: { xp: 1, item: "relic-cross", healHp: true },
  },

  // =========================================================================
  // CHAPTER 102 — JUSTIN MARTYR & THE APOLOGISTS (AD 165, Rome)
  // 2nd century. The Church answers the philosophers.
  // =========================================================================
  {
    id: "ch102-justin",
    number: 102,
    era: "AD 165",
    location: "Rome, the school above the baths of Timiotinus",
    title: "The Reasonable Worship",
    background: "road-roman",
    ally: "st-anthony",
    intro: [
      {
        speaker: "narrator",
        text: "Rome, in the reign of Marcus Aurelius — a philosopher-emperor who has no love for Christians. A cramped upper room above the baths of one Timiotinus. Scrolls everywhere, stacked to the rafters. A middle-aged man in a philosopher's worn cloak — the pallium, the threadbare badge of a teacher of wisdom — instructs a handful of students.",
      },
      {
        speaker: "st-anthony",
        text: "Justin, they call him. Born in Samaria of pagan parents, he wandered through every school of his age, $you — Stoic, Peripatetic, Pythagorean, at last Platonist — sure each in turn would show him God, and disappointed by each.",
      },
      {
        speaker: "you",
        text: "And none of them satisfied him?",
      },
      {
        speaker: "st-anthony",
        text: "He thought the Platonists had nearly reached heaven. Then one day, walking by the sea, he met an old man who asked him gently: how can the philosophers speak truly of God, when they have never seen Him, nor listened to those who did? The old man pointed him to the prophets — men older than all the philosophers, who spoke by the Spirit and foretold Christ. 'Straightway a flame was kindled in my soul,' Justin says.",
      },
      {
        speaker: "narrator",
        text: "Justin turns from his lectern, his pupils watching. 'I did not abandon philosophy when I found Christ,' he tells you. 'I found philosophy itself — the only sure and profitable one. So I keep the cloak. Let them see that a man may love wisdom and worship the Crucified, and that these are not two things but one.'",
      },
      {
        speaker: "you",
        text: "But Rome surely sees Christians as the enemies of reason — atheists, you said, ignorant folk who meet in the dark.",
      },
      {
        speaker: "narrator",
        text: "'Which is why I write,' Justin says. 'I have sent an Apology to the Emperor himself, and a second to the Senate — open letters, signed in my own name, that any man may read. We do not babble in secret. I show them that whatever was nobly said by anyone belongs to us Christians, for the Word who became flesh in Jesus is the same Logos who scattered seeds of truth among the wise of every nation.'",
      },
      {
        speaker: "st-anthony",
        text: "Hear the boldness of it, $you. Justin claims that Socrates and Heraclitus, when they spoke truly, spoke by a share in the same Word that was made flesh. He does not flee reason — he baptizes it. This is the answer the Church gives to the proud mind: not retreat, but conquest.",
      },
      {
        speaker: "st-anthony",
        text: "But it makes him enemies. The prefect Rusticus watches this school with cold eyes. And Justin has already bested the Cynic philosopher Crescens in public debate — a humiliated philosopher is a dangerous foe, for he fights not with arguments now but with denunciations. Be ready. Today they come with subtler weapons than fire.",
      },
      {
        speaker: "narrator",
        text: "A man in a fine cloak mounts the stairs, two students of his own behind him. His smile does not reach his eyes. This is no Roman soldier but a rival teacher, sent to expose the Christians as frauds before they can win another mind.",
      },
      {
        speaker: "marcus",
        text: "So this is the Christian 'school.' Crescens warned me of you Galileans — that you steal the robes of philosophy to dress up a peasant superstition fit only for slaves and women. Let us see, then. Is your 'faith' a philosophy that can be reasoned, or merely a fear that must be felt? Defend it — if you can reason at all.",
      },
    ],
    boss: {
      id: "boss-rome-philosopher",
      name: "Crescens the Cynic",
      title: "Rival Philosopher",
      tradition: "Pagan Philosophy",
      sprite: "marcus",
      maxHp: 165,
      intro:
        "You Christians borrow scraps from Plato and call it revelation. Show me one thing in your 'gospel' that the philosophers did not say better and first.",
      midline:
        "Hm. Justin has trained you well. But a clever pupil is not yet a true one.",
      outro:
        "Enough! I will report you to the prefect Rusticus. Reasons did not silence you — perhaps the executioner will.",
      victoryEpigraph: {
        text:
          "Whatever things were rightly said among all men are the property of us Christians.",
        source: "St. Justin Martyr, Second Apology 13 (c. 155)",
      },
      attacks: [
        {
          claim:
            "If your Logos enlightens every man, then Socrates and Heraclitus were as good as your Christ. Why bother with this crucified Jew at all?",
          options: [
            {
              text: "Those who lived by reason — the Logos — were in a sense Christians before Christ. But the whole Word became flesh in Jesus; the seeds were partial, He is the full harvest.",
              correct: true,
              rationale:
                "Justin's logos spermatikos: the philosophers had seeds of the Word and so glimpsed truth, but Christ is the Logos entire, incarnate (First Apology 46; Second Apology 13).",
            },
            {
              text: "The philosophers had nothing true; all pagan thought is from demons.",
              correct: false,
              rationale:
                "Justin held the opposite — that whatever was rightly said belongs to Christians, because it comes from the same Logos.",
            },
            {
              text: "Christ and Socrates are simply equal teachers.",
              correct: false,
              rationale:
                "This denies the Incarnation. Socrates partook of the Word by reason; in Christ the Word Himself became man.",
            },
            {
              text: "Reason and revelation have nothing to do with each other.",
              correct: false,
              rationale:
                "Fideism foreign to the apologists, who gave a 'reason for the hope' that was in them (1 Peter 3:15).",
            },
          ],
          difficulty: 3,
          taunt: "Plato said it first, and said it cleaner!",
        },
        {
          claim:
            "You meet at dawn, eat 'flesh and blood,' and call it thanksgiving. Rumor says you devour infants. What is this rite, really?",
          options: [
            {
              text: "On the day called Sunday we gather; the president gives thanks over bread and a cup of wine and water, and this — which we call Eucharist — is the flesh and blood of the incarnate Jesus.",
              correct: true,
              rationale:
                "Justin's eyewitness description of the liturgy (First Apology 65–67): the earliest detailed account of the Sunday Eucharist, and a flat denial of the cannibalism slander.",
            },
            {
              text: "It is a private mystery I cannot explain to outsiders.",
              correct: false,
              rationale:
                "Justin did the opposite — he described the rite openly to the Emperor precisely to refute the slanders.",
            },
            {
              text: "It is a purely symbolic meal with no real presence.",
              correct: false,
              rationale:
                "Justin says plainly the food is not common bread but the flesh and blood of Jesus made flesh (First Apology 66).",
            },
            {
              text: "We worship the bread itself as a god.",
              correct: false,
              rationale: "There is one God; the Eucharist is the Body of Christ, not a separate deity.",
            },
          ],
          difficulty: 3,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "Within a few short years Justin and six companions would be denounced — by Crescens, it was whispered — and dragged before the prefect Rusticus. 'What doctrines do you practice?' the prefect demanded. Justin answered plainly, and refused to sacrifice.",
      },
      {
        speaker: "narrator",
        text: "'If you are scourged and beheaded,' Rusticus pressed, 'do you suppose you will ascend into heaven?' Justin replied: 'I do not suppose it — I know it, and am fully persuaded of it.' They were scourged and beheaded together.",
      },
      {
        speaker: "you",
        text: "He was so certain. Not hoping — knowing.",
      },
      {
        speaker: "st-anthony",
        text: "Thus the Church remembers him forever as Justin Martyr — the philosopher who gave his head for the Logos he loved. He left us the earliest portrait of the Sunday Liturgy, and the bold confession that reason itself, rightly followed, leads home to Christ.",
      },
      {
        speaker: "st-anthony",
        text: "The faith is not the enemy of the mind, $you; it is the mind's true homeland. But a far greater storm gathers. Soon a single word — whether the Son is God or merely the highest creature — will set the whole empire ablaze. Constantinople, where the Creed must be completed, awaits.",
      },
    ],
    reward: { xp: 1, item: "icon-christ", healHp: true },
  },

  // =========================================================================
  // CHAPTER 103 — THE CAPPADOCIANS & CONSTANTINOPLE I (AD 381)
  // 4th century. Completes the Creed; the Spirit's divinity confessed.
  // =========================================================================
  {
    id: "ch103-cappadocians",
    number: 103,
    era: "AD 381",
    location: "Second Ecumenical Council, Constantinople",
    title: "The Lord, the Giver of Life",
    background: "council-hall",
    ally: "st-athanasius",
    intro: [
      {
        speaker: "narrator",
        text: "Constantinople, the capital, under the Emperor Theodosius. One hundred and fifty bishops gather in the imperial city. Fifty-six years have passed since Nicaea — and they were terrible years. Arianism, condemned at Nicaea, had risen again and seized emperors, bishops, whole provinces. For a generation the heretics held the great churches and the Nicene faithful met in barns and fields.",
      },
      {
        speaker: "you",
        text: "But Nicaea settled it! The Son is one in essence with the Father. How did the heresy come back?",
      },
      {
        speaker: "st-athanasius",
        text: "A word on parchment does not still a storm in men's hearts, $you. I — Athanasius — was exiled five times for that one word, homoousios. When I lay dying they said the world had become Arian and groaned to find itself so. But God raised up new champions after me: three from the rough hill-country of Cappadocia.",
      },
      {
        speaker: "st-athanasius",
        text: "Basil the Great, who built the language of the Trinity stone by stone: one essence — ousia — in three persons — hypostases. His brother Gregory of Nyssa, deepest of mystics. And Gregory the Theologian, who with a voice like fire won this very city back to the faith, preaching in a house-chapel he called Anastasia — Resurrection — while the heretics held every cathedral.",
      },
      {
        speaker: "you",
        text: "Then is the battle not already won? What remains to decide?",
      },
      {
        speaker: "st-anthony",
        text: "A new front, $you. The Pneumatomachi — the 'Spirit-fighters.' Cornered on the Son, they have retreated to the Holy Spirit. They will grant the Son is God, then call the Spirit a creature, a servant, the highest of things made. They demand: show us the word 'God' applied to the Spirit in Scripture, and we will yield.",
      },
      {
        speaker: "st-anthony",
        text: "Do you see the trap? If the Spirit is a creature, then the One who sanctifies us, who dwells in us, who makes us partakers of the divine nature — is no God at all. And a creature cannot make us divine. Our whole salvation hangs on the answer.",
      },
      {
        speaker: "narrator",
        text: "A frail, brilliant man rises to preside over the Council — Gregory the Theologian himself, worn thin by sickness and by the long war for the city. The Cappadocians' fingerprints are on every line of the Creed now taking shape.",
      },
      {
        speaker: "narrator",
        text: "'They ask why I do not shout the bare word \"God\" of the Spirit on every page,' Gregory says quietly. 'Scripture unveils the Father, then the Son, then the Spirit — light added to light, as our weak eyes can bear it. We worship the Spirit who makes me bold to speak. If He is not God, let Him first make me divine — and then I shall fear no man.'",
      },
      {
        speaker: "st-anthony",
        text: "Their leader comes now, a disciple of the arch-logician Eunomius — cold, precise, armed with airtight syllogisms. Hold to what Basil taught: the Spirit is glorified together with the Father and the Son. Speak, $you — the very Creed your people will confess every Sunday until the end of the world is being forged in this room.",
      },
      {
        speaker: "arius",
        text: "I am a disciple of Eunomius, and I deal in plain logic. Grant me only this: the Father is unbegotten. The Son is begotten. And the Spirit — neither begotten nor unbegotten. He is therefore neither the Father nor the Son. He must then be the first and highest of the things the Son made: a creature, however glorious. Refute that, if you can.",
      },
    ],
    boss: {
      id: "boss-pneumatomachi",
      name: "The Spirit-Fighter",
      title: "Disciple of Macedonius",
      tradition: "Pneumatomachian Heresy",
      sprite: "arius",
      maxHp: 230,
      intro:
        "The Spirit is not begotten, so He is not the Son; and not unbegotten, so He is not the Father. Therefore He is made — a creature. Where is your third God?",
      midline:
        "You answer like a Cappadocian. But Scripture nowhere calls the Spirit 'God' in so many letters!",
      outro:
        "Anathema... 'who together with the Father and the Son is worshipped and glorified'... I had made the Sanctifier a slave.",
      victoryEpigraph: {
        text:
          "And in the Holy Spirit, the Lord, the Giver of Life, who proceeds from the Father, who together with the Father and the Son is worshipped and glorified.",
        source: "Niceno-Constantinopolitan Creed (381)",
      },
      attacks: [
        {
          claim:
            "Show me where Scripture calls the Holy Spirit 'God.' It does not! You confess a third deity nowhere written.",
          options: [
            {
              text: "Lying to the Spirit is lying to God (Acts 5:3–4); the Spirit searches the deep things of God (1 Cor 2:10–11) and gives life. We worship Him with the Father and Son, for He is of one essence with them.",
              correct: true,
              rationale:
                "Basil's On the Holy Spirit argues from worship and from Acts 5:3–4 (Peter equates lying to the Spirit with lying to God). The Spirit's divinity is taught in Scripture's substance though the bare word is not used.",
            },
            {
              text: "You are right; the Spirit is the highest creature, a ministering power.",
              correct: false,
              rationale:
                "This is the Pneumatomachian error condemned in 381. A created sanctifier cannot make us partakers of the divine nature (2 Peter 1:4).",
            },
            {
              text: "The Spirit is merely an impersonal force, God's energy.",
              correct: false,
              rationale:
                "Scripture treats the Spirit as a Person who speaks, forbids, grieves, and can be lied to (Acts 13:2; Eph 4:30; Acts 5:3).",
            },
            {
              text: "The Spirit is just another name for the Father.",
              correct: false,
              rationale:
                "Modalism / Sabellianism — the three are distinct Persons, one essence, not one Person under three masks.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "If you cannot say HOW the Spirit comes from the Father differently than the Son does, then you cannot distinguish them — collapse them and be done.",
          options: [
            {
              text: "The Son is begotten of the Father; the Spirit proceeds from the Father. The manner is a mystery, but the distinction of the Persons is real — three hypostases in one essence.",
              correct: true,
              rationale:
                "The Cappadocian formula: one ousia (essence) in three hypostases (Persons), distinguished by their relations of origin (John 15:26).",
            },
            {
              text: "We cannot distinguish them, so there is really only one Person.",
              correct: false,
              rationale: "Sabellian modalism — denies the real Trinity of Persons.",
            },
            {
              text: "There are three separate gods of differing rank.",
              correct: false,
              rationale: "Tritheism / subordinationism. The three share one undivided essence.",
            },
            {
              text: "The Spirit proceeds from the Father and the Son as from one principle.",
              correct: false,
              rationale:
                "The Filioque — a later Western addition the Eastern Church never received. The 381 Creed says the Spirit proceeds from the Father.",
            },
          ],
          difficulty: 5,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "The Council confessed the Spirit as 'the Lord, the Giver of Life, who proceeds from the Father, who together with the Father and the Son is worshipped and glorified.' Nicaea's Creed was now complete. This — the Niceno-Constantinopolitan Creed — is the very Creed the Orthodox Church sings to this day, unchanged, word for word.",
      },
      {
        speaker: "you",
        text: "Word for word? Even now, sixteen centuries later?",
      },
      {
        speaker: "st-athanasius",
        text: "Word for word. Guard it so. Men will be tempted in ages to come to 'improve' it, to add a phrase here, a clause there. Resist them. What three hundred Fathers and the Spirit composed, let no single hand amend.",
      },
      {
        speaker: "narrator",
        text: "Worn out by the intrigues of the bishops, Gregory the Theologian resigned the throne of Constantinople rather than be the cause of strife, and retired to write poetry and pray. The work was done; the Trinity was confessed.",
      },
      {
        speaker: "st-anthony",
        text: "Basil, Gregory the Theologian, Gregory of Nyssa — the three great Cappadocians gave the Church her language for the Trinity: one essence, three Persons, distinguished by their relations of origin. Remember it, $you. Now back to this same imperial city, a generation on, where a preacher with a golden mouth will pay dearly for telling the truth to an empress.",
      },
    ],
    reward: { xp: 1, item: "synodikon", healHp: true },
  },

  // =========================================================================
  // CHAPTER 104 — ST. JOHN CHRYSOSTOM (AD 404, Constantinople)
  // late 4th/early 5th century. The preacher exiled for the truth.
  // =========================================================================
  {
    id: "ch104-chrysostom",
    number: 104,
    era: "AD 404",
    location: "The Patriarchal palace, Constantinople",
    title: "Glory to God for All Things",
    background: "hagia-sophia",
    ally: "st-anthony",
    intro: [
      {
        speaker: "narrator",
        text: "Constantinople, the New Rome, capital of a Christian empire. The great church is packed to its doors; people climb the columns and crowd the galleries to hear him, and break into applause in the middle of his sermons until he begs them to stop. John, archbishop of the city — the people have already given him a name that will outlast every emperor: Chrysostomos, the golden-mouthed.",
      },
      {
        speaker: "st-anthony",
        text: "He came up from Antioch, $you, schooled in reading Scripture plainly and preaching it whole. As a young man he fled to the mountains and lived in a cave two years, standing, scarcely sleeping, until his health was ruined for life. He came down from that mountain unable to be frightened by anything the world could do to him.",
      },
      {
        speaker: "you",
        text: "And now he is archbishop of the greatest city in the world. Surely that is comfort enough after a cave.",
      },
      {
        speaker: "st-anthony",
        text: "He treats the office as a trust, not a prize. He sold the costly furnishings of the bishop's palace and gave the silver to the poor. He thunders from the pulpit against luxury while the poor starve at the gates, against the games, against the powerful who devour the weak. He says the rich man's extra cloak belongs by right to the naked man who has none. The court loves him not at all for it.",
      },
      {
        speaker: "you",
        text: "Who at court has he angered most?",
      },
      {
        speaker: "st-anthony",
        text: "The Empress Eudoxia — proud, generous, and easily wounded. When he preaches against vanity and greed, the whole city knows whom he means, and so does she. And he has a powerful enemy in Theophilus, the patriarch of Alexandria, who envies the dignity of this upstart see and would gladly see John fall.",
      },
      {
        speaker: "narrator",
        text: "John descends from the ambo, the crowd still murmuring. He turns to you, and there is no fear in his face at all. 'I have only ever feared one thing,' he says, 'and it is not exile, nor the sword, nor poverty, nor death. It is sin. Everything else is a shadow that passes.'",
      },
      {
        speaker: "narrator",
        text: "'Let them banish me,' he goes on. 'The earth is the Lord's and the fullness thereof. Let them saw me in two — Isaiah was sawn. Let them drown me — that was Jonah's road. The Church is not Eudoxia's; she is the bride of Christ, and no power on earth can take her from Him.'",
      },
      {
        speaker: "st-anthony",
        text: "His enemies have already convened a rigged synod against him across the water — they call it the Synod of the Oak. Trumped-up charges, packed with his foes, John not even permitted to defend himself. Exile is decided before the trial begins. A courtier comes now, smooth and reasonable, to break the archbishop's friends before they break the man.",
      },
      {
        speaker: "marcus",
        text: "Archbishop's friend. Let us speak as practical men. The Empress is most generous to those who please her, and most dangerous to those who do not. Your John insults her from the pulpit before the whole city, and melts down sacred treasures to throw gold at beggars in the street. Counsel him to silence — a season of quiet, no more — or share his ruin. Now: defend this reckless 'golden mouth,' if there is a defense to give.",
      },
    ],
    boss: {
      id: "boss-court-eunuch",
      name: "The Imperial Chamberlain",
      title: "Voice of the Court",
      tradition: "Worldly Power",
      sprite: "marcus",
      maxHp: 175,
      intro:
        "A bishop should bless the throne, not scold it. Gold belongs in the sanctuary, not the gutter. Why does your John forget who feeds him?",
      midline:
        "You are as stubborn as he is. Do you not fear the Empress at all?",
      outro:
        "So be it — exile, then. ...Strange. The man boards the cart for the frontier still giving thanks. What has he that we have not?",
      victoryEpigraph: {
        text: "Glory to God for all things!",
        source: "St. John Chrysostom, last words in exile (407)",
      },
      attacks: [
        {
          claim:
            "Your archbishop melts down the Church's treasures to feed rabble. Is sacred gold not better spent adorning the altar of God?",
          options: [
            {
              text: "The poor are the altar of God. 'You honor the altar with cloths of gold,' John says, 'yet pass by Christ Himself naked at your door.' Mercy to the least is worship of the Most High.",
              correct: true,
              rationale:
                "Chrysostom's famous homily on Matthew: there is no use adorning the church building while neglecting Christ who is hungry in the poor (Matt 25:40; Homily 50 on Matthew).",
            },
            {
              text: "He is wrong; the gold should stay in the sanctuary.",
              correct: false,
              rationale:
                "Almsgiving to the poor is itself sacred. The Fathers consistently subordinate ornament to mercy.",
            },
            {
              text: "The poor deserve nothing; poverty is their own fault.",
              correct: false,
              rationale:
                "Contrary to the whole Gospel. 'Inasmuch as ye did it unto one of the least of these... ye did it unto Me' (Matt 25:40).",
            },
            {
              text: "Material wealth is evil and the Church should own nothing at all.",
              correct: false,
              rationale:
                "An Encratite extreme. Creation is good; the issue is the right, merciful use of goods, not their abolition.",
            },
          ],
          difficulty: 3,
          taunt: "Gold for beggars! Madness!",
        },
        {
          claim:
            "Exile will break him. Stripped of his see, dying on a frontier road, he will curse the day he crossed the throne. No man gives thanks in ruin.",
          options: [
            {
              text: "He will give thanks even there — 'Glory to God for all things.' The Christian's treasure is not the see but the Lord; what man takes away, God restores a hundredfold.",
              correct: true,
              rationale:
                "Chrysostom died in exile at Comana in 407 with these words on his lips. The doxology in all circumstances is the heart of his teaching (cf. 1 Thess 5:18).",
            },
            {
              text: "You are right; loss of office is the end of a churchman.",
              correct: false,
              rationale:
                "The office serves Christ; it is not the Christian's life. 'For me to live is Christ, and to die is gain' (Phil 1:21).",
            },
            {
              text: "A true bishop would compromise to keep his throne.",
              correct: false,
              rationale:
                "To keep an office by betraying the truth is to lose the soul (Mark 8:36).",
            },
            {
              text: "Suffering proves God has abandoned him.",
              correct: false,
              rationale:
                "The opposite — 'whom the Lord loveth He chasteneth' (Heb 12:6). The martyrs and confessors suffer in God's favor, not His absence.",
            },
          ],
          difficulty: 2,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "John was exiled, recalled when the people rioted and an earthquake frightened the court, then exiled again — farther this time, to the bleak edge of the empire. His guards drove the sick old man on foot through summer heat and autumn rains, refusing him rest, until he collapsed at a little chapel in Comana.",
      },
      {
        speaker: "narrator",
        text: "There, knowing the end had come, he asked for white baptismal robes, received the holy Mysteries, and spoke the doxology he had taught a whole city to say in every sorrow: 'Glory to God for all things.' And so he died.",
      },
      {
        speaker: "you",
        text: "Glory to God — even for that? Even for the road that killed him?",
      },
      {
        speaker: "st-anthony",
        text: "Even for that. It is the hardest and the highest prayer, $you: to bless God not only in the harvest but in the famine, not only on the throne but on the exile's road. The empress's power could march him to his death; it could not wring one curse from his lips.",
      },
      {
        speaker: "narrator",
        text: "Thirty-one years later, the city that had failed him brought his relics home in triumph, and a later emperor — Eudoxia's own son — begged forgiveness in his mother's name before the body of the saint.",
      },
      {
        speaker: "st-anthony",
        text: "And his Divine Liturgy is sung in Orthodox churches across the whole world to this very hour — every Sunday, in a hundred tongues. Power exiled the man; it could not silence the prayer. Come now to Ephesus, where the Mother of God is about to be given her true and ancient name.",
      },
    ],
    reward: { xp: 1, item: "epitrachelion", healHp: true },
  },

  // =========================================================================
  // CHAPTER 105 — THE COUNCIL OF EPHESUS & ST. CYRIL (AD 431)
  // 5th century. Theotokos defined against Nestorius. (Precedes Chalcedon 451.)
  // =========================================================================
  {
    id: "ch105-ephesus",
    number: 105,
    era: "AD 431",
    location: "Third Ecumenical Council, the Church of St. Mary, Ephesus",
    title: "The God-Bearer",
    background: "council-hall",
    ally: "st-cyril",
    intro: [
      {
        speaker: "narrator",
        text: "Ephesus — the great city of Asia, where Paul once silenced the silversmiths of Artemis, and where, ancient tradition holds, the Theotokos lived her last years under the care of John the beloved disciple. Two hundred bishops gather in the basilica that bears her name, the Church of Saint Mary. Outside, the whole city waits through the long summer day, anxious for word.",
      },
      {
        speaker: "st-cyril",
        text: "I am Cyril, archbishop of Alexandria. A new error has come from the capital itself. Nestorius, archbishop of Constantinople, forbids the people to call the Virgin Theotokos — God-bearer. He will allow only 'Christ-bearer,' Christotokos.",
      },
      {
        speaker: "you",
        text: "Is that not a small thing — a quarrel over a single title for Mary?",
      },
      {
        speaker: "st-cyril",
        text: "It is no small thing, and it is not first of all about Mary. It is about her Son. Nestorius teaches that she bore only a man, Jesus, to whom God the Word was afterward joined — dwelling in him as in a temple, as one might dwell in a house. Two sons, he makes: the man whom Mary bore, and the God who came to lodge in him.",
      },
      {
        speaker: "st-anthony",
        text: "Mark the danger, $you. If Mary did not bear God-made-flesh, then God did not truly become man — He only drew near to a man. And if God did not truly become man, then man is not truly joined to God, and we are not saved. The whole Incarnation hangs on this one word. The title of the Mother is the shield of her Son's divinity.",
      },
      {
        speaker: "you",
        text: "But how can a woman be the mother of God, who has no beginning? That is the part I do not understand.",
      },
      {
        speaker: "st-cyril",
        text: "A mother does not give birth to a nature, $you — she gives birth to a person, a someone. And the someone she bore is the eternal Word, now made flesh. We do not say the Godhead took its beginning from her; God is without beginning. We say that He who is God took His flesh from her. She bore a Person, and that Person is God. Therefore she is truly Theotokos.",
      },
      {
        speaker: "st-cyril",
        text: "Confess it with me: one Lord Jesus Christ, the Word made flesh; one Son, not two; and she who bore Him in the flesh truly bore God in the flesh. I have sent Nestorius twelve anathemas. He will not yield. So the Council must speak.",
      },
      {
        speaker: "narrator",
        text: "Word arrives that the people are massing in the streets with lamps and torches, weeping and praying, terrified that the bishops will strip the Virgin of her honor. A learned partisan of Nestorius pushes through to you, certain the new title is a reckless overreach that makes a creature into a goddess.",
      },
      {
        speaker: "eutyches",
        text: "I speak for Archbishop Nestorius, and for plain sense. Mary is the mother of Christ — Christotokos — and that is honor enough. How can a creature be the mother of her own Creator? How can the eternal God have a birthday? You make the Virgin a fourth person of the Godhead, a pagan goddess in a Christian veil. Answer me — if Cyril has not already blinded your reason.",
      },
    ],
    boss: {
      id: "boss-nestorian",
      name: "The Nestorian Advocate",
      title: "Partisan of Constantinople",
      tradition: "Nestorian Heresy",
      sprite: "eutyches",
      maxHp: 235,
      intro:
        "Two natures, two persons: the man Jesus, and the Word who dwelt in him. Mary bore the man. Call her Christotokos and have done with this 'God-bearer.'",
      midline:
        "You speak like Cyril. But how can the impassible Word be 'born' or 'die'? You attribute to God what belongs to the man!",
      outro:
        "Anathema upon Nestorius... 'one and the same Son'... I had torn the seamless robe of Christ in two.",
      victoryEpigraph: {
        text:
          "If anyone does not confess that Emmanuel is truly God, and that the holy Virgin is therefore Theotokos (for she bore in a fleshly way the Word of God become flesh), let him be anathema.",
        source: "St. Cyril of Alexandria, First Anathema against Nestorius (431)",
      },
      attacks: [
        {
          claim:
            "A mother gives a nature, and a creature cannot be mother of the divine nature. So Mary is mother of the man only — Christotokos, not Theotokos.",
          options: [
            {
              text: "A mother is mother of a Person, not of a nature. She bore the one Person who is God the Word made flesh — therefore she is truly Theotokos, God-bearer.",
              correct: true,
              rationale:
                "Cyril against Nestorius (defined at Ephesus, 431): mothers bear persons, not abstract natures. She bore the incarnate Word, who is one Person, fully God and fully man.",
            },
            {
              text: "She is mother of His divinity, which therefore began in time.",
              correct: false,
              rationale:
                "Blasphemy. The Godhead is eternal and took no origin from Mary; He who is eternally God took flesh from her.",
            },
            {
              text: "She is mother of the man Jesus, to whom God was merely joined.",
              correct: false,
              rationale:
                "This is the Nestorian error — it divides Christ into two sons and undoes the Incarnation.",
            },
            {
              text: "Theotokos means Mary is herself a goddess.",
              correct: false,
              rationale:
                "A common misunderstanding. The title is about WHOM she bore, not about her own nature; it is Christological.",
            },
          ],
          difficulty: 4,
          taunt: "Mother of God! As if God had a beginning!",
        },
        {
          claim:
            "You say 'God was born' and 'God died.' Impossible! The divine nature cannot be born or suffer. These belong to the man alone.",
          options: [
            {
              text: "By the communication of idioms we rightly say God was born and God suffered — not in His divine nature, but because the one Person, who is God, was born and suffered in the flesh He assumed.",
              correct: true,
              rationale:
                "The communicatio idiomatum: properties of each nature are predicated of the single Person (Cyril; later affirmed at Chalcedon). 'The Lord of glory was crucified' (1 Cor 2:8).",
            },
            {
              text: "Then admit there are two persons — the man suffered, the Word did not.",
              correct: false,
              rationale:
                "Nestorianism — splits Christ into two sons. It was the single Person, who is God, who suffered in His humanity.",
            },
            {
              text: "The divine nature itself was born and died.",
              correct: false,
              rationale:
                "Theopaschism in the heretical sense. The divine nature is impassible; the Person suffered in the flesh.",
            },
            {
              text: "Christ only appeared to be born and to suffer.",
              correct: false,
              rationale: "Docetism — denied since Ignatius. He was truly born and truly died.",
            },
          ],
          difficulty: 5,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "When the Council confessed the Virgin as Theotokos and deposed Nestorius, the news ran out into the streets. The whole city erupted in joy. The people of Ephesus escorted the bishops to their lodgings by torchlight through the night, swinging censers before them, crying out the name of the Mother of God until dawn.",
      },
      {
        speaker: "you",
        text: "All this — for the honor of one title?",
      },
      {
        speaker: "st-cyril",
        text: "For the honor of her Son in her. They sensed, even those who could not have argued it, that to lose her name was to lose His nature. One Lord, one Christ, one Son — and His Mother truly the God-bearer. Hold this fast.",
      },
      {
        speaker: "st-anthony",
        text: "But the road of the councils is narrow on both sides, $you. Today you fought a man who divided Christ into two. Twenty years hence, at Chalcedon, the danger will run the opposite way — men who melt the two natures into one, and so dissolve His humanity altogether.",
      },
      {
        speaker: "st-cyril",
        text: "Guard the balance. Christ is one Person in two natures — fully God, fully man, without confusion and without division. Bear that truth onward. Far ahead lies a confessor who will lose his very tongue rather than let it be obscured.",
      },
    ],
    reward: { xp: 1, item: "icon-theotokos", healHp: true },
  },

  // =========================================================================
  // CHAPTER 106 — ST. MAXIMUS THE CONFESSOR & CONSTANTINOPLE III (AD 662/681)
  // 7th century. Two wills in Christ; Monothelitism refuted.
  // =========================================================================
  {
    id: "ch106-maximus",
    number: 106,
    era: "AD 662",
    location: "A prison cell, Constantinople",
    title: "The Tongue and the Hand",
    background: "interrogation",
    ally: "st-anthony",
    intro: [
      {
        speaker: "narrator",
        text: "A cold stone cell in Constantinople. An old monk sits very straight on the bench, hands folded in his lap, his face hollowed by years of hardship. He was once a high official in the imperial palace, secretary to an emperor — and gave it all up for the monastery. Now he is past seventy, dragged across the empire and back, tried, beaten, tried again.",
      },
      {
        speaker: "st-anthony",
        text: "Maximus, called the Confessor, $you. He has fought the heretics with his pen across three continents, from Africa to Rome to here. The emperor and the patriarch alike now command one thing of him: silence, on a single question.",
      },
      {
        speaker: "you",
        text: "What question could be worth all this — the prison, the beatings, an old man hauled across the world?",
      },
      {
        speaker: "st-anthony",
        text: "Whether Christ has one will, or two. The empire is torn — half of Egypt and Syria reject Chalcedon, holding to one nature in Christ. To win them back, the emperor's theologians crafted a compromise: grant two natures, as Chalcedon said, but confess only one will, one operation. One activity in the Saviour. They call it peace.",
      },
      {
        speaker: "you",
        text: "And is it not? If it heals the schism and harms no one?",
      },
      {
        speaker: "st-anthony",
        text: "It harms everyone, $you, for it is false. The will belongs to the nature, not merely to the person. If Christ has a complete human nature, He must have a human will — or His humanity is a hollow mask. And what is not assumed is not healed. If He did not take our willing, our willing — the very thing that fell in Eden — is not saved.",
      },
      {
        speaker: "narrator",
        text: "The old monk speaks, his voice quiet but utterly without fear. 'They tell me the Roman see has signed it, the patriarchs have signed it. They ask why I alone hold out. But truth is not counted by heads. If the whole world should commune with the patriarch in this, I would not — for the Apostle anathematizes even an angel that preaches another gospel.'",
      },
      {
        speaker: "narrator",
        text: "'In Gethsemane,' Maximus goes on, 'the Lord prayed, \"Let this cup pass — yet not my will, but Thine.\" Whose was the will that shrank, and then submitted? It was His own human will, real and entire, freely bowing to the divine. There — in that prayer — our broken willing was made whole. Take that human will from Christ, and you take away my salvation.'",
      },
      {
        speaker: "st-anthony",
        text: "They will tell you a mere monk, a layman in their eyes, has no right to overrule emperors and patriarchs. They will threaten the tongue that argues and the hand that writes. Stand with him, $you. The Sixth Ecumenical Council, two decades hence, will read his every word aloud and vindicate it — but he will not live to see it.",
      },
      {
        speaker: "iconoclast",
        text: "Monk's friend. Be reasonable. The Emperor himself and the Patriarch of this city have decreed one will in Christ, for the peace of a bleeding empire. Who are you — who is this broken old man — to set your private judgment against the throne and the altar together? Obedience is a Christian virtue, is it not? Recant — or the old man loses what speaks and what writes, and so, perhaps, do you.",
      },
    ],
    boss: {
      id: "boss-monothelite",
      name: "The Imperial Examiner",
      title: "Agent of the Monothelite Court",
      tradition: "Monothelite Heresy",
      sprite: "iconoclast",
      maxHp: 245,
      intro:
        "One Christ, one will — so says the Emperor, so says the Patriarch. Two wills would tear the Saviour in two. Submit to the powers God has set over you.",
      midline:
        "You will not bend? Then the old man's tongue and right hand are forfeit. Still you speak!",
      outro:
        "Cut out his tongue, then; sever his hand. ...Yet they say he wrote on, by another's pen, and the Sixth Council will read every line aloud.",
      victoryEpigraph: {
        text:
          "If anyone does not confess two natural wills and two natural operations in our one Lord Jesus Christ... let him be anathema.",
        source: "Third Council of Constantinople, Sixth Ecumenical (681)",
      },
      attacks: [
        {
          claim:
            "Christ is one Person; therefore He has one will. Two wills would mean two persons warring within Him. Confess one will and have peace.",
          options: [
            {
              text: "Will belongs to nature, not to person. As Christ has two natures, He has two natural wills — divine and human — never in conflict, the human freely submitting to the divine.",
              correct: true,
              rationale:
                "Maximus's teaching, defined at Constantinople III (681): the will is a faculty of nature. Two natures means two wills, in perfect concord, not two persons.",
            },
            {
              text: "Yes, one Person means one will, the divine alone.",
              correct: false,
              rationale:
                "Monothelitism, condemned in 681. A Christ without a human will is not fully human — and 'what is not assumed is not healed' (Gregory the Theologian).",
            },
            {
              text: "His two wills constantly fought each other.",
              correct: false,
              rationale:
                "The wills never conflict; in Gethsemane the human will freely yields: 'not my will, but Thine, be done' (Luke 22:42).",
            },
            {
              text: "He had a human will but no divine will.",
              correct: false,
              rationale:
                "This would deny His divinity. The one Christ wills as God and wills as man, the two in harmony.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "In Gethsemane Christ prayed, 'Let this cup pass.' If His will simply equaled the Father's, the prayer is empty playacting. So He has one will after all.",
          options: [
            {
              text: "His true human will naturally shrank from death, yet freely submitted: 'nevertheless, not my will but Thine be done.' This shows a real human will, healed and obedient — not abolished.",
              correct: true,
              rationale:
                "Maximus's reading of Gethsemane (Luke 22:42): a genuine human will, with its natural recoil from death, freely conformed to the divine will — the very salvation of our fallen willing.",
            },
            {
              text: "It proves He had only the divine will and was merely pretending to struggle.",
              correct: false,
              rationale:
                "Docetism of the will. The agony was real; a real human will truly submitted.",
            },
            {
              text: "It proves the human will overrode the divine.",
              correct: false,
              rationale:
                "Impossible — the human will yielded TO the divine. There is harmony, not contest.",
            },
            {
              text: "Christ was simply uncertain of the Father's plan.",
              correct: false,
              rationale:
                "He is the omniscient Word; the prayer reveals the obedience of His human will, not ignorance.",
            },
          ],
          difficulty: 5,
          taunt: "One will! The Emperor has spoken!",
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "They cut out the tongue that would not be silent and severed the hand that would not stop writing, and exiled the old man to the Caucasus, where he soon died. He was right. In 681 the Sixth Ecumenical Council confessed two wills and two operations in Christ — exactly as Maximus had borne witness, alone, against the world.",
      },
      {
        speaker: "st-anthony",
        text: "A layman's tongue is not so easily silenced, $you, when it speaks the truth. The Church remembers the Confessor and forgets the emperors who tried to break him. Come — to the Slavs, who are about to receive the Word in their own tongue.",
      },
    ],
    reward: { xp: 1, item: "philokalia", healHp: true },
  },

  // =========================================================================
  // CHAPTER 107 — STS. CYRIL & METHODIUS AND THE SLAVS (AD 867, Rome/Moravia)
  // 9th century. The Word given to the Slavs in their own tongue.
  // =========================================================================
  {
    id: "ch107-cyril-methodius",
    number: 107,
    era: "AD 867",
    location: "Rome, before the relics of St. Clement",
    title: "The Tongue of the Slavs",
    background: "council-hall",
    ally: "st-anthony",
    intro: [
      {
        speaker: "narrator",
        text: "Rome. Two brothers from Thessalonica stand in the basilica, having carried the relics of St. Clement all the way from the Crimea. The younger, Constantine — soon to take the monastic name Cyril — has done something no man dared before: he has made an alphabet for a people who had none, and put the Gospel into it.",
      },
      {
        speaker: "st-anthony",
        text: "Cyril and Methodius, $you, sent by Constantinople to the Slavs of Moravia. They translated the Scriptures and the Liturgy into the Slavonic tongue. But the Frankish clergy are furious — they hold that God may be worshipped in three languages only: Hebrew, Greek, and Latin. They call it the 'trilingual heresy.'",
      },
      {
        speaker: "narrator",
        text: "Cyril turns from the altar. 'Does not the rain fall on all alike? Does not the sun shine on all? Do we not all breathe the same air? How then are you not ashamed to allow only three tongues, and to leave all other peoples blind and deaf?'",
      },
      {
        speaker: "st-anthony",
        text: "A Frankish priest comes to confront you, certain that letting barbarians hear the Liturgy in their own crude speech profanes the holy things. Defend the brothers' work, $you — for on it hangs the faith of nations not yet born: the Bulgarians, the Serbs, the Rus.",
      },
      {
        speaker: "humbert",
        text: "These Greeks corrupt the sacred mysteries by babbling them in the tongue of savages. God is praised in three holy languages — Hebrew, Greek, Latin — written above the Lord's own Cross. Who are these brothers to add a fourth? Speak, and defend this profanation if you can.",
      },
    ],
    boss: {
      id: "boss-trilingualist",
      name: "The Frankish Archpriest",
      title: "Defender of the Three Tongues",
      tradition: "The Trilingual Error",
      sprite: "humbert",
      maxHp: 215,
      intro:
        "Pilate wrote the title in Hebrew, Greek, and Latin alone. These three God has hallowed; the rest are fit only for the marketplace. The Liturgy in Slavonic is a sacrilege.",
      midline:
        "You quote the Apostle against me? Hm. Perhaps the Pope will not so easily forbid these brothers after all.",
      outro:
        "Then let the Slavs have their letters... The Bishop of Rome himself has blessed their books. I am overruled by Peter's chair.",
      victoryEpigraph: {
        text:
          "I would rather speak five words with my understanding, that I might teach others also, than ten thousand words in an unknown tongue.",
        source: "St. Paul, 1 Corinthians 14:19",
      },
      attacks: [
        {
          claim:
            "Worship belongs in Hebrew, Greek, and Latin — the three tongues of the Cross's title. To translate the holy mysteries into Slavonic profanes them. Was Pilate's board not divinely arranged?",
          options: [
            {
              text: "At Pentecost the Spirit gave the Apostles every tongue, that each man heard the wonders of God in his own language (Acts 2). The Gospel is for all nations; no people is too lowly to hear God speak their own words.",
              correct: true,
              rationale:
                "Cyril's defense of vernacular worship rests on Pentecost (Acts 2:4–11) and 1 Cor 14. The 'trilingual heresy' was rejected; Pope Adrian II blessed the Slavonic books.",
            },
            {
              text: "You are right — only three sacred languages may be used in worship.",
              correct: false,
              rationale:
                "The 'trilingual heresy,' which Cyril refuted. The Church has no command restricting worship to three tongues.",
            },
            {
              text: "The language does not matter because the rite does not matter.",
              correct: false,
              rationale:
                "The opposite of Cyril's point — the rite matters supremely, which is why each people should understand it.",
            },
            {
              text: "Only Greek is sacred, as the language of the New Testament.",
              correct: false,
              rationale:
                "The New Testament itself records the Spirit speaking in many tongues at Pentecost; the Gospel went out in many languages from the first.",
            },
          ],
          difficulty: 3,
          taunt: "Three tongues! Pilate wrote three!",
        },
        {
          claim:
            "The common folk cannot grasp the mysteries; better they hear holy words they do not understand, and trust their betters. Worship in their own tongue breeds error.",
          options: [
            {
              text: "Paul preferred five intelligible words to ten thousand in an unknown tongue, that the people might be edified (1 Cor 14:19). Worship is offered by the whole people, not muttered over their heads.",
              correct: true,
              rationale:
                "1 Cor 14 is the charter of intelligible worship. Cyril and Methodius gave the Slavs Scripture and Liturgy precisely so the people could understand and respond.",
            },
            {
              text: "Correct — the people are better off not understanding.",
              correct: false,
              rationale:
                "Contrary to 1 Cor 14:16–17: how shall the unlearned say 'Amen' if he does not understand?",
            },
            {
              text: "Understanding is unnecessary because faith is purely emotional.",
              correct: false,
              rationale:
                "We worship 'with the spirit and with the understanding also' (1 Cor 14:15) — both, not one.",
            },
            {
              text: "Only clergy need understand; the laity are spectators.",
              correct: false,
              rationale:
                "The faithful are a royal priesthood (1 Peter 2:9) who offer the Liturgy together; the people's 'Amen' is essential.",
            },
          ],
          difficulty: 3,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "The Pope himself blessed the Slavonic books, laying them upon the altar. Cyril died in Rome and was buried beside St. Clement; Methodius returned north as archbishop. Their alphabet and translations became the seed of the faith for the Bulgarians, the Serbs, and one day the Rus.",
      },
      {
        speaker: "st-anthony",
        text: "They are honored together as Equals-to-the-Apostles, $you — the teachers of the Slavs. The Word they planted in a new tongue will outlast every empire. Come; in this same age a great patriarch defends the Creed itself against a new addition.",
      },
    ],
    reward: { xp: 1, item: "synodikon", healHp: true },
  },

  // =========================================================================
  // CHAPTER 108 — ST. PHOTIOS THE GREAT (AD 879, Constantinople)
  // 9th century. The Filioque rejected; the Photian council vindicates the Creed.
  // =========================================================================
  {
    id: "ch108-photios",
    number: 108,
    era: "AD 879",
    location: "Hagia Sophia, the Reunion Council, Constantinople",
    title: "From the Father",
    background: "hagia-sophia",
    ally: "st-mark-ephesus",
    intro: [
      {
        speaker: "narrator",
        text: "Hagia Sophia. The great dome floats overhead like the very vault of heaven. A council of nearly four hundred bishops, East and West together, with the legates of Pope John VIII present. At its head sits Photios — patriarch, scholar, the most learned man of his age.",
      },
      {
        speaker: "st-anthony",
        text: "Photios the Great, $you. He has seen a poison creeping into the West: a single word added to the Creed — Filioque, 'and from the Son.' Where the Fathers at Constantinople confessed the Spirit who proceeds from the Father, some now say 'from the Father AND the Son.' Photios sees the danger before almost anyone else.",
      },
      {
        speaker: "narrator",
        text: "Photios lifts a copy of the Creed. 'The Lord said the Spirit proceeds from the Father (John 15:26). To this the Second Council bound the whole Church, forbidding addition. To add a word, however pious it seems, is to set ourselves above an Ecumenical Council — and to confuse the Persons of the Trinity.'",
      },
      {
        speaker: "st-anthony",
        text: "A Frankish theologian, schooled in the new teaching, comes to argue that the addition only honors the Son. Hold to the Creed as the Fathers gave it, $you — for this small word will one day be the wound that splits the Church.",
      },
      {
        speaker: "humbert",
        text: "The Spirit proceeds from the Father AND the Son — does not Christ send the Spirit (John 16:7)? Our Latin Fathers confess it; our churches sing it. The Greeks are merely jealous of Rome. Defend your truncated Creed, if you dare.",
      },
    ],
    boss: {
      id: "boss-filioquist",
      name: "The Frankish Theologian",
      title: "Advocate of the Filioque",
      tradition: "The Filioque Innovation",
      sprite: "humbert",
      maxHp: 240,
      intro:
        "And from the Son! It honors Christ to say the Spirit proceeds from Him too. Why does the East cling to half the truth?",
      midline:
        "You distinguish 'procession' from 'sending'? A subtle Greek trick. Yet... the Council has not received our word.",
      outro:
        "The council stands by the Creed unaltered... 'who proceeds from the Father.' Rome's own legates have signed it. We have added what no council gave us.",
      victoryEpigraph: {
        text:
          "But when the Comforter is come... even the Spirit of truth, which proceedeth from the Father, he shall testify of me.",
        source: "The Lord Jesus Christ, John 15:26",
      },
      attacks: [
        {
          claim:
            "Christ sends the Spirit (John 16:7); therefore the Spirit proceeds from the Son as from the Father. The Filioque only states what Scripture implies.",
          options: [
            {
              text: "The eternal procession of the Spirit is from the Father alone (John 15:26); the temporal sending in time is through the Son. To confuse the two is to give the Spirit two sources and confound the Persons.",
              correct: true,
              rationale:
                "Photios's distinction: the Spirit's eternal procession (origin) is from the Father, the one source/monarchy of the Godhead; the Son sends the Spirit in the economy of salvation. The Filioque conflates origin with mission.",
            },
            {
              text: "You are right; the Spirit has His eternal origin from both Father and Son.",
              correct: false,
              rationale:
                "This is the Filioque, which gives the Spirit two principles and undermines the Father's unique monarchy as sole source within the Trinity.",
            },
            {
              text: "The Spirit proceeds from the Son alone.",
              correct: false,
              rationale:
                "Not even the Latins claimed this; the Lord Himself says 'from the Father' (John 15:26).",
            },
            {
              text: "Procession and sending mean exactly the same thing.",
              correct: false,
              rationale:
                "They do not. One concerns the Spirit's eternal origin; the other His mission in time. Collapsing them causes the error.",
            },
          ],
          difficulty: 5,
          taunt: "And from the Son! Rome sings it!",
        },
        {
          claim:
            "Even if the doctrine were debatable, surely a local church may improve the Creed's wording. Why make such war over a single inserted word?",
          options: [
            {
              text: "No single church may add to the Creed of an Ecumenical Council; the Third Council forbade altering it. The Creed is the common confession of the whole Church, not any one see's to amend.",
              correct: true,
              rationale:
                "Ephesus (431) forbade composing or imposing any other faith than the Niceno-Constantinopolitan Creed. A unilateral addition violates conciliar authority itself.",
            },
            {
              text: "Any bishop may revise the Creed as he sees fit.",
              correct: false,
              rationale:
                "This denies conciliar authority. The Creed binds the whole Church and can be altered only by the whole Church in council.",
            },
            {
              text: "The Creed is unimportant; words about God do not matter.",
              correct: false,
              rationale:
                "The Creed guards the faith itself; the Arian crisis showed that one word (homoousios) can carry the whole Gospel.",
            },
            {
              text: "Rome alone may change the Creed for everyone.",
              correct: false,
              rationale:
                "The 879–880 council, with Rome's own legates, reaffirmed the Creed unaltered. No single see stands above an Ecumenical Council.",
            },
          ],
          difficulty: 4,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "The Council of 879–880, with the legates of Pope John VIII assenting, confessed the Creed unchanged and condemned any addition to it. For a time, East and West stood together. But the Frankish word would spread, and Rome herself would one day adopt it — and the wound would not close.",
      },
      {
        speaker: "st-anthony",
        text: "Photios saw the storm while the sky was still clear. Two centuries hence a cardinal named Humbert will lay a bull of excommunication on this very altar over this very word. But that is a sorrow for another day. Come — north, to the Rus, who are about to choose their faith.",
      },
    ],
    reward: { xp: 1, item: "tome-leo", healHp: true },
  },

  // =========================================================================
  // CHAPTER 109 — THE BAPTISM OF RUS (AD 988, Kiev)
  // 10th century. St. Vladimir; "We knew not whether we were in heaven or earth."
  // =========================================================================
  {
    id: "ch109-rus",
    number: 109,
    era: "AD 988",
    location: "Kiev, the banks of the Dnieper",
    title: "Heaven on Earth",
    background: "hagia-sophia",
    ally: "st-anthony",
    intro: [
      {
        speaker: "narrator",
        text: "Kiev. A broad gray river under a wide sky. A prince stands on the bank — Vladimir, grandson of Olga, once a fierce pagan warlord with many wives and the blood of his brother on his hands. He has pulled down the idol of Perun and dragged it through the city to the river.",
      },
      {
        speaker: "st-anthony",
        text: "Vladimir, $you. He sent envoys to test the faiths — to the Bulgars who follow Muhammad, to the Germans with their Latin rite, to the Jews of the Khazars, and at last to Constantinople. When his men entered Hagia Sophia for the Divine Liturgy, they did not know whether they stood in heaven or on earth.",
      },
      {
        speaker: "narrator",
        text: "Vladimir turns to you. 'My grandmother Olga was wisest of all and chose this faith. My envoys say its worship is beauty itself. I have known war and women and gold, and none of it filled me. Today my people go down into this water, and I with them.'",
      },
      {
        speaker: "st-anthony",
        text: "A pagan priest of the old gods comes raging, certain the prince has betrayed the ancestors and doomed the land. Defend the prince's choice, $you — for from this river will flow the whole baptism of the Russian land, a thousand years of saints.",
      },
      {
        speaker: "tempter",
        text: "Traitor to the blood! Perun fed your fathers; the old gods gave Rus her swords and her sons. Now you drown them in a foreign river for a crucified slave-god of the Greeks. Why forsake the gods of your people? Speak — if the water has not already made you a coward.",
      },
    ],
    boss: {
      id: "boss-pagan-priest-rus",
      name: "Volkh the Volkhv",
      title: "Priest of the Old Gods",
      tradition: "Slavic Paganism",
      sprite: "tempter",
      maxHp: 220,
      intro:
        "Perun the Thunderer, Veles of the herds — these gods made Rus mighty. You trade them for a dead Jew on a cross. Madness! Defend this betrayal of the blood.",
      midline:
        "The prince's heart hardens against me... and the people follow him into the water, unafraid.",
      outro:
        "The idols float downriver, broken... and the people are not struck dead. Their faces shine. Perhaps the old gods were never gods at all.",
      victoryEpigraph: {
        text:
          "We knew not whether we were in heaven or on earth, for surely there is no such splendor or beauty anywhere on earth. We only know that God dwells there among men.",
        source: "Vladimir's envoys in Constantinople, Russian Primary Chronicle (c. 988)",
      },
      attacks: [
        {
          claim:
            "Your gods of wood and thunder fed your fathers for ages. Why abandon Perun and Veles, who never failed Rus in war?",
          options: [
            {
              text: "Perun was wood; Veles was stone. The living God made heaven and earth and became man to save us. Idols cannot save — but the Lord who rose from the dead is no work of human hands.",
              correct: true,
              rationale:
                "Vladimir's choice followed Olga's, and the envoys' testimony to the worship of the living God. The idols ('they have mouths but speak not,' Ps 115:5) are powerless; the Risen Christ is Lord.",
            },
            {
              text: "The old gods were real but the Greek God is stronger.",
              correct: false,
              rationale:
                "There is one God; the idols of the nations are nothing (1 Cor 8:4). It is not a contest of rival deities.",
            },
            {
              text: "All gods are equally true; we simply chose a new one.",
              correct: false,
              rationale:
                "Religious indifferentism. The Lord is God, and there is no other (Deut 4:39).",
            },
            {
              text: "We keep the old gods alongside the new one, to be safe.",
              correct: false,
              rationale:
                "Syncretism, forbidden by the First Commandment. Vladimir threw down the idols precisely to end this.",
            },
          ],
          difficulty: 2,
          taunt: "Perun! Perun will avenge this!",
        },
        {
          claim:
            "Your envoys chose this faith for its beauty alone — its golden church, its singing. Beauty is no proof of truth! You baptize a nation on the strength of pretty smoke.",
          options: [
            {
              text: "Beauty is no mere ornament but a window onto the truth — in the Liturgy the worship of heaven is made present on earth. 'O taste and see that the Lord is good' (Ps 34:8); the envoys tasted, and knew.",
              correct: true,
              rationale:
                "Orthodox theology holds beauty (the 'heaven on earth' of the Liturgy) as a true witness to God. The envoys' awe was a genuine perception of the divine, not mere aesthetics.",
            },
            {
              text: "You are right; beauty is irrelevant and the choice was foolish.",
              correct: false,
              rationale:
                "The beauty of worship reveals the truth it celebrates. Vladimir also weighed the witness of Olga and the prophets; it was not beauty alone.",
            },
            {
              text: "Only beauty matters; doctrine is unimportant.",
              correct: false,
              rationale:
                "The opposite error. The beauty of the Liturgy is inseparable from the true faith it confesses; both go together.",
            },
            {
              text: "Worship should be plain and ugly to avoid distraction.",
              correct: false,
              rationale:
                "Iconoclast minimalism. From the Tabernacle's gold (Exodus 25) onward, God has been worshipped in beauty.",
            },
          ],
          difficulty: 3,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "The people of Kiev went down into the Dnieper and were baptized, and Vladimir — the warlord — became a man of mercy, feeding the poor from his own table, hesitant even to execute criminals. The Church names him Equal-to-the-Apostles, and his grandmother Olga before him.",
      },
      {
        speaker: "st-anthony",
        text: "From this river, $you, a thousand years of Russian holiness will flow — Sergius, Seraphim, the Optina elders, and one day a host of new martyrs under a power that hates God. You have already met the end of that story in the cells of Moscow. The faith planted here will be watered in blood, and it will not die.",
      },
    ],
    reward: { xp: 1, item: "icon-christ", healHp: true },
  },
];
