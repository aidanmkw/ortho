import type { Chapter } from "@/lib/quest/types";

// ===========================================================================
// EXPANSION CHAPTERS 4 — the modern age, centuries 18–20.
//
// These chapters match the Chapter type in lib/quest/types.ts exactly and use
// only existing backgrounds, portrait ids, and item ids. `number` fields are
// placeholders (401+) for re-numbering on integration.
//
// Authored attacks are intentionally short (1–2 each); the battle engine
// auto-augments every boss with live spaced-repetition questions from the
// study corpus.
//
// Portrait notes: figures without a dedicated portrait id (St. Cosmas of
// Aetolia, St. Nicodemus the Hagiorite, St. Macarius of Corinth, Nicholas
// Motovilov, St. Silouan, St. Sophrony, St. Paisios, St. Porphyrios, St. John
// of Shanghai, the Optina elders, Dostoevsky) use "narrator" / "st-anthony" /
// "you", or "st-seraphim" where he himself speaks, or a descriptive speaker id
// that renders no portrait (acceptable). Bosses reuse the closest existing
// villain sprite ("tempter", "doubt", "atheist").
// ===========================================================================

export const EXPANSION_CHAPTERS_4: Chapter[] = [
  // =========================================================================
  // CHAPTER 401 — ST. COSMAS OF AETOLIA & THE KOLLYVADES (1714–1782)
  // 18th century. Preaching under the Ottoman yoke; the Philokalia compiled.
  // =========================================================================
  {
    id: "ch401-cosmas",
    number: 401,
    era: "AD 1779",
    location: "A village square in Ottoman Epirus, beneath a great plane tree",
    title: "The Wooden Cross and the Lamp",
    background: "desert",
    ally: "st-anthony",
    intro: [
      {
        speaker: "narrator",
        text: "Heat and dust and the smell of crushed olives. You stand at the edge of a poor village in the mountains of Epirus, under a sky the color of beaten brass. A great plane tree spreads its shade over the square, and beneath it a crowd has gathered — peasants in homespun, shepherds smelling of their flocks, women with infants on their hips. They have walked all night down from the hills.",
      },
      {
        speaker: "narrator",
        text: "It is the year of our Lord seventeen hundred and seventy-nine. For three centuries this land has lain under the Ottoman yoke. The churches stand half-ruined; the children grow up scarcely knowing the Creed; some cannot make the sign of the cross. And yet — the people have come. Thousands of them, silent, waiting.",
      },
      {
        speaker: "st-anthony",
        text: "Look there, $you — the barefoot monk planting a tall wooden cross in the dust, climbing onto a low stool beside it. Cosmas of Aetolia. Once a teacher on Mount Athos, now he walks from village to village with the Patriarch's blessing, opening schools and calling the people back from the edge of forgetting.",
      },
      {
        speaker: "you",
        text: "Why does he go barefoot? A teacher from the Holy Mountain — surely he could preach from a pulpit in a great city.",
      },
      {
        speaker: "st-anthony",
        text: "He left the Mountain and all its quiet for love of these forgotten ones. Hear him yourself; he is beginning.",
      },
      {
        speaker: "narrator",
        text: "Cosmas raises a thin brown hand, and the murmur dies away. 'My brethren and my children,' he calls, 'I have left Athos and every comfort for love of you. Listen: build a school in every parish. Without letters the children walk in darkness, and a soul that does not know God is poorer than the beggar who sleeps at your gate.'",
      },
      {
        speaker: "narrator",
        text: "An old woman near you weeps openly. A shepherd lifts his son onto his shoulders so the boy can see. The monk speaks of baptizing the unbaptized, of keeping the fasts, of frequent communion — of holding fast to Christ though the Sultan's tax-collectors take everything else.",
      },
      {
        speaker: "narrator",
        text: "'My child,' Cosmas says to a trembling girl, 'guard your faith and your freedom as you guard your eyes. The Faith of Christ, my brethren, is sweeter than honey, more precious than gold. Better to lose your fields and your flocks than to lose your soul.'",
      },
      {
        speaker: "you",
        text: "The people are so poor, and he asks them to give what little they have to build schools. Will they not resent it?",
      },
      {
        speaker: "st-anthony",
        text: "On the contrary — they sell their last ornaments to raise the schoolhouses. He has founded more than two hundred. Where he passes, the children begin to read again, and the Liturgy is sung where it had fallen silent. He will be called Equal-to-the-Apostles for this.",
      },
      {
        speaker: "you",
        text: "He speaks much of prayer of the heart. What does he mean?",
      },
      {
        speaker: "st-anthony",
        text: "The unceasing prayer of the Name — 'Lord Jesus Christ, Son of God, have mercy on me.' And he is not alone in this labor. Far off on the Holy Mountain, two others work in the same Spirit: Nicodemus the Hagiorite and Macarius of Corinth. Even now they gather the writings of the Fathers on this prayer into one great book.",
      },
      {
        speaker: "you",
        text: "A book? What do they call it?",
      },
      {
        speaker: "st-anthony",
        text: "The Philokalia — 'the love of the beautiful.' In three years' time it will be printed in Venice, and it will set the whole Orthodox world aflame with prayer. But mark this, $you: the age now dawning in the West calls such prayer the muttering of peasants. It trusts only in reason, and it is coming even here.",
      },
      {
        speaker: "narrator",
        text: "As if summoned by the word, a man pushes forward through the ragged crowd. He is dressed in the coat and powdered manner of a gentleman schooled in the cities of Europe, and he looks upon the barefoot monk and the unlettered peasants with open contempt.",
      },
      {
        speaker: "atheist",
        text: "Old man! You fill these wretches' heads with demons and endless whispered prayers while Europe wakes to reason and the rights of man. Why drag a conquered people backward into monkish dreams? Tell me — if your 'prayer of the heart' is anything more than the babble of slaves who have nothing better to do.",
      },
      {
        speaker: "st-anthony",
        text: "He will not be answered by Cosmas, $you — he has fixed his eyes on you, the stranger. Stand, and answer him. The whole square is listening.",
      },
    ],
    boss: {
      id: "boss-enlightenment-rationalist",
      name: "The Enlightened Gentleman",
      title: "Apostle of Reason",
      tradition: "Enlightenment Rationalism",
      sprite: "atheist",
      maxHp: 210,
      intro:
        "Your people are crushed, ignorant, hopeless. Teach them mathematics and the rights of man, not the Jesus Prayer. What use is 'unceasing prayer' to a slave of the Sultan?",
      midline:
        "You answer like the monks of the Mountain. But reason marches on, old man, and your candle gutters in its wind.",
      outro:
        "Strange — the people leave fed, not flattered. They had nothing, and he has given them everything. Perhaps a lamp lit within outlasts my brighter, colder torch.",
      victoryEpigraph: {
        text:
          "You should not labor to be enriched only with letters and the wisdom of this age, but also with the wisdom of God; for the wisdom of this world is foolishness before God.",
        source: "St. Cosmas of Aetolia, Teaching (18th c.)",
      },
      attacks: [
        {
          claim:
            "This 'prayer of the heart,' this endless 'Lord Jesus Christ, have mercy' — it is the babble of idle monks. The Philokalia is a museum of superstition. Real men act in the world; they do not whisper to themselves.",
          options: [
            {
              text: "The Jesus Prayer is the obedience of 'pray without ceasing' (1 Thess 5:17) — the mind descending into the heart to stand before God. The Philokalia gathers the Fathers' counsel on this watchful, sober prayer; it is not idleness but the hardest of labors.",
              correct: true,
              rationale:
                "The Philokalia (compiled by Sts. Nicodemus the Hagiorite and Macarius of Corinth, published Venice 1782) collects the hesychast Fathers on noetic prayer and watchfulness (nepsis). The Jesus Prayer fulfills 1 Thess 5:17 and is the Church's ancient practice, not superstition.",
            },
            {
              text: "You are right; such prayer is for cloistered monks alone and has no place among ordinary Christians.",
              correct: false,
              rationale:
                "The Kollyvades fathers and St. Cosmas urged frequent communion and the Jesus Prayer for all the faithful, not monks only. The call to unceasing prayer is given to the whole Church.",
            },
            {
              text: "Prayer is merely a psychological technique to calm the nerves.",
              correct: false,
              rationale:
                "The Jesus Prayer is communion with the living God, not a relaxation method. Its end is union with Christ and the vision of His uncreated light.",
            },
            {
              text: "Words are unnecessary; one need only think kind thoughts.",
              correct: false,
              rationale:
                "The Church prays the Name of Jesus, in which alone is salvation (Acts 4:12). The prayer invokes a Person, not a mood.",
            },
          ],
          difficulty: 3,
          taunt: "Muttering slaves! Reason marches on!",
        },
        {
          claim:
            "Your nation is conquered, your churches in ruins, your children unlettered. God has plainly abandoned you. Despair is the only honest response to three hundred years of the yoke.",
          options: [
            {
              text: "We build schools, baptize the children, and keep the faith precisely under the yoke — 'tribulation worketh patience; and patience, hope' (Rom 5:3–4). Cosmas himself foretold our deliverance; the cross precedes the resurrection, never the other way.",
              correct: true,
              rationale:
                "St. Cosmas founded over two hundred schools and is remembered for prophecies of Greek liberation. Orthodox hope under the Tourkokratia rested on the Resurrection, not on present fortune; despair is a temptation, not a verdict.",
            },
            {
              text: "You are right; a conquered people has nothing left but to despair.",
              correct: false,
              rationale:
                "Despair (the spirit of accidie) is reckoned among the deadly passions by the Fathers. The martyr-nation's hope is in Christ, who overcame the world (John 16:33).",
            },
            {
              text: "Suffering proves God does not exist at all.",
              correct: false,
              rationale:
                "The Cross stands at the center of the faith; God Himself entered suffering to redeem it. Affliction is not the absence of God but often the place of His nearest presence.",
            },
            {
              text: "We should abandon the faith and adopt the conqueror's religion to prosper.",
              correct: false,
              rationale:
                "The neo-martyrs of the Ottoman period chose death over apostasy; St. Cosmas strengthened the people to hold fast. 'What shall it profit a man, if he gain the whole world, and lose his own soul?' (Mark 8:36).",
            },
          ],
          difficulty: 3,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "The gentleman departs without a word, but you see him pause at the edge of the square — turning once to watch the people stream away from the plane tree, fed and weeping and unafraid. They came with nothing; they leave with everything.",
      },
      {
        speaker: "narrator",
        text: "Cosmas of Aetolia comes down from his stool and lays a worn hand upon your shoulder. 'Well spoken, my child. The wisdom of this world is foolishness before God. Seek the wisdom of God, and you will fear nothing under heaven — not even the rope.'",
      },
      {
        speaker: "st-anthony",
        text: "He speaks of the rope, $you, because he knows. Later this very year the Ottomans will hang him, betrayed by men who feared his influence over the people. He dies a hieromartyr, blessing his executioners.",
      },
      {
        speaker: "you",
        text: "And the schools? The book? Does it all die with him?",
      },
      {
        speaker: "st-anthony",
        text: "No. In seventeen eighty-two the Philokalia is printed in Venice, and from these two springs — his preaching and that book — the prayer of the heart is rekindled across the whole Orthodox world. The book travels north, translated into Slavonic and into Russian.",
      },
      {
        speaker: "st-anthony",
        text: "And in a frozen forest hermitage to the north, a man will pray it so deeply that his very body shines like the sun on snow. Come, $you. We go to Sarov.",
      },
    ],
    reward: { xp: 1, item: "philokalia", healHp: true },
  },

  // =========================================================================
  // CHAPTER 402 — ST. SERAPHIM OF SAROV (1759–1833)
  // 19th century. "Acquire the Spirit of peace"; the Motovilov conversation.
  // =========================================================================
  {
    id: "ch402-seraphim",
    number: 402,
    era: "AD 1831",
    location: "A snow-bound clearing near the Sarov hermitage, Russia",
    title: "Acquire the Spirit of Peace",
    background: "void",
    ally: "st-seraphim",
    intro: [
      {
        speaker: "narrator",
        text: "The book closes on Epirus, and when it opens again you are standing knee-deep in snow. A Russian forest in the dead of winter — birches white against white, the silence so complete you can hear your own heart. The cold bites through everything. It is the year eighteen hundred and thirty-one.",
      },
      {
        speaker: "narrator",
        text: "In a small clearing sits a bent old monk on a tree-stump. He wears a white peasant's smock, a sack upon his back, an axe tucked in his belt. His face is round and seamed and luminous, and though the cold should kill a man his age, he seems not to feel it at all.",
      },
      {
        speaker: "st-seraphim",
        text: "My joy! Christ is risen! Come closer, come — sit beside me on this stump. Do not fear the cold, my joy. Acquire the Spirit of peace, and thousands around you will be saved.",
      },
      {
        speaker: "you",
        text: "He calls me 'my joy'... and he greets me with the Paschal cry, in the depth of winter.",
      },
      {
        speaker: "st-anthony",
        text: "Seraphim of Sarov. He greets every soul, in every season, with 'My joy, Christ is risen!' For years he lived alone as a hermit deep in these woods — he fed the wild bears from his hand, and knelt a thousand days and nights upon a bare stone in prayer. He has read the Philokalia until it has become his very breath.",
      },
      {
        speaker: "you",
        text: "A thousand nights on a stone? Robbers might have come, or wild beasts. Was he never afraid out here alone?",
      },
      {
        speaker: "st-anthony",
        text: "Robbers did come once, and beat him so cruelly that he was bent for the rest of his life — you see how he stoops. Yet when they were caught he begged that they be spared. The man you are looking at has made himself a furnace of forgiveness. Such a soul the demons cannot abide.",
      },
      {
        speaker: "you",
        text: "And the man kneeling beside him in the snow?",
      },
      {
        speaker: "st-anthony",
        text: "Nicholas Motovilov, a landowner whom the elder healed of a long sickness. He has come with a question that has troubled him for years — what is the true aim of the Christian life? Today the old man will not merely answer him. He will show him.",
      },
      {
        speaker: "st-seraphim",
        text: "My son Nicholas asks me the purpose of our life in Christ. Many say it is to pray, to fast, to keep the vigils and give alms. These are good — but they are the road, not the journey's end. The true aim of the Christian life is to acquire the Holy Spirit of God.",
      },
      {
        speaker: "you",
        text: "To acquire the Spirit — but how can a man see such a thing? How can he know he has it?",
      },
      {
        speaker: "st-seraphim",
        text: "You shall see, my joy. Only first there comes a testing. Be watchful.",
      },
      {
        speaker: "narrator",
        text: "Even as he speaks, a change creeps over the clearing. Not the honest cold of winter, but a heavier thing — a gray, listless weight settling on your shoulders, on your eyelids, on your very will. It whispers that the snow is endless, that prayer is wasted breath, that the smiling old man is only a fool freezing to death.",
      },
      {
        speaker: "st-anthony",
        text: "Mark it well, $you — this is no mere mood. The Fathers name it accidie, the noonday demon, the spirit of despondency. It would have you lay down your prayer rope and call all of this — the snow, the old man, the Risen Lord — a sad delusion. Stand fast. Seraphim's answer is not argument but the very fire of the Holy Spirit.",
      },
      {
        speaker: "tempter",
        text: "Look at him — a deluded old peasant freezing in the woods, mistaking his own exhaustion for 'grace.' There is no Spirit, no peace, no risen Christ. Only the cold, and the long gray nothing that comes after. Why pray? Why hope? Lay it down. Sleep. Despair is only honesty, and I am the only honest thing in this white waste.",
      },
    ],
    boss: {
      id: "boss-accidie",
      name: "The Noonday Demon",
      title: "Spirit of Despondency",
      tradition: "Accidie (Acedia)",
      sprite: "tempter",
      maxHp: 220,
      intro:
        "Prayer is wasted breath. Joy is a story you tell yourself against the dark. Set down the rope, close your eyes, and let the gray heaviness take you. There is nothing else.",
      midline:
        "You still pray? Still the old man smiles 'Christ is risen' into the snow? ...Why does the weight not crush him?",
      outro:
        "Light — actual light, brighter than noon on the snow, pouring from the old man's face, and warmth where there was no fire. I cannot abide it. The heaviness lifts. He has 'acquired the Spirit' indeed.",
      victoryEpigraph: {
        text:
          "Acquire the Spirit of peace, and thousands around you will be saved.",
        source: "St. Seraphim of Sarov (early 19th c.)",
      },
      attacks: [
        {
          claim:
            "The true aim of the Christian life is good deeds — give alms, fast, attend the services, and be done. All this talk of 'acquiring the Spirit' is fog. Works are enough; or works are nothing. Either way, lay down your prayer.",
          options: [
            {
              text: "Prayer, fasting, and almsgiving are means, not the end. The true aim of the Christian life is the acquisition of the Holy Spirit of God — and the virtues are good only insofar as they gain us that grace.",
              correct: true,
              rationale:
                "St. Seraphim's words to Motovilov: 'The true aim of our Christian life consists in the acquisition of the Holy Spirit of God. As for fasts and vigils and prayer and almsgiving... they serve only as the indispensable means of attaining' the Spirit.",
            },
            {
              text: "You are right; good works alone are the whole of the Christian life.",
              correct: false,
              rationale:
                "Seraphim taught that works are means to the end of acquiring the Holy Spirit; severed from grace they profit nothing (cf. 1 Cor 13:3). The goal is union with God, not a ledger of deeds.",
            },
            {
              text: "Since works are not the goal, they may be neglected entirely.",
              correct: false,
              rationale:
                "The virtues are the indispensable means; one does not abandon the road because it is not the destination. 'Faith without works is dead' (James 2:26).",
            },
            {
              text: "The Holy Spirit cannot truly be experienced in this life.",
              correct: false,
              rationale:
                "The Motovilov conversation is precisely a testimony that the Spirit can be tasted now — Motovilov saw Seraphim transfigured in uncreated light and felt warmth, peace, and ineffable joy.",
            },
          ],
          difficulty: 3,
          taunt: "Lay it down. There is only the gray.",
        },
        {
          claim:
            "Even your own saints sit alone in frozen woods, weeping, fasting, denying themselves all comfort. That is not joy — that is misery dressed as holiness. Your religion is sorrow.",
          options: [
            {
              text: "Bright sadness, perhaps — but the ascetic strips away false comforts to make room for true joy. Seraphim, who fasted and knelt a thousand nights, greets every soul with 'My joy, Christ is risen!' Repentance is the door, but Pascha is the room.",
              correct: true,
              rationale:
                "St. Seraphim's signature Paschal greeting expresses the Orthodox paradox: ascetic struggle (charmolype, 'joyful sorrow') opens into the unending joy of the Resurrection. Joy, not gloom, is the fruit of the Spirit (Gal 5:22).",
            },
            {
              text: "You are right; the Christian life is fundamentally sorrowful and joyless.",
              correct: false,
              rationale:
                "'Rejoice in the Lord always' (Phil 4:4). Asceticism serves joy, not misery; the saints are the gladdest of people.",
            },
            {
              text: "Joy comes only from comfort and pleasure, which the saints foolishly reject.",
              correct: false,
              rationale:
                "Seraphim found inexhaustible joy precisely in self-denial and prayer — the joy of the Holy Spirit, which the world's comforts cannot give (John 16:22).",
            },
            {
              text: "The saints only pretend to be joyful to deceive the simple.",
              correct: false,
              rationale:
                "Motovilov bore eyewitness testimony to the saint's transfiguration and joy; this is recorded experience, not pretense.",
            },
          ],
          difficulty: 2,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "The gray weight breaks, and the clearing fills with light. Not the pale glint of sun on snow but a living radiance pouring from the old man's face — too bright to look upon, and yet you cannot look away. Where there was no fire, there is warmth; where there was dread, an unspeakable sweetness.",
      },
      {
        speaker: "you",
        text: "I feel it — peace, and warmth, and a stillness I have no words for. This is what he meant. This is the Spirit, shown and not explained.",
      },
      {
        speaker: "st-anthony",
        text: "So Motovilov will write of this very hour: that the elder's face shone brighter than the sun, and he himself was flooded with a peace and joy no tongue could hold. The grace of the Holy Spirit is no idea, $you. It is fire, and it can be tasted even now.",
      },
      {
        speaker: "st-seraphim",
        text: "There is no despondency for those who carry Christ within the heart, my joy. The demon flees the soul that is glad in the Lord. Go now where that gray weight lies heaviest of all — to an age that has labored to bury God entirely.",
      },
      {
        speaker: "st-seraphim",
        text: "Carry the peace you have tasted here, and thousands shall be saved around you. Christ is risen, my joy! Truly He is risen!",
      },
      {
        speaker: "narrator",
        text: "Two years later, in eighteen thirty-three, St. Seraphim of Sarov reposed on his knees before his beloved icon of the Theotokos, the 'Joy of All Joys.' His body was found bowed in prayer, as if he had only fallen asleep mid-conversation with the One he loved.",
      },
    ],
    reward: { xp: 1, item: "prayer-rope", healHp: true },
  },

  // =========================================================================
  // CHAPTER 403 — ST. SILOUAN THE ATHONITE & THE MODERN CONFESSORS (1866–1938)
  // 20th century. "Keep thy mind in hell, and despair not"; love of enemies.
  // =========================================================================
  {
    id: "ch403-silouan",
    number: 403,
    era: "AD 1938",
    location: "The mill of St. Panteleimon Monastery, Mount Athos",
    title: "Keep Thy Mind in Hell",
    background: "void",
    ally: "st-anthony",
    intro: [
      {
        speaker: "narrator",
        text: "The Holy Mountain. Athos rises from a wine-dark sea, its slopes terraced with vineyards and crowned with monasteries that have prayed without ceasing for a thousand years. But you are not in a church. You stand in the storehouse and mill of a great Russian monastery, among sacks of flour and the dust of grain, and the rough laughter of hired workmen. The year is nineteen hundred and thirty-eight.",
      },
      {
        speaker: "narrator",
        text: "A huge, broad-shouldered monk moves among the sacks, weighing the flour, settling the workers' wages with a patience that never breaks. His hands are a laborer's hands. Yet his face — scarred once by anger, you sense — has been worn soft and luminous, like a stone smoothed by long water.",
      },
      {
        speaker: "st-anthony",
        text: "Silouan the Athonite, $you. He came to the Mountain a strong, hot-tempered young soldier, barely able to read. For years the demons and his own despair tormented him almost past bearing — until the living Christ appeared to him. In the depth of that fire he was given a word he could never have invented.",
      },
      {
        speaker: "you",
        text: "A storekeeper, weighing flour, who has seen Christ? And he stays here, among sacks and laborers?",
      },
      {
        speaker: "st-anthony",
        text: "He hides his greatness under the simplest work, and prays for the whole world as he weighs the grain. Ask him of his word. He will not boast of it — but he will give it to you, for you will need it where you are going.",
      },
      {
        speaker: "narrator",
        text: "The monk looks up from his ledger and regards you with eyes that seem to grieve and rejoice at once. 'I was near to despair,' he says quietly, 'for the demons would not leave me, and I could not tell where God was. And the Lord said to me: Keep thy mind in hell, and despair not.'",
      },
      {
        speaker: "you",
        text: "Keep thy mind in hell? That sounds like cruelty, Father — like a counsel of darkness.",
      },
      {
        speaker: "st-silouan",
        text: "No, my child. It is this: do not flee the knowledge of your own nothingness, nor the world's. Stand in that hell of self-knowledge — and yet hope wholly in God. There the proud demon cannot follow you, for he can drive a man to despair, but he cannot endure to despair-not. The hope undoes him.",
      },
      {
        speaker: "st-anthony",
        text: "His disciple, the monk Sophrony, will write these words down one day and carry them to Paris and to England, and they will save many. But Silouan has a second teaching, harder still. Tell him, Father.",
      },
      {
        speaker: "st-silouan",
        text: "He who does not love his enemies does not yet know God. I wept for years, even for those who hate the Lord — even for the demons who once tormented me, that they too might know His mercy. This is the sure sign of the Spirit of God: love for enemies. Without it, all the rest is nothing.",
      },
      {
        speaker: "you",
        text: "Love even those who would destroy us? In the age I come from, that is called weakness — or madness.",
      },
      {
        speaker: "st-anthony",
        text: "The age you now enter has made a god of the void itself, $you. It declares God dead and meaning a delusion, and it wears the calm face of reason. But it has never once met a love like this. Stand ready — it comes.",
      },
      {
        speaker: "narrator",
        text: "The walls of the mill seem to thin and fade. The warm dust of grain gives way to a featureless gray — not the honest cold of Sarov, but a smooth, modern emptiness, the reasonable nihilism of a century that has buried God and salted the grave. A voice rises from the void, calm, articulate, almost kind.",
      },
      {
        speaker: "atheist",
        text: "Monk, you waste a strong man's life weeping for strangers in a flour-mill. There is no God, no soul, no hell to keep your mind in — only matter, and decay, and the brief flicker before the dark closes for good. Love your enemies? They will eat you alive. Despair is not a sin; it is simply the truth that grown men learn to face. So tell me, pilgrim — why hope?",
      },
    ],
    boss: {
      id: "boss-modern-nihilism",
      name: "The Voice of the Void",
      title: "Spirit of Modern Nihilism",
      tradition: "Secular Nihilism",
      sprite: "atheist",
      maxHp: 240,
      intro:
        "God is dead. Meaning is a story the weak tell themselves. There is no hell to fear and no heaven to hope, only the void — so eat, sleep, and despair like an honest man. Your prayers fall into nothing.",
      midline:
        "You still pray for your enemies? For me? ...I offer you the clean truth of nothing, and you answer with tears of love. It unsettles the dark.",
      outro:
        "He weeps — not for himself, but for the whole world, even for the lost, even for the demons. Such grief is not weakness; it is a fire I cannot put out. The void is not the deepest thing. Love is.",
      victoryEpigraph: {
        text: "Keep thy mind in hell, and despair not.",
        source:
          "Words of Christ to St. Silouan the Athonite, recorded by St. Sophrony (Sakharov)",
      },
      attacks: [
        {
          claim:
            "Face it: there is no God and no meaning. The only honest stance is despair. Your 'hope' is cowardice dressed as faith — you simply cannot bear the void I am brave enough to look at.",
          options: [
            {
              text: "I do look at the abyss — 'keep thy mind in hell' — I do not flee my own nothingness or the world's. And yet I 'despair not,' for I hold to the living God whom I have met. To stand in hell without despair is harder and braver than your easy darkness.",
              correct: true,
              rationale:
                "Christ's word to St. Silouan (recorded by St. Sophrony in 'Saint Silouan the Athonite'): self-knowledge unto 'hell' joined to unbroken hope in God. It confronts despair directly rather than evading it — the opposite of nihilist resignation.",
            },
            {
              text: "You are right; the only honest response to a meaningless world is despair.",
              correct: false,
              rationale:
                "Despair is the demon's stronghold; Silouan was given a word precisely to defeat it. 'Despair not' is the second half no nihilism can supply — hope grounded in the risen Christ.",
            },
            {
              text: "The way to peace is to deny suffering and hell exist at all.",
              correct: false,
              rationale:
                "Silouan does not deny the abyss; he keeps his mind in it. False optimism is as untrue as despair. The Christian neither flees the darkness nor is conquered by it.",
            },
            {
              text: "One should simply stop thinking about death and meaning to avoid pain.",
              correct: false,
              rationale:
                "Evasion is not the Christian remedy. Watchfulness (nepsis) and self-knowledge before God, with hope, is the narrow path the Fathers teach.",
            },
          ],
          difficulty: 4,
          taunt: "Despair is honesty! The void is all there is!",
        },
        {
          claim:
            "Your enemies have burned your country, murdered your monks, declared war on your God. Hate them — it is only natural. Anyone who 'loves his enemies' is a fool who has never truly suffered.",
          options: [
            {
              text: "He who does not love his enemies does not yet know God. The Lord prayed for His murderers; to love even those who hate us is the very mark of grace, and it is the only thing that can heal a world drowning in hatred.",
              correct: true,
              rationale:
                "Central to St. Silouan's teaching (per St. Sophrony): love of enemies is the surest sign of the true Spirit of God; its absence is the sign of its lack. Founded on Christ's own command and example (Matt 5:44; Luke 23:34).",
            },
            {
              text: "You are right; hatred of enemies is natural and therefore justified.",
              correct: false,
              rationale:
                "'Love your enemies, bless them that curse you' (Matt 5:44). Silouan held that without this love a man does not yet know God, however 'natural' the hatred feels.",
            },
            {
              text: "We should be indifferent to our enemies — neither love nor hate.",
              correct: false,
              rationale:
                "Indifference is not the Gospel either. Christ commands active love and prayer for persecutors, as Silouan wept and prayed even for the lost.",
            },
            {
              text: "Love of enemies means approving of their evil deeds.",
              correct: false,
              rationale:
                "To love the enemy is to desire his salvation, not to bless his sin. One hates the evil while grieving and praying for the sinner.",
            },
          ],
          difficulty: 4,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "The void does not so much retreat as dissolve. For the monk has answered it not with argument but with tears — weeping, openly, for the whole world: for the lost, for his enemies, even for the dark voice itself. Such grief is not weakness. It is a fire, and the void cannot put it out.",
      },
      {
        speaker: "st-silouan",
        text: "Do you see, my child? The void is not the deepest thing. Love is. Pray for the whole world, and weep for all who do not yet know God — and you will find Him nearer than your own breath, even in the hell you keep in your mind.",
      },
      {
        speaker: "you",
        text: "I think I understand now, Father. To despair not is not to pretend the darkness away. It is to stand in it and still love.",
      },
      {
        speaker: "st-anthony",
        text: "Well said. St. Silouan reposes this very year, in nineteen thirty-eight, and his disciple Sophrony will gather his words and give them to the world. And he is not the last, $you. In this same dark century the fire is carried on.",
      },
      {
        speaker: "st-anthony",
        text: "St. John of Shanghai bears Orthodoxy across China and on to San Francisco. St. Paisios and St. Porphyrios, on the Mountain and in Athens, comfort a doubting age with the same unhurried love you have just seen. The line is unbroken.",
      },
      {
        speaker: "st-anthony",
        text: "You began as a soul pulled out of your own gray, godless century — and you have walked the whole road, from Ignatius and his lions to Silouan and his mill. The same Spirit, the same Cross, the same Risen Lord, across two thousand years. The line runs through you now. Keep thy mind in hell, and despair not. Go home, $you — and pray.",
      },
    ],
    reward: { xp: 1, item: "icon-christ", healHp: true },
  },

  // =========================================================================
  // CHAPTER 404 — THE OPTINA ELDERS (19th c., Optina Pustyn, Russia)
  // Spiritual physicians to a doubting age; Dostoevsky's visit of 1878.
  // =========================================================================
  {
    id: "ch404-optina",
    number: 404,
    era: "AD 1878",
    location: "The skete of Optina Pustyn, near Kozelsk, Russia",
    title: "The Physicians of the Soul",
    background: "modern",
    ally: "st-anthony",
    intro: [
      {
        speaker: "narrator",
        text: "A hush of pines, resin-scented, and the low white walls of a skete set a little apart from the great monastery of Optina. Birds sing in the high branches. The year is eighteen hundred and seventy-eight, and Russia is feverish with new ideas — but here, at the edge of the forest, time seems to move at the pace of prayer.",
      },
      {
        speaker: "narrator",
        text: "A long line of visitors waits at the door of a low wooden cell. Peasants in bast shoes stand beside princes in fine coats; scholars wracked with doubt wait behind mothers wild with grief. All have come to one bent, smiling old man who can scarcely rise from his bed, and who from dawn to dark receives them, one by one.",
      },
      {
        speaker: "st-anthony",
        text: "Optina Pustyn, $you. Remember the Philokalia, carried north out of Venice? Here is its fruit. A line of elders — startsy — has risen in this place: first Leonid, then Macarius, and now the one you see, Ambrose. They are physicians of the soul. They read the heart, give a single word, and a man who came in despair walks out healed.",
      },
      {
        speaker: "you",
        text: "All these people, for one frail old monk? What can he give them that their own priests cannot?",
      },
      {
        speaker: "st-anthony",
        text: "Discernment, and a love that has been purified by a lifetime of obedience and prayer. He sees the wound beneath the words. All Russia knows the road to his door — and not only the simple. The learned come too, though some come only to argue.",
      },
      {
        speaker: "you",
        text: "And the others before him — Leonid, Macarius. Did the people not fear such elders, who can read the secrets of a heart?",
      },
      {
        speaker: "st-anthony",
        text: "At first some did, and the powerful in the Church distrusted them — eldership was suspected, even forbidden for a time. But the fruit silenced the fear. Souls came in chains of despair and walked out free. You cannot argue with a healed man, $you. You can only wonder what healed him.",
      },
      {
        speaker: "narrator",
        text: "Through the open door you glimpse Elder Ambrose, propped on his pillows, laughing softly with a worried peasant woman. 'Live simply,' he tells her, 'and do good, not seeking after great things. Where it is simple, there are angels by the hundred — but where it is clever, there are none at all.'",
      },
      {
        speaker: "you",
        text: "He jokes, and yet she is weeping with relief. He has lifted something off her without my even hearing what it was.",
      },
      {
        speaker: "st-anthony",
        text: "That is the gift of the elders. A famous man came here not long ago — Dostoevsky, the novelist, half-broken by the death of his little son. Ambrose spoke with him, and the writer is even now carrying that meeting into his last and greatest book, where a holy elder named Zosima will speak with the voice of Optina.",
      },
      {
        speaker: "you",
        text: "Then this place will outlive its walls. But who is that — the young man turning from the door?",
      },
      {
        speaker: "narrator",
        text: "A pale, intense youth in a student's threadbare coat steps back from the cell with a sneer twisting his clever face. He is full of the new ideas of the capital — of science and progress and the death of old superstitions — and he looks upon the praying peasants as a man looks upon children who will not grow up.",
      },
      {
        speaker: "doubt",
        text: "Peasants and weeping women, and a senile monk dispensing platitudes — this is the famous wisdom of Optina? Listen, pilgrim. If God were good, my little brother would not have died screaming in fever at six years old. I will not bow to a Creator who builds His world on the torture of one innocent child. Answer me that. Your gentle elders cannot.",
      },
      {
        speaker: "st-anthony",
        text: "He flings the hardest question of all at you, $you — the suffering of the innocent. Do not answer it the way the world answers, with a clever argument. Answer it as Optina answers. Stand.",
      },
    ],
    boss: {
      id: "boss-optina-doubter",
      name: "The Rebel of the Capital",
      title: "Accuser of Providence",
      tradition: "Modern Unbelief",
      sprite: "doubt",
      maxHp: 225,
      intro:
        "I do not deny God — I return Him the ticket. A world built on the tears of one tortured child is not worth the entrance fee. Your kindly elders have no answer to a single child's suffering. Defend your God, if you can bear to.",
      midline:
        "You do not explain the suffering away? You weep with me instead, and point me to the Cross? ...That is not the answer I came to defeat.",
      outro:
        "The elder did not argue. He embraced me, and wept, and said 'love' until the word cracked something in me. I came to return my ticket. I leave unable to stop weeping. Perhaps the answer was never an argument.",
      victoryEpigraph: {
        text:
          "Love all God's creation, the whole of it and every grain of sand. Love every leaf, every ray of God's light. If you love everything, you will perceive the divine mystery in things.",
        source:
          "Elder Zosima, in Dostoevsky's 'The Brothers Karamazov' (1880), drawn from the Optina elders",
      },
      attacks: [
        {
          claim:
            "If God is good and almighty, He would not permit a single innocent child to suffer. Since children suffer, either He is not good, or He is not there. Reason demands you renounce Him.",
          options: [
            {
              text: "God does not stand outside our suffering explaining it — He entered it. The Cross is His answer: the innocent One suffered with and for us, and rose. We are given no neat theory of evil, but a crucified God who weeps with the grieving and conquers death.",
              correct: true,
              rationale:
                "The Orthodox response to the problem of evil is Christological, not merely philosophical: God in Christ enters and overcomes suffering (Heb 4:15; Isa 53). The elders met grief with shared tears and the hope of the Resurrection, as Dostoevsky dramatized through Zosima and Alyosha.",
            },
            {
              text: "You are right; the suffering of children disproves the existence of God.",
              correct: false,
              rationale:
                "The Cross stands precisely at this point: God does not exempt Himself from suffering. Job receives no explanation but a Presence; Christ gives more — He shares the wound and defeats it.",
            },
            {
              text: "The children must have deserved their suffering through sin.",
              correct: false,
              rationale:
                "Christ rejected this (John 9:3, of the man born blind). The Church does not blame the innocent sufferer; it grieves with them and points to the Resurrection.",
            },
            {
              text: "Suffering is an illusion; the child does not really suffer.",
              correct: false,
              rationale:
                "Christianity never denies the reality of suffering — it takes it so seriously that God Himself bore it. To call it illusion is a foreign, gnostic evasion.",
            },
          ],
          difficulty: 4,
          taunt: "I return Him the ticket! Answer the child's tears!",
        },
        {
          claim:
            "Even granting your God, why these elders? Why kneel before a wheezing old monk for a 'word'? A modern man thinks for himself; he needs no spiritual father to obey.",
          options: [
            {
              text: "The proud heart deceives itself; we open it to a discerning elder and lay down self-will, as the Fathers counsel, that pride may be healed. 'Where it is simple, there are angels by the hundred,' said Ambrose — obedience is not weakness but the cure for the sickness that is self.",
              correct: true,
              rationale:
                "Eldership (starchestvo) revives the patristic tradition of spiritual fatherhood and obedience as the antidote to self-will and prelest (spiritual delusion). The Optina elders (Leonid, Macarius, Ambrose) were renowned for this discernment.",
            },
            {
              text: "You are right; a modern man needs no spiritual guidance from anyone.",
              correct: false,
              rationale:
                "'In the multitude of counsellors there is safety' (Prov 11:14). The desert and Athonite tradition warns that the self-guided easily fall into delusion; humility seeks a guide.",
            },
            {
              text: "The elder must be obeyed even when he commands sin.",
              correct: false,
              rationale:
                "Obedience is never to sin; a true elder leads to Christ and the Church's faith, never against them. Discernment, not blind submission to error, is the tradition.",
            },
            {
              text: "Spiritual fathers replace the need for Christ Himself.",
              correct: false,
              rationale:
                "The elder points away from himself to Christ, like the Forerunner: 'He must increase, but I must decrease' (John 3:30). He is a physician, not a substitute for the Healer.",
            },
          ],
          difficulty: 3,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text: "The young man's sneer falters, then breaks. The elder did not argue with him; the elder wept with him, and embraced him, and said the word 'love' until something long-frozen in the boy's chest cracked apart. He came to return God His ticket. He leaves unable to stop weeping.",
      },
      {
        speaker: "you",
        text: "I almost answered him with a syllogism. But the Cross is not a syllogism. God did not explain the child's suffering — He entered it, and bore it, and rose.",
      },
      {
        speaker: "st-anthony",
        text: "You have learned the secret of Optina, $you. They healed an age of doubt not with arguments but with love — the same love that runs unbroken from the Upper Room to this skete in the pines. Hold fast to it.",
      },
      {
        speaker: "narrator",
        text: "Dostoevsky will draw the saintly Elder Zosima of 'The Brothers Karamazov' from this place and from Ambrose himself. Sts. Leonid, Macarius, and Ambrose, and the elders after them, will be numbered among the saints. Optina will be crushed under the coming Soviet darkness — and will rise again.",
      },
      {
        speaker: "st-anthony",
        text: "The fire of the Philokalia passed from cell to cell here, and from these cells into the wide doubting world. Now come — to the Holy Mountain, and to a soldier turned monk who was given a word from the very lips of Christ. The hardest age of all still waits for you.",
      },
    ],
    reward: { xp: 1, item: "prayer-rope", healHp: true },
  },
];
