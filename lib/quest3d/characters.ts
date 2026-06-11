// Sculptural 3D iconography characters for the Pilgrim Road.
//
// Every figure is generated as a one-piece "carved icon": elongated
// Byzantine proportions, lathe-built robes with real drapery folds that
// deepen toward the hem, layered hair and beard locks, icon faces (large
// almond eyes, arched brows, long straight nose), engraved gold halos.
//
// Movement is physical: walking uses two-bone leg IK with planted feet
// (no foot sliding), the body leans into acceleration, cloaks, hems,
// beards and halos carry spring-damper secondary motion, and gestures
// run on anticipation / overshoot / settle envelopes.
//
// No external models or animation data — everything is built in code
// from the corpus' portrait registry.

import * as THREE from "three";
import type {
  PortraitConfig,
  Skin,
  HairColor,
  Vestment,
} from "@/lib/quest/portraits";

// ---------------------------------------------------------------------------
// palettes
// ---------------------------------------------------------------------------

const SKIN_HEX: Record<Skin, string> = {
  pale: "#e9c9a4",
  light: "#d8a878",
  tan: "#b67e54",
  dark: "#7a4e2e",
  shadow: "#3c3650",
};

const HAIR_HEX: Record<HairColor, string> = {
  black: "#241a14",
  brown: "#6a4422",
  gold: "#c89020",
  white: "#e9e1ce",
  gray: "#9c9c9c",
  ginger: "#b8602a",
  none: "#000000",
};

type BodyKind = "robe" | "legs";

type Outfit = {
  kind: BodyKind;
  robe: string;
  robeDeep?: string; // inner / under-tunic showing at cuffs & chest
  trim: string;
  legs?: string;
  boots?: string;
  cape?: string; // physical cloak
  armor?: boolean;
  greatcoat?: boolean; // legged but with a skirted coat
  wraith?: boolean; // the last adversary: hooded, faceless, floating
};

const OUTFITS: Record<Vestment, Outfit> = {
  "monk-brown":      { kind: "robe", robe: "#5b3a1a", robeDeep: "#3c2510", trim: "#c9a227" },
  "monk-black":      { kind: "robe", robe: "#1b1612", robeDeep: "#0e0b08", trim: "#c9a227" },
  "bishop-white":    { kind: "robe", robe: "#eadec2", robeDeep: "#b8a87e", trim: "#c9a227" },
  "bishop-purple":   { kind: "robe", robe: "#41245a", robeDeep: "#2a1538", trim: "#c9a227" },
  "bishop-crimson":  { kind: "robe", robe: "#841a1a", robeDeep: "#5a0e0e", trim: "#f0d358" },
  "imperial-purple": { kind: "robe", robe: "#4b2a64", robeDeep: "#321844", trim: "#f0d358" },
  centurion:         { kind: "legs", robe: "#8e1e1e", trim: "#c9a227", legs: "#9b8b74", boots: "#4a3424", armor: true, cape: "#7c1414" },
  "toga-white":      { kind: "robe", robe: "#e6dabe", robeDeep: "#bcab84", trim: "#7c1414" },
  "modern-hoodie":   { kind: "legs", robe: "#36465f", trim: "#c9a070", legs: "#283349", boots: "#241f1a", cape: "#2c3a52" },
  "modern-shirt-tie":{ kind: "legs", robe: "#e9e1d2", trim: "#1c2e50", legs: "#2e3239", boots: "#1d1b19" },
  "modern-sweater":  { kind: "legs", robe: "#2e2822", trim: "#5a3818", legs: "#3b3631", boots: "#221f1c" },
  "modern-collared": { kind: "legs", robe: "#5c6c92", trim: "#a08060", legs: "#3d3b37", boots: "#26221e" },
  "soviet-tunic":    { kind: "legs", robe: "#41453f", trim: "#7c1414", legs: "#343730", boots: "#15151a", greatcoat: true },
  "deacon-purple":   { kind: "robe", robe: "#2e1844", robeDeep: "#1c0e2c", trim: "#e9e1ce" },
  "cardinal-crimson":{ kind: "robe", robe: "#8e1e1e", robeDeep: "#5e1010", trim: "#f0d358" },
  "papal-white":     { kind: "robe", robe: "#ece4d2", robeDeep: "#c2b48e", trim: "#c9a227" },
  shadow:            { kind: "robe", robe: "#1a1226", robeDeep: "#0d0816", trim: "#7c1414", wraith: true },
  void:              { kind: "robe", robe: "#0d0918", robeDeep: "#060410", trim: "#5c3470", wraith: true },
};

export type GestureName = "cast" | "strike" | "bless" | "die" | "menace";

export type Rig = {
  group: THREE.Group;
  height: number;
  setSpeed(s: number): void;
  gesture(name: GestureName): void;
  flash(): void;
  fadeOut(dur: number): void;
  update(dt: number, time: number): void;
  dispose(): void;
};

// ---------------------------------------------------------------------------
// small physics: critically-tunable damped spring
// ---------------------------------------------------------------------------

class Spring {
  x = 0;
  v = 0;
  constructor(private omega = 10, private zeta = 0.55) {}
  update(target: number, dt: number): number {
    // substep: explicit integration is only stable for small h, and frame
    // times on slow devices can exceed that
    let remaining = Math.min(dt, 0.4);
    while (remaining > 1e-6) {
      const h = Math.min(remaining, 0.03);
      const f = this.omega * this.omega * (target - this.x) - 2 * this.zeta * this.omega * this.v;
      this.v += f * h;
      this.x += this.v * h;
      remaining -= h;
    }
    return this.x;
  }
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

// ---------------------------------------------------------------------------
// materials & geometry helpers
// ---------------------------------------------------------------------------

function clothMat(color: string): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.78,
    metalness: 0.02,
  });
  // icon luminosity: a whisper of light from within
  m.emissive = new THREE.Color(color).multiplyScalar(0.06);
  return m;
}
function skinMat(color: string): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({ color, roughness: 0.62, metalness: 0 });
  m.emissive = new THREE.Color(color).multiplyScalar(0.05);
  return m;
}
function goldMat(emissive = 0.22): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: "#d9b545",
    roughness: 0.28,
    metalness: 1.0,
    emissive: "#8a6a14",
    emissiveIntensity: emissive,
  });
}
function metalMat(color: string): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.36, metalness: 0.9 });
}

function mesh(geo: THREE.BufferGeometry, m: THREE.Material, shadow = true): THREE.Mesh {
  const me = new THREE.Mesh(geo, m);
  me.castShadow = shadow;
  me.receiveShadow = false;
  return me;
}

/**
 * Drapery lathe: revolve a profile and corrugate it with vertical folds
 * that deepen toward the hem — the sculpted-cloth heart of the icon look.
 */
