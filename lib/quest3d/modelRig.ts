// Loads an AI-generated (or hand-made) character GLB and adapts it to the
// game's Rig interface, so generated models drop in as full replacements
// for the procedural figures: same walk/gesture/flash/fade controls.
//
// Models live at /public/models/<id>.glb and are announced in
// /public/models/manifest.json (kept by scripts/generate-models.mjs).
// Animation clips are matched by name; rig-less meshes still work and
// receive a gentle procedural bob so they never look frozen.

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { GestureName, Rig } from "./characters";

const CLIP_PATTERNS: Record<string, RegExp> = {
  idle: /idle|breath|stand/i,
  walk: /walk|jog|run|move/i,
  cast: /cast|throw|spell|attack|punch/i,
  strike: /strike|slash|swing|attack|punch|hit/i,
  bless: /bless|wave|greet|salute/i,
  die: /die|death|fall|defeat/i,
};

function findClip(clips: THREE.AnimationClip[], key: string): THREE.AnimationClip | null {
  const pat = CLIP_PATTERNS[key];
  return clips.find((c) => pat.test(c.name)) ?? null;
}

class ModelRig implements Rig {
  group = new THREE.Group();
  height: number;

  private mixer: THREE.AnimationMixer | null = null;
  private idleA: THREE.AnimationAction | null = null;
  private walkA: THREE.AnimationAction | null = null;
  private oneShots = new Map<string, THREE.AnimationAction>();
  private activeShot: THREE.AnimationAction | null = null;
  private speed = 0;
  private cur = 0;
  private mats: THREE.MeshStandardMaterial[] = [];
  private baseEmissive: { c: THREE.Color; i: number }[] = [];
  private flashT = 0;
  private fade = -1;
  private fadeDur = 1;
  private hasClips = false;
  private bobSeed = Math.random() * 7;
  private dead = false;

  constructor(root: THREE.Object3D, clips: THREE.AnimationClip[], height: number) {
    this.height = height;
    // normalize: feet on y=0, overall height = requested
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const scale = size.y > 1e-4 ? height / size.y : 1;
    root.scale.setScalar(scale);
    root.position.y = -box.min.y * scale;
    root.position.x = -((box.min.x + box.max.x) / 2) * scale;
    root.position.z = -((box.min.z + box.max.z) / 2) * scale;
    this.group.add(root);

    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        const mat = m.material as THREE.MeshStandardMaterial;
        if (mat && mat.isMeshStandardMaterial && !this.mats.includes(mat)) {
          this.mats.push(mat);
          this.baseEmissive.push({ c: mat.emissive.clone(), i: mat.emissiveIntensity });
        }
      }
    });

    if (clips.length) {
      this.hasClips = true;
      this.mixer = new THREE.AnimationMixer(root);
      const idle = findClip(clips, "idle");
      const walk = findClip(clips, "walk") ?? idle ?? clips[0];
      if (idle && idle !== walk) {
        this.idleA = this.mixer.clipAction(idle);
        this.idleA.play();
      } else {
        // no dedicated idle clip: hold a frozen pose of the walk clip so
        // characters don't march in place while standing
        // barely-moving walk = a living sway instead of a frozen pose
        const pose = walk.clone();
        pose.name = "__pose";
        this.idleA = this.mixer.clipAction(pose);
        this.idleA.play();
        this.idleA.timeScale = 0.055;
      }
      this.walkA = this.mixer.clipAction(walk);
      this.walkA.play();
      this.walkA.weight = 0;
      for (const key of ["cast", "strike", "bless", "die"]) {
        const clip = findClip(clips, key);
        if (clip) {
          const a = this.mixer.clipAction(clip);
          a.setLoop(THREE.LoopOnce, 1);
          a.clampWhenFinished = key === "die";
          this.oneShots.set(key, a);
        }
      }
    }
  }

  setSpeed(s: number) {
    this.speed = THREE.MathUtils.clamp(s, 0, 1.4);
  }

  gesture(name: GestureName) {
    if (name === "die") this.dead = true;
    if (!this.mixer) return;
    const a = this.oneShots.get(name === "menace" ? "bless" : name);
    if (!a) return;
    this.activeShot?.fadeOut(0.15);
    a.reset().fadeIn(0.12).play();
    this.activeShot = a;
    if (name !== "die") {
      const dur = a.getClip().duration;
      window.setTimeout(() => {
        if (this.activeShot === a) {
          a.fadeOut(0.25);
          this.activeShot = null;
        }
      }, Math.max(200, dur * 1000 - 150));
    }
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
    this.cur = THREE.MathUtils.lerp(this.cur, this.speed, Math.min(1, dt * 8));
    if (this.mixer) {
      const w = THREE.MathUtils.clamp(this.cur * 1.6, 0, 1);
      if (this.walkA && this.idleA) {
        this.walkA.weight = w;
        this.idleA.weight = 1 - w;
        this.walkA.timeScale = 0.7 + this.cur * 0.8;
      }
      this.mixer.update(dt);
    } else if (!this.dead) {
      // rig-less mesh: breathe + lean so it never looks frozen
      this.group.children[0].rotation.x = 0.02 * Math.sin(time * 1.6 + this.bobSeed) + this.cur * 0.08;
      this.group.children[0].position.y += 0;
      this.group.position.y = Math.abs(Math.sin(time * (2 + this.cur * 6))) * 0.04 * this.cur;
    }
    if (this.dead && !this.hasClips) {
      // simple fall for rig-less meshes
      this.group.rotation.x = Math.max(this.group.rotation.x - dt * 1.6, -1.5);
    }
    if (this.flashT > 0) {
      this.flashT -= dt;
      const k = Math.max(0, this.flashT / 0.32);
      for (let i = 0; i < this.mats.length; i++) {
        this.mats[i].emissive.setRGB(
          this.baseEmissive[i].c.r + k * 0.9,
          this.baseEmissive[i].c.g + k * 0.1,
          this.baseEmissive[i].c.b + k * 0.1
        );
        this.mats[i].emissiveIntensity = this.baseEmissive[i].i + k * 1.2;
      }
      if (this.flashT <= 0) {
        for (let i = 0; i < this.mats.length; i++) {
          this.mats[i].emissive.copy(this.baseEmissive[i].c);
          this.mats[i].emissiveIntensity = this.baseEmissive[i].i;
        }
      }
    }
    if (this.fade >= 0) {
      this.fade += dt;
      const o = Math.max(0, 1 - this.fade / this.fadeDur);
      for (const m of this.mats) m.opacity = o;
    }
  }

  dispose() {
    this.mixer?.stopAllAction();
    this.group.traverse((o) => {
      const me = o as THREE.Mesh;
      me.geometry?.dispose();
      const m = me.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else m?.dispose();
    });
  }
}

