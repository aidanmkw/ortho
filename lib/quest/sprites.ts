import type { Sprite } from "./types";

// Convention for portraits: 16 wide × 18 tall, head-and-shoulders.
// Char palette per sprite. " " is transparent.

const skin = "#e8c39e";
const skinShadow = "#b48055";
const black = "#0a0a0a";
const white = "#f5e9c9";
const grayHair = "#cfcfcf";
const lightBeard = "#e7d7b0";
const goldHalo = "#e8c54a";
const gold = "#c9a227";
const goldDark = "#8a6e15";
const crimson = "#7c1414";
const blue = "#324e7b";
const blueDark = "#1d2f4e";
const purple = "#3a1f4d";
const green = "#3d6b3a";
const greenDark = "#284628";
const monkBrown = "#5d3a1e";
const monkBrownDark = "#3b2410";
const ink = "#1a1814";

function makeSprite(rows: string[], palette: Record<string, string>): Sprite {
  return { rows, palette: { " ": "transparent", ...palette } };
}

// ---- THE PLAYER (4 hair variants chosen at character create) ----
// Modern hoodie-and-jeans Inquirer. We swap the 'h' char to color hair.
const playerRows = [
  "                ",
  "    hhhhhh      ",
  "   hhhhhhhh     ",
  "   hssssssh     ",
  "   ss.ss.ss     ",
  "   sssssss      ",
  "    ss-ss       ",
  "    sssss       ",
  "  HHHHHHHHH     ",
  " HHHHHHHHHHH    ",
  " HHHHHHHHHHH    ",
  " HHHHHHHHHHH    ",
  " HHHHHHHHHHH    ",
  " HH HHHHH HH    ",
  " jj  HHH  jj    ",
  " jj  jjj  jj    ",
  "  j  jjj   j    ",
  "     jjj        ",
];

export function playerSprite(hair: string): Sprite {
  return makeSprite(playerRows, {
    h: hair,
    s: skin,
    ".": black,
    "-": skinShadow,
    H: "#3a4a78", // hoodie blue
    j: "#3a3a3a", // jeans
  });
}

// ---- ST. ANTHONY THE GREAT (guide) ----
// Old monk, white beard, monastic skufia (hat), brown robe.
export const spriteAnthony = makeSprite(
  [
    "                ",
    "                ",
    "    KKKKKK      ",
    "   KKKKKKKK     ",
    "   KKbbbbKK     ",
    "    bbbbbb      ",
    "    s.ss.s      ",
    "    sssss       ",
    "    sssss       ",
    "   bbsbsbb      ",
    "  bbbbsbbbb     ",
    " bbbbbsbbbbb    ",
    "BBBBBBBBBBBBB   ",
    "BBBBBBBBBBBBB   ",
    "BB++BBBB+BBBB   ",
    "BB+B+BBB+B+BB   ",
    "BBBBBBBBBBBBB   ",
    "                ",
  ],
  {
    K: black,         // skufia hat
    s: skin,
    ".": black,
    b: white,         // white beard / hair
    B: monkBrown,     // robe
    "+": goldDark,
  }
);

// ---- ST. IGNATIUS OF ANTIOCH (bishop, in chains heading to martyrdom) ----
// Bishop in omophorion (white scarf with crosses).
export const spriteIgnatius = makeSprite(
  [
    "                ",
    "    GGGGGG      ",
    "   GGgggggG     ",
    "   GggggggG     ",
    "   GssssssG     ",
    "   ss.ss.s      ",
    "   sssssss      ",
    "    ssbss       ",
    "   bbbbbb       ",
    "  bWWWWWWWb     ",
    " bWW++++++WWb   ",
    " bWW+RRRR+WWb   ",
    " bWW++++++WWb   ",
    " bWWWWWWWWWb    ",
    " bWWWWWWWWWb    ",
    "  bbbbbbbbb     ",
    "                ",
    "                ",
  ],
  {
    G: gold,           // bishop's mitre
    g: goldDark,
    s: skin,
    ".": black,
    b: white,          // beard + omophorion border
    W: white,
    "+": crimson,
    R: gold,
  }
);

