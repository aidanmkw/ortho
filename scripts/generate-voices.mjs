#!/usr/bin/env node
// Gives every adversary a voice via the ElevenLabs API: intro, midline,
// and dying words per boss, cached as static mp3s in public/voice/ and
// announced in public/models/manifest.json (voices list). Skips existing
// files, exits quietly when no key is configured.
//
//   ELEVENLABS_API_KEY=sk_xxx node scripts/generate-voices.mjs
//   (or: echo "sk_xxx" > scripts/.elevenlabs-key)

import { writeFile, mkdir, readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "voice");
const MANIFEST = path.join(ROOT, "public", "models", "manifest.json");

function resolveKey() {
  if (process.env.ELEVENLABS_API_KEY?.trim()) return process.env.ELEVENLABS_API_KEY.trim();
  for (const f of [path.join(ROOT, "scripts", ".elevenlabs-key")]) {
    try {
      const m = readFileSync(f, "utf8").match(/(sk_[A-Za-z0-9]+)/);
      if (m) return m[1];
    } catch {}
  }
  return undefined;
}
const KEY = resolveKey();

// premade ElevenLabs voices
const VOICES = {
  default: "pNInz6obpgDQGcFmaJgB", // Adam — deep, authoritative
  sinister: "VR6AewLTigWG4xSOukaG", // Arnold — gravel
  young: "TxGEqnHWrfWFTfGW9XjX", // Josh — modern
  female: "21m00Tcm4TlvDq8ikWAM", // Rachel
};
const VOICE_FOR = {
  tempter: "sinister",
  doubt: "sinister",
  nkvd: "sinister",
  volkh: "sinister",
  lds: "young",
  atheist: "young",
  reformed: "female",
};

async function tts(voiceId, text, file) {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_64`,
    {
      method: "POST",
      headers: { "xi-api-key": KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.45, similarity_boost: 0.7, style: 0.35 },
      }),
    }
  );
  if (!res.ok) throw new Error(`${res.status}: ${(await res.text()).slice(0, 200)}`);
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
}

async function main() {
  if (!KEY) {
    console.log("No ELEVENLABS_API_KEY — skipping voice generation.");
    return;
  }
  const CHAPTERS = JSON.parse(
    await readFile(path.join(ROOT, "scripts", "voice-lines.json"), "utf8")
  );
  await mkdir(OUT, { recursive: true });
  const voiced = [];
  let generated = 0;
  for (const ch of CHAPTERS) {
    const voice = VOICES[VOICE_FOR[ch.sprite] ?? "default"];
    const lines = [
      ["intro", ch.intro?.slice(0, 260)],
      ["midline", ch.midline?.slice(0, 220)],
      ["outro", ch.outro?.slice(0, 260)],
    ];
    let any = false;
    for (const [kind, text] of lines) {
      if (!text) continue;
      const file = path.join(OUT, `${ch.id}-${kind}.mp3`);
      if (existsSync(file)) {
        any = true;
        continue;
      }
      try {
        await tts(voice, text, file);
        generated++;
        any = true;
        console.log(`■ ${ch.id} ${kind} ✓`);
      } catch (e) {
        console.warn(`✗ ${ch.id} ${kind}: ${e.message.slice(0, 120)}`);
      }
    }
    if (any) voiced.push(ch.id);
  }
  // manifest
  let manifest = { models: [], props: [], voices: [] };
  try {
    manifest = { voices: [], ...JSON.parse(await readFile(MANIFEST, "utf8")) };
  } catch {}
  manifest.voices = voiced;
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Voices: ${generated} new clip(s); ${voiced.length} chapter(s) voiced.`);
}

main();
