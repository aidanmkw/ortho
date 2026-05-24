import type { Topic } from "@/lib/types";

export const sacramentNumber: Topic = {
  id: "seven-sacraments",
  title: "The Number of Sacraments — East and West",
  summary: "Both East and West settled on seven, but the East has always treated the number as conventional rather than dogmatic, and includes 'sacramentals' (blessings, monastic tonsure) in a continuum of sacramental life.",
  learningObjectives: ["State the seven.", "Note the Eastern flexibility."],
  primarySources: ["Confession of Dositheus (1672), Decree 15"],
  items: [
    {
      id: "rcc-sa-001",
      kind: "qa",
      difficulty: 3,
      tags: ["seven-sacraments", "east-west"],
      prompt: "Does the Orthodox Church dogmatically define the number of sacraments as seven?",
      expectedAnswer: "Yes, in confessional documents (Confession of Dositheus 1672, Decree 15) Orthodoxy follows the enumeration of seven — Baptism, Chrismation, Eucharist, Confession, Holy Unction, Marriage, Ordination — for catechetical and ecumenical purposes. But the East has historically treated the count as conventional rather than absolutely dogmatic, and recognizes a wider continuum of sacramental life including monastic tonsure, the blessing of waters, the great schema, and other 'sacramentals.' The Latin scholastic precision on the boundary between sacrament and sacramental is not characteristic of the Greek Fathers.",
      citations: [{ source: "Confession of Dositheus (1672), Decree 15" }],
    },
  ],
};

export const indulgencesHistory: Topic = {
  id: "indulgences-history",
  title: "Indulgences — Tetzel and the 95 Theses",
  summary: "The selling of indulgences by Johann Tetzel in Germany (1517) to finance St. Peter's basilica in Rome triggered Luther's 95 Theses. Trent (1563) reformed but did not abolish the practice.",
  learningObjectives: ["Date Tetzel and the 95 Theses.", "Note Trent's reform."],
  primarySources: ["Luther, Disputatio pro declaratione virtutis indulgentiarum (95 Theses), 31 October 1517"],
  items: [
    {
      id: "rcc-ih-001",
      kind: "qa",
      difficulty: 3,
      tags: ["indulgences", "tetzel"],
      prompt: "What specific occasion sparked Luther to post his 95 Theses, and on what date?",
      expectedAnswer: "Johann Tetzel was preaching plenary indulgences in Germany (1517) on behalf of Albert of Mainz, with proceeds going partly to the construction of St. Peter's Basilica in Rome. His marketing slogans included 'When a coin in the coffer rings, a soul from purgatory springs.' Luther posted his 95 Theses on October 31, 1517, attacking the abuse. The dispute escalated through the next four years into the formal break with Rome.",
      citations: [{ source: "Luther, 95 Theses (31 October 1517)" }],
    },
  ],
};

export const papalElection: Topic = {
  id: "papal-election",
  title: "Papal Election & Modern Procedures",
  summary: "The College of Cardinals (instituted 1059) elects the Pope. Universi Dominici Gregis (1996) governs procedure. The Orthodox: no equivalent — patriarchs are elected by their own synods.",
  learningObjectives: ["State the basic procedure.", "Contrast with Orthodox patriarchal elections."],
  primarySources: ["John Paul II, Universi Dominici Gregis (1996)"],
  items: [
    {
      id: "rcc-pe-001",
      kind: "qa",
      difficulty: 3,
      tags: ["papal-election"],
      prompt: "How are Popes elected today, and how does this differ from Orthodox patriarchal elections?",
      expectedAnswer: "Popes are elected by the College of Cardinals (cardinals under 80) in conclave (sealed-room sequestration), by two-thirds majority. The college is appointed by previous popes from clergy worldwide. The Orthodox: each autocephalous Church has its own Holy Synod that elects its primate (patriarch, archbishop, metropolitan). Procedures vary; commonly the synod selects a slate and the final choice is by vote or lot. The Constantinopolitan synod under the Ottoman millet system also involved laity (the Holy and Sacred Synod plus a Mixed Council). Authority in Orthodoxy resides in the synod, not in a single see.",
      citations: [
        { source: "John Paul II, Universi Dominici Gregis (1996)" },
        { source: "Various synodal canons of the autocephalous Churches" },
      ],
    },
  ],
};

export const papalApologies: Topic = {
  id: "papal-apologies",
  title: "John Paul II's 1990s Apologies",
  summary: "Pope John Paul II issued multiple apologies during his pontificate (1978-2005) for historical Catholic offenses: the sack of Constantinople (1204), the Crusades, the Inquisition, treatment of Galileo, anti-Judaism, and others. The 2001 visit to Athens included an apology for the 1204 sack to Archbishop Christodoulos.",
  learningObjectives: ["Note JPII's 2001 apology in Athens.", "Identify the principal historical offenses acknowledged."],
  primarySources: ["John Paul II, Address to Archbishop Christodoulos (4 May 2001, Athens)"],
  items: [
    {
      id: "rcc-apl-001",
      kind: "qa",
      difficulty: 3,
      tags: ["1204", "apology"],
      prompt: "What did Pope John Paul II apologize for to Archbishop Christodoulos of Athens in 2001?",
      expectedAnswer: "For the sack of Constantinople by Western (Frankish-Venetian) crusaders in 1204 — an event that the East has never forgotten and that crystallized the popular sense of separation from the West. JPII said the apology was made 'with the deep regret and shame for the events that took place in 1204... It is tragic that the assailants, who set out to secure free access for Christians to the Holy Land, turned against their own brothers in the faith.' Christodoulos called it 'a strong moral example.'",
      citations: [{ source: "Pope John Paul II, Address in Athens, 4 May 2001" }],
    },
  ],
};

export const limbo: Topic = {
  id: "limbo",
  title: "Limbo of Infants",
  summary: "A medieval Latin theological proposal that unbaptized infants enter a state of natural happiness but without the beatific vision — neither heaven nor hell. The Catholic Church's 2007 ITC document Hope of Salvation for Infants Who Die Without Being Baptized effectively retired the doctrine.",
  learningObjectives: ["State the limbo doctrine.", "Note 2007's quiet retirement."],
  primarySources: ["International Theological Commission, The Hope of Salvation for Infants Who Die Without Being Baptized (2007)"],
  items: [
    {
      id: "rcc-lim-001",
      kind: "qa",
      difficulty: 4,
      tags: ["limbo"],
      prompt: "What was 'limbo of infants,' and what is its current Roman Catholic standing?",
      expectedAnswer: "A medieval Latin theological proposal (Aquinas, Bellarmine, etc.) — never dogmatically defined, but widely taught — that unbaptized infants enter a state of 'natural happiness' but without the beatific vision, due to original sin not yet remitted by baptism. The 2007 International Theological Commission document Hope of Salvation for Infants Who Die Without Being Baptized concluded there are 'serious theological and liturgical grounds' for hope of their salvation, effectively retiring limbo as a teaching. The Orthodox have never taught limbo — without the doctrine of inherited guilt, the entire theological problem does not arise.",
      citations: [{ source: "ITC, Hope of Salvation for Infants Who Die Without Being Baptized (2007)" }],
    },
  ],
};
