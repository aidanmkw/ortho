"use client";

import type { Sprite } from "@/lib/quest/types";

type Props = {
  sprite: Sprite;
  /** CSS pixels per sprite pixel. */
  scale?: number;
  /** Optional className wrapper. */
  className?: string;
  /** Wiggle / breathing animation. */
  idle?: boolean;
  /** Damage flash. */
  flashing?: boolean;
};

export default function PixelSprite({
  sprite,
  scale = 8,
  className = "",
  idle = false,
  flashing = false,
}: Props) {
  const w = sprite.rows[0]?.length ?? 0;
  const h = sprite.rows.length;
  const px = scale;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * px}
      height={h * px}
      className={`${className} ${idle ? "pixel-idle" : ""} ${
        flashing ? "pixel-flash" : ""
      }`}
      style={{
        imageRendering: "pixelated",
        shapeRendering: "crispEdges",
        display: "block",
      }}
      aria-hidden
    >
      {sprite.rows.flatMap((row, y) =>
        row.split("").map((ch, x) => {
          const color = sprite.palette[ch];
          if (!color || color === "transparent") return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={color}
            />
          );
        })
      )}
    </svg>
  );
}
