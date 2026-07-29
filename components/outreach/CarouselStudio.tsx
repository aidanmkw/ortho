"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useOutreach } from "@/components/outreach/OutreachProvider";
import { CopyButton, inputCls } from "@/components/outreach/ui";
import { humanize, type Article } from "@/lib/outreach/humanize";
import {
  CANVAS_SIZE,
  THEMES,
  buildSlides,
  carouselAgentPrompt,
  drawSlide,
  type Slide,
  type Theme,
} from "@/lib/outreach/carousel";

function isArticle(v: unknown): v is Article {
  if (!v || typeof v !== "object") return false;
  const a = v as Record<string, unknown>;
  return typeof a.title === "string" && Array.isArray(a.sections);
}

function slugify(s: string): string {
  return (s || "carousel").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "carousel";
}

function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, "image/png");
}

function SlideCanvas({
  slide,
  theme,
  register,
}: {
  slide: Slide;
  theme: Theme;
  register: (index: number, el: HTMLCanvasElement | null) => void;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawSlide(ctx, slide, theme);
  }, [slide, theme]);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <canvas
        ref={(el) => {
          ref.current = el;
          register(slide.index - 1, el);
        }}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="block w-full"
      />
      <div className="flex items-center justify-between border-t border-white/10 bg-black/30 px-3 py-2 text-[11px] text-neutral-400">
        <span>
          {slide.index}/{slide.total} · {slide.kind}
        </span>
        <button
          type="button"
          onClick={() => ref.current && downloadCanvas(ref.current, `slide-${slide.index}.png`)}
          className="font-semibold text-amber-300 hover:underline"
        >
          PNG ↓
        </button>
      </div>
    </div>
  );
}

export default function CarouselStudio() {
  const { state } = useOutreach();
  const [raw, setRaw] = useState("");
  const [themeId, setThemeId] = useState(THEMES[0].id);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  const draftArticle = useMemo<Article | null>(() => {
    if (!state.draftArticle) return null;
    try {
      const parsed = JSON.parse(state.draftArticle) as unknown;
      return isArticle(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }, [state.draftArticle]);

  const article: Article = useMemo(() => {
    if (raw.trim()) {
      return humanize(raw, { creatorName: state.draftCredit, blog: state.brand.blogName });
    }
    if (draftArticle) return draftArticle;
    return humanize(
      "the fastest way to grow is to help one person in public every day. pick a problem, solve it out loud, and let the results speak. ninety days of that changes everything.",
      { blog: state.brand.blogName }
    );
  }, [raw, draftArticle, state.draftCredit, state.brand.blogName]);

  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

  const slides = useMemo(
    () =>
      buildSlides(article, {
        credit: state.draftCredit,
        handle: state.brand.yourHandle,
        blog: state.brand.blogName,
      }),
    [article, state.draftCredit, state.brand.yourHandle, state.brand.blogName]
  );

  const prompt = useMemo(
    () => carouselAgentPrompt(article, { credit: state.draftCredit, handle: state.brand.yourHandle }),
    [article, state.draftCredit, state.brand.yourHandle]
  );

  const register = (index: number, el: HTMLCanvasElement | null) => {
    canvasRefs.current[index] = el;
  };

  const downloadAll = () => {
    const base = slugify(article.title);
    slides.forEach((s, i) => {
      const canvas = canvasRefs.current[i];
      if (canvas) {
        // Stagger so browsers don't block the batch of downloads.
        window.setTimeout(() => downloadCanvas(canvas, `${base}-${String(i + 1).padStart(2, "0")}.png`), i * 250);
      }
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-neutral-200">
              Source: {raw.trim() ? "your pasted text" : draftArticle ? "article from Humanizer" : "sample"}
            </h2>
            <p className="text-[11px] text-neutral-500">
              {draftArticle && !raw.trim()
                ? `Loaded “${draftArticle.title}”. Paste text below to override.`
                : "Paste an article, or build one in the Humanizer and hit “Build carousel”."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex gap-1">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setThemeId(t.id)}
                  title={t.label}
                  className={`h-7 w-7 rounded-full border-2 ${
                    t.id === themeId ? "border-amber-300" : "border-white/20"
                  }`}
                  style={{ background: `linear-gradient(135deg, ${t.bg[0]}, ${t.bg[1]})` }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={downloadAll}
              className="rounded-lg bg-amber-400 px-3 py-2 text-xs font-semibold text-black hover:bg-amber-300"
            >
              Download all ({slides.length})
            </button>
          </div>
        </div>
        <textarea
          className={`${inputCls} mt-3 min-h-[90px] resize-y`}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="Optional: paste article text here to build slides from it directly…"
        />
      </section>

      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {slides.map((s) => (
            <SlideCanvas key={s.index} slide={s} theme={theme} register={register} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-200">Rather have your AI build it?</h3>
          <CopyButton text={prompt} label="Copy carousel prompt" />
        </div>
        <pre className="max-h-44 overflow-auto rounded-lg border border-white/10 bg-black/40 p-3 text-[11px] leading-relaxed text-neutral-400">
          {prompt}
        </pre>
      </section>
    </div>
  );
}
