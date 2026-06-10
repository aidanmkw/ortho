// ΟΔΟΣ — The Pilgrim Road. A Three.js world built to read like the inside
// of a Byzantine icon: gold-leaf sky, stepped faceted mountains, flat unlit
// color (no light sources, no cast shadows — the light is "from within"),
// and the corpus' icon-style figures standing in it as billboards.
//
// The engine owns space, movement, camera, and effects. All game RULES
// (battle resolution, HP, saves) live in React; the engine reports what the
// player is near and renders what React decides.

import * as THREE from "three";
import type {
  EngineHooks,
  NearTarget,
  PlateState,
  ZoneDef,
  ZonePalette,
} from "./types";

export const ZONE_LEN = 46;
const ROAD_HALF = 8.5; // walkable corridor half-width
const PLAYER_H = 2.15;
const BOSS_H = 2.7;
const ALLY_H = 2.35;
const PLATE_RADIUS = 4.9; // answer plates around arena center
const PLATE_COMMIT_S = 0.7; // stand this long to commit an answer

const GREEK_LETTERS = ["Α", "Β", "Γ", "Δ", "Ε"];

// ---------------------------------------------------------------------------
// small helpers
// ---------------------------------------------------------------------------

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

function jitterColor(c: THREE.Color, amt: number, rng: () => number) {
  const out = c.clone();
  out.offsetHSL(0, 0, (rng() - 0.5) * amt);
  return out;
}

/** Soft radial gradient dot — used for glows, flames, particles. */
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

/** Answer-plate face: a big gold Greek letter on ink, in a gold border. */
function makeLetterTexture(letter: string): THREE.Texture {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 256;
  const ctx = cv.getContext("2d")!;
  ctx.fillStyle = "#171210";
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

/** Blob shadow under figures — the only "shadow" an icon allows itself. */
function makeShadowTexture(): THREE.Texture {
  return makeGlowTexture("rgba(20,12,4,0.46)", "rgba(20,12,4,0)");
}

// ---------------------------------------------------------------------------
// geometry builders (all flat-color, vertex-colored, unlit)
// ---------------------------------------------------------------------------

/**
 * A stepped, faceted icon-mountain: irregular radial silhouette in three
 * color bands, lightest at the top — the classic terraced rock of festal
 * icons, as low-poly 3D.
 */
function buildMountain(
  radius: number,
  height: number,
  palette: [string, string, string],
  rng: () => number
): THREE.Mesh {
  const spokes = 7;
  const bands = [0, 0.42, 0.74, 1];
  const bandColors = [
    new THREE.Color(palette[0]),
    new THREE.Color(palette[1]),
    new THREE.Color(palette[2]),
  ];
  // radial profile per spoke, shrinking with height
  const radii: number[][] = [];
  for (let b = 0; b < bands.length; b++) {
    const ring: number[] = [];
    const shrink = 1 - bands[b] * 0.92;
    for (let s = 0; s < spokes; s++) {
      ring.push(radius * shrink * (0.72 + rng() * 0.55));
    }
    radii.push(ring);
  }
  const pos: number[] = [];
  const col: number[] = [];
  const quad = (
    a: THREE.Vector3,
    b: THREE.Vector3,
    c: THREE.Vector3,
    d: THREE.Vector3,
    color: THREE.Color
  ) => {
    for (const v of [a, b, c, a, c, d]) pos.push(v.x, v.y, v.z);
    for (let i = 0; i < 6; i++) col.push(color.r, color.g, color.b);
  };
  const pt = (b: number, s: number) => {
    const ang = (s / spokes) * Math.PI * 2 + b * 0.22; // slight twist per band
    const r = radii[b][s % spokes];
    return new THREE.Vector3(
      Math.cos(ang) * r,
      bands[b] * height,
      Math.sin(ang) * r
    );
  };
  for (let b = 0; b < bands.length - 1; b++) {
    for (let s = 0; s < spokes; s++) {
      const c = jitterColor(bandColors[b], 0.09, rng);
      quad(pt(b, s), pt(b, s + 1), pt(b + 1, s + 1), pt(b + 1, s), c);
    }
  }
  // cap
  const capColor = bandColors[2].clone().offsetHSL(0, 0, 0.06);
  const top = new THREE.Vector3(0, height * 1.04, 0);
  for (let s = 0; s < spokes; s++) {
    const a = pt(3, s);
    const b = pt(3, s + 1);
    pos.push(a.x, a.y, a.z, b.x, b.y, b.z, top.x, top.y, top.z);
    for (let i = 0; i < 3; i++) col.push(capColor.r, capColor.g, capColor.b);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  const mat = new THREE.MeshBasicMaterial({ vertexColors: true });
  return new THREE.Mesh(geo, mat);
}

function basicBox(
  w: number,
  h: number,
  d: number,
  color: string | THREE.Color
): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshBasicMaterial({ color })
  );
}