// ---- ROMAN CENTURION (boss ch.1) ----
export const spriteCenturion = makeSprite(
  [
    "                ",
    "    CCCCCC      ",
    "  C CCRRCC C    ",
    " CC CCRRCC CC   ",
    "  C CCCCCC C    ",
    "    CssssC      ",
    "    s.ss.s      ",
    "    sssss       ",
    "    sssss       ",
    "  CCCCCCCCC     ",
    " CCRRRRRRRCC    ",
    " CCRGGGGGRCC    ",
    " CCRRRRRRRCC    ",
    " CCCCCCCCCCC    ",
    " CCC     CCC    ",
    " CC       CC    ",
    "                ",
    "                ",
  ],
  {
    C: "#8a8a8a",   // armor
    R: crimson,     // tunic
    s: skin,
    ".": black,
    G: gold,
  }
);

// ---- MARCUS THE PAGAN ROMAN ----
export const spriteMarcus = makeSprite(
  [
    "                ",
    "    LLLLLL      ",
    "   LLLLLLLL     ",
    "   LsssssL      ",
    "   ss.ss.s      ",
    "   sssssss      ",
    "    sssss       ",
    "    s mm s      ",
    "  PPPPPPPPP     ",
    " PP RRRRR PP    ",
    " PP RRRRR PP    ",
    " PP RRRRR PP    ",
    " PPPPPPPPPP     ",
    " PP       PP    ",
    "                ",
    "                ",
    "                ",
    "                ",
  ],
  {
    L: "#4a2810", // dark hair
    s: skin,
    ".": black,
    m: skinShadow, // mustache
    P: white,      // toga
    R: crimson,
  }
);

// ---- ARIUS (heretic, sneering, deacon vestments) ----
export const spriteArius = makeSprite(
  [
    "                ",
    "    LLLLLL      ",
    "   LLLLLLLL     ",
    "   LssssssL     ",
    "   ss.ss.s      ",
    "   sss<sss      ",
    "    sssss       ",
    "   bbbbbbbb     ",
    "  bbbbbbbbb     ",
    "  RWWWWWWWR     ",
    " RRWWWWWWWRR    ",
    " RRWW+++WWRR    ",
    " RRWWW+WWWRR    ",
    " RRWWWWWWWRR    ",
    " RRRRRRRRRR     ",
    "                ",
    "                ",
    "                ",
  ],
  {
    L: black,
    s: skin,
    ".": black,
    "<": "#888888",
    b: black,        // beard
    R: purple,       // deacon robe (dark)
    W: white,        // sticharion
    "+": crimson,
  }
);

// ---- ST. ATHANASIUS (ally ch.3) ----
export const spriteAthanasius = makeSprite(
  [
    "                ",
    "    BBBBBB      ",
    "   BBBBBBBB     ",
    "   BssssssB     ",
    "   ss.ss.s      ",
    "   ssssss       ",
    "    ssbss       ",
    "   bbbbbbb      ",
    "  bbbbbbbbb     ",
    "  RRRRRRRR      ",
    " RR WWWWW RR    ",
    " RR WGGGW RR    ",
    " RR WWWWW RR    ",
    " RRRRRRRRRR     ",
    " R          R   ",
    "                ",
    "                ",
    "                ",
  ],
  {
    B: black,
    s: skin,
    ".": black,
    b: "#1a1a1a",     // black beard
    R: crimson,
    W: white,
    G: gold,
  }
);

// ---- DESERT TEMPTER (boss ch.4) — hooded shadow with red eyes ----
export const spriteTempter = makeSprite(
  [
    "                ",
    "   KKKKKKKK     ",
    "  KKKKKKKKKK    ",
    " KKKKKKKKKKKK   ",
    " KK........KK   ",
    " K.RR....RR.K   ",
    " K..........K   ",
    " K....++....K   ",
    " KK........KK   ",
    " KKK......KKK   ",
    " KKKKKKKKKKKK   ",
    " KK        KK   ",
    " K          K   ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
  ],
  {
    K: "#0e0518",
    ".": black,
    R: "#c52a2a",     // glowing eyes
    "+": purple,
  }
);

