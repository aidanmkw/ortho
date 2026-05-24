import type { Topic } from "@/lib/types";

export const anglicanism: Topic = {
  id: "anglicanism",
  title: "Anglicanism",
  summary:
    "Cranmer, Henry VIII's break with Rome, the 39 Articles (1571), the Book of Common Prayer, the Oxford Movement, modern fragmentation (TEC, ACNA, Continuing Anglicans). The 'via media' claim and the Orthodox response.",
  learningObjectives: [
    "Date the 39 Articles.",
    "Refute the 'via media' between Rome and Geneva from an Orthodox vantage.",
    "Note the 1896 Apostolicae Curae and Anglo-Orthodox dialogues.",
  ],
  primarySources: [
    "39 Articles of Religion (1571)",
    "Book of Common Prayer (1662)",
    "Apostolicae Curae (Leo XIII, 1896) — Roman judgment",
    "Dublin Agreed Statement (Anglican-Orthodox, 1984)",
  ],
  items: [
    {
      id: "prot-ang-001",
      kind: "qa",
      difficulty: 3,
      tags: ["anglican", "39-articles"],
      prompt:
        "What is the canonical doctrinal standard of the Church of England, and when was it adopted in its current form?",
      expectedAnswer:
        "The Thirty-Nine Articles of Religion, adopted in 1571 under Elizabeth I. They are Reformed in tone (e.g., Article XXII condemns purgatory and the invocation of saints), but allow Anglo-Catholic readings in places. Modern Anglican provinces vary widely in their commitment to them.",
      citations: [
        { source: "39 Articles of Religion (1571)" },
        { source: "Article XXII — Of Purgatory" },
        { source: "Article XIX — Of the Church" },
      ],
    },
    {
      id: "prot-ang-002",
      kind: "debate",
      difficulty: 4,
      tags: ["anglican", "via-media"],
      opponentTradition: "Anglican",
      opponentClaim:
        "The Anglican Church is the via media — the middle way between Roman Catholic excess and Protestant reductionism. We have apostolic succession, the sacraments, and the creeds, without the Pope.",
      orthodoxRebuttal:
        "Three answers. (1) The 'via media' is between two recent Western confessions (Rome and Geneva), not between the patristic catholic faith and the Reformation. The middle of two errors is not the truth. (2) Anglican apostolic succession was declared 'absolutely null and utterly void' by Rome in 1896 (Apostolicae Curae) on the grounds that the form and intention of the Edwardian Ordinal (1552) did not preserve the sacrificing-priestly understanding. The Orthodox judgment is more nuanced: economic recognition has been discussed in dialogue (Cyprian-Constantinople line), but never formally extended. The 1976 Anglican ordination of women, and the subsequent acceptance of homosexual unions in many provinces, has put real apostolic continuity beyond serious discussion in most quarters. (3) The historical Anglican appeal to the Fathers (Lancelot Andrewes, Pearson, Bull, Newman pre-1845) repeatedly led its honest students to Rome (Newman 1845) or to Orthodoxy (Overbeck 1869, Allatius). The via media collapses in practice toward one of the two poles when held seriously.",
      rejoinders: [
        {
          objection: "What about the Caroline Divines — Andrewes, Laud, Taylor?",
          reply:
            "They were learned and pious men, and many of their writings are read with profit. But they themselves did not produce a stable theological consensus binding on subsequent Anglicans — modern Anglicanism includes evangelicals who repudiate their sacramentology, liberals who repudiate their dogma, and Anglo-Catholics who emulate them. The unity they sought was never institutionalized.",
        },
      ],
      citations: [
        { source: "Leo XIII, Apostolicae Curae (1896)" },
        { source: "Newman, Essay on the Development of Christian Doctrine (1845)" },
        { source: "Dublin Agreed Statement (Anglican-Orthodox, 1984)" },
      ],
    },
  ],
};

export const methodist: Topic = {
  id: "methodist",
  title: "Methodism / Wesleyanism",
  summary:
    "John & Charles Wesley, the rise of Methodism, prevenient grace, the 'second blessing' of entire sanctification. Areas of partial contact with Orthodox synergy.",
  learningObjectives: [
    "Identify the founding figures and dates.",
    "Compare Wesleyan prevenient grace with Orthodox synergy.",
  ],
  primarySources: [
    "John Wesley, 44 Standard Sermons",
    "Articles of Religion (1784) — abridged from the 39",
    "Wesley, A Plain Account of Christian Perfection",
  ],
  items: [
    {
      id: "prot-meth-001",
      kind: "qa",
      difficulty: 3,
      tags: ["methodist", "wesley"],
      prompt:
        "How does Wesleyan 'prevenient grace' overlap with and differ from the Orthodox doctrine of synergy?",
      expectedAnswer:
        "Wesleyan prevenient grace is the universal grace by which God enables the fallen human will to respond freely to the Gospel — a real point of contact with the Orthodox confession that grace and freedom cooperate (synergeia) in salvation. The difference: Wesleyan theology operates within a juridical-imputed framework (sanctification is a distinct second work of grace after a forensic justification), while Orthodox synergy operates within an ontological-participation framework (salvation IS the lifelong deification of the whole person, with justification and sanctification not as two acts but as two aspects of one continuous union with Christ).",
      citations: [
        { source: "John Wesley, On Working Out Our Own Salvation (Sermon 85)" },
        { source: "Wesley, A Plain Account of Christian Perfection (1766)" },
        { source: "Philippians 2:12–13" },
      ],
    },
  ],
};
