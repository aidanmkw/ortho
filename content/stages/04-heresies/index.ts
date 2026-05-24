import type { Stage } from "@/lib/types";

export const stage04: Stage = {
  id: "04-heresies",
  order: 4,
  title: "Heresies",
  subtitle: "Every cardinal error the Church has refuted",
  description:
    "Gnosticism, Arianism, Nestorianism, Monothelitism, Iconoclasm, Pelagianism, Bogomilism, Filioquism, Barlaamism, and the modern controversies. Each heresy with its proposition, its refutation, and the council that condemned it.",
  rank: "Subdeacon",
  topics: [
    {
      id: "arianism",
      title: "Arianism",
      summary:
        "The teaching of Arius (~AD 318): that the Son is the highest of creatures but ontologically subordinate to the Father — 'there was a time when He was not.' Condemned at Nicaea (325) and Constantinople (381).",
      learningObjectives: [
        "Recite Arius's principal proposition.",
        "Quote the homoousios clause of the Symbol.",
        "Identify Athanasius as the principal opponent.",
      ],
      primarySources: [
        "Symbol of Faith of Nicaea (325)",
        "St. Athanasius, Orations Against the Arians I–III",
        "Acts of the Council of Nicaea",
      ],
      items: [
        {
          id: "her-ari-001",
          kind: "qa",
          difficulty: 2,
          tags: ["arius"],
          prompt:
            "What was the central proposition of Arius, and what Greek slogan summarized it?",
          expectedAnswer:
            "Arius taught that the Son is the first and highest of created beings, made out of nothing before time. The slogan: 'ēn pote hote ouk ēn' — 'there was [a time] when He was not.' Condemned by name at Nicaea 325.",
          citations: [
            { source: "Athanasius, De Synodis 15" },
            { source: "Symbol of Nicaea (325), final anathemas" },
          ],
        },
      ],
    },
    {
      id: "nestorianism",
      title: "Nestorianism",
      summary:
        "Refused the title Theotokos to the Virgin Mary, proposing instead Christotokos — implicitly dividing Christ into two persons. Condemned at Ephesus (431).",
      learningObjectives: [
        "Quote Cyril's first letter to Nestorius.",
        "Defend the title Theotokos.",
        "Name the council that condemned Nestorius and the year.",
      ],
      primarySources: [
        "St. Cyril of Alexandria, On the Unity of Christ; Letters to Nestorius",
        "Acts of the Council of Ephesus (431)",
      ],
      items: [
        {
          id: "her-nes-001",
          kind: "debate",
          difficulty: 4,
          tags: ["theotokos"],
          opponentTradition: "Reformed",
          opponentClaim:
            "Calling Mary 'Mother of God' is theologically dangerous — she is only the mother of His humanity, not of His divinity.",
          orthodoxRebuttal:
            "The title Theotokos (God-Bearer) is a Christological confession, not a Marian elevation. The Person born of Mary is the eternal Son of God; one cannot give birth to a 'nature' — one gives birth to a Person. Therefore Mary is the Mother of the Person of the Son, who is God. To deny her this title is to insert a hidden Nestorian division between the divine and human in Christ — to say there are 'two sons,' one divine and one human. Cyril's First Letter to Nestorius (430) and his anathemas were ratified at Ephesus (431) and Chalcedon (451). The earliest known prayer to Mary, Sub Tuum Praesidium (c. AD 250), already addresses her as Theotokos. This is the universal pre-Reformation confession — including Luther and Calvin (Calvin, Sermon on Luke 1:42–45).",
          rejoinders: [
            {
              objection: "But this seems to make Mary divine.",
              reply:
                "No — it confesses that the One she bore is divine. The honor is Christ's; the title denominates her relation to Him.",
            },
          ],
          citations: [
            { source: "Acts of Ephesus (431)" },
            { source: "Cyril, On the Unity of Christ" },
            { source: "Sub Tuum Praesidium, P. Rylands 470 (c. 250)" },
          ],
        },
      ],
    },
    {
      id: "iconoclasm",
      title: "Iconoclasm",
      summary:
        "The 8th–9th c. imperial movement to ban sacred images. Refuted by John of Damascus and Theodore the Studite; condemned at Nicaea II (787); finally overcome with the Triumph of Orthodoxy (843).",
      learningObjectives: [
        "Argue from the Incarnation to the legitimacy of icons.",
        "Distinguish veneration (proskynesis) from worship (latreia).",
        "Cite Nicaea II's definition.",
      ],
      primarySources: [
        "St. John of Damascus, Three Treatises on the Divine Images",
        "Acts of Nicaea II (787)",
        "St. Theodore the Studite, Antirrhetics",
      ],
      items: [
        {
          id: "her-icn-001",
          kind: "debate",
          difficulty: 5,
          tags: ["icons", "second-commandment", "protestant"],
          opponentTradition: "Reformed",
          opponentClaim:
            "Icons violate the Second Commandment — 'Thou shalt not make for thyself a graven image.' Orthodox veneration of icons is idolatry.",
          orthodoxRebuttal:
            "Four answers. (1) The same God who said 'make no graven image' also commanded Moses to make cherubim of gold for the Mercy Seat (Ex 25:18–22) and ordered embroidered cherubim into the Tabernacle veil (Ex 26:31). He also commanded the bronze serpent (Num 21:8–9). What is forbidden is images of false gods to be worshiped as gods — not images per se. (2) The Incarnation changes everything. John of Damascus: 'Of old, God the incorporeal and uncircumscribable was never depicted. But now, since God has appeared in the flesh and lived among men, I make an image of the God whom I see. I do not worship matter; I worship the Creator of matter who became matter for my sake.' To deny the icon is to deny the visibility of the Incarnate Word. (3) Veneration (proskynesis, honor) is sharply distinguished from worship (latreia, due to God alone). Nicaea II is explicit: 'The honor paid to the image passes to the prototype' (citing Basil, On the Holy Spirit 18.45). When we kiss the icon, we kiss not paint and wood but the person depicted. (4) Historically: the catacombs (2nd c.), Dura-Europos house church (~240), the Sinai encaustics — Christian image-making is documented in every era from the apostolic period forward. The 8th c. iconoclasm was an imperial-political innovation, defeated by the Church.",
          rejoinders: [
            {
              objection: "But the catacomb images are not 'icons of veneration.'",
              reply:
                "They include Christ, the Theotokos, Sts. Peter and Paul, prophets, scenes from the Gospel — placed in burial loculi where the dead were commemorated and prayers offered. The transition from 'image' to 'image of veneration' is not a corruption but a development of the existing practice.",
            },
            {
              objection: "Why kiss a picture? That's worship in any practical sense.",
              reply:
                "Greeting kisses are universal honoric gestures in Eastern culture — Paul commands a holy kiss five times in his epistles (Rom 16:16; 1 Cor 16:20; 2 Cor 13:12; 1 Th 5:26; 1 Pet 5:14). We kiss icons of Christ and saints exactly as we would embrace beloved kin. The act is honor, not worship.",
            },
          ],
          citations: [
            { source: "Exodus 25:18–22; 26:31; Numbers 21:8–9" },
            {
              source: "St. John of Damascus, On the Divine Images I.16",
              quote:
                "I do not worship matter; I worship the Creator of matter, who became matter for my sake.",
            },
            {
              source: "Definition of the Seventh Ecumenical Council, Nicaea II (787)",
              quote:
                "We define that the holy icons... be set forth in the holy churches of God... For the honor which is paid to the image passes on to that which the image represents.",
            },
            {
              source: "St. Basil the Great, On the Holy Spirit 18.45",
              quote: "The honor paid to the image passes to the prototype.",
            },
          ],
        },
      ],
    },
    {
      id: "filioquism",
      title: "Filioquism",
      summary:
        "The Latin addition of 'and the Son' (Filioque) to the Symbol's article on the Holy Spirit. A unilateral, post-Ephesine addition condemned by the Photian Council (879–880).",
      learningObjectives: [
        "State the conciliar reasons against the Filioque.",
        "Quote Photios.",
      ],
      primarySources: [
        "St. Photios the Great, Mystagogy of the Holy Spirit",
        "Acts of Constantinople 879–880",
        "St. Mark of Ephesus, writings against Florence",
      ],
      items: [
        {
          id: "her-fil-001",
          kind: "qa",
          difficulty: 4,
          tags: ["filioque", "photios"],
          prompt:
            "Which Father composed the principal Greek refutation of the Filioque, the Mystagogy of the Holy Spirit?",
          expectedAnswer:
            "St. Photios the Great, Patriarch of Constantinople (~AD 877). The work is the locus classicus of Orthodox pneumatology against the Latin addition.",
          citations: [
            { source: "St. Photios the Great, Mystagogy of the Holy Spirit (~AD 877)" },
          ],
        },
      ],
    },
  ],
};