// ---- ST. MACARIUS THE GREAT (ally ch.4) ----
export const spriteMacarius = makeSprite(
  [
    "                ",
    "                ",
    "    KKKKKK      ",
    "   KKKKKKKK     ",
    "   KKbbbbKK     ",
    "    bbbbbb      ",
    "    s.ss.s      ",
    "    sssss       ",
    "   bbbbbbb      ",
    "  bbbbbbbbb     ",
    " bbbbbbbbbbb    ",
    "BBBBBBBBBBBBB   ",
    "BBBBBBBBBBBBB   ",
    "BBBB+TTT+BBBB   ",
    "BBB+TTTTT+BBB   ",
    "BBBBBBBBBBBBB   ",
    "                ",
    "                ",
  ],
  {
    K: black,
    s: skin,
    ".": black,
    b: lightBeard,
    B: monkBrown,
    "+": goldDark,
    T: gold,
  }
);

// ---- EUTYCHES the Monophysite ----
export const spriteEutyches = makeSprite(
  [
    "                ",
    "    KKKKKK      ",
    "   KKKKKKKK     ",
    "   Kss<<ssK     ",
    "   ss.ss.s      ",
    "   sssssss      ",
    "    s---s       ",
    "   ----------   ",
    "  ------------  ",
    "  KK--------KK  ",
    " KKKK------KKKK ",
    " KKKK------KKKK ",
    " KKKKKKKKKKKKKK ",
    " KK          KK ",
    "                ",
    "                ",
    "                ",
    "                ",
  ],
  {
    K: black,
    s: skin,
    "<": "#444",
    ".": black,
    "-": lightBeard,
  }
);

// ---- ST. CYRIL OF ALEXANDRIA ----
export const spriteCyril = makeSprite(
  [
    "                ",
    "    GGGGGG      ",
    "   GGggggG      ",
    "   GTTTTTG      ",
    "   GssssssG     ",
    "   ss.ss.s      ",
    "    sssss       ",
    "   bbbbbbb      ",
    "  bbbbbbbbb     ",
    "  WWWWWWWWW     ",
    " WW++RRR++WW    ",
    " WWGGGRGGGWW    ",
    " WW++RRR++WW    ",
    " WWWWWWWWWWW    ",
    " WW         WW  ",
    "                ",
    "                ",
    "                ",
  ],
  {
    G: gold,
    g: goldDark,
    T: crimson,
    s: skin,
    ".": black,
    b: "#9a7a40",  // brown beard
    W: white,
    R: crimson,
    "+": gold,
  }
);

// ---- ICONOCLAST EMPEROR Constantine V ----
export const spriteIconoclast = makeSprite(
  [
    "                ",
    " GGGGGGGGGGGG   ",
    " G+G+G+G+G+G    ",
    "  GGGGGGGGGG    ",
    "  GsssssssG     ",
    "  ss.ss.ss      ",
    "   sssssss      ",
    "    sxxxs       ",
    "   bbbbbbb      ",
    "  PPPPPPPPP     ",
    " PP+G+G+G+PP    ",
    " PP+G+G+G+PP    ",
    " PPPPPPPPPPP    ",
    " PP       PP    ",
    "                ",
    "                ",
    "                ",
    "                ",
  ],
  {
    G: gold,
    "+": crimson,
    s: skin,
    ".": black,
    x: skinShadow, // mustache
    b: black,
    P: purple,     // imperial purple
  }
);

