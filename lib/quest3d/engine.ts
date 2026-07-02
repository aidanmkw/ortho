// ΟΔΟΣ — The Pilgrim Road. A Three.js open-world road in a realistic,
// Skyrim-leaning style: noise-built terrain with snowy ridgelines, a real
// sun with cascading golden-hour light and shadow, atmospheric sky
// (Preetham), instanced forests and grass, falling snow, night stars and
// aurora — and fully articulated, code-animated 3D characters built from
// the corpus' portrait registry.
//
// The engine owns space, movement, camera, and effects. All game RULES
// (battle resolution, HP, saves) live in React; the engine reports what the
// player is near and renders what React decides.

import * as THREE from "three";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { PORTRAITS } from "@/lib/quest/portraits";
import { buildRig, playerConfig, type Rig } from "./characters";
import { loadModelManifest, loadModelRig, loadPropScene } from "./modelRig";
import { CAVE_ZONES, CHAPEL_ZONES } from "./relics";
import { buildSideDuels, DUEL_SLOTS, type SideDuel } from "./sideQuests";
import type {
  EngineHooks,
  NearTarget,
  PlateState,
  TreeKind,
  ZoneDef,
  ZonePalette,
} from "./types";

export const ZONE_LEN = 46;
const ROAD_HALF = 21; // walkable corridor half-width (POIs live off-road)
const PLATE_RADIUS = 4.9;
const PLATE_COMMIT_S = 0.7;
const GREEK_LETTERS = ["Α", "Β", "Γ", "Δ", "Ε"];

// ---------------------------------------------------------------------------
// deterministic noise (value-noise fBm) for terrain + scattering
// ---------------------------------------------------------------------------

function hash2(ix: number, iz: number): number {
  let h = (ix * 374761393 + iz * 668265263) | 0;
  h = (h ^ (h >> 13)) | 0;
  h = Math.imul(h, 1274126177) | 0;
  return ((h ^ (h >> 16)) >>> 0) / 4294967296;
}
function vnoise(x: number, z: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const sx = fx * fx * (3 - 2 * fx);
  const sz = fz * fz * (3 - 2 * fz);
  const a = hash2(ix, iz);
  const b = hash2(ix + 1, iz);
  const c = hash2(ix, iz + 1);
  const d = hash2(ix + 1, iz + 1);
  return a + (b - a) * sx + (c - a) * sz + (a - b - c + d) * sx * sz;
}
function fbm(x: number, z: number, octaves = 4): number {
  let v = 0;
  let amp = 0.5;
  let f = 1;
  for (let i = 0; i < octaves; i++) {
    v += vnoise(x * f, z * f) * amp;
    f *= 2.03;
    amp *= 0.5;
  }
  return v; // ~0..1
}
function ridge(x: number, z: number): number {
  const n = fbm(x, z, 4);
  return Math.pow(1 - Math.abs(n * 2 - 1), 1.6); // 0..1, sharp crests
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * World height. The road corridor (|x| small) is flattened to 0, as are
 * the arena and gate clearings (fixed local-z positions in every zone);
 * hills rise beside the road and snowy ridges far out.
 */
export function terrainHeight(x: number, z: number): number {
  const ax = Math.abs(x);
  // clearings: arena at local 34, gate at local 44 (see zone layout)
  const local = ((-z % ZONE_LEN) + ZONE_LEN) % ZONE_LEN;
  const dArena = Math.hypot(x, local - 34);
  const dGate = Math.hypot(Math.max(0, ax - 6), local - 44);
  let k = THREE.MathUtils.smoothstep(ax, 4.5, 11);
  k *= THREE.MathUtils.smoothstep(dArena, 9, 15);
  k *= THREE.MathUtils.smoothstep(dGate, 5, 11);
  // off-road clearings for the hermit cave and ruined chapel
  const dCave = Math.hypot(x + 17, local - 20);
  const dChapel = Math.hypot(x - 16, local - 27);
  k *= 0.1 + 0.9 * THREE.MathUtils.smoothstep(dCave, 5, 16);
  k *= 0.1 + 0.9 * THREE.MathUtils.smoothstep(dChapel, 5, 16);
  // legendary waystone clearings (the Second Road)
  const dWest = Math.hypot(x + 27, local - 13);
  const dEast = Math.hypot(x - 27, local - 36);
  k *= 0.08 + 0.92 * THREE.MathUtils.smoothstep(dWest, 5, 17);
  k *= 0.08 + 0.92 * THREE.MathUtils.smoothstep(dEast, 5, 17);
  const roll = fbm(x * 0.022 + 13.7, z * 0.022) * 1.6;
  const hills =
    THREE.MathUtils.smoothstep(ax, 10, 30) *
    (fbm(x * 0.016 + 7.1, z * 0.016) * 14 + 2);
  const mountains =
    THREE.MathUtils.smoothstep(ax, 34, 95) *
    ridge(x * 0.009 + 3.3, z * 0.009) *
    58;
  let h = (roll + hills + mountains) * k;
  // a still lake west of Nicaea (station III)
  const dLake = Math.hypot(x + 42, z + 122);
  h -= 2.6 * (1 - THREE.MathUtils.smoothstep(dLake, 5, 11));
  return h;
}

// ---------------------------------------------------------------------------
// canvas textures
// ---------------------------------------------------------------------------

function makeGlowTexture(inner: string, outer: string): THREE.Texture {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 64;
  const ctx = cv.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeLetterTexture(letter: string): THREE.Texture {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 256;
  const ctx = cv.getContext("2d")!;
  ctx.fillStyle = "#1b1714";
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = "#c9a227";
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, 236, 236);
  ctx.strokeStyle = "#5a4810";
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, 208, 208);
  ctx.fillStyle = "#f0d358";
  ctx.font = "bold 150px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letter, 128, 138);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeBladeTexture(): THREE.Texture {
  const cv = document.createElement("canvas");
  cv.width = 64;
  cv.height = 64;
  const ctx = cv.getContext("2d")!;
  ctx.clearRect(0, 0, 64, 64);
  ctx.fillStyle = "#ffffff";
  for (const [cx, w, h] of [
    [14, 7, 50],
    [32, 8, 62],
    [50, 6, 46],
  ] as const) {
    ctx.beginPath();
    ctx.moveTo(cx - w / 2, 64);
    ctx.quadraticCurveTo(cx - w * 0.2, 64 - h * 0.6, cx, 64 - h);
    ctx.quadraticCurveTo(cx + w * 0.2, 64 - h * 0.6, cx + w / 2, 64);
    ctx.closePath();
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(cv);
  return tex;
}

/** Painted foliage cluster with alpha — the soul of the new trees. */
function makeFoliageTexture(base: string, hi: string, tall = false): THREE.Texture {
  const cv = document.createElement("canvas");
  cv.width = 128;
  cv.height = tall ? 192 : 128;
  const ctx = cv.getContext("2d")!;
  ctx.clearRect(0, 0, cv.width, cv.height);
  const cx = cv.width / 2;
  const cy = cv.height / 2;
  const R = Math.min(cx, cy) - 6;
  for (let i = 0; i < 34; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.pow(Math.random(), 0.6) * R;
    const x = cx + Math.cos(a) * r * (tall ? 0.55 : 1);
    const y = cy + Math.sin(a) * r;
    const s = 8 + Math.random() * 14;
    const edge = r / R;
    ctx.fillStyle = Math.random() > 0.62 - edge * 0.25 ? hi : base;
    ctx.globalAlpha = 0.85 - edge * 0.3;
    ctx.beginPath();
    ctx.ellipse(x, y, s, s * (0.6 + Math.random() * 0.5), a, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Puffy painted cloud with a flat base. */
function makeCloudTexture(): THREE.Texture {
  const cv = document.createElement("canvas");
  cv.width = 256;
  cv.height = 128;
  const ctx = cv.getContext("2d")!;
  ctx.clearRect(0, 0, 256, 128);
  for (let i = 0; i < 22; i++) {
    const x = 40 + Math.random() * 176;
    const y = 74 - Math.pow(Math.random(), 1.6) * 46;
    const r = 14 + Math.random() * 26;
    const g = ctx.createRadialGradient(x, y - r * 0.2, 2, x, y, r);
    g.addColorStop(0, "rgba(255,253,247,0.85)");
    g.addColorStop(0.7, "rgba(244,240,232,0.45)");
    g.addColorStop(1, "rgba(240,236,228,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, Math.min(y, 86), r, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Noise-derived normal map that gives the ground real tooth. */
function makeGroundNormalTexture(): THREE.Texture {
  const N = 256;
  const cv = document.createElement("canvas");
  cv.width = cv.height = N;
  const ctx = cv.getContext("2d")!;
  const h = new Float32Array(N * N);
  for (let oct = 0; oct < 4; oct++) {
    const step = 4 << oct;
    for (let i = 0; i < 700 >> oct; i++) {
      const x = Math.random() * N;
      const y = Math.random() * N;
      const r = step * (0.5 + Math.random());
      const amp = (Math.random() - 0.35) / (oct + 1);
      for (let dy = -r; dy < r; dy++) {
        for (let dx = -r; dx < r; dx++) {
          const d = Math.hypot(dx, dy) / r;
          if (d > 1) continue;
          const px = (((x + dx) % N) + N) % N | 0;
          const py = (((y + dy) % N) + N) % N | 0;
          h[py * N + px] += amp * (1 - d) * 0.5;
        }
      }
    }
  }
  const img = ctx.createImageData(N, N);
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const l = h[y * N + ((x - 1 + N) % N)];
      const r = h[y * N + ((x + 1) % N)];
      const u = h[((y - 1 + N) % N) * N + x];
      const d = h[((y + 1) % N) * N + x];
      const nx = (l - r) * 2.2;
      const ny = (u - d) * 2.2;
      const inv = 1 / Math.hypot(nx, ny, 1);
      const idx = (y * N + x) * 4;
      img.data[idx] = (nx * inv * 0.5 + 0.5) * 255;
      img.data[idx + 1] = (ny * inv * 0.5 + 0.5) * 255;
      img.data[idx + 2] = (1 * inv * 0.5 + 0.5) * 255;
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(46, 9);
  return tex;
}

// ---------------------------------------------------------------------------
// stone props
// ---------------------------------------------------------------------------

function stoneMat(color = "#8d8a82") {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.95, metalness: 0 });
}
function goldMat(emissive = 0.15) {
  return new THREE.MeshStandardMaterial({
    color: "#c9a227",
    roughness: 0.35,
    metalness: 0.85,
    emissive: "#6a5210",
    emissiveIntensity: emissive,
  });
}
function box(
  w: number,
  h: number,
  d: number,
  m: THREE.Material,
  shadow = true
): THREE.Mesh {
  const me = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  me.castShadow = shadow;
  me.receiveShadow = true;
  return me;
}

function buildCross(size: number, m: THREE.Material): THREE.Group {
  const g = new THREE.Group();
  const t = size * 0.1;
  const vert = box(t, size, t, m);
  vert.position.y = size / 2;
  const bar1 = box(size * 0.62, t, t, m);
  bar1.position.y = size * 0.78;
  const bar2 = box(size * 0.4, t, t, m);
  bar2.position.y = size * 0.92;
  const bar3 = box(size * 0.36, t, t, m);
  bar3.position.y = size * 0.55;
  bar3.rotation.z = 0.45;
  g.add(vert, bar1, bar2, bar3);
  return g;
}

/** Round stone watchtower with a slate cap — flanks the Royal Doors. */
function buildTower(rng: () => number): THREE.Group {
  const g = new THREE.Group();
  const h = 6.5 + rng() * 2.5;
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.9, h, 10),
    stoneMat("#8a857a")
  );
  body.castShadow = true;
  body.receiveShadow = true;
  body.position.y = h / 2;
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(2.0, 1.9, 10),
    stoneMat("#4a4e58")
  );
  roof.castShadow = true;
  roof.position.y = h + 0.95;
  const door = box(0.9, 1.5, 0.2, stoneMat("#2c2620"), false);
  door.position.set(0, 0.75, 1.78);
  const cross = buildCross(0.8, goldMat(0.3));
  cross.position.y = h + 1.9;
  g.add(body, roof, door, cross);
  for (let i = 0; i < 3; i++) {
    const win = box(0.28, 0.5, 0.2, stoneMat("#1c1814"), false);
    const a = rng() * Math.PI * 2;
    win.position.set(Math.sin(a) * 1.6, 2 + i * 1.6, Math.cos(a) * 1.6);
    win.rotation.y = a;
    g.add(win);
  }
  return g;
}

type Gate = {
  group: THREE.Group;
  doorL: THREE.Group;
  doorR: THREE.Group;
  barrier: THREE.Mesh;
  frame: THREE.Group;
  towers: THREE.Group[];
  open: boolean;
  z: number;
};

/** The Royal Doors: stone arch + gold doors + flanking watchtowers + velum. */
function buildGate(rng: () => number): Gate {
  const group = new THREE.Group();
  const span = 2.2;
  const ph = 5.2;
  const pw = 1.0;
  const frame = new THREE.Group();
  for (const side of [-1, 1]) {
    const p = box(pw, ph, pw, stoneMat("#938e82"));
    p.position.set(side * (span + pw / 2), ph / 2, 0);
    const cap = box(pw * 1.5, 0.35, pw * 1.5, stoneMat("#7e786c"));
    cap.position.set(side * (span + pw / 2), ph + 0.18, 0);
    frame.add(p, cap);
  }
  const lintel = box(span * 2 + pw * 2 + 0.7, 0.7, pw, stoneMat("#938e82"));
  lintel.position.y = ph + 0.55;
  frame.add(lintel);
  const cross = buildCross(1.0, goldMat(0.35));
  cross.position.y = ph + 0.95;
  frame.add(cross);
  group.add(frame);

  const doorGeo = new THREE.PlaneGeometry(span, 4.4);
  doorGeo.translate(span / 2, 0, 0);
  const doorMat = new THREE.MeshStandardMaterial({
    color: "#c9a227",
    roughness: 0.4,
    metalness: 0.8,
    side: THREE.DoubleSide,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: "#7a5e10",
    roughness: 0.5,
    metalness: 0.6,
    side: THREE.DoubleSide,
  });
  const mkDoor = (side: number) => {
    const d = new THREE.Group();
    const leaf = new THREE.Mesh(doorGeo, doorMat);
    leaf.castShadow = true;
    const trim = new THREE.Mesh(new THREE.PlaneGeometry(span * 0.66, 3.8), trimMat);
    trim.position.set(span / 2, 0, side * 0.015);
    const ikon = buildCross(0.85, stoneMat("#efe6d0"));
    ikon.position.set(span / 2, -0.6, side * 0.04);
    d.add(leaf, trim, ikon);
    d.position.set(side * span, 2.2, 0);
    if (side > 0) d.rotation.y = Math.PI;
    return d;
  };
  const doorL = mkDoor(-1);
  const doorR = mkDoor(1);
  group.add(doorL, doorR);

  const barrier = new THREE.Mesh(
    new THREE.PlaneGeometry(span * 2, 4.4),
    new THREE.MeshBasicMaterial({
      color: "#f0d358",
      transparent: true,
      opacity: 0.13,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
  barrier.position.y = 2.2;
  group.add(barrier);

  const towerL = new THREE.Group();
  towerL.add(buildTower(rng));
  towerL.position.set(-(span + pw + 3.4), 0, -0.6);
  const towerR = new THREE.Group();
  towerR.add(buildTower(rng));
  towerR.position.set(span + pw + 3.4, 0, -0.6);
  group.add(towerL, towerR);
  // crimson velum slung tower-to-tower (the icon painter's join)
  const velum = new THREE.Mesh(
    new THREE.PlaneGeometry(span * 2 + pw * 2 + 5.6, 1.0, 8, 1),
    new THREE.MeshStandardMaterial({
      color: "#7c1414",
      roughness: 0.9,
      side: THREE.DoubleSide,
    })
  );
  const vp = velum.geometry.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < vp.count; i++) {
    const x = vp.getX(i);
    vp.setY(i, vp.getY(i) - Math.cos((x / (span + pw + 2.8)) * 1.35) * 0.45);
  }
  vp.needsUpdate = true;
  velum.position.y = ph + 2.2;
  group.add(velum);

  return { group, doorL, doorR, barrier, frame, towers: [towerL, towerR], open: false, z: 0 };
}

/** Roadside icon-shrine displaying the chapter's art. */
function buildShrine(tex: THREE.Texture): THREE.Group {
  const g = new THREE.Group();
  const w = 4.4;
  const h = (w * 768) / 1408;
  const frame = box(w + 0.5, h + 0.5, 0.24, goldMat(0.2));
  frame.position.y = 1.5 + h / 2;
  const inner = box(w + 0.22, h + 0.22, 0.26, stoneMat("#5a4810"));
  inner.position.copy(frame.position);
  const art = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ map: tex })
  );
  art.position.set(0, frame.position.y, 0.16);
  const legL = box(0.22, 1.6, 0.22, stoneMat("#6e685c"));
  legL.position.set(-w / 2 + 0.35, 0.8, 0);
  const legR = legL.clone();
  legR.position.x = w / 2 - 0.35;
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(w * 0.62, 0.8, 4),
    stoneMat("#4a4e58")
  );
  roof.castShadow = true;
  roof.rotation.y = Math.PI / 4;
  roof.scale.z = 0.42;
  roof.position.y = frame.position.y + h / 2 + 0.6;
  const finial = buildCross(0.45, goldMat(0.3));
  finial.position.y = roof.position.y + 0.42;
  g.add(frame, inner, art, legL, legR, roof, finial);
  return g;
}

