"use client";

import { saints } from "@/lib/saints";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function RandomNextSaint({ currentSlug }: { currentSlug: string }) {
  function pick() {
    const others = saints.filter((s) => s.slug !== currentSlug);
    const next = others[Math.floor(Math.random() * others.length)];
    window.location.href = `${BASE}/library/${next.slug}/`;
  }

  return (
    <button
      type="button"
      onClick={pick}
      className="px-4 py-2 bg-gold/15 hover:bg-gold/25 border-2 border-gold text-gold font-display rounded-md transition text-sm"
    >
      🎲 Another saint
    </button>
  );
}