// ---- ST. JOHN OF DAMASCUS (ally ch.6) ----
export const spriteJohnDamascus = makeSprite(
  [
    "                ",
    "                ",
    "    KKKKKK      ",
    "   KKKKKKKK     ",
    "   KKBBBBKK     ",
    "    BBBBBB      ",
    "    s.ss.s      ",
    "    sssss       ",
    "    sxsxs       ",
    "   bbbbbbb      ",
    "  bbbbbbbbb     ",
    "BBBBBBBBBBBBB   ",
    "BBBBBBBBBBBBB   ",
    "BB GGGGGGG BB   ",
    "BB GIIIIIG BB   ",  // icon
    "BB GGGGGGG BB   ",
    "BBBBBBBBBBBBB   ",
    "                ",
  ],
  {
    K: black,
    s: skin,
    ".": black,
    x: skinShadow,
    B: black,
    b: "#3a2a1a", // dark beard
    G: gold,
    I: skin,
  }
);

// ---- CARDINAL HUMBERT (boss ch.7) ----
export const spriteHumbert = makeSprite(
  [
    "                ",
    "    RRRRRR      ",
    "   RRRRRRRR     ",
    "   RRRRRRRR     ",
    "    RsssR       ",
    "    sssss       ",
    "    s.ss.s      ",
    "    sssss       ",
    "    sssss       ",
    "   RRRRRRR      ",
    "  RRWWWWWRR     ",
    " RRWWGGGWWRR    ",
    " RRWWGCGWWRR    ",
    " RRWWGGGWWRR    ",
    " RRWWWWWWWRR    ",
    " RRRRRRRRRRR    ",
    "                ",
    "                ",
  ],
  {
    R: crimson,
    s: skin,
    ".": black,
    W: white,
    G: gold,
    C: crimson,
  }
);

// ---- ST. MARK OF EPHESUS (ally ch.8) ----
export const spriteMarkEphesus = makeSprite(
  [
    "                ",
    "  KKKKKKKKKK    ",
    " KKGGGGGGGGKK   ",
    " KKG+G+G+GKK    ",
    " KKGGGGGGGKK    ",
    "  KKssssssKK    ",
    "   ss.ss.s      ",
    "   sssssss      ",
    "    sbsbs       ",
    "   bbbbbbb      ",
    "  bbbbbbbbb     ",
    " BBBBBBBBBBB    ",
    " BBGGGGGGGBB    ",
    " BBG+++++GBB    ",
    " BBGGGGGGGBB    ",
    " BBBBBBBBBBB    ",
    "                ",
    "                ",
  ],
  {
    K: black,
    G: gold,
    "+": crimson,
    s: skin,
    ".": black,
    b: white,
    B: purple,
  }
);

// ---- POPE EUGENE IV (boss ch.8) ----
export const spritePopeEugene = makeSprite(
  [
    "                ",
    "    WWWWWW      ",
    "   WWWWWWWW     ",
    "  WWWGGGGWWWW   ",
    "  WWWG++GWWWW   ",
    "   WWGGGGWWW    ",
    "    sssss       ",
    "    s.ss.s      ",
    "    sssss       ",
    "    s---s       ",
    "  WWWWWWWWW     ",
    " WW+RRR+RRWW    ",
    " WW+RRRRR+WW    ",
    " WW+RRRRR+WW    ",
    " WWWWWWWWWWW    ",
    " WW       WW    ",
    "                ",
    "                ",
  ],
  {
    W: white,
    G: gold,
    "+": crimson,
    s: skin,
    ".": black,
    "-": lightBeard,
    R: crimson,
  }
);

// ---- NKVD INTERROGATOR (boss ch.9) ----
export const spriteNKVD = makeSprite(
  [
    "                ",
    "   KKKKKKKK     ",
    "  KKRRRRRRKK    ",
    "  KKK+++KKK     ",
    "  KKKKKKKKK     ",
    "   sssssss      ",
    "   ss.ss.s      ",
    "    sssss       ",
    "    s---s       ",
    "   KKKKKKK      ",
    "  KKKKKKKKK     ",
    " KK BBBBB KK    ",
    " KK BSSSB KK    ",
    " KK BBBBB KK    ",
    " KKKKKKKKKKK    ",
    " KK       KK    ",
    "                ",
    "                ",
  ],
  {
    K: "#3a3a3a",  // gray uniform
    R: "#5e1418",  // red star band
    "+": "#c9a227",
    s: skin,
    ".": black,
    "-": skinShadow,
    B: "#5e1418",  // blood-red badge
    S: gold,
  }
);

