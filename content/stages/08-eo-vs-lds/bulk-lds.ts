import type { Topic } from "@/lib/types";

export const witnessesOfBoM: Topic = {
  id: "book-of-mormon-witnesses",
  title: "The Three and Eight Witnesses",
  summary: "Joseph Smith's witnesses to the gold plates of the Book of Mormon — and their later histories.",
  learningObjectives: ["Name the principal witnesses.", "Note their later distance from the LDS Church."],
  primarySources: ["Book of Mormon, 'Testimony of Three Witnesses' and 'Testimony of Eight Witnesses'"],
  items: [
    {
      id: "lds-wit-001",
      kind: "qa",
      difficulty: 4,
      tags: ["book-of-mormon", "witnesses"],
      prompt: "Who are the Three Witnesses to the Book of Mormon, and what later happened to two of them?",
      expectedAnswer: "Oliver Cowdery, David Whitmer, and Martin Harris. All three later left the LDS Church and were excommunicated or formally separated in the 1830s; Cowdery and Harris later rejoined; Whitmer never did and explicitly disclaimed the LDS authority structure. David Whitmer published 'An Address to All Believers in Christ' (1887) explaining his rejection of Joseph Smith's later doctrines. None of the three ever denied the original visionary experience itself, but their relations with Smith and the Church soured profoundly.",
      citations: [
        { source: "David Whitmer, An Address to All Believers in Christ (Richmond, MO, 1887)" },
        { source: "Joseph Smith Papers — letters and minutes of the 1837-38 excommunications" },
      ],
    },
  ],
};

export const adamGod: Topic = {
  id: "adam-god",
  title: "Brigham Young's Adam-God Doctrine",
  summary: "Brigham Young's repeated teaching (1852-1877) that Adam is 'our Father and our God, and the only God with whom we have to do.' Now disavowed by the LDS Church but well-documented in Journal of Discourses.",
  learningObjectives: ["Cite Journal of Discourses 1.50.", "Note the modern LDS disavowal."],
  primarySources: ["Brigham Young, Journal of Discourses 1.50 (1852); 4.218 (1857)"],
  items: [
    {
      id: "lds-ag-001",
      kind: "qa",
      difficulty: 5,
      tags: ["adam-god", "brigham-young"],
      prompt: "What is the Adam-God doctrine, and who taught it?",
      expectedAnswer: "Brigham Young taught from 1852 onward that Adam is our Father in heaven and the only God with whom we have to do (Journal of Discourses 1:50). He repeated this in multiple sermons through 1877. Modern LDS apologetics has classified this as Young's 'personal speculation' rather than official doctrine. Critics observe that Young was Prophet, Seer, and Revelator, taught this from the pulpit in General Conference, and instructed missionaries to teach it. The current LDS position (Bruce R. McConkie, 1980 talk) rejects the doctrine; this puts the modern Church in tension with the canonical principle of prophetic infallibility.",
      citations: [
        { source: "Brigham Young, Journal of Discourses 1:50 (9 April 1852)" },
        { source: "Bruce R. McConkie, 'The Seven Deadly Heresies' (BYU, 1 June 1980)" },
      ],
    },
  ],
};

