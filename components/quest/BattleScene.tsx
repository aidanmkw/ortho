"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  Boss,
  HeroState,
  BossAttack,
  Sprite,
  ResolvedAttack,
} from "@/lib/quest/types";
import { ALL_SPRITES, playerSprite } from "@/lib/quest/sprites";
import { getPatron } from "@/lib/quest/patrons";
import { getItem } from "@/lib/quest/items";
import { sfx } from "@/lib/quest/sfx";
import PixelSprite from "./PixelSprite";
import {
  PixelFrame,
  PixelButton,
  HpBar,
  Typewriter,
  PixelBackground,
} from "./PixelUI";

type Phase =
  | "intro"           // boss line, then player chooses move
  | "attack"          // showing boss attack claim + answer options (combined)
  | "resolving"       // showing the result
  | "midline"
  | "victory"
  | "defeat";

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

function getBossSprite(id: string): Sprite | undefined {
  return ALL_SPRITES[id];
}

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
  const bossSprite = getBossSprite(bossSpriteId);
  const playerSpriteData = playerSprite(hairColor);
  const patron = getPatron(initialHero.patronId);

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
    if (boss.attacks.length === 0) return null;
    return boss.attacks[attackIdx % boss.attacks.length];
  }, [boss.attacks, attackIdx]);

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

  function startAttack() {
    if (!attack) return;
    setBossLine(attack.taunt ?? boss.intro);
    setClaimRevealed(false);
    setPhase("attack");
  }

  function chooseAnswer(originalIdx: number) {
    if (!attack) return;
    const opt = attack.options[originalIdx];
    const correctOpt = attack.options.find((o) => o.correct);
    // Record this resolution for the post-battle review.
    resolvedRef.current.push({
      attackIdx: attackIdx % boss.attacks.length,
      bossId: boss.id,
      pickedOptionText: opt.text,
      pickedCorrect: opt.correct,
      correctOptionText: correctOpt?.text ?? "",
      rationale: opt.rationale,
      claim: attack.claim,
    });
    const baseDamage =
      (attack.difficulty * 18 + 12) * itemBonuses.strikeMult;
    const critRoll = Math.random();
    const isCrit = critRoll < (patron?.passive.critChance ?? 0);
    setLastResultWasCrit(false);

    if (opt.correct) {
      const dmg = Math.round(isCrit ? baseDamage * 2 : baseDamage);
      setLastResultWasCrit(isCrit);
      const newBossHp = Math.max(0, bossHp - dmg);
      setBossHp(newBossHp);
      setBossFlash(true);
      isCrit ? sfx.crit() : sfx.hit();
      setResultMsg(`✓ Correct! ${isCrit ? "CRITICAL " : ""}${dmg} damage to ${boss.name}.`);
      setResultRationale(opt.rationale ?? "");
      setPhase("resolving");
      setTimeout(() => setBossFlash(false), 400);
      // After resolve, check victory / midline / continue
      setTimeout(() => {
        if (newBossHp === 0) {
          sfx.victory();
          setPhase("victory");
        } else if (
          boss.midline &&
          !showMidline &&
          newBossHp <= Math.floor(boss.maxHp / 2)
        ) {
          setShowMidline(true);
          setBossLine(boss.midline);
          setPhase("midline");
        } else {
          // Faith regen between rounds
          setHero((h) => ({
            ...h,
            faith: Math.min(h.maxFaith, h.faith + itemBonuses.faithRegen + 2),
          }));
          setAttackIdx((i) => i + 1);
          setPhase("intro");
        }
      }, 2200);
    } else {
      const dmg = Math.round(attack.difficulty * 10 + 8);
      const newHp = Math.max(0, hero.hp - dmg);
      setHero((h) => ({ ...h, hp: newHp }));
      setHeroFlash(true);
      sfx.wrong();
      setResultMsg(`✗ Wrong! You take ${dmg} damage.`);
      setResultRationale(opt.rationale ?? "");
      setPhase("resolving");
      setTimeout(() => setHeroFlash(false), 400);
      setTimeout(() => {
        if (newHp === 0) {
          sfx.defeat();
          setPhase("defeat");
        } else {
          setHero((h) => ({
            ...h,
            faith: Math.min(h.maxFaith, h.faith + itemBonuses.faithRegen + 2),
          }));
          setAttackIdx((i) => i + 1);
          setPhase("intro");
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
          <div className="flex justify-center mt-3 mb-1">
            {bossSprite && (
              <div
                className={`pixel-shadow-lg ${
                  phase === "victory" ? "opacity-30 grayscale" : ""
                }`}
              >
                <PixelSprite
                  sprite={bossSprite}
                  scale={9}
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
          <div className="pixel-shadow-lg">
            <PixelSprite
              sprite={playerSpriteData}
              scale={6}
              flashing={heroFlash}
              idle
            />
          </div>
        </div>
      </div>

      {/* Bottom: action area */}
      <div className="relative z-20 mt-4 p-3 pb-6">
        <div className="max-w-md mx-auto">
          {phase === "intro" && (
            <PixelFrame variant="danger" className="p-3">
              <div className="font-pixel text-crimson text-[8px] uppercase tracking-widest mb-1">
                {boss.name}
              </div>
              <p className="font-pixel text-parchment text-[11px] leading-relaxed mb-3">
                <Typewriter text={bossLine} speed={22} />
              </p>
              <PixelButton onClick={startAttack} variant="primary">
                Face the Attack ▶
              </PixelButton>
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
