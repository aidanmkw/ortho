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
import Vespers from "./Vespers";
import { RELICS, CAVE_RELIC } from "@/lib/quest3d/relics";
import { loadModelManifest } from "@/lib/quest3d/modelRig";
import { startAmbience, stopAmbience, resumeAmbience, setMood } from "@/lib/quest3d/ambience";
import { buildSideDuels } from "@/lib/quest3d/sideQuests";
import { startChant, stopChant } from "@/lib/chant";
import { withLiveAttacks } from "@/lib/quest/liveBattle";
import {
  loadProgress as loadMainProgress,
  saveProgress as saveMainProgress,
  recordResult,
} from "@/lib/progress";
import type { ProgressState } from "@/lib/progress";

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
  duelIdx: number | null;
  attacks: BossAttack[];
  authoredCount: number;
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
  blessingCharges: number;
  corrects: number;
  activeSide: -1 | 0 | 1;
  ghosts: BossAttack[];
  ghostAttack: BossAttack | null;
};

type Card =
  | { kind: "ally"; name: string; line: string; healed: boolean }
  | { kind: "shrine"; zoneIdx: number; healed: boolean }
  | { kind: "caveq"; zoneIdx: number; attack: BossAttack; picked: number | null; won: boolean; relicId: string | null }
  | { kind: "chapel"; zoneIdx: number }
  | { kind: "victory"; xp: number; rankedUp: string | null; outro: string; epigraph?: { text: string; source: string }; laurel?: boolean }
  | { kind: "defeat"; zoneIdx: number }
  | { kind: "finished" };

type Toast = { id: number; text: string };

