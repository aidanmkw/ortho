import type { Topic } from "@/lib/types";

// Pattern: each option is a Father's name with a similar parenthetical;
// the player must know which Father wrote the named work, not just notice
// which option has details.

export const fathersFactsPack: Topic = {
  id: "fathers-facts-pack",
  title: "Fathers — Quick Facts",
  summary: "MCQ pack on the Fathers and their works.",
  learningObjectives: ["Drill author-to-work matches."],
  primarySources: ["Standard patrology"],
  items: [
    {
      id: "cf-fp-001",
      kind: "mcq",
      difficulty: 2,
      tags: ["irenaeus"],
      prompt: "Which Father wrote Against Heresies in five books c. AD 180?",
      choices: [
        { id: "a", text: "St. Irenaeus of Lyon — disciple of Polycarp.", rationale: "AH I.10 enumerates the rule of faith; AH III.3 gives the Roman succession list." },
        { id: "b", text: "St. Justin Martyr — author of two Apologies and the Dialogue with Trypho.", rationale: "Wrong. Justin wrote Apologies and the Dialogue (~AD 150-160); the five-book Against Heresies is Irenaeus's." },
        { id: "c", text: "Origen of Alexandria — author of On First Principles and the Hexapla.", rationale: "Wrong. Origen wrote against Celsus (8 books) and many homilies but not the five-book Against Heresies." },
        { id: "d", text: "St. Hippolytus of Rome — author of the Refutation of All Heresies in ten books.", rationale: "Wrong. Hippolytus wrote his own ten-book Refutation (~AD 220); Irenaeus's is the FIVE-book Against Heresies (~180)." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Irenaeus, Against Heresies (Adversus Haereses), ~AD 180" }],
    },
    {
      id: "cf-fp-002",
      kind: "mcq",
      difficulty: 2,
      tags: ["athanasius"],
      prompt: "Which Father wrote On the Incarnation, the classic patristic Christological treatise?",
      choices: [
        { id: "a", text: "St. Athanasius of Alexandria — wrote it ~AD 318, before he became archbishop.", rationale: "Companion to Against the Heathen (Contra Gentes). Famous for 'He became man that we might become god' (54.3)." },
        { id: "b", text: "St. Cyril of Alexandria — also wrote On the Unity of Christ against the Nestorians.", rationale: "Wrong. Cyril wrote On the Unity of Christ (~AD 438), not the famous On the Incarnation (Athanasius's)." },
        { id: "c", text: "St. Gregory of Nazianzus — composed the Five Theological Orations against Eunomius.", rationale: "Wrong. Gregory the Theologian's masterwork is the Five Theological Orations (380); On the Incarnation is Athanasius's." },
        { id: "d", text: "St. Maximus the Confessor — wrote the Ambigua and Disputation with Pyrrhus.", rationale: "Wrong. Maximus's masterworks are the Ambigua and Disputation with Pyrrhus, ~AD 645; On the Incarnation is Athanasius's." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Athanasius, De Incarnatione Verbi Dei (~AD 318)" }],
    },
    {
      id: "cf-fp-003",
      kind: "mcq",
      difficulty: 3,
      tags: ["john-damascus"],
      prompt:
        "Who wrote the Exact Exposition of the Orthodox Faith and the Three Treatises on the Divine Images (~AD 730)?",
      choices: [
        { id: "a", text: "St. John of Damascus — wrote from under Umayyad rule near Damascus.", rationale: "His Fount of Knowledge (which includes the Exact Exposition) is the first systematic Orthodox theology. His treatises defend icons against Byzantine iconoclasm." },
        { id: "b", text: "St. Symeon the New Theologian — author of the Hymns of Divine Love and Catechetical Discourses.", rationale: "Wrong. Symeon (949-1022) is the Byzantine mystical theologian; he did not write On the Divine Images." },
        { id: "c", text: "St. Photios the Great — author of the Mystagogy of the Holy Spirit and the Bibliotheca.", rationale: "Wrong. Photios (810-893) wrote against the Filioque; the Divine Images treatises predate him by a century." },
        { id: "d", text: "St. Theodore the Studite — author of the Antirrhetics against iconoclasm.", rationale: "Wrong, but Theodore (759-826) DID write against the second iconoclasm — his three Antirrhetics. The earlier three Treatises by John of Damascus precede him." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "John of Damascus, Fount of Knowledge; On the Divine Images" }],
    },
    {
      id: "cf-fp-004",
      kind: "mcq",
      difficulty: 3,
      tags: ["gregory-palamas"],
      prompt:
        "Which Father defended the hesychasts and articulated the essence/energies distinction in the 14th century?",
      choices: [
        { id: "a", text: "St. Gregory Palamas (1296-1359) — archbishop of Thessalonica, author of the Triads.", rationale: "Vindicated at the Hesychast Councils of Constantinople (1341, 1347, 1351). His feast is the Second Sunday of Lent." },
        { id: "b", text: "St. Symeon the New Theologian — taught the conscious experience of the uncreated Light in the 11th century.", rationale: "Wrong, though Symeon did teach the experience of uncreated Light. Palamas systematized the essence/energies distinction in the 14th century." },
        { id: "c", text: "St. Nicholas Cabasilas — author of The Life in Christ and the Commentary on the Divine Liturgy.", rationale: "Wrong. Cabasilas (1322-1392) was a contemporary and ally of Palamas but wrote on sacraments and liturgy, not the essence/energies polemic." },
        { id: "d", text: "St. Mark of Ephesus — refused to sign the Council of Florence in 1439.", rationale: "Wrong. Mark of Ephesus (~1392-1444) opposed Latin union; his fight was with the Latins, not with Barlaam." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Gregory Palamas, Triads in Defense of the Holy Hesychasts" }],
    },
    {
      id: "cf-fp-005",
      kind: "mcq",
      difficulty: 3,
      tags: ["chrysostom"],
      prompt:
        "Which Father composed the Liturgy used on most Sundays of the Orthodox year?",
      choices: [
        { id: "a", text: "St. John Chrysostom — archbishop of Constantinople, d. 407 in exile.", rationale: "The Liturgy bearing his name is the ordinary Sunday Liturgy. He is one of the Three Hierarchs commemorated January 30." },
        { id: "b", text: "St. Basil the Great — whose Liturgy is used on the five Sundays of Lent and other appointed days.", rationale: "Wrong. Basil's Liturgy IS used — ten times a year (5 Lenten Sundays, Holy Thursday, Holy Saturday, Eves of Nativity and Theophany, his feast). But the ordinary Sunday is Chrysostom's." },
        { id: "c", text: "St. James, brother of the Lord — first bishop of Jerusalem, whose Liturgy is the oldest extant.", rationale: "Wrong. St. James's Liturgy IS the most ancient and is used in some Orthodox churches on October 23 — but not weekly." },
        { id: "d", text: "St. Mark — Liturgy of St. Mark, the original Alexandrian rite.", rationale: "Wrong. The Liturgy of St. Mark is a real ancient Alexandrian rite, but Orthodox Sundays use Chrysostom's." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Hieratikon — Divine Liturgy of St. John Chrysostom" }],
    },
    {
      id: "cf-fp-006",
      kind: "mcq",
      difficulty: 4,
      tags: ["philokalia"],
      prompt:
        "Which 19th-century Russian saint produced the principal Russian translation of the Philokalia?",
      choices: [
        { id: "a", text: "St. Theophan the Recluse (1815-1894) — translated the Dobrotolyubie in five volumes.", rationale: "His Russian Philokalia substantially expands the Greek 1782 original. He worked in seclusion at the Vyshensky Monastery from 1872 until his death." },
        { id: "b", text: "St. Seraphim of Sarov (1759-1833) — the wonder-worker of Sarov.", rationale: "Wrong. Seraphim is famous for the Conversation with Motovilov and his hesychastic life, not a Philokalia translation." },
        { id: "c", text: "St. Ignatius Brianchaninov (1807-1867) — wrote The Arena and Ascetical Trials.", rationale: "Wrong. Ignatius wrote his own ascetical compendia (The Arena), heavily drawing on Philokalic sources, but did not translate the whole Philokalia." },
        { id: "d", text: "St. Paisius Velichkovsky (1722-1794) — translated the Slavonic Philokalia (Dobrotoljubije) in 1793.", rationale: "Wrong period, BUT he did translate the SLAVONIC Philokalia (1793). The RUSSIAN translation came later, by Theophan." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Dobrotolyubie (Russian Philokalia), trans. St. Theophan the Recluse" }],
    },
    {
      id: "cf-fp-007",
      kind: "mcq",
      difficulty: 4,
      tags: ["maximus", "ambigua"],
      prompt:
        "Whose Ambigua and Quaestiones ad Thalassium are the principal speculative-exegetical masterworks of 7th-century Greek theology?",
      choices: [
        { id: "a", text: "St. Maximus the Confessor (~580-662) — tongue cut out, hand cut off, died in exile.", rationale: "Defender of dyothelitism, vindicated at Constantinople III (681). His Ambigua resolves difficulties in Gregory the Theologian and Dionysius." },
        { id: "b", text: "St. Cyril of Alexandria (~376-444) — wrote the Commentary on John and On the Unity of Christ.", rationale: "Wrong. Cyril's masterworks come earlier and address Nestorianism, not the Ambigua-style speculative exegesis." },
        { id: "c", text: "St. Anastasius of Sinai (~640-700) — wrote the Hodegos (Guide) against the monophysites.", rationale: "Wrong, but Anastasius is a real Sinai abbot and theologian. The Ambigua belongs to Maximus." },
        { id: "d", text: "St. Sophronius of Jerusalem (~560-638) — patriarch who received the city's surrender to the Caliph Umar.", rationale: "Wrong. Sophronius was a contemporary of Maximus and wrote against monothelitism (Synodical Letter, 634), but the Ambigua is Maximus's." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "St. Maximus the Confessor, Ambigua; Quaestiones ad Thalassium" }],
    },
  ],
};
