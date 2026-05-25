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
};

// Player portrait config — hair color comes from save data.
export function playerPortraitConfig(hairHex: string): PortraitConfig {
  return {
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
