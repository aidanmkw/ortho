import type { Topic } from "@/lib/types";

export const apostolicSuccession: Topic = {
  id: "apostolic-succession",
  title: "Apostolic Succession & the Three-Fold Ministry",
  summary:
    "Bishop, presbyter, deacon — the three orders of the New-Testament Church, attested in the lifetime of those who knew the Apostles.",
  learningObjectives: [
    "State the three ranks of major orders and where each appears in the NT.",
    "Quote 1 Clement 42–44 on the apostolic provision for succession.",
    "Name three Fathers (1st–2nd c.) who treat episcopal succession as the rule of faith.",
  ],
  primarySources: [
    "St. Clement of Rome, 1 Clement 42–44",
    "St. Ignatius of Antioch, all seven letters (esp. Magnesians, Trallians, Smyrnaeans)",
    "St. Irenaeus, Against Heresies III.3 (succession lists)",
    "Hegesippus in Eusebius, EH 4.22",
  ],
  items: [
    {
      id: "as-001",
      kind: "mcq",
      difficulty: 1,
      tags: ["orders", "hierarchy"],
      prompt:
        "What are the three orders of major sacramental ministry in the apostolic Church?",
      choices: [
        { id: "a", text: "Bishop (episkopos), presbyter, deacon", rationale: "Correct." },
        { id: "b", text: "Apostle, prophet, teacher (1 Cor 12:28)", rationale: "These are charisms in Paul's list, not the three sacramental orders." },
        { id: "c", text: "Pastor, elder, deacon" },
        { id: "d", text: "Patriarch, archbishop, bishop" },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "St. Ignatius, Magnesians 6:1; Trallians 3:1; Smyrnaeans 8:1" },
        { source: "Acts 6 (deacons); 14:23 (presbyters); 20:28 (overseers); 1 Tim 3 (bishops + deacons); Tit 1:5–7" },
      ],
    },
    {
      id: "as-002",
      kind: "identify-source",
      difficulty: 4,
      tags: ["ignatius", "harmony"],
      prompt:
        "Whose work, written ~AD 107 en route to martyrdom in Rome, contains: 'Be subject to the bishop and to one another, as Jesus Christ to the Father after the flesh, and the Apostles to Christ and to the Father, that there may be union of flesh and spirit'?",
      choices: [
        { id: "a", text: "Polycarp, Letter to the Philippians" },
        { id: "b", text: "Ignatius of Antioch, Magnesians 13:2", rationale: "Correct." },
        { id: "c", text: "1 Clement" },
        { id: "d", text: "Hermas, Visions" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source: "St. Ignatius of Antioch, Magnesians 13:2 (~AD 107)",
          quote:
            "Be ye subject to the bishop and to one another, as Jesus Christ to the Father after the flesh, and the Apostles to Christ and to the Father, that there may be union of flesh and spirit.",
        },
      ],
    },
    {
      id: "as-003",
      kind: "qa",
      difficulty: 3,
      tags: ["irenaeus", "succession"],
      prompt:
        "Which 2nd-century Father offers a complete list of the bishops of Rome from the Apostles to his own day in order to demonstrate the apostolic origin of the Church's teaching?",
      expectedAnswer:
        "St. Irenaeus of Lyon, in Against Heresies III.3.3. He lists Linus, Anencletus, Clement, Evaristus, Alexander, Sixtus, Telesphorus, Hyginus, Pius, Anicetus, Soter, and Eleutherius (his contemporary).",
      citations: [
        {
          source: "St. Irenaeus, Against Heresies III.3.1–3 (c. AD 180)",
          quote:
            "It is within the power of all... to behold the tradition of the Apostles made manifest in every Church. We can enumerate those who were instituted bishops in the Churches by the Apostles, and the succession of these men to our own times.",
        },
      ],
    },
    {
      id: "as-004",
      kind: "debate",
      difficulty: 5,
      tags: ["succession", "reformed"],
      opponentTradition: "Reformed",
      opponentClaim:
        "Apostolic succession is a Roman innovation that has no basis in the New Testament. Elders were simply chosen by the congregation, and there is no chain of laying-on of hands that guarantees doctrine.",
      orthodoxRebuttal:
        "The New Testament itself records ordination by the laying on of hands: Acts 6:6 (the Seven); Acts 13:3 (Barnabas and Saul commissioned); Acts 14:23 (Paul and Barnabas appoint presbyters in every church); 1 Timothy 4:14 ('the gift that is in thee, which was given thee by prophecy, with the laying on of the hands of the presbytery'); 2 Timothy 1:6 ('the gift of God which is in thee by the putting on of my hands'); Titus 1:5; Hebrews 6:2 lists the laying on of hands among the foundational teachings. Within thirty years of the last Apostle, St. Clement of Rome explicitly describes the Apostles' deliberate provision for succession (1 Clem 44). Twenty years later, St. Ignatius universally presupposes the three-fold ministry. By AD 180, St. Irenaeus answers the Gnostics by appealing precisely to the succession lists — 'we point out the tradition derived from the Apostles, of the very great, the very ancient, and universally known Church founded and organized at Rome by the two most glorious Apostles, Peter and Paul; as also the faith preached to men, which comes down to our time by means of the succession of the bishops' (AH III.3.2). The reason succession is doctrinally indispensable is that without it there is no objective principle for receiving apostolic teaching: each generation reinvents the faith.",
      rejoinders: [
        {
          objection: "Succession is no guarantee — some bishops have taught heresy.",
          reply:
            "Correct, and the Orthodox Church has always said so. The principle is not magical infallibility of every bishop, but the visible, conciliar continuity of the episcopate. When Arius arose, the Church judged him by the Council. When Nestorius arose, by another. When Pope Honorius taught monothelitism, an Ecumenical Council condemned him (Constantinople III, 681). Succession plus conciliarity is the Orthodox principle.",
        },
      ],
      citations: [
        { source: "Acts 14:23; 1 Tim 4:14; 2 Tim 1:6; Tit 1:5; Heb 6:2" },
        {
          source: "St. Clement of Rome, 1 Clement 44:1–3 (~AD 96)",
          quote:
            "Our Apostles knew through our Lord Jesus Christ, that there would be strife on account of the office of the episcopate. For this reason, therefore, having received perfect foreknowledge, they appointed those ministers already mentioned, and afterwards gave instructions, that when these should fall asleep, other approved men should succeed them in their ministry.",
        },
        {
          source: "St. Irenaeus, Against Heresies III.3.2",
          quote:
            "It is a matter of necessity that every Church should agree with this Church, on account of its preeminent authority — that is, the faithful everywhere — inasmuch as the tradition from the Apostles has been preserved [in it].",
        },
      ],
    },
    {
      id: "as-005",
      kind: "qa",
      difficulty: 2,
      tags: ["1-clement"],
      prompt:
        "Approximately when was 1 Clement written, and why is it significant for the doctrine of apostolic succession?",
      expectedAnswer:
        "Written from the Church of Rome to the Church of Corinth circa AD 96 — possibly during the reign of Domitian — by the church's leadership in the person of Clement. It is the earliest non-canonical witness that the Apostles deliberately appointed successors and provided for ongoing ordinations. The Corinthians had unjustly deposed presbyters, and Clement writes to restore them, citing that no one may eject those whom 'the Apostles, or after them, other eminent men, have appointed.'",
      citations: [
        {
          source: "St. Clement of Rome, 1 Clement 44:3",
          quote:
            "It will be no light sin upon us if we eject from the episcopate those who have offered the gifts blamelessly and holily.",
        },
      ],
    },
    {
      id: "as-006",
      kind: "mcq",
      difficulty: 4,
      tags: ["hegesippus"],
      prompt:
        "Which 2nd-century chronicler personally traveled to Rome and other apostolic sees to verify the succession lists of bishops as a defense against the Gnostics?",
      choices: [
        { id: "a", text: "Eusebius of Caesarea" },
        { id: "b", text: "Hegesippus", rationale: "Correct. His five books of Memoirs are preserved in fragments by Eusebius EH 4.22." },
        { id: "c", text: "Polycrates of Ephesus" },
        { id: "d", text: "Julius Africanus" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source: "Eusebius, EH 4.22, citing Hegesippus",
          quote:
            "On my arrival at Rome, I made a succession down to Anicetus... And in every succession, and in every city, the doctrine prevails according to what is declared by the Law and the Prophets and the Lord.",
        },
      ],
    },
  ],
};
