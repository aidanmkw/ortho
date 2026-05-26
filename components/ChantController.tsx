"use client";

import { useEffect, useState } from "react";
import { startChant, stopChant, isChantRunning } from "@/lib/chant";

const KEY = "chant:enabled";

export default function ChantController() {
  const [playing, setPlaying] = useState(false);

  // On mount: read preference (default ON) and arm a one-time gesture to start.
  useEffect(() => {
    let enabled = true;
    try {
      enabled = window.localStorage.getItem(KEY) !== "0";
    } catch {}

    if (!enabled) return;

    const begin = () => {
      startChant();
      setPlaying(isChantRunning());
      window.removeEventListener("pointerdown", begin);
      window.removeEventListener("keydown", begin);
    };
    // Browsers block autoplay-with-sound; the first user gesture unlocks it.
    window.addEventListener("pointerdown", begin, { once: true });
    window.addEventListener("keydown", begin, { once: true });
    return () => {
      window.removeEventListener("pointerdown", begin);
      window.removeEventListener("keydown", begin);
    };
  }, []);

  function toggle() {
    if (isChantRunning()) {
      stopChant();
      setPlaying(false);
      try {
        window.localStorage.setItem(KEY, "0");
      } catch {}
    } else {
      startChant();
      setPlaying(isChantRunning());
      try {
        window.localStorage.setItem(KEY, "1");
      } catch {}
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause chant" : "Play chant"}
      title={playing ? "Chant: on" : "Chant: off"}
      className="text-parchment/80 hover:text-gold px-2 py-1 rounded hover:bg-gold/5 transition"
    >
      {playing ? (
        // Sound on — note with arcs
        <span aria-hidden>♪</span>
      ) : (
        // Sound off — muted note
        <span aria-hidden className="opacity-50">
          ♪̸
        </span>
      )}
    </button>
  );
}
