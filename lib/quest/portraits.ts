// Portrait configuration for each character.
// Each portrait is rendered as an SVG illustration in a Byzantine-icon-inspired
// flat style. When `image` is provided, that image file in /public/portraits/
// is used instead of the SVG (this is how the user swaps in real
// AI-generated portrait art).

export type Skin = "pale" | "light" | "tan" | "dark" | "shadow";
export type HairColor =
  | "black"
  | "brown"
  | "gold"
  | "white"
  | "gray"
  | "ginger"
  | "none"; // bald or covered
export type HairStyle = "short" | "long" | "tonsure" | "bald" | "modern";
export type Beard = "none" | "short" | "long" | "very-long" | "stubble";
export type Headwear =
  | "none"
  | "halo"
  | "halo-bright"
  | "skufia"      // monastic black cap
  | "klobuk"      // black monastic veil
  | "mitre"       // bishop's gold mitre
  | "tiara"       // papal triple crown
  | "galero"      // wide red cardinal hat
  | "stemma"      // Byzantine imperial crown w/ pearl strings
  | "helmet"      // Roman crested helmet
  | "laurel"      // pagan laurel wreath
  | "ushanka"     // soviet peaked cap
  | "modern-tie"  // tidy missionary look
  | "hood-shadow" // demon hood
  | "void-shadow" // doubt
  | "imperial-laurel";
export type Vestment =
  | "monk-brown"
  | "monk-black"
  | "bishop-white"
  | "bishop-purple"
  | "bishop-crimson"
  | "imperial-purple"
  | "centurion"
  | "toga-white"
  | "modern-hoodie"
  | "modern-shirt-tie"
  | "modern-sweater"
  | "modern-collared"
  | "soviet-tunic"
  | "deacon-purple"
  | "cardinal-crimson"
  | "papal-white"
  | "shadow"
  | "void";
export type Symbol =
  | "none"
  | "cross"
  | "book"
  | "scroll"
  | "sword"
  | "icon"
  | "chains"
  | "wheel"
  | "lily"
  | "flame"
  | "star";
export type EyeStyle = "normal" | "narrow" | "hollow" | "glowing-red" | "void";

export type PortraitConfig = {
  // If provided, an actual image file replaces the SVG.
  // Place file at /public/portraits/<image>
  image?: string;
  // Character info (drives SVG rendering)
  skin: Skin;
  hairStyle: HairStyle;
  hairColor: HairColor;
  beard: Beard;
  beardColor?: HairColor;        // defaults to hairColor
  headwear: Headwear;
  vestment: Vestment;
  symbol?: Symbol;               // held / shown in lower portion
  eyes?: EyeStyle;
  // Name plaque (Byzantine inscription style)
  name?: string;
  nameSubscript?: string;        // e.g. "ALEXANDREIA"
};

