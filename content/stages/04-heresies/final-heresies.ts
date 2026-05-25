import type { Topic } from "@/lib/types";

export const heresiesFinalPack: Topic = {
  id: "heresies-final-pack",
  title: "Heresies — Final Pack",
  summary: "Final MCQs on heresies and refuters.",
  learningObjectives: ["Master the full heresy roster."],
  primarySources: ["Standard heresiology references"],
  items: [
    {
      id: "her-final-001",
      kind: "mcq",
      difficulty: 3,
      tags: ["donatist-detail"],
      prompt:
        "Why did the Donatists reject the validity of sacraments performed by 'traditores' (bishops who handed over Scripture during persecution)?",
      choices: [
        { id: "a", text: "They held the validity of a sacrament depends on the moral worthiness of the minister — a tainted bishop's consecrations are void.", rationale: "Augustine refuted this in his Donatist writings: the validity of the sacrament depends on Christ, not on the priest's worthiness." },
        { id: "b", text: "They believed only the Pope of Rome could consecrate bishops; African consecrations needed papal confirmation.", rationale: "Wrong. Donatists were African separatists with their own bishops; they did not appeal to Rome." },
        { id: "c", text: "They demanded liturgical reform (vernacular, simplified rites) which African bishops had refused.", rationale: "Wrong. Donatism was a sacramental and disciplinary controversy, not a liturgical reform movement." },
        { id: "d", text: "They denied infant baptism as a corruption introduced by the traditores during persecution.", rationale: "Wrong. Donatists baptized infants like other African Christians. Infant baptism rejection is the 16th-c. Anabaptists." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "St. Augustine, Against the Donatists; Letters 89, 93" }],
    },
    {
      id: "her-final-002",
      kind: "mcq",
      difficulty: 3,
      tags: ["montanism"],
      prompt: "What was Montanism?",
      choices: [
        { id: "a", text: "A 2nd-c. apocalyptic charismatic movement in Phrygia (Montanus, Priscilla, Maximilla) claiming continuing prophetic revelation beyond the Apostles.", rationale: "Tertullian joined it late in life. Rejected by the catholic Church for placing prophetic ecstasies above the apostolic deposit." },
        { id: "b", text: "An Eastern monastic movement of the 4th c. promoting rigorous fasting and celibacy under Macarius the Great.", rationale: "Wrong. Macarius's desert monasticism is 4th-c. and entirely orthodox. Montanism is earlier and was a schismatic movement, not a monastic one." },
        { id: "c", text: "A school of Gnostic teachers in Edessa influenced by Marcion and Bardesanes.", rationale: "Wrong. Bardesanes IS a real 2nd-c. Edessene figure with quasi-Gnostic tendencies. Montanism is a different (apocalyptic-prophetic) movement from Phrygia." },
        { id: "d", text: "An Arian sect of the 4th c. led by Aetius and Eunomius, also called the Anomoeans.", rationale: "Wrong. Aetius and Eunomius DID lead the Anomoean (radical Arian) party in the 4th c. Montanism is 2nd-c. and entirely distinct." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Eusebius EH 5.16-19" }],
    },
    {
      id: "her-final-003",
      kind: "mcq",
      difficulty: 4,
      tags: ["filioquism-modern"],
      prompt:
        "What is the current Roman Catholic position on the Filioque in inter-Christian contexts?",
      choices: [
        { id: "a", text: "The doctrine is retained, but the WORD is sometimes omitted in the Creed when reciting with Orthodox (e.g., John Paul II with Patriarch Demetrios in 1995).",
          rationale: "The 1995 Pontifical Council clarification 'The Greek and Latin Traditions Regarding the Procession of the Holy Spirit' explicitly tolerates the omission." },
        { id: "b", text: "The Filioque was officially removed from the Latin Mass after Vatican II.", rationale: "Wrong. The Filioque is still in the official Roman Mass; it is omitted only in ecumenical contexts as gesture." },
        { id: "c", text: "The Filioque was removed in 1054 when Cardinal Humbert excommunicated Patriarch Cerularius.", rationale: "Wrong. The Filioque was being ADDED in the West around that time (officially at Rome from 1014). It was the very point of the dispute." },
        { id: "d", text: "The Filioque was removed in 1965 when Athenagoras and Paul VI lifted the mutual anathemas of 1054.", rationale: "Wrong. The 1965 gesture lifted the personal anathemas of Humbert and Cerularius but did not affect the Filioque itself." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "PCPCU, 'The Greek and Latin Traditions Regarding the Procession of the Holy Spirit' (1995)" }],
    },
    {
      id: "her-final-004",
      kind: "mcq",
      difficulty: 4,
      tags: ["liberalism"],
      prompt: "What does 'theological liberalism' mean as the Orthodox use the term?",
      choices: [
        { id: "a", text: "Post-Enlightenment Protestant accommodation of Christianity to scientific naturalism and historical criticism — denying miracles, the historical Resurrection, traditional sexual ethics.", rationale: "From Schleiermacher onward, culminating in Harnack and the 'Quest for the Historical Jesus' tradition." },
        { id: "b", text: "A medieval movement of 'free spirits' related to the Beguines, condemned at the Council of Vienne (1311).", rationale: "Wrong, but a real movement — the 'Free Spirit' heresy WAS condemned at Vienne. 'Liberalism' in Orthodox usage refers to the post-Enlightenment Protestant phenomenon." },
        { id: "c", text: "A type of Orthodox jurisdiction that allows lay participation in synodal decisions.", rationale: "Wrong. All Orthodox synods are episcopal; lay participation in church councils is a separate question (Russian sobor model)." },
        { id: "d", text: "An ascetic school that emphasized the freedom of the will against extreme Augustinian predestinarianism.", rationale: "Wrong. Anti-Augustinian synergists (Cassian, etc.) are not what 'liberalism' means in current Orthodox usage." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Adolf von Harnack, Das Wesen des Christentums (1900); Friedrich Schleiermacher, The Christian Faith (1821)" }],
    },
    {
      id: "her-final-005",
      kind: "mcq",
      difficulty: 4,
      tags: ["modalism-detail"],
      prompt:
        "Which 3rd-century Pope was investigated for modalist tendencies, prompting correspondence with his Eastern namesake Dionysius of Alexandria?",
      choices: [
        { id: "a", text: "Pope Dionysius of Rome (r. 259-268).", rationale: "Athanasius preserves portions of their correspondence in De Decretis Nicaenae Synodi. The exchange helped clarify Father/Son distinction." },
        { id: "b", text: "Pope Liberius (r. 352-366) — accused of softening on Arianism under Constantius II.", rationale: "Wrong. Liberius is a real and difficult case, but his alleged lapse was Arian-leaning, not modalist. Different century, different controversy." },
        { id: "c", text: "Pope Sylvester I (r. 314-335) — under whom Constantine convoked Nicaea.", rationale: "Wrong. Sylvester is associated with Nicaea (his legates attended), not with modalism controversies." },
        { id: "d", text: "Pope Julius I (r. 337-352) — defended Athanasius during his exiles.", rationale: "Wrong. Julius hosted exiled Athanasius and is associated with anti-Arian defense, not modalism." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "St. Athanasius, De Decretis Nicaenae Synodi 26; De Sententia Dionysii" }],
    },
  ],
};
