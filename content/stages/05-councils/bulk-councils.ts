import type { Topic } from "@/lib/types";

export const constII: Topic = {
  id: "constantinople-ii",
  title: "Constantinople II (553)",
  summary: "Fifth Ecumenical Council under Justinian. Condemned the 'Three Chapters' (writings of Theodore of Mopsuestia, Theodoret, and Ibas — perceived as Nestorian-leaning) and Origenism. 165 Fathers.",
  learningObjectives: ["Identify the Three Chapters.", "Note the anti-Origenist anathemas."],
  primarySources: ["Acts of Constantinople II (553)"],
  items: [
    {
      id: "co-c2-001",
      kind: "qa",
      difficulty: 4,
      tags: ["constantinople-ii", "three-chapters"],
      prompt: "What are the 'Three Chapters' condemned at Constantinople II (553)?",
      expectedAnswer: "(1) The writings of Theodore of Mopsuestia (Cyril's posthumous Antiochene rival); (2) the writings of Theodoret of Cyrrhus against Cyril's Twelve Anathemas; (3) the Letter of Ibas of Edessa to Mari the Persian. All three texts were perceived as Nestorian-leaning. Justinian forced the issue; Pope Vigilius vacillated and was held in Constantinople for years.",
      citations: [{ source: "Acts of Constantinople II (553)" }],
    },
  ],
};

export const trullan: Topic = {
  id: "trullan",
  title: "Council in Trullo / Quinisext (692)",
  summary: "Disciplinary council convoked by Justinian II in the Trullan dome of the imperial palace. Issued 102 canons supplementing Constantinople II and III (hence 'Quinisext' — fifth-sixth). Received in the East; rejected in the West.",
  learningObjectives: ["Note its 102 canons.", "Identify its reception status East/West."],
  primarySources: ["Canons of the Council in Trullo (692)"],
  items: [
    {
      id: "co-tr-001",
      kind: "qa",
      difficulty: 4,
      tags: ["trullo", "canons"],
      prompt: "Why is the Council in Trullo (692) sometimes called the Quinisext, and what is its canonical status?",
      expectedAnswer: "It is called the Quinisext ('Fifth-Sixth') because it issued the disciplinary canons that the Fifth and Sixth Ecumenical Councils had not addressed. Its 102 canons are received in the East as completing the canonical legislation of the seven Ecumenical Councils. The West (Rome) did not receive Trullo because several canons (e.g. canon 13 on married priests, canon 55 against Saturday fasting) conflict with Latin practice.",
      citations: [{ source: "Canons of Trullo (692)" }],
    },
    {
      id: "co-tr-002",
      kind: "mcq",
      difficulty: 4,
      tags: ["trullo", "married-clergy"],
      prompt: "Which canon of Trullo (692) explicitly defends the right of married men to be ordained presbyters and deacons?",
      choices: [
        { id: "a", text: "Canon 13", rationale: "Correct. Against the Roman discipline of clerical celibacy." },
        { id: "b", text: "Canon 55" },
        { id: "c", text: "Canon 82 (against the Lamb-symbol icon)" },
        { id: "d", text: "Canon 102" },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Trullo, Canon 13" }],
    },
  ],
};

export const robberCouncil: Topic = {
  id: "robber-council",
  title: "Latrocinium of Ephesus (449) — Not Received",
  summary: "The 'Robber Council' (Latrocinium) of 449 under Dioscorus of Alexandria, which acquitted Eutyches. Pope Leo refused to accept its acts, calling it not a council but a robbery (latrocinium). Chalcedon (451) reversed it.",
  learningObjectives: ["Note the negative-example council.", "Cite Leo's letter."],
  primarySources: ["Pope Leo, Letter 95 (Latrocinium)", "Acts of Chalcedon"],
  items: [
    {
      id: "co-rob-001",
      kind: "qa",
      difficulty: 4,
      tags: ["latrocinium", "ephesus-449"],
      prompt: "What event is called the Latrocinium of Ephesus (449), and what was its outcome?",
      expectedAnswer: "A council convoked by Theodosius II at Ephesus in 449, dominated by Dioscorus of Alexandria, which acquitted Eutyches of monophysitism and deposed Flavian of Constantinople. Pope Leo's Tome was not read. Leo denounced the council as a 'latrocinium' (robbery). After Theodosius's death, the new emperor Marcian convoked Chalcedon (451), which reversed the Latrocinium, condemned Eutyches and Dioscorus, and accepted the Tome of Leo.",
      citations: [
        { source: "Pope St. Leo the Great, Letter 95" },
        { source: "Acts of Chalcedon (451)" },
      ],
    },
  ],
};

export const conciliarReception: Topic = {
  id: "conciliar-reception",
  title: "Reception — How a Council Becomes Ecumenical",
  summary: "The Orthodox doctrine that an Ecumenical Council is not merely convoked or signed; it is received by the entire Body of the Church.",
  learningObjectives: ["State the principle of reception.", "Cite the rejection of Florence (1439) as a case study."],
  primarySources: ["Khomiakov, The Church Is One", "Encyclical of the Eastern Patriarchs (1848)"],
  items: [
    {
      id: "co-rec-001",
      kind: "identify-source",
      difficulty: 5,
      tags: ["reception", "1848"],
      prompt: "Identify: 'With us, neither patriarchs nor councils have ever been able to introduce novelties, because the defender of religion is the very Body of the Church, even the People themselves.'",
      choices: [
        { id: "a", text: "Encyclical of the Eastern Patriarchs (1848)", rationale: "Correct. Their reply to Pope Pius IX's encyclical 'In suprema Petri.'" },
        { id: "b", text: "Khomiakov, The Church Is One" },
        { id: "c", text: "Mark of Ephesus, Encyclical Letter" },
        { id: "d", text: "Patriarch Jeremias II, Reply to the Lutherans" },
      ],
      correctChoiceId: "a",
      citations: [
        {
          source: "Encyclical of the Eastern Patriarchs, 1848, §17",
          quote: "The defender of religion is the very Body of the Church, even the People themselves.",
        },
      ],
    },
  ],
};

export const localCouncils: Topic = {
  id: "local-councils-received",
  title: "Local Councils Received as Ecumenically Binding",
  summary: "Local councils whose canons are received in the Orthodox canonical corpus on a par with Ecumenical legislation: Carthage (419), Sardica (343), Ancyra (314), Neocaesarea (315), Gangra (340), Antioch (341), Laodicea (363-364).",
  learningObjectives: ["Name three locally-binding councils."],
  primarySources: ["Pedalion (Rudder); Council Canons"],
  items: [
    {
      id: "co-loc-001",
      kind: "mcq",
      difficulty: 4,
      tags: ["sardica"],
      prompt: "Which local council of 343 was especially important for the Western position on papal appeals?",
      choices: [
        { id: "a", text: "Sardica", rationale: "Correct. Its canons on appeals to Rome are debated East-West." },
        { id: "b", text: "Ancyra" },
        { id: "c", text: "Antioch" },
        { id: "d", text: "Carthage" },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Council of Sardica (343), canons 3-5" }],
    },
  ],
};