// ---------------------------------------------------------------------------
// aurora shader (final zone)
// ---------------------------------------------------------------------------

const AURORA_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const AURORA_FRAG = `
varying vec2 vUv;
uniform float uTime;
uniform float uOpacity;
void main() {
  float n = sin(vUv.x * 9.0 + uTime * 0.35) * 0.5
          + sin(vUv.x * 23.0 - uTime * 0.7) * 0.22
          + sin(vUv.x * 47.0 + uTime * 1.3) * 0.08;
  float y = vUv.y + n * 0.16;
  float band = smoothstep(0.12, 0.5, y) * (1.0 - smoothstep(0.5, 0.95, y));
  float curtains = 0.6 + 0.4 * sin(vUv.x * 60.0 + uTime * 0.9 + n * 6.0);
  vec3 col = mix(vec3(0.15, 0.95, 0.55), vec3(0.45, 0.25, 0.9),
                 0.5 + 0.5 * sin(vUv.x * 3.0 + uTime * 0.2));
  gl_FragColor = vec4(col * band * curtains, band * 0.5 * uOpacity);
}
`;

// ---------------------------------------------------------------------------
// engine
// ---------------------------------------------------------------------------

type Lamp = {
  zoneIdx: number;
  lampIdx: number;
  pos: THREE.Vector3;
  flame: THREE.Sprite;
  glow: THREE.Sprite;
  collected: boolean;
  phase: number;
};

type Plate = {
  group: THREE.Group;
  baseY: number;
  pos: THREE.Vector3;
  pedestalMat: THREE.MeshStandardMaterial;
  faceMat: THREE.MeshStandardMaterial;
  state: PlateState;
};

type Effect = (dt: number) => boolean;

export type EngineOptions = {
  basePath: string;
  hair: string;
  hairHex?: string;
  beaten: Set<string>;
  laurels: Set<string>;
  checkpoint: number;
  hooks: EngineHooks;
};

export class PilgrimEngine {
  private canvas: HTMLCanvasElement;
  private zones: ZoneDef[];
  private opts: EngineOptions;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private raf = 0;
  private clock = new THREE.Clock();
  private disposed = false;

  // input
  private keys = new Set<string>();
  private joy = new THREE.Vector2(0, 0);
  private dragging = false;
  private lastPointer = new THREE.Vector2();
  private pointers = new Map<number, THREE.Vector2>();
  private pinchDist = 0;
  private tapStart = new THREE.Vector2();
  private tapTime = 0;

  // camera rig — yaw 0 puts the camera on +Z behind the player, looking -Z
  private camYaw = 0;
  private camPitch = 0.24;
  private camDist = 7.2;
  private shake = 0;

  // lighting / environment
  private sky!: Sky;
  private sun!: THREE.DirectionalLight;
  private sunTarget = new THREE.Object3D();
  private hemi!: THREE.HemisphereLight;
  private fog!: THREE.Fog;
  private lantern!: THREE.PointLight;
  private rim!: THREE.DirectionalLight;
  private composer: EffectComposer | null = null;
  private bloom: UnrealBloomPass | null = null;
  private auroraMat: THREE.ShaderMaterial | null = null;
  private env = {
    elevation: 14,
    azimuth: 205,
    sunIntensity: 2.7,
    sunColor: new THREE.Color("#ffd9a0"),
    hemiSky: new THREE.Color("#ffd2a0"),
    hemiGround: new THREE.Color("#8a6a4a"),
    hemiIntensity: 0.8,
    fogColor: new THREE.Color("#e8c9a0"),
    fogNear: 55,
    fogFar: 175,
    exposure: 0.95,
    turbidity: 8,
    rayleigh: 2.4,
    gloom: 0,
    snow: 0,
  };
  private envTarget = { ...this.env, sunColor: this.env.sunColor.clone(), hemiSky: this.env.hemiSky.clone(), hemiGround: this.env.hemiGround.clone(), fogColor: this.env.fogColor.clone() };

  // world
  private playerRig!: Rig;
  private playerPos = new THREE.Vector3(0, 0, 2.5);
  private playerYaw = Math.PI; // facing -Z
  private lamps: Lamp[] = [];
  private gates: Gate[] = [];
  private bossRigs: (Rig | null)[] = [];
  private bossAlive: boolean[] = [];
  private allyRigs: (Rig | null)[] = [];
  private allyPos: (THREE.Vector3 | null)[] = [];
  private allyBlessed: boolean[] = [];
  private shrinePos: THREE.Vector3[] = [];
  private bossPos: THREE.Vector3[] = [];
  private arenaCenter: THREE.Vector3[] = [];
  private effects: Effect[] = [];
  private weather!: THREE.Points;
  private weatherMat!: THREE.PointsMaterial;
  private rail!: THREE.Mesh;
  private glowTex!: THREE.Texture;
  private texLoader!: THREE.TextureLoader;
  private pmrem!: THREE.PMREMGenerator;
  private envScene!: THREE.Scene;
  private envSky!: Sky;
  private envRT: THREE.WebGLRenderTarget | null = null;
  private envTimer = 0;
  private curMoveLen = 0;
  private modelIds = new Set<string>();
  private propIds = new Set<string>();
  private propSlots = new Map<
    string,
    { holder: THREE.Group; proc: THREE.Group; glb: THREE.Object3D | null }[]
  >();
  private propLodTick = 0;
  private pendingModels: {
    id: string;
    height: number;
    pos: THREE.Vector3 | null; // null = load immediately (the player)
    started: boolean;
    get: () => Rig | null;
    set: (r: Rig) => void;
  }[] = [];
  private modelTick = 0;

  // live combat (battle mode)
  private aggro = false;
  private atkTimer = 2.2;
  private atkInterval = 4.2;
  private phase2 = false;
  private stagger = 0;
  private smiteDone = false;
  private empowered = false;
  private dashT = 0;
  private dashCd = 0;
  private iframes = 0;
  private dashDir = new THREE.Vector3(0, 0, -1);
  private lastMoveDir = new THREE.Vector3(0, 0, -1);
  private bolts: { pos: THREE.Vector3; vel: THREE.Vector3; life: number; sprite: THREE.Sprite; ghostT: number }[] = [];
  private scorches: { pos: THREE.Vector3; t: number; ring: THREE.Mesh; disc: THREE.Mesh }[] = [];
  private boltTex: THREE.Texture | null = null;
  private wisps: { pos: THREE.Vector3; sprite: THREE.Sprite; phase: number }[] = [];
  private claimSprite: THREE.Sprite | null = null;
  private barkSprite: THREE.Sprite | null = null;
  private darkTarget = 0;
  private darkCur = 0;
  private spotlightOn = false;
  private spotlight: THREE.Sprite | null = null;
  private schism: { a: THREE.Mesh; b: THREE.Mesh } | null = null;
  private crowd: Rig[] = [];
  private companion: Rig | null = null;
  private companionSpeed = 0;
  private bossHome: THREE.Vector3 | null = null;
  private beatenIds: Set<string>;
  private cavePos: (THREE.Vector3 | null)[] = [];
  private chapelPos: (THREE.Vector3 | null)[] = [];
  private plateReadFocus = -1;

  // battle target (works for both station bosses and side duels)
  private bCenter = new THREE.Vector3();
  private bBossPos = new THREE.Vector3();
  private bBossRig: Rig | null = null;
  private bMaxHp = 200;
  private battleDuel = -1;
  private duels: { def: SideDuel; rig: Rig | null; pos: THREE.Vector3; center: THREE.Vector3; alive: boolean }[] = [];

  // state
  private mode: "explore" | "battle" = "explore";
  private battleZone = -1;
  private plates: Plate[] = [];
  private plateFocus = -1;
  private plateTimer = 0;
  private platesLocked = false;
  private curZone = -1;
  private attract = false;
  private attractT = 0;
  private near: NearTarget | null = null;
  private nearTick = 0;
  private time = 0;

  constructor(canvas: HTMLCanvasElement, zones: ZoneDef[], opts: EngineOptions) {
    this.canvas = canvas;
    this.zones = zones;
    this.opts = opts;
    this.beatenIds = new Set(opts.beaten);
  }

  // ---- lifecycle ----------------------------------------------------------

