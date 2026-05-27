import type { Chapter } from "@/lib/quest/types";

// ===========================================================================
// EXPANSION CHAPTERS 3 — the 13th–14th centuries.
//
// These chapters match the Chapter type in lib/quest/types.ts exactly and use
// only existing backgrounds, portrait ids, and item ids. `number` fields are
// placeholders (301+) for re-numbering on integration.
//
// Authored attacks are intentionally short (1–2 each); the battle engine
// auto-augments every boss with live spaced-repetition questions from the
// study corpus.
//
// Portrait notes: figures without a dedicated portrait id (St. Sava of Serbia,
// St. Gregory Palamas, Barlaam the Calabrian) appear as dialogue speakers using
// a descriptive speaker id that renders no portrait (acceptable), or speak
// through "narrator" / "st-anthony" / "you". Bosses reuse the closest existing
// villain sprite: "humbert" (crusader/Latin aggression), "tempter" (worldly
// pride), "humbert" again (Barlaam the rationalist).
// ===========================================================================

export const EXPANSION_CHAPTERS_3: Chapter[] = [
  // =========================================================================
  // CHAPTER 301 — THE SACK OF CONSTANTINOPLE (AD 1204)
  // 13th century. The Fourth Crusade turns on the Christian East.
  // =========================================================================
  {
    id: "ch301-fourth-crusade",
    number: 301,
    era: "AD 1204",
    location: "Hagia Sophia, the despoiled Great Church, Constantinople",
    title: "The Cross Turned Backward",
    background: "hagia-sophia",
    ally: "st-anthony",
    intro: [
      {
        speaker: "narrator",
        text: "Constantinople burns. The greatest Christian city on earth — the city of a thousand churches, of emperors and councils — is being torn apart. The men who took the Cross to free Jerusalem have stormed these walls instead. The year is twelve hundred and four, and for three days they have plundered, slaughtered, and burned.",
      },
      {
        speaker: "narrator",
        text: "You stand within Hagia Sophia itself, the Holy Wisdom that has stood for seven centuries. Smoke hangs beneath the great dome like a stormcloud sealed indoors. The golden mosaics look down on horror.",
      },
      {
        speaker: "you",
        text: "Crusaders did this? I thought the Crusades were against the armies of Islam, to free the Holy Land.",
      },
      {
        speaker: "st-anthony",
        text: "So they began, $you. But this army never reached Jerusalem. Debts to Venice, a deposed prince promising gold, a city too rich to pass by — and the Cross turned backward, against fellow Christians. Look what they do. They have ripped the silver and gold from the altar, hacked the icons apart for their settings, broken open the tombs of the emperors for the jewels.",
      },
      {
        speaker: "narrator",
        text: "Soldiers lead mules and horses up the nave to carry off the holy vessels; the beasts slip on the marble slick with wine and worse, and the men beat them, cursing. A drunken common woman has been hauled up onto the Patriarch's throne, where she sings filthy songs and dances while the soldiers laugh and pass the consecrated chalices like tavern cups.",
      },
      {
        speaker: "you",
        text: "Stop them! Can no one stop this?",
      },
      {
        speaker: "st-anthony",
        text: "We are shadows here, $you, sent to witness and to learn, not to stay the hand of history. Look, and let it brand your memory. This is what happens when men make the faith a flag for their hungers — when 'for Christ' becomes the cloak for what Christ forbids. The grief of this day will outlive every man who profited from it.",
      },
      {
        speaker: "you",
        text: "And these men wear the Cross?",
      },
      {
        speaker: "st-anthony",
        text: "On their very shoulders. Niketas Choniates, a Roman of this city who is fleeing even now with his family through these streets, will write of this day that even the Saracens, when Jerusalem fell to them, were more merciful than these men who bear the name of Christ.",
      },
      {
        speaker: "you",
        text: "How could men set out to free the tomb of Christ and end by sacking a Christian city? What turned them?",
      },
      {
        speaker: "st-anthony",
        text: "Debt and greed, $you, robed in piety. They owed the Venetians more than they could pay for their ships; a fugitive Byzantine prince promised them a fortune to restore his father's throne; and when the promise proved empty, the unpaid army found a city overflowing with gold and called its taking the will of God. Every great evil first persuades itself that it is good.",
      },
      {
        speaker: "you",
        text: "Then I must beware: the worst sins are the ones that come dressed as holiness.",
      },
      {
        speaker: "st-anthony",
        text: "You have seen the heart of it. When the commander comes, he will not boast like a thief; he will preach like a priest. He will say the city's fall proves God judged it, and that schismatics deserve no mercy. Answer him from the Lord's own words — for Christ Himself rebuked the sword, and called the meek, not the conqueror, blessed.",
      },
      {
        speaker: "you",
        text: "But there was already a schism between East and West, was there not? In 1054?",
      },
      {
        speaker: "st-anthony",
        text: "There was — a quarrel of bishops over the word filioque added to the Creed, over leavened or unleavened bread, over the claims of Rome; a thing of theologians and a mutual excommunication. Grievous, but a wound men hoped might heal. This is no longer a quarrel of words. This is a sword driven into the body of the Church itself. After today the people of the East will know in their flesh what the West has become to them — and they will not forget it for eight hundred years.",
      },
      {
        speaker: "st-anthony",
        text: "Here comes a commander now, $you, his surcoat still bearing the Cross, his hands still red. Mark how he speaks: he will name this slaughter a holy war and the city's fall the verdict of God Himself. Do not let him baptize plunder with the name of piety.",
      },
      {
        speaker: "crusader-knight",
        text: "Schismatic! This proud city defied the Holy Father in Rome and clung to its Greek errors — and behold, God has delivered it into our hands! We bear the Cross of Christ; what we take, we take for Rome and for the true faith. Will you also defy the Vicar of Peter? Speak — and I will show you what crusaders do to rebels.",
      },
    ],
    boss: {
      id: "boss-crusader-commander",
      name: "The Crusader Commander",
      title: "Spirit of Conquest in Pious Dress",
      tradition: "The Fourth Crusade",
      sprite: "crusader-knight",
      maxHp: 230,
      intro:
        "We sailed to free Jerusalem and God set this richer prize before us. The Greeks are schismatics; their gold is now the Church's, their city Rome's. This is no crime — it is holy war.",
      midline:
        "You name us robbers? We bear the Cross of Christ on our very breast!",
      outro:
        "Enough... The horses in the sanctuary, the throne defiled, the relics carted off like loot. We came to save Jerusalem and we have crucified the East instead.",
      victoryEpigraph: {
        text:
          "They were no different from the others who bore the Cross on their shoulders... the sacred altar, fashioned from every kind of precious material, was hacked to pieces and divided among the soldiers.",
        source: "Niketas Choniates, O City of Byzantium (on the sack of 1204)",
      },
      attacks: [
        {
          claim:
            "The city has fallen to our swords; therefore God has judged the Greeks and given us their wealth. Conquest is the verdict of heaven. Who are you to call it sin?",
          options: [
            {
              text: "Victory is no proof of righteousness. 'All they that take the sword shall perish with the sword' (Matt 26:52). To rob and slaughter fellow Christians and call it God's will is to blaspheme, not to obey.",
              correct: true,
              rationale:
                "Worldly triumph is not divine vindication; Christ rebuked the appeal to the sword (Matt 26:52). The Fourth Crusade was later condemned even by Pope Innocent III, who wrote that the crusaders had turned their swords against Christians and spared neither religion nor age nor sex.",
            },
            {
              text: "You are right — since you won, God must have willed the sack.",
              correct: false,
              rationale:
                "This is might-makes-right, not the Gospel. Pilate and Caiaphas also 'won'; victory proves nothing about justice.",
            },
            {
              text: "God always rewards the strong with the goods of the weak.",
              correct: false,
              rationale:
                "The opposite of the Beatitudes: 'Blessed are the meek, for they shall inherit the earth' (Matt 5:5).",
            },
            {
              text: "The Greeks deserved it, so no sin was committed.",
              correct: false,
              rationale:
                "Even just grievance does not license sacrilege and murder. Innocent III himself denounced the atrocities of 1204.",
            },
          ],
          difficulty: 3,
          taunt: "We won! God gave you to us!",
        },
        {
          claim:
            "The Greeks broke from Rome; they are schismatics. To despoil schismatics and force them back to obedience can only please God. The end sanctifies the means.",
          options: [
            {
              text: "No good end can sanctify sacrilege, rape, and murder. You cannot heal a schism by deepening it into bloodshed; you have only made the breach a wound no council can soon close.",
              correct: true,
              rationale:
                "The sack of 1204 transformed a theological estrangement into lasting enmity between East and West. Pope John Paul II in 2001 expressed sorrow for the catastrophe, acknowledging the deep wound it left.",
            },
            {
              text: "Correct — any cruelty is justified to restore unity with Rome.",
              correct: false,
              rationale:
                "Coercion is not communion. The Church is gathered by love and truth, not plunder and the sword.",
            },
            {
              text: "Schismatics have no rights, so nothing done to them is sin.",
              correct: false,
              rationale:
                "Every person bears the image of God; 'inasmuch as ye did it unto one of the least of these... ye did it unto Me' (Matt 25:40).",
            },
            {
              text: "Unity at any cost is the highest good of the Church.",
              correct: false,
              rationale:
                "Unity must be in truth and love (Eph 4:15). A unity built on terror is no true unity at all.",
            },
          ],
          difficulty: 4,
        },
      ],
    },
    outro: [
      {
        speaker: "crusader-knight",
        text: "Enough... The horses in the sanctuary, the throne defiled, the relics carted off like loot. We came to save Jerusalem, and we have crucified the East instead. God forgive us — there will be no absolving this.",
      },
      {
        speaker: "narrator",
        text: "The crusaders set up a Latin emperor in the city and ruled it for fifty-seven years before the Byzantines retook a ruined, impoverished capital that never recovered its glory. The plundered relics and the bronze horses of the Hippodrome adorn Western churches and squares to this day.",
      },
      {
        speaker: "you",
        text: "Did no one in the West condemn it?",
      },
      {
        speaker: "st-anthony",
        text: "Pope Innocent III himself did, when he learned the truth: he wrote that the crusaders had turned their swords against Christians, sparing neither religion nor age nor sex, and had given the Greeks every reason to detest the Latins. And eight centuries hence, in the year 2001, Pope John Paul II will speak words of sorrow for this very day.",
      },
      {
        speaker: "st-anthony",
        text: "Remember the lesson, $you: a word divided the Church, but a sack drove the division into the heart of a whole people. Yet the faith endures even in the ashes. Come — north now, to a young Serbian prince who fled a palace for a mountain, and who will wed holiness to a whole nation without ever making it the nation's idol.",
      },
    ],
    reward: { xp: 1, item: "relic-cross", healHp: true },
  },

  // =========================================================================
  // CHAPTER 302 — ST. SAVA OF SERBIA (c. AD 1219)
  // 13th century. Autocephaly, Hilandar on Athos, faith wedded to a people.
  // =========================================================================
  {
    id: "ch302-sava-serbia",
    number: 302,
    era: "c. AD 1219",
    location: "The Holy Mountain of Athos and the Serbian court",
    title: "The Enlightener of the Serbs",
    background: "council-hall",
    ally: "sava-serbia",
    intro: [
      {
        speaker: "narrator",
        text: "Green mountains, cold and clean after the smoke of Constantinople. You stand on the Holy Mountain of Athos, where for centuries monks of many tongues have prayed beneath the peak that rises straight from the sea. Among the Greek monasteries stands a newer house, its frescoes fresh: Hilandar, the monastery of the Serbs.",
      },
      {
        speaker: "st-anthony",
        text: "A generation ago, $you, a young prince of Serbia named Rastko slipped from his father's palace by night and came to this Mountain, taking the monastic name Sava. In time his own father followed him — Stefan Nemanja, founder of the Serbian state, who laid down his crown to die a monk here under the name Symeon. Together, father and son, they raised up Hilandar.",
      },
      {
        speaker: "you",
        text: "A king who gave up his throne to become a monk? And his son a prince turned hermit?",
      },
      {
        speaker: "st-anthony",
        text: "So it was. But Sava could not stay hidden on the Mountain. His people needed him. A young nation, newly Christian, lacked what no gold can buy: not merely a church building, but their own Church — bishops of their own, books and services in their own Slavonic tongue, the faith woven into the very life and law of the Serbs.",
      },
      {
        speaker: "narrator",
        text: "In the year twelve hundred and nineteen Sava travelled to Nicaea, where the Patriarch of Constantinople then dwelt in exile — for the Latins still held the Queen of Cities. From him Sava received autocephaly for the Serbian Church and was consecrated its first archbishop. Now he has come home, to crown and to teach, to build and to reconcile his own quarreling royal brothers.",
      },
      {
        speaker: "you",
        text: "Autocephaly — what does the word mean?",
      },
      {
        speaker: "st-anthony",
        text: "'Self-headed' — a Church that governs its own affairs, chooses its own bishops, yet holds the one identical Orthodox faith shared with the Greeks, the Bulgars, the Rus. Not a separate religion; a household ordering its own table within the one great house. But here — let the archbishop himself tell you. A man in the plain black robe of an Athonite monk crosses the courtyard, though an omophorion now marks him archbishop. His face is gentle, yet there is iron beneath it.",
      },
      {
        speaker: "sava-serbia",
        text: "I am Sava, by God's mercy archbishop of the Serbs. A people without their own Church are sheep scattered on the hills. So I have given my people their shepherds and their books — the Scriptures, the services, the lives of the saints in the Slavonic words their grandmothers can pray. Yet a temptation follows close behind every such gift, smiling like a friend.",
      },
      {
        speaker: "you",
        text: "Why does it matter so greatly that the Serbs pray in their own tongue and have their own bishops? Could they not simply be Greeks in their faith?",
      },
      {
        speaker: "sava-serbia",
        text: "Because the Gospel is for every nation in its own voice. Recall the Apostles at Pentecost, when every man heard the mighty works of God in his own language. The faith does not erase a people; it baptizes them. A faith that must be borrowed in a foreign tongue stays a guest; a faith prayed in the mother tongue becomes home. So I labored that the Serbs might pray, and weep, and rejoice before God in the speech of their own hearth.",
      },
      {
        speaker: "you",
        text: "Yet you spoke of a temptation hidden in this very gift.",
      },
      {
        speaker: "sava-serbia",
        text: "The same gift can be twisted two ways, my friend. A king may seize the people's Church and make it his servant — that is one snare. Or a people may make the Church a trophy of their blood, loving it because it is THEIRS and despising other Orthodox who are not — that is the other. I must walk between both pits. A prince hears 'a Church FOR the Serbian people' and twists it to 'a Church OF the Serbian crown' — a thing to be owned, bent to the throne, made to bless his wars and silence his rivals. It comes smooth as a courtier's bow.",
      },
      {
        speaker: "you",
        text: "How does a man hold both at once — to love his people dearly, yet never let that love become an idol?",
      },
      {
        speaker: "sava-serbia",
        text: "By loving them in God and not instead of Him. My love for the Serbs is fierce — I have given them their whole spiritual life — yet I dare not forget that a Serb and a Greek and a Bulgar kneel at the one altar, confess the one faith, are saved by the one Christ. The nation is a field I plant; it is not the seed, and it is never the Lord of the harvest. I will not let holiness be made the servant of power, nor the faith be made a banner of one blood above all others.",
      },
      {
        speaker: "narrator",
        text: "A figure in princely silks approaches, gold at his throat, ambition behind his smile. He eyes the archbishop's plain robe with thinly veiled contempt and addresses you, the easier mark.",
      },
      {
        speaker: "tempter",
        text: "Ah — the archbishop's young friend. A Serbian Church! Excellent work, truly. And now it answers to the Serbian king, does it not? It blesses his wars, anoints his cause, declares his rivals enemies of God. The crown made it; the crown shall command it. Is this not the very glory of a Christian nation? Speak — or learn that princes do not suffer monks and their friends to lecture them.",
      },
    ],
    boss: {
      id: "boss-princely-pride",
      name: "The Spirit of Princely Pride",
      title: "Tempter of the Throne",
      tradition: "Caesaropapism and Worldly Power",
      sprite: "tempter",
      maxHp: 220,
      intro:
        "The king built the kingdom; the king's gold built the Church. Therefore the Church is the king's — to command, to wield, to silence when it scolds. What is a bishop but the throne's chaplain?",
      midline:
        "You will not bow the mitre to the crown? Every wise nation yokes its priests to its prince!",
      outro:
        "So the Church belongs to no king... It serves the King of kings, and serves the people by serving Him. The monk has bested the courtier.",
      victoryEpigraph: {
        text:
          "Render therefore unto Caesar the things which are Caesar's; and unto God the things that are God's.",
        source: "The Lord Jesus Christ, Matthew 22:21",
      },
      attacks: [
        {
          claim:
            "The crown founded this Church and endows it. Surely, then, the Church must obey the crown in all things and bless whatever the king commands?",
          options: [
            {
              text: "Render unto Caesar what is Caesar's, and unto God what is God's (Matt 22:21). The Church serves the people, honors the prince, but bows to Christ alone — never trading the truth for the throne's favor.",
              correct: true,
              rationale:
                "Sava ordered the Serbian Church symphonically with the crown yet never subject to it; the Church may cooperate with the state but cannot be its instrument. 'We ought to obey God rather than men' (Acts 5:29).",
            },
            {
              text: "Yes — the king who pays the bishops rightly commands them.",
              correct: false,
              rationale:
                "This is caesaropapism, the subjection of the Church to the state, which the Fathers (and Sava) resisted. The Church's Head is Christ, not Caesar.",
            },
            {
              text: "The Church should rule the state and crown or depose kings at will.",
              correct: false,
              rationale:
                "The opposite error — papal-style temporal supremacy. The Orthodox ideal is symphony, two distinct authorities cooperating, neither swallowing the other.",
            },
            {
              text: "Church and state must have nothing to do with one another.",
              correct: false,
              rationale:
                "Not the Orthodox vision either. Sava wove faith into the nation's life; the relation is symphony, not separation or subjugation.",
            },
          ],
          difficulty: 3,
          taunt: "The crown made you! Obey the crown!",
        },
        {
          claim:
            "You gave the Serbs their own autocephalous Church — proof that the faith is a possession of the nation, a banner of the Serbian blood above other peoples. Is this not the true glory of your work?",
          options: [
            {
              text: "A people's Church is a gift, not a banner of pride. The one Orthodox faith is shared with Greeks, Bulgars, and Rus alike; autocephaly orders the household, it does not exalt one nation above the Body of Christ.",
              correct: true,
              rationale:
                "Autocephaly is administrative self-governance within one shared faith; to make the Church a vehicle of national supremacy is the later error condemned as phyletism (Constantinople, 1872). Sava's aim was the salvation of his people, not their boasting.",
            },
            {
              text: "Correct — the Serbian Church proves the Serbs are God's chosen above all nations.",
              correct: false,
              rationale:
                "This is phyletism, the elevation of ethnicity over the unity of the faith, condemned by the Council of Constantinople in 1872.",
            },
            {
              text: "Each nation has its own true faith, and they need not agree.",
              correct: false,
              rationale:
                "There is 'one Lord, one faith, one baptism' (Eph 4:5). Autocephalous churches share the identical Orthodox faith; they are not separate religions.",
            },
            {
              text: "A national Church owes nothing to the wider Church.",
              correct: false,
              rationale:
                "Autocephaly is self-governance within communion, not isolation. Sava received Serbian autocephaly from the Ecumenical Patriarch and remained in communion with the whole Church.",
            },
          ],
          difficulty: 4,
        },
      ],
    },
    outro: [
      {
        speaker: "tempter",
        text: "So the Church belongs to no king... It serves the King of kings, and serves the people only by serving Him. The monk has bested the courtier. Keep your free Church, then — though I think kings will try this trick again, in ages you cannot dream of.",
      },
      {
        speaker: "narrator",
        text: "Sava reconciled his warring brothers, crowned his brother Stefan 'the First-Crowned,' wrote the laws and the monastic rules of his people, and twice made pilgrimage to the Holy Land. He died at Tarnovo in 1236, returning from the East. Centuries later the Ottomans, fearing his memory still, burned his relics on the hill of Vracar above Belgrade — and the Serbs only loved him the more.",
      },
      {
        speaker: "you",
        text: "You gave them a Church of their own, yet kept it from becoming a weapon of the throne or a boast of the blood.",
      },
      {
        speaker: "sava-serbia",
        text: "I sought only to plant the faith deep in my people without making my people its idol. Holiness wedded to a nation, yet never enslaved to its princes — that is what I prayed to leave behind me. Love your own people, $you, but love them in God; the day a Church boasts of its blood above the Body of Christ, it has begun to lose the very Christ it boasts of. Go now in peace, and remember Pentecost: every tongue, the one Lord.",
      },
      {
        speaker: "st-anthony",
        text: "The Church names him the Enlightener of the Serbs, $you, and rightly. The later ages will call that idol of the blood phyletism, and a council will condemn it; but Sava saw the danger first and refused it.",
      },
      {
        speaker: "st-anthony",
        text: "Now we go back, east and south, to Constantinople and to that Holy Mountain we glimpsed — for the deepest question of this whole journey awaits us there: whether a living man may truly behold God, and what, exactly, he beholds. Take my hand.",
      },
    ],
    reward: { xp: 1, item: "synodikon", healHp: true },
  },

  // =========================================================================
  // CHAPTER 303 — THE HESYCHAST CONTROVERSY (AD 1341–1351)
  // 14th century. St. Gregory Palamas vs. Barlaam the Calabrian.
  // The essence–energies distinction; the uncreated Light of Tabor.
  // The richest level of this batch.
  // =========================================================================
  {
    id: "ch303-palamas",
    number: 303,
    era: "AD 1341–1351",
    location: "The Councils of Constantinople and the cells of Mount Athos",
    title: "The Uncreated Light",
    background: "council-hall",
    ally: "palamas",
    intro: [
      {
        speaker: "narrator",
        text: "Mount Athos at the hour before dawn. In a stone cell lit by one small lamp, an old monk sits utterly still, head bowed to his breast, breathing slow and deep. With each breath his lips move soundlessly around the same words, over and over, without ceasing: 'Lord Jesus Christ, Son of God, have mercy on me, a sinner.'",
      },
      {
        speaker: "st-anthony",
        text: "They call this stillness hesychia, $you, and these monks the hesychasts. They seek to draw the wandering mind down into the heart and there to pray without ceasing, as the Apostle commands. And they say — softly, for it is a holy thing — that in this stillness, by grace, a man may behold the very Light of God: the same uncreated Light that blazed from Christ when He was transfigured upon Mount Tabor.",
      },
      {
        speaker: "you",
        text: "See the Light of God? With his own eyes? That sounds almost too bold to say aloud.",
      },
      {
        speaker: "st-anthony",
        text: "A learned man thinks so too, and has come east to say it loudly. Barlaam, a philosopher of Calabria in Italy — brilliant, sharp-tongued, schooled in the subtleties of the Greeks and the Latins both. He has visited these monks, watched them pray with bowed heads, and gone away to mock them. He calls them omphalopsychoi — 'men with their souls in their navels' — and declares that no living man can see God at all.",
      },
      {
        speaker: "you",
        text: "But why does it matter so much? Let the philosopher mock; let the monks pray. Where is the harm?",
      },
      {
        speaker: "st-anthony",
        text: "Because under the quarrel lies the whole of our salvation. Hear how Barlaam reasons: God's essence — what God IS in Himself — is utterly unknowable, beyond all mind and all sight. So far, true. But then he concludes: therefore whatever light the monks see can only be a created thing — a glow conjured in the imagination, or some trick of the fasting body. To claim a vision of God Himself, he says, is either delusion or pride.",
      },
      {
        speaker: "you",
        text: "And if no one can truly see or touch God, then... what becomes of being saved? Of being joined to Him?",
      },
      {
        speaker: "st-anthony",
        text: "You have found the very wound, $you. If God can in no way be partaken, then grace is merely a created gift He hands us from outside, like a coin; deification — our true sharing in the divine life — is a fable; and every saint who ever wept for joy in prayer saw nothing but his own fancy. The Gospel itself hangs on the answer.",
      },
      {
        speaker: "narrator",
        text: "Into this quarrel steps a monk of Athos, once a hesychast in these very cells, now drawn into the war of words: Gregory Palamas. He turns first to you, his voice quiet but unbending.",
      },
      {
        speaker: "palamas",
        text: "I am Gregory, a monk of the Holy Mountain. I will grant Barlaam half his point, and gladly: God in His ESSENCE — His innermost being, what He IS in Himself — is indeed unknowable, imparticipable, forever beyond every creature. No man sees that and lives. So far we agree. But here he stumbles, for God is not only His hidden essence.",
      },
      {
        speaker: "palamas",
        text: "God in His ENERGIES — His powers, His grace, His glory, His very life as it goes forth and acts — truly comes out to us and is partaken. The Light that blazed from Christ on Tabor was no creature, no symbol kindled for an hour and then quenched. It was God Himself as He shines and acts: uncreated, divine, and yet not the unapproachable essence. I say it plainly: God is partaken in His energies, and imparticipable in His essence.",
      },
      {
        speaker: "you",
        text: "Essence and energies — is that not splitting God in two? Barlaam will surely cry that you preach two gods.",
      },
      {
        speaker: "palamas",
        text: "He will cry exactly that — and he will be wrong. It is no division. It is the one undivided God known in two ways: as He is in Himself, hidden; and as He freely gives Himself, shining. The sun is one, yet you cannot stare at its disk and yet you live wholly in its light and its warmth. Hold to this, for upon it rests the promise that we are made 'partakers of the divine nature' — not of the unknowable essence, but of the uncreated energies. That is deification. That is the whole hope of every Christian.",
      },
      {
        speaker: "you",
        text: "And the breathing, the bowed heads, the endless repeating of the one prayer — Barlaam mocks that most of all. Is the body not a hindrance to so high a thing as seeing God?",
      },
      {
        speaker: "palamas",
        text: "Barlaam is a Platonist at heart; he would save only the mind and cast the body aside as a husk. But the Word became FLESH. The body is a temple of the Holy Spirit, and it shall rise. So I and my brothers pray with the whole self — drawing the scattered mind down into the heart, steadying it with the breath, anchoring it upon the Holy Name. This stillness we call hesychia. It is not magic, and it is not mere chatter of the lips; it is the whole man, body and soul together, turned toward God and waiting in silence for His Light.",
      },
      {
        speaker: "you",
        text: "Then if Barlaam wins, it is not only the monks who lose, but every Christian's hope of ever truly reaching God.",
      },
      {
        speaker: "st-anthony",
        text: "Now you see why three councils will be summoned over what looks like a quarrel of monks, $you. Strip away the uncreated energies and grace becomes a created trinket, the Light of Tabor a parlor trick, and 'have mercy on me' a cry into the dark. All of it stands or falls here. Steel yourself — the philosopher's logic is keen, and he means to cut.",
      },
      {
        speaker: "narrator",
        text: "The scene shifts to the great hall of Constantinople. Three times the Church will sit in council upon this question — in 1341, and again, and a third time in 1351 — and three times vindicate the monks. Barlaam will lose and return to the West; his cause taken up after him by Akindynos and by the historian Gregoras. But here, now, the philosopher himself turns and fixes you with a cold and brilliant eye.",
      },
      {
        speaker: "barlaam",
        text: "So! You side with these navel-gazing monks who fancy they stare at the Almighty with the eyes in their heads. Listen well, novice. God's essence is one, simple, indivisible — to speak of 'energies' apart from it is to hack God into pieces and worship two gods. And His essence is invisible. So either you claim to see THAT — and you lie, for none can — or you see some created glimmer and call it God, which is rank idolatry. Your 'uncreated light' is a contradiction in terms. Defend it, if a peasant's superstition can be defended at all.",
      },
    ],
    boss: {
      id: "boss-barlaam",
      name: "Barlaam the Calabrian",
      title: "The Philosopher Who Denied the Vision of God",
      tradition: "Anti-Hesychast Rationalism",
      sprite: "barlaam",
      maxHp: 280,
      intro:
        "God's essence alone is God, and it is utterly beyond sight. Whatever your monks see on their mountain is therefore a creature — a phantom of the mind. No man sees God and lives. Your 'uncreated light' is a fairy tale dressed in theology.",
      midline:
        "Essence and energies — you split God in two to save your monks! Where in philosophy is such a distinction?",
      outro:
        "The Tomos condemns me... 'God is partaken, yet imparticipable'... I demanded that God be either wholly seen or wholly hidden, and forgot that He is the living God, who gives Himself and yet remains beyond.",
      victoryEpigraph: {
        text:
          "God is partaken, yet imparticipable: partaken in His energies, imparticipable in His essence.",
        source: "St. Gregory Palamas, The Triads (in defense of the holy hesychasts)",
      },
      attacks: [
        {
          claim:
            "God is simple and one; His essence IS Himself. To speak of 'energies' distinct from the essence is to divide God, to invent a second God. There can be no such distinction.",
          options: [
            {
              text: "The distinction does not divide God; it is the one God known in two ways — His essence, forever beyond us, and His energies, by which He truly acts, gives, and is partaken. God is partaken, yet imparticipable.",
              correct: true,
              rationale:
                "Palamas in the Triads: the essence–energies distinction safeguards both God's transcendence (imparticipable essence) and His real self-gift (participable energies). It is a real distinction within the one undivided God, not two gods.",
            },
            {
              text: "You are right — God is utterly simple, so we can know and partake nothing of Him.",
              correct: false,
              rationale:
                "This is Barlaam's error, which makes grace a creature and deification impossible. Yet 'we are partakers of the divine nature' (2 Peter 1:4) by the uncreated energies.",
            },
            {
              text: "The energies are creatures God makes, like effects of fire.",
              correct: false,
              rationale:
                "Akindynos's position, condemned in 1347/1351. The energies are uncreated — God Himself as He acts — not created effects.",
            },
            {
              text: "We participate directly in the divine essence itself.",
              correct: false,
              rationale:
                "This would abolish God's transcendence and make creatures God by nature. The essence remains imparticipable; we partake the energies.",
            },
          ],
          difficulty: 5,
          taunt: "Two gods! You preach two gods!",
        },
        {
          claim:
            "The light your monks claim to see on Tabor was a created radiance — a symbol God made for the moment, or a glow of the air. It cannot be God, for God is invisible. So their 'vision' is delusion.",
          options: [
            {
              text: "The Light of Tabor was uncreated — the very glory and energy of God, in which the disciples beheld Him as far as they could bear (Matt 17:2). The eyes were transformed by grace to see the eternal Light; it was no creature and no trick.",
              correct: true,
              rationale:
                "Palamas: the Taboric light is the uncreated energy of God, eternal and divine, seen by transfigured eyes (Matt 17; 2 Peter 1:16–18). It is the same deifying light the saints behold in prayer.",
            },
            {
              text: "Correct — it was a created sign, so no one saw God Himself.",
              correct: false,
              rationale:
                "Barlaam's claim, condemned by the councils. The light of the Transfiguration is the uncreated glory of God, not a created symbol.",
            },
            {
              text: "Christ merely lit a lamp or used some natural brilliance.",
              correct: false,
              rationale:
                "The Gospel says His face shone like the sun and His garments became light itself (Matt 17:2) — His own divine glory shining through the flesh, not external illumination.",
            },
            {
              text: "The disciples saw God's very essence on the mountain.",
              correct: false,
              rationale:
                "Not the essence, which remains imparticipable, but the uncreated energy and glory. The distinction is precisely Palamas's point.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Even granting your monks see something — what use is breathing exercises and repeating one phrase like a parrot? The body cannot share in prayer. Salvation is of the mind alone.",
          options: [
            {
              text: "The whole man is saved, body and soul; the Jesus Prayer gathers the mind into the heart, and the body itself, redeemed and a temple of the Spirit, shares in the grace (1 Cor 6:19). Christ took flesh to save the flesh.",
              correct: true,
              rationale:
                "Hesychasm engages the whole person; Palamas defended bodily participation in prayer because the body is sanctified and will rise. The Jesus Prayer ('Lord Jesus Christ, Son of God, have mercy on me, a sinner') is its method, not vain repetition.",
            },
            {
              text: "You are right — the body is a prison and only the mind is saved.",
              correct: false,
              rationale:
                "This is a Platonizing dualism the Church rejects. The Word became flesh (John 1:14); the body is sanctified and rises (1 Cor 15).",
            },
            {
              text: "The Jesus Prayer is mere magic words that compel God.",
              correct: false,
              rationale:
                "It is not incantation but unceasing prayer (1 Thess 5:17), calling on the Name in humility — 'have mercy on me, a sinner.'",
            },
            {
              text: "Repetition is condemned by Christ as 'vain babbling.'",
              correct: false,
              rationale:
                "Christ condemned the heathen's vain repetitions thinking to be heard for their many words (Matt 6:7) — not persevering, attentive prayer, which He commands (Luke 18:1).",
            },
          ],
          difficulty: 4,
        },
      ],
    },
    outro: [
      {
        speaker: "barlaam",
        text: "The Tomos condemns me... 'God is partaken, yet imparticipable.' I demanded that God be either wholly seen or wholly hidden — and I forgot that He is the LIVING God, who gives Himself and yet remains beyond. My logic was clean; my heart was empty. I see it now.",
      },
      {
        speaker: "narrator",
        text: "The Councils of Constantinople vindicated Palamas: in 1341 against Barlaam, in 1347 and again in 1351 against Akindynos and Gregoras. The Tomos of 1351 set the seal upon the teaching — that the divine energies are uncreated, that God is truly partaken in His energies though imparticipable in His essence, and that the saints behold the uncreated Light.",
      },
      {
        speaker: "st-anthony",
        text: "Barlaam returned to the West and to Rome; Gregory was made archbishop of Thessalonica, and after his repose the Church numbered him among the saints. To this day, $you, the Second Sunday of Great Lent — the week after the Triumph of Orthodoxy — is kept as the Sunday of Saint Gregory Palamas: a second triumph of Orthodoxy.",
      },
      {
        speaker: "you",
        text: "I think I understand now why three whole councils were needed. It was never a dispute about words. It was about whether 'have mercy on me, a sinner' goes anywhere at all.",
      },
      {
        speaker: "palamas",
        text: "You have understood it rightly. If God cannot be partaken, that prayer echoes into an empty heaven, and all your striving is loneliness dressed as piety. But because His energies are uncreated and freely given, I tell you truly: the least monk in the poorest cell — and you also, wherever your own age sends you back — may be filled with the very Light of Tabor. Do not seek it with pride or with the eyes of the body's appetite; seek it in stillness, in humility, in the unceasing Name. God gives Himself to those who wait for Him.",
      },
      {
        speaker: "narrator",
        text: "And somewhere on the Mountain, before dawn, an old man bows his head to his breast and breathes the Name once more, and the small cell fills, little by little, with a light that casts no shadow.",
      },
    ],
    reward: { xp: 1, item: "philokalia", healHp: true },
  },
];
