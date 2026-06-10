"use client";

// ΟΔΟΣ — The Pilgrim Road. React shell over the 3D icon-world engine.
// The engine owns space and rendering; this component owns the RULES:
// battles, HP, Light, blessings, saves, and every word the player reads.

import * as React from "react";
import Link from "next/link";
import { PilgrimEngine } from "@/lib/quest3d/engine";
import { buildZones } from "@/lib/quest3d/zones";
import type { NearTarget, PilgrimSave, PlateState, ZoneDef } from "@/lib/quest3d/types";
import { HAIR_CHOICES, clearSave, emptySave, loadSave, writeSave } from "@/lib/quest3d/save";
import { QUEST_RANKS } from "@/lib/quest/types";
import type { BossAttack } from "@/lib/quest/types";
import { sfx, getMuted, setMuted } from "@/lib/quest/sfx";
import BattlePanel, { PLATE_LETTERS, type PanelOption } from "./BattlePanel";
import Joystick from "./Joystick";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII"];
const PLAYER_MAX_HP = 100;
const BOSS_HP_SCALE = 0.6; // corpus HP is tuned for the 2D quest's longer fights

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function rankFor(beaten: number): string {
  let r = QUEST_RANKS[0].rank;
  for (const t of QUEST_RANKS) if (beaten >= t.min) r = t.rank;
  return r;
}

type Battle = {
  zoneIdx: number;
  stage: "intro" | "question" | "resolved";
  queue: number[];
  qPos: number;
  order: number[]; // plate index -> option index
  bossHp: number;
  bossMax: number;
  midlineShown: boolean;
  showMidline: boolean;
  plateStates: PlateState[];
  pickedCorrect?: boolean;
  resolvedNote?: string;
  rationale?: string;
  correctLetter?: string;
  lightUsed: boolean;
  defeated: boolean;
  blessing: string | null;
};

type Card =
  | { kind: "ally"; name: string; line: string; healed: boolean }
  | { kind: "shrine"; zoneIdx: number }
  | { kind: "victory"; zoneIdx: number; xp: number; rankedUp: string | null }
  | { kind: "defeat"; zoneIdx: number }
  | { kind: "finished" };

type Toast = { id: number; text: string };

