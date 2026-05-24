import type { Topic } from "@/lib/types";

export const evolution: Topic = {
  id: "evolution-orthodoxy",
  title: "Evolution and Genesis",
  summary: "The Orthodox latitude on the days of creation: some Fathers read Genesis literally (Basil's Hexaemeron has been read both ways), others allegorically (Origen, Augustine). No conciliar definition binds Orthodox to young-earth literalism or to theistic evolution. The boundary is the rejection of pure materialism and the affirmation of Adam as a real first man.",
  learningObjectives: ["Note the Orthodox latitude.", "Identify both modern Orthodox positions."],
  primarySources: ["St. Basil, Hexaemeron", "Augustine, On the Literal Meaning of Genesis", "Fr. Seraphim Rose, Genesis, Creation and Early Man", "Fr. Andrew Louth, multiple essays"],
  items: [
    {
      id: "mod-evo-001",
      kind: "qa",
      difficulty: 4,
      tags: ["evolution", "genesis"],
      prompt: "What is the Orthodox position on Genesis 1 and biological evolution?",
      expectedAnswer: "There is no single binding Orthodox position. The boundary positions are: (1) Adam was a real first man, the source of all human descent; (2) creation is the free act of the Creator, not the inevitable product of impersonal matter. Within these, Orthodox writers range widely. Some (Fr. Seraphim Rose, Fr. Damascene Christensen) read Genesis 1 literally and reject biological evolution. Others (Fr. Andrew Louth, Met. Kallistos Ware) accept theistic evolution as compatible with Orthodox theological anthropology. No Ecumenical Council has spoken on the question; charity must reign in the discussion.",
      citations: [
        { source: "Fr. Seraphim Rose, Genesis, Creation and Early Man (Platina: St. Herman of Alaska Brotherhood, 2000)" },
        { source: "St. Basil the Great, Hexaemeron (~AD 378)" },
      ],
    },
  ],
};

export const sexualityMarriage: Topic = {
  id: "sexuality-marriage",
  title: "Sexuality and Marriage",
  summary: "The Orthodox confession of marriage as the sacramental union of one man and one woman, blessed by the Church; sexuality outside this is treated with pastoral compassion and clear truth.",
  learningObjectives: ["State the Orthodox position on marriage.", "Cite Matthew 19."],
  primarySources: ["Matthew 19; 1 Cor 6:9-11; 7:1-7", "Bases of the Social Concept of the ROC (2000), Part XII"],
  items: [
    {
      id: "mod-sex-001",
      kind: "qa",
      difficulty: 3,
      tags: ["marriage", "sexuality"],
      prompt: "What is the Orthodox understanding of marriage, and on what biblical-patristic basis?",
      expectedAnswer: "Marriage is the sacramental, lifelong union of one man and one woman, image of Christ's union with the Church (Eph 5:22-33). It is one of the seven mysteries. The Lord cites Genesis 2:24 in Mt 19:4-6: 'from the beginning of the creation God made them male and female... For this cause shall a man leave his father and mother, and cleave to his wife.' The Church accepts second marriages by economy after death or in some cases of divorce (the Penitential Canons of Basil); never blesses same-sex unions or polygamous unions. Pastoral compassion for persons does not change the doctrine of what marriage is.",
      citations: [
        { source: "Matthew 19:4-12; Ephesians 5:22-33; 1 Corinthians 6:9-11; 7:1-16" },
        { source: "Bases of the Social Concept of the Russian Orthodox Church (2000)" },
      ],
    },
  ],
};

