import type { Topic } from "@/lib/types";

export const tenPersecutions: Topic = {
  id: "ten-persecutions",
  title: "The Ten Persecutions",
  summary:
    "Three centuries of intermittent state-organized persecution, from Nero (64) to the Edict of Milan (313). Why pagan Rome found the Christian confession intolerable, and how the blood of the martyrs became, in Tertullian's phrase, the seed of the Church.",
  learningObjectives: [
    "Name the ten traditional persecutions and identify the principal emperor behind each.",
    "Quote Pliny the Younger's letter to Trajan on the Christian assembly.",
    "Explain why Christianity was politically intolerable in a way that Judaism was not.",
    "Describe the Decian crisis and the lapsi controversy.",
  ],
  primarySources: [
    "Tacitus, Annals 15.44",
    "Pliny the Younger, Letters 10.96–97",
    "Acts of the Christian Martyrs (Musurillo)",
    "Cyprian, De Lapsis; Epistles",
    "Lactantius, On the Deaths of the Persecutors",
    "Eusebius, EH Books V–VIII",
  ],
  items: [
    {
      id: "tp-001",
      kind: "mcq",
      difficulty: 1,
      tags: ["nero", "persecution"],
      prompt:
        "Which emperor inaugurated state-organized persecution of Christians in AD 64, blaming them for the fire of Rome?",
      choices: [
        { id: "a", text: "Domitian" },
        { id: "b", text: "Nero", rationale: "Correct. Tacitus Annals 15.44." },
        { id: "c", text: "Trajan" },
        { id: "d", text: "Diocletian" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source: "Tacitus, Annals 15.44",
          quote:
            "To get rid of the report [that he had set the fire], Nero fastened the guilt and inflicted the most exquisite tortures on a class hated for their abominations, called Christians by the populace.",
        },
      ],
    },
    {
      id: "tp-002",
      kind: "chronology",
      difficulty: 3,
      tags: ["timeline", "persecution"],
      prompt:
        "Place these in chronological order, earliest first.",
      choices: [
        { id: "a", text: "Nero's persecution at Rome" },
        { id: "b", text: "Pliny the Younger's letter to Trajan from Bithynia" },
        { id: "c", text: "The Decian universal sacrifice edict" },
        { id: "d", text: "The Great Persecution under Diocletian" },
      ],
      correctOrder: ["a", "b", "c", "d"],
      citations: [
        { source: "Nero AD 64; Pliny c. AD 112; Decius AD 250; Diocletian AD 303–311" },
      ],
    },
    {
      id: "tp-003",
      kind: "identify-source",
      difficulty: 3,
      tags: ["pliny", "worship"],
      prompt:
        "Identify the source: 'They had been accustomed to meet on a fixed day before dawn and sing a hymn antiphonally to Christ as to a god, and to bind themselves by an oath, not to commit any crime, but to abstain from theft, robbery, and adultery...'",
      choices: [
        { id: "a", text: "Tacitus, Annals 15.44" },
        { id: "b", text: "Suetonius, Life of Claudius" },
        { id: "c", text: "Pliny the Younger, Epistle 10.96 (to Trajan)", rationale: "Correct. ~AD 112." },
        { id: "d", text: "Lucian of Samosata, The Passing of Peregrinus" },
      ],
      correctChoiceId: "c",
      citations: [
        {
          source: "Pliny the Younger, Epistles 10.96",
          quote:
            "They affirmed... that the whole of their guilt or error was that they were in the habit of meeting on a certain fixed day before it was light, when they sang in alternate verses a hymn to Christ as to a god, and bound themselves by a solemn oath, not to any wicked deeds, but never to commit any fraud, theft, adultery, never to falsify their word, nor deny a trust when they should be called upon to deliver it up.",
        },
      ],
    },
    {
      id: "tp-004",
      kind: "qa",
      difficulty: 2,
      tags: ["justin", "martyrdom"],
      prompt:
        "Which Christian philosopher and apologist was scourged and beheaded at Rome c. AD 165 under Marcus Aurelius?",
      expectedAnswer:
        "St. Justin Martyr (the Philosopher), together with six companions; see the Acts of Justin and Companions, presided over by the prefect Junius Rusticus.",
      citations: [
        {
          source: "Acts of the Martyrdom of Justin, Chariton, Charito, Euelpistus, Hierax, Paeon, and Liberian",
        },
      ],
    },
    {
      id: "tp-005",
      kind: "mcq",
      difficulty: 4,
      tags: ["decius", "lapsi"],
      prompt:
        "What did the Decian edict of AD 250 require of all subjects of the Empire?",
      choices: [
        { id: "a", text: "Confession of the Pantheon by oath only" },
        {
          id: "b",
          text: "Public sacrifice to the gods with a certificate (libellus) of compliance",
          rationale:
            "Correct. The libelli precipitated the 'lapsed' (lapsi) crisis treated by Cyprian's De Lapsis.",
        },
        { id: "c", text: "Renunciation of the resurrection" },
        { id: "d", text: "Surrender of the Scriptures (traditio)" },
      ],
      correctChoiceId: "b",
      citations: [
        {
          source: "St. Cyprian of Carthage, De Lapsis (AD 251)",
          quote:
            "Before the battle they had already withdrawn from the camp... at the first words of the threatening enemy, the greater number of brethren betrayed their faith.",
        },
      ],
    },
    {
      id: "tp-006",
      kind: "qa",
      difficulty: 3,
      tags: ["galerius", "edict"],
      prompt:
        "What document, issued in April 311, effectively ended the Diocletianic persecution two years before the Edict of Milan?",
      expectedAnswer:
        "The Edict of Toleration of Galerius (sometimes called the 'Edict of Serdica'), issued on his deathbed, granted Christians the right to exist and to rebuild their places of assembly.",
      citations: [
        {
          source: "Lactantius, On the Deaths of the Persecutors 34",
          quote:
            "Wherefore, for this our indulgence, they ought to pray to their God for our safety, for that of the republic, and for their own, that the commonwealth may continue uninjured on every side, and that they may be able to live securely in their homes.",
        },
      ],
    },
    {
      id: "tp-007",
      kind: "debate",
      difficulty: 5,
      tags: ["secular", "constantine"],
      opponentTradition: "Secular",
      opponentClaim:
        "Christianity only succeeded because Rome adopted it for political reasons under Constantine. Without imperial patronage, this Jewish sect would have died out.",
      orthodoxRebuttal:
        "The exact opposite is the case. By AD 250 — sixty years before Constantine — Christianity was already so large that Decius felt compelled to mount the first empire-wide persecution. By the eve of Diocletian (303), demographers (Stark, Hopkins) estimate Christians at five to ten percent of the empire, comprising senatorial families, soldiers, philosophers, and laborers across every province from Britain to Mesopotamia. The Empire mounted ten generations of persecution precisely BECAUSE the faith was spreading despite every legal disincentive. Tertullian observed already in c. 197: 'We are but of yesterday, and we have filled every place... we have left you only your temples' (Apologeticus 37). And what Christians refused to do under threat of death was specifically to honor any other deity — the very thing political assimilation would have required. The faith spread, in Tertullian's later word, because 'the blood of the martyrs is the seed of the Church' (Apologeticus 50). Constantine recognized a fact on the ground; he did not manufacture it.",
      citations: [
        {
          source: "Tertullian, Apologeticus 37 (~AD 197)",
          quote:
            "We are of yesterday, yet we have filled every place among you — cities, islands, fortresses, towns, marketplaces, the very camp, tribes, companies, palace, senate, forum. We have left you only your temples.",
        },
        {
          source: "Tertullian, Apologeticus 50",
          quote: "Semen est sanguis Christianorum — The blood of the Christians is seed.",
        },
        {
          source:
            "Rodney Stark, The Rise of Christianity (Princeton, 1996), and Robin Lane Fox, Pagans and Christians (1986) — empirical sociological estimates.",
        },
      ],
    },
  ],
};
