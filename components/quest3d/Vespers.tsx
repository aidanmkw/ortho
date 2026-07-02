"use client";

// Vespers — the daily gauntlet. Seven questions drawn from the whole
// corpus, identical for everyone on a given date. Three hearts, one
// attempt's result worth sharing (Wordle-style grid, no backend).

import * as React from "react";
import type { BossAttack, Chapter } from "@/lib/quest/types";
import { sfx } from "@/lib/quest/sfx";
import { PLATE_LETTERS } from "./BattlePanel";

function seededRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleSeeded<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export type VespersQuestion = { chapter: Chapter; attack: BossAttack };

export function buildVespers(chapters: Chapter[]): { date: string; qs: VespersQuestion[] } {
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const rng = seededRng(seed ^ 0x0d05);
  const pool: VespersQuestion[] = [];
  for (const chapter of chapters) {
    for (const attack of chapter.boss?.attacks ?? []) {
      pool.push({ chapter, attack });
    }
  }
  return { date, qs: shuffleSeeded(pool, rng).slice(0, 7) };
}

type Props = {
  chapters: Chapter[];
  onExit: () => void;
};

export default function Vespers({ chapters, onExit }: Props) {
  const { date, qs } = React.useMemo(() => buildVespers(chapters), [chapters]);
  const [idx, setIdx] = React.useState(0);
  const [hearts, setHearts] = React.useState(3);
  const [results, setResults] = React.useState<("hit" | "miss")[]>([]);
  const [picked, setPicked] = React.useState<number | null>(null);
  const [order, setOrder] = React.useState<number[]>(() =>
    shuffleSeeded(qs[0]?.attack.options.map((_, i) => i) ?? [], seededRng(1))
  );
  const [copied, setCopied] = React.useState(false);

  const q = qs[idx];
  const over = hearts <= 0 || idx >= qs.length;

  const pick = (plate: number) => {
    if (picked !== null || !q) return;
    const correct = !!q.attack.options[order[plate]]?.correct;
    setPicked(plate);
    if (correct) {
      sfx.hit();
      setResults((r) => [...r, "hit"]);
    } else {
      sfx.wrong();
      setResults((r) => [...r, "miss"]);
      setHearts((h) => h - 1);
    }
  };

  const next = () => {
    const n = idx + 1;
    setIdx(n);
    setPicked(null);
    setOrder(shuffleSeeded(qs[n]?.attack.options.map((_, i) => i) ?? [], seededRng(n + 2)));
  };

  const grid = results.map((r) => (r === "hit" ? "⚔" : "✗")).join("");
  const score = results.filter((r) => r === "hit").length;
  const shareText = `ΟΔΟΣ Vespers ${date}\n${grid} — ${score}/${qs.length}${hearts <= 0 ? " (fell)" : ""}\nhttps://aidanmkw.github.io/ortho/pilgrimage/`;

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ text: shareText });
      else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
      } catch {}
    }
  };

  React.useEffect(() => {
    if (over && results.length) {
      try {
        const best = parseInt(window.localStorage.getItem("vespers:best") ?? "0", 10);
        if (score > best) window.localStorage.setItem("vespers:best", String(score));
        window.localStorage.setItem("vespers:last", date);
      } catch {}
    }
  }, [over, results.length, score, date]);

  return (
    <div className="fixed inset-0 z-[110] overflow-y-auto bg-[#0c0910] text-parchment">
      <div
        className="min-h-full flex flex-col items-center justify-center px-4 py-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, #241c38 0%, #140f20 55%, #0c0910 100%)",
        }}
      >
        <div className="text-[10px] uppercase tracking-[0.5em] text-[#c0a8e8] mb-1">
          Vespers · {date}
        </div>
        <div className="font-display text-2xl text-gold mb-1">The Daily Gauntlet</div>
        <div className="flex gap-1 mb-4 text-lg" aria-label={`${hearts} hearts`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={i < hearts ? "" : "opacity-25 grayscale"}>
              ❤️
            </span>
          ))}
          <span className="text-parchment/60 text-xs self-center ml-2">
            {Math.min(idx + (picked !== null ? 1 : 0), qs.length)}/{qs.length}
          </span>
        </div>

        {!over && q ? (
          <div className="w-full max-w-xl bg-[#100c18]/90 border-2 border-[#5c3470]/70 rounded-lg p-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#c0a8e8]/80 mb-2">
              {q.chapter.boss!.name} · {q.chapter.era}
            </div>
            <p className="text-parchment text-sm leading-snug mb-3">
              <span className="text-crimson font-bold">✠ </span>
              {q.attack.claim}
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              {order.map((optIdx, plate) => {
                const o = q.attack.options[optIdx];
                const state =
                  picked === null
                    ? "idle"
                    : o.correct
                      ? "correct"
                      : plate === picked
                        ? "wrong"
                        : "dim";
                const cls = {
                  idle: "border-gold/40 bg-[#171220] hover:border-gold text-parchment",
                  correct: "border-[#f0d358] bg-[#2a2208] text-[#ffe98c]",
                  wrong: "border-crimson bg-[#220c14] text-[#e8a0a0]",
                  dim: "border-parchment/10 text-parchment/30",
                }[state];
                return (
                  <button
                    key={plate}
                    disabled={picked !== null}
                    onClick={() => pick(plate)}
                    className={`text-left rounded border-2 px-2.5 py-2 text-[12px] leading-snug ${cls}`}
                  >
                    <span className="font-display text-gold mr-2">{PLATE_LETTERS[plate]}</span>
                    {o.text}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="mt-3 flex items-center justify-between">
                <p className="text-[11px] text-parchment/70 italic max-w-[70%]">
                  {q.attack.options.find((o) => o.correct)?.rationale ?? ""}
                </p>
                <button
                  onClick={next}
                  className="font-display text-sm bg-gold text-[#14100a] px-4 py-1.5 rounded border-2 border-[#f0d358]"
                >
                  {idx + 1 >= qs.length || hearts <= 0 ? "Finish" : "Next"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-md bg-[#100c18]/90 border-2 border-[#5c3470]/70 rounded-lg p-5 text-center">
            <div className="font-display text-xl text-gold mb-2">
              {hearts > 0 ? "Vespers kept." : "The night took you."}
            </div>
            <div className="text-3xl tracking-wider mb-2">{grid || "—"}</div>
            <div className="text-parchment/80 text-sm mb-4">
              {score}/{qs.length} witnessed truly
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={share}
                className="font-display text-sm bg-gold text-[#14100a] px-5 py-2 rounded border-2 border-[#f0d358]"
              >
                {copied ? "Copied ✓" : "Share result"}
              </button>
              <button
                onClick={onExit}
                className="text-sm px-4 py-2 rounded border border-parchment/30 text-parchment/80"
              >
                Back
              </button>
            </div>
            <p className="text-parchment/45 text-[10px] mt-3">
              Same seven for every pilgrim today. Return tomorrow.
            </p>
          </div>
        )}

        {!over && (
          <button onClick={onExit} className="mt-4 text-xs text-parchment/50 hover:text-parchment">
            ⟵ Abandon vespers
          </button>
        )}
      </div>
    </div>
  );
}
