import type { Sprite } from "./types";

// All character sprites are 16 wide × 18 tall, head-and-shoulders.
// Each sprite uses single-char keys mapped to hex colors. " " is transparent.
//
// Shared palette tokens (used across multiple sprites):
const SKIN_HI = "#f3d4ad";       // skin highlight
const SKIN = "#e8c39e";          // skin base
const SKIN_LO = "#b48055";       // skin shadow
const EYE_WHITE = "#f5e9c9";     // eye whites (also general light)
const PUPIL = "#0a0a0a";         // pupil / line ink
const INK = "#1a1814";           // general dark outline
const BEARD_WHITE = "#ecdfb8";
const BEARD_GRAY = "#bababa";
const BEARD_BROWN = "#7a5028";
const BEARD_BLACK = "#1c1010";
const GOLD_HI = "#f0d358";       // halo / gold highlight
const GOLD = "#c9a227";          // gold base
const GOLD_LO = "#7a5e10";       // gold shadow
const CRIMSON_HI = "#a02020";
const CRIMSON = "#7c1414";
const CRIMSON_LO = "#4a0808";
const PURPLE = "#3a1f4d";
const PURPLE_HI = "#5c3470";
const MONK_BROWN = "#5d3a1e";
const MONK_BROWN_HI = "#7e5430";
const MONK_BROWN_LO = "#3b2410";
const WHITE = "#f5e9c9";
const WHITE_LO = "#c8b890";

function makeSprite(rows: string[], palette: Record<string, string>): Sprite {
  return { rows, palette: { " ": "transparent", ...palette } };
}

/* ============================================================
   PLAYER — modern inquirer in hoodie. Hair char 'h' is themed.
   Now with: bigger face area, real eyes (whites + pupils),
   shaded hoodie with drawstrings.
   ============================================================ */
const playerRows = [
  "                ",
  "     hhhhhh     ",
  "    hhhhhhhh    ",
  "   hhhhhhhhhh   ",
  "   hhSSSSSSh    ",  // hair edge + skin highlight forehead
  "   hssssssss    ",
  "   ss.oo.ooss   ",  // eyes: pupil-white-pupil-white pairs
  "   sssssssss    ",
  "   ssss.ssss    ",  // nose hint
  "   ssss-ssss    ",  // mouth
  "    -ssssss     ",  // chin shadow
  "    eeeeeee     ",  // neck
  "   HHHHHHHHH    ",  // hoodie collar
  "  HHHHHHHHHHH   ",  // hoodie shoulders
  " HHHHHHHHHHHHH  ",
  " HH dd   dd HH  ",  // drawstrings
  " HH ddddddd HH  ",
  " HHHHHHHHHHHHH  ",
];

export function playerSprite(hair: string): Sprite {
  return makeSprite(playerRows, {
    h: hair,
    S: SKIN_HI,
    s: SKIN,
    "-": SKIN_LO,
    e: SKIN_LO,
    ".": PUPIL,
    o: EYE_WHITE,
    H: "#3a4a78",
    d: "#c9a070",   // hoodie drawstring
  });
}

/* ============================================================
   ST. ANTHONY THE GREAT — old monk with white beard, skufia.
   ============================================================ */
export const spriteAnthony = makeSprite(
  [
    "                ",
    "    KKKKKKKK    ",  // wide black skufia
    "   KKKKKKKKKK   ",
    "   KKbbbbbbKK   ",  // hairline visible
    "    bbssssbb    ",
    "    SssssssS    ",
    "   ss.oo.oos    ",  // eyes
    "    ssssssss    ",
    "    sss.sss     ",  // nose
    "   bbbbbbbb     ",  // beard begins
    "  bbbbbbbbbb    ",
    " bbbbbbbbbbbb   ",
    " bbbbbbbbbbbb   ",
    "BBBBBBBBBBBBBB  ",  // brown robe
    "BBM+MBBBB+MBBB  ",  // robe trim
    "BBM+MBBBM+MBBB  ",  // gold cross
    "BBBBBBM+MBBBBB  ",
    "BBBBBBBBBBBBBB  ",
  ],
  {
    K: "#0a0a0a",
    b: BEARD_WHITE,
    S: SKIN_HI,
    s: SKIN,
    ".": PUPIL,
    o: EYE_WHITE,
    B: MONK_BROWN,
    M: MONK_BROWN_LO,
    "+": GOLD,
  }
);

/* ============================================================
   ST. IGNATIUS OF ANTIOCH — bishop with mitre and omophorion.
   ============================================================ */
