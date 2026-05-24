import type { Topic } from "@/lib/types";

export const moreScenarios: Topic = {
  id: "additional-scenarios",
  title: "Further Capstone Scenarios",
  summary:
    "More multi-turn debate exercises — Roman Catholic seminarian, Pentecostal pastor, Muslim apologist, secular agnostic, Anglo-Catholic, JW at the door.",
  learningObjectives: [
    "Maintain charity under varied apologetic pressures.",
    "Cite from memory in real-time.",
  ],
  primarySources: ["All prior stages."],
  items: [
    {
      id: "fin-003",
      kind: "debate",
      difficulty: 5,
      tags: ["capstone", "rcc"],
      opponentTradition: "RCC",
      opponentClaim:
        "A Catholic seminarian: 'The schism of 1054 is your fault. You broke from the See of Peter. Return home to the Church Christ founded on Peter.'",
      orthodoxRebuttal:
        "'Brother, I love you. Let me ask you three questions and answer each yourself: First — was Pope Honorius I, in 681, condemned by the Sixth Ecumenical Council as a heretic, by name, for monothelitism? Look at the Acts; the answer is yes. The Vatican I claim that the Pope is preserved from doctrinal error breaks on this single historical rock. Second — was the Filioque added to the Symbol of Faith without and against the consent of the East, in violation of canon 7 of Ephesus? Look at the conciliar canons; the answer is yes. Third — has Rome since 1054 added at least four further universally-binding dogmas without the East (the Immaculate Conception, papal infallibility, papal universal jurisdiction, the bodily Assumption)? Yes. So the question is not whether the East left Rome; it is whether Rome has stayed with the consensus of the seven Councils. We Orthodox have not changed; the marks of our Church are the marks of the Church of the seven Ecumenical Councils. If you find any one of these claims wrong, show me from the Acts of the Councils, and I will hear you out.'",
      citations: [
        { source: "Acts of Constantinople III (681), session 13 — Honorius condemnation" },
        { source: "Ephesus 431, canon 7" },
        { source: "Vatican I, Pastor Aeternus (1870)" },
        { source: "Pius IX, Ineffabilis Deus (1854)" },
        { source: "Pius XII, Munificentissimus Deus (1950)" },
      ],
    },
    {
      id: "fin-004",
      kind: "debate",
      difficulty: 5,
      tags: ["capstone", "muslim"],
      opponentTradition: "Islam",
      opponentClaim:
        "Allah is one. He cannot have a son in the sense you Christians claim, because that is shirk (associating partners with God). The Trinity is mathematically incoherent — one cannot be three.",
      orthodoxRebuttal:
        "'Peace be upon you. Three replies. First — the Christian confession is of ONE GOD, not three. The Symbol of Faith opens: I believe in ONE God, the Father Almighty. We confess that the one God is three Hypostases (Persons) of one essence — distinct in their personal relations, identical in being. We do NOT claim three gods. The objection treats Christian doctrine as if we were tritheists. We are not. Second — the Quran does engage Christianity in places (e.g. Surah 4:171, Surah 5:73) but its account of the Trinity (Father, Son, and Mary, in 5:116) does not match the Christian confession. Mary is not in the Trinity — never has been. The Quran addresses a heresy that was not the catholic Christian faith. Third — the begetting of the Son is eternal, not temporal. We do not say Allah took a wife and bore a son in the flesh. We confess that the eternal Word, who was always with God and was God (Jn 1:1), in the fullness of time took flesh from the Virgin Mary by the power of the Holy Spirit — for our salvation. There is no shirk because the Son is not 'another God' but the very Word and Wisdom of the one God. May I share what we read in our Gospels?'",
      citations: [
        { source: "Niceno-Constantinopolitan Symbol — opening clause" },
        { source: "Surah 5:116 (for context of the Quran's reading of Trinity)" },
        { source: "John 1:1–14; Hebrews 1:1–3" },
        { source: "St. John of Damascus, On Heresies §101 — De Haeresibus Ishmaelitarum (he was the first to write Christian theology in answer to the Saracens)" },
      ],
    },
    {
      id: "fin-005",
      kind: "debate",
      difficulty: 5,
      tags: ["capstone", "secular", "apologetics"],
      opponentTradition: "Secular",
      opponentClaim:
        "A friend: 'I'm not religious, but if I were, why would I pick Orthodoxy over the dozens of other branches of Christianity, let alone other religions?'",
      orthodoxRebuttal:
        "'Three things to consider. First, the documentary record. Christianity is unique among world religions in that its earliest community is documented by hundreds of writings within the first 250 years of its founding — Acts, the Pauline corpus, Clement, Ignatius, Polycarp, Justin, Irenaeus, Tertullian, Origen, Cyprian. That community is identifiable, continuous, hierarchical, sacramental, episcopal. Trace it forward without break to the present, and you arrive at the Orthodox Church (and at Rome up to 1054). Second, the doctrinal consensus of the seven Ecumenical Councils (325–787) is held only by the Orthodox in unbroken continuity. Rome added to it; Protestants subtracted; the East kept it. Third, the witness of the saints. If a religion's claim is empirically testable, this is one place to test it: does the lived life of the Church actually produce holiness? In the Orthodox tradition, twentieth-century saints — Paisios of Athos, Porphyrios, John Maximovitch, Nikolaj Velimirović, Justin Popović — testify under contemporary observation that what the Fathers said about theosis, prayer, fasting, asceticism, and the experience of the Holy Spirit is real and reproducible. The Orthodox Church is the laboratory in which the patristic faith is still being verified — by ordinary people, in our lifetimes. Come and see (Jn 1:46).'",
      citations: [
        { source: "John 1:46 — 'Come and see.'" },
        { source: "Hebrews 12:1 — 'so great a cloud of witnesses.'" },
        { source: "Conversation of St. Seraphim with Motovilov (1831)" },
      ],
    },
  ],
};
