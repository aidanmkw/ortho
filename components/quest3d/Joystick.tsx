"use client";

import * as React from "react";

type Props = {
  /** Reports a vector with each axis in [-1, 1]; y+ = forward. */
  onMove: (x: number, y: number) => void;
};

/** Virtual thumbstick for touch devices. Fixed to the lower-left corner. */
export default function Joystick({ onMove }: Props) {
  const baseRef = React.useRef<HTMLDivElement>(null);
  const knobRef = React.useRef<HTMLDivElement>(null);
  const activeId = React.useRef<number | null>(null);

  const setKnob = (dx: number, dy: number) => {
    if (knobRef.current) {
      knobRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    }
  };

  const handle = (e: React.PointerEvent) => {
    const base = baseRef.current;
    if (!base) return;
    const rect = base.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const max = rect.width / 2 - 14;
    let dx = e.clientX - cx;
    let dy = e.clientY - cy;
    const len = Math.hypot(dx, dy);
    if (len > max) {
      dx = (dx / len) * max;
      dy = (dy / len) * max;
    }
    setKnob(dx, dy);
    onMove(dx / max, -dy / max);
  };

  return (
    <div
      ref={baseRef}
      className="fixed bottom-6 left-5 z-40 w-28 h-28 rounded-full border-2 border-gold/50 bg-black/30 backdrop-blur-[2px] touch-none select-none"
      onPointerDown={(e) => {
        activeId.current = e.pointerId;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        handle(e);
        e.stopPropagation();
      }}
      onPointerMove={(e) => {
        if (activeId.current !== e.pointerId) return;
        handle(e);
        e.stopPropagation();
      }}
      onPointerUp={(e) => {
        if (activeId.current !== e.pointerId) return;
        activeId.current = null;
        setKnob(0, 0);
        onMove(0, 0);
        e.stopPropagation();
      }}
      onPointerCancel={(e) => {
        activeId.current = null;
        setKnob(0, 0);
        onMove(0, 0);
        e.stopPropagation();
      }}
    >
      <div
        ref={knobRef}
        className="absolute left-1/2 top-1/2 -ml-6 -mt-6 w-12 h-12 rounded-full bg-gold/70 border-2 border-[#f0d358] shadow-lg pointer-events-none"
      />
    </div>
  );
}