export const spriteIgnatius = makeSprite(
  [
    "      GgGG      ",  // mitre peak
    "    GGGGGGGG    ",
    "   GG++++++GG   ",  // gold mitre with red gem row
    "   GGRRGGRRGG   ",
    "   GGGGGGGGGG   ",
    "    bSSSSSSb    ",
    "    bs.oo.os    ",  // eyes
    "    bssssssb    ",
    "     bbbbbb     ",  // short beard
    "    bbbbbbbb    ",
    "   bbbbbbbbbb   ",
    "  WWWWWWWWWWWW  ",  // omophorion (white stole)
    " WWWW++WW++WWW  ",  // crosses on stole
    " WWW+RR++RR+WW  ",  // cross detail
    " WWWW++WW++WWW  ",
    " WWWWWWWWWWWW   ",  // omophorion continues
    " ccccccccccc    ",  // chains (hint of martyrdom)
    " c c c c c c    ",
  ],
  {
    G: GOLD,
    g: GOLD_HI,
    "+": CRIMSON,
    R: CRIMSON_HI,
    S: SKIN_HI,
    s: SKIN,
    b: BEARD_WHITE,
    ".": PUPIL,
    o: EYE_WHITE,
    W: WHITE,
    c: "#5a5a5a",   // iron chain
  }
);

/* ============================================================
   ROMAN CENTURION LUCIUS — boss ch.1, helmet with crest.
   ============================================================ */
export const spriteCenturion = makeSprite(
  [
    "      RRRR      ",  // red horsehair crest
    "      RRRR      ",
    "     CCRRCC     ",  // helmet with crest mount
    "   CCCCRRCCCC   ",
    "   CC++++++CC   ",  // helmet trim
    "   CCsssssCC    ",
    "    s.oo.os     ",  // eyes
    "    sssssss     ",
    "    s mm  s     ",  // mustache
    "    s-----s     ",  // jaw shadow
    "    sssssss     ",
    "   CCCCCCCCCC   ",  // pauldron
    "  CCcRRRRRRcCC  ",  // armor with red tunic showing
    " CCcRRRRRRRRcC  ",
    " CCcR  GG  RcC  ",  // gold pectoral
    " CCRR  GG  RRC  ",
    " CCCCCRRRRCCCC  ",
    " CCC      CCC   ",
  ],
  {
    C: "#9a9a9a",   // steel armor
    c: "#5a5a5a",   // armor shadow
    R: CRIMSON,
    "+": GOLD,
    s: SKIN,
    ".": PUPIL,
    o: EYE_WHITE,
    m: SKIN_LO,
    "-": SKIN_LO,
    G: GOLD,
  }
);

/* ============================================================
   MARCUS THE PAGAN PATRICIAN — ch.2, dark hair, toga, laurel.
   ============================================================ */
export const spriteMarcus = makeSprite(
  [
    "                ",
    "   LL++++++LL   ",  // laurel wreath
    "  LL+LLLLLL+LL  ",
    "   LLLLLLLLLL   ",
    "   LLssssssLL   ",
    "    sssssss     ",
    "    s.oo.os     ",
    "    sssssss     ",
    "    s mmm s     ",  // mustache
    "    s-----s     ",
    "    sssssss     ",
    "   WWWWWWWWW    ",  // toga (white)
    "  WWWWRRRRWWW   ",  // red trim
    " WWWWWRRRRWWWW  ",
    " WWWWWWWWWWWWW  ",
    " WWWWWWWWWWWWW  ",
    " WWW       WWW  ",
    "                ",
  ],
  {
    L: "#2c1a08",   // dark hair
    "+": "#4a6c2a", // laurel green
    s: SKIN,
    ".": PUPIL,
    o: EYE_WHITE,
    m: SKIN_LO,
    "-": SKIN_LO,
    W: WHITE,
    R: CRIMSON,
  }
);

/* ============================================================
   ARIUS — ch.3, dark deacon vestments, gaunt, severe.
   ============================================================ */
