// Synthesizes 8-bit-style sound effects on the fly using Web Audio API.
// No audio files needed — everything is generated. Mobile-friendly.

let audioCtx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    } catch {
      return null;
    }
  }
  // iOS Safari may suspend the context until a user gesture.
  if (audioCtx?.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function setMuted(value: boolean) {
  muted = value;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem("quest:muted", value ? "1" : "0");
    } catch {}
  }
}

export function getMuted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.localStorage.getItem("quest:muted") === "1") muted = true;
  } catch {}
  return muted;
}

// Generic blip: one or two notes with a quick envelope.
function blip(
  freq: number,
  durMs: number,
  type: OscillatorType = "square",
  vol = 0.18,
  freqEnd?: number
) {
  if (muted) return;
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  if (freqEnd !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(freqEnd, 1),
      ctx.currentTime + durMs / 1000
    );
  }
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durMs / 1000);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + durMs / 1000);
}

export const sfx = {
  click() {
    blip(660, 60, "square", 0.10);
  },
  textBlip() {
    blip(880, 25, "square", 0.04);
  },
  hit() {
    // Two quick descending blips
    blip(440, 90, "square", 0.16, 220);
    setTimeout(() => blip(330, 110, "square", 0.14, 110), 60);
  },
  crit() {
    blip(880, 60, "square", 0.18);
    setTimeout(() => blip(1320, 80, "square", 0.18), 70);
    setTimeout(() => blip(1760, 110, "square", 0.20), 150);
  },
  wrong() {
    // Buzzer
    blip(160, 200, "sawtooth", 0.12, 110);
  },
  heal() {
    blip(660, 80, "triangle", 0.18);
    setTimeout(() => blip(990, 80, "triangle", 0.18), 80);
    setTimeout(() => blip(1320, 140, "triangle", 0.16), 160);
  },
  levelUp() {
    [523, 659, 784, 1047].forEach((f, i) =>
      setTimeout(() => blip(f, 140, "square", 0.18), i * 110)
    );
  },
  victory() {
    [523, 659, 784, 1047, 1319].forEach((f, i) =>
      setTimeout(() => blip(f, 180, "square", 0.18), i * 140)
    );
  },
  defeat() {
    [523, 466, 415, 311].forEach((f, i) =>
      setTimeout(() => blip(f, 220, "sawtooth", 0.16), i * 170)
    );
  },
  bossEnter() {
    blip(110, 200, "sawtooth", 0.20);
    setTimeout(() => blip(220, 180, "square", 0.18), 200);
  },
  ding() {
    blip(1320, 80, "triangle", 0.14);
  },
};