export const moroniPromise: Topic = {
  id: "moroni-promise",
  title: "Moroni's Promise (Moroni 10:4-5)",
  summary: "The LDS missionary's challenge: 'Pray, and the Spirit will tell you the Book of Mormon is true.' The Orthodox: feelings are not the test of truth; the documentary, historical, and theological record is.",
  learningObjectives: ["State why feelings are not the rule of faith.", "Cite Galatians 1:8 and 1 John 4:1."],
  primarySources: ["Moroni 10:4-5 (Book of Mormon)", "Galatians 1:8; 1 John 4:1"],
  items: [
    {
      id: "lds-mp-001",
      kind: "debate",
      difficulty: 4,
      tags: ["moroni-promise", "epistemology"],
      opponentTradition: "LDS",
      opponentClaim: "Pray about the Book of Mormon (Moroni 10:4-5). If you ask in faith, the Holy Ghost will testify to you that it is true. The 'burning in the bosom' is the answer.",
      orthodoxRebuttal: "Feelings — however sincere — are not the rule of faith. (1) Galatians 1:8 — 'Though we, or an angel from heaven, preach any other gospel unto you than that which we have preached unto you, let him be accursed.' The test is the deposit, not the experience. (2) 1 John 4:1 — 'Try the spirits whether they are of God.' We are commanded to test, not merely to feel. (3) Devout Muslims feel the Spirit testify to the Quran. Devout Hindus feel it testify to the Gita. Feelings cannot adjudicate between contradictory truth-claims. (4) The Orthodox confession: the Holy Spirit indeed leads the Church into all truth (Jn 16:13) — but historically, conciliarly, through the apostolic deposit. Not through a private feeling that bypasses the historical Church. We test the Book of Mormon by what it claims happened in history (and find no archaeological corroboration) and by what it teaches about God (a different God from the One God confessed at Nicaea). Both tests fail before we ever get to the prayer.",
      citations: [
        { source: "Moroni 10:4-5 (for the LDS claim)" },
        { source: "Galatians 1:8-9; 1 John 4:1; 2 Corinthians 11:13-14" },
      ],
    },
  ],
};

export const continuingRevelation: Topic = {
  id: "continuing-revelation",
  title: "Continuing Revelation & Prophetic Contradictions",
  summary: "The LDS doctrine of ongoing revelation through the prophet has produced doctrinal reversals — Adam-God, the priesthood ban, plural marriage, etc. The Orthodox confess revelation closed with the Apostles; subsequent teaching unfolds the deposit without contradicting it.",
  learningObjectives: ["State Jude 3 on the once-for-all delivered faith.", "List three reversed LDS doctrines."],
  primarySources: ["Jude 3", "LDS Gospel Topics Essays (2013-2014)"],
  items: [
    {
      id: "lds-cr-001",
      kind: "qa",
      difficulty: 4,
      tags: ["continuing-revelation"],
      prompt: "List three doctrines once authoritatively taught by LDS prophets that the modern LDS Church has reversed or repudiated.",
      expectedAnswer: "(1) The Adam-God doctrine (Brigham Young, 1852-77; now classified as 'personal speculation'). (2) The black priesthood ban (1852-1978; the 2013 Gospel Topics Essay disavows the theological justifications). (3) Plural marriage as eternal principle (the 1890 Manifesto and the second manifesto of 1904 ended the practice, though it remains in D&C 132 as scripture). Additional candidates: blood atonement (Brigham Young); the gathering to a literal Jerusalem of the Old Testament saints. The pattern of reversal is doctrinally significant because it conflicts with the LDS claim that the Prophet's revelations are binding.",
      citations: [
        { source: "Jude 3 — 'the faith once for all delivered to the saints'" },
        { source: "LDS Gospel Topics Essays: 'Race and the Priesthood' (2013); 'Plural Marriage in Kirtland and Nauvoo' (2014)" },
      ],
    },
  ],
};

export const baptismDead: Topic = {
  id: "baptism-for-dead",
  title: "Baptism for the Dead (1 Cor 15:29)",
  summary: "The LDS practice of proxy baptism for deceased ancestors, justified from 1 Cor 15:29. The patristic reading of this difficult verse.",
  learningObjectives: ["Cite Chrysostom's Homily 40 on 1 Cor.", "Identify Marcion's heretical practice as the historical background."],
  primarySources: ["1 Corinthians 15:29", "John Chrysostom, Homily 40 on 1 Corinthians", "Tertullian, Against Marcion 5"],
  items: [
    {
      id: "lds-bod-001",
      kind: "debate",
      difficulty: 5,
      tags: ["baptism-for-dead", "1-cor-15"],
      opponentTradition: "LDS",
      opponentClaim: "1 Corinthians 15:29 — 'Else what shall they do which are baptized for the dead, if the dead rise not at all?' — proves that early Christians baptized for the dead, as we do in our temples.",
      orthodoxRebuttal: "Three patristic points. (1) Chrysostom (Homily 40 on 1 Cor) reports that the practice 1 Cor 15:29 refers to was that of the MARCIONITES — a Gnostic sect Paul is not endorsing but referencing as ad hominem: 'You Marcionites baptize for the dead (a practice you have), but you also deny the resurrection — your own practice is incoherent without the doctrine you reject.' Paul is not commending the practice; he is using it argumentatively. (2) Tertullian, Against Marcion 5.10, gives the same reading. (3) NOWHERE else in Scripture, the Apostolic Fathers, the canons, or the patristic record is proxy baptism for the dead practiced or endorsed. If Paul were endorsing a sacramental practice for the dead, we would expect to see it instituted, prescribed, and continued — and we see no such thing in the Church's life. The verse remains difficult, but the patristic consensus excludes the LDS reading.",
      citations: [
        { source: "John Chrysostom, Homilies on 1 Corinthians 40.1-2" },
        { source: "Tertullian, Against Marcion 5.10" },
        { source: "1 Corinthians 15:29 (Greek)" },
      ],
    },
  ],
};