export const spriteArius = makeSprite(
  [
    "                ",
    "    LLLLLLLL    ",  // black hair
    "   LLLLLLLLLL   ",
    "   LLssssssLL   ",
    "   ssssssssss   ",
    "    s.oo.os     ",  // narrow eyes
    "    s--ss--s    ",  // hollow cheeks
    "    sssssss     ",
    "    s-----s     ",  // thin lips
    "    sbbbbbs     ",  // sparse beard
    "   bbbbbbbbb    ",
    "  PPPPPPPPPPP   ",  // purple deacon robe
    " PPWWWWWWWWWPP  ",  // white sticharion
    " PPWW++++++WPP  ",  // red orarion stripe
    " PPWWWW++WWWPP  ",
    " PPWW++++++WPP  ",
    " PPWWWWWWWWWPP  ",
    " PPPPPPPPPPPPP  ",
  ],
  {
    L: "#1a0808",   // jet black hair
    s: SKIN,
    "-": SKIN_LO,
    ".": PUPIL,
    o: EYE_WHITE,
    b: BEARD_BLACK,
    P: PURPLE,
    W: WHITE_LO,
    "+": CRIMSON,
  }
);

/* ============================================================
   ST. ATHANASIUS — ch.3 ally, dark hair, intense gaze.
   ============================================================ */
export const spriteAthanasius = makeSprite(
  [
    "      HHHHHH    ",  // small halo arc
    "    HHGGGGGGHH  ",
    "   HGGLLLLLLGGH ",
    "    LLLLLLLLLL  ",
    "    LLssssssLL  ",
    "    sssssss     ",
    "    s.oo.os     ",
    "    sssssss     ",
    "    s-----s     ",
    "   bbbbbbbbb    ",  // black beard
    "  bbbbbbbbbbb   ",
    "  RRRRRRRRRRR   ",  // crimson omophorion
    "  RR+WWWW+RRR   ",  // white center with crosses
    "  RWW++WW++WR   ",
    "  RWW++GG++WR   ",
    "  RWW++WW++WR   ",
    "  RWWWWWWWWWR   ",
    "  RRRRRRRRRRR   ",
  ],
  {
    H: GOLD_HI,
    G: GOLD,
    L: "#1a0808",
    s: SKIN,
    "-": SKIN_LO,
    ".": PUPIL,
    o: EYE_WHITE,
    b: BEARD_BLACK,
    R: CRIMSON,
    W: WHITE,
    "+": GOLD_LO,
  }
);

/* ============================================================
   THE TEMPTER — ch.4 boss, hooded shadow, glowing red eyes.
   ============================================================ */
export const spriteTempter = makeSprite(
  [
    "    KKKKKKKK    ",
    "   KKKKKKKKKK   ",
    "  KKKKKKKKKKKK  ",
    " KKKKKKKKKKKKKK ",
    " KK..........KK ",  // hood shadow interior
    " K.RR......RR.K ",  // red eyes
    " K.RR......RR.K ",
    " K............K ",
    " K....PPPP....K ",  // purple smoke at mouth
    " KK..........KK ",
    " KKK........KKK ",
    " KKKKKKKKKKKKKK ",
    " KK..........KK ",  // hood folds
    " K............K ",
    " K............K ",
    " KK..........KK ",
    " KKKK......KKKK ",
    " KKKKKKKKKKKKKK ",
  ],
  {
    K: "#0a0410",   // very dark purple-black
    ".": "#1a0a20",
    R: "#dc2828",   // glowing red
    P: "#5c2078",   // purple mist
  }
);

/* ============================================================
   ST. MACARIUS — ch.4 ally, desert father, light beard, halo.
   ============================================================ */
export const spriteMacarius = makeSprite(
  [
    "     HHHHHH     ",  // halo
    "    HhhhhhhH    ",
    "   HhhKKKKhhH   ",  // skufia under halo
    "    KKKKKKKK    ",
    "    KKbbbbKK    ",
    "    SsssssS     ",
    "    s.oo.os     ",
    "    sssssss     ",
    "    s-----s     ",
    "   bbbbbbbbb    ",  // light beard
    "  bbbbbbbbbbb   ",
    " bbbbbbbbbbbbb  ",
    "BBBBBBBBBBBBBB  ",  // monk robe
    "BBBBM+MMM+MBBB  ",
    "BBBM+MGGM+MBBB  ",
    "BBM+MMGMM+MBBB  ",
    "BBBBM++++MBBBB  ",
    "BBBBBBBBBBBBBB  ",
  ],
  {
    H: GOLD_HI,
    h: GOLD,
    K: "#0a0a0a",
    b: "#d8c890",   // light blonde-gray beard
    S: SKIN_HI,
    s: SKIN,
    "-": SKIN_LO,
    ".": PUPIL,
    o: EYE_WHITE,
    B: MONK_BROWN,
    M: MONK_BROWN_LO,
    G: GOLD,
    "+": GOLD_LO,
  }
);

