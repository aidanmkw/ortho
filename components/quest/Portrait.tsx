"use client";

import * as React from "react";
import type {
  PortraitConfig,
  Skin,
  HairColor,
  Beard,
  HairStyle,
  Headwear,
  Vestment,
  Symbol,
  EyeStyle,
} from "@/lib/quest/portraits";

type Props = {
  config: PortraitConfig;
  // CSS width in pixels for the portrait. Aspect 3:4.
  size?: number;
  className?: string;
  idle?: boolean;
  flashing?: boolean;
  // For the player only: override hair color directly with hex.
  hairColorHex?: string;
  // Render a frameless full-body icon-style sprite (from /public/sprites)
  // standing in the scene, instead of the framed 3:4 bust. `size` is treated
  // as the figure HEIGHT in this mode.
  fullBody?: boolean;
};

// Shared palettes
const SKIN: Record<Skin, [string, string, string, string]> = {
  // [highlight, mid, shadow, deep shadow]
  pale: ["#fde2bf", "#f0c79b", "#c5916a", "#8b5c3f"],
  light: ["#f3cba1", "#dba87a", "#a87850", "#714c30"],
  tan: ["#e0a878", "#b67e54", "#864f33", "#5a341e"],
  dark: ["#a87144", "#754a2c", "#4a2c18", "#28160c"],
  shadow: ["#332840", "#22182e", "#120820", "#080414"],
};

const HAIR: Record<HairColor, [string, string, string]> = {
  black: ["#3a2820", "#1a0e08", "#0a0604"],
  brown: ["#9a6a3e", "#6a4422", "#3e2614"],
  gold: ["#f0d070", "#c89020", "#8a5c10"],
  white: ["#fffaf0", "#e8dfc0", "#a89c70"],
  gray: ["#dedede", "#a8a8a8", "#686868"],
  ginger: ["#e8a070", "#b8602a", "#7a3814"],
  none: ["#000000", "#000000", "#000000"],
};

// Vestment palettes [body-light, body-mid, body-shadow, trim, trimDark]
const VESTMENT: Record<Vestment, [string, string, string, string, string]> = {
  "monk-brown":      ["#7a5028", "#5a3818", "#3a2410", "#c9a228", "#7a5e10"],
  "monk-black":      ["#1a1410", "#0a0606", "#000000", "#c9a228", "#7a5e10"],
  "bishop-white":    ["#fffaee", "#e0d4b0", "#9a8e60", "#c9a228", "#7c1414"],
  "bishop-purple":   ["#5c3478", "#3a1f4d", "#220c30", "#c9a228", "#7c1414"],
  "bishop-crimson":  ["#a82828", "#7c1414", "#4a0808", "#c9a228", "#f0d358"],
  "imperial-purple": ["#5c3478", "#3a1f4d", "#220c30", "#c9a228", "#f0d358"],
  "centurion":       ["#a8a8a8", "#787878", "#454545", "#c9a228", "#7c1414"],
  "toga-white":      ["#fffaee", "#e0d4b0", "#9a8e60", "#7c1414", "#4a0808"],
  "modern-hoodie":   ["#3a4a78", "#1e2848", "#0c1428", "#c9a070", "#5e4838"],
  "modern-shirt-tie":["#fffaee", "#e0d4b0", "#9a8e60", "#1a2c4e", "#0c1428"],
  "modern-sweater":  ["#2c2620", "#1a1610", "#0a0a08", "#5a3818", "#3e2614"],
  "modern-collared": ["#94a4c0", "#5a6a90", "#324466", "#a08060", "#604030"],
  "soviet-tunic":    ["#3e3e3e", "#252525", "#101010", "#7c1414", "#c9a228"],
  "deacon-purple":   ["#3a1f4d", "#220c30", "#100620", "#fffaee", "#7c1414"],
  "cardinal-crimson":["#a82828", "#7c1414", "#4a0808", "#f0d358", "#c9a228"],
  "papal-white":     ["#fffaee", "#e0d4b0", "#9a8e60", "#c9a228", "#7c1414"],
  shadow:            ["#241834", "#150828", "#080418", "#7c1414", "#4a0808"],
  void:              ["#1a0824", "#0a0410", "#000000", "#7c1414", "#4a0808"],
};

const INK = "#0c0a08";
const GOLD = "#c9a228";
const GOLD_LIGHT = "#f0d358";
const GOLD_DARK = "#5a4810";
const CRIMSON = "#7c1414";
const CRIMSON_DARK = "#3a0808";
const WHITE = "#fffaee";

