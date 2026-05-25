import { batch1 } from "@/content/library/saints/batch-1";
import { batch2 } from "@/content/library/saints/batch-2";
import { batch3 } from "@/content/library/saints/batch-3";
import { batch4 } from "@/content/library/saints/batch-4";
import { batch5 } from "@/content/library/saints/batch-5";

export type SaintCategory =
  | "apostle"
  | "martyr"
  | "hierarch"
  | "father"
  | "monastic"
  | "wonderworker"
  | "modern"
  | "woman"
  | "foolforchrist";

export type SaintLife = {
  slug: string;
  name: string;
  title?: string;
  feastDay: string;
  feastMonth: number;
  feastDate: number;
  century: string;
  dates?: string;
  categories: SaintCategory[];
  body: string[];
  quote?: { text: string; source?: string };
};

export const CATEGORY_LABELS: Record<SaintCategory, string> = {
  apostle: "Apostle",
  martyr: "Martyr",
  hierarch: "Hierarch",
  father: "Church Father",
  monastic: "Monastic",
  wonderworker: "Wonderworker",
  modern: "Modern Saint",
  woman: "Holy Woman",
  foolforchrist: "Fool for Christ",
};

// The seed corpus — the 49 lives written before the research batches.
// Treated as canonical: when a batch contains a duplicate slug, this wins.
const seedSaints: SaintLife[] = [
  {
    slug: "anthony-the-great",
    name: "Anthony the Great",
    title: "Father of Monasticism",
    feastDay: "January 17",
    feastMonth: 1,
    feastDate: 17,
    century: "3rd–4th",
    dates: "c. 251 – 356",
    categories: ["monastic", "father"],
    body: [
      "Born to wealthy Christian parents in Coma, Egypt, Anthony was orphaned around the age of twenty. Hearing the Gospel read in church — 'If thou wilt be perfect, go and sell that thou hast' — he took the words as addressed personally to him, distributed his inheritance to the poor, placed his sister in the care of a community of virgins, and withdrew into the Egyptian desert.",
      "For decades he lived in increasingly remote solitude — first at a tomb, then in an abandoned fort, finally on the Inner Mountain near the Red Sea — wrestling with demons and growing in prayer. When he emerged at age fifty-five, witnesses reported that he was neither emaciated nor wild but possessed an extraordinary serenity, his body and mind in perfect order.",
      "His disciples multiplied until the desert, as St. Athanasius wrote in his famous Life of Anthony, 'was made a city by monks.' Anthony twice came down to Alexandria — once to encourage the martyrs during the Diocletian persecution, once to refute the Arians. He reposed at the age of 105, having outlived almost everyone who knew him.",
    ],
    quote: {
      text: "I no longer fear God — I love Him. For perfect love casts out fear.",
      source: "Sayings of the Desert Fathers",
    },
  },
  {
    slug: "athanasius-the-great",
    name: "Athanasius the Great",
    title: "Pillar of Orthodoxy",
    feastDay: "January 18",
    feastMonth: 1,
    feastDate: 18,
    century: "4th",
    dates: "c. 296 – 373",
    categories: ["hierarch", "father"],
    body: [
      "Athanasius attended the First Ecumenical Council at Nicaea in 325 as a young deacon, accompanying his bishop Alexander. There he watched the Church confess that the Son is homoousios — of the same essence — with the Father, against the teaching of the priest Arius that the Son was a created being.",
      "Three years later, at thirty-three, he became Patriarch of Alexandria. He held that see for forty-five years, but spent seventeen of them in exile. Five times he was driven from his city by emperors who had embraced Arianism — Constantine, Constantius, Julian the Apostate, and Valens — and five times he returned. The Latin proverb Athanasius contra mundum, 'Athanasius against the world,' captured his isolation: at one point nearly the whole episcopate had compromised with Arius, and Athanasius alone refused.",
      "His treatise On the Incarnation is read to this day. In it he argues that God became man so that man might become god — that the salvation of human nature required nothing less than the personal entrance of the eternal Word into our flesh.",
    ],
    quote: {
      text: "He was made man that we might be made god.",
      source: "On the Incarnation, §54",
    },
  },
  {
    slug: "basil-the-great",
    name: "Basil the Great",
    title: "Archbishop of Caesarea",
    feastDay: "January 1",
    feastMonth: 1,
    feastDate: 1,
    century: "4th",
    dates: "330 – 379",
    categories: ["hierarch", "father"],
    body: [
      "Born into a family that would produce no fewer than five canonized saints — among them his grandmother Macrina the Elder, his sister Macrina the Younger, and his brother Gregory of Nyssa — Basil was educated at Athens alongside his lifelong friend Gregory of Nazianzus. After a brilliant academic start he was, in his own words, 'awakened from a deep sleep' by his sister and embraced the monastic life.",
      "As archbishop of Caesarea in Cappadocia he confronted Arianism, refused to be intimidated by the imperial prefect Modestus — replying that he had nothing to lose but a few books and a worn cloak — and built outside Caesarea a vast complex of hospitals, hospices, and almshouses known as the Basileiad, often called the first hospital in history.",
      "He composed monastic rules still followed in the East and a Divine Liturgy still served on his feast and on the Sundays of Great Lent. He reposed at forty-nine, worn out by ascetic labor and pastoral care.",
    ],
    quote: {
      text: "The bread which you do not use is the bread of the hungry; the garment hanging in your wardrobe is the garment of him who is naked.",
      source: "Homily on the rich",
    },
  },
  {
    slug: "gregory-the-theologian",
    name: "Gregory the Theologian",
    title: "Archbishop of Constantinople",
    feastDay: "January 25",
    feastMonth: 1,
    feastDate: 25,
    century: "4th",
    dates: "329 – 390",
    categories: ["hierarch", "father"],
    body: [
      "Only three saints in the Orthodox calendar carry the title 'Theologian' — the Apostle John, Symeon the New Theologian, and Gregory of Nazianzus. Gregory earned it through his Five Theological Orations, delivered in the tiny chapel of the Anastasis in Constantinople at a time when nearly every other church in the capital was held by Arians.",
      "His preaching converted the city. When the Second Ecumenical Council convened in 381, he presided over its session that confessed the full divinity of the Holy Spirit — completing what Nicaea had begun for the Son. Yet he resigned the patriarchate almost immediately, weary of ecclesiastical politics, and retired to write poetry on his family estate.",
      "Together with his friend Basil he had compiled the Philokalia of Origen and helped formulate Cappadocian Trinitarian theology: one essence, three persons. He died in solitude, and his prose remains among the finest the Church has produced.",
    ],
    quote: {
      text: "What has not been assumed has not been healed; what is united to God is saved.",
      source: "Letter 101, to Cledonius",
    },
  },
  {
    slug: "john-chrysostom",
    name: "John Chrysostom",
    title: "Golden Mouth",
    feastDay: "November 13",
    feastMonth: 11,
    feastDate: 13,
    century: "4th–5th",
    dates: "c. 347 – 407",
    categories: ["hierarch", "father"],
    body: [
      "After years as a hermit in the mountains outside Antioch — where his ascetic excess permanently damaged his stomach — John was ordained priest and quickly became the most celebrated preacher of his age. Listeners stood for hours; his homilies on Genesis, the Psalms, and the Pauline epistles fill twelve volumes and are still printed.",
      "Reluctantly made Archbishop of Constantinople in 397, he attacked clerical luxury and the vices of the imperial court with the same plainness he used in the pulpit. The Empress Eudoxia, stung by his sermons, contrived his exile. He died on the road, escorted by soldiers, his last words: 'Glory to God for all things.'",
      "The Divine Liturgy that bears his name is celebrated on most Sundays of the Orthodox year — making John, in a sense, the priest still presiding at every parish altar. The title Chrysostomos, 'Golden Mouth,' was given him in the centuries after his death.",
    ],
    quote: {
      text: "Glory to God for all things.",
      source: "Last words, on the road to exile",
    },
  },
  {
    slug: "gregory-of-nyssa",
    name: "Gregory of Nyssa",
    title: "Cappadocian Father",
    feastDay: "January 10",
    feastMonth: 1,
    feastDate: 10,
    century: "4th",
    dates: "c. 335 – c. 395",
    categories: ["hierarch", "father"],
    body: [
      "Younger brother of Basil the Great and Macrina the Younger, Gregory was the philosopher of the Cappadocian trio. Where Basil organized and Gregory of Nazianzus preached, Gregory of Nyssa thought — pressing further into the doctrine of the Trinity, the apophatic nature of God, and the doctrine of human deification.",
      "At his sister Macrina's deathbed he composed the dialogue On the Soul and the Resurrection, modeled on Plato's Phaedo but Christian to its core. His Life of Moses presents the ascent of the soul into the divine darkness — a major source for the later mystical tradition.",
      "He attended the Second Ecumenical Council in 381 and is honored by the Church as 'Father of the Fathers.'",
    ],
  },
  {
    slug: "mary-of-egypt",
    name: "Mary of Egypt",
    title: "The Repentant",
    feastDay: "April 1",
    feastMonth: 4,
    feastDate: 1,
    century: "5th",
    dates: "c. 344 – c. 421",
    categories: ["monastic", "woman"],
    body: [
      "Mary ran away from home at twelve and lived seventeen years in Alexandria as a public harlot — not for money, she later said, but for the sheer love of sin. She joined a pilgrimage to Jerusalem chiefly to corrupt the pilgrims. At the entrance to the Church of the Holy Sepulchre, an invisible force prevented her from going in.",
      "Realizing what she was, she wept before an icon of the Theotokos, vowed amendment, received Communion the next day, and crossed the Jordan into the desert. There she lived alone for forty-seven years, naked when her clothes rotted away, fed by herbs.",
      "The hieromonk Zosimas met her by accident in her final year; she told him her story, walked across the Jordan to receive Communion from him at his promise, and on his return a year later was found dead in the sand. Her life is appointed to be read aloud in every Orthodox church on the Fifth Thursday of Great Lent — a yearly answer to despair.",
    ],
    quote: {
      text: "Repentance and resurrection are possible for any sinner, however far gone.",
      source: "Life by St. Sophronius of Jerusalem",
    },
  },
  {
    slug: "macarius-the-great",
    name: "Macarius the Great",
    title: "Of Egypt",
    feastDay: "January 19",
    feastMonth: 1,
    feastDate: 19,
    century: "4th",
    dates: "c. 300 – 391",
    categories: ["monastic"],
    body: [
      "A camel-driver before he became a monk, Macarius settled in the desert of Scetis and gathered around him the community that would become one of the four great monastic centers of Lower Egypt. The Sayings of the Desert Fathers preserve his replies — usually a single sentence — to monks who came to ask him how to be saved.",
      "Asked once how to pray, he answered: 'There is no need at all to make long discourses; it is enough to stretch out one's hands and say, Lord, as you will and as you know, have mercy.' The 'Macarian Homilies,' attributed to him and circulated throughout the Greek and Slavic worlds, were a primary text of later hesychasm.",
    ],
    quote: {
      text: "If you have a heart, you can be saved.",
      source: "Sayings of the Desert Fathers",
    },
  },
  {
    slug: "john-of-damascus",
    name: "John of Damascus",
    title: "Defender of Icons",
    feastDay: "December 4",
    feastMonth: 12,
    feastDate: 4,
    century: "7th–8th",
    dates: "c. 676 – 749",
    categories: ["father", "monastic"],
    body: [
      "Born into a wealthy Christian family in the Umayyad caliphate, John served as a high official in the Damascene treasury before withdrawing to the monastery of Mar Saba in the Judean desert. From there, beyond the reach of the iconoclast emperors of Byzantium, he issued his Three Treatises on the Divine Images.",
      "His argument was simple and decisive: 'I do not worship matter; I worship the God of matter, who became matter for my sake.' Because the invisible God assumed visible flesh, the depiction of His face in an icon is not idolatry but a confession of the Incarnation. The Seventh Ecumenical Council in 787 vindicated his position.",
      "He also composed the Exact Exposition of the Orthodox Faith, the first great systematic theology of the East, and a body of liturgical poetry that includes the Paschal Canon — 'This is the day of Resurrection, let us be illumined, O people' — still sung at every Orthodox Pascha.",
    ],
    quote: {
      text: "I do not worship matter; I worship the God of matter, who became matter for my sake.",
      source: "On the Divine Images, I.16",
    },
  },
  {
    slug: "maximus-the-confessor",
    name: "Maximus the Confessor",
    title: "Theologian of the Two Wills",
    feastDay: "January 21",
    feastMonth: 1,
    feastDate: 21,
    century: "7th",
    dates: "c. 580 – 662",
    categories: ["father", "monastic"],
    body: [
      "Imperial secretary turned monk, Maximus became the great opponent of the Monothelite heresy — the imperial compromise that conceded Christ had two natures but only one will. Maximus answered that if Christ has no human will, He has not saved human willing; salvation is the union of our wills with God's, not their replacement.",
      "Summoned to Constantinople and threatened with anathema, the emperor's officers asked him: 'Are you the only one who is saved, while everyone else is damned?' He replied: 'If everyone communed with the Arians, I would not commune.' For refusing to sign the heretical Typos, his tongue was cut out and his right hand cut off. He died in exile in the Caucasus.",
      "Eighteen years after his death the Sixth Ecumenical Council confirmed his theology word for word. His Ambigua and Chapters on Love are among the most demanding and rewarding texts in the Orthodox tradition.",
    ],
    quote: {
      text: "He who knows the mystery of the cross and the tomb, knows the principles of all things.",
      source: "Chapters on Knowledge",
    },
  },
  {
    slug: "john-climacus",
    name: "John Climacus",
    title: "Of the Ladder",
    feastDay: "March 30",
    feastMonth: 3,
    feastDate: 30,
    century: "6th–7th",
    dates: "c. 579 – c. 649",
    categories: ["monastic"],
    body: [
      "After forty years as a hermit in the Sinai wilderness, John was prevailed upon to become abbot of the monastery at the foot of Mt. Sinai — the monastery now called St. Catherine's. There he wrote, at the request of a fellow abbot, The Ladder of Divine Ascent.",
      "The Ladder is a thirty-rung treatise — one rung for each year of Christ's hidden life — leading the monk from renunciation of the world to the summit of dispassion and love. It is appointed to be read aloud in every Orthodox monastery during Great Lent, and the Fourth Sunday of Lent is named for John.",
      "His teaching on the Jesus Prayer — 'Let the remembrance of Jesus be united with your breathing, and then you will know the value of stillness' — became foundational for all later hesychast spirituality.",
    ],
    quote: {
      text: "Let the remembrance of Jesus be united with your breathing, and then you will know the value of stillness.",
      source: "The Ladder of Divine Ascent, Step 27",
    },
  },
  {
    slug: "gregory-palamas",
    name: "Gregory Palamas",
    title: "Archbishop of Thessaloniki",
    feastDay: "November 14",
    feastMonth: 11,
    feastDate: 14,
    century: "14th",
    dates: "1296 – 1359",
    categories: ["hierarch", "father"],
    body: [
      "A monk of Mt. Athos who became archbishop of Thessaloniki, Gregory defended the hesychasts — monks who practiced the Jesus Prayer and claimed to see the uncreated divine light — against the Calabrian philosopher Barlaam, who held that any such experience must be a created illusion, since the divine essence is unknowable.",
      "Gregory drew the distinction that resolved the controversy: the divine essence is indeed unknowable, but the divine energies — God's actions, His glory, His grace — are truly God and are truly communicated to the saints. The light seen on Tabor at the Transfiguration was the same uncreated light the saints see in prayer.",
      "His theology was vindicated by councils in Constantinople in 1341, 1347, and 1351. The Second Sunday of Great Lent is dedicated to his memory — placed there as a kind of second Sunday of Orthodoxy, confirming that the goal of the Christian life is real participation in God.",
    ],
    quote: {
      text: "God is partaken — and not partaken. The essence is incommunicable; the energies are bestowed.",
      source: "Triads, III.2",
    },
  },
  {
    slug: "symeon-the-new-theologian",
    name: "Symeon the New Theologian",
    feastDay: "March 12",
    feastMonth: 3,
    feastDate: 12,
    century: "10th–11th",
    dates: "949 – 1022",
    categories: ["monastic", "father"],
    body: [
      "Symeon's central insight, won by personal experience and proclaimed with an intensity that scandalized many of his contemporaries, was that the conscious experience of the Holy Spirit is not the privilege of an apostolic age long past but the birthright of every baptized Christian who will seek it.",
      "Born to nobility, tonsured at the Constantinopolitan monastery of Studios and eventually abbot of St. Mamas, Symeon was twice plunged into a vision of uncreated light — once as a young layman, once as a monk — and spent the rest of his life arguing that any Christian who claimed such experience was impossible had simply not tried.",
      "His Hymns of Divine Love and Catechetical Discourses are among the boldest first-person testimonies in Christian literature. He is one of only three saints the Orthodox Church calls 'the Theologian.'",
    ],
    quote: {
      text: "He who has not seen the light has not seen God; for God is light.",
      source: "Discourses, 79",
    },
  },
  {
    slug: "symeon-the-stylite",
    name: "Symeon the Stylite",
    title: "The Pillar-Dweller",
    feastDay: "September 1",
    feastMonth: 9,
    feastDate: 1,
    century: "5th",
    dates: "c. 390 – 459",
    categories: ["monastic"],
    body: [
      "A Syrian shepherd's son, Symeon entered a monastery at sixteen and pushed asceticism beyond what his brethren could tolerate. Asked to leave, he settled on a rock outside Antioch. To escape the crowds that came to gawk and to be touched, he erected a pillar and lived on top of it.",
      "The pillar grew over the years to fifteen meters. From its small platform Symeon prayed, fasted, and preached — answering questions shouted up from below, settling local disputes, reconciling brothers. He stood on that pillar for thirty-seven years, in heat, rain, and snow, until he died on it.",
      "The Stylite movement he founded continued for almost a thousand years. His feast falls on September 1 — the first day of the Orthodox liturgical year, and a fitting opener: the year begins with a man who pointed straight up.",
    ],
  },
  {
    slug: "stephen-protomartyr",
    name: "Stephen the Archdeacon",
    title: "First Martyr",
    feastDay: "December 27",
    feastMonth: 12,
    feastDate: 27,
    century: "1st",
    dates: "d. c. 34",
    categories: ["martyr"],
    body: [
      "Stephen was the first of the Seven appointed by the Apostles to oversee the distribution of food to the Hellenist widows of the Jerusalem community (Acts 6). Full of the Holy Spirit and of wisdom, he could not be answered in debate. Brought before the Sanhedrin on a charge of blasphemy, he delivered a long indictment of his accusers — and was stoned to death outside the walls.",
      "Acts records that as the stones fell he saw the heavens opened and the Son of Man standing at the right hand of God — and that a young man named Saul stood by, holding the cloaks of those who were killing him. The same Saul, soon Paul, would later say his persecution of the Church was the worst thing he had ever done.",
      "Stephen's feast falls inside Christmas — the Church marks the Nativity, then immediately points to where Bethlehem leads.",
    ],
    quote: {
      text: "Lord, lay not this sin to their charge.",
      source: "Acts 7:60",
    },
  },
  {
    slug: "ignatius-of-antioch",
    name: "Ignatius of Antioch",
    title: "The God-Bearer",
    feastDay: "December 20",
    feastMonth: 12,
    feastDate: 20,
    century: "1st–2nd",
    dates: "d. c. 108",
    categories: ["martyr", "hierarch"],
    body: [
      "Third bishop of Antioch and a disciple of the Apostle John, Ignatius was condemned to the beasts under Trajan and conducted overland through Asia Minor to Rome. On that journey, in chains, he wrote seven letters that survive: to the churches of Ephesus, Magnesia, Tralles, Rome, Philadelphia, Smyrna, and to Polycarp.",
      "They are the earliest sustained Christian writing after the New Testament — and they describe a Church with bishops, presbyters, and deacons, gathered around the eucharistic altar, holding fast against early Gnostic distortions. To the Romans he begged that they not try to save him: 'I am the wheat of God; let me be ground by the teeth of the wild beasts that I may become the pure bread of Christ.'",
      "He died in the Roman arena. His title Theophoros — God-bearer — was, by his own account, a name Christ Himself had given him.",
    ],
    quote: {
      text: "I am the wheat of God; let me be ground by the teeth of the wild beasts that I may become the pure bread of Christ.",
      source: "Letter to the Romans, 4",
    },
  },
  {
    slug: "polycarp-of-smyrna",
    name: "Polycarp of Smyrna",
    feastDay: "February 23",
    feastMonth: 2,
    feastDate: 23,
    century: "2nd",
    dates: "c. 69 – 155",
    categories: ["martyr", "hierarch"],
    body: [
      "Bishop of Smyrna for half a century, Polycarp was a personal disciple of the Apostle John and the teacher of Irenaeus of Lyons — a single living memory connecting the apostolic generation to the Church that would face Marcion and the Gnostics.",
      "Arrested at age eighty-six during a wave of local persecution, he was brought to the stadium and offered freedom if he would curse Christ. He answered: 'Eighty and six years have I served Him, and He has done me no wrong; how then can I blaspheme my King who saved me?' The fire that was lit refused to consume him, the executioner finished him with a knife, and the witnesses gathered his bones — 'more precious than jewels' — and buried them.",
      "The account of his martyrdom is the first detailed Christian martyr-narrative outside the New Testament.",
    ],
    quote: {
      text: "Eighty and six years have I served Him, and He has done me no wrong; how then can I blaspheme my King who saved me?",
      source: "Martyrdom of Polycarp, 9",
    },
  },
  {
    slug: "justin-the-philosopher",
    name: "Justin the Philosopher",
    title: "Apologist and Martyr",
    feastDay: "June 1",
    feastMonth: 6,
    feastDate: 1,
    century: "2nd",
    dates: "c. 100 – 165",
    categories: ["martyr", "father"],
    body: [
      "Born to pagan Greeks in Samaria, Justin passed through every philosophical school of his day — Stoic, Peripatetic, Pythagorean, Platonist — before encountering an old man on a beach who pointed him to the Hebrew prophets and to Christ. Justin embraced Christianity as 'the only true and useful philosophy' and continued to wear his philosopher's cloak.",
      "He opened a school in Rome and wrote two Apologies addressed to the emperors, defending Christians against the charges of atheism and cannibalism and giving us the earliest detailed description of a Sunday Eucharist. His Dialogue with Trypho records a long debate with a Jewish interlocutor on the messianic identity of Jesus.",
      "Denounced by a rival philosopher named Crescens, he was beheaded with six of his students under the prefect Junius Rusticus around 165. His authentic court-record survives.",
    ],
  },
  {
    slug: "george-the-trophy-bearer",
    name: "George the Trophy-Bearer",
    title: "Great Martyr",
    feastDay: "April 23",
    feastMonth: 4,
    feastDate: 23,
    century: "3rd–4th",
    dates: "d. 303",
    categories: ["martyr"],
    body: [
      "A Cappadocian by birth, George rose to a high rank in the Roman army under Diocletian. When the persecution began he came forward publicly, distributed his property to the poor, and confessed Christ before the imperial court. He was tortured for many days with extraordinary cruelty — broken on a wheel, boiled in lime, cut with iron — and refused to recant. He was finally beheaded on the eve of Pascha.",
      "The legend of the dragon, attached to him in the medieval West, is much later than the historical core: George is venerated in the East simply as one of the great soldier-martyrs, his courage offered to soldiers and to anyone in danger.",
      "His title Tropaiophoros — 'Trophy-Bearer' — means that he carries the trophy of the cross, having conquered the world through his death.",
    ],
  },
  {
    slug: "demetrius-of-thessaloniki",
    name: "Demetrius of Thessaloniki",
    title: "The Myrrh-Streaming",
    feastDay: "October 26",
    feastMonth: 10,
    feastDate: 26,
    century: "3rd–4th",
    dates: "d. c. 306",
    categories: ["martyr"],
    body: [
      "A young Roman officer in Thessaloniki, Demetrius was arrested under Galerius for openly catechizing the city's Christians. While he awaited execution, his disciple Nestor entered the arena and killed the giant gladiator Lyaeus — Galerius's favorite — invoking Demetrius's name as he struck. Both men were martyred.",
      "Demetrius is venerated as protector of Thessaloniki, where his enormous basilica has stood since the 5th century. From his tomb a fragrant myrrh streams to this day, gathered by pilgrims; the title Myroblytes commemorates it. With St. George he is one of the chief soldier-martyrs of the East.",
    ],
  },
  {
    slug: "nicholas-of-myra",
    name: "Nicholas of Myra",
    title: "The Wonderworker",
    feastDay: "December 6",
    feastMonth: 12,
    feastDate: 6,
    century: "3rd–4th",
    dates: "c. 270 – 343",
    categories: ["hierarch", "wonderworker"],
    body: [
      "Bishop of Myra in Lycia, Nicholas was imprisoned during the Diocletian persecution and freed under Constantine. He attended the First Ecumenical Council in 325 and — according to a beloved tradition — struck Arius across the face when Arius blasphemed the divinity of the Son. Stripped of his episcopal omophorion for the offense, he was vindicated when several bishops saw the Lord and the Theotokos restore them to him in a vision.",
      "Stories of his charity multiplied during his lifetime. To save three sisters from forced prostitution, he threw bags of gold through their window by night — the seed of the Western Santa Claus, which has all but eclipsed the historical bishop.",
      "Sailors call on him in storms; he is a patron of children, of the falsely accused, and of all who are in distress. His relics, translated from Myra to Bari in 1087, stream a fragrant myrrh.",
    ],
  },
  {
    slug: "spyridon-of-trimythous",
    name: "Spyridon of Trimythous",
    title: "The Wonderworker",
    feastDay: "December 12",
    feastMonth: 12,
    feastDate: 12,
    century: "3rd–4th",
    dates: "c. 270 – 348",
    categories: ["hierarch", "wonderworker"],
    body: [
      "A shepherd on Cyprus all his life, Spyridon was elected bishop of Trimythous without ceasing to keep his sheep. At the Council of Nicaea, when philosophers were running circles around the bishops on the Arian question, the unlettered Spyridon stepped forward, took a clay brick in his hand, and squeezed it: water flowed downward, fire shot upward, dust remained — three in one, one in three. The philosopher who had been arguing for Arius was converted.",
      "His incorrupt body rests on Corfu and is carried in procession four times a year. Pilgrims report that his slippers wear out and must be replaced — Spyridon, they say, walks the island still.",
    ],
  },
  {
    slug: "sergius-of-radonezh",
    name: "Sergius of Radonezh",
    title: "Abbot of All Russia",
    feastDay: "September 25",
    feastMonth: 9,
    feastDate: 25,
    century: "14th",
    dates: "1314 – 1392",
    categories: ["monastic", "wonderworker"],
    body: [
      "Born to a noble Rostov family that lost its lands in the Mongol period, Sergius and his brother Stephen built a wooden chapel in the forest forty miles north of Moscow. The forest hermitage grew into the Trinity-Sergius Lavra, the spiritual heart of Russia.",
      "A monk who carried his own water and made his own shoes, Sergius refused to become Metropolitan of Moscow. But in 1380, before the battle of Kulikovo against the Mongols, Grand Prince Dmitri came to him for a blessing. Sergius blessed him and sent two of his monks — Peresvet and Oslyabia — to fight at his side. The Russian victory at Kulikovo is often dated as the beginning of national resurrection.",
      "His disciples founded over forty monasteries across the Russian north, opening a great age of Russian monastic civilization. He is the most beloved of Russian saints.",
    ],
  },
  {
    slug: "seraphim-of-sarov",
    name: "Seraphim of Sarov",
    title: "Wonderworker",
    feastDay: "January 2",
    feastMonth: 1,
    feastDate: 2,
    century: "18th–19th",
    dates: "1754 – 1833",
    categories: ["monastic", "wonderworker", "modern"],
    body: [
      "Born Prokhor Moshnin to a pious merchant family in Kursk, Seraphim entered the monastery of Sarov at nineteen. He spent fifteen years there in obedience and another sixteen as a hermit in the surrounding forest, where he is said to have prayed for one thousand nights on a rock.",
      "After a final period of total enclosure he opened his cell to visitors. To everyone, whether prince or peasant, he gave the same greeting: 'My joy, Christ is risen!' His conversation with the merchant Motovilov, recorded in detail, contains his teaching on the acquisition of the Holy Spirit as the goal of the Christian life — accompanied by a visible transfiguration in which both men, in the snow of a Russian winter, were enveloped in uncreated light.",
      "He reposed on his knees before the icon of the Theotokos he called 'Joy of all Joys.' Glorified in 1903 — the largest glorification in Russian Church history — Seraphim is the most universally loved Russian saint after Sergius.",
    ],
    quote: {
      text: "Acquire the Spirit of peace, and thousands around you will be saved.",
      source: "Conversation with Motovilov",
    },
  },
  {
    slug: "xenia-of-petersburg",
    name: "Xenia of Petersburg",
    title: "Fool for Christ",
    feastDay: "January 24",
    feastMonth: 1,
    feastDate: 24,
    century: "18th",
    dates: "c. 1730 – c. 1803",
    categories: ["foolforchrist", "woman"],
    body: [
      "Widowed at twenty-six when her husband Andrei Feodorovich died suddenly and without confession, Xenia gave away her house and all her possessions, put on her dead husband's military coat, and began to call herself by his name. She refused to answer to Xenia. She walked the streets of St. Petersburg for forty-five years, sleeping in the fields outside the city in winter.",
      "She prayed for her husband and for the city, and her prayers were known to be answered. She would tell a barren woman she would bear a son; she would tell a merchant his shop was on fire when it stood whole. People sought her touch, and she fled them.",
      "She was buried in the Smolensk cemetery, and pilgrims wore her grave away by the handful until a chapel was built over it. She was glorified in 1988 — the one-thousand-year jubilee of the Baptism of Rus. She is the patroness of St. Petersburg.",
    ],
  },
  {
    slug: "john-of-kronstadt",
    name: "John of Kronstadt",
    feastDay: "December 20",
    feastMonth: 12,
    feastDate: 20,
    century: "19th–20th",
    dates: "1829 – 1908",
    categories: ["hierarch", "wonderworker", "modern"],
    body: [
      "Married priest of the Andreevsky Cathedral in Kronstadt — the island naval town outside St. Petersburg — Fr. John was, for almost half a century, the most famous priest in the Russian Empire. He served the Liturgy daily, communing the people daily, in an age when even monthly communion was rare.",
      "His diary My Life in Christ, kept while he was serving, became a spiritual classic in his lifetime. The poor, the alcoholic sailors of the harbor, and the great families of Petersburg all came to him; healings followed his prayers in such numbers that they could not be counted.",
      "He foresaw the coming Russian catastrophe and warned the empire in plain terms. He died in 1908; nine years later the revolution he had predicted began. He was glorified in 1990.",
    ],
  },
  {
    slug: "matrona-of-moscow",
    name: "Matrona of Moscow",
    title: "The Blind Wonderworker",
    feastDay: "May 2",
    feastMonth: 5,
    feastDate: 2,
    century: "19th–20th",
    dates: "1881 – 1952",
    categories: ["wonderworker", "woman", "modern"],
    body: [
      "Born blind and, from the age of seventeen, paralyzed in the legs, Matrona Nikonova was a peasant woman who never left Russia and almost never left her bed. From childhood she possessed spiritual sight — she knew people's names, their sins, and their futures the moment they entered the room.",
      "She lived in Moscow through the terror, the war, and the worst of Stalinism, sheltering in one believer's apartment after another, receiving thousands. She is reported to have been visited by Stalin in 1941; she told him Moscow would not fall.",
      "She reposed in 1952 and was glorified in 1999. Her relics in the Protection Monastery in Moscow are continuously thronged; the line of pilgrims often runs out the gates and around the block.",
    ],
  },
  {
    slug: "nektarios-of-aegina",
    name: "Nektarios of Aegina",
    title: "Wonderworker of Pentapolis",
    feastDay: "November 9",
    feastMonth: 11,
    feastDate: 9,
    century: "19th–20th",
    dates: "1846 – 1920",
    categories: ["hierarch", "wonderworker", "modern"],
    body: [
      "Metropolitan of Pentapolis in the Patriarchate of Alexandria, Nektarios was driven out of his see by slander and spent the rest of his life in poverty in Greece, scrubbing his own floors as director of the Rizareios Seminary in Athens and later founding a small women's monastery on Aegina.",
      "His writings on the soul, on the Theotokos, and on Christian ethics are still standard reading in Greek seminaries. He died of cancer in a charity hospital in 1920; an old man in the bed next to his received the patient's clothes after the body was removed, and was healed of a paralysis the moment they touched him. This was the first of thousands of healings reported through Nektarios.",
      "He was glorified in 1961 — the first new saint to be recognized in modern Greece in centuries — and remains the most beloved Greek saint of the modern era.",
    ],
  },
  {
    slug: "silouan-the-athonite",
    name: "Silouan the Athonite",
    feastDay: "September 24",
    feastMonth: 9,
    feastDate: 24,
    century: "19th–20th",
    dates: "1866 – 1938",
    categories: ["monastic", "modern"],
    body: [
      "A Russian peasant who came to Mt. Athos in 1892 and entered the monastery of St. Panteleimon, Silouan worked for over forty years in the storehouse, hardly leaving the monastery's grounds. To outward eyes he was an ordinary monk; inwardly he had received, in a vision in his cell, the living Christ.",
      "Years of demonic assault and abandonment by grace gave him the teaching for which he is remembered: 'Keep thy mind in hell, and despair not.' His prayer for the whole world — for unbelievers, for enemies, for those in torments — was so wide that it became proverbial in twentieth-century Orthodoxy.",
      "His writings were preserved and edited by his disciple, the future Archimandrite Sophrony, and published as Saint Silouan the Athonite. He was glorified in 1987.",
    ],
    quote: {
      text: "Keep thy mind in hell, and despair not.",
      source: "Words of the Lord to Silouan",
    },
  },
  {
    slug: "john-maximovitch",
    name: "John Maximovitch",
    title: "of Shanghai and San Francisco",
    feastDay: "July 2",
    feastMonth: 7,
    feastDate: 2,
    century: "20th",
    dates: "1896 – 1966",
    categories: ["hierarch", "wonderworker", "modern"],
    body: [
      "Born Mikhail Maximovitch in Kharkov, he fled the Russian revolution, became a monk under Metropolitan Anthony Khrapovitsky, and was consecrated bishop of Shanghai in 1934. He stood watch over his flock through the Japanese occupation, the civil war, and the Communist takeover, and led them in their final exodus — first to the Philippines, then to the United States.",
      "He served as archbishop of San Francisco from 1962 until his death in 1966. He wore the simplest robes, walked barefoot, slept upright in a chair if he slept at all, and was seen by his clergy at the same instant in places hundreds of miles apart. Healings followed his prayers wherever he went.",
      "His incorrupt body lies in the cathedral he built in San Francisco. He was glorified in 1994.",
    ],
  },
  {
    slug: "paisios-of-mt-athos",
    name: "Paisios of Mt. Athos",
    feastDay: "July 12",
    feastMonth: 7,
    feastDate: 12,
    century: "20th",
    dates: "1924 – 1994",
    categories: ["monastic", "modern", "wonderworker"],
    body: [
      "Born Arsenios Eznepidis in Cappadocia and raised in Greece, Paisios fought in the Greek civil war, embraced monasticism, and settled on Mt. Athos in 1950. From his hermitage of Panagouda thousands sought him each year — businessmen, athletes, politicians, the broken — and went home unburdened.",
      "Plain-spoken to a degree his interlocutors sometimes found shocking, Paisios specialized in joy. He saw and said what was wrong without losing tenderness. His Counsels, transcribed by visitors and published after his death, are among the most widely-read spiritual books in twenty-first-century Greece.",
      "He died of cancer in 1994 and was glorified in 2015 — twenty-one years later, an unusually rapid canonization that confirmed the universal popular veneration he had already received.",
    ],
  },
  {
    slug: "porphyrios-of-kafsokalyvia",
    name: "Porphyrios of Kafsokalyvia",
    feastDay: "December 2",
    feastMonth: 12,
    feastDate: 2,
    century: "20th",
    dates: "1906 – 1991",
    categories: ["monastic", "modern"],
    body: [
      "Tonsured at fifteen at the Kafsokalyvia skete on Mt. Athos and ordained priest at twenty-one — an age so young that an episcopal dispensation was required — Porphyrios spent most of his pastoral life as chaplain of the Athens Polyclinic, where he heard confessions for thirty-three years.",
      "His gift was the discernment of hidden things. He saw events at a distance, illnesses still unannounced, and the inner state of every soul that came to him. He gave a single piece of advice repeatedly: 'Christ is everything. He is our joy, our light, our peace.'",
      "He returned to Athos to die, asking that his grave be unmarked. He was glorified in 2013.",
    ],
  },
  {
    slug: "justin-popovic",
    name: "Justin Popović",
    title: "of Ćelije",
    feastDay: "June 1",
    feastMonth: 6,
    feastDate: 1,
    century: "20th",
    dates: "1894 – 1979",
    categories: ["monastic", "father", "modern"],
    body: [
      "The most important Serbian theologian of the twentieth century, Justin Popović was a monk-priest, theological writer, and confessor under Communist persecution. Expelled from his theology chair by the Tito regime, he spent the last three decades of his life as confessor at the women's monastery of Ćelije.",
      "His Dogmatics of the Orthodox Church, written in Serbian, is a vast synthesis of patristic theology. His Lives of the Saints — twelve volumes, one for each month — is a reworking of the calendar that has shaped Serbian devotion for two generations.",
      "He was glorified in 2010.",
    ],
  },
  {
    slug: "innocent-of-alaska",
    name: "Innocent of Alaska",
    title: "Apostle to America",
    feastDay: "March 31",
    feastMonth: 3,
    feastDate: 31,
    century: "19th",
    dates: "1797 – 1879",
    categories: ["hierarch", "modern"],
    body: [
      "Born Ivan Veniaminov in the Siberian village of Anginskoe, he volunteered as a married priest for the Russian American mission and arrived at Unalaska in 1824. Over the next four decades he learned six Native languages, devised an alphabet for Aleut, translated the Gospel of Matthew and the Divine Liturgy into it, and built churches and schools the length of the Aleutian chain.",
      "Widowed in 1839, he was tonsured Innocent and consecrated bishop the next year, becoming the first Orthodox bishop in the Americas. He later returned to Russia and ended his life as Metropolitan of Moscow.",
      "His Indication of the Way to the Kingdom of Heaven — written in Aleut — is one of the great works of nineteenth-century Russian catechesis.",
    ],
  },
  {
    slug: "herman-of-alaska",
    name: "Herman of Alaska",
    feastDay: "August 9",
    feastMonth: 8,
    feastDate: 9,
    century: "18th–19th",
    dates: "1756 – 1837",
    categories: ["monastic", "modern", "wonderworker"],
    body: [
      "One of the original ten monks of the Valaam mission sent to Russian America in 1794, Herman alone among them remained on the islands until his death forty-three years later. He never accepted ordination; he lived as a simple monk on Spruce Island, near Kodiak.",
      "He defended the Aleut and Tlingit people against the Russian-American Company, taught children to read, ran an orphanage, and prayed. He is reported to have stopped a tsunami at the shoreline of his island by setting an icon of the Theotokos on the sand.",
      "He was glorified in 1970 — the first canonization on American soil. He is the patron saint of North America.",
    ],
  },
  {
    slug: "nina-of-georgia",
    name: "Nina of Georgia",
    title: "Equal-to-the-Apostles",
    feastDay: "January 14",
    feastMonth: 1,
    feastDate: 14,
    century: "4th",
    dates: "c. 280 – 335",
    categories: ["woman"],
    body: [
      "A young woman from Cappadocia, kin to St. George, Nina entered Iberia (Georgia) carrying a cross of grapevine tied with her own hair. She lived in a bramble hedge outside Mtskheta, prayed at the queen's bedside until the queen was healed, and converted King Mirian after his vision of light in a darkened forest.",
      "By the end of her life Georgia was a Christian kingdom. The cross of grapevine she carried is preserved in Tbilisi. The grapevine cross — its arms drooping downward — became the national symbol of Georgian Christianity.",
    ],
  },
  {
    slug: "olga-of-kiev",
    name: "Olga of Kiev",
    title: "Equal-to-the-Apostles",
    feastDay: "July 11",
    feastMonth: 7,
    feastDate: 11,
    century: "10th",
    dates: "c. 890 – 969",
    categories: ["woman"],
    body: [
      "Widow of the Kievan prince Igor, Olga ruled as regent for her son Svyatoslav. In 957 she traveled to Constantinople and was baptized in Hagia Sophia by the Patriarch, with the Emperor Constantine VII as her godfather. She brought back a Greek priest and tried unsuccessfully to convert her son and her people.",
      "She died in 969. Her grandson Vladimir, twenty years later, would baptize all of Rus. The seed Olga had planted, against every appearance of failure, broke the ground.",
    ],
  },
  {
    slug: "vladimir-of-kiev",
    name: "Vladimir of Kiev",
    title: "Equal-to-the-Apostles",
    feastDay: "July 15",
    feastMonth: 7,
    feastDate: 15,
    century: "10th–11th",
    dates: "958 – 1015",
    categories: ["modern"],
    body: [
      "Pagan warlord, fratricide, and polygamist, Vladimir of Kiev decided in his mid-life to find a religion for his people. He sent envoys to investigate the religions of his neighbors. Of the Latin Mass they reported only ritual; of Islam, that the prohibition of wine made it unworkable for Russians; of the Liturgy in Hagia Sophia, the envoys said: 'We knew not whether we were in heaven or on earth, for surely there is no such splendor on earth.'",
      "Vladimir was baptized in 988, married the Byzantine princess Anna, and ordered the mass baptism of his people in the Dnieper. He razed the idols, founded churches and schools, gave alms on a vast scale, and forbade capital punishment — clerics had to persuade him to take it up again to govern. The empire of the Rus was Christian from that day.",
    ],
  },
  {
    slug: "catherine-of-alexandria",
    name: "Catherine of Alexandria",
    title: "Great Martyr",
    feastDay: "November 25",
    feastMonth: 11,
    feastDate: 25,
    century: "4th",
    dates: "d. c. 305",
    categories: ["martyr", "woman"],
    body: [
      "A young noblewoman of Alexandria, learned in philosophy and rhetoric, Catherine came to the court of the Emperor Maximinus to protest his persecution of Christians. He summoned fifty philosophers to refute her. By morning she had converted them all, and they were martyred.",
      "She was offered marriage to the emperor and refused, was tortured on a spiked wheel which broke at her touch, and was beheaded. Her relics rest at the monastery of St. Catherine at the foot of Mt. Sinai — the oldest continuously inhabited monastery in Christendom, founded by Justinian in the 6th century.",
    ],
  },
  {
    slug: "barbara",
    name: "Barbara",
    title: "Great Martyr",
    feastDay: "December 4",
    feastMonth: 12,
    feastDate: 4,
    century: "3rd",
    dates: "d. c. 306",
    categories: ["martyr", "woman"],
    body: [
      "Shut up in a tower by her pagan father Dioscorus to keep her from the world, Barbara converted to Christianity in secret. When her father discovered she had ordered a third window cut into her bath-house, in honor of the Trinity, he denounced her to the authorities. The Roman governor tortured her and ordered her executed. Her father volunteered to behead her himself, and on the way home was struck by lightning.",
      "Barbara is invoked against sudden death and is the patroness of artillerymen, miners, and anyone who works with explosives.",
    ],
  },
  {
    slug: "isaac-the-syrian",
    name: "Isaac the Syrian",
    title: "of Nineveh",
    feastDay: "January 28",
    feastMonth: 1,
    feastDate: 28,
    century: "7th",
    dates: "c. 613 – c. 700",
    categories: ["monastic", "father"],
    body: [
      "Bishop of Nineveh for only five months before he resigned to return to his solitude, Isaac of Nineveh wrote homilies on the ascetic life that became, in their Greek translation, one of the most influential spiritual texts in the Eastern Christian world. They were a chief source for Russian elders from Paissy Velichkovsky to Seraphim of Sarov.",
      "Isaac wrote of the heart that burns with compassion 'for the whole creation, for men, for birds, for beasts, for demons, and for every created thing.' He may be the most universally loved ascetic writer of any tradition.",
    ],
    quote: {
      text: "What is a merciful heart? It is a heart on fire for the whole of creation, for humanity, for the birds, for the animals, for demons, and for all that exists.",
      source: "Ascetical Homilies, 81",
    },
  },
  {
    slug: "cyril-and-methodius",
    name: "Cyril and Methodius",
    title: "Equals-to-the-Apostles",
    feastDay: "May 11",
    feastMonth: 5,
    feastDate: 11,
    century: "9th",
    dates: "Cyril 827–869; Methodius c. 815–885",
    categories: ["father"],
    body: [
      "Two brothers from Thessaloniki, learned in Greek and Slavonic, were sent by the Patriarch Photios in 863 at the request of Prince Rostislav of Moravia to evangelize the Slavs in their own tongue. They invented the Glagolitic alphabet (ancestor of the Cyrillic) and translated the Gospels, the Liturgy, and the Psalter into Old Church Slavonic.",
      "Cyril died in Rome at forty-two; Methodius continued the mission as bishop of Moravia until his death in 885. Their disciples — Clement, Naum, and others — fled persecution by German clergy and carried the Slavonic mission southeast, planting it permanently among the Bulgarians, Serbs, and Russians.",
      "Every Liturgy served in Slavonic for the past 1,100 years has been served in their translation.",
    ],
  },
  {
    slug: "macrina-the-younger",
    name: "Macrina the Younger",
    feastDay: "July 19",
    feastMonth: 7,
    feastDate: 19,
    century: "4th",
    dates: "c. 327 – 379",
    categories: ["monastic", "woman"],
    body: [
      "Eldest of the ten children of Basil the Elder, sister and teacher of Basil the Great and Gregory of Nyssa, Macrina was betrothed at twelve. When her fiancé died she refused all other proposals, considering herself a widow already, and founded on the family estate one of the earliest monastic communities of women in the Roman world.",
      "Her brother Gregory's dialogue On the Soul and the Resurrection records her last conversation with him on her deathbed — a philosophical exposition equal in depth to any of the great Cappadocian works, delivered by a woman in the act of dying. Gregory's Life of Macrina is one of the first biographies of a woman in Christian literature.",
    ],
  },
  {
    slug: "peter-and-paul",
    name: "Peter and Paul",
    title: "Chief Apostles",
    feastDay: "June 29",
    feastMonth: 6,
    feastDate: 29,
    century: "1st",
    dates: "Both martyred c. 64–67",
    categories: ["apostle", "martyr"],
    body: [
      "The Church commemorates them on one day — the fisherman and the Pharisee, brought together by the Risen Christ. Peter was crucified upside down at Rome under Nero, judging himself unworthy to die as the Master had died. Paul, a Roman citizen, was beheaded outside the city on the Ostian Way.",
      "Their joint feast follows a two-week fast — the Apostles' Fast — and falls in the brightness of high summer. The Church calls them by the same title: Coryphaei, the Chief Apostles. Peter preached the foundational sermon at Pentecost; Paul wrote half the New Testament. Between them they opened the Church to Jew and Gentile.",
    ],
  },
  {
    slug: "john-the-theologian",
    name: "John the Theologian",
    title: "The Beloved Disciple",
    feastDay: "September 26",
    feastMonth: 9,
    feastDate: 26,
    century: "1st",
    dates: "d. c. 100",
    categories: ["apostle"],
    body: [
      "Younger son of Zebedee, brother of James, John was the disciple who leaned on the Lord's breast at the Mystical Supper, who stood at the Cross when the others fled, and to whom Christ entrusted His mother. He is the only apostle, by tradition, who did not die a martyr's death — though he was exiled, tortured, and dropped into boiling oil.",
      "He wrote a Gospel that is unlike the other three, three epistles, and — on the island of Patmos in his old age — the Apocalypse. The Church gives him the title 'Theologian' because his Gospel opens not with a genealogy but with the eternal Word: 'In the beginning was the Word, and the Word was with God, and the Word was God.'",
      "He is celebrated three times in the year: on his repose (Sept 26), on the translation of his relics (May 8), and with all the apostles.",
    ],
  },
  {
    slug: "andrew-the-first-called",
    name: "Andrew the First-Called",
    feastDay: "November 30",
    feastMonth: 11,
    feastDate: 30,
    century: "1st",
    dates: "d. c. 60",
    categories: ["apostle", "martyr"],
    body: [
      "Brother of Peter, fisherman of Bethsaida, Andrew was a disciple of John the Baptist before Christ called him on the Jordan — 'and he found his own brother Simon, and saith unto him, We have found the Messiah.' He is the First-Called.",
      "Tradition assigns him the evangelization of Scythia and the regions north of the Black Sea — including, by long tradition, the place where Kiev would one day stand. He was martyred at Patras, in southern Greece, on a transverse cross — the saltire that bears his name and that flies on the flag of Scotland, whose patron he is.",
    ],
  },
  {
    slug: "mary-magdalene",
    name: "Mary Magdalene",
    title: "Equal-to-the-Apostles",
    feastDay: "July 22",
    feastMonth: 7,
    feastDate: 22,
    century: "1st",
    categories: ["apostle", "woman"],
    body: [
      "The Lord cast seven demons out of her (Luke 8:2), and she followed Him from Galilee to the Cross. She did not flee on Holy Friday. She stood at the tomb on the third day, and to her — first of all human beings — the Risen Christ appeared and spoke her name in the garden.",
      "She is called 'Equal-to-the-Apostles' because she carried the Resurrection to the apostles before they had seen Him. Later tradition sends her to Rome, where she is said to have appeared before Tiberius Caesar with a red egg, declaring 'Christ is risen!' — the origin of the Paschal egg.",
      "She is buried, by tradition, at Ephesus, where she lived out her life in the household of the Apostle John.",
    ],
    quote: {
      text: "I have seen the Lord!",
      source: "John 20:18",
    },
  },
  {
    slug: "ambrose-of-optina",
    name: "Ambrose of Optina",
    feastDay: "October 10",
    feastMonth: 10,
    feastDate: 10,
    century: "19th",
    dates: "1812 – 1891",
    categories: ["monastic", "wonderworker", "modern"],
    body: [
      "Most beloved of the Optina elders, Fr. Ambrose served as starets of the Optina Hermitage for thirty years. The poor of Russia came to him by the thousand; so did Dostoevsky, who modeled the elder Zosima of The Brothers Karamazov on him, and Tolstoy, who came to him three times and could not bring himself to repent.",
      "Bedridden for much of his ministry, Ambrose answered hundreds of letters daily and received pilgrims with a particular tenderness for the desperate. He spoke in proverbs and rhymes that have entered the Russian language. He died at Shamordino, the women's convent he had founded, in 1891. He was glorified in 1988.",
    ],
    quote: {
      text: "Live simply, and the Lord will save you.",
      source: "Counsel to a pilgrim",
    },
  },
  {
    slug: "pelagia-of-antioch",
    name: "Pelagia of Antioch",
    title: "The Penitent",
    feastDay: "October 8",
    feastMonth: 10,
    feastDate: 8,
    century: "5th",
    categories: ["monastic", "woman"],
    body: [
      "A celebrated dancer and courtesan of Antioch, Pelagia rode through the city dressed in jewels and was the toast of its theaters. One day she crossed paths with a synod of bishops outside a church. They averted their eyes; only Bishop Nonnus looked at her, and wept — because she took more care to please men than he, a bishop, took to please God.",
      "His sermon converted her. She was baptized, gave away her wealth, dressed as a man, and went to Jerusalem to live as a hermit on the Mount of Olives. Years later, when she was discovered dead in her cell, the monks who buried her learned for the first time that the man they had called Brother Pelagius was a woman.",
    ],
  },
];

function dedupBySlug(arrays: SaintLife[][]): SaintLife[] {
  const map = new Map<string, SaintLife>();
  for (const arr of arrays) {
    for (const s of arr) {
      // First entry wins, so the seed corpus takes precedence over batches,
      // and earlier batches take precedence over later ones.
      if (!map.has(s.slug)) map.set(s.slug, s);
    }
  }
  return [...map.values()];
}

export const saints: SaintLife[] = dedupBySlug([
  seedSaints,
  batch1,
  batch2,
  batch3,
  batch4,
  batch5,
]);

export function getSaint(slug: string): SaintLife | undefined {
  return saints.find((s) => s.slug === slug);
}

export function saintsAlphabetical(): SaintLife[] {
  return [...saints].sort((a, b) => a.name.localeCompare(b.name));
}

export function saintsByFeast(): SaintLife[] {
  return [...saints].sort((a, b) =>
    a.feastMonth !== b.feastMonth
      ? a.feastMonth - b.feastMonth
      : a.feastDate - b.feastDate
  );
}