function drapedLathe(
  profile: [number, number][], // [radius, y] from hem (y=0) upward
  folds: number,
  foldDepth: number, // max radial fold amplitude at the hem
  mat: THREE.Material,
  radialSegs = 48
): THREE.Mesh {
  const pts = profile.map(([r, y]) => new THREE.Vector2(r, y));
  const geo = new THREE.LatheGeometry(pts, radialSegs);
  const pos = geo.getAttribute("position") as THREE.BufferAttribute;
  const top = profile[profile.length - 1][1];
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const y = pos.getY(i);
    const r = Math.hypot(x, z);
    if (r < 1e-5) continue;
    const theta = Math.atan2(z, x);
    const hemK = Math.pow(1 - THREE.MathUtils.clamp(y / top, 0, 1), 1.6);
    const fold =
      1 +
      hemK *
        (Math.sin(theta * folds) * foldDepth +
          Math.sin(theta * folds * 2.7 + 1.4) * foldDepth * 0.35);
    pos.setX(i, (x / r) * r * fold);
    pos.setZ(i, (z / r) * r * fold);
  }
  geo.computeVertexNormals();
  return mesh(geo, mat);
}

/** A hair/beard lock: a flattened, tapered strand. */
function lock(
  len: number,
  width: number,
  mat: THREE.Material
): THREE.Mesh {
  const geo = new THREE.CapsuleGeometry(width, len, 3, 6);
  geo.scale(1, 1, 0.55);
  geo.translate(0, -len / 2, 0);
  return mesh(geo, mat, false);
}

// ---------------------------------------------------------------------------
// the head: icon face — large almond eyes, arched brows, long nose
// ---------------------------------------------------------------------------

function buildHead(
  cfg: PortraitConfig,
  R: number, // base head radius
  skin: THREE.MeshStandardMaterial,
  hairM: THREE.MeshStandardMaterial,
  beardM: THREE.MeshStandardMaterial,
  rng: () => number,
  hooded: boolean
): THREE.Group {
  const head = new THREE.Group();

  // skull — elongated oval
  const skull = mesh(new THREE.SphereGeometry(R, 20, 16), skin);
  skull.scale.set(0.92, 1.16, 0.94);
  skull.position.y = R * 1.02;
  head.add(skull);
  // jaw / chin
  const jaw = mesh(new THREE.SphereGeometry(R * 0.74, 16, 12), skin);
  jaw.scale.set(0.86, 0.92, 0.82);
  jaw.position.set(0, R * 0.52, R * 0.1);
  head.add(jaw);
  // neck
  const neck = mesh(new THREE.CylinderGeometry(R * 0.36, R * 0.42, R * 0.9, 10), skin);
  neck.position.y = R * 0.1;
  head.add(neck);

  if (!(OUTFITS[cfg.vestment]?.wraith)) {
    // nose: long straight icon ridge
    const nose = mesh(new THREE.ConeGeometry(R * 0.13, R * 0.62, 4), skin, false);
    nose.rotation.x = Math.PI * 0.52;
    nose.scale.z = 0.62;
    nose.position.set(0, R * 0.92, R * 0.86);
    head.add(nose);

    // eyes: large, almond, dark — set in shallow sockets
    const eyeColor =
      cfg.eyes === "glowing-red"
        ? new THREE.MeshStandardMaterial({ color: "#400a0a", emissive: "#ff3624", emissiveIntensity: 2.6 })
        : new THREE.MeshStandardMaterial({ color: "#2a1c10", roughness: 0.35 });
    const scleraM = new THREE.MeshStandardMaterial({ color: "#e8e0cc", roughness: 0.5 });
    for (const s of [-1, 1]) {
      if (cfg.eyes !== "void") {
        const sclera = mesh(new THREE.SphereGeometry(R * 0.19, 10, 8), scleraM, false);
        sclera.scale.set(1.25, 0.85, 0.5);
        sclera.position.set(s * R * 0.36, R * 1.06, R * 0.78);
        head.add(sclera);
      }
      const iris = mesh(
        new THREE.SphereGeometry(R * (cfg.eyes === "void" ? 0.17 : 0.115), 10, 8),
        cfg.eyes === "void"
          ? new THREE.MeshStandardMaterial({ color: "#050508", roughness: 0.2 })
          : eyeColor,
        false
      );
      iris.scale.set(1, 1, 0.5);
      iris.position.set(s * R * 0.36, R * 1.05, R * 0.87);
      head.add(iris);
      // upper lid line + arched brow
      const lid = mesh(new THREE.TorusGeometry(R * 0.2, R * 0.022, 6, 12, Math.PI * 0.85), skinDarker(skin));
      lid.position.set(s * R * 0.36, R * 1.08, R * 0.84);
      lid.rotation.x = -0.45;
      lid.rotation.z = Math.PI * 0.08 * -s;
      head.add(lid);
      const brow = mesh(
        new THREE.TorusGeometry(R * 0.24, R * 0.035, 6, 12, Math.PI * 0.7),
        cfg.hairColor === "none" ? skinDarker(skin) : hairM,
        false
      );
      brow.position.set(s * R * 0.37, R * 1.22, R * 0.8);
      brow.rotation.x = -0.5;
      brow.rotation.z = Math.PI * 0.12 + (s < 0 ? Math.PI * 0.76 : 0);
      head.add(brow);
    }

    // small solemn mouth
    if (cfg.beard === "none" || cfg.beard === "stubble") {
      const lipM = new THREE.MeshStandardMaterial({ color: "#8a4a3a", roughness: 0.6 });
      const mouth = mesh(new THREE.TorusGeometry(R * 0.13, R * 0.03, 6, 10, Math.PI), lipM, false);
      mouth.position.set(0, R * 0.6, R * 0.78);
      mouth.rotation.x = Math.PI * 0.55;
      mouth.rotation.z = Math.PI;
      head.add(mouth);
    }

    // ears
    if (!hooded && cfg.hairStyle !== "long") {
      for (const s of [-1, 1]) {
        const ear = mesh(new THREE.SphereGeometry(R * 0.16, 8, 6), skin, false);
        ear.scale.set(0.45, 1, 0.7);
        ear.position.set(s * R * 0.88, R * 0.95, R * 0.05);
        head.add(ear);
      }
    }
  } else {
    // wraith: two embers deep in the hood
    for (const s of [-1, 1]) {
      const ember = mesh(
        new THREE.SphereGeometry(R * 0.1, 8, 8),
        new THREE.MeshStandardMaterial({ color: "#1a0a2a", emissive: "#b44dff", emissiveIntensity: 3.2 }),
        false
      );
      ember.position.set(s * R * 0.3, R * 1.0, R * 0.55);
      head.add(ember);
    }
  }

  // hair: layered locks over the scalp
  if (!hooded && cfg.hairColor !== "none" && cfg.hairStyle !== "bald") {
    const isTonsure = cfg.hairStyle === "tonsure";
    const rows = isTonsure ? 1 : 2;
    for (let row = 0; row < rows; row++) {
      const n = 9 + row * 3;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        // leave the face clear
        if (Math.abs(a - Math.PI / 2) < 0.85 && row === 0 && !isTonsure) continue;
        if (isTonsure && row === 0 && Math.abs(a - Math.PI / 2) < 0.7) continue;
        const yBase = isTonsure ? R * 0.95 : R * (1.5 - row * 0.28);
        const lk = lock(R * (0.5 + rng() * 0.3) * (isTonsure ? 0.8 : 1), R * 0.13, hairM);
        const rr = R * (isTonsure ? 0.92 : 0.84 - row * 0.05);
        lk.position.set(Math.cos(a) * rr, yBase, Math.sin(a) * rr * 0.95);
        lk.rotation.z = Math.cos(a) * 0.55;
        lk.rotation.x = -Math.sin(a) * 0.55;
        head.add(lk);
      }
    }
    if (!isTonsure) {
      const cap = mesh(new THREE.SphereGeometry(R * 1.02, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.45), hairM);
      cap.scale.set(0.95, 1.05, 0.97);
      cap.position.y = R * 1.06;
      head.add(cap);
    }
    if (cfg.hairStyle === "long") {
      for (let i = 0; i < 5; i++) {
        const a = Math.PI * (1.18 + i * 0.16);
        const lk = lock(R * (1.7 + rng() * 0.5), R * 0.16, hairM);
        lk.position.set(Math.cos(a) * R * 0.7, R * 1.1, Math.sin(a) * R * 0.75);
        lk.rotation.x = 0.12;
        head.add(lk);
      }
    }
  }

  // beard: rows of locks along the jaw, cascading by length
  if (cfg.beard && cfg.beard !== "none" && cfg.beard !== "stubble") {
    const lenMap = { short: 0.55, long: 1.35, "very-long": 2.2 } as const;
    const L = R * lenMap[cfg.beard];
    const n = 8;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const a = Math.PI * (0.18 + t * 0.64); // across the jaw, frontal
      const cx = Math.cos(a) * R * 0.62;
      const central = 1 - Math.abs(t - 0.5) * 1.5;
      const lk = lock(L * (0.6 + central * 0.45 + rng() * 0.12), R * 0.14, beardM);
      lk.position.set(cx, R * 0.62, R * 0.52 + Math.sin(a) * R * 0.18);
      lk.rotation.z = -cx * 0.5;
      lk.rotation.x = 0.18;
      lk.userData.beardLock = true;
      lk.userData.baseRX = lk.rotation.x;
      head.add(lk);
    }
    // moustache
    for (const s of [-1, 1]) {
      const mo = lock(R * 0.42, R * 0.09, beardM);
      mo.position.set(s * R * 0.14, R * 0.72, R * 0.8);
      mo.rotation.z = s * 0.5;
      mo.rotation.x = 0.3;
      mo.userData.beardLock = true;
      mo.userData.baseRX = mo.rotation.x;
      head.add(mo);
    }
  } else if (cfg.beard === "stubble") {
    const st = mesh(new THREE.SphereGeometry(R * 0.72, 12, 10), beardDim(beardM), false);
    st.scale.set(0.88, 0.8, 0.8);
    st.position.set(0, R * 0.55, R * 0.12);
    head.add(st);
  }

  return head;
}

