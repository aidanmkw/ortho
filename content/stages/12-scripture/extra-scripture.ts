import type { Topic } from "@/lib/types";

export const matthewTwentyEight: Topic = {
  id: "mt-28-19",
  title: "Matthew 28:19 — The Great Commission",
  summary: "The Lord's final command: baptize all nations in the name of the Father, Son, and Holy Spirit. The fundamental Trinitarian and missiological text.",
  learningObjectives: ["Quote Mt 28:19-20.", "Note the Trinitarian formula."],
  primarySources: ["Matthew 28:19-20"],
  items: [
    {
      id: "scr-mt28-001",
      kind: "qa",
      difficulty: 2,
      tags: ["great-commission"],
      prompt: "Quote Matthew 28:19-20.",
      expectedAnswer: "'Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.'",
      citations: [{ source: "Matthew 28:19-20" }],
    },
  ],
};

export const james2: Topic = {
  id: "james-2",
  title: "James 2 — Faith and Works",
  summary: "The locus classicus against 'faith alone' as a saving formula. 'Ye see then how that by works a man is justified, and not by faith only' (Jas 2:24).",
  learningObjectives: ["Quote Jas 2:14-26."],
  primarySources: ["James 2"],
  items: [
    {
      id: "scr-jas2-001",
      kind: "identify-source",
      difficulty: 2,
      tags: ["james-2"],
      prompt: "Identify: 'Ye see then how that by works a man is justified, and not by faith only.'",
      choices: [
        { id: "a", text: "Romans 4:5" },
        { id: "b", text: "James 2:24", rationale: "Correct. The only NT verse to use 'faith only' (pistis monon) — and to deny that we are justified by it." },
        { id: "c", text: "Galatians 5:6" },
        { id: "d", text: "Hebrews 11:1" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "James 2:24" }],
    },
  ],
};

export const onePeter3_21: Topic = {
  id: "one-peter-3-21",
  title: "1 Peter 3:21 — Baptism Saves",
  summary: "'The like figure whereunto even baptism doth also now save us.' One of the strongest NT statements of sacramental baptismal regeneration.",
  learningObjectives: ["Quote 1 Pet 3:21."],
  primarySources: ["1 Peter 3:18-22"],
  items: [
    {
      id: "scr-1p3-001",
      kind: "identify-source",
      difficulty: 2,
      tags: ["baptism", "1-peter-3"],
      prompt: "Identify: '...the like figure whereunto even baptism doth also now save us (not the putting away of the filth of the flesh, but the answer of a good conscience toward God).'",
      choices: [
        { id: "a", text: "Romans 6:4" },
        { id: "b", text: "1 Peter 3:21", rationale: "Correct." },
        { id: "c", text: "Titus 3:5" },
        { id: "d", text: "John 3:5" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "1 Peter 3:21" }],
    },
  ],
};

export const johnThree: Topic = {
  id: "john-3",
  title: "John 3 — Born of Water and the Spirit",
  summary: "'Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God' (Jn 3:5).",
  learningObjectives: ["Quote Jn 3:5."],
  primarySources: ["John 3:1-21"],
  items: [
    {
      id: "scr-j3-001",
      kind: "identify-source",
      difficulty: 2,
      tags: ["baptism", "john-3"],
      prompt: "Identify: 'Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.'",
      choices: [
        { id: "a", text: "John 1:13" },
        { id: "b", text: "John 3:5", rationale: "Correct. The Lord to Nicodemus." },
        { id: "c", text: "John 6:53" },
        { id: "d", text: "1 John 5:6" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "John 3:5" }],
    },
  ],
};

export const oneCor11: Topic = {
  id: "1-cor-11",
  title: "1 Corinthians 11 — Eucharistic Realism",
  summary: "'Whosoever shall eat this bread, and drink this cup of the Lord, unworthily, shall be GUILTY OF THE BODY AND BLOOD of the Lord' (1 Cor 11:27). Decisive against a merely symbolic reading.",
  learningObjectives: ["Quote 1 Cor 11:27-29."],
  primarySources: ["1 Corinthians 11:17-34"],
  items: [
    {
      id: "scr-1c11-001",
      kind: "qa",
      difficulty: 3,
      tags: ["eucharist", "1-cor-11"],
      prompt: "How does 1 Corinthians 11:27-29 weigh against a symbolic-memorial reading of the Eucharist?",
      expectedAnswer: "Paul says that those who eat and drink unworthily 'shall be GUILTY OF THE BODY AND BLOOD of the Lord' (v. 27) and that those who fail to 'DISCERN THE LORD'S BODY' eat and drink JUDGMENT to themselves (v. 29). One cannot be guilty of the Body of Christ in violating a mere symbol; one cannot eat damnation to oneself for misreading a metaphor. The language presupposes that the bread and the cup ARE the Body and Blood of the Lord — exactly the patristic, realist reading present in Ignatius (~107), Justin (~155), Irenaeus (~180), and forward.",
      citations: [
        { source: "1 Corinthians 11:23-29" },
        { source: "John Chrysostom, Homily 27 on 1 Corinthians" },
      ],
    },
  ],
};

export const psalm22: Topic = {
  id: "psalm-22",
  title: "Psalm 21 LXX (22 MT) — The Crucifixion Psalm",
  summary: "The Lord on the Cross quotes Psalm 21:1 LXX (22:1 MT): 'My God, my God, why hast thou forsaken me?' The whole psalm is a prophetic depiction of the crucifixion 1000 years before the event.",
  learningObjectives: ["Cite vv. 16-18 (pierced hands and feet; divided garments)."],
  primarySources: ["Psalm 21 LXX / 22 MT; Matthew 27:35, 46; John 19:23-24"],
  items: [
    {
      id: "scr-ps22-001",
      kind: "qa",
      difficulty: 3,
      tags: ["messianic-psalm", "crucifixion"],
      prompt: "Cite the verses of Psalm 21 LXX (22 MT) that prophesy the crucifixion.",
      expectedAnswer: "v. 1 ('My God, my God, why hast thou forsaken me?' — quoted by the Lord on the Cross, Mt 27:46); v. 7 ('All they that see me laugh me to scorn'); v. 8 ('He trusted in the LORD that he would deliver him' — quoted by the mockers, Mt 27:43); v. 16 ('they pierced my hands and my feet'); v. 18 ('they part my garments among them, and cast lots upon my vesture' — quoted of the Roman soldiers, Jn 19:24). The Crucifixion-language was written perhaps 1000 years before the event.",
      citations: [{ source: "Psalm 21 LXX (22 MT); Matthew 27:35, 43, 46; John 19:23-24" }],
    },
  ],
};

export const acts15: Topic = {
  id: "acts-15-council",
  title: "Acts 15 — The First Council",
  summary: "The Apostolic Council of Jerusalem (~AD 49). The first instance of conciliarity in the Christian Church.",
  learningObjectives: ["Cite Acts 15:28."],
  primarySources: ["Acts 15; Galatians 2"],
  items: [
    {
      id: "scr-a15-001",
      kind: "identify-source",
      difficulty: 2,
      tags: ["acts-15"],
      prompt: "Identify: 'For it seemed good to the Holy Ghost, and to us, to lay upon you no greater burden than these necessary things.'",
      choices: [
        { id: "a", text: "Acts 1:24" },
        { id: "b", text: "Acts 15:28", rationale: "Correct. The Council of Jerusalem's letter to the Gentile churches." },
        { id: "c", text: "Acts 11:18" },
        { id: "d", text: "Acts 20:28" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "Acts 15:28" }],
    },
  ],
};
