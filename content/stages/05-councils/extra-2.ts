import type { Topic } from "@/lib/types";

export const councilsDetail: Topic = {
  id: "councils-detail-mcq",
  title: "Councils — Quick Recall Pack 2",
  summary: "More MCQs on the seven councils and key local councils.",
  learningObjectives: ["Drill the details."],
  primarySources: ["Acts of the Seven Councils"],
  items: [
    {
      id: "co-d2-001",
      kind: "mcq",
      difficulty: 2,
      tags: ["nicaea-i", "fathers"],
      prompt:
        "Approximately how many Fathers attended Nicaea I (325), by Orthodox tradition?",
      choices: [
        { id: "a", text: "318 — the number of Abraham's trained men (Gen 14:14), traditionally counted.", rationale: "Orthodox liturgical tradition (Synaxarion, Sunday before Pentecost). Modern historical estimates range from 220 to 300+." },
        { id: "b", text: "150 — the number associated with Constantinople I (381).", rationale: "Wrong. 150 is Constantinople I. Nicaea is 318." },
        { id: "c", text: "200 — the conservative modern historical estimate.", rationale: "Wrong. Some historians do estimate ~220, but the TRADITION is 318 (the symbolic Abrahamic number)." },
        { id: "d", text: "630 — the number associated with Chalcedon (451).", rationale: "Wrong. 630 is the traditional count for Chalcedon. Nicaea is 318." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Synaxarion, Sunday of the Fathers of the First Ecumenical Council" }],
    },
    {
      id: "co-d2-002",
      kind: "mcq",
      difficulty: 2,
      tags: ["constantinople-i", "fathers"],
      prompt: "Approximately how many Fathers attended Constantinople I (381)?",
      choices: [
        { id: "a", text: "150 — by Orthodox tradition.", rationale: "Synaxarion, Sunday of the Fathers of the Second Ecumenical Council. The Pneumatomachi delegation withdrew during the council." },
        { id: "b", text: "318 — matching the Nicene tradition.", rationale: "Wrong. 318 is the symbolic Nicene number. Constantinople I had about 150." },
        { id: "c", text: "200 — slightly more than the Cappadocian-led party.", rationale: "Wrong. The Orthodox traditional number is 150." },
        { id: "d", text: "300 — a round figure split evenly between East and West.", rationale: "Wrong. Constantinople I was almost entirely Eastern; the West did not significantly participate." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Synaxarion, Sunday of the Fathers of the Second Council" }],
    },
    {
      id: "co-d2-003",
      kind: "mcq",
      difficulty: 3,
      tags: ["chalcedon", "creed"],
      prompt: "What is the 'Chalcedonian Definition'?",
      choices: [
        { id: "a", text: "The 451 dogmatic statement affirming Christ as one Person in two natures, 'inconfusedly, unchangeably, indivisibly, inseparably.'", rationale: "The Definition is distinct from the Symbol of Faith (Creed) and from the Tome of Leo, though all three documents are linked at Chalcedon." },
        { id: "b", text: "The list of 30 disciplinary canons attached to the Council's Acts.", rationale: "Wrong, although Chalcedon DID issue 30 canons (including the disputed canon 28). The DEFINITION is the Christological statement, not the canons." },
        { id: "c", text: "The Symbol of Faith (Niceno-Constantinopolitan) read at the Council's opening.", rationale: "Wrong. The Council quoted the Symbol but did not produce it (the Symbol was 381). Chalcedon's distinctive contribution is the Definition." },
        { id: "d", text: "The Tome of Leo (Pope Leo's Letter 28 to Flavian) acclaimed at the Council.", rationale: "Wrong. The Tome WAS read and acclaimed ('Peter has spoken through Leo!'), but the Definition is a SEPARATE document Synthesizing Cyril and Leo." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Acts of Chalcedon (451)" }],
    },
    {
      id: "co-d2-004",
      kind: "mcq",
      difficulty: 4,
      tags: ["origenism"],
      prompt:
        "Constantinople II (553) anathematized 15 speculative propositions associated with which earlier author?",
      choices: [
        { id: "a", text: "Origen of Alexandria (~185-254) — together with the 'Three Chapters' of Theodore of Mopsuestia, Theodoret, and Ibas.", rationale: "The fifteen Origenist anathemas address pre-existence of souls, apokatastasis, successive worlds, and the spherical resurrection body. Origen's person is not anathematized; his disputed doctrines are." },
        { id: "b", text: "Tertullian of Carthage (~155-220) — for his late-life Montanist writings.", rationale: "Wrong. Tertullian's Montanism is real, but Constantinople II's anathemas target Origenist speculations, not Tertullianist Montanism." },
        { id: "c", text: "Augustine of Hippo (~354-430) — for his teaching on double predestination.", rationale: "Wrong. Augustine is not anathematized; Origen's speculative positions are. Augustine is a saint in the Orthodox Church (June 15)." },
        { id: "d", text: "Theodore of Mopsuestia (~350-428) — for proto-Nestorian Christology.", rationale: "Wrong, BUT Theodore's writings ARE one of the Three Chapters condemned at Constantinople II. The fifteen anathemas, however, target Origen specifically; the Three Chapters are a separate set of condemnations." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Acts of Constantinople II (553), Anathemas Against Origen" }],
    },
    {
      id: "co-d2-005",
      kind: "mcq",
      difficulty: 4,
      tags: ["pope-honorius"],
      prompt:
        "Which Pope was condemned BY NAME at Constantinople III (681) for monothelitism?",
      choices: [
        { id: "a", text: "Honorius I (r. 625-638) — for his two letters to Sergius of Constantinople endorsing 'one will' in Christ.", rationale: "The decisive historical counter-example to Vatican I's papal infallibility. Pope Leo II (r. 682) confirmed the council's condemnation of his predecessor." },
        { id: "b", text: "Liberius (r. 352-366) — for subscribing to a semi-Arian formula under Constantius II.", rationale: "Wrong. Liberius's case IS a real controversy (Athanasius records his lapse), but he was not condemned at Constantinople III; Honorius was." },
        { id: "c", text: "Vigilius (r. 537-555) — for his vacillation over the Three Chapters at Constantinople II.", rationale: "Wrong. Vigilius vacillated at Constantinople II (553), but was not condemned by name there; Honorius was condemned by name at Constantinople III (681)." },
        { id: "d", text: "Eugene IV (r. 1431-1447) — for the Council of Florence's failure of reception.", rationale: "Wrong period entirely — Eugene IV is 15th-c., Constantinople III is 7th-c." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Acts of Constantinople III, Session 13; Pope Leo II's letter (682)" }],
    },
    {
      id: "co-d2-006",
      kind: "mcq",
      difficulty: 3,
      tags: ["irene"],
      prompt: "Who convoked Nicaea II (787), the council that restored the icons?",
      choices: [
        { id: "a", text: "Empress Irene of Athens, acting as regent for her young son Constantine VI.", rationale: "She had earlier reversed the iconoclast policies of her late husband Leo IV and convened the council to restore the icons." },
        { id: "b", text: "Justinian I (r. 527-565) — convoker of Constantinople II.", rationale: "Wrong. Justinian convoked Constantinople II (553), 234 years before Nicaea II. Different emperor." },
        { id: "c", text: "Charlemagne, crowned 'Emperor of the Romans' at Rome in 800.", rationale: "Wrong. Charlemagne (r. 768-814) was the WESTERN emperor and actually REJECTED Nicaea II at his own Council of Frankfurt (794). He did not convoke it." },
        { id: "d", text: "Empress Theodora, who restored icons in the Triumph of Orthodoxy (843).", rationale: "Wrong. Theodora's icon restoration in 843 ended the SECOND wave of iconoclasm, half a century AFTER Nicaea II. Irene convoked Nicaea II in 787." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Acts of Nicaea II (787)" }],
    },
  ],
};
