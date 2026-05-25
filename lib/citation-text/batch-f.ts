export type CitationQuote = {
  text: string;
  translation?: string;
  note?: string;
};

export const QUOTES_F: Record<string, CitationQuote> = {
  "Vatican II, Unitatis Redintegratio (1964), §14–18": {
    text: "For many centuries the Churches of the East and of the West each followed their separate ways though linked in a brotherly union of faith and sacramental life... These Churches, although separated from us, possess true sacraments, above all by apostolic succession, the priesthood and the Eucharist, whereby they are still joined to us in closest intimacy.",
    note: "Vatican II decree on ecumenism; §§14–18 treat relations with the Eastern Churches",
  },
  "Pius XII, Munificentissimus Deus (1950), §44": {
    text: "We pronounce, declare, and define it to be a divinely revealed dogma: that the Immaculate Mother of God, the ever Virgin Mary, having completed the course of her earthly life, was assumed body and soul into heavenly glory.",
    note: "Apostolic Constitution defining the dogma of the Assumption",
  },
  "Orthodox Festal Menaion, August 15": {
    text: "In giving birth thou didst preserve thy virginity; in thy dormition thou didst not forsake the world, O Theotokos. Thou wast translated unto life, since thou art the Mother of Life; and by thine intercessions dost thou deliver our souls from death.",
    note: "Apolytikion of the Dormition of the Theotokos, August 15",
  },
  "Confession of Dositheus (1672), Decree 15": {
    text: "We believe the Holy Eucharist... to be the true Body itself of the Lord, and the true Blood itself of the Lord, which was given for the life of the world... and after the consecration of the bread and of the wine, there no longer remaineth the substance of the bread and of the wine, but the Body Itself and the Blood of the Lord, under the species and form of bread and wine.",
    note: "Decree 15 affirms the real presence in the Eucharist (Synod of Jerusalem, 1672)",
  },
  "Luther, 95 Theses (31 October 1517)": {
    text: "When our Lord and Master Jesus Christ said, 'Repent', he willed the entire life of believers to be one of repentance.",
    note: "Thesis 1 of the 95 Theses attacking the sale of indulgences",
  },
  "Pope John Paul II, Address in Athens, 4 May 2001": {
    text: "For the occasions past and present, when sons and daughters of the Catholic Church have sinned by action or omission against their Orthodox brothers and sisters, may the Lord grant us the forgiveness we beg of him.",
    note: "Apology to the Orthodox during JPII's visit to Greece",
  },
  "ITC, Hope of Salvation for Infants Who Die Without Being Baptized (2007)": {
    text: "Our conclusion is that the many factors that we have considered... give serious theological and liturgical grounds for hope that unbaptized infants who die will be saved and enjoy the beatific vision.",
    note: "International Theological Commission document setting aside the traditional notion of limbo",
  },
  "Vatican biographical records": {
    text: "Official biographical and curial records maintained by the Holy See concerning popes, cardinals, and Vatican officials.",
    note: "general bibliographic reference",
  },
  "Vatican I, Pastor Aeternus (1870), Chapter 4": {
    text: "We teach and define as a divinely revealed dogma that when the Roman Pontiff speaks ex cathedra, that is, when, in the exercise of his office as shepherd and teacher of all Christians, in virtue of his supreme apostolic authority, he defines a doctrine concerning faith or morals to be held by the whole Church, he possesses, by the divine assistance promised to him in blessed Peter, that infallibility which the divine Redeemer willed his Church to enjoy.",
    note: "Defines papal infallibility (Vatican I, Pastor Aeternus, Ch. 4)",
  },
  "Pius X, Pascendi Dominici Gregis (1907); Lamentabili Sane Exitu (1907)": {
    text: "Pascendi condemns Modernism as 'the synthesis of all heresies'; Lamentabili (the 'Syllabus of Errors against Modernism') lists 65 condemned modernist propositions concerning Scripture, dogma, and Church authority.",
    note: "scholarly reference, summary",
  },
  "Balamand Statement (1993), §§ 12-13": {
    text: "On each side it is recognized that what Christ has entrusted to his Church — profession of apostolic faith, participation in the same sacraments, above all the one priesthood celebrating the one sacrifice of Christ, the apostolic succession of bishops — cannot be considered the exclusive property of one of our Churches. In this context it is clear that rebaptism must be avoided.",
    note: "Joint Catholic-Orthodox statement repudiating 'uniatism' as a method of union",
  },
  "Coverage in L'Osservatore Romano, October 1986; JPII, Address at Assisi, 27 Oct 1986": {
    text: "The fact that we have come to Assisi from various parts of the world is in itself a sign of this common path which humanity is called to tread... Either we learn to walk together in peace and harmony, or we drift apart and ruin ourselves and others.",
    note: "JPII's address at the 1986 Assisi World Day of Prayer for Peace",
  },
  "Mansi, Collectio Conciliorum — Toledo, Aachen documents": {
    text: "Documentary record of the Councils of Toledo (which added the Filioque to the Creed in Spain) and the Council of Aachen (809), which approved Frankish use of the Filioque despite papal hesitation.",
    note: "scholarly reference, summary",
  },
  "Catechism of the Catholic Church §§ 884-885": {
    text: "The college of bishops exercises power over the universal Church in a solemn manner in an ecumenical council. But there never is an ecumenical council which is not confirmed or at least recognized as such by Peter's successor. This college, in so far as it is composed of many members, is the expression of the variety and universality of the People of God; and of the unity of the flock of Christ, in so far as it is assembled under one head.",
    note: "CCC §§884-885 on the college of bishops",
  },
  "Habemus papam announcement, 13 March 2013": {
    text: "Annuntio vobis gaudium magnum: habemus Papam! Eminentissimum ac Reverendissimum Dominum, Dominum Georgium Marium, Sanctae Romanae Ecclesiae Cardinalem Bergoglio, qui sibi nomen imposuit Franciscum.",
    note: "Cardinal Tauran's formula announcing the election of Pope Francis",
  },
  "Vatican I, Pastor Aeternus (1870)": {
    text: "We teach and declare that, by the appointment of our Lord, the Roman Church possesses a sovereignty of ordinary power over all other Churches, and that this jurisdictional power of the Roman Pontiff is both episcopal and immediate.",
    note: "Defines papal primacy of jurisdiction and infallibility",
  },
  "Vatican II, Sacrosanctum Concilium (1963); Paul VI, Missale Romanum (1969)": {
    text: "The rite of the Mass is to be revised in such a way that the intrinsic nature and purpose of its several parts, as also the connection between them, may be more clearly manifested... The use of the Latin language is to be preserved in the Latin rites... But since the use of the mother tongue... frequently may be of great advantage to the people, the limits of its employment may be extended.",
    note: "Constitution on the Sacred Liturgy authorizing the reform that produced the 1969 Missal of Paul VI",
  },
  "Italian Unification (1870); Lateran Treaty (1929)": {
    text: "The Italian Risorgimento concluded with the capture of Rome on 20 September 1870, ending the temporal Papal States; the 1929 Lateran Treaty between the Holy See and the Kingdom of Italy established Vatican City as a sovereign state.",
    note: "historical reference",
  },
  "Catechism of the Catholic Church §§ 2678, 2708": {
    text: "§2678: Medieval piety in the West developed the prayer of the rosary as a popular substitute for the Liturgy of the Hours... §2708: Meditation engages thought, imagination, emotion, and desire. This mobilization of faculties is necessary in order to deepen our convictions of faith.",
    note: "CCC on Marian devotion and meditative prayer",
  },
  "Catechism of the Catholic Church § 2669; Margaret Mary Alacoque, Autobiography": {
    text: "CCC §2669: The prayer of the Church venerates and honors the Heart of Jesus just as it invokes his most holy name. Alacoque's Autobiography recounts the apparitions of the Sacred Heart of Jesus at Paray-le-Monial (1673–1675), which became the basis for the modern Sacred Heart devotion.",
    note: "Combined doctrinal and biographical reference",
  },
  "Bonaventure, Major Life of St. Francis 13": {
    text: "Suddenly he saw a vision of a Seraph with six fiery and shining wings descending from the height of heaven... When the vision had disappeared, it left in his heart a marvelous fire and imprinted on his flesh a likeness of signs no less marvelous. For straightway there began to appear in his hands and feet the marks of the nails.",
    note: "Legenda Maior 13.3, on the stigmatization of Francis at La Verna",
  },
  "Lucia dos Santos, Memoirs": {
    text: "Memoirs by Sr. Lucia dos Santos, surviving Fatima visionary, recounting the 1917 Marian apparitions at Cova da Iria and the 'three secrets' communicated to the children.",
    note: "primary source for the Fatima apparitions",
  },
  "Pope Pius IX, Ineffabilis Deus (1854) — for comparison": {
    text: "We declare, pronounce, and define that the doctrine which holds that the most Blessed Virgin Mary, in the first instant of her conception, by a singular grace and privilege granted by Almighty God, in view of the merits of Jesus Christ, the Savior of the human race, was preserved free from all stain of original sin, is a doctrine revealed by God.",
    note: "Apostolic Constitution defining the Immaculate Conception",
  },
  "Nicholas Cabasilas, Commentary on the Divine Liturgy": {
    text: "The work of the Liturgy is the changing of the bread and wine into the true Body and Blood of Christ; its aim is the sanctification of the faithful, who through these mysteries receive the remission of sins, the inheritance of the Kingdom of Heaven, and all such blessings.",
    note: "Cabasilas, Sacrae Liturgiae Interpretatio, ch. 1 (summary paraphrase)",
  },
  "Symeon of Thessalonica, On the Sacred Liturgy": {
    text: "The Divine Liturgy is the mystery of mysteries... For in it Christ Himself is present, is offered and partaken; the faithful become one body and one blood with Him, and through Him with one another.",
    note: "From Symeon's De Sacra Liturgia (PG 155); passage not verbatim verified",
  },
  "Confession of Dositheus (1672), Decree 18": {
    text: "We believe the souls of those that have fallen asleep are either at rest or in torment, according to what each hath wrought... but to be delivered from such hath the supreme Goodness ordained means, by the unbloody Sacrifice, and by the prayers made for them, and by the alms done for their soul.",
    note: "Decree 18 on the state of souls after death and the efficacy of intercession",
  },
  "Confession of Dositheus (1672), Decree 3 — on predestination": {
    text: "We believe the most good God to have from eternity predestinated unto glory those whom He hath chosen, and to have consigned unto condemnation those whom He hath rejected; but not so that He would justify the one, and consign and condemn the other without cause... but since He foreknew the one would make a right use of their free-will, and the other a wrong, He predestinated the one, or condemned the other.",
    note: "Decree 3 rejects unconditional predestination",
  },
  "1 Timothy 2:4-6; 1 John 2:2; Hebrews 2:9; 2 Peter 3:9; Titus 2:11": {
    text: "1 Tim 2:4-6 — God 'desires all people to be saved... who gave himself as a ransom for all'; 1 John 2:2 — 'he is the propitiation for our sins, and not for ours only but also for the sins of the whole world'; Heb 2:9 — 'that he might taste death for everyone'; 2 Pet 3:9 — 'not wishing that any should perish'; Titus 2:11 — 'the grace of God has appeared, bringing salvation for all people.'",
    note: "Scripture cluster (ESV) supporting universal atonement",
  },
  "Confession of Dositheus (1672), Decree 3 — explicitly rejects limited atonement": {
    text: "We believe... that our Lord Jesus Christ... by His own blood made satisfaction for us, and gave Himself a ransom not for some but for all men... For God 'will have all men to be saved, and to come to the knowledge of the truth.'",
    note: "Decree 3 expressly rejects limited atonement",
  },
  "1 Timothy 2:1-5; Revelation 5:8; 8:3-4; Luke 20:38": {
    text: "1 Tim 2:1-5 — exhortation to prayers and intercessions for all; Rev 5:8 — 'golden bowls full of incense, which are the prayers of the saints'; Rev 8:3-4 — angel offers 'the prayers of all the saints'; Luke 20:38 — 'He is not God of the dead, but of the living, for all live to him.'",
    note: "Scripture cluster (ESV) supporting the intercession of the saints",
  },
  "2 Thessalonians 2:15; 3:6": {
    text: "2 Thess 2:15 — 'So then, brothers, stand firm and hold to the traditions that you were taught by us, either by our spoken word or by our letter.' 2 Thess 3:6 — 'keep away from any brother who is walking in idleness and not in accord with the tradition that you received from us.'",
    note: "Pauline texts on holding to received tradition (ESV)",
  },
  "Acta et Scripta Theologorum Wirtembergensium et Patriarchae Constantinopolitani (Wittenberg, 1584)": {
    text: "Published collection of the 1573–1581 correspondence between the Tübingen Lutheran theologians (led by Jakob Andreae and Martin Crusius) and Patriarch Jeremias II of Constantinople, in which Jeremias rejected the Augsburg Confession on numerous points.",
    note: "scholarly reference, summary",
  },
  "1 Timothy 2:4; 2 Peter 3:9; John 10:27": {
    text: "1 Tim 2:4 — God 'desires all people to be saved and to come to the knowledge of the truth'; 2 Pet 3:9 — 'not wishing that any should perish, but that all should reach repentance'; John 10:27 — 'My sheep hear my voice, and I know them, and they follow me.'",
    note: "Scripture cluster (ESV) on the universal salvific will of God",
  },
  "Confession of Dositheus (1672), Decree 3": {
    text: "We believe the most good God to have predestinated to glory those whom He has chosen from eternity; not in such wise, however, that He hath willed to justify some, and to leave and reprobate others without cause; but since He foreknew the one would make a right use of their free-will, and the other a wrong, He predestinated the one, or condemned the other.",
    note: "Decree 3 of the Synod of Jerusalem on predestination",
  },
  "39 Articles of Religion (1571)": {
    text: "The Thirty-Nine Articles of Religion are the historic defining statements of doctrine and practice of the Church of England, finalized in 1571 under Elizabeth I and bound up with the Book of Common Prayer.",
    note: "historical reference",
  },
  "Article XXII — Of Purgatory": {
    text: "The Romish Doctrine concerning Purgatory, Pardons, Worshipping and Adoration, as well of Images as of Reliques, and also invocation of Saints, is a fond thing vainly invented, and grounded upon no warranty of Scripture, but rather repugnant to the Word of God.",
    note: "Article XXII of the 39 Articles",
  },
  "Article XIX — Of the Church": {
    text: "The visible Church of Christ is a congregation of faithful men, in the which the pure Word of God is preached, and the Sacraments be duly ministered according to Christ's ordinance in all those things that of necessity are requisite to the same. As the Church of Jerusalem, Alexandria, and Antioch, have erred; so also the Church of Rome hath erred, not only in their living and manner of Ceremonies, but also in matters of Faith.",
    note: "Article XIX of the 39 Articles",
  },
  "Leo XIII, Apostolicae Curae (1896)": {
    text: "We pronounce and declare that ordinations carried out according to the Anglican rite have been and are absolutely null and utterly void.",
    note: "Papal bull declaring Anglican orders invalid",
  },
  "Newman, Essay on the Development of Christian Doctrine (1845)": {
    text: "Newman's Essay argues that authentic Christian doctrine develops organically over time and proposes seven 'notes' (preservation of type, continuity of principles, power of assimilation, logical sequence, anticipation of its future, conservative action upon its past, chronic vigor) by which true development may be distinguished from corruption.",
    note: "scholarly reference, summary",
  },
  "Dublin Agreed Statement (Anglican-Orthodox, 1984)": {
    text: "Agreed statement of the Anglican-Orthodox Joint Doctrinal Commission issued at Dublin in 1984, treating the mystery of the Church, faith in the Trinity, prayer and holiness, and the communion of saints.",
    note: "Anglican-Orthodox ecumenical dialogue document",
  },
  "Wesley, A Plain Account of Christian Perfection (1766)": {
    text: "By perfection I mean the humble, gentle, patient love of God, and our neighbour, ruling our tempers, words, and actions... It is love excluding sin; love filling the heart, taking up the whole capacity of the soul.",
    note: "Wesley's classic statement of his doctrine of entire sanctification",
  },
  "Westminster Confession of Faith (1646), Ch. XXI.7-8": {
    text: "As it is the law of nature, that, in general, a due proportion of time be set apart for the worship of God; so, in His Word, by a positive, moral, and perpetual commandment binding all men in all ages, He hath particularly appointed one day in seven, for a Sabbath, to be kept holy unto Him: which, from the beginning of the world to the resurrection of Christ, was the last day of the week; and, from the resurrection of Christ, was changed into the first day of the week, which, in Scripture, is called the Lord's Day, and is to be continued to the end of the world, as the Christian Sabbath.",
    note: "WCF XXI.7 on the Christian Sabbath; XXI.8 prescribes its observance",
  },
  "Robert Barclay, Apology for the True Christian Divinity (1676)": {
    text: "Barclay's Apology is the classic systematic exposition of Quaker theology, defending the doctrine of the Inner Light, immediate revelation through the Holy Spirit, silent worship, rejection of outward sacraments, and pacifism.",
    note: "scholarly reference, summary",
  },
  "C. Peter Wagner, Apostles Today (2006) — for the comparison": {
    text: "Wagner's Apostles Today articulates the New Apostolic Reformation thesis that God is restoring the offices of apostle and prophet to the contemporary Church as the foundation of a 'second apostolic age.'",
    note: "scholarly reference, summary",
  },
  "Alexander Campbell, The Christian System (1839)": {
    text: "Campbell's The Christian System sets out the Restoration Movement's program: restore primitive New Testament Christianity, unite all believers on the Bible alone, reject creeds and denominational names, and practice believer's baptism by immersion for the remission of sins.",
    note: "scholarly reference, summary",
  },
  "Romans 9-11; Galatians 6:16; Hebrews 10": {
    text: "Rom 9-11 — Paul on Israel's election, hardening, and ultimate restoration ('all Israel will be saved'); Gal 6:16 — 'peace and mercy be upon... the Israel of God'; Heb 10 — Christ's once-for-all sacrifice and the new covenant superseding the levitical cult.",
    note: "Scripture cluster (ESV) on Israel and the Church",
  },
  "Standard Reformation historiography; cf. Sproul, What Is Reformed Theology?": {
    text: "Sproul's What Is Reformed Theology? presents a popular exposition of the five solas and the five points of Calvinism (TULIP) as the defining commitments of historic Reformed theology.",
    note: "scholarly reference, summary",
  },
  "Luther, Preface to Latin Writings (1545); Romans 1:17": {
    text: "Luther: 'At last, by the mercy of God, meditating day and night, I gave heed to the context of the words... There I began to understand that the righteousness of God is that by which the righteous lives by a gift of God, namely by faith... Here I felt that I was altogether born again and had entered paradise itself through open gates.' Rom 1:17 — 'the righteous shall live by faith.'",
    note: "Luther's autobiographical account of his 'tower experience'",
  },
  "Marburg Colloquy, October 1529 — Marburg Articles": {
    text: "The fifteen Marburg Articles drawn up by Luther and Zwingli agreed on fourteen points but failed to reach agreement on the fifteenth, concerning the Lord's Supper: 'we have not at this time agreed, whether the true body and blood of Christ are bodily in the bread and wine.'",
    note: "1529 colloquy that revealed the Lutheran-Reformed split over the Eucharist",
  },
  "Schleitheim Confession (1527); Mennonite Encyclopedia": {
    text: "The Schleitheim Confession, drafted by Michael Sattler, is the foundational Swiss Anabaptist statement, setting out seven articles: believer's baptism, the ban (church discipline), the breaking of bread, separation from the world, pastors, the sword (nonresistance), and the oath.",
    note: "scholarly reference, summary",
  },
  "Philip Spener, Pia Desideria (1675)": {
    text: "Spener's Pia Desideria ('Pious Desires') is the foundational manifesto of Lutheran Pietism, proposing six reforms: more extensive use of Scripture among the people, restoration of the spiritual priesthood, emphasis on practice over knowledge, irenic conduct of theological controversy, reform of ministerial training, and preaching aimed at edification rather than rhetoric.",
    note: "scholarly reference, summary",
  },
  "Augsburg Confession Article I; 39 Articles Article VIII; Westminster Larger Catechism Q9": {
    text: "Augsburg I: 'there is one divine essence... yet that there are three Persons of the same essence and power.' 39 Articles VIII: receives the Nicene, Athanasian, and Apostles' Creeds 'for they may be proved by most certain warrants of Holy Scripture.' WLC Q9: 'There be three Persons in the Godhead, the Father, the Son, and the Holy Ghost; and these three are one true, eternal God, the same in substance, equal in power and glory.'",
    note: "Reformation-era confessional statements on the Trinity",
  },
  "Disputatio pro declaratione virtutis indulgentiarum, 31 October 1517": {
    text: "The Latin title of Luther's 95 Theses ('Disputation on the Power and Efficacy of Indulgences'), traditionally posted on the door of the Castle Church in Wittenberg on 31 October 1517.",
    note: "historical reference",
  },
  "David Bebbington, Evangelicalism in Modern Britain (1989)": {
    text: "Bebbington defines evangelicalism by a 'quadrilateral' of priorities: conversionism (the need for lives to be changed), activism (the expression of the gospel in effort), biblicism (a particular regard for the Bible), and crucicentrism (a stress on the sacrifice of Christ on the cross).",
    note: "scholarly reference, summary",
  },
  "William J. Seymour, Apostolic Faith newspaper (1906-1909)": {
    text: "The Apostolic Faith was the Azusa Street Mission's newspaper, edited by William J. Seymour, which reported and propagated the 1906–1909 Los Angeles revival generally regarded as the origin of modern Pentecostalism.",
    note: "primary source / historical reference",
  },
  "SBC Resolution on Racial Reconciliation (1995)": {
    text: "Be it further resolved, that we lament and repudiate historic acts of evil such as slavery from which we continue to reap a bitter harvest, and we recognize that the racism which yet plagues our culture today is inextricably tied to the past; Be it further resolved, that we apologize to all African-Americans for condoning and/or perpetuating individual and systemic racism in our lifetime.",
    note: "Southern Baptist Convention's 150th-anniversary resolution",
  },
  "Karl Barth, Kirchliche Dogmatik (Church Dogmatics), 1932-1967": {
    text: "Barth's Church Dogmatics (4 volumes in 13 part-volumes, unfinished) is the major 20th-century systematic theology, organized around the doctrine of the Word of God and developing a Christocentric reworking of election, creation, reconciliation, and ethics in dialectical opposition to Protestant liberalism and natural theology.",
    note: "scholarly reference, summary",
  },
  "E.C. Colwell, 'A Definite Rule for the Use of the Article in the Greek New Testament,' JBL 52 (1933): 12–21": {
    text: "Colwell's rule: 'Definite predicate nouns which precede the verb usually lack the article.' Often invoked in discussions of John 1:1c ('and the Word was God') to argue that the anarthrous theos may still be definite.",
    note: "scholarly reference, summary",
  },
  "1 Thessalonians 4:17": {
    text: "Then we who are alive, who are left, will be caught up together with them in the clouds to meet the Lord in the air, and so we will always be with the Lord.",
    note: "Key text for the dispensationalist 'rapture' doctrine (ESV)",
  },
  "David Whitmer, An Address to All Believers in Christ (Richmond, MO, 1887)": {
    text: "Whitmer's Address, written as one of the Three Witnesses of the Book of Mormon, defends his testimony to the plates but rejects the later doctrinal and organizational developments of Joseph Smith and Brigham Young, urging a return to the original 1830 Book of Mormon teaching.",
    note: "primary source / historical reference",
  },
  "Joseph Smith Papers — letters and minutes of the 1837-38 excommunications": {
    text: "Letters and minutes documenting the 1837–1838 excommunications of Oliver Cowdery, David Whitmer, Martin Harris (the Three Witnesses) and other early leaders during the Kirtland banking crisis and the Far West conflicts, preserved in the Joseph Smith Papers project.",
    note: "primary source / historical reference",
  },
  "Brigham Young, Journal of Discourses 1:50 (9 April 1852)": {
    text: "When our father Adam came into the garden of Eden, he came into it with a celestial body, and brought Eve, one of his wives, with him. He helped to make and organize this world. He is Michael, the Archangel, the Ancient of Days!... He is our Father and our God, and the only God with whom we have to do.",
    note: "Brigham Young's 'Adam–God' sermon, Journal of Discourses 1:50",
  },
  "Bruce R. McConkie, 'The Seven Deadly Heresies' (BYU, 1 June 1980)": {
    text: "McConkie: 'There are those who say that God is progressing in knowledge and is learning new truths. This is false—utterly, totally, and completely.' He also explicitly repudiates the Adam–God theory, denying that Adam 'is our father and our god, that he is the father of our spirits and our bodies, and that he is the one we worship.'",
    note: "BYU devotional address rejecting several teachings, including Brigham Young's Adam-God doctrine",
  },
};