function skinDarker(skin: THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  const m = skin.clone();
  m.color = skin.color.clone().multiplyScalar(0.55);
  return m;
}
function beardDim(beard: THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  const m = beard.clone();
  m.transparent = true;
  m.opacity = 0.35;
  return m;
}

// ---------------------------------------------------------------------------
// headwear
// ---------------------------------------------------------------------------

function buildHeadwear(cfg: PortraitConfig, R: number): THREE.Object3D[] {
  const out: THREE.Object3D[] = [];
  const top = R * 2.05;
  switch (cfg.headwear) {
    case "mitre": {
      const m = mesh(new THREE.SphereGeometry(R * 1.06, 14, 12, 0, Math.PI * 2, 0, Math.PI * 0.52), goldMat(0.3));
      m.scale.set(1, 1.5, 1);
      m.position.y = top - R * 0.2;
      const band = mesh(new THREE.TorusGeometry(R * 1.02, R * 0.07, 8, 20), metalMat("#8a1414"));
      band.rotation.x = Math.PI / 2;
      band.position.y = top - R * 0.18;
      const cz = buildMiniCross(R * 0.5, goldMat(0.5));
      cz.position.y = top + R * 1.45;
      out.push(m, band, cz);
      break;
    }
    case "skufia": {
      const m = mesh(new THREE.ConeGeometry(R * 1.0, R * 1.0, 4), clothMat("#15110d"));
      m.rotation.y = Math.PI / 4;
      m.position.y = top + R * 0.1;
      out.push(m);
      break;
    }
    case "klobuk": {
      const dome = mesh(new THREE.CylinderGeometry(R * 0.98, R * 1.04, R * 1.15, 14), clothMat("#0d0a08"));
      dome.position.y = top + R * 0.18;
      const brim = mesh(new THREE.TorusGeometry(R * 1.0, R * 0.09, 8, 18), clothMat("#0d0a08"));
      brim.rotation.x = Math.PI / 2;
      brim.position.y = top - R * 0.32;
      const veil = drapedLathe(
        [
          [R * 1.45, 0],
          [R * 1.25, R * 0.9],
          [R * 0.95, R * 1.7],
        ],
        7,
        0.12,
        clothMat("#0d0a08"),
        24
      );
      veil.position.y = top - R * 1.5;
      // open the veil at the face
      out.push(dome, brim, veil);
      break;
    }
    case "tiara": {
      const body = mesh(new THREE.CylinderGeometry(R * 0.62, R * 1.0, R * 1.7, 14), clothMat("#ece4d2"));
      body.position.y = top + R * 0.6;
      out.push(body);
      for (let i = 0; i < 3; i++) {
        const crown = mesh(new THREE.TorusGeometry(R * (0.96 - i * 0.14), R * 0.08, 8, 18), goldMat(0.3));
        crown.rotation.x = Math.PI / 2;
        crown.position.y = top + R * (0.12 + i * 0.55);
        out.push(crown);
      }
      const orb = mesh(new THREE.SphereGeometry(R * 0.14, 8, 8), goldMat(0.4));
      orb.position.y = top + R * 1.6;
      out.push(orb);
      break;
    }
    case "galero": {
      const brim = mesh(new THREE.CylinderGeometry(R * 2.2, R * 2.3, R * 0.1, 20), clothMat("#8e1e1e"));
      brim.position.y = top - R * 0.1;
      const crown = mesh(new THREE.SphereGeometry(R * 0.85, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2), clothMat("#8e1e1e"));
      crown.position.y = top - R * 0.1;
      out.push(brim, crown);
      break;
    }
    case "stemma": {
      const band = mesh(new THREE.CylinderGeometry(R * 1.04, R * 1.04, R * 0.6, 16), goldMat(0.4));
      band.position.y = top - R * 0.05;
      out.push(band);
      for (let i = 0; i < 6; i++) {
        const gem = mesh(
          new THREE.SphereGeometry(R * 0.1, 6, 6),
          new THREE.MeshStandardMaterial({ color: i % 2 ? "#7c1430" : "#1e4488", roughness: 0.15, metalness: 0.2, emissive: i % 2 ? "#400818" : "#0c2048", emissiveIntensity: 0.6 })
        );
        const a = (i / 6) * Math.PI * 2;
        gem.position.set(Math.cos(a) * R * 1.05, top - R * 0.05, Math.sin(a) * R * 1.05);
        out.push(gem);
      }
      const arc = mesh(new THREE.TorusGeometry(R * 0.8, R * 0.06, 6, 14, Math.PI), goldMat(0.4));
      arc.position.y = top + R * 0.2;
      out.push(arc);
      // prependoulia — pearl strings at the temples
      for (const s of [-1, 1]) {
        for (let p = 0; p < 4; p++) {
          const pearl = mesh(new THREE.SphereGeometry(R * 0.05, 6, 6), clothMat("#e8e0d0"), false);
          pearl.position.set(s * R * 0.95, top - R * (0.5 + p * 0.22), R * 0.2);
          out.push(pearl);
        }
      }
      break;
    }
    case "helmet": {
      const dome = mesh(new THREE.SphereGeometry(R * 1.12, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.62), metalMat("#a8acb4"));
      dome.position.y = top - R * 0.85;
      // curved horsehair crest
      const crestCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, top - R * 0.2, R * 0.85),
        new THREE.Vector3(0, top + R * 0.5, R * 0.1),
        new THREE.Vector3(0, top + R * 0.25, -R * 0.85),
        new THREE.Vector3(0, top - R * 0.5, -R * 1.25),
      ]);
      const crest = mesh(new THREE.TubeGeometry(crestCurve, 12, R * 0.16, 6), clothMat("#a82020"));
      crest.scale.x = 0.45;
      // cheek guards
      out.push(dome, crest);
      for (const s of [-1, 1]) {
        const cheek = mesh(new THREE.BoxGeometry(R * 0.12, R * 0.7, R * 0.55), metalMat("#9aa0a8"));
        cheek.position.set(s * R * 0.92, R * 0.95, R * 0.25);
        out.push(cheek);
      }
      break;
    }
    case "ushanka": {
      const cap = mesh(new THREE.CylinderGeometry(R * 1.04, R * 1.1, R * 0.7, 14), clothMat("#363a33"));
      cap.position.y = top - R * 0.05;
      const crownTop = mesh(new THREE.SphereGeometry(R * 1.04, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.4), clothMat("#3c4038"));
      crownTop.position.y = top + R * 0.18;
      const brim = mesh(new THREE.BoxGeometry(R * 1.15, R * 0.09, R * 0.62), clothMat("#1c1c20"));
      brim.position.set(0, top - R * 0.36, R * 0.92);
      brim.rotation.x = -0.12;
      const star = mesh(
        new THREE.CylinderGeometry(R * 0.15, R * 0.15, R * 0.05, 5),
        new THREE.MeshStandardMaterial({ color: "#c02020", emissive: "#801010", emissiveIntensity: 1.2 })
      );
      star.rotation.x = Math.PI / 2;
      star.position.set(0, top - R * 0.05, R * 1.06);
      out.push(cap, crownTop, brim, star);
      break;
    }
    case "laurel":
    case "imperial-laurel": {
      const wreath = mesh(new THREE.TorusGeometry(R * 1.0, R * 0.09, 6, 18), clothMat("#4a6c2a"));
      wreath.rotation.x = Math.PI / 2.25;
      wreath.position.y = top - R * 0.55;
      out.push(wreath);
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        const leaf = mesh(new THREE.SphereGeometry(R * 0.12, 6, 4), clothMat("#5a8c3a"), false);
        leaf.scale.set(0.5, 1.3, 0.3);
        leaf.position.set(Math.cos(a) * R * 1.0, top - R * 0.55 + Math.sin(a) * R * 0.12, Math.sin(a) * R * 0.95);
        leaf.rotation.z = a;
        out.push(leaf);
      }
      break;
    }
    default:
      break;
  }
  return out;
}

