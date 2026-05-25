export type CitationQuote = {
  text: string;
  translation?: string;
  note?: string;
};

export const QUOTES_E: Record<string, CitationQuote> = {
  "1 Timothy 4:14; 2 Timothy 1:6": {
    text: "Neglect not the gift that is in thee, which was given thee by prophecy, with the laying on of the hands of the presbytery. (1 Tim 4:14) Wherefore I put thee in remembrance that thou stir up the gift of God, which is in thee by the putting on of my hands. (2 Tim 1:6)",
    translation: "KJV",
  },

  "Nero AD 64; Pliny c. AD 112; Decius AD 250; Diocletian AD 303–311": {
    text: "[Reference to the principal Roman persecutions of Christians: Nero's persecution at Rome following the fire of AD 64 (cf. Tacitus, Annals 15.44); Pliny the Younger's correspondence with Trajan from Bithynia c. AD 112 (Ep. 10.96–97); the empire-wide libellus edict of Decius (AD 250); and the Great Persecution under Diocletian (AD 303–311).]",
    note: "passage not verified — historical reference, no single canonical text",
  },

  "Rodney Stark, The Rise of Christianity (Princeton, 1996), and Robin Lane Fox, Pagans and Christians (1986) — empirical sociological estimates.": {
    text: "[Reference to modern sociological estimates of Christian demographic growth in the Roman Empire. Stark proposed a steady c. 40% per decade growth rate, projecting from c. 1,000 Christians in AD 40 to several million by AD 300; Lane Fox surveys the cultural encounter of paganism and Christianity from the Antonines to Constantine.]",
    note: "passage not verified — modern scholarship reference",
  },

  "Catacomb of Priscilla (Via Salaria, Rome) — Velatio fresco, mid-2nd century": {
    text: "[Visual reference: the Velatio cubiculum fresco of the Catacomb of Priscilla on the Via Salaria, mid-second century, depicting a veiled woman in the orans posture flanked by scenes commonly identified as the consecration of a virgin or widow.]",
    note: "passage not verified — visual/archaeological monument, no quotable text",
  },

  "Rufinus, Commentary on the Apostles' Creed (~AD 400)": {
    text: "I believe in God the Father almighty; and in Christ Jesus, His only Son, our Lord, who was born of the Holy Ghost and the Virgin Mary, was crucified under Pontius Pilate and buried; the third day He rose again from the dead, He ascended into heaven, sitteth at the right hand of the Father, whence He shall come to judge the quick and the dead; and in the Holy Ghost, the holy Church, the remission of sins, the resurrection of the flesh.",
    translation: "NPNF2 3, Rufinus, Commentary on the Apostles' Creed",
    note: "the Old Roman Symbol as Rufinus expounds it",
  },

  "Marcellus of Ancyra, baptismal Symbol (~AD 340)": {
    text: "I believe in God almighty; and in Christ Jesus His only Son our Lord, who was born of the Holy Spirit and the Virgin Mary, who under Pontius Pilate was crucified and buried, on the third day rose again from the dead, ascended into the heavens, and sitteth on the right hand of the Father, whence He shall come to judge the quick and the dead; and in the Holy Spirit, the holy Church, the remission of sins, the resurrection of the flesh, the life everlasting.",
    translation: "Marcellus, Epistle to Julius of Rome, in Epiphanius, Panarion 72.3",
  },

  "Synaxarion of Constantinople — Apostle Stachys, October 31": {
    text: "[The Synaxarion of Constantinople commemorates on October 31 the holy apostles of the Seventy Stachys, Amplias, Urban, Narcissus, Apelles, and Aristobulus, recording that Stachys was ordained by the holy Apostle Andrew the First-Called as the first bishop of Byzantium, where he shepherded the flock for sixteen years and reposed in peace.]",
    note: "passage not verified — paraphrase of the Synaxarion entry",
  },

  "The Passion of Perpetua and Felicity (~AD 203)": {
    text: "Then Perpetua began to sing, as already treading on the head of the Egyptian. And Revocatus and Saturninus and Saturus began to threaten the people as they gazed. Then when they came into Hilarianus' sight, they began to say to Hilarianus, motioning with hand and head: 'Thou judgest us, but God shall judge thee.' At this the people, in fury, demanded that they should be vexed with scourges before the line of gladiators… They were all glad, that they should suffer somewhat of the sufferings of the Lord.",
    translation: "tr. W. H. Shewring (1931), Passio Perpetuae et Felicitatis 18",
  },

  "Yale-French excavations of Dura-Europos, 1932": {
    text: "[Reference to the Yale University and French Academy joint excavations at Dura-Europos on the Euphrates (1928–1937), in which the 1932 season uncovered the earliest known Christian house-church (domus ecclesiae, c. AD 232–256), including a baptistery decorated with frescoes of the Good Shepherd, the healing of the paralytic, and the women at the tomb.]",
    note: "passage not verified — archaeological reference, no quotable text",
  },

  "Lactantius, On the Deaths of the Persecutors 44": {
    text: "Constantine was directed in a dream to cause the heavenly sign to be delineated on the shields of his soldiers, and so to proceed to battle. He did as he had been commanded, and he marked on their shields the letter Χ, with a perpendicular line drawn through it and turned round thus at the top, being the cipher of CHRIST. Having this sign, his troops stood to arms.",
    translation: "ANF 7, tr. William Fletcher",
  },

  "St. Cyril of Jerusalem, Mystagogical Catecheses (~AD 350)": {
    text: "After these things, ye were led to the holy pool of Divine Baptism, as Christ was carried from the Cross to the Sepulchre which is before our eyes. And each of you was asked, whether he believed in the name of the Father, and of the Son, and of the Holy Ghost, and ye made that saving confession, and descended three times into the water, and ascended again; here also hinting by a symbol at the three days' burial of Christ.",
    translation: "NPNF2 7, Mystagogical Catechesis II.4",
  },

  "St. Basil, On the Holy Spirit 27": {
    text: "Of the beliefs and practices whether generally accepted or publicly enjoined which are preserved in the Church, some we possess derived from written teaching; others we have received delivered to us 'in a mystery' by the tradition of the apostles; and both of these in relation to true religion have the same force. And these no one will gainsay — no one, at all events, who is even moderately versed in the institutions of the Church. For were we to attempt to reject such customs as have no written authority, on the ground that the importance they possess is small, we should unintentionally injure the Gospel in its very vitals.",
    translation: "NPNF2 8, Basil, On the Holy Spirit 27.66",
  },

  "Lactantius, On the Deaths of the Persecutors 48": {
    text: "When I, Constantine Augustus, and I, Licinius Augustus, had fortunately met near Mediolanum (Milan), and were considering everything that pertained to the public good and security, we thought… that we ought to give both to Christians and to all others free choice of following whatever form of worship they pleased, that whatever divinity there is in heaven may be benevolent and propitious to us and to all who are under our authority.",
    translation: "ANF 7, tr. William Fletcher — the Edict of Milan, 313",
  },

  "Codex Theodosianus 16.1.2 — Edict of Thessalonica (380)": {
    text: "It is Our will that all the peoples who are ruled by the administration of Our Clemency shall practice that religion which the divine Peter the Apostle transmitted to the Romans… that is, according to the apostolic discipline and the evangelic doctrine, we shall believe in the single Deity of the Father, the Son, and the Holy Spirit, under the concept of equal majesty and of the Holy Trinity. We command that those persons who follow this rule shall embrace the name of Catholic Christians. The rest, however, whom We adjudge demented and insane, shall sustain the infamy of heretical dogmas.",
    translation: "tr. Clyde Pharr, The Theodosian Code (Princeton, 1952), CTh 16.1.2",
  },

  "Pontifical Commission for Sacred Archaeology, Rome": {
    text: "[Reference to the Pontificia Commissione di Archeologia Sacra, established by Pope Pius IX in 1852, which oversees the excavation, conservation, and study of the Christian catacombs and the early-Christian monuments of Italy.]",
    note: "passage not verified — institutional reference, no quotable text",
  },

  "Bruce Metzger, The Text of the New Testament (4th ed., 2005)": {
    text: "[Reference to Bruce M. Metzger and Bart D. Ehrman, The Text of the New Testament: Its Transmission, Corruption, and Restoration (4th ed., Oxford University Press, 2005), the standard handbook of New Testament textual criticism, surveying the manuscript witnesses, principles of textual criticism, and the history of the printed Greek text.]",
    note: "passage not verified — modern scholarship reference",
  },

  "C.H. Roberts, An Unpublished Fragment of the Fourth Gospel (1935)": {
    text: "[Reference to C. H. Roberts, An Unpublished Fragment of the Fourth Gospel in the John Rylands Library (Manchester University Press, 1935), the editio princeps of P52, a small papyrus fragment of John 18:31–33, 37–38, dated by Roberts on palaeographic grounds to the first half of the second century and long regarded as the earliest extant New Testament manuscript.]",
    note: "passage not verified — modern scholarship reference",
  },

  "Sozomen, EH 6.15": {
    text: "[Sozomen, Ecclesiastical History 6.15, reports the rise and spread of monasticism in Syria and the surrounding regions, describing the ascetic discipline of solitaries and communities and naming figures such as Aones, Eusebius of Coryphe, Asterius, and others who practiced the angelic life in the deserts and mountains of the East.]",
    note: "passage not verified — paraphrase of Sozomen's ecclesiastical history",
  },

  "St. Cyril of Jerusalem, Mystagogical Catecheses I-V": {
    text: "Wherefore I beseech you, brethren, not to look on the laver as simple water, but rather regard the spiritual grace that is given with the water… As, then, He truly was crucified, and buried, and rose again, all on your behalf, by imitation, that, by sharing His sufferings in imitation, ye might gain salvation in reality. O surpassing loving-kindness! Christ received nails in His undefiled hands and feet, and suffered anguish; while on me without pain or toil by the fellowship of His suffering He freely bestows salvation.",
    translation: "NPNF2 7, Mystagogical Catechesis II.6",
  },

  "Triodion — Prayer of St. Ephrem the Syrian, used in Lenten services": {
    text: "O Lord and Master of my life, take from me the spirit of sloth, despair, lust of power, and idle talk. But give rather the spirit of chastity, humility, patience, and love to Thy servant. Yea, O Lord and King, grant me to see my own sins and not to judge my brother; for blessed art Thou unto the ages of ages. Amen.",
    translation: "Lenten Triodion, tr. Mother Mary and Archim. Kallistos Ware",
  },

  "Dionysius the Areopagite, Corpus Dionysiacum (5th-6th c.)": {
    text: "Hierarchy is, in my judgement, a sacred order and science and operation, assimilated, as far as attainable, to the likeness of God, and conducted to the illuminations granted to it from God, according to capacity, with a view to the Divine imitation… The aim, then, of Hierarchy is the assimilation and union, as far as attainable, with God, having Him Leader of all religious science and operation.",
    translation: "tr. John Parker (1897), The Celestial Hierarchy III.1–2",
  },

  "Nicholas Cabasilas, The Life in Christ; A Commentary on the Divine Liturgy": {
    text: "Life in Christ originates in this life and arises from it. It is perfected, however, in the life to come, when we shall have reached that last day. It cannot attain perfection in men's souls in this life, nor even in that which is to come, without already having begun here.",
    translation: "Nicholas Cabasilas, The Life in Christ I.1, tr. C. J. deCatanzaro (SVS Press)",
  },

  "Khomiakov, The Church Is One; Kireyevsky, On the Necessity and Possibility of New Principles of Philosophy": {
    text: "The unity of the Church follows of necessity from the unity of God; for the Church is not a multitude of persons in their separate individuality, but a unity of the grace of God, living in a multitude of rational creatures, submitting themselves willingly to grace.",
    translation: "A. S. Khomiakov, The Church Is One §1 (tr. W. J. Birkbeck)",
  },

  "Basil, Letter 38 (To Gregory his Brother)": {
    text: "The distinction between ousia and hypostasis is the same as that between the general and the particular; as, for instance, between the animal and the particular man. Wherefore, in the case of the Godhead, we confess one essence or substance so as not to give a variant definition of existence, but we confess a particular hypostasis, in order that our conception of Father, Son and Holy Spirit may be without confusion and clear.",
    translation: "NPNF2 8, Basil, Letter 38.2",
    note: "the letter is now generally attributed to Gregory of Nyssa",
  },

  "2 Peter 1:4 — partakers of the divine nature": {
    text: "Whereby are given unto us exceeding great and precious promises: that by these ye might be partakers of the divine nature, having escaped the corruption that is in the world through lust.",
    translation: "KJV",
  },

  "Orthodox Synaxarion; liturgical kontakia of the three saints": {
    text: "Let us who love their words gather together and honour with hymns the three great torch-bearers of the Triune Godhead: Basil the Great, Gregory the Theologian, and John of the golden tongue. These men have enlightened the world with the rays of their divine doctrines; they are sweetly-flowing rivers of wisdom filling all creation with springs of heavenly knowledge.",
    translation: "Kontakion of the Three Holy Hierarchs (January 30), composite English from the Menaion",
  },

  "St. Cyril, Twelve Anathemas (Anathema 1)": {
    text: "If anyone does not confess that Emmanuel is truly God, and that on this account the Holy Virgin is Theotokos (for she gave birth in the flesh to the Word of God become flesh): let him be anathema.",
    translation: "NPNF2 14, Cyril of Alexandria, Third Letter to Nestorius, Anathema 1",
  },

  "Symbol of Constantinople (381), 8th article": {
    text: "And in the Holy Spirit, the Lord, the Giver of Life, who proceedeth from the Father, who with the Father and the Son together is worshipped and glorified, who spake by the prophets.",
    translation: "NPNF2 14, the Niceno-Constantinopolitan Creed, art. 8",
  },

  "St. Cyril of Jerusalem, Mystagogical Catechesis III": {
    text: "Having been baptized into Christ, and put on Christ, ye have been made conformable to the Son of God… And so, the unction is the symbol of your having been anointed by the Holy Ghost; for as Christ after His baptism, and the visitation of the Holy Ghost, went forth and vanquished the adversary, so likewise ye, after holy baptism and the mystical Chrism, having put on the whole armour of the Holy Ghost, do stand against the power of the adversary.",
    translation: "NPNF2 7, Mystagogical Catechesis III.1, 4",
  },

  "Niceno-Constantinopolitan Symbol (381), traditional catechetical division": {
    text: "I believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible. And in one Lord Jesus Christ, the Only-begotten Son of God, begotten of the Father before all ages; Light of Light, true God of true God, begotten, not made; of one essence with the Father, by Whom all things were made; Who for us men and for our salvation came down from heaven, and was incarnate of the Holy Spirit and the Virgin Mary, and became man. And He was crucified for us under Pontius Pilate, and suffered, and was buried. And the third day He rose again, according to the Scriptures. And ascended into heaven, and sitteth at the right hand of the Father. And He shall come again with glory to judge the living and the dead, Whose kingdom shall have no end. And in the Holy Spirit, the Lord, the Giver of Life, Who proceedeth from the Father, Who with the Father and the Son together is worshipped and glorified, Who spake by the prophets. In One, Holy, Catholic, and Apostolic Church. I acknowledge one baptism for the remission of sins. I look for the resurrection of the dead, and the life of the age to come. Amen.",
    translation: "traditional liturgical English (twelve articles)",
  },

  "2 Peter 1:4": {
    text: "Whereby are given unto us exceeding great and precious promises: that by these ye might be partakers of the divine nature, having escaped the corruption that is in the world through lust.",
    translation: "KJV",
  },

  "1 Corinthians 10:16-17; 11:23-29": {
    text: "The cup of blessing which we bless, is it not the communion of the blood of Christ? The bread which we break, is it not the communion of the body of Christ? For we being many are one bread, and one body: for we are all partakers of that one bread. (10:16–17) … For I have received of the Lord that which also I delivered unto you, That the Lord Jesus the same night in which he was betrayed took bread: And when he had given thanks, he brake it, and said, Take, eat: this is my body, which is broken for you: this do in remembrance of me… For he that eateth and drinketh unworthily, eateth and drinketh damnation to himself, not discerning the Lord's body. (11:23–24, 29)",
    translation: "KJV",
  },

  "Various contemporary patriarchal encyclicals encouraging frequent communion": {
    text: "[Reference to twentieth- and twenty-first-century patriarchal and synodal encyclicals from the Ecumenical Patriarchate, the Church of Greece, and other autocephalous Orthodox Churches, urging the faithful to prepare themselves and to commune frequently, in continuity with the Kollyvades fathers and with St. Nicodemos the Hagiorite's Concerning Frequent Communion.]",
    note: "passage not verified — composite reference to multiple encyclicals",
  },

  "Trebnik (Book of Needs) — Office of Crowning": {
    text: "O Lord our God, crown them with glory and honour. The servant of God [N.] is crowned for the handmaid of God [N.], in the Name of the Father, and of the Son, and of the Holy Spirit. The handmaid of God [N.] is crowned for the servant of God [N.], in the Name of the Father, and of the Son, and of the Holy Spirit. O Lord our God, crown them with glory and honour.",
    translation: "Trebnik, Office of Holy Matrimony, the crowning",
  },

  "Hieratikon — Order of the Consecration of a Bishop": {
    text: "The divine grace, which always healeth that which is infirm and supplieth that which is wanting, advanceth through the laying-on of hands [N.], the most devout archimandrite, elected of God, to be bishop of the God-saved city of [N.]. Let us therefore pray for him, that the grace of the All-Holy Spirit may come upon him.",
    translation: "Hieratikon, Order for the Consecration of a Bishop, the cheirotonia formula",
  },

  "Trebnik — Office of Holy Unction": {
    text: "O Holy Father, Physician of souls and bodies, Who didst send Thine only-begotten Son, our Lord Jesus Christ, Who healeth every infirmity and delivereth from death: heal also Thy servant [N.] from the bodily and spiritual infirmity that holdeth him, and quicken him by the grace of Thy Christ; through the prayers of our most holy Lady the Theotokos and Ever-Virgin Mary; by the intercessions of the honourable, bodiless powers of heaven…",
    translation: "Trebnik, Office of Holy Unction, prayer over the oil",
  },

  "Second Agreed Statement of the Joint Commission, Chambésy 1990": {
    text: "We have now clearly understood that both families have always loyally maintained the same authentic Orthodox Christological faith, and the unbroken continuity of the apostolic tradition, though they have used Christological terms in different ways. It is this common faith and continuous loyalty to the Apostolic Tradition that should be the basis for our unity and communion.",
    translation: "Second Agreed Statement of the Joint Commission of the Theological Dialogue Between the Orthodox Church and the Oriental Orthodox Churches, Chambésy 1990, §4",
  },

  "St. Cyril, On the Unity of Christ": {
    text: "We do not say that the nature of the Word underwent a change and became flesh, or that he was transformed into a complete man composed of soul and body, but rather we say this: that the Word in an unspeakable and inconceivable manner hypostatically united to himself flesh enlivened with a rational soul, and so became man and was called the Son of Man, not according to will alone or as a matter of good pleasure, nor by the assumption of a person alone.",
    translation: "Cyril of Alexandria, On the Unity of Christ, tr. John A. McGuckin (SVS Press)",
  },

  "St. Theodore the Studite, Antirrhetic III": {
    text: "If merely mental contemplation had been sufficient, it would have been sufficient for Him to come to us in a merely mental way. But since this was not so, He came to us by the very deed of becoming man… And since Christ is depicted neither according to the nature of His divinity nor according to nature in itself, but inasmuch as He has been hypostatically united to flesh, the icon does not show His invisible divinity, but His flesh which has become visible.",
    translation: "tr. Catharine P. Roth (SVS Press), Theodore the Studite, On the Holy Icons, Third Refutation",
  },

  "Cosmas the Priest, A Sermon Against the Heretics (~AD 970)": {
    text: "[Cosmas the Priest, writing in tenth-century Bulgaria, denounces the Bogomil heretics: they reject the Cross, the icons of Christ and the Theotokos, the sacraments of the Church, marriage, and the eating of meat; they call the church buildings 'cross-roads' and the priests of God 'Pharisees'; they appear outwardly meek and pale from fasting, but inwardly are ravening wolves devouring the simple.]",
    note: "passage not verified — paraphrase of the Slovo na eretiki",
  },

  "St. Justin Popović, The Orthodox Church and Ecumenism (1974)": {
    text: "Ecumenism is the common name for the pseudo-Christianities, for the pseudo-churches of Western Europe. In it is the heart of all European humanisms with Papism at their head. All these pseudo-Christianities, all these pseudo-churches, are nothing other than one heresy beside another. Their common evangelical name is all-heresy (panheresy).",
    translation: "tr. Fr. Benjamin Stanley (Lazarica Press), Justin Popović, The Orthodox Church and Ecumenism",
  },

  "Met. Joseph of Petrograd, Epistle of 1927": {
    text: "[In the Epistle of 1927, Metropolitan Joseph (Petrovykh) of Petrograd refused submission to the 'Declaration' of Metropolitan Sergius (Stragorodsky) which subordinated the Church's witness to the Soviet state, declaring that the Church cannot purchase her external well-being at the price of betraying Christ and her confessing hierarchs, and calling upon the faithful to remain in the catacomb fidelity of the True Orthodox Church.]",
    note: "passage not verified — paraphrase of the Iosiflyane epistle",
  },

  "PCPCU, 'The Greek and Latin Traditions Regarding the Procession of the Holy Spirit' (1995)": {
    text: "The Catholic Church acknowledges the conciliar, ecumenical, normative and irrevocable value, as expression of the one common faith of the Church and of all Christians, of the Symbol professed in Greek at Constantinople in 381 by the Second Ecumenical Council. No profession of faith peculiar to a particular liturgical tradition can contradict this expression of the faith taught and professed by the undivided Church.",
    translation: "Pontifical Council for Promoting Christian Unity, Clarification on 'The Greek and Latin Traditions Regarding the Procession of the Holy Spirit' (L'Osservatore Romano, 13 September 1995)",
  },

  "Adolf von Harnack, Das Wesen des Christentums (1900); Friedrich Schleiermacher, The Christian Faith (1821)": {
    text: "[Reference to two foundational works of liberal Protestant theology: Adolf von Harnack's Das Wesen des Christentums (What Is Christianity?, 1900), which reduces the gospel to the Fatherhood of God, the brotherhood of man, and the infinite value of the human soul; and Friedrich Schleiermacher's Der christliche Glaube (The Christian Faith, 1821/1830), which grounds dogmatics in the 'feeling of absolute dependence.']",
    note: "passage not verified — modern scholarship reference",
  },

  "Symbol of Nicaea (325), final anathemas": {
    text: "And those who say, 'There was when He was not,' and 'Before He was begotten He was not,' and that 'He came into being from things that are not,' or who allege that the Son of God is of another hypostasis or substance, or is subject to alteration or change — these the Catholic and Apostolic Church anathematizes.",
    translation: "NPNF2 14, Symbol of Nicaea, final anathemas",
  },

  "Cyril, On the Unity of Christ": {
    text: "There is only one Son, only one Lord Jesus Christ, both before the incarnation and after the incarnation. The Word from God the Father was not one Son and the one from the holy Virgin another, but we believe that he who is before the ages is the very one who was born according to the flesh of a woman.",
    translation: "Cyril of Alexandria, On the Unity of Christ, tr. John A. McGuckin (SVS Press)",
  },

  "Sub Tuum Praesidium, P. Rylands 470 (c. 250)": {
    text: "Beneath thy compassion we take refuge, O Theotokos: do not despise our petitions in time of trouble, but rescue us from dangers, O only pure, only blessed one.",
    translation: "tr. from the Greek of P. Ryl. III 470, the earliest extant Marian hymn",
  },

  "Various histories of the French Revolutionary religious policy (1796-1801)": {
    text: "[Reference to scholarly accounts of the religious policy of the French Directory and Consulate (1796–1801): the dechristianization campaign, the cult of the Supreme Being and the Theophilanthropists, the deportation of nonjuring clergy, the partition of papal territories, and the eventual Concordat of 1801 between Napoleon and Pius VII.]",
    note: "passage not verified — composite reference to modern historiography",
  },

  "Symbol of Nicaea (325)": {
    text: "We believe in one God, the Father Almighty, Maker of all things visible and invisible. And in one Lord Jesus Christ, the Son of God, begotten of the Father, the only-begotten, that is, of the substance of the Father, God of God, Light of Light, very God of very God, begotten, not made, being of one substance (homoousion) with the Father; by whom all things were made, both things in heaven and things on earth; who for us men and for our salvation came down and was incarnate and was made man; He suffered, and the third day He rose again, ascended into heaven; from thence He shall come to judge the quick and the dead. And in the Holy Ghost. And those who say, 'There was when He was not,' and 'Before He was begotten He was not,' and that 'He came into being from things that are not,' or who allege that the Son of God is of another hypostasis or substance, or is subject to alteration or change — these the Catholic and Apostolic Church anathematizes.",
    translation: "NPNF2 14, Symbol of the 318 Fathers of Nicaea (325)",
  },

  "Socrates, Ecclesiastical History": {
    text: "[Socrates Scholasticus, Ecclesiastical History (c. AD 439), in seven books, narrates the history of the Church from the accession of Constantine in 305 to the seventeenth consulate of Theodosius II in 439, with particular attention to the Arian controversy, the Council of Nicaea, and the relations of Church and Empire.]",
    note: "passage not verified — general bibliographic reference; no specific chapter cited",
  },

  "325, 381, 431, 451, 553, 680-1, 787": {
    text: "[The seven Ecumenical Councils received by the Orthodox Church: Nicaea I (325), Constantinople I (381), Ephesus (431), Chalcedon (451), Constantinople II (553), Constantinople III (680–681), and Nicaea II (787).]",
    note: "passage not verified — list of dates, no quotable text",
  },

  "Pentecostarion — Sunday of the Fathers of Nicaea": {
    text: "Most glorious art Thou, O Christ our God, who hast established our Fathers as luminous stars upon the earth, and through them didst guide us all to the true Faith. O most merciful One, glory to Thee.",
    translation: "Pentecostarion, Troparion of the Holy Fathers of the First Ecumenical Council (Seventh Sunday of Pascha), tone 8",
  },

  "Confession of Dositheus (1672)": {
    text: "We believe the Catholic Church to be taught by the Holy Spirit; for He is the true Paraclete… By the same Spirit she is rightly taught, and infallibly delivers all things necessary to salvation, and the same Spirit guideth her into all truth, that she may not at any time err either in the things essential to faith, or which are necessary for our salvation.",
    translation: "Confession of Dositheus / Synod of Jerusalem (1672), Decree 12, tr. J. N. W. B. Robertson",
  },

  "Hagioritic Typikon (Tragos) of John Tzimiskes, 972": {
    text: "[The Tragos, the Typikon issued by the Emperor John I Tzimiskes in 972 at the request of St. Athanasius of the Great Lavra and the protos of Mount Athos, regulates the common life of the Holy Mountain: it confirms the cenobitic foundations, restricts the entrance of women and beardless youths, sets forth the authority of the protos and the council of elders at Karyes, and binds all Athonite monks to a single canonical discipline.]",
    note: "passage not verified — paraphrase of the Tragos",
  },

  "Vatican I, Pastor Aeternus (1870) — for the comparison": {
    text: "We teach and define that it is a dogma divinely revealed: that the Roman Pontiff, when he speaks ex cathedra, that is, when in discharge of the office of pastor and doctor of all Christians, by virtue of his supreme Apostolic authority, he defines a doctrine regarding faith or morals to be held by the universal Church, by the divine assistance promised to him in blessed Peter, is possessed of that infallibility with which the divine Redeemer willed that His Church should be endowed for defining doctrine regarding faith or morals: and that therefore such definitions of the Roman Pontiff are of themselves, and not from the consent of the Church, irreformable.",
    translation: "Vatican I, Pastor Aeternus, ch. 4 (Denzinger 3074), the definition of papal infallibility",
  },

  "Niceno-Constantinopolitan Symbol (381), Article 8": {
    text: "And in the Holy Spirit, the Lord, the Giver of Life, who proceedeth from the Father, who with the Father and the Son together is worshipped and glorified, who spake by the prophets.",
    translation: "NPNF2 14, the Niceno-Constantinopolitan Creed, art. 8",
  },

  "1 Timothy 3:2; Titus 1:6; Matthew 8:14": {
    text: "A bishop then must be blameless, the husband of one wife, vigilant, sober, of good behaviour, given to hospitality, apt to teach. (1 Tim 3:2) If any be blameless, the husband of one wife, having faithful children not accused of riot or unruly. (Titus 1:6) And when Jesus was come into Peter's house, he saw his wife's mother laid, and sick of a fever. (Matt 8:14)",
    translation: "KJV",
  },

  "Confession of Dositheus (1672), Decree 17": {
    text: "We believe the all-holy Mystery of the Sacred Eucharist… After the consecration of the bread and of the wine, there no longer remaineth the substance of the bread and of the wine, but the Body Itself and the Blood of the Lord, under the species and form of bread and wine… and that the Lord Jesus Christ is present, not typically, nor figuratively, nor by superabundant grace, as in the other Mysteries, nor by a bare presence, as some of the Fathers have said concerning Baptism, nor again by an impanation, so that the Divinity of the Word should be united to the bread of the Eucharist hypostatically… but truly and really, so that after the consecration of the bread and of the wine, the bread is transmuted, transubstantiated, converted, transformed, into the very true Body of the Lord.",
    translation: "Confession of Dositheus / Synod of Jerusalem (1672), Decree 17, tr. J. N. W. B. Robertson",
  },

  "Vatican I, Pastor Aeternus (1870), Chapter 3": {
    text: "Wherefore we teach and declare that, by the appointment of our Lord, the Roman Church possesses a sovereignty of ordinary power over all other churches, and that this power of jurisdiction of the Roman Pontiff, which is truly episcopal, is immediate; to which all, of whatsoever rite and dignity, both pastors and faithful, both individually and collectively, are bound, by their duty of hierarchical subordination and true obedience, to submit, not only in matters which belong to faith and morals, but also in those that pertain to the discipline and government of the Church throughout the world.",
    translation: "Vatican I, Pastor Aeternus, ch. 3 (Denzinger 3060)",
  },

  "Encyclical of the Eastern Patriarchs (1848)": {
    text: "With us neither patriarchs nor councils could ever introduce new teaching, for the guardian of religion is the very body of the Church, that is, the people itself, which desires that its religion should be ever unchanged and of the same form as that of its Fathers.",
    translation: "Encyclical of the Eastern Patriarchs to Pope Pius IX (1848), §17",
  },

  "Toledo III (589); Aachen (809); Constantinople 879-880; Roman adoption 1014": {
    text: "[A chronology of key dates in the history of the Filioque: the Third Council of Toledo (589), which professed the Spirit proceeding 'from the Father and the Son' against Spanish Arianism; the Council of Aachen under Charlemagne (809), which urged Rome to insert the Filioque into the Creed; the Council of Constantinople of 879–880 under Patriarch Photius, which forbade any alteration of the Symbol; and the eventual liturgical adoption of the Filioque at Rome under Pope Benedict VIII in 1014.]",
    note: "passage not verified — list of historical events, not a single text",
  },

  "Nicholas Afanasiev, The Church of the Holy Spirit (1971)": {
    text: "Where the Eucharist is, there is the fullness of the Church. The local church, gathered together about its bishop and celebrating the Eucharist, is not a part of the Church, but the whole Church in a given place, for she possesses everything that belongs to the Church: the totality of the gifts of the Spirit, the totality of the apostolic faith, and the totality of the means of salvation.",
    translation: "Nicholas Afanasiev, The Church of the Holy Spirit, tr. Vitaly Permiakov (Notre Dame, 2007)",
    note: "synthetic statement of Afanasiev's eucharistic ecclesiology; precise wording varies by edition",
  },

  "Aquinas, Summa Theologiae I-II.110.2 — for the comparison": {
    text: "Grace is nothing else than a certain participation of the Divine Nature… It is necessary that some supernatural form and disposition should be added to the soul, by which it may be ordered conveniently to that supernatural end. And this is what is called grace.",
    translation: "Aquinas, Summa Theologiae I–II, q. 110, a. 2, tr. Fathers of the English Dominican Province",
  },
};
