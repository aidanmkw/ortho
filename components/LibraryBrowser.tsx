"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  saints,
  saintsAlphabetical,
  saintsByFeast,
  type SaintCategory,
} from "@/lib/saints";

type SortMode = "alpha" | "feast";

const ALL_CATS: SaintCategory[] = [
  "apostle",
  "martyr",
  "hierarch",
  "father",
  "monastic",
  "wonderworker",
  "modern",
  "woman",
  "foolforchrist",
];

export default function LibraryBrowser() {
  const [sort, setSort] = useState<SortMode>("alpha");
  const [filter, setFilter] = useState<SaintCategory | "all">("all");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const base = sort === "alpha" ? saintsAlphabetical() : saintsByFeast();
    return base
      .filter((s) => filter === "all" || s.categories.includes(filter))
      .filter((s) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          (s.title ?? "").toLowerCase().includes(q)
        );
      });
  }, [sort, filter, query]);

  function openRandom() {
    const pool = list.length ? list : saints;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/library/${pick.slug}/`;
  }

  return (
    <div>
      {/* Controls */}
      <div className="parchment-card p-4 mb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={openRandom}
            className="px-4 py-2 bg-gold/15 hover:bg-gold/25 border-2 border-gold text-gold font-display rounded-md transition"
          >
            🎲 Random Saint
          </button>
          <div className="flex-1" />
          <div className="flex gap-1 text-xs">
            <button
              type="button"
              onClick={() => setSort("alpha")}
              className={`px-3 py-1.5 rounded border ${sort === "alpha" ? "bg-gold/20 border-gold text-gold" : "border-parchment/30 text-parchment/70 hover:border-gold/60"}`}
            >
              A → Z
            </button>
            <button
              type="button"
              onClick={() => setSort("feast")}
              className={`px-3 py-1.5 rounded border ${sort === "feast" ? "bg-gold/20 border-gold text-gold" : "border-parchment/30 text-parchment/70 hover:border-gold/60"}`}
            >
              By Feast Day
            </button>
          </div>
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name…"
          className="w-full bg-[#0c0a08] border border-parchment/20 text-parchment placeholder:text-parchment/40 px-3 py-2 rounded focus:outline-none focus:border-gold"
        />

        <div className="flex flex-wrap gap-1.5">
          <FilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label={`All (${saints.length})`}
          />
          {ALL_CATS.map((c) => {
            const count = saints.filter((s) => s.categories.includes(c)).length;
            if (!count) return null;
            return (
              <FilterChip
                key={c}
                active={filter === c}
                onClick={() => setFilter(c)}
                label={`${CATEGORY_LABELS[c]} (${count})`}
              />
            );
          })}
        </div>
      </div>

      {/* List */}
      {list.length === 0 ? (
        <div className="parchment-card p-8 text-center text-parchment/60">
          No saints match.
        </div>
      ) : (
        <div className="divide-y divide-parchment/10 parchment-card">
          {list.map((s) => (
            <Link
              key={s.slug}
              href={`/library/${s.slug}`}
              className="block px-4 py-3 hover:bg-gold/5 no-underline group"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-display text-base sm:text-lg text-parchment group-hover:text-gold leading-tight truncate">
                    {s.name}
                  </div>
                  {s.title && (
                    <div className="text-xs text-parchment/60 italic truncate">
                      {s.title}
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-gold/80 whitespace-nowrap">
                    {s.feastDay}
                  </div>
                  <div className="text-[10px] text-parchment/50 whitespace-nowrap">
                    {s.century} c.
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[11px] px-2.5 py-1 rounded-full border transition ${
        active
          ? "bg-gold/20 border-gold text-gold"
          : "border-parchment/25 text-parchment/65 hover:border-gold/50 hover:text-parchment"
      }`}
    >
      {label}
    </button>
  );
}
