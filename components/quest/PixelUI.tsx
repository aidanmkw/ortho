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

export function PixelBackground({ id }: { id: string }) {
  const palettes: Record<string, string[]> = {
    "road-roman": ["#2a1e10", "#4a3220", "#7a5430", "#c89060"],
    catacombs: ["#080406", "#160a0c", "#241318", "#3a2024"],
    "council-hall": ["#0e0a06", "#241808", "#3a2810", "#6a4818"],
    desert: ["#2a1c08", "#5a3818", "#9a6c28", "#dca858"],
    "hagia-sophia": ["#06060a", "#141420", "#2c2c48", "#6a6a98"],
    interrogation: ["#040404", "#0c0c0c", "#1a1a1a", "#2a2a2a"],
    modern: ["#080604", "#161410", "#26221c", "#3a3528"],
    void: ["#000003", "#080410", "#1a0c1e", "#28182c"],
  };
  const c = palettes[id] ?? palettes["void"];
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${c[3]} 0%, ${c[2]} 25%, ${c[1]} 60%, ${c[0]} 100%)`,
        }}
      />
      {/* Scene-specific pixel overlay */}
      <BackgroundOverlay id={id} colors={c} />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)`,
        }}
      />
    </div>
  );
}

function BackgroundOverlay({ id, colors }: { id: string; colors: string[] }) {
  const c = colors;
  switch (id) {
    case "road-roman":
      // Distant cypress silhouettes + dust horizon
      return (
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 64 36"
          style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
        >
          {/* horizon line */}
          <rect x="0" y="20" width="64" height="1" fill={c[2]} />
          {/* distant hills */}
          {[
            [3, 18, 8],
            [12, 17, 10],
            [24, 18, 7],
            [33, 16, 14],
            [48, 18, 10],
          ].map(([x, y, w], i) => (
            <rect key={i} x={x} y={y} width={w} height={20 - y + 1} fill={c[1]} />
          ))}
          {/* cypresses */}
          {[5, 14, 27, 39, 50, 58].map((x, i) => (
            <g key={"cy" + i}>
              <rect x={x} y={14} width={1} height={7} fill="#1a1208" />
              <rect x={x - 1} y={15} width={3} height={5} fill="#2a1e0a" />
            </g>
          ))}
          {/* sun glow */}
          <circle cx="50" cy="14" r="2.5" fill={c[3]} opacity="0.6" />
        </svg>
      );

    case "catacombs":
      // Niche arches + flickering candles
      return (
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 48 36"
          style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
        >
          {/* niche arches across the wall */}
          {[4, 16, 28, 40].map((x, i) => (
            <g key={i}>
              <rect x={x} y={10} width={6} height={16} fill={c[0]} />
              <rect x={x + 1} y={9} width={4} height={1} fill={c[0]} />
              <rect x={x + 2} y={8} width={2} height={1} fill={c[0]} />
              <rect x={x + 1} y={26} width={4} height={1} fill={c[1]} />
            </g>
          ))}
          {/* candle flames inside niches */}
          {[6, 18, 30, 42].map((x, i) => (
            <g key={"f" + i}>
              <rect x={x + 1} y={20} width={1} height={2} fill="#c97818" />
              <rect x={x + 1} y={19} width={1} height={1} fill="#f0c068" opacity="0.9" />
            </g>
          ))}
          {/* faint crosses on walls */}
          {[10, 22, 34].map((x, i) => (
            <g key={"cr" + i} opacity="0.4">
              <rect x={x + 1} y={2} width={1} height={4} fill={c[2]} />
              <rect x={x} y={3} width={3} height={1} fill={c[2]} />
            </g>
          ))}
        </svg>
      );

    case "council-hall":
      // Marble columns with gold capitals + chandelier
      return (
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 64 36"
          style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
        >
          {/* hanging chandelier */}
          <rect x="31" y="0" width="2" height="5" fill="#c9a227" />
          <rect x="28" y="5" width="8" height="1" fill="#c9a227" />
          <rect x="29" y="6" width="6" height="2" fill="#7a5e10" />
          {[28, 31, 34].map((x, i) => (
            <rect key={"fl" + i} x={x} y={8} width={1} height={2} fill="#f0c060" />
          ))}
          {/* columns */}
          {[4, 18, 44, 58].map((x, i) => (
            <g key={i}>
              <rect x={x - 1} y={3} width={4} height={1} fill="#c9a227" />
              <rect x={x} y={4} width={2} height={28} fill={c[1]} />
              <rect x={x} y={4} width={1} height={28} fill={c[2]} opacity="0.5" />
              <rect x={x - 1} y={32} width={4} height={1} fill="#c9a227" />
            </g>
          ))}
          {/* floor tile line */}
          <rect x="0" y="33" width="64" height="3" fill={c[0]} />
        </svg>
      );

    case "desert":
      // Dunes + stars + sun
      return (
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 64 36"
          style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
        >
          {/* sun */}
          <circle cx="48" cy="9" r="4" fill="#f0c060" opacity="0.5" />
          <circle cx="48" cy="9" r="2.5" fill="#f5dca0" />
          {/* dunes */}
          {[
            [0, 22, 14],
            [10, 24, 18],
            [24, 20, 22],
            [40, 23, 16],
            [50, 21, 14],
          ].map(([x, y, w], i) => (
            <ellipse
              key={i}
              cx={x + w / 2}
              cy={36}
              rx={w / 2 + 2}
              ry={36 - y}
              fill={i % 2 ? c[1] : c[2]}
            />
          ))}
          {/* tiny stars near horizon */}
          {[
            [6, 4],
            [14, 6],
            [20, 3],
            [30, 5],
            [56, 4],
            [60, 7],
          ].map(([x, y], i) => (
            <rect key={"s" + i} x={x} y={y} width={1} height={1} fill="#f5e9c9" opacity="0.7" />
          ))}
        </svg>
      );

    case "hagia-sophia":
      // Massive dome arches + mosaic stars
      return (
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 64 36"
          style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
        >
          {/* dome silhouette */}
          <ellipse cx="32" cy="14" rx="22" ry="10" fill={c[2]} opacity="0.5" />
          <ellipse cx="32" cy="14" rx="18" ry="8" fill={c[1]} opacity="0.7" />
          {/* dome ribs */}
          {[12, 20, 32, 44, 52].map((x, i) => (
            <rect key={i} x={x} y={6} width={1} height={9} fill="#c9a227" opacity="0.6" />
          ))}
          {/* gold mosaic dots */}
          {Array.from({ length: 22 }).map((_, i) => (
            <rect
              key={"m" + i}
              x={(i * 7 + 5) % 64}
              y={(i * 3 + 8) % 18}
              width={1}
              height={1}
              fill="#f0c060"
              opacity="0.5"
            />
          ))}
          {/* arch supports */}
          {[6, 24, 40, 58].map((x, i) => (
            <g key={"ar" + i}>
              <rect x={x} y={16} width={2} height={20} fill={c[0]} />
            </g>
          ))}
        </svg>
      );

    case "interrogation":
      // Single ceiling bulb + harsh light cone
      return (
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 48 36"
          style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
        >
          {/* hanging wire + bulb */}
          <rect x="23" y="0" width="1" height="6" fill="#3a3a3a" />
          <rect x="22" y="6" width="3" height="2" fill="#c9c0a0" />
          <rect x="22" y="8" width="3" height="1" fill="#7a7050" />
          {/* light cone */}
          <polygon points="23,8 6,36 42,36" fill="#f5e9c9" opacity="0.04" />
          <polygon points="23,8 12,36 36,36" fill="#f5e9c9" opacity="0.06" />
          {/* peeling plaster cracks */}
          {[
            [4, 12],
            [44, 18],
            [8, 24],
            [40, 28],
          ].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width={1} height={3} fill={c[1]} />
              <rect x={x - 1} y={y + 1} width={3} height={1} fill={c[1]} />
            </g>
          ))}
        </svg>
      );

    case "modern":
      // Window-light + bookshelf hint + lamp
      return (
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 64 36"
          style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
        >
          {/* window panes */}
          <rect x="44" y="4" width="14" height="14" fill="#1c2238" />
          <rect x="44" y="4" width="14" height="14" fill="none" stroke="#2a2a3a" strokeWidth="1" />
          <rect x="51" y="4" width="1" height="14" fill="#0e0e18" />
          <rect x="44" y="10" width="14" height="1" fill="#0e0e18" />
          {/* city lights */}
          {[
            [46, 13],
            [48, 8],
            [54, 11],
            [56, 14],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width={1} height={1} fill="#f0c060" opacity="0.7" />
          ))}
          {/* lamp on right */}
          <rect x="60" y="22" width="3" height="1" fill="#c9a227" />
          <rect x="61" y="23" width="1" height="6" fill="#3a3528" />
          {/* bookshelf left */}
          {[
            [2, "#7c1414"],
            [4, "#5a4220"],
            [6, "#3a3a5c"],
            [8, "#2a1c0c"],
            [10, "#5a4220"],
          ].map(([x, color], i) => (
            <rect key={"b" + i} x={x as number} y={16} width={2} height={12} fill={color as string} />
          ))}
        </svg>
      );

    case "void":
    default:
      // Stars + spiritual void
      return (
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 96 54"
          style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
        >
          {Array.from({ length: 80 }).map((_, i) => {
            const x = (i * 17 + 3) % 96;
            const y = (i * 7 + 5) % 54;
            const size = i % 11 === 0 ? 2 : 1;
            const opacity = 0.3 + (i % 7) / 10;
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={size}
                height={size}
                fill="#f5e9c9"
                opacity={opacity}
              />
            );
          })}
          {/* drifting nebula */}
          <ellipse cx="24" cy="40" rx="12" ry="4" fill="#3a1f4d" opacity="0.3" />
          <ellipse cx="72" cy="14" rx="14" ry="5" fill="#28182c" opacity="0.4" />
        </svg>
      );
  }
}
