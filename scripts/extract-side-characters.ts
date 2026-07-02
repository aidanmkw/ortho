// Emit generation entries for every boss that isn't already in the main
// CHARACTERS map: sprite reference + a prompt derived from its portrait
// config. Re-run after adding chapters:  npx tsx scripts/extract-side-characters.ts
import { CHAPTERS } from "../lib/quest/chapters";
import { PORTRAITS } from "../lib/quest/portraits";
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";

const MAIN = new Set([
  "centurion","marcus","arius","tempter","eutyches","iconoclast","humbert",
  "pope-eugene","nkvd","lds","reformed","atheist","doubt",
]);

const VEST: Record<string, string> = {
  "monk-brown": "brown monastic habit", "monk-black": "black monastic robes",
  "bishop-white": "white episcopal vestments", "bishop-purple": "purple episcopal vestments",
  "bishop-crimson": "crimson episcopal vestments", "imperial-purple": "Byzantine imperial purple with gold loros",
  centurion: "Roman officer armor with red cloak", "toga-white": "white Roman toga",
  "modern-hoodie": "modern hoodie and jeans", "modern-shirt-tie": "white shirt and tie",
  "modern-sweater": "dark modern sweater", "modern-collared": "casual collared shirt",
  "soviet-tunic": "soviet officer tunic", "deacon-purple": "purple deacon vestments with orarion",
  "cardinal-crimson": "crimson cardinal robes", "papal-white": "white papal robes",
  shadow: "tattered shadow-black hooded robes", void: "void-black tattered robes with violet glow",
};
const HEAD: Record<string, string> = {
  mitre: "gold mitre", tiara: "papal triple tiara", galero: "wide red cardinal hat",
  stemma: "jeweled Byzantine crown", helmet: "crested Roman helmet", laurel: "laurel wreath",
  "imperial-laurel": "imperial laurel wreath", ushanka: "soviet peaked cap",
  skufia: "black monastic skufia", klobuk: "black monastic klobuk veil",
  "hood-shadow": "deep dark hood", "void-shadow": "faceless dark hood",
};

const out: Record<string, { sprite?: string; prompt: string }> = {};
for (const c of CHAPTERS) {
  const b = c.boss;
  if (!b || MAIN.has(b.sprite) || out[b.sprite]) continue;
  const p = PORTRAITS[b.sprite];
  const bits: string[] = [];
  if (p) {
    bits.push(VEST[p.vestment] ?? "period robes");
    if (p.headwear && HEAD[p.headwear]) bits.push(HEAD[p.headwear]);
    if (p.beard && p.beard !== "none") bits.push(`${p.beardColor ?? p.hairColor} ${p.beard === "very-long" ? "very long" : p.beard} beard`);
  }
  const spriteFile = `${b.sprite}.webp`;
  const hasSprite = existsSync(path.join(__dirname, "..", "public", "sprites", spriteFile));
  out[b.sprite] = {
    ...(hasSprite ? { sprite: spriteFile } : {}),
    prompt:
      `${b.name}, ${b.title}, ${bits.join(", ")}, Byzantine icon style full-body character, ` +
      `dignified elongated proportions, muted earth and gold palette, game-ready, standing A-pose`,
  };
}
writeFileSync(path.join(__dirname, "side-characters.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`side-characters.json: ${Object.keys(out).length} entries`);
for (const [k, v] of Object.entries(out)) console.log(" ", k, v.sprite ? "(image)" : "(text-only)");
