import type { Stage } from "@/lib/types";

export const stage09: Stage = {
  id: "09-dogma",
  order: 9,
  title: "Dogma",
  subtitle: "The Symbol unfolded in detail",
  description:
    "Triadology, Christology, Pneumatology, Mariology, Soteriology, Ecclesiology, Eschatology, Sacramentology, Anthropology — each dogma defined precisely, with patristic, conciliar, and scriptural anchors.",
  rank: "Archpriest",
  topics: [
    {
      id: "mariology",
      title: "Mariology",
      summary:
        "Theotokos, Aeiparthenos, Panagia. The Orthodox Marian confession: rejection of both Protestant minimalism and the Roman Immaculate Conception.",
      learningObjectives: [
        "Defend the title Theotokos.",
        "Defend the perpetual virginity.",
        "Distinguish the Dormition from the Roman 'Bodily Assumption' dogma (1950).",
        "Explain why Orthodox rejects the Immaculate Conception.",
      ],
      primarySources: [
        "Acts of Ephesus (431)",
        "St. John of Damascus, Homilies on the Dormition",
        "Constantinople II (553) — Aeiparthenos in conciliar acts",
        "Sub Tuum Praesidium (P. Rylands 470, c. 250)",
      ],
      items: [
        {
          id: "dog-mar-001",
          kind: "debate",
          difficulty: 4,
          tags: ["perpetual-virginity"],
          opponentTradition: "Reformed",
          opponentClaim:
            "Mary had other children with Joseph after Jesus — the Gospels speak of Jesus' 'brothers' (e.g. Mt 13:55). She was not a perpetual virgin.",
          orthodoxRebuttal:
            "Three answers. (1) The Greek 'adelphos' has a wider semantic range than the English 'brother.' In the LXX, Lot is called Abraham's 'adelphos' (Gen 14:14), though he is his nephew. Cousins, kin, half-siblings, close associates are all called 'adelphoi.' Hebrew has no separate word for cousin; both Hebrew and biblical Greek follow this. (2) The patristic identification of the brethren is consistent: they are either (a) children of Joseph by a previous marriage (the older tradition, Protoevangelium of James, Origen, Eusebius, Epiphanius), or (b) cousins through Mary's sister (Jerome's view). Either way, not children of the Virgin. (3) John 19:26–27 is decisive evidence against blood siblings. At the Cross, Jesus entrusts His mother to John the disciple. If Mary had other sons, this entrustment would be a public violation of the Torah's command of filial care (Ex 20:12) and would have created scandal. The act presupposes that she has no other living son. (4) Constantinople II (553) calls her 'Aeiparthenos' (Ever-Virgin) in its conciliar acts; the Lateran Synod of 649 confesses the same. Even the Reformers — Luther, Zwingli, Calvin — confessed the perpetual virginity. Calvin: 'I have never thought, much less expressed, the opinion that Mary lost her virginity, which is contrary to the Catholic faith' (Sermon on Mt 1).",
          rejoinders: [
            {
              objection:
                "But Matthew 1:25 says Joseph 'knew her not UNTIL she had brought forth her firstborn son.'",
              reply:
                "The Greek 'heos' (until) does not imply subsequent change. 2 Sam 6:23 says Michal had no children 'until' her death — but obviously not after. 1 Tim 4:13 says 'attend to reading, exhortation, and teaching UNTIL I come' — not that he should stop after. 'Until' marks the point relevant to the narrator's argument (Joseph's role in establishing Jesus's legitimacy), not necessarily a transition.",
            },
            {
              objection: "'Firstborn' implies later siblings.",
              reply:
                "Prōtotokos in biblical usage is a juridical-cultic term (Ex 13:2; Num 3:13) — it denotes opening the womb, with the rights and duties of the firstborn (consecration, redemption). It does not imply later children. The same Mary speaks of him as 'this child' singularly throughout.",
            },
          ],
          citations: [
            { source: "Genesis 14:14 (Lot called 'brother' of Abraham)" },
            {
              source: "Protoevangelium of James 9 (c. AD 145)",
              quote:
                "Joseph said, 'I have children, and I am an old man, but she is a young girl.'",
            },
            { source: "John 19:26–27; Exodus 20:12" },
            { source: "Acts of Constantinople II (553) — Aeiparthenos in formulas" },
          ],
        },
      ],
    },
  ],
};
