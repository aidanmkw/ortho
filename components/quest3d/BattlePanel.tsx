"use client";

import * as React from "react";

export const PLATE_LETTERS = ["Α", "Β", "Γ", "Δ", "Ε"];

export type PanelOption = {
  text: string;
  state: "idle" | "dimmed" | "correct" | "wrong";
};

type Props = {
  bossName: string;
  bossTitle: string;
  tradition: string;
  bossHp: number;
  bossMax: number;
  playerHp: number;
  playerMax: number;
  stage: "intro" | "question" | "resolved";
  introText: string;
  midline?: string | null;
  claim: string;
  taunt?: string;
  options: PanelOption[];
  pickedCorrect?: boolean;
  resolvedNote?: string;
  rationale?: string;
  correctLetter?: string;
  light: number;
  lightUsed: boolean;
  blessing?: string | null;
  onBegin: () => void;
  onPick: (idx: number) => void;
  onContinue: () => void;
  onSpendLight: () => void;
  onWithdraw: () => void;
};

/**
 * The DOM half of a Trial of Witness. The claim and the four answers are
 * read here; the answer is GIVEN in the world — run to the matching
 * Α/Β/Γ/Δ plate (or tap an option here / press 1-4).
 */
export default function BattlePanel(p: Props) {
  const bossPct = Math.max(0, Math.round((p.bossHp / p.bossMax) * 100));
  const playerPct = Math.max(0, Math.round((p.playerHp / p.playerMax) * 100));

  return (
    <>
      {/* Adversary header */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-[min(94vw,640px)] pointer-events-none">
        <div className="bg-black/80 border-2 border-crimson/70 rounded px-3 py-2">
          <div className="flex items-baseline justify-between gap-2">
            <div className="font-display text-parchment text-sm sm:text-base truncate">
              {p.bossName}
              <span className="text-parchment/60 text-xs"> · {p.bossTitle}</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-crimson shrink-0">
              {p.tradition}
            </div>
          </div>
          <div className="mt-1 h-2.5 bg-[#1a0808] rounded-sm overflow-hidden border border-crimson/40">
            <div
              className="h-full bg-gradient-to-r from-[#a02020] to-crimson transition-all duration-500"
              style={{ width: `${bossPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom: the trial itself */}
      <div className="absolute bottom-0 inset-x-0 z-30 px-2 pb-2 sm:px-4 sm:pb-3 pointer-events-none">
        <div className="mx-auto w-[min(96vw,760px)] pointer-events-auto">
          {/* pilgrim HP + blessing */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] uppercase tracking-widest text-gold/90">
              Pilgrim
            </span>
            <div className="flex-1 h-2.5 bg-[#14100a] rounded-sm overflow-hidden border border-gold/40">
              <div
                className="h-full bg-gradient-to-r from-[#f0d358] to-gold transition-all duration-500"
                style={{ width: `${playerPct}%` }}
              />
            </div>
            <span className="text-[10px] text-parchment/80 font-mono">
              {Math.max(0, p.playerHp)}/{p.playerMax}
            </span>
            {p.blessing && (
              <span
                className="text-[10px] text-gold border border-gold/50 rounded px-1.5 py-0.5 bg-black/60"
                title={`${p.blessing} intercedes: your next wrong answer is turned aside.`}
              >
                ☦ {p.blessing}
              </span>
            )}
          </div>

          <div className="bg-[#0e0a06]/92 border-2 border-gold/60 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
            {p.stage === "intro" ? (
              <>
                <p className="text-parchment text-sm sm:text-base leading-relaxed italic">
                  “{p.introText}”
                </p>
                <div className="mt-3 flex justify-end gap-2">
                  <button
                    onClick={p.onWithdraw}
                    className="text-xs text-parchment/60 hover:text-parchment px-3 py-2"
                  >
                    Withdraw
                  </button>
                  <button
                    onClick={p.onBegin}
                    className="font-display text-sm bg-gold text-[#14100a] px-5 py-2 rounded border-2 border-[#f0d358] hover:brightness-110 active:translate-y-px"
                  >
                    Bear Witness
                  </button>
                </div>
              </>
            ) : (
              <>
                {p.midline && (
                  <p className="text-crimson/90 text-[11px] sm:text-xs italic mb-1.5">
                    {p.midline}
                  </p>
                )}
                <p className="text-parchment text-[13px] sm:text-[15px] leading-snug">
                  <span className="text-crimson font-bold">✠ The claim: </span>
                  {p.claim}
                </p>
                {p.taunt && p.stage === "question" && (
                  <p className="text-parchment/55 text-[11px] italic mt-1">{p.taunt}</p>
                )}

                <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {p.options.map((o, i) => {
                    const base =
                      "text-left rounded border-2 px-2.5 py-2 text-[12px] sm:text-[13px] leading-snug transition flex gap-2 items-start";
                    const styles: Record<PanelOption["state"], string> = {
                      idle: "border-gold/40 bg-[#171208] text-parchment hover:border-gold cursor-pointer",
                      dimmed:
                        "border-parchment/10 bg-[#11100c] text-parchment/25 cursor-default",
                      correct:
                        "border-[#f0d358] bg-[#2a2208] text-[#ffe98c]",
                      wrong: "border-crimson bg-[#220c0c] text-[#e8a0a0]",
                    };
                    return (
                      <button
                        key={i}
                        disabled={p.stage !== "question" || o.state === "dimmed"}
                        onClick={() => p.onPick(i)}
                        className={`${base} ${styles[o.state]}`}
                      >
                        <span className="font-display text-gold text-base leading-none mt-0.5 shrink-0">
                          {PLATE_LETTERS[i]}
                        </span>
                        <span>{o.text}</span>
                      </button>
                    );
                  })}
                </div>

                {p.stage === "question" ? (
                  <div className="mt-2.5 flex items-center justify-between gap-2 flex-wrap">
                    <div className="text-[10px] text-parchment/55">
                      Dodge his attacks — run to a plate and stand on it (or tap / 1–4).
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={p.onSpendLight}
                        disabled={p.light < 3 || p.lightUsed}
                        className={`text-[11px] px-2.5 py-1.5 rounded border ${
                          p.light >= 3 && !p.lightUsed
                            ? "border-gold/70 text-gold hover:bg-gold/10"
                            : "border-parchment/15 text-parchment/30"
                        }`}
                        title="Spend 3 Light: the Spirit of Truth dims two false answers."
                      >
                        🕯 Spirit of Truth (3)
                      </button>
                      <button
                        onClick={p.onWithdraw}
                        className="text-[11px] px-2.5 py-1.5 rounded border border-parchment/25 text-parchment/60 hover:text-parchment"
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2.5">
                    <p
                      className={`text-[12px] sm:text-[13px] leading-snug ${
                        p.pickedCorrect ? "text-[#ffe98c]" : "text-[#e8a0a0]"
                      }`}
                    >
                      {p.resolvedNote}
                    </p>
                    {p.rationale && (
                      <p className="text-parchment/75 text-[11px] sm:text-xs leading-snug mt-1">
                        <span className="text-gold">The Tradition answers ({p.correctLetter}):</span>{" "}
                        {p.rationale}
                      </p>
                    )}
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={p.onContinue}
                        className="font-display text-sm bg-gold text-[#14100a] px-5 py-2 rounded border-2 border-[#f0d358] hover:brightness-110 active:translate-y-px"
                      >
                        Continue ⏎
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
