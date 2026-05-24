"use client";

import { useEffect, useState } from "react";
import { PixelFrame, PixelButton, Typewriter } from "./PixelUI";
import PixelSprite from "./PixelSprite";
import { spriteAnthony } from "@/lib/quest/sprites";

export default function TitleScreen({
  hasSave,
  onNew,
  onContinue,
}: {
  hasSave: boolean;
  onNew: () => void;
  onContinue: () => void;
}) {
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowSubtitle(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, #28182c 0%, #14081a 40%, #0a0610 80%, #000004 100%)",
        }}
      />
      <div className="absolute inset-0 z-0 opacity-30">
        {/* Stars */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-parchment"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 113) % 100}%`,
              opacity: 0.3 + ((i * 7) % 7) / 10,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        <div className="text-gold text-5xl sm:text-6xl mb-2 select-none">☦</div>
        <h1 className="font-pixel text-gold text-[18px] sm:text-[28px] text-center tracking-widest leading-tight mb-2">
          ORTHODOX
          <br />
          QUEST
        </h1>
        <div
          className="font-pixel text-parchment/70 text-[8px] sm:text-[10px] text-center tracking-[0.4em] mb-6 h-3"
        >
          {showSubtitle && (
            <Typewriter
              text="WITNESS · OF · THE · WITNESSES"
              speed={50}
              silent
            />
          )}
        </div>

        <div className="mb-6 pixel-shadow-lg">
          <PixelSprite sprite={spriteAnthony} scale={10} idle />
        </div>

        <PixelFrame className="p-4 w-full mb-4">
          <p className="font-pixel text-parchment text-[10px] sm:text-[11px] leading-relaxed italic text-center">
            "Be ready always to give an answer to every man that asketh you a
            reason of the hope that is in you."
          </p>
          <p className="font-pixel text-gold/80 text-[9px] text-center mt-2">
            — 1 Peter 3:15
          </p>
        </PixelFrame>

        <div className="flex flex-col gap-3 w-full">
          {hasSave && (
            <PixelButton variant="primary" onClick={onContinue}>
              Continue ▶
            </PixelButton>
          )}
          <PixelButton
            variant={hasSave ? "secondary" : "primary"}
            onClick={onNew}
          >
            {hasSave ? "New Game" : "Begin the Quest ▶"}
          </PixelButton>
          <a
            href={(process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/"}
            className="font-pixel text-parchment/50 hover:text-gold text-[9px] uppercase tracking-widest text-center mt-2 no-underline"
          >
            ← Back to Study Mode
          </a>
        </div>
      </div>
    </div>
  );
}
