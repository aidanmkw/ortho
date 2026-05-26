"use client";

import { useEffect, useState } from "react";
import {
  loadCollection,
  RELIQUARY_EVENT,
  type CollectedReward,
} from "@/lib/collection";

export default function Reliquary() {
  const [items, setItems] = useState<CollectedReward[] | null>(null);

  useEffect(() => {
    const refresh = () => setItems(loadCollection());
    refresh();
    window.addEventListener(RELIQUARY_EVENT, refresh);
    return () => window.removeEventListener(RELIQUARY_EVENT, refresh);
  }, []);

  if (items === null) {
    return <div className="parchment-card p-8 animate-pulse h-40" />;
  }

  if (items.length === 0) {
    return (
      <div className="parchment-card p-8 text-center text-parchment/60">
        <p className="mb-2">Your Reliquary is empty.</p>
        <p className="text-sm">
          Complete a Daily Trial to receive a saying of the Fathers — or, more
          rarely, a holy relic.
        </p>
      </div>
    );
  }

  const relics = items.filter((r) => r.kind === "relic");
  const sayings = items.filter((r) => r.kind === "saying");

  return (
    <div className="space-y-8">
      {relics.length > 0 && (
        <section>
          <h2 className="text-base font-display text-gold tracking-widest uppercase mb-3">
            Relics ({relics.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relics.map((r) => (
              <Card key={r.id} r={r} rare />
            ))}
          </div>
        </section>
      )}
      <section>
        <h2 className="text-base font-display text-gold tracking-widest uppercase mb-3">
          Sayings of the Fathers ({sayings.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sayings.map((r) => (
            <Card key={r.id} r={r} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Card({ r, rare }: { r: CollectedReward; rare?: boolean }) {
  return (
    <div
      className={`parchment-card p-4 border-2 ${
        rare ? "border-gold/60" : "border-byzantine/50"
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div className="font-display text-parchment">{r.title}</div>
        {r.count > 1 && (
          <span className="text-[10px] text-gold/70">×{r.count}</span>
        )}
      </div>
      <p className="text-parchment/85 text-sm italic mt-1 leading-relaxed">
        {r.kind === "saying" ? "“" : ""}
        {r.text}
        {r.kind === "saying" ? "”" : ""}
      </p>
      {r.source && (
        <div className="text-xs text-gold/70 mt-1">— {r.source}</div>
      )}
    </div>
  );
}