/* ============================================================
   EUTYCHES — ch.5 boss, archimandrite klobuk, white beard.
   ============================================================ */
export const spriteEutyches = makeSprite(
  [
    "    KKKKKKKK    ",  // klobuk (monastic hood) base
    "   KKKKKKKKKK   ",
    "  KKKKKKKKKKKK  ",  // klobuk veil widens
    "  KK........KK  ",  // veil shadow
    "   KssssssK     ",
    "   Kss.oo.sK    ",
    "    sssssss     ",
    "    s-----s     ",
    "   --bbbbb--    ",  // long beard begins
    "  ----bbb----   ",
    " ------b------  ",
    " ------b------  ",
    " ------b------  ",
    "KKKKKKKKKKKKKK  ",  // monastic mantle (black)
    "KK..........KK  ",
    "KK..........KK  ",
    "KK..........KK  ",
    "KKKKKKKKKKKKKK  ",
  ],
  {
    K: "#0a0a0a",
    s: SKIN,
    ".": "#1a1a1a",
    "-": "#cfc09a",  // very long white beard (using - for fall-off shading)
    b: BEARD_WHITE,
    o: EYE_WHITE,
  }
);

/* ============================================================
   ST. CYRIL OF ALEXANDRIA — ch.5 ally, bishop, full mitre.
   ============================================================ */
export const spriteCyril = makeSprite(
  [
    "      GgGG      ",  // mitre peak
    "    GGGGGGGG    ",
    "   GG++RR++GG   ",  // gold mitre with red gems
    "   GGRRGGRRGG   ",
    "   GGGG++GGGG   ",
    "    bSSSSSSb    ",
    "    bs.oo.sb    ",
    "    bsssssbb    ",
    "    bbbbbbbb    ",  // dark beard
    "   bbbbbbbbbb   ",
    "  WWWWWWWWWWWW  ",  // sakkos (white)
    "  WW++RRRR++WW  ",  // crosses on chest
    " WWW+RGGGGR+WWW ",
    " WWWWRRRRRRWWWW ",  // central cross
    " WWWWWWGGWWWWWW ",
    " WWWW++GG++WWWW ",
    " WWWW+ +GG+ +WW ",
    " WWWWWWWWWWWWWW ",
  ],
  {
    G: GOLD,
    g: GOLD_HI,
    "+": CRIMSON,
    R: CRIMSON_HI,
    S: SKIN_HI,
    s: SKIN,
    b: "#3a2210",  // brown beard
    ".": PUPIL,
    o: EYE_WHITE,
    W: WHITE,
  }
);

/* ============================================================
   ICONOCLAST EMPEROR Constantine V — ch.6 boss.
   Crowned in stemma with prependoulia (hanging pearls).
   ============================================================ */
export const spriteIconoclast = makeSprite(
  [
    "    GGGGGGGG    ",  // crown top
    "   GG++RR++GG   ",  // gem row
    "  GGGGGGGGGGGG  ",
    " gGGGGGGGGGGGg  ",  // crown sides
    " W            W ",  // prependoulia
    " W  ssssssss  W ",
    " W  ss.oo.ss  W ",
    " W  ssssssss  W ",
    " W  s xxxx s  W ",  // mustache
    "    s------s    ",
    "    bbbbbbbb    ",  // beard
    "   PPPPPPPPPP   ",  // imperial purple chlamys
    "  PP+GGGGGG+PP  ",  // gold trim
    " PP+GGRRRRGG+PP ",  // gold panel with red
    " PP+GGGGGGGG+PP ",
    " PPPPPPPPPPPPPP ",
    " PP          PP ",
    " PP          PP ",
  ],
  {
    G: GOLD,
    g: GOLD_LO,
    "+": CRIMSON,
    R: CRIMSON_HI,
    W: "#e0d4a0",   // pearl strings
    s: SKIN,
    "-": SKIN_LO,
    x: SKIN_LO,     // mustache
    b: BEARD_BLACK,
    ".": PUPIL,
    o: EYE_WHITE,
    P: PURPLE,
  }
);

/* ============================================================
   ST. JOHN OF DAMASCUS — ch.6 ally, monk with icon in hand.
   ============================================================ */
