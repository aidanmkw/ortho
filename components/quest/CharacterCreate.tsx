"use client";

import { useState } from "react";
import { PixelFrame, PixelButton } from "./PixelUI";
import PixelSprite from "./PixelSprite";
import Portrait from "./Portrait";
import { playerSprite } from "@/lib/quest/sprites";
import { PATRONS } from "@/lib/quest/patrons";
import { PORTRAITS, playerPortraitConfig } from "@/lib/quest/portraits";

const HAIR_COLORS = [
  { id: "#7a4f1d", name: "Brown" },
  { id: "#1a1a1a", name: "Black" },
  { id: "#dca873", name: "Blond" },
  { id: "#a63216", name: "Auburn" },
  { id: "#3e2c1c", name: "Dark" },
  { id: "#cfcfcf", name: "Silver" },
];

export default function CharacterCreate({
  onCreate,
  onBack,
}: {
  onCreate: (name: string, patronId: string, hairColor: string) => void;
  onBack: () => void;
}) {
  const [name, setName] = useState("");
  const [hair, setHair] = useState(HAIR_COLORS[0].id);
  const [patronIdx, setPatronIdx] = useState(0);
  const [step, setStep] = useState<"name" | "hair" | "patron" | "review">(
    "name"
  );

  const patron = PATRONS[patronIdx];

  function next() {
    if (step === "name" && name.trim()) setStep("hair");
    else if (step === "hair") setStep("patron");
    else if (step === "patron") setStep("review");
    else if (step === "review") onCreate(name.trim(), patron.id, hair);
  }

  function back() {
    if (step === "name") onBack();
    else if (step === "hair") setStep("name");
    else if (step === "patron") setStep("hair");
    else if (step === "review") setStep("patron");
  }

  return (
    <div
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-6"
      style={{
        background:
          "radial-gradient(ellipse at center, #2a1f12 0%, #14100a 70%, #060402 100%)",
      }}
    >
      <div className="max-w-md w-full">
        <h2 className="font-pixel text-gold text-[14px] sm:text-[18px] text-center tracking-widest mb-2">
          THE INQUIRER
        </h2>
        <p className="font-pixel text-parchment/60 text-[9px] text-center tracking-widest mb-6">
          {step.toUpperCase()} · {step === "name" ? "1" : step === "hair" ? "2" : step === "patron" ? "3" : "4"} / 4
        </p>

        <div className="flex justify-center mb-5">
          <div className="pixel-shadow-lg pixel-platform">
            <Portrait
              config={playerPortraitConfig(hair)}
              size={220}
              idle
              hairColorHex={hair}
            />
          </div>
        </div>

        {step === "name" && (
          <PixelFrame className="p-4 mb-4">
            <label className="font-pixel text-gold text-[10px] uppercase tracking-widest block mb-2">
              What is your name?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={16}
              autoFocus
              placeholder="Your name"
              className="w-full font-pixel text-parchment text-[14px] bg-black/70 border-2 border-gold/40 px-3 py-2 focus:border-gold/80 focus:outline-none"
              style={{ imageRendering: "pixelated" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && name.trim()) next();
              }}
            />
            <p className="font-pixel text-parchment/50 text-[9px] mt-3 leading-relaxed">
              Saint Anthony will call you by this name. Choose well.
            </p>
          </PixelFrame>
        )}

        {step === "hair" && (
          <PixelFrame className="p-4 mb-4">
            <label className="font-pixel text-gold text-[10px] uppercase tracking-widest block mb-3">
              Choose your appearance
            </label>
            <div className="grid grid-cols-3 gap-2">
              {HAIR_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setHair(c.id)}
                  className={`pixel-btn p-2 border-2 ${
                    hair === c.id
                      ? "border-gold bg-gold/20"
                      : "border-parchment/30 bg-black/40"
                  } font-pixel text-[9px] text-parchment flex flex-col items-center gap-1`}
                >
                  <div
                    className="w-6 h-3"
                    style={{ background: c.id, imageRendering: "pixelated" }}
                  />
                  {c.name}
                </button>
              ))}
            </div>
          </PixelFrame>
        )}

        {step === "patron" && (
          <PixelFrame className="p-4 mb-4">
            <label className="font-pixel text-gold text-[10px] uppercase tracking-widest block mb-3">
              Choose your Patron Saint
            </label>
            <div className="flex items-center justify-center gap-4 mb-4">
              <PixelButton
                variant="ghost"
                onClick={() =>
                  setPatronIdx((i) => (i - 1 + PATRONS.length) % PATRONS.length)
                }
              >
                ◀
              </PixelButton>
              <div className="flex flex-col items-center">
                <div className="pixel-shadow-lg pixel-platform pixel-halo-glow mb-3">
                  {PORTRAITS[patron.id] ? (
                    <Portrait
                      config={PORTRAITS[patron.id]}
                      size={180}
                      idle
                    />
                  ) : (
                    <PixelSprite sprite={patron.sprite} scale={7} idle />
                  )}
                </div>
                <div className="font-pixel text-gold text-[11px] text-center">
                  {patron.name}
                </div>
                <div className="font-pixel text-parchment/70 text-[9px] text-center italic">
                  {patron.title}
                </div>
              </div>
              <PixelButton
                variant="ghost"
                onClick={() => setPatronIdx((i) => (i + 1) % PATRONS.length)}
              >
                ▶
              </PixelButton>
            </div>
            <div className="border-t border-gold/30 pt-3">
              <p className="font-pixel text-parchment text-[10px] leading-relaxed mb-2">
                <span className="text-gold">Passive:</span> {patron.passive.description}
              </p>
              <p className="font-pixel text-parchment/70 text-[9px] italic leading-relaxed">
                "{patron.motto}"
              </p>
            </div>
          </PixelFrame>
        )}

        {step === "review" && (
          <PixelFrame variant="good" className="p-4 mb-4">
            <div className="font-pixel text-gold text-[10px] uppercase tracking-widest mb-3 text-center">
              Begin the Quest
            </div>
            <div className="font-pixel text-parchment text-[11px] space-y-1 mb-3">
              <p>
                <span className="text-gold/70">Name:</span> {name}
              </p>
              <p>
                <span className="text-gold/70">Patron:</span> {patron.name} {patron.title}
              </p>
              <p>
                <span className="text-gold/70">Rank:</span> Inquirer
              </p>
            </div>
            <p className="font-pixel text-parchment/70 text-[9px] italic leading-relaxed">
              "Δόξα τῷ Θεῷ πάντων ἕνεκεν."
            </p>
          </PixelFrame>
        )}

        <div className="flex gap-2">
          <PixelButton variant="secondary" onClick={back} className="flex-1">
            ← Back
          </PixelButton>
          <PixelButton
            variant="primary"
            onClick={next}
            disabled={step === "name" && !name.trim()}
            className="flex-1"
          >
            {step === "review" ? "Begin ▶" : "Next →"}
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