function buildMiniCross(size: number, m: THREE.Material): THREE.Group {
  const g = new THREE.Group();
  const t = size * 0.14;
  const v = mesh(new THREE.BoxGeometry(t, size, t), m);
  const h = mesh(new THREE.BoxGeometry(size * 0.66, t, t), m);
  h.position.y = size * 0.22;
  g.add(v, h);
  return g;
}

// ---------------------------------------------------------------------------
// the rig
// ---------------------------------------------------------------------------

class CharacterRig implements Rig {
  group = new THREE.Group();
  height: number;

  // joints
  private pelvis = new THREE.Group();
  private spine = new THREE.Group();
  private chest = new THREE.Group();
  private headG = new THREE.Group();
  private shoulderL = new THREE.Group();
  private shoulderR = new THREE.Group();
  private elbowL = new THREE.Group();
  private elbowR = new THREE.Group();
  private hipL?: THREE.Group;
  private hipR?: THREE.Group;
  private kneeL?: THREE.Group;
  private kneeR?: THREE.Group;
  private footL?: THREE.Group;
  private footR?: THREE.Group;
  private robeG?: THREE.Group;
  private capeG?: THREE.Group;
  private halo?: THREE.Group;

  // physique
  private kind: BodyKind;
  private wraith: boolean;
  private legUpper = 0;
  private legLower = 0;
  private pelvisY: number;

  // motion state
  private speedIntent = 0;
  private vel = new THREE.Vector3();
  private prevWorld = new THREE.Vector3();
  private hasPrev = false;
  private smoothedSpeed = 0;
  private accel = new THREE.Vector3();
  private prevVel = new THREE.Vector3();
  private phase = Math.random() * 10;
  private idleSeed = Math.random() * 7;

  // springs (secondary motion)
  private leanS = new Spring(9, 0.7);
  private rollS = new Spring(9, 0.7);
  private hemS = new Spring(7, 0.45);
  private capeS = new Spring(6.5, 0.4);
  private bobS = new Spring(16, 0.5);
  private beardS = new Spring(8, 0.35);
  private beardParts: THREE.Object3D[] = [];

  // gestures
  private gestureName: GestureName | null = null;
  private gestureT = 0;

  // fx
  private flashT = 0;
  private fade = -1;
  private fadeDur = 1;
  private mats: THREE.MeshStandardMaterial[] = [];
  private baseEmissive: { c: THREE.Color; i: number }[] = [];

