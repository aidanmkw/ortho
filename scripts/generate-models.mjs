#!/usr/bin/env node
// Generates rigged, animated 3D character GLBs for the Pilgrim Road using
// the Meshy API (https://docs.meshy.ai), driven by the repo's own sprite
// art so the models inherit the established icon style.
//
//   MESHY_API_KEY=msy_xxx npm run models:generate            # all characters
//   MESHY_API_KEY=msy_xxx npm run models:generate -- --only=arius,doubt
//   ... -- --no-rig        # skip the rigging stage (static meshes)
//   ... -- --dry-run       # print the plan without calling the API
//
// For each character: sprite webp → data URI → Image-to-3D task → poll →
// (rigging task → poll) → download GLB to public/models/<id>.glb → update
// public/models/manifest.json. The game hot-swaps any character that has
// a manifest entry; missing ones keep their procedural figure.
//
// NOTE: the image-to-3d endpoints below match Meshy's stable v1 OpenAPI.
// If the rigging call ever 4xxs after an API revision, check
// https://docs.meshy.ai rigging docs and adjust RIG_CREATE/RIG_GET only.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const API = "https://api.meshy.ai";
const IMG_CREATE = `${API}/openapi/v1/image-to-3d`;
const IMG_GET = (id) => `${API}/openapi/v1/image-to-3d/${id}`;
const RIG_CREATE = `${API}/openapi/v1/rigging`;
const RIG_GET = (id) => `${API}/openapi/v1/rigging/${id}`;

const ROOT = path.join(import.meta.dirname, "..");
const SPRITES = path.join(ROOT, "public", "sprites");
const OUT = path.join(ROOT, "public", "models");
const MANIFEST = path.join(OUT, "manifest.json");

// Character id → reference sprite + a texture prompt nudge.
const STYLE =
  "Byzantine icon style full-body character, dignified elongated proportions, " +
  "flowing drapery with sculpted folds, muted earth and gold palette, " +
  "game-ready, standing A-pose";

const CHARACTERS = {
  // the pilgrim
  player: { sprite: "player-brown.webp", prompt: `young modern pilgrim in a dark blue hooded traveling cloak, ${STYLE}` },
  // adversaries (boss ids = chapter boss sprite ids)
  centurion: { sprite: "centurion.webp", prompt: `Roman centurion, crested helmet, segmented cuirass, red cloak, ${STYLE}` },
  marcus: { sprite: "marcus.webp", prompt: `Roman patrician in a white toga with crimson trim, ${STYLE}` },
  arius: { sprite: "arius.webp", prompt: `gaunt presbyter in dark robes, ${STYLE}` },
  tempter: { sprite: "tempter.webp", prompt: `hooded shadowy tempter, dark cowl, ${STYLE}` },
  eutyches: { sprite: "eutyches.webp", prompt: `elderly archimandrite monk in black robes, ${STYLE}` },
  iconoclast: { sprite: "iconoclast.webp", prompt: `Byzantine emperor in purple with gold loros and crown, ${STYLE}` },
  humbert: { sprite: "humbert.webp", prompt: `cardinal in crimson robes with wide galero hat, ${STYLE}` },
  "pope-eugene": { sprite: "pope-eugene.webp", prompt: `pope in white and gold with triple tiara, ${STYLE}` },
  nkvd: { sprite: "nkvd.webp", prompt: `1930s soviet officer, olive greatcoat, peaked cap with red star, ${STYLE}` },
  lds: { sprite: "lds.webp", prompt: `clean-cut modern missionary, white shirt and tie, ${STYLE}` },
  reformed: { sprite: "reformed.webp", prompt: `young modern woman seminarian, smart sweater, ${STYLE}` },
  atheist: { sprite: "atheist.webp", prompt: `modern young man in a casual collared shirt, ${STYLE}` },
  doubt: { sprite: "doubt.webp", prompt: `faceless wraith in tattered void-black hooded robes, faint violet glow, ${STYLE}` },
  // allies
  "st-ignatius": { sprite: "st-ignatius.webp", prompt: `elderly bishop saint in white omophorion, gold halo, chains, ${STYLE}` },
  "st-anthony": { sprite: "st-anthony.webp", prompt: `desert father monk, long white beard, brown habit, gold halo, ${STYLE}` },
  "st-athanasius": { sprite: "st-athanasius.webp", prompt: `young dark-bearded bishop saint, white vestments, gold halo, ${STYLE}` },
  "st-macarius": { sprite: "st-macarius.webp", prompt: `desert monk saint with white beard, gold halo, ${STYLE}` },
  "st-cyril": { sprite: "st-cyril.webp", prompt: `bishop saint of Alexandria, dark beard, white vestments, gold halo, ${STYLE}` },
  "st-john-damascus": { sprite: "st-john-damascus.webp", prompt: `monk saint with dark beard holding an icon, gold halo, ${STYLE}` },
  "st-mark-ephesus": { sprite: "st-mark-ephesus.webp", prompt: `bishop saint in purple vestments, dark beard, gold halo, ${STYLE}` },
};

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--only="))?.slice(7).split(",");
const noRig = args.includes("--no-rig");
const dryRun = args.includes("--dry-run");
// Key resolution: env var, or a git-ignored local file so the key never
// needs to be typed in a command (and can never be committed):
//   echo "msy_yourkey" > scripts/.meshy-key
function resolveKey() {
  if (process.env.MESHY_API_KEY?.trim()) return process.env.MESHY_API_KEY.trim();
  for (const f of [path.join(ROOT, "scripts", ".meshy-key"), path.join(ROOT, ".env.local")]) {
    try {
      const m = readFileSync(f, "utf8").match(/(msy_[A-Za-z0-9]+)/);
      if (m) return m[1];
    } catch {}
  }
  return undefined;
}
const KEY = resolveKey();

