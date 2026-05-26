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
        text: "Constantinople burns. The crusaders who took the Cross to free Jerusalem have stormed the greatest Christian city on earth instead. For three days they have plundered, slaughtered, and burned. Smoke hangs in the dome of Hagia Sophia like a stormcloud sealed indoors.",
      },
      {
        speaker: "st-anthony",
        text: "Look what they do, $you. They have torn the silver and gold from the altar, hacked the icons for their settings, smashed the tombs of the emperors. They are Christians — men who wear the Cross on their shoulders — and they ride their mules into the sanctuary to carry off the holy vessels.",
      },
      {
        speaker: "narrator",
        text: "A common woman has been hauled up onto the Patriarch's throne. She sings filthy songs and dances while soldiers laugh, passing wine in the chalices. Niketas Choniates, who saw it, will write that even the Saracens were more merciful than these.",
      },
      {
        speaker: "narrator",
        text: "The schism of 1054 was a quarrel of bishops and a single word. This is a wound in the body itself. Today the people of the East learn what the West has become to them, and they will not forget it for eight hundred years.",
      },
      {
        speaker: "st-anthony",
        text: "Here comes their commander, $you, his surcoat still bearing the Cross, his hands still red. He will call this holy war and the city's fall the judgment of God. Do not let him baptize plunder with the name of piety.",
      },
      {
        speaker: "humbert",
        text: "Schismatic! This city defied the Holy Father and clung to its Greek errors — and see, God has delivered it into our hands. We bear the Cross; what we take, we take for Rome and for Christ. Will you, too, defy the Vicar of Peter? Speak, and I will show you what crusaders do to rebels.",
      },
    ],
    boss: {
      id: "boss-crusader-commander",
      name: "The Crusader Commander",
      title: "Spirit of Conquest in Pious Dress",
      tradition: "The Fourth Crusade",
      sprite: "humbert",
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
        speaker: "narrator",
        text: "The crusaders set up a Latin emperor in the city and ruled it for fifty-seven years before the Byzantines retook a ruined, impoverished capital. The plundered relics and bronze horses adorn Western churches still. When Pope Innocent III learned what had been done, he wrote that the crusaders had turned their swords against Christians, sparing neither religion nor age nor sex.",
      },
      {
        speaker: "st-anthony",
        text: "The schism passed that day from the minds of theologians into the memory of a whole people, $you. A word divided the Church; a sack hardened the division into the heart. Yet even now the faith endures in the East. Come north, to a land where one monk will wed holiness to a whole nation.",
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
    ally: "st-anthony",
    intro: [
      {
        speaker: "narrator",
        text: "A young prince of Serbia named Rastko fled his father's palace by night for the Holy Mountain of Athos, taking the monastic name Sava. There, with his father — who abdicated his throne to become the monk Symeon — he raised up the monastery of Hilandar, a Serbian house among the Greek monasteries of the Mountain.",
      },
      {
        speaker: "st-anthony",
        text: "Sava, $you — son of Stefan Nemanja, the great founder of the Serbian kingdom. He has come down from Athos to give his people what no nation can buy: not merely a church, but their own Church, ordering, teaching, and praying in their own tongue, knit into the very life of the Serbs.",
      },
      {
        speaker: "narrator",
        text: "In 1219 Sava travelled to Nicaea, where the exiled Patriarch of Constantinople then dwelt, and received from him the autocephaly of the Serbian Church and consecration as its first archbishop. He returned to crown and to teach, to build and to reconcile his quarreling royal brothers.",
      },
      {
        speaker: "narrator",
        text: "Sava turns to you, the simple black robe of Athos still on him though an archbishop now. 'A people without their own Church are sheep scattered. I have given the Serbs their shepherds and their books. But there is a temptation that follows close behind such a gift.'",
      },
      {
        speaker: "st-anthony",
        text: "Mark it, $you. A prince, hearing of a Church for the Serbian people, sees a Church OF the Serbian crown — a thing to be owned, bent to the throne, used as a weapon of the state. That is the lie that creeps in now, smooth as a courtier. Do not let holiness be made the servant of power.",
      },
      {
        speaker: "tempter",
        text: "Archbishop's friend. A Serbian Church — excellent! Now it answers to the Serbian king, blesses his wars, anoints his cause, and silences his rivals. The crown made it; the crown shall command it. Is this not the glory of a Christian nation? Speak — or learn that princes do not suffer monks to lecture them.",
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
        speaker: "narrator",
        text: "Sava reconciled his warring brothers, crowned his brother Stefan 'the First-Crowned,' wrote the law and the typika of his people, and made two pilgrimages to the Holy Land. He died at Tarnovo in 1236 returning from the East. Centuries later the Ottomans, fearing his memory, burned his relics on a hill above Belgrade — and the Serbs only loved him the more.",
      },
      {
        speaker: "st-anthony",
        text: "He is the Enlightener of the Serbs, $you — holiness wedded to a people without being enslaved to its princes. A faith planted in a nation, yet never the nation's idol. Now east and south, to Constantinople and the Holy Mountain, for the deepest question of all: whether the saints truly see God.",
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
    ally: "st-anthony",
    intro: [
      {
        speaker: "narrator",
        text: "Mount Athos. In the silence of the cells, monks sit with bowed heads, breathing slowly, repeating without ceasing the words: 'Lord Jesus Christ, Son of God, have mercy on me, a sinner.' They call this stillness hesychia, and they say that in it, by grace, a man may behold the very Light of God — the same Light that shone from Christ on Mount Tabor.",
      },
      {
        speaker: "st-anthony",
        text: "These are the hesychasts, $you. And their champion is the monk Gregory Palamas, once of Athos, now in the thick of war. A learned philosopher from Calabria in Italy — Barlaam — has come east and mocks these monks. He calls them omphalopsychoi, 'navel-soul men,' and says no man living can see God at all.",
      },
      {
        speaker: "narrator",
        text: "Barlaam reasons thus: God's essence is utterly unknowable and beyond all sight; therefore whatever light the monks see can be no more than a created thing, a glow in the mind, or a trick of the body. To claim a vision of God Himself, he says, is delusion or pride.",
      },
      {
        speaker: "narrator",
        text: "Palamas answers with a distinction sharp as a sword. 'God in His essence is indeed unknowable, imparticipable, beyond all creatures. But God in His energies — His powers, His grace, His glory — truly goes forth and is partaken. The Light of Tabor is not a creature; it is God Himself as He acts and shines, uncreated, yet not His hidden essence.'",
      },
      {
        speaker: "st-anthony",
        text: "Hold to this, $you, for everything hangs upon it: that we are truly made 'partakers of the divine nature' (2 Peter 1:4) — not of the unknowable essence, but of the uncreated energies. If Barlaam is right, then grace is a creature, deification is a fable, and the saints have seen nothing. Three councils at Constantinople will sit upon this question.",
      },
      {
        speaker: "narrator",
        text: "The councils gather — 1341 in the great hall, and again, and a third time in 1351. Barlaam's cause is taken up after him by Akindynos and Gregoras. And now the philosopher himself fixes you with a cold and brilliant eye.",
      },
      {
        speaker: "humbert",
        text: "So you side with these navel-gazing monks who imagine they stare at God with bodily eyes! Listen, novice: God's essence is one and simple. Either you see it — and you do not, for it is invisible — or you see a creature and call it God, which is idolatry. Your 'uncreated light' is a contradiction. Defend it, if a peasant's superstition can be defended at all.",
      },
    ],
    boss: {
      id: "boss-barlaam",
      name: "Barlaam the Calabrian",
      title: "The Philosopher Who Denied the Vision of God",
      tradition: "Anti-Hesychast Rationalism",
      sprite: "humbert",
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
        speaker: "narrator",
        text: "The Councils of Constantinople vindicated Palamas: in 1341 against Barlaam, in 1347 and again in 1351 against Akindynos and Gregoras. The Tomos of 1351 set the seal upon the teaching — that the divine energies are uncreated, that God is truly partaken in His energies though imparticipable in His essence, and that the saints behold the uncreated Light.",
      },
      {
        speaker: "st-anthony",
        text: "Barlaam returned to the West and to Rome; Palamas was made archbishop of Thessalonica, and after his repose the Church numbered him among the saints. To this day, $you, the Second Sunday of Great Lent — the very week after the Triumph of Orthodoxy — is kept as the Sunday of Saint Gregory Palamas, a second triumph of Orthodoxy.",
      },
      {
        speaker: "narrator",
        text: "For the question was never academic. If God cannot be partaken, then 'have mercy on me, a sinner' echoes into an empty heaven. But because His energies are uncreated and freely given, the least monk in the poorest cell may be filled with the very Light of Tabor — and so may you.",
      },
    ],
    reward: { xp: 1, item: "philokalia", healHp: true },
  },
];
