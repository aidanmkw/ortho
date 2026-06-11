// Procedural 3D characters for the Pilgrim Road.
// Every figure — pilgrim, saint, heresiarch, commissar — is built as an
// articulated low-poly humanoid from its existing PortraitConfig (vestment,
// headwear, beard, skin, held symbol) and animated in code: walk cycles,
// idle sway, casting/striking gestures, and a death fall. No external
// model or animation assets; everything is generated at runtime.

import * as THREE from "three";
import type {
  PortraitConfig,
  Skin,
  HairColor,
  Vestment,
} from "@/lib/quest/portraits";

type BodyKind = "robe" | "legs";

const SKIN_HEX: Record<Skin, string> = {
  pale: "#eac9a2",
  light: "#d9a877",
  tan: "#b67e54",
  dark: "#7a4e2e",
  shadow: "#46405e",
};

const HAIR_HEX: Record<HairColor, string> = {
  black: "#221813",
  brown: "#6a4422",
  gold: "#c89020",
  white: "#e8e0cc",
  gray: "#9a9a9a",
  ginger: "#b8602a",
  none: "#000000",
};

type Outfit = {
  kind: BodyKind;
  robe: string; // robe / coat / tunic
  trim: string;
  sleeves?: string;
  legs?: string;
  boots?: string;
  metal?: boolean; // armored torso
};

const OUTFITS: Record<Vestment, Outfit> = {
  "monk-brown":      { kind: "robe", robe: "#5a3818", trim: "#c9a228" },
  "monk-black":      { kind: "robe", robe: "#191410", trim: "#c9a228" },
  "bishop-white":    { kind: "robe", robe: "#e8dcc0", trim: "#c9a228" },
  "bishop-purple":   { kind: "robe", robe: "#3a1f4d", trim: "#c9a228" },
  "bishop-crimson":  { kind: "robe", robe: "#7c1414", trim: "#f0d358" },
  "imperial-purple": { kind: "robe", robe: "#46265c", trim: "#f0d358" },
  centurion:         { kind: "legs", robe: "#8c1c1c", trim: "#c9a228", legs: "#8a7a66", boots: "#4a3424", metal: true },
  "toga-white":      { kind: "robe", robe: "#e4d8bc", trim: "#7c1414" },
  "modern-hoodie":   { kind: "legs", robe: "#32415f", trim: "#c9a070", legs: "#27324a", boots: "#23201c" },
  "modern-shirt-tie":{ kind: "legs", robe: "#e8e0d0", trim: "#1a2c4e", legs: "#2c3038", boots: "#1c1a18" },
  "modern-sweater":  { kind: "legs", robe: "#2c2620", trim: "#5a3818", legs: "#3a3530", boots: "#221f1c" },
  "modern-collared": { kind: "legs", robe: "#5a6a90", trim: "#a08060", legs: "#3c3a36", boots: "#26221e" },
  "soviet-tunic":    { kind: "legs", robe: "#3e423e", trim: "#7c1414", legs: "#33362f", boots: "#16161a" },
  "deacon-purple":   { kind: "robe", robe: "#2c1640", trim: "#e8dcc0" },
  "cardinal-crimson":{ kind: "robe", robe: "#8c1c1c", trim: "#f0d358" },
  "papal-white":     { kind: "robe", robe: "#ece4d0", trim: "#c9a228" },
  shadow:            { kind: "robe", robe: "#181024", trim: "#7c1414" },
  void:              { kind: "robe", robe: "#0c0814", trim: "#5c3470" },
};

const GOLD = "#c9a227";

export type GestureName = "cast" | "strike" | "bless" | "die";

export type Rig = {
  group: THREE.Group;
  height: number;
  /** 0 = idle; otherwise normalized walk speed (1 ≈ full stride). */
  setSpeed(s: number): void;
  gesture(name: GestureName): void;
  /** Red hit-flash on all materials, decays automatically. */
  flash(): void;
  /** Fade all materials out over `dur` seconds (used with "die"). */
  fadeOut(dur: number): void;
  update(dt: number, time: number): void;
  dispose(): void;
};

// ---------------------------------------------------------------------------

