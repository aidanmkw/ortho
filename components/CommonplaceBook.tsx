"use client";

import { useEffect, useState } from "react";
import {
  loadSaved,
  removeSaved,
  COMMONPLACE_EVENT,
  type SavedCitation,
} from "@/lib/commonplace";

export default function CommonplaceBook() {
  const [items, setItems] = useState<SavedCitation[] | null>(null);

  useEffect(() => {
    const refresh = () => setItems(loadSaved());
    refresh();
    window.addEventListener(COMMONPLACE_EVENT, refresh);
    return () => window.removeEventListener(COMMONPLACE_EVENT, refresh);
  }, []);

  if (items === null) {
    return <div className="parchment-card p-8 animate-pulse h-40" />;
  }

  if (items.length === 0) {
    return (
      <div className="parchment-card p-8 text-center text-parchment/60">
        <p className="mb-2">Your Commonplace Book is empty.</p>
        <p className="text-sm">
          Tap the ☆ beside any citation while you drill to save it here —
          building your own arsenal of Scripture, Councils, and Fathers.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((s) => (
        <div key={s.key} className="parchment-card p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="text-gold text-sm">{s.source}</div>
            <button
              type="button"
              onClick={() => removeSaved(s.key)}
              aria-label="Remove"
              title="Remove from Commonplace Book"
              className="shrink-0 text-parchment/40 hover:text-crimson text-sm"
            >
              ✕
            </button>
          </div>
          {s.scripture && s.scripture !== s.source && (
            <div className="text-xs text-parchment/60 mt-0.5">{s.scripture}</div>
          )}
          {s.text && (
            <blockquote className="border-l-2 border-gold/40 pl-3 mt-2 text-parchment/90 italic leading-relaxed text-sm">
              {s.text}
            </blockquote>
          )}
        </div>
      ))}
    </div>
  );
}