// ---- LDS MISSIONARY (boss ch.10a) ----
export const spriteLDS = makeSprite(
  [
    "                ",
    "   LLLLLLLL     ",
    "  LLLLLLLLLL    ",
    "  LLLLLLLLLL    ",
    "  LssssssL      ",
    "  ss.ss.ss      ",
    "   sssssss      ",
    "    sssss       ",
    "   bWWWWWb      ",
    "  bbWWWWWbb     ",
    " bbbWBBBWbbb    ",   // tie
    " bWWWBBBWWWb    ",
    " bWWWWWWWWWb    ",
    " bWWWWWWWWWb    ",
    " bWWWWWWWWWb    ",
    " bbbbbbbbbbb    ",
    "                ",
    "                ",
  ],
  {
    L: "#7a4f1d",   // brown hair
    s: skin,
    ".": black,
    b: black,
    W: white,       // white shirt
    B: "#1a2c4e",   // tie
  }
);

// ---- REFORMED SEMINARIAN (boss ch.10b) ----
export const spriteReformed = makeSprite(
  [
    "                ",
    "   LLLLLLLL     ",
    "  LLLLLLLLLL    ",
    "   LLLLLLLL     ",
    "   LssssssL     ",
    "   ss.ss.s      ",
    "    sssss       ",
    "    s---s       ",
    "    s---s       ",
    "  KKKKKKKKK     ",
    " KK       KK    ",
    " KK BBBBB KK    ",
    " KK BBBBB KK    ",
    " KK BBBBB KK    ",
    " KK BBBBB KK    ",
    " KKKKKKKKKKK    ",
    "                ",
    "                ",
  ],
  {
    L: "#dca873",  // sandy hair
    s: skin,
    ".": black,
    "-": "#6b4a1f", // beard
    K: black,      // black sweater
    B: "#4a3a1a",  // book under arm
  }
);

// ---- ATHEIST INTERLOCUTOR (boss ch.10c) ----
export const spriteAtheist = makeSprite(
  [
    "                ",
    "    LLLLLL      ",
    "   LLLLLLLL     ",
    "   LssssssL     ",
    "   ss.ss.s      ",
    "   sssssss      ",
    "    sssss       ",
    "    sssss       ",
    "    s---s       ",
    "  GGGGGGGGG     ",
    " GG TTTTT GG    ",
    " GG TttttT GG   ",
    " GG TTTTT GG    ",
    " GGGGGGGGGGG    ",
    "                ",
    "                ",
    "                ",
    "                ",
  ],
  {
    L: "#222",     // black hair
    s: skin,
    ".": black,
    "-": skinShadow,
    G: "#2a2a3a",  // dark gray hoodie
    T: "#666",     // glasses frame
    t: skin,
  }
);

// ---- THE DOUBT (final boss — translucent shadow of the player) ----
export const spriteDoubt = makeSprite(
  [
    "                ",
    "    KKKKKK      ",
    "   KKKKKKKK     ",
    "   K......K     ",
    "   K.RR.RR.     ",
    "   K......K     ",
    "    K....K      ",
    "    KK..KK      ",
    "  KKKKKKKKK     ",
    " KKKKKKKKKKK    ",
    " KKKKKKKKKKK    ",
    " KKKKKKKKKKK    ",
    " KK       KK    ",
    " KK       KK    ",
    " KK       KK    ",
    " KK       KK    ",
    "                ",
    "                ",
  ],
  {
    K: "#1a1024",
    ".": "#0a0610",
    R: "#7c1414",
  }
);