  constructor(cfg: PortraitConfig, opts?: { height?: number; hairHex?: string; seed?: number }) {
    const H = opts?.height ?? 1.9;
    this.height = H;
    const rng = mulberry32(opts?.seed ?? 0xc0ffee);
    const outfit = OUTFITS[cfg.vestment] ?? OUTFITS["monk-brown"];
    this.kind = outfit.kind;
    this.wraith = !!outfit.wraith;

    const skin = skinMat(SKIN_HEX[cfg.skin] ?? SKIN_HEX.light);
    const hairM = clothMat(opts?.hairHex ?? HAIR_HEX[cfg.hairColor] ?? "#6a4422");
    hairM.roughness = 0.6;
    const beardM = clothMat(HAIR_HEX[cfg.beardColor ?? cfg.hairColor] ?? "#9c9c9c");
    beardM.roughness = 0.62;
    const robeM = clothMat(outfit.robe);
    const robeDeepM = clothMat(outfit.robeDeep ?? outfit.robe);
    const trimM = goldMat(0.18);
    trimM.color = new THREE.Color(outfit.trim);

    // icon canon: small head, long body
    const headR = H * 0.082;
    const legLen = H * 0.5;
    const torsoLen = H * 0.34;
    this.legUpper = legLen * 0.52;
    this.legLower = legLen * 0.48;
    this.pelvisY = this.kind === "legs" ? legLen : legLen * 0.98;

    this.pelvis.position.y = this.pelvisY;
    this.group.add(this.pelvis);
    this.pelvis.add(this.spine);
    this.spine.add(this.chest);
    this.chest.position.y = torsoLen * 0.55;

    // ---- torso
    if (outfit.armor) {
      // segmented cuirass
      const cuirass = mesh(new THREE.CapsuleGeometry(H * 0.105, torsoLen * 0.5, 4, 12), metalMat("#aab0b8"));
      cuirass.scale.z = 0.78;
      cuirass.position.y = torsoLen * 0.05;
      this.chest.add(cuirass);
      for (let i = 0; i < 3; i++) {
        const bandT = mesh(new THREE.TorusGeometry(H * 0.105, H * 0.014, 8, 18), metalMat("#8e949c"));
        bandT.rotation.x = Math.PI / 2;
        bandT.scale.z = 0.8;
        bandT.position.y = -torsoLen * (0.05 + i * 0.12);
        this.chest.add(bandT);
      }
      // pteruges skirt
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        const strap = mesh(new THREE.BoxGeometry(H * 0.045, H * 0.13, H * 0.012), clothMat("#7c1414"));
        strap.position.set(Math.cos(a) * H * 0.1, -torsoLen * 0.42, Math.sin(a) * H * 0.085);
        strap.rotation.y = -a + Math.PI / 2;
        this.chest.add(strap);
      }
    } else {
      const chestM = mesh(new THREE.CapsuleGeometry(H * 0.098, torsoLen * 0.52, 4, 12), robeM);
      chestM.scale.z = 0.8;
      chestM.position.y = torsoLen * 0.02;
      this.chest.add(chestM);
    }