function headers() {
  return { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };
}

async function post(url, body) {
  const res = await fetch(url, { method: "POST", headers: headers(), body: JSON.stringify(body) });
  const text = await res.text();
  if (!res.ok) throw new Error(`${url} → ${res.status}: ${text.slice(0, 400)}`);
  return JSON.parse(text);
}

async function poll(getUrl, label, timeoutMin = 25) {
  const t0 = Date.now();
  for (;;) {
    const res = await fetch(getUrl, { headers: headers() });
    const data = await res.json();
    const status = data.status ?? data.state;
    if (status === "SUCCEEDED") return data;
    if (status === "FAILED" || status === "CANCELED")
      throw new Error(`${label} failed: ${JSON.stringify(data.task_error ?? data).slice(0, 300)}`);
    if (Date.now() - t0 > timeoutMin * 60e3) throw new Error(`${label} timed out`);
    process.stdout.write(`\r${label}: ${status} ${data.progress ?? 0}%   `);
    await new Promise((r) => setTimeout(r, 8000));
  }
}

async function download(url, file) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
}

/** Walk a response object and collect every .glb URL with its JSON path. */
function collectGlbUrls(obj, p = [], out = []) {
  if (typeof obj === "string") {
    if (/^https?:\/\/\S+\.glb([?#]|$)/i.test(obj)) out.push({ url: obj, path: p.join(".") });
  } else if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) collectGlbUrls(v, [...p, k], out);
  }
  return out;
}

/** Prefer animated > rigged > anything when picking from a rig response. */
function pickRiggedUrl(resp) {
  const urls = collectGlbUrls(resp);
  const score = (u) =>
    /anim|walk|motion|action/i.test(u.path + u.url) ? 3 : /rig|skel/i.test(u.path + u.url) ? 2 : 1;
  urls.sort((a, b) => score(b) - score(a));
  return urls[0]?.url;
}

/** Parse a GLB's JSON chunk: how many skins/clips did we actually get? */
function glbInfo(file) {
  try {
    const b = readFileSync(file);
    const len = b.readUInt32LE(12);
    const json = JSON.parse(b.slice(20, 20 + len).toString());
    return {
      skins: (json.skins ?? []).length,
      clips: (json.animations ?? []).map((a) => a.name ?? "?"),
    };
  } catch {
    return { skins: 0, clips: [] };
  }
}

const TASKS_FILE = path.join(OUT, "tasks.json");
async function rememberTasks(id, entry) {
  let all = {};
  try {
    all = JSON.parse(readFileSync(TASKS_FILE, "utf8"));
  } catch {}
  all[id] = { ...(all[id] ?? {}), ...entry };
  await writeFile(TASKS_FILE, JSON.stringify(all, null, 2) + "\n");
}

async function generateOne(id, spec) {
  const out = path.join(OUT, `${id}.glb`);
  if (existsSync(out)) {
    console.log(`■ ${id}: already exists, skipping (delete the .glb to regenerate)`);
    return true;
  }
  const spritePath = path.join(SPRITES, spec.sprite);
  const b64 = (await readFile(spritePath)).toString("base64");
  const dataUri = `data:image/webp;base64,${b64}`;

  console.log(`\n■ ${id}: image-to-3d from ${spec.sprite}`);
  const create = await post(IMG_CREATE, {
    image_url: dataUri,
    ai_model: "meshy-5",
    topology: "quad",
    target_polycount: 30000,
    should_remesh: true,
    should_texture: true,
    enable_pbr: true,
    texture_prompt: spec.prompt,
  });
  const meshTask = create.result ?? create.id;
  const mesh = await poll(IMG_GET(meshTask), `${id} mesh`);
  console.log(`\n■ ${id}: mesh done`);

  await rememberTasks(id, { mesh: meshTask });

  let glbUrl = mesh.model_urls?.glb;
  if (!noRig) {
    glbUrl = (await rigMesh(id, meshTask)) ?? glbUrl;
  }
  if (!glbUrl) throw new Error(`${id}: no GLB url in response`);
  await download(glbUrl, out);
  const info = glbInfo(out);
  if (info.skins > 0 || info.clips.length > 0) {
    console.log(`■ ${id}: saved — rigged ✓ skins=${info.skins} clips=[${info.clips.join(", ")}]`);
  } else {
    console.warn(`■ ${id}: saved — ⚠ STATIC mesh (no skeleton/clips in the downloaded GLB)`);
  }
  return true;
}

/** Create a rigging+animation task for a mesh task; returns the best GLB url. */
async function rigMesh(id, meshTaskId) {
  try {
    console.log(`■ ${id}: rigging + animation`);
    const rig = await post(RIG_CREATE, {
      input_task_id: meshTaskId,
      height_meters: 1.8,
    });
    const rigTask = rig.result ?? rig.id;
    await rememberTasks(id, { rig: rigTask });
    const rigged = await poll(RIG_GET(rigTask), `${id} rig`);
    const found = collectGlbUrls(rigged);
    console.log(
      `\n■ ${id}: rig response glb fields: ${found.map((f) => f.path).join(", ") || "(none)"}`
    );
    if (!found.length) {
      console.log(`■ ${id}: rig response sample: ${JSON.stringify(rigged).slice(0, 1200)}`);
    }
    return pickRiggedUrl(rigged);
  } catch (e) {
    console.warn(`\n■ ${id}: rigging unavailable (${e.message.slice(0, 160)}) — keeping static mesh.`);
    console.warn("  If this is a 4xx, check https://docs.meshy.ai and adjust RIG_CREATE fields.");
    return undefined;
  }
}

/**
 * --rig-missing: for characters whose GLB is static but whose mesh task id
 * is known (tasks.json), create a fresh rigging job and replace the file.
 * Costs only the rigging fee — no regeneration.
 */
async function rigMissing() {
  let all = {};
  try {
    all = JSON.parse(readFileSync(TASKS_FILE, "utf8"));
  } catch {
    console.error("No public/models/tasks.json — run --adopt-tasks first.");
    return;
  }
  for (const [id, t] of Object.entries(all)) {
    if (!t.mesh) continue;
    const file = path.join(OUT, `${id}.glb`);
    if (existsSync(file) && glbInfo(file).skins > 0) continue;
    const url = await rigMesh(id, t.mesh);
    if (!url) continue;
    await download(url, file);
    const info = glbInfo(file);
    console.log(`■ ${id}: re-rigged — skins=${info.skins} clips=[${info.clips.join(", ")}]`);
  }
}

/**
 * --refresh-rigged: re-poll recorded rigging tasks and re-download their
 * animated GLBs over any static files. Costs no generation credits.
 */
async function refreshRigged() {
  let all = {};
  try {
    all = JSON.parse(readFileSync(TASKS_FILE, "utf8"));
  } catch {
    console.error("No public/models/tasks.json — nothing to refresh.");
    return;
  }
  for (const [id, t] of Object.entries(all)) {
    if (!t.rig) continue;
    const file = path.join(OUT, `${id}.glb`);
    const before = existsSync(file) ? glbInfo(file) : { skins: 0, clips: [] };
    if (before.skins > 0) {
      console.log(`■ ${id}: already rigged, skipping`);
      continue;
    }
    try {
      const rigged = await poll(RIG_GET(t.rig), `${id} rig`, 2);
      const url = pickRiggedUrl(rigged);
      if (!url) {
        console.warn(`■ ${id}: no glb in rig response`);
        continue;
      }
      await download(url, file);
      const info = glbInfo(file);
      console.log(`\n■ ${id}: refreshed — skins=${info.skins} clips=[${info.clips.join(", ")}]`);
    } catch (e) {
      console.warn(`■ ${id}: refresh failed: ${e.message.slice(0, 120)}`);
    }
  }
}

/**
 * --adopt-tasks: rebuild tasks.json from the Meshy account history by
 * matching past tasks to characters via their unique prompts. Lets
 * --refresh-rigged recover rigged GLBs for models generated before task
 * recording existed — at zero generation cost.
 */
async function adoptTasks() {
  const list = async (kind) => {
    const res = await fetch(`${API}/openapi/v1/${kind}?page_size=50`, { headers: headers() });
    if (!res.ok) throw new Error(`${kind} list → ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : data.result ?? data.data ?? [];
  };
  const meshes = await list("image-to-3d");
  const rigs = await list("rigging");
  console.log(`Found ${meshes.length} mesh task(s), ${rigs.length} rigging task(s) in account history.`);
  let adopted = 0;
  for (const [id, spec] of Object.entries(CHARACTERS)) {
    const sig = spec.prompt.slice(0, 48);
    const mesh = meshes.find((m) => JSON.stringify(m).includes(sig));
    if (!mesh) continue;
    const meshId = mesh.id ?? mesh.result;
    const rig = rigs.find((r) => JSON.stringify(r).includes(meshId));
    await rememberTasks(id, { mesh: meshId, ...(rig ? { rig: rig.id ?? rig.result } : {}) });
    adopted++;
    console.log(`■ ${id}: adopted mesh=${meshId}${rig ? ` rig=${rig.id ?? rig.result}` : " (no rig task found)"}`);
  }
  console.log(`Adopted ${adopted} character(s). Now run with --refresh-rigged.`);
}

async function main() {
  if (
    args.includes("--adopt-tasks") ||
    args.includes("--refresh-rigged") ||
    args.includes("--rig-missing")
  ) {
    if (!KEY) {
      console.error("MESHY_API_KEY required.");
      process.exit(1);
    }
    if (args.includes("--adopt-tasks")) await adoptTasks();
    if (args.includes("--refresh-rigged")) await refreshRigged();
    if (args.includes("--rig-missing")) await rigMissing();
    // keep the manifest in sync with whatever is rigged on disk now
    const manifest = { models: [] };
    for (const id of Object.keys(CHARACTERS)) {
      if (existsSync(path.join(OUT, `${id}.glb`))) manifest.models.push(id);
    }
    await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
    return;
  }
  const ids = Object.keys(CHARACTERS).filter((id) => !only || only.includes(id));
  console.log(`Generating ${ids.length} character model(s): ${ids.join(", ")}`);
  if (dryRun) return;
  if (!KEY) {
    console.error(
      "No Meshy key found. Easiest fix:\n" +
        '  echo "msy_yourkey" > scripts/.meshy-key\n' +
        "(or set the MESHY_API_KEY env var). Nothing was generated."
    );
    process.exit(1);
  }
  // preflight: fail fast and clearly on a bad key
  const pre = await fetch(`${IMG_CREATE}?page_size=1`, { headers: headers() });
  if (pre.status === 401) {
    console.error(
      "\nMeshy rejected this API key (401 Invalid API key).\n" +
        "  • Copy it again from meshy.ai → Settings → API Keys (watch for trailing spaces/newlines)\n" +
        "  • If you regenerated the key, the old value is dead — use the new one\n" +
        `  • Key as received by this script: "${KEY.slice(0, 8)}…${KEY.slice(-4)}" (length ${KEY.length})\n`
    );
    process.exit(1);
  }
  console.log(`Meshy auth OK (HTTP ${pre.status}).`);
  await mkdir(OUT, { recursive: true });
  const done = [];
  for (const id of ids) {
    try {
      if (await generateOne(id, CHARACTERS[id])) done.push(id);
    } catch (e) {
      console.error(`✗ ${id}: ${e.message}`);
    }
  }
  // refresh the manifest from what actually exists on disk
  const manifest = { models: [] };
  for (const id of Object.keys(CHARACTERS)) {
    if (existsSync(path.join(OUT, `${id}.glb`))) manifest.models.push(id);
  }
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nManifest updated: ${manifest.models.length} model(s) live.`);
  console.log("Commit public/models/ and deploy — the game hot-swaps them automatically.");
}

main();
