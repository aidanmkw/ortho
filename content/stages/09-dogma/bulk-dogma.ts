import type { Topic } from "@/lib/types";

export const monarchyFather: Topic = {
  id: "monarchy-father",
  title: "The Monarchy of the Father",
  summary: "In Cappadocian-Orthodox Triadology, the Father is the single arche (principle, source) of the divinity. The Son is eternally begotten of the Father; the Spirit eternally proceeds from the Father. The unity of the Trinity is grounded in this monarchy, not in an impersonal essence.",
  learningObjectives: ["Cite Gregory the Theologian on the monarchy.", "Connect to the Filioque dispute."],
  primarySources: ["Gregory the Theologian, Oration 31.14"],
  items: [
    {
      id: "dog-mon-001",
      kind: "identify-source",
      difficulty: 4,
      tags: ["monarchy", "father"],
      prompt: "Identify: 'To us there is one God, for the Godhead is one, and all that proceeds from Him is referred to one — though we believe in three Persons.'",
      choices: [
        { id: "a", text: "Basil, On the Holy Spirit" },
        { id: "b", text: "Gregory the Theologian, Oration 31.14", rationale: "Correct. From the Fifth Theological Oration." },
        { id: "c", text: "John of Damascus, Exact Exposition I.8" },
        { id: "d", text: "Athanasius, Letters to Serapion" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "St. Gregory the Theologian, Oration 31 (Fifth Theological Oration) §14" }],
    },
  ],
};

export const hellAsLove: Topic = {
  id: "hell-as-love",
  title: "Hell as the Experience of Divine Love",
  summary: "An Orthodox patristic reading (Isaac the Syrian, modern theologians): heaven and hell are the same divine love experienced differently — joy by those who love God, torment by those who refuse Him.",
  learningObjectives: ["State Isaac of Syria's teaching.", "Note Romanides's formulation."],
  primarySources: ["Isaac of Nineveh, Ascetical Homilies 28", "Romanides, Patristic Theology"],
  items: [
    {
      id: "dog-hell-001",
      kind: "identify-source",
      difficulty: 4,
      tags: ["isaac-syrian", "hell"],
      prompt: "Identify: 'Those who are punished in Gehenna are scourged by the scourge of love. The power of love works in two ways: it torments sinners, even as happens here when a friend suffers from a friend; but it becomes a source of joy in those who have observed its duties.'",
      choices: [
        { id: "a", text: "Symeon the New Theologian, Hymns" },
        { id: "b", text: "Isaac of Nineveh (the Syrian), Ascetical Homilies 28", rationale: "Correct. Quoted by Met. Hierotheos Vlachos and others." },
        { id: "c", text: "Maximus the Confessor, Ambigua 6" },
        { id: "d", text: "Gregory of Nyssa, On the Soul and Resurrection" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "St. Isaac of Nineveh (the Syrian), Ascetical Homilies 28" }],
    },
  ],
};

export const synergy: Topic = {
  id: "synergy",
  title: "Synergy",
  summary: "The Orthodox doctrine that salvation is the co-working (synergeia) of divine grace and human freedom. Distinct from both Pelagianism (we can save ourselves) and monergism (God saves the elect irresistibly alone).",
  learningObjectives: ["Quote 1 Cor 3:9.", "Cite John Cassian's Conferences XIII."],
  primarySources: ["1 Corinthians 3:9", "Philippians 2:12-13", "John Cassian, Conferences XIII"],
  items: [
    {
      id: "dog-syn-001",
      kind: "identify-source",
      difficulty: 3,
      tags: ["synergy"],
      prompt: "Identify: 'For we are God's fellow workers; ye are God's tillage, ye are God's building.'",
      choices: [
        { id: "a", text: "Ephesians 2:10" },
        { id: "b", text: "1 Corinthians 3:9", rationale: "Correct. The locus classicus of synergeia." },
        { id: "c", text: "2 Corinthians 6:1" },
        { id: "d", text: "Romans 8:28" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "1 Corinthians 3:9 (synergoi)" }],
    },
  ],
};

