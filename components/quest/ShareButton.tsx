"use client";

import { useState } from "react";
import { sfx } from "@/lib/quest/sfx";

export default function ShareButton({
  className = "",
}: {
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function share() {
    sfx.click();
    const url =
      typeof window !== "undefined"
        ? window.location.href.split("#")[0]
        : "";
    const shareData = {
      title: "Orthodox Quest",
      text: "Try this pixel-art game on Orthodox Christianity — a modern Inquirer time-travels through Church history, fighting bosses of every heresy with patristic citations. Took me far longer than I'd like to admit.",
      url,
    };
    try {
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function"
      ) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      // user cancelled — fall through to clipboard
    }
    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // ignore
    }
  }

  return (
    <button
      onClick={share}
      className={`pixel-btn border-2 border-gold/50 text-gold bg-black/70 px-3 py-2 font-pixel text-[9px] uppercase tracking-widest ${className}`}
      style={{ boxShadow: "0 3px 0 0 rgba(0,0,0,0.6)" }}
    >
      {copied ? "✓ Link Copied" : "↗ Share with a Friend"}
    </button>
  );
}