export const spriteJohnDamascus = makeSprite(
  [
    "     HHHHHH     ",  // halo
    "   HHHKKKKHHH   ",
    "  HHKKKKKKKKHH  ",  // skufia under halo
    "    KKKKKKKK    ",
    "    KKbbbbKK    ",
    "    SssssssS    ",
    "    s.oo.os     ",
    "    sssssss     ",
    "    s-----s     ",
    "    bbbbbbb     ",  // dark beard
    "   bbbbbbbbb    ",
    "  BBBBBBBBBBB   ",  // black monk robe
    " BB GGGGGGGG BB ",  // holds golden icon
    " BB GIIIIIIG BB ",  // icon (skin tones in center = face of Christ hint)
    " BB GIWWWWIG BB ",
    " BB GIIIIIIG BB ",
    " BB GGGGGGGG BB ",
    " BBBBBBBBBBBBBB ",
  ],
  {
    H: GOLD_HI,
    K: "#0a0a0a",
    b: "#2a1810",   // dark brown beard
    S: SKIN_HI,
    s: SKIN,
    "-": SKIN_LO,
    ".": PUPIL,
    o: EYE_WHITE,
    B: "#0a0a0a",
    G: GOLD,
    I: SKIN,        // icon flesh tones
    W: WHITE,
  }
);

/* ============================================================
   CARDINAL HUMBERT — ch.7 boss, red galero (cardinal's hat).
   ============================================================ */
export const spriteHumbert = makeSprite(
  [
    "  RRRRRRRRRRRR  ",  // wide red galero
    " RRRRRRRRRRRRRR ",
    "  R++++++++++R  ",  // gold trim
    "   RRRRRRRRRR   ",
    "    RsssssR     ",
    "    s.oo.os     ",
    "    sssssss     ",
    "    s-----s     ",  // pursed mouth
    "    sssssss     ",
    "    s-----s     ",
    "   RRRRRRRRRR   ",  // crimson cassock
    "  RRRRRRRRRRR   ",
    " RR++WWWW++RRR  ",  // pectoral cross
    " RR+WWGGGGWWR   ",
    " RRWWGGCCGGWWR  ",  // cross center
    " RR+WWGGGGWW+R  ",
    " RR++WWWW++RR   ",
    " RRRRRRRRRRRR   ",
  ],
  {
    R: CRIMSON,
    "+": GOLD,
    s: SKIN,
    "-": SKIN_LO,
    ".": PUPIL,
    o: EYE_WHITE,
    W: WHITE,
    G: GOLD,
    C: CRIMSON_HI,
  }
);

/* ============================================================
   ST. MARK OF EPHESUS — ch.7 ally / ch.8 protagonist saint.
   Bishop's mitre, long thin beard from fasting.
   ============================================================ */
export const spriteMarkEphesus = makeSprite(
  [
    "      GGGG      ",
    "    GGGGGGGG    ",
    "   GG++GG++GG   ",
    "   GGRRGGRRGG   ",
    "    GGGGGGGG    ",
    "    bSSSSSSb    ",  // gaunt face
    "    bs.oo.sb    ",
    "    bs----sb    ",  // hollow cheeks
    "     bbbbbb     ",
    "    bbbbbbbb    ",  // long thin beard
    "    bbbbbbbb    ",
    "    bbbbbbbb    ",
    "  PPPPPPPPPPPP  ",  // purple mandyas
    " PPPP+GGGG+PPPP ",
    " PPPGGRRRRGGPPP ",
    " PPPGRRCRRGPPPP ",  // central cross
    " PPP+GRRRRG+PPP ",
    " PPPPPPPPPPPPPP ",
  ],
  {
    G: GOLD,
    "+": CRIMSON,
    R: CRIMSON,
    S: SKIN_HI,
    s: SKIN,
    "-": SKIN_LO,
    ".": PUPIL,
    o: EYE_WHITE,
    b: BEARD_WHITE,
    P: PURPLE,
    C: CRIMSON_HI,
  }
);

/* ============================================================
   POPE EUGENE IV — ch.8 boss, papal tiara (triregnum).
   ============================================================ */
export const spritePopeEugene = makeSprite(
  [
    "      WWWW      ",
    "     WW++WW     ",  // top tier
    "    WWWGGWWW    ",
    "   WW++GG++WW   ",  // middle tier
    "  WWWW++++WWWW  ",
    "  WW+GGGGGG+WW  ",  // bottom tier
    "   WWssssssWW   ",
    "    s.oo.os     ",
    "    sssssss     ",
    "    s-----s     ",
    "    sssssss     ",
    "  WWWWWWWWWWWW  ",  // papal vestments (white)
    " WWW+RRRRRR+WWW ",  // red orphreys
    " WWW+RR++RR+WWW ",
    " WWWWRRGGRRWWWW ",  // gold cross
    " WWW+RR++RR+WWW ",
    " WWW+RRRRRR+WWW ",
    " WWWWWWWWWWWWWW ",
  ],
  {
    W: WHITE,
    "+": GOLD,
    G: GOLD,
    s: SKIN,
    "-": SKIN_LO,
    ".": PUPIL,
    o: EYE_WHITE,
    R: CRIMSON,
  }
);

