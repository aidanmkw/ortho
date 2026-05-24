import type { Topic } from "@/lib/types";

export const vaticanII: Topic = {
  id: "vatican-ii",
  title: "Vatican II (1962–1965)",
  summary:
    "The 21st Roman Council. Lumen Gentium, Dei Verbum, Sacrosanctum Concilium, Unitatis Redintegratio. Significant openings to the Orthodox (recognition of 'sister churches' having valid sacraments) but did not address the doctrinal flashpoints.",
  learningObjectives: [
    "Name the four constitutions.",
    "State the Orthodox response to the 'sister churches' language.",
  ],
  primarySources: [
    "Vatican II, Lumen Gentium (1964)",
    "Vatican II, Unitatis Redintegratio (1964)",
    "Vatican II, Sacrosanctum Concilium (1963)",
    "Vatican II, Dei Verbum (1965)",
  ],
  items: [
    {
      id: "rcc-v2-001",
      kind: "qa",
      difficulty: 3,
      tags: ["vatican-ii"],
      prompt:
        "Name the four constitutions of Vatican II and the one most directly addressing the Orthodox.",
      expectedAnswer:
        "(1) Lumen Gentium — on the Church. (2) Sacrosanctum Concilium — on the liturgy. (3) Dei Verbum — on divine revelation. (4) Gaudium et Spes — on the Church in the modern world. The most relevant for Orthodox-RC dialogue is Unitatis Redintegratio (Decree on Ecumenism, 1964), which speaks of the Orthodox as 'sister Churches' with valid sacraments and apostolic succession.",
      citations: [
        { source: "Vatican II, Unitatis Redintegratio (1964), §14–18" },
      ],
    },
  ],
};

export const marianDogmas: Topic = {
  id: "later-marian-dogmas",
  title: "Marian Dogmas (1854, 1950, & Co-Redemptrix)",
  summary:
    "Two universally binding Marian dogmas defined unilaterally by the Roman See: the Immaculate Conception (1854) and the bodily Assumption (1950). Plus the current campaign for a 'Co-Redemptrix' dogma. The Orthodox confess the realities differently in some, and reject the dogmatic definitions in all.",
  learningObjectives: [
    "Date both definitions.",
    "Distinguish the Orthodox Dormition from the Roman Assumption dogma.",
  ],
  primarySources: [
    "Pius IX, Ineffabilis Deus (1854)",
    "Pius XII, Munificentissimus Deus (1950)",
    "Various Marian sermons of John of Damascus, Andrew of Crete, Germanus of Constantinople on the Dormition",
  ],
  items: [
    {
      id: "rcc-md-001",
      kind: "debate",
      difficulty: 4,
      tags: ["mariology", "assumption", "dormition"],
      opponentTradition: "RCC",
      opponentClaim:
        "Mary was bodily assumed into heaven (Pius XII, Munificentissimus Deus, 1950). The Orthodox Dormition icons clearly show this; we agree on the substance.",
      orthodoxRebuttal:
        "On the substance — that Mary was glorified bodily and is now with her Son — we may indeed agree. But on the DOGMATIC status of the question, we disagree sharply. The Roman 1950 definition uses words that mean 'we declare and define as a divinely revealed dogma that the Immaculate Mother of God, Mary ever-virgin, having completed the course of her earthly life, was assumed body and soul into heavenly glory.' Three Orthodox concerns: (1) This was defined unilaterally by the Pope outside any Ecumenical Council. (2) It was promulgated against the explicit Orthodox tradition that an Ecumenical Council is the form of dogmatic definition. (3) The deliberate ambiguity of 'having completed the course of her earthly life' (so as not to commit to whether she died) departs from the unanimous Eastern tradition that Mary truly died and was raised. Orthodox icons of the Dormition show her body laid out and her soul (a small infant figure) carried by Christ — clearly depicting a true death followed by resurrection. The Orthodox confession remains: she fell asleep, was raised by her Son, and now reigns with Him — but this is a glorious feast, not a juridically defined dogma.",
      citations: [
        { source: "Pius XII, Munificentissimus Deus (1950), §44" },
        { source: "St. John of Damascus, Three Homilies on the Dormition" },
        { source: "Orthodox Festal Menaion, August 15" },
      ],
    },
  ],
};

export const papalInfallibilityDeep: Topic = {
  id: "papal-infallibility-deep",
  title: "Papal Infallibility — Historical Test Cases",
  summary:
    "Beyond Honorius — additional historical Popes whose teachings are problematic for Vatican I's claims: Liberius (Arianizing), Vigilius (vacillating on Three Chapters), Pope Stephen VI (Cadaver Synod), and the schism of antipopes.",
  learningObjectives: [
    "Cite three additional 'difficult' papacies.",
    "Recognize that Catholic apologetics qualifies infallibility heavily (ex cathedra criteria).",
  ],
  primarySources: [
    "Vatican I, Pastor Aeternus (1870)",
    "Acts of Constantinople II (553)",
    "Hefele, History of the Councils",
  ],
  items: [
    {
      id: "rcc-pi-001",
      kind: "mcq",
      difficulty: 5,
      tags: ["papal-infallibility", "liberius"],
      prompt:
        "Which 4th-century Pope, under imperial pressure, is reported by St. Athanasius and St. Hilary to have subscribed to a semi-Arian formula?",
      choices: [
        { id: "a", text: "Damasus" },
        { id: "b", text: "Liberius", rationale: "Correct — c. 357. The case is contested in Catholic apologetics, but the patristic witnesses (Athanasius, History of the Arians; Hilary, fragments) record his lapse." },
        { id: "c", text: "Sylvester" },
        { id: "d", text: "Julius" },
      ],
      correctChoiceId: "b",
      citations: [
        { source: "St. Athanasius, History of the Arians 41" },
        { source: "St. Hilary of Poitiers, Fragments (Liber I contra Constantium)" },
      ],
    },
  ],
};