  async start() {
    const { canvas } = this;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.95;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 460);
    // post stack: bloom makes the emissive gold read as LIGHT
    let post = true;
    try {
      if (window.localStorage.getItem("pilgrimage:nopost") === "1") post = false;
    } catch {}
    if (post) {
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.38, 0.45, 0.9);
      this.composer.addPass(this.bloom);
      this.composer.addPass(new OutputPass());
    }
    this.fog = new THREE.Fog("#e8c9a0", 55, 175);
    this.scene.fog = this.fog;
    this.texLoader = new THREE.TextureLoader();
    this.glowTex = makeGlowTexture("rgba(255,224,140,0.9)", "rgba(255,200,80,0)");

    this.buildLights();
    this.buildSkyDome();
    const manifest = await loadModelManifest(this.opts.basePath);
    this.modelIds = manifest.models;
    this.propIds = manifest.props;
    await this.buildWorld();
    this.loadEnvironmentProps();
    if (this.disposed) return;
    this.buildPlayer();
    this.buildCompanion();
    this.buildWeather();
    this.buildClouds();
    this.buildAtmosphere();
    this.buildRail();

    const spawn = Math.min(this.opts.checkpoint, this.zones.length - 1);
    this.playerPos.set(0, 0, -spawn * ZONE_LEN - 3);
    this.applyZonePalette(spawn, true);
    this.curZone = spawn;
    this.tickEnvironment(0.001);
    this.refreshEnvironment();

    this.attachInput();
    // test/debug handle (only when explicitly enabled)
    try {
      if (window.localStorage.getItem("pilgrimage:debug") === "1") {
        (window as unknown as { __pilgrim: object }).__pilgrim = {
          tp: (x: number, z: number) => {
            this.playerPos.set(x, terrainHeight(x, z), z);
          },
          pos: () => ({ x: this.playerPos.x, y: this.playerPos.y, z: this.playerPos.z }),
          state: () => ({
            zone: this.curZone,
            mode: this.mode,
            near: this.near,
            cave: this.cavePos[this.curZone]?.toArray() ?? null,
            chapel: this.chapelPos[this.curZone]?.toArray() ?? null,
            caveLen: this.cavePos.length,
          }),
        };
      }
    } catch {}
    this.resize();
    window.addEventListener("resize", this.resize);
    this.clock.start();
    const loop = () => {
      if (this.disposed) return;
      this.raf = requestAnimationFrame(loop);
      // long frames are split into fixed substeps inside update(); cap only
      // genuine hitches (tab switches etc.)
      this.update(Math.min(this.clock.getDelta(), 0.35));
    };
    loop();
    this.opts.hooks.onReady?.();
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.resize);
    this.detachInput();
    this.scene?.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat?.dispose();
    });
    this.composer?.dispose();
    this.envRT?.dispose();
    this.pmrem?.dispose();
    this.renderer?.dispose();
  }

  private resize = () => {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.composer?.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  };

  // ---- environment ----------------------------------------------------------

  private buildLights() {
    this.sun = new THREE.DirectionalLight("#ffd9a0", 2.7);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    const sc = this.sun.shadow.camera;
    sc.left = -30;
    sc.right = 30;
    sc.top = 30;
    sc.bottom = -30;
    sc.near = 10;
    sc.far = 200;
    this.sun.shadow.bias = -0.0004;
    this.sun.shadow.normalBias = 0.5;
    this.scene.add(this.sun);
    this.scene.add(this.sunTarget);
    this.sun.target = this.sunTarget;

    this.hemi = new THREE.HemisphereLight("#ffd2a0", "#8a6a4a", 0.8);
    this.scene.add(this.hemi);

    // the pilgrim's lantern — only burns in gloomy zones
    this.lantern = new THREE.PointLight("#ffc878", 0, 14, 1.8);
    this.scene.add(this.lantern);

    // cool rim/back light lifts figures off the background
    this.rim = new THREE.DirectionalLight("#bcd2ff", 0.55);
    this.scene.add(this.rim);
    this.scene.add(this.rim.target);
  }

  private buildSkyDome() {
    this.sky = new Sky();
    this.sky.scale.setScalar(4000);
    const u = this.sky.material.uniforms;
    u.turbidity.value = 8;
    u.rayleigh.value = 2.4;
    u.mieCoefficient.value = 0.004;
    u.mieDirectionalG.value = 0.85;
    this.scene.add(this.sky);
    // a twin sky in a private scene feeds the PMREM environment map, so
    // gold halos, trim and armor reflect the actual heavens of each era
    this.pmrem = new THREE.PMREMGenerator(this.renderer);
    this.envScene = new THREE.Scene();
    this.envSky = new Sky();
    this.envSky.scale.setScalar(1000);
    this.envScene.add(this.envSky);
  }

  private refreshEnvironment() {
    const src = this.sky.material.uniforms;
    const dst = this.envSky.material.uniforms;
    dst.turbidity.value = src.turbidity.value;
    dst.rayleigh.value = src.rayleigh.value;
    dst.mieCoefficient.value = src.mieCoefficient.value;
    dst.mieDirectionalG.value = src.mieDirectionalG.value;
    (dst.sunPosition.value as THREE.Vector3).copy(src.sunPosition.value as THREE.Vector3);
    const rt = this.pmrem.fromScene(this.envScene, 0, 1, 1100);
    this.envRT?.dispose();
    this.envRT = rt;
    this.scene.environment = rt.texture;
    this.scene.environmentIntensity = 0.55;
  }

  private sunDir(elevation: number, azimuth: number): THREE.Vector3 {
    const phi = THREE.MathUtils.degToRad(90 - elevation);
    const theta = THREE.MathUtils.degToRad(azimuth);
    return new THREE.Vector3().setFromSphericalCoords(1, phi, theta);
  }

  private applyZonePalette(idx: number, immediate = false) {
    const pal = this.zones[Math.max(0, Math.min(idx, this.zones.length - 1))].palette;
    const t = this.envTarget;
    t.elevation = pal.sun.elevation;
    t.azimuth = pal.sun.azimuth;
    t.sunIntensity = pal.sun.intensity;
    t.sunColor.set(pal.sun.color);
    t.hemiSky.set(pal.hemi.sky);
    t.hemiGround.set(pal.hemi.ground);
    t.hemiIntensity = pal.hemi.intensity;
    t.fogColor.set(pal.fog.color);
    t.fogNear = pal.fog.near;
    t.fogFar = pal.fog.far;
    t.exposure = pal.exposure;
    t.turbidity = pal.turbidity;
    t.rayleigh = pal.rayleigh;
    t.gloom = pal.gloom ?? 0;
    t.snow = pal.snowfall ? 1 : 0;
    // a station already won is visibly at peace: warmer, clearer air
    if (this.beatenIds.has(this.zones[Math.max(0, Math.min(idx, this.zones.length - 1))].chapter.id)) {
      t.sunIntensity *= 1.14;
      t.hemiIntensity *= 1.1;
      t.fogFar *= 1.3;
      t.exposure += 0.05;
      t.gloom *= 0.55;
    }
    if (immediate) {
      const e = this.env;
      e.elevation = t.elevation;
      e.azimuth = t.azimuth;
      e.sunIntensity = t.sunIntensity;
      e.sunColor.copy(t.sunColor);
      e.hemiSky.copy(t.hemiSky);
      e.hemiGround.copy(t.hemiGround);
      e.hemiIntensity = t.hemiIntensity;
      e.fogColor.copy(t.fogColor);
      e.fogNear = t.fogNear;
      e.fogFar = t.fogFar;
      e.exposure = t.exposure;
      e.turbidity = t.turbidity;
      e.rayleigh = t.rayleigh;
      e.gloom = t.gloom;
      e.snow = t.snow;
    }
  }

  private tickEnvironment(dt: number) {
    const e = this.env;
    const t = this.envTarget;
    const k = Math.min(1, dt * 1.1);
    e.elevation = THREE.MathUtils.lerp(e.elevation, t.elevation, k);
    e.azimuth = THREE.MathUtils.lerp(e.azimuth, t.azimuth, k);
    e.sunIntensity = THREE.MathUtils.lerp(e.sunIntensity, t.sunIntensity, k);
    e.sunColor.lerp(t.sunColor, k);
    e.hemiSky.lerp(t.hemiSky, k);
    e.hemiGround.lerp(t.hemiGround, k);
    e.hemiIntensity = THREE.MathUtils.lerp(e.hemiIntensity, t.hemiIntensity, k);
    e.fogColor.lerp(t.fogColor, k);
    e.fogNear = THREE.MathUtils.lerp(e.fogNear, t.fogNear, k);
    e.fogFar = THREE.MathUtils.lerp(e.fogFar, t.fogFar, k);
    e.exposure = THREE.MathUtils.lerp(e.exposure, t.exposure, k);
    e.turbidity = THREE.MathUtils.lerp(e.turbidity, t.turbidity, k);
    e.rayleigh = THREE.MathUtils.lerp(e.rayleigh, t.rayleigh, k);
    e.gloom = THREE.MathUtils.lerp(e.gloom, t.gloom, k);
    e.snow = THREE.MathUtils.lerp(e.snow, t.snow, k);

    // battle darkness (Tempter) / interrogation dimming (NKVD)
    this.darkCur = THREE.MathUtils.lerp(this.darkCur, this.darkTarget, Math.min(1, dt * 2.2));
    const dk = this.darkCur;
    // apply
    const dir = this.sunDir(e.elevation, e.azimuth);
    const su = this.sky.material.uniforms;
    su.sunPosition.value.copy(dir);
    su.turbidity.value = e.turbidity;
    su.rayleigh.value = e.rayleigh;
    // keep a usable shadow light even at night (moonlight)
    const lightDir = this.sunDir(Math.max(e.elevation, 9), e.azimuth);
    this.sun.position.copy(this.playerPos).addScaledVector(lightDir, 80);
    this.sunTarget.position.copy(this.playerPos);
    this.sun.intensity = Math.max(0.14, e.sunIntensity * (1 - 0.93 * dk));
    this.sun.color.copy(e.sunColor);
    this.hemi.color.copy(e.hemiSky);
    this.hemi.groundColor.copy(e.hemiGround);
    this.hemi.intensity = e.hemiIntensity * (1 - 0.82 * dk);
    this.fog.color.copy(e.fogColor);
    this.fog.near = THREE.MathUtils.lerp(e.fogNear, 11, dk);
    this.fog.far = THREE.MathUtils.lerp(e.fogFar, 36, dk);
    this.renderer.toneMappingExposure = e.exposure * (1 - 0.3 * dk);
    this.lantern.intensity = Math.max(e.gloom, dk) * 9;
    const rimDir = this.sunDir(24, e.azimuth + 180);
    this.rim.position.copy(this.playerPos).addScaledVector(rimDir, 40);
    this.rim.target.position.copy(this.playerPos);
    this.rim.intensity = 0.55 * (1 - 0.6 * dk);
    if (this.spotlight) {
      this.spotlight.visible = this.spotlightOn;
      if (this.spotlightOn) {
        this.spotlight.position.set(this.playerPos.x, 0.14, this.playerPos.z);
      }
    }
    this.lantern.position.set(
      this.playerPos.x,
      this.playerPos.y + 2.1,
      this.playerPos.z
    );
    if (this.auroraMat) {
      this.auroraMat.uniforms.uTime.value = this.time;
      this.auroraMat.uniforms.uOpacity.value = THREE.MathUtils.clamp(
        (e.gloom - 0.6) * 2.6,
        0,
        1
      );
    }
  }

  // ---- world construction ----------------------------------------------------

  private loadBackdrop(file: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      this.texLoader.load(
        `${this.opts.basePath}/backgrounds/${file}.webp`,
        (t) => {
          t.colorSpace = THREE.SRGBColorSpace;
          resolve(t);
        },
        undefined,
        reject
      );
    });
  }

  /** Blend two zone palettes near the boundary for seamless ground color. */
  private paletteAt(z: number): { grass: THREE.Color; dirt: THREE.Color; rock: THREE.Color; snowLine: number } {
    const f = THREE.MathUtils.clamp(-z / ZONE_LEN, 0, this.zones.length - 1e-4);
    const i = Math.floor(f);
    const frac = f - i;
    const a = this.zones[i].palette;
    const b = this.zones[Math.min(i + 1, this.zones.length - 1)].palette;
    const m = THREE.MathUtils.smoothstep(frac, 0.82, 1);
    const grass = new THREE.Color(a.grass).lerp(new THREE.Color(b.grass), m);
    const dirt = new THREE.Color(a.dirt).lerp(new THREE.Color(b.dirt), m);
    const rock = new THREE.Color(a.rock).lerp(new THREE.Color(b.rock), m);
    const snowLine = THREE.MathUtils.lerp(a.snowLine, b.snowLine, m);
    return { grass, dirt, rock, snowLine };
  }

  private groundTex: THREE.Texture | null = null;
  /** Subtle speckle detail map so the ground reads as earth, not vinyl. */
  private groundDetailTex(): THREE.Texture {
    if (this.groundTex) return this.groundTex;
    const cv = document.createElement("canvas");
    cv.width = cv.height = 256;
    const ctx = cv.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 1400; i++) {
      const g = 190 + Math.floor(Math.random() * 64);
      ctx.fillStyle = `rgba(${g},${g},${g},${0.25 + Math.random() * 0.3})`;
      const w = 1 + Math.random() * 2.5;
      ctx.fillRect(Math.random() * 256, Math.random() * 256, w, w * (0.5 + Math.random()));
    }
    for (let i = 0; i < 90; i++) {
      ctx.strokeStyle = `rgba(170,170,170,${0.12 + Math.random() * 0.12})`;
      ctx.beginPath();
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      ctx.moveTo(x, y);
      ctx.lineTo(x + (Math.random() - 0.5) * 14, y + (Math.random() - 0.5) * 14);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(cv);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(46, 9);
    tex.colorSpace = THREE.SRGBColorSpace;
    this.groundTex = tex;
    return tex;
  }

  private groundNrm: THREE.Texture | null = null;
  private groundNormal(): THREE.Texture {
    if (!this.groundNrm) this.groundNrm = makeGroundNormalTexture();
    return this.groundNrm;
  }

  private buildTerrain() {
    const L = ZONE_LEN;
    const width = 240;
    const segX = 96;
    const segZ = 30;
    const totalLen = this.zones.length * L + 30;
    // chunks of one zone length keep vertex counts comfortable
    for (let ci = -1; ci < this.zones.length + 1; ci++) {
      const z0 = -ci * L + (ci === -1 ? 0 : 0);
      const zStart = -ci * L;
      const geo = new THREE.PlaneGeometry(width, L, segX, segZ);
      geo.rotateX(-Math.PI / 2);
      const pos = geo.getAttribute("position") as THREE.BufferAttribute;
      const colors = new Float32Array(pos.count * 3);
      const c = new THREE.Color();
      for (let i = 0; i < pos.count; i++) {
        const wx = pos.getX(i);
        const wz = pos.getZ(i) + zStart - L / 2;
        const h = terrainHeight(wx, wz);
        pos.setY(i, h);
        pos.setZ(i, wz);
        // color by biome
        const pal = this.paletteAt(wz);
        const slope =
          Math.abs(terrainHeight(wx + 1.4, wz) - h) +
          Math.abs(terrainHeight(wx, wz + 1.4) - h);
        c.copy(pal.grass);
        const roadK = 1 - THREE.MathUtils.smoothstep(Math.abs(wx), 2.6, 5.2);
        c.lerp(pal.dirt, roadK);
        c.lerp(pal.rock, THREE.MathUtils.smoothstep(slope, 1.1, 2.6));
        if (h > pal.snowLine) {
          c.lerp(new THREE.Color("#eef2f8"), THREE.MathUtils.smoothstep(h, pal.snowLine, pal.snowLine + 6));
        }
        const n = fbm(wx * 0.3 + 50, wz * 0.3) - 0.5;
        c.offsetHSL(0, 0, n * 0.045);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geo.computeVertexNormals();
      const mesh = new THREE.Mesh(
        geo,
        new THREE.MeshStandardMaterial({
          vertexColors: true,
          roughness: 1,
          metalness: 0,
          map: this.groundDetailTex(),
          normalMap: this.groundNormal(),
          normalScale: new THREE.Vector2(0.55, 0.55),
        })
      );
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      void z0;
      void totalLen;
    }
  }

  private treeParts(kind: TreeKind): { geo: THREE.BufferGeometry; mat: THREE.Material; offY: number; scaleY?: number }[] {
    switch (kind) {
      case "pine":
        return [
          { geo: new THREE.CylinderGeometry(0.12, 0.2, 1.6, 6), mat: stoneMat("#4a3424"), offY: 0.8 },
          { geo: new THREE.ConeGeometry(1.5, 3.2, 7), mat: stoneMat("#2c4630"), offY: 2.8 },
          { geo: new THREE.ConeGeometry(1.0, 2.2, 7), mat: stoneMat("#33523a"), offY: 4.4 },
        ];
      case "cypress":
        return [
          { geo: new THREE.CylinderGeometry(0.09, 0.14, 0.7, 5), mat: stoneMat("#4a3424"), offY: 0.35 },
          { geo: new THREE.ConeGeometry(0.7, 4.4, 7), mat: stoneMat("#2c4424"), offY: 2.7 },
        ];
      case "olive":
        return [
          { geo: new THREE.CylinderGeometry(0.12, 0.2, 1.3, 5), mat: stoneMat("#5a4430"), offY: 0.65 },
          { geo: new THREE.SphereGeometry(1.1, 8, 6), mat: stoneMat("#55683a"), offY: 1.9 },
          { geo: new THREE.SphereGeometry(0.75, 8, 6), mat: stoneMat("#5f7442"), offY: 2.5 },
        ];
      case "birch":
        return [
          { geo: new THREE.CylinderGeometry(0.09, 0.13, 2.4, 6), mat: stoneMat("#d8d4c8"), offY: 1.2 },
          { geo: new THREE.SphereGeometry(1.05, 8, 6), mat: stoneMat("#6f8c46"), offY: 3.0 },
        ];
      case "palm":
        return [
          { geo: new THREE.CylinderGeometry(0.1, 0.18, 3.0, 6), mat: stoneMat("#6e5638"), offY: 1.5 },
          { geo: new THREE.ConeGeometry(1.6, 0.8, 8), mat: stoneMat("#4a6a2c"), offY: 3.1, scaleY: -1 },
        ];
      case "dead":
        return [
          { geo: new THREE.CylinderGeometry(0.07, 0.18, 2.6, 5), mat: stoneMat("#2c2622"), offY: 1.3 },
          { geo: new THREE.CylinderGeometry(0.04, 0.07, 1.3, 4), mat: stoneMat("#26211e"), offY: 2.5 },
        ];
      default:
        return [];
    }
  }

  private buildVegetation() {
    const L = ZONE_LEN;
    const dummy = new THREE.Object3D();
    this.zones.forEach((zone, zi) => {
      const rng = mulberry32(0x51ed270b ^ (zi * 2654435761));
      const pal = zone.palette;
      const z0 = -zi * L;

      // trees — trunk instances + painted leaf-card canopies
      if (pal.trees !== "none") {
        const count = Math.round(34 * pal.treeDensity);
        const spots: { x: number; z: number; s: number; r: number }[] = [];
        for (let i = 0; i < count; i++) {
          const side = i % 2 === 0 ? -1 : 1;
          const x = side * (10 + rng() * 38);
          const z = z0 - 2 - rng() * (L - 4);
          const local = ((-z % L) + L) % L;
          if (Math.hypot(x + 17, local - 20) < 8 || Math.hypot(x - 16, local - 27) < 8) continue;
          if (Math.hypot(x + 27, local - 13) < 8 || Math.hypot(x - 27, local - 36) < 8) continue;
          spots.push({ x, z, s: 0.7 + rng() * 0.9, r: rng() * Math.PI * 2 });
        }
        this.buildTreesV2(pal.trees, spots, rng);
      }

      // rocks
      const rockCount = 10;
      const rockInst = new THREE.InstancedMesh(
        new THREE.IcosahedronGeometry(1, 0),
        new THREE.MeshStandardMaterial({ color: pal.rock, roughness: 1, flatShading: true }),
        rockCount
      );
      rockInst.castShadow = true;
      rockInst.receiveShadow = true;
      for (let i = 0; i < rockCount; i++) {
        const side = rng() > 0.5 ? -1 : 1;
        const x = side * (7 + rng() * 30);
        const z = z0 - 2 - rng() * (L - 4);
        const s = 0.4 + rng() * 1.4;
        dummy.position.set(x, terrainHeight(x, z) + s * 0.25, z);
        dummy.rotation.set(rng() * 3, rng() * 3, rng() * 3);
        dummy.scale.set(s, s * (0.55 + rng() * 0.5), s);
        dummy.updateMatrix();
        rockInst.setMatrixAt(i, dummy.matrix);
      }
      rockInst.instanceMatrix.needsUpdate = true;
      this.scene.add(rockInst);

      // grass tufts near the road
      const gCount = Math.round(190 * pal.grassDensity);
      if (gCount > 0) {
        const blade = new THREE.PlaneGeometry(0.55, 0.5);
        blade.translate(0, 0.25, 0);
        const gMat = new THREE.MeshStandardMaterial({
          color: pal.grass,
          map: this.bladeTex,
          alphaTest: 0.45,
          side: THREE.DoubleSide,
          roughness: 1,
        });
        const gInst = new THREE.InstancedMesh(blade, gMat, gCount);
        const gc = new THREE.Color();
        for (let i = 0; i < gCount; i++) {
          const side = rng() > 0.5 ? -1 : 1;
          let x = side * (3.2 + rng() * 9);
          let z = z0 - 1 - rng() * (L - 2);
          // keep the arena round and gate clearing bare
          const local = ((-z % L) + L) % L;
          if (Math.hypot(x, local - 34) < 9 || Math.hypot(x, local - 44) < 7) {
            x = side * (10 + rng() * 3);
            z = z0 - 1 - rng() * (L * 0.5);
          }
          dummy.position.set(x, terrainHeight(x, z), z);
          dummy.rotation.set(0, rng() * Math.PI, 0);
          const s = 0.7 + rng() * 0.8;
          dummy.scale.set(s, s, s);
          dummy.updateMatrix();
          gInst.setMatrixAt(i, dummy.matrix);
          gc.set(pal.grass).offsetHSL(0, 0.04, (rng() - 0.5) * 0.1);
          gInst.setColorAt(i, gc);
        }
        gInst.instanceMatrix.needsUpdate = true;
        if (gInst.instanceColor) gInst.instanceColor.needsUpdate = true;
        this.scene.add(gInst);
      }
    });
  }

  private bladeTex!: THREE.Texture;
  private foliage: Record<string, THREE.Texture> = {};
  private foliageTex(kind: string): THREE.Texture {
    if (!this.foliage[kind]) {
      const palette: Record<string, [string, string, boolean]> = {
        pine: ["#24402a", "#3a5c3c", false],
        cypress: ["#243c22", "#39562f", true],
        olive: ["#57683e", "#8a9a6a", false],
        birch: ["#5b7c3c", "#8fae5c", false],
        palm: ["#3c5c26", "#5f8438", true],
      };
      const [a, b, tall] = palette[kind] ?? palette.pine;
      this.foliage[kind] = makeFoliageTexture(a, b, tall);
    }
    return this.foliage[kind];
  }

  /** Trunks as one instanced mesh; canopies as instanced leaf-cards. */
  private buildTreesV2(
    kind: TreeKind,
    spots: { x: number; z: number; s: number; r: number }[],
    rng: () => number
  ) {
    if (!spots.length) return;
    const dummy = new THREE.Object3D();
    const trunkColor = kind === "birch" ? "#d8d4c8" : kind === "dead" ? "#2c2622" : "#4a3424";
    const trunkH = kind === "palm" ? 3.4 : kind === "cypress" ? 1.0 : 2.4;
    const trunkInst = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.09, 0.17, trunkH, 6),
      stoneMat(trunkColor),
      spots.length
    );
    trunkInst.castShadow = true;
    spots.forEach((sp, i) => {
      const y = terrainHeight(sp.x, sp.z);
      dummy.position.set(sp.x, y + (trunkH / 2) * sp.s, sp.z);
      dummy.rotation.set(0, sp.r, (rng() - 0.5) * 0.12);
      dummy.scale.setScalar(sp.s);
      dummy.updateMatrix();
      trunkInst.setMatrixAt(i, dummy.matrix);
    });
    trunkInst.instanceMatrix.needsUpdate = true;
    this.scene.add(trunkInst);
    if (kind === "dead") {
      // bare branches only
      const br = new THREE.InstancedMesh(
        new THREE.CylinderGeometry(0.03, 0.06, 1.2, 4),
        stoneMat("#26211e"),
        spots.length * 3
      );
      br.castShadow = true;
      let k = 0;
      for (const sp of spots) {
        const y = terrainHeight(sp.x, sp.z);
        for (let b = 0; b < 3; b++) {
          dummy.position.set(sp.x + (rng() - 0.5) * 0.5, y + (1.5 + rng() * 0.8) * sp.s, sp.z + (rng() - 0.5) * 0.5);
          dummy.rotation.set((rng() - 0.5) * 1.4, rng() * Math.PI, 0.7 + rng() * 0.7);
          dummy.scale.setScalar(sp.s);
          dummy.updateMatrix();
          br.setMatrixAt(k++, dummy.matrix);
        }
      }
      br.instanceMatrix.needsUpdate = true;
      this.scene.add(br);
      return;
    }
    // canopy cards
    const perTree = kind === "pine" ? 5 : kind === "cypress" ? 4 : kind === "palm" ? 6 : 6;
    const cardGeo = new THREE.PlaneGeometry(1, 1);
    const cardMat = new THREE.MeshStandardMaterial({
      map: this.foliageTex(kind),
      alphaTest: 0.42,
      side: THREE.DoubleSide,
      roughness: 1,
    });
    const cards = new THREE.InstancedMesh(cardGeo, cardMat, spots.length * perTree);
    cards.castShadow = true;
    const col = new THREE.Color();
    let ci = 0;
    for (const sp of spots) {
      const y = terrainHeight(sp.x, sp.z);
      for (let c = 0; c < perTree; c++) {
        let px = 0, py = 0, pz = 0, sx = 1, sy = 1, rx = 0, rz = 0;
        const ry = rng() * Math.PI * 2;
        if (kind === "pine") {
          const t = c / (perTree - 1);
          py = (1.5 + t * 2.4) * sp.s;
          sx = (2.6 - t * 1.7) * sp.s;
          sy = 1.1 * sp.s;
          rx = -Math.PI / 2 + (rng() - 0.5) * 0.35;
        } else if (kind === "cypress") {
          py = (1.6 + rng() * 0.6) * sp.s;
          sx = 1.15 * sp.s;
          sy = (3.2 + rng() * 0.8) * sp.s;
        } else if (kind === "palm") {
          py = trunkH * sp.s;
          px = Math.cos(ry) * 0.9 * sp.s;
          pz = Math.sin(ry) * 0.9 * sp.s;
          sx = 2.4 * sp.s;
          sy = 0.9 * sp.s;
          rz = -0.5;
        } else {
          const a = rng() * Math.PI * 2;
          const rr = rng() * 0.7 * sp.s;
          px = Math.cos(a) * rr;
          pz = Math.sin(a) * rr;
          py = (2.3 + (rng() - 0.5) * 0.9) * sp.s;
          sx = (1.8 + rng() * 0.8) * sp.s;
          sy = (1.5 + rng() * 0.6) * sp.s;
        }
        dummy.position.set(sp.x + px, y + py, sp.z + pz);
        dummy.rotation.set(rx, ry, rz);
        dummy.scale.set(sx, sy, 1);
        dummy.updateMatrix();
        cards.setMatrixAt(ci, dummy.matrix);
        col.setHSL(0, 0, 1).offsetHSL(0, 0, (rng() - 0.5) * 0.16);
        cards.setColorAt(ci, col);
        ci++;
      }
    }
    cards.instanceMatrix.needsUpdate = true;
    if (cards.instanceColor) cards.instanceColor.needsUpdate = true;
    this.scene.add(cards);
  }

  private async buildWorld() {
    const L = ZONE_LEN;
    const beaten = this.opts.beaten;
    this.bladeTex = makeBladeTexture();

    const backTex = await Promise.all(
      this.zones.map((z) => this.loadBackdrop(z.chapter.background))
    );
    if (this.disposed) return;

    this.buildTerrain();
    this.buildVegetation();

    this.zones.forEach((zone, i) => {
      const rng = mulberry32(0x9e3779b9 ^ (i * 2654435761));
      const z0 = -i * L;
      const pal = zone.palette;

      // -- arena: a worn stone round where the trial is held
      const arenaC = new THREE.Vector3(0, 0, z0 - L + 12);
      this.arenaCenter.push(arenaC);
      const disc = new THREE.Mesh(
        new THREE.CircleGeometry(7.6, 40),
        new THREE.MeshStandardMaterial({ color: "#8d8678", roughness: 1 })
      );
      disc.rotation.x = -Math.PI / 2;
      disc.position.set(arenaC.x, 0.03, arenaC.z);
      disc.receiveShadow = true;
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(7.1, 7.6, 48),
        goldMat(0.25)
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(arenaC.x, 0.045, arenaC.z);
      this.scene.add(disc, ring);
      for (const sx of [-6.1, 6.1]) {
        const statue = this.propSlot("prop-statue", new THREE.Group());
        const sz = arenaC.z - 2.4;
        statue.position.set(sx, Math.max(0, terrainHeight(sx, sz)), sz);
        statue.rotation.y = sx > 0 ? -Math.PI / 2.4 : Math.PI / 2.4;
        this.scene.add(statue);
      }

      // -- braziers along the road
      const lampN = pal.gloom && pal.gloom > 0.6 ? 5 : 4;
      for (let li = 0; li < lampN; li++) {
        const lx = (li % 2 === 0 ? -1 : 1) * (2.2 + rng() * 2.6);
        const lz = z0 - 4 - (li + 0.5) * ((L - 16) / lampN);
        this.addLamp(i, li, new THREE.Vector3(lx, 0, lz), pal);
      }

      // -- the chapter's icon-shrine beside the arena
      const shrine = buildShrine(backTex[i]);
      const sx = 6.6;
      const sz = arenaC.z + 2.6;
      shrine.position.set(sx, Math.max(0, terrainHeight(sx, sz)), sz);
      shrine.rotation.y = -0.5;
      this.scene.add(shrine);
      this.shrinePos.push(new THREE.Vector3(sx, 0, sz));

      // -- ally saint on the road
      if (zone.allyId && PORTRAITS[zone.allyId]) {
        const rig = buildRig(PORTRAITS[zone.allyId], { height: 1.98, seed: i * 7919 + 11 });
        rig.group.position.set(-3.9, 0, z0 - L * 0.42);
        rig.group.rotation.y = Math.PI * 0.35;
        this.scene.add(rig.group);
        this.allyRigs.push(rig);
        this.allyPos.push(rig.group.position.clone());
        this.maybeUpgradeRig(
          zone.allyId,
          1.98,
          rig.group.position.clone(),
          () => this.allyRigs[i],
          (r) => {
            this.allyRigs[i] = r;
          }
        );
      } else {
        this.allyRigs.push(null);
        this.allyPos.push(null);
      }
      this.allyBlessed.push(false);

      // -- the adversary, waiting at the arena (or already overcome)
      const isBeaten = beaten.has(zone.chapter.id);
      this.bossAlive.push(!isBeaten);
      const bp = arenaC.clone().add(new THREE.Vector3(0, 0, -3.2));
      this.bossPos.push(bp);
      if (!isBeaten) {
        const tall = zone.chapter.boss!.sprite === "doubt" ? 2.4 : 2.05;
        const rig = buildRig(PORTRAITS[zone.bossId], { height: tall, seed: i * 104729 + 3 });
        rig.group.position.copy(bp);
        rig.group.rotation.y = 0; // faces +Z, toward the approaching pilgrim
        this.scene.add(rig.group);
        this.bossRigs.push(rig);
        this.maybeUpgradeRig(
          zone.bossId,
          tall,
          bp.clone(),
          () => this.bossRigs[i],
          (r) => {
            this.bossRigs[i] = r;
          }
        );
      } else {
        this.bossRigs.push(null);
        this.addMemorial(arenaC);
      }

      // -- the Royal Doors at the zone's far edge
      const gate = buildGate(rng);
      gate.z = z0 - L + 2.0;
      gate.group.position.set(0, 0, gate.z);
      this.scene.add(gate.group);
      this.propSlot("prop-gate-arch", gate.frame);
      for (const t of gate.towers) this.propSlot("prop-tower", t);
      if (isBeaten) this.setGateOpen(gate, true);
      this.gates.push(gate);

      // -- waymarker obelisk at the boundary
      const marker = new THREE.Group();
      const ob = box(0.5, 2.2, 0.5, stoneMat("#7e786c"));
      ob.position.y = 1.1;
      const obCap = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.5, 4), stoneMat("#6a645a"));
      obCap.position.y = 2.45;
      obCap.castShadow = true;
      const bandM = box(0.54, 0.18, 0.54, goldMat(0.2), false);
      bandM.position.y = 1.7;
      marker.add(ob, obCap, bandM);
      this.propSlot("prop-obelisk", marker);
      const mx = -5.6;
      marker.position.set(mx, Math.max(0, terrainHeight(mx, z0 - L + 0.5)), z0 - L + 0.5);
      this.scene.add(marker);

      // -- hermit cave / ruined chapel (off-road discoveries)
      if (CAVE_ZONES.includes(i)) {
        const cx = -17;
        const cz = z0 - 20;
        const cy = Math.max(0, terrainHeight(cx, cz));
        const cave = new THREE.Group();
        for (let r = 0; r < 5; r++) {
          const rock = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.6 + rng() * 1.4, 0),
            new THREE.MeshStandardMaterial({ color: "#6e685c", roughness: 1, flatShading: true })
          );
          rock.castShadow = true;
          rock.receiveShadow = true;
          const a = (r / 5) * Math.PI - Math.PI / 2;
          rock.position.set(Math.cos(a) * 2.2, 0.8 + rng() * 1.2, Math.sin(a) * 1.6 - 0.6);
          rock.rotation.set(rng() * 3, rng() * 3, rng() * 3);
          cave.add(rock);
        }
        const mouth = new THREE.Mesh(
          new THREE.CircleGeometry(1.05, 20),
          new THREE.MeshBasicMaterial({ color: "#050403" })
        );
        mouth.position.set(0, 1.0, 0.9);
        cave.add(mouth);
        const candle = new THREE.Sprite(
          new THREE.SpriteMaterial({ map: this.glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
        );
        candle.scale.setScalar(0.9);
        candle.position.set(0.8, 0.5, 1.3);
        cave.add(candle);
        cave.position.set(cx, cy, cz);
        this.scene.add(cave);
        this.cavePos.push(new THREE.Vector3(cx, 0, cz));
      } else this.cavePos.push(null);

      if (CHAPEL_ZONES.includes(i)) {
        const px = 16;
        const pz = z0 - 27;
        const py = Math.max(0, terrainHeight(px, pz));
        const ch = new THREE.Group();
        const wallM = stoneMat("#8d887c");
        const back = box(4.6, 2.6, 0.35, wallM);
        back.position.set(0, 1.3, -2.1);
        const sideL = box(0.35, 2.2, 3.6, wallM);
        sideL.position.set(-2.2, 1.1, -0.4);
        const sideR = box(0.35, 1.4, 2.6, wallM);
        sideR.position.set(2.2, 0.7, -0.8);
        const fallen = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 3.2, 10), wallM);
        fallen.castShadow = true;
        fallen.rotation.z = Math.PI / 2;
        fallen.rotation.y = 0.4;
        fallen.position.set(0.8, 0.42, 1.6);
        const altar = box(1.2, 0.8, 0.7, stoneMat("#a09a8c"));
        altar.position.set(0, 0.4, -1.4);
        const cross = buildCross(0.7, goldMat(0.35));
        cross.position.set(0, 0.8, -1.4);
        ch.add(back, sideL, sideR, fallen, altar, cross);
        for (const [gx, gz] of [[-0.7, -1.1], [0.7, -1.1]]) {
          const g = new THREE.Sprite(
            new THREE.SpriteMaterial({ map: this.glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
          );
          g.scale.setScalar(0.7);
          g.position.set(gx, 1.0, gz);
          ch.add(g);
        }
        ch.position.set(px, py, pz);
        ch.rotation.y = -0.4;
        this.scene.add(ch);
        this.chapelPos.push(new THREE.Vector3(px, 0, pz));
      } else this.chapelPos.push(null);

      // -- crimson banners announcing the arena
      for (const side of [-1, 1]) {
        const b = new THREE.Group();
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 4.4, 6), stoneMat("#4a3a28"));
        pole.castShadow = true;
        pole.position.y = 2.2;
        const cloth = box(1.12, 2.1, 0.04, new THREE.MeshStandardMaterial({ color: "#7c1414", roughness: 0.9 }));
        cloth.position.set(0, 3.1, 0.1);
        const emblem = buildCross(0.5, goldMat(0.3));
        emblem.position.set(0, 2.7, 0.16);
        b.add(pole, cloth, emblem);
        const bx = side * 5.4;
        const bz = z0 - L + 19;
        b.position.set(bx, Math.max(0, terrainHeight(bx, bz)), bz);
        this.scene.add(b);
      }

      // -- flagstones worn into the road
      for (let f = 0; f < 8; f++) {
        const fs = new THREE.Mesh(
          new THREE.CylinderGeometry(0.55 + rng() * 0.45, 0.55 + rng() * 0.45, 0.05, 7),
          stoneMat(rng() > 0.5 ? "#9a9284" : "#8a8274")
        );
        fs.receiveShadow = true;
        fs.position.set((f % 2 === 0 ? -1 : 1) * (0.8 + rng() * 1.2), 0.025, z0 - 3 - f * ((L - 12) / 8));
        fs.rotation.y = rng() * Math.PI;
        this.scene.add(fs);
      }

      // -- ruined columns off the road
      for (let rcol = 0; rcol < 2; rcol++) {
        const side = rcol === 0 ? -1 : 1;
        const rx = side * (11 + rng() * 4);
        const rz = z0 - 6 - rng() * (L - 16);
        const ry = Math.max(0, terrainHeight(rx, rz));
        const stump = new THREE.Mesh(
          new THREE.CylinderGeometry(0.5, 0.55, 1 + rng() * 1.6, 10),
          stoneMat("#98917f")
        );
        stump.castShadow = true;
        stump.receiveShadow = true;
        const sh = (stump.geometry as THREE.CylinderGeometry).parameters.height;
        const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 2.2, 10), stoneMat("#8f887a"));
        seg.castShadow = true;
        seg.rotation.z = Math.PI / 2;
        seg.rotation.y = rng() * Math.PI;
        seg.position.set(1.3, 0.45, 0.8);
        stump.position.set(0, sh / 2, 0);
        const ruinG = new THREE.Group();
        ruinG.add(stump, seg);
        ruinG.position.set(rx, ry, rz);
        this.scene.add(ruinG);
        this.propSlot("prop-column", ruinG);
      }

      // -- era set dressing slots (filled by generated props when present)
      if (i === 8) {
        for (const sx of [-9.5, 9.5]) {
          const slot = new THREE.Group();
          slot.position.set(sx, Math.max(0, terrainHeight(sx, arenaC.z + 7)), arenaC.z + 7);
          slot.rotation.y = sx > 0 ? -Math.PI / 3 : Math.PI / 3;
          this.scene.add(slot);
          this.propSlot("prop-searchlight", slot);
        }
      }
      if (i === 12) {
        for (let sh2 = 0; sh2 < 6; sh2++) {
          const a = (sh2 / 6) * Math.PI * 2;
          const slot = new THREE.Group();
          slot.position.set(
            arenaC.x + Math.cos(a) * 11,
            1.6 + (sh2 % 3) * 1.4,
            arenaC.z + Math.sin(a) * 11
          );
          slot.rotation.set(rng() * 0.6 - 0.3, rng() * Math.PI * 2, rng() * 0.6 - 0.3);
          this.scene.add(slot);
          this.propSlot("prop-void-shard", slot);
        }
      }

      // -- stars over the dark zones
      if (pal.stars) {
        const starN = pal.gloom === 1 ? 320 : 110;
        const posArr = new Float32Array(starN * 3);
        for (let s = 0; s < starN; s++) {
          posArr[s * 3] = (rng() - 0.5) * 220;
          posArr[s * 3 + 1] = 14 + rng() * 110;
          posArr[s * 3 + 2] = z0 - rng() * L;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
        const stars = new THREE.Points(
          geo,
          new THREE.PointsMaterial({
            color: "#fff6d8",
            size: 0.3,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.9,
            fog: false,
          })
        );
        this.scene.add(stars);
      }

      // -- aurora over the last waste
      if (pal.aurora) {
        this.auroraMat = new THREE.ShaderMaterial({
          vertexShader: AURORA_VERT,
          fragmentShader: AURORA_FRAG,
          uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 } },
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
        });
        const aur = new THREE.Mesh(new THREE.PlaneGeometry(360, 80, 1, 1), this.auroraMat);
        aur.position.set(0, 70, z0 - L * 0.7);
        aur.rotation.x = 0.35;
        aur.frustumCulled = false;
        this.scene.add(aur);
      }
    });

    // -- the Second Road: legendary duels at off-road waystones
    for (const def of buildSideDuels()) {
      const slot = DUEL_SLOTS[def.slot];
      const z0d = -def.zone * L;
      const cx = slot.x;
      const cz = z0d - slot.local;
      const center = new THREE.Vector3(cx, 0, cz);
      const alive = !this.opts.laurels.has(def.chapter.id);
      // waystone ring
      const disc = new THREE.Mesh(
        new THREE.CircleGeometry(4.6, 28),
        new THREE.MeshStandardMaterial({ color: "#7e7668", roughness: 1 })
      );
      disc.rotation.x = -Math.PI / 2;
      disc.position.set(cx, 0.03, cz);
      disc.receiveShadow = true;
      const ring = new THREE.Mesh(new THREE.RingGeometry(4.2, 4.6, 36), goldMat(0.2));
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(cx, 0.045, cz);
      const bannerPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.08, 4.2, 6),
        stoneMat("#4a3a28")
      );
      bannerPole.position.set(cx + 3.6, 2.1, cz + 3.4);
      const bannerCloth = box(1.05, 1.9, 0.04, new THREE.MeshStandardMaterial({ color: alive ? "#3a1f4d" : "#c9a227", roughness: 0.9 }));
      bannerCloth.position.set(cx + 3.6, 2.95, cz + 3.5);
      this.scene.add(disc, ring, bannerPole, bannerCloth);
      let rig: Rig | null = null;
      const pos = center.clone().add(new THREE.Vector3(0, 0, -2.4));
      if (alive) {
        rig = buildRig(PORTRAITS[def.chapter.boss!.sprite], {
          height: 2.0,
          seed: 0x51de + def.idx * 131,
        });
        rig.group.position.copy(pos);
        this.scene.add(rig.group);
        const di = this.duels.length; // index this duel will occupy
        this.maybeUpgradeRig(
          def.chapter.boss!.sprite,
          2.0,
          pos.clone(),
          () => this.duels[di]?.rig ?? null,
          (r) => {
            if (this.duels[di]) this.duels[di].rig = r;
          }
        );
      } else {
        const wreath = buildCross(1.2, goldMat(0.4));
        wreath.position.copy(pos);
        this.scene.add(wreath);
      }
      this.duels.push({ def, rig, pos, center, alive });
    }

    // a low plinth at the very start of the road
    const plinth = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 3, 0.35, 24),
      stoneMat("#9a948a")
    );
    plinth.position.set(0, 0.17, 4.5);
    plinth.receiveShadow = true;
    const startCross = buildCross(1.5, goldMat(0.3));
    startCross.position.set(0, 0.35, 4.5);
    this.scene.add(plinth, startCross);
  }

  private addLamp(zoneIdx: number, lampIdx: number, pos: THREE.Vector3, pal: ZonePalette) {
    const y0 = Math.max(0, terrainHeight(pos.x, pos.z));
    const holder = new THREE.Group();
    holder.position.set(pos.x, y0, pos.z);
    this.scene.add(holder);
    const stand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.11, 1.1, 6),
      stoneMat("#4e4a42")
    );
    stand.castShadow = true;
    stand.position.set(0, 0.55, 0);
    const cup = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.12, 0.18, 8),
      goldMat(0.25)
    );
    cup.position.set(0, 1.16, 0);
    holder.add(stand, cup);
    this.propSlot("prop-brazier", holder);
    const flame = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.glowTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    flame.scale.setScalar(0.6);
    flame.position.set(pos.x, y0 + 1.4, pos.z);
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.glowTex,
        transparent: true,
        opacity: 0.2 + (pal.gloom ?? 0) * 0.35,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    glow.scale.setScalar(2.8);
    glow.position.copy(flame.position);
    this.scene.add(flame, glow);
    this.lamps.push({
      zoneIdx,
      lampIdx,
      pos: pos.clone(),
      flame,
      glow,
      collected: false,
      phase: Math.random() * Math.PI * 2,
    });
  }

  private addMemorial(arenaC: THREE.Vector3) {
    const cross = buildCross(1.6, goldMat(0.4));
    cross.position.set(arenaC.x, 0, arenaC.z - 3.2);
    const flame = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.glowTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    flame.scale.setScalar(0.9);
    flame.position.set(arenaC.x, 0.7, arenaC.z - 2.6);
    this.scene.add(cross, flame);
  }

  /**
   * Register a fully-assembled placement that a generated scenery GLB may
   * replace. Existing children are swept into a toggleable "procedural"
   * group so the LOD tick can swap between them and the detailed mesh.
   */
  private propSlot(kind: string, container: THREE.Group): THREE.Group {
    if (!this.propSlots.has(kind)) this.propSlots.set(kind, []);
    const proc = new THREE.Group();
    while (container.children.length) proc.add(container.children[0]);
    container.add(proc);
    this.propSlots.get(kind)!.push({ holder: container, proc, glb: null });
    return container;
  }

  /**
   * Load generated scenery and attach a hidden clone per placement; the
   * per-frame LOD tick shows the detailed mesh only near the player
   * (dozens of 10k-poly clones resident at once would sink weak GPUs).
   */
  private loadEnvironmentProps() {
    try {
      if (window.localStorage.getItem("pilgrimage:noprops") === "1") return;
    } catch {}
    const HEIGHTS: Record<string, number> = {
      "prop-gate-arch": 7.6,
      "prop-tower": 8.6,
      "prop-brazier": 1.45,
      "prop-obelisk": 2.7,
      "prop-statue": 3.4,
      "prop-column": 2.0,
      "prop-searchlight": 7.5,
      "prop-void-shard": 2.6,
    };
    for (const [kind, slots] of this.propSlots) {
      if (!this.propIds.has(kind)) continue;
      loadPropScene(this.opts.basePath, kind, HEIGHTS[kind] ?? 3).then((scene) => {
        if (!scene || this.disposed) return;
        for (const slot of slots) {
          const clone = scene.clone();
          clone.visible = false;
          slot.holder.add(clone);
          slot.glb = clone;
        }
      });
    }
  }

  private tickPropLod(dt: number) {
    this.propLodTick += dt;
    if (this.propLodTick < 0.5) return;
    this.propLodTick = 0;
    const range = ZONE_LEN * 1.35;
    const wp = new THREE.Vector3();
    for (const slots of this.propSlots.values()) {
      for (const s of slots) {
        if (!s.glb) continue;
        s.holder.getWorldPosition(wp);
        const near = Math.abs(wp.z - this.playerPos.z) < range;
        s.glb.visible = near;
        s.proc.visible = !near;
      }
    }
  }

  /**
   * If a generated GLB exists for this character (per the manifest), queue
   * it to replace the procedural figure. GLBs are several MB each, so NPC
   * models only download once the pilgrim is near their stretch of road;
   * `pos: null` (the player) loads immediately.
   */
  private maybeUpgradeRig(
    id: string,
    height: number,
    pos: THREE.Vector3 | null,
    get: () => Rig | null,
    set: (r: Rig) => void
  ) {
    if (!this.modelIds.has(id)) return;
    this.pendingModels.push({ id, height, pos, started: false, get, set });
  }

  private startModelLoad(p: (typeof this.pendingModels)[number]) {
    p.started = true;
    loadModelRig(this.opts.basePath, p.id, p.height).then((model) => {
      if (!model) return;
      if (this.disposed) {
        model.dispose();
        return;
      }
      const old = p.get();
      if (!old) {
        // character already removed (e.g. boss defeated) — discard
        model.dispose();
        return;
      }
      model.group.position.copy(old.group.position);
      model.group.rotation.y = old.group.rotation.y;
      this.scene.add(model.group);
      this.scene.remove(old.group);
      old.dispose();
      p.set(model);
    });
  }

  private tickModelLoads(dt: number) {
    if (!this.pendingModels.length) return;
    this.modelTick += dt;
    if (this.modelTick < 0.5) return;
    this.modelTick = 0;
    for (const p of this.pendingModels) {
      if (p.started) continue;
      if (p.pos === null || p.pos.distanceTo(this.playerPos) < ZONE_LEN * 1.6) {
        this.startModelLoad(p);
      }
    }
    this.pendingModels = this.pendingModels.filter((p) => !p.started);
  }

  private buildPlayer() {
    const cfg = playerConfig();
    this.playerRig = buildRig(cfg, { height: 1.72, hairHex: this.opts.hairHex });
    this.scene.add(this.playerRig.group);
    this.maybeUpgradeRig(
      "player",
      1.72,
      null,
      () => this.playerRig,
      (r) => {
        this.playerRig = r;
      }
    );
  }

  private clouds: THREE.Sprite[] = [];
  private sunSprite: THREE.Sprite | null = null;
  private sunGlare: THREE.Sprite | null = null;
  private moonSprite: THREE.Sprite | null = null;
  private fogPatches: THREE.Mesh[] = [];
  private rays: THREE.Mesh[] = [];
  private waterMat: THREE.ShaderMaterial | null = null;
  private buildClouds() {
    const tex = makeCloudTexture();
    const n = 10;
    for (let i = 0; i < n; i++) {
      const s = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.4, depthWrite: false, fog: false })
      );
      s.scale.set(34 + Math.random() * 26, 10 + Math.random() * 6, 1);
      s.position.set(
        (Math.random() - 0.5) * 160,
        52 + Math.random() * 26,
        -Math.random() * this.zones.length * ZONE_LEN
      );
      this.scene.add(s);
      this.clouds.push(s);
    }
  }

  private buildCompanion() {
    // St. Anthony — the corpus' own guide — walks the road with the pilgrim
    const rig = buildRig(PORTRAITS["st-anthony"], { height: 1.86, seed: 0xa17 });
    rig.group.position.set(-1.8, 0, this.playerPos.z + 2.2);
    this.scene.add(rig.group);
    this.companion = rig;
    // he deserves the real model as much as anyone on the road
    if (this.modelIds.has("st-anthony")) {
      loadModelRig(this.opts.basePath, "st-anthony", 1.86).then((model) => {
        if (!model || this.disposed || !this.companion) {
          model?.dispose();
          return;
        }
        model.group.position.copy(this.companion.group.position);
        model.group.rotation.y = this.companion.group.rotation.y;
        this.scene.add(model.group);
        this.scene.remove(this.companion.group);
        this.companion.dispose();
        this.companion = model;
      });
    }
  }

  private tickCompanion(dt: number) {
    const c = this.companion;
    if (!c) return;
    let target: THREE.Vector3;
    if (this.mode === "battle") {
      target = this.bCenter.clone().add(new THREE.Vector3(3.4, 0, 7.6));
    } else {
      const yaw = this.playerYaw;
      const behind = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
      const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
      target = this.playerPos.clone().addScaledVector(behind, 2.0).addScaledVector(right, -1.7);
    }
    target.y = this.mode === "battle" ? 0 : terrainHeight(target.x, target.z);
    const pos = c.group.position;
    const d = pos.distanceTo(target);
    if (d > 0.35) {
      const step = Math.min(d, Math.min(6.6, d * 2.4) * dt);
      const dir = target.clone().sub(pos).normalize();
      pos.addScaledVector(dir, step);
      c.group.rotation.y = Math.atan2(dir.x, dir.z);
      this.companionSpeed = THREE.MathUtils.lerp(this.companionSpeed, Math.min(1, d / 3), dt * 6);
    } else {
      this.companionSpeed = THREE.MathUtils.lerp(this.companionSpeed, 0, dt * 6);
      // idle: face what the pilgrim faces
      const want = this.mode === "battle"
        ? Math.atan2(this.bBossPos.x - pos.x, this.bBossPos.z - pos.z)
        : this.playerYaw;
      let dy = want - c.group.rotation.y;
      while (dy > Math.PI) dy -= Math.PI * 2;
      while (dy < -Math.PI) dy += Math.PI * 2;
      c.group.rotation.y += dy * Math.min(1, dt * 3);
    }
    c.setSpeed(this.companionSpeed);
    c.update(dt, this.time);
  }

  private buildAtmosphere() {
    // sun disc + glare, tracked along the sky each frame
    this.sunSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture("rgba(255,244,214,1)", "rgba(255,214,140,0)"),
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        fog: false,
      })
    );
    this.sunSprite.scale.setScalar(15);
    this.sunSprite.renderOrder = -10;
    this.scene.add(this.sunSprite);
    this.sunGlare = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture("rgba(255,236,190,0.5)", "rgba(255,214,140,0)"),
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        fog: false,
        opacity: 0.3,
      })
    );
    this.sunGlare.scale.setScalar(38);
    this.sunGlare.renderOrder = -10;
    this.scene.add(this.sunGlare);
    this.moonSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture("rgba(226,234,252,0.95)", "rgba(180,200,240,0)"),
        transparent: true,
        depthWrite: false,
        depthTest: false,
        fog: false,
      })
    );
    this.moonSprite.scale.setScalar(14);
    this.moonSprite.renderOrder = -10;
    this.scene.add(this.moonSprite);

    // drifting ground-fog sheets for the gloomy stretches
    const fogTex = makeGlowTexture("rgba(200,196,204,0.32)", "rgba(200,196,204,0)");
    for (let i = 0; i < 8; i++) {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(26, 12),
        new THREE.MeshBasicMaterial({
          map: fogTex,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        })
      );
      m.rotation.x = -Math.PI / 2;
      m.position.y = 0.7 + (i % 3) * 0.5;
      this.scene.add(m);
      this.fogPatches.push(m);
    }

    // god-ray shafts near the gates of the golden stations
    const rayMat = new THREE.MeshBasicMaterial({
      color: "#ffe2a0",
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    this.zones.forEach((zone, i) => {
      if ((zone.palette.gloom ?? 0) > 0.3 || zone.palette.snowfall || zone.palette.stars) return;
      const z0 = -i * ZONE_LEN;
      for (let r = 0; r < 3; r++) {
        const shaft = new THREE.Mesh(new THREE.PlaneGeometry(2.2 + r, 26), rayMat);
        shaft.position.set(-6 + r * 6, 12, z0 - 22 - r * 6);
        shaft.rotation.z = 0.5;
        shaft.rotation.y = 0.4;
        this.scene.add(shaft);
        this.rays.push(shaft);
      }
    });

    // the lake west of Nicaea
    this.waterMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
      fragmentShader: `varying vec2 vUv; uniform float uTime;
        void main(){
          float w = sin(vUv.x*40.0+uTime*0.8)*sin(vUv.y*34.0-uTime*0.6)*0.5+0.5;
          vec3 col = mix(vec3(0.10,0.17,0.20), vec3(0.32,0.44,0.46), w*0.35 + 0.25);
          float edge = smoothstep(0.5, 0.28, distance(vUv, vec2(0.5)));
          gl_FragColor = vec4(col, 0.85*edge);
        }`,
    });
    const water = new THREE.Mesh(new THREE.CircleGeometry(9.5, 40), this.waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.set(-42, -0.55, -122);
    this.scene.add(water);
  }

  private buildWeather() {
    // drifting motes by day, falling snow in the white zones
    const N = 300;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = Math.random() * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    this.weatherMat = new THREE.PointsMaterial({
      map: this.glowTex,
      color: "#ffe28c",
      size: 0.14,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.weather = new THREE.Points(geo, this.weatherMat);
    this.scene.add(this.weather);
  }

  private buildRail() {
    this.rail = new THREE.Mesh(
      new THREE.TorusGeometry(7.6, 0.07, 8, 64),
      goldMat(0.5)
    );
    (this.rail.material as THREE.MeshStandardMaterial).transparent = true;
    (this.rail.material as THREE.MeshStandardMaterial).opacity = 0;
    this.rail.rotation.x = Math.PI / 2;
    this.rail.visible = false;
    this.scene.add(this.rail);
  }

  // ---- input -----------------------------------------------------------------

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.key === " " && !e.repeat) {
      this.dash();
      e.preventDefault();
      return;
    }
    this.keys.add(e.key.toLowerCase());
  };
  private onKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.key.toLowerCase());
  };
  private onPointerDown = (e: PointerEvent) => {
    this.canvas.setPointerCapture(e.pointerId);
    this.pointers.set(e.pointerId, new THREE.Vector2(e.clientX, e.clientY));
    if (this.pointers.size === 1) {
      this.dragging = true;
      this.lastPointer.set(e.clientX, e.clientY);
      this.tapStart.set(e.clientX, e.clientY);
      this.tapTime = performance.now();
    } else if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      this.pinchDist = a.distanceTo(b);
    }
  };
  private onPointerMove = (e: PointerEvent) => {
    const p = this.pointers.get(e.pointerId);
    if (!p) return;
    p.set(e.clientX, e.clientY);
    if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      const d = a.distanceTo(b);
      if (this.pinchDist > 0) {
        this.camDist = THREE.MathUtils.clamp(this.camDist * (this.pinchDist / d), 4, 12);
      }
      this.pinchDist = d;
      return;
    }
    if (!this.dragging) return;
    const dx = e.clientX - this.lastPointer.x;
    const dy = e.clientY - this.lastPointer.y;
    this.lastPointer.set(e.clientX, e.clientY);
    this.camYaw -= dx * 0.0052;
    this.camPitch = THREE.MathUtils.clamp(this.camPitch + dy * 0.004, -0.05, 0.85);
  };
  private onPointerUp = (e: PointerEvent) => {
    this.pointers.delete(e.pointerId);
    if (this.pointers.size < 2) this.pinchDist = 0;
    if (this.pointers.size === 0) this.dragging = false;
    const dt = performance.now() - this.tapTime;
    const moved = this.tapStart.distanceTo(new THREE.Vector2(e.clientX, e.clientY));
    if (dt < 350 && moved < 8 && this.mode === "battle" && !this.platesLocked) {
      const idx = this.raycastPlate(e.clientX, e.clientY);
      if (idx >= 0) this.opts.hooks.onPlateCommit?.(idx);
    }
  };
  private onWheel = (e: WheelEvent) => {
    this.camDist = THREE.MathUtils.clamp(this.camDist + e.deltaY * 0.005, 4, 12);
  };

  private attachInput() {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    this.canvas.addEventListener("pointerdown", this.onPointerDown);
    this.canvas.addEventListener("pointermove", this.onPointerMove);
    this.canvas.addEventListener("pointerup", this.onPointerUp);
    this.canvas.addEventListener("pointercancel", this.onPointerUp);
    this.canvas.addEventListener("wheel", this.onWheel, { passive: true });
  }
  private detachInput() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
    this.canvas.removeEventListener("pointerdown", this.onPointerDown);
    this.canvas.removeEventListener("pointermove", this.onPointerMove);
    this.canvas.removeEventListener("pointerup", this.onPointerUp);
    this.canvas.removeEventListener("pointercancel", this.onPointerUp);
    this.canvas.removeEventListener("wheel", this.onWheel);
  }

  /** Cinematic title mode: camera drifts over the road, input ignored. */
  setAttract(on: boolean) {
    this.attract = on;
    if (!on) {
      this.camYaw = 0;
      this.camPitch = 0.24;
      this.camDist = 7.2;
    }
  }

  /** One-frame capture for photo mode (renders then reads the canvas). */
  snapshot(): string {
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
    return this.renderer.domElement.toDataURL("image/png");
  }

  /** Current road position (for the pilgrim's map). */
  getPlayerZ(): number {
    return this.playerPos.z;
  }

  /** Virtual joystick input from the DOM layer, each axis in [-1, 1]. */
  setJoystick(x: number, y: number) {
    this.joy.set(x, y);
  }

  private raycastPlate(cx: number, cy: number): number {
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((cx - rect.left) / rect.width) * 2 - 1,
      -((cy - rect.top) / rect.height) * 2 + 1
    );
    const ray = new THREE.Raycaster();
    ray.setFromCamera(ndc, this.camera);
    for (let i = 0; i < this.plates.length; i++) {
      if (this.plates[i].state === "dimmed") continue;
      const hits = ray.intersectObject(this.plates[i].group, true);
      if (hits.length) return i;
    }
    return -1;
  }

  // ---- battle staging (called from React) --------------------------------------

  private nearDuel(zi: number, p: THREE.Vector3): number {
    for (const d of this.duels) {
      if (d.def.zone === zi && d.alive && d.pos.distanceTo(p) < 5.2) return d.def.idx;
    }
    return -1;
  }

  /** Name for prompts. */
  getDuel(idx: number): SideDuel | undefined {
    return this.duels[idx]?.def;
  }

  /** Begin a legendary duel at its waystone. */
  enterDuel(idx: number) {
    const d = this.duels[idx];
    if (!d || !d.alive) return;
    this.mode = "battle";
    this.battleZone = d.def.zone;
    this.battleDuel = idx;
    this.clearCombat();
    this.phase2 = false;
    this.bCenter.copy(d.center);
    this.bBossPos = d.pos;
    this.bBossRig = d.rig;
    this.bMaxHp = d.def.chapter.boss?.maxHp ?? 260;
    this.bossHome = null;
    this.playerPos.set(d.center.x, 0, d.center.z + 4.6);
    d.rig?.gesture("menace");
    this.rail.position.set(d.center.x, -0.3, d.center.z);
    this.rail.visible = true;
    const mat = this.rail.material as THREE.MeshStandardMaterial;
    this.effects.push((dt) => {
      this.rail.position.y = Math.min(0.42, this.rail.position.y + dt * 1.4);
      mat.opacity = Math.min(0.9, mat.opacity + dt * 2);
      return this.rail.position.y < 0.42;
    });
  }

  /** A legendary adversary is overcome. */
  duelDefeated(idx: number) {
    const d = this.duels[idx];
    if (!d) return;
    this.clearCombat();
    this.crowdBless();
    this.victoryOrbitT = 2.4;
    this.victoryCenter.copy(d.pos);
    d.alive = false;
    const rig = d.rig;
    if (rig) {
      rig.gesture("die");
      rig.fadeOut(2.2);
      this.burst(d.pos.clone().add(new THREE.Vector3(0, 1.4, 0)), "#ffe28c", 36);
      let t = 0;
      this.effects.push((dt) => {
        t += dt;
        if (t > 2.4) {
          this.scene.remove(rig.group);
          rig.dispose();
          d.rig = null;
          return false;
        }
        return true;
      });
    }
    const wreath = buildCross(1.2, goldMat(0.4));
    wreath.position.copy(d.pos);
    this.scene.add(wreath);
  }

  enterBattle(zoneIdx: number) {
    this.mode = "battle";
    this.battleZone = zoneIdx;
    this.battleDuel = -1;
    this.clearCombat();
    this.phase2 = false;
    const c = this.arenaCenter[zoneIdx];
    this.bCenter.copy(c);
    this.bBossPos = this.bossPos[zoneIdx];
    this.bBossRig = this.bossRigs[zoneIdx];
    this.bMaxHp = this.zones[zoneIdx].chapter.boss?.maxHp ?? 200;
    this.playerPos.set(c.x, 0, c.z + 5.6);
    // the adversary strides forward to meet the pilgrim
    const rig = this.bBossRig;
    if (rig) {
      this.bossHome = this.bBossPos.clone();
      const targetZ = c.z - 1.7;
      rig.setSpeed(0.45);
      this.effects.push((dt) => {
        if (this.battleZone !== zoneIdx || this.bBossRig !== rig) return false;
        const bp = this.bBossPos;
        bp.z = Math.min(bp.z + dt * 1.5, targetZ);
        rig.group.position.copy(bp);
        if (bp.z >= targetZ) {
          rig.setSpeed(0);
          rig.gesture("menace");
          return false;
        }
        return true;
      });
    }
    this.rail.position.set(c.x, -0.3, c.z);
    this.rail.visible = true;
    const mat = this.rail.material as THREE.MeshStandardMaterial;
    this.effects.push((dt) => {
      this.rail.position.y = Math.min(0.42, this.rail.position.y + dt * 1.4);
      mat.opacity = Math.min(0.9, mat.opacity + dt * 2);
      return this.rail.position.y < 0.42;
    });
  }

  exitBattle() {
    // an undefeated adversary returns to his post
    if (this.bBossRig && this.bossHome) {
      this.bBossPos.copy(this.bossHome);
      this.bBossRig.group.position.copy(this.bossHome);
      this.bBossRig.setSpeed(0);
    }
    this.bossHome = null;
    this.battleDuel = -1;
    this.clearCrowd();
    this.clearCombat();
    this.mode = "explore";
    this.battleZone = -1;
    this.clearPlates();
    const mat = this.rail.material as THREE.MeshStandardMaterial;
    this.effects.push((dt) => {
      this.rail.position.y -= dt * 1.4;
      mat.opacity = Math.max(0, mat.opacity - dt * 2);
      if (this.rail.position.y <= -0.3) {
        this.rail.visible = false;
        return false;
      }
      return true;
    });
  }

  // ---- world text ----------------------------------------------------------

  private makeTextSprite(
    text: string,
    o: { w: number; h: number; font: number; maxLines: number; accent: string }
  ): THREE.Sprite {
    const cv = document.createElement("canvas");
    cv.width = o.w;
    cv.height = o.h;
    const ctx = cv.getContext("2d")!;
    ctx.fillStyle = "rgba(14,10,6,0.82)";
    ctx.fillRect(0, 0, o.w, o.h);
    ctx.strokeStyle = o.accent;
    ctx.lineWidth = 6;
    ctx.strokeRect(6, 6, o.w - 12, o.h - 12);
    // wrap
    let font = o.font;
    let lines: string[] = [];
    for (; font >= o.font * 0.7; font -= 6) {
      ctx.font = `${font}px Georgia, serif`;
      lines = [];
      let line = "";
      for (const word of text.split(/\s+/)) {
        const probe = line ? line + " " + word : word;
        if (ctx.measureText(probe).width > o.w - 60 && line) {
          lines.push(line);
          line = word;
        } else line = probe;
      }
      if (line) lines.push(line);
      if (lines.length <= o.maxLines) break;
    }
    if (lines.length > o.maxLines) {
      lines = lines.slice(0, o.maxLines);
      lines[o.maxLines - 1] += " …";
    }
    ctx.font = `${font}px Georgia, serif`;
    ctx.fillStyle = "#f4ecd8";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const lh = font * 1.22;
    const y0 = o.h / 2 - ((lines.length - 1) * lh) / 2;
    lines.forEach((l, i) => ctx.fillText(l, o.w / 2, y0 + i * lh));
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, fog: false })
    );
    sprite.scale.set(o.w / 140, o.h / 140, 1);
    return sprite;
  }

  private killSprite(s: THREE.Sprite | null) {
    if (!s) return;
    this.scene.remove(s);
    s.material.map?.dispose();
    s.material.dispose();
  }

  /** The adversary's claim floats over him as world-text. */
  showClaim(text: string) {
    this.killSprite(this.claimSprite);
    const zi = this.battleZone;
    if (zi < 0) return;
    this.claimSprite = this.makeTextSprite(text, {
      w: 1100,
      h: 300,
      font: 46,
      maxLines: 4,
      accent: "#a02020",
    });
    this.claimSprite.position.copy(this.bBossPos).add(new THREE.Vector3(0, 3.7, 0));
    this.scene.add(this.claimSprite);
  }

  hideClaim() {
    this.killSprite(this.claimSprite);
    this.claimSprite = null;
  }

  /** Short bark above the adversary (taunts, midlines, outros). */
  bossSay(text: string, seconds = 3.4) {
    this.killSprite(this.barkSprite);
    const zi = this.battleZone;
    if (zi < 0) return;
    const s = this.makeTextSprite(text, { w: 900, h: 190, font: 44, maxLines: 2, accent: "#c9a227" });
    s.position.copy(this.bBossPos).add(new THREE.Vector3(0, this.claimSprite ? 5.6 : 3.2, 0));
    this.scene.add(s);
    this.barkSprite = s;
    let t = 0;
    this.effects.push((dt) => {
      t += dt;
      if (t >= seconds) {
        if (this.barkSprite === s) {
          this.killSprite(s);
          this.barkSprite = null;
        }
        return false;
      }
      return true;
    });
  }

  // ---- signature fight staging ----------------------------------------------

  /** Tempter: the arena goes dark; your lantern is the world. 0..1. */
  setBattleDarkness(k: number) {
    this.darkTarget = THREE.MathUtils.clamp(k, 0, 1);
  }

  /** NKVD: a cold spotlight tracks the prisoner. */
  setSpotlight(on: boolean) {
    this.spotlightOn = on;
    if (on && !this.spotlight) {
      this.spotlight = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: makeGlowTexture("rgba(220,230,255,0.55)", "rgba(180,200,255,0)"),
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          fog: false,
        })
      );
      this.spotlight.scale.setScalar(6.5);
      this.scene.add(this.spotlight);
    }
    if (this.spotlight) this.spotlight.visible = on;
  }

  /** Schism: the arena splits; the Spirit rests on one bank per round. */
  setSchismSide(side: -1 | 0 | 1) {
    const zi = this.battleZone;
    if (zi < 0) return;
    if (!this.schism) {
      const mk = (x: number) => {
        const m = new THREE.Mesh(
          new THREE.PlaneGeometry(6.8, 14.6),
          new THREE.MeshBasicMaterial({
            color: "#f0d358",
            transparent: true,
            opacity: 0,
            depthWrite: false,
          })
        );
        m.rotation.x = -Math.PI / 2;
        m.position.set(this.bCenter.x + x, 0.05, this.bCenter.z);
        this.scene.add(m);
        return m;
      };
      this.schism = { a: mk(-3.6), b: mk(3.6) };
    }
    const ma = this.schism.a.material as THREE.MeshBasicMaterial;
    const mb = this.schism.b.material as THREE.MeshBasicMaterial;
    if (side === 0) {
      ma.opacity = 0;
      mb.opacity = 0;
    } else {
      const act = side < 0 ? ma : mb;
      const off = side < 0 ? mb : ma;
      act.color.set("#f0d358");
      act.opacity = 0.16;
      off.color.set("#7c1414");
      off.opacity = 0.1;
    }
  }

  /** Which bank a plate stands on (-1 west / +1 east). */
  getPlateSide(i: number): -1 | 1 {
    const p = this.plates[i];
    if (!p) return 1;
    return p.pos.x - this.bCenter.x < 0 ? -1 : 1;
  }

  /** False claims take shape and hunt the pilgrim until popped. */
  spawnWisp() {
    if (this.wisps.length >= 2 || this.battleZone < 0) return;
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture("rgba(150,80,220,0.95)", "rgba(60,20,110,0)"),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    sprite.scale.setScalar(1.15);
    const c = this.bCenter;
    const a = Math.random() * Math.PI * 2;
    const pos = new THREE.Vector3(c.x + Math.cos(a) * 6, 1.1, c.z + Math.sin(a) * 6);
    sprite.position.copy(pos);
    this.scene.add(sprite);
    this.wisps.push({ pos, sprite, phase: Math.random() * 7 });
  }

  /** Pilgrims gather to watch the witness. */
  setCrowdCount(n: number) {
    if (this.battleZone < 0) return;
    const c = this.bCenter;
    while (this.crowd.length < Math.min(n, 6)) {
      const i = this.crowd.length;
      const rig = buildRig(undefined, {
        height: 1.66 + (i % 3) * 0.05,
        seed: 0xbeef + i * 977,
        hairHex: ["#3a2a1a", "#141414", "#7a5a30", "#9a9a9a", "#5a3a20", "#c8c8c8"][i],
      });
      const a = Math.PI / 2 + (i - 2.5) * 0.28;
      rig.group.position.set(c.x + Math.cos(a) * 9.2, 0, c.z + Math.sin(a) * 9.0);
      rig.group.rotation.y = Math.atan2(c.x - rig.group.position.x, c.z - rig.group.position.z);
      this.scene.add(rig.group);
      this.burst(rig.group.position.clone().add(new THREE.Vector3(0, 1, 0)), "#ffe28c", 8);
      this.crowd.push(rig);
    }
  }

  /** The crowd rejoices. */
  crowdBless() {
    for (const r of this.crowd) r.gesture("bless");
  }

  private clearCrowd() {
    for (const r of this.crowd) {
      this.scene.remove(r.group);
      r.dispose();
    }
    this.crowd = [];
  }

  // ---- live combat -------------------------------------------------------

  /** Boss attacks only while a claim is open (React toggles per round). */
  setBossAggro(on: boolean) {
    this.aggro = on;
    if (on) {
      this.atkInterval = THREE.MathUtils.clamp(5.4 - this.bMaxHp / 160, 2.4, 4.6);
      this.atkTimer = 1.6; // a breath to read before the first volley
    }
  }

  /** Wrong answer: the adversary's next volley is a three-bolt fan. */
  empowerNextVolley() {
    this.empowered = true;
  }

  /** Correct answer: the adversary reels; rushing him grants a smite. */
  staggerBoss(sec = 2.6) {
    this.stagger = sec;
    this.smiteDone = false;
    const rig = this.bBossRig;
    if (rig) {
      let t = 0;
      this.effects.push((dt) => {
        t += dt;
        const k =
          t < 0.25 ? t / 0.25 : Math.max(0, 1 - Math.max(0, t - (sec - 0.4)) / 0.4);
        rig.group.rotation.x = -0.3 * k;
        if (t >= sec) {
          rig.group.rotation.x = 0;
          return false;
        }
        return true;
      });
    }
  }

  /** Dodge-dash with brief invincibility. Space / mobile button. */
  dash() {
    if (this.dashCd > 0 || this.mode !== "battle") return;
    this.dashCd = 1.2;
    this.dashT = 0.18;
    this.iframes = 0.45;
    this.dashDir.copy(this.lastMoveDir);
    this.burst(this.playerPos.clone().add(new THREE.Vector3(0, 0.3, 0)), "#d8cfb4", 10);
  }

  private clearCombat() {
    this.aggro = false;
    this.stagger = 0;
    this.empowered = false;
    this.hideClaim();
    this.killSprite(this.barkSprite);
    this.barkSprite = null;
    this.setBattleDarkness(0);
    this.setSpotlight(false);
    if (this.schism) {
      this.scene.remove(this.schism.a, this.schism.b);
      (this.schism.a.material as THREE.Material).dispose();
      (this.schism.b.material as THREE.Material).dispose();
      this.schism = null;
    }
    for (const w of this.wisps) {
      this.scene.remove(w.sprite);
      w.sprite.material.dispose();
    }
    this.wisps = [];
    for (const b of this.bolts) {
      this.scene.remove(b.sprite);
      b.sprite.material.dispose();
    }
    this.bolts = [];
    for (const s of this.scorches) {
      this.scene.remove(s.ring, s.disc);
      s.ring.geometry.dispose();
      (s.ring.material as THREE.Material).dispose();
      s.disc.geometry.dispose();
      (s.disc.material as THREE.Material).dispose();
    }
    this.scorches = [];
  }

  private launchBolt(from: THREE.Vector3, dir: THREE.Vector3) {
    if (!this.boltTex) this.boltTex = makeGlowTexture("rgba(255,70,40,0.95)", "rgba(120,10,10,0)");
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.boltTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    sprite.scale.setScalar(1.0);
    sprite.position.copy(from);
    this.scene.add(sprite);
    this.bolts.push({ pos: from.clone(), vel: dir.clone().multiplyScalar(9.5), life: 3.2, sprite, ghostT: 0 });
  }

  private bossVolley() {
    const boss = this.bBossRig;
    const bp = this.bBossPos;
    boss?.gesture("cast");
    const target = this.playerPos.clone();
    const fan = this.empowered ? [-0.32, 0, 0.32] : [0];
    this.empowered = false;
    // brief aim-line telegraph, then loose
    const from = bp.clone().add(new THREE.Vector3(0, 1.6, 0));
    const lineMat = new THREE.MeshBasicMaterial({
      color: "#ff5040",
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines: THREE.Mesh[] = [];
    for (const a of fan) {
      const dir = target.clone().add(new THREE.Vector3(0, 1.0, 0)).sub(from).normalize();
      dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), a);
      const len = 26;
      const line = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, len, 4), lineMat);
      line.position.copy(from).addScaledVector(dir, len / 2);
      line.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      this.scene.add(line);
      lines.push(line);
    }
    let t = 0;
    this.effects.push((dt) => {
      t += dt;
      lineMat.opacity = 0.35 * (1 - t / 0.45);
      if (t >= 0.45) {
        for (const l of lines) {
          this.scene.remove(l);
          l.geometry.dispose();
        }
        for (const a of fan) {
          const dir = target.clone().add(new THREE.Vector3(0, 1.0, 0)).sub(from).normalize();
          dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), a);
          this.launchBolt(from, dir);
        }
        return false;
      }
      return true;
    });
  }

  private bossScorch() {
    const at = this.playerPos.clone();
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(1.45, 1.7, 32),
      new THREE.MeshBasicMaterial({
        color: "#ff4030",
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(at.x, 0.06, at.z);
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(1.45, 32),
      new THREE.MeshBasicMaterial({
        color: "#a02020",
        transparent: true,
        opacity: 0.15,
        depthWrite: false,
      })
    );
    disc.rotation.x = -Math.PI / 2;
    disc.position.set(at.x, 0.05, at.z);
    this.scene.add(ring, disc);
    this.scorches.push({ pos: at, t: 0, ring, disc });
  }

  /** Substepped combat integration: timers, bolts, scorches, smite. */
  private combatStep(h: number) {
    if (this.mode !== "battle") return;
    this.dashCd = Math.max(0, this.dashCd - h);
    this.iframes = Math.max(0, this.iframes - h);

    // stagger window: rushing the boss = smite
    if (this.stagger > 0) {
      this.stagger -= h;
      if (!this.smiteDone) {
        const bp = this.bBossPos;
        if (bp.distanceTo(this.playerPos) < 1.9) {
          this.smiteDone = true;
          this.burst(bp.clone().add(new THREE.Vector3(0, 1.3, 0)), "#ffe28c", 30);
          this.bBossRig?.flash();
          this.shake = Math.max(this.shake, 0.25);
          // shove the pilgrim back out of the boss
          const back = this.playerPos.clone().sub(bp).setY(0).normalize();
          this.playerPos.addScaledVector(back, 1.4);
          this.opts.hooks.onSmite?.();
        }
      }
    } else if (this.aggro) {
      this.atkTimer -= h;
      if (this.atkTimer <= 0) {
        this.atkTimer = this.atkInterval * (this.phase2 ? 0.72 : 1) * (0.85 + Math.random() * 0.3);
        if (Math.random() < 0.6) this.bossVolley();
        else this.bossScorch();
      }
    }

    // bolts
    for (let i = this.bolts.length - 1; i >= 0; i--) {
      const b = this.bolts[i];
      b.pos.addScaledVector(b.vel, h);
      b.life -= h;
      b.sprite.position.copy(b.pos);
      // fading trail ghosts
      b.ghostT += h;
      if (b.ghostT > 0.05) {
        b.ghostT = 0;
        const g = new THREE.Sprite(b.sprite.material.clone());
        g.scale.setScalar(0.7);
        g.position.copy(b.pos);
        this.scene.add(g);
        let gt = 0;
        this.effects.push((d2) => {
          gt += d2;
          g.material.opacity = Math.max(0, 0.6 - gt * 2.6);
          g.scale.setScalar(0.7 - gt * 1.4);
          if (gt > 0.24) {
            this.scene.remove(g);
            g.material.dispose();
            return false;
          }
          return true;
        });
      }
      const dx = b.pos.x - this.playerPos.x;
      const dy = b.pos.y - (this.playerPos.y + 1.0);
      const dz = b.pos.z - this.playerPos.z;
      const hit = dx * dx + dy * dy + dz * dz < 0.75 * 0.75;
      if (hit && this.iframes > 0) {
        this.burst(this.playerPos.clone().add(new THREE.Vector3(0, 1.2, 0)), "#ffe28c", 8);
        this.opts.hooks.onBoltDodged?.();
      } else if (hit) {
        this.playerRig.flash();
        this.shake = Math.max(this.shake, 0.22);
        this.burst(this.playerPos.clone().add(new THREE.Vector3(0, 1.1, 0)), "#ff5040", 12);
        this.opts.hooks.onPlayerHit?.(5 + (this.phase2 ? 3 : 0), "bolt");
      }
      if (hit || b.life <= 0 || b.pos.y < 0) {
        this.scene.remove(b.sprite);
        b.sprite.material.dispose();
        this.bolts.splice(i, 1);
      }
    }

    // wisps: false claims hunting the pilgrim
    for (let i = this.wisps.length - 1; i >= 0; i--) {
      const w = this.wisps[i];
      const dir = this.playerPos.clone().add(new THREE.Vector3(0, 1.05, 0)).sub(w.pos);
      const d = dir.length();
      dir.normalize();
      w.pos.addScaledVector(dir, 2.1 * h);
      w.pos.y = 1.05 + Math.sin(this.time * 3 + w.phase) * 0.15;
      w.sprite.position.copy(w.pos);
      if (d < 0.6) {
        if (this.iframes > 0) {
          this.burst(w.pos.clone(), "#c084ff", 16);
          this.opts.hooks.onWispPopped?.();
        } else {
          this.playerRig.flash();
          this.burst(w.pos.clone(), "#7c3aed", 12);
          this.opts.hooks.onPlayerHit?.(4, "wisp");
        }
        this.scene.remove(w.sprite);
        w.sprite.material.dispose();
        this.wisps.splice(i, 1);
      }
    }

    // scorches: warn 1.05s, then erupt
    for (let i = this.scorches.length - 1; i >= 0; i--) {
      const s = this.scorches[i];
      s.t += h;
      const mat = s.ring.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 + 0.4 * Math.sin(s.t * 18);
      (s.disc.material as THREE.MeshBasicMaterial).opacity = 0.12 + (s.t / 1.05) * 0.3;
      if (s.t >= 1.05) {
        const d = Math.hypot(s.pos.x - this.playerPos.x, s.pos.z - this.playerPos.z);
        this.burst(s.pos.clone().add(new THREE.Vector3(0, 0.4, 0)), "#ff6040", 22);
        // expanding shockwave ring
        const wave = new THREE.Mesh(
          new THREE.RingGeometry(0.4, 0.72, 32),
          new THREE.MeshBasicMaterial({
            color: "#ff8050",
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
          })
        );
        wave.rotation.x = -Math.PI / 2;
        wave.position.set(s.pos.x, 0.1, s.pos.z);
        this.scene.add(wave);
        let wt = 0;
        this.effects.push((d2) => {
          wt += d2;
          wave.scale.setScalar(1 + wt * 7);
          (wave.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.85 - wt * 2.2);
          if (wt > 0.45) {
            this.scene.remove(wave);
            wave.geometry.dispose();
            (wave.material as THREE.Material).dispose();
            return false;
          }
          return true;
        });
        if (d < 1.55 && this.iframes <= 0) {
          this.playerRig.flash();
          this.shake = Math.max(this.shake, 0.3);
          this.opts.hooks.onPlayerHit?.(8 + (this.phase2 ? 3 : 0), "scorch");
        }
        this.scene.remove(s.ring, s.disc);
        s.ring.geometry.dispose();
        mat.dispose();
        s.disc.geometry.dispose();
        (s.disc.material as THREE.Material).dispose();
        this.scorches.splice(i, 1);
      }
    }
  }

  /** Below half health the adversary quickens. */
  setBossPhase2(on: boolean) {
    this.phase2 = on;
  }

  /** Lay out N answer plates in an arc facing the adversary. */
  spawnPlates(count: number, shorts?: string[]) {
    this.clearPlates();
    this.platesLocked = false;
    const c = this.bCenter;
    const arc = Math.PI * 0.62;
    for (let i = 0; i < count; i++) {
      const ang =
        Math.PI / 2 - arc / 2 + (count === 1 ? arc / 2 : (i / (count - 1)) * arc);
      const px = c.x + Math.cos(ang) * PLATE_RADIUS * (i % 2 === 0 ? 1 : 0.82);
      const pz = c.z + Math.sin(ang) * PLATE_RADIUS * 0.9;
      const group = new THREE.Group();
      const pedestalMat = new THREE.MeshStandardMaterial({
        color: "#b8b0a0",
        roughness: 0.9,
      });
      const pedestal = new THREE.Mesh(
        new THREE.CylinderGeometry(0.95, 1.05, 0.16, 18),
        pedestalMat
      );
      pedestal.castShadow = true;
      pedestal.receiveShadow = true;
      pedestal.position.y = 0.08;
      const tex = makeLetterTexture(GREEK_LETTERS[i] ?? "?");
      const faceMat = new THREE.MeshStandardMaterial({
        map: tex,
        emissive: "#ffffff",
        emissiveMap: tex,
        emissiveIntensity: 0.5,
        transparent: true,
      });
      const face = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.15), faceMat);
      face.position.y = 1.0;
      face.lookAt(new THREE.Vector3(c.x, 1.0, c.z - 3));
      group.add(pedestal, face);
      if (shorts?.[i]) {
        const snip = this.makeTextSprite(shorts[i], {
          w: 560,
          h: 170,
          font: 36,
          maxLines: 3,
          accent: "#5a4810",
        });
        snip.scale.multiplyScalar(0.52);
        snip.position.set(0, 1.95, 0);
        group.add(snip);
      }
      group.position.set(px, 0, pz);
      this.scene.add(group);
      this.plates.push({
        group,
        baseY: 0,
        pos: new THREE.Vector3(px, 0, pz),
        pedestalMat,
        faceMat,
        state: "idle",
      });
    }
    this.plateFocus = -1;
    this.plateTimer = 0;
  }

  setPlateStates(states: PlateState[]) {
    states.forEach((s, i) => {
      const p = this.plates[i];
      if (!p) return;
      p.state = s;
      if (s === "dimmed") {
        p.faceMat.opacity = 0.18;
        p.faceMat.emissiveIntensity = 0.05;
        p.pedestalMat.color.set("#56524a");
      } else if (s === "correct") {
        p.pedestalMat.color.set("#f0d358");
        p.pedestalMat.emissive = new THREE.Color("#c9a227");
        p.pedestalMat.emissiveIntensity = 0.7;
        p.faceMat.emissiveIntensity = 1.1;
      } else if (s === "wrong") {
        p.pedestalMat.color.set("#7c1414");
        p.pedestalMat.emissive = new THREE.Color("#7c1414");
        p.pedestalMat.emissiveIntensity = 0.5;
        p.faceMat.color.set("#b86a6a");
      }
    });
  }

  /** Freeze plate standing-detection while React shows the result. */
  lockPlates() {
    this.platesLocked = true;
  }

  clearPlates() {
    for (const p of this.plates) {
      this.scene.remove(p.group);
      p.group.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mm = m.material as THREE.MeshStandardMaterial | undefined;
        mm?.map?.dispose();
        mm?.dispose();
      });
    }
    this.plates = [];
    this.plateFocus = -1;
    this.plateTimer = 0;
    this.platesLocked = false;
  }

  /** Gold beam from the pilgrim to the adversary (correct answer). */
  strikeBoss() {
    if (this.battleZone < 0) return;
    this.playerRig.gesture("strike");
    const from = this.playerPos.clone().add(new THREE.Vector3(0, 1.3, 0));
    const to = this.bBossPos.clone().add(new THREE.Vector3(0, 1.4, 0));
    const dir = to.clone().sub(from);
    const len = dir.length();
    const beamMat = new THREE.MeshBasicMaterial({
      color: "#ffe98c",
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.16, len, 7), beamMat);
    beam.position.copy(from).addScaledVector(dir, 0.5);
    beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    this.scene.add(beam);
    this.burst(to, "#ffe28c", 26);
    this.bBossRig?.flash();
    this.shake = Math.max(this.shake, 0.18);
    let t = 0;
    this.effects.push((dt) => {
      t += dt;
      beamMat.opacity = Math.max(0, 0.95 - t * 2.2);
      beam.scale.x = beam.scale.z = 1 + t * 1.6;
      if (t > 0.45) {
        this.scene.remove(beam);
        beam.geometry.dispose();
        beamMat.dispose();
        return false;
      }
      return true;
    });
  }

  /** The adversary winds up and hurls his claim (wrong answer). */
  strikePlayer() {
    if (this.battleZone < 0) return;
    this.bBossRig?.gesture("cast");
    const from = this.bBossPos.clone().add(new THREE.Vector3(0, 1.7, 0));
    const bolt = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture("rgba(70,10,10,0.95)", "rgba(30,4,4,0)"),
        transparent: true,
        depthWrite: false,
      })
    );
    bolt.scale.setScalar(1.5);
    bolt.position.copy(from);
    let started = false;
    let t = 0;
    const dur = 0.3;
    this.effects.push((dt) => {
      t += dt;
      if (t < 0.42) return true; // wait for the wind-up
      if (!started) {
        this.scene.add(bolt);
        started = true;
      }
      const k = Math.min(1, (t - 0.42) / dur);
      bolt.position.lerpVectors(
        from,
        this.playerPos.clone().add(new THREE.Vector3(0, 1.1, 0)),
        k
      );
      if (k >= 1) {
        this.scene.remove(bolt);
        bolt.material.map?.dispose();
        bolt.material.dispose();
        this.shake = Math.max(this.shake, 0.3);
        this.playerRig.flash();
        this.burst(this.playerPos.clone().add(new THREE.Vector3(0, 1.2, 0)), "#a02020", 16);
        return false;
      }
      return true;
    });
  }

  private burst(at: THREE.Vector3, color: string, n: number) {
    const pos = new Float32Array(n * 3);
    const vel: THREE.Vector3[] = [];
    for (let i = 0; i < n; i++) {
      pos[i * 3] = at.x;
      pos[i * 3 + 1] = at.y;
      pos[i * 3 + 2] = at.z;
      vel.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 4,
          Math.random() * 3.2 + 0.6,
          (Math.random() - 0.5) * 4
        )
      );
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      map: this.glowTex,
      color,
      size: 0.34,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const pts = new THREE.Points(geo, mat);
    this.scene.add(pts);
    let t = 0;
    this.effects.push((dt) => {
      t += dt;
      const attr = geo.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < n; i++) {
        vel[i].y -= dt * 4;
        attr.setXYZ(
          i,
          attr.getX(i) + vel[i].x * dt,
          attr.getY(i) + vel[i].y * dt,
          attr.getZ(i) + vel[i].z * dt
        );
      }
      attr.needsUpdate = true;
      mat.opacity = Math.max(0, 1 - t * 1.3);
      if (t > 0.85) {
        this.scene.remove(pts);
        geo.dispose();
        mat.dispose();
        return false;
      }
      return true;
    });
  }

  /** The adversary is overcome: falls, fades, memorial lit, doors open. */
  private victoryOrbitT = 0;
  private victoryCenter = new THREE.Vector3();

  bossDefeated(zoneIdx: number) {
    this.clearCombat();
    this.crowdBless();
    // gold fountain + a slow ceremonial camera orbit
    this.victoryOrbitT = 2.4;
    this.victoryCenter.copy(this.bossPos[zoneIdx]);
    this.burst(this.bossPos[zoneIdx].clone().add(new THREE.Vector3(0, 0.5, 0)), "#ffe28c", 60);
    this.beatenIds.add(this.zones[zoneIdx].chapter.id);
    if (this.curZone === zoneIdx) this.applyZonePalette(zoneIdx);
    this.bossAlive[zoneIdx] = false;
    const rig = this.bossRigs[zoneIdx];
    if (rig) {
      rig.gesture("die");
      rig.fadeOut(2.2);
      this.burst(this.bossPos[zoneIdx].clone().add(new THREE.Vector3(0, 1.4, 0)), "#ffe28c", 40);
      let t = 0;
      this.effects.push((dt) => {
        t += dt;
        if (t > 2.4) {
          this.scene.remove(rig.group);
          rig.dispose();
          this.bossRigs[zoneIdx] = null;
          return false;
        }
        return true;
      });
    }
    this.addMemorial(this.arenaCenter[zoneIdx]);
    const gate = this.gates[zoneIdx];
    if (gate && !gate.open) this.animateGateOpen(gate);
  }

  private setGateOpen(gate: Gate, immediate: boolean) {
    gate.open = true;
    if (immediate) {
      gate.doorL.rotation.y = -1.9;
      gate.doorR.rotation.y = Math.PI + 1.9;
      (gate.barrier.material as THREE.MeshBasicMaterial).opacity = 0;
      gate.barrier.visible = false;
    }
  }

  private animateGateOpen(gate: Gate) {
    gate.open = true;
    const bmat = gate.barrier.material as THREE.MeshBasicMaterial;
    let t = 0;
    this.effects.push((dt) => {
      t += dt;
      const k = Math.min(1, t / 1.4);
      const e = 1 - Math.pow(1 - k, 3);
      gate.doorL.rotation.y = -1.9 * e;
      gate.doorR.rotation.y = Math.PI + 1.9 * e;
      bmat.opacity = 0.13 * (1 - k);
      if (k >= 1) {
        gate.barrier.visible = false;
        return false;
      }
      return true;
    });
  }

  /** Respawn the pilgrim at a zone's entrance (after defeat). */
  respawn(zoneIdx: number) {
    this.mode = "explore";
    this.battleZone = -1;
    this.clearPlates();
    this.rail.visible = false;
    this.playerPos.set(0, 0, -zoneIdx * ZONE_LEN - 3);
    this.camYaw = 0;
  }

  // ---- per-frame ---------------------------------------------------------------

  private moveInput(): THREE.Vector2 {
    const v = new THREE.Vector2(this.joy.x, this.joy.y);
    if (this.keys.has("w") || this.keys.has("arrowup")) v.y += 1;
    if (this.keys.has("s") || this.keys.has("arrowdown")) v.y -= 1;
    if (this.keys.has("a") || this.keys.has("arrowleft")) v.x -= 1;
    if (this.keys.has("d") || this.keys.has("arrowright")) v.x += 1;
    if (v.lengthSq() > 1) v.normalize();
    return v;
  }

  /** One fixed simulation step: movement, clamps, pickups, plate timers. */
  private simStep(h: number, velX: number, velZ: number) {
    this.playerPos.x += velX * h;
    this.playerPos.z += velZ * h;
    if (this.dashT > 0) {
      this.dashT -= h;
      this.playerPos.addScaledVector(this.dashDir, 22 * h);
    }
    this.combatStep(h);

    // constraints
    if (this.mode === "battle") {
      const c = this.bCenter;
      const off = this.playerPos.clone().sub(c);
      off.y = 0;
      const r = off.length();
      if (r > 6.9) {
        off.multiplyScalar(6.9 / r);
        this.playerPos.x = c.x + off.x;
        this.playerPos.z = c.z + off.z;
      }
    } else {
      this.playerPos.x = THREE.MathUtils.clamp(this.playerPos.x, -ROAD_HALF, ROAD_HALF);
      let minZ = -this.zones.length * ZONE_LEN + 6;
      for (let i = 0; i < this.zones.length; i++) {
        if (this.bossAlive[i]) {
          minZ = this.gates[i].z + 1.3;
          break;
        }
      }
      this.playerPos.z = THREE.MathUtils.clamp(this.playerPos.z, minZ, 5.4);
    }

    // lamp collection
    if (this.mode === "explore") {
      for (const lamp of this.lamps) {
        if (lamp.collected) continue;
        if (
          Math.abs(lamp.pos.z - this.playerPos.z) < 1.3 &&
          Math.abs(lamp.pos.x - this.playerPos.x) < 1.3
        ) {
          lamp.collected = true;
          lamp.flame.visible = false;
          lamp.glow.visible = false;
          this.burst(lamp.pos.clone().add(new THREE.Vector3(0, 1.2, 0)), "#ffe28c", 12);
          this.opts.hooks.onLamp?.(lamp.zoneIdx, lamp.lampIdx);
        }
      }
    }

    // plate standing detection
    if (this.mode === "battle" && this.plates.length && !this.platesLocked) {
      let focus = -1;
      let read = -1;
      let readDist = 2.6;
      for (let i = 0; i < this.plates.length; i++) {
        if (this.plates[i].state === "dimmed") continue;
        const d = this.plates[i].pos.distanceTo(this.playerPos);
        if (d < readDist) {
          read = i;
          readDist = d;
        }
        if (d < 1.05 && focus < 0) {
          focus = i;
        }
      }
      if (read !== this.plateReadFocus) {
        this.plateReadFocus = read;
        this.opts.hooks.onPlateFocus?.(read >= 0 ? read : null);
      }
      if (focus !== this.plateFocus) {
        this.plateFocus = focus;
        this.plateTimer = 0;
      }
      if (focus >= 0) {
        this.plateTimer += h;
        if (this.plateTimer >= PLATE_COMMIT_S) {
          this.platesLocked = true;
          this.opts.hooks.onPlateCommit?.(focus);
        }
      }
    }
  }

  private update(dt: number) {
    this.time += dt;

    // --- movement (substepped so low frame rates don't slow world-time
    //     or tunnel through lamp/plate triggers)
    const input = this.attract ? new THREE.Vector2(0, 0) : this.moveInput();
    const sprinting = this.keys.has("shift");
    const speed = 5.4 * (sprinting ? 1.45 : 1);
    const moveLen = input.lengthSq() > 0.001 ? Math.min(1, input.length()) * (sprinting ? 1.2 : 1) : 0;
    let dirX = 0;
    let dirZ = 0;
    if (moveLen > 0) {
      const sin = Math.sin(this.camYaw);
      const cos = Math.cos(this.camYaw);
      dirX = input.x * cos - input.y * sin;
      dirZ = -input.x * sin - input.y * cos;
      this.lastMoveDir.set(dirX, 0, dirZ).normalize();
      const targetYaw = Math.atan2(dirX, dirZ);
      let d = targetYaw - this.playerYaw;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      this.playerYaw += d * Math.min(1, dt * 10);
    }
    const steps = Math.min(7, Math.max(1, Math.ceil(dt / 0.05)));
    const h = dt / steps;
    for (let s = 0; s < steps; s++) {
      this.simStep(h, dirX * speed, dirZ * speed);
    }

    // --- player rig (follows the rolling ground off-road)
    const groundY = this.mode === "battle" ? 0 : terrainHeight(this.playerPos.x, this.playerPos.z);
    this.playerPos.y = THREE.MathUtils.lerp(this.playerPos.y, groundY, Math.min(1, dt * 10));
    this.playerRig.group.position.copy(this.playerPos);
    if (this.mode === "battle") {
      // face the adversary while on trial (unless running between plates)
      if (moveLen < 0.1) {
        const b = this.bBossPos;
        const want = Math.atan2(b.x - this.playerPos.x, b.z - this.playerPos.z);
        let d = want - this.playerYaw;
        while (d > Math.PI) d -= Math.PI * 2;
        while (d < -Math.PI) d += Math.PI * 2;
        this.playerYaw += d * Math.min(1, dt * 5);
      }
    }
    this.playerRig.group.rotation.y = this.playerYaw;
    this.playerRig.setSpeed(moveLen);
    this.playerRig.update(dt, this.time);
    this.curMoveLen = THREE.MathUtils.lerp(this.curMoveLen, moveLen, Math.min(1, dt * 5));

    // --- NPC rigs
    for (let i = 0; i < this.zones.length; i++) {
      const boss = this.bossRigs[i];
      if (boss) {
        const dist = this.bossPos[i].distanceTo(this.playerPos);
        if (dist < 60) {
          if (dist < 26) {
            const want = Math.atan2(
              this.playerPos.x - this.bossPos[i].x,
              this.playerPos.z - this.bossPos[i].z
            );
            let d = want - boss.group.rotation.y;
            while (d > Math.PI) d -= Math.PI * 2;
            while (d < -Math.PI) d += Math.PI * 2;
            boss.group.rotation.y += d * Math.min(1, dt * 3);
          }
          boss.update(dt, this.time);
        }
      }
      if (i === 0) {
        for (const d of this.duels) {
          if (!d.rig) continue;
          const dist = d.pos.distanceTo(this.playerPos);
          if (dist < 55) {
            if (dist < 22) {
              const want = Math.atan2(this.playerPos.x - d.pos.x, this.playerPos.z - d.pos.z);
              let dd = want - d.rig.group.rotation.y;
              while (dd > Math.PI) dd -= Math.PI * 2;
              while (dd < -Math.PI) dd += Math.PI * 2;
              d.rig.group.rotation.y += dd * Math.min(1, dt * 3);
            }
            d.rig.update(dt, this.time);
          }
        }
      }
      const ally = this.allyRigs[i];
      if (ally && this.allyPos[i]) {
        const dist = this.allyPos[i]!.distanceTo(this.playerPos);
        if (dist < 50) {
          if (dist < 12) {
            const want = Math.atan2(
              this.playerPos.x - this.allyPos[i]!.x,
              this.playerPos.z - this.allyPos[i]!.z
            );
            let d = want - ally.group.rotation.y;
            while (d > Math.PI) d -= Math.PI * 2;
            while (d < -Math.PI) d += Math.PI * 2;
            ally.group.rotation.y += d * Math.min(1, dt * 3);
            if (dist < 4 && !this.allyBlessed[i]) {
              this.allyBlessed[i] = true;
              ally.gesture("bless");
            }
            if (dist > 7) this.allyBlessed[i] = false;
          }
          ally.update(dt, this.time);
        }
      }
    }

    // --- zone tracking + environment lerp
    const zi = THREE.MathUtils.clamp(
      Math.floor(-this.playerPos.z / ZONE_LEN),
      0,
      this.zones.length - 1
    );
    if (zi !== this.curZone) {
      this.curZone = zi;
      this.applyZonePalette(zi);
      this.envTimer = 1.5; // re-bake reflections once the sky settles
      this.opts.hooks.onZoneChange?.(zi);
    }
    this.tickEnvironment(dt);
    if (this.envTimer > 0) {
      this.envTimer -= dt;
      if (this.envTimer <= 0) this.refreshEnvironment();
    }
    this.tickModelLoads(dt);
    this.tickPropLod(dt);

    // --- lamps flicker
    for (const lamp of this.lamps) {
      if (lamp.collected) continue;
      const s = 0.55 + Math.sin(this.time * 7 + lamp.phase) * 0.07;
      lamp.flame.scale.setScalar(s);
    }

    // --- proximity (throttled)
    this.nearTick += dt;
    if (this.nearTick > 0.12 && this.mode === "explore") {
      this.nearTick = 0;
      this.updateNear();
    }

    // --- plate lift toward the focused one
    if (this.mode === "battle" && this.plates.length) {
      for (let i = 0; i < this.plates.length; i++) {
        const p = this.plates[i];
        const lift = i === this.plateFocus && !this.platesLocked ? 0.3 : 0;
        p.group.position.y +=
          (p.baseY + lift - p.group.position.y) * Math.min(1, dt * 10);
      }
    }

    // --- effects
    this.effects = this.effects.filter((fx) => fx(dt));

    // --- weather particles: gold motes ↔ falling snow
    const snowK = this.env.snow;
    this.weatherMat.color.lerpColors(
      new THREE.Color("#ffe28c"),
      new THREE.Color("#eef4ff"),
      snowK
    );
    this.weatherMat.opacity = 0.4 + snowK * 0.35;
    this.weatherMat.size = 0.14 + snowK * 0.06;
    const mp = this.weather.geometry.getAttribute("position") as THREE.BufferAttribute;
    const cx = this.camera.position.x;
    const cz = this.camera.position.z;
    for (let i = 0; i < mp.count; i++) {
      const vy = THREE.MathUtils.lerp(0.32, -2.2, snowK);
      let y = mp.getY(i) + vy * dt;
      if (y > 16) y = 0;
      if (y < 0) y = 16;
      mp.setY(i, y);
      let x = mp.getX(i) + (snowK > 0.4 ? Math.sin(this.time * 0.8 + i) * dt * 0.5 : 0);
      let z = mp.getZ(i);
      if (x - cx > 25) x -= 50;
      if (x - cx < -25) x += 50;
      if (z - cz > 25) z -= 50;
      if (z - cz < -25) z += 50;
      mp.setX(i, x);
      mp.setZ(i, z);
    }
    mp.needsUpdate = true;

    this.tickCompanion(dt);

    // --- clouds drift and fade with the dark
    const cloudOp = 0.55 * (1 - this.env.gloom) * (1 - this.darkCur);
    for (const cl of this.clouds) {
      cl.position.x += dt * 0.7;
      if (cl.position.x > 110) cl.position.x = -110;
      cl.material.opacity = cloudOp;
    }

    // --- sun / moon discs ride the real sky
    const sunD = this.sunDir(this.env.elevation, this.env.azimuth);
    if (this.sunSprite && this.sunGlare) {
      const p = this.camera.position.clone().addScaledVector(sunD, 300);
      this.sunSprite.position.copy(p);
      this.sunGlare.position.copy(p);
      const vis = THREE.MathUtils.clamp(this.env.elevation / 8, 0, 1) * (1 - this.darkCur);
      this.sunSprite.material.opacity = 0.85 * vis;
      this.sunGlare.material.opacity = 0.22 * vis;
    }
    if (this.moonSprite) {
      const md = this.sunDir(28, this.env.azimuth + 160);
      this.moonSprite.position.copy(this.camera.position).addScaledVector(md, 300);
      this.moonSprite.material.opacity = THREE.MathUtils.clamp(-this.env.elevation / 6, 0, 0.95);
    }

    // --- ground fog hugs the gloomy stretches
    const fogK = Math.max(this.env.gloom, this.env.snow * 0.5, this.darkCur * 0.8);
    this.fogPatches.forEach((m, i) => {
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.16 * fogK;
      m.position.x = Math.sin(this.time * 0.05 + i * 2.2) * 12;
      m.position.z = this.playerPos.z + ((i * 13) % 40) - 20;
    });

    // --- god rays only burn in low golden sun
    const rayVis = THREE.MathUtils.clamp((22 - this.env.elevation) / 14, 0, 1) *
      THREE.MathUtils.clamp(this.env.elevation / 8, 0, 1) * (1 - this.env.gloom) * (1 - this.darkCur);
    if (this.rays.length) {
      (this.rays[0].material as THREE.MeshBasicMaterial).opacity = 0.06 * rayVis;
    }
    if (this.waterMat) this.waterMat.uniforms.uTime.value = this.time;

    // --- camera
    this.updateCamera(dt);
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
  }

  private updateNear() {
    const p = this.playerPos;
    let next: NearTarget | null = null;
    const zi = this.curZone;
    if (zi >= 0 && zi < this.zones.length) {
      if (this.bossAlive[zi] && this.bossPos[zi].distanceTo(p) < 5.4) {
        next = { kind: "boss", zoneIdx: zi };
      } else if (this.allyPos[zi] && this.allyPos[zi]!.distanceTo(p) < 3.2) {
        next = { kind: "ally", zoneIdx: zi };
      } else if (this.shrinePos[zi].distanceTo(p) < 3.8) {
        next = { kind: "shrine", zoneIdx: zi };
      } else if (this.cavePos[zi] && this.cavePos[zi]!.distanceTo(p) < 4.2) {
        next = { kind: "cave", zoneIdx: zi };
      } else if (this.chapelPos[zi] && this.chapelPos[zi]!.distanceTo(p) < 4.4) {
        next = { kind: "chapel", zoneIdx: zi };
      } else if (this.nearDuel(zi, p) >= 0) {
        next = { kind: "duel", zoneIdx: zi, duelIdx: this.nearDuel(zi, p) };
      } else if (
        this.bossAlive[zi] &&
        Math.abs(this.gates[zi].z - p.z) < 3 &&
        Math.abs(p.x) < 4
      ) {
        next = { kind: "gate", zoneIdx: zi };
      }
    }
    const changed =
      (next === null) !== (this.near === null) ||
      (next && this.near && (next.kind !== this.near.kind || next.zoneIdx !== this.near.zoneIdx));
    if (changed) {
      this.near = next;
      this.opts.hooks.onNear?.(next);
    }
  }

  private updateCamera(dt: number) {
    if (this.victoryOrbitT > 0) {
      this.victoryOrbitT -= dt;
      const yaw = this.time * 0.7;
      const pos = new THREE.Vector3(
        this.victoryCenter.x + Math.sin(yaw) * 7.5,
        this.victoryCenter.y + 3.4,
        this.victoryCenter.z + Math.cos(yaw) * 7.5
      );
      this.camera.position.lerp(pos, Math.min(1, dt * 3));
      this.camera.lookAt(this.victoryCenter.clone().add(new THREE.Vector3(0, 1.1, 0)));
      return;
    }
    if (this.attract) {
      // slow ceremonial drift over the first stations
      this.attractT += dt;
      const t = this.attractT;
      const target = new THREE.Vector3(0, 2.4, -26 - Math.sin(t * 0.05) * 14);
      const yaw = t * 0.05;
      const pos = new THREE.Vector3(
        target.x + Math.sin(yaw) * 17,
        8.5 + Math.sin(t * 0.11) * 1.5,
        target.z + Math.cos(yaw) * 17
      );
      pos.y = Math.max(pos.y, terrainHeight(pos.x, pos.z) + 2);
      this.camera.position.lerp(pos, Math.min(1, dt * 1.5));
      this.camera.lookAt(target);
      return;
    }
    let target: THREE.Vector3;
    let yaw = this.camYaw;
    let pitch = this.camPitch;
    let dist = this.camDist;
    if (this.mode === "battle") {
      const c = this.bCenter;
      const b = this.bBossPos;
      target = new THREE.Vector3(
        (this.playerPos.x + b.x) / 2,
        1.5,
        (this.playerPos.z + b.z) / 2
      );
      yaw = (this.playerPos.x - c.x) * 0.04;
      pitch = 0.3;
      dist = 10.5;
    } else {
      target = this.playerPos.clone().add(new THREE.Vector3(0, 1.55, 0));
    }
    const off = new THREE.Vector3(
      Math.sin(yaw) * Math.cos(pitch),
      Math.sin(pitch),
      Math.cos(yaw) * Math.cos(pitch)
    ).multiplyScalar(dist);
    const desired = target.clone().add(off);
    const groundY = terrainHeight(desired.x, desired.z);
    desired.y = Math.max(groundY + 0.6, desired.y, 0.7);
    const lerpK = this.mode === "battle" ? Math.min(1, dt * 2.4) : Math.min(1, dt * 7);
    this.camera.position.lerp(desired, lerpK);
    // gentle FOV widening at full stride
    const fovT = this.mode === "battle" ? 55 : 55 + this.curMoveLen * 4;
    if (Math.abs(this.camera.fov - fovT) > 0.05) {
      this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, fovT, Math.min(1, dt * 4));
      this.camera.updateProjectionMatrix();
    }
    if (this.shake > 0) {
      this.shake = Math.max(0, this.shake - dt * 0.8);
      this.camera.position.x += (Math.random() - 0.5) * this.shake * 0.5;
      this.camera.position.y += (Math.random() - 0.5) * this.shake * 0.5;
    }
    this.camera.lookAt(target);
  }
}