/* ============================================================
   NKVD INTERROGATOR — ch.9 boss, peaked cap with red star.
   ============================================================ */
export const spriteNKVD = makeSprite(
  [
    "                ",
    "  KKKKKKKKKKKK  ",  // peaked cap
    " KKKKKK++KKKKK  ",  // brim
    "  KKK+RRRR+KKK  ",  // red star
    "  KKKKKKKKKK    ",
    "  KKssssssKK    ",
    "    s.oo.os     ",
    "    sssssss     ",
    "    s xxx s     ",  // mustache
    "    s-----s     ",
    "    sssssss     ",
    "   KKKKKKKKKK   ",  // gray uniform tunic
    "  KKBBBBBBBBKK  ",  // collar bars
    " KKKsssssssKKK  ",  // skin showing throat
    " KK+RR+RR+RR+KK ",  // medal ribbons
    " KKRRRRRRRRRRKK ",  // medal bars
    " KKKKKKKKKKKKKK ",
    " KK          KK ",
  ],
  {
    K: "#2a2a2a",   // gray uniform
    "+": "#c9a227",
    R: "#5e1418",   // red star / blood-red
    s: SKIN,
    "-": SKIN_LO,
    x: SKIN_LO,     // mustache
    ".": PUPIL,
    o: EYE_WHITE,
    B: "#7a1a1a",   // shoulder bar
  }
);

/* ============================================================
   LDS MISSIONARY — ch.10a boss, neat hair, white shirt, tie.
   ============================================================ */
export const spriteLDS = makeSprite(
  [
    "                ",
    "   LLLLLLLLLL   ",  // tidy hair (side part)
    "  LLLLLLLLLLLL  ",
    "  LLLssssLLLL   ",
    "   LssssssL     ",  // side part visible
    "    sssssss     ",
    "    s.oo.os     ",
    "    sssssss     ",
    "    sssssss     ",
    "    s-----s     ",  // smile lines
    "   sssssssss    ",
    "  WWWWWWWWWWW   ",  // white shirt
    " WWWW BBBB WWWW ",  // tie + collar
    " WWWWBBBBBBWWWW ",  // tie body
    " WWWWBBBBBBWWWW ",
    " WWWWBBBBBBWWWW ",
    " WWWWWWWWWWWWW  ",
    " WW           W ",
  ],
  {
    L: "#7a4f1d",   // brown hair
    s: SKIN,
    ".": PUPIL,
    o: EYE_WHITE,
    "-": SKIN_LO,
    W: WHITE,
    B: "#1a2c4e",   // navy tie
  }
);

/* ============================================================
   REFORMED SEMINARIAN — ch.10b boss, glasses, ginger beard.
   ============================================================ */
export const spriteReformed = makeSprite(
  [
    "                ",
    "   LLLLLLLLLL   ",  // sandy hair
    "  LLLLLLLLLLLL  ",
    "  LLLssssssLL   ",
    "   ssssssssss   ",
    "    gg.oo.gg    ",  // glasses frames around eyes
    "    sssssss     ",
    "    s-----s     ",
    "   bbbbbbbbb    ",  // ginger beard
    "  bbbbbbbbbbb   ",
    "  KKKKKKKKKKK   ",  // dark sweater
    "  KKKKKKKKKKK   ",
    "  KK BBBBBB KK  ",  // book in hand (Calvin?)
    "  KK BWWWWB KK  ",
    "  KK BWBBWB KK  ",
    "  KK BBBBBB KK  ",
    "  KKKKKKKKKKK   ",
    "  KKKKKKKKKKK   ",
  ],
  {
    L: "#dca873",   // sandy/ginger hair
    s: SKIN,
    g: "#2a2a2a",   // glasses frames
    ".": PUPIL,
    o: EYE_WHITE,
    "-": SKIN_LO,
    b: "#a85a20",   // ginger beard
    K: "#1a1a1a",   // dark sweater
    B: "#3a2818",   // book leather
    W: WHITE_LO,
  }
);

/* ============================================================
   ATHEIST INTERLOCUTOR — ch.10c boss, glasses, dark hoodie.
   ============================================================ */
