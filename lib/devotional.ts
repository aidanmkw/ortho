import { saints, type SaintLife } from "./saints";

// A daily devotional assembled from content the app can stand behind:
//   • the saint(s) the Church commemorates today (from the 254 lives)
//   • a Scripture reading (curated devotional passages, below)
//   • a word from the Fathers (drawn from the saints' own attributed quotes)
//   • a closing prayer (traditional Orthodox prayers, below)
//
// The selection is seeded by the calendar date, so it is stable within a day
// and rotates across days. This is a devotional reading, not the precise
// movable lectionary (which depends on the Paschal cycle and a backend to
// compute reliably).

export type DevotionalScripture = {
  ref: string;
  text: string;
  translation: string;
};

export type DevotionalPrayer = {
  title: string;
  text: string;
};

export type Devotional = {
  dateLabel: string;
  saints: SaintLife[];
  scripture: DevotionalScripture;
  fatherWord: { text: string; source: string };
  prayer: DevotionalPrayer;
};

// --- Curated devotional Scripture (beloved passages, with text) -------------

const SCRIPTURES: DevotionalScripture[] = [
  {
    ref: "Matthew 5:3–8",
    translation: "EOB",
    text: "Blessed are the poor in spirit, for theirs is the Kingdom of Heaven. Blessed are those who mourn, for they shall be comforted. Blessed are the meek, for they shall inherit the earth. Blessed are those who hunger and thirst for righteousness, for they shall be filled. Blessed are the merciful, for they shall obtain mercy. Blessed are the pure in heart, for they shall see God.",
  },
  {
    ref: "Matthew 11:28–30",
    translation: "EOB",
    text: "Come to me, all you who labor and are heavily burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.",
  },
  {
    ref: "John 1:1–5",
    translation: "EOB",
    text: "In the beginning was the Word, and the Word was with God, and the Word was God. The same was in the beginning with God. All things were made through him, and without him nothing was made that has been made. In him was life, and the life was the light of mankind. The light shines in the darkness, and the darkness has not overcome it.",
  },
  {
    ref: "John 15:4–5",
    translation: "EOB",
    text: "Remain in me, and I in you. As the branch cannot bear fruit by itself unless it remains in the vine, so neither can you unless you remain in me. I am the vine; you are the branches. The one who remains in me and I in him bears much fruit, for apart from me you can do nothing.",
  },
  {
    ref: "1 Corinthians 13:4–7",
    translation: "EOB",
    text: "Love is patient and is kind. Love does not envy. Love does not brag, is not proud, does not behave inappropriately, does not seek its own way, is not provoked, takes no account of evil. It does not rejoice in unrighteousness, but rejoices with the truth. It bears all things, believes all things, hopes all things, endures all things.",
  },
  {
    ref: "Romans 8:38–39",
    translation: "EOB",
    text: "For I am persuaded that neither death, nor life, nor angels, nor principalities, nor things present, nor things to come, nor powers, nor height, nor depth, nor any other created thing will be able to separate us from the love of God which is in Christ Jesus our Lord.",
  },
  {
    ref: "Philippians 4:4–7",
    translation: "EOB",
    text: "Rejoice in the Lord always! Again I will say, rejoice! Let your gentleness be known to all. The Lord is near. In nothing be anxious, but in everything, by prayer and supplication with thanksgiving, let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.",
  },
  {
    ref: "Psalm 50:10–12",
    translation: "Brenton LXX",
    text: "Create in me a clean heart, O God; and renew a right spirit within me. Cast me not away from your presence; and remove not your Holy Spirit from me. Restore to me the joy of your salvation, and uphold me with your directing Spirit.",
  },
  {
    ref: "Psalm 22:1–4",
    translation: "Brenton LXX",
    text: "The Lord is my shepherd; I shall not want. In a place of green grass, there he has made me dwell; he has nourished me by the water of rest. He has restored my soul; he has guided me into the paths of righteousness, for his name's sake. Yea, even if I walk in the midst of the shadow of death, I will fear no evil, for you are with me.",
  },
  {
    ref: "Psalm 33:8",
    translation: "Brenton LXX",
    text: "O taste and see that the Lord is good; blessed is the man that hopes in him.",
  },
  {
    ref: "Isaiah 40:31",
    translation: "Brenton LXX",
    text: "But those who wait on God shall renew their strength; they shall put forth new feathers like eagles; they shall run and not be weary; they shall walk and not hunger.",
  },
  {
    ref: "Matthew 6:19–21",
    translation: "EOB",
    text: "Do not lay up treasures for yourselves on the earth, where moth and rust consume, and where thieves break through and steal; but lay up for yourselves treasures in heaven. For where your treasure is, there your heart will be also.",
  },
  {
    ref: "Luke 18:13–14",
    translation: "EOB",
    text: "But the tax collector, standing far away, would not even lift up his eyes to heaven, but beat his breast, saying, 'God, be merciful to me, a sinner!' I tell you, this man went down to his house justified rather than the other; for everyone who exalts himself will be humbled, but he who humbles himself will be exalted.",
  },
  {
    ref: "1 John 4:7–8",
    translation: "EOB",
    text: "Beloved, let us love one another, for love is of God; and everyone who loves has been born of God and knows God. The one who does not love does not know God, for God is love.",
  },
  {
    ref: "Hebrews 12:1–2",
    translation: "EOB",
    text: "Therefore, since we are surrounded by so great a cloud of witnesses, let us also lay aside every weight and the sin that so easily entangles us, and let us run with endurance the race that is set before us, looking to Jesus, the author and perfecter of our faith.",
  },
  {
    ref: "Matthew 5:14–16",
    translation: "EOB",
    text: "You are the light of the world. A city set on a hill cannot be hidden. Let your light shine before others, that they may see your good works and glorify your Father who is in heaven.",
  },
  {
    ref: "John 14:27",
    translation: "EOB",
    text: "Peace I leave with you. My peace I give to you; not as the world gives, do I give to you. Do not let your heart be troubled, neither let it be afraid.",
  },
  {
    ref: "Galatians 5:22–23",
    translation: "EOB",
    text: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control. Against such things there is no law.",
  },
  {
    ref: "1 Thessalonians 5:16–18",
    translation: "EOB",
    text: "Rejoice always. Pray without ceasing. In everything give thanks, for this is the will of God in Christ Jesus toward you.",
  },
  {
    ref: "Psalm 90:1–2",
    translation: "Brenton LXX",
    text: "He that dwells in the help of the Highest shall abide under the shelter of the God of heaven. He shall say to the Lord, You are my helper and my refuge; my God, I will hope in him.",
  },
];