export const ldsHistoryProblems: Topic = {
  id: "lds-history-summary",
  title: "Documentary Problems in LDS Foundations",
  summary: "A summary index of the documented historical and textual problems in LDS foundations: the First Vision accounts, the Book of Mormon witnesses' later histories, the Joseph Smith Papyri, the Kinderhook plates, the 1832 vs. 1838 First Vision dates, etc.",
  learningObjectives: ["Recall the principal documented issues in summary form."],
  primarySources: ["Joseph Smith Papers (josephsmithpapers.org)", "LDS Gospel Topics Essays"],
  items: [
    {
      id: "lds-hist-001",
      kind: "qa",
      difficulty: 5,
      tags: ["lds-history", "summary"],
      prompt: "Summarize five documented historical problems in LDS foundations, each acknowledged in some form by the LDS Church's own Gospel Topics Essays.",
      expectedAnswer: "(1) Multiple, materially divergent First Vision accounts (1832, 1835, 1838, 1842) — 'First Vision Accounts' essay, 2013. (2) Joseph Smith Papyri identified by Egyptologists as standard funerary texts, not Abrahamic — 'Translation and Historicity of the Book of Abraham' essay, 2014. (3) Joseph Smith's polygamy and polyandry, including marriages to teens and to women already married to other living men — 'Plural Marriage' essays, 2013-14. (4) The black priesthood ban (1852-1978) and the disavowal of the theological reasons originally given — 'Race and the Priesthood' essay, 2013. (5) DNA evidence does not support Native American descent from the Lamanites — 'Book of Mormon and DNA Studies' essay, 2014. All five are documented by the LDS Church itself in essays published 2013-14.",
      citations: [
        { source: "LDS Gospel Topics Essays (published 2013-2014), all available at churchofjesuschrist.org" },
      ],
    },
  ],
};

export const exaltationDeep: Topic = {
  id: "exaltation-deep",
  title: "Exaltation — Doctrinal Details",
  summary: "The LDS doctrine of exaltation in detail: eternal progression, becoming gods, ruling one's own creations, the King Follett Discourse.",
  learningObjectives: ["Quote the King Follett Discourse on the nature of God."],
  primarySources: ["Joseph Smith, King Follett Discourse (April 7, 1844)", "D&C 132:19-20"],
  items: [
    {
      id: "lds-exd-001",
      kind: "identify-source",
      difficulty: 5,
      tags: ["king-follett", "exaltation"],
      prompt: "Identify the source: 'You have got to learn how to be Gods yourselves, and to be kings and priests to God, the same as all Gods have done before you, namely, by going from one small degree to another, and from a small capacity to a great one.'",
      choices: [
        { id: "a", text: "Brigham Young, Journal of Discourses 6" },
        { id: "b", text: "Joseph Smith, King Follett Discourse (7 April 1844)", rationale: "Correct. Delivered at the funeral of King Follett." },
        { id: "c", text: "Doctrine & Covenants 132" },
        { id: "d", text: "Pearl of Great Price, Book of Abraham 3" },
      ],
      correctChoiceId: "b",
      citations: [{ source: "Joseph Smith, King Follett Discourse, 7 April 1844 (recorded by William Clayton and others)" }],
    },
  ],
};