export const spriteAtheist = makeSprite(
  [
    "                ",
    "    LLLLLLLL    ",  // short black hair
    "   LLLLLLLLLL   ",
    "   LLssssssLL   ",
    "    sssssss     ",
    "    gg.oo.gg    ",  // glasses
    "    sssssss     ",
    "    sssssss     ",
    "    s-----s     ",  // neutral mouth
    "    sssssss     ",
    "   sssssssss    ",
    "  GGGGGGGGGGG   ",  // dark gray hoodie
    " GGGGGGGGGGGGG  ",
    " GG ccccccc GG  ",  // shirt under hoodie
    " GG ccccccc GG  ",
    " GGGGGGGGGGGGG  ",
    " GGGGGGGGGGGGG  ",
    "                ",
  ],
  {
    L: "#181818",
    s: SKIN,
    g: "#181818",   // black-rimmed glasses
    ".": PUPIL,
    o: EYE_WHITE,
    "-": SKIN_LO,
    G: "#2a2a3a",
    c: "#1a1a26",   // shirt under hoodie
  }
);

/* ============================================================
   THE DOUBT — ch.11 final boss, shadow with player's face.
   ============================================================ */
export const spriteDoubt = makeSprite(
  [
    "     KKKKKK     ",  // shadow head outline
    "    KKKKKKKK    ",
    "   KKKKKKKKKK   ",
    "   KK......KK   ",  // featureless interior
    "   K.RR..RR.K   ",  // red eyes (your eyes)
    "   K.RR..RR.K   ",
    "   K........K   ",
    "    K......K    ",  // grim line for mouth
    "    KK....KK    ",
    "    KK....KK    ",
    "   KKKKKKKKKK   ",
    "  KKKKKKKKKKKK  ",  // dissolving body
    " KKKKKKKKKKKKKK ",
    " KKKKKKKKKKKKKK ",
    " KKKKK....KKKKK ",  // void in chest
    " KKKK......KKKK ",
    " KKK........KKK ",
    " KK..........KK ",
  ],
  {
    K: "#1a0824",
    ".": "#0a040e",
    R: "#a02828",   // hostile red glow
  }
);

/* ============================================================
   ST. CATHERINE OF ALEXANDRIA — patron, with wheel + book.
   ============================================================ */
export const spriteCatherine = makeSprite(
  [
    "    HHHHHHHH    ",  // halo
    "  HHhhhhhhhhHH  ",
    "  HhhhhhhhhhhH  ",  // dark hair flow
    "  HhhhssssshhH  ",
    "   hsssssssh    ",
    "   sss.oo.ss    ",
    "    sssssss     ",
    "    s-----s     ",
    "    s mmm s     ",  // soft lips
    "   sssssssss    ",
    "  PPPPPPPPPPP   ",  // royal purple
    " PP+GGGGGGGG+PP ",
    " PPGWWWWWWWWGPP ",  // book in hand (white pages)
    " PPGW++WW++WGPP ",  // gold trim on book
    " PPGWWWWWWWWGPP ",
    " PPGWWGGGGWWGPP ",  // book detail
    " PP+GGGGGGGG+PP ",
    " PPPPPPPPPPPPPP ",
  ],
  {
    H: GOLD_HI,
    h: "#3a1a0a",   // dark hair
    s: SKIN,
    "-": SKIN_LO,
    m: CRIMSON,     // lips
    ".": PUPIL,
    o: EYE_WHITE,
    P: PURPLE,
    "+": GOLD,
    G: GOLD,
    W: WHITE,
  }
);

/* ============================================================
   ST. GEORGE THE TROPHY-BEARER — patron, knight in armor.
   ============================================================ */
export const spriteGeorge = makeSprite(
  [
    "    HHHHHHHH    ",  // halo
    "  HHhhhhhhhhHH  ",
    "  HhhhhhhhhhhH  ",
    "   LLLLLLLLLL   ",  // chestnut hair
    "   LLssssssLL   ",
    "    sssssss     ",
    "    s.oo.os     ",
    "    sssssss     ",
    "    s-----s     ",
    "    sssssss     ",
    "  CCCCCCCCCCC   ",  // mail collar
    " CC+RRRRRRRR+CC ",  // surcoat
    " CCRR+WWWW+RRCC ",  // white cross on red surcoat
    " CCR+WWGGWW+RCC ",
    " CCR+WGGGGGW+RC ",
    " CCRR+WWWW+RRCC ",
    " CC+RRRRRRRR+CC ",
    " CCCCCCCCCCCCC  ",
  ],
  {
    H: GOLD_HI,
    h: "#5a2a10",
    L: "#5a2a10",
    s: SKIN,
    "-": SKIN_LO,
    ".": PUPIL,
    o: EYE_WHITE,
    C: "#8a8a8a",   // mail armor
    R: CRIMSON,
    W: WHITE,
    "+": GOLD,
    G: GOLD,
  }
);

