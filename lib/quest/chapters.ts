import type { Chapter } from "./types";

// Each chapter: setting + 2-6 narrative dialog lines + boss with 3-5 attacks +
// outro + reward. Speaker IDs match sprite ids in lib/quest/sprites.ts.
// "$you" is replaced at runtime with the hero's name.

export const CHAPTERS: Chapter[] = [
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
        text: "And then — dust. Olive trees. A Roman road. The smell of crushed thyme. The year is one hundred and seven.",
      },
      {
        speaker: "st-anthony",
        text: "Welcome, $you. You have been called.",
      },
      {
        speaker: "you",
        text: "Who are you?",
      },
      {
        speaker: "st-anthony",
        text: "Anthony, of Egypt. The Lord granted me a vision of you. The Church needs witnesses in every age — and the age you come from is starved of them.",
      },
      {
        speaker: "st-anthony",
        text: "We have not much time. You must learn quickly. There is a man up the road in chains — he goes to Rome to die. Speak with him.",
      },
      {
        speaker: "st-ignatius",
        text: "Stranger. I am Ignatius, bishop of Antioch. They take me to the beasts. I rejoice — for I shall be the wheat of God.",
      },
      {
        speaker: "st-ignatius",
        text: "But first, take this. Read my letter to the Smyrnaeans. The Eucharist is the flesh of our Saviour Jesus Christ. Remember this.",
      },
      {
        speaker: "narrator",
        text: "A Roman centurion approaches. His face is dark with hatred and confusion.",
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
        speaker: "st-ignatius",
        text:
          "Well spoken, $you. Take my letter as your shield. And remember: 'I am the wheat of God, ground by the teeth of beasts to be found the pure bread of Christ.'",
      },
      {
        speaker: "st-anthony",
        text: "Onward. Two hundred years pass in a breath. Take my hand.",
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
        text: "Darkness. The smell of clay and old bone. A torch sputters. Frescoes on the walls — a young shepherd carries a lamb, a woman cradles a child.",
      },
      {
        speaker: "st-anthony",
        text:
          "The Decian Persecution. The Emperor demands every citizen sacrifice to the gods or be killed. Many Christians have fled here, beneath the streets.",
      },
      {
        speaker: "st-anthony",
        text:
          "Look — there, on the wall. A woman with her child, painted before the Apostles' bones grew cold. The very first depiction of the Theotokos.",
      },
      {
        speaker: "you",
        text: "I have heard Protestants say making images of saints is idolatry.",
      },
      {
        speaker: "st-anthony",
        text:
          "Then they have not entered a catacomb. Image-making in the Christian community is as old as the community itself.",
      },
      {
        speaker: "narrator",
        text: "Footsteps. A man steps from the shadows in a fine toga. He is no friend.",
      },
      {
        speaker: "marcus",
        text:
          "Marcus Aurelius Verus. Roman citizen. I have come to debate, not to arrest. Show me your god, Christ-follower — show me you are no idolater.",
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
          "I came to mock and stay to think. You have not been like the others. Tell me — where can I find the woman in your fresco who feeds you all?",
      },
      {
        speaker: "st-anthony",
        text:
          "He may yet become a brother. The seed of the martyrs is the seed of the Church (Tertullian, c. 197). $you, you have earned an icon of the Theotokos. Carry her with you.",
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
          "A grand hall. Three hundred and eighteen bishops in council. Constantine seated at the head, attentive. Some bear scars from the persecutions — eyes put out, hands missing. The Edict of Milan is twelve years old. They remember the lions.",
      },
      {
        speaker: "st-anthony",
        text:
          "The First Ecumenical Council. The greatest crisis since the Apostles. A presbyter named Arius teaches that the Son is a creature — that there was a time when He was not.",
      },
      {
        speaker: "st-anthony",
        text:
          "He has set the empire on fire with his song: 'There was when He was not.' Sailors sing it at the docks. Bakers sing it at their ovens. The Church may yet be lost — not by the sword, but by a slogan.",
      },
      {
        speaker: "narrator",
        text:
          "A deacon — perhaps thirty years old, intense, dark-eyed — pushes through the throng to you. His robe is plain. His voice will outlast emperors.",
      },
      {
        speaker: "st-athanasius",
        text:
          "I am Athanasius, deacon of Alexandria. If we yield to Arius, the Gospel is undone — for if the Son is not God, He cannot save us. Only God can heal us. Only God can be worshipped.",
      },
      {
        speaker: "st-athanasius",
        text:
          "Hear what is at stake: if the Son is a creature, then we Christians worship a CREATURE — and we are idolaters. There is no middle road.",
      },
      {
        speaker: "narrator",
        text:
          "An old bishop with a scarred face turns to you. You recognize his name from the road: Nicholas of Myra. He bows slightly.",
      },
      {
        speaker: "narrator",
        text:
          "Arius rises to speak. He is tall, ascetic, charismatic — the kind of voice crowds follow. The hall falls silent.",
      },
      {
        speaker: "arius",
        text:
          "Beloved bishops! Let us reason. Surely the Son is begotten — and what is begotten must HAVE A BEGINNING. The Father alone is uncreated.",
      },
      {
        speaker: "st-anthony",
        text:
          "Stand, $you. The Council needs every voice. Answer the heresiarch — and the deposit of faith may yet be confessed.",
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
        speaker: "st-athanasius",
        text:
          "The Council has spoken: homoousios with the Father. Arius is condemned. May the Lord preserve this faith to the ages of ages!",
      },
      {
        speaker: "st-anthony",
        text:
          "You stood with Athanasius. He will stand alone, exiled five times, against the world — 'Athanasius contra mundum.' But the truth of Nicaea will endure.",
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
          "Heat. Sand. The wind hisses across endless dunes. The dust between your sandals is the dust of centuries. You have come, you realize, to the cradle of monasticism.",
      },
      {
        speaker: "narrator",
        text:
          "A cave mouth, and inside, a tall thin monk. He has the eyes of a man who has not been afraid of anything for a very long time.",
      },
      {
        speaker: "st-macarius",
        text:
          "I am Macarius. Welcome to Scetis. Here we wrestle not with men but with the powers of the air.",
      },
      {
        speaker: "st-anthony",
        text:
          "$you, listen. The cities have grown large with Christians who do not know themselves. The desert is the proving ground. To stand against heretics out there, you must conquer the heretic in here — your own passions.",
      },
      {
        speaker: "st-macarius",
        text:
          "The fathers came here in their thousands when the persecutions ended. Without lions, they sought another martyrdom — the slow one. Of the appetites. Of the tongue.",
      },
      {
        speaker: "st-macarius",
        text:
          "I will give you three weapons before he comes. The Jesus Prayer: Lord Jesus Christ, Son of God, have mercy on me. Fasting — to remind the body it is not god. Vigilance — for he is subtle.",
      },
      {
        speaker: "narrator",
        text:
          "Outside, a goat bleats and is suddenly silent. Macarius's face hardens. He turns to face the cave mouth.",
      },
      {
        speaker: "st-macarius",
        text: "He is here. Stand behind me, $you. But do not look away.",
      },
      {
        speaker: "narrator",
        text:
          "The light of the cave fails. Shadow pools at the entrance, gathering shape — a hooded figure with red eyes that do not blink.",
      },
      {
        speaker: "tempter",
        text:
          "$you. We have not met. But I have known your name since you were born. Let us speak of comforting things.",
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
        speaker: "st-macarius",
        text:
          "You have done well. The demons fear most a soul that knows itself sinful and prays anyway. Take this — a hundred-knot rope. Pray it daily.",
      },
      {
        speaker: "st-anthony",
        text:
          "The desert taught you what no book could. Now to Chalcedon — where Christ Himself is to be confessed.",
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
          "Chalcedon. Six hundred and thirty bishops gathered — the largest council yet. Empress Pulcheria has called it. The Robber Council of Ephesus, two years ago, beat a deacon to death on the floor. This time imperial guards line the walls.",
      },
      {
        speaker: "narrator",
        text:
          "The Tome of Leo of Rome has just been read aloud. The hall erupts: 'Peter has spoken through Leo! Cyril and Leo teach the same!'",
      },
      {
        speaker: "st-anthony",
        text:
          "$you. We are between two errors. One says: Christ is so divided He is two persons. The other says: He is so united His humanity vanishes. The truth is one Person, two natures — without confusion, without division.",
      },
      {
        speaker: "narrator",
        text:
          "A bishop with a long beard and weary eyes turns from the chair. This is Cyril of Alexandria — or his memory; he died seven years ago. The Spirit makes him present.",
      },
      {
        speaker: "st-cyril",
        text:
          "I am Cyril. Twenty years ago I deposed Nestorius for dividing Christ. Now a different error rises — Eutyches teaches that Christ has only one nature, the human swallowed by the divine like a drop in the ocean.",
      },
      {
        speaker: "st-cyril",
        text:
          "I once wrote — incautiously — of 'one nature of the Word incarnate.' He uses my words to break the faith. Help me clarify what I meant, $you.",
      },
      {
        speaker: "st-anthony",
        text:
          "If Eutyches is right, Christ's humanity is illusory — and 'what is not assumed is not healed' (St. Gregory the Theologian). The very ground of our salvation is at stake.",
      },
      {
        speaker: "narrator",
        text:
          "A robed archimandrite is brought forward. His face is composed, his bearing certain. He has been a monk in Constantinople for seventy years. He is not a fool.",
      },
      {
        speaker: "eutyches",
        text:
          "Before the union, two natures. AFTER the union — one. The lesser is consumed by the greater. Why is this so hard?",
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
        speaker: "st-cyril",
        text:
          "The Tome of Leo + my own letters + the Definition — the orthodox confession is sealed. May it endure!",
      },
      {
        speaker: "st-anthony",
        text:
          "The Tome of Leo is yours. It will steady you when the iconoclasts come — they too will appeal to 'no images of the divine.'",
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
          "Hagia Sophia rises around you, vast and golden — and DEFACED. Where mosaics of Christ Pantocrator and the Theotokos once gazed down, plaster covers raw stone. Sixty years of iconoclast emperors have left their mark.",
      },
      {
        speaker: "st-anthony",
        text:
          "The Eastern Roman Empire has been at war with itself over PAINT. Constantine V the Iconoclast burned monasteries and tortured monks. He died nineteen years ago — but his spirit has come back to test you.",
      },
      {
        speaker: "narrator",
        text:
          "Empress Irene presides on a small wooden chair — she has summoned the Seventh Ecumenical Council to restore the icons. Three hundred and fifty bishops fill the nave.",
      },
      {
        speaker: "narrator",
        text:
          "A monk steps from the column shadow. He wears the habit of Mar Sabba. His name has carried across the empire from the lands of the Caliph.",
      },
      {
        speaker: "st-john-damascus",
        text:
          "I am John, called of Damascus. From beneath Muslim rule — where my hand was once cut off and restored by the Theotokos — I wrote three treatises defending the icons. I will be with you.",
      },
      {
        speaker: "st-john-damascus",
        text:
          "Hear this — the deepest answer: 'I do not paint an invisible Godhead, but the flesh of God which was seen.' The Incarnation IS the dogmatic foundation of the icon.",
      },
      {
        speaker: "st-anthony",
        text:
          "If God truly became MATTER, then matter can bear His image. Iconoclasm is fundamentally a denial of the Incarnation. Win this and the senses themselves are baptized.",
      },
      {
        speaker: "narrator",
        text:
          "The air grows cold. A figure in imperial purple materializes at the altar end, crowned, eyes hard. He died nineteen years ago — but his teaching has not.",
      },
      {
        speaker: "iconoclast",
        text:
          "I am Constantine, called the Fifth. I have smashed your idols across the Empire. The God of Israel forbids images. Why do you still cling to them?",
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
        speaker: "st-john-damascus",
        text:
          "The icons return to the walls. Every First Sunday of Lent forever, the Church will sing of this triumph — the Triumph of Orthodoxy.",
      },
      {
        speaker: "st-anthony",
        text:
          "Now west. Three centuries fall away. A schism approaches — and it will be your hardest to face, for it severs the Church from herself.",
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
          "July, 1054. The Great City. Two centuries since Photius confronted Rome over the same addition; nothing has been resolved. Pope Leo IX is dying in Italy, but his legates have not heard the news.",
      },
      {
        speaker: "st-anthony",
        text:
          "The Christian world will not see itself whole again in this age. Today is the day it tears. You are a witness — and a defender. Hold the Symbol unaltered.",
      },
      {
        speaker: "narrator",
        text:
          "The patriarchate of Constantinople under Michael Cerularius is at uneasy peace with Rome. Then a Roman legate strides into the Liturgy itself, with a parchment.",
      },
      {
        speaker: "narrator",
        text:
          "Cardinal Humbert lays the parchment on the altar of Hagia Sophia: an excommunication of the Patriarch. He turns and leaves, shouting in Latin: 'God see and judge!' The Greek deacons stand in shock. One picks it up. Reads it. Falls to his knees.",
      },
      {
        speaker: "st-anthony",
        text:
          "The breach has been forming for centuries. The trigger: the Latin addition to the Symbol of Faith — 'and the Son' — Filioque. The Pope claims authority to add to what the Councils forbade adding to.",
      },
      {
        speaker: "st-anthony",
        text:
          "But there are other quarrels: unleavened bread, married priests, the very nature of Peter's primacy. The Roman court has hardened from primacy of honor into supremacy of jurisdiction.",
      },
      {
        speaker: "narrator",
        text:
          "Humbert wheels at the door and sees you — a stranger in foreign garb, plainly Western yet standing among the Greeks. His eyes narrow.",
      },
      {
        speaker: "humbert",
        text:
          "You! Greek! Defend your heretical refusal of the Filioque! The Spirit proceeds from the Father AND the Son — every wise theologian knows it!",
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
        speaker: "st-mark-ephesus",
        text:
          "I will see this same dispute again, four centuries hence, at Florence. The truth does not change. Hold firm.",
      },
      {
        speaker: "st-anthony",
        text:
          "The schism deepens. To Florence — where one bishop will stand alone for all of us.",
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
          "Florence, June 1439. The Byzantine Empire has hours to live; the Sultan's armies are at the walls of Constantinople. The Emperor John VIII has come west — pleading. The Pope has him over a barrel: sign for union, or die.",
      },
      {
        speaker: "st-anthony",
        text:
          "$you. Truth is purchased here for ships and soldiers. The Emperor will pay it. Most of the bishops will pay it. One man will not. Watch him.",
      },
      {
        speaker: "narrator",
        text:
          "The Greek bishops have signed, one by one, under pressure — bishops denied food, bishops threatened with loss of their sees. The Filioque accepted. Purgatory accepted. Azymes accepted. Papal supremacy accepted.",
      },
      {
        speaker: "narrator",
        text:
          "Only one bishop refuses. He is forty-six years old, thin, hollow-eyed from fasting. The Pope sent for him last night and offered him a cardinal's hat. He returned the offer untouched.",
      },
      {
        speaker: "st-mark-ephesus",
        text:
          "I am Mark, of Ephesus. I have read every line of every Father on the Filioque. I will not sign. May God preserve me. May He preserve the Faith — though every other bishop in this hall has fled.",
      },
      {
        speaker: "st-mark-ephesus",
        text:
          "$you, listen well. When this Council ends and we sail home, the people of Constantinople will see our signatures and TEAR THEM. The union will be void. But here, today, I must speak it — for them.",
      },
      {
        speaker: "st-anthony",
        text:
          "Stand with him. The empires fall; the faith does not. 'Better the loss of all, than to deny one syllable of the holy doctrine.'",
      },
      {
        speaker: "narrator",
        text:
          "The Pope of Rome enters in red. Eugene IV — tall, intelligent, weary. The papacy is recovering from the conciliarist crisis. He must have THIS union to consolidate his throne. He has read the file on Mark.",
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
        speaker: "st-mark-ephesus",
        text:
          "Today I have stood alone, but with the company of the Fathers. The signature of the others will not save Constantinople — but my refusal may save the Faith.",
      },
      {
        speaker: "st-anthony",
        text:
          "Now the bleakest century. To Moscow, 1937. The Soviets. The Catacomb. The blood that endures.",
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
          "A man in gray uniform sits across the table, calm, almost kind. He has a wife and two daughters. He believes — sincerely — that he is building paradise on earth. He has signed three hundred and seven execution orders this month.",
      },
      {
        speaker: "st-anthony",
        text:
          "In this year alone, eighty thousand Russian Orthodox will be executed. Bishops shot in cellars. Priests buried alive. Many of them you have walked among — Patriarch Tikhon, Hilarion of Troitsky, the Royal Family, Mother Maria of Paris.",
      },
      {
        speaker: "st-anthony",
        text:
          "But also — Fr. Arseny in the Camp of Death. Mother Matrona praying in her hiding-place. Sergei Bulgakov writing theology in exile. The Church does not die when its bishops are killed; it goes underground and grows.",
      },
      {
        speaker: "st-anthony",
        text:
          "You will not survive this chapter with words alone. You must learn that some questions are not answered with argument but with blood. And yet — you must speak the truth as long as you can.",
      },
      {
        speaker: "st-anthony",
        text:
          "The Captain wants you to denounce a priest, a friend, a name. Anything that proves cooperation. Anything that 'just gets you home.' Do not give it.",
      },
      {
        speaker: "narrator",
        text:
          "The door opens behind you. Two guards take their positions. Captain Pavlov gestures to the chair across from him.",
      },
      {
        speaker: "nkvd",
        text:
          "Sit down, comrade. I am Captain Pavlov. You have been arrested for anti-revolutionary religious activity. Let us have a calm conversation. Confess, and you live.",
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
        speaker: "narrator",
        text:
          "You are led from the cell. The light behind you closes. In the truck, in the labor camp, in the snow — you remember the verses you spoke and you do not unsay them.",
      },
      {
        speaker: "st-anthony",
        text:
          "Eighty thousand confessors of your faith died in this year of grace. You walked among them. Now — back to your own time. The hardest chapter of all.",
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
          "You wake. Light through cheap curtains. Your phone, your coffee maker. The book is on your nightstand, where you left it. But everything is DIFFERENT now.",
      },
      {
        speaker: "narrator",
        text:
          "You can still hear St. Ignatius in chains, still smell the desert under Macarius's feet, still see Mark of Ephesus refusing to sign. They walk with you now. The 'cloud of witnesses' is no longer a Sunday-school phrase.",
      },
      {
        speaker: "st-anthony",
        text:
          "You have walked the whole path — from the Apostolic Age through the Councils, through the dark night of the desert, through Schism and Council, through the Gulag. The Church survived all of it.",
      },
      {
        speaker: "st-anthony",
        text:
          "Now comes the test you came for: defending the faith in the AGE YOU LIVE IN. The persecutions are less bloody but more subtle — the air itself is unbelief. Three encounters await you today. Three voices speaking what your neighbors believe.",
      },
      {
        speaker: "st-anthony",
        text:
          "Be ready always to give an account for the hope that is in you — but with meekness and reverence (1 Peter 3:15). The world does not need debaters; it needs SAINTS who can answer.",
      },
      {
        speaker: "narrator",
        text:
          "There is a knock at the door. Through the peephole: two young men in white shirts and ties, holding small books.",
      },
      {
        speaker: "lds",
        text:
          "Good morning! I'm Elder Williams. May we share with you a message about Jesus Christ and the restoration of His true Church?",
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
        speaker: "st-anthony",
        text:
          "He left with a question in his mind. That is more than many missionaries leave with. You spoke well, $you.",
      },
      {
        speaker: "narrator",
        text:
          "Your phone buzzes. A friend wants coffee. She brings someone — a divinity student. The next encounter has begun.",
      },
      {
        speaker: "reformed",
        text:
          "Wait, you're going Orthodox? That's the church with all the icons and the smells, right? Don't you know sola scriptura?",
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
          "Coffee mugs. Hardwood tables. The smell of espresso and old book pages. A young woman with cropped hair and intelligent eyes sits across from you. A copy of Calvin's Institutes on the chair beside her, two highlighters tucked in.",
      },
      {
        speaker: "narrator",
        text:
          "Sarah Kelley. PCA seminarian. She has been a Christian her whole life — devout, serious, prayerful. She lost a sister to cancer at sixteen and prayed her way through it. She is not the enemy.",
      },
      {
        speaker: "st-anthony",
        text:
          "$you. Be GENTLE. She loves Christ. Her categories differ — sola scriptura, sola fide, sola gratia — but the heart is open. Listen first; correct without crushing.",
      },
      {
        speaker: "st-anthony",
        text:
          "The danger in this conversation is not losing the argument. It is winning it and losing the person. Speak the truth in love (Eph 4:15).",
      },
      {
        speaker: "reformed",
        text:
          "Look, I respect the Eastern tradition, but the Reformation recovered the Gospel. We are saved by GRACE THROUGH FAITH — not by sacraments, not by veneration of saints. Scripture alone.",
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
        speaker: "st-anthony",
        text:
          "She is honest. She will read what you suggested. Some come slowly to the Church and arrive more deeply than those who came easily.",
      },
      {
        speaker: "narrator",
        text:
          "You leave the coffee shop. Your phone buzzes again. A Discord ping. Your old roommate from college, Alex, the philosophy major, the atheist.",
      },
      {
        speaker: "atheist",
        text:
          "Saw your post. Orthodox? Seriously? Religion in 2026? Auschwitz. The pandemic. The problem of evil. Defend yourself.",
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
          "Two a.m. Your apartment. Headphones on. The Discord call has been going for three hours. Alex Chen — old college friend, software engineer, brilliant. His dad was Catholic; his mom was Buddhist; he is neither.",
      },
      {
        speaker: "narrator",
        text:
          "He has read Dawkins, Harris, Hitchens, and beyond — also Nietzsche, also Camus. He is not a dabbler. He is also not unkind. The respect is real, in both directions.",
      },
      {
        speaker: "st-anthony",
        text:
          "He has the most painful question last on his list: his sister attempted suicide in college. He prayed for her. She survived. He thanks medication, not God. The wound is fresh.",
      },
      {
        speaker: "atheist",
        text:
          "I'm not trying to be a jerk. I genuinely don't get it. A good and all-powerful God would not allow the Holocaust. So either He's not good or He's not all-powerful.",
      },
      {
        speaker: "st-anthony",
        text:
          "This is the deepest question of the modern world. Do not answer it with cleverness. Answer it from your own life — and from the Cross. The Cross IS the answer.",
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
          "Coffee next week. I'll bring the questions. You bring the patience.",
      },
      {
        speaker: "st-anthony",
        text:
          "One conversation. One soul. This is the kingdom growing. And now — one final battle remains.",
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
          "Three in the morning. You cannot sleep. You sit on the floor of your room, in front of your icon corner. The Theotokos looks at you. The lampada burns low.",
      },
      {
        speaker: "narrator",
        text:
          "You have done everything they asked. You answered the centurion. You stood against Arius, Eutyches, Constantine the Iconoclast. You did not sign with the Greek bishops at Florence. You did not denounce a friend to the NKVD.",
      },
      {
        speaker: "narrator",
        text:
          "And yet — here, alone, at three a.m., the silence is loud. You realize you have one enemy left. The hardest one. Not a heretic. Not an emperor. Not a tempter. Yourself.",
      },
      {
        speaker: "st-anthony",
        text:
          "Every soul that follows Christ comes to this room. The desert fathers called it acedia. The mystics called it the dark night. Modernity calls it depression and unbelief. It is not new. But it is yours now.",
      },
      {
        speaker: "st-anthony",
        text:
          "I cannot help you here. This battle is yours alone. But know — you carry all the saints with you. They prayed for the one who would come. They are praying NOW. Macarius, Ignatius, Athanasius, Cyril, John Damascene, Mark, the New Martyrs. Listen.",
      },
      {
        speaker: "narrator",
        text:
          "And in the corner of the room, where the shadow always pools, the shadow speaks. And it has your face. It speaks with your voice. It uses your memories.",
      },
      {
        speaker: "doubt",
        text:
          "$you. I am all the doubts you've ever had. I am every late-night question. I have watched you these past weeks. I know exactly where you are weak.",
      },
      {
        speaker: "st-anthony",
        text:
          "Pray the Jesus Prayer. Lord Jesus Christ, Son of God, have mercy on me. Even — especially — when you do not feel it.",
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

export function getChapter(index: number): Chapter | undefined {
  return CHAPTERS[index];
}

export const TOTAL_CHAPTERS = CHAPTERS.length;
