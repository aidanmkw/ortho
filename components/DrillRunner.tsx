"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { QAItem, Citation } from "@/lib/types";
import { getScriptureText } from "@/lib/bible-text";
import { useProgress } from "./ProgressProvider";

type Props = {
  items: QAItem[];
  stageTitle: string;
  topicTitle?: string;
};

export default function DrillRunner({ items, stageTitle, topicTitle }: Props) {
  const { record, progress } = useProgress();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [orderingPicks, setOrderingPicks] = useState<string[]>([]);
  const [attemptText, setAttemptText] = useState("");
  const [scoreCorrect, setScoreCorrect] = useState(0);
  const [scoreAttempted, setScoreAttempted] = useState(0);
  const [xpThisRun, setXpThisRun] = useState(0);
  const [finished, setFinished] = useState(false);
  const [lastXpAward, setLastXpAward] = useState<number | null>(null);
  const [selfRated, setSelfRated] = useState<null | "correct" | "wrong" | "skipped">(
    null
  );

  const item = items[index];

  function reset() {
    setRevealed(false);
    setSelectedChoice(null);
    setOrderingPicks([]);
    setAttemptText("");
    setLastXpAward(null);
    setSelfRated(null);
  }

  function commitResult(result: "correct" | "wrong" | "skipped") {
    if (!item) return;
    setRevealed(true);
    setScoreAttempted((n) => n + 1);
    if (result === "correct") setScoreCorrect((n) => n + 1);
    const { xpGained } = record(item.id, item.difficulty, result);
    setXpThisRun((x) => x + xpGained);
    setLastXpAward(xpGained);
    setSelfRated(result);
  }

  function next() {
    // If we revealed a QA/debate item but never self-rated, treat as skipped.
    if (
      item &&
      revealed &&
      (item.kind === "qa" || item.kind === "debate") &&
      selfRated === null
    ) {
      commitResult("skipped");
    }
    if (index < items.length - 1) {
      setIndex(index + 1);
      reset();
    } else {
      setFinished(true);
    }
  }

  function prev() {
    if (index > 0) {
      setIndex(index - 1);
      reset();
    }
  }

  function restart() {
    setIndex(0);
    setScoreAttempted(0);
    setScoreCorrect(0);
    setXpThisRun(0);
    setFinished(false);
    reset();
  }

  const orderedChoices = useMemo(
    () => item?.choices ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item?.id]
  );

  if (finished) {
    return (
      <SummaryScreen
        attempted={scoreAttempted}
        correct={scoreCorrect}
        xpThisRun={xpThisRun}
        totalXp={progress.xp}
        onRestart={restart}
      />
    );
  }

  if (!item) {
    return (
      <div className="parchment-card p-8 text-center">
        <p className="text-parchment">No items in this drill yet.</p>
        <Link
          href="/"
          className="btn-quiet inline-block mt-4 px-4 py-2 rounded text-sm no-underline"
        >
          ← Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-baseline mb-3 text-[11px] sm:text-xs text-parchment/60">
        <div className="truncate pr-2">
          <span className="text-gold">{stageTitle}</span>
          {topicTitle && <> · {topicTitle}</>}
        </div>
        <div className="whitespace-nowrap">
          {index + 1} / {items.length}
          {scoreAttempted > 0 && (
            <>
              {" "}
              · <span className="text-gold">{scoreCorrect}</span>/{scoreAttempted}
              {xpThisRun > 0 && (
                <>
                  {" "}
                  · <span className="text-gold">+{xpThisRun} XP</span>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <div className="w-full h-1 bg-parchment/10 rounded mb-5 overflow-hidden">
        <div
          className="h-full bg-gold transition-all"
          style={{ width: `${((index + 1) / items.length) * 100}%` }}
        />
      </div>

      <div className="parchment-card p-5 sm:p-8">
        <div className="flex justify-between items-baseline mb-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gold/70">
            {kindLabel(item.kind)}
          </span>
          <span className="text-[10px] sm:text-xs text-parchment/50">
            {"★".repeat(item.difficulty)}
            <span className="text-parchment/20">
              {"★".repeat(5 - item.difficulty)}
            </span>
          </span>
        </div>

        {(item.kind === "qa" ||
          item.kind === "mcq" ||
          item.kind === "identify-source" ||
          item.kind === "chronology") &&
          item.prompt && (
            <p className="text-parchment text-base sm:text-lg leading-relaxed mb-5">
              {item.prompt}
            </p>
          )}

        {item.kind === "debate" && (
          <div className="mb-5">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-crimson font-bold tracking-widest text-[10px] sm:text-xs uppercase">
                Opponent ({item.opponentTradition})
              </span>
            </div>
            <blockquote className="border-l-2 border-crimson pl-3 sm:pl-4 text-parchment italic leading-relaxed text-sm sm:text-base">
              {item.opponentClaim}
            </blockquote>
          </div>
        )}

        {/* MCQ + identify-source */}
        {(item.kind === "mcq" || item.kind === "identify-source") &&
          item.choices && (
            <div className="space-y-2">
              {item.choices.map((c) => {
                const isSelected = selectedChoice === c.id;
                const isCorrect = c.id === item.correctChoiceId;
                const showResult = revealed;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      if (revealed) return;
                      setSelectedChoice(c.id);
                      commitResult(
                        c.id === item.correctChoiceId ? "correct" : "wrong"
                      );
                    }}
                    className={`w-full text-left p-3 rounded border transition active:scale-[0.99] ${
                      showResult && isCorrect
                        ? "border-gold bg-gold/10"
                        : showResult && isSelected && !isCorrect
                        ? "border-crimson bg-crimson/10"
                        : isSelected
                        ? "border-parchment/40"
                        : "border-parchment/15 hover:border-gold/50"
                    }`}
                    disabled={revealed}
                  >
                    <div className="text-parchment text-sm sm:text-base">{c.text}</div>
                    {showResult && c.rationale && (
                      <div className="text-xs text-parchment/70 mt-2">
                        {c.rationale}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

        {/* Chronology */}
        {item.kind === "chronology" && item.choices && (
          <div className="space-y-3">
            <div className="text-xs sm:text-sm text-parchment/60 mb-2">
              Tap in chronological order (earliest first):
            </div>
            <div className="space-y-2">
              {orderedChoices.map((c) => {
                const pickedAt = orderingPicks.indexOf(c.id);
                const correctAt = item.correctOrder?.indexOf(c.id) ?? -1;
                const wasCorrect =
                  revealed && pickedAt !== -1 && pickedAt === correctAt;
                const wasWrong =
                  revealed && pickedAt !== -1 && pickedAt !== correctAt;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      if (revealed) return;
                      if (orderingPicks.includes(c.id)) return;
                      const next = [...orderingPicks, c.id];
                      setOrderingPicks(next);
                      if (next.length === orderedChoices.length) {
                        const correct =
                          item.correctOrder &&
                          next.every(
                            (id, i) => id === item.correctOrder?.[i]
                          );
                        commitResult(correct ? "correct" : "wrong");
                      }
                    }}
                    disabled={revealed || orderingPicks.includes(c.id)}
                    className={`w-full text-left p-3 rounded border transition flex items-center gap-3 active:scale-[0.99] ${
                      wasCorrect
                        ? "border-gold bg-gold/10"
                        : wasWrong
                        ? "border-crimson bg-crimson/10"
                        : orderingPicks.includes(c.id)
                        ? "border-parchment/40 bg-parchment/5"
                        : "border-parchment/15 hover:border-gold/50"
                    }`}
                  >
                    <span className="text-gold font-mono w-6">
                      {pickedAt === -1 ? "·" : pickedAt + 1}
                    </span>
                    <span className="text-parchment text-sm sm:text-base">{c.text}</span>
                  </button>
                );
              })}
            </div>
            {revealed && item.correctOrder && (
              <div className="text-[11px] sm:text-xs text-parchment/60 mt-3">
                Correct order:{" "}
                {item.correctOrder
                  .map((id) => orderedChoices.find((c) => c.id === id)?.text)
                  .filter(Boolean)
                  .join(" → ")}
              </div>
            )}
          </div>
        )}

        {/* QA / Debate — free text + self-rating */}
        {(item.kind === "qa" || item.kind === "debate") && (
          <div className="space-y-3">
            {!revealed && (
              <>
                <textarea
                  value={attemptText}
                  onChange={(e) => setAttemptText(e.target.value)}
                  placeholder={
                    item.kind === "debate"
                      ? "Compose your response. Cite Fathers, Councils, and Scripture..."
                      : "Type your answer (or skip to reveal)..."
                  }
                  className="w-full bg-black/40 border border-parchment/20 rounded p-3 text-parchment text-sm sm:text-base min-h-[120px] focus:border-gold/60 focus:outline-none"
                />
                <button
                  onClick={() => setRevealed(true)}
                  className="btn-gold px-4 py-2 rounded text-sm w-full sm:w-auto"
                >
                  Reveal {item.kind === "debate" ? "Orthodox Response" : "Answer"}
                </button>
              </>
            )}

            {revealed && (
              <div className="space-y-4">
                {item.expectedAnswer && (
                  <RevealBlock label="Expected Answer">
                    {item.expectedAnswer}
                  </RevealBlock>
                )}
                {item.orthodoxRebuttal && (
                  <RevealBlock label="Orthodox Response" accent="gold">
                    {item.orthodoxRebuttal}
                  </RevealBlock>
                )}
                {item.rejoinders && item.rejoinders.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-xs uppercase tracking-widest text-gold/70">
                      Rejoinders
                    </div>
                    {item.rejoinders.map((r, i) => (
                      <div
                        key={i}
                        className="border-l-2 border-byzantine pl-3 sm:pl-4 py-1"
                      >
                        <div className="text-parchment/75 italic text-sm">
                          {r.objection}
                        </div>
                        <div className="text-parchment mt-2 text-sm">
                          {r.reply}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selfRated === null && (
                  <div className="border-t border-gold/20 pt-4 mt-4">
                    <div className="text-xs uppercase tracking-widest text-gold/70 mb-2">
                      Rate your answer (honor system)
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        className="border border-crimson/60 text-crimson hover:bg-crimson/10 rounded py-2 text-xs sm:text-sm"
                        onClick={() => commitResult("wrong")}
                      >
                        ✗ Missed
                      </button>
                      <button
                        className="border border-parchment/30 text-parchment hover:bg-parchment/5 rounded py-2 text-xs sm:text-sm"
                        onClick={() => commitResult("skipped")}
                      >
                        ◯ Partial
                      </button>
                      <button
                        className="btn-gold rounded py-2 text-xs sm:text-sm"
                        onClick={() => commitResult("correct")}
                      >
                        ✓ Got it
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Citations panel (shown after reveal) */}
        {revealed && (
          <div className="mt-6">
            <CitationsList citations={item.citations} />
            {item.notes && (
              <div className="mt-4 text-xs text-parchment/50 italic">
                Note — {item.notes}
              </div>
            )}
          </div>
        )}

        {lastXpAward !== null && lastXpAward > 0 && (
          <div className="mt-4 text-center text-gold font-display text-lg animate-pulse">
            +{lastXpAward} XP
          </div>
        )}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
        <button
          onClick={prev}
          disabled={index === 0}
          className="btn-quiet py-3 rounded text-sm disabled:opacity-30"
        >
          ←
        </button>
        {!revealed ? (
          <button
            onClick={() => {
              setRevealed(true);
              commitResult("skipped");
            }}
            className="btn-quiet py-3 rounded text-sm"
          >
            Skip
          </button>
        ) : (
          <div className="text-center text-[10px] text-parchment/50 py-3">
            {(item.kind === "qa" || item.kind === "debate") && selfRated === null
              ? "Rate above"
              : ""}
          </div>
        )}
        <button
          onClick={next}
          className="btn-gold py-3 rounded text-sm"
        >
          {index === items.length - 1 ? "Finish" : "Next →"}
        </button>
      </div>
    </div>
  );
}

function SummaryScreen({
  attempted,
  correct,
  xpThisRun,
  totalXp,
  onRestart,
}: {
  attempted: number;
  correct: number;
  xpThisRun: number;
  totalXp: number;
  onRestart: () => void;
}) {
  const pct = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
  let verdict = "Continue with humility — keep drilling.";
  if (pct === 100) verdict = "Worthy! The Fathers themselves would smile.";
  else if (pct >= 85) verdict = "Strong work. The deposit is being kept.";
  else if (pct >= 60) verdict = "Solid. Some passages need re-reading.";
  else if (pct >= 40) verdict = "Press on. Take the wrong ones back to the source.";

  return (
    <div>
      <div className="parchment-card p-6 sm:p-10 text-center">
        <div className="text-6xl text-gold mb-3">☦</div>
        <h2 className="font-display text-3xl text-parchment mb-1">
          Drill Complete
        </h2>
        <p className="text-parchment/70 italic mb-6">{verdict}</p>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto mb-6">
          <Stat label="Correct" value={`${correct}/${attempted}`} />
          <Stat label="Score" value={`${pct}%`} />
          <Stat label="XP gained" value={`+${xpThisRun}`} />
        </div>

        <div className="text-xs text-parchment/60 mb-6">
          Total XP: <span className="text-gold">{totalXp.toLocaleString()}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRestart}
            className="btn-quiet px-5 py-2 rounded text-sm"
          >
            ↻ Drill again
          </button>
          <Link
            href="/"
            className="btn-gold px-5 py-2 rounded text-sm no-underline"
          >
            ⌂ Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="parchment-card p-3">
      <div className="text-gold text-lg sm:text-2xl font-mono">{value}</div>
      <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-parchment/60">
        {label}
      </div>
    </div>
  );
}

function RevealBlock({
  label,
  children,
  accent = "parchment",
}: {
  label: string;
  children: React.ReactNode;
  accent?: "gold" | "parchment";
}) {
  return (
    <div>
      <div
        className={`text-xs uppercase tracking-widest mb-2 ${
          accent === "gold" ? "text-gold" : "text-parchment/60"
        }`}
      >
        {label}
      </div>
      <div className="text-parchment leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
        {children}
      </div>
    </div>
  );
}

function CitationsList({ citations }: { citations: Citation[] }) {
  if (!citations || citations.length === 0) return null;
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-gold/70 mb-3">
        Citations
      </div>
      <ul className="space-y-3">
        {citations.map((c, i) => (
          <CitationItem key={i} c={c} />
        ))}
      </ul>
    </div>
  );
}

function CitationItem({ c }: { c: Citation }) {
  // Prefer an explicitly-stored quote. Otherwise look the reference up
  // in our Bible-text lookup (covers source AND scripture fields, since
  // many citations only fill the source).
  const verse =
    !c.quote && (getScriptureText(c.scripture ?? "") || getScriptureText(c.source));

  return (
    <li className="text-sm">
      <div className="text-gold">{c.source}</div>
      {c.scripture && c.scripture !== c.source && (
        <div className="text-xs text-parchment/60">{c.scripture}</div>
      )}
      {c.quote ? (
        <blockquote className="border-l-2 border-gold/40 pl-3 mt-2 text-parchment/90 italic leading-relaxed">
          {c.quote}
        </blockquote>
      ) : verse ? (
        <blockquote className="border-l-2 border-gold/40 pl-3 mt-2 text-parchment/90 italic leading-relaxed">
          {verse.text}
          <footer className="not-italic text-[10px] text-parchment/50 mt-1">
            — {translationLabel(verse.translation)}
          </footer>
        </blockquote>
      ) : (
        <div className="text-[11px] text-parchment/40 mt-1 italic">
          text pending
        </div>
      )}
      {c.url && (
        <a
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gold/70 hover:text-gold mt-1 inline-block"
        >
          source link →
        </a>
      )}
    </li>
  );
}

function translationLabel(t: string): string {
  switch (t) {
    case "EOB-NT":
      return "Eastern Orthodox Bible, New Testament";
    case "EOB-OT":
      return "Eastern Orthodox Bible, Old Testament";
    case "LXX-NETS":
      return "NETS (Septuagint, English)";
    case "KJV":
      return "King James Version";
    case "RSV":
      return "Revised Standard Version";
    default:
      return t;
  }
}

function kindLabel(k: QAItem["kind"]): string {
  switch (k) {
    case "qa":
      return "Open Recall";
    case "mcq":
      return "Multiple Choice";
    case "debate":
      return "Cross-Examination";
    case "identify-source":
      return "Identify the Source";
    case "chronology":
      return "Chronology";
  }
}