export default function PilgrimageApp() {
  const zones = React.useMemo<ZoneDef[]>(() => buildZones(), []);

  const [phase, setPhase] = React.useState<"title" | "play">("title");
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [hud, setHud] = React.useState({ light: 0, xp: 0, rank: "Inquirer", beaten: 0 });
  const [hp, setHp] = React.useState(PLAYER_MAX_HP);
  const [near, setNear] = React.useState<NearTarget | null>(null);
  const [bannerZone, setBannerZone] = React.useState<number | null>(null);
  const [battle, setBattle] = React.useState<Battle | null>(null);
  const [card, setCard] = React.useState<Card | null>(null);
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const [hurtKey, setHurtKey] = React.useState(0);
  const [muted, setMutedState] = React.useState(false);
  const [coarse, setCoarse] = React.useState(false);
  const [hair, setHair] = React.useState("brown");

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const engineRef = React.useRef<PilgrimEngine | null>(null);
  const saveRef = React.useRef<PilgrimSave>(emptySave());
  const battleRef = React.useRef<Battle | null>(null);
  const nearRef = React.useRef<NearTarget | null>(null);
  const hpRef = React.useRef(PLAYER_MAX_HP);
  const cardRef = React.useRef<Card | null>(null);
  const blessedZones = React.useRef<Set<number>>(new Set());
  const toastId = React.useRef(1);

  React.useEffect(() => {
    saveRef.current = loadSave();
    setHair(saveRef.current.hair);
    setMutedState(getMuted());
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
    syncHud();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const syncHud = () => {
    const s = saveRef.current;
    setHud({
      light: s.light,
      xp: s.xp,
      rank: rankFor(s.beaten.length),
      beaten: s.beaten.length,
    });
  };

  const persist = () => {
    writeSave(saveRef.current);
    syncHud();
  };

  const pushToast = (text: string) => {
    const id = toastId.current++;
    setToasts((t) => [...t.slice(-2), { id, text }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  };

  const setBattleState = (b: Battle | null) => {
    battleRef.current = b;
    setBattle(b ? { ...b } : null);
  };
  const setCardState = (c: Card | null) => {
    cardRef.current = c;
    setCard(c);
  };
  const setHpState = (v: number) => {
    hpRef.current = v;
    setHp(v);
  };

  // ---- battle flow ---------------------------------------------------------

  const currentAttack = (b: Battle): BossAttack => {
    const boss = zones[b.zoneIdx].chapter.boss!;
    return boss.attacks[b.queue[b.qPos % b.queue.length]];
  };

  const openBattle = (zoneIdx: number) => {
    if (battleRef.current) return;
    const boss = zones[zoneIdx].chapter.boss!;
    sfx.bossEnter();
    const max = Math.max(60, Math.round((boss.maxHp * BOSS_HP_SCALE) / 10) * 10);
    const blessing = blessedZones.current.has(zoneIdx)
      ? zones[zoneIdx].allyName ?? null
      : null;
    setNear(null);
    nearRef.current = null;
    engineRef.current?.enterBattle(zoneIdx);
    setBattleState({
      zoneIdx,
      stage: "intro",
      queue: shuffle(boss.attacks.map((_, i) => i)),
      qPos: 0,
      order: [],
      bossHp: max,
      bossMax: max,
      midlineShown: false,
      showMidline: false,
      plateStates: [],
      lightUsed: false,
      defeated: false,
      blessing,
    });
  };

  const beginRound = () => {
    const b = battleRef.current;
    if (!b) return;
    const attack = currentAttack(b);
    b.stage = "question";
    b.order = shuffle(attack.options.map((_, i) => i));
    b.plateStates = attack.options.map(() => "idle");
    b.lightUsed = false;
    b.showMidline = false;
    b.pickedCorrect = undefined;
    b.resolvedNote = undefined;
    b.rationale = undefined;
    engineRef.current?.spawnPlates(b.order.length);
    setBattleState(b);
  };

  const resolveAnswer = (plateIdx: number) => {
    const b = battleRef.current;
    if (!b || b.stage !== "question") return;
    if (b.plateStates[plateIdx] === "dimmed") return;
    const engine = engineRef.current;
    engine?.lockPlates();
    const boss = zones[b.zoneIdx].chapter.boss!;
    const attack = currentAttack(b);
    const picked = attack.options[b.order[plateIdx]];
    const correctOptIdx = attack.options.findIndex((o) => o.correct);
    const correctPlate = b.order.indexOf(correctOptIdx);
    const states: PlateState[] = b.order.map((_, i) =>
      i === correctPlate ? "correct" : i === plateIdx ? "wrong" : "dimmed"
    );
    engine?.setPlateStates(states);
    b.plateStates = states;
    b.correctLetter = PLATE_LETTERS[correctPlate];
    b.rationale =
      attack.options[correctOptIdx]?.rationale ??
      (picked.correct ? undefined : picked.rationale);
    b.stage = "resolved";
    b.pickedCorrect = picked.correct;

    if (picked.correct) {
      const crit = Math.random() < 0.12;
      const dmg = Math.round((attack.difficulty * 8 + 10) * (crit ? 2 : 1));
      b.bossHp = Math.max(0, b.bossHp - dmg);
      if (crit) sfx.crit();
      else sfx.hit();
      engine?.strikeBoss();
      if (b.bossHp <= 0) {
        b.resolvedNote = `✓ ${crit ? "CRITICAL — " : ""}Your witness strikes true for ${dmg}. ${boss.name} can answer nothing more.`;
      } else {
        b.resolvedNote = `✓ ${crit ? "CRITICAL — " : ""}Your witness strikes true: ${dmg} to ${boss.name}.`;
        if (!b.midlineShown && b.bossHp <= b.bossMax / 2 && boss.midline) {
          b.midlineShown = true;
          b.showMidline = true;
        }
      }
    } else if (b.blessing) {
      sfx.ding();
      b.resolvedNote = `☦ ${b.blessing} intercedes — the blow is turned aside. (You chose ${PLATE_LETTERS[plateIdx]}.)`;
      b.blessing = null;
    } else {
      const dmg = Math.round(attack.difficulty * 6 + 8);
      sfx.wrong();
      engine?.strikePlayer();
      setHurtKey((k) => k + 1);
      const newHp = Math.max(0, hpRef.current - dmg);
      setHpState(newHp);
      b.resolvedNote = `✗ The claim strikes you for ${dmg}.`;
      if (newHp <= 0) {
        b.defeated = true;
        b.resolvedNote = `✗ The claim strikes you for ${dmg} — and the world goes white as bare gesso.`;
      }
    }
    setBattleState(b);
  };

  const continueRound = () => {
    const b = battleRef.current;
    if (!b || b.stage !== "resolved") return;
    if (b.defeated) return finishDefeat();
    if (b.bossHp <= 0) return finishVictory();
    b.qPos += 1;
    beginRound();
  };

  const finishVictory = () => {
    const b = battleRef.current;
    if (!b) return;
    const zone = zones[b.zoneIdx];
    const engine = engineRef.current;
    engine?.clearPlates();
    engine?.bossDefeated(b.zoneIdx);
    engine?.exitBattle();
    sfx.victory();
    const s = saveRef.current;
    const prevRank = rankFor(s.beaten.length);
    if (!s.beaten.includes(zone.chapter.id)) s.beaten.push(zone.chapter.id);
    s.wins += 1;
    s.xp += zone.chapter.reward.xp;
    s.checkpoint = Math.min(b.zoneIdx + 1, zones.length - 1);
    if (!s.startedAt) s.startedAt = Date.now();
    persist();
    const newRank = rankFor(s.beaten.length);
    setHpState(PLAYER_MAX_HP);
    setBattleState(null);
    setCardState({
      kind: "victory",
      zoneIdx: b.zoneIdx,
      xp: zone.chapter.reward.xp,
      rankedUp: newRank !== prevRank ? newRank : null,
    });
  };

  const finishDefeat = () => {
    const b = battleRef.current;
    if (!b) return;
    sfx.defeat();
    const s = saveRef.current;
    s.losses += 1;
    persist();
    engineRef.current?.exitBattle();
    engineRef.current?.respawn(b.zoneIdx);
    setHpState(PLAYER_MAX_HP);
    setCardState({ kind: "defeat", zoneIdx: b.zoneIdx });
    setBattleState(null);
  };

  const withdraw = () => {
    if (!battleRef.current) return;
    engineRef.current?.exitBattle();
    setBattleState(null);
    pushToast("You step back from the trial. The adversary waits.");
  };

  const spendLight = () => {
    const b = battleRef.current;
    const s = saveRef.current;
    if (!b || b.stage !== "question" || b.lightUsed || s.light < 3) return;
    const attack = currentAttack(b);
    const wrongPlates = b.order
      .map((optIdx, plate) => ({ optIdx, plate }))
      .filter((x) => !attack.options[x.optIdx].correct && b.plateStates[x.plate] === "idle");
    const toDim = shuffle(wrongPlates).slice(0, Math.min(2, Math.max(0, wrongPlates.length - 1)));
    if (!toDim.length) return;
    for (const d of toDim) b.plateStates[d.plate] = "dimmed";
    engineRef.current?.setPlateStates(b.plateStates);
    b.lightUsed = true;
    s.light -= 3;
    persist();
    sfx.heal();
    setBattleState(b);
  };

  // ---- explore interactions -------------------------------------------------

  const interact = () => {
    const t = nearRef.current;
    if (!t || battleRef.current || cardRef.current) return;
    const zone = zones[t.zoneIdx];
    if (t.kind === "boss") {
      openBattle(t.zoneIdx);
    } else if (t.kind === "ally") {
      const first = !blessedZones.current.has(t.zoneIdx);
      blessedZones.current.add(t.zoneIdx);
      if (first) {
        sfx.heal();
        setHpState(Math.min(PLAYER_MAX_HP, hpRef.current + 25));
      } else {
        sfx.click();
      }
      setCardState({
        kind: "ally",
        name: zone.allyName ?? "A saint",
        line:
          zone.allyLine?.replace(/\$you/g, "pilgrim") ??
          "Go with God, pilgrim.",
        healed: first,
      });
    } else if (t.kind === "shrine") {
      sfx.click();
      setCardState({ kind: "shrine", zoneIdx: t.zoneIdx });
    } else if (t.kind === "gate") {
      sfx.wrong();
      pushToast(
        `The Royal Doors are sealed. Face ${zone.chapter.boss!.name} at the arena.`
      );
    }
  };

  const dismissCard = () => {
    const c = cardRef.current;
    if (!c) return;
    if (c.kind === "victory" && saveRef.current.beaten.length >= zones.length) {
      setCardState({ kind: "finished" });
      return;
    }
    setCardState(null);
  };

  // ---- engine lifecycle ------------------------------------------------------

  React.useEffect(() => {
    if (phase !== "play") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    setLoading(true);
    setLoadError(null);
    const engine = new PilgrimEngine(canvas, zones, {
      basePath: BASE,
      hair: saveRef.current.hair,
      beaten: new Set(saveRef.current.beaten),
      checkpoint: saveRef.current.checkpoint,
      hooks: {
        onReady: () => {
          setLoading(false);
          setBannerZone(Math.min(saveRef.current.checkpoint, zones.length - 1));
        },
        onZoneChange: (zi) => {
          setBannerZone(zi);
          const s = saveRef.current;
          if (zi > s.checkpoint) {
            s.checkpoint = zi;
            persist();
          }
        },
        onNear: (t) => {
          nearRef.current = t;
          setNear(t);
        },
        onLamp: () => {
          const s = saveRef.current;
          s.light += 1;
          persist();
          sfx.ding();
          const healed = Math.min(PLAYER_MAX_HP, hpRef.current + 10);
          setHpState(healed);
          pushToast("🕯 +1 Light · the lamp's warmth restores you (+10)");
        },
        onPlateCommit: (idx) => resolveAnswer(idx),
      },
    });
    engineRef.current = engine;
    engine.start().catch((e) => {
      console.error(e);
      setLoadError("The icon could not be gilded — assets failed to load.");
    });
    return () => {
      engine.dispose();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, zones]);

  // banner auto-hide
  React.useEffect(() => {
    if (bannerZone === null) return;
    const t = window.setTimeout(() => setBannerZone(null), 4200);
    return () => window.clearTimeout(t);
  }, [bannerZone]);

  // keyboard
  React.useEffect(() => {
    if (phase !== "play") return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "e") interact();
      else if (k === "enter") {
        if (cardRef.current) dismissCard();
        else if (battleRef.current?.stage === "resolved") continueRound();
        else if (battleRef.current?.stage === "intro") beginRound();
      } else if (k === "escape") {
        if (cardRef.current) dismissCard();
      } else if (/^[1-5]$/.test(k) && battleRef.current?.stage === "question") {
        resolveAnswer(parseInt(k, 10) - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ---- title screen -----------------------------------------------------------

  if (phase === "title") {
    const s = saveRef.current;
    const hasSave = s.lastSavedAt > 0 || s.beaten.length > 0;
    return (
      <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#0e0a06] text-parchment">
        <div
          className="min-h-full flex flex-col items-center justify-center px-5 py-10 text-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, #5a431a 0%, #2e2210 45%, #0e0a06 100%)",
          }}
        >
          <div className="text-gold/80 text-[11px] uppercase tracking-[0.5em] mb-3">
            The Orthodox Apologist presents
          </div>
          <h1 className="font-display text-5xl sm:text-6xl text-gold drop-shadow-[0_2px_12px_rgba(201,162,39,0.45)]">
            ΟΔΟΣ
          </h1>
          <div className="font-display text-xl sm:text-2xl text-parchment mt-1">
            The Pilgrim Road
          </div>
          <p className="max-w-md text-sm text-parchment/75 leading-relaxed mt-4">
            Walk into the icon. One golden road runs through {zones.length}{" "}
            stations of the Church&rsquo;s history — from a chained bishop on
            the road to Rome, to the last adversary, who wears your own face.
            At every station a claim is hurled against the faith;{" "}
            <span className="text-gold">
              run to the answer and stand upon it.
            </span>
          </p>

          <div className="mt-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold/70 mb-2">
              Your pilgrim&rsquo;s hair
            </div>
            <div className="flex gap-2 justify-center">
              {HAIR_CHOICES.map((h) => (
                <button
                  key={h.id}
                  onClick={() => {
                    setHair(h.id);
                    saveRef.current.hair = h.id;
                  }}
                  aria-label={h.label}
                  className={`w-9 h-9 rounded-full border-2 transition ${
                    hair === h.id
                      ? "border-gold scale-110"
                      : "border-parchment/25 hover:border-parchment/60"
                  }`}
                  style={{ background: h.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col items-center gap-2.5">
            <button
              onClick={() => {
                sfx.click();
                if (!saveRef.current.startedAt) saveRef.current.startedAt = Date.now();
                writeSave(saveRef.current);
                syncHud();
                setPhase("play");
              }}
              className="font-display text-lg bg-gold text-[#14100a] px-10 py-3 rounded border-2 border-[#f0d358] hover:brightness-110 active:translate-y-px shadow-[0_0_30px_rgba(201,162,39,0.35)]"
            >
              {hasSave ? "Continue the Pilgrimage" : "Set Out"}
            </button>
            {hasSave && (
              <button
                onClick={() => {
                  if (window.confirm("Begin anew? Your road so far will be wiped clean.")) {
                    clearSave();
                    saveRef.current = { ...emptySave(), hair };
                    syncHud();
                    setPhase("play");
                  }
                }}
                className="text-xs text-parchment/55 hover:text-parchment underline-offset-2 hover:underline"
              >
                Begin anew
              </button>
            )}
            {hasSave && (
              <div className="text-[11px] text-parchment/60">
                {s.beaten.length}/{zones.length} stations · {s.xp} XP ·{" "}
                {rankFor(s.beaten.length)}
              </div>
            )}
          </div>

          <div className="mt-8 max-w-md text-[11px] text-parchment/50 leading-relaxed">
            <span className="text-parchment/70">Move</span> WASD / left stick ·{" "}
            <span className="text-parchment/70">Look</span> drag ·{" "}
            <span className="text-parchment/70">Act</span> E / tap ·{" "}
            <span className="text-parchment/70">Answer</span> run onto a plate,
            tap it, or press 1–4
          </div>
          <Link
            href="/"
            className="mt-6 text-xs text-gold/70 hover:text-gold no-underline"
          >
            ⟵ Back to the study
          </Link>
        </div>
      </div>
    );
  }

  // ---- play -------------------------------------------------------------------

  const zone = zones[Math.min(bannerZone ?? 0, zones.length - 1)];
  const nearZone = near ? zones[near.zoneIdx] : null;
  const b = battle;
  const battleBoss = b ? zones[b.zoneIdx].chapter.boss! : null;
  const battleAttack = b && b.stage !== "intro" ? zones[b.zoneIdx].chapter.boss!.attacks[b.queue[b.qPos % b.queue.length]] : null;
  const panelOptions: PanelOption[] =
    b && battleAttack
      ? b.order.map((optIdx, plate) => ({
          text: battleAttack.options[optIdx].text,
          state: b.plateStates[plate] ?? "idle",
        }))
      : [];

  return (
    <div className="fixed inset-0 z-[100] bg-black select-none">
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />

      {/* kovcheg: the icon's painted border around the viewport */}
      <div className="pointer-events-none absolute inset-0 z-20 border-[3px] border-[#c9a227]/70" />
      <div className="pointer-events-none absolute inset-[7px] z-20 border border-[#7a5e10]/60" />

      {/* damage vignette */}
      {hurtKey > 0 && (
        <div
          key={hurtKey}
          className="pointer-events-none absolute inset-0 z-20 animate-[hurtflash_0.5s_ease-out_1]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(124,20,20,0.55) 100%)",
          }}
        />
      )}

      {/* top-left: exit + station */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
        <Link
          href="/"
          className="no-underline text-[11px] bg-black/70 border border-gold/50 text-gold px-2.5 py-1.5 rounded hover:bg-black/90"
        >
          ⟵ Study
        </Link>
        <div className="bg-black/70 border border-gold/40 rounded px-2.5 py-1.5 text-[11px] text-parchment/85">
          Station {ROMAN[Math.min(saveRef.current.checkpoint, zones.length - 1)] ?? "I"} ·{" "}
          {hud.beaten}/{zones.length}
        </div>
      </div>

      {/* top-right: vitals */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
        <div className="bg-black/70 border border-gold/40 rounded px-2.5 py-1.5 flex items-center gap-2">
          <div className="w-20 sm:w-28 h-2 bg-[#14100a] rounded-sm overflow-hidden border border-gold/40">
            <div
              className="h-full bg-gradient-to-r from-[#f0d358] to-gold transition-all duration-500"
              style={{ width: `${(hp / PLAYER_MAX_HP) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-parchment/80 font-mono">{hp}</span>
        </div>
        <div className="bg-black/70 border border-gold/40 rounded px-2.5 py-1.5 text-[11px] text-gold">
          🕯 {hud.light}
        </div>
        <div className="hidden sm:block bg-black/70 border border-gold/40 rounded px-2.5 py-1.5 text-[11px] text-parchment/85">
          {hud.rank} · {hud.xp} XP
        </div>
        <button
          onClick={() => {
            const m = !muted;
            setMuted(m);
            setMutedState(m);
          }}
          className="bg-black/70 border border-gold/40 rounded px-2.5 py-1.5 text-[11px] text-gold"
          aria-label="Toggle sound"
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>

      {/* chapter banner */}
      {bannerZone !== null && !b && (
        <div className="pointer-events-none absolute top-[18%] inset-x-0 z-30 flex justify-center px-4">
          <div className="text-center bg-black/65 border-2 border-gold/60 rounded-lg px-6 py-4 max-w-lg animate-[bannerfade_4.2s_ease-in-out_1]">
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold/90">
              Station {ROMAN[zone.index]} · {zone.chapter.era}
            </div>
            <div className="font-display text-xl sm:text-2xl text-parchment mt-1">
              {zone.chapter.title}
            </div>
            <div className="text-[11px] text-parchment/65 mt-1">
              {zone.chapter.location}
            </div>
          </div>
        </div>
      )}

      {/* interact prompt */}
      {near && !b && !card && (
        <div className="absolute bottom-24 inset-x-0 z-30 flex justify-center px-4 pointer-events-none">
          <button
            onClick={interact}
            className="pointer-events-auto bg-black/80 border-2 border-gold/70 rounded-lg px-4 py-2.5 text-sm text-parchment hover:bg-black/95 active:translate-y-px"
          >
            {near.kind === "boss" && (
              <>
                <span className="text-crimson">⚔</span> Face{" "}
                <span className="text-gold">{nearZone?.chapter.boss!.name}</span>
                {!coarse && <span className="text-parchment/50 text-xs"> — E</span>}
              </>
            )}
            {near.kind === "ally" && (
              <>
                <span className="text-gold">☦</span> Greet{" "}
                <span className="text-gold">{nearZone?.allyName}</span>
                {!coarse && <span className="text-parchment/50 text-xs"> — E</span>}
              </>
            )}
            {near.kind === "shrine" && (
              <>
                <span className="text-gold">✦</span> Venerate the station icon
                {!coarse && <span className="text-parchment/50 text-xs"> — E</span>}
              </>
            )}
            {near.kind === "gate" && (
              <>
                <span className="text-gold">🚪</span> The Royal Doors
                {!coarse && <span className="text-parchment/50 text-xs"> — E</span>}
              </>
            )}
          </button>
        </div>
      )}

      {/* battle UI */}
      {b && battleBoss && (
        <BattlePanel
          bossName={battleBoss.name}
          bossTitle={battleBoss.title}
          tradition={battleBoss.tradition}
          bossHp={b.bossHp}
          bossMax={b.bossMax}
          playerHp={hp}
          playerMax={PLAYER_MAX_HP}
          stage={b.stage}
          introText={battleBoss.intro}
          midline={b.showMidline ? battleBoss.midline : null}
          claim={battleAttack?.claim ?? ""}
          taunt={battleAttack?.taunt}
          options={panelOptions}
          pickedCorrect={b.pickedCorrect}
          resolvedNote={b.resolvedNote}
          rationale={b.rationale}
          correctLetter={b.correctLetter}
          light={hud.light}
          lightUsed={b.lightUsed}
          blessing={b.blessing}
          onBegin={beginRound}
          onPick={resolveAnswer}
          onContinue={continueRound}
          onSpendLight={spendLight}
          onWithdraw={withdraw}
        />
      )}

      {/* cards */}
      {card && (
        <div
          className="absolute inset-0 z-40 bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={dismissCard}
        >
          <div
            className="bg-[#100c07] border-2 border-gold/70 rounded-lg max-w-lg w-full p-5 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {card.kind === "ally" && (
              <>
                <div className="text-[10px] uppercase tracking-[0.35em] text-gold/90 mb-2">
                  ☦ {card.name}
                </div>
                <p className="text-parchment text-sm leading-relaxed italic">
                  “{card.line}”
                </p>
                <p className="text-gold/90 text-xs mt-3">
                  {card.healed
                    ? "A blessing rests on you: in the coming trial, one wrong answer will be turned aside — and your wounds are eased (+25)."
                    : "The saint's blessing already rests on you."}
                </p>
              </>
            )}
            {card.kind === "shrine" && (
              <>
                <div className="text-[10px] uppercase tracking-[0.35em] text-gold/90 mb-2">
                  ✦ Station {ROMAN[card.zoneIdx]} · {zones[card.zoneIdx].chapter.era}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE}/backgrounds/${zones[card.zoneIdx].chapter.background}.webp`}
                  alt=""
                  className="w-full rounded border-2 border-[#7a5e10] mb-3"
                  draggable={false}
                />
                <div className="font-display text-lg text-parchment">
                  {zones[card.zoneIdx].chapter.title}
                </div>
                <div className="text-[11px] text-parchment/60 mb-2">
                  {zones[card.zoneIdx].chapter.location}
                </div>
                {zones[card.zoneIdx].narratorLine && (
                  <p className="text-parchment/80 text-xs leading-relaxed italic">
                    {zones[card.zoneIdx].narratorLine}
                  </p>
                )}
              </>
            )}
            {card.kind === "victory" && (
              <>
                <div className="text-[10px] uppercase tracking-[0.35em] text-gold mb-2">
                  ✓ The witness stands
                </div>
                <p className="text-parchment/85 text-sm leading-relaxed italic">
                  “{zones[card.zoneIdx].chapter.boss!.outro}”
                </p>
                {zones[card.zoneIdx].chapter.boss!.victoryEpigraph && (
                  <div className="mt-3 border-l-2 border-gold/60 pl-3">
                    <p className="text-[#ffe98c] text-sm leading-relaxed">
                      {zones[card.zoneIdx].chapter.boss!.victoryEpigraph!.text}
                    </p>
                    <p className="text-gold/70 text-[11px] mt-1">
                      — {zones[card.zoneIdx].chapter.boss!.victoryEpigraph!.source}
                    </p>
                  </div>
                )}
                <p className="text-gold text-sm mt-3">
                  +{card.xp} XP
                  {card.rankedUp && (
                    <span className="text-parchment">
                      {" "}
                      · you are raised to <span className="text-gold">{card.rankedUp}</span>
                    </span>
                  )}
                </p>
                <p className="text-parchment/60 text-xs mt-1.5">
                  The Royal Doors stand open. The road continues.
                </p>
              </>
            )}
            {card.kind === "defeat" && (
              <>
                <div className="text-[10px] uppercase tracking-[0.35em] text-crimson mb-2">
                  ✗ The trial overwhelms you
                </div>
                <p className="text-parchment/85 text-sm leading-relaxed">
                  The world fades to bare gesso… and you wake again at the
                  station&rsquo;s edge, whole. The Church has buried every one
                  of her adversaries&rsquo; arguments before — take up the road
                  again.
                </p>
                <p className="text-parchment/55 text-xs mt-2">
                  Tip: greet the station&rsquo;s saint for a blessing, gather
                  lamps for Light, and spend 🕯 3 in battle to dim two false
                  answers.
                </p>
              </>
            )}
            {card.kind === "finished" && (
              <>
                <div className="text-center">
                  <div className="font-display text-3xl text-gold">ΤΕΛΟΣ</div>
                  <p className="text-parchment text-sm leading-relaxed mt-3">
                    Thirteen stations. Every adversary answered — pagan and
                    heresiarch, cardinal and commissar, missionary, skeptic,
                    and the shadow that wore your own face.
                  </p>
                  <p className="text-gold font-display text-lg mt-4">
                    You are an Apologist.
                  </p>
                  <p className="text-parchment/70 text-xs mt-3 italic">
                    Δόξα τῷ Θεῷ πάντων ἕνεκεν — Glory to God for all things.
                  </p>
                  <p className="text-parchment/55 text-[11px] mt-3">
                    {saveRef.current.wins} trials won · {saveRef.current.losses}{" "}
                    falls · {hud.xp} XP
                  </p>
                </div>
              </>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={dismissCard}
                className="font-display text-sm bg-gold text-[#14100a] px-5 py-2 rounded border-2 border-[#f0d358] hover:brightness-110"
              >
                {card.kind === "finished" ? "Walk on ⏎" : "Continue ⏎"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* toasts */}
      <div className="pointer-events-none absolute bottom-40 inset-x-0 z-30 flex flex-col items-center gap-1.5 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-black/80 border border-gold/50 rounded px-3 py-1.5 text-[11px] text-parchment/90"
          >
            {t.text}
          </div>
        ))}
      </div>

      {/* touch controls */}
      {coarse && <Joystick onMove={(x, y) => engineRef.current?.setJoystick(x, y)} />}

      {/* loading / error */}
      {(loading || loadError) && (
        <div className="absolute inset-0 z-50 bg-[#0e0a06] flex flex-col items-center justify-center gap-3">
          {loadError ? (
            <>
              <div className="text-crimson text-sm">{loadError}</div>
              <button
                onClick={() => setPhase("title")}
                className="text-gold text-xs underline"
              >
                Back
              </button>
            </>
          ) : (
            <>
              <div className="font-display text-gold text-xl animate-pulse">ΟΔΟΣ</div>
              <div className="text-parchment/60 text-xs">Gilding the icon…</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