export default function PilgrimageApp() {
  const zones = React.useMemo<ZoneDef[]>(() => buildZones(), []);

  const [phase, setPhase] = React.useState<"title" | "play" | "vespers">("title");
  const [showMap, setShowMap] = React.useState(false);
  const [curZone, setCurZone] = React.useState(0);
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
  const veneratedZones = React.useRef<Set<number>>(new Set());
  const caveUsed = React.useRef<Set<number>>(new Set());
  const chapelUsed = React.useRef<Set<number>>(new Set());
  const lastDefeatZone = React.useRef<number>(-1);
  const timerDeadline = React.useRef<number | null>(null);
  const toastId = React.useRef(1);
  const [plateFocus, setPlateFocus] = React.useState<number | null>(null);
  const [timerLeft, setTimerLeft] = React.useState<number | null>(null);

  const sideDuels = React.useMemo(() => buildSideDuels(), []);
  const vespersChapters = React.useMemo(
    () => [...zones.map((z) => z.chapter), ...sideDuels.map((d) => d.chapter)],
    [zones, sideDuels]
  );
  const [companionSay, setCompanionSay] = React.useState<string | null>(null);
  const companionTimer = React.useRef<number | null>(null);
  const visitedZones = React.useRef<Set<number>>(new Set());
  const lowHpSaid = React.useRef(false);
  const mainProgress = React.useRef<ProgressState | null>(null);
  const voicesRef = React.useRef<Set<string>>(new Set());
  const voiceEl = React.useRef<HTMLAudioElement | null>(null);
  const playVoice = (chapterId: string, kind: "intro" | "midline" | "outro") => {
    if (!voicesRef.current.has(chapterId) || getMuted()) return;
    try {
      voiceEl.current?.pause();
      const a = new Audio(`${BASE}/voice/${chapterId}-${kind}.mp3`);
      a.volume = 0.9;
      voiceEl.current = a;
      void a.play().catch(() => {});
    } catch {}
  };
  const maxHp = () => (saveRef.current.relics.includes("psalter") ? 115 : 100);
  const hasRelic = (id: string) => saveRef.current.relics.includes(id);

  React.useEffect(() => {
    loadModelManifest(BASE).then((m) => {
      voicesRef.current = m.voices;
    });
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

  const companion = (text: string, seconds = 6.5) => {
    setCompanionSay(text);
    if (companionTimer.current) window.clearTimeout(companionTimer.current);
    companionTimer.current = window.setTimeout(() => setCompanionSay(null), seconds * 1000);
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
    saveRef.current.hp = v;
    setHp(v);
  };

  // ---- battle flow ---------------------------------------------------------

  const currentAttack = (b: Battle): BossAttack => {
    if (b.ghostAttack) return b.ghostAttack;
    return b.attacks[b.queue[b.qPos % b.queue.length]];
  };

  const SIGNATURE: Record<string, string> = {
    "ch4-desert": "The Tempter snuffs the sun — only your lantern holds the dark at bay.",
    "ch7-schism": "The arena splits East and West. Answer from the bank where the Spirit rests.",
    "ch9-soviets": "The interrogation clock is running. Eighteen seconds to answer, prisoner.",
    "ch11-doubt": "The Doubt remembers every time you faltered. Your old wrong answers return.",
  };

  const applyChipDamage = (dmg: number) => {
    const b = battleRef.current;
    if (!b) return;
    sfx.hit();
    setHurtKey((k) => k + 1);
    const newHp = Math.max(0, hpRef.current - dmg);
    setHpState(newHp);
    if (newHp <= 35 && !lowHpSaid.current) {
      lowHpSaid.current = true;
      companion("Courage, pilgrim — the martyrs stood where you stand.");
    }
    if (newHp <= 0) {
      b.defeated = true;
      finishDefeat();
    }
  };

  const applySmite = () => {
    const b = battleRef.current;
    if (!b) return;
    const dmg = hasRelic("wheel") ? 28 : 14;
    b.bossHp = Math.max(0, b.bossHp - dmg);
    sfx.crit();
    pushToast(`⚔ You press the witness — ${dmg} bonus damage!`);
    if (b.bossHp <= 0) {
      finishVictory();
      return;
    }
    setBattleState(b);
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
    // augment the authored pool with live corpus questions chosen by the
    // player's spaced-repetition state — battling IS studying
    mainProgress.current = loadMainProgress();
    const liveBoss = withLiveAttacks(boss, mainProgress.current, 5);
    setMood({ battle: 1 });
    const engine = engineRef.current;
    engine?.enterBattle(zoneIdx);
    const chId = zones[zoneIdx].chapter.id;
    // signature staging
    if (chId === "ch4-desert") engine?.setBattleDarkness(1);
    if (chId === "ch9-soviets") {
      engine?.setBattleDarkness(0.55);
      engine?.setSpotlight(true);
    }
    if (SIGNATURE[chId]) pushToast(SIGNATURE[chId]);
    // The Doubt replays your own recorded failures
    let ghosts: BossAttack[] = [];
    if (chId === "ch11-doubt") {
      ghosts = shuffle(
        saveRef.current.wrongLog
          .map((w) => {
            const z = zones.find((zz) => zz.chapter.boss?.id === w.b);
            return z?.chapter.boss?.attacks[w.a];
          })
          .filter((a): a is BossAttack => !!a)
      ).slice(0, 4);
    }
    if (lastDefeatZone.current === zoneIdx) {
      window.setTimeout(() => engine?.bossSay("Back again? The truth has not changed, pilgrim.", 3.6), 900);
    } else {
      window.setTimeout(() => {
        engine?.bossSay(boss.intro.slice(0, 130), 4.2);
        playVoice(chId, "intro");
      }, 900);
    }
    setBattleState({
      zoneIdx,
      duelIdx: null,
      attacks: liveBoss.attacks,
      authoredCount: boss.attacks.length,
      stage: "intro",
      queue: shuffle(liveBoss.attacks.map((_, i) => i)),
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
      blessingCharges: blessing ? (hasRelic("rope") ? 2 : 1) : 0,
      corrects: 0,
      activeSide: 0,
      ghosts,
      ghostAttack: null,
    });
    lowHpSaid.current = false;
  };

  const openDuel = (duelIdx: number) => {
    if (battleRef.current) return;
    const duel = sideDuels[duelIdx];
    if (!duel?.chapter.boss) return;
    const boss = duel.chapter.boss;
    sfx.bossEnter();
    mainProgress.current = loadMainProgress();
    const liveBoss = withLiveAttacks(boss, mainProgress.current, 5);
    const max = Math.max(60, Math.round((boss.maxHp * BOSS_HP_SCALE) / 10) * 10);
    const blessing = blessedZones.current.has(duel.zone) ? zones[duel.zone].allyName ?? null : null;
    setNear(null);
    nearRef.current = null;
    setMood({ battle: 1 });
    const engine = engineRef.current;
    engine?.enterDuel(duelIdx);
    window.setTimeout(() => {
      engine?.bossSay(boss.intro.slice(0, 130), 4.2);
      playVoice(duel.chapter.id, "intro");
    }, 800);
    setBattleState({
      zoneIdx: duel.zone,
      duelIdx,
      attacks: liveBoss.attacks,
      authoredCount: boss.attacks.length,
      stage: "intro",
      queue: shuffle(liveBoss.attacks.map((_, i) => i)),
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
      blessingCharges: blessing ? (hasRelic("rope") ? 2 : 1) : 0,
      corrects: 0,
      activeSide: 0,
      ghosts: [],
      ghostAttack: null,
    });
  };

  const beginRound = () => {
    const b = battleRef.current;
    if (!b) return;
    const engine = engineRef.current;
    const chId = zones[b.zoneIdx].chapter.id;
    // The Doubt: every other round is one of YOUR old wrong answers
    b.ghostAttack =
      chId === "ch11-doubt" && b.ghosts.length && b.qPos % 2 === 1
        ? b.ghosts.shift()!
        : null;
    const attack = currentAttack(b);
    b.stage = "question";
    b.order = shuffle(attack.options.map((_, i) => i));
    b.plateStates = attack.options.map(() => "idle");
    b.lightUsed = false;
    b.showMidline = false;
    b.pickedCorrect = undefined;
    b.resolvedNote = undefined;
    b.rationale = undefined;
    const shorts = b.order.map((optIdx) => attack.options[optIdx].text);
    engine?.spawnPlates(b.order.length, shorts);
    engine?.showClaim((b.ghostAttack ? "YOUR OLD DOUBT: " : "") + attack.claim);
    if (b.ghostAttack) engine?.bossSay("You faltered on this once. Will you again?");
    else if (attack.taunt) engine?.bossSay(attack.taunt);
    if (chId === "ch7-schism") {
      b.activeSide = b.qPos % 2 === 0 ? 1 : -1;
      engine?.setSchismSide(b.activeSide);
      pushToast(`The Spirit rests on the ${b.activeSide > 0 ? "EAST" : "WEST"} bank — answer from there.`);
    }
    if (chId === "ch9-soviets") {
      timerDeadline.current = Date.now() + 18000;
      setTimerLeft(18);
    } else {
      timerDeadline.current = null;
      setTimerLeft(null);
    }
    engine?.setBossAggro(true);
    setBattleState(b);
    setPlateFocus(null);
  };

  const resolveAnswer = (plateIdx: number) => {
    const b = battleRef.current;
    if (!b || b.stage !== "question") return;
    if (b.plateStates[plateIdx] === "dimmed") return;
    const engine = engineRef.current;
    engine?.lockPlates();
    engine?.setBossAggro(false);
    engine?.hideClaim();
    timerDeadline.current = null;
    setTimerLeft(null);
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

    // record to the main app's spaced-repetition scheduler
    if (attack.itemId && mainProgress.current) {
      mainProgress.current = recordResult(
        mainProgress.current,
        attack.itemId,
        attack.difficulty,
        picked.correct ? "correct" : "wrong"
      );
      saveMainProgress(mainProgress.current);
    }

    if (picked.correct) {
      const crit = Math.random() < 0.12;
      let mult = crit ? 2 : 1;
      let sideNote = "";
      if (b.activeSide !== 0 && engine && engine.getPlateSide(plateIdx) !== b.activeSide) {
        mult *= 0.6;
        sideNote = " (spoken from the far bank, it lands softly)";
      }
      const dmg = Math.round((attack.difficulty * 8 + 10) * mult);
      b.corrects += 1;
      engine?.setCrowdCount(b.corrects * 2);
      b.bossHp = Math.max(0, b.bossHp - dmg);
      void sideNote;
      if (crit) sfx.crit();
      else sfx.hit();
      engine?.strikeBoss();
      if (b.bossHp > 0) {
        engine?.staggerBoss();
        if (b.bossHp <= b.bossMax / 2) engine?.setBossPhase2(true);
      }
      if (b.bossHp <= 0) {
        b.resolvedNote = `✓ ${crit ? "CRITICAL — " : ""}Your witness strikes true for ${dmg}. ${boss.name} can answer nothing more.`;
      } else {
        b.resolvedNote = `✓ ${crit ? "CRITICAL — " : ""}Your witness strikes true: ${dmg} to ${boss.name}.${sideNote}`;
        if (!b.midlineShown && b.bossHp <= b.bossMax / 2 && boss.midline) {
          b.midlineShown = true;
          b.showMidline = true;
          engine?.bossSay(boss.midline, 4);
          playVoice(b.duelIdx !== null ? sideDuels[b.duelIdx].chapter.id : zones[b.zoneIdx].chapter.id, "midline");
        }
      }
    } else if (b.blessingCharges > 0) {
      sfx.ding();
      b.blessingCharges -= 1;
      b.resolvedNote = `☦ ${b.blessing} intercedes — the blow is turned aside. (You chose ${PLATE_LETTERS[plateIdx]}.)${b.blessingCharges > 0 ? " One grace remains." : ""}`;
      if (b.blessingCharges <= 0) b.blessing = null;
    } else {
      const dmg = Math.round(attack.difficulty * 6 + 8);
      sfx.wrong();
      engine?.strikePlayer();
      engine?.empowerNextVolley();
      engine?.spawnWisp();
      if (attack.taunt) engine?.bossSay(attack.taunt, 3);
      // The Doubt will remember this
      if (!b.ghostAttack && b.queue[b.qPos % b.queue.length] < b.authoredCount) {
        const aIdx = b.queue[b.qPos % b.queue.length];
        const log = saveRef.current.wrongLog;
        if (!log.some((w) => w.b === boss.id && w.a === aIdx)) {
          log.push({ b: boss.id, a: aIdx });
          if (log.length > 24) log.shift();
        }
      }
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

  const resolveTimeout = () => {
    const b = battleRef.current;
    if (!b || b.stage !== "question") return;
    const engine = engineRef.current;
    engine?.lockPlates();
    engine?.setBossAggro(false);
    engine?.hideClaim();
    timerDeadline.current = null;
    setTimerLeft(null);
    const attack = currentAttack(b);
    const correctOptIdx = attack.options.findIndex((o) => o.correct);
    const correctPlate = b.order.indexOf(correctOptIdx);
    const states: PlateState[] = b.order.map((_, i) => (i === correctPlate ? "correct" : "dimmed"));
    engine?.setPlateStates(states);
    b.plateStates = states;
    b.correctLetter = PLATE_LETTERS[correctPlate];
    b.rationale = attack.options[correctOptIdx]?.rationale;
    b.stage = "resolved";
    b.pickedCorrect = false;
    const dmg = Math.round(attack.difficulty * 6 + 10);
    sfx.wrong();
    engine?.strikePlayer();
    engine?.spawnWisp();
    engine?.bossSay("The clock has run out. Silence is agreement, prisoner.", 3.6);
    setHurtKey((k) => k + 1);
    const newHp = Math.max(0, hpRef.current - dmg);
    setHpState(newHp);
    b.resolvedNote = `✗ Time expires — the interrogator strikes for ${dmg}.`;
    if (newHp <= 0) {
      b.defeated = true;
      b.resolvedNote += " The world goes white as bare gesso.";
    }
    setBattleState(b);
  };

  // NKVD interrogation clock
  React.useEffect(() => {
    if (timerLeft === null) return;
    const iv = window.setInterval(() => {
      if (!timerDeadline.current) return;
      const left = Math.max(0, (timerDeadline.current - Date.now()) / 1000);
      setTimerLeft(left);
      if (left <= 0) {
        window.clearInterval(iv);
        resolveTimeout();
      }
    }, 250);
    return () => window.clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerLeft !== null]);

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
    const engine = engineRef.current;
    engine?.clearPlates();
    setMood({ battle: 0 });
    const s = saveRef.current;
    if (b.duelIdx !== null) {
      // legendary duel of the Second Road
      const duel = sideDuels[b.duelIdx];
      const boss = duel.chapter.boss!;
      engine?.duelDefeated(b.duelIdx);
      engine?.exitBattle();
      sfx.victory();
      playVoice(duel.chapter.id, "outro");
      if (!s.laurels.includes(duel.chapter.id)) s.laurels.push(duel.chapter.id);
      s.wins += 1;
      s.xp += duel.chapter.reward.xp;
      s.light += 5;
      setHpState(Math.min(maxHp(), hpRef.current + 25));
      persist();
      companion("A legend of the Church, honored. The Second Road remembers you.");
      setBattleState(null);
      setCardState({
        kind: "victory",
        xp: duel.chapter.reward.xp,
        rankedUp: null,
        outro: boss.outro,
        epigraph: boss.victoryEpigraph,
        laurel: true,
      });
      return;
    }
    const zone = zones[b.zoneIdx];
    engine?.bossDefeated(b.zoneIdx);
    engine?.exitBattle();
    sfx.victory();
    playVoice(zone.chapter.id, "outro");
    const prevRank = rankFor(s.beaten.length);
    if (!s.beaten.includes(zone.chapter.id)) s.beaten.push(zone.chapter.id);
    s.wins += 1;
    s.xp += zone.chapter.reward.xp;
    s.checkpoint = Math.min(b.zoneIdx + 1, zones.length - 1);
    if (!s.startedAt) s.startedAt = Date.now();
    const newRank = rankFor(s.beaten.length);
    setHpState(Math.min(maxHp(), hpRef.current + 25));
    persist();
    lastDefeatZone.current = -1;
    companion(["Δόξα τῷ Θεῷ — another shadow falls.", "Well witnessed, pilgrim.", "So the Fathers answered, and so do you."][s.beaten.length % 3]);
    setBattleState(null);
    setCardState({
      kind: "victory",
      xp: zone.chapter.reward.xp,
      rankedUp: newRank !== prevRank ? newRank : null,
      outro: zone.chapter.boss!.outro,
      epigraph: zone.chapter.boss!.victoryEpigraph,
    });
  };

  const finishDefeat = () => {
    const b = battleRef.current;
    if (!b) return;
    sfx.defeat();
    const s = saveRef.current;
    s.losses += 1;
    lastDefeatZone.current = b.zoneIdx;
    veneratedZones.current.delete(b.zoneIdx); // the shrine will receive you again
    engineRef.current?.exitBattle();
    engineRef.current?.respawn(b.zoneIdx);
    setMood({ battle: 0 });
    setHpState(Math.round(maxHp() * 0.6));
    persist();
    setCardState({ kind: "defeat", zoneIdx: b.zoneIdx });
    setBattleState(null);
  };

  const withdraw = () => {
    if (!battleRef.current) return;
    setMood({ battle: 0 });
    engineRef.current?.exitBattle();
    setBattleState(null);
    pushToast("You step back from the trial. The adversary waits.");
  };

  const spendLight = () => {
    const b = battleRef.current;
    const s = saveRef.current;
    const cost = hasRelic("pen") ? 2 : 3;
    if (!b || b.stage !== "question" || b.lightUsed || s.light < cost) return;
    const attack = currentAttack(b);
    const wrongPlates = b.order
      .map((optIdx, plate) => ({ optIdx, plate }))
      .filter((x) => !attack.options[x.optIdx].correct && b.plateStates[x.plate] === "idle");
    const toDim = shuffle(wrongPlates).slice(0, Math.min(2, Math.max(0, wrongPlates.length - 1)));
    if (!toDim.length) return;
    for (const d of toDim) b.plateStates[d.plate] = "dimmed";
    engineRef.current?.setPlateStates(b.plateStates);
    b.lightUsed = true;
    s.light -= hasRelic("pen") ? 2 : 3;
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
      const fresh = !veneratedZones.current.has(t.zoneIdx);
      if (fresh) {
        veneratedZones.current.add(t.zoneIdx);
        setHpState(maxHp());
        sfx.heal();
      } else sfx.click();
      setCardState({ kind: "shrine", zoneIdx: t.zoneIdx, healed: fresh });
    } else if (t.kind === "cave") {
      if (caveUsed.current.has(t.zoneIdx)) {
        pushToast("The hermit has withdrawn to prayer.");
        return;
      }
      sfx.click();
      const pool = zone.chapter.boss!.attacks.filter((a) => a.difficulty >= 3);
      const attack = shuffle(pool.length ? pool : zone.chapter.boss!.attacks)[0];
      setCardState({ kind: "caveq", zoneIdx: t.zoneIdx, attack, picked: null, won: false, relicId: null });
    } else if (t.kind === "chapel") {
      if (chapelUsed.current.has(t.zoneIdx)) {
        pushToast("The candles here have already given their light.");
        return;
      }
      chapelUsed.current.add(t.zoneIdx);
      sfx.heal();
      const s = saveRef.current;
      s.light += 3;
      setHpState(Math.min(maxHp(), hpRef.current + 15));
      persist();
      setCardState({ kind: "chapel", zoneIdx: t.zoneIdx });
    } else if (t.kind === "duel") {
      openDuel(t.duelIdx);
    } else if (t.kind === "gate") {
      sfx.wrong();
      pushToast(
        `The Royal Doors are sealed. Face ${zone.chapter.boss!.name} at the arena.`
      );
    }
  };

  const answerCave = (idx: number) => {
    const c = cardRef.current;
    if (!c || c.kind !== "caveq" || c.picked !== null) return;
    const correct = !!c.attack.options[idx]?.correct;
    caveUsed.current.add(c.zoneIdx);
    let relicId: string | null = null;
    if (correct) {
      sfx.levelUp();
      const rid = CAVE_RELIC[c.zoneIdx];
      const s = saveRef.current;
      if (rid && !s.relics.includes(rid)) {
        s.relics.push(rid);
        relicId = rid;
      } else {
        s.light += 3;
      }
      setHpState(Math.min(maxHp(), hpRef.current + 10));
      persist();
    } else {
      sfx.wrong();
      setHurtKey((k) => k + 1);
      setHpState(Math.max(1, hpRef.current - 12));
      persist();
    }
    setCardState({ ...c, picked: idx, won: correct, relicId });
  };

  const dismissCard = () => {
    const c = cardRef.current;
    if (!c) return;
    if (c.kind === "caveq" && c.picked === null) return; // answer first
    if (c.kind === "victory" && saveRef.current.beaten.length >= zones.length) {
      setCardState({ kind: "finished" });
      return;
    }
    setCardState(null);
  };

  // ---- engine lifecycle ------------------------------------------------------

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setLoading(true);
    setLoadError(null);
    const engine = new PilgrimEngine(canvas, zones, {
      basePath: BASE,
      hair: saveRef.current.hair,
      hairHex: HAIR_CHOICES.find((h) => h.id === saveRef.current.hair)?.hex,
      beaten: new Set(saveRef.current.beaten),
      laurels: new Set(saveRef.current.laurels),
      checkpoint: saveRef.current.checkpoint,
      hooks: {
        onReady: () => {
          setLoading(false);
          setBannerZone(Math.min(saveRef.current.checkpoint, zones.length - 1));
        },
        onZoneChange: (zi) => {
          setCurZone(zi);
          if (!visitedZones.current.has(zi)) {
            visitedZones.current.add(zi);
            const line = zones[zi].narratorLine;
            if (line) window.setTimeout(() => companion(line, 8), 2500);
          }
          const pal = zones[zi].palette;
          setMood({
            wind: 0.4 + (pal.treeDensity ?? 0.5) * 0.4,
            snow: pal.snowfall ? 1 : 0,
            gloom: pal.gloom ?? 0,
          });
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
        onPlayerHit: (dmg) => applyChipDamage(dmg),
        onSmite: () => applySmite(),
        onPlateFocus: (idx) => setPlateFocus(idx),
        onBoltDodged: () => {
          if (hasRelic("censer")) {
            saveRef.current.light += 1;
            persist();
            pushToast("⚱ The censer catches the bolt — +1 Light");
          } else sfx.ding();
        },
        onWispPopped: () => {
          saveRef.current.light += 1;
          persist();
          sfx.ding();
          pushToast("The false claim scatters — +1 Light");
        },
      },
    });
    engineRef.current = engine;
    engine.setAttract(true);
    engine.start().catch((e) => {
      console.error(e);
      setLoadError("The icon could not be gilded — assets failed to load.");
    });
    return () => {
      engine.dispose();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zones]);

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

  const renderTitle = () => {
    const s = saveRef.current;
    const hasSave = s.lastSavedAt > 0 || s.beaten.length > 0;
    return (
      <div className="fixed inset-0 z-[100] overflow-y-auto text-parchment">
        <div
          className="min-h-full flex flex-col items-center justify-center px-5 py-10 text-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(60,45,18,0.72) 0%, rgba(28,21,10,0.78) 45%, rgba(10,8,4,0.88) 100%)",
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
            One road runs through {zones.length} stations of the
            Church&rsquo;s history — golden-hour olive hills, desert noon,
            snowbound pine country, and a starlit waste where the last
            adversary wears your own face. At every station a claim is
            hurled against the faith;{" "}
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
                setHpState(Math.min(saveRef.current.hp ?? 100, maxHp()));
                startAmbience();
                try {
                  if (window.localStorage.getItem("chant:enabled") !== "0") startChant();
                } catch {}
                const eng = engineRef.current;
                eng?.setAttract(false);
                eng?.respawn(Math.min(saveRef.current.checkpoint, zones.length - 1));
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
                    window.location.reload();
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
            <button
              onClick={() => {
                sfx.click();
                setPhase("vespers");
              }}
              className="mt-1 font-display text-sm bg-[#2a1c40] text-[#d6c2f0] px-6 py-2 rounded border-2 border-[#5c3470] hover:border-[#8a5cb0]"
            >
              🌙 Vespers — the Daily Gauntlet
            </button>
            {loading && (
              <div className="text-[10px] text-gold/70 animate-pulse mt-1">
                the world is rising behind you…
              </div>
            )}
          </div>

          <div className="mt-8 max-w-md text-[11px] text-parchment/50 leading-relaxed">
            <span className="text-parchment/70">Move</span> WASD / left stick ·{" "}
            <span className="text-parchment/70">Look</span> drag ·{" "}
            <span className="text-parchment/70">Act</span> E / tap ·{" "}
            <span className="text-parchment/70">Answer</span> run onto a plate,
            tap it, or press 1–4 · <span className="text-parchment/70">Dodge</span>{" "}
            Space · <span className="text-parchment/70">Sprint</span> Shift
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
  };

  // ---- play -------------------------------------------------------------------

  const zone = zones[Math.min(bannerZone ?? 0, zones.length - 1)];
  const nearZone = near ? zones[near.zoneIdx] : null;
  const b = battle;
  const battleBoss = b ? zones[b.zoneIdx].chapter.boss! : null;
  const battleAttack =
    b && b.stage !== "intro"
      ? b.ghostAttack ?? b.attacks[b.queue[b.qPos % b.queue.length]]
      : null;
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

      {phase === "title" && renderTitle()}
      {phase === "vespers" && (
        <Vespers chapters={vespersChapters} onExit={() => setPhase("title")} />
      )}

      {phase === "play" && (
      <>
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
              style={{ width: `${(hp / maxHp()) * 100}%` }}
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
        {saveRef.current.laurels.length > 0 && (
          <div className="bg-black/70 border border-gold/40 rounded px-2 py-1.5 text-[11px] text-gold" title="Legendary duels won on the Second Road">
            🏆 {saveRef.current.laurels.length}
          </div>
        )}
        {saveRef.current.relics.length > 0 && (
          <div className="bg-black/70 border border-gold/40 rounded px-2 py-1.5 text-[13px]">
            {saveRef.current.relics.map((r) =>
              RELICS[r] ? (
                <span key={r} title={`${RELICS[r].name} — ${RELICS[r].desc}`} className="mx-0.5">
                  {RELICS[r].icon}
                </span>
              ) : null
            )}
          </div>
        )}
        <button
          onClick={() => setShowMap((v) => !v)}
          className="bg-black/70 border border-gold/40 rounded px-2.5 py-1.5 text-[11px] text-gold"
          aria-label="Pilgrim's map"
        >
          🗺
        </button>
        <button
          onClick={() => {
            const url = engineRef.current?.snapshot();
            if (!url) return;
            const img = new Image();
            img.onload = () => {
              const cv = document.createElement("canvas");
              cv.width = img.width + 48;
              cv.height = img.height + 110;
              const ctx = cv.getContext("2d")!;
              ctx.fillStyle = "#100c07";
              ctx.fillRect(0, 0, cv.width, cv.height);
              ctx.strokeStyle = "#c9a227";
              ctx.lineWidth = 6;
              ctx.strokeRect(12, 12, cv.width - 24, cv.height - 24);
              ctx.drawImage(img, 24, 24);
              ctx.fillStyle = "#f0d358";
              ctx.font = "24px Georgia, serif";
              ctx.textAlign = "center";
              ctx.fillText(
                `${zones[curZone]?.chapter.title ?? ""} · ΟΔΟΣ — The Pilgrim Road`,
                cv.width / 2,
                cv.height - 42
              );
              const a = document.createElement("a");
              a.download = `pilgrim-road-${Date.now()}.png`;
              a.href = cv.toDataURL("image/png");
              a.click();
            };
            img.src = url;
            sfx.ding();
          }}
          className="bg-black/70 border border-gold/40 rounded px-2.5 py-1.5 text-[11px] text-gold"
          aria-label="Photo mode"
        >
          📷
        </button>
        <button
          onClick={() => {
            const m = !muted;
            setMuted(m);
            setMutedState(m);
            if (m) {
              stopAmbience();
              stopChant();
            } else {
              resumeAmbience();
              try {
                if (window.localStorage.getItem("chant:enabled") !== "0") startChant();
              } catch {}
            }
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
              <span className="text-gold/60">❦ </span>Station {ROMAN[zone.index]} · {zone.chapter.era}
              <span className="text-gold/60"> ❦</span>
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
            {near.kind === "duel" && (
              <>
                <span className="text-[#c084ff]">⚔</span> LEGENDARY — Face{" "}
                <span className="text-gold">
                  {sideDuels[near.duelIdx]?.chapter.boss?.name}
                </span>
                {!coarse && <span className="text-parchment/50 text-xs"> — E</span>}
              </>
            )}
            {near.kind === "cave" && (
              <>
                <span className="text-gold">🕳</span> A hermit&rsquo;s cave — a voice within
                {!coarse && <span className="text-parchment/50 text-xs"> — E</span>}
              </>
            )}
            {near.kind === "chapel" && (
              <>
                <span className="text-gold">🕯</span> Pray at the ruined chapel
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
          playerMax={maxHp()}
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
          lightCost={hasRelic("pen") ? 2 : 3}
          blessing={b.blessing}
          timer={timerLeft}
          focusText={
            plateFocus !== null && battleAttack
              ? battleAttack.options[b.order[plateFocus]]?.text ?? null
              : null
          }
          focusLetter={plateFocus !== null ? PLATE_LETTERS[plateFocus] : null}
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
            className="manuscript-card border-2 border-gold/70 rounded-lg max-w-lg w-full p-5 text-left"
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
                <p className="text-gold/90 text-xs mt-3">
                  {card.healed
                    ? "You venerate the icon, and your wounds close — restored to full."
                    : "You have already been restored at this station."}
                </p>
              </>
            )}
            {card.kind === "caveq" && (
              <>
                <div className="text-[10px] uppercase tracking-[0.35em] text-gold/90 mb-2">
                  🕳 The Hermit&rsquo;s Trial
                </div>
                {card.picked === null ? (
                  <>
                    <p className="text-parchment/85 text-sm leading-relaxed italic mb-2">
                      A voice from the dark: &ldquo;Answer rightly, and take what I have kept. Answer
                      wrongly, and the mountain will remember it.&rdquo;
                    </p>
                    <p className="text-parchment text-[13px] leading-snug mb-2">
                      <span className="text-crimson font-bold">✠ </span>
                      {card.attack.claim}
                    </p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {card.attack.options.map((o, i) => (
                        <button
                          key={i}
                          onClick={() => answerCave(i)}
                          className="text-left rounded border-2 border-gold/40 bg-[#171208] text-parchment hover:border-gold px-2.5 py-2 text-[12px] leading-snug"
                        >
                          <span className="font-display text-gold mr-2">{PLATE_LETTERS[i]}</span>
                          {o.text}
                        </button>
                      ))}
                    </div>
                  </>
                ) : card.won ? (
                  <>
                    <p className="text-[#ffe98c] text-sm leading-relaxed">
                      &ldquo;Well answered.&rdquo; The hermit presses something into your hands.
                    </p>
                    {card.relicId && RELICS[card.relicId] && (
                      <p className="text-gold text-sm mt-2">
                        {RELICS[card.relicId].icon} <strong>{RELICS[card.relicId].name}</strong> —{" "}
                        {RELICS[card.relicId].desc}
                      </p>
                    )}
                    {!card.relicId && <p className="text-gold text-sm mt-2">+3 Light · +10 healed</p>}
                  </>
                ) : (
                  <p className="text-[#e8a0a0] text-sm leading-relaxed">
                    &ldquo;Not yet, pilgrim.&rdquo; The cave breathes cold — you stumble out poorer
                    (−12). The hermit will not ask twice.
                  </p>
                )}
              </>
            )}
            {card.kind === "chapel" && (
              <>
                <div className="text-[10px] uppercase tracking-[0.35em] text-gold/90 mb-2">
                  ⛪ A Ruined Chapel
                </div>
                <p className="text-parchment/85 text-sm leading-relaxed">
                  Roofless walls, and yet the candles burn. Someone still prays here. You kneel a
                  while among the fallen stones.
                </p>
                <p className="text-gold text-sm mt-3">+3 Light · +15 healed</p>
              </>
            )}
            {card.kind === "victory" && (
              <>
                <div className="text-[10px] uppercase tracking-[0.35em] text-gold mb-2">
                  {card.laurel ? "🏆 A legend honored" : "✓ The witness stands"}
                </div>
                <p className="drop-cap text-parchment/85 text-sm leading-relaxed italic">
                  “{card.outro}”
                </p>
                {card.epigraph && (
                  <div className="mt-3 border-l-2 border-gold/60 pl-3">
                    <p className="text-[#ffe98c] text-sm leading-relaxed">{card.epigraph.text}</p>
                    <p className="text-gold/70 text-[11px] mt-1">— {card.epigraph.source}</p>
                  </div>
                )}
                <p className="text-gold text-sm mt-3">
                  +{card.xp} XP{card.laurel && " · +5 Light · 🏆 Laurel"}
                  {card.rankedUp && (
                    <span className="text-parchment">
                      {" "}
                      · you are raised to <span className="text-gold">{card.rankedUp}</span>
                    </span>
                  )}
                </p>
                <p className="text-parchment/60 text-xs mt-1.5">
                  {card.laurel
                    ? "The waystone is at peace (+25 healed)."
                    : "The Royal Doors stand open (+25 healed). The road continues — the shrine ahead can restore you fully, once."}
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
                  You rise at three-fifths strength. Venerate the station icon to be fully
                  restored, greet the saint for a blessing, and look off the road — hermits and
                  ruined chapels keep gifts for the searching.
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

      {/* pilgrim's map */}
      {showMap && (
        <div
          className="absolute inset-0 z-40 bg-black/75 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={() => setShowMap(false)}
        >
          <div
            className="manuscript-card border-2 border-gold/70 rounded-lg max-w-md w-full p-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[10px] uppercase tracking-[0.35em] text-gold/90 mb-3">
              🗺 The Pilgrim&rsquo;s Map
            </div>
            {zones.map((z, i) => {
              const beaten = saveRef.current.beaten.includes(z.chapter.id);
              const zoneDuels = sideDuels.filter((d) => d.zone === i);
              return (
                <div
                  key={z.chapter.id}
                  className={`flex items-center gap-2 py-1 border-b border-gold/10 text-[11px] ${
                    i === curZone ? "text-gold" : beaten ? "text-parchment/85" : "text-parchment/45"
                  }`}
                >
                  <span className="w-7 font-display">{ROMAN[i]}</span>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${beaten ? "bg-gold" : "bg-crimson/70"}`} />
                  <span className="flex-1 truncate">{z.chapter.title}</span>
                  {CAVE_RELIC[i] !== undefined && <span title="A hermit keeps something here">🕳</span>}
                  {zoneDuels.map((d) => (
                    <span
                      key={d.chapter.id}
                      title={d.chapter.boss?.name}
                      className={saveRef.current.laurels.includes(d.chapter.id) ? "" : "opacity-40 grayscale"}
                    >
                      🏆
                    </span>
                  ))}
                  {i === curZone && <span className="text-gold">◄ you</span>}
                </div>
              );
            })}
            <p className="text-parchment/45 text-[10px] mt-3">
              🕳 hermits keep relics off-road · 🏆 legendary duels of the Second Road
            </p>
          </div>
        </div>
      )}
      </>
      )}

      {/* companion */}
      {phase === "play" && companionSay && (
        <div className="absolute left-3 bottom-40 z-30 max-w-[280px] pointer-events-none">
          <div className="bg-[#100c07]/90 border border-gold/50 rounded-lg px-3 py-2">
            <div className="text-[9px] uppercase tracking-[0.3em] text-gold/90 mb-0.5">
              ☦ St. Anthony
            </div>
            <p className="text-parchment/90 text-[11px] leading-snug italic">{companionSay}</p>
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
      {phase === "play" && coarse && <Joystick onMove={(x, y) => engineRef.current?.setJoystick(x, y)} />}
      {phase === "play" && coarse && b && (
        <button
          onClick={() => engineRef.current?.dash()}
          className="fixed bottom-8 right-5 z-40 w-16 h-16 rounded-full border-2 border-gold/70 bg-black/50 text-gold text-[11px] font-display active:scale-95"
        >
          DASH
        </button>
      )}

      {/* loading / error */}
      {phase !== "title" && (loading || loadError) && (
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
              <div className="text-parchment/60 text-xs">Raising the world…</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
