import type { Stage } from "@/lib/types";
import {
  constantinopleI,
  ephesus,
  photianCouncil,
  hesychastCouncils,
} from "./more-councils";
import {
  constII,
  trullan,
  robberCouncil,
  conciliarReception,
  localCouncils,
} from "./bulk-councils";
import { sevenCouncilsQuickRecall, synodicon } from "./extra-councils";
import { councilsDetail } from "./extra-2";
import { councilsFinalPack } from "./final-councils";

export const stage05: Stage = {
  id: "05-councils",
  order: 5,
  title: "The Ecumenical Councils",
  subtitle: "Seven councils, one Symbol, one mind",
  description:
    "The Seven Ecumenical Councils plus the Photian (879–80) and Hesychast (1341–51). Every dogmatic horizon of Orthodoxy is set here.",
  rank: "Deacon",
  topics: [
    {
      id: "nicaea-i",
      title: "Nicaea I (325)",
      summary:
        "Convoked by Constantine; 318 Fathers; condemned Arius; defined the Son as homoousios with the Father; first part of the Symbol of Faith; 20 canons; Pascha calculation.",
      learningObjectives: [
        "Quote the homoousios clause.",
        "Name the principal defenders of Nicaea against semi-Arianism.",
        "State the date and presiding role.",
      ],
      primarySources: [
        "Symbol of Nicaea (325)",
        "Athanasius, De Decretis Nicaenae Synodi",
        "Eusebius, Life of Constantine III.4–22",
      ],
      items: [
        {
          id: "co-ni1-001",
          kind: "qa",
          difficulty: 2,
          tags: ["nicaea", "homoousios"],
          prompt:
            "What single Greek word, defined at Nicaea (325), settled the divinity of the Son?",
          expectedAnswer:
            "ὁμοούσιος (homoousios) — 'of one essence' or 'consubstantial.' The Son is said to be 'of the essence of the Father... begotten not made, of one essence with the Father.'",
          citations: [
            { source: "Symbol of Nicaea (325)" },
          ],
        },
      ],
    },
    {
      id: "chalcedon",
      title: "Chalcedon (451)",
      summary:
        "Fourth Ecumenical Council; 630 Fathers; condemned Eutyches's monophysitism; defined the two natures of Christ 'unconfused, unchanged, undivided, inseparable.'",
      learningObjectives: [
        "Quote the four adverbs of Chalcedon.",
        "Identify the role of the Tome of Leo.",
        "Explain canon 28 on Constantinople's primacy.",
      ],
      primarySources: [
        "Definition of Chalcedon",
        "Tome of Leo (Pope Leo I, Letter 28 to Flavian)",
        "Acts of Chalcedon",
      ],
      items: [
        {
          id: "co-cha-001",
          kind: "identify-source",
          difficulty: 3,
          tags: ["chalcedon", "two-natures"],
          prompt:
            "From what document: 'one and the same Christ... acknowledged in two natures, without confusion, without change, without division, without separation'?",
          choices: [
            { id: "a", text: "Tome of Leo" },
            { id: "b", text: "The Definition of Chalcedon (451)", rationale: "Correct." },
            { id: "c", text: "Cyril's Twelve Anathemas" },
            { id: "d", text: "Constantinople I Symbol" },
          ],
          correctChoiceId: "b",
          citations: [
            {
              source: "Definition of Chalcedon (451)",
              quote:
                "We confess one and the same Lord Jesus Christ, the Only-Begotten, to be acknowledged in two natures, inconfusedly, unchangeably, indivisibly, inseparably; the distinction of natures being by no means taken away by the union, but rather the property of each nature being preserved and concurring in one Person and one Subsistence...",
            },
          ],
        },
      ],
    },
    {
      id: "constantinople-iii",
      title: "Constantinople III (680–681)",
      summary:
        "Sixth Ecumenical Council; condemned monothelitism and monoenergism; defined that Christ has two wills and two operations, corresponding to His two natures. Condemned Pope Honorius by name.",
      learningObjectives: [
        "State the doctrine of dyothelitism.",
        "Note the conciliar condemnation of Pope Honorius.",
        "Tie this council to St. Maximus the Confessor.",
      ],
      primarySources: [
        "Acts of Constantinople III",
        "St. Maximus the Confessor, Disputation with Pyrrhus",
      ],
      items: [
        {
          id: "co-c3-001",
          kind: "debate",
          difficulty: 5,
          tags: ["papal-infallibility", "honorius", "rcc"],
          opponentTradition: "RCC",
          opponentClaim:
            "The Pope, when speaking ex cathedra on faith and morals, is preserved from error (Vatican I, 1870, Pastor Aeternus). The Orthodox have no such guarantee of unity.",
          orthodoxRebuttal:
            "The Sixth Ecumenical Council (681) by its own conciliar definition anathematized Pope Honorius I by name for the heresy of monothelitism. The Acts (sessions 13, 16) declare: 'We anathematize Sergius, Cyrus, Honorius — to whom we adjudge the like punishment with these heretics.' Honorius wrote two letters to Sergius affirming 'one will' in Christ. This is a doctrinal letter on a question of faith, addressed by a Pope to a Patriarch — by Vatican I's own criteria, the kind of utterance to which infallibility supposedly applies. A pope who taught heresy on a Christological question was conciliarly condemned by all the ancient patriarchates, including Rome itself in the person of Pope Leo II who confirmed the council. This single historical fact disproves the dogmatic claim of Vatican I. Orthodoxy holds, on the contrary, that the Holy Spirit guides the Church in council and in reception by the whole Body, not in any single see.",
          rejoinders: [
            {
              objection: "Honorius spoke privately, not ex cathedra.",
              reply:
                "A formal papal letter from the Apostolic See to the Patriarch of Constantinople on a Christological question, in answer to a request for doctrinal guidance, meets every ordinary criterion for an ex cathedra statement. Roman Catholic historians (Hefele, Döllinger) have admitted this is the great difficulty. The Acts of Constantinople III (681), session 13, are explicit: 'We anathematize Sergius, the one-time bishop of this God-protected royal city — and with these we likewise determine that there be expelled from the holy Church of God and anathematized Honorius, who was Pope of Elder Rome.'",
            },
          ],
          citations: [
            {
              source: "Acts of the Sixth Ecumenical Council (681), Session 13",
              quote:
                "Honorius, who was Pope of Elder Rome — we likewise expel from the holy Church of God and anathematize, having found from his letter to Sergius that he followed his opinions in all things and confirmed his impious doctrines.",
            },
            {
              source: "Pope Leo II, Letter to Emperor Constantine IV (682) — confirming the Council",
              quote:
                "Honorius, who did not, as became the apostolic authority, extinguish the flame of heretical doctrine in its very beginning, but fostered it by his negligence.",
            },
            { source: "Vatican I, Pastor Aeternus (1870) — for the comparison" },
          ],
        },
      ],
    },
    constantinopleI,
    ephesus,
    photianCouncil,
    hesychastCouncils,
    constII,
    trullan,
    robberCouncil,
    conciliarReception,
    localCouncils,
    sevenCouncilsQuickRecall,
    synodicon,
    councilsDetail,
    councilsFinalPack,
  ],
};
