"use client";

import { useMemo, useState } from "react";
import type { QAItem, Citation } from "@/lib/types";

type Props = {
  items: QAItem[];
  stageTitle: string;
  topicTitle?: string;
};

export default function DrillRunner({ items, stageTitle, topicTitle }: Props) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [orderingPicks, setOrderingPicks] = useState<string[]>([]);
  const [attemptText, setAttemptText] = useState("");
  const [scoreCorrect, setScoreCorrect] = useState(0);
  const [scoreAttempted, setScoreAttempted] = useState(0);

  const item = items[index];

  function reset() {
    setRevealed(false);
    setSelectedChoice(null);
    setOrderingPicks([]);
    setAttemptText("");
  }

  function reveal(wasCorrect: boolean | null) {
    setRevealed(true);
    setScoreAttempted((n) => n + 1);
    if (wasCorrect === true) setScoreCorrect((n) => n + 1);
  }

  function next() {
    if (index < items.length - 1) {
      setIndex(index + 1);
      reset();
    }
  }

  function prev() {
    if (index > 0) {
      setIndex(index - 1);
      reset();
    }
  }

  if (!item) {
    return (
      <div className="parchment-card p-8 text-center">
        <p className="text-parchment">No items in this drill yet.</p>
      </div>
    );
  }

  const orderedChoices = useMemo(
    () => item.choices ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.id]
  );

  return (
    <div>
      <div className="flex justify-between items-baseline mb-4 text-xs text-parchment/60">
        <div>
          <span className="text-gold">{stageTitle}</span>
          {topicTitle && <> · {topicTitle}</>}
        </div>
        <div>
          {index + 1} / {items.length}
          {scoreAttempted > 0 && (
            <>
              {" "}
              · <span className="text-gold">{scoreCorrect}</span>/{scoreAttempted} correct
            </>
          )}
        </div>
      </div>

      <div className="w-full h-1 bg-parchment/10 rounded mb-6 overflow-hidden">
        <div
          className="h-full bg-gold transition-all"
          style={{ width: `${((index + 1) / items.length) * 100}%` }}
        />
      </div>

      <div className="parchment-card p-6 md:p-8">
        <div className="flex justify-between items-baseline mb-4">
          <span className="text-xs uppercase tracking-widest text-gold/70">
            {kindLabel(item.kind)}
          </span>
          <span className="text-xs text-parchment/50">
            Difficulty {"★".repeat(item.difficulty)}
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
            <p className="text-parchment text-lg leading-relaxed mb-6">
              {item.prompt}
            </p>
          )}

        {item.kind === "debate" && (
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-crimson font-bold tracking-widest text-xs uppercase">
                Opponent ({item.opponentTradition})
              </span>
            </div>
            <blockquote className="border-l-2 border-crimson pl-4 text-parchment italic leading-relaxed">
              {item.opponentClaim}
            </blockquote>
          </div>
        )}

        {/* Choices for MCQ + identify-source */}
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
                      reveal(c.id === item.correctChoiceId);
                    }}
                    className={`w-full text-left p-3 rounded border transition ${
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
                    <div className="text-parchment">{c.text}</div>
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
            <div className="text-sm text-parchment/60 mb-2">
              Click in chronological order (earliest first):
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
                        reveal(!!correct);
                      }
                    }}
                    disabled={revealed || orderingPicks.includes(c.id)}
                    className={`w-full text-left p-3 rounded border transition flex items-center gap-3 ${
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
                    <span className="text-parchment">{c.text}</span>
                  </button>
                );
              })}
            </div>
            {revealed && item.correctOrder && (
              <div className="text-xs text-parchment/60 mt-3">
                Correct order:{" "}
                {item.correctOrder
                  .map((id) => orderedChoices.find((c) => c.id === id)?.text)
                  .filter(Boolean)
                  .join(" → ")}
              </div>
            )}
          </div>
        )}

        {/* QA / Debate — free text */}
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
                  className="w-full bg-black/40 border border-parchment/20 rounded p-3 text-parchment min-h-[120px] focus:border-gold/60 focus:outline-none"
                />
                <button
                  onClick={() => reveal(null)}
                  className="btn-gold px-4 py-2 rounded text-sm"
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
                  <RevealBlock
                    label="Orthodox Response"
                    accent="gold"
                  >
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
                        className="border-l-2 border-byzantine pl-4 py-1"
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
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={prev}
          disabled={index === 0}
          className="btn-quiet px-4 py-2 rounded text-sm disabled:opacity-30"
        >
          ← Previous
        </button>
        <div className="flex gap-2">
          {!revealed && (
            <button
              onClick={() => reveal(null)}
              className="btn-quiet px-4 py-2 rounded text-sm"
            >
              Skip / Reveal
            </button>
          )}
          <button
            onClick={next}
            disabled={index === items.length - 1}
            className="btn-gold px-4 py-2 rounded text-sm disabled:opacity-30"
          >
            Next →
          </button>
        </div>
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
      <div className="text-parchment leading-relaxed whitespace-pre-wrap">
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
          <li key={i} className="text-sm">
            <div className="text-gold">{c.source}</div>
            {c.scripture && (
              <div className="text-xs text-parchment/60">{c.scripture}</div>
            )}
            {c.quote && (
              <blockquote className="border-l border-gold/30 pl-3 mt-1 text-parchment/85 italic">
                {c.quote}
              </blockquote>
            )}
            {c.url && (
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gold/70 hover:text-gold"
              >
                source link →
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
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
