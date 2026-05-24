import type { Topic } from "@/lib/types";

export const oneTimothy: Topic = {
  id: "one-timothy-3-15",
  title: "1 Timothy 3:15 — Pillar and Ground",
  summary: "The locus classicus for the Church as the pillar and ground of the truth.",
  learningObjectives: ["Quote 1 Tim 3:15.", "Note the Greek terms (stylos, hedraiōma)."],
  primarySources: ["1 Timothy 3:15"],
  items: [
    {
      id: "scr-1t-001",
      kind: "identify-source",
      difficulty: 2,
      tags: ["1-timothy-3-15"],
      prompt: "Identify: '...the house of God, which is the church of the living God, the pillar and ground of the truth.'",
      choices: [
        { id: "a", text: "Hebrews 12:22" },
        { id: "b", text: "1 Timothy 3:15", rationale: "Correct." },
        { id: "c", text: "Ephesians 2:20" },
        { id: "d", text: "1 Corinthians 3:16" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "1 Timothy 3:15" }],
    },
  ],
};

export const acts2_42: Topic = {
  id: "acts-2-42",
  title: "Acts 2:42 — The Four Apostolic Marks",
  summary: "The earliest description of Christian assembly: the Apostles' teaching, fellowship, breaking of bread, and prayers.",
  learningObjectives: ["Quote Acts 2:42.", "Match each mark to its current Orthodox practice."],
  primarySources: ["Acts 2:42-47"],
  items: [
    {
      id: "scr-a242-001",
      kind: "qa",
      difficulty: 2,
      tags: ["acts-2-42"],
      prompt: "What four marks of the apostolic community does Acts 2:42 enumerate?",
      expectedAnswer: "'And they continued steadfastly in the apostles' DOCTRINE and FELLOWSHIP, and in BREAKING OF BREAD, and in PRAYERS.' These four are: (1) apostolic teaching = the Tradition; (2) fellowship (koinōnia) = the visible communion of the Church; (3) breaking of bread = the Eucharist; (4) the prayers = the liturgical prayer of the Church. All four endure in Orthodox practice continuously from this verse forward.",
      citations: [{ source: "Acts 2:42" }],
    },
  ],
};

export const johnTwentyThree: Topic = {
  id: "john-20-23",
  title: "John 20:23 — Whose Sins You Remit",
  summary: "The Lord's commission to the Apostles to bind and loose sins. The scriptural ground of sacramental confession.",
  learningObjectives: ["Quote Jn 20:23.", "Connect to Mt 18:18 and 16:19."],
  primarySources: ["John 20:21-23", "Matthew 16:19; 18:18"],
  items: [
    {
      id: "scr-j2023-001",
      kind: "qa",
      difficulty: 3,
      tags: ["confession"],
      prompt: "Quote John 20:21-23 and state its sacramental significance.",
      expectedAnswer: "'Then said Jesus to them again, Peace be unto you: as my Father hath sent me, even so send I you. And when he had said this, he breathed on them, and saith unto them, Receive ye the Holy Ghost: Whose soever sins ye remit, they are remitted unto them; and whose soever sins ye retain, they are retained.' (Jn 20:21-23). This passage, together with Mt 16:19 and 18:18, is the apostolic authority for sacramental absolution by the bishops and their priests. The 'remit' / 'retain' authority is sacramental and corporate, not merely declarative.",
      citations: [{ source: "John 20:21-23; Matthew 16:19; 18:18" }],
    },
  ],
};

export const hebrewsTen: Topic = {
  id: "hebrews-10-26",
  title: "Hebrews 10 — The Single Sacrifice",
  summary: "Hebrews's emphasis on Christ's once-for-all sacrifice. Sometimes misread to deny the Eucharistic sacrifice. The Orthodox reading: the Eucharist is not a separate sacrifice but the same one Sacrifice of Calvary made present.",
  learningObjectives: ["Quote Heb 10:14 and 10:26."],
  primarySources: ["Hebrews 10"],
  items: [
    {
      id: "scr-h10-001",
      kind: "debate",
      difficulty: 4,
      tags: ["eucharistic-sacrifice"],
      opponentTradition: "Reformed",
      opponentClaim: "Hebrews 10 says Christ offered himself ONCE FOR ALL. The Orthodox/Catholic Eucharist as a 'sacrifice' contradicts this; it repeats what cannot be repeated.",
      orthodoxRebuttal: "The Orthodox Liturgy does NOT repeat Christ's sacrifice. The Anaphora of St. John Chrysostom says: 'commemorating this saving commandment and all that has come to pass for our sake' — the Eucharist is the anamnesis (memorial-making-present) of the one Sacrifice of Calvary. The Lamb 'slain from the foundation of the world' (Rev 13:8) and 'ever being slain yet never consumed' (the Anaphora) is the single eternal Sacrifice we participate in at every Liturgy. The Letter to the Hebrews itself (10:1-14) is set against the Levitical sacrifices REPEATED daily because they were ineffectual; not against the ANAMNESIS of the one truly effective Sacrifice. 1 Cor 10:16-21 and 1 Cor 11:23-29 confirm that the Eucharist is a real participation in Christ's Body and Blood — not a repetition, but a participation in the once-for-all.",
      citations: [
        { source: "Hebrews 10:1-14; 1 Corinthians 10:16-21; 11:23-29; Revelation 13:8" },
        { source: "Anaphora of St. John Chrysostom — Ta sa ek tōn sōn ('Thine own of thine own')" },
      ],
    },
  ],
};

