"use client";

import { useEffect, useState } from "react";
import type { DialogLine } from "@/lib/quest/types";
import { PORTRAITS, playerPortraitConfig } from "@/lib/quest/portraits";
import type { PortraitConfig } from "@/lib/quest/portraits";
import Portrait from "./Portrait";
import { PixelFrame, PixelButton, Typewriter, PixelBackground } from "./PixelUI";

function getPortraitConfig(
  speakerId: string,
  hairColor: string
): PortraitConfig | null {
  if (speakerId === "you") return playerPortraitConfig(hairColor);
  if (speakerId === "narrator") return null;
  return PORTRAITS[speakerId] ?? null;
}

function displayName(speakerId: string, playerName: string): string {
  if (speakerId === "you") return playerName;
  if (speakerId === "narrator") return "";
  const map: Record<string, string> = {
    "st-anthony": "St. Anthony",
    "st-ignatius": "St. Ignatius",
    "st-athanasius": "St. Athanasius",
    "st-macarius": "St. Macarius",
    "st-cyril": "St. Cyril",
    "st-john-damascus": "St. John of Damascus",
    "st-mark-ephesus": "St. Mark of Ephesus",
    centurion: "Centurion Lucius",
    marcus: "Marcus Verus",
    arius: "Arius",
    tempter: "The Tempter",
    eutyches: "Eutyches",
    iconoclast: "Constantine V",
    humbert: "Cardinal Humbert",
    "pope-eugene": "Pope Eugene IV",
    nkvd: "Captain Pavlov",
    lds: "Elder Williams",
    reformed: "Sarah",
    atheist: "Alex",
    doubt: "The Doubt",
  };
  return map[speakerId] ?? speakerId;
}

export default function DialogScene({
  lines,
  background,
  playerName,
  hairColor,
  onComplete,
}: {
  lines: DialogLine[];
  background: string;
  playerName: string;
  hairColor: string;
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [textDone, setTextDone] = useState(false);
  const line = lines[index];
  const portraitConfig = line
    ? getPortraitConfig(line.speaker, hairColor)
    : null;
  const name = line ? displayName(line.speaker, playerName) : "";
  const isPlayer = line?.speaker === "you";
  const isNarrator = line?.speaker === "narrator";

  const text = (line?.text ?? "").replaceAll("$you", playerName);

  // Glow depending on speaker type — saints get a golden halo, villains a red menace.
  const speakerId = line?.speaker ?? "";
  const isSaint =
    speakerId.startsWith("st-") || speakerId === "st-anthony";
  const villainIds = new Set([
    "centurion",
    "marcus",
    "arius",
    "tempter",
    "eutyches",
    "iconoclast",
    "humbert",
    "pope-eugene",
    "nkvd",
    "lds",
    "reformed",
    "atheist",
    "doubt",
  ]);
  const isVillain = villainIds.has(speakerId);
  const glowClass = isSaint
    ? "pixel-halo-glow"
    : isVillain
    ? "pixel-menace-glow"
    : "";

  useEffect(() => {
    setTextDone(false);
  }, [index]);

  function advance() {
    if (!textDone) {
      setTextDone(true);
      return;
    }
    if (index < lines.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete();
    }
  }

  if (!line) return null;

  return (
    <div
      className="relative min-h-[100dvh] w-full flex flex-col"
      onClick={advance}
      role="button"
    >
      <PixelBackground id={background} />

      {/* Speaker portrait area */}
      <div className="relative z-10 flex-1 flex items-end justify-center pb-2 pt-12 px-4">
        {!isNarrator && portraitConfig && (
          <div
            className={`flex flex-col items-center transition-transform ${
              isPlayer ? "translate-x-[-15%]" : "translate-x-[15%]"
            }`}
          >
            <div className={`pixel-shadow-lg pixel-platform ${glowClass}`}>
              <Portrait
                config={portraitConfig}
                size={520}
                fullBody
                idle
                hairColorHex={isPlayer ? hairColor : undefined}
              />
            </div>
          </div>
        )}
      </div>

      {/* Dialog box */}
      <div className="relative z-20 p-3 sm:p-5">
        <PixelFrame
          variant={
            isNarrator ? "void" : line.speaker.startsWith("st-") ? "good" : "default"
          }
          className="p-4 sm:p-5"
        >
          {!isNarrator && (
            <div className="font-pixel text-gold text-[10px] sm:text-[12px] uppercase tracking-widest mb-2">
              {name}
            </div>
          )}
          {isNarrator && (
            <div className="font-pixel text-byzantine/80 text-[8px] sm:text-[10px] uppercase tracking-widest mb-2">
              ◆
            </div>
          )}
          <p
            className={`font-pixel ${
              isNarrator
                ? "text-parchment/80 italic"
                : "text-parchment"
            } text-[11px] sm:text-[13px] leading-[1.7] min-h-[3.5em]`}
          >
            <Typewriter
              text={text}
              speed={textDone ? 0 : 22}
              onDone={() => setTextDone(true)}
              silent={isNarrator}
            />
          </p>
          <div
            className="mt-3 flex justify-end items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-pixel text-[9px] text-gold/60">
              {index + 1} / {lines.length}
            </span>
            <PixelButton
              variant={textDone ? "primary" : "secondary"}
              onClick={advance}
            >
              {textDone ? (index === lines.length - 1 ? "Begin ▶" : "Next ▶") : "Skip »"}
            </PixelButton>
          </div>
        </PixelFrame>
      </div>
    </div>
  );
}
