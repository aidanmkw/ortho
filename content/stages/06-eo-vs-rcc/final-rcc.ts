import type { Topic } from "@/lib/types";

export const rccFinalPack: Topic = {
  id: "rcc-final-pack",
  title: "RCC Final Drill Pack",
  summary: "Final MCQ pack on EO vs RCC distinctives.",
  learningObjectives: ["Drill the full landscape of distinctions."],
  primarySources: ["Catechism of the Catholic Church; conciliar documents"],
  items: [
    {
      id: "rcc-fp-001",
      kind: "mcq",
      difficulty: 3,
      tags: ["catechism"],
      prompt: "What is the current authoritative summary of Roman Catholic doctrine?",
      choices: [
        { id: "a", text: "The Catechism of the Catholic Church (1992, revised 1997).", rationale: "Promulgated by John Paul II in Fidei Depositum. Four parts: Creed, Sacraments, Life in Christ, Prayer." },
        { id: "b", text: "The Catechism of the Council of Trent (the Roman Catechism, 1566).", rationale: "Wrong. The Roman Catechism of Trent was the standard for centuries but was replaced by the Catechism of the Catholic Church (1992)." },
        { id: "c", text: "The Baltimore Catechism (1885), composed for the U.S. Council of Plenary Bishops.", rationale: "Wrong. The Baltimore Catechism was a U.S. catechetical text, not the universal authoritative summary." },
        { id: "d", text: "The Compendium of the Catechism (2005), promulgated by Benedict XVI.", rationale: "Wrong. The Compendium (2005) is a Q-and-A SUMMARY of the 1992 Catechism, not the principal text." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "John Paul II, Fidei Depositum (1992)" }],
    },
    {
      id: "rcc-fp-002",
      kind: "mcq",
      difficulty: 3,
      tags: ["pope-john-paul-ii"],
      prompt: "How long was John Paul II's pontificate, and where does it rank historically?",
      choices: [
        { id: "a", text: "Over 26 years (1978-2005) — the second-longest verifiable pontificate after Pius IX.", rationale: "Pius IX served 31+ years (1846-1878). Tradition assigns Peter ~25 years but the historicity of that figure is contested." },
        { id: "b", text: "About 18 years (1978-1996) — until his retirement at age seventy-five.", rationale: "Wrong. JPII never retired; he served until his death in 2005, age 84." },
        { id: "c", text: "About 10 years (1978-1988) — cut short by the assassination attempt and its complications.", rationale: "Wrong. He survived the 1981 attempt and served another 24 years after it." },
        { id: "d", text: "Over 33 years (1972-2005) — the longest in church history.", rationale: "Wrong. He was elected in 1978, not 1972. And his ~27-year reign was second to Pius IX, not first." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Vatican biographical records" }],
    },
    {
      id: "rcc-fp-003",
      kind: "mcq",
      difficulty: 4,
      tags: ["vatican-i", "infallibility-criteria"],
      prompt:
        "According to Vatican I's Pastor Aeternus (ch. 4), what conditions must be met for a papal statement to be infallible (ex cathedra)?",
      choices: [
        {
          id: "a",
          text:
            "The pope (1) speaks as pastor of all Christians, (2) defines a doctrine of faith or morals, (3) by his apostolic authority, (4) to be held by the whole Church.",
          rationale: "The four conditions of Pastor Aeternus, Vatican I (1870), chapter 4.",
        },
        {
          id: "b",
          text:
            "Any encyclical, motu proprio, or apostolic exhortation issued in the pope's official name.",
          rationale: "Wrong. Most papal documents do NOT meet the ex cathedra criteria; ordinary papal teaching is authoritative but not infallible.",
        },
        {
          id: "c",
          text:
            "Statements signed by the College of Cardinals at a consistory in the pope's presence.",
          rationale: "Wrong. Conciliar definitions are infallible but require ecumenical council, not consistory. Papal infallibility belongs to the pope acting alone under the stated conditions.",
        },
        {
          id: "d",
          text:
            "Statements made on Holy Thursday or Easter morning in St. Peter's Basilica.",
          rationale: "Wrong. The conditions are formal/intentional, not calendrical.",
        },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Vatican I, Pastor Aeternus (1870), Chapter 4" }],
    },
    {
      id: "rcc-fp-004",
      kind: "mcq",
      difficulty: 4,
      tags: ["pope-pius-x"],
      prompt:
        "Which early-20th-century pope crushed the 'Modernist' movement in Roman Catholic theology?",
      choices: [
        { id: "a", text: "Pius X (1903-1914) — Pascendi Dominici Gregis (1907) condemned Modernism; the Oath Against Modernism (1910).", rationale: "Required from all clergy and seminary professors. Targeted the historical-critical method, immanentism, and evolution of dogma." },
        { id: "b", text: "Pius XII (1939-1958) — Humani Generis (1950) condemned the 'new theology' (la nouvelle théologie).", rationale: "Wrong. Pius XII DID issue Humani Generis against the nouvelle théologie (de Lubac, Daniélou, etc.) — but the EARLIER campaign against Modernism was Pius X." },
        { id: "c", text: "John XXIII (1958-1963) — opened Vatican II to address Modernism through aggiornamento.", rationale: "Wrong. John XXIII OPENED toward modernity at Vatican II; he did not crush Modernism." },
        { id: "d", text: "Paul VI (1963-1978) — Humanae Vitae (1968) addressed modern moral questions.", rationale: "Wrong. Humanae Vitae addressed contraception. The Modernist crisis was crushed by Pius X two generations earlier." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Pius X, Pascendi Dominici Gregis (1907); Lamentabili Sane Exitu (1907)" }],
    },
    {
      id: "rcc-fp-005",
      kind: "mcq",
      difficulty: 3,
      tags: ["jesuits"],
      prompt: "What is the Society of Jesus (Jesuits)?",
      choices: [
        { id: "a", text: "A Roman Catholic religious order founded by St. Ignatius of Loyola in 1540, with a special fourth vow of obedience to the Pope.", rationale: "Approved by Paul III in Regimini militantis Ecclesiae (1540). Famous for Counter-Reformation, missionary work, and Spiritual Exercises." },
        { id: "b", text: "An Orthodox monastic order tracing its rule to St. Athanasios the Athonite.", rationale: "Wrong. Athanasios the Athonite IS the founder of Athonite monasticism (Great Lavra, 963), but the Jesuits are Roman Catholic." },
        { id: "c", text: "A 17th-century Protestant denomination of German pietists.", rationale: "Wrong. The Jesuits are Roman Catholic and predate Lutheran Pietism." },
        { id: "d", text: "A medieval crusading order, like the Templars or Hospitallers.", rationale: "Wrong. The crusading orders (Templars 1119, Hospitallers c. 1099, Teutonic Knights 1190) are 12th-c. and military. Jesuits are 16th-c. and a teaching/missionary order." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Ignatius of Loyola, Spiritual Exercises (1548); Constitutions of the Society of Jesus (1559)" }],
    },
    {
      id: "rcc-fp-006",
      kind: "mcq",
      difficulty: 4,
      tags: ["uniate"],
      prompt: "What is 'Uniatism' from an Orthodox standpoint?",
      choices: [
        { id: "a", text: "The Roman strategy of receiving Eastern Christians into full communion with Rome while preserving Byzantine rite — e.g., Brest 1596 for Ukrainian Greek Catholics.", rationale: "Balamand 1993 (Catholic-Orthodox dialogue) explicitly repudiated Uniatism as a model for unity." },
        { id: "b", text: "A monastic reform that produced the Ukrainian Studite Brotherhood in the 17th century.", rationale: "Wrong, but Studite-style reform IS a real institution in Eastern Catholic monasticism (revived by Metropolitan Andrey Sheptytsky). Uniatism is broader and ecclesiological." },
        { id: "c", text: "A medieval war between Latin and Greek Christians on Mount Athos.", rationale: "Wrong. There was no such war. Athonites have resisted Latin influence at various points but no 'Uniate' war existed." },
        { id: "d", text: "A 1962 council called by John XXIII that defined union with the East.", rationale: "Wrong. Vatican II (1962-65) addressed Eastern Christians (Orientalium Ecclesiarum, 1964) but did not define Uniatism; Uniatism dates from the 16th-c. unions onward." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Balamand Statement (1993), §§ 12-13" }],
    },
    {
      id: "rcc-fp-007",
      kind: "mcq",
      difficulty: 4,
      tags: ["assisi"],
      prompt: "What was the 1986 Assisi Day of Prayer for Peace?",
      choices: [
        { id: "a", text: "John Paul II's interreligious gathering — Christian, Muslim, Buddhist, Hindu, Animist leaders praying side-by-side.", rationale: "Photographs of JPII with the Dalai Lama and a Buddha statue in St. Peter of Assisi became a flashpoint. Critics charged religious indifferentism." },
        { id: "b", text: "The canonization of Padre Pio of Pietrelcina by John Paul II at Assisi.", rationale: "Wrong. Padre Pio was canonized in Rome in 2002, not Assisi in 1986." },
        { id: "c", text: "The promulgation of the new Code of Canon Law (1983) at Assisi.", rationale: "Wrong. The 1983 Code was issued in Rome by Sacrae Disciplinae Leges, not at Assisi." },
        { id: "d", text: "The funeral of Pope John Paul I, who died one month into his pontificate.", rationale: "Wrong. JPI died and was buried in 1978, in Rome, not Assisi." },
      ],
      correctChoiceId: "a",
      citations: [{ source: "Coverage in L'Osservatore Romano, October 1986; JPII, Address at Assisi, 27 Oct 1986" }],
    },
  ],
};