// ---- ST. CATHERINE OF ALEXANDRIA (selectable patron) ----
export const spriteCatherine = makeSprite(
  [
    "                ",
    "    HHHHHHH     ",
    "   HHHHHHHHH    ",
    "  HhhhhhhhhhH   ",
    "  HhhhsssshhH   ",
    "   hsss.s.sh    ",
    "    sssssss     ",
    "    ssms ms     ",
    "   bbbbbbb      ",
    "  PPPPPPPPP     ",
    " PPP GGGGG PP   ",
    " PPP GWWWG PP   ",
    " PPP GGGGG PP   ",
    " PPPPPPPPPPP    ",
    "                ",
    "                ",
    "                ",
    "                ",
  ],
  {
    H: gold,         // halo
    h: "#5d3018",    // dark hair
    s: skin,
    ".": black,
    m: crimson,      // lips
    b: skin,
    P: purple,
    G: gold,
    W: white,
  }
);

// ---- ST. GEORGE THE TROPHY-BEARER (selectable patron) ----
export const spriteGeorge = makeSprite(
  [
    "                ",
    "    HHHHHHH     ",
    "  HhhhhhhhhH    ",
    "   hhhhhhhh     ",
    "   hssssssh     ",
    "   ss.ss.s      ",
    "    sssss       ",
    "    s---s       ",
    "    sssss       ",
    "  CCCCCCCCC     ",
    " CCRR+++RRCC    ",
    " CCRGGGGGRCC    ",
    " CCRR+++RRCC    ",
    " CCCCCCCCCCC    ",
    "                ",
    "                ",
    "                ",
    "                ",
  ],
  {
    H: goldHalo,
    h: "#6a3a1a",
    s: skin,
    ".": black,
    "-": skinShadow,
    C: "#9a9a9a",   // armor
    R: crimson,     // surcoat
    "+": white,
    G: gold,
  }
);

// ---- ST. MARY OF EGYPT (selectable patron) ----
export const spriteMaryEgypt = makeSprite(
  [
    "                ",
    "    HHHHHHH     ",
    "   HhhhhhhH     ",
    "   hhhhhhhh     ",
    "   hssssssh     ",
    "   ss.ss.s      ",
    "    sssss       ",
    "    sssss       ",
    "    sssss       ",
    "  BBBBBBBBB     ",
    " BBBBBBBBBBB    ",
    " BB+++++++BB    ",
    " BB+++++++BB    ",
    " BBBBBBBBBBB    ",
    "                ",
    "                ",
    "                ",
    "                ",
  ],
  {
    H: goldHalo,
    h: "#4a2410", // dark hair
    s: "#c8a883", // sun-darkened skin
    ".": black,
    B: monkBrown,
    "+": goldDark,
  }
);

// ---- ST. SERAPHIM OF SAROV (selectable patron) ----
export const spriteSeraphim = makeSprite(
  [
    "                ",
    "    HHHHHHH     ",
    "  HhKKKKKKKhH   ",
    "  HKKKKKKKKKH   ",
    "  HKKbbbbbKKH   ",
    "    bbbbbbb     ",
    "    s.ss.s      ",
    "    sssss       ",
    "   bbbbbbb      ",
    "  bbbbbbbbb     ",
    " bbbbbbbbbbb    ",
    "BBBBBBBBBBBBB   ",
    "BBBBBBBBBBBBB   ",
    "BBBB+TTT+BBBB   ",
    "BBB+TTTTT+BBB   ",
    "BBBBBBBBBBBBB   ",
    "                ",
    "                ",
  ],
  {
    H: goldHalo,
    K: black,
    s: "#f0d9b5",  // bright skin (light-bearing)
    ".": black,
    b: white,
    B: monkBrown,
    "+": goldDark,
    T: gold,
  }
);

// ---- BACKGROUND TILES (full-bleed mini-bg patterns) ----
// We don't render full pixel backgrounds; we use CSS gradients per chapter id.

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
