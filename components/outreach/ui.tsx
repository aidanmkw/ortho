"use client";

import { useCallback, useState } from "react";

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function CopyButton({
  text,
  label = "Copy",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const onClick = useCallback(async () => {
    const ok = await copyText(text);
    setState(ok ? "ok" : "err");
    window.setTimeout(() => setState("idle"), 1600);
  }, [text]);
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
        state === "ok"
          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
          : state === "err"
            ? "bg-red-500/20 text-red-300 border border-red-400/40"
            : "bg-white/5 text-neutral-200 border border-white/15 hover:bg-white/10"
      } ${className}`}
    >
      {state === "ok" ? "Copied ✓" : state === "err" ? "Copy failed" : label}
    </button>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
        {label}
      </span>
      {children}
      {hint ? <span className="mt-1 block text-[11px] text-neutral-500">{hint}</span> : null}
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-600 outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40";
