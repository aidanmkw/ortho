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
      maxHp: 80,
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
      maxHp: 90,
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
          "A grand hall. Three hundred and eighteen bishops in council. Constantine seated at the head, attentive. Some bear scars from the persecutions — eyes put out, hands missing.",
      },
      {
        speaker: "st-anthony",
        text:
          "The First Ecumenical Council. The greatest crisis since the Apostles. A presbyter named Arius teaches that the Son is a creature — that there was a time when He was not.",
      },
      {
        speaker: "st-athanasius",
        text:
          "I am Athanasius, deacon of Alexandria. If we yield to Arius, the Gospel is undone — for if the Son is not God, He cannot save us.",
      },
      {
        speaker: "narrator",
        text: "Arius rises to speak. The hall falls silent.",
      },
      {
        speaker: "arius",
        text:
          "Beloved bishops! Let us reason. Surely the Son is begotten — and what is begotten must HAVE A BEGINNING. The Father alone is uncreated.",
      },
    ],
    boss: {
      id: "boss-arius",
      name: "Arius",
      title: "Presbyter of Alexandria",
      tradition: "Arian Heresy",
      sprite: "arius",
      maxHp: 110,
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
        text: "Heat. Sand. The wind hisses across endless dunes. A cave mouth, and inside, a tall thin monk.",
      },
      {
        speaker: "st-macarius",
        text:
          "I am Macarius. Welcome to Scetis. Here we wrestle not with men but with the powers of the air.",
      },
      {
        speaker: "st-anthony",
        text:
          "The desert is the proving ground. To stand against heretics out there, you must conquer the heretic in here — your own passions.",
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
      maxHp: 130,
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
          "Chalcedon. Six hundred and thirty bishops gathered. The Tome of Leo of Rome has just been read aloud. The hall erupts: 'Peter has spoken through Leo!'",
      },
      {
        speaker: "st-cyril",
        text:
          "I am Cyril of Alexandria. Twenty years ago I deposed Nestorius for dividing Christ. Now a different error rises — Eutyches teaches that Christ has only one nature, the human swallowed by the divine.",
      },
      {
        speaker: "st-anthony",
        text:
          "If Eutyches is right, Christ's humanity is illusory — and what is not assumed is not healed (Gregory the Theologian).",
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
      maxHp: 120,
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
          "Hagia Sophia rises around you, vast and golden, all its mosaics destroyed by the iconoclasts. Empress Irene has gathered the Seventh Council to restore the icons.",
      },
      {
        speaker: "st-john-damascus",
        text:
          "I am John, called of Damascus. From beneath Muslim rule I wrote three treatises defending the icons. I will be with you.",
      },
      {
        speaker: "st-anthony",
        text:
          "If God truly became MATTER, then matter can bear His image. Iconoclasm is fundamentally a denial of the Incarnation.",
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
      maxHp: 130,
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
          "July, 1054. The patriarchate of Constantinople under Michael Cerularius is at uneasy peace with Rome. Then a Roman legate strides into the Liturgy itself, with a parchment.",
      },
      {
        speaker: "narrator",
        text:
          "Cardinal Humbert lays the parchment on the altar of Hagia Sophia: an excommunication of the Patriarch. He turns and leaves, shouting in Latin: 'God see and judge!'",
      },
      {
        speaker: "st-anthony",
        text:
          "The breach has been forming for centuries. The trigger: the Latin addition to the Symbol of Faith — 'and the Son' — Filioque. The Pope claims authority to add to what the Councils forbade adding to.",
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
      maxHp: 140,
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
          "Florence, June 1439. The Byzantine Empire has hours to live; the Sultan's armies are at the walls. The Emperor begs union with Rome to save what remains.",
      },
      {
        speaker: "narrator",
        text:
          "The Greek bishops have signed, one by one, under pressure. The Filioque accepted. Purgatory accepted. Azymes accepted. Papal supremacy accepted. Only one bishop refuses.",
      },
      {
        speaker: "st-mark-ephesus",
        text:
          "I am Mark, of Ephesus. I have read every line of every Father on the Filioque. I will not sign. May God preserve me.",
      },
      {
        speaker: "pope-eugene",
        text:
          "Bring me the Ephesian. I will reason with him personally. Sign, Mark. The Eastern Empire dies tomorrow without our help.",
      },
    ],
    boss: {
      id: "boss-eugene",
      name: "Pope Eugene IV",
      title: "Roman Pontiff",
      tradition: "Latin (Florence)",
      sprite: "pope-eugene",
      maxHp: 150,
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
          "A bare concrete room. A single bulb. The smell of disinfectant and fear. A man in gray uniform sits across the table, calm, almost kind.",
      },
      {
        speaker: "st-anthony",
        text:
          "In this year alone, eighty thousand Russian Orthodox will be executed. Many of them you have walked among — Tikhon, Hilarion of Troitsky, the Royal Family, Mother Maria.",
      },
      {
        speaker: "st-anthony",
        text:
          "You will not survive this chapter with words alone. You must learn that some questions are not answered with argument but with blood. And yet — you must speak the truth as long as you can.",
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
      maxHp: 160,
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
          "You wake. Light through cheap curtains. Your phone, your coffee maker. The book is on your nightstand, where you left it. But everything is different.",
      },
      {
        speaker: "st-anthony",
        text:
          "You have walked the whole path. Now comes the test you came for: defending the faith in the age you live in. Three encounters. Be ready always — 1 Peter 3:15.",
      },
      {
        speaker: "narrator",
        text: "There is a knock at the door.",
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
      maxHp: 100,
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
        text: "Coffee mugs. Hardwood tables. A copy of Calvin's Institutes on the chair beside her.",
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
      maxHp: 120,
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
        speaker: "atheist",
        text:
          "I'm not trying to be a jerk. I genuinely don't get it. A good and all-powerful God would not allow the Holocaust. So either He's not good or He's not all-powerful.",
      },
      {
        speaker: "st-anthony",
        text:
          "This is the deepest question. Do not answer it with cleverness. Answer it from your own life.",
      },
    ],
    boss: {
      id: "boss-atheist",
      name: "Alex Chen",
      title: "Skeptical Friend",
      tradition: "New Atheism",
      sprite: "atheist",
      maxHp: 140,
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
          "Three in the morning. You cannot sleep. You sit on the floor of your room, in front of your icon corner. The Theotokos looks at you.",
      },
      {
        speaker: "narrator",
        text:
          "Then the shadow appears, and it has your face. It speaks with your voice. It uses your memories.",
      },
      {
        speaker: "doubt",
        text:
          "$you. I am all the doubts you've ever had. I am every late-night question. I have watched you these past weeks. I know exactly where you are weak.",
      },
      {
        speaker: "st-anthony",
        text:
          "I cannot help you here. This battle is yours alone. But know — you carry all the saints with you. They prayed for the one who would come.",
      },
    ],
    boss: {
      id: "boss-doubt",
      name: "The Doubt",
      title: "Your Own Shadow",
      tradition: "Internal",
      sprite: "doubt",
      maxHp: 200,
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