// --- Traditional Orthodox prayers -------------------------------------------

const PRAYERS: DevotionalPrayer[] = [
  {
    title: "The Jesus Prayer",
    text: "Lord Jesus Christ, Son of God, have mercy on me, a sinner.",
  },
  {
    title: "The Trisagion",
    text: "Holy God, Holy Mighty, Holy Immortal, have mercy on us. (thrice)",
  },
  {
    title: "O Heavenly King",
    text: "O Heavenly King, the Comforter, the Spirit of Truth, who are everywhere present and fill all things, Treasury of good things and Giver of life: come and abide in us, and cleanse us from every impurity, and save our souls, O Good One.",
  },
  {
    title: "Prayer of the Optina Elders (morning)",
    text: "O Lord, grant that I may meet all that this coming day brings to me with spiritual tranquility. Grant that I may fully surrender myself to your holy will. In every hour of this day, direct and support me in all things. Whatsoever news may reach me in the course of the day, teach me to accept it with a calm soul and the firm conviction that all is subject to your holy will.",
  },
  {
    title: "Prayer to the Theotokos",
    text: "It is truly meet to bless you, O Theotokos, ever-blessed and most pure, and the Mother of our God. More honorable than the cherubim, and beyond compare more glorious than the seraphim; without corruption you gave birth to God the Word. True Theotokos, we magnify you.",
  },
  {
    title: "Prayer of St. Ephrem the Syrian",
    text: "O Lord and Master of my life, take from me the spirit of sloth, despondency, lust of power, and idle talk. But give rather the spirit of chastity, humility, patience, and love to your servant. Yea, O Lord and King, grant me to see my own transgressions, and not to judge my brother; for blessed are you unto ages of ages. Amen.",
  },
  {
    title: "A Prayer of Thanksgiving",
    text: "Glory to God for all things. Glory to you, O God, for the long path of life; glory to you, who has shown me joys without number; glory to you for every sigh of my sorrow. Glory to you, O God, unto ages of ages.",
  },
  {
    title: "Prayer Before Reading",
    text: "Shine within our hearts, O Master who loves mankind, the pure light of your divine knowledge, and open the eyes of our mind that we may comprehend the message of your Gospel.",
  },
  {
    title: "Evening Prayer of St. John Chrysostom",
    text: "O Lord, deprive me not of your heavenly blessings. O Lord, deliver me from eternal torment. O Lord, if I have sinned in word or deed, in mind or spirit, forgive me. Lord, save the suffering and the afflicted. Lord, visit the sick and grant them healing.",
  },
  {
    title: "The Publican's Prayer",
    text: "God, be merciful to me, a sinner.",
  },
];

// --- Selection --------------------------------------------------------------

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FATHER_WORDS: { text: string; source: string }[] = saints
  .filter((s) => s.quote && s.quote.text)
  .map((s) => ({
    text: s.quote!.text,
    source: s.quote!.source ? `${s.name} — ${s.quote!.source}` : s.name,
  }));

export function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function saintsForDate(d: Date): SaintLife[] {
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return saints.filter((s) => s.feastMonth === m && s.feastDate === day);
}

export function getDevotional(d: Date = new Date()): Devotional {
  const key = dateKey(d);
  const rng = mulberry32(hashSeed(key));

  const todaysSaints = saintsForDate(d);

  const scripture = SCRIPTURES[Math.floor(rng() * SCRIPTURES.length)];

  // Prefer a quote from one of today's saints when available; else seeded pick.
  const saintWithQuote = todaysSaints.find((s) => s.quote && s.quote.text);
  const fatherWord = saintWithQuote
    ? {
        text: saintWithQuote.quote!.text,
        source: saintWithQuote.quote!.source
          ? `${saintWithQuote.name} — ${saintWithQuote.quote!.source}`
          : saintWithQuote.name,
      }
    : FATHER_WORDS[Math.floor(rng() * FATHER_WORDS.length)];

  const prayer = PRAYERS[Math.floor(rng() * PRAYERS.length)];

  const dateLabel = d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return { dateLabel, saints: todaysSaints, scripture, fatherWord, prayer };
}