function mat(color: string, opts?: Partial<THREE.MeshStandardMaterialParameters>) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.86,
    metalness: 0.04,
    ...opts,
  });
}
function goldMat(emissive = 0) {
  return new THREE.MeshStandardMaterial({
    color: GOLD,
    roughness: 0.38,
    metalness: 0.85,
    emissive: "#a07c14",
    emissiveIntensity: emissive,
  });
}

function mesh(geo: THREE.BufferGeometry, m: THREE.Material, shadow = true): THREE.Mesh {
  const me = new THREE.Mesh(geo, m);
  me.castShadow = shadow;
  return me;
}

function capsule(r: number, len: number, m: THREE.Material): THREE.Mesh {
  return mesh(new THREE.CapsuleGeometry(r, len, 3, 8), m);
}

// ---------------------------------------------------------------------------

class CharacterRig implements Rig {
  group = new THREE.Group();
  height: number;

  private pelvis = new THREE.Group();
  private torso = new THREE.Group();
  private headG = new THREE.Group();
  private shoulderL = new THREE.Group();
  private shoulderR = new THREE.Group();
  private elbowL = new THREE.Group();
  private elbowR = new THREE.Group();
  private hipL?: THREE.Group;
  private hipR?: THREE.Group;
  private kneeL?: THREE.Group;
  private kneeR?: THREE.Group;
  private robeMesh?: THREE.Mesh;
  private halo?: THREE.Mesh;

  private kind: BodyKind;
  private phase = Math.random() * 10;
  private speed = 0;
  private curSpeed = 0;
  private gestureName: GestureName | null = null;
  private gestureT = 0;
  private flashT = 0;
  private fade = -1;
  private fadeDur = 1;
  private mats: THREE.MeshStandardMaterial[] = [];
  private baseEmissive: THREE.Color[] = [];
  private pelvisY: number;
  private idleSeed = Math.random() * 7;