export const psalter: Topic = {
  id: "psalter-orthodoxy",
  title: "The Psalter in Orthodox Liturgy",
  summary: "The Septuagint Psalter (150 psalms + Psalm 151) divided into 20 kathismata. In monastic use, the whole Psalter is chanted weekly (or twice in Lent).",
  learningObjectives: ["Note the 20 kathismata.", "Identify Psalm 151."],
  primarySources: ["LXX Psalter", "Typikon — Psalter cycle"],
  items: [
    {
      id: "scr-ps-001",
      kind: "qa",
      difficulty: 3,
      tags: ["psalter", "kathismata"],
      prompt: "How is the Orthodox Psalter divided for liturgical reading, and how often is the whole Psalter chanted in monastic use?",
      expectedAnswer: "The 150 psalms (plus Psalm 151, a brief Davidic psalm preserved in the Septuagint) are divided into 20 'kathismata' (sittings), each composed of two or three 'stases.' In Athonite and traditional monastic use, the whole Psalter is chanted through once each week — twice each week during Great Lent. In parish use, kathismata are chanted at Vespers and Matins on a rotating basis.",
      citations: [{ source: "Typikon of the Great Church; Athonite Typikon" }],
    },
  ],
};

export const inspirationOfScripture: Topic = {
  id: "inspiration",
  title: "Inspiration of Scripture",
  summary: "The Orthodox doctrine: Scripture is theopneustos (God-breathed; 2 Tim 3:16), written by men under the Holy Spirit's inspiration. NOT a 'verbal dictation' theory; the personalities and styles of the human authors are preserved.",
  learningObjectives: ["Quote 2 Tim 3:16-17 and 2 Pet 1:20-21.", "State the Orthodox doctrine without fundamentalist literalism."],
  primarySources: ["2 Tim 3:16-17; 2 Pet 1:20-21"],
  items: [
    {
      id: "scr-insp-001",
      kind: "qa",
      difficulty: 3,
      tags: ["inspiration"],
      prompt: "What does 2 Peter 1:20-21 add to 2 Timothy 3:16 on the inspiration of Scripture?",
      expectedAnswer: "2 Tim 3:16 — 'All scripture is given by inspiration of God (theopneustos).' 2 Pet 1:20-21 adds the negative and positive corollaries: 'Knowing this first, that NO PROPHECY of the scripture is of any PRIVATE INTERPRETATION. For the prophecy came not in old time by the will of man: but holy men of God spake as they were moved by the Holy Ghost.' The two verses together: (a) Scripture is divinely inspired; (b) it is not subject to merely individual interpretation; it requires the Church's interpretive tradition. The patristic reading of 2 Pet 1:20 anchors the Orthodox rejection of sola scriptura without ecclesial tradition.",
      citations: [{ source: "2 Timothy 3:16-17; 2 Peter 1:20-21" }],
    },
  ],
};

export const inerrancy: Topic = {
  id: "inerrancy",
  title: "Inerrancy vs. Patristic Reading",
  summary: "The Orthodox confess Scripture as inspired and infallible in what it teaches concerning salvation. The fundamentalist doctrine of 'inerrancy in every detail' is not the patristic mind: the Fathers freely acknowledge difficulties, employ allegorical readings, and recognize the human voice within the divine.",
  learningObjectives: ["Note the patristic latitude.", "Cite Origen on the difficulties of Scripture."],
  primarySources: ["Origen, De Principiis IV", "Augustine, On Christian Doctrine"],
  items: [
    {
      id: "scr-iner-001",
      kind: "qa",
      difficulty: 4,
      tags: ["inerrancy", "patristic"],
      prompt: "How does the Orthodox doctrine of Scripture differ from modern Protestant Fundamentalist inerrancy?",
      expectedAnswer: "The Orthodox confess Scripture as theopneustos (God-breathed), inspired, and infallible in what it teaches concerning salvation, the divinity of Christ, the Trinity, and the moral life. The Fathers, however, freely employed allegorical and typological readings, allowed for human authorial voice within the divine inspiration, and acknowledged textual variants and interpretive difficulties. The Princeton-Hodge / Chicago Statement (1978) doctrine of inerrancy 'in every detail of history, geography, and science' is a modern formulation responding to 19th-century higher criticism, NOT the historical patristic position. The Orthodox approach reads Scripture WITHIN the Church — through liturgy, council, and Father — and accepts the patristic latitude on questions of historical detail.",
      citations: [
        { source: "Origen, De Principiis IV.2-3" },
        { source: "Augustine, On the Literal Meaning of Genesis I.18" },
      ],
    },
  ],
};