export const apophaticism: Topic = {
  id: "apophaticism",
  title: "Apophatic Theology",
  summary: "The Orthodox method of speaking of God by negation — what God is NOT — to preserve His transcendence beyond all concepts. Cataphatic and apophatic theology are complementary, not opposed.",
  learningObjectives: ["Cite Dionysius the Areopagite.", "State the complementarity of apophatic and cataphatic."],
  primarySources: ["Dionysius the Areopagite, Mystical Theology", "Lossky, Mystical Theology of the Eastern Church"],
  items: [
    {
      id: "dog-apo-001",
      kind: "qa",
      difficulty: 4,
      tags: ["apophatic", "dionysius"],
      prompt: "What is apophatic theology, and what is its purpose?",
      expectedAnswer: "Apophatic theology speaks of God by negation — He is not finite, not visible, not circumscribed, not subject to passion, not knowable in His essence. Its purpose is to preserve God's absolute transcendence beyond any creaturely category. It is complementary to cataphatic (affirmative) theology, which speaks positively of God's revealed names (good, wise, loving). Dionysius the Areopagite's Mystical Theology is the classical Eastern systematization. Lossky: apophatic theology is the very atmosphere of patristic thought; it guards the Mystery against rationalist closure.",
      citations: [
        { source: "St. Dionysius the Areopagite, Mystical Theology" },
        { source: "Vladimir Lossky, The Mystical Theology of the Eastern Church, ch. 2" },
      ],
    },
  ],
};

export const passions: Topic = {
  id: "passions",
  title: "The Passions and the Virtues",
  summary: "Orthodox ascetic anthropology: the 'passions' (pathē) are disordered movements of the soul that distort the image of God. The virtues are the healing of the passions in synergy with grace. The Eight Logismoi (gluttony, lust, avarice, anger, dejection, despondency/acedia, vainglory, pride) — later reduced to Seven by Gregory the Great.",
  learningObjectives: ["List Evagrius's eight thoughts.", "Cite the Philokalia."],
  primarySources: ["Evagrius Ponticus, Praktikos 6", "Philokalia"],
  items: [
    {
      id: "dog-pas-001",
      kind: "qa",
      difficulty: 4,
      tags: ["passions", "evagrius"],
      prompt: "What are the Eight Logismoi (thoughts) of Evagrius Ponticus?",
      expectedAnswer: "(1) Gluttony, (2) lust, (3) avarice/love of money, (4) dejection, (5) anger, (6) acedia (despondency/listlessness), (7) vainglory, (8) pride. Later in the West, Gregory the Great combined acedia with dejection and added envy, producing the seven deadly sins. The Eastern Eight, with acedia distinct, remain foundational in Eastern ascetic literature.",
      citations: [
        { source: "Evagrius Ponticus, Praktikos 6" },
        { source: "John Cassian, Institutes (transmitting Evagrius to the Latin West)" },
      ],
    },
  ],
};

export const sin: Topic = {
  id: "hamartiology",
  title: "Hamartiology — Sin as Sickness",
  summary: "The Orthodox understanding of sin as a SICKNESS of the soul that requires HEALING (the medical/therapeutic model), distinct from the juridical/forensic model dominant in the Latin West.",
  learningObjectives: ["State the therapeutic vs. juridical contrast.", "Cite the Lord's medical imagery (Mk 2:17)."],
  primarySources: ["Mark 2:17; Luke 5:31", "John of Karpathos; Diadochos of Photiki (Philokalia)"],
  items: [
    {
      id: "dog-sin-001",
      kind: "qa",
      difficulty: 4,
      tags: ["sin", "therapeutic"],
      prompt: "How does the Orthodox 'therapeutic' model of sin differ from the Latin 'juridical' model?",
      expectedAnswer: "The juridical model (especially in late medieval and Reformation Western theology) treats sin primarily as legal offense against divine law, requiring satisfaction of God's justice. Salvation is acquittal. The therapeutic model — dominant in the Greek Fathers — treats sin primarily as a SICKNESS of the soul, a disordering of the image of God in us. Salvation is HEALING. The Church is therefore a hospital (Chrysostom: 'the Church is not a courtroom; it is a clinic'). Christ is the Physician (Lk 5:31). Confession is therapy, not litigation. The two models are not strictly exclusive — both have biblical support — but Orthodoxy emphasizes the therapeutic.",
      citations: [
        { source: "Mark 2:17; Luke 5:31" },
        { source: "Met. Hierotheos Vlachos, Orthodox Psychotherapy" },
      ],
    },
  ],
};