/** Stylized icon-trees. */
function buildTree(kind: string, rng: () => number): THREE.Group {
  const g = new THREE.Group();
  const trunkMat = new THREE.MeshBasicMaterial({ color: "#4a3018" });
  if (kind === "cypress") {
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.14, 0.7, 5),
      trunkMat
    );
    trunk.position.y = 0.35;
    const h = 2.6 + rng() * 1.4;
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(0.55 + rng() * 0.2, h, 6),
      new THREE.MeshBasicMaterial({ color: "#2c4424" })
    );
    cone.position.y = 0.6 + h / 2;
    g.add(trunk, cone);
  } else if (kind === "olive") {
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.17, 1.1, 5),
      trunkMat
    );
    trunk.position.y = 0.55;
    trunk.rotation.z = (rng() - 0.5) * 0.3;
    g.add(trunk);
    const leaf = new THREE.MeshBasicMaterial({ color: "#46602e" });
    const blobs = 2 + Math.floor(rng() * 2);
    for (let i = 0; i < blobs; i++) {
      const s = 0.5 + rng() * 0.35;
      const b = new THREE.Mesh(new THREE.SphereGeometry(s, 7, 6), leaf);
      b.position.set((rng() - 0.5) * 0.9, 1.25 + rng() * 0.7, (rng() - 0.5) * 0.7);
      b.scale.y = 0.8;
      g.add(b);
    }
  } else if (kind === "palm") {
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.16, 2.4, 5),
      trunkMat
    );
    trunk.position.y = 1.2;
    trunk.rotation.z = (rng() - 0.5) * 0.35;
    g.add(trunk);
    const frondMat = new THREE.MeshBasicMaterial({
      color: "#4a6a2c",
      side: THREE.DoubleSide,
    });
    const fronds = 6;
    for (let i = 0; i < fronds; i++) {
      const f = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.34), frondMat);
      const ang = (i / fronds) * Math.PI * 2;
      f.position.set(
        Math.cos(ang) * 0.65 + trunk.rotation.z * -1.2,
        2.45,
        Math.sin(ang) * 0.65
      );
      f.rotation.y = -ang;
      f.rotation.z = -0.45;
      g.add(f);
    }
  } else if (kind === "bare") {
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.15, 1.9, 5),
      trunkMat
    );
    trunk.position.y = 0.95;
    g.add(trunk);
    for (let i = 0; i < 3; i++) {
      const br = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.06, 0.9, 4),
        trunkMat
      );
      br.position.set((rng() - 0.5) * 0.5, 1.5 + rng() * 0.5, (rng() - 0.5) * 0.5);
      br.rotation.z = 0.7 + rng() * 0.8;
      br.rotation.y = rng() * Math.PI;
      g.add(br);
    }
  }
  return g;
}

/**
 * Icon-architecture tower: slightly reverse-perspective (wider at the top,
 * as icons splay their buildings), with a gold dome and a three-bar cross.
 */
function buildTower(rng: () => number, domed: boolean): THREE.Group {
  const g = new THREE.Group();
  const bodyColors = ["#b08458", "#a8687c", "#8a7a9c", "#b89468"];
  const color = bodyColors[Math.floor(rng() * bodyColors.length)];
  const h = 3 + rng() * 1.6;
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, h, 1.7),
    new THREE.MeshBasicMaterial({ color })
  );
  // reverse perspective: splay the top outward
  const posAttr = body.geometry.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < posAttr.count; i++) {
    if (posAttr.getY(i) > 0) {
      posAttr.setX(i, posAttr.getX(i) * 1.18);
      posAttr.setZ(i, posAttr.getZ(i) * 1.18);
    }
  }
  posAttr.needsUpdate = true;
  body.position.y = h / 2;
  g.add(body);
  // door + window (dark insets)
  const ink = new THREE.MeshBasicMaterial({ color: "#1c140c" });
  const door = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.9), ink);
  door.position.set(0, 0.45, 0.86);
  const win = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.5), ink);
  win.position.set(0, h - 0.8, 0.95);
  g.add(door, win);
  if (domed) {
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 10, 7, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: "#c9a227" })
    );
    dome.position.y = h;
    g.add(dome);
    const cross = buildCross(0.5, "#f0d358");
    cross.position.y = h + 1.15;
    g.add(cross);
  } else {
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(1.45, 1, 4),
      new THREE.MeshBasicMaterial({ color: "#7c1414" })
    );
    roof.position.y = h + 0.5;
    roof.rotation.y = Math.PI / 4;
    g.add(roof);
  }
  return g;
}

/** Small Orthodox three-bar cross. */
function buildCross(size: number, color: string): THREE.Group {
  const g = new THREE.Group();
  const t = size * 0.1;
  const vert = basicBox(t, size, t, color);
  vert.position.y = size / 2;
  const bar1 = basicBox(size * 0.62, t, t, color);
  bar1.position.y = size * 0.78;
  const bar2 = basicBox(size * 0.4, t, t, color);
  bar2.position.y = size * 0.92;
  const bar3 = basicBox(size * 0.36, t, t, color);
  bar3.position.y = size * 0.55;
  bar3.rotation.z = 0.45;
  g.add(vert, bar1, bar2, bar3);
  return g;
}

/**
 * Roadside icon-shrine (proskynetarion): the chapter's backdrop art stands
 * in a gold kovcheg frame under a little gabled roof — "the icon within
 * the icon" that names each station.
 */
function buildShrine(tex: THREE.Texture): THREE.Group {
  const g = new THREE.Group();
  const w = 4.6;
  const h = (w * 768) / 1408 + 0.0; // backdrop aspect
  const frame = basicBox(w + 0.5, h + 0.5, 0.22, "#c9a227");
  frame.position.y = 1.4 + h / 2;
  const inner = basicBox(w + 0.22, h + 0.22, 0.24, "#5a4810");
  inner.position.copy(frame.position);
  const art = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ map: tex })
  );
  art.position.set(0, frame.position.y, 0.14);
  // legs + roof
  const legL = basicBox(0.18, 1.5, 0.18, "#6a4a20");
  legL.position.set(-w / 2 + 0.3, 0.75, 0);
  const legR = legL.clone();
  legR.position.x = w / 2 - 0.3;
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(w * 0.62, 0.7, 4),
    new THREE.MeshBasicMaterial({ color: "#7c1414" })
  );
  roof.rotation.y = Math.PI / 4;
  roof.scale.z = 0.4;
  roof.position.y = frame.position.y + h / 2 + 0.55;
  const finial = buildCross(0.4, "#f0d358");
  finial.position.y = roof.position.y + 0.36;
  g.add(frame, inner, art, legL, legR, roof, finial);
  return g;
}