export default function Portrait({
  config,
  size = 220,
  className = "",
  idle = false,
  flashing = false,
  hairColorHex,
  fullBody = false,
}: Props) {
  // If a real image is provided, use it.
  const base =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_BASE_PATH ?? ""
      : (window as { __NEXT_DATA__?: { assetPrefix?: string } }).__NEXT_DATA__
          ?.assetPrefix ?? process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  // Full-body icon-style sprite: frameless, transparent, standing in the
  // scene. `size` is the figure height here.
  if (fullBody && config.image) {
    return (
      <div
        className={`relative ${className} ${idle ? "pixel-idle" : ""} ${
          flashing ? "pixel-flash" : ""
        }`}
        style={{ height: size, maxHeight: "62vh" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${base}/sprites/${config.image}`}
          alt={config.name ?? ""}
          draggable={false}
          style={{
            height: "100%",
            width: "auto",
            objectFit: "contain",
            display: "block",
            filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.6))",
          }}
        />
      </div>
    );
  }

  if (config.image) {
    return (
      <div
        className={`relative ${className} ${idle ? "pixel-idle" : ""} ${
          flashing ? "pixel-flash" : ""
        }`}
        style={{ width: size, height: (size * 4) / 3 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${base}/portraits/${config.image}`}
          alt={config.name ?? ""}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          // No pixelated rendering for real images
        />
        {/* Gold icon frame */}
        <PortraitFrame size={size} />
      </div>
    );
  }

  const w = 300;
  const h = 400;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={size}
      height={(size * h) / w}
      className={`${className} ${idle ? "pixel-idle" : ""} ${
        flashing ? "pixel-flash" : ""
      }`}
      style={{ display: "block" }}
      aria-label={config.name}
    >
      <defs>
        {/* Linen-textured backdrop */}
        <radialGradient id="bg" cx="50%" cy="35%" r="80%">
          <stop offset="0%" stopColor="#3a2818" />
          <stop offset="60%" stopColor="#1a1208" />
          <stop offset="100%" stopColor="#0a0604" />
        </radialGradient>
        {/* Halo radial */}
        <radialGradient id="haloGold" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#fff0a8" />
          <stop offset="40%" stopColor="#f0d060" />
          <stop offset="75%" stopColor="#c9a228" />
          <stop offset="100%" stopColor="#7a5e10" />
        </radialGradient>
        <radialGradient id="haloBright" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fffadc" />
          <stop offset="35%" stopColor="#fde490" />
          <stop offset="75%" stopColor="#c9a228" />
          <stop offset="100%" stopColor="#5a4810" />
        </radialGradient>
        {/* Skin gradient */}
        <linearGradient id="skinGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={SKIN[config.skin][0]} />
          <stop offset="60%" stopColor={SKIN[config.skin][1]} />
          <stop offset="100%" stopColor={SKIN[config.skin][2]} />
        </linearGradient>
        {/* Generic shadow */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.7)" />
        </radialGradient>
      </defs>

      {/* Backdrop */}
      <rect x="0" y="0" width={w} height={h} fill="url(#bg)" />

      {/* Halo (behind everything) */}
      {renderHalo(config.headwear)}

      {/* Vestment / shoulders behind the head */}
      {renderVestment(config.vestment, config.symbol)}

      {/* Face & head */}
      {renderHead(config, hairColorHex)}

      {/* Headwear on top of head */}
      {renderHeadwear(config.headwear)}

      {/* Hair if it goes in front of headwear (modern styles) */}
      {/* Beard in front of vestment */}
      {renderBeard(
        config.beard,
        config.beardColor ?? config.hairColor,
        hairColorHex
      )}

      {/* Eyes on top of face */}
      {renderEyes(config.eyes ?? "normal", config.skin)}

      {/* Mouth */}
      {renderMouth(config.skin)}

      {/* Vignette */}
      <rect x="0" y="0" width={w} height={h} fill="url(#vignette)" />

      {/* Inscription / nameplate */}
      {renderNameplate(config.name, config.nameSubscript)}

      {/* Gold icon frame */}
      <rect
        x="2"
        y="2"
        width={w - 4}
        height={h - 4}
        fill="none"
        stroke={GOLD}
        strokeWidth="3"
      />
      <rect
        x="8"
        y="8"
        width={w - 16}
        height={h - 16}
        fill="none"
        stroke={GOLD_DARK}
        strokeWidth="1"
      />
    </svg>
  );
}

function PortraitFrame({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 300 400"
      width={size}
      height={(size * 400) / 300}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <rect
        x="2"
        y="2"
        width="296"
        height="396"
        fill="none"
        stroke={GOLD}
        strokeWidth="3"
      />
      <rect
        x="8"
        y="8"
        width="284"
        height="384"
        fill="none"
        stroke={GOLD_DARK}
        strokeWidth="1"
      />
    </svg>
  );
}

function renderHalo(headwear: Headwear) {
  if (headwear === "halo") {
    return (
      <g>
        <circle cx="150" cy="160" r="115" fill="url(#haloGold)" opacity="0.95" />
        <circle
          cx="150"
          cy="160"
          r="115"
          fill="none"
          stroke={GOLD_LIGHT}
          strokeWidth="3"
        />
        <circle
          cx="150"
          cy="160"
          r="108"
          fill="none"
          stroke={GOLD_DARK}
          strokeWidth="1"
          strokeDasharray="2,5"
        />
        {/* Cross-bars on halo (Christ-like) */}
      </g>
    );
  }
  if (headwear === "halo-bright") {
    return (
      <g>
        <circle cx="150" cy="160" r="135" fill="url(#haloBright)" opacity="0.9" />
        <circle
          cx="150"
          cy="160"
          r="135"
          fill="none"
          stroke="#fff0a8"
          strokeWidth="3"
        />
        {/* Radiating rays */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x1 = 150 + Math.cos(a) * 130;
          const y1 = 160 + Math.sin(a) * 130;
          const x2 = 150 + Math.cos(a) * 158;
          const y2 = 160 + Math.sin(a) * 158;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#fde490"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.8"
            />
          );
        })}
      </g>
    );
  }
  return null;
}

