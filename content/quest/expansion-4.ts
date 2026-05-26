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
        text: "A poor village under the Turkish yoke. The people have nearly forgotten their letters; some have forgotten the Creed. A barefoot monk plants a tall wooden cross in the dust and stands on a stool beside it. Thousands have walked through the night from the hills to hear him.",
      },
      {
        speaker: "st-anthony",
        text: "Cosmas of Aetolia, $you — once a teacher on Mount Athos, now an itinerant preacher with the Patriarch's blessing. For three hundred years the faith has been ground down under the Ottomans; children grow up unbaptized, churches stand empty. He walks from village to village, opening schools and calling the people back.",
      },
      {
        speaker: "narrator",
        text: "Cosmas raises his hand for silence. 'My brethren, I have left Athos and all comfort for love of you. Build a school in every parish — for without learning the children walk in darkness, and the soul that knows not God is poorer than the beggar at the gate.'",
      },
      {
        speaker: "st-anthony",
        text: "While Cosmas rekindles the people's faith here, on the Holy Mountain two others labor in the same Spirit: Nicodemus the Hagiorite and Macarius of Corinth, who are even now gathering the writings of the Fathers on prayer of the heart into a single book — the Philokalia, 'love of the beautiful.' The age of reason calls such prayer a peasant's superstition.",
      },
      {
        speaker: "narrator",
        text: "A man in the dress of a Western-schooled gentleman pushes to the front, contemptuous of the ragged crowd and the barefoot monk.",
      },
      {
        speaker: "atheist",
        text: "Old man, you fill these wretches' heads with talk of demons and unceasing prayer while Europe wakes to reason and the rights of man. Why drag a conquered people backward into monkish dreams? Answer me — if your 'prayer of the heart' is anything more than the muttering of slaves.",
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
        text: "St. Cosmas was hanged by the Ottomans in 1779, betrayed by men who feared his influence; he is honored as a hieromartyr and Equal-to-the-Apostles. Three years later, in 1782, the Philokalia was printed in Venice. From these two springs — his preaching and that book — the prayer of the heart was rekindled across the Orthodox world.",
      },
      {
        speaker: "st-anthony",
        text: "The Philokalia traveled north, $you, translated into Slavonic and Russian. It will set a whole land aflame with prayer — and in a forest hermitage a man will pray it so deeply that his very body will shine. Come; we go to Sarov.",
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
        text: "Deep Russian winter. Snow to the knee, the forest silent and white. In a clearing sits a bent old monk in a white peasant's smock, a sack on his back, an axe in his belt. For years he lived as a hermit, fed bears from his hand, knelt a thousand nights on a rock in prayer. Now pilgrims come from across the empire to his cell.",
      },
      {
        speaker: "st-seraphim",
        text: "My joy! Christ is risen! Come closer — sit beside me on this stump. Do not fear the cold. Acquire the Spirit of peace, and thousands around you will be saved.",
      },
      {
        speaker: "st-anthony",
        text: "Seraphim of Sarov, $you. He greets every soul, in any season, with the Paschal cry — 'My joy, Christ is risen!' He has read the Philokalia until it is part of his breath. Beside him kneels Nicholas Motovilov, a landowner whom Seraphim healed; today the old man will show him what 'acquiring the Spirit' truly means.",
      },
      {
        speaker: "narrator",
        text: "A cold dread gathers at the edge of the clearing — not the honest cold of winter, but a heavier weight: the gray, listless heaviness the Fathers name accidie, the noonday demon, that whispers that prayer is pointless and joy a lie.",
      },
      {
        speaker: "st-anthony",
        text: "That heaviness is no mere mood, $you. It is the spirit of despondency, which would have you set down your prayer rope and call all of this — the snow, the old man, the Risen Lord — a sad delusion. Stand fast. Seraphim will show you the answer is not argument but the very fire of the Holy Spirit.",
      },
      {
        speaker: "tempter",
        text: "Look at him — a deluded old peasant freezing in the woods, mistaking his own exhaustion for 'grace.' There is no Spirit, no peace, no risen Christ. Only the cold, and the long gray nothing after. Why pray? Why hope? Lay it down. Sleep. Despair is only honesty.",
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
        text: "Motovilov later wrote how, in that clearing, the old man's face shone brighter than the sun on snow, and he himself was filled with a peace, warmth, and sweetness no words could hold — the grace of the Holy Spirit, shown rather than explained. St. Seraphim reposed in 1833, kneeling before his icon of the Theotokos, 'Joy of All Joys.'",
      },
      {
        speaker: "st-seraphim",
        text: "There is no despondency for those who carry Christ in their heart, my joy. Go now where the gray weight is heaviest of all — to an age that has tried to bury God entirely. Carry the peace, and thousands shall be saved around you.",
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
        text: "Mount Athos, the Holy Mountain. In the storehouse of a Russian monastery, a great, broad-shouldered peasant-monk weighs sacks of flour and oversees the workmen — and prays without ceasing for the whole world. He was once a strong, hot-tempered young soldier; now grief for every living soul has worn his face soft.",
      },
      {
        speaker: "st-anthony",
        text: "Silouan the Athonite, $you. He came to the Mountain barely literate, was tormented for years by demons and by his own despair, until Christ appeared to him living. In the depth of that struggle he was given a word he could not have invented — and it has saved many from the abyss you are about to face.",
      },
      {
        speaker: "narrator",
        text: "Silouan looks up from his ledgers. 'I was near to despair,' he says quietly, 'and the Lord said to me: Keep thy mind in hell, and despair not. Do not flee the knowledge of your own nothingness — stand in it, and yet hope in God. There the proud demon cannot follow you, for he cannot bear to despair-not.'",
      },
      {
        speaker: "st-anthony",
        text: "His disciple, the monk Sophrony, will one day write these words down and carry them to Paris and to England. And Silouan will teach you the hardest thing of all: that a man who does not love his enemies does not yet know God. The age you now enter has made a god of the void — but it has never met a love like this.",
      },
      {
        speaker: "narrator",
        text: "The clearing dims to a featureless gray; not winter now, but a modern emptiness — the smooth, reasonable nihilism of a century that has declared God dead and meaning a delusion. A voice rises from the void, calm and almost kind.",
      },
      {
        speaker: "atheist",
        text: "Monk, you waste a strong man's life weeping for strangers in a flour-mill. There is no God, no soul, no hell to keep your mind in — only matter, decay, and the brief flicker before the dark. Love your enemies? They will eat you. Despair is not a sin; it is the truth that grown men face. Why hope?",
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
        text: "St. Silouan reposed in 1938. His disciple Sophrony gathered his writings and gave the world his words. In the same dark century, others carried the same fire: St. John of Shanghai bore Orthodoxy across China to San Francisco; and after him St. Paisios and St. Porphyrios on the Mountain and in Athens would comfort a doubting age with the same unhurried love.",
      },
      {
        speaker: "st-anthony",
        text: "You began as a catechumen pulled out of your own gray, godless century, $you — and you have walked the whole road, from Ignatius and his lions to Silouan and his mill. The same Spirit, the same Cross, the same Risen Lord, unbroken across two thousand years. Keep thy mind in hell, and despair not. The line runs through you now. Go home, and pray.",
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
        text: "A pine wood and a white-walled skete a little apart from the great monastery. A line of visitors waits at the door of a low cell: peasants and princes, scholars wracked with doubt and mothers wild with grief, all come to one bent, smiling elder who can scarcely walk. From dawn to dark he receives them, one by one.",
      },
      {
        speaker: "st-anthony",
        text: "Optina Pustyn, $you. The Philokalia, carried north and translated, has borne fruit here in a line of elders — startsy — beginning with Leonid, then Macarius, and now Ambrose. They are spiritual physicians: they read the heart, give a word, and a soul that came in despair walks out healed. All Russia knows the road to their door.",
      },
      {
        speaker: "narrator",
        text: "Elder Ambrose, propped on his pillows, laughs softly at a worried pilgrim. 'Live simply,' he tells her, 'and do good, not seeking great things. Where it is simple, there are angels by the hundred; but where it is clever, there are none at all.'",
      },
      {
        speaker: "st-anthony",
        text: "A famous visitor came not long ago, $you — Dostoevsky, the novelist, half-broken by the death of his little son. Elder Ambrose spoke with him, and the writer carried that meeting into his last great book. But many come to Optina not to be healed; they come to argue. One stands behind you now.",
      },
      {
        speaker: "narrator",
        text: "A pale, intense young man in a student's coat — clever, modern, full of the new ideas from the capital — turns from the cell door with a sneer.",
      },
      {
        speaker: "doubt",
        text: "Peasants and weeping women, and a senile monk handing out platitudes. This is the great wisdom of Optina? If God were good, my brother would not have died screaming at six years old. I will not love a Creator who permits the suffering of one innocent child. Answer that, pilgrim — your elders cannot.",
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
        text: "Dostoevsky drew the saintly Elder Zosima of 'The Brothers Karamazov' from his visit to Optina and from Elder Ambrose. Sts. Leonid, Macarius, and Ambrose, with the elders after them, are numbered among the saints; Optina was crushed under the Soviets and rose again. The line of holy elders had passed the Philokalia's fire from cell to cell, and from cell to the wide doubting world.",
      },
      {
        speaker: "st-anthony",
        text: "They healed an age of doubt not with arguments but with love, $you — the same love that runs from the Upper Room to this skete in the pines. Hold to it. Now to the Mountain, and to a soldier-monk who was given a word from the lips of Christ Himself.",
      },
    ],
    reward: { xp: 1, item: "prayer-rope", healHp: true },
  },
];