/* ============================================================
   ST. MARY OF EGYPT — patron, ascetic, sun-darkened skin.
   ============================================================ */
export const spriteMaryEgypt = makeSprite(
  [
    "    HHHHHHHH    ",  // halo
    "  HHhhhhhhhhHH  ",
    "  HhhhhhhhhhhH  ",
    "   hhhhhhhhhh   ",  // long unkempt hair
    "   hhsssssshh   ",
    "    sssssss     ",
    "    s.oo.os     ",
    "    sssssss     ",
    "    s-----s     ",  // hollow cheeks
    "    sssssss     ",
    "   sssssssss    ",
    "  BBBBBBBBBBB   ",  // simple monk robe (brown)
    " BB+++++++++BB  ",  // gold trim of mantle
    " BBM+MMMMM+MBB  ",
    " BB+MMMGMMM+BB  ",  // small gold cross
    " BBMMMMGMMMMBBB ",
    " BB+++++++++BB  ",
    " BBBBBBBBBBBBB  ",
  ],
  {
    H: GOLD_HI,
    h: "#3a1a08",   // very dark hair
    s: "#c8a07a",   // sun-darkened skin
    "-": "#8a5a30",
    ".": PUPIL,
    o: EYE_WHITE,
    B: MONK_BROWN,
    M: MONK_BROWN_LO,
    G: GOLD,
    "+": GOLD_LO,
  }
);

/* ============================================================
   ST. SERAPHIM OF SAROV — patron, monk with white beard glow.
   ============================================================ */
export const spriteSeraphim = makeSprite(
  [
    "    HHHHHHHH    ",  // halo
    "  HHHHHHHHHHHH  ",  // brighter halo (uncreated light)
    "  HHKKKKKKKKHH  ",  // skufia under halo
    "  HKKKKKKKKKKH  ",
    "  HKKbbbbbbKKH  ",
    "   HSssssssSH   ",  // skin highlighted (light-bearing)
    "    Ss.oo.sS    ",
    "    sssssss     ",
    "    s-----s     ",
    "   bbbbbbbbb    ",
    "  bbbbbbbbbbb   ",
    " bbbbbbbbbbbbb  ",
    "BBBBBBBBBBBBBB  ",  // monk robe
    "BBBM+MMM+MBBBB  ",
    "BBM+MMGMM+MBBB  ",
    "BBBM+MGMM+MBBBB ",
    "BBBBM++++MBBBB  ",
    "BBBBBBBBBBBBBB  ",
  ],
  {
    H: "#fff0a0",   // bright halo glow
    K: "#0a0a0a",
    b: "#f5e9c9",
    S: "#fff0d4",   // bright skin highlight (Seraphim's light)
    s: "#f3d4ad",
    "-": SKIN_LO,
    ".": PUPIL,
    o: EYE_WHITE,
    B: MONK_BROWN,
    M: MONK_BROWN_LO,
    G: GOLD,
    "+": GOLD_LO,
  }
);

export const ALL_SPRITES: Record<string, Sprite> = {
  "st-anthony": spriteAnthony,
  "st-ignatius": spriteIgnatius,
  centurion: spriteCenturion,
  marcus: spriteMarcus,
  arius: spriteArius,
  "st-athanasius": spriteAthanasius,
  tempter: spriteTempter,
  "st-macarius": spriteMacarius,
  eutyches: spriteEutyches,
  "st-cyril": spriteCyril,
  iconoclast: spriteIconoclast,
  "st-john-damascus": spriteJohnDamascus,
  humbert: spriteHumbert,
  "st-mark-ephesus": spriteMarkEphesus,
  "pope-eugene": spritePopeEugene,
  nkvd: spriteNKVD,
  lds: spriteLDS,
  reformed: spriteReformed,
  atheist: spriteAtheist,
  doubt: spriteDoubt,
  "st-catherine": spriteCatherine,
  "st-george": spriteGeorge,
  "st-mary-egypt": spriteMaryEgypt,
  "st-seraphim": spriteSeraphim,
};