  constructor(cfg: PortraitConfig, opts?: { height?: number; hairHex?: string }) {
    const H = opts?.height ?? 1.75;
    this.height = H;
    const outfit = OUTFITS[cfg.vestment] ?? OUTFITS["monk-brown"];
    this.kind = outfit.kind;
    const skin = mat(SKIN_HEX[cfg.skin] ?? SKIN_HEX.light);
    const hairHex = opts?.hairHex ?? HAIR_HEX[cfg.hairColor] ?? "#6a4422";
    const cloth = mat(outfit.robe);
    const trim = mat(outfit.trim, { roughness: 0.5, metalness: 0.4 });

    const legLen = H * 0.48;
    const torsoLen = H * 0.3;
    const headR = H * 0.105;
    this.pelvisY = legLen;

    // --- pelvis & torso
    this.pelvis.position.y = legLen;
    this.group.add(this.pelvis);
    const torsoMesh = capsule(H * 0.115, torsoLen * 0.62, outfit.metal
      ? mat("#9aa0a8", { roughness: 0.42, metalness: 0.8 })
      : cloth);
    torsoMesh.position.y = torsoLen * 0.55;
    this.torso.add(torsoMesh);
    if (outfit.metal) {
      // red tunic under the cuirass + pteruges skirt
      const tunic = capsule(H * 0.105, torsoLen * 0.3, cloth);
      tunic.position.y = torsoLen * 0.16;
      this.torso.add(tunic);
      for (let i = 0; i < 8; i++) {
        const strap = mesh(new THREE.BoxGeometry(H * 0.045, H * 0.12, 0.012), trim);
        const a = (i / 8) * Math.PI * 2;
        strap.position.set(Math.cos(a) * H * 0.1, -H * 0.02, Math.sin(a) * H * 0.1);
        strap.rotation.y = -a;
        this.torso.add(strap);
      }
    } else if (this.kind === "legs") {
      // hoodie / coat hem
      const hem = mesh(new THREE.CylinderGeometry(H * 0.125, H * 0.135, H * 0.07, 10), cloth);
      hem.position.y = -H * 0.01;
      this.torso.add(hem);
    }
    this.torso.position.y = 0;
    this.pelvis.add(this.torso);

    // trim band (epitrachelion / tie / sash)
    const band = mesh(new THREE.BoxGeometry(H * 0.05, torsoLen * 0.62, 0.018), trim);
    band.position.set(0, torsoLen * 0.5, H * 0.105);
    this.torso.add(band);

    // --- head
    this.headG.position.y = torsoLen + headR * 0.6;
    const skull = mesh(new THREE.SphereGeometry(headR, 14, 12), skin);
    skull.position.y = headR * 0.9;
    this.headG.add(skull);
    // eyes
    const eyeMat =
      cfg.eyes === "glowing-red"
        ? new THREE.MeshStandardMaterial({ color: "#3a0808", emissive: "#e83030", emissiveIntensity: 2.2 })
        : mat(cfg.eyes === "void" ? "#000000" : "#1c1410");
    for (const s of [-1, 1]) {
      const eye = mesh(
        new THREE.SphereGeometry(headR * (cfg.eyes === "void" ? 0.22 : 0.14), 8, 8),
        eyeMat,
        false
      );
      eye.position.set(s * headR * 0.36, headR * 0.98, headR * 0.82);
      this.headG.add(eye);
    }
    // hair
    if (cfg.hairColor !== "none" && cfg.hairStyle !== "bald") {
      const hm = mat(hairHex);
      const cap = mesh(
        new THREE.SphereGeometry(headR * 1.06, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.55),
        hm
      );
      cap.position.y = headR * 1.0;
      this.headG.add(cap);
      if (cfg.hairStyle === "long") {
        const back = mesh(new THREE.CapsuleGeometry(headR * 0.55, headR * 1.5, 2, 8), hm);
        back.position.set(0, headR * 0.1, -headR * 0.55);
        this.headG.add(back);
      }
    }
    // beard
    if (cfg.beard && cfg.beard !== "none") {
      const blen =
        cfg.beard === "stubble" ? 0.15 :
        cfg.beard === "short" ? 0.5 :
        cfg.beard === "long" ? 1.1 : 1.7;
      const bm = mat(HAIR_HEX[cfg.beardColor ?? cfg.hairColor] ?? "#9a9a9a");
      const beard = mesh(new THREE.ConeGeometry(headR * 0.62, headR * blen, 8), bm);
      beard.rotation.x = Math.PI;
      beard.position.set(0, headR * (0.62 - blen * 0.45), headR * 0.5);
      this.headG.add(beard);
    }
    this.buildHeadwear(cfg, headR, trim);
    this.torso.add(this.headG);

    // --- arms
    const armLen = H * 0.26;
    const sleeve = mat(outfit.sleeves ?? outfit.robe);
    for (const side of [-1, 1] as const) {
      const shoulder = new THREE.Group();
      shoulder.position.set(side * H * 0.145, torsoLen * 0.92, 0);
      const upper = capsule(H * 0.042, armLen * 0.55, sleeve);
      upper.position.y = -armLen * 0.5;
      shoulder.add(upper);
      const elbow = new THREE.Group();
      elbow.position.y = -armLen;
      const fore = capsule(H * 0.036, armLen * 0.5, this.kind === "robe" ? sleeve : skin);
      fore.position.y = -armLen * 0.45;
      elbow.add(fore);
      const hand = mesh(new THREE.SphereGeometry(H * 0.045, 8, 8), skin);
      hand.position.y = -armLen * 0.92;
      elbow.add(hand);
      shoulder.add(elbow);
      this.torso.add(shoulder);
      if (side < 0) { this.shoulderL = shoulder; this.elbowL = elbow; }
      else { this.shoulderR = shoulder; this.elbowR = elbow; }
    }

    // --- lower body
    if (this.kind === "robe") {
      const robe = mesh(
        new THREE.CylinderGeometry(H * 0.13, H * 0.21, legLen + torsoLen * 0.1, 12),
        cloth
      );
      robe.position.y = -legLen / 2 + H * 0.02;
      robe.receiveShadow = true;
      this.pelvis.add(robe);
      this.robeMesh = robe;
      const hemTrim = mesh(new THREE.TorusGeometry(H * 0.205, H * 0.012, 6, 14), trim);
      hemTrim.rotation.x = Math.PI / 2;
      hemTrim.position.y = -legLen + H * 0.05;
      this.pelvis.add(hemTrim);
    } else {
      const legMat = mat(outfit.legs ?? "#33363c");
      const bootMat = mat(outfit.boots ?? "#221f1c");
      const thighLen = legLen * 0.52;
      const shinLen = legLen * 0.46;
      for (const side of [-1, 1] as const) {
        const hip = new THREE.Group();
        hip.position.set(side * H * 0.07, 0, 0);
        const thigh = capsule(H * 0.052, thighLen * 0.6, legMat);
        thigh.position.y = -thighLen * 0.5;
        hip.add(thigh);
        const knee = new THREE.Group();
        knee.position.y = -thighLen;
        const shin = capsule(H * 0.044, shinLen * 0.6, legMat);
        shin.position.y = -shinLen * 0.5;
        knee.add(shin);
        const foot = mesh(new THREE.BoxGeometry(H * 0.085, H * 0.05, H * 0.16), bootMat);
        foot.position.set(0, -shinLen, H * 0.035);
        knee.add(foot);
        hip.add(knee);
        this.pelvis.add(hip);
        if (side < 0) { this.hipL = hip; this.kneeL = knee; }
        else { this.hipR = hip; this.kneeR = knee; }
      }
    }

    // --- halo
    if (cfg.headwear === "halo" || cfg.headwear === "halo-bright") {
      const bright = cfg.headwear === "halo-bright";
      const halo = mesh(
        new THREE.TorusGeometry(headR * (bright ? 1.7 : 1.45), headR * 0.1, 8, 28),
        goldMat(bright ? 1.6 : 1.1),
        false
      );
      halo.position.set(0, headR * 1.05, -headR * 0.55);
      this.headG.add(halo);
      this.halo = halo;
    }

    // --- held symbol (right hand)
    this.buildProp(cfg, H, trim);

    // collect materials for flash/fade
    this.group.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      if (m && m.isMeshStandardMaterial && !this.mats.includes(m)) {
        this.mats.push(m);
        this.baseEmissive.push(m.emissive.clone());
      }
    });
  }

  private buildHeadwear(cfg: PortraitConfig, headR: number, trim: THREE.Material) {
    const top = headR * 1.75;
    const add = (m: THREE.Object3D) => this.headG.add(m);
    switch (cfg.headwear) {
      case "mitre": {
        const m = mesh(new THREE.ConeGeometry(headR * 0.95, headR * 1.7, 4), goldMat(0.25));
        m.scale.z = 0.55;
        m.position.y = top + headR * 0.5;
        add(m);
        break;
      }
      case "skufia": {
        const m = mesh(new THREE.ConeGeometry(headR * 0.95, headR * 0.85, 10), mat("#14100c"));
        m.position.y = top;
        add(m);
        break;
      }
      case "klobuk": {
        const dome = mesh(new THREE.CylinderGeometry(headR * 0.9, headR * 0.95, headR * 1.0, 10), mat("#0c0a08"));
        dome.position.y = top + headR * 0.1;
        add(dome);
        const veil = mesh(new THREE.PlaneGeometry(headR * 1.7, headR * 2.6), mat("#0c0a08", { side: THREE.DoubleSide }));
        veil.position.set(0, headR * 0.4, -headR * 0.95);
        veil.rotation.x = 0.18;
        add(veil);
        break;
      }
      case "tiara": {
        for (let i = 0; i < 3; i++) {
          const ring = mesh(
            new THREE.CylinderGeometry(headR * (0.85 - i * 0.16), headR * (0.95 - i * 0.16), headR * 0.5, 10),
            mat("#ece4d0")
          );
          ring.position.y = top + headR * (0.2 + i * 0.45);
          add(ring);
          const band = mesh(new THREE.TorusGeometry(headR * (0.9 - i * 0.16), headR * 0.05, 6, 14), goldMat(0.2));
          band.rotation.x = Math.PI / 2;
          band.position.y = top + headR * (0.05 + i * 0.45);
          add(band);
        }
        break;
      }
      case "galero": {
        const brim = mesh(new THREE.CylinderGeometry(headR * 2.1, headR * 2.1, headR * 0.12, 16), mat("#8c1c1c"));
        brim.position.y = top;
        add(brim);
        const crown = mesh(new THREE.SphereGeometry(headR * 0.85, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat("#8c1c1c"));
        crown.position.y = top;
        add(crown);
        break;
      }
      case "stemma": {
        const band = mesh(new THREE.CylinderGeometry(headR * 1.0, headR * 1.0, headR * 0.55, 12), goldMat(0.35));
        band.position.y = top + headR * 0.1;
        add(band);
        const crossT = mesh(new THREE.BoxGeometry(headR * 0.1, headR * 0.5, headR * 0.1), goldMat(0.35));
        crossT.position.y = top + headR * 0.65;
        add(crossT);
        break;
      }
      case "helmet": {
        const dome = mesh(new THREE.SphereGeometry(headR * 1.12, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.6), mat("#9aa0a8", { roughness: 0.4, metalness: 0.75 }));
        dome.position.y = headR * 0.95;
        add(dome);
        const crest = mesh(new THREE.BoxGeometry(headR * 0.18, headR * 0.55, headR * 1.9), mat("#a02020"));
        crest.position.y = top + headR * 0.35;
        add(crest);
        break;
      }
      case "ushanka": {
        const capm = mesh(new THREE.CylinderGeometry(headR * 1.02, headR * 1.06, headR * 0.62, 12), mat("#33362f"));
        capm.position.y = top;
        add(capm);
        const brim = mesh(new THREE.BoxGeometry(headR * 1.1, headR * 0.1, headR * 0.55), mat("#1c1c20"));
        brim.position.set(0, top - headR * 0.28, headR * 0.85);
        add(brim);
        const star = mesh(new THREE.CylinderGeometry(headR * 0.16, headR * 0.16, headR * 0.06, 5), mat("#b02020", { emissive: "#601010", emissiveIntensity: 0.6 }));
        star.rotation.x = Math.PI / 2;
        star.position.set(0, top + headR * 0.02, headR * 1.0);
        add(star);
        break;
      }
      case "laurel":
      case "imperial-laurel": {
        const wreath = mesh(new THREE.TorusGeometry(headR * 1.02, headR * 0.09, 6, 16), mat("#4a6c2a"));
        wreath.rotation.x = Math.PI / 2.3;
        wreath.position.y = top - headR * 0.3;
        add(wreath);
        break;
      }
      case "hood-shadow": {
        const hood = mesh(
          new THREE.ConeGeometry(headR * 1.4, headR * 2.4, 9),
          mat("#100a18", { side: THREE.DoubleSide })
        );
        hood.position.y = top - headR * 0.25;
        add(hood);
        break;
      }
      case "void-shadow": {
        const ring = mesh(
          new THREE.TorusGeometry(headR * 1.8, headR * 0.08, 8, 28),
          new THREE.MeshStandardMaterial({ color: "#2c1640", emissive: "#5c3470", emissiveIntensity: 1.8 }),
          false
        );
        ring.position.set(0, headR * 1.0, -headR * 0.6);
        add(ring);
        break;
      }
      default:
        break;
    }
    void trim;
  }

  private buildProp(cfg: PortraitConfig, H: number, trim: THREE.Material) {
    const hand = this.elbowR;
    const at = -H * 0.26 * 0.92;
    const sym = cfg.symbol;
    if (sym === "cross") {
      const g = new THREE.Group();
      const v = mesh(new THREE.BoxGeometry(0.025, H * 0.34, 0.025), goldMat(0.3));
      const h1 = mesh(new THREE.BoxGeometry(H * 0.14, 0.025, 0.025), goldMat(0.3));
      h1.position.y = H * 0.09;
      const h2 = mesh(new THREE.BoxGeometry(H * 0.09, 0.02, 0.02), goldMat(0.3));
      h2.position.y = -H * 0.06;
      h2.rotation.z = 0.4;
      g.add(v, h1, h2);
      g.position.set(0, at + H * 0.1, H * 0.03);
      hand.add(g);
    } else if (sym === "book") {
      const b = mesh(new THREE.BoxGeometry(H * 0.13, H * 0.17, H * 0.04), mat("#6a1212"));
      const cr = mesh(new THREE.BoxGeometry(H * 0.02, H * 0.08, 0.005), goldMat(0.3));
      cr.position.z = H * 0.022;
      b.add(cr);
      b.position.set(0, at, H * 0.05);
      b.rotation.x = -0.4;
      hand.add(b);
    } else if (sym === "scroll") {
      const s = mesh(new THREE.CylinderGeometry(H * 0.022, H * 0.022, H * 0.2, 8), mat("#e4d8bc"));
      s.rotation.z = Math.PI / 2.4;
      s.position.set(0, at, H * 0.03);
      hand.add(s);
    } else if (sym === "sword") {
      const blade = mesh(new THREE.BoxGeometry(0.02, H * 0.42, 0.045), mat("#c8ccd4", { roughness: 0.3, metalness: 0.85 }));
      blade.position.y = -H * 0.16;
      const guard = mesh(new THREE.BoxGeometry(H * 0.09, 0.02, 0.05), goldMat(0.2));
      const grip = mesh(new THREE.CylinderGeometry(0.016, 0.016, H * 0.07, 6), mat("#3a2410"));
      grip.position.y = H * 0.045;
      const sw = new THREE.Group();
      sw.add(blade, guard, grip);
      sw.position.set(0, at, H * 0.02);
      sw.rotation.x = Math.PI * 0.5;
      hand.add(sw);
    } else if (sym === "chains") {
      for (let i = 0; i < 3; i++) {
        const link = mesh(new THREE.TorusGeometry(H * 0.03, H * 0.008, 6, 10), mat("#6a6a72", { roughness: 0.45, metalness: 0.7 }), false);
        link.position.set(0, at + i * H * 0.045, 0);
        link.rotation.x = (i % 2) * Math.PI * 0.5;
        hand.add(link);
      }
    } else if (sym === "flame") {
      const f = mesh(
        new THREE.ConeGeometry(H * 0.04, H * 0.12, 7),
        new THREE.MeshStandardMaterial({ color: "#f0c060", emissive: "#ffae34", emissiveIntensity: 2.4 }),
        false
      );
      f.position.set(0, at + H * 0.06, 0);
      hand.add(f);
    } else if (sym === "icon") {
      const p = mesh(new THREE.BoxGeometry(H * 0.14, H * 0.18, H * 0.02), goldMat(0.25));
      const inner = mesh(new THREE.BoxGeometry(H * 0.1, H * 0.14, H * 0.022), mat("#3a2818"));
      p.add(inner);
      p.position.set(0, at, H * 0.05);
      p.rotation.x = -0.35;
      hand.add(p);
    }
    void trim;
  }

  setSpeed(s: number) {
    this.speed = THREE.MathUtils.clamp(s, 0, 1.4);
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

  update(dt: number, time: number) {
    const s = this.curSpeed = THREE.MathUtils.lerp(this.curSpeed, this.speed, Math.min(1, dt * 8));
    const walking = s > 0.04;
    this.phase += dt * (4.6 + s * 4.4) * (walking ? 1 : 0.4);
    const p = this.phase;
    const idle = Math.sin(time * 1.7 + this.idleSeed);

    // pelvis bob + lean
    const bob = walking ? Math.abs(Math.sin(p)) * 0.05 * s : 0.012 * idle;
    this.pelvis.position.y = this.pelvisY + bob;
    this.torso.rotation.x = walking ? 0.07 * s : 0.015 * idle;
    this.torso.rotation.z = walking ? Math.sin(p) * 0.035 * s : 0;
    this.headG.rotation.y = walking ? 0 : Math.sin(time * 0.5 + this.idleSeed) * 0.22;
    this.headG.rotation.x = walking ? 0.04 : 0.02 * idle;

    // arms swing / idle
    let armLSwing = walking ? Math.sin(p) * 0.5 * s : 0.06 + 0.03 * idle;
    let armRSwing = walking ? -Math.sin(p) * 0.5 * s : 0.06 + 0.03 * Math.sin(time * 1.7 + 2);
    let elbowLB = walking ? Math.max(0, -Math.sin(p)) * 0.4 * s + 0.25 : 0.3;
    let elbowRB = walking ? Math.max(0, Math.sin(p)) * 0.4 * s + 0.25 : 0.3;
    let armROut = 0.12;

    // gesture overrides on the right arm / whole body
    if (this.gestureName) {
      this.gestureT += dt;
      const t = this.gestureT;
      if (this.gestureName === "cast") {
        // wind up over the head, then hurl forward
        const wind = THREE.MathUtils.smoothstep(t, 0, 0.45);
        const throwK = THREE.MathUtils.smoothstep(t, 0.45, 0.75);
        armRSwing = -2.6 * wind + 3.1 * throwK;
        elbowRB = 0.9 * wind * (1 - throwK);
        armROut = 0.35;
        this.torso.rotation.y = 0.35 * wind - 0.55 * throwK;
        if (t > 1.05) { this.gestureName = null; this.torso.rotation.y = 0; }
      } else if (this.gestureName === "strike") {
        const wind = THREE.MathUtils.smoothstep(t, 0, 0.3);
        const sw = THREE.MathUtils.smoothstep(t, 0.3, 0.55);
        armRSwing = -2.2 * wind + 2.9 * sw;
        armROut = 0.5 * wind;
        this.torso.rotation.y = 0.3 * wind - 0.5 * sw;
        if (t > 0.85) { this.gestureName = null; this.torso.rotation.y = 0; }
      } else if (this.gestureName === "bless") {
        const k = THREE.MathUtils.smoothstep(t, 0, 0.5) * (1 - THREE.MathUtils.smoothstep(t, 1.6, 2.2));
        armRSwing = -1.9 * k;
        elbowRB = 0.5 * k;
        armROut = 0.3 * k;
        if (t > 2.3) this.gestureName = null;
      } else if (this.gestureName === "die") {
        const k = THREE.MathUtils.smoothstep(t, 0, 1.1);
        this.group.rotation.x = -1.45 * k;
        this.pelvis.position.y = this.pelvisY * (1 - 0.4 * k);
        armLSwing = 1.2 * k;
        armRSwing = 1.5 * k;
        // stays down; gesture not cleared
      }
    }

    this.shoulderL.rotation.x = armLSwing;
    this.shoulderR.rotation.x = armRSwing;
    this.shoulderL.rotation.z = 0.12;
    this.shoulderR.rotation.z = -armROut;
    this.elbowL.rotation.x = -elbowLB;
    this.elbowR.rotation.x = -elbowRB;

    // legs
    if (this.hipL && this.hipR && this.kneeL && this.kneeR) {
      if (walking) {
        this.hipL.rotation.x = Math.sin(p) * 0.62 * s;
        this.hipR.rotation.x = -Math.sin(p) * 0.62 * s;
        this.kneeL.rotation.x = Math.max(0, -Math.sin(p - 0.5)) * 0.85 * s;
        this.kneeR.rotation.x = Math.max(0, Math.sin(p - 0.5)) * 0.85 * s;
      } else {
        this.hipL.rotation.x = THREE.MathUtils.lerp(this.hipL.rotation.x, 0, dt * 6);
        this.hipR.rotation.x = THREE.MathUtils.lerp(this.hipR.rotation.x, 0, dt * 6);
        this.kneeL.rotation.x = THREE.MathUtils.lerp(this.kneeL.rotation.x, 0.04, dt * 6);
        this.kneeR.rotation.x = THREE.MathUtils.lerp(this.kneeR.rotation.x, 0.04, dt * 6);
      }
    }
    if (this.robeMesh) {
      this.robeMesh.rotation.x = walking ? Math.sin(p) * 0.05 * s : 0;
      this.robeMesh.rotation.z = walking ? Math.cos(p) * 0.04 * s : 0.01 * idle;
    }
    if (this.halo) this.halo.rotation.z = time * 0.4;

    // hit flash
    if (this.flashT > 0) {
      this.flashT -= dt;
      const k = Math.max(0, this.flashT / 0.32);
      for (let i = 0; i < this.mats.length; i++) {
        this.mats[i].emissive.setRGB(
          this.baseEmissive[i].r + k * 0.9,
          this.baseEmissive[i].g + k * 0.12,
          this.baseEmissive[i].b + k * 0.12
        );
      }
      if (this.flashT <= 0) {
        for (let i = 0; i < this.mats.length; i++) this.mats[i].emissive.copy(this.baseEmissive[i]);
      }
    }

    // fade out
    if (this.fade >= 0) {
      this.fade += dt;
      const o = Math.max(0, 1 - this.fade / this.fadeDur);
      for (const m of this.mats) m.opacity = o;
    }
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
  opts?: { height?: number; hairHex?: string }
): Rig {
  return new CharacterRig(cfg ?? DEFAULT_CFG, opts);
}

/** The pilgrim's own look: modern hoodie, custom hair. */
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