function renderHead(config: PortraitConfig, hairColorHex?: string) {
  const skin = SKIN[config.skin];
  // Hair behind head (long hair / women's hair)
  let hairBehind = null;
  const hairC = HAIR[config.hairColor];
  const hairPrimary = hairColorHex ?? hairC[1];
  const hairHighlight = hairColorHex ? lighten(hairColorHex, 30) : hairC[0];
  const hairShadow = hairColorHex ? darken(hairColorHex, 30) : hairC[2];

  if (config.hairStyle === "long" && config.hairColor !== "none") {
    hairBehind = (
      <g>
        {/* hair flow down past shoulders */}
        <path
          d="M 80 140 Q 60 240 80 320 L 220 320 Q 240 240 220 140 Q 200 100 150 95 Q 100 100 80 140 Z"
          fill={hairPrimary}
        />
        <path
          d="M 90 150 Q 75 230 92 300"
          stroke={hairShadow}
          strokeWidth="6"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M 210 150 Q 225 230 208 300"
          stroke={hairShadow}
          strokeWidth="6"
          fill="none"
          opacity="0.5"
        />
      </g>
    );
  }

  // Face: oval head with neck
  const headOval = (
    <g>
      {/* Neck */}
      <path
        d="M 130 240 L 130 280 Q 150 295 170 280 L 170 240 Z"
        fill={skin[2]}
      />
      {/* Head outline */}
      <ellipse
        cx="150"
        cy="165"
        rx="68"
        ry="82"
        fill="url(#skinGrad)"
        stroke={skin[3]}
        strokeWidth="1.2"
      />
      {/* Cheek shadows */}
      <ellipse cx="100" cy="200" rx="14" ry="22" fill={skin[2]} opacity="0.3" />
      <ellipse cx="200" cy="200" rx="14" ry="22" fill={skin[2]} opacity="0.3" />
      {/* Forehead highlight */}
      <ellipse cx="150" cy="125" rx="40" ry="14" fill={skin[0]} opacity="0.3" />
      {/* Nose */}
      <path
        d="M 148 165 Q 144 195 142 210 Q 150 218 158 210 Q 156 195 152 165 Z"
        fill={skin[2]}
        opacity="0.5"
      />
      <path
        d="M 144 212 Q 150 220 156 212"
        stroke={skin[3]}
        strokeWidth="1.5"
        fill="none"
      />
    </g>
  );

  // Hair on top (short / brown / etc.)
  let hairTop = null;
  if (config.hairStyle === "short" && config.hairColor !== "none") {
    hairTop = (
      <g>
        <path
          d="M 88 130 Q 90 90 150 82 Q 210 90 212 130 Q 210 110 195 105 Q 165 100 150 100 Q 135 100 105 105 Q 90 110 88 130 Z"
          fill={hairPrimary}
        />
        <path
          d="M 100 110 Q 130 95 160 100"
          stroke={hairHighlight}
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
      </g>
    );
  } else if (config.hairStyle === "modern" && config.hairColor !== "none") {
    // Side-parted modern hair
    hairTop = (
      <g>
        <path
          d="M 85 120 Q 88 78 148 75 Q 210 80 215 122 Q 200 95 180 92 L 160 105 Q 140 92 110 100 Q 92 108 85 120 Z"
          fill={hairPrimary}
        />
        <path
          d="M 105 105 Q 130 95 155 100"
          stroke={hairHighlight}
          strokeWidth="3"
          fill="none"
          opacity="0.7"
        />
      </g>
    );
  } else if (config.hairStyle === "tonsure") {
    // Bald top with ring of hair (monastic)
    hairTop = (
      <g>
        <path
          d="M 88 140 Q 95 122 110 120 L 115 132 Q 110 145 95 145 Z"
          fill={hairPrimary}
        />
        <path
          d="M 212 140 Q 205 122 190 120 L 185 132 Q 190 145 205 145 Z"
          fill={hairPrimary}
        />
        <path
          d="M 100 145 Q 110 155 120 152"
          stroke={hairShadow}
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
      </g>
    );
  }

  return (
    <g>
      {hairBehind}
      {headOval}
      {hairTop}
    </g>
  );
}

