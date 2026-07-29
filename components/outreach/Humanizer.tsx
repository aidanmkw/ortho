"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useOutreach } from "@/components/outreach/OutreachProvider";
import { CopyButton, Field, inputCls } from "@/components/outreach/ui";
import {
  agentPrompt,
  articleToMarkdown,
  articleWordCount,
  humanize,
  type Tone,
} from "@/lib/outreach/humanize";

const SAMPLE =
  "most people think you need a huge audience to make money online. you don't. i started with 400 followers and a google doc. the trick is you pick ONE painful problem, you solve it publicly every single day, and you let the receipts do the talking. no viral hacks. no buying followers. just show up, ship, and share what worked and what flopped. do that for 90 days and you will not recognize your account.";

const TONES: { id: Tone; label: string }[] = [
  { id: "punchy", label: "Punchy" },
  { id: "warm", label: "Warm" },
  { id: "analytical", label: "Analytical" },
];

export default function Humanizer() {
  const { state, setStage, setDraft } = useOutreach();
  const router = useRouter();
  const [influencerId, setInfluencerId] = useState("");
  const [manualName, setManualName] = useState("");
  const [manualTopic, setManualTopic] = useState("");
  const [raw, setRaw] = useState("");
  const [tone, setTone] = useState<Tone>("punchy");

  const influencer = state.influencers.find((i) => i.id === influencerId) ?? null;
  const creatorName = influencer ? influencer.name || influencer.handle : manualName;
  const topic = influencer ? influencer.niche : manualTopic;

  const article = useMemo(
    () => humanize(raw || SAMPLE, { creatorName, topic, blog: state.brand.blogName, tone }),
    [raw, creatorName, topic, state.brand.blogName, tone]
  );
  const markdown = useMemo(() => articleToMarkdown(article, state.brand.blogName), [article, state.brand.blogName]);
  const prompt = useMemo(() => agentPrompt(raw || SAMPLE, { creatorName, topic, blog: state.brand.blogName }), [raw, creatorName, topic, state.brand.blogName]);
  const words = articleWordCount(article);

  const sendToCarousel = () => {
    setDraft(JSON.stringify(article), creatorName);
    if (influencer && (influencer.stage === "agreed" || influencer.stage === "replied")) {
      setStage(influencer.id, "featured");
    }
    router.push("/outreach/carousel");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input */}
      <div className="space-y-4">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Creator (from your list)">
              <select
                className={inputCls}
                value={influencerId}
                onChange={(e) => setInfluencerId(e.target.value)}
              >
                <option value="">— manual —</option>
                {state.influencers.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name || i.handle} · {i.niche || "?"}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Tone">
              <select className={inputCls} value={tone} onChange={(e) => setTone(e.target.value as Tone)}>
                {TONES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
            {!influencer ? (
              <>
                <Field label="Creator name">
                  <input className={inputCls} value={manualName} onChange={(e) => setManualName(e.target.value)} placeholder="Maya" />
                </Field>
                <Field label="Topic">
                  <input className={inputCls} value={manualTopic} onChange={(e) => setManualTopic(e.target.value)} placeholder="no-code SaaS" />
                </Field>
              </>
            ) : null}
          </div>

          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                Their top post
              </span>
              {influencer?.topPost ? (
                <button
                  type="button"
                  onClick={() => setRaw(influencer.topPost)}
                  className="text-[11px] font-semibold text-amber-300 hover:underline"
                >
                  load from list
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setRaw(SAMPLE)}
                  className="text-[11px] font-semibold text-amber-300 hover:underline"
                >
                  use sample
                </button>
              )}
            </div>
            <textarea
              className={`${inputCls} min-h-[200px] resize-y leading-relaxed`}
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              placeholder="Paste the creator's top-performing caption / post text here…"
            />
            <p className="mt-1 text-[11px] text-neutral-600">
              {raw ? "" : "Empty? We're showing a sample so you can see how it works."}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-neutral-200">Prefer to use your own AI?</h3>
            <CopyButton text={prompt} label="Copy agent prompt" />
          </div>
          <p className="mb-2 text-[11px] text-neutral-500">
            Same idea as the video — paste this into any AI agent and it&apos;ll write the article. The
            creator&apos;s post is already embedded.
          </p>
          <pre className="max-h-40 overflow-auto rounded-lg border border-white/10 bg-black/40 p-3 text-[11px] leading-relaxed text-neutral-400">
            {prompt}
          </pre>
        </section>
      </div>

      {/* Output */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs text-neutral-500">
            ~{words} words · in-browser draft
          </div>
          <div className="flex gap-2">
            <CopyButton text={markdown} label="Copy Markdown" />
            <button
              type="button"
              onClick={sendToCarousel}
              className="rounded-md border border-amber-400/50 bg-amber-400/15 px-3 py-1.5 text-xs font-semibold text-amber-200 hover:bg-amber-400/25"
            >
              Build carousel →
            </button>
          </div>
        </div>

        <article className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6">
          <h1 className="text-xl font-bold leading-tight text-neutral-50">{article.title}</h1>
          <p className="mt-2 text-sm italic text-neutral-400">{article.dek}</p>
          {article.sections.map((s, i) => (
            <div key={i} className="mt-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-amber-300/90">{s.heading}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j} className="mt-1.5 text-sm leading-relaxed text-neutral-300">
                  {p}
                </p>
              ))}
            </div>
          ))}
          {article.takeaways.length ? (
            <div className="mt-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-amber-300/90">The takeaways</h2>
              <ul className="mt-1.5 space-y-1">
                {article.takeaways.map((t, i) => (
                  <li key={i} className="flex gap-2 text-sm text-neutral-300">
                    <span className="text-amber-300">→</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <p className="mt-5 border-t border-white/10 pt-4 text-sm text-neutral-400">{article.closing}</p>
          {state.brand.blogName ? (
            <p className="mt-1 text-xs text-neutral-600">— {state.brand.blogName}</p>
          ) : null}
        </article>
      </div>
    </div>
  );
}