/** Fetch the model manifest: character ids and environment prop ids. */
export async function loadModelManifest(
  basePath: string
): Promise<{ models: Set<string>; props: Set<string>; voices: Set<string> }> {
  try {
    const res = await fetch(`${basePath}/models/manifest.json`, { cache: "no-cache" });
    if (!res.ok) return { models: new Set(), props: new Set(), voices: new Set() };
    const data = (await res.json()) as { models?: string[]; props?: string[]; voices?: string[] };
    return {
      models: new Set(data.models ?? []),
      props: new Set(data.props ?? []),
      voices: new Set(data.voices ?? []),
    };
  } catch {
    return { models: new Set(), props: new Set(), voices: new Set() };
  }
}

/**
 * Load a static scenery GLB, normalized so its base sits at y=0 and its
 * height matches `height`. Returns null on any failure.
 */
export function loadPropScene(
  basePath: string,
  id: string,
  height: number
): Promise<THREE.Object3D | null> {
  return new Promise((resolve) => {
    new GLTFLoader().load(
      `${basePath}/models/${id}.glb`,
      (gltf) => {
        try {
          const root = gltf.scene;
          const box = new THREE.Box3().setFromObject(root);
          const size = box.getSize(new THREE.Vector3());
          const scale = size.y > 1e-4 ? height / size.y : 1;
          root.scale.setScalar(scale);
          root.position.set(
            -((box.min.x + box.max.x) / 2) * scale,
            -box.min.y * scale,
            -((box.min.z + box.max.z) / 2) * scale
          );
          root.traverse((o) => {
            const m = o as THREE.Mesh;
            if (m.isMesh) {
              m.castShadow = true;
              m.receiveShadow = true;
            }
          });
          const wrap = new THREE.Group();
          wrap.add(root);
          resolve(wrap);
        } catch {
          resolve(null);
        }
      },
      undefined,
      () => resolve(null)
    );
  });
}

/** Load /models/<id>.glb as a Rig. Resolves null on any failure. */
export function loadModelRig(
  basePath: string,
  id: string,
  height: number
): Promise<Rig | null> {
  return new Promise((resolve) => {
    new GLTFLoader().load(
      `${basePath}/models/${id}.glb`,
      (gltf) => {
        try {
          resolve(new ModelRig(gltf.scene, gltf.animations ?? [], height));
        } catch {
          resolve(null);
        }
      },
      undefined,
      () => resolve(null)
    );
  });
}