function renderEyes(eyes: EyeStyle, skin: Skin) {
  const eyeWhite = WHITE;
  const eyeShadow = SKIN[skin][3];

  if (eyes === "void") {
    return (
      <g>
        <ellipse cx="125" cy="170" rx="11" ry="9" fill="#000000" />
        <ellipse cx="175" cy="170" rx="11" ry="9" fill="#000000" />
      </g>
    );
  }
  if (eyes === "glowing-red") {
    return (
      <g>
        <ellipse cx="125" cy="170" rx="14" ry="8" fill="#3a0808" />
        <ellipse cx="175" cy="170" rx="14" ry="8" fill="#3a0808" />
        <ellipse cx="125" cy="170" rx="9" ry="5" fill="#dc2828" />
        <ellipse cx="175" cy="170" rx="9" ry="5" fill="#dc2828" />
        <ellipse cx="125" cy="170" rx="5" ry="3" fill="#fde490" opacity="0.7" />
        <ellipse cx="175" cy="170" rx="5" ry="3" fill="#fde490" opacity="0.7" />
      </g>
    );
  }
  // Normal / narrow / hollow share base structure
  const ry = eyes === "narrow" ? 4 : 6;
  return (
    <g>
      {/* Eyebrow */}
      <path
        d="M 108 148 Q 125 142 142 148"
        stroke={eyeShadow}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 158 148 Q 175 142 192 148"
        stroke={eyeShadow}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      {/* Eye whites */}
      <ellipse cx="125" cy="170" rx="11" ry={ry + 1} fill={eyeWhite} />
      <ellipse cx="175" cy="170" rx="11" ry={ry + 1} fill={eyeWhite} />
      {/* Iris */}
      <ellipse cx="125" cy="170" rx="5" ry={ry} fill="#3a2410" />
      <ellipse cx="175" cy="170" rx="5" ry={ry} fill="#3a2410" />
      {/* Pupil */}
      <circle cx="125" cy="170" r="2.5" fill={INK} />
      <circle cx="175" cy="170" r="2.5" fill={INK} />
      {/* Catchlight */}
      <circle cx="127" cy="168" r="1.2" fill={WHITE} />
      <circle cx="177" cy="168" r="1.2" fill={WHITE} />
      {/* Hollow effect */}
      {eyes === "hollow" && (
        <g opacity="0.5">
          <ellipse cx="125" cy="178" rx="14" ry="5" fill={eyeShadow} />
          <ellipse cx="175" cy="178" rx="14" ry="5" fill={eyeShadow} />
        </g>
      )}
    </g>
  );
}

