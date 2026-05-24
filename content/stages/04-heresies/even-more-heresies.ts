import type { Topic } from "@/lib/types";

export const iconoclasm: Topic = {
  id: "iconoclasm-deep",
  title: "Iconoclasm — Deep Dive",
  summary:
    "The two waves of Byzantine iconoclasm: under Leo III (726) and his son Constantine V (mid-8th c.), and the second wave from Leo V (815) to Theodora's restoration (843, the Triumph of Orthodoxy).",
  learningObjectives: [
    "Date the two waves and the Triumph of Orthodoxy (843).",
    "Cite John of Damascus and Theodore the Studite.",
  ],
  primarySources: [
    "Acts of Nicaea II (787)",
    "St. John of Damascus, On the Divine Images (three treatises)",
    "St. Theodore the Studite, Antirrhetics",
    "Synodikon of Orthodoxy",
  ],
  items: [
    {
      id: "her-icd-001",
      kind: "qa",
      difficulty: 3,
      tags: ["iconoclasm", "triumph"],
      prompt:
        "When does the Orthodox Church commemorate the 'Triumph of Orthodoxy,' and what historical event does it mark?",
      expectedAnswer:
        "The First Sunday of Great Lent. It commemorates the definitive restoration of the holy icons by the Empress-Regent Theodora and the Synod of Constantinople in March 843, ending the second wave of iconoclasm. The Synodikon of Orthodoxy, which contains the conciliar definitions affirming icons and condemning their opponents, is read at the Liturgy on this Sunday in every Orthodox Church.",
      citations: [
        { source: "Synodikon of Orthodoxy (received form from March 843, with later additions)" },
      ],
    },
    {
      id: "her-icd-002",
      kind: "identify-source",
      difficulty: 4,
      tags: ["iconoclasm", "theodore-studite"],
      prompt:
        "Identify the source: 'If we make an icon of Christ we do not divide His one hypostasis; rather we represent in image His one hypostasis as it has been made visible in His humanity.'",
      choices: [
        { id: "a", text: "John of Damascus, On the Divine Images III" },
        { id: "b", text: "Theodore the Studite, Antirrhetic III", rationale: "Correct. Theodore systematized the Christological argument from icon to Incarnation." },
        { id: "c", text: "Germanus of Constantinople, Letter to Thomas of Klaudioupolis" },
        { id: "d", text: "Nikephoros of Constantinople, Apologeticus Major" },
      ],
      correctChoiceId: "b",
      citations: [
        { source: "St. Theodore the Studite, Antirrhetic III" },
      ],
    },
  ],
};

export const bogomils: Topic = {
  id: "bogomils",
  title: "Bogomils & Cathars (medieval dualism)",
  summary:
    "10th-century Bulgarian Bogomilism (founder Bogomil), a Manichaean-style dualism that denied the goodness of matter, the Incarnation as fully material, and the legitimacy of the visible Church. Spread westward as Catharism (12th–13th c.) in southern France.",
  learningObjectives: [
    "Identify the founder Bogomil (~10th c. Bulgaria).",
    "Note the doctrinal continuity with earlier Manichaeism.",
  ],
  primarySources: [
    "Cosmas the Priest, A Sermon Against the Heretics (~AD 970)",
    "Euthymius Zigabenus, Dogmatic Panoply, Title XXVII",
  ],
  items: [
    {
      id: "her-bog-001",
      kind: "qa",
      difficulty: 4,
      tags: ["bogomils", "dualism"],
      prompt:
        "What is the central error of Bogomilism, and against what doctrine of the Church does it stand?",
      expectedAnswer:
        "Bogomilism is a dualism — material reality is the work of an evil principle (sometimes identified with Satan as a fallen son of God), and only the spiritual is good. Christ did not truly take flesh; the sacraments using material elements are rejected; the visible Church is rejected; marriage and procreation are sinful. It stands against the Christian doctrines of (a) one Creator God who made the material world and pronounced it good (Gen 1), (b) the true Incarnation of the Word in flesh (1 Jn 4:2–3), and (c) the legitimacy of the sacramental, material life of the visible Church.",
      citations: [
        { source: "Cosmas the Priest, A Sermon Against the Heretics (~AD 970)" },
      ],
    },
  ],
};

export const ecumenismHeresy: Topic = {
  id: "ecumenism-concerns",
  title: "Ecumenism (Traditionalist Concerns)",
  summary:
    "The traditionalist Orthodox concern that 'ecumenism' in some modern forms shades into 'branch theory' — the heresy that the Orthodox Church is one branch among others (Roman, Anglican, Protestant), each preserving part of the truth. Justin Popović and others have warned against this.",
  learningObjectives: [
    "State the branch theory and why Orthodoxy rejects it.",
    "Cite Justin Popović's writings.",
  ],
  primarySources: [
    "St. Justin Popović, The Orthodox Church and Ecumenism (1974)",
    "Encyclical of the Ecumenical Patriarch, 1920 — for the contrast",
  ],
  items: [
    {
      id: "her-ec-001",
      kind: "qa",
      difficulty: 4,
      tags: ["ecumenism", "branch-theory"],
      prompt:
        "What is 'branch theory,' and why is it incompatible with the Orthodox confession of the Church?",
      expectedAnswer:
        "Branch theory holds that the one true Church of Christ subsists in multiple confessions (Roman, Orthodox, Anglican, etc.) as branches of a single tree, each preserving part of the apostolic deposit. It denies that any one of these visible bodies is the Church in its fullness. The Orthodox confession is precisely the opposite: the Symbol says 'I believe in ONE, holy, catholic, and apostolic Church' — singular and visible. Where the apostolic deposit is preserved without subtraction (Protestantism) or addition (Rome), there is the Church. Branch theory dissolves the doctrinal-historical-sacramental specificity of the Church into an abstraction.",
      citations: [
        { source: "St. Justin Popović, The Orthodox Church and Ecumenism (1974)" },
        { source: "Symbol of Faith, Article 9" },
      ],
    },
  ],
};
