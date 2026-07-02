// Ambient world audio for the Pilgrim Road — all synthesized, no files.
// Layers: wind (filtered noise), a colder snow-wind, and a battle drum
// pulse. Each layer's level eases toward its target so zone transitions
// and battle starts swell rather than snap. Pairs with lib/chant.ts.

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let windGain: GainNode | null = null;
let windFilter: BiquadFilterNode | null = null;
let battleGain: GainNode | null = null;
let drumTimer: number | null = null;
let running = false;

function ensure(): boolean {
  if (typeof window === "undefined") return false;
  if (ctx) return true;
  try {
    ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  } catch {
    return false;
  }
  master = ctx.createGain();
  master.gain.value = 0.9;
  master.connect(ctx.destination);

  // -- wind: looped noise through a wandering lowpass
  const seconds = 4;
  const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < d.length; i++) {
    // pink-ish: integrate white noise slightly
    last = last * 0.97 + (Math.random() * 2 - 1) * 0.03;
    d[i] = last * 3;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  windFilter = ctx.createBiquadFilter();
  windFilter.type = "lowpass";
  windFilter.frequency.value = 420;
  windGain = ctx.createGain();
  windGain.gain.value = 0;
  src.connect(windFilter).connect(windGain).connect(master);
  src.start();
  // slow breathing of the wind
  const lfo = ctx.createOscillator();
  const lfoG = ctx.createGain();
  lfo.frequency.value = 0.07;
  lfoG.gain.value = 140;
  lfo.connect(lfoG).connect(windFilter.frequency);
  lfo.start();

  // -- battle drums bus
  battleGain = ctx.createGain();
  battleGain.gain.value = 0;
  battleGain.connect(master);

  return true;
}

function drumHit(kind: "low" | "mid") {
  if (!ctx || !battleGain) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(kind === "low" ? 62 : 92, t);
  osc.frequency.exponentialRampToValueAtTime(kind === "low" ? 38 : 55, t + 0.16);
  g.gain.setValueAtTime(kind === "low" ? 0.9 : 0.5, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
  osc.connect(g).connect(battleGain);
  osc.start(t);
  osc.stop(t + 0.3);
}

function startDrumLoop() {
  if (drumTimer !== null || typeof window === "undefined") return;
  let beat = 0;
  drumTimer = window.setInterval(() => {
    // solemn processional: LOW . mid . LOW . . .
    const p = beat % 8;
    if (p === 0 || p === 3) drumHit("low");
    else if (p === 5) drumHit("mid");
    beat++;
  }, 340);
}
function stopDrumLoop() {
  if (drumTimer !== null) {
    window.clearInterval(drumTimer);
    drumTimer = null;
  }
}

export function startAmbience() {
  if (!ensure() || running) return;
  running = true;
  ctx!.resume().catch(() => {});
  startDrumLoop(); // silent until battle level rises
}

export function stopAmbience() {
  if (!ctx || !running) return;
  running = false;
  stopDrumLoop();
  master?.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
  window.setTimeout(() => {
    try {
      ctx?.suspend();
    } catch {}
  }, 900);
}

export function resumeAmbience() {
  if (!ctx || running) {
    startAmbience();
    return;
  }
  running = true;
  ctx.resume().catch(() => {});
  master?.gain.setTargetAtTime(0.9, ctx.currentTime, 0.4);
  startDrumLoop();
}

/**
 * Ease the soundscape toward a mood. wind/snow/battle in 0..1; snow makes
 * the wind colder (lower cutoff, louder), gloom thins it to a whisper.
 */
export function setMood(m: { wind?: number; snow?: number; battle?: number; gloom?: number }) {
  if (!ctx || !windGain || !windFilter || !battleGain) return;
  const t = ctx.currentTime;
  const wind = m.wind ?? 0.5;
  const snow = m.snow ?? 0;
  const gloom = m.gloom ?? 0;
  const level = (0.05 + wind * 0.09 + snow * 0.08) * (1 - gloom * 0.55);
  windGain.gain.setTargetAtTime(level, t, 1.2);
  windFilter.frequency.setTargetAtTime(420 - snow * 260 + wind * 120, t, 1.2);
  battleGain.gain.setTargetAtTime((m.battle ?? 0) * 0.5, t, 0.5);
}