    // ---- lower body
    if (this.kind === "robe") {
      this.robeG = new THREE.Group();
      const robe = drapedLathe(
        [
          [H * 0.155, 0],
          [H * 0.15, H * 0.08],
          [H * 0.125, legLen * 0.45],
          [H * 0.105, legLen * 0.85],
          [H * 0.095, legLen * 1.05],
        ],
        9,
        0.16,
        robeM
      );
      robe.receiveShadow = true;
      this.robeG.position.y = -this.pelvisY + 0.02;
      this.robeG.add(robe);
      // hem trim
      const hem = mesh(new THREE.TorusGeometry(H * 0.152, H * 0.008, 6, 36), trimM, false);
      hem.rotation.x = Math.PI / 2;
      hem.position.y = H * 0.035;
      this.robeG.add(hem);
      this.pelvis.add(this.robeG);

      // phelonion cape for bishops (a second, shorter drapery bell)
      if (cfg.vestment.startsWith("bishop") || cfg.vestment === "papal-white" || cfg.vestment === "cardinal-crimson" || cfg.vestment === "imperial-purple") {
        const phelonion = drapedLathe(
          [
            [H * 0.135, 0],
            [H * 0.12, H * 0.14],
            [H * 0.085, H * 0.3],
            [H * 0.05, H * 0.4],
          ],
          7,
          0.12,
          robeDeepM
        );
        phelonion.position.y = -torsoLen * 0.45;
        this.chest.add(phelonion);
        // omophorion / pallium: white stole down the front with crosses
        const stole = mesh(new THREE.BoxGeometry(H * 0.052, legLen * 0.95, H * 0.014), clothMat("#e9e1ce"));
        stole.position.set(0, -legLen * 0.32, H * 0.12);
        this.chest.add(stole);
        for (let i = 0; i < 3; i++) {
          const cx = buildMiniCross(H * 0.035, metalMat("#5a1010"));
          cx.position.set(0, -legLen * (0.12 + i * 0.2), H * 0.13);
          this.chest.add(cx);
        }
      }
      if (this.wraith) {
        // tattered hem: hang dark streamers off the robe
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2;
          const rag = lock(H * (0.12 + rng() * 0.1), H * 0.02, robeDeepM);
          rag.position.set(Math.cos(a) * H * 0.14, H * 0.07, Math.sin(a) * H * 0.14);
          this.robeG.add(rag);
        }
      }
    } else {
      const legM = clothMat(outfit.legs ?? "#33363c");
      const bootM = clothMat(outfit.boots ?? "#221f1c");
      bootM.roughness = 0.45;
      for (const side of [-1, 1] as const) {
        const hip = new THREE.Group();
        hip.position.set(side * H * 0.06, 0, 0);
        const thigh = mesh(new THREE.CapsuleGeometry(H * 0.047, this.legUpper * 0.62, 3, 10), legM);
        thigh.position.y = -this.legUpper * 0.5;
        hip.add(thigh);
        const knee = new THREE.Group();
        knee.position.y = -this.legUpper;
        const shin = mesh(new THREE.CapsuleGeometry(H * 0.038, this.legLower * 0.6, 3, 10), legM);
        shin.position.y = -this.legLower * 0.5;
        knee.add(shin);
        const foot = new THREE.Group();
        foot.position.y = -this.legLower;
        const boot = mesh(new THREE.BoxGeometry(H * 0.075, H * 0.045, H * 0.15), bootM);
        boot.position.set(0, H * 0.012, H * 0.035);
        foot.add(boot);
        knee.add(foot);
        hip.add(knee);
        this.pelvis.add(hip);
        if (side < 0) { this.hipL = hip; this.kneeL = knee; this.footL = foot; }
        else { this.hipR = hip; this.kneeR = knee; this.footR = foot; }
      }
      if (outfit.greatcoat) {
        // knee-length skirted coat over the legs
        const coat = drapedLathe(
          [
            [H * 0.13, 0],
            [H * 0.12, H * 0.1],
            [H * 0.1, legLen * 0.5],
          ],
          8,
          0.1,
          robeM
        );
        coat.position.y = -legLen * 0.5;
        this.pelvis.add(coat);
        const belt = mesh(new THREE.TorusGeometry(H * 0.1, H * 0.012, 6, 18), clothMat("#1c1a16"));
        belt.rotation.x = Math.PI / 2;
        belt.position.y = -H * 0.005;
        this.pelvis.add(belt);
      }
    }

    // ---- cape (physical cloth pendulum)
    if (outfit.cape) {
      this.capeG = new THREE.Group();
      const cape = drapedLathe(
        [
          [H * 0.17, 0],
          [H * 0.14, H * 0.3],
          [H * 0.075, H * 0.62],
          [H * 0.05, H * 0.72],
        ],
        6,
        0.14,
        clothMat(outfit.cape),
        32
      );
      // half-shell: open at the front
      const cp = cape.geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < cp.count; i++) {
        if (cp.getZ(i) > H * 0.02) cp.setZ(i, cp.getZ(i) * 0.18);
      }
      cape.geometry.computeVertexNormals();
      cape.position.y = -H * 0.66;
      this.capeG.add(cape);
      this.capeG.position.y = torsoLen * 0.62;
      this.chest.add(this.capeG);
    }

    // ---- head
    this.headG.position.y = torsoLen * 0.62;
    const hooded = cfg.headwear === "hood-shadow" || cfg.headwear === "void-shadow";
    const head = buildHead(cfg, headR, skin, hairM, beardM, rng, hooded);
    this.headG.add(head);
    for (const hw of buildHeadwear(cfg, headR)) this.headG.add(hw);
    if (hooded) {
      const hood = drapedLathe(
        [
          [headR * 1.5, 0],
          [headR * 1.35, headR * 1.1],
          [headR * 0.9, headR * 2.2],
          [headR * 0.2, headR * 2.6],
        ],
        6,
        0.1,
        clothMat(this.wraith ? "#120c20" : "#181024"),
        24
      );
      hood.position.y = -headR * 0.2;
      this.headG.add(hood);
    }
    this.chest.add(this.headG);
    head.traverse((o) => {
      if (o.userData.beardLock) this.beardParts.push(o);
    });

    // halo: engraved vertical gold disc behind the head
    if (cfg.headwear === "halo" || cfg.headwear === "halo-bright") {
      const bright = cfg.headwear === "halo-bright";
      this.halo = new THREE.Group();
      const disc = mesh(
        new THREE.CircleGeometry(headR * (bright ? 2.3 : 2.0), 36),
        goldMat(bright ? 0.85 : 0.55),
        false
      );
      const rim = mesh(new THREE.TorusGeometry(headR * (bright ? 2.3 : 2.0), headR * 0.07, 8, 36), goldMat(0.4), false);
      const engraved = mesh(new THREE.TorusGeometry(headR * (bright ? 1.75 : 1.5), headR * 0.03, 6, 32), metalMat("#8a6a14"), false);
      this.halo.add(disc, rim, engraved);
      this.halo.position.set(0, headR * 1.15, -headR * 0.85);
      this.headG.add(this.halo);
    }

    // ---- arms
    const armLen = H * 0.28;
    const sleeveM = outfit.armor ? skin : robeM;
    for (const side of [-1, 1] as const) {
      const shoulder = new THREE.Group();
      shoulder.position.set(side * H * 0.115, torsoLen * 0.52, 0);
      const upper = mesh(new THREE.CapsuleGeometry(H * 0.04, armLen * 0.52, 3, 10), sleeveM);
      upper.position.y = -armLen * 0.5;
      shoulder.add(upper);
      const elbow = new THREE.Group();
      elbow.position.y = -armLen;
      const fore = mesh(
        new THREE.CapsuleGeometry(H * 0.034, armLen * 0.46, 3, 10),
        this.kind === "robe" ? sleeveM : outfit.armor ? skin : sleeveM
      );
      fore.position.y = -armLen * 0.42;
      elbow.add(fore);
      if (this.kind === "robe") {
        // trumpet cuff with under-tunic showing
        const cuff = mesh(new THREE.ConeGeometry(H * 0.062, armLen * 0.34, 12, 1, true), robeDeepM);
        cuff.rotation.x = Math.PI;
        cuff.position.y = -armLen * 0.78;
        elbow.add(cuff);
      }
      // mitten hand with thumb
      const hand = new THREE.Group();
      hand.position.y = -armLen * 0.95;
      const palm = mesh(new THREE.CapsuleGeometry(H * 0.026, H * 0.035, 3, 8), skin, false);
      palm.scale.z = 0.7;
      const thumb = mesh(new THREE.CapsuleGeometry(H * 0.011, H * 0.02, 2, 6), skin, false);
      thumb.position.set(side * -H * 0.02, H * 0.005, H * 0.015);
      thumb.rotation.z = side * 0.7;
      hand.add(palm, thumb);
      elbow.add(hand);
      shoulder.add(elbow);
      this.chest.add(shoulder);
      if (side < 0) { this.shoulderL = shoulder; this.elbowL = elbow; }
      else { this.shoulderR = shoulder; this.elbowR = elbow; }
    }

    // ---- held symbol
    this.buildProp(cfg, H, trimM);

    // collect materials for flash/fade
    this.group.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      if (m && m.isMeshStandardMaterial && !this.mats.includes(m)) {
        this.mats.push(m);
        this.baseEmissive.push({ c: m.emissive.clone(), i: m.emissiveIntensity });
      }
    });
  }

  private buildProp(cfg: PortraitConfig, H: number, trimM: THREE.Material) {
    const at = -H * 0.28 * 0.95;
    const hand = this.elbowR;
    const sym = cfg.symbol;
    if (sym === "cross") {
      const g = new THREE.Group();
      const v = mesh(new THREE.BoxGeometry(0.022, H * 0.36, 0.022), goldMat(0.4));
      const h1 = mesh(new THREE.BoxGeometry(H * 0.13, 0.022, 0.022), goldMat(0.4));
      h1.position.y = H * 0.1;
      const h2 = mesh(new THREE.BoxGeometry(H * 0.08, 0.018, 0.018), goldMat(0.4));
      h2.position.y = -H * 0.05;
      h2.rotation.z = 0.45;
      g.add(v, h1, h2);
      g.position.set(0, at + H * 0.1, H * 0.04);
      hand.add(g);
    } else if (sym === "book") {
      const b = mesh(new THREE.BoxGeometry(H * 0.12, H * 0.16, H * 0.04), clothMat("#6a1212"));
      const edge = mesh(new THREE.BoxGeometry(H * 0.105, H * 0.145, H * 0.042), clothMat("#e0d4ae"), false);
      edge.position.x = H * 0.004;
      const cr = buildMiniCross(H * 0.06, goldMat(0.4));
      cr.position.z = H * 0.022;
      cr.position.y = -H * 0.02;
      b.add(edge, cr);
      b.position.set(0, at, H * 0.06);
      b.rotation.x = -0.5;
      hand.add(b);
    } else if (sym === "scroll") {
      const s = mesh(new THREE.CylinderGeometry(H * 0.02, H * 0.02, H * 0.2, 10), clothMat("#e6dabe"));
      const cap1 = mesh(new THREE.CylinderGeometry(H * 0.026, H * 0.026, H * 0.012, 10), clothMat("#b8a87e"), false);
      cap1.position.y = H * 0.1;
      const cap2 = cap1.clone();
      cap2.position.y = -H * 0.1;
      s.add(cap1, cap2);
      s.rotation.z = Math.PI / 2.4;
      s.position.set(0, at, H * 0.04);
      hand.add(s);
    } else if (sym === "sword") {
      const sw = new THREE.Group();
      const blade = mesh(new THREE.BoxGeometry(0.016, H * 0.44, 0.05), metalMat("#cfd4dc"));
      blade.position.y = -H * 0.17;
      const tip = mesh(new THREE.ConeGeometry(0.026, H * 0.06, 4), metalMat("#cfd4dc"));
      tip.rotation.x = Math.PI;
      tip.rotation.y = Math.PI / 4;
      tip.position.y = -H * 0.42;
      const guard = mesh(new THREE.BoxGeometry(H * 0.085, 0.018, 0.045), goldMat(0.3));
      const grip = mesh(new THREE.CylinderGeometry(0.014, 0.014, H * 0.07, 8), clothMat("#3a2410"));
      grip.position.y = H * 0.045;
      const pommel = mesh(new THREE.SphereGeometry(0.022, 8, 8), goldMat(0.3));
      pommel.position.y = H * 0.085;
      sw.add(blade, tip, guard, grip, pommel);
      sw.position.set(0, at, H * 0.02);
      sw.rotation.x = Math.PI * 0.5;
      hand.add(sw);
    } else if (sym === "chains") {
      for (let i = 0; i < 4; i++) {
        const link = mesh(new THREE.TorusGeometry(H * 0.026, H * 0.007, 6, 12), metalMat("#787880"), false);
        link.position.set(0, at + i * H * 0.04, 0);
        link.rotation.x = (i % 2) * Math.PI * 0.5;
        link.rotation.y = i * 0.3;
        hand.add(link);
      }
    } else if (sym === "flame") {
      const f = mesh(
        new THREE.ConeGeometry(H * 0.035, H * 0.11, 8),
        new THREE.MeshStandardMaterial({ color: "#f0c060", emissive: "#ffae34", emissiveIntensity: 2.6 }),
        false
      );
      f.position.set(0, at + H * 0.06, 0);
      hand.add(f);
    } else if (sym === "icon") {
      const p = mesh(new THREE.BoxGeometry(H * 0.13, H * 0.17, H * 0.02), goldMat(0.3));
      const inner = mesh(new THREE.BoxGeometry(H * 0.095, H * 0.13, H * 0.022), clothMat("#3a2818"), false);
      const fig = mesh(new THREE.CapsuleGeometry(H * 0.014, H * 0.04, 2, 6), clothMat("#7c1414"), false);
      fig.position.z = H * 0.013;
      p.add(inner, fig);
      p.position.set(0, at, H * 0.05);
      p.rotation.x = -0.4;
      hand.add(p);
    }
    void trimM;
  }

  // ---- public controls -------------------------------------------------------

  setSpeed(s: number) {
    this.speedIntent = THREE.MathUtils.clamp(s, 0, 1.4);
  }
  gesture(name: GestureName) {
    this.gestureName = name;
    this.gestureT = 0;
  }
  flash() {
    this.flashT = 0.32;
  }
  fadeOut(dur: number) {
    this.fade = 0;
    this.fadeDur = dur;
    for (const m of this.mats) {
      m.transparent = true;
      m.depthWrite = false;
    }
  }

  // ---- animation --------------------------------------------------------------

  update(dt: number, time: number) {
    if (dt <= 0) return;
    // derive true velocity / acceleration from world motion
    const w = this.group.position;
    if (this.hasPrev) {
      const nv = w.clone().sub(this.prevWorld).divideScalar(dt);
      this.accel.copy(nv).sub(this.prevVel).divideScalar(Math.max(dt, 1 / 120));
      this.prevVel.copy(this.vel);
      this.vel.lerp(nv, Math.min(1, dt * 14));
    }
    this.prevWorld.copy(w);
    this.hasPrev = true;
    const speed = this.vel.length();
    this.smoothedSpeed = THREE.MathUtils.lerp(
      this.smoothedSpeed,
      Math.max(speed / 5.4, this.speedIntent * 0.0),
      Math.min(1, dt * 10)
    );
    const s = THREE.MathUtils.clamp(this.smoothedSpeed, 0, 1.2);
    const walking = s > 0.06;

    // local-frame acceleration (for lean) — into facing space
    const yaw = this.group.rotation.y;
    const ax = this.accel.x * Math.cos(-yaw) - this.accel.z * Math.sin(-yaw);
    const az = this.accel.x * Math.sin(-yaw) + this.accel.z * Math.cos(-yaw);
    const lean = this.leanS.update(THREE.MathUtils.clamp(az * 0.012 + s * 0.1, -0.22, 0.3), dt);
    const roll = this.rollS.update(THREE.MathUtils.clamp(-ax * 0.01, -0.16, 0.16), dt);

    // stride
    const stepRate = 2.1 + s * 6.2;
    this.phase += dt * stepRate * (walking ? 1 : 0);
    const p = this.phase * Math.PI;
    const idle = Math.sin(time * 1.6 + this.idleSeed);
    const idle2 = Math.sin(time * 0.43 + this.idleSeed * 2.1);

    // body carriage
    const bobTarget = walking ? Math.abs(Math.sin(p)) * 0.05 * s : 0;
    const bob = this.bobS.update(bobTarget, dt);
    const floatY = this.wraith ? 0.12 + Math.sin(time * 1.1 + this.idleSeed) * 0.05 : 0;
    this.pelvis.position.y = this.pelvisY + bob + (walking ? 0 : 0.006 * idle) + floatY;
    this.pelvis.rotation.y = walking ? Math.sin(p) * 0.07 * s : 0;
    this.spine.rotation.x = lean + (walking ? 0.03 * s : 0.012 * idle);
    this.spine.rotation.z = roll + (walking ? 0 : 0.008 * idle2);
    this.chest.rotation.y = walking ? -Math.sin(p) * 0.1 * s : 0.03 * idle2;
    // head: stays level and looks where it's going
    this.headG.rotation.x = -lean * 0.7 + (walking ? 0.02 : 0.018 * idle);
    this.headG.rotation.y = walking ? -this.chest.rotation.y * 0.6 : 0.16 * Math.sin(time * 0.31 + this.idleSeed);
    this.headG.rotation.z = -roll * 0.5;

    // arms: swing with elbow drag, or hold a prop calmly
    let armL = walking ? Math.sin(p) * 0.5 * s : 0.07 + 0.025 * idle;
    let armR = walking ? -Math.sin(p) * 0.5 * s : 0.07 + 0.025 * Math.sin(time * 1.6 + 2);
    let elbL = 0.32 + (walking ? Math.max(0, -Math.sin(p - 0.6)) * 0.42 * s : 0);
    let elbR = 0.32 + (walking ? Math.max(0, Math.sin(p - 0.6)) * 0.42 * s : 0);
    let armROut = 0.1;
    let armLOut = 0.1;

    // gestures with anticipation → action → settle
    if (this.gestureName) {
      this.gestureT += dt;
      const t = this.gestureT;
      const ease = (a: number, b: number) => THREE.MathUtils.smoothstep(t, a, b);
      if (this.gestureName === "cast") {
        const wind = ease(0, 0.42);
        const hurl = ease(0.42, 0.68);
        const settle = ease(0.95, 1.3);
        armR = -2.7 * wind + 3.4 * hurl - 0.7 * settle;
        elbR = 1.1 * wind * (1 - hurl) + 0.3;
        armROut = 0.45 * wind;
        this.chest.rotation.y += 0.5 * wind - 0.9 * hurl + 0.4 * settle;
        this.spine.rotation.x += -0.1 * wind + 0.22 * hurl - 0.12 * settle;
        if (t > 1.35) this.gestureName = null;
      } else if (this.gestureName === "strike") {
        const wind = ease(0, 0.28);
        const sw = ease(0.28, 0.5);
        const settle = ease(0.75, 1.05);
        armR = -2.3 * wind + 3.1 * sw - 0.8 * settle;
        armROut = 0.55 * wind * (1 - sw * 0.5);
        elbR = 0.8 * wind * (1 - sw) + 0.3;
        this.chest.rotation.y += 0.42 * wind - 0.8 * sw + 0.38 * settle;
        if (t > 1.1) this.gestureName = null;
      } else if (this.gestureName === "bless") {
        const up = ease(0, 0.55) * (1 - ease(1.9, 2.5));
        armR = -2.1 * up;
        elbR = 0.55 * up + 0.3;
        armROut = 0.28 * up;
        this.headG.rotation.x += -0.08 * up;
        if (t > 2.6) this.gestureName = null;
      } else if (this.gestureName === "menace") {
        const k = ease(0, 0.9) * (1 - ease(2.2, 3.0));
        armL = 0.4 * k;
        armR = 0.4 * k;
        armLOut = 1.15 * k;
        armROut = 1.15 * k;
        elbL = 0.5 * k + 0.3;
        elbR = 0.5 * k + 0.3;
        this.spine.rotation.x += 0.1 * k;
        if (t > 3.1) this.gestureName = null;
      } else if (this.gestureName === "die") {
        const k = ease(0, 0.4) * 0.3 + ease(0.4, 1.2) * 0.7; // crumple then fall
        this.group.rotation.x = -1.5 * k;
        this.pelvis.position.y = this.pelvisY * (1 - 0.45 * k) + floatY;
        armL = 1.1 * k;
        armR = 1.4 * k;
        this.headG.rotation.x = 0.5 * k;
      }
    }

    this.shoulderL.rotation.x = armL;
    this.shoulderR.rotation.x = armR;
    this.shoulderL.rotation.z = armLOut;
    this.shoulderR.rotation.z = -armROut;
    this.elbowL.rotation.x = -elbL;
    this.elbowR.rotation.x = -elbR;

    // legs: two-bone IK with planted feet
    if (this.hipL && this.hipR && this.kneeL && this.kneeR) {
      const strideHalf = 0.34 * Math.min(1, s * 1.4) * this.height * 0.5;
      const liftH = 0.1 * Math.min(1, s * 1.5) * this.height * 0.5;
      this.solveLeg(this.hipL, this.kneeL, this.footL!, p, strideHalf, liftH, walking, dt);
      this.solveLeg(this.hipR, this.kneeR, this.footR!, p + Math.PI, strideHalf, liftH, walking, dt);
    }

    // drapery & cape physics
    if (this.robeG) {
      const sway = this.hemS.update(walking ? Math.sin(p) * 0.05 * s : 0.01 * idle, dt);
      this.robeG.rotation.z = sway;
      this.robeG.rotation.x = this.hemS.x * 0.4 - lean * 0.35 + (walking ? s * 0.05 : 0);
    }
    if (this.capeG) {
      const capeTarget = -s * 0.55 - THREE.MathUtils.clamp(az * 0.02, -0.3, 0.3);
      this.capeG.rotation.x = this.capeS.update(capeTarget, dt) + 0.08 + 0.02 * idle;
      this.capeG.rotation.z = roll * 1.6;
    }
    // beard lag
    const beardK = this.beardS.update(lean * 1.4 + (walking ? Math.sin(p) * 0.04 * s : 0.015 * idle), dt);
    for (const b of this.beardParts) {
      b.rotation.x = (b.userData.baseRX as number) + beardK * 0.8;
    }

    if (this.halo) {
      this.halo.rotation.z = time * 0.25;
      this.halo.position.y = this.height * 0.082 * 1.15 + Math.sin(time * 1.3 + this.idleSeed) * 0.008;
    }

    // hit flash
    if (this.flashT > 0) {
      this.flashT -= dt;
      const k = Math.max(0, this.flashT / 0.32);
      for (let i = 0; i < this.mats.length; i++) {
        this.mats[i].emissive.setRGB(
          this.baseEmissive[i].c.r + k * 0.9,
          this.baseEmissive[i].c.g + k * 0.1,
          this.baseEmissive[i].c.b + k * 0.1
        );
        this.mats[i].emissiveIntensity = this.baseEmissive[i].i + k * 1.4;
      }
      if (this.flashT <= 0) {
        for (let i = 0; i < this.mats.length; i++) {
          this.mats[i].emissive.copy(this.baseEmissive[i].c);
          this.mats[i].emissiveIntensity = this.baseEmissive[i].i;
        }
      }
    }

    // fade out
    if (this.fade >= 0) {
      this.fade += dt;
      const o = Math.max(0, 1 - this.fade / this.fadeDur);
      for (const m of this.mats) m.opacity = o;
    }
  }

  /** Two-bone IK: place the foot on its stride target, knee bent to reach. */
  private solveLeg(
    hip: THREE.Group,
    knee: THREE.Group,
    foot: THREE.Group,
    phase: number,
    strideHalf: number,
    liftH: number,
    walking: boolean,
    dt: number
  ) {
    const L1 = this.legUpper;
    const L2 = this.legLower;
    if (!walking) {
      hip.rotation.x = THREE.MathUtils.lerp(hip.rotation.x, 0, Math.min(1, dt * 7));
      knee.rotation.x = THREE.MathUtils.lerp(knee.rotation.x, 0.06, Math.min(1, dt * 7));
      foot.rotation.x = THREE.MathUtils.lerp(foot.rotation.x, -0.06, Math.min(1, dt * 7));
      return;
    }
    // foot target in hip space: planted while sin<0 sweeps back, airborne arc forward
    const c = Math.cos(phase);
    const sn = Math.sin(phase);
    const fz = c * strideHalf; // forward offset
    const lift = Math.max(0, sn) ** 1.4 * liftH;
    const dy = -(L1 + L2) * 0.985 + lift + this.bobS.x * 0.5;
    const d = Math.min(Math.hypot(fz, dy), (L1 + L2) * 0.999);
    const baseAng = Math.atan2(fz, -dy);
    const cosKnee = THREE.MathUtils.clamp(
      (L1 * L1 + L2 * L2 - d * d) / (2 * L1 * L2),
      -1,
      1
    );
    const kneeAng = Math.PI - Math.acos(cosKnee);
    const cosHip = THREE.MathUtils.clamp(
      (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d),
      -1,
      1
    );
    hip.rotation.x = baseAng - Math.acos(cosHip);
    knee.rotation.x = kneeAng;
    // keep the sole level with a touch of toe-off
    foot.rotation.x = -(hip.rotation.x + knee.rotation.x) - 0.06 + Math.max(0, sn) * 0.25;
  }

  dispose() {
    this.group.traverse((o) => {
      const me = o as THREE.Mesh;
      me.geometry?.dispose();
      const m = me.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else m?.dispose();
    });
  }
}

const DEFAULT_CFG: PortraitConfig = {
  skin: "light",
  hairStyle: "short",
  hairColor: "brown",
  beard: "short",
  headwear: "none",
  vestment: "monk-brown",
};

export function buildRig(
  cfg: PortraitConfig | undefined,
  opts?: { height?: number; hairHex?: string; seed?: number }
): Rig {
  return new CharacterRig(cfg ?? DEFAULT_CFG, opts);
}

/** The pilgrim: a hooded traveler's cloak over modern clothes. */
export function playerConfig(): PortraitConfig {
  return {
    skin: "light",
    hairStyle: "modern",
    hairColor: "brown",
    beard: "none",
    headwear: "none",
    vestment: "modern-hoodie",
  };
}
