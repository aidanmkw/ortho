import type { Chapter } from "./types";
import { EXPANSION_CHAPTERS } from "@/content/quest/expansion";
import { EXPANSION_CHAPTERS_2 } from "@/content/quest/expansion-2";
import { EXPANSION_CHAPTERS_3 } from "@/content/quest/expansion-3";
import { EXPANSION_CHAPTERS_4 } from "@/content/quest/expansion-4";

// Each chapter: setting + 2-6 narrative dialog lines + boss with 3-5 attacks +
// outro + reward. Speaker IDs match sprite ids in lib/quest/sprites.ts.
// "$you" is replaced at runtime with the hero's name.

const BASE_CHAPTERS: Chapter[] = [
  // ===================================================================
  // CHAPTER 1 — THE OPENING (Modern → Antioch road)
  // ===================================================================
  {
    id: "ch1-antioch",
    number: 1,
    era: "AD 107",
    location: "The Road to Rome, near Smyrna",
    title: "The Letters in Chains",
    background: "road-roman",
    ally: "st-ignatius",
    intro: [
      {
        speaker: "narrator",
        text: "Three a.m. The campus library is empty. On the bottom shelf — a book bound in worn black leather. A three-bar cross is stamped on the cover.",
      },
      {
        speaker: "narrator",
        text: "You open it. The page is blank. Then letters bloom from the parchment, in Greek and in English. The room dims. Wind rises from the page itself.",
      },
      {
        speaker: "you",
        text: "What is happen—",
      },
      {
        speaker: "narrator",
        text: "And then — dust. Olive trees. A Roman road, paved with worn basalt and rutted by ox-carts. The smell of crushed thyme. Somewhere a soldier's hobnailed sandals scrape the stone. The year is one hundred and seven.",
      },
      {
        speaker: "narrator",
        text: "The Mediterranean sun is merciless. To the south, the walls of Smyrna. The Apostle John has been dead barely a decade; men still live who heard him preach. The faith is young, illegal, and growing like a fire in dry grass.",
      },
      {
        speaker: "st-anthony",
        text: "Welcome, $you. You have been called.",
      },
      {
        speaker: "you",
        text: "Who are you? Where — when — am I?",
      },
      {
        speaker: "st-anthony",
        text: "Anthony, of Egypt — though my own desert is two centuries yet to come. The Lord granted me a vision of you. The Church needs witnesses in every age, $you — and the age you come from is starved of them.",
      },
      {
        speaker: "st-anthony",
        text: "You stand in the reign of Trajan. To follow Christ now is to live under sentence of death. There is no Christendom, no cathedrals, no Bible bound between two covers — only the breaking of bread in secret, and bishops who remember the Apostles' faces.",
      },
      {
        speaker: "you",
        text: "Then why bring me to a road?",
      },
      {
        speaker: "st-anthony",
        text: "Because a man walks it under guard, and he is the heart of this hour. There — see the chains? Ten leopards, he calls his soldiers, for they grow crueler the kinder he is to them. Speak with him before they take him to the ships. We have not much time.",
      },
      {
        speaker: "st-ignatius",
        text: "Stranger. I am Ignatius, bishop of Antioch — Theophoros, the God-bearer, they have called me since I was a child. They take me to Rome, to the beasts in the amphitheatre.",
      },
      {
        speaker: "you",
        text: "You speak of it so calmly. You are going to die.",
      },
      {
        speaker: "st-ignatius",
        text: "I rejoice — for I shall be the wheat of God, ground by the teeth of beasts to be found the pure bread of Christ. Do not, I beg you, try to save me by your kindness. Let me be poured out while the altar is ready.",
      },
      {
        speaker: "st-ignatius",
        text: "I write letters along this road — to Ephesus, to the Romans, to my beloved Polycarp of Smyrna. Take this one, to the Smyrnaeans. Read it, and learn what they will deny in ages to come: the Eucharist IS the flesh of our Saviour Jesus Christ, which suffered for our sins and which the Father raised.",
      },
      {
        speaker: "st-ignatius",
        text: "And learn this too: where the bishop is, there let the people be, even as where Christ is, there is the Catholic Church. The flock is not scattered sheep; it is one Body, knit in one altar, one cup.",
      },
      {
        speaker: "you",
        text: "Why does Rome hate you so? You harm no one.",
      },
      {
        speaker: "st-ignatius",
        text: "Because we will not call Caesar a god. We confess one Lord, and Rome cannot abide a kingdom not its own. To them we are 'atheists' — for we deny their many gods. The price of that word is the arena.",
      },
      {
        speaker: "narrator",
        text: "Hobnails on stone. A Roman centurion strides up the road, hand on the pommel of his gladius. His face is dark with hatred and confusion — and something else, buried deep: fear of these people who do not fear him.",
      },
      {
        speaker: "centurion",
        text: "You! Stranger! Are you another of these Christ-followers? Then answer me — and the lash will answer you if you fail.",
      },
    ],
    boss: {
      id: "boss-centurion",
      name: "Roman Centurion Lucius",
      title: "Captain of the Guard",
      tradition: "Pagan Rome",
      sprite: "centurion", // we'll override in component
      maxHp: 140,
      intro: "You Christians refuse the gods. Atheists! Tell me — what is this 'Christ' worth dying for?",
      midline: "Hah! A clever tongue. But the gods of Rome have not yet had their say.",
      outro:
        "Curse you... my men whisper that several of them feel... drawn... by what you have said.",
      victoryEpigraph: {
        text: "Where the bishop is, there let the multitude be; just as where Jesus Christ is, there is the Catholic Church.",
        source: "St. Ignatius, Smyrnaeans 8:2",
      },
      attacks: [
        {
          claim:
            "Your meal of bread and wine — surely you do not really mean that you eat the flesh of a dead man?",
          options: [
            {
              text: "It is a symbol only — a memorial meal. We do not literally eat flesh.",
              correct: false,
              rationale:
                "Wrong! This is the Zwinglian reading of the Eucharist — a 16th-century innovation, not the apostolic teaching.",
            },
            {
              text: "The Eucharist IS the flesh of our Saviour, which suffered for our sins and which the Father raised.",
              correct: true,
              rationale:
                "Right. St. Ignatius's exact words (Smyrnaeans 7:1). The Real Presence is apostolic, not medieval.",
            },
            {
              text: "We worship the bread itself as a separate god.",
              correct: false,
              rationale: "Pagan misunderstanding — there is one God, not loaves.",
            },
            {
              text: "Christ is present only when we feel His presence emotionally.",
              correct: false,
              rationale:
                "Subjectivism — the Eucharist is objectively the Body and Blood whether we feel it or not.",
            },
          ],
          difficulty: 3,
          taunt: "Speak straight, Christ-follower!",
        },
        {
          claim:
            "You claim to obey one God only — but your bishop, your priest, your whole hierarchy! Why so many masters?",
          options: [
            {
              text: "Be subject to the bishop as Jesus Christ is to the Father — the unity of the Church reflects the unity of God.",
              correct: true,
              rationale:
                "St. Ignatius, Magnesians 13:2. The episcopate is image of divine order.",
            },
            {
              text: "We have no hierarchy. Each Christian is his own pope.",
              correct: false,
              rationale:
                "This is the Anabaptist / radical-Reformation view — foreign to the early Church.",
            },
            {
              text: "We worship the bishop as a god.",
              correct: false,
              rationale: "Idolatry. The bishop is a servant of God.",
            },
            {
              text: "The hierarchy is corrupt; we ignore it.",
              correct: false,
              rationale:
                "Donatist-style sectarianism. The Church preserves apostolic order despite human weakness.",
            },
          ],
          difficulty: 2,
          taunt: "Answer plainly!",
        },
        {
          claim:
            "If you so love your god — then why do you fear death? Why not just kill yourselves and join him?",
          options: [
            {
              text: "Suicide is sin. We do not seek death; we accept it when faithfulness requires it.",
              correct: true,
              rationale:
                "The early Church explicitly forbade suicide-martyrdom; the Letter of the Smyrnaeans on Polycarp specifically distinguishes.",
            },
            {
              text: "We do seek death — death is our god.",
              correct: false,
              rationale: "Nihilism. The God of life is not the god of death.",
            },
            {
              text: "We fear death, so we lie about heaven.",
              correct: false,
              rationale: "Cynicism rejected by every martyr who ever suffered.",
            },
            {
              text: "There is no death; the body is an illusion.",
              correct: false,
              rationale: "Gnostic / Docetic. Christ rose bodily; we will too.",
            },
          ],
          difficulty: 3,
          taunt: "I have killed Christians before. Are you next?",
        },
        {
          claim:
            "Your books — these 'gospels' — were written by fishermen. Why should the wise believe peasants?",
          options: [
            {
              text: "God chose the foolish to shame the wise (1 Cor 1:27). The fishermen saw Him risen.",
              correct: true,
              rationale: "Paul's exact argument. The witnesses, not their pedigree, are the point.",
            },
            {
              text: "Our writers were not really fishermen but philosophers.",
              correct: false,
              rationale: "This denies the historical record.",
            },
            {
              text: "The books are not really inspired; we just like the stories.",
              correct: false,
              rationale: "Self-defeating. Scripture is theopneustos (2 Tim 3:16).",
            },
            {
              text: "We do not really read the books; we follow our feelings.",
              correct: false,
              rationale: "Subjectivism. The apostolic deposit is objective.",
            },
          ],
          difficulty: 2,
        },
        {
          claim:
            "Why not just offer a pinch of incense to Caesar's image? It is only a formality. Then go home to your Christ.",
          options: [
            {
              text: "I will not. 'Eighty-six years I have served Him, and He has done me no wrong; how can I blaspheme my King?' We worship one Lord only.",
              correct: true,
              rationale:
                "St. Polycarp's words to the Roman proconsul (Martyrdom of Polycarp 9). The act, not the heart, is the test of allegiance.",
            },
            {
              text: "Fine — a small pinch. God knows my heart is for Him.",
              correct: false,
              rationale:
                "This is the libellatici compromise — apostates who 'just got the certificate.' The Church received them back only with long penance, because the public act IS the denial.",
            },
            {
              text: "Caesar is a god in his way. I can honor him with the others.",
              correct: false,
              rationale:
                "Outright apostasy — exactly what Rome demanded. 'Thou shalt have no other gods before Me' (Exodus 20:3).",
            },
            {
              text: "Incense is fine; only blood sacrifice matters.",
              correct: false,
              rationale:
                "The ancient Church judged that any cultic act before the imperial image was idolatry, regardless of the substance offered.",
            },
          ],
          difficulty: 3,
          taunt: "Just a pinch. So little. So easy.",
        },
        {
          claim:
            "Why do you Christians gather on the 'first day' instead of the Sabbath? You break the Law of your own God!",
          options: [
            {
              text: "The Lord rose on the first day. The Apostles broke bread on the first day (Acts 20:7). We call it the Lord's Day — the eighth day, the day of new creation.",
              correct: true,
              rationale:
                "Confirmed by the Didache (14:1) and St. Justin's Apology (1.67). Sunday is apostolic.",
            },
            {
              text: "We secretly still keep the Sabbath; Sunday is just for show.",
              correct: false,
              rationale:
                "Judaizing — exactly what St. Paul fought in Galatians. The Sabbath is fulfilled in Christ, not retained alongside Sunday.",
            },
            {
              text: "Constantine moved the day in the 4th century to please pagans.",
              correct: false,
              rationale:
                "A common modern myth. Sunday worship is attested by Ignatius (~107 AD), long before Constantine. He merely made it a civil holiday.",
            },
            {
              text: "The day does not matter; we worship every day equally.",
              correct: false,
              rationale:
                "We do pray daily, but the eucharistic gathering 'on the first day of the week' is apostolic command, not preference.",
            },
          ],
          difficulty: 2,
        },
        {
          claim:
            "If your Jesus was crucified by Rome, how do you say he lives? Bodies stay in tombs, Christ-follower. You worship a corpse.",
          options: [
            {
              text: "Over five hundred saw Him risen at once (1 Cor 15:6). The Apostles died for what they saw — men do not die for what they know to be a lie.",
              correct: true,
              rationale:
                "St. Paul's argument in 1 Corinthians 15. The bodily resurrection is the hinge of the faith.",
            },
            {
              text: "He rose only in our hearts, as a beautiful idea.",
              correct: false,
              rationale:
                "This is the modernist 'Easter faith' — explicitly rejected by 1 Corinthians 15:14: 'if Christ is not raised, our faith is in vain.'",
            },
            {
              text: "His soul went to heaven; the body decayed like any other.",
              correct: false,
              rationale:
                "This is closer to Greek dualism than Christian teaching. The tomb was empty; the body was glorified, not abandoned.",
            },
            {
              text: "The Apostles stole the body and made up the story.",
              correct: false,
              rationale:
                "The first lie circulated about the empty tomb (Matt 28:13). But thieves do not die torturous deaths for a hoax they invented.",
            },
          ],
          difficulty: 3,
          taunt: "Show me the body. There is no body, because there is no resurrection.",
        },
      ],
    },
    outro: [
      {
        speaker: "centurion",
        text: "Enough! ...I will report you spoke well. Go. But know that Rome remembers.",
      },
      {
        speaker: "narrator",
        text: "The centurion turns away — but he glances back once, and his men are murmuring among themselves. A seed has fallen on hard ground. Whether it takes root, only God knows.",
      },
      {
        speaker: "st-ignatius",
        text:
          "Well spoken, $you. You see now that the Faith is not argued into the world — it is bled into it. Take my letter as your shield. And remember: 'I am the wheat of God, ground by the teeth of beasts to be found the pure bread of Christ.'",
      },
      {
        speaker: "you",
        text: "Bishop — will I see you again?",
      },
      {
        speaker: "st-ignatius",
        text:
          "In the Kingdom, child. Pray for me, that I may not merely be CALLED a Christian, but be found one. Now go — your road is longer than mine.",
      },
      {
        speaker: "narrator",
        text: "He shuffles on toward the ships and the city of his crown. In a few weeks his blood will water Rome. His letters will outlast the empire that killed him.",
      },
      {
        speaker: "st-anthony",
        text: "He goes to his glory. Hold his words close — they will be your first lesson when the world says the early Church believed nothing definite. Onward, $you. The persecutions deepen. Take my hand.",
      },
    ],
    reward: { xp: 1, item: "icon-christ", healHp: true },
  },

  // ===================================================================
  // CHAPTER 2 — CATACOMB OF PRISCILLA (AD 250, Decian persecution)
  // ===================================================================
  {
    id: "ch2-catacombs",
    number: 2,
    era: "AD 250",
    location: "Catacomb of Priscilla, Rome",
    title: "Among the Bones of the Witnesses",
    background: "catacombs",
    ally: "st-anthony",
    intro: [
      {
        speaker: "narrator",
        text: "Darkness. The smell of clay and old bone. A torch sputters in a wall-niche. You descend a narrow stair cut into volcanic tufa, past shelf upon shelf of loculi — the wrapped dead, sealed behind marble and tile.",
      },
      {
        speaker: "narrator",
        text: "The passage opens into a small chamber. Frescoes glow on the curved ceiling — a young beardless shepherd carries a lamb across his shoulders; a woman cradles a child; a man stands praying with arms raised, an orant.",
      },
      {
        speaker: "st-anthony",
        text:
          "The Catacomb of Priscilla, beneath the Via Salaria. The year is two hundred and fifty. The Emperor Decius has issued an edict: every soul in the Empire must sacrifice to the gods and receive a certificate — a libellus — or die. Many Christians have fled here, beneath the streets of Rome.",
      },
      {
        speaker: "you",
        text: "It is a city of the dead.",
      },
      {
        speaker: "st-anthony",
        text:
          "And the living gather here to break bread upon the tombs of the martyrs — the first altars are slabs over holy bones. From this the Church will never part: every altar, in every age, will hold a relic. Here is where that began.",
      },
      {
        speaker: "st-anthony",
        text:
          "Look — there, on the wall. A woman with her child, and beside her a prophet pointing to a star. Painted while men who knew the Apostles still drew breath. The oldest image of the Theotokos in all the world.",
      },
      {
        speaker: "narrator",
        text:
          "Down the gallery a low chant rises — a dozen voices in the dark, ragged and unafraid. A bishop in a plain tunic breaks a loaf over a marble slab; the slab is a grave. Children press close. An old woman weeps without sound.",
      },
      {
        speaker: "st-anthony",
        text:
          "These are people who buried a son last week — Decius took him. They sing anyway. This is the Church you have come from, $you, before it had a single basilica: a frightened, joyful flock breaking bread over the bones of those who would not bow.",
      },
      {
        speaker: "you",
        text: "I have heard it said — in my own age — that making images of Christ and the saints is idolatry. That the first Christians never did such things.",
      },
      {
        speaker: "st-anthony",
        text:
          "Then they have not entered a catacomb. Look around you — the Good Shepherd, Jonah and the whale, Daniel among the lions, the raising of Lazarus. Image-making in the Christian community is as old as the community itself. The wall preaches what some will one day deny.",
      },
      {
        speaker: "st-anthony",
        text:
          "But beware — the worst danger now is not the lions. It is the certificate. Some buy a libellus through bribes, or burn a pinch of incense 'just for show,' and tell themselves their heart is still Christ's. The Church will spend years deciding how to receive such lapsed back. The act of denial is itself the denial.",
      },
      {
        speaker: "you",
        text: "Then a man may keep Christ in his heart and still betray Him with his hand?",
      },
      {
        speaker: "st-anthony",
        text:
          "Just so. A bishop named Cyprian, in Carthage, fights this very battle now — the lapsi, the fallen, weeping at the church doors begging to return. He will not turn them away forever, but neither will he pretend the fall did not happen. Mercy and truth must kiss, $you, or they are neither.",
      },
      {
        speaker: "narrator",
        text: "Footsteps echo down the gallery — measured, unhurried, the tread of a man who has never had to run. A figure steps from the shadows into the torchlight: tall, clean-shaven, in a fine senatorial toga edged with purple. He is no fugitive. He is no friend.",
      },
      {
        speaker: "marcus",
        text:
          "Marcus Aurelius Verus. Roman citizen, and a man of philosophy. I followed your people down here. I have come to debate, not to arrest — yet. Show me your god, Christ-follower. Show me you are no idolater, no atheist, no enemy of Rome.",
      },
      {
        speaker: "st-anthony",
        text:
          "Answer him truly, $you. He is the better sort of pagan — curious, not cruel. Win his mind and you may win his soul. Tertullian will soon write that the blood of the martyrs is seed; so too is a question honestly answered.",
      },
    ],
    boss: {
      id: "boss-marcus",
      name: "Marcus Verus",
      title: "Pagan Patrician",
      tradition: "Pagan Rome",
      sprite: "marcus",
      maxHp: 180,
      intro:
        "Your tomb is full of painted gods. Your religion is no different from ours.",
      midline:
        "Hmph. You speak well — but no Christian I knew has answered me this far.",
      outro:
        "I... must think on what you have said. I will not arrest you. But this conversation is not over.",
      victoryEpigraph: {
        text: "I do not worship matter; I worship the Creator of matter, who became matter for my sake.",
        source: "St. John of Damascus, On the Divine Images I.16",
      },
      attacks: [
        {
          claim:
            "Your catacomb walls are covered with pictures. The Jewish Law forbids images. You contradict your own Scripture!",
          options: [
            {
              text:
                "The same God who said 'make no graven image' commanded Moses to make cherubim of gold (Ex 25:18). Forbidden: false gods. Allowed: sacred images.",
              correct: true,
              rationale:
                "The Second Commandment forbids worshipping created things AS gods, not all image-making.",
            },
            {
              text: "We Christians have replaced the Law; no commandment applies now.",
              correct: false,
              rationale: "Marcionism — the heresy that rejected the Old Testament.",
            },
            {
              text: "We do worship the images as gods.",
              correct: false,
              rationale: "Idolatry. Christianity venerates icons; it does not worship them.",
            },
            {
              text: "These are not really images; they are mere decoration.",
              correct: false,
              rationale: "Evasion. The Christian use of imagery is theological, not decorative.",
            },
          ],
          difficulty: 3,
        },
        {
          claim:
            "You bow before these pictures. You kiss them. That is exactly what we do for our idols.",
          options: [
            {
              text:
                "We give them HONOR (proskynesis), not WORSHIP (latreia). The two are distinguished sharply.",
              correct: true,
              rationale:
                "Nicaea II (787) made the distinction conciliar. The same distinction underlies how you greet a friend vs. worship a god.",
            },
            {
              text: "You are right — we worship them as gods.",
              correct: false,
              rationale: "This is the iconoclast misreading.",
            },
            {
              text: "We do not actually venerate them; the pictures are forbidden.",
              correct: false,
              rationale: "This is iconoclasm. The Church explicitly affirms veneration.",
            },
            {
              text: "There is no difference between honor and worship.",
              correct: false,
              rationale:
                "The distinction is fundamental. We honor parents, kings, saints; we worship God alone.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "Your god died on a cross. A criminal's death. What kind of god is killed by his own creation?",
          options: [
            {
              text:
                "Precisely the God who loves His creation enough to enter it, suffer it, and conquer death from within.",
              correct: true,
              rationale:
                "The Cross is the heart of the Gospel — God's voluntary self-gift, not weakness but love.",
            },
            {
              text: "Christ did not really die; it only appeared so.",
              correct: false,
              rationale: "Docetism — denied by Ignatius in your very century (Trallians 10).",
            },
            {
              text: "Christ was a god who tried to escape death but failed.",
              correct: false,
              rationale: "Blasphemy. Christ freely laid down His life (John 10:18).",
            },
            {
              text: "We are embarrassed by the cross and try not to mention it.",
              correct: false,
              rationale:
                "Paul gloried in nothing but the cross of our Lord Jesus Christ (Gal 6:14).",
            },
          ],
          difficulty: 3,
        },
        {
          claim:
            "Your dead are buried with their bones in these walls. We Romans burn our dead. Surely Christ rose without His body — He is too pure for flesh.",
          options: [
            {
              text:
                "He rose in His body — the same body that was wounded. Thomas touched His side. We will rise in our bodies too.",
              correct: true,
              rationale:
                "Luke 24:39; John 20:27; 1 Cor 15. Bodily resurrection is foundational.",
            },
            {
              text: "His body was discarded; only the soul returned.",
              correct: false,
              rationale: "Gnostic dualism — refuted by Irenaeus in this very century.",
            },
            {
              text: "Resurrection is a metaphor for inner change.",
              correct: false,
              rationale: "If Christ has not been raised, our faith is in vain (1 Cor 15:14).",
            },
            {
              text: "He rose in a different, ethereal body — not really physical.",
              correct: false,
              rationale: "Origenist — condemned at Constantinople II (553).",
            },
          ],
          difficulty: 3,
        },
        {
          claim:
            "Your initiation rite — washing with water. We have the same in the mysteries of Isis and Mithras. What is the difference?",
          options: [
            {
              text: "Christian baptism unites us to Christ's death and resurrection (Rom 6:3-4). It is not a symbol of purification but an actual death and rebirth into His Body.",
              correct: true,
              rationale:
                "St. Paul's central baptismal teaching. The Mysteries imitated something; baptism IS the thing.",
            },
            {
              text: "It is the same ritual; the names of the gods differ.",
              correct: false,
              rationale:
                "This is the History-of-Religions School thesis (Reitzenstein, etc.), comprehensively answered. The forms differ, the substance entirely.",
            },
            {
              text: "Our water is from holy springs blessed by the priest's prayer alone.",
              correct: false,
              rationale:
                "The water is sanctified, yes — but baptism's efficacy is from Christ's command and the Spirit's descent, not the water's source.",
            },
            {
              text: "Baptism is only a public sign that one has already become Christian inwardly.",
              correct: false,
              rationale:
                "This is the Zwinglian / Anabaptist sign-only view. Apostolic teaching is regenerative — 'baptism now saves you' (1 Peter 3:21).",
            },
          ],
          difficulty: 3,
          taunt: "Water is water, Christ-follower.",
        },
        {
          claim:
            "I see your dead are honored with prayers and feasts. You pray TO the dead! Necromancy is not new; we Romans did it for centuries.",
          options: [
            {
              text: "Those in Christ are not dead but alive in Him (Luke 20:38). We ask their prayers as we ask any brother's — they are 'a great cloud of witnesses' (Heb 12:1).",
              correct: true,
              rationale:
                "Hebrews 12:1 and the witness of every catacomb fresco. The martyrs intercede; they are not consulted as oracles.",
            },
            {
              text: "We summon their spirits to speak through mediums.",
              correct: false,
              rationale:
                "This IS necromancy — forbidden in Deuteronomy 18:11. Asking saints to pray is the opposite: we ask, we do not conjure.",
            },
            {
              text: "We do not really pray to the saints; that is a later corruption.",
              correct: false,
              rationale:
                "Refuted by the catacomb inscriptions themselves — 'St. Peter, St. Paul, pray for Victor' dates to the 3rd century.",
            },
            {
              text: "They cannot hear us, but praying to them comforts us.",
              correct: false,
              rationale:
                "The saints are conscious in Christ, beholding His face (Rev 6:9-10). To deny their hearing is to make the resurrection a fiction.",
            },
          ],
          difficulty: 3,
        },
        {
          claim:
            "Why this strange refusal of marriage and concubines among some of you? Even our gods enjoyed themselves. The body is for pleasure!",
          options: [
            {
              text: "The body is good — it will rise! But it is also a temple of the Spirit (1 Cor 6:19). Some keep virginity for the Kingdom; all keep purity within marriage.",
              correct: true,
              rationale:
                "St. Paul in 1 Cor 6-7. Christian celibacy is not a denial of the body's goodness but a foretaste of the angelic life (Matt 22:30).",
            },
            {
              text: "The body is evil; marriage is a concession for the weak.",
              correct: false,
              rationale:
                "Encratite / Gnostic — condemned. Hebrews 13:4: 'Marriage is honorable.' The body is good because Christ took flesh.",
            },
            {
              text: "Only priests must be celibate; everyone else may live as they wish.",
              correct: false,
              rationale:
                "The Christian moral law binds ALL — chastity in singleness, fidelity in marriage. The Sermon on the Mount applies to all.",
            },
            {
              text: "We tolerate it but do not really teach it.",
              correct: false,
              rationale:
                "The early Church was famous in Rome precisely for sexual restraint — Aristides, Justin, the Letter to Diognetus all attest this.",
            },
          ],
          difficulty: 2,
        },
      ],
    },
    outro: [
      {
        speaker: "marcus",
        text:
          "I came to mock and stayed to think. You have not been like the others — you do not rave, you do not flatter. Tell me, then — where can I find the woman in your fresco, the one who feeds you all? I would learn more.",
      },
      {
        speaker: "you",
        text:
          "She is no woman of paint, Marcus. The child she holds is God. Come — there is a bishop who will teach you, and water that makes a man new.",
      },
      {
        speaker: "narrator",
        text:
          "He lingers a long moment before the fresco of the Theotokos, the torchlight trembling on his face. Then he turns and climbs back toward the sunlit streets of Rome — a different man than the one who descended.",
      },
      {
        speaker: "narrator",
        text:
          "Behind you, the bishop finishes the breaking of bread. The mourners come forward one by one — even the weeping old woman — and the dark chamber fills with a strange, stubborn peace, the peace of people who have already buried their fear with their dead.",
      },
      {
        speaker: "st-anthony",
        text:
          "He may yet become a brother. 'The blood of Christians is seed,' Tertullian will write within a generation — and so are the questions answered in the dark. The Church grows downward, into the catacombs, before it ever rises into basilicas.",
      },
      {
        speaker: "you",
        text: "They have nothing — no temple, no safety, no law on their side. Yet they sing as though they have already won.",
      },
      {
        speaker: "st-anthony",
        text:
          "Because they have, child. Remember this chamber when men tell you the early Church was a vague brotherhood with no altar, no Theotokos, no images, no martyrs' bones. You have stood in the proof.",
      },
      {
        speaker: "st-anthony",
        text:
          "$you, you have earned an icon of the Theotokos. Carry her with you. Now — Constantine's vision is coming. The age of blood gives way to the age of councils, and a far subtler enemy than any centurion. To Nicaea.",
      },
    ],
    reward: { xp: 1, item: "icon-theotokos", healHp: true },
  },

  // ===================================================================
  // CHAPTER 3 — NICAEA (AD 325)
  // ===================================================================
  {
    id: "ch3-nicaea",
    number: 3,
    era: "AD 325",
    location: "First Ecumenical Council, Nicaea",
    title: "Begotten, Not Made",
    background: "council-hall",
    ally: "st-athanasius",
    intro: [
      {
        speaker: "narrator",
        text:
          "A grand hall in the imperial palace at Nicaea, in Bithynia. Three hundred and eighteen bishops are gathered — the first time the bishops of the whole world have ever assembled in one place. Summer of three hundred and twenty-five.",
      },
      {
        speaker: "narrator",
        text:
          "Many bear the scars of Diocletian's terror — an eye gouged out, a hand crippled, the tendons of a leg severed. The Edict of Milan is only twelve years old. These men remember the lions; some were freed from the mines mere months ago.",
      },
      {
        speaker: "narrator",
        text:
          "At the head of the hall sits Constantine himself, robed in gold and purple, the first emperor to bow to Christ. He has called this council to heal a quarrel that has split his new empire down the middle.",
      },
      {
        speaker: "st-anthony",
        text:
          "The First Ecumenical Council, $you. The greatest crisis since the Apostles. A presbyter of Alexandria named Arius teaches that the Son of God is a creature — the first and highest of all created things, but a creature still. That there was, as he sings it, 'a time when He was not.'",
      },
      {
        speaker: "st-anthony",
        text:
          "And the song has caught fire across the world. Sailors chant it on the docks. Bakers hum it at their ovens. Money-changers debate the Begotten and the Unbegotten in the marketplace. The Church may yet be lost — not by the sword this time, but by a slogan.",
      },
      {
        speaker: "you",
        text: "If it is only a quarrel about a word, why does it matter so much?",
      },
      {
        speaker: "narrator",
        text:
          "A deacon — perhaps thirty years old, slight of build, intense, dark-eyed — pushes through the throng toward you. His robe is plain. His voice, history will record, will outlast emperors.",
      },
      {
        speaker: "st-athanasius",
        text:
          "It is not 'only a word,' friend. I am Athanasius, deacon to Bishop Alexander of Alexandria. Hear me: if the Son is not truly God, then He cannot save us — for only God can rejoin us to God. A creature cannot deify creatures.",
      },
      {
        speaker: "st-athanasius",
        text:
          "And there is worse. We Christians worship the Son. We sing to Him, baptize into His name, kneel before Him in the Mysteries. If He is a creature — then we are idolaters, every one of us, worshipping the work of God's hands. There is no middle road. Either He is God, or our whole worship is sin.",
      },
      {
        speaker: "you",
        text: "But Arius quotes Scripture, does he not? 'The firstborn of all creation.' How is he to be answered?",
      },
      {
        speaker: "st-athanasius",
        text:
          "With Scripture rightly read, and with the rule of faith handed down. 'Firstborn' is a word of rank, not of making — for the very next line says all things were made BY Him. We must hold a word the Fathers will hammer out here: homoousios, of one essence with the Father. It is not in the Bible — but it guards what the Bible means.",
      },
      {
        speaker: "narrator",
        text:
          "An old bishop with a scarred face — a man who confessed Christ in prison under Diocletian — turns to you and bows slightly. His name is Nicholas, of the city of Myra in Lycia. His eyes burn at the mention of Arius.",
      },
      {
        speaker: "narrator",
        text:
          "Then Arius himself rises to speak. He is tall, gaunt with fasting, magnetic — the kind of voice crowds follow off a cliff. The hall falls silent.",
      },
      {
        speaker: "arius",
        text:
          "Beloved bishops! Let us reason together, not shout. Surely the Son is begotten — and what is begotten must have a beginning, for a father is before his son. The Father alone is unoriginate, alone uncreated, alone truly God. The Son is His most glorious work. Is this not simple? Is this not pious?",
      },
      {
        speaker: "st-anthony",
        text:
          "It is poison in a cup of honey. Stand, $you. The Council needs every voice that can speak truth. Answer the heresiarch — and the deposit of faith, the very confession of who Christ is, may yet be sealed for all the ages to come.",
      },
    ],
    boss: {
      id: "boss-arius",
      name: "Arius",
      title: "Presbyter of Alexandria",
      tradition: "Arian Heresy",
      sprite: "arius",
      maxHp: 220,
      intro:
        "Surely there was a time when the Son was not. He is the firstborn of all creation — the first and highest creature.",
      midline:
        "You speak with confidence, young one, but you have not the wisdom of years.",
      outro:
        "Anathema... I am undone... my doctrine is the wolf the Shepherd warned of...",
      victoryEpigraph: {
        text:
          "We believe... in one Lord Jesus Christ... begotten not made, of one essence (homoousios) with the Father.",
        source: "Symbol of Nicaea (325)",
      },
      attacks: [
        {
          claim:
            "Colossians 1:15 calls Christ 'firstborn of all creation.' Plainly He is the FIRST CREATED. How do you answer?",
          options: [
            {
              text:
                "Prōtotokos in Paul's Greek denotes RANK, not chronology. The next verse: 'BY HIM were all things created' — He is the Creator, not a creature.",
              correct: true,
              rationale:
                "Athanasius's exact argument. Colossians 1:16 is decisive: He is the agent of creation.",
            },
            {
              text: "Paul made a mistake here.",
              correct: false,
              rationale: "Scripture is God-breathed; the error is in your reading.",
            },
            {
              text: "Yes, He is the first creature, but the most exalted.",
              correct: false,
              rationale: "This is Arianism.",
            },
            {
              text: "He was created from the Father's substance, so He is partly God.",
              correct: false,
              rationale: "Semi-Arian. Either fully God or a creature — no middle.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "Jesus said: 'The Father is greater than I' (John 14:28). Does the Son not himself admit He is less?",
          options: [
            {
              text:
                "He speaks according to His INCARNATE state — He had taken our nature. In His divinity He and the Father are one (John 10:30).",
              correct: true,
              rationale: "Cyrilline-Chalcedonian Christology. Two natures, one Person.",
            },
            {
              text: "Yes, the Son is eternally lesser.",
              correct: false,
              rationale: "Pure Arianism.",
            },
            {
              text: "The verse is corrupt; scribes added it.",
              correct: false,
              rationale: "No manuscript supports this.",
            },
            {
              text: "The Father and Son disagreed about hierarchy.",
              correct: false,
              rationale: "Tritheist absurdity.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "If the Son is eternally generated, must not the Father be eternally generating — a process? Then He is composite.",
          options: [
            {
              text:
                "Eternal generation is timeless and complete. It is not a process IN TIME but an eternal relation. The sun has eternally given its light — not in moments, but always.",
              correct: true,
              rationale:
                "Athanasius's solar analogy. Father, Son, and Spirit are eternally distinct without temporal sequence.",
            },
            {
              text: "The Son is generated at a particular moment.",
              correct: false,
              rationale: "Arianism.",
            },
            {
              text: "There is no real generation; it is metaphor only.",
              correct: false,
              rationale: "Modalism / Sabellianism — denies real distinction.",
            },
            {
              text: "The Father is composite.",
              correct: false,
              rationale: "Heresy. God is simple, not composite.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Surely the simplest reading of Scripture is that the Father alone is God? You introduce philosophical Greek terms like 'homoousios' that are not in the Bible.",
          options: [
            {
              text:
                "The TERM is not in Scripture; the REALITY is. We use HOMOOUSIOS to preserve what Scripture says: 'I and the Father are one' (Jn 10:30). Words guard truths.",
              correct: true,
              rationale:
                "Athanasius's defense of theological vocabulary. Words like 'Trinity' and 'homoousios' are tools for guarding biblical truth.",
            },
            {
              text: "We should not use any non-biblical word.",
              correct: false,
              rationale: "Then we cannot use 'Trinity' or 'Bible' itself.",
            },
            {
              text: "Homoousios is in fact in the Bible.",
              correct: false,
              rationale: "It is not. But the REALITY it names is.",
            },
            {
              text: "Greek is corrupt; only Hebrew matters.",
              correct: false,
              rationale: "The Apostles wrote in Greek and used the Septuagint.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "Proverbs 8:22 plainly says: 'The Lord CREATED me at the beginning of his ways.' Wisdom is the Son — and Wisdom is CREATED. The text is decisive.",
          options: [
            {
              text: "The Hebrew qanah means 'acquired' or 'possessed' — not 'created from nothing.' The LXX's ektisen renders the same: Wisdom is eternally with the Father, not made.",
              correct: true,
              rationale:
                "St. Athanasius, Orations against the Arians 2.44ff. The text describes the economy of the Incarnation, where the Wisdom of God 'was sent' for our salvation.",
            },
            {
              text: "Yes — Wisdom (the Son) was created first, then made everything else.",
              correct: false,
              rationale:
                "This is Arius's exact reading, condemned at Nicaea. Proverbs cannot overturn John 1:1: 'In the beginning was the Word.'",
            },
            {
              text: "Proverbs is poetry; it has no theological force.",
              correct: false,
              rationale:
                "Theological force, yes — but rightly interpreted. Hebrew poetry is no less inspired than narrative.",
            },
            {
              text: "Wisdom in Proverbs is not the Son at all; the verse is irrelevant.",
              correct: false,
              rationale:
                "The Fathers (including Athanasius) accepted Wisdom as a type/title of the Son. The right move is exegesis, not denial of reference.",
            },
          ],
          difficulty: 5,
          taunt: "Read the text! Created! KTISEN! It is right there!",
        },
        {
          claim:
            "Christ said: 'No one knows the day or the hour, not even the Son, but only the Father' (Mark 13:32). The Son DOES NOT KNOW. He is therefore lesser.",
          options: [
            {
              text: "He speaks according to His humanity, which He assumed in the Incarnation. As God, He knows all; as man, He hides this knowledge in voluntary humility (Phil 2:7).",
              correct: true,
              rationale:
                "St. Gregory of Nazianzus, Or. 30.15 and St. Cyril, Thesaurus 22. The two-natures Christology resolves the apparent paradox.",
            },
            {
              text: "The Son truly does not know — He is a finite being.",
              correct: false,
              rationale: "Arian. This collapses His divinity entirely.",
            },
            {
              text: "Christ was mistaken or speculating.",
              correct: false,
              rationale:
                "Christ cannot err. The Logos is Truth itself (John 14:6).",
            },
            {
              text: "The verse is a later corruption.",
              correct: false,
              rationale: "No manuscript evidence supports excision.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Even your Origen, the great Alexandrian, taught that the Son is subordinate to the Father. You contradict your own tradition!",
          options: [
            {
              text: "Origen taught much, some of which the Church received and some which it later corrected. Where he affirmed eternal generation, we follow him; where he subordinated the Son in essence, we follow Nicaea.",
              correct: true,
              rationale:
                "The patristic principle: the Fathers are read together. Origen's eternal generation IS used at Nicaea; his subordinationism is corrected.",
            },
            {
              text: "Origen was always heretical; ignore him.",
              correct: false,
              rationale:
                "Reductionist. The Church reads the Fathers with discernment, neither rejecting nor accepting them wholesale.",
            },
            {
              text: "Origen and Athanasius agreed completely.",
              correct: false,
              rationale:
                "Historically false. Athanasius corrected and refined the Alexandrian inheritance.",
            },
            {
              text: "Origen's subordinationism is the true teaching; Nicaea was an innovation.",
              correct: false,
              rationale:
                "This is exactly what the Arians claimed. The Council of Constantinople (553) condemned Origen's errors precisely.",
            },
          ],
          difficulty: 5,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text:
          "The bishops sign, one after another. Only two refuse and are exiled with Arius. Constantine orders the heresiarch's books burned. The Symbol of Faith is sealed: 'begotten, not made, of one essence with the Father.'",
      },
      {
        speaker: "st-athanasius",
        text:
          "The Council has spoken: homoousios with the Father. Arius is condemned. We have confessed that the Word who saves us is true God of true God. May the Lord preserve this faith to the ages of ages!",
      },
      {
        speaker: "you",
        text: "Then it is finished. The heresy is dead.",
      },
      {
        speaker: "st-athanasius",
        text:
          "Would that it were so simple. The word is written, but the war is not won. Within a year the court will turn; emperors will favor Arius's friends; I will be driven from my see again and again. Truth is confessed in an hour and defended over a lifetime.",
      },
      {
        speaker: "st-anthony",
        text:
          "He speaks plainly. Athanasius will be exiled five times, hunted across the desert, declared an outlaw — yet he will not bend. The world will call it 'Athanasius against the world.' But Nicaea will endure when all his enemies are dust.",
      },
      {
        speaker: "st-anthony",
        text:
          "Take this, $you — the Synodikon, the Church's roll of right belief and her anathemas. Now come. The cities are full of half-converted Christians who do not know their own hearts. To win battles out there, you must first conquer the heretic within. To the desert.",
      },
    ],
    reward: { xp: 1, item: "synodikon", healHp: true },
  },

  // ===================================================================
  // CHAPTER 4 — EGYPTIAN DESERT (AD 360)
  // ===================================================================
  {
    id: "ch4-desert",
    number: 4,
    era: "AD 360",
    location: "The Wadi Natrun, Egypt",
    title: "Wrestling with the Tempter",
    background: "desert",
    ally: "st-macarius",
    intro: [
      {
        speaker: "narrator",
        text:
          "Heat. Sand. The wind hisses across endless dunes the color of bone. The dust between your sandals is the dust of centuries. The salt flats of the Wadi Natrun shimmer to the horizon; mud-brick cells dot the wasteland, each a hand's-span apart.",
      },
      {
        speaker: "narrator",
        text:
          "The year is three hundred and sixty. Antony the Great died only a few years ago in his mountain cell; the desert he opened is now peopled by thousands. You have come, you realize, to the very cradle of monasticism — the school of the soul.",
      },
      {
        speaker: "narrator",
        text:
          "A low cave mouth, and inside, a tall thin monk weaving palm-rope by feel in the dark. He has the eyes of a man who has not been afraid of anything for a very long time.",
      },
      {
        speaker: "st-macarius",
        text:
          "I am Macarius. Welcome to Scetis. Here we wrestle not against flesh and blood, but against the powers of the air. The whole world calls this a wasteland. We call it the front line.",
      },
      {
        speaker: "you",
        text: "Why would men leave the cities — now that the Church is free at last — to live in caves and eat bread and salt?",
      },
      {
        speaker: "st-anthony",
        text:
          "That very freedom is the danger, $you. The cities have grown crowded with Christians who do not know themselves — baptized, but never tested. When Constantine made faith safe, the deepest souls fled to the desert seeking a harder crown.",
      },
      {
        speaker: "st-macarius",
        text:
          "When the lions were taken away, we sought another martyrdom — the slow one. Of the appetites. Of the tongue. Of the wandering thoughts. A brother once asked Antony, 'What must I do to be saved?' He answered, 'Sit in your cell, and your cell will teach you everything.'",
      },
      {
        speaker: "st-anthony",
        text:
          "Hear him. To stand against heretics in the great councils — Arius, and worse to come — you must first conquer the heretic in HERE. Your own pride. Your own despair. The passions that whisper in your own voice.",
      },
      {
        speaker: "you",
        text: "And how does one fight such an enemy? It has no body to strike.",
      },
      {
        speaker: "st-macarius",
        text:
          "I will give you three weapons before he comes. First, the Prayer of the heart: 'Lord Jesus Christ, Son of God, have mercy on me, a sinner.' Breathe it without ceasing. Second, fasting — to remind the body that it is a servant, not a god. Third, watchfulness — nepsis — for the enemy is subtle, and his sweetest lies sound like mercy.",
      },
      {
        speaker: "st-macarius",
        text:
          "And know this, $you: he does not come with horns and fire. He comes as an angel of light. He will tell you that you are doing well. He will tell you to rest a little. He will tell you that God surely wants you happy. Test every thought.",
      },
      {
        speaker: "narrator",
        text:
          "Outside, a goat bleats and is suddenly, utterly silent. The little flame in the cave gutters. Macarius's weathered face hardens. He sets down the rope and turns to face the cave mouth.",
      },
      {
        speaker: "st-macarius",
        text: "He is here. Stand behind me, $you — but do not look away. To flee his gaze is to lose already.",
      },
      {
        speaker: "narrator",
        text:
          "The light of the cave fails. Shadow pools at the entrance, gathering shape — a hooded figure with red eyes that do not blink, and a voice like cool water over stones.",
      },
      {
        speaker: "tempter",
        text:
          "$you. We have not met. But I have known your name since you were born. Put down your fear; I have not come to frighten you. Let us speak, you and I, of comforting things.",
      },
    ],
    boss: {
      id: "boss-tempter",
      name: "The Tempter of the Passions",
      title: "Father of Lies",
      tradition: "Demonic",
      sprite: "tempter",
      maxHp: 260,
      intro:
        "Why fast and pray? Why deny yourself? Surely God wants you to be HAPPY.",
      midline:
        "You resist well. But ALL the saints failed at least once. You will be no different.",
      outro:
        "I will return. I always return. You have only seen one of my masks.",
      victoryEpigraph: {
        text: "The true aim of our Christian life consists in the acquisition of the Holy Spirit of God.",
        source: "St. Seraphim of Sarov, conversation with Motovilov (1831)",
      },
      attacks: [
        {
          claim:
            "Why fast? God made the body, food, wine. Surely abstaining insults the Creator.",
          options: [
            {
              text:
                "We fast not because food is evil but to discipline the will. As Christ Himself fasted forty days (Mt 4:2), so we tame the body to free the soul.",
              correct: true,
              rationale:
                "Basil, Sermon on Fasting. The body is good; appetite ungoverned is the disorder.",
            },
            {
              text: "Food is evil. We must abstain forever.",
              correct: false,
              rationale: "Manichaean dualism — heretical. Material creation is good (Gen 1:31).",
            },
            {
              text: "Fasting earns us favor with God.",
              correct: false,
              rationale: "Pelagian — we cannot earn what is gift.",
            },
            {
              text: "There is no reason; fasting is only tradition.",
              correct: false,
              rationale: "Weak. The reasons are explicit in Scripture and the Fathers.",
            },
          ],
          difficulty: 3,
        },
        {
          claim:
            "You strive so hard. But God forgives ALL sins, does He not? Why not enjoy yourself a while longer?",
          options: [
            {
              text:
                "Shall we continue in sin that grace may abound? God forbid! (Rom 6:1-2). Repentance is not delay; it is now.",
              correct: true,
              rationale:
                "Paul's exact argument against antinomianism — the deepest demonic strategy.",
            },
            {
              text: "You are right. Sin freely; God forgives.",
              correct: false,
              rationale:
                "Antinomianism — explicitly the demonic strategy Paul refutes.",
            },
            {
              text: "God does not forgive most sins.",
              correct: false,
              rationale: "Despair. God's mercy is greater than any sin.",
            },
            {
              text: "I have no sins to confess.",
              correct: false,
              rationale: "Pride — the first and worst sin. 1 Jn 1:8.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "I am not so bad. Worse beings exist. Surely God will judge by COMPARISON.",
          options: [
            {
              text:
                "Each soul stands alone before God. The standard is Christ, not the man beside us.",
              correct: true,
              rationale: "Mt 7:1-5; Rom 14:10-12. Self-justification by comparison is universal demonic tactic.",
            },
            {
              text: "Yes, comparison is salvation.",
              correct: false,
              rationale: "Pharisaical pride — see Luke 18:11.",
            },
            {
              text: "I am perfect already.",
              correct: false,
              rationale: "Pride — every saint considered himself the chief of sinners.",
            },
            {
              text: "God does not judge.",
              correct: false,
              rationale: "Heresy. He is the Just Judge (2 Tim 4:8).",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "Tell me, $you — what if you fail? What if your prayers are not heard? What if God is silent? What if all this is a story you tell yourself?",
          options: [
            {
              text:
                "Then I will pray harder, like the father of the demoniac: 'Lord, I believe; help thou mine unbelief' (Mark 9:24).",
              correct: true,
              rationale: "The honest prayer of all who struggle. God meets us in our doubts, not despite them.",
            },
            {
              text: "Then I will abandon this religion.",
              correct: false,
              rationale: "Despair — the second deadliest sin after presumption.",
            },
            {
              text: "I never doubt; my faith is perfect.",
              correct: false,
              rationale: "Pride. Every honest believer has known the dark night.",
            },
            {
              text: "If God is silent He must not exist.",
              correct: false,
              rationale:
                "The argument from silence misreads the divine pedagogy. God's silence trains the soul.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Your body is a temple of God, you say. Then why mortify it with fasting? Why deprive what God Himself called good?",
          options: [
            {
              text: "Because the body is good, fasting orders it to its true end: to be a temple, not an idol. We do not destroy the body; we discipline it (1 Cor 9:27).",
              correct: true,
              rationale:
                "St. Paul's athletic metaphor. The body is good; the passions which deform it are not.",
            },
            {
              text: "The body is evil and must be punished into submission.",
              correct: false,
              rationale:
                "Manichaean. The Church fasts to free the body for prayer, not to punish it as wicked.",
            },
            {
              text: "Fasting is for monks only; the laity need not bother.",
              correct: false,
              rationale:
                "The Church appoints fasts for ALL the faithful — Wednesday, Friday, the great fasts. They sanctify lay life too.",
            },
            {
              text: "Fasting is merely a diet for physical health.",
              correct: false,
              rationale:
                "A pagan reduction. Fasting is a spiritual weapon (Matt 17:21) — its primary fruit is humility, not weight loss.",
            },
          ],
          difficulty: 3,
          taunt: "Eat! Drink! The Lord loves a cheerful belly!",
        },
        {
          claim:
            "Why confess your sins to a priest? Tell God directly — He hears! The priest is a man, sinful as you.",
          options: [
            {
              text: "Christ gave the Apostles authority: 'Whose sins ye remit, they are remitted' (John 20:23). The priest is a witness and instrument; the absolution is Christ's.",
              correct: true,
              rationale:
                "John 20:22-23 is the dominical institution of sacramental confession. The Church preserves it from Acts onward.",
            },
            {
              text: "You are right — confess only to God, never to a priest.",
              correct: false,
              rationale:
                "This sounds humble but rejects Christ's own gift. James 5:16 commands confession to one another.",
            },
            {
              text: "The priest forgives by his own power.",
              correct: false,
              rationale:
                "No. The priest is icon and instrument; absolution is from Christ, not the priest's own holiness.",
            },
            {
              text: "Confession is a medieval invention.",
              correct: false,
              rationale:
                "Refuted by the Didache (4:14), Tertullian (On Penance), and Origen — all far earlier than any 'medieval' development.",
            },
          ],
          difficulty: 3,
        },
        {
          claim:
            "Set prayers, prayer ropes, prostrations — empty repetition! Did not your Christ Himself condemn this 'vain babbling' of the pagans?",
          options: [
            {
              text: "Christ condemned vain babbling — words without heart. He Himself prayed the same prayer three times in Gethsemane (Matt 26:44). Repetition WITH attention is not vain.",
              correct: true,
              rationale:
                "The Jesus Prayer tradition is rooted in this. Heart and tongue together — that is prayer.",
            },
            {
              text: "Repetition is always empty; pray only spontaneously.",
              correct: false,
              rationale:
                "Then condemn the Psalter, which Christ Himself prayed. Set prayers form the heart.",
            },
            {
              text: "Long prayers are more efficacious — quantity matters.",
              correct: false,
              rationale:
                "This IS the babbling Christ condemned. Length without attention is the pagan error.",
            },
            {
              text: "The body has no role in prayer; only the mind.",
              correct: false,
              rationale:
                "Prostrations, crossing oneself, standing — the whole man prays. We are not Cartesian souls in machines.",
            },
          ],
          difficulty: 3,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text:
          "The shadow shrinks back from the cave mouth, hissing, and is swallowed by the noon glare. The goat bleats again, alive. The little flame steadies.",
      },
      {
        speaker: "st-macarius",
        text:
          "You have done well. Know what the demons fear most — not the great ascetic who boasts of his fasts, but the soul that knows itself a sinner and prays anyway. Pride opens the door to them; humility bars it.",
      },
      {
        speaker: "you",
        text: "He said he would return. He said all the saints fail at least once.",
      },
      {
        speaker: "st-macarius",
        text:
          "And in that he spoke truth, twisted to despair. We DO fall — and we rise, and fall, and rise again, seventy times seven. The monk's whole art is in the rising. To fall and not despair: that is the desert's secret.",
      },
      {
        speaker: "st-macarius",
        text:
          "Take this — a hundred-knot prayer rope, woven so the demons cannot untie the knots. Pray it daily, in the light and in the dark, when you feel God near and when you feel nothing at all.",
      },
      {
        speaker: "st-anthony",
        text:
          "The desert has taught you what no book could. Carry it forward. Now the storm moves from the soul to the very Person of the Saviour — to Chalcedon, where the Church must confess exactly WHO and WHAT Christ is, lest our salvation slip away.",
      },
    ],
    reward: { xp: 1, item: "prayer-rope", healHp: true },
  },

  // ===================================================================
  // CHAPTER 5 — CHALCEDON (AD 451)
  // ===================================================================
  {
    id: "ch5-chalcedon",
    number: 5,
    era: "AD 451",
    location: "Council of Chalcedon",
    title: "One Person, Two Natures",
    background: "council-hall",
    ally: "st-cyril",
    intro: [
      {
        speaker: "narrator",
        text:
          "The church of Saint Euphemia, across the strait from Constantinople, in the city of Chalcedon. Six hundred and thirty bishops are gathered — the largest council the Church has ever seen. The year is four hundred and fifty-one.",
      },
      {
        speaker: "narrator",
        text:
          "Two years ago, in this very region, a synod at Ephesus turned to violence — monks and soldiers beat the aged bishop Flavian so savagely that he died of his wounds. History will name it the Latrocinium: the Robber Council. This time, imperial guards line the walls, and the Empress Pulcheria and her consort Marcian preside.",
      },
      {
        speaker: "narrator",
        text:
          "A letter is being read aloud — the Tome of Leo, bishop of Rome. As the last words fall, the hall erupts in a single roar: 'Peter has spoken through Leo! This is the faith of the Fathers! Cyril and Leo teach the same!'",
      },
      {
        speaker: "st-anthony",
        text:
          "$you, we stand on a knife's edge between two abysses. On one side, Nestorius taught that Christ is so divided He is nearly two persons — a man indwelt by God, with Mary the mother of the man alone. On the other, a new error: that Christ is so utterly one that His humanity simply vanishes into His divinity.",
      },
      {
        speaker: "you",
        text: "Why must the Church split hairs so finely? Surely it is enough to say Christ is God and man and leave the mystery alone.",
      },
      {
        speaker: "st-anthony",
        text:
          "Would that it were, child. But heretics do not leave mysteries alone — they explain them away, and the people follow the explanation. Each false road LOOKS like piety. Nestorius thinks he honors God by keeping Him from the manger and the Cross. Eutyches thinks he honors Christ by making Him too divine for true flesh. Both, meaning well, would unmake your salvation.",
      },
      {
        speaker: "you",
        text: "And the truth runs between them?",
      },
      {
        speaker: "st-anthony",
        text:
          "One Person, in two natures — divine and human — without confusion, without change, without division, without separation. Four small words that will guard the Saviour for a thousand years. Lose them, and we lose Him.",
      },
      {
        speaker: "narrator",
        text:
          "A bishop with a long grey beard and weary, brilliant eyes turns from his place near the chair. This is Cyril of Alexandria — or rather his living memory, for he reposed seven years ago. The Spirit makes him present to you.",
      },
      {
        speaker: "st-cyril",
        text:
          "I am Cyril. Twenty years ago, at Ephesus, I led the deposing of Nestorius for tearing Christ in two, and I won the title Theotokos — God-bearer — for the Virgin. But the pendulum has swung. Now Eutyches, an old archimandrite of the capital, teaches that after the union Christ has but one nature: the human swallowed up by the divine, like a drop of vinegar lost in the ocean.",
      },
      {
        speaker: "st-cyril",
        text:
          "And here is my grief, $you: I myself once wrote, against Nestorius, of 'one incarnate nature of the Word.' I meant the deep unity of the one Christ. Eutyches has seized my words to break the very faith I defended. Help me make plain what I truly meant — that the unity does not devour the manhood.",
      },
      {
        speaker: "you",
        text: "Then even a saint's words can be turned into a weapon against the saint?",
      },
      {
        speaker: "st-cyril",
        text:
          "Words are vessels, $you, and heresy pours its own wine into them. This is why the Church does not trust a single phrase but the whole symphony of the Fathers, read together. When I said 'one nature,' I meant one Christ — not a Christ whose manhood is a drop swallowed by the sea. Hold the man Jesus and the eternal Word as ONE who acts, suffers, and saves — yet truly God and truly man.",
      },
      {
        speaker: "st-anthony",
        text:
          "Mark the stakes. If Eutyches is right, Christ's humanity is a phantom — and as Gregory the Theologian warns, 'that which is not assumed is not healed.' If He did not truly take our flesh, our flesh is not saved. The whole ground of our salvation trembles on this word.",
      },
      {
        speaker: "you",
        text: "So if His body were not real as mine is real, then my body — my death — has no Saviour at all.",
      },
      {
        speaker: "st-anthony",
        text:
          "Now you see why six hundred bishops crossed land and sea for this. It is not philosophers' quibbling. It is whether the hand that will raise YOU from the grave is a true human hand that once knew nails. Steady yourself. The old man approaches, and he is utterly sincere — which is what makes him so hard to answer.",
      },
      {
        speaker: "narrator",
        text:
          "A robed archimandrite is led forward to the center of the hall. His face is composed, his bearing certain. He has been a monk in Constantinople for seventy years and is godfather to the chamberlain Chrysaphius himself. He is no fool — and that makes him the more dangerous.",
      },
      {
        speaker: "eutyches",
        text:
          "I confess what I have always confessed. Before the union, two natures. After the union — one. The Word took flesh, and the flesh was made wholly His own, as a drop is made the sea. Why do you make so simple a mystery so hard?",
      },
    ],
    boss: {
      id: "boss-eutyches",
      name: "Eutyches",
      title: "Archimandrite of Constantinople",
      tradition: "Monophysite Heresy",
      sprite: "eutyches",
      maxHp: 280,
      intro:
        "Surely Christ's humanity, like a drop of vinegar in the ocean of His divinity, is absorbed!",
      midline: "You have read more than I supposed. But the union must collapse the two.",
      outro:
        "Anathema upon me... 'one, and the same Christ, in two natures'... I see.",
      victoryEpigraph: {
        text:
          "...one and the same Christ, in two natures, inconfusedly, unchangeably, indivisibly, inseparably.",
        source: "Definition of Chalcedon (451)",
      },
      attacks: [
        {
          claim:
            "After the Incarnation, Christ has ONE nature — His divinity has fully absorbed His humanity.",
          options: [
            {
              text:
                "Two natures — divine and human — UNITED in one Person, WITHOUT CONFUSION, WITHOUT CHANGE, WITHOUT DIVISION, WITHOUT SEPARATION.",
              correct: true,
              rationale:
                "The four Chalcedonian adverbs. The middle path between Nestorius and Eutyches.",
            },
            {
              text: "Yes, one nature only.",
              correct: false,
              rationale: "Monophysite — condemned at Chalcedon.",
            },
            {
              text: "Two natures AND two Persons.",
              correct: false,
              rationale: "Nestorian — condemned at Ephesus.",
            },
            {
              text: "Three natures.",
              correct: false,
              rationale: "Incoherent; the Trinity has three Persons of one essence, Christ has two natures in one Person.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "If Christ has a human will distinct from the divine, surely they could conflict?",
          options: [
            {
              text:
                "Two wills, never opposed. In Gethsemane the human will of Christ submitted to the divine: 'not my will but Thine be done' (Lk 22:42).",
              correct: true,
              rationale:
                "Dyothelitism, defined at Constantinople III (681) against monothelitism.",
            },
            {
              text: "He has only one will, the divine.",
              correct: false,
              rationale:
                "Monothelitism — condemned at Constantinople III. What is not assumed is not healed.",
            },
            {
              text: "His wills did conflict and the human lost.",
              correct: false,
              rationale: "Heresy. The natures concur without contradiction.",
            },
            {
              text: "Wills are illusory in Christ.",
              correct: false,
              rationale: "Docetism redux.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "If Mary bore a human nature only, surely she is mother of the human Jesus — not 'Mother of God.'",
          options: [
            {
              text:
                "Mary bore a PERSON, who is God the Son in human flesh. She is therefore THEOTOKOS — God-bearer. To deny this is to deny the unity of Christ.",
              correct: true,
              rationale: "Ephesus (431) against Nestorius. The title is Christological.",
            },
            {
              text: "She is mother of the human Jesus only, not of His divinity.",
              correct: false,
              rationale: "Nestorian — splits Christ into two sons.",
            },
            {
              text: "She is mother of His divinity but not humanity.",
              correct: false,
              rationale: "Impossible; she gave Him human flesh.",
            },
            {
              text: "She had no role; an angel gave Him flesh.",
              correct: false,
              rationale: "Gnostic / docetic.",
            },
          ],
          difficulty: 3,
        },
        {
          claim:
            "Christ in His glory cannot truly have suffered. The 'suffering' must have been pretense or merely on the human side.",
          options: [
            {
              text:
                "The Person of the Word truly suffered IN His humanity — and we may rightly say 'God suffered for us.'",
              correct: true,
              rationale:
                "The communicatio idiomatum: properties of each nature predicated of the one Person.",
            },
            {
              text: "He pretended to suffer.",
              correct: false,
              rationale: "Docetism — condemned by Ignatius.",
            },
            {
              text: "His divinity suffered apart from His humanity.",
              correct: false,
              rationale: "Theopaschitism in heretical sense.",
            },
            {
              text: "Suffering was just an appearance to teach humility.",
              correct: false,
              rationale: "Reduces the Cross to drama, not salvation.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Mary bore the man Jesus. To call her Theotokos — 'God-bearer' — is to mingle the natures into one. She is Christotokos at best.",
          options: [
            {
              text: "She bore the one Person, Christ, who is fully God and fully man. The title guards His unity, not a confusion of natures.",
              correct: true,
              rationale:
                "St. Cyril against Nestorius. The Council of Ephesus (431) defined Theotokos precisely to guard the unity of the Incarnate Word.",
            },
            {
              text: "Theotokos means Mary is herself divine.",
              correct: false,
              rationale:
                "A common Protestant misunderstanding. The title is Christological — about WHOM she bore — not about her own nature.",
            },
            {
              text: "She bore only His human nature, not His Person.",
              correct: false,
              rationale:
                "Nestorian — splits Christ into two persons. Natures are not 'born'; persons are.",
            },
            {
              text: "She bore a divinity that swallowed the humanity.",
              correct: false,
              rationale:
                "Your own monophysite reading, Eutyches. Theotokos preserves BOTH natures unconfused.",
            },
          ],
          difficulty: 4,
          taunt: "She bore a man! Only a man!",
        },
        {
          claim:
            "If Christ truly suffered hunger and wept and thirsted — He could not have been divine. God does not weep!",
          options: [
            {
              text: "He suffered in His human nature, while remaining impassible in His divine nature. The same Person knew both — without confusion, without division.",
              correct: true,
              rationale:
                "Chalcedonian Definition: 'in two natures, without confusion, without change, without division, without separation.' Two natures, one acting Person.",
            },
            {
              text: "His humanity wept; His divinity was unaffected, as a separate being.",
              correct: false,
              rationale:
                "Nestorian — two persons, not two natures of one Person. The single Christ wept.",
            },
            {
              text: "His divinity wept; the impassible became passible.",
              correct: false,
              rationale:
                "Patripassianism — denies divine immutability. The Logos suffered in the flesh, not in His divine nature.",
            },
            {
              text: "He only appeared to weep; the tears were illusory.",
              correct: false,
              rationale:
                "Docetism — denies real humanity. He truly hungered, truly wept, truly died.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Two natures means two persons! You divide Christ. The unity of the Saviour requires ONE NATURE after the union.",
          options: [
            {
              text: "Nature and Person are not the same. We confess one Person (hypostasis) in two natures (physeis) — united but distinct. Chalcedon, against you and against Nestorius.",
              correct: true,
              rationale:
                "The technical Chalcedonian distinction. Person = WHO; nature = WHAT. One WHO, two WHATs.",
            },
            {
              text: "Yes, after the union there is only one nature.",
              correct: false,
              rationale:
                "Eutychianism / monophysitism. This swallows the humanity into the divinity — making salvation impossible (cf. Gregory Nazianzen: 'What is not assumed is not healed').",
            },
            {
              text: "Two natures means two persons — therefore drop the second nature.",
              correct: false,
              rationale:
                "False dichotomy. Chalcedon refused both Nestorian division and Eutychian confusion.",
            },
            {
              text: "He has one composite nature, half God half man.",
              correct: false,
              rationale:
                "A 'tertium quid' — neither truly God nor truly man. The full reality of both is preserved without mixing.",
            },
          ],
          difficulty: 5,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text:
          "The bishops rise as one and acclaim the Definition: 'one and the same Christ, in two natures, inconfusedly, unchangeably, indivisibly, inseparably.' Eutyches is condemned and deposed. The faith of Nicaea is confirmed and crowned.",
      },
      {
        speaker: "st-cyril",
        text:
          "The Tome of Leo, my own letters to Nestorius, and now this Definition — all sing one song. The orthodox confession of the one Christ is sealed. May it endure to the end of the world!",
      },
      {
        speaker: "you",
        text: "Yet I saw bishops weeping who would not sign. Some of the East will not accept this.",
      },
      {
        speaker: "st-cyril",
        text:
          "You see truly, and it is the great sorrow. Many who love Christ no less than we will hear 'two natures' and fear it means 'two sons.' Whole churches of Egypt and Syria will walk apart over a confusion of words. Guard the Definition — and guard your love for those who stumble at it.",
      },
      {
        speaker: "you",
        text: "Then victory and grief came in the same hour. The faith was sealed, and the Body of Christ was torn.",
      },
      {
        speaker: "st-cyril",
        text:
          "Such is the burden of truth in a fallen world, $you. We do not get to choose between purity and unity as we would wish — we keep the faith whole and weep for those who cannot follow. Pray for the Copt and the Syrian as for your own kin; one day, in ways we cannot now see, the Lord may heal what councils could not.",
      },
      {
        speaker: "narrator",
        text:
          "The empress Pulcheria rises; the lamps of Saint Euphemia gutter in the sea-wind off the Bosphorus. The Definition is sealed in the acts. Outside, the bishops who would not sign are already gathering their robes to sail home to a divided East.",
      },
      {
        speaker: "st-anthony",
        text:
          "Take the Tome of Leo, $you. It will steady you three centuries hence, when the iconoclasts arise — for they too will cry 'no image of the divine,' and you will answer them from the truth confessed here: God has truly taken visible flesh. Onward, to Constantinople and the war over the holy icons.",
      },
    ],
    reward: { xp: 1, item: "tome-leo", healHp: true },
  },

  // ===================================================================
  // CHAPTER 6 — ICONOCLASM (AD 787)
  // ===================================================================
  {
    id: "ch6-icons",
    number: 6,
    era: "AD 787",
    location: "Hagia Sophia, Constantinople",
    title: "The Triumph of Orthodoxy",
    background: "hagia-sophia",
    ally: "st-john-damascus",
    intro: [
      {
        speaker: "narrator",
        text:
          "The Great Church of Holy Wisdom — Hagia Sophia — rises around you, vast and golden, its dome seeming to hang from heaven on a chain of light. And yet it is DEFACED. Where mosaics of Christ Pantocrator and the Theotokos once gazed down upon the faithful, bare plaster now covers raw stone. In their place: a single great cross, the only image the iconoclasts would allow.",
      },
      {
        speaker: "st-anthony",
        text:
          "For sixty years the Eastern Roman Empire has waged war upon itself over images — paint and gold and wood. The Emperor Leo III began it; his son, Constantine the Fifth, made it a terror — burning monasteries, dispersing monks, blinding and exiling those who painted Christ. They called him Kopronymos, the dung-named, for what he did.",
      },
      {
        speaker: "st-anthony",
        text:
          "He has been dead nineteen years. But the year is now seven hundred and eighty-seven, and his teaching walks abroad still. Tonight, by a power beyond the grave, his very spirit returns to test you.",
      },
      {
        speaker: "narrator",
        text:
          "On a small wooden chair sits the Empress Irene, regent for her young son Constantine VI. She has summoned the Seventh Ecumenical Council to restore the holy icons that her predecessors tore down. Three hundred and fifty bishops fill the nave; monks who were beaten and exiled now stand vindicated, and the air hums with the long-suppressed hope of a Church about to be made whole.",
      },
      {
        speaker: "st-anthony",
        text:
          "Look at them, $you — old men with scarred faces, monks who hid icons in their cells at the price of their eyes and noses. For sixty years it has been a crime to paint the face of Christ. Tonight the Church gathers to say, with one voice, that it never was.",
      },
      {
        speaker: "you",
        text: "Sixty years of bloodshed — over pictures? I confess I do not yet see why it matters so terribly.",
      },
      {
        speaker: "narrator",
        text:
          "A monk steps from the shadow of a great porphyry column. He wears the rough black habit of the Lavra of Mar Sabba in the Judean desert. He has been dead for over thirty years — but his books shook the empire, and his name has carried even from the lands of the Caliph.",
      },
      {
        speaker: "st-john-damascus",
        text:
          "I am John, called of Damascus. I served the Caliph as a treasurer before I fled to the desert — and there, safe from the Christian emperor's reach, I wrote three treatises in defense of the holy images. The Theotokos herself, men say, restored my hand when it was struck off by a tyrant's order. I will stand with you tonight.",
      },
      {
        speaker: "st-john-damascus",
        text:
          "Here is why it matters, child — here is the heart of the whole war. Hear the deepest answer and never forget it: 'I do not depict the invisible Godhead, but the flesh of God which was seen.' The Incarnation IS the dogmatic foundation of the icon.",
      },
      {
        speaker: "you",
        text: "But the iconoclasts say they honor God MORE by refusing all images — that they are the purer Christians. How can purity be the error?",
      },
      {
        speaker: "st-john-damascus",
        text:
          "Because their 'purity' is a return to before Bethlehem. They would worship the God of Sinai who could not be seen — and quietly forget the God of the manger who could be held in an old man's arms in the Temple. They think themselves more spiritual than the Incarnation itself. That is the oldest temptation in a new mask.",
      },
      {
        speaker: "st-anthony",
        text:
          "Do you grasp it now, $you? Once God could not be portrayed, for no man had seen Him. But in Christ the unseen God took visible flesh, ate, wept, was touched. If God truly became MATTER, then matter can bear His image. To smash the icon is, at the root, to deny that He truly came in the flesh.",
      },
      {
        speaker: "st-john-damascus",
        text:
          "And learn the second key: when I kiss an icon, I do not worship wood and pigment. The honor passes to the one depicted — to the prototype. We give icons honor, proskynesis; we give to God alone worship, latreia. Confuse the two and you have idolatry; deny the first and you have iconoclasm. Hold both.",
      },
      {
        speaker: "narrator",
        text:
          "The air grows cold as a tomb. At the far end of the nave, before the altar, a figure in imperial purple materializes — crowned, hard-eyed, every inch the emperor. Constantine V, dead these nineteen years, stands again in the church his armies once stripped bare.",
      },
      {
        speaker: "iconoclast",
        text:
          "I am Constantine, called the Fifth, Equal of the Apostles by my own decree. I smashed your idols from one end of the Empire to the other and made the realm pure. The God of Israel thundered: 'Thou shalt not make any graven image.' Why do you cling still to your painted boards? Answer me, and I will grind you with them.",
      },
    ],
    boss: {
      id: "boss-iconoclast",
      name: "Constantine V",
      title: "Iconoclast Emperor (deceased)",
      tradition: "Iconoclasm",
      sprite: "iconoclast",
      maxHp: 320,
      intro:
        "You worship paint and wood. I will destroy every panel until the people are pure.",
      midline:
        "My armies smashed a thousand icons; my heirs will smash a thousand more!",
      outro:
        "I am undone... they will paint me out of the mosaics... and write 'Triumph of Orthodoxy' over my reign.",
      victoryEpigraph: {
        text:
          "The honor paid to the image passes on to that which the image represents.",
        source: "St. Basil; Definition of Nicaea II (787)",
      },
      attacks: [
        {
          claim: "Exodus 20:4 — 'Thou shalt not make any graven image.' Plain Scripture!",
          options: [
            {
              text:
                "The SAME God, twenty chapters later (Ex 25:18), commanded cherubim of beaten gold above the Mercy Seat. Forbidden: false gods. Allowed: sacred images.",
              correct: true,
              rationale: "The classic answer. Two Exodus passages must be read together.",
            },
            {
              text: "Exodus 20 is outdated; we ignore the Old Testament.",
              correct: false,
              rationale: "Marcionite.",
            },
            {
              text: "The cherubim were idols too; Israel sinned by making them.",
              correct: false,
              rationale: "But God commanded them. Reductio ad absurdum.",
            },
            {
              text: "We must abolish images.",
              correct: false,
              rationale: "Iconoclasm — defeated.",
            },
          ],
          difficulty: 3,
        },
        {
          claim:
            "The Old Testament forbade images BECAUSE God was invisible. He has not changed.",
          options: [
            {
              text:
                "But He HAS become visible. 'In Him dwelleth all the fullness of the Godhead BODILY' (Col 2:9). The Incarnation grounds the icon.",
              correct: true,
              rationale: "John of Damascus's master argument. To deny icons is to deny Incarnation.",
            },
            {
              text: "He is still invisible.",
              correct: false,
              rationale: "Then Christ never appeared. Denied by all four Gospels.",
            },
            {
              text: "Christ does not really have a body.",
              correct: false,
              rationale: "Docetism.",
            },
            {
              text: "Christ's body is too holy to depict.",
              correct: false,
              rationale: "But the Apostles saw, touched, and ate with Him (Lk 24; 1 Jn 1:1).",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "When you kiss the icon, you worship it. Idolatry.",
          options: [
            {
              text:
                "I do not worship matter; I worship the Creator of matter who became matter for my sake.",
              correct: true,
              rationale: "John of Damascus, On the Divine Images I.16. The classical line.",
            },
            {
              text: "Yes, we worship the icon as a god.",
              correct: false,
              rationale: "Idolatry. The Church explicitly distinguishes.",
            },
            {
              text: "We don't really kiss icons; that is a myth.",
              correct: false,
              rationale: "Every Orthodox Christian kisses icons — and rightly.",
            },
            {
              text: "We only kiss the icon of Christ.",
              correct: false,
              rationale: "We kiss icons of Christ, the Theotokos, and the saints alike — with honor due to each.",
            },
          ],
          difficulty: 3,
        },
        {
          claim:
            "If icons were truly important, the Apostles would have left us strict instructions.",
          options: [
            {
              text:
                "The Apostles passed on living tradition — including image-making — visible in the catacombs from the 2nd century. Not every practice is written.",
              correct: true,
              rationale: "2 Th 2:15 — hold the traditions, whether by word or epistle.",
            },
            {
              text: "We only follow what is explicitly in Scripture.",
              correct: false,
              rationale: "Sola scriptura — refuted by 2 Th 2:15 and the canon itself.",
            },
            {
              text: "Icons are a medieval invention.",
              correct: false,
              rationale: "Disproved by Dura-Europos (240s), Roman catacombs (2nd c.).",
            },
            {
              text: "The Apostles forbade them; we have corrupted their teaching.",
              correct: false,
              rationale: "No apostolic prohibition exists.",
            },
          ],
          difficulty: 3,
        },
        {
          claim:
            "Moses said: 'You saw NO FORM on Horeb — make no image' (Deut 4:15). Plain command, plainly broken by your panels.",
          options: [
            {
              text: "Then — God had not been seen. But now: 'the Word became flesh and dwelt among us, and we beheld His glory' (John 1:14). The Incarnation changes everything.",
              correct: true,
              rationale:
                "St. John Damascene, On the Divine Images 1.16: 'I do not paint an invisible Godhead, but the flesh of God which was seen.'",
            },
            {
              text: "The Deuteronomy command no longer applies — the Old Testament is abolished.",
              correct: false,
              rationale:
                "Marcionite. The Law is fulfilled, not abolished (Matt 5:17). The reason for the prohibition was that God had not been seen — that reason now ends in Christ.",
            },
            {
              text: "Moses meant only Canaanite idols, not images in general.",
              correct: false,
              rationale:
                "Partly true but inadequate. The deeper answer is christological: the unseen God has made Himself visible.",
            },
            {
              text: "Moses was wrong about images.",
              correct: false,
              rationale:
                "Heretical. The Old Law is from God; it was preparatory, not erroneous.",
            },
          ],
          difficulty: 4,
          taunt: "Read Moses! He commands what I do!",
        },
        {
          claim:
            "Then venerate even the Cross? It is wood. An instrument of Roman torture — nothing more. Smash it!",
          options: [
            {
              text: "We honor it because of Whom it bore: 'God forbid that I should glory, save in the cross of our Lord Jesus Christ' (Gal 6:14). The veneration passes to the prototype.",
              correct: true,
              rationale:
                "St. Basil: 'The honor paid to the image passes to the prototype' (On the Holy Spirit 18.45). Adopted at Nicaea II.",
            },
            {
              text: "The Cross is sacred wood in itself, apart from Christ.",
              correct: false,
              rationale:
                "Tree-worship. The wood is honored only because it bore the Saviour.",
            },
            {
              text: "We should not honor the Cross at all.",
              correct: false,
              rationale:
                "The Church has venerated the Cross since at least the 4th century — Helena's discovery and the Feast of the Exaltation are catholic memory.",
            },
            {
              text: "The Cross is symbolic only; do not bow before it.",
              correct: false,
              rationale:
                "Iconoclasm cannot help calling the Cross 'symbolic only' — but this is to deny what relics and the Cross actually do as channels of Christ's grace.",
            },
          ],
          difficulty: 3,
        },
        {
          claim:
            "You kiss the BONES of the dead — relics! This is necromancy and pagan superstition!",
          options: [
            {
              text: "Elisha's bones raised a corpse (2 Kings 13:21). Paul's handkerchiefs healed (Acts 19:12). The bodies of the saints, glorified in Christ, are vessels of His grace.",
              correct: true,
              rationale:
                "Biblical foundation for relics: 2 Kings 13:21 (Elisha), Acts 19:12 (Paul), 2 Kings 23:18 (David honored).",
            },
            {
              text: "We worship the bones themselves.",
              correct: false,
              rationale:
                "Calumny. We venerate — not worship — and the veneration is offered to God through His saints.",
            },
            {
              text: "Relics work by their own magical power.",
              correct: false,
              rationale:
                "Pagan reduction. The grace is Christ's, mediated through His holy ones — exactly as in 2 Kings 13.",
            },
            {
              text: "Relics are a medieval superstition.",
              correct: false,
              rationale:
                "Refuted by 2nd-century Martyrdom of Polycarp 18: 'We took up his bones, more precious than precious stones, and laid them where it was fitting.'",
            },
          ],
          difficulty: 4,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text:
          "The purple figure thins like smoke drawn up a chimney. Where bare plaster scarred the dome a moment ago, gold seems to bleed back into the stone — and high above, the great Christ Pantocrator gazes down once more on the church His enemies had stripped.",
      },
      {
        speaker: "st-john-damascus",
        text:
          "The icons return to the walls. The Council confesses it: the honor passes to the prototype. And every First Sunday of Lent forever, the Church will carry the holy images in procession and sing of this hour — the Triumph of Orthodoxy.",
      },
      {
        speaker: "you",
        text: "But you told me the war ran on after this Council. Will they not rise again?",
      },
      {
        speaker: "st-john-damascus",
        text:
          "They will, child — a second iconoclasm, thirty years more of it, until the Empress Theodora at last restores the icons in 843. The truth, once confessed, must still be defended in blood. But it is confessed, and it will never be unsaid. The Word became flesh; the flesh may be painted; the painting may be kissed.",
      },
      {
        speaker: "st-anthony",
        text:
          "Take this — the Philokalia, the love of the beautiful: the prayers of the Fathers gathered like coals from a thousand desert fires. When images fail you and feeling fails you, the Jesus Prayer within these pages will not.",
      },
      {
        speaker: "you",
        text: "And now?",
      },
      {
        speaker: "st-anthony",
        text:
          "Now west. Three centuries fall away. A schism approaches — and it will be your hardest to face, for it does not pit you against pagan or heretic, but against brothers. It severs the Church from herself. Take my hand.",
      },
    ],
    reward: { xp: 1, item: "philokalia", healHp: true },
  },

  // ===================================================================
  // CHAPTER 7 — THE GREAT SCHISM (AD 1054)
  // ===================================================================
  {
    id: "ch7-schism",
    number: 7,
    era: "AD 1054",
    location: "Constantinople, Hagia Sophia",
    title: "The Filioque",
    background: "hagia-sophia",
    ally: "st-mark-ephesus",
    intro: [
      {
        speaker: "narrator",
        text:
          "Saturday, the sixteenth of July, in the year of our Lord 1054. Hagia Sophia again — but the gold seems colder now. The Divine Liturgy is being sung; the great doors stand open; clergy in their vestments move toward the altar through clouds of incense. It is the hour of the offering.",
      },
      {
        speaker: "st-anthony",
        text:
          "The Christian world will not see itself whole again in this age, $you. For a thousand years the Church has breathed with two lungs — the Greek East and the Latin West, one in faith though they prayed in different tongues. Today that breath catches. You are a witness to the wound, and a defender of the Symbol. Hold it unaltered.",
      },
      {
        speaker: "you",
        text: "If they have been one Church for a thousand years, what has gone so wrong now?",
      },
      {
        speaker: "st-anthony",
        text:
          "Slowly, child, slowly. Latin and Greek grew apart — different empires, different languages, a West overrun by barbarians while the East kept the philosophers' tongue. Two centuries ago a patriarch named Photios already saw the danger: Rome was adding a word to the Creed that no Council had sanctioned. The wound was bound up then. It was never healed. Today it bursts.",
      },
      {
        speaker: "narrator",
        text:
          "Pope Leo IX is dying in Italy this very week — though his legates do not yet know it, which means the authority they carry has, in truth, already lapsed. The patriarchate of Constantinople under Michael Cerularius holds an uneasy, bristling peace with Rome. Then a Roman legate strides into the Liturgy itself, parchment in hand, his boots loud on the marble.",
      },
      {
        speaker: "narrator",
        text:
          "Cardinal Humbert lays the parchment upon the altar of Hagia Sophia, in the very midst of the offering: a bull of excommunication against the Patriarch. He turns on his heel and sweeps toward the doors, shouting in Latin: 'Let God see and judge!' The Greek deacons stand frozen. One stoops, lifts the parchment, reads it — and falls to his knees.",
      },
      {
        speaker: "st-anthony",
        text:
          "There — the act itself. The trigger of it all is one small phrase added to the Symbol of Faith: Filioque, 'and the Son.' Rome confesses that the Holy Spirit proceeds from the Father AND the Son. The East confesses, with the Council that wrote the Creed, that He proceeds from the Father. And Rome claims authority to add to a Creed the Councils forbade any man to touch.",
      },
      {
        speaker: "you",
        text: "A single word, in a prayer most men recite without thinking. Can a syllable truly divide the Church?",
      },
      {
        speaker: "st-anthony",
        text:
          "It is not the syllable, $you — it is what stands behind it. Who may speak for the whole Church? The East answers: the bishops gathered in Council, the Pope first among equals in honor. The West now answers: the Pope alone, by his own authority, even over a Council. There are lesser quarrels too — unleavened bread, the marriage of priests — but THIS is the root: the addition, and the claim to a power to make it.",
      },
      {
        speaker: "you",
        text: "And the East and West never settled it together, in Council, the way Nicaea settled Arius?",
      },
      {
        speaker: "st-anthony",
        text:
          "That is the tragedy, child. The seven great Councils were called WHILE East and West still met as one. After today they will not gather so again. There will be no eighth Council that both halves of Christendom receive — only Rome's councils for the West and the East's for itself. The schism is not merely a quarrel; it is the silencing of the one voice that could end the quarrel.",
      },
      {
        speaker: "narrator",
        text:
          "Humbert checks his stride at the great doors and sees you — a stranger in foreign garb, plainly a Westerner, yet standing among the Greeks. His eyes narrow to slits.",
      },
      {
        speaker: "humbert",
        text:
          "You! A Latin face among these stubborn Greeks! Defend, then, their heretical refusal of the Filioque! The Spirit proceeds from the Father AND the Son — Augustine taught it, the schools of Rome teach it, every wise theologian in Christendom knows it. Or are you, too, a schismatic?",
      },
    ],
    boss: {
      id: "boss-humbert",
      name: "Cardinal Humbert of Silva Candida",
      title: "Roman Legate",
      tradition: "Latin (pre-Vatican)",
      sprite: "humbert",
      maxHp: 340,
      intro:
        "Stubborn Greek! Sign the addition or be cast out of the universal Church!",
      midline:
        "You quote your Photios as if he were a Father. He was a SCHISMATIC.",
      outro:
        "Curse you — but I... I cannot answer the canon of Ephesus. I have laid the bull. I must withdraw.",
      victoryEpigraph: {
        text:
          "The single article concerning the procession of the Holy Spirit is the most pernicious, perilous, and detestable of the [Latin] errors.",
        source: "Synodal Letter of the Eastern Patriarchs (1848)",
      },
      attacks: [
        {
          claim:
            "Augustine, your own Father, teaches Filioque! Do you set yourselves above him?",
          options: [
            {
              text:
                "Augustine is honored — but the East has always read him with discernment. A local Father does not override the Ecumenical Councils.",
              correct: true,
              rationale:
                "The Greek Fathers and the conciliar consensus take precedence. Augustine's view is one option, not THE rule.",
            },
            {
              text: "Augustine is a heretic.",
              correct: false,
              rationale:
                "Augustine is a saint in the Orthodox Church (June 15), though his views require correction.",
            },
            {
              text: "Augustine never taught Filioque.",
              correct: false,
              rationale: "He did, in De Trinitate, with qualifications.",
            },
            {
              text: "Filioque is just words; doctrine is unchanged.",
              correct: false,
              rationale: "The procession of a divine Person is no small matter.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "Surely 'sending' (pempein) and 'proceeding' (ekporeuesthai) are the same. Christ sent the Spirit — therefore the Spirit proceeds from Him too.",
          options: [
            {
              text:
                "Two different Greek verbs, two different realities. Pempein = temporal sending. Ekporeuesthai = eternal procession. The Father alone is the SOURCE.",
              correct: true,
              rationale:
                "Photios's Mystagogy. The technical distinction preserves the monarchy of the Father.",
            },
            {
              text: "They are the same.",
              correct: false,
              rationale: "Theologically and grammatically wrong.",
            },
            {
              text: "Only ekporeusis matters; pempein is irrelevant.",
              correct: false,
              rationale: "Both matter; they describe different realities.",
            },
            {
              text: "The Spirit proceeds from the Son only.",
              correct: false,
              rationale: "No one has ever taught this. Heretical.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "But canon 7 of Ephesus only forbade SUBTRACTING from the Symbol — not adding. We added to clarify.",
          options: [
            {
              text:
                "Read the canon: 'NO ONE shall be allowed to bring forward, or write, or compose A DIFFERENT FAITH.' Adding is changing the Symbol.",
              correct: true,
              rationale: "Acts of Ephesus 431, Canon 7. The text is unambiguous.",
            },
            {
              text: "It only forbids subtracting.",
              correct: false,
              rationale: "Misreading.",
            },
            {
              text: "Ephesus does not bind Rome.",
              correct: false,
              rationale: "Ecumenical councils bind all the Church.",
            },
            {
              text: "Rome can override councils.",
              correct: false,
              rationale: "Vatican I's later claim, not the first millennium's.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Without Filioque, you make the Son lesser than the Spirit — for the Spirit has only one source while the Son has only one.",
          options: [
            {
              text:
                "The Son and Spirit are equal in essence and glory. Their personal relations differ: the Son is BEGOTTEN; the Spirit PROCEEDS. Both from the Father alone.",
              correct: true,
              rationale: "Cappadocian Trinitarian theology — symmetry in source, asymmetry in mode.",
            },
            {
              text: "Yes, the Son is lesser.",
              correct: false,
              rationale: "Pure Arianism.",
            },
            {
              text: "The Spirit is lesser.",
              correct: false,
              rationale: "Pneumatomachianism — also heretical.",
            },
            {
              text: "All three Persons proceed from one another.",
              correct: false,
              rationale: "Confusion — the Father alone is the source.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Peter received the keys (Matt 16:18)! Rome alone holds them. Submit to the Vicar of Christ — there is no Church without the Pope!",
          options: [
            {
              text: "The keys are given through Peter to ALL the Apostles (Matt 18:18; John 20:23). Rome held a primacy of honor — never of jurisdiction over the East. Christ alone is Head.",
              correct: true,
              rationale:
                "St. Cyprian, Unity of the Church 4: every bishop holds the keys. Canon 28 of Chalcedon explicitly limits Rome's prerogatives to honor and a primacy among equals.",
            },
            {
              text: "The keys belong to the Pope alone, and to no other bishop.",
              correct: false,
              rationale:
                "Latin innovation. The pre-schism Church held collegiality, not papal monarchy. The Pope had primacy, not supremacy.",
            },
            {
              text: "The keys belong to every Christian individually.",
              correct: false,
              rationale:
                "Reformation private-judgment view — also un-apostolic. The keys belong to the apostolic college.",
            },
            {
              text: "The keys were lost when Peter died.",
              correct: false,
              rationale:
                "The apostolic ministry continues through the laying-on of hands. The keys remain with the bishops.",
            },
          ],
          difficulty: 4,
          taunt: "Tu es Petrus! Submit!",
        },
        {
          claim:
            "Christ ate UNLEAVENED bread at the Last Supper, for it was Passover! Your leavened loaves contradict the Lord's own institution!",
          options: [
            {
              text: "Leaven signifies the risen, living Christ — bread that has risen from the dough as He rose from the tomb. The East has used leavened bread continuously from the Apostles.",
              correct: true,
              rationale:
                "The synoptics suggest Passover; John 19:14 places the Crucifixion on Preparation Day — meaning the Supper might not have been the formal seder. Both East and West have ancient practice.",
            },
            {
              text: "Yes, only unleavened bread is valid; the East errs.",
              correct: false,
              rationale:
                "The Eucharist's validity does not depend on this detail. The Council in Trullo (692) and centuries of unbroken Greek practice attest otherwise.",
            },
            {
              text: "Bread does not matter at all; we may use anything.",
              correct: false,
              rationale:
                "The matter of the sacrament does matter — it must be bread (wheat) and wine. But leavened vs. unleavened is liturgical custom, not dogma.",
            },
            {
              text: "Christ ate leavened bread; you Latins err on the historical fact.",
              correct: false,
              rationale:
                "Going beyond what the evidence supports. The honest answer admits ancient legitimacy on both sides.",
            },
          ],
          difficulty: 3,
        },
        {
          claim:
            "Your married priests defile the altar! Christ chose virgin apostles. Only the celibate may handle the holy things — this is apostolic discipline!",
          options: [
            {
              text: "Peter had a mother-in-law (Matt 8:14); 1 Tim 3:2 says a bishop must be 'the husband of one wife.' Mandatory celibacy is Latin discipline, not apostolic law.",
              correct: true,
              rationale:
                "The Council in Trullo (692) regulated but did not impose universal celibacy. Married priests are apostolic — only bishops are chosen from monastics.",
            },
            {
              text: "Yes, all clergy must be celibate; the East is in error.",
              correct: false,
              rationale:
                "Then Peter was in error — and the entire Eastern apostolic Church. Discipline differs; doctrine does not.",
            },
            {
              text: "Marriage is incompatible with priesthood in principle.",
              correct: false,
              rationale:
                "This is a theological judgment foreign to Scripture (1 Tim 3:2) and to the first millennium.",
            },
            {
              text: "Celibacy is a higher state and so should be universally enforced.",
              correct: false,
              rationale:
                "Virginity is a high calling (1 Cor 7:32-34) but not a precondition of ordination. The Church discerns each vocation.",
            },
          ],
          difficulty: 4,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text:
          "Humbert's certainty cracks. He looks down at the bull still lying on the altar, then at the kneeling deacon weeping over it, and for the first time something like doubt crosses his face. Without another word he gathers his legation and is gone. The great doors boom shut behind him.",
      },
      {
        speaker: "you",
        text: "He has withdrawn — but the parchment is still on the altar. Nothing is mended. Did I win anything at all?",
      },
      {
        speaker: "st-anthony",
        text:
          "You held the Symbol unaltered before a hardened man, and you planted a doubt in him. But no, child — the day is not undone. Cerularius will burn the bull and excommunicate the legates in return. The Church of East and West will not break clean today, but break it will, and centuries will pass before either side speaks of healing.",
      },
      {
        speaker: "narrator",
        text:
          "From the shadow of a porphyry column, a thin monk you have not seen before steps forward — hollow-eyed from fasting, dressed plainly, his gaze fixed on you across four hundred years.",
      },
      {
        speaker: "st-mark-ephesus",
        text:
          "I am Mark — of Ephesus, of an age not yet born. I will see this same dispute again, four centuries hence, in a great hall in Florence, when an emperor begs and a pope demands and every bishop but one signs the word away. The truth does not change with the century. Hold firm, $you. I shall need you there.",
      },
      {
        speaker: "you",
        text: "Then the wound torn today is the wound you will be asked to seal with a lie?",
      },
      {
        speaker: "st-mark-ephesus",
        text:
          "Just so. And I will not seal it. Come — take this stole, the epitrachelion, the yoke the priest wears to bind sinners loose. Wear the memory of this day under it. The schism deepens. To Florence.",
      },
    ],
    reward: { xp: 1, item: "epitrachelion", healHp: true },
  },

  // ===================================================================
  // CHAPTER 8 — FLORENCE (1439)
  // ===================================================================
  {
    id: "ch8-florence",
    number: 8,
    era: "AD 1439",
    location: "Council of Florence",
    title: "Mark Will Not Sign",
    background: "council-hall",
    ally: "st-mark-ephesus",
    intro: [
      {
        speaker: "narrator",
        text:
          "Florence, July 1439. The marble of the Duomo gleams; Italy is rich, fed, at peace. But the men who matter here came from a dying city. The Byzantine Empire has barely a decade to live; the Ottoman armies press ever closer to the walls of Constantinople, and only Latin ships and Latin soldiers can hold them back.",
      },
      {
        speaker: "narrator",
        text:
          "The Emperor John VIII Palaiologos has crossed the sea to beg for that help — and the price of it is union. After centuries of schism, the Greeks have come to Italy to reconcile with Rome. But reconciliation, the Latins have made plain, means submission: the Greeks must simply confess that Rome was right all along.",
      },
      {
        speaker: "st-anthony",
        text:
          "$you. Truth is purchased here for ships and soldiers, and the merchants are hungry. The Emperor will pay it — he must, or his city falls. Most of the bishops will pay it, worn down by months of hunger, exile, and fear far from home. One man will not. Watch him. Everything turns on him.",
      },
      {
        speaker: "you",
        text: "Then is he merely stubborn? If the city falls and the people die, will one bishop's pride have been worth it?",
      },
      {
        speaker: "st-anthony",
        text:
          "That is the very question the Pope will press upon you — and it is the sharpest blade in this hall. Listen to how the man answers it, $you, for it is not pride. It is the difference between saving a city by losing the Faith, and losing a city while keeping it. Decide now which of those is truly defeat.",
      },
      {
        speaker: "narrator",
        text:
          "The Greek bishops have signed, one by one, under months of pressure — bishops denied their stipends, bishops threatened with the loss of their sees, bishops simply desperate to sail home. The Filioque, accepted. Purgatory, accepted. Unleavened bread, accepted. The supremacy of the Pope of Rome, accepted.",
      },
      {
        speaker: "narrator",
        text:
          "Only one bishop refuses. He is forty-six years old, thin, hollow-eyed from fasting, the metropolitan of Ephesus and the finest theologian the Greeks have brought. The Pope sent for him last night and offered him a cardinal's hat to change his mind. He returned the offer untouched.",
      },
      {
        speaker: "st-mark-ephesus",
        text:
          "We meet again, $you — and now in the flesh of my own age. I am Mark, of Ephesus. I have read every line of every Father on the procession of the Spirit; I have answered the Latins point by point for two years in this hall. And still they will have their word. I will not sign. May God preserve me. May He preserve the Faith — though every other bishop here has fled into it.",
      },
      {
        speaker: "st-mark-ephesus",
        text:
          "$you, listen well. When this Council ends and we sail home, the people of Constantinople will see our signatures and TEAR THEM. The faithful will not commune with a unionist bishop; the monks of Athos will reject the decree outright. The union will be void on the day it lands. But here, today, in this hall, I must still speak the truth — for them, who cannot speak here.",
      },
      {
        speaker: "you",
        text: "Then why speak at all, if it will be undone the moment the decree leaves this room?",
      },
      {
        speaker: "st-mark-ephesus",
        text:
          "Because someone must stand in the record, child. Centuries from now, men will open the acts of this Council and find that not every Greek bowed — that the Faith had a witness even here, even when an emperor's crown and a city's life were laid against it. A truth unspoken because it seemed futile is a truth betrayed.",
      },
      {
        speaker: "st-anthony",
        text:
          "Stand with him. The empires fall; the faith does not. 'Better the loss of all,' the Fathers say, 'than to deny one syllable of the holy doctrine.' Remember the catacombs, $you — those mourners who sang over their dead. They lost everything and kept Christ. So must you, here.",
      },
      {
        speaker: "you",
        text: "But how do I face a pope — the man half of Christendom calls the Vicar of Christ — and tell him to his face that he is wrong?",
      },
      {
        speaker: "st-mark-ephesus",
        text:
          "Not with contempt, child, but with the Fathers. Honor the man; refuse the error. He will offer you mercy that is really fear, and necessity that is really a threat. Answer him with what cannot change — the Councils, the Scriptures, the unbroken witness — and let him do what he will.",
      },
      {
        speaker: "narrator",
        text:
          "The Pope of Rome enters in white and red, attended by cardinals. Eugene IV — tall, intelligent, gray with weariness. He has only lately survived a council at Basel that tried to depose him; he MUST have this union with the Greeks to consolidate his shaken throne. His clerks have prepared a dossier on the troublesome Ephesian, and he has read every page.",
      },
      {
        speaker: "pope-eugene",
        text:
          "Bring me the Ephesian. I will reason with him personally. Sign, Mark. The Eastern Empire dies tomorrow without our help. Pride is no virtue when nations bleed.",
      },
    ],
    boss: {
      id: "boss-eugene",
      name: "Pope Eugene IV",
      title: "Roman Pontiff",
      tradition: "Latin (Florence)",
      sprite: "pope-eugene",
      maxHp: 380,
      intro:
        "$you. You also? Sign with the others. Your Emperor commands it. Your conscience must yield to the Empire.",
      midline:
        "I have brought down kings. I will bring down one stubborn Ephesian and a foreign youth.",
      outro:
        "He has not signed. ...Then we have done nothing.",
      victoryEpigraph: {
        text:
          "I do not accept your additions. I will be received in death by the Greek Fathers — as Athanasius was, alone against the world.",
        source: "St. Mark of Ephesus, refusal at Florence",
      },
      attacks: [
        {
          claim:
            "If you do not sign, Constantinople falls and the Christian East perishes. Will you put one word above thousands of lives?",
          options: [
            {
              text:
                "If we save Constantinople by yielding the Faith, what is saved? The Body of Christ is not a state.",
              correct: true,
              rationale: "Mark's exact reasoning. The Church's identity is not negotiable.",
            },
            {
              text: "Yes, I will sign. Lives matter more than doctrine.",
              correct: false,
              rationale:
                "Mark refused this trade. The integrity of the Faith is not for political barter.",
            },
            {
              text: "Constantinople will fall regardless.",
              correct: false,
              rationale:
                "Fatalism. The point is faithfulness, not strategy.",
            },
            {
              text: "I will sign and then recant later.",
              correct: false,
              rationale: "Duplicity. The signature is the lie.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Even your fellow Greek bishops signed. Are they all wrong and you alone right?",
          options: [
            {
              text:
                "If they erred, they erred. Truth is not a vote. Athanasius alone stood against the Arian world.",
              correct: true,
              rationale:
                "The principle of conciliar reception requires the WHOLE Body, not majority pressure.",
            },
            {
              text: "I'll sign because the majority signed.",
              correct: false,
              rationale: "Argumentum ad populum. Truth is not by majority.",
            },
            {
              text: "Truth is whatever the bishops say.",
              correct: false,
              rationale: "Then there was no need for Mark or Athanasius.",
            },
            {
              text: "We must respect the consensus.",
              correct: false,
              rationale:
                "Reception by the whole Body is the criterion — and the Orthodox laity rejected Florence on return.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "The Filioque is a small addition; it changes nothing essential.",
          options: [
            {
              text:
                "Then why must I sign? Either it is essential (and we cannot accept) or it is nothing (and you need not impose).",
              correct: true,
              rationale: "Mark's killing reply. The dilemma is fatal.",
            },
            {
              text: "Yes, it is small; I will sign.",
              correct: false,
              rationale: "Mark refused. The principle is the point.",
            },
            {
              text: "Filioque is important; sign and resolve later.",
              correct: false,
              rationale: "Compromise on doctrine is not deferral; it is concession.",
            },
            {
              text: "Let us not discuss theology.",
              correct: false,
              rationale: "Evasion. The Church is theological by nature.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "The Pope is the visible head of the Church on earth, the rock on which Christ built it. To refuse him is to refuse Christ.",
          options: [
            {
              text:
                "The Rock is the CONFESSION Peter made (Mt 16:16). Origen, Chrysostom, Augustine in his Retractations all read it so. Every bishop is heir of Peter's confession.",
              correct: true,
              rationale: "Patristic exegesis of Mt 16:18 — the consensus reading.",
            },
            {
              text: "Yes, the Pope is the rock and infallible.",
              correct: false,
              rationale: "Florence position; rejected by Orthodoxy.",
            },
            {
              text: "Christ did not say Peter is the rock.",
              correct: false,
              rationale: "He did. But what is meant matters.",
            },
            {
              text: "There is no single rock.",
              correct: false,
              rationale: "The Confession of Christ is the rock — that is the answer.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "A Council cannot judge a Pope! The Pope is above the Council — Pastor Aeternus seals it. Sign or be condemned!",
          options: [
            {
              text: "The seven Ecumenical Councils judged popes (e.g. Honorius at Constantinople III, 681 — anathematized as a heretic). Conciliarity, not monarchy, is the apostolic order.",
              correct: true,
              rationale:
                "Honorius's posthumous condemnation by Constantinople III is the historical refutation of papal supremacy and infallibility — accepted by Rome herself until Vatican I.",
            },
            {
              text: "The Council is always above the Pope.",
              correct: false,
              rationale:
                "Conciliarism overcorrects. The truth is symphony: the Council with the bishop of Rome, each in his proper role.",
            },
            {
              text: "Neither Pope nor Council can err.",
              correct: false,
              rationale:
                "Only the consensus of the Church — received over time, expressed in the Councils — is preserved by the Spirit.",
            },
            {
              text: "Whoever has political power is right.",
              correct: false,
              rationale:
                "Erastianism. The Emperor convoked the Councils but did not define the faith. The bishops did.",
            },
          ],
          difficulty: 5,
          taunt: "Pastor Aeternus! The Pope speaks, the matter is closed!",
        },
        {
          claim:
            "The souls of the imperfect must be cleansed by FIRE before heaven. Purgatory is plain reason — and Maccabees prays for the dead!",
          options: [
            {
              text: "We pray for the dead too — but we do not teach a place of created fire that satisfies justice. The East holds the soul's condition after death is in God's mercy, not in punitive temporal flames.",
              correct: true,
              rationale:
                "St. Mark of Ephesus's First Homily on Purgatorial Fire at Florence. Orthodoxy affirms prayer for the dead; rejects the Latin doctrine of purgatorial fire as satisfaction.",
            },
            {
              text: "There is a created fire that punishes the soul before heaven.",
              correct: false,
              rationale:
                "Latin scholastic teaching that the East rejected at Florence and after.",
            },
            {
              text: "We must not pray for the dead at all.",
              correct: false,
              rationale:
                "Then 2 Maccabees 12:45 is wrong, and the entire liturgical tradition. The Church has prayed for the departed from the catacombs.",
            },
            {
              text: "Every soul is saved or damned at death — no intermediate state.",
              correct: false,
              rationale:
                "The Church teaches a 'partial taste' of judgment at death, with the final state at the General Resurrection. The mystery is not the Latin scholastic system.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "The Pope holds the treasury of merits of Christ and the saints. By indulgences he can release a soul from purgatory. The benefit is immediate — sign!",
          options: [
            {
              text: "No man holds Christ's merit as a treasury to dispense. Forgiveness comes through repentance and the sacraments, not legal credits transferred by papal decree.",
              correct: true,
              rationale:
                "This is precisely the doctrine that scandalized Luther a century later — and the East had rejected centuries before. Christ's merit is infinite and personal, not a quantified bank.",
            },
            {
              text: "Indulgences are valid if money is given to the Church.",
              correct: false,
              rationale:
                "The Tetzelian abuse: 'When the coin in the coffer rings, the soul from purgatory springs.' Even Rome later regulated this.",
            },
            {
              text: "Only saints can transfer merit to others.",
              correct: false,
              rationale:
                "The saints intercede; they do not 'transfer credits.' This commercializes the communion of the saints.",
            },
            {
              text: "Indulgences are how God forgives all sins.",
              correct: false,
              rationale:
                "Confession and the Eucharist forgive sins. Indulgences are an extra-sacramental Latin development with no parallel in the East.",
            },
          ],
          difficulty: 5,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text:
          "Eugene's gaze drops to the great decree of union, with its long column of signatures. He runs his eye to the bottom, where one name should be and is not. 'Then,' he says quietly, 'we have done nothing.' The Latins called it the document that reunited the Church. The Greeks would soon call it the document no one signed who mattered.",
      },
      {
        speaker: "st-mark-ephesus",
        text:
          "Today I have stood alone, but with the company of the Fathers. The signature of the others will not save Constantinople — the city will fall in fourteen years, and no Western army will come. But my refusal may save the Faith. When my brothers sail home, the people will not even let the unionist bishops serve. The union will die at the harbor.",
      },
      {
        speaker: "you",
        text: "They say a dying emperor begged you, and you would not yield. Did you never doubt that you might be the one in error — alone against them all?",
      },
      {
        speaker: "st-mark-ephesus",
        text:
          "Every hour, child. But Athanasius, too, stood alone against the world, and the world was wrong. I do not trust my own stubbornness — I trust the Councils and the Fathers, who do not lie even when emperors weep. If they receive me in death, I am content to be received as he was.",
      },
      {
        speaker: "narrator",
        text:
          "Mark of Ephesus will die nine years from now. On his deathbed he will beg that no unionist bishop attend his funeral. The Orthodox will glorify him as a saint — the Pillar of Orthodoxy, the man who would not sign.",
      },
      {
        speaker: "st-anthony",
        text:
          "You have learned the costliest lesson of all: that faithfulness is sometimes indistinguishable from defeat, until eternity sorts the two. Hold it close. Now the bleakest century awaits. To Moscow, 1937 — the Soviets, the cellars, the blood that endures. Take my hand.",
      },
    ],
    reward: { xp: 1, healHp: true },
  },

  // ===================================================================
  // CHAPTER 9 — THE SOVIET BASEMENT (AD 1937)
  // ===================================================================
  {
    id: "ch9-soviets",
    number: 9,
    era: "AD 1937",
    location: "NKVD Interrogation Cell, Moscow",
    title: "The New Martyrs",
    background: "interrogation",
    intro: [
      {
        speaker: "narrator",
        text:
          "A bare concrete room. A single bulb. The smell of disinfectant and fear. Twenty years since the Revolution. The Year of the Great Purge has begun. Across the country, churches are demolished by dynamite — Christ the Saviour, the Trinity-Sergius. Bells melted for coins.",
      },
      {
        speaker: "narrator",
        text:
          "A man in a gray uniform sits across the table, calm, almost kind. He has a wife and two daughters at home and a photograph of them in his breast pocket. He believes — sincerely — that he is building paradise on earth, and that the old religion is the chief obstacle to it. He has signed three hundred and seven execution orders this month.",
      },
      {
        speaker: "st-anthony",
        text:
          "In this year alone, $you, some eighty thousand Orthodox Christians will be shot in Russia. Bishops killed in cellars like this one. Priests drowned, buried alive, worked to death in the snow of the far north. The dynamite has already brought down the great Cathedral of Christ the Saviour in Moscow; the bells of a thousand churches have been melted for coin.",
      },
      {
        speaker: "you",
        text: "Twenty years ago the Tsar reigned and Russia was called Holy. How could a whole Christian nation come to THIS in a single lifetime?",
      },
      {
        speaker: "st-anthony",
        text:
          "Because faith that is merely inherited is not yet tested, child — and an age came that tested it to the root. The Revolution promised heaven without God, and the men who built it learned quickly that the God they had denied was the one rival they could not abide. So they set out to erase Him. And they have learned, as Decius learned, that the Church does not erase.",
      },
      {
        speaker: "st-anthony",
        text:
          "You have walked among the witnesses already, though you did not know them: Patriarch Tikhon, who blessed his executioners; Hilarion of Troitsky, dying in the camp of the Solovki islands; the Royal Family in their cellar at Ekaterinburg; Mother Maria of Paris, who will give her own place in the gas chamber to another. And the hidden ones — Father Arseny in the camp of death, the blind Saint Matrona praying in her corner.",
      },
      {
        speaker: "you",
        text: "And the man across the table — does he hate Christ, the way the centurion did, the way Decius did?",
      },
      {
        speaker: "st-anthony",
        text:
          "No, $you — and that is what makes him a man of his century. He does not hate God; he believes he has outgrown Him. He thinks he is being kind, dragging the people up out of superstition into the daylight of science and the State. The lions roared; this man will reason with you, softly, and offer you your life. The reasonable executioner is a colder thing than the cruel one.",
      },
      {
        speaker: "you",
        text: "If they killed the bishops and burned the churches, then what is left of the Church to defend?",
      },
      {
        speaker: "st-anthony",
        text:
          "Everything that matters. The Church does not die when its bishops are killed; it goes underground, into the catacombs again, and grows. You will not win this chapter with clever words, $you. You must learn the hardest truth of all: that some questions are not answered with argument but with blood — and that the answer can still be spoken, as long as breath remains.",
      },
      {
        speaker: "st-anthony",
        text:
          "Hear me closely. The Captain does not truly want your soul tonight. He wants a NAME — a priest, a friend, anyone — a signature that proves you have cooperated, that 'just gets you home.' That signature is the libellus of this age. Do not give it. To name another to that table is to deny Christ in him.",
      },
      {
        speaker: "narrator",
        text:
          "The door opens behind you. Two guards take their positions against the wall. A single bulb sways and steadies. Captain Pavlov gestures, almost courteously, to the chair across the bare table.",
      },
      {
        speaker: "nkvd",
        text:
          "Sit down, comrade. I am Captain Pavlov. You have been arrested for anti-revolutionary religious activity — a serious charge, but not, perhaps, beyond mending. Let us have a calm conversation, you and I. I have a family; you have a mother. Confess what I need, and you live. It is very simple.",
      },
    ],
    boss: {
      id: "boss-nkvd",
      name: "Captain Pavlov",
      title: "NKVD Interrogator",
      tradition: "Soviet Atheism",
      sprite: "nkvd",
      maxHp: 420,
      intro:
        "Sign here. Renounce religion. You may go home tonight. Your mother is waiting.",
      midline:
        "You are not the first to be stubborn. But you may yet be the first wise enough to live.",
      outro:
        "You... you will be taken away. ...And yet I find I cannot make you afraid. Take him.",
      victoryEpigraph: {
        text:
          "We do not lose hope. Outwardly we waste away; inwardly we are renewed day by day.",
        source: "St. Paul, 2 Corinthians 4:16 (and the New Martyrs of Russia, 1917-1945)",
      },
      attacks: [
        {
          claim:
            "Religion is the opium of the people — Marx's words. Confess that the Church manipulated you, and walk free.",
          options: [
            {
              text:
                "Marx's slogan does not answer the witnesses of the Resurrection or the lives of the saints. The Church gave me my Mother of God; you offer me a state.",
              correct: true,
              rationale: "The Orthodox answer to Marx: empirical claims about saints' lives, miracles, the Resurrection.",
            },
            {
              text: "I confess that Marx was right.",
              correct: false,
              rationale: "Apostasy. Lose HP.",
            },
            {
              text: "I have no opinion.",
              correct: false,
              rationale: "Cowardice. Christ requires confession (Mt 10:32).",
            },
            {
              text: "Marx was a religious thinker too.",
              correct: false,
              rationale: "Weak. Marx explicitly denied religion.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "We have proved scientifically that there is no God. Why hold to a peasant superstition?",
          options: [
            {
              text:
                "Science explores HOW the universe works. The question of WHY there is something rather than nothing is not its territory.",
              correct: true,
              rationale: "Distinction of mechanism and meaning. Science does not refute theism by method.",
            },
            {
              text: "I admit there is no God.",
              correct: false,
              rationale: "Apostasy. Lose HP.",
            },
            {
              text: "Science is wrong.",
              correct: false,
              rationale: "False opposition. Science and faith address different questions.",
            },
            {
              text: "There is no point in this conversation.",
              correct: false,
              rationale: "Resignation does not testify.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "Your bishop, Sergius, has signed the loyalty declaration. The Patriarchate is with us. You are not Orthodox — you are a sectarian.",
          options: [
            {
              text:
                "The Church is not the Patriarchate alone. It is the Body of Christ, witnessed by the catacomb confessors — and they have not signed.",
              correct: true,
              rationale:
                "The Catacomb Church / Joseph of Petrograd / Hilarion Troitsky tradition. The visible Church endures even when shepherds compromise.",
            },
            {
              text: "Yes, I will follow the official Church wherever it goes.",
              correct: false,
              rationale: "Sergianism extreme — the surrender of conscience to state-aligned clergy.",
            },
            {
              text: "The Church has died.",
              correct: false,
              rationale: "Mt 16:18 — the gates of hell shall not prevail.",
            },
            {
              text: "I will join your Soviet church.",
              correct: false,
              rationale: "Apostasy via state.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Your sister is in the next room. If you sign, she goes home. If you do not, neither of you does.",
          options: [
            {
              text:
                "Do not bring my sister into this. She would tell me to confess Christ. I will not deny Him for any earthly love.",
              correct: true,
              rationale:
                "Mt 10:37 — he who loves father or mother more than Me is not worthy of Me. The hardest test.",
            },
            {
              text: "I will sign for her sake.",
              correct: false,
              rationale: "Apostasy under coercion is still apostasy.",
            },
            {
              text: "I do not have a sister.",
              correct: false,
              rationale: "Evasion. The question is the principle.",
            },
            {
              text: "Let her sign instead of me.",
              correct: false,
              rationale: "Cowardice transferred.",
            },
          ],
          difficulty: 5,
          taunt: "Think of her.",
        },
        {
          claim:
            "Where is your God now? In the camps? In the famines? He is silent — therefore He is not. The cosmos has no Father.",
          options: [
            {
              text: "He is in the camps — bound, beaten, dying, with His people. The God of the Cross is precisely the God who suffers with us. His silence is not absence.",
              correct: true,
              rationale:
                "St. Maria of Paris in Ravensbrück; Fr. Arseny in the gulag. The Christian answer to suffering is not philosophical, but Christological: the Cross.",
            },
            {
              text: "He is testing the worthy and abandoning the weak.",
              correct: false,
              rationale:
                "Stoic, not Christian. God does not abandon — even the cry 'why hast thou forsaken me?' is itself from Psalm 22 and ends in vindication.",
            },
            {
              text: "He is angry; the gulag is punishment for our sins.",
              correct: false,
              rationale:
                "Job's friends spoke so, and were rebuked (Job 42:7). The presence of suffering is not the measure of guilt.",
            },
            {
              text: "There is no God; you are right.",
              correct: false,
              rationale:
                "The very capacity to recognize evil as evil presupposes a standard — which atheism cannot ground.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Marx settled it: religion is the OPIUM OF THE PEOPLE. You cling to fairy tales to dull the pain of class struggle. Cast off the chains!",
          options: [
            {
              text: "If religion were opium, the martyrs would not have died for it — opium dulls; faith DROVE them to suffer. Marx confused the symptom with the disease.",
              correct: true,
              rationale:
                "The martyrs of Russia under Soviet rule (~200,000+ killed for the faith) decisively refute the opium thesis. Opium-users do not seek the firing squad.",
            },
            {
              text: "Yes, Marx was right; religion is sociology.",
              correct: false,
              rationale:
                "Genetic fallacy. Even if religion serves social functions (which it does), that does not falsify its truth claims.",
            },
            {
              text: "Marxism is a religion of its own.",
              correct: false,
              rationale:
                "True, and worth saying — but not the deepest answer. The deeper answer is that the martyrs prove the opium thesis empirically wrong.",
            },
            {
              text: "Christianity is for the rich, against the poor.",
              correct: false,
              rationale:
                "Historically false. The early Church was overwhelmingly poor and slave. 'God hath chosen the poor of this world' (James 2:5).",
            },
          ],
          difficulty: 4,
          taunt: "Workers of the world unite!",
        },
        {
          claim:
            "Science has explained the cosmos. Evolution, the Big Bang — no Creator required. Your God is a god of the gaps, shrinking yearly.",
          options: [
            {
              text: "Science explains the HOW of natural processes; it cannot explain WHY there is anything at all. The God of Genesis is not a competing physical cause but the ground of being itself.",
              correct: true,
              rationale:
                "The Fathers (Basil's Hexaemeron, Gregory of Nyssa) read Genesis as both historical AND theological — not as a rival to natural philosophy.",
            },
            {
              text: "Evolution and the Big Bang are atheist lies.",
              correct: false,
              rationale:
                "Many Orthodox theologians accept both as natural processes within the divine economy. The dispute is about meaning, not mechanism.",
            },
            {
              text: "Science is evil and we should reject it.",
              correct: false,
              rationale:
                "Anti-intellectual. Many Orthodox saints (e.g. St. Luke the Surgeon) were both scientists and theologians.",
            },
            {
              text: "Genesis is poetry only; it has no historical content.",
              correct: false,
              rationale:
                "Reductionist. Genesis tells real truths about creation, fall, and covenant — even if its literary form is not a modern textbook.",
            },
          ],
          difficulty: 4,
        },
      ],
    },
    outro: [
      {
        speaker: "nkvd",
        text:
          "Take him away. ...No. Wait. I have broken professors and generals and bishops at this table, and they all, in the end, were afraid. You are not. I find I cannot make you afraid, and I do not understand it. ...Take him.",
      },
      {
        speaker: "narrator",
        text:
          "You are led from the cell. The door closes on the swaying light behind you. In the truck, in the freight car, in the labor camp at the edge of the white silence — you remember the verses you spoke, and the name you would not give, and you do not unsay them.",
      },
      {
        speaker: "you",
        text: "I gave no name. But I am being driven into the snow to die, and the Captain goes home to his daughters. What was won here?",
      },
      {
        speaker: "st-anthony",
        text:
          "A soul kept whole, child. And perhaps a second — for the man who 'cannot make you afraid' will think on you for the rest of his life. The blood of the martyrs is seed; it does not water only the ground that the martyr can see. Some of those Pavlovs end their days secretly baptized.",
      },
      {
        speaker: "narrator",
        text:
          "Across this one year, eighty thousand confessors of the faith are killed for refusing to do what you refused. They are not forgotten. The Church will glorify them in their thousands as the New Martyrs of Russia, and the cellars where they died will become altars.",
      },
      {
        speaker: "st-anthony",
        text:
          "You walked among them and did not break. Now — back to your own time, $you, and to the strangest battlefield of all. The lions are gone and the cellars are empty, but the war is not over. It has only grown quiet. The hardest chapter is the one you live in. Come.",
      },
    ],
    reward: { xp: 1, healHp: true },
  },

  // ===================================================================
  // CHAPTER 10 — THE MODERN AGE
  // ===================================================================
  {
    id: "ch10-modern",
    number: 10,
    era: "The Present Day",
    location: "Your apartment / a coffee shop / the internet",
    title: "Be Ready Always",
    background: "modern",
    intro: [
      {
        speaker: "narrator",
        text:
          "You wake. Light through cheap curtains. Your phone, your coffee maker, the hum of traffic below. The black leather book with the three-bar cross sits on your nightstand, exactly where you left it. And yet nothing is the same. You have been gone for centuries and home for no time at all.",
      },
      {
        speaker: "narrator",
        text:
          "You can still hear St. Ignatius's chains scraping the road to Rome, still feel the grit of Macarius's desert between your teeth, still see Mark of Ephesus's hollow eyes refusing the pen at Florence. They walk with you now. 'The great cloud of witnesses' is no longer a phrase from a Sunday-school felt-board. You have met them.",
      },
      {
        speaker: "st-anthony",
        text:
          "You have walked the whole path — from the Apostolic Age through the Councils, through the dark night of the desert, through Schism and Council, through the Gulag. The Church survived all of it.",
      },
      {
        speaker: "st-anthony",
        text:
          "Now comes the test you came for: defending the faith in the AGE YOU LIVE IN. The persecutions are less bloody but more subtle — no centurion, no NKVD captain, only the air itself, which has quietly forgotten God. In Pavlov's day a man had to be DRAGGED from the faith. In yours, men drift from it without ever noticing they have moved.",
      },
      {
        speaker: "you",
        text: "That sounds almost gentler than the lions and the cellars.",
      },
      {
        speaker: "st-anthony",
        text:
          "It is far more dangerous, child. The martyr knows he is in a battle. Your neighbors do not. They will not threaten you — they will simply find your faith quaint, or offer you a brighter, easier version of it. Three voices will come to you today, each sincere, each speaking what millions believe. None of them hates Christ. That is what makes them hard.",
      },
      {
        speaker: "st-anthony",
        text:
          "Be ready always to give an account for the hope that is in you — but with meekness and reverence (1 Peter 3:15). Note the meekness, $you. The world does not need another debater who must win. It needs a SAINT who can answer, and still love the one he answers. Win the argument and lose the soul, and you have lost.",
      },
      {
        speaker: "you",
        text: "Then where do I even begin with people who already think they have the answer?",
      },
      {
        speaker: "st-anthony",
        text:
          "Begin where you began with the centurion — by taking them seriously. The first voice today claims that the whole Church you have just walked through, from Ignatius to the New Martyrs, FELL into total darkness, and had to be started over from scratch eighteen centuries late. You have stood in that 'darkness.' You know better than any living scholar that it never went out. Let them tell their story; then tell them what you have seen.",
      },
      {
        speaker: "narrator",
        text:
          "Morning light. There is a knock at the door — bright, practiced, hopeful. Through the peephole: two young men, perhaps nineteen, in crisp white shirts and dark ties, black nametags on their breasts, small blue books in their hands. They have walked a long way and been turned away at a hundred doors.",
      },
      {
        speaker: "lds",
        text:
          "Good morning! I'm Elder Williams, and this is Elder Park. We're missionaries for the Church of Jesus Christ of Latter-day Saints. May we share with you a message about Jesus Christ and the restoration of His true Church?",
      },
    ],
    boss: {
      id: "boss-lds",
      name: "Elder Williams",
      title: "LDS Missionary",
      tradition: "LDS / Mormonism",
      sprite: "lds",
      maxHp: 260,
      intro:
        "Joseph Smith restored the true Church of Jesus Christ in 1830. May I share his story?",
      midline:
        "You know quite a bit about our faith. May I ask: have you prayed about the Book of Mormon?",
      outro:
        "Thank you for the conversation. I... I will check the essays on the Church website tonight.",
      victoryEpigraph: {
        text:
          "I will build my Church; and the gates of hell shall not prevail against it.",
        source: "Matthew 16:18",
      },
      attacks: [
        {
          claim:
            "After the Apostles died, the Church fell into total apostasy. It had to be restored by Joseph Smith. Will you consider this?",
          options: [
            {
              text:
                "Christ said the gates of hell shall NOT prevail against His Church (Mt 16:18). The unbroken patristic record from 96 AD onward documents a continuous Church.",
              correct: true,
              rationale: "Mt 16:18 + the historical Apostolic Fathers refute the apostasy thesis.",
            },
            {
              text: "Yes, the Church was lost.",
              correct: false,
              rationale: "This denies Christ's own promise.",
            },
            {
              text: "The Church survived but lost the priesthood.",
              correct: false,
              rationale: "There is no evidence of a 'priesthood-lost' century.",
            },
            {
              text: "Joseph Smith restored what was never lost.",
              correct: false,
              rationale: "If never lost, no restoration needed.",
            },
          ],
          difficulty: 3,
        },
        {
          claim:
            "Athanasius said 'God became man so that man might become God.' Mormon exaltation teaches the same — humans become gods.",
          options: [
            {
              text:
                "Athanasius adds: BY GRACE, not by nature. We become 'partakers of the divine nature' (2 Pet 1:4) — but we do not become separate gods ruling our own creations.",
              correct: true,
              rationale: "Theosis = participation in uncreated energies. Exaltation = ontological god-becoming.",
            },
            {
              text: "Yes, we will be separate gods.",
              correct: false,
              rationale: "Mormon doctrine — denied by Is 43:10-11.",
            },
            {
              text: "Athanasius was Mormon.",
              correct: false,
              rationale: "Anachronistic and false.",
            },
            {
              text: "The doctrines are equivalent.",
              correct: false,
              rationale: "The metaphysics are opposite.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Pray about the Book of Mormon. The Holy Ghost will testify that it is true (Moroni 10:4).",
          options: [
            {
              text:
                "Feelings are not the rule of faith. Galatians 1:8 — even an angel preaching a different gospel is to be rejected. The test is the apostolic deposit, not subjective experience.",
              correct: true,
              rationale: "Epistemological response. Inner testimony cannot adjudicate competing claims (Muslims, Hindus all report similar feelings).",
            },
            {
              text: "I will pray and decide based on feelings.",
              correct: false,
              rationale: "Subjectivism. Truth is not by emotion.",
            },
            {
              text: "Yes, the burning bosom is decisive.",
              correct: false,
              rationale: "Then the Buddhist's bliss is also decisive.",
            },
            {
              text: "I will trust whoever speaks last.",
              correct: false,
              rationale: "Indifference.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "Joseph Smith translated golden plates buried in upstate New York. Have you read the Book of Mormon for yourself? It is another testament of Jesus Christ.",
          options: [
            {
              text: "I trust the Apostles, who saw the risen Christ in Palestine — not a private revelation to one man in 1820s America with no surviving plates and contradicted by DNA, archaeology, and Smith's own multiple First Vision accounts.",
              correct: true,
              rationale:
                "The historicity of the Book of Mormon (Nephites, horses, steel, etc.) is unsupported by archaeology and contradicted by Native American DNA evidence.",
            },
            {
              text: "Sure — I am open to new revelation.",
              correct: false,
              rationale:
                "St. Paul: 'Though an angel from heaven preach any other gospel, let him be accursed' (Gal 1:8). The deposit of faith is closed.",
            },
            {
              text: "The Book of Mormon contradicts the Bible, but both can be true.",
              correct: false,
              rationale:
                "Logical impossibility. The BoM teaches God was once a man (King Follett Discourse implications) — the Bible says 'I am God, and there is none else, neither was a god formed before me' (Isaiah 43:10).",
            },
            {
              text: "I cannot judge without reading every text.",
              correct: false,
              rationale:
                "Then no one could judge between religions. Christ said: 'By their fruits ye shall know them' — and the witness of the Apostles is sufficient for discernment.",
            },
          ],
          difficulty: 3,
          taunt: "Read it. Pray about it. The Spirit will confirm.",
        },
        {
          claim:
            "Paul mentions 'baptism for the dead' (1 Cor 15:29). We perform proxy baptism. We practice what Paul taught — you do not!",
          options: [
            {
              text: "Paul mentions the practice in passing to argue from his opponents' own assumption — he does not endorse it. The ancient Church never practiced proxy baptism. It is dishonest exegesis to build a doctrine on one ambiguous verse.",
              correct: true,
              rationale:
                "Paul's argument in 1 Cor 15:29 is ad hominem: 'IF there is no resurrection, why even do this?' He does not approve it, and the early Church did not practice it.",
            },
            {
              text: "Yes, the early Church practiced proxy baptism universally.",
              correct: false,
              rationale:
                "Historically false. There is no evidence in the first-century Church or any patristic source endorsing the practice.",
            },
            {
              text: "Mormons invented it, but it is permissible.",
              correct: false,
              rationale:
                "The Church does not innovate sacraments. Baptism is for the living believer's regeneration, not for the dead by proxy.",
            },
            {
              text: "Once baptized, a person can be baptized again for others.",
              correct: false,
              rationale:
                "Baptism is once for each soul (Eph 4:5: 'one Lord, one faith, one baptism'). It is not transferable.",
            },
          ],
          difficulty: 3,
        },
        {
          claim:
            "We have LIVING APOSTLES today — twelve of them, called and ordained. Your closed canon and dead church cannot compare to ongoing revelation!",
          options: [
            {
              text: "The Apostolic ministry continues through apostolic succession — bishops in unbroken line from the Twelve. We do not lack apostles; we have many. But the deposit of faith was delivered once for all (Jude 3).",
              correct: true,
              rationale:
                "Jude 3: 'the faith which was ONCE FOR ALL delivered unto the saints.' Apostolic succession preserves; it does not produce new revelation.",
            },
            {
              text: "Yes, twelve living apostles is biblical.",
              correct: false,
              rationale:
                "The Twelve were specifically those who saw the risen Christ (Acts 1:21-22). No modern church has such men.",
            },
            {
              text: "Revelation continues with anyone who claims it.",
              correct: false,
              rationale:
                "Then Mohammed, Joseph Smith, and a thousand others all qualify. The Apostolic norm is the standard.",
            },
            {
              text: "Bishops are not apostles; we have no apostles today.",
              correct: false,
              rationale:
                "The bishops are 'apostolic men' in succession from the Twelve. The ministry continues; the office of Apostle (eyewitness of the Risen Lord) was unique.",
            },
          ],
          difficulty: 4,
        },
      ],
    },
    outro: [
      {
        speaker: "lds",
        text:
          "I... thank you. Most people just close the door. You actually knew our history — better than I expected. I don't have an answer for some of what you said. I'll look at the essays on the Church's own website tonight. Maybe we can talk again.",
      },
      {
        speaker: "narrator",
        text:
          "The two young men walk back down the path, heads close together, talking low. Elder Park glances back once at your door. Whatever else happened, the practiced script did not run as usual today.",
      },
      {
        speaker: "st-anthony",
        text:
          "He left with a question lodged in his mind — and a question is a crack through which light can enter. That is more than most doors give those boys. You did not crush him; you answered him and let him keep his dignity. That is the whole art, $you.",
      },
      {
        speaker: "you",
        text: "He seemed so certain — and so kind. I almost felt cruel correcting him.",
      },
      {
        speaker: "st-anthony",
        text:
          "Kindness without truth is not kindness, child; it merely leaves a man comfortable in error. You gave him both. Now — the next voice comes, and it will be harder, for it springs from within Christianity itself. Rest a moment. Then answer the door of your heart again.",
      },
      {
        speaker: "narrator",
        text:
          "Your phone buzzes. A friend wants coffee in an hour, and she is bringing someone she thinks you should meet — a seminarian, sharp and devout, who heard you were 'turning Orthodox' and has opinions. The next encounter has begun.",
      },
      {
        speaker: "reformed",
        text:
          "Wait — you're going Orthodox? That's the church with all the icons and the incense, right? The one that prays to Mary? Don't tell me you've forgotten sola scriptura. We have to talk.",
      },
    ],
    reward: { xp: 1, healHp: true },
  },

  // ===================================================================
  // CHAPTER 10B — REFORMED SEMINARIAN
  // ===================================================================
  {
    id: "ch10b-reformed",
    number: 11,
    era: "The Present Day, an hour later",
    location: "Coffee shop",
    title: "The Reformer's Daughter",
    background: "modern",
    intro: [
      {
        speaker: "narrator",
        text:
          "Coffee mugs and the hiss of the espresso machine. Hardwood tables, the smell of roasted beans and old book-pages. Mid-afternoon light slants across a young woman with cropped hair and quick, intelligent eyes. A worn copy of Calvin's Institutes rests on the chair beside her, two highlighters and a flurry of sticky tabs poking from the pages.",
      },
      {
        speaker: "you",
        text: "She is already reading something. She looks like she came prepared for a fight.",
      },
      {
        speaker: "narrator",
        text:
          "Sarah Kelley. A seminarian in the Presbyterian Church in America — confessional, Reformed, the daughter and granddaughter of pastors. She has been a Christian her whole life: devout, serious, up at six every morning with her Bible and a notebook. She lost a younger sister to leukemia at sixteen and prayed her way through the grave, and her faith came out of it harder and brighter, not broken. She is not the enemy.",
      },
      {
        speaker: "st-anthony",
        text:
          "$you. Be GENTLE here — more gentle than with the missionary, for this one is your own kin in Christ. She loves the Lord truly. She knows her Bible better than most priests. Her categories differ from ours — sola scriptura, sola fide, sola gratia, the five solas of the Reformation — but they were forged against real abuses, and there is honesty in them. Listen first. Correct without crushing.",
      },
      {
        speaker: "you",
        text: "If she already loves Christ and reads the Scriptures, what is even left to disagree about?",
      },
      {
        speaker: "st-anthony",
        text:
          "The deepest things, child — though they wear quiet names. Where does the Church's authority finally rest: in the Book alone, or in the living Body that gave us the Book and tells us which writings ARE Scripture? Is salvation a courtroom verdict declared over us, or a healing that we must live into? She inherited her answers from the sixteenth century. You will offer her the answers of the first.",
      },
      {
        speaker: "st-anthony",
        text:
          "And mark this above all: the danger in this conversation is not losing the argument. It is winning it and losing the person. A defeated Protestant who feels humiliated walks away from Christ, not toward Him. Speak the truth in love (Ephesians 4:15) — and mean both words equally.",
      },
      {
        speaker: "st-anthony",
        text:
          "Remember, $you: she stands in a true protest against real sins — indulgences sold for coin, a piety grown mechanical, the Word buried under abuse. The Reformers were RIGHT to be angry. Where they erred was the cure: they cut away fifteen centuries to reach the first, not knowing the first century is preserved IN those fifteen. Honor her protest. Then show her the Church the Reformers never saw — the one older than the abuses.",
      },
      {
        speaker: "narrator",
        text:
          "She sets down her latte, slides Calvin's Institutes off the chair so you can sit, and folds her hands on the table with the calm of someone who has had this conversation a dozen times and never lost.",
      },
      {
        speaker: "reformed",
        text:
          "Look — I genuinely respect the Eastern tradition. The history, the beauty, I get the appeal. But the Reformation recovered the GOSPEL. We are saved by grace alone, through faith alone — not by sacraments, not by venerating saints, not by a Church hierarchy standing between us and God. Scripture alone is the rule. Show me where the Bible teaches what you're about to defend.",
      },
    ],
    boss: {
      id: "boss-reformed",
      name: "Sarah Kelley",
      title: "Reformed Seminarian",
      tradition: "Reformed Protestantism",
      sprite: "reformed",
      maxHp: 320,
      intro:
        "Where in Scripture do you find prayers to Mary? Where do you find seven sacraments? You add to the Bible.",
      midline:
        "OK — I admit, you know my tradition's documents better than most of my classmates.",
      outro:
        "I... I want to talk again. May I read 1 Clement this week and come back?",
      victoryEpigraph: {
        text:
          "Therefore, brethren, stand fast, and hold the traditions which ye have been taught, whether by word, or our epistle.",
        source: "2 Thessalonians 2:15",
      },
      attacks: [
        {
          claim: "Sola scriptura. Anything outside the Bible is human invention.",
          options: [
            {
              text:
                "2 Thessalonians 2:15 commands holding BOTH oral and written tradition. Scripture itself never claims to be the SOLE rule. And the canon was discerned by the Church.",
              correct: true,
              rationale: "The Pauline command + the canonical question undo sola scriptura.",
            },
            {
              text: "Scripture is the only rule of faith.",
              correct: false,
              rationale: "Sola scriptura — refuted by 2 Th 2:15.",
            },
            {
              text: "Tradition contradicts Scripture.",
              correct: false,
              rationale: "Patristic tradition INTERPRETS Scripture; the canon itself is tradition.",
            },
            {
              text: "We need no Scripture, only tradition.",
              correct: false,
              rationale: "Wrong opposite extreme. Both together.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "James says faith without works is dead, but Paul says we are justified by faith APART from works. James 2 and Romans 4 contradict.",
          options: [
            {
              text:
                "Paul's 'works of the law' are Mosaic boundary markers (circumcision, kosher). James's works are works of love. The coherence: faith working through love (Gal 5:6).",
              correct: true,
              rationale:
                "The Pauline / Jacobean integration. Same Apostle Paul says love is the only thing that counts (Gal 5:6).",
            },
            {
              text: "James is wrong; Paul prevails.",
              correct: false,
              rationale:
                "Luther himself wanted to remove James from the canon — but it stayed. The two are coherent.",
            },
            {
              text: "Paul is wrong; James prevails.",
              correct: false,
              rationale: "Both are Scripture.",
            },
            {
              text: "We are saved by works.",
              correct: false,
              rationale: "Pelagian. Faith and works are inseparable, not interchangeable.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "You pray to Mary as a mediator. 1 Timothy 2:5: 'one mediator between God and men.'",
          options: [
            {
              text:
                "1 Tim 2:5 affirms Christ's unique SAVING mediation. Two verses earlier, Paul commands us to PRAY FOR ONE ANOTHER. Asking Mary's prayers is asking a sister, not adding a savior.",
              correct: true,
              rationale: "1 Tim 2:1 + 2:5 must be read together. Christ is unique Savior; the saints are intercessors in His Body.",
            },
            {
              text: "Mary is a co-redeemer.",
              correct: false,
              rationale: "Roman extreme; not the Orthodox confession.",
            },
            {
              text: "We do not pray to Mary.",
              correct: false,
              rationale: "We do — but we ask her prayers, not her atonement.",
            },
            {
              text: "Prayer to anyone but Christ is idolatry.",
              correct: false,
              rationale: "Then we cannot ask each other to pray either. Reductio.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "Romans 3:28: 'A man is justified by faith APART FROM works of the law.' Sola fide is plain Scripture. You add works to grace!",
          options: [
            {
              text: "James 2:24 — 'a man is justified by works and NOT BY FAITH ALONE.' Both are Scripture. We are saved by grace through living faith, which works (Gal 5:6) — not by mere assent.",
              correct: true,
              rationale:
                "St. James's reply to Paul, in the same New Testament. Sola fide cannot stand James's explicit refutation. Faith and works are not opposites but one living reality.",
            },
            {
              text: "Yes, faith alone — works are added later by Catholics.",
              correct: false,
              rationale:
                "Then St. James is wrong. The Reformers struggled with James precisely because it explicitly denies sola fide.",
            },
            {
              text: "We are saved by works, not faith.",
              correct: false,
              rationale:
                "Pelagian. The Church holds synergy: grace primary, our cooperation real but never meritorious by itself.",
            },
            {
              text: "Faith and works are completely separate categories.",
              correct: false,
              rationale:
                "St. Paul's 'works of the law' meant ritual works (circumcision, etc.) — not all moral cooperation with grace. Read Romans 2:6-7 alongside.",
            },
          ],
          difficulty: 4,
          taunt: "Sola fide! Sola gratia!",
        },
        {
          claim:
            "Romans 9 settles it. God hardens whom He will. He elects whom He pleases. Free will is an illusion — accept divine sovereignty!",
          options: [
            {
              text: "We confess synergy: God's grace is sovereign and primary; our free response is real and necessary. 'Behold, I stand at the door and knock' (Rev 3:20) — He does not break it down.",
              correct: true,
              rationale:
                "The Orthodox doctrine of synergy, against both Pelagius (works alone) and Augustine's late-Calvin reading (grace alone, no cooperation).",
            },
            {
              text: "God determines everything — our choices are illusions.",
              correct: false,
              rationale:
                "Then God is the author of sin (which Reformed theology cannot consistently avoid). The whole pastoral pleading of Scripture ('choose ye this day') becomes mockery.",
            },
            {
              text: "We earn our salvation by free will alone.",
              correct: false,
              rationale:
                "Pelagian. Without grace we can do nothing (John 15:5). Free will is itself a gift of grace.",
            },
            {
              text: "Romans 9 means God arbitrarily picks individuals for eternal damnation.",
              correct: false,
              rationale:
                "Romans 9 is about NATIONS in salvation history (Jacob/Esau as types of Israel/Edom), not about individual reprobation, as the Fathers read it.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Where was your Church before Constantine? Hidden! Invisible! The true Church is invisible — known only to God — not your visible institution!",
          options: [
            {
              text: "The Church before Constantine was visible in every city — bishops, presbyters, Eucharists, persecutions. Ignatius, Polycarp, Justin, Irenaeus — all visible. Christ founded a visible Body (Eph 4:11-13).",
              correct: true,
              rationale:
                "Historical record: every pre-Nicene witness describes a visible hierarchical Church with sacraments. The 'invisible Church' is a Reformation invention.",
            },
            {
              text: "Yes, the true Church is invisible; institutions are corrupt.",
              correct: false,
              rationale:
                "Then Christ founded nothing definite, and 'where two or three are gathered' becomes everyone alone. The visible Church is His Body.",
            },
            {
              text: "The Church became visible only at the Reformation.",
              correct: false,
              rationale:
                "Historically absurd. There were bishops, councils, liturgies, and martyrs for 1500 years before Luther.",
            },
            {
              text: "Any group of Christians is the Church.",
              correct: false,
              rationale:
                "Then the Church has no marks, no boundaries, and no apostolic identity — and Christ founded only a vague affinity group.",
            },
          ],
          difficulty: 4,
        },
      ],
    },
    outro: [
      {
        speaker: "reformed",
        text:
          "OK. OK. I came in here pretty sure I'd be the one explaining things. I didn't know the early Church Fathers said... half of that. I'm not converting over a latte. But — I want to read 1 Clement this week. And the letters of Ignatius. Can we do this again?",
      },
      {
        speaker: "narrator",
        text:
          "She is already typing the titles into her phone, brow furrowed. The certainty she walked in with has not collapsed, but it has made room — a small, honest space where a question can grow.",
      },
      {
        speaker: "st-anthony",
        text:
          "She is honest, $you, and honesty is the soil the Church grows in. She will read what you gave her, and 1 Clement — written while apostles' disciples still lived — will not say what she expects. Some come slowly to the Church, fighting every step, and arrive more deeply rooted than those who came easily.",
      },
      {
        speaker: "you",
        text: "I wanted to press harder. I had three more answers ready.",
      },
      {
        speaker: "st-anthony",
        text:
          "And you were right to hold them. You do not have to win every point in one sitting; you have to keep the door open for the next. A soul is not argued into the Church in an afternoon — it is loved and reasoned toward it over years. You planted; God gives the growth.",
      },
      {
        speaker: "narrator",
        text:
          "You leave the coffee shop into the cool of late afternoon. Your phone buzzes again — a Discord ping this time. Alex Chen, your old college roommate: the philosophy major, the software engineer, the one who reads Nietzsche for fun. The atheist.",
      },
      {
        speaker: "atheist",
        text:
          "saw your post. Orthodox?? seriously?? religion, in 2026, after everything? Auschwitz. the pandemic. kids with cancer. you used to be the smart one. call tonight. defend yourself.",
      },
    ],
    reward: { xp: 1, healHp: true },
  },

  // ===================================================================
  // CHAPTER 10C — THE ATHEIST FRIEND
  // ===================================================================
  {
    id: "ch10c-atheist",
    number: 12,
    era: "The Present Day, that evening",
    location: "Late night, voice chat",
    title: "The Long Argument",
    background: "modern",
    intro: [
      {
        speaker: "narrator",
        text:
          "Two a.m. Your apartment, lit only by the glow of the monitor. Headphones on. The Discord call has been going for three hours and shows no sign of ending. Alex Chen — old college roommate, now a software engineer, genuinely brilliant, the kind of mind that took apart every comforting thing you believed at nineteen and handed you the pieces.",
      },
      {
        speaker: "st-anthony",
        text:
          "Look at how far you have come, $you. Once this man's questions would have left you stammering. You have stood in the council halls where the Church learned to think; you have seen the martyrs answer with their blood. The arguments that frightened you at nineteen are small things now. But do not grow proud — pride is the doubt's own doorway.",
      },
      {
        speaker: "narrator",
        text:
          "He has read Dawkins, Harris, Hitchens — and gone past them, into Nietzsche and Camus, the atheists who at least took the abyss seriously. He is not a dabbler with a meme. He is also not unkind. You have stayed up like this with him before, years ago, in a dorm room. The respect runs both ways and it is real.",
      },
      {
        speaker: "st-anthony",
        text:
          "Listen to me before he begins, $you. He keeps his sharpest wound for last and disguises it as an argument. In college his sister tried to take her own life. He prayed — actually prayed, the only time he ever has — and she lived. He thanks the medication and the doctors, not God. The grief is still raw under the philosophy. Whatever you say about suffering tonight, you are speaking to that.",
      },
      {
        speaker: "you",
        text: "Then he is not really asking me to win a debate.",
      },
      {
        speaker: "st-anthony",
        text:
          "No. He is asking whether the universe heard him that night. Hold that beneath every clever thing he says. The arguments are real and you must meet them — but the man behind them is bleeding. Do not answer the question and miss the person.",
      },
      {
        speaker: "atheist",
        text:
          "Look, I'm not trying to be a jerk about this. I genuinely don't get it. A good and all-powerful God would not allow the Holocaust. He could stop it. He didn't. So either He's not good, or He's not all-powerful, or He's not there. Pick one. That's not snark — that's just logic.",
      },
      {
        speaker: "st-anthony",
        text:
          "This is the deepest question of the age you live in, $you, and it has driven more souls from God than all the persecutions combined. Do not answer it with cleverness — he has heard every clever answer and they made him angrier. Answer it from your own life, and from the Cross. The Cross is not God's excuse for suffering. It is God climbing INTO it. That is the answer.",
      },
      {
        speaker: "you",
        text: "He'll have ten more questions ready behind that one. Science, the Crusades, the resurrection, hell. He always did.",
      },
      {
        speaker: "st-anthony",
        text:
          "Then answer them one by one, patiently, through the long hours of the night — but never lose the thread back to that prayer he prayed for his sister. Every argument tonight is really circling that one wound. Meet the arguments honestly; aim everything, in the end, at the wound. Now — he is waiting. Speak.",
      },
    ],
    boss: {
      id: "boss-atheist",
      name: "Alex Chen",
      title: "Skeptical Friend",
      tradition: "New Atheism",
      sprite: "atheist",
      maxHp: 380,
      intro:
        "Make a case. I'll listen. But don't give me Sunday school answers.",
      midline:
        "...you know, I haven't actually heard most of this. I thought all Christians were the same.",
      outro:
        "Look, I'm not converting tonight. But this is the longest conversation I've had about God where I didn't get angry. Maybe coffee next week?",
      victoryEpigraph: {
        text: "Lord, I believe; help thou mine unbelief.",
        source: "Mark 9:24",
      },
      attacks: [
        {
          claim:
            "The problem of evil. Auschwitz. Children with cancer. If God could prevent it and didn't, He's a monster. End of debate.",
          options: [
            {
              text:
                "God made a world in which real love is possible — and love requires real freedom, including the freedom to refuse. And He entered that suffering Himself. The Cross is the divine answer.",
              correct: true,
              rationale:
                "Free will defense + participatory theology. The Christian God is not aloof from suffering; He bore it.",
            },
            {
              text: "Evil is illusion.",
              correct: false,
              rationale: "Christian Science / Eastern absorption — not Orthodox.",
            },
            {
              text: "God is limited; He cannot prevent evil.",
              correct: false,
              rationale: "Process theology / open theism — not Orthodox.",
            },
            {
              text: "There is no problem of evil; it is just for our growth.",
              correct: false,
              rationale: "Too facile. The Cross takes evil seriously.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Science explains everything. We don't need God to explain the universe anymore.",
          options: [
            {
              text:
                "Science explains HOW the universe works. The question 'WHY is there something rather than nothing?' is metaphysical, not scientific.",
              correct: true,
              rationale: "The distinction of mechanism and meaning. Many great scientists are religious for this reason.",
            },
            {
              text: "Science contradicts religion.",
              correct: false,
              rationale: "Conflict thesis — discredited by historians (Numbers, Lindberg).",
            },
            {
              text: "Religion is just feelings.",
              correct: false,
              rationale: "Reductive. Religion makes truth claims.",
            },
            {
              text: "Science is wrong about everything.",
              correct: false,
              rationale: "False. Science is wonderfully reliable about what it can study.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "Christianity has caused so much harm. The Crusades. The Inquisition. Galileo. Why would I join an organization with that record?",
          options: [
            {
              text:
                "Christians are sinners. The Church is not a museum of saints but a hospital for sinners. The same Faith has produced the saints whose lives outweigh the failures.",
              correct: true,
              rationale: "The honest reply. Sins of Christians and the Faith itself are not equivalent.",
            },
            {
              text: "The Church has been perfect.",
              correct: false,
              rationale: "Not true.",
            },
            {
              text: "The Inquisition was justified.",
              correct: false,
              rationale: "It was not.",
            },
            {
              text: "Only the Eastern Church has been pure.",
              correct: false,
              rationale: "Eastern Christians have sinned too. The distinction is doctrinal, not moral.",
            },
          ],
          difficulty: 4,
        },
        {
          claim:
            "You believe a peasant rabbi rose from the dead. Even if I grant He existed, the resurrection is the least probable thing imaginable.",
          options: [
            {
              text:
                "1 Cor 15:3-8 — Paul cites a creedal formula naming over 500 eyewitnesses, dated within 5 years of the event. The Apostles died for what they had seen, not invented.",
              correct: true,
              rationale:
                "The historical case. People die for what they believe is true, not for what they know is false.",
            },
            {
              text: "It is purely faith without evidence.",
              correct: false,
              rationale: "Christianity has always pointed to historical evidence.",
            },
            {
              text: "The Apostles lied.",
              correct: false,
              rationale: "And were tortured to death for the lie? Unprecedented.",
            },
            {
              text: "The body was stolen.",
              correct: false,
              rationale: "By whom? The disciples scattered in fear. The Roman/Jewish authorities had every reason to produce the body and could not.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Here is the problem: if God is all-good and all-powerful, why cancer in children? Why earthquakes? The problem of evil refutes Him.",
          options: [
            {
              text: "Christianity does not deny suffering — it confronts it on the Cross. God did not stay distant from evil; He entered it, took it on, and overcame it through death. The answer is not a theory but a Person.",
              correct: true,
              rationale:
                "The Cross is the Christian answer to evil. Christ did not explain suffering; He bore it. The Resurrection is the promise that evil does not have the last word.",
            },
            {
              text: "All suffering is punishment for sin.",
              correct: false,
              rationale:
                "Christ explicitly rejected this in John 9:3 (the man born blind) and Luke 13 (the tower of Siloam). Suffering is not always desert.",
            },
            {
              text: "God allows evil because free will requires it.",
              correct: false,
              rationale:
                "Free-will theodicy is partial — it does not address natural evil (cancer, earthquakes). The Christological answer is deeper.",
            },
            {
              text: "Evil is an illusion; suffering is not real.",
              correct: false,
              rationale:
                "Buddhist / Christian Science answer. Christianity is brutally realistic: suffering is real, and is real ENEMY, and is conquered by the Risen Christ.",
            },
          ],
          difficulty: 5,
          taunt: "A child has died of cancer somewhere just now. Defend your God.",
        },
        {
          claim:
            "Hume settled miracles: it is always more probable that the witnesses lied or erred than that the laws of nature broke. So no miracle is ever credible.",
          options: [
            {
              text: "Hume's argument assumes what it must prove: that natural law NEVER breaks. The historical evidence for the Resurrection (multiple witnesses, willingness to die, transformation of skeptics) cannot be a priori dismissed by a circular axiom.",
              correct: true,
              rationale:
                "Hume's argument is question-begging. C. S. Lewis (Miracles), N. T. Wright (Resurrection of the Son of God), and many others have shown this in detail.",
            },
            {
              text: "Yes, Hume is right; no miracle is credible.",
              correct: false,
              rationale:
                "Then no testimony could ever overcome any 'natural law' belief — even when we have multiple independent witnesses who die for their account.",
            },
            {
              text: "We need miracles today to believe.",
              correct: false,
              rationale:
                "Christ said: 'Blessed are they that have not seen, and yet have believed' (John 20:29). The historical witness is sufficient.",
            },
            {
              text: "Miracles happen so often that they are normal.",
              correct: false,
              rationale:
                "Miracles are precisely the rare incursions of the Creator into His creation — not regular events.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "An infinite punishment for finite sin? Your God is a moral monster. Eternal hell for missing the right religion is grotesque.",
          options: [
            {
              text: "Hell is not God's vindictive will but the soul's own resistance to the divine love it cannot escape. The same fire warms or burns depending on whether one loves it (St. Isaac the Syrian).",
              correct: true,
              rationale:
                "St. Isaac of Nineveh: 'Those who are punished in Gehenna are scourged by the scourge of love... it is love's reproach that becomes a torment.'",
            },
            {
              text: "Yes, God actively burns sinners forever in retribution.",
              correct: false,
              rationale:
                "This is the cruder Western reading. Orthodoxy holds the more nuanced view: God is love; resistance to love is the torment.",
            },
            {
              text: "Hell does not exist; everyone is saved.",
              correct: false,
              rationale:
                "Universalism — explicitly rejected at Constantinople II (553). The Church hopes for all (1 Tim 2:4) but does not presume.",
            },
            {
              text: "Hell is annihilation; the wicked simply cease to be.",
              correct: false,
              rationale:
                "Conditionalism. The Church teaches conscious existence of the unrepentant — but their torment is their refusal of love, not divine cruelty.",
            },
          ],
          difficulty: 5,
        },
      ],
    },
    outro: [
      {
        speaker: "atheist",
        text:
          "...It's almost five. I should sleep. Look — I'm not converting tonight, don't get excited. But this is the longest I've ever talked about God without getting angry and hanging up. You didn't try to fix me. That's new.",
      },
      {
        speaker: "you",
        text: "I wasn't trying to fix you. I was trying to tell you the truth, and stay your friend while I did it.",
      },
      {
        speaker: "atheist",
        text:
          "Yeah. I noticed. ...Hey. When I prayed for my sister, that night — you really think Someone was in the room? ...Forget it. Coffee next week. I'll bring the questions. You bring the patience.",
      },
      {
        speaker: "narrator",
        text:
          "The call ends. The little green dot beside his name winks out. Outside your window the sky is going gray toward dawn. You realize you are praying for him before you have decided to.",
      },
      {
        speaker: "st-anthony",
        text:
          "One conversation. One soul, cracked open just wide enough for grace. You did not convert him, $you — that is not yours to do. You loved him and told him the truth, and you left the rest to God. This is exactly how the Kingdom grew in the catacombs, and how it grows still.",
      },
      {
        speaker: "you",
        text: "Three encounters in one day, and not one of them ended in surrender. It feels unfinished.",
      },
      {
        speaker: "st-anthony",
        text:
          "Faithfulness usually does, child. But there is one enemy you have not yet faced — the one who waits in the silence after everyone has gone home and the arguments are spent. He has your face. To the final battle.",
      },
    ],
    reward: { xp: 1, healHp: true },
  },

  // ===================================================================
  // CHAPTER 11 — THE FINAL BATTLE
  // ===================================================================
  {
    id: "ch11-doubt",
    number: 13,
    era: "Beyond Time",
    location: "Within yourself",
    title: "The Last Adversary",
    background: "void",
    intro: [
      {
        speaker: "narrator",
        text:
          "Three in the morning. You cannot sleep. You have given up trying. You sit on the bare floor of your room, in front of the little icon corner you built last month. The Theotokos looks at you out of the dark wood. The flame of the lampada has burned down to a bead of light, trembling.",
      },
      {
        speaker: "narrator",
        text:
          "Outside, the city sleeps. No knock at the door, no Discord ping, no missionary, no captain. Just the hum of the refrigerator and the weight of the hour. The book is closed on the nightstand. The journey, it seems, is over.",
      },
      {
        speaker: "narrator",
        text:
          "You have done everything they asked of you. You answered the centurion on the road to Rome. You stood against Arius, against Eutyches, against Constantine the Iconoclast risen from the grave. You refused to sign with the frightened bishops at Florence. You gave no name to the NKVD. You met the missionary, the seminarian, the atheist, and you held your ground with each.",
      },
      {
        speaker: "narrator",
        text:
          "And yet — here, alone, at three in the morning, the silence is louder than any of them. And you understand, with a cold certainty, that there was always one enemy left. The hardest one. Not a heretic. Not an emperor. Not even the tempter in Macarius's cave. Yourself.",
      },
      {
        speaker: "st-anthony",
        text:
          "Every soul that follows Christ comes, sooner or later, to this room. The desert fathers I taught called it acedia — the noonday demon, the listlessness that whispers that none of it was ever real. The mystics called it the dark night of the soul. Your own age calls it depression, or simply unbelief. It is not new, child. But it is yours now, and you must walk through it.",
      },
      {
        speaker: "you",
        text: "But I won every battle. I gave the right answers. Why does it feel like nothing — like I made all of it up to be less alone?",
      },
      {
        speaker: "st-anthony",
        text:
          "Because the deepest doubt does not come when you are losing. It comes after the victory, in the quiet, when the feeling drains away and only the bare choice remains. Saint Antony — my own self, the first of the desert — was assaulted by demons most fiercely not in his weakness but at the height of his prayer. This is the same battle. You are in good company.",
      },
      {
        speaker: "you",
        text: "Then tell me what to do. Give me the argument, the proof, the answer that ends it.",
      },
      {
        speaker: "st-anthony",
        text:
          "There is no argument that ends this one, child — that is precisely why it is last. I cannot fight it for you; no saint can. This battle is yours alone. But hear me: you do not enter it alone. You carry all of them with you — Ignatius in his chains, Macarius in his cave, Athanasius against the world, Cyril, John of Damascus, Mark who would not sign, the eighty thousand who died in the cellars. They prayed for the one who would come after them. They are praying for you NOW. Listen for them.",
      },
      {
        speaker: "narrator",
        text:
          "The lampada gutters. And in the corner of the room where the shadow always pools, the shadow gathers itself, leans forward — and speaks. It has your face. It speaks in your own voice. It knows your memories, because they are yours.",
      },
      {
        speaker: "doubt",
        text:
          "$you. There you are. I'm not a demon with horns — you're too clever for that. I'm just you, at three in the morning, with no one watching and nothing left to prove. I am every late-night question you've ever swallowed. I've been with you the whole way. And I know exactly where you are weak.",
      },
      {
        speaker: "you",
        text: "You sound exactly like me. How am I supposed to fight something that wears my own face and uses my own voice?",
      },
      {
        speaker: "st-anthony",
        text:
          "You do not fight it as you fought Arius or the iconoclast, child — with the right answer that defeats the wrong one. Some of what it says will even be TRUE: you are weak, you will fall again, you cannot prove all of it. The lie is not in the facts. The lie is in the conclusion it draws from them: that therefore you should stop. Refuse the conclusion, not the facts.",
      },
      {
        speaker: "doubt",
        text:
          "He's stalling. He knows I'm right. Ask yourself honestly — when did you last FEEL God? Not think about Him. Feel Him. The silence is the only honest thing in this room.",
      },
      {
        speaker: "st-anthony",
        text:
          "Do not argue with it on its own ground; it will always have one more question. Pray. The Jesus Prayer — Lord Jesus Christ, Son of God, have mercy on me, a sinner. Pray it even when the words feel hollow. Especially then. Now stand, $you. This is the last adversary.",
      },
    ],
    boss: {
      id: "boss-doubt",
      name: "The Doubt",
      title: "Your Own Shadow",
      tradition: "Internal",
      sprite: "doubt",
      maxHp: 600,
      intro:
        "What if all of this is wishful thinking? What if you converted out of loneliness?",
      midline:
        "You answer well. But the questions return when you are tired. I am patient.",
      outro:
        "I am not destroyed. I never am. But you have learned my name, and I cannot live unnamed in the same heart as Christ.",
      victoryEpigraph: {
        text:
          "Be ready always to give an answer to every man that asketh you a reason of the hope that is in you, with meekness and fear.",
        source: "1 Peter 3:15",
      },
      attacks: [
        {
          claim:
            "You only believe this because you wanted comfort. Everyone wants there to be meaning.",
          options: [
            {
              text:
                "Wanting something does not make it false. I have followed the evidence wherever it led — to martyrs, councils, manuscripts. The desire and the truth converge.",
              correct: true,
              rationale: "The genetic fallacy turned back. Wishful thinking is real but does not establish unreality.",
            },
            {
              text: "You are right; I made it up.",
              correct: false,
              rationale: "Doubt's strategy. Refuse.",
            },
            {
              text: "I don't really believe it; it just feels good.",
              correct: false,
              rationale: "Cynical retreat. Christianity stands or falls on history.",
            },
            {
              text: "Whatever; let's not talk about it.",
              correct: false,
              rationale: "Cowardice. Doubt feeds on avoidance.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Other religions have miracles too. Your evidence is no better than theirs.",
          options: [
            {
              text:
                "Christianity stakes its claim on a public historical event with eyewitness creedal formula within five years (1 Cor 15:3-8). The shape of the evidence is different.",
              correct: true,
              rationale: "The historical-falsifiable nature of the Resurrection claim.",
            },
            {
              text: "All religions are equally true.",
              correct: false,
              rationale: "They contradict each other.",
            },
            {
              text: "Other religions are silly.",
              correct: false,
              rationale: "Uncharitable and untrue.",
            },
            {
              text: "I don't care about other religions.",
              correct: false,
              rationale: "Indifference does not answer the question.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "If God is real, where is He when you suffer alone in your room at 3 AM?",
          options: [
            {
              text:
                "On the Cross. He is precisely WITH the one who suffers. The dark night of the soul is testified by every saint; Christ Himself cried 'why hast thou forsaken me?' (Mt 27:46).",
              correct: true,
              rationale:
                "The deepest answer: a God who suffers WITH us is not absent but present in the absence we feel.",
            },
            {
              text: "He is gone.",
              correct: false,
              rationale: "Despair. Mt 28:20.",
            },
            {
              text: "I deserve to suffer.",
              correct: false,
              rationale: "Distorted. Suffering is not always punishment.",
            },
            {
              text: "There is no answer.",
              correct: false,
              rationale: "There is — the Crucified God.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Even if it's true, you'll fail at it. You always fail. You'll backslide.",
          options: [
            {
              text:
                "Mary of Egypt sinned for seventeen years and became a saint of saints. The thief on the cross had one sentence. God is not done with me until He is.",
              correct: true,
              rationale:
                "The doctrine of repentance. The Christian life is fall and rise, not perfection.",
            },
            {
              text: "You are right; I will give up.",
              correct: false,
              rationale: "Despair — the deepest sin.",
            },
            {
              text: "I do not need to repent.",
              correct: false,
              rationale: "Pride — the second deepest sin.",
            },
            {
              text: "Some people are too broken to be saved.",
              correct: false,
              rationale: "Refuted by every saint who started broken.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "I will return tomorrow. And the day after. You cannot kill me.",
          options: [
            {
              text:
                "Then I will pray tomorrow. And the day after. Lord Jesus Christ, Son of God, have mercy on me, a sinner.",
              correct: true,
              rationale:
                "The Jesus Prayer is the answer to recurring doubt. Not arguing it away, but praying through it.",
            },
            {
              text: "I will fight you alone.",
              correct: false,
              rationale: "Pride. The saints fought with prayer, not alone strength.",
            },
            {
              text: "I will avoid you.",
              correct: false,
              rationale: "Avoidance is not victory.",
            },
            {
              text: "I will read more apologetics.",
              correct: false,
              rationale: "Books help, but prayer is the foundation.",
            },
          ],
          difficulty: 5,
          taunt: "You will never be rid of me!",
        },
        {
          claim:
            "When you stop FEELING God's presence — what then? You are just performing rituals to empty silence. Admit it: you feel nothing.",
          options: [
            {
              text: "Feeling is not faith. The saints' deepest growth came in dryness. The Liturgy is true whether I weep or not. I keep going.",
              correct: true,
              rationale:
                "St. John of the Cross: 'The dark night of the senses is the gateway to union.' Feeling is not the test of God's presence.",
            },
            {
              text: "If I do not feel God, He is not there.",
              correct: false,
              rationale:
                "Subjectivism — the test of presence is not emotion. Christ on the Cross cried 'why hast thou forsaken me?' yet was not forsaken.",
            },
            {
              text: "I will leave until I feel something.",
              correct: false,
              rationale:
                "The path through dryness is THROUGH it. Abandoning the Liturgy because of feeling is the very temptation.",
            },
            {
              text: "I will manufacture emotion by changing churches.",
              correct: false,
              rationale:
                "Religious shopping. The deeper need is faithful endurance, not novel stimuli.",
            },
          ],
          difficulty: 5,
        },
        {
          claim:
            "Hindus feel just as strongly about Krishna. Muslims about Allah. How do you KNOW yours is the true one and not just cultural?",
          options: [
            {
              text: "I do not know by feeling — I know by the historical Resurrection of Christ, attested by witnesses who died for it, and by the unbroken apostolic Church that has handed it on for 2000 years.",
              correct: true,
              rationale:
                "The Christian claim is historical, not just experiential: 'If Christ be not raised, your faith is vain' (1 Cor 15:14). The evidence is open to inquiry.",
            },
            {
              text: "All religions are roughly equivalent paths to God.",
              correct: false,
              rationale:
                "Religious indifferentism — denies Christ's unique claim: 'I am the way, the truth, and the life' (John 14:6). Not all paths lead home.",
            },
            {
              text: "We just believe what our culture believes.",
              correct: false,
              rationale:
                "Then there is no truth. But Christianity spread AGAINST its cultures (Roman, Greek, Persian) — its hold on hostile cultures argues against the relativist thesis.",
            },
            {
              text: "I cannot decide; all religions confuse me.",
              correct: false,
              rationale:
                "The temptation. Christ said: 'Seek and ye shall find' (Matt 7:7). Inquiry is permitted; permanent agnosticism is the doubt's victory.",
            },
          ],
          difficulty: 5,
          taunt: "Born in Tehran you would pray five times daily. Born in Mumbai you would wear orange. It is luck, not truth.",
        },
        {
          claim:
            "Mother Teresa felt nothing for fifty years. John of the Cross felt nothing. Maybe — just maybe — there is NOTHING to feel.",
          options: [
            {
              text: "Or — they kept feeding the dying, kept writing the Spiritual Canticle, kept loving when feeling failed. Their FRUITS prove the silence was not absence but communion at a depth feeling cannot reach.",
              correct: true,
              rationale:
                "St. John of the Cross's Dark Night and Mother Teresa's letters describe contemplative purification, not divine absence. The fruits of love do not lie.",
            },
            {
              text: "If saints felt nothing, God does not exist.",
              correct: false,
              rationale:
                "Then they should have stopped — but they did not. Their persistence in love is itself evidence against the void thesis.",
            },
            {
              text: "Mother Teresa was a fraud.",
              correct: false,
              rationale:
                "Her decades of self-sacrificial work in Calcutta are objective fact. Frauds do not give up everything for the poor.",
            },
            {
              text: "Saints feel God constantly; dryness disproves sanctity.",
              correct: false,
              rationale:
                "The Church Fathers (esp. the desert monastics) teach that the deepest sanctity is purified precisely THROUGH dryness — feeling-attachment must die.",
            },
          ],
          difficulty: 5,
        },
      ],
    },
    outro: [
      {
        speaker: "narrator",
        text:
          "The shadow folds in on itself. Smaller. Not gone — but named. Manageable. The icon of the Theotokos in your corner glows for an instant in the dawn.",
      },
      {
        speaker: "st-anthony",
        text:
          "$you. The journey is over. You are returned. You are not the same. The Lord has made you ready.",
      },
      {
        speaker: "st-anthony",
        text:
          "Be ready always to give an answer to every man that asketh you a reason of the hope that is in you, with meekness and fear. — 1 Peter 3:15.",
      },
      {
        speaker: "narrator",
        text:
          "Anthony bows. The light withdraws. The book on your nightstand is closed.",
      },
      {
        speaker: "narrator",
        text:
          "Your phone buzzes. A friend wants to know if you'd like to meet at the cathedral. The bells, in this neighborhood, you can faintly hear. The day is beginning.",
      },
      {
        speaker: "you",
        text: "Yes. I'm coming.",
      },
      {
        speaker: "narrator",
        text: "— END —",
      },
    ],
    reward: { xp: 2, healHp: true },
  },
];

// Assemble the full campaign in chronological order, weaving the expansion
// chapters between the original arc, then renumber for display. Progression is
// by array index, so order here IS the play order.
const ALL_SOURCES: Chapter[] = [
  ...BASE_CHAPTERS,
  ...EXPANSION_CHAPTERS,
  ...EXPANSION_CHAPTERS_2,
  ...EXPANSION_CHAPTERS_3,
  ...EXPANSION_CHAPTERS_4,
];

function byId(id: string): Chapter {
  const found = ALL_SOURCES.find((c) => c.id === id);
  if (!found) throw new Error(`chapter not found: ${id}`);
  return found;
}

const CHRONOLOGICAL_ORDER: string[] = [
  "ch1-antioch", //            AD 107
  "ch101-polycarp", //         AD 155
  "ch102-justin", //           AD 165
  "ch2-catacombs", //          AD 250
  "ch3-nicaea", //             AD 325
  "ch4-desert", //             AD 360
  "ch103-cappadocians", //     AD 381
  "ch104-chrysostom", //       AD 404
  "ch105-ephesus", //          AD 431
  "ch5-chalcedon", //          AD 451
  "ch201-constantinople-ii", // AD 553
  "ch106-maximus", //          AD 662
  "ch202-john-damascus", //    AD 730
  "ch6-icons", //              AD 787
  "ch107-cyril-methodius", //  AD 867
  "ch108-photios", //          AD 879
  "ch109-rus", //              AD 988
  "ch203-symeon", //           AD 1000
  "ch7-schism", //             AD 1054
  "ch301-fourth-crusade", //   AD 1204
  "ch302-sava-serbia", //      AD 1219
  "ch303-palamas", //          AD 1341–1351
  "ch8-florence", //           AD 1439
  "ch401-cosmas", //           AD 1779
  "ch402-seraphim", //         AD 1831
  "ch404-optina", //           AD 1878
  "ch9-soviets", //            AD 1937
  "ch403-silouan", //          AD 1938
  "ch10-modern", //            present
  "ch10b-reformed", //         present
  "ch10c-atheist", //          present
  "ch11-doubt", //             beyond time (finale)
];

export const CHAPTERS: Chapter[] = CHRONOLOGICAL_ORDER.map((id, i) => ({
  ...byId(id),
  number: i + 1,
}));

export function getChapter(index: number): Chapter | undefined {
  return CHAPTERS[index];
}

export const TOTAL_CHAPTERS = CHAPTERS.length;