function renderMouth(skin: Skin) {
  const shadow = SKIN[skin][2];
  return (
    <g>
      <path
        d="M 132 232 Q 150 238 168 232"
        stroke={shadow}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

function renderBeard(
  beard: Beard,
  color: HairColor,
  hairColorHex?: string
) {
  if (beard === "none") return null;
  const c = HAIR[color];
  const primary = hairColorHex ?? c[1];
  const highlight = hairColorHex ? lighten(hairColorHex, 25) : c[0];

  if (beard === "stubble") {
    return (
      <g opacity="0.6">
        <ellipse cx="150" cy="240" rx="28" ry="8" fill={c[2]} />
      </g>
    );
  }

  if (beard === "short") {
    return (
      <g>
        <path
          d="M 110 220 Q 120 250 150 258 Q 180 250 190 220 Q 175 235 150 240 Q 125 235 110 220 Z"
          fill={primary}
        />
        <path
          d="M 130 245 Q 150 252 170 245"
          stroke={highlight}
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
      </g>
    );
  }

  if (beard === "long") {
    return (
      <g>
        <path
          d="M 105 215 Q 95 290 130 320 Q 150 325 170 320 Q 205 290 195 215 Q 175 235 150 240 Q 125 235 105 215 Z"
          fill={primary}
        />
        <path
          d="M 130 280 Q 150 290 170 280"
          stroke={highlight}
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M 110 240 Q 100 290 125 310"
          stroke={highlight}
          strokeWidth="3"
          fill="none"
          opacity="0.4"
        />
      </g>
    );
  }

  if (beard === "very-long") {
    return (
      <g>
        <path
          d="M 100 215 Q 80 320 120 380 Q 150 395 180 380 Q 220 320 200 215 Q 175 230 150 240 Q 125 230 100 215 Z"
          fill={primary}
        />
        <path
          d="M 110 280 Q 105 330 125 370"
          stroke={highlight}
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M 190 280 Q 195 330 175 370"
          stroke={highlight}
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M 140 300 Q 150 350 160 300"
          stroke={highlight}
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />
      </g>
    );
  }

  return null;
}

function renderHeadwear(headwear: Headwear) {
  switch (headwear) {
    case "mitre":
      return (
        <g>
          {/* Mitre body (gold) */}
          <path
            d="M 105 130 L 100 50 Q 150 30 200 50 L 195 130 Z"
            fill={GOLD}
            stroke={GOLD_DARK}
            strokeWidth="2"
          />
          {/* Mitre top peak */}
          <path
            d="M 130 50 L 150 25 L 170 50"
            fill={GOLD_LIGHT}
            stroke={GOLD_DARK}
            strokeWidth="2"
          />
          {/* Mitre cross */}
          <rect x="146" y="60" width="8" height="50" fill={CRIMSON} />
          <rect x="125" y="80" width="50" height="8" fill={CRIMSON} />
          {/* Gem row */}
          <circle cx="115" cy="115" r="4" fill={CRIMSON_DARK} stroke={GOLD_LIGHT} />
          <circle cx="185" cy="115" r="4" fill={CRIMSON_DARK} stroke={GOLD_LIGHT} />
          {/* Lappet hanging on the side */}
          <rect x="100" y="130" width="6" height="50" fill={GOLD} />
          <rect x="194" y="130" width="6" height="50" fill={GOLD} />
        </g>
      );
    case "tiara":
      return (
        <g>
          {/* Three tiers of papal tiara */}
          <ellipse cx="150" cy="55" rx="20" ry="8" fill={GOLD_LIGHT} />
          <rect x="125" y="55" width="50" height="20" fill={WHITE} stroke={GOLD} strokeWidth="2" />
          <rect x="130" y="60" width="40" height="3" fill={GOLD} />
          <rect x="115" y="75" width="70" height="22" fill={WHITE} stroke={GOLD} strokeWidth="2" />
          <rect x="120" y="80" width="60" height="3" fill={GOLD} />
          <circle cx="135" cy="86" r="3" fill={CRIMSON_DARK} />
          <circle cx="150" cy="86" r="3" fill="#286618" />
          <circle cx="165" cy="86" r="3" fill={CRIMSON_DARK} />
          <rect x="105" y="97" width="90" height="25" fill={WHITE} stroke={GOLD} strokeWidth="2" />
          <rect x="110" y="102" width="80" height="3" fill={GOLD} />
          <circle cx="125" cy="110" r="3" fill={CRIMSON_DARK} />
          <circle cx="140" cy="110" r="3" fill="#286618" />
          <circle cx="155" cy="110" r="3" fill="#1e4488" />
          <circle cx="170" cy="110" r="3" fill={CRIMSON_DARK} />
          <circle cx="150" cy="46" r="6" fill={GOLD_LIGHT} stroke={GOLD_DARK} />
        </g>
      );
    case "galero":
      return (
        <g>
          {/* Wide cardinal hat */}
          <ellipse cx="150" cy="100" rx="100" ry="22" fill={CRIMSON} />
          <ellipse cx="150" cy="100" rx="100" ry="22" fill="none" stroke={GOLD} strokeWidth="2" />
          {/* Crown bulge */}
          <ellipse cx="150" cy="92" rx="55" ry="20" fill={CRIMSON} />
          <ellipse cx="150" cy="92" rx="55" ry="20" fill="none" stroke={CRIMSON_DARK} strokeWidth="1" />
          {/* Gold tassels hanging */}
          {[40, 60, 240, 260].map((x, i) => (
            <g key={i}>
              <line x1={x} y1={110} x2={x} y2={130} stroke={GOLD} strokeWidth="2" />
              <circle cx={x} cy={132} r="3" fill={GOLD_LIGHT} />
            </g>
          ))}
        </g>
      );
    case "stemma":
      return (
        <g>
          {/* Byzantine imperial crown */}
          <rect x="100" y="80" width="100" height="40" fill={GOLD} stroke={GOLD_DARK} strokeWidth="2" />
          {/* Crown peaks */}
          {[105, 130, 155, 180].map((x, i) => (
            <polygon
              key={i}
              points={`${x},80 ${x + 10},65 ${x + 20},80`}
              fill={GOLD_LIGHT}
              stroke={GOLD_DARK}
              strokeWidth="1"
            />
          ))}
          {/* Gems */}
          <circle cx="115" cy="100" r="4" fill={CRIMSON_DARK} stroke={GOLD_LIGHT} />
          <circle cx="135" cy="100" r="4" fill="#1e4488" stroke={GOLD_LIGHT} />
          <circle cx="155" cy="100" r="4" fill="#286618" stroke={GOLD_LIGHT} />
          <circle cx="175" cy="100" r="4" fill={CRIMSON_DARK} stroke={GOLD_LIGHT} />
          {/* Pearl strings (prependoulia) */}
          {[100, 200].map((x, i) => (
            <g key={i}>
              <line x1={x} y1={120} x2={x} y2={200} stroke={WHITE} strokeWidth="1" />
              {Array.from({ length: 10 }).map((_, j) => (
                <circle key={j} cx={x} cy={130 + j * 8} r="2" fill={WHITE} />
              ))}
            </g>
          ))}
        </g>
      );
    case "helmet":
      return (
        <g>
          {/* Roman helmet */}
          <path
            d="M 90 130 Q 88 60 150 55 Q 212 60 210 130 Q 200 120 150 120 Q 100 120 90 130 Z"
            fill="#a8a8a8"
            stroke="#4a4a4a"
            strokeWidth="2"
          />
          {/* Crest holder */}
          <rect x="140" y="50" width="20" height="15" fill="#8a8a8a" stroke="#4a4a4a" />
          {/* Horsehair crest */}
          <path
            d="M 140 50 L 145 10 L 155 10 L 160 50 Z"
            fill={CRIMSON}
            stroke={CRIMSON_DARK}
            strokeWidth="1"
          />
          {/* Plume detail */}
          <line x1="148" y1="20" x2="148" y2="48" stroke={CRIMSON_DARK} />
          <line x1="152" y1="15" x2="152" y2="48" stroke={CRIMSON_DARK} />
          {/* Cheek guards */}
          <path
            d="M 90 130 Q 95 160 105 175"
            stroke="#4a4a4a"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 210 130 Q 205 160 195 175"
            stroke="#4a4a4a"
            strokeWidth="3"
            fill="none"
          />
          {/* Gold trim */}
          <path
            d="M 100 100 L 200 100"
            stroke={GOLD}
            strokeWidth="2"
            fill="none"
          />
        </g>
      );
    case "laurel":
    case "imperial-laurel":
      return (
        <g>
          {/* Laurel wreath */}
          <ellipse
            cx="150"
            cy="100"
            rx="80"
            ry="18"
            fill="none"
            stroke="#4a6c2a"
            strokeWidth="3"
          />
          {/* Individual leaves */}
          {Array.from({ length: 14 }).map((_, i) => {
            const t = (i / 13) * Math.PI;
            const x = 150 - 80 * Math.cos(t);
            const y = 100 - 18 * Math.sin(t);
            return (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="6"
                ry="3"
                fill="#5a8c3a"
                transform={`rotate(${(t * 180) / Math.PI - 80}, ${x}, ${y})`}
              />
            );
          })}
        </g>
      );
    case "ushanka":
      return (
        <g>
          {/* Soviet peaked cap */}
          <rect x="90" y="95" width="120" height="25" fill="#2a2a2a" stroke="#0a0a0a" strokeWidth="2" />
          <ellipse cx="150" cy="95" rx="55" ry="22" fill="#3a3a3a" stroke="#0a0a0a" strokeWidth="2" />
          {/* Cap band */}
          <rect x="95" y="100" width="110" height="6" fill="#7c1414" />
          {/* Red star */}
          <polygon
            points="150,80 154,90 164,90 156,96 159,106 150,100 141,106 144,96 136,90 146,90"
            fill={CRIMSON}
            stroke="#3a0808"
          />
          {/* Visor */}
          <path
            d="M 75 120 Q 150 135 225 120 L 225 130 Q 150 145 75 130 Z"
            fill="#1a1a1a"
            stroke="#0a0a0a"
          />
        </g>
      );
    case "skufia":
      return (
        <g>
          <path
            d="M 88 130 Q 90 65 150 60 Q 210 65 212 130 Q 200 120 150 120 Q 100 120 88 130 Z"
            fill="#0a0a0a"
            stroke="#2a2010"
            strokeWidth="1.5"
          />
          {/* Cross detail */}
          <rect x="146" y="80" width="8" height="20" fill="#5a4810" />
          <rect x="138" y="86" width="24" height="8" fill="#5a4810" />
        </g>
      );
    case "klobuk":
      return (
        <g>
          {/* Black monastic veil */}
          <path
            d="M 88 130 Q 90 65 150 60 Q 210 65 212 130 Q 200 120 150 120 Q 100 120 88 130 Z"
            fill="#0a0a0a"
            stroke="#2a2010"
          />
          {/* Veil falling */}
          <path
            d="M 88 130 Q 60 200 80 280 L 220 280 Q 240 200 212 130 Q 200 200 150 220 Q 100 200 88 130 Z"
            fill="#0a0a0a"
            stroke="#1a1a1a"
            strokeWidth="1"
            opacity="0.95"
          />
          {/* Cross on klobuk */}
          <rect x="146" y="80" width="8" height="20" fill={GOLD_DARK} />
          <rect x="138" y="86" width="24" height="8" fill={GOLD_DARK} />
        </g>
      );
    case "modern-tie":
      return null; // hair-styling already handles this
    case "hood-shadow":
      return (
        <g>
          {/* Cowl */}
          <path
            d="M 75 130 Q 65 50 150 40 Q 235 50 225 130 Q 220 70 150 80 Q 80 70 75 130 Z"
            fill="#0a0410"
            stroke="#1a0820"
            strokeWidth="2"
          />
          {/* Inner shadow on face */}
          <ellipse cx="150" cy="160" rx="60" ry="55" fill="#0a0410" opacity="0.4" />
          {/* Cowl folds */}
          <path
            d="M 85 130 Q 80 200 100 260"
            stroke="#1a0820"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 215 130 Q 220 200 200 260"
            stroke="#1a0820"
            strokeWidth="3"
            fill="none"
          />
        </g>
      );
    case "void-shadow":
      return (
        <g>
          {/* Smoky void around head */}
          <ellipse cx="150" cy="160" rx="95" ry="100" fill="#0a0410" opacity="0.6" />
          <ellipse cx="150" cy="160" rx="80" ry="85" fill="#150828" opacity="0.7" />
          {/* Drifting wisps */}
          <path
            d="M 50 80 Q 100 50 150 70 Q 200 50 250 80"
            stroke="#3a1f4d"
            strokeWidth="4"
            fill="none"
            opacity="0.6"
            strokeLinecap="round"
          />
          <path
            d="M 40 120 Q 100 100 150 110 Q 200 100 260 120"
            stroke="#28182c"
            strokeWidth="3"
            fill="none"
            opacity="0.5"
            strokeLinecap="round"
          />
        </g>
      );
    default:
      return null;
  }
}

function renderVestment(vestment: Vestment, symbol?: Symbol) {
  const v = VESTMENT[vestment];
  const [light, mid, shadow, trim, trimDark] = v;

  // Shoulder/torso shape
  const torso = (
    <g>
      <path
        d="M 0 320 Q 0 280 60 270 Q 100 260 150 260 Q 200 260 240 270 Q 300 280 300 320 L 300 400 L 0 400 Z"
        fill={mid}
        stroke={shadow}
        strokeWidth="2"
      />
      {/* Highlight on shoulders */}
      <path
        d="M 60 280 Q 100 270 150 270"
        stroke={light}
        strokeWidth="6"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      {/* Inner V */}
      <path
        d="M 110 270 Q 150 285 190 270 L 175 310 Q 150 325 125 310 Z"
        fill={shadow}
      />
      {/* Trim */}
      <path
        d="M 110 270 Q 150 285 190 270"
        stroke={trim}
        strokeWidth="3"
        fill="none"
      />
    </g>
  );

  // Cross / decoration on chest
  let chestSymbol = null;
  if (vestment === "bishop-white" || vestment === "papal-white") {
    chestSymbol = (
      <g>
        <rect x="146" y="320" width="8" height="50" fill={trim} />
        <rect x="125" y="338" width="50" height="8" fill={trim} />
        <rect x="146" y="320" width="8" height="50" fill={trimDark} opacity="0.3" />
      </g>
    );
  }
  if (vestment === "cardinal-crimson") {
    chestSymbol = (
      <g>
        <rect x="146" y="320" width="8" height="40" fill={trim} />
        <rect x="130" y="332" width="40" height="8" fill={trim} />
      </g>
    );
  }
  if (vestment === "monk-brown" || vestment === "monk-black") {
    chestSymbol = (
      <g>
        <rect x="148" y="325" width="4" height="30" fill={trim} />
        <rect x="138" y="333" width="24" height="4" fill={trim} />
      </g>
    );
  }
  if (vestment === "centurion") {
    chestSymbol = (
      <g>
        {/* Armor plates */}
        <rect x="100" y="290" width="100" height="6" fill={shadow} />
        <rect x="100" y="310" width="100" height="6" fill={shadow} />
        <rect x="100" y="330" width="100" height="6" fill={shadow} />
        {/* Center red tunic showing */}
        <rect x="140" y="290" width="20" height="100" fill={CRIMSON} />
      </g>
    );
  }
  if (vestment === "imperial-purple") {
    chestSymbol = (
      <g>
        {/* Loros (jeweled scarf) */}
        <rect x="105" y="280" width="90" height="20" fill={GOLD} stroke={GOLD_DARK} />
        <circle cx="125" cy="290" r="4" fill={CRIMSON_DARK} />
        <circle cx="150" cy="290" r="4" fill="#1e4488" />
        <circle cx="175" cy="290" r="4" fill={CRIMSON_DARK} />
        <rect x="120" y="300" width="60" height="80" fill={GOLD} stroke={GOLD_DARK} />
        {/* Gem column */}
        <circle cx="150" cy="320" r="4" fill={CRIMSON_DARK} />
        <circle cx="150" cy="340" r="4" fill="#1e4488" />
        <circle cx="150" cy="360" r="4" fill="#286618" />
      </g>
    );
  }
  if (vestment === "modern-shirt-tie") {
    chestSymbol = (
      <g>
        {/* Collar */}
        <path
          d="M 125 270 L 145 290 L 155 290 L 175 270 L 175 310 L 125 310 Z"
          fill={light}
        />
        {/* Tie knot */}
        <polygon points="145,290 155,290 158,302 142,302" fill={trim} />
        {/* Tie body */}
        <polygon points="142,302 158,302 156,390 144,390" fill={trim} />
      </g>
    );
  }
  if (vestment === "soviet-tunic") {
    chestSymbol = (
      <g>
        {/* Collar */}
        <rect x="120" y="270" width="60" height="20" fill={shadow} />
        {/* Buttons */}
        <circle cx="150" cy="310" r="3" fill={trim} />
        <circle cx="150" cy="330" r="3" fill={trim} />
        <circle cx="150" cy="350" r="3" fill={trim} />
        {/* Medals */}
        <rect x="110" y="320" width="14" height="6" fill={trim} />
        <rect x="110" y="332" width="14" height="6" fill="#1e4488" />
        <rect x="110" y="344" width="14" height="6" fill={CRIMSON} />
      </g>
    );
  }
  if (vestment === "deacon-purple") {
    chestSymbol = (
      <g>
        {/* Orarion stole */}
        <rect x="130" y="260" width="14" height="140" fill={light} />
        <rect x="130" y="290" width="14" height="4" fill={CRIMSON} />
        <rect x="130" y="310" width="14" height="4" fill={CRIMSON} />
        <rect x="130" y="330" width="14" height="4" fill={CRIMSON} />
      </g>
    );
  }

  // Symbol overlay (held object)
  let heldSymbol = null;
  if (symbol === "scroll") {
    heldSymbol = (
      <g>
        <rect x="200" y="320" width="50" height="60" fill={WHITE} stroke={GOLD_DARK} strokeWidth="2" />
        <line x1="210" y1="335" x2="240" y2="335" stroke={INK} strokeWidth="1" />
        <line x1="210" y1="345" x2="240" y2="345" stroke={INK} strokeWidth="1" />
        <line x1="210" y1="355" x2="235" y2="355" stroke={INK} strokeWidth="1" />
        <line x1="210" y1="365" x2="240" y2="365" stroke={INK} strokeWidth="1" />
      </g>
    );
  }
  if (symbol === "book") {
    heldSymbol = (
      <g>
        <rect x="195" y="315" width="60" height="70" fill={CRIMSON} stroke={GOLD_DARK} strokeWidth="2" />
        <rect x="200" y="320" width="50" height="60" fill="#5a0a0a" />
        <rect x="220" y="320" width="3" height="60" fill={GOLD} />
        {/* Gold cross on cover */}
        <rect x="222" y="335" width="6" height="20" fill={GOLD} />
        <rect x="216" y="342" width="18" height="6" fill={GOLD} />
      </g>
    );
  }
  if (symbol === "icon") {
    heldSymbol = (
      <g>
        <rect x="195" y="315" width="60" height="70" fill={GOLD} stroke={GOLD_DARK} strokeWidth="2" />
        <rect x="200" y="320" width="50" height="60" fill="#3a2818" />
        {/* Mini halo + figure */}
        <circle cx="225" cy="338" r="9" fill={GOLD_LIGHT} />
        <circle cx="225" cy="338" r="5" fill={SKIN.pale[1]} />
        <rect x="218" y="350" width="14" height="22" fill={CRIMSON} />
      </g>
    );
  }
  if (symbol === "cross") {
    heldSymbol = (
      <g>
        <rect x="220" y="310" width="6" height="80" fill={GOLD} stroke={GOLD_DARK} />
        <rect x="208" y="330" width="30" height="6" fill={GOLD} stroke={GOLD_DARK} />
        {/* Lower bar (Orthodox cross) */}
        <rect x="212" y="365" width="22" height="4" fill={GOLD} stroke={GOLD_DARK} transform="rotate(15, 223, 367)" />
      </g>
    );
  }
  if (symbol === "sword") {
    heldSymbol = (
      <g>
        <rect x="222" y="310" width="4" height="70" fill="#d8d8d8" stroke="#4a4a4a" />
        <rect x="214" y="380" width="20" height="6" fill={GOLD} />
        <rect x="220" y="386" width="8" height="14" fill={CRIMSON} />
      </g>
    );
  }
  if (symbol === "chains") {
    heldSymbol = (
      <g opacity="0.85">
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse
            key={i}
            cx={210}
            cy={300 + i * 16}
            rx="6"
            ry="4"
            fill="none"
            stroke="#5a5a5a"
            strokeWidth="2"
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse
            key={"r" + i}
            cx={210}
            cy={308 + i * 16}
            rx="4"
            ry="6"
            fill="none"
            stroke="#7a7a7a"
            strokeWidth="2"
          />
        ))}
      </g>
    );
  }
  if (symbol === "wheel") {
    heldSymbol = (
      <g>
        <circle cx="225" cy="350" r="28" fill="none" stroke="#7a4a20" strokeWidth="4" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={225}
              y1={350}
              x2={225 + Math.cos(a) * 28}
              y2={350 + Math.sin(a) * 28}
              stroke="#7a4a20"
              strokeWidth="3"
            />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
          return (
            <polygon
              key={"s" + i}
              points={`${225 + Math.cos(a) * 28},${350 + Math.sin(a) * 28} ${
                225 + Math.cos(a) * 38
              },${350 + Math.sin(a) * 38} ${225 + Math.cos(a + 0.1) * 30},${
                350 + Math.sin(a + 0.1) * 30
              }`}
              fill="#a8a8a8"
            />
          );
        })}
      </g>
    );
  }
  if (symbol === "flame") {
    heldSymbol = (
      <g>
        <path
          d="M 215 360 Q 200 340 215 320 Q 222 310 225 320 Q 235 330 230 350 Q 240 345 240 365 Q 230 385 215 360 Z"
          fill="#f0c060"
          opacity="0.85"
        />
        <path
          d="M 218 358 Q 215 345 222 332 Q 230 340 225 360 Z"
          fill="#fff0a8"
        />
      </g>
    );
  }

  return (
    <g>
      {torso}
      {chestSymbol}
      {heldSymbol}
    </g>
  );
}

