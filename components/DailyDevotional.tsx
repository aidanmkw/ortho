"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getDevotional, dateKey } from "@/lib/devotional";

const SEEN_KEY = "devotional:lastSeen";

export default function DailyDevotional() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const today = useMemo(() => new Date(), []);
  const devotional = useMemo(() => getDevotional(today), [today]);

  // Auto-open once per day.
  useEffect(() => {
    try {
      const last = window.localStorage.getItem(SEEN_KEY);
      if (last !== dateKey(today)) setOpen(true);
    } catch {}
  }, [today]);

  // Allow other UI (a hub button) to reopen today's devotional.
  useEffect(() => {
    const reopen = () => {
      setStep(0);
      setOpen(true);
    };
    window.addEventListener("open-devotional", reopen);
    return () => window.removeEventListener("open-devotional", reopen);
  }, []);

  function close() {
    try {
      window.localStorage.setItem(SEEN_KEY, dateKey(today));
    } catch {}
    setOpen(false);
  }

  if (!open) return null;

  const saint = devotional.saints[0];
  const hasSaint = devotional.saints.length > 0;

  // Build the card sequence dynamically (skip the saint card if none today).
  const cards: { kicker: string; body: React.ReactNode }[] = [];

  cards.push({
    kicker: devotional.feastTitle ? "Feast of the Church" : "Daily Devotional",
    body: (
      <div className="text-center">
        <div className="text-gold/90 font-display text-2xl sm:text-3xl mb-2">
          {devotional.dateLabel}
        </div>
        {devotional.feastTitle && (
          <div className="font-display text-lg text-parchment mt-1 mb-2">
            {devotional.feastTitle}
          </div>
        )}
        {devotional.reflection ? (
          <p className="text-parchment/85 text-sm leading-relaxed mt-2">
            {devotional.reflection}
          </p>
        ) : (
          <p className="text-parchment/70 text-sm">
            {hasSaint
              ? "Today the Church commemorates:"
              : "A moment to read and pray before you begin."}
          </p>
        )}
        {hasSaint && (
          <div className="mt-3 space-y-1">
            {devotional.saints.map((s) => (
              <div key={s.slug} className="font-display text-lg text-parchment">
                {s.name}
                {s.title && (
                  <span className="text-parchment/60 text-sm italic">
                    {" "}
                    · {s.title}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    ),
  });

  if (saint) {
    cards.push({
      kicker: "The Saint of the Day",
      body: (
        <div>
          <div className="font-display text-xl text-gold mb-3">{saint.name}</div>
          <p className="text-parchment/90 leading-relaxed text-sm sm:text-base">
            {saint.body[0]}
          </p>
          <Link
            href={`/library/${saint.slug}`}
            onClick={close}
            className="inline-block mt-4 text-sm text-gold/80 hover:text-gold no-underline"
          >
            Read the full life →
          </Link>
        </div>
      ),
    });
  }

  cards.push({
    kicker: "A Reading",
    body: (
      <div>
        <div className="text-gold/90 font-display text-lg mb-3">
          {devotional.scripture.ref}
        </div>
        <p className="text-parchment/90 leading-relaxed text-base sm:text-lg italic">
          {devotional.scripture.text}
        </p>
        <div className="text-[10px] text-parchment/50 mt-3 uppercase tracking-widest">
          {devotional.scripture.translation}
        </div>
      </div>
    ),
  });

  cards.push({
    kicker: "A Word from the Fathers",
    body: (
      <div>
        <p className="text-parchment/90 leading-relaxed text-base sm:text-lg italic">
          &ldquo;{devotional.fatherWord.text}&rdquo;
        </p>
        <div className="text-sm text-gold/80 mt-3">
          — {devotional.fatherWord.source}
        </div>
      </div>
    ),
  });

  cards.push({
    kicker: "Let Us Pray",
    body: (
      <div className="text-center">
        <div className="font-display text-lg text-gold mb-3">
          {devotional.prayer.title}
        </div>
        <p className="text-parchment/90 leading-relaxed text-base sm:text-lg">
          {devotional.prayer.text}
        </p>
      </div>
    ),
  });

  const isLast = step >= cards.length - 1;
  const card = cards[step];

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Daily devotional"
    >
      <div className="parchment-card w-full max-w-lg border-2 border-gold/50 bg-gradient-to-br from-[#14110c] to-[#0c0a08] flex flex-col max-h-[85dvh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-gold/15">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
            {card.kicker}
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="text-parchment/50 hover:text-parchment text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-6 overflow-y-auto flex-1 min-h-[180px] flex items-center">
          <div className="w-full">{card.body}</div>
        </div>

        {/* Footer / progress + nav */}
        <div className="px-5 py-4 border-t border-gold/15 flex items-center justify-between gap-3">
          <div className="flex gap-1.5">
            {cards.map((_, i) => (
              <span
                key={i}
                className={`inline-block w-2 h-2 rounded-full ${
                  i === step ? "bg-gold" : "bg-parchment/25"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="px-3 py-1.5 text-sm border border-parchment/30 text-parchment/80 hover:border-gold/60 hover:text-gold rounded"
              >
                ← Back
              </button>
            )}
            {isLast ? (
              <button
                type="button"
                onClick={close}
                className="px-4 py-1.5 text-sm bg-gold/20 border border-gold text-gold rounded font-display"
              >
                Amen
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="px-4 py-1.5 text-sm bg-gold/20 border border-gold text-gold rounded font-display"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
