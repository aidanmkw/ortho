"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  Boss,
  HeroState,
  BossAttack,
  ResolvedAttack,
} from "@/lib/quest/types";
import { getPatron } from "@/lib/quest/patrons";
import { getItem } from "@/lib/quest/items";
import { sfx } from "@/lib/quest/sfx";
import { PORTRAITS, playerPortraitConfig } from "@/lib/quest/portraits";
import { withLiveAttacks } from "@/lib/quest/liveBattle";
import { useProgress } from "../ProgressProvider";
import type { Difficulty } from "@/lib/types";
import Portrait from "./Portrait";
import {
  PixelFrame,
  PixelButton,
  HpBar,
  Typewriter,
  PixelBackground,
} from "./PixelUI";

type Phase =
  | "intro"              // boss line, then player chooses move
  | "action-select"      // Swords-&-Sandals action menu
  | "attack"             // showing boss attack claim + answer options
  | "resolving"          // showing the result of an answer
  | "non-attack-resolving" // result of Defend / Pray / Witness Strike
  | "midline"
  | "victory"
  | "defeat";

type ChosenAction = "strike" | "power" | "defend" | "pray" | "witness";

type Props = {
  boss: Boss;
  bossSpriteId: string;
  background: string;
  hero: HeroState;
  hairColor: string;
  // sandbox mode = sparring (HP loss doesn't matter; abort allowed)
  sandbox?: boolean;
  onResult: (
    result: "victory" | "defeat",
    finalHero: HeroState,
    resolved: ResolvedAttack[]
  ) => void;
  onAbort?: () => void;
};

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    const j = Math.floor(r * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function BattleScene({
  boss,
  bossSpriteId,
  background,
  hero: initialHero,
  hairColor,
  sandbox = false,
  onResult,
  onAbort,
}: Props) {
  const patron = getPatron(initialHero.patronId);
  const { progress: studyProgress, record } = useProgress();

  // Story battles draw live MCQ attacks from the study corpus, prioritized by
  // the player's spaced-repetition state, so each fight is real practice.
  // Sandbox/sparring bosses are already corpus-built, so leave them as-is.
  const attacks = useMemo(
    () => (sandbox ? boss.attacks : withLiveAttacks(boss, studyProgress).attacks),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [boss.id, sandbox]
  );

  const [hero, setHero] = useState<HeroState>(initialHero);
  const [bossHp, setBossHp] = useState(boss.maxHp);
  const [phase, setPhase] = useState<Phase>("intro");
  const [attackIdx, setAttackIdx] = useState(0);
  const [optionsOrder, setOptionsOrder] = useState<number[]>([]);
  // True once the claim typewriter finishes (or user taps Skip). Reset every round.
  const [claimRevealed, setClaimRevealed] = useState(false);
  const [resultMsg, setResultMsg] = useState<string>("");
  const [resultRationale, setResultRationale] = useState<string>("");
  const [bossFlash, setBossFlash] = useState(false);
  const [heroFlash, setHeroFlash] = useState(false);
  const [bossLine, setBossLine] = useState(boss.intro);
  // Combat mechanics
  const [chosenAction, setChosenAction] = useState<ChosenAction>("strike");
  const [defendActive, setDefendActive] = useState(false); // halves next hit
  const [cloud, setCloud] = useState(0); // Cloud of Witnesses meter, 0-5
  const CLOUD_MAX = 5;
  const [roundCount, setRoundCount] = useState(0);
  const [nonAttackMsg, setNonAttackMsg] = useState<string>("");
  const [showMidline, setShowMidline] = useState(false);
  const [lastResultWasCrit, setLastResultWasCrit] = useState(false);
  const [shownVictoryEpigraph, setShownVictoryEpigraph] = useState(false);
  const heroRef = useRef(hero);
  heroRef.current = hero;
  const resolvedRef = useRef<ResolvedAttack[]>([]);

  // Compute item bonuses
  const itemBonuses = useMemo(() => {
    let strikeMult = 1;
    let faithRegen = 0;
    for (const id of initialHero.items) {
      const item = getItem(id);
      if (!item) continue;
      if (item.strikeMult) strikeMult *= item.strikeMult;
      if (item.faithRegen) faithRegen += item.faithRegen;
    }
    if (patron?.passive.faithRegen)
      faithRegen += patron.passive.faithRegen;
    return { strikeMult, faithRegen };
  }, [initialHero.items, patron]);

  const attack: BossAttack | null = useMemo(() => {
    if (attacks.length === 0) return null;
    return attacks[attackIdx % attacks.length];
  }, [attacks, attackIdx]);

  // Shuffle options when entering an attack
  useEffect(() => {
    if (phase === "attack" && attack) {
      const idxs = attack.options.map((_, i) => i);
      setOptionsOrder(shuffle(idxs, Date.now()));
    }
  }, [phase, attack]);

  // Boss enters
  useEffect(() => {
    sfx.bossEnter();
  }, []);

  function openActionMenu() {
    setPhase("action-select");
  }

  /** Boss strikes the player on a turn where you did NOT answer a question
      (Defend / Pray / Witness — i.e. you skipped your attack). */
  function bossCounterStrike(damageMultiplier: number) {
    if (!attack) return 0;
    let dmg = Math.round(attack.difficulty * 6 + 8);
    dmg = Math.round(dmg * damageMultiplier);
    if (defendActive) {
      dmg = Math.round(dmg * 0.5);
    }
    return dmg;
  }

  function performDefend() {
    if (!attack) return;
    setChosenAction("defend");
    setDefendActive(true);
    setNonAttackMsg(
      `🛡 You stand firm in the Tradition. Incoming damage halved this round.`
    );
    // Boss still attacks but at 50% (lighter than its full taunt) + your defend.
    const dmg = bossCounterStrike(0.5);
    const newHp = Math.max(0, hero.hp - dmg);
    setHero((h) => ({ ...h, hp: newHp }));
    if (dmg > 0) {
      setHeroFlash(true);
      setTimeout(() => setHeroFlash(false), 400);
    }
    sfx.click();
    setPhase("non-attack-resolving");
    setTimeout(() => {
      if (newHp === 0) {
        sfx.defeat();
        setPhase("defeat");
      } else {
        regenAndAdvance();
      }
    }, 1700);
  }

  function performPray() {
    if (!attack) return;
    const fpGain = 12;
    const hpGain = 5;
    setHero((h) => ({
      ...h,
      faith: Math.min(h.maxFaith, h.faith + fpGain),
      hp: Math.min(h.maxHp, h.hp + hpGain),
    }));
    setChosenAction("pray");
    sfx.heal();
    setNonAttackMsg(
      `🙏 You pray. +${hpGain} HP, +${fpGain} Faith. But the boss attacks while you are recollecting.`
    );
    // Boss attacks at full this round (you took no defensive action).
    const dmg = bossCounterStrike(1.0);
    const newHp = Math.max(0, Math.min(hero.maxHp, hero.hp + hpGain) - dmg);
    // Apply the net result on next tick to ensure regen + damage settle.
    setTimeout(() => {
      setHero((h) => ({ ...h, hp: newHp }));
      if (dmg > 0) {
        setHeroFlash(true);
        setTimeout(() => setHeroFlash(false), 400);
      }
    }, 600);
    setPhase("non-attack-resolving");
    setTimeout(() => {
      if (newHp === 0) {
        sfx.defeat();
        setPhase("defeat");
      } else {
        regenAndAdvance();
      }
    }, 1900);
  }

  function performWitnessStrike() {
    // Unleash all 5 Cloud-of-Witnesses charges as a massive blow to the boss.
    if (cloud < CLOUD_MAX) return;
    const baseDmg = 80;
    const dmg = Math.round(baseDmg * itemBonuses.strikeMult);
    const newBossHp = Math.max(0, bossHp - dmg);
    setBossHp(newBossHp);
    setCloud(0);
    setBossFlash(true);
    setTimeout(() => setBossFlash(false), 600);
    sfx.crit();
    setChosenAction("witness");
    setNonAttackMsg(
      `✦ The Cloud of Witnesses descends! The saints pray with you. ${dmg} damage to ${boss.name}!`
    );
    setPhase("non-attack-resolving");
    setTimeout(() => {
      if (newBossHp === 0) {
        sfx.victory();
        setPhase("victory");
      } else {
        regenAndAdvance();
      }
    }, 2200);
  }

  function chooseStrike(power: boolean) {
    if (!attack) return;
    if (power && hero.faith < 6) {
      // not enough FP — fall back silently to normal strike
      power = false;
    }
    setChosenAction(power ? "power" : "strike");
    if (power) {
      setHero((h) => ({ ...h, faith: Math.max(0, h.faith - 6) }));
    }
    setBossLine(attack.taunt ?? boss.intro);
    setClaimRevealed(false);
    setPhase("attack");
  }

  function regenAndAdvance() {
    setHero((h) => ({
      ...h,
      faith: Math.min(h.maxFaith, h.faith + itemBonuses.faithRegen + 2),
    }));
    setDefendActive(false);
    setAttackIdx((i) => i + 1);
    setRoundCount((r) => r + 1);
    if (
      boss.midline &&
      !showMidline &&
      bossHp <= Math.floor(boss.maxHp / 2)
    ) {
      setShowMidline(true);
      setBossLine(boss.midline);
      setPhase("midline");
    } else {
      setPhase("intro");
    }
  }

  function chooseAnswer(originalIdx: number) {
    if (!attack) return;
    const opt = attack.options[originalIdx];
    const correctOpt = attack.options.find((o) => o.correct);

    // Feed the spaced-repetition scheduler when this was a live corpus item.
    if (attack.itemId && !sandbox) {
      record(
        attack.itemId,
        attack.difficulty as Difficulty,
        opt.correct ? "correct" : "wrong"
      );
    }

    resolvedRef.current.push({
      attackIdx: attackIdx % attacks.length,
      bossId: boss.id,
      pickedOptionText: opt.text,
      pickedCorrect: opt.correct,
      correctOptionText: correctOpt?.text ?? "",
      rationale: opt.rationale,
      claim: attack.claim,
    });

    // Damage formula — rebalanced for longer fights:
    //   base = difficulty * 8 + 10  (was difficulty*18+12)
    // Power Strike: 1.6× damage on correct, 1.4× penalty on wrong (you staked Faith).
    // Critical (patron passive): 2× damage on correct.
    const actionPow = chosenAction === "power";
    const correctBase =
      (attack.difficulty * 8 + 10) * itemBonuses.strikeMult * (actionPow ? 1.6 : 1.0);
    const wrongBase =
      (attack.difficulty * 6 + 6) * (actionPow ? 1.4 : 1.0);
    const critRoll = Math.random();
    const isCrit = critRoll < (patron?.passive.critChance ?? 0);
    setLastResultWasCrit(false);

    if (opt.correct) {
      const dmg = Math.round(isCrit ? correctBase * 2 : correctBase);
      setLastResultWasCrit(isCrit);
      const newBossHp = Math.max(0, bossHp - dmg);
      setBossHp(newBossHp);
      setBossFlash(true);
      isCrit ? sfx.crit() : sfx.hit();
      setCloud((c) => Math.min(CLOUD_MAX, c + 1));
      setResultMsg(
        `✓ Correct! ${actionPow ? "POWER STRIKE — " : ""}${isCrit ? "CRITICAL — " : ""}${dmg} damage to ${boss.name}.`
      );
      setResultRationale(opt.rationale ?? "");
      setPhase("resolving");
      setTimeout(() => setBossFlash(false), 400);
      setTimeout(() => {
        if (newBossHp === 0) {
          sfx.victory();
          setPhase("victory");
        } else {
          regenAndAdvance();
        }
      }, 2200);
    } else {
      let dmg = Math.round(wrongBase);
      if (defendActive) dmg = Math.round(dmg * 0.5);
      const newHp = Math.max(0, hero.hp - dmg);
      setHero((h) => ({ ...h, hp: newHp }));
      setHeroFlash(true);
      sfx.wrong();
      setResultMsg(
        `✗ Wrong! ${actionPow ? "Power Strike misfires — " : ""}You take ${dmg} damage${defendActive ? " (halved by Defend)" : ""}.`
      );
      setResultRationale(opt.rationale ?? "");
      setPhase("resolving");
      setTimeout(() => setHeroFlash(false), 400);
      setTimeout(() => {
        if (newHp === 0) {
          sfx.defeat();
          setPhase("defeat");
        } else {
          regenAndAdvance();
        }
      }, 2200);
    }
  }

  function finishVictory() {
    onResult("victory", heroRef.current, resolvedRef.current);
  }
  function finishDefeat() {
    onResult("defeat", heroRef.current, resolvedRef.current);
  }

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      <PixelBackground id={background} />

      {sandbox && onAbort && (
        <button
          onClick={onAbort}
          className="fixed top-2 left-1/2 -translate-x-1/2 z-[70] font-pixel text-[9px] bg-black/80 border-2 border-gold/50 text-gold px-3 py-1 uppercase tracking-widest"
        >
          ⚔ SPARRING · Quit Drill
        </button>
      )}

      {/* Top: boss + boss HP */}
      <div className="relative z-10 pt-4 px-3">
        <div className="max-w-md mx-auto">
          <div className="font-pixel text-crimson text-[10px] uppercase tracking-widest mb-1 text-center">
            {boss.name}
          </div>
          <div className="font-pixel text-parchment/60 text-[8px] uppercase tracking-widest mb-2 text-center">
            {boss.title} · {boss.tradition}
          </div>
          <HpBar
            current={bossHp}
            max={boss.maxHp}
            label="Pride"
            color="#7c1414"
          />
          {/* Cloud of Witnesses meter */}
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="font-pixel text-[8px] uppercase tracking-widest text-parchment/60">
              Cloud of Witnesses
            </span>
            <div className="flex gap-1">
              {Array.from({ length: CLOUD_MAX }).map((_, i) => (
                <span
                  key={i}
                  className={`inline-block w-2.5 h-2.5 border ${
                    i < cloud
                      ? "bg-gold border-gold shadow-[0_0_6px_#c9a227]"
                      : "border-parchment/30 bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
          {cloud >= CLOUD_MAX && (
            <div className="font-pixel text-[8px] text-gold text-right mt-1 animate-pulse uppercase tracking-widest">
              Witness Strike ready ✦
            </div>
          )}
          <div className="flex justify-center mt-3 mb-3">
            {PORTRAITS[bossSpriteId] && (
              <div
                className={`pixel-shadow-lg pixel-platform pixel-menace-glow ${
                  phase === "victory" ? "opacity-30 grayscale" : ""
                }`}
              >
                <Portrait
                  config={PORTRAITS[bossSpriteId]}
                  size={180}
                  idle
                  flashing={bossFlash}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Middle: hero stats */}
      <div className="relative z-10 px-3 mt-2">
        <div className="max-w-md mx-auto flex items-end justify-between gap-3">
          <div className="flex-1">
            <HpBar
              current={hero.hp}
              max={hero.maxHp}
              label={`${hero.name} — Conviction`}
              color="#c9a227"
            />
            <div className="mt-2">
              <HpBar
                current={hero.faith}
                max={hero.maxFaith}
                label="Faith"
                color="#3a1f4d"
                height={6}
              />
            </div>
          </div>
          <div className="pixel-shadow-lg pixel-platform">
            <Portrait
              config={playerPortraitConfig(hairColor)}
              size={110}
              idle
              flashing={heroFlash}
              hairColorHex={hairColor}
            />
          </div>
        </div>
      </div>

      {/* Bottom: action area */}
      <div className="relative z-20 mt-4 p-3 pb-6">
        <div className="max-w-md mx-auto">
          {phase === "intro" && (
            <PixelFrame variant="danger" className="p-3">
              <div className="font-pixel text-crimson text-[8px] uppercase tracking-widest mb-1 flex items-center justify-between">
                <span>{boss.name}</span>
                <span className="text-parchment/40">
                  Round {roundCount + 1}
                </span>
              </div>
              <p className="font-pixel text-parchment text-[11px] leading-relaxed mb-3">
                <Typewriter text={bossLine} speed={22} />
              </p>
              <PixelButton onClick={openActionMenu} variant="primary">
                Choose Your Action ▶
              </PixelButton>
            </PixelFrame>
          )}

          {phase === "action-select" && attack && (
            <PixelFrame variant="default" className="p-3">
              <div className="font-pixel text-gold text-[9px] uppercase tracking-widest mb-2 flex items-center justify-between">
                <span>Your Move</span>
                <span className="text-parchment/60">
                  HP {hero.hp}/{hero.maxHp} · FP {hero.faith}/{hero.maxFaith}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <ActionBtn
                  icon="⚔"
                  title="Strike"
                  desc="Answer the boss's claim. Correct = damage."
                  onClick={() => chooseStrike(false)}
                  accent="gold"
                />
                <ActionBtn
                  icon="✦"
                  title={`Power Strike  (−6 FP)`}
                  desc="Stake Faith for 1.6× damage on correct, but 1.4× pain on wrong."
                  onClick={() => chooseStrike(true)}
                  accent="purple"
                  disabled={hero.faith < 6}
                />
                <ActionBtn
                  icon="🛡"
                  title="Defend"
                  desc="Skip the attack. Halve the boss's counter-strike this round."
                  onClick={performDefend}
                  accent="muted"
                />
                <ActionBtn
                  icon="🙏"
                  title="Pray"
                  desc="+5 HP, +12 FP. But the boss strikes you unanswered."
                  onClick={performPray}
                  accent="muted"
                />
                <ActionBtn
                  icon="✦✦"
                  title="Witness Strike"
                  desc={
                    cloud >= CLOUD_MAX
                      ? "Spend all 5 charges for a massive blow (80 dmg base)."
                      : `Need ${CLOUD_MAX - cloud} more correct answers to unleash.`
                  }
                  onClick={performWitnessStrike}
                  accent="crimson"
                  disabled={cloud < CLOUD_MAX}
                />
              </div>
            </PixelFrame>
          )}

          {phase === "non-attack-resolving" && (
            <PixelFrame
              variant={chosenAction === "witness" ? "good" : "default"}
              className="p-3"
            >
              <p className="font-pixel text-parchment text-[11px] leading-relaxed">
                <Typewriter text={nonAttackMsg} speed={18} silent />
              </p>
            </PixelFrame>
          )}

          {phase === "midline" && (
            <PixelFrame variant="danger" className="p-3">
              <div className="font-pixel text-crimson text-[8px] uppercase tracking-widest mb-1">
                {boss.name}
              </div>
              <p className="font-pixel text-parchment text-[11px] leading-relaxed mb-3 italic">
                <Typewriter text={bossLine} speed={22} />
              </p>
              <PixelButton
                onClick={() => {
                  setAttackIdx((i) => i + 1);
                  setPhase("intro");
                }}
              >
                Continue ▶
              </PixelButton>
            </PixelFrame>
          )}

          {phase === "attack" && attack && (
            <PixelFrame variant="danger" className="p-3">
              <div className="font-pixel text-crimson text-[8px] uppercase tracking-widest mb-2 flex items-center justify-between">
                <span>
                  Attack — {"★".repeat(attack.difficulty)}
                  <span className="text-parchment/30">
                    {"★".repeat(5 - attack.difficulty)}
                  </span>
                </span>
                {!claimRevealed && (
                  <button
                    onClick={() => setClaimRevealed(true)}
                    className="text-[9px] text-gold/80 underline font-pixel"
                  >
                    Skip ▶▶
                  </button>
                )}
              </div>

              <div className="font-pixel text-parchment/50 text-[8px] uppercase tracking-widest mb-1">
                {boss.name} says:
              </div>
              <blockquote className="font-pixel text-parchment text-[11px] leading-relaxed pl-3 border-l-2 border-crimson italic mb-3">
                {claimRevealed ? (
                  attack.claim
                ) : (
                  <Typewriter
                    text={attack.claim}
                    speed={22}
                    onDone={() => setClaimRevealed(true)}
                  />
                )}
              </blockquote>

              {claimRevealed ? (
                <>
                  <div className="font-pixel text-gold text-[9px] uppercase tracking-widest mb-2 mt-3 pt-3 border-t border-gold/20">
                    Choose your answer
                  </div>
                  <div className="space-y-2">
                    {optionsOrder.map((origIdx, i) => (
                      <button
                        key={i}
                        onClick={() => chooseAnswer(origIdx)}
                        className="pixel-btn block w-full text-left p-2.5 border-[2px] border-parchment/30 hover:border-gold/80 active:translate-y-[1px] transition font-pixel text-[10px] leading-relaxed text-parchment"
                      >
                        <span className="text-gold mr-2">[{i + 1}]</span>
                        {attack.options[origIdx].text}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="font-pixel text-parchment/50 text-[9px] italic text-center mt-2">
                  Read the claim. Answers appear when you're ready.
                </div>
              )}
            </PixelFrame>
          )}

          {phase === "resolving" && (
            <PixelFrame
              variant={
                resultMsg.startsWith("✓") ? "good" : "danger"
              }
              className="p-3"
            >
              <div className="font-pixel text-[12px] mb-2">
                <span
                  className={
                    resultMsg.startsWith("✓") ? "text-gold" : "text-crimson"
                  }
                >
                  <Typewriter text={resultMsg} speed={18} silent />
                </span>
              </div>
              {resultRationale && (
                <p className="font-pixel text-parchment/80 text-[9px] leading-relaxed italic">
                  {resultRationale}
                </p>
              )}
              {lastResultWasCrit && (
                <p className="font-pixel text-gold text-[10px] mt-2">
                  ★ {getPatron(hero.patronId)?.name} guides your hand! ★
                </p>
              )}
            </PixelFrame>
          )}

          {phase === "victory" && (
            <PixelFrame variant="good" className="p-4">
              <div className="font-pixel text-gold text-[14px] text-center mb-3">
                ✦ VICTORY ✦
              </div>
              <p className="font-pixel text-parchment text-[11px] mb-3 italic leading-relaxed">
                <Typewriter text={boss.outro} speed={22} />
              </p>
              {boss.victoryEpigraph && !shownVictoryEpigraph && (
                <PixelButton
                  onClick={() => setShownVictoryEpigraph(true)}
                  variant="secondary"
                  className="mb-3"
                >
                  Read the Verdict
                </PixelButton>
              )}
              {boss.victoryEpigraph && shownVictoryEpigraph && (
                <div className="mb-3 p-2 border-l-2 border-gold">
                  <p className="font-pixel text-parchment/90 text-[10px] italic leading-relaxed">
                    “{boss.victoryEpigraph.text}”
                  </p>
                  <p className="font-pixel text-gold/80 text-[9px] mt-1">
                    — {boss.victoryEpigraph.source}
                  </p>
                </div>
              )}
              <PixelButton onClick={finishVictory} variant="primary">
                Continue the Journey ▶
              </PixelButton>
            </PixelFrame>
          )}

          {phase === "defeat" && (
            <PixelFrame variant="danger" className="p-4">
              <div className="font-pixel text-crimson text-[14px] text-center mb-3">
                ✗ DEFEAT
              </div>
              <p className="font-pixel text-parchment text-[11px] leading-relaxed mb-3">
                {boss.name} has bested you. But the saints have not abandoned you. Rise and pray, $you.
              </p>
              <p className="font-pixel text-parchment/70 text-[10px] italic mb-3">
                "Lord, I believe; help thou mine unbelief." — Mark 9:24
              </p>
              <PixelButton onClick={finishDefeat} variant="primary">
                Try Again ▶
              </PixelButton>
            </PixelFrame>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionBtn({
  icon,
  title,
  desc,
  onClick,
  accent,
  disabled,
}: {
  icon: string;
  title: string;
  desc: string;
  onClick: () => void;
  accent: "gold" | "purple" | "crimson" | "muted";
  disabled?: boolean;
}) {
  const borders: Record<string, string> = {
    gold: "border-gold/60 hover:border-gold",
    purple: "border-byzantine hover:border-[#c4a0d8]",
    crimson: "border-crimson/70 hover:border-crimson",
    muted: "border-parchment/30 hover:border-parchment/60",
  };
  const iconColors: Record<string, string> = {
    gold: "text-gold",
    purple: "text-[#c4a0d8]",
    crimson: "text-crimson",
    muted: "text-parchment/80",
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`pixel-btn block w-full text-left p-2.5 border-2 transition active:translate-y-[1px] font-pixel ${
        borders[accent]
      } ${disabled ? "opacity-40 pointer-events-none" : ""}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-[14px] ${iconColors[accent]}`}>{icon}</span>
        <span className="text-[11px] text-parchment uppercase tracking-widest">
          {title}
        </span>
      </div>
      <div className="font-pixel text-[9px] text-parchment/60 leading-relaxed pl-7">
        {desc}
      </div>
    </button>
  );
}