export const PORTRAITS: Record<string, PortraitConfig> = {
  "st-anthony": {
    image: "st-anthony.webp",
    skin: "pale",
    hairStyle: "short",
    hairColor: "white",
    beard: "very-long",
    beardColor: "white",
    headwear: "halo",
    vestment: "monk-brown",
    symbol: "cross",
    name: "St. Anthony",
    nameSubscript: "ho Megas",
  },
  "st-ignatius": {
    image: "st-ignatius.webp",
    skin: "pale",
    hairStyle: "short",
    hairColor: "gray",
    beard: "long",
    beardColor: "gray",
    headwear: "halo",
    vestment: "bishop-white",
    symbol: "chains",
    name: "St. Ignatius",
    nameSubscript: "of Antioch",
  },
  "st-athanasius": {
    image: "st-athanasius.webp",
    skin: "light",
    hairStyle: "short",
    hairColor: "black",
    beard: "short",
    beardColor: "black",
    headwear: "halo",
    vestment: "bishop-crimson",
    symbol: "scroll",
    name: "St. Athanasius",
    nameSubscript: "the Great",
  },
  "st-macarius": {
    image: "st-macarius.webp",
    skin: "tan",
    hairStyle: "short",
    hairColor: "white",
    beard: "long",
    beardColor: "white",
    headwear: "halo",
    vestment: "monk-brown",
    symbol: "cross",
    name: "St. Macarius",
    nameSubscript: "of Egypt",
  },
  "st-cyril": {
    image: "st-cyril.webp",
    skin: "light",
    hairStyle: "short",
    hairColor: "brown",
    beard: "long",
    beardColor: "brown",
    headwear: "mitre",
    vestment: "bishop-white",
    symbol: "scroll",
    name: "St. Cyril",
    nameSubscript: "of Alexandria",
  },
  "st-john-damascus": {
    image: "st-john-damascus.webp",
    skin: "tan",
    hairStyle: "short",
    hairColor: "black",
    beard: "long",
    beardColor: "black",
    headwear: "halo",
    vestment: "monk-black",
    symbol: "icon",
    name: "St. John",
    nameSubscript: "of Damascus",
  },
  "st-mark-ephesus": {
    image: "st-mark-ephesus.webp",
    skin: "pale",
    hairStyle: "short",
    hairColor: "white",
    beard: "very-long",
    beardColor: "white",
    headwear: "mitre",
    vestment: "bishop-purple",
    symbol: "scroll",
    name: "St. Mark",
    nameSubscript: "of Ephesus",
  },
  "st-catherine": {
    image: "st-catherine.webp",
    skin: "pale",
    hairStyle: "long",
    hairColor: "black",
    beard: "none",
    headwear: "halo",
    vestment: "imperial-purple",
    symbol: "wheel",
    name: "St. Catherine",
    nameSubscript: "of Alexandria",
  },
  "st-george": {
    image: "st-george.webp",
    skin: "light",
    hairStyle: "short",
    hairColor: "brown",
    beard: "short",
    beardColor: "brown",
    headwear: "halo",
    vestment: "centurion",
    symbol: "sword",
    name: "St. George",
    nameSubscript: "the Trophy-bearer",
  },
  "st-mary-egypt": {
    image: "st-mary-egypt.webp",
    skin: "tan",
    hairStyle: "long",
    hairColor: "black",
    beard: "none",
    headwear: "halo",
    vestment: "monk-brown",
    symbol: "cross",
    name: "St. Mary",
    nameSubscript: "of Egypt",
  },
  "st-seraphim": {
    image: "st-seraphim.webp",
    skin: "pale",
    hairStyle: "short",
    hairColor: "white",
    beard: "very-long",
    beardColor: "white",
    headwear: "halo-bright",
    vestment: "monk-brown",
    symbol: "flame",
    name: "St. Seraphim",
    nameSubscript: "of Sarov",
  },

  // ---- BOSSES (no halos, often menacing) ----
  centurion: {
    image: "centurion.webp",
    skin: "light",
    hairStyle: "short",
    hairColor: "black",
    beard: "stubble",
    headwear: "helmet",
    vestment: "centurion",
    eyes: "narrow",
    name: "Lucius",
    nameSubscript: "Centurion of Rome",
  },
  marcus: {
    image: "marcus.webp",
    skin: "light",
    hairStyle: "short",
    hairColor: "black",
    beard: "short",
    beardColor: "black",
    headwear: "imperial-laurel",
    vestment: "toga-white",
    eyes: "narrow",
    name: "Marcus Verus",
    nameSubscript: "Pagan Patrician",
  },
  arius: {
    image: "arius.webp",
    skin: "pale",
    hairStyle: "short",
    hairColor: "black",
    beard: "short",
    beardColor: "black",
    headwear: "none",
    vestment: "deacon-purple",
    eyes: "hollow",
    name: "Arius",
    nameSubscript: "Heresiarch",
  },
  tempter: {
    image: "tempter.webp",
    skin: "shadow",
    hairStyle: "bald",
    hairColor: "none",
    beard: "none",
    headwear: "hood-shadow",
    vestment: "shadow",
    eyes: "glowing-red",
    name: "The Tempter",
    nameSubscript: "Father of Lies",
  },
  eutyches: {
    image: "eutyches.webp",
    skin: "pale",
    hairStyle: "tonsure",
    hairColor: "white",
    beard: "very-long",
    beardColor: "white",
    headwear: "klobuk",
    vestment: "monk-black",
    eyes: "narrow",
    name: "Eutyches",
    nameSubscript: "Archimandrite",
  },
  iconoclast: {
    image: "iconoclast.webp",
    skin: "light",
    hairStyle: "short",
    hairColor: "black",
    beard: "short",
    beardColor: "black",
    headwear: "stemma",
    vestment: "imperial-purple",
    eyes: "narrow",
    name: "Constantine V",
    nameSubscript: "Iconoclast Emperor",
  },
  humbert: {
    image: "humbert.webp",
    skin: "pale",
    hairStyle: "tonsure",
    hairColor: "gray",
    beard: "none",
    headwear: "galero",
    vestment: "cardinal-crimson",
    eyes: "narrow",
    name: "Humbert",
    nameSubscript: "Cardinal of Silva Candida",
  },
  "pope-eugene": {
    image: "pope-eugene.webp",
    skin: "pale",
    hairStyle: "tonsure",
    hairColor: "white",
    beard: "stubble",
    beardColor: "gray",
    headwear: "tiara",
    vestment: "papal-white",
    eyes: "normal",
    name: "Pope Eugene IV",
    nameSubscript: "Pontifex Maximus",
  },
  nkvd: {
    image: "nkvd.webp",
    skin: "light",
    hairStyle: "short",
    hairColor: "brown",
    beard: "stubble",
    headwear: "ushanka",
    vestment: "soviet-tunic",
    eyes: "narrow",
    name: "Capt. Pavlov",
    nameSubscript: "NKVD",
  },
  lds: {
    image: "lds.webp",
    skin: "light",
    hairStyle: "modern",
    hairColor: "brown",
    beard: "none",
    headwear: "modern-tie",
    vestment: "modern-shirt-tie",
    eyes: "normal",
    name: "Elder Williams",
    nameSubscript: "LDS Missionary",
  },
  reformed: {
    image: "reformed.webp",
    skin: "pale",
    hairStyle: "modern",
    hairColor: "ginger",
    beard: "short",
    beardColor: "ginger",
    headwear: "none",
    vestment: "modern-sweater",
    symbol: "book",
    eyes: "normal",
    name: "Sarah Kelley",
    nameSubscript: "Reformed Seminarian",
  },
  atheist: {
    image: "atheist.webp",
    skin: "tan",
    hairStyle: "modern",
    hairColor: "black",
    beard: "stubble",
    headwear: "none",
    vestment: "modern-hoodie",
    eyes: "normal",
    name: "Alex Chen",
    nameSubscript: "Skeptical Friend",
  },
  doubt: {
    image: "doubt.webp",
    skin: "shadow",
    hairStyle: "bald",
    hairColor: "none",
    beard: "none",
    headwear: "void-shadow",
    vestment: "void",
    eyes: "void",
    name: "The Doubt",
    nameSubscript: "Your Own Shadow",
  },

  // --- Dedicated cast: resident saints (full-body sprites in /sprites) ---
  // SVG fields are unused for these (image renders); kept valid for the type.
  polycarp: { image: "polycarp.webp", skin: "light", hairStyle: "short", hairColor: "white", beard: "very-long", headwear: "halo", vestment: "bishop-white", name: "St. Polycarp", nameSubscript: "of Smyrna" },
  "justin-martyr": { image: "justin-martyr.webp", skin: "light", hairStyle: "short", hairColor: "brown", beard: "short", headwear: "halo", vestment: "toga-white", name: "St. Justin", nameSubscript: "the Philosopher" },
  "basil-great": { image: "basil-great.webp", skin: "light", hairStyle: "short", hairColor: "black", beard: "long", headwear: "halo", vestment: "bishop-white", name: "St. Basil the Great" },
  chrysostom: { image: "chrysostom.webp", skin: "light", hairStyle: "short", hairColor: "brown", beard: "short", headwear: "halo", vestment: "bishop-white", name: "St. John Chrysostom" },
  "maximus-confessor": { image: "maximus-confessor.webp", skin: "light", hairStyle: "short", hairColor: "gray", beard: "long", headwear: "halo", vestment: "monk-black", name: "St. Maximus", nameSubscript: "the Confessor" },
  "cyril-methodius": { image: "cyril-methodius.webp", skin: "light", hairStyle: "short", hairColor: "brown", beard: "long", headwear: "halo", vestment: "monk-black", name: "Sts. Cyril & Methodius" },
  photios: { image: "photios.webp", skin: "light", hairStyle: "short", hairColor: "black", beard: "long", headwear: "halo", vestment: "bishop-white", name: "St. Photios the Great" },
  vladimir: { image: "vladimir.webp", skin: "light", hairStyle: "short", hairColor: "ginger", beard: "short", headwear: "halo", vestment: "imperial-purple", name: "St. Vladimir", nameSubscript: "of Kiev" },
  "sava-serbia": { image: "sava-serbia.webp", skin: "light", hairStyle: "short", hairColor: "black", beard: "long", headwear: "halo", vestment: "bishop-white", name: "St. Sava", nameSubscript: "of Serbia" },
  palamas: { image: "palamas.webp", skin: "light", hairStyle: "short", hairColor: "black", beard: "long", headwear: "halo", vestment: "bishop-white", name: "St. Gregory Palamas" },
  "cosmas-aetolia": { image: "cosmas-aetolia.webp", skin: "light", hairStyle: "short", hairColor: "gray", beard: "long", headwear: "halo", vestment: "monk-black", name: "St. Cosmas", nameSubscript: "of Aetolia" },
  "ambrose-optina": { image: "ambrose-optina.webp", skin: "light", hairStyle: "short", hairColor: "gray", beard: "long", headwear: "halo", vestment: "monk-black", name: "St. Ambrose of Optina" },
  silouan: { image: "silouan.webp", skin: "light", hairStyle: "short", hairColor: "gray", beard: "long", headwear: "halo", vestment: "monk-black", name: "St. Silouan", nameSubscript: "the Athonite" },

  // --- Dedicated cast: named antagonists (no halo) ---
  nestorius: { image: "nestorius.webp", skin: "light", hairStyle: "short", hairColor: "black", beard: "short", headwear: "none", vestment: "bishop-crimson", name: "Nestorius" },
  barlaam: { image: "barlaam.webp", skin: "light", hairStyle: "short", hairColor: "brown", beard: "short", headwear: "none", vestment: "modern-sweater", name: "Barlaam", nameSubscript: "the Calabrian" },
  "crusader-knight": { image: "crusader-knight.webp", skin: "light", hairStyle: "short", hairColor: "brown", beard: "short", headwear: "none", vestment: "centurion", name: "Crusader Commander" },
  "stephen-nicomedia": { image: "stephen-nicomedia.webp", skin: "light", hairStyle: "short", hairColor: "gray", beard: "short", headwear: "none", vestment: "modern-collared", name: "Stephen of Nicomedia" },
  volkh: { image: "volkh.webp", skin: "tan", hairStyle: "long", hairColor: "gray", beard: "very-long", headwear: "none", vestment: "monk-brown", name: "Volkh", nameSubscript: "the Volkhv" },
  "origenist-deacon": { image: "origenist-deacon.webp", skin: "light", hairStyle: "short", hairColor: "brown", beard: "short", headwear: "none", vestment: "deacon-purple", name: "The Origenist Deacon" },
  "frankish-archpriest": { image: "frankish-archpriest.webp", skin: "light", hairStyle: "tonsure", hairColor: "brown", beard: "none", headwear: "none", vestment: "papal-white", name: "The Frankish Archpriest" },
  "monothelite-examiner": { image: "monothelite-examiner.webp", skin: "tan", hairStyle: "short", hairColor: "black", beard: "short", headwear: "none", vestment: "imperial-purple", name: "The Imperial Examiner" },
};

// Player portrait config — hair color comes from save data.
// Maps the chosen hair-hex to the matching AI portrait variant.
const PLAYER_IMAGE_BY_HAIR: Record<string, string> = {
  "#7a4f1d": "player-brown.webp",
  "#1a1a1a": "player-black.webp",
  "#dca873": "player-blond.webp",
  "#a63216": "player-auburn.webp",
  "#3e2c1c": "player-dark.webp",
  "#cfcfcf": "player-silver.webp",
};

export function playerPortraitConfig(hairHex: string): PortraitConfig {
  return {
    image: PLAYER_IMAGE_BY_HAIR[hairHex.toLowerCase()] ?? "player-brown.webp",
    skin: "light",
    hairStyle: "modern",
    hairColor: "brown", // overridden via custom hair color in renderer
    beard: "none",
    headwear: "none",
    vestment: "modern-hoodie",
    eyes: "normal",
    name: "",
    // hairColorHex is consumed by renderer for player only
    ...({ hairColorHex: hairHex } as object),
  };
}
