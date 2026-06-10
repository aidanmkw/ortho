// Save / load for the 3D pilgrimage. Lives beside (not inside) the 2D
// quest save so the two modes never corrupt each other.

import type { PilgrimSave } from "./types";

const KEY = "pilgrimage:save:v1";

export const HAIR_CHOICES = [
  { id: "brown", label: "Brown", hex: "#7a4f1d" },
  { id: "black", label: "Black", hex: "#1c1410" },
  { id: "blond", label: "Blond", hex: "#d9b14a" },
  { id: "auburn", label: "Auburn", hex: "#8a3a1c" },
  { id: "dark", label: "Dark", hex: "#3a2a1a" },
  { id: "silver", label: "Silver", hex: "#b8b8c0" },
] as const;

export function emptySave(): PilgrimSave {
  return {
    version: 1,
    hair: "brown",
    xp: 0,
    light: 0,
    beaten: [],
    checkpoint: 0,
    wins: 0,
    losses: 0,
    startedAt: 0,
    lastSavedAt: 0,
  };
}

export function loadSave(): PilgrimSave {
  if (typeof window === "undefined") return emptySave();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptySave();
    const parsed = JSON.parse(raw) as PilgrimSave;
    if (parsed.version !== 1) return emptySave();
    return { ...emptySave(), ...parsed };
  } catch {
    return emptySave();
  }
}

export function writeSave(save: PilgrimSave) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ ...save, lastSavedAt: Date.now() })
    );
  } catch {}
}

export function clearSave() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {}
}
