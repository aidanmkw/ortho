// Synthesized Byzantine-style ambient chant for the background.
//
// There are no audio files. Everything here is generated with the Web Audio
// API: a sustained ison (drone) on the tonic and its fifth, plus a slow
// solo "voice" that walks through a modal scale, all fed through a generated
// cathedral reverb. It evokes the atmosphere of Orthodox chant without being
// an actual recording (which would carry licensing and file-size costs).
//
// If a real, properly-licensed recording is ever added, this module can be
// swapped for an <audio loop> without changing the ChantController UI.

type Engine = {
  ctx: AudioContext;
  master: GainNode;
  dry: GainNode;
  wet: GainNode;
  drone: { stop: () => void };
  melodyTimer: number | null;
  nextNoteTime: number;
};

let engine: Engine | null = null;
let running = false;

// Tonic D3; a solemn natural-minor / Dorian-ish modal set (Hz, equal temperament).
const TONIC = 146.83;
const SCALE = [
  146.83, // D3
  164.81, // E3
  174.61, // F3
  196.0, // G3
  220.0, // A3
  233.08, // Bb3
  261.63, // C4
  293.66, // D4
];

function makeReverbIR(ac: AudioContext, seconds = 3.4, decay = 2.4): AudioBuffer {
  const rate = ac.sampleRate;
  const len = Math.max(1, Math.floor(rate * seconds));
  const buf = ac.createBuffer(2, len, rate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
  }
  return buf;
}

// A sustained, vocal-ish "aah": two slightly detuned tones through vowel
// formant band-passes, with gentle vibrato and a soft attack/release.
function scheduleVoice(
  ac: AudioContext,
  freq: number,
  startT: number,
  durT: number,
  peakGain: number,
  dests: AudioNode[]
) {
  const osc1 = ac.createOscillator();
  const osc2 = ac.createOscillator();
  osc1.type = "triangle";
  osc2.type = "sawtooth";
  osc1.frequency.value = freq;
  osc2.frequency.value = freq;
  osc2.detune.value = 7;

  // Vibrato
  const lfo = ac.createOscillator();
  const lfoGain = ac.createGain();
  lfo.frequency.value = 4.7;
  lfoGain.gain.value = freq * 0.005;
  lfo.connect(lfoGain);
  lfoGain.connect(osc1.frequency);
  lfoGain.connect(osc2.frequency);

  // "ah" vowel formants
  const f1 = ac.createBiquadFilter();
  f1.type = "bandpass";
  f1.frequency.value = 700;
  f1.Q.value = 5;
  const f2 = ac.createBiquadFilter();
  f2.type = "bandpass";
  f2.frequency.value = 1180;
  f2.Q.value = 7;

  const mix = ac.createGain();
  osc1.connect(f1);
  osc2.connect(f1);
  osc1.connect(f2);
  osc2.connect(f2);
  f1.connect(mix);
  f2.connect(mix);

  const env = ac.createGain();
  const attack = Math.min(0.9, durT * 0.35);
  const release = Math.min(1.4, durT * 0.4);
  env.gain.setValueAtTime(0.0001, startT);
  env.gain.exponentialRampToValueAtTime(peakGain, startT + attack);
  env.gain.setValueAtTime(peakGain, startT + durT - release);
  env.gain.exponentialRampToValueAtTime(0.0001, startT + durT);

  mix.connect(env);
  for (const d of dests) env.connect(d);

  osc1.start(startT);
  osc2.start(startT);
  lfo.start(startT);
  const stopT = startT + durT + 0.05;
  osc1.stop(stopT);
  osc2.stop(stopT);
  lfo.stop(stopT);
}

// Continuous ison drone on the tonic + fifth that runs until stopped.
function startDrone(ac: AudioContext, dests: AudioNode[]): { stop: () => void } {
  const freqs = [TONIC, TONIC * 1.5, TONIC * 0.5];
  const oscs: OscillatorNode[] = [];
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.16, ac.currentTime + 2.5);

  const lp = ac.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 900;
  lp.connect(gain);
  for (const d of dests) gain.connect(d);

  freqs.forEach((f, i) => {
    const o = ac.createOscillator();
    o.type = i === 2 ? "sine" : "triangle";
    o.frequency.value = f;
    o.detune.value = i === 1 ? 4 : 0;
    const og = ac.createGain();
    og.gain.value = i === 0 ? 0.5 : i === 1 ? 0.28 : 0.4;
    o.connect(og);
    og.connect(lp);
    o.start();
    oscs.push(o);
  });

  return {
    stop: () => {
      const t = ac.currentTime;
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(gain.gain.value, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
      oscs.forEach((o) => o.stop(t + 1.7));
    },
  };
}

// Gentle weighted random walk that tends back toward the tonic.
let walkIdx = 0;
function nextNote(): number {
  const step = Math.floor(Math.random() * 3) - 1; // -1, 0, +1 mostly
  walkIdx += step;
  // Occasional leap or pull toward tonic
  if (Math.random() < 0.15) walkIdx = 0;
  walkIdx = Math.max(0, Math.min(SCALE.length - 1, walkIdx));
  return SCALE[walkIdx];
}

function pumpMelody() {
  if (!engine || !running) return;
  const { ctx, dry, wet } = engine;
  const ahead = 2.0; // schedule this far ahead
  while (engine.nextNoteTime < ctx.currentTime + ahead) {
    const freq = nextNote() * 2; // melody an octave above the drone
    const dur = 2.6 + Math.random() * 2.6;
    scheduleVoice(ctx, freq, engine.nextNoteTime, dur, 0.09, [dry, wet]);
    // small overlap/gap between phrases
    engine.nextNoteTime += dur - 0.4 + Math.random() * 0.8;
  }
}

export function startChant() {
  if (running || typeof window === "undefined") return;
  let ctx: AudioContext;
  try {
    ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
  } catch {
    return;
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});

  const master = ctx.createGain();
  master.gain.value = 0.5; // overall background level
  master.connect(ctx.destination);

  const reverb = ctx.createConvolver();
  reverb.buffer = makeReverbIR(ctx);
  const wet = ctx.createGain();
  wet.gain.value = 0.85;
  reverb.connect(wet);
  wet.connect(master);

  const dry = ctx.createGain();
  dry.gain.value = 0.7;
  dry.connect(master);

  const wetIn = ctx.createGain();
  wetIn.connect(reverb);

  const drone = startDrone(ctx, [dry, wetIn]);

  engine = {
    ctx,
    master,
    dry,
    wet: wetIn,
    drone,
    melodyTimer: null,
    nextNoteTime: ctx.currentTime + 1.5,
  };
  running = true;
  walkIdx = 0;
  pumpMelody();
  engine.melodyTimer = window.setInterval(pumpMelody, 500);
}

export function stopChant() {
  if (!engine) {
    running = false;
    return;
  }
  running = false;
  if (engine.melodyTimer !== null) clearInterval(engine.melodyTimer);
  engine.drone.stop();
  const { ctx, master } = engine;
  const t = ctx.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(master.gain.value, t);
  master.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
  const toClose = ctx;
  window.setTimeout(() => {
    toClose.close().catch(() => {});
  }, 2000);
  engine = null;
}

export function isChantRunning(): boolean {
  return running;
}