function renderNameplate(name?: string, subtitle?: string) {
  if (!name) return null;
  return (
    <g>
      <rect x="20" y="368" width="260" height="24" fill="#0a0604" opacity="0.85" />
      <text
        x="150"
        y="382"
        textAnchor="middle"
        fontFamily="'Press Start 2P', 'Cinzel', serif"
        fontSize="11"
        fill={GOLD_LIGHT}
        letterSpacing="2"
      >
        {name.toUpperCase()}
      </text>
      {subtitle && (
        <text
          x="150"
          y="392"
          textAnchor="middle"
          fontFamily="'Cinzel', serif"
          fontStyle="italic"
          fontSize="8"
          fill="#c8b890"
        >
          {subtitle}
        </text>
      )}
    </g>
  );
}

function lighten(hex: string, percent: number): string {
  const m = hex.replace("#", "").match(/.{1,2}/g);
  if (!m) return hex;
  const [r, g, b] = m.map((v) => parseInt(v, 16));
  const adj = (v: number) => Math.min(255, Math.round(v + (255 - v) * (percent / 100)));
  return `rgb(${adj(r)}, ${adj(g)}, ${adj(b)})`;
}

function darken(hex: string, percent: number): string {
  const m = hex.replace("#", "").match(/.{1,2}/g);
  if (!m) return hex;
  const [r, g, b] = m.map((v) => parseInt(v, 16));
  const adj = (v: number) => Math.max(0, Math.round(v * (1 - percent / 100)));
  return `rgb(${adj(r)}, ${adj(g)}, ${adj(b)})`;
}
