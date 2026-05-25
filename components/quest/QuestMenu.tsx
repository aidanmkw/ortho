"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PixelFrame, PixelButton } from "./PixelUI";
import { sfx } from "@/lib/quest/sfx";

type Props = {
  open: boolean;
  onClose: () => void;
  // Navigation actions
  onReturnToTitle: () => void;
  onOpenSparringHall: () => void;
  onResetQuest: () => void;
  // State
  muted: boolean;
  onToggleMute: () => void;
  hasSave: boolean;
  inSparring: boolean;
};

export default function QuestMenu({
  open,
  onClose,
  onReturnToTitle,
  onOpenSparringHall,
  onResetQuest,
  muted,
  onToggleMute,
  hasSave,
  inSparring,
}: Props) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function go(action: () => void) {
    sfx.click();
    action();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start sm:items-center justify-center px-3 py-6 sm:py-10 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <PixelFrame variant="void" className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-pixel text-gold text-[12px] tracking-[0.25em] uppercase">
              ☰ Menu
            </div>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="font-pixel text-[12px] text-parchment/80 hover:text-gold px-2 py-1 border-2 border-parchment/30 hover:border-gold/70"
            >
              ✕
            </button>
          </div>

          <div className="font-pixel text-parchment/60 text-[9px] uppercase tracking-widest mb-2">
            Quest Navigation
          </div>
          <div className="space-y-2 mb-4">
            <MenuButton onClick={onClose} icon="▶" label="Continue Playing" />
            {hasSave && (
              <MenuButton
                onClick={() => go(onReturnToTitle)}
                icon="📜"
                label="Return to Title Screen"
              />
            )}
            {hasSave && !inSparring && (
              <MenuButton
                onClick={() => go(onOpenSparringHall)}
                icon="⚔"
                label="Sparring Hall · Drill Past Battles"
              />
            )}
          </div>

          <div className="font-pixel text-parchment/60 text-[9px] uppercase tracking-widest mb-2">
            Leave Quest
          </div>
          <div className="space-y-2 mb-4">
            <MenuLink href="/" icon="📖" label="Study Mode · Drills & Daily" />
            <MenuLink href="/daily" icon="✦" label="Daily Trial" />
            <MenuLink href="/review" icon="↻" label="Review Mistakes" />
            <MenuLink href="/settings" icon="⚙" label="Settings" />
          </div>

          <div className="font-pixel text-parchment/60 text-[9px] uppercase tracking-widest mb-2">
            Options
          </div>
          <div className="space-y-2 mb-2">
            <MenuButton
              onClick={() => {
                sfx.click();
                onToggleMute();
              }}
              icon={muted ? "🔇" : "🔊"}
              label={muted ? "Sound · Off (tap to enable)" : "Sound · On (tap to mute)"}
            />
            {hasSave && (
              <MenuButton
                onClick={() => {
                  if (
                    confirm(
                      "Reset your Quest progress? Your Study Mode XP will not be affected."
                    )
                  ) {
                    go(onResetQuest);
                  }
                }}
                icon="⟲"
                label="Reset Quest Progress"
                danger
              />
            )}
          </div>

          <div className="font-pixel text-[9px] text-parchment/40 italic text-center mt-4 leading-relaxed">
            Δόξα τῷ Θεῷ πάντων ἕνεκεν
          </div>
        </PixelFrame>
      </div>
    </div>
  );
}

function MenuButton({
  onClick,
  icon,
  label,
  danger,
}: {
  onClick: () => void;
  icon: string;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`pixel-btn block w-full text-left p-3 border-2 transition active:translate-y-[1px] font-pixel text-[10px] sm:text-[11px] leading-tight ${
        danger
          ? "border-crimson/50 text-crimson hover:border-crimson hover:bg-crimson/10"
          : "border-parchment/30 text-parchment hover:border-gold/70 hover:bg-gold/5"
      }`}
    >
      <span className="mr-2 inline-block w-5 text-center">{icon}</span>
      {label}
    </button>
  );
}

function MenuLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  // Prepend basePath at runtime via Next.js Link
  return (
    <Link
      href={href}
      onClick={() => sfx.click()}
      className="pixel-btn block w-full text-left p-3 border-2 border-parchment/30 hover:border-gold/70 hover:bg-gold/5 transition active:translate-y-[1px] font-pixel text-[10px] sm:text-[11px] leading-tight text-parchment no-underline"
    >
      <span className="mr-2 inline-block w-5 text-center">{icon}</span>
      {label}
    </Link>
  );
}
