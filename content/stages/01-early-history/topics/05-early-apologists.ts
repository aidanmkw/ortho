import type { Topic } from "@/lib/types";

export const earlyApologists: Topic = {
  id: "early-apologists",
  title: "Early Christian Apologists",
  summary:
    "The 2nd-century philosophers, rhetors, and bishops who answered pagan polemic, ridiculed false religion, and presented Christianity as the true philosophy.",
  learningObjectives: [
    "Name the principal Greek apologists of the 2nd c.: Quadratus, Aristides, Justin, Athenagoras, Theophilus, Tatian, Melito.",
    "Identify the first occurrence of the word 'Trinity' (trias) in a Christian writer.",
    "Quote Justin on the agreement of pagan philosophy and Christ at its best moments (Logos spermatikos).",
    "Name the pagan polemicists they answered: Celsus, Lucian, Fronto.",
  ],
  primarySources: [
    "St. Justin Martyr, First Apology; Second Apology; Dialogue with Trypho",
    "Athenagoras, Plea Regarding Christians; On the Resurrection",
    "Theophilus of Antioch, To Autolycus",
    "Tatian, Address to the Greeks",
    "Melito of Sardis, On Pascha; Apology (fragments)",
    "Origen, Against Celsus (later, but quoting Celsus's True Word)",
  ],
  items: [
    {
      id: "ea-001",
      kind: "mcq",
      difficulty: 2,
      tags: ["justin"],
      prompt:
        "Which apologist wrote a First and Second Apology addressed to Antoninus Pius and the Roman Senate, and a Dialogue with the Jew Trypho?",
      choices: [
        { id: "a", text: "Tatian" },
        { id: "b", text: "Justin Martyr", rationale: "Correct. ~AD 150–160." },
        { id: "c", text: "Athenagoras" },
        { id: "d", text: "Quadratus" },
      ],
      correctChoiceId: "b",
      citations: [
        { source: "St. Justin Martyr, First Apology (~AD 155)" },
        { source: "St. Justin Martyr, Dialogue with Trypho (~AD 160)" },
      ],
    },
    {
      id: "ea-002",
      kind: "identify-source",
      difficulty: 3,
      tags: ["justin", "logos-spermatikos"],
      prompt:
        "Identify the source: 'Whatever has been uttered aright by any man in any place belongs to us Christians; for we worship and love, next to God, the Word who is from the unbegotten and ineffable God.'",
      choices: [
        { id: "a", text: "Clement of Alexandria, Stromata" },
        { id: "b", text: "Origen, Against Celsus" },
        {
          id: "c",
          text: "Justin Martyr, Second Apology 13",
          rationale:
            "Correct. The 'seminal Logos' (logos spermatikos) doctrine — every fragment of truth in Greek philosophy belongs to Christ.",
        },
        { id: "d", text: "Augustine, City of God" },
      ],
      correctChoiceId: "c",
      citations: [
        {
          source: "St. Justin Martyr, Second Apology 13",
          quote:
            "Whatever has been uttered aright by any man in any place belongs to us Christians... For all the writers were able to see the realities darkly, through the implanted seed of the Logos that was in them.",
        },
      ],
    },
    {
      id: "ea-003",
      kind: "debate",
      difficulty: 4,
      tags: ["philosophy", "secular"],
      opponentTradition: "Secular",
      opponentClaim:
        "Christianity is hostile to reason and destroyed classical learning. It triumphed by suppressing philosophy, not by engaging it.",
      orthodoxRebuttal:
        "The historical record is the reverse. The 2nd-century apologists were themselves trained Platonists, Stoics, and rhetors who deliberately engaged the philosophical tradition. Justin Martyr, having studied with Stoic, Peripatetic, Pythagorean, and Platonist teachers, called Christianity 'the true and useful philosophy' (Dialogue 8). His 'seminal Logos' theology (2 Apol. 13) holds that wherever Plato, Heraclitus, or Socrates spoke truly, they spoke from Christ, who is the Logos. Athenagoras's Plea is a philosophical defense of the Resurrection. Origen taught philosophy at Alexandria and wrote eight books against Celsus, the most learned pagan critic. By the 4th century, St. Basil the Great writes the Address to Young Men explicitly to teach how to read the Greek poets and philosophers profitably. The medieval West did not preserve Aristotle accidentally — it inherited him through Christian and Muslim scholars. The Renaissance recovery of Plato came out of Byzantine Greek copies preserved by Orthodox monks. The opposition between 'faith' and 'reason' is a late 17th- and 18th-century construction, not a Christian one.",
      citations: [
        {
          source: "St. Justin Martyr, Dialogue with Trypho 8",
          quote:
            "I found this philosophy alone to be safe and profitable.",
        },
        {
          source: "St. Basil the Great, Address to Young Men on the Right Use of Greek Literature",
        },
        {
          source: "Origen, Against Celsus, eight books (~AD 248)",
        },
      ],
    },
    {
      id: "ea-004",
      kind: "qa",
      difficulty: 3,
      tags: ["theophilus", "trinity"],
      prompt:
        "Which late 2nd-century apologist and bishop of Antioch is the first known to use the Greek word 'trias' (Trinity) for the Christian Godhead?",
      expectedAnswer:
        "St. Theophilus of Antioch, in his work To Autolycus II.15 (c. AD 180). He speaks of 'the trias — of God, His Logos, and His Sophia.'",
      citations: [
        {
          source: "St. Theophilus of Antioch, To Autolycus II.15 (~AD 180)",
          quote:
            "The three days which were before the luminaries are types of the trias — of God, and His Word, and His Wisdom.",
        },
      ],
    },
    {
      id: "ea-005",
      kind: "mcq",
      difficulty: 4,
      tags: ["athenagoras"],
      prompt:
        "Which apologist defended Christians against the three principal pagan slanders — atheism, cannibalism, and incest — in a treatise addressed to Marcus Aurelius and Commodus?",
      choices: [
        { id: "a", text: "Athenagoras of Athens, Plea Regarding Christians (~AD 177)", rationale: "Correct." },
        { id: "b", text: "Quadratus, Apology" },
        { id: "c", text: "Aristides of Athens" },
        { id: "d", text: "Melito of Sardis" },
      ],
      correctChoiceId: "a",
      citations: [
        { source: "Athenagoras, Plea Regarding Christians (Presbeia)" },
      ],
    },
  ],
};
