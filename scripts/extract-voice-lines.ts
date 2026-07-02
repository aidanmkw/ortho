// Snapshot boss voice lines to JSON for scripts/generate-voices.mjs
// (which runs in plain Node on CI). Re-run after editing chapter dialog:
//   npx tsx scripts/extract-voice-lines.ts
import { CHAPTERS } from "../lib/quest/chapters";
import { writeFileSync } from "node:fs";
import path from "node:path";

const lines = CHAPTERS.filter((c) => c.boss).map((c) => ({
  id: c.id,
  sprite: c.boss!.sprite,
  intro: c.boss!.intro,
  midline: c.boss!.midline ?? null,
  outro: c.boss!.outro,
}));
writeFileSync(
  path.join(__dirname, "voice-lines.json"),
  JSON.stringify(lines, null, 2) + "\n"
);
console.log(`voice-lines.json: ${lines.length} bosses`);
