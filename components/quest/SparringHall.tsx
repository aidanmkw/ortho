"use client";

import type { QuestProgress, Boss, BossAttack } from "@/lib/quest/types";
import { CHAPTERS } from "@/lib/quest/chapters";
import { PixelFrame, PixelButton } from "./PixelUI";
import Portrait from "./Portrait";
import { PORTRAITS } from "@/lib/quest/portraits";

export type SparringTarget =
  | { kind: "chapter"; chapterId: string }
  | { kind: "mistakes" }
  | { kind: "skirmish" };

export default function SparringHall({
  progress,
  onSelect,
  onBack,
}: {
  progress: QuestProgress;
  onSelect: (t: SparringTarget) => void;
  onBack: () => void;
}) {
  const beatenIds = new Set(progress.chaptersBeaten);
  const beatenChapters = CHAPTERS.filter((c) => beatenIds.has(c.id));

  // Compute mistake count from attackStates
  const attackStates = progress.attackStates ?? {};
  const mistakeCount = Object.values(attackStates).filter(
    (s) => s.lastResult === "wrong"
  ).length;

  const totalAttempts = Object.values(attackStates).reduce(
    (n, s) => n + s.attempts,
    0
  );
  const totalCorrect = Object.values(attackStates).reduce(
    (n, s) => n + s.correct,
    0
  );
  const accuracyPct =
    totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  return (
    <div
      className="relative min-h-[100dvh] w-full overflow-y-auto px-3 py-4 sm:py-6"
      style={{
        background:
          "radial-gradient(ellipse at center, #28182c 0%, #14081a 50%, #0a0610 100%)",
      }}
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="font-pixel text-[10px] text-gold/80 uppercase tracking-widest"
          >
            ← Title
          </button>
          <h2 className="font-pixel text-gold text-[14px] tracking-widest">
            SPARRING HALL
          </h2>
          <div className="w-12" />
        </div>

        <PixelFrame variant="void" className="p-3 mb-4">
          <div className="font-pixel text-parchment/80 text-[10px] leading-relaxed">
            Drill any battle you have won. Sparring{" "}
            <span className="text-gold">does not affect your campaign save</span>{" "}
            — fight, lose, win, repeat, until the answers are in your bones.
          </div>
          <div className="font-pixel text-[9px] text-parchment/60 mt-2 flex gap-3 flex-wrap">
            <span>
              <span className="text-gold">{totalAttempts}</span> rounds answered
            </span>
            <span>·</span>
            <span>
              <span className="text-gold">{accuracyPct}%</span> accuracy
            </span>
            {mistakeCount > 0 && (
              <>
                <span>·</span>
                <span className="text-crimson">
                  {mistakeCount} mistake{mistakeCount === 1 ? "" : "s"}
                </span>
              </>
            )}
          </div>
        </PixelFrame>

        {/* MISTAKES MODE */}
        <button
          onClick={() => mistakeCount > 0 && onSelect({ kind: "mistakes" })}
          disabled={mistakeCount === 0}
          className={`block w-full mb-3 pixel-frame border-[3px] p-3 text-left transition ${
            mistakeCount === 0
              ? "border-parchment/15 opacity-50 cursor-not-allowed"
              : "border-crimson/70 hover:border-crimson"
          }`}
          style={{ background: "#1a0808" }}
        >
          <div className="flex items-start gap-3">
            <div className="text-crimson text-2xl leading-none mt-1">✗</div>
            <div className="flex-1">
              <div className="font-pixel text-crimson text-[11px] uppercase tracking-widest">
                Mistakes Drill
              </div>
              <div className="font-pixel text-parchment/80 text-[10px] mt-1 leading-relaxed">
                {mistakeCount > 0
                  ? `Drill the ${mistakeCount} round${mistakeCount === 1 ? "" : "s"} you last got wrong. Mistakes do not heal until you answer them right.`
                  : "No mistakes yet. Fight some battles first."}
              </div>
            </div>
          </div>
        </button>

        {/* RANDOM SKIRMISH */}
        <button
          onClick={() =>
            beatenChapters.length > 0 && onSelect({ kind: "skirmish" })
          }
          disabled={beatenChapters.length === 0}
          className={`block w-full mb-3 pixel-frame border-[3px] p-3 text-left transition ${
            beatenChapters.length === 0
              ? "border-parchment/15 opacity-50 cursor-not-allowed"
              : "border-byzantine hover:border-gold"
          }`}
          style={{ background: "#1a0a24" }}
        >
          <div className="flex items-start gap-3">
            <div className="text-gold text-2xl leading-none mt-1">⚔</div>
            <div className="flex-1">
              <div className="font-pixel text-gold text-[11px] uppercase tracking-widest">
                Random Skirmish
              </div>
              <div className="font-pixel text-parchment/80 text-[10px] mt-1 leading-relaxed">
                {beatenChapters.length > 0
                  ? `A wandering Heretic (The Crucible) attacks with rounds drawn from every boss you have beaten. 10 rounds.`
                  : "Beat your first boss to unlock."}
              </div>
            </div>
          </div>
        </button>

        <div className="font-pixel text-gold/70 text-[9px] uppercase tracking-widest mb-2 mt-5">
          Re-Fight a Boss
        </div>

        {beatenChapters.length === 0 ? (
          <PixelFrame className="p-4 text-center">
            <div className="font-pixel text-parchment/60 text-[10px]">
              No bosses defeated yet.
            </div>
          </PixelFrame>
        ) : (
          <div className="space-y-2">
            {beatenChapters.map((c) => {
              const portrait = PORTRAITS[c.boss.sprite];
              return (
                <button
                  key={c.id}
                  onClick={() =>
                    onSelect({ kind: "chapter", chapterId: c.id })
                  }
                  className="block w-full pixel-frame border-[2px] border-parchment/30 hover:border-gold/70 p-2 text-left transition"
                  style={{ background: "#0c0a08" }}
                >
                  <div className="flex items-center gap-3">
                    {portrait && (
                      <div className="flex-shrink-0">
                        <Portrait config={portrait} size={56} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-pixel text-gold text-[10px] uppercase tracking-widest">
                        Ch. {c.number} · {c.era}
                      </div>
                      <div className="font-pixel text-parchment text-[11px] mt-0.5">
                        {c.boss.name}
                      </div>
                      <div className="font-pixel text-parchment/60 text-[9px] italic">
                        {c.boss.title}
                      </div>
                    </div>
                    <div className="text-gold text-xl flex-shrink-0">→</div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="font-pixel text-parchment/40 text-[9px] mt-6 text-center italic">
          "Practice the answers until they become reflexes of the soul."
        </div>
      </div>
    </div>
  );
}

/** Build a synthetic Skirmish boss from a sampled set of attacks. */
export function buildSkirmishBoss(progress: QuestProgress): Boss | null {
  const beatenIds = new Set(progress.chaptersBeaten);
  const sourceChapters = CHAPTERS.filter((c) => beatenIds.has(c.id));
  if (sourceChapters.length === 0) return null;

  // Pool all attacks from beaten bosses
  const pool: BossAttack[] = sourceChapters.flatMap((c) => c.boss.attacks);
  // Shuffle and take up to 10
  const arr = [...pool];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const picked = arr.slice(0, Math.min(10, arr.length));

  return {
    id: "skirmish-crucible",
    name: "The Crucible",
    title: "A Wandering Heretic",
    tradition: "Many traditions",
    sprite: "doubt",
    maxHp: picked.reduce((n, a) => n + (a.difficulty * 18 + 12), 0),
    attacks: picked,
    intro:
      "I have studied every objection raised in every age. Stand against me, $you, if you dare.",
    midline: "You are halfway through. The hardest claims remain.",
    outro: "You answered them all. Go now — sharper than when you came.",
    victoryEpigraph: {
      text: "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.",
      source: "Proverbs 27:17",
    },
  };
}

/** Build a Mistakes Drill boss from attacks the user last got wrong. */
export function buildMistakesBoss(progress: QuestProgress): Boss | null {
  const states = progress.attackStates ?? {};
  const wrong = Object.values(states).filter((s) => s.lastResult === "wrong");
  if (wrong.length === 0) return null;

  // Look up the BossAttack objects from chapters
  const lookups: BossAttack[] = [];
  for (const s of wrong) {
    const ch = CHAPTERS.find((c) => c.boss.id === s.bossId);
    if (!ch) continue;
    const att = ch.boss.attacks[s.attackIdx];
    if (att) lookups.push(att);
  }
  if (lookups.length === 0) return null;

  // Shuffle
  const arr = [...lookups];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return {
    id: "mistakes-drill",
    name: "Your Mistakes",
    title: "Return to the Wound",
    tradition: "Your past errors",
    sprite: "doubt",
    maxHp: arr.reduce((n, a) => n + (a.difficulty * 18 + 12), 0),
    attacks: arr,
    intro:
      "These are the rounds you have missed. Face them again, $you, until they are mastered.",
    outro: "Mastered. Mistakes converted to wisdom.",
    victoryEpigraph: {
      text:
        "Though he fall, he shall not be utterly cast down: for the Lord upholdeth him with his hand.",
      source: "Psalm 36:24 (LXX) / 37:24 (MT)",
    },
  };
}