export const ivf: Topic = {
  id: "ivf",
  title: "In Vitro Fertilization (IVF)",
  summary: "Most Orthodox jurisdictions have significant pastoral and theological concerns about IVF: the creation of multiple embryos most of whom are destroyed or frozen indefinitely, the theological status of the embryo as a person from conception, and the dissociation of procreation from the marital embrace.",
  learningObjectives: ["State the principal Orthodox concerns."],
  primarySources: ["Bases of the Social Concept of the Russian Orthodox Church (2000), Part XII.4"],
  items: [
    {
      id: "mod-ivf-001",
      kind: "qa",
      difficulty: 4,
      tags: ["ivf", "bioethics"],
      prompt: "What are the principal Orthodox concerns with in vitro fertilization?",
      expectedAnswer: "(1) The creation of multiple embryos, of whom several are typically destroyed, indefinitely frozen, or implanted with risk — when the Orthodox confess each human person as bearing the image of God from conception. (2) The dissociation of procreation from the marital act and the introduction of third parties (laboratory technicians, sometimes donors). (3) Pre-implantation genetic diagnosis used to discard embryos with disabilities. The 'Bases of the Social Concept of the Russian Orthodox Church' (2000, XII.4) opposes IVF that involves the destruction of embryos; opinions vary among Orthodox jurisdictions on the narrow case where only one embryo is created and transferred.",
      citations: [{ source: "Bases of the Social Concept of the Russian Orthodox Church (2000), Part XII.4" }],
    },
  ],
};

export const trueOrthodox: Topic = {
  id: "true-orthodox",
  title: "True Orthodox / Old Calendarist Movements",
  summary: "Various groups (Greek Old Calendarist GOC, Russian Catacomb Church, Romanian True Orthodox) that broke from World Orthodoxy over the 1923 calendar reform, ecumenism, or Sergianism. The principal Orthodox jurisdictions consider them schismatic.",
  learningObjectives: ["Identify the principal True Orthodox groups.", "State the principal Orthodox judgment."],
  primarySources: ["Various synodal documents (1965-present)"],
  items: [
    {
      id: "mod-to-001",
      kind: "qa",
      difficulty: 4,
      tags: ["true-orthodox", "old-calendar"],
      prompt: "Who are the 'True Orthodox' / Old Calendarist groups, and what is their relation to canonical Orthodoxy?",
      expectedAnswer: "Various groups that broke from their mother Churches over (a) the 1923 calendar reform (the Greek Old Calendarists since c. 1924), (b) Sergianism in Russia (the Catacomb Church from 1927), or (c) modern ecumenism (various Russian, Greek, Romanian groups from the 1960s). The principal Orthodox jurisdictions (Constantinople, Moscow, etc.) consider them schismatic. The True Orthodox in turn often regard the World Orthodox as 'compromised' or 'lapsed.' The internal Orthodox debate is intense and the dialogue partial; canonical communion is not established.",
      citations: [{ source: "Various encyclicals 1965-present" }],
    },
  ],
};

export const westernRite: Topic = {
  id: "western-rite",
  title: "Western Rite Orthodoxy",
  summary: "Small Orthodox communities (chiefly Antiochian and ROCOR) using a Western liturgical form (the Liturgy of St. Tikhon — a corrected Book of Common Prayer; or the Liturgy of St. Gregory — a corrected Roman Mass). Origin: J.J. Overbeck (1870), Tikhon Bellavin (early 20th c.).",
  learningObjectives: ["Identify the two Western-Rite liturgies.", "Note the Antiochian and ROCOR Vicariates."],
  primarySources: ["Overbeck, A Plain View of the Claims of the Orthodox Catholic Church (1881)"],
  items: [
    {
      id: "mod-wr-001",
      kind: "qa",
      difficulty: 4,
      tags: ["western-rite"],
      prompt: "What two principal liturgies are used in Orthodox Western Rite communities?",
      expectedAnswer: "(1) The Liturgy of St. Tikhon — a corrected form of the Anglican Book of Common Prayer (Communion service), incorporating the epiclesis and other Orthodox features. (2) The Liturgy of St. Gregory — a corrected form of the pre-Vatican II Roman Mass, similarly amended for Orthodox theology (epiclesis, calendar, etc.). The Antiochian Archdiocese (Western Rite Vicariate, est. 1958) and ROCOR (suspended its Western Rite communities in 2013) have been the principal sponsors.",
      citations: [
        { source: "Joseph Julian Overbeck, A Plain View of the Claims of the Orthodox Catholic Church (1881)" },
      ],
    },
  ],
};
