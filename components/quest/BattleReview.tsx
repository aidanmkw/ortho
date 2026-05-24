"use client";

import { useState } from "react";
import type { ResolvedAttack } from "@/lib/quest/types";
import { PixelFrame, PixelButton } from "./PixelUI";

export default function BattleReview({
  resolved,
  bossName,
  outcome,
  onContinue,
  continueLabel = "Continue ▶",
}: {
  resolved: ResolvedAttack[];
  bossName: string;
  outcome: "victory" | "defeat";
  onContinue: () => void;
  continueLabel?: string;
}) {
  // Each item must be expanded before the player may continue.
  const [opened, setOpened] = useState<Set<number>>(new Set());

  const allOpened = resolved.length === 0 || opened.size === resolved.length;
  const correctCount = resolved.filter((r) => r.pickedCorrect).length;

  function toggle(i: number) {
    setOpened((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function openAll() {
    setOpened(new Set(resolved.map((_, i) => i)));
  }

  return (
    <div
      className="relative min-h-[100dvh] w-full overflow-y-auto px-3 py-4 sm:py-6"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a1408 0%, #0c0a08 100%)",
      }}
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-4">
          <div className="font-pixel text-gold text-[10px] uppercase tracking-[0.4em] mb-1">
            Battle Review
          </div>
          <div className="font-pixel text-parchment/60 text-[9px] uppercase tracking-widest">
            {bossName} · {outcome === "victory" ? "VICTORY" : "DEFEAT"}
          </div>
          <div className="font-pixel text-parchment text-[10px] mt-2">
            <span className="text-gold">{correctCount}</span>
            <span className="text-parchment/60"> / </span>
            <span>{resolved.length}</span>
            <span className="text-parchment/60"> correct</span>
          </div>
        </div>

        <PixelFrame variant="default" className="p-3 mb-3">
          <div className="font-pixel text-parchment/70 text-[10px] leading-relaxed">
            Tap each round below to study the claim, the answers, and the
            reasoning. <span className="text-gold">Open every round to continue.</span> The point is not to win — the point is to remember.
          </div>
          {resolved.length > 1 && !allOpened && (
            <button
              onClick={openAll}
              className="font-pixel text-[9px] text-gold/80 underline mt-2"
            >
              Open all »
            </button>
          )}
        </PixelFrame>

        <div className="space-y-3 mb-4">
          {resolved.map((r, i) => {
            const isOpen = opened.has(i);
            const correct = r.pickedCorrect;
            return (
              <div
                key={i}
                className={`pixel-frame border-[3px] ${
                  correct
                    ? "border-gold/60 bg-[#1a1408]"
                    : "border-crimson/70 bg-[#1a0808]"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="block w-full text-left p-3 font-pixel"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={
                        correct ? "text-gold text-[12px]" : "text-crimson text-[12px]"
                      }
                    >
                      {correct ? "✓" : "✗"}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-parchment/60">
                      Round {i + 1}
                    </span>
                    <span className="ml-auto text-[10px] text-gold/80">
                      {isOpen ? "▾" : "▸"}
                    </span>
                  </div>
                  {!isOpen && (
                    <div className="text-[10px] text-parchment/70 italic line-clamp-2">
                      "{r.claim}"
                    </div>
                  )}
                </button>

                {isOpen && (
                  <div className="px-3 pb-3 space-y-2 font-pixel">
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-crimson/80 mb-1">
                        The Claim
                      </div>
                      <blockquote className="text-[10px] text-parchment italic leading-relaxed pl-3 border-l-2 border-crimson">
                        {r.claim}
                      </blockquote>
                    </div>

                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-parchment/60 mb-1">
                        You answered
                      </div>
                      <div
                        className={`text-[10px] leading-relaxed pl-3 border-l-2 ${
                          correct
                            ? "border-gold text-parchment"
                            : "border-crimson text-parchment/80 line-through"
                        }`}
                      >
                        {r.pickedOptionText}
                      </div>
                    </div>

                    {!correct && r.correctOptionText && (
                      <div>
                        <div className="text-[9px] uppercase tracking-widest text-gold/80 mb-1">
                          Correct answer
                        </div>
                        <div className="text-[10px] text-parchment leading-relaxed pl-3 border-l-2 border-gold">
                          {r.correctOptionText}
                        </div>
                      </div>
                    )}

                    {r.rationale && (
                      <div>
                        <div className="text-[9px] uppercase tracking-widest text-byzantine/80 mb-1">
                          Why
                        </div>
                        <div className="text-[10px] text-parchment/85 italic leading-relaxed">
                          {r.rationale}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <PixelButton
          onClick={onContinue}
          disabled={!allOpened}
          variant="primary"
          className="w-full"
        >
          {allOpened
            ? continueLabel
            : `Open all ${resolved.length} rounds (${opened.size}/${resolved.length})`}
        </PixelButton>
      </div>
    </div>
  );
}