type Gate = {
  group: THREE.Group;
  doorL: THREE.Group;
  doorR: THREE.Group;
  barrier: THREE.Mesh;
  open: boolean;
  z: number;
};

/**
 * The Royal Doors that seal each zone: two pillars, a lintel with a cross,
 * gold double doors, and a faint veil of light while locked. Two splayed
 * towers flank it with a crimson velum slung between — the icon painter's
 * sign that scenes are joined.
 */
function buildGate(rng: () => number, domed: boolean): Gate {
  const group = new THREE.Group();
  const pillarMat = new THREE.MeshBasicMaterial({ color: "#d8cdb1" });
  const pw = 0.85;
  const ph = 4.6;
  const span = 2.1; // half opening
  for (const side of [-1, 1]) {
    const p = new THREE.Mesh(new THREE.BoxGeometry(pw, ph, pw), pillarMat);
    p.position.set(side * (span + pw / 2), ph / 2, 0);
    group.add(p);
    const cap = basicBox(pw * 1.5, 0.3, pw * 1.5, "#c9a227");
    cap.position.set(side * (span + pw / 2), ph + 0.15, 0);
    group.add(cap);
  }
  const lintel = basicBox(span * 2 + pw * 2 + 0.6, 0.55, pw, "#c9a227");
  lintel.position.y = ph + 0.45;
  group.add(lintel);
  const cross = buildCross(0.9, "#f0d358");
  cross.position.y = ph + 0.75;
  group.add(cross);

  // doors hinge at the pillars
  const doorGeo = new THREE.PlaneGeometry(span, 3.9);
  doorGeo.translate(span / 2, 0, 0); // hinge at local x=0
  const doorMat = new THREE.MeshBasicMaterial({
    color: "#c9a227",
    side: THREE.DoubleSide,
  });
  const trimMat = new THREE.MeshBasicMaterial({
    color: "#7a5e10",
    side: THREE.DoubleSide,
  });
  const mkDoor = (side: number) => {
    const d = new THREE.Group();
    const leaf = new THREE.Mesh(doorGeo, doorMat);
    const trim = new THREE.Mesh(
      new THREE.PlaneGeometry(span * 0.7, 3.4),
      trimMat
    );
    trim.position.set((span / 2) * 1.0, 0, side * 0.012);
    const ikon = buildCross(0.8, "#f4ecd8");
    ikon.position.set(span / 2, -0.4, side * 0.03);
    d.add(leaf, trim, ikon);
    d.position.set(side * span, 1.95, 0);
    if (side > 0) d.rotation.y = Math.PI; // mirror so hinges sit outward
    return d;
  };
  const doorL = mkDoor(-1);
  const doorR = mkDoor(1);
  group.add(doorL, doorR);

  const barrier = new THREE.Mesh(
    new THREE.PlaneGeometry(span * 2, 3.9),
    new THREE.MeshBasicMaterial({
      color: "#f0d358",
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
  barrier.position.y = 1.95;
  group.add(barrier);

  // flanking towers + velum
  const tL = buildTower(rng, domed);
  tL.position.set(-(span + pw + 2.6), 0, -0.4);
  const tR = buildTower(rng, !domed);
  tR.position.set(span + pw + 2.6, 0, -0.4);
  group.add(tL, tR);
  const velum = new THREE.Mesh(
    new THREE.PlaneGeometry(span * 2 + pw * 2 + 4.4, 0.95, 6, 1),
    new THREE.MeshBasicMaterial({ color: "#7c1414", side: THREE.DoubleSide })
  );
  // gentle sag
  const vp = velum.geometry.getAttribute("position") as THREE.BufferAttribute;
  for (let i = 0; i < vp.count; i++) {
    const x = vp.getX(i);
    vp.setY(i, vp.getY(i) - Math.cos((x / (span + pw + 2.2)) * 1.4) * 0.35);
  }
  vp.needsUpdate = true;
  velum.position.y = ph + 1.6;
  group.add(velum);

  return { group, doorL, doorR, barrier, open: false, z: 0 };
}

// ---------------------------------------------------------------------------
// sky
// ---------------------------------------------------------------------------

const SKY_VERT = `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
}
`;
// Burnished gold-leaf: vertical gradient + faint radial "tooling" rays that
// drift very slowly, like candlelight moving across leaf.
const SKY_FRAG = `
varying vec3 vDir;
uniform vec3 uTop;
uniform vec3 uHorizon;
uniform float uTime;
void main() {
  float h = clamp(vDir.y, -0.12, 1.0);
  vec3 col = mix(uHorizon, uTop, smoothstep(-0.06, 0.62, h));
  float ang = atan(vDir.x, vDir.z);
  float rays = sin(ang * 22.0 + uTime * 0.05) * 0.5 + 0.5;
  col += rays * 0.018 * (1.0 - smoothstep(0.0, 0.5, h));
  float shimmer = sin(ang * 90.0 - uTime * 0.11) * 0.006;
  col += shimmer;
  gl_FragColor = vec4(col, 1.0);
}
`;

// ---------------------------------------------------------------------------
// engine
// ---------------------------------------------------------------------------

type Billboard = { obj: THREE.Object3D };

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
  pedestalMat: THREE.MeshBasicMaterial;
  faceMat: THREE.MeshBasicMaterial;
  state: PlateState;
};

type Effect = (dt: number) => boolean; // false = done

export type EngineOptions = {
  basePath: string;
  hair: string; // player sprite variant
  beaten: Set<string>; // chapter ids already beaten
  checkpoint: number; // zone to spawn into
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

  // camera rig — yaw 0 puts the camera on +Z behind the player, so the
  // view (and "forward") run down the road toward -Z.
  private camYaw = 0;
  private camPitch = 0.26;
  private camDist = 6.8;
  private shake = 0;

  // world
  private player!: THREE.Group;
  private playerSprite!: THREE.Object3D;
  private playerPos = new THREE.Vector3(0, 0, 2.5);
  private bob = 0;
  private billboards: Billboard[] = [];
  private lamps: Lamp[] = [];
  private gates: Gate[] = [];
  private bossGroups: (THREE.Group | null)[] = [];
  private bossAlive: boolean[] = [];
  private allyPos: (THREE.Vector3 | null)[] = [];
  private shrinePos: THREE.Vector3[] = [];
  private bossPos: THREE.Vector3[] = [];
  private arenaCenter: THREE.Vector3[] = [];
  private effects: Effect[] = [];
  private skyMat!: THREE.ShaderMaterial;
  private fog!: THREE.Fog;
  private motes!: THREE.Points;
  private rail!: THREE.Mesh;

  // palette lerp
  private curTop = new THREE.Color();
  private curHor = new THREE.Color();
  private curFog = new THREE.Color();
  private tgtTop = new THREE.Color();
  private tgtHor = new THREE.Color();
  private tgtFog = new THREE.Color();

  // state
  private mode: "explore" | "battle" = "explore";
  private battleZone = -1;
  private plates: Plate[] = [];
  private plateFocus = -1;
  private plateTimer = 0;
  private platesLocked = false;
  private curZone = -1;
  private near: NearTarget | null = null;
  private nearTick = 0;
  private texLoader!: THREE.TextureLoader;
  private glowTex!: THREE.Texture;
  private time = 0;

  constructor(canvas: HTMLCanvasElement, zones: ZoneDef[], opts: EngineOptions) {
    this.canvas = canvas;
    this.zones = zones;
    this.opts = opts;
  }

  // ---- lifecycle ----------------------------------------------------------

  async start() {
    const { canvas } = this;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 320);
    this.fog = new THREE.Fog("#e3c178", 20, 95);
    this.scene.fog = this.fog;
    this.texLoader = new THREE.TextureLoader();
    this.glowTex = makeGlowTexture("rgba(255,224,140,0.9)", "rgba(255,200,80,0)");

    this.buildSky();
    await this.buildWorld();
    if (this.disposed) return;
    const playerTex = await this.loadSprite(`player-${this.opts.hair}.webp`);
    if (this.disposed) return;
    this.buildPlayer(playerTex);
    this.buildMotes();
    this.buildRail();

    const spawn = Math.min(this.opts.checkpoint, this.zones.length - 1);
    this.playerPos.set(0, 0, -spawn * ZONE_LEN - 3);
    this.applyZonePalette(spawn, true);
    this.curZone = spawn;

    this.attachInput();
    this.resize();
    window.addEventListener("resize", this.resize);
    this.clock.start();
    const loop = () => {
      if (this.disposed) return;
      this.raf = requestAnimationFrame(loop);
      this.update(Math.min(this.clock.getDelta(), 0.05));
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
    this.renderer?.dispose();
  }

  private resize = () => {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  };

  // ---- loading ------------------------------------------------------------

  private loadSprite(file: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      this.texLoader.load(
        `${this.opts.basePath}/sprites/${file}`,
        (t) => {
          t.colorSpace = THREE.SRGBColorSpace;
          t.minFilter = THREE.LinearFilter;
          resolve(t);
        },
        undefined,
        reject
      );
    });
  }

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

  // ---- world construction --------------------------------------------------

  private buildSky() {
    this.skyMat = new THREE.ShaderMaterial({
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      uniforms: {
        uTop: { value: new THREE.Color("#f7df8e") },
        uHorizon: { value: new THREE.Color("#c98f33") },
        uTime: { value: 0 },
      },
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    });
    const sky = new THREE.Mesh(new THREE.SphereGeometry(260, 24, 14), this.skyMat);
    sky.frustumCulled = false;
    sky.onBeforeRender = () => {
      sky.position.copy(this.camera.position);
    };
    this.scene.add(sky);
  }

  /** Figure billboard: textured plane that yaws toward the camera. */
  private makeFigure(
    tex: THREE.Texture,
    height: number,
    opts?: { halo?: boolean; aura?: string }
  ): THREE.Group {
    const img = tex.image as { width: number; height: number };
    const aspect = img.width / img.height;
    const g = new THREE.Group();
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(height * aspect, height),
      new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        alphaTest: 0.08,
        side: THREE.DoubleSide,
      })
    );
    plane.position.y = height / 2;
    g.add(plane);
    if (opts?.halo) {
      const halo = new THREE.Mesh(
        new THREE.CircleGeometry(height * 0.19, 24),
        new THREE.MeshBasicMaterial({
          color: "#f0d358",
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
      );
      halo.position.set(0, height * 0.86, -0.02);
      g.add(halo);
    }
    if (opts?.aura) {
      const aura = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: makeGlowTexture(opts.aura, "rgba(0,0,0,0)"),
          transparent: true,
          opacity: 0.7,
          depthWrite: false,
        })
      );
      aura.scale.setScalar(height * 1.6);
      aura.position.y = height * 0.5;
      aura.renderOrder = -1;
      g.add(aura);
    }
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(height * 0.5, height * 0.22),
      new THREE.MeshBasicMaterial({
        map: makeShadowTexture(),
        transparent: true,
        depthWrite: false,
      })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.02;
    g.add(shadow);
    this.billboards.push({ obj: g });
    return g;
  }

  private async buildWorld() {
    const L = ZONE_LEN;
    const beaten = this.opts.beaten;

    // textures fetched in parallel
    const [bossTex, allyTex, backTex] = await Promise.all([
      Promise.all(this.zones.map((z) => this.loadSprite(z.bossSprite))),
      Promise.all(
        this.zones.map((z) =>
          z.allySprite ? this.loadSprite(z.allySprite) : Promise.resolve(null)
        )
      ),
      Promise.all(this.zones.map((z) => this.loadBackdrop(z.chapter.background))),
    ]);

    this.zones.forEach((zone, i) => {
      const rng = mulberry32(0x9e3779b9 ^ (i * 2654435761));
      const z0 = -i * L; // near edge of the zone (player enters here)
      const zc = z0 - L / 2;
      const pal = zone.palette;

      // -- earth: ground field, road, register-line between zones
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(120, L),
        new THREE.MeshBasicMaterial({ color: pal.ground })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.set(0, 0, zc);
      const road = new THREE.Mesh(
        new THREE.PlaneGeometry(6.6, L),
        new THREE.MeshBasicMaterial({ color: pal.road })
      );
      road.rotation.x = -Math.PI / 2;
      road.position.set(0, 0.012, zc);
      const line = new THREE.Mesh(
        new THREE.PlaneGeometry(120, 0.22),
        new THREE.MeshBasicMaterial({ color: "#c9a227" })
      );
      line.rotation.x = -Math.PI / 2;
      line.position.set(0, 0.02, z0 - L + 0.1);
      this.scene.add(ground, road, line);

      // -- arena: a mosaic disc where the trial is held
      const arenaC = new THREE.Vector3(0, 0, z0 - L + 12);
      this.arenaCenter.push(arenaC);
      const disc = new THREE.Mesh(
        new THREE.CircleGeometry(7.6, 40),
        new THREE.MeshBasicMaterial({ color: pal.road })
      );
      disc.rotation.x = -Math.PI / 2;
      disc.position.set(arenaC.x, 0.018, arenaC.z);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(7.2, 7.6, 48),
        new THREE.MeshBasicMaterial({ color: "#c9a227", side: THREE.DoubleSide })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(arenaC.x, 0.026, arenaC.z);
      this.scene.add(disc, ring);

      // -- mountains flanking the corridor
      const peaks = 4 + Math.floor(rng() * 3);
      for (let p = 0; p < peaks; p++) {
        const side = p % 2 === 0 ? -1 : 1;
        const m = buildMountain(
          5 + rng() * 7,
          6 + rng() * 9,
          pal.mountain,
          rng
        );
        m.position.set(
          side * (15 + rng() * 16),
          0,
          z0 - 4 - rng() * (L - 8)
        );
        this.scene.add(m);
      }

      // -- trees
      if (pal.trees !== "none") {
        const n = 3 + Math.floor(rng() * 3);
        for (let t = 0; t < n; t++) {
          const tree = buildTree(pal.trees, rng);
          const side = rng() > 0.5 ? -1 : 1;
          tree.position.set(side * (5.5 + rng() * 5), 0, z0 - 3 - rng() * (L - 14));
          tree.rotation.y = rng() * Math.PI * 2;
          this.scene.add(tree);
        }
      }

      // -- vigil lamps along the road
      const lampN = pal.gloom && pal.gloom > 0.6 ? 5 : 4;
      for (let li = 0; li < lampN; li++) {
        const lx = (li % 2 === 0 ? -1 : 1) * (2.2 + rng() * 2.6);
        const lz = z0 - 4 - (li + 0.5) * ((L - 16) / lampN);
        this.addLamp(i, li, new THREE.Vector3(lx, 0, lz), pal);
      }

      // -- the chapter's icon-shrine beside the arena
      const shrine = buildShrine(backTex[i]);
      shrine.position.set(6.4, 0, arenaC.z + 2.4);
      shrine.rotation.y = -0.5;
      this.scene.add(shrine);
      this.shrinePos.push(shrine.position.clone());

      // -- ally saint on the road
      if (allyTex[i]) {
        const ally = this.makeFigure(allyTex[i]!, ALLY_H, { halo: true });
        ally.position.set(-3.9, 0, z0 - L * 0.42);
        this.scene.add(ally);
        this.allyPos.push(ally.position.clone());
      } else {
        this.allyPos.push(null);
      }

      // -- the adversary, waiting at the arena (or already overcome)
      const isBeaten = beaten.has(zone.chapter.id);
      this.bossAlive.push(!isBeaten);
      if (!isBeaten) {
        const aura =
          pal.gloom === 1 ? "rgba(70,40,120,0.55)" : "rgba(120,20,20,0.4)";
        const boss = this.makeFigure(bossTex[i], BOSS_H, { aura });
        boss.position.set(arenaC.x, 0, arenaC.z - 3.2);
        this.scene.add(boss);
        this.bossGroups.push(boss);
        this.bossPos.push(boss.position.clone());
      } else {
        this.bossGroups.push(null);
        this.bossPos.push(arenaC.clone().add(new THREE.Vector3(0, 0, -3.2)));
        this.addMemorial(arenaC);
      }

      // -- the Royal Doors at the zone's far edge
      const gate = buildGate(rng, i % 2 === 0);
      gate.z = z0 - L + 2.0;
      gate.group.position.set(0, 0, gate.z);
      this.scene.add(gate.group);
      if (isBeaten) this.setGateOpen(gate, true);
      this.gates.push(gate);

      // -- stars for the dark zones
      if (pal.stars) {
        const starN = pal.gloom === 1 ? 260 : 90;
        const pos = new Float32Array(starN * 3);
        for (let s = 0; s < starN; s++) {
          pos[s * 3] = (rng() - 0.5) * 140;
          pos[s * 3 + 1] = 6 + rng() * 70;
          pos[s * 3 + 2] = z0 - rng() * L;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        const stars = new THREE.Points(
          geo,
          new THREE.PointsMaterial({
            color: "#fff6d8",
            size: 0.22,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.9,
            fog: false,
          })
        );
        this.scene.add(stars);
      }
    });

    // a low plinth at the very start of the road
    const plinth = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 3, 0.3, 24),
      new THREE.MeshBasicMaterial({ color: "#d8cdb1" })
    );
    plinth.position.set(0, 0.15, 4.5);
    const startCross = buildCross(1.4, "#c9a227");
    startCross.position.set(0, 0.3, 4.5);
    this.scene.add(plinth, startCross);
  }

  private addLamp(zoneIdx: number, lampIdx: number, pos: THREE.Vector3, pal: ZonePalette) {
    const stand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.09, 1.05, 6),
      new THREE.MeshBasicMaterial({ color: "#6a5618" })
    );
    stand.position.set(pos.x, 0.52, pos.z);
    const cup = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.1, 0.16, 8),
      new THREE.MeshBasicMaterial({ color: "#c9a227" })
    );
    cup.position.set(pos.x, 1.1, pos.z);
    const flame = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.glowTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    flame.scale.setScalar(0.55);
    flame.position.set(pos.x, 1.32, pos.z);
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.glowTex,
        transparent: true,
        opacity: 0.22 + (pal.gloom ?? 0) * 0.3,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    glow.scale.setScalar(2.6);
    glow.position.copy(flame.position);
    this.scene.add(stand, cup, flame, glow);
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
    const cross = buildCross(1.5, "#c9a227");
    cross.position.set(arenaC.x, 0, arenaC.z - 3.2);
    const flame = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: this.glowTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    flame.scale.setScalar(0.8);
    flame.position.set(arenaC.x, 0.6, arenaC.z - 2.6);
    this.scene.add(cross, flame);
  }

  private buildPlayer(tex: THREE.Texture) {
    this.player = this.makeFigure(tex, PLAYER_H);
    this.playerSprite = this.player.children[0];
    this.scene.add(this.player);
  }

  private buildMotes() {
    // drifting incense / dust motes around the camera
    const N = 220;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = Math.random() * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    this.motes = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        map: this.glowTex,
        color: "#ffe28c",
        size: 0.16,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    this.scene.add(this.motes);
  }

  private buildRail() {
    // iconostasis rail that rises around the arena during a trial
    this.rail = new THREE.Mesh(
      new THREE.TorusGeometry(7.6, 0.07, 8, 64),
      new THREE.MeshBasicMaterial({
        color: "#c9a227",
        transparent: true,
        opacity: 0,
      })
    );
    this.rail.rotation.x = Math.PI / 2;
    this.rail.visible = false;
    this.scene.add(this.rail);
  }

  // ---- palette ------------------------------------------------------------

  private applyZonePalette(idx: number, immediate = false) {
    const pal = this.zones[Math.max(0, Math.min(idx, this.zones.length - 1))].palette;
    this.tgtTop.set(pal.skyTop);
    this.tgtHor.set(pal.skyHorizon);
    this.tgtFog.set(pal.fog);
    if (immediate) {
      this.curTop.copy(this.tgtTop);
      this.curHor.copy(this.tgtHor);
      this.curFog.copy(this.tgtFog);
    }
  }

  // ---- input ----------------------------------------------------------------

  private onKeyDown = (e: KeyboardEvent) => {
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
        this.camDist = THREE.MathUtils.clamp(
          this.camDist * (this.pinchDist / d),
          4,
          11
        );
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
    // tap = select an answer plate (battle only)
    const dt = performance.now() - this.tapTime;
    const moved = this.tapStart.distanceTo(
      new THREE.Vector2(e.clientX, e.clientY)
    );
    if (dt < 350 && moved < 8 && this.mode === "battle" && !this.platesLocked) {
      const idx = this.raycastPlate(e.clientX, e.clientY);
      if (idx >= 0) this.opts.hooks.onPlateCommit?.(idx);
    }
  };
  private onWheel = (e: WheelEvent) => {
    this.camDist = THREE.MathUtils.clamp(
      this.camDist + e.deltaY * 0.005,
      4,
      11
    );
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

  // ---- battle staging (called from React) -----------------------------------

  enterBattle(zoneIdx: number) {
    this.mode = "battle";
    this.battleZone = zoneIdx;
    const c = this.arenaCenter[zoneIdx];
    // bring the pilgrim to the arena's near edge
    this.playerPos.set(c.x, 0, c.z + 5.6);
    this.rail.position.set(c.x, -0.3, c.z);
    this.rail.visible = true;
    const mat = this.rail.material as THREE.MeshBasicMaterial;
    this.effects.push((dt) => {
      this.rail.position.y = Math.min(0.42, this.rail.position.y + dt * 1.4);
      mat.opacity = Math.min(0.9, mat.opacity + dt * 2);
      return this.rail.position.y < 0.42;
    });
  }

  exitBattle() {
    this.mode = "explore";
    this.battleZone = -1;
    this.clearPlates();
    const mat = this.rail.material as THREE.MeshBasicMaterial;
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

  /** Lay out N answer plates in an arc facing the adversary. */
  spawnPlates(count: number) {
    this.clearPlates();
    this.platesLocked = false;
    const c = this.arenaCenter[this.battleZone];
    const arc = Math.PI * 0.62;
    for (let i = 0; i < count; i++) {
      const ang =
        Math.PI / 2 - arc / 2 + (count === 1 ? arc / 2 : (i / (count - 1)) * arc);
      // plates fan on the player's side, facing the boss (toward -Z of arena)
      const px = c.x + Math.cos(ang) * PLATE_RADIUS * (i % 2 === 0 ? 1 : 0.82);
      const pz = c.z + Math.sin(ang) * PLATE_RADIUS * 0.9;
      const group = new THREE.Group();
      const pedestalMat = new THREE.MeshBasicMaterial({ color: "#e8dcb8" });
      const pedestal = new THREE.Mesh(
        new THREE.CylinderGeometry(0.95, 1.05, 0.14, 18),
        pedestalMat
      );
      pedestal.position.y = 0.07;
      const faceMat = new THREE.MeshBasicMaterial({
        map: makeLetterTexture(GREEK_LETTERS[i] ?? "?"),
        transparent: true,
      });
      const face = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.15), faceMat);
      face.position.y = 0.95;
      face.lookAt(new THREE.Vector3(c.x, 0.95, c.z - 3));
      group.add(pedestal, face);
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
        p.faceMat.opacity = 0.22;
        p.faceMat.transparent = true;
        p.pedestalMat.color.set("#5a5446");
      } else if (s === "correct") {
        p.pedestalMat.color.set("#f0d358");
        p.faceMat.color.set("#ffe98c");
      } else if (s === "wrong") {
        p.pedestalMat.color.set("#7c1414");
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
        const mm = m.material as THREE.MeshBasicMaterial | undefined;
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
    const zi = this.battleZone;
    if (zi < 0) return;
    const from = this.playerPos.clone().add(new THREE.Vector3(0, 1.3, 0));
    const to = this.bossPos[zi].clone().add(new THREE.Vector3(0, 1.6, 0));
    const dir = to.clone().sub(from);
    const len = dir.length();
    const beamMat = new THREE.MeshBasicMaterial({
      color: "#ffe98c",
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.16, len, 7),
      beamMat
    );
    beam.position.copy(from).addScaledVector(dir, 0.5);
    beam.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize()
    );
    this.scene.add(beam);
    this.burst(to, "#ffe28c", 26);
    this.flashBoss();
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

  /** Dark bolt from the adversary to the pilgrim (wrong answer). */
  strikePlayer() {
    const zi = this.battleZone;
    if (zi < 0) return;
    const from = this.bossPos[zi].clone().add(new THREE.Vector3(0, 1.7, 0));
    const bolt = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeGlowTexture("rgba(60,8,8,0.95)", "rgba(30,4,4,0)"),
        transparent: true,
        depthWrite: false,
      })
    );
    bolt.scale.setScalar(1.5);
    bolt.position.copy(from);
    this.scene.add(bolt);
    let t = 0;
    const dur = 0.3;
    this.effects.push((dt) => {
      t += dt;
      const k = Math.min(1, t / dur);
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
        this.burst(this.playerPos.clone().add(new THREE.Vector3(0, 1.2, 0)), "#a02020", 16);
        return false;
      }
      return true;
    });
  }

  private flashBoss() {
    const g = this.bossGroups[this.battleZone];
    if (!g) return;
    const plane = g.children[0] as THREE.Mesh;
    const mat = plane.material as THREE.MeshBasicMaterial;
    let t = 0;
    const baseX = g.position.x;
    this.effects.push((dt) => {
      t += dt;
      mat.color.setRGB(1 + 2 * Math.max(0, 0.25 - t), 1, 1);
      g.position.x = baseX + Math.sin(t * 60) * Math.max(0, 0.22 - t) * 0.6;
      if (t > 0.35) {
        mat.color.setRGB(1, 1, 1);
        g.position.x = baseX;
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

  /** The adversary is overcome: dissolve, light a memorial, open the doors. */
  bossDefeated(zoneIdx: number) {
    this.bossAlive[zoneIdx] = false;
    const g = this.bossGroups[zoneIdx];
    if (g) {
      const plane = g.children[0] as THREE.Mesh;
      const mat = plane.material as THREE.MeshBasicMaterial;
      mat.transparent = true;
      let t = 0;
      this.effects.push((dt) => {
        t += dt;
        mat.opacity = Math.max(0, 1 - t * 0.9);
        g.position.y = -t * 0.55;
        g.scale.setScalar(Math.max(0.6, 1 - t * 0.25));
        if (t > 1.15) {
          this.scene.remove(g);
          this.bossGroups[zoneIdx] = null;
          return false;
        }
        return true;
      });
      this.burst(
        this.bossPos[zoneIdx].clone().add(new THREE.Vector3(0, 1.4, 0)),
        "#ffe28c",
        40
      );
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
      bmat.opacity = 0.16 * (1 - k);
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

  // ---- per-frame ------------------------------------------------------------

  private moveInput(): THREE.Vector2 {
    const v = new THREE.Vector2(this.joy.x, this.joy.y);
    if (this.keys.has("w") || this.keys.has("arrowup")) v.y += 1;
    if (this.keys.has("s") || this.keys.has("arrowdown")) v.y -= 1;
    if (this.keys.has("a") || this.keys.has("arrowleft")) v.x -= 1;
    if (this.keys.has("d") || this.keys.has("arrowright")) v.x += 1;
    if (v.lengthSq() > 1) v.normalize();
    return v;
  }

  private update(dt: number) {
    this.time += dt;
    this.skyMat.uniforms.uTime.value = this.time;

    // --- movement
    const input = this.moveInput();
    const speed = 5.4;
    if (input.lengthSq() > 0.001) {
      const sin = Math.sin(this.camYaw);
      const cos = Math.cos(this.camYaw);
      // camera-relative: joy.y pushes away from camera, joy.x strafes
      const dx = input.x * cos - input.y * sin;
      const dz = -input.x * sin - input.y * cos;
      this.playerPos.x += dx * speed * dt;
      this.playerPos.z += dz * speed * dt;
      this.bob += dt * 9;
    } else {
      this.bob += dt * 1.6;
    }

    // --- constraints
    if (this.mode === "battle") {
      const c = this.arenaCenter[this.battleZone];
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
      // can't pass a sealed gate; can't walk back off the road's start
      let minZ = -this.zones.length * ZONE_LEN + 6;
      for (let i = 0; i < this.zones.length; i++) {
        if (this.bossAlive[i]) {
          minZ = this.gates[i].z + 1.3;
          break;
        }
      }
      this.playerPos.z = THREE.MathUtils.clamp(this.playerPos.z, minZ, 5.4);
    }

    // --- player figure
    this.player.position.copy(this.playerPos);
    this.player.position.y = Math.abs(Math.sin(this.bob)) * 0.1;

    // --- zone tracking + palette lerp
    const zi = THREE.MathUtils.clamp(
      Math.floor(-this.playerPos.z / ZONE_LEN),
      0,
      this.zones.length - 1
    );
    if (zi !== this.curZone) {
      this.curZone = zi;
      this.applyZonePalette(zi);
      this.opts.hooks.onZoneChange?.(zi);
    }
    const k = Math.min(1, dt * 1.6);
    this.curTop.lerp(this.tgtTop, k);
    this.curHor.lerp(this.tgtHor, k);
    this.curFog.lerp(this.tgtFog, k);
    (this.skyMat.uniforms.uTop.value as THREE.Color).copy(this.curTop);
    (this.skyMat.uniforms.uHorizon.value as THREE.Color).copy(this.curHor);
    this.fog.color.copy(this.curFog);
    this.renderer.setClearColor(this.curFog);

    // --- billboards face the camera (yaw only — figures stay upright)
    for (const b of this.billboards) {
      b.obj.rotation.y = Math.atan2(
        this.camera.position.x - b.obj.position.x,
        this.camera.position.z - b.obj.position.z
      );
    }

    // --- lamps: flicker + collection
    for (const lamp of this.lamps) {
      if (lamp.collected) continue;
      const s = 0.5 + Math.sin(this.time * 7 + lamp.phase) * 0.07;
      lamp.flame.scale.setScalar(s);
      if (
        this.mode === "explore" &&
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

    // --- proximity (throttled)
    this.nearTick += dt;
    if (this.nearTick > 0.12 && this.mode === "explore") {
      this.nearTick = 0;
      this.updateNear();
    }

    // --- plate standing detection
    if (this.mode === "battle" && this.plates.length && !this.platesLocked) {
      let focus = -1;
      for (let i = 0; i < this.plates.length; i++) {
        if (this.plates[i].state === "dimmed") continue;
        const d = this.plates[i].pos.distanceTo(this.playerPos);
        if (d < 1.05) {
          focus = i;
          break;
        }
      }
      if (focus !== this.plateFocus) {
        this.plateFocus = focus;
        this.plateTimer = 0;
      }
      for (let i = 0; i < this.plates.length; i++) {
        const p = this.plates[i];
        const lift = i === focus ? 0.3 : 0;
        p.group.position.y +=
          (p.baseY + lift - p.group.position.y) * Math.min(1, dt * 10);
      }
      if (focus >= 0) {
        this.plateTimer += dt;
        if (this.plateTimer >= PLATE_COMMIT_S) {
          this.platesLocked = true;
          this.opts.hooks.onPlateCommit?.(focus);
        }
      }
    }

    // --- effects
    this.effects = this.effects.filter((fx) => fx(dt));

    // --- motes drift upward and wrap around the camera
    const mp = this.motes.geometry.getAttribute("position") as THREE.BufferAttribute;
    const cx = this.camera.position.x;
    const cz = this.camera.position.z;
    for (let i = 0; i < mp.count; i++) {
      let y = mp.getY(i) + dt * 0.32;
      if (y > 14) y = 0;
      mp.setY(i, y);
      // keep motes near the camera
      let x = mp.getX(i);
      let z = mp.getZ(i);
      if (x - cx > 25) x -= 50;
      if (x - cx < -25) x += 50;
      if (z - cz > 25) z -= 50;
      if (z - cz < -25) z += 50;
      mp.setX(i, x);
      mp.setZ(i, z);
    }
    mp.needsUpdate = true;

    // --- camera
    this.updateCamera(dt);
    this.renderer.render(this.scene, this.camera);
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
      } else if (this.shrinePos[zi].distanceTo(p) < 3.6) {
        next = { kind: "shrine", zoneIdx: zi };
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
    let target: THREE.Vector3;
    let yaw = this.camYaw;
    let pitch = this.camPitch;
    let dist = this.camDist;
    if (this.mode === "battle") {
      const c = this.arenaCenter[this.battleZone];
      const b = this.bossPos[this.battleZone];
      target = new THREE.Vector3(
        (this.playerPos.x + b.x) / 2,
        1.5,
        (this.playerPos.z + b.z) / 2
      );
      // hold a stable trial framing: from the player's side, slightly raised
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
    desired.y = Math.max(0.7, desired.y);
    const lerpK = this.mode === "battle" ? Math.min(1, dt * 2.4) : Math.min(1, dt * 7);
    this.camera.position.lerp(desired, lerpK);
    if (this.shake > 0) {
      this.shake = Math.max(0, this.shake - dt * 0.8);
      this.camera.position.x += (Math.random() - 0.5) * this.shake * 0.5;
      this.camera.position.y += (Math.random() - 0.5) * this.shake * 0.5;
    }
    this.camera.lookAt(target);
  }
}
