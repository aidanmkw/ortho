"use client";

import { useEffect, useRef, useState } from "react";
import { sfx } from "@/lib/quest/sfx";

export function PixelFrame({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "danger" | "good" | "void";
}) {
  const palettes: Record<string, string> = {
    default: "border-gold/80 bg-[#0c0a08]",
    danger: "border-crimson/80 bg-[#1a0808]",
    good: "border-gold bg-[#100c06]",
    void: "border-byzantine/80 bg-[#0a0612]",
  };
  return (
    <div
      className={`pixel-frame ${palettes[variant]} border-[3px] ${className}`}
    >
      {children}
    </div>
  );
}

export function PixelButton({
  children,
  onClick,
  disabled,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  className?: string;
}) {
  const styles: Record<string, string> = {
    primary:
      "bg-gold text-ink border-[#5a4810] active:translate-y-[2px] active:shadow-none",
    secondary:
      "bg-[#1a1814] text-gold border-gold/60 active:translate-y-[2px] active:shadow-none",
    danger:
      "bg-crimson text-parchment border-[#3a0808] active:translate-y-[2px] active:shadow-none",
    ghost:
      "bg-transparent text-parchment/70 border-parchment/30 active:translate-y-[2px] active:shadow-none",
  };
  return (
    <button
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          sfx.click();
          onClick?.();
        }
      }}
      className={`pixel-btn ${styles[variant]} ${className} ${
        disabled ? "opacity-40 cursor-not-allowed" : ""
      } border-[3px] px-3 py-3 font-pixel text-[10px] sm:text-[12px] uppercase tracking-wide leading-tight transition select-none`}
      style={{
        boxShadow: disabled ? "none" : "0 3px 0 0 rgba(0,0,0,0.6)",
        imageRendering: "pixelated",
      }}
    >
      {children}
    </button>
  );
}

export function HpBar({
  current,
  max,
  label,
  color = "#7c1414",
  height = 10,
  showNumbers = true,
}: {
  current: number;
  max: number;
  label?: string;
  color?: string;
  height?: number;
  showNumbers?: boolean;
}) {
  const pct = Math.max(0, Math.min(1, current / max));
  return (
    <div className="font-pixel text-[8px] sm:text-[10px]">
      {label && (
        <div className="flex justify-between text-parchment mb-1">
          <span>{label}</span>
          {showNumbers && (
            <span>
              {Math.ceil(current)}/{max}
            </span>
          )}
        </div>
      )}
      <div
        className="border-2 border-parchment/50 bg-black/80 overflow-hidden"
        style={{ height }}
      >
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${pct * 100}%`,
            background: `linear-gradient(180deg, ${color}, ${shade(color, -30)})`,
            imageRendering: "pixelated",
          }}
        />
      </div>
    </div>
  );
}

function shade(hex: string, percent: number): string {
  const m = hex.replace("#", "").match(/.{1,2}/g);
  if (!m) return hex;
  const [r, g, b] = m.map((v) => parseInt(v, 16));
  const adj = (v: number) => Math.min(255, Math.max(0, v + percent));
  return `rgb(${adj(r)}, ${adj(g)}, ${adj(b)})`;
}

export function Typewriter({
  text,
  speed = 18,
  onDone,
  className = "",
  silent = false,
}: {
  text: string;
  speed?: number;
  onDone?: () => void;
  className?: string;
  silent?: boolean;
}) {
  const [shown, setShown] = useState("");
  const indexRef = useRef(0);
  const blipCounterRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setShown("");
    let timer: ReturnType<typeof setTimeout> | null = null;
    const tick = () => {
      const i = indexRef.current;
      if (i >= text.length) {
        onDone?.();
        return;
      }
      setShown(text.slice(0, i + 1));
      indexRef.current = i + 1;
      if (!silent) {
        blipCounterRef.current = (blipCounterRef.current + 1) % 4;
        if (blipCounterRef.current === 0 && text[i] !== " ") {
          sfx.textBlip();
        }
      }
      timer = setTimeout(tick, speed);
    };
    timer = setTimeout(tick, speed);
    return () => {
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return <span className={className}>{shown}</span>;
}

export function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-30"
      style={{
        background:
          "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 3px)",
      }}
      aria-hidden
    />
  );
}

const BG_SLUGS = new Set([
  "road-roman",
  "catacombs",
  "council-hall",
  "desert",
  "hagia-sophia",
  "interrogation",
  "modern",
  "void",
]);

export function PixelBackground({ id }: { id: string }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const slug = BG_SLUGS.has(id) ? id : "void";
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${base}/backgrounds/${slug}.webp`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover select-none"
        draggable={false}
      />
      {/* Soft vignette to keep portraits readable over the painting */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}

