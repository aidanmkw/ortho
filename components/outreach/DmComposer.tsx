"use client";

import { useEffect, useMemo, useState } from "react";
import { useOutreach } from "@/components/outreach/OutreachProvider";
import { CopyButton, Field, inputCls } from "@/components/outreach/ui";
import { DM_TEMPLATES, fillTemplate } from "@/lib/outreach/templates";
import { platformMeta } from "@/lib/outreach/types";

export default function DmComposer() {
  const { state, hydrated, setStage } = useOutreach();
  const [templateId, setTemplateId] = useState(DM_TEMPLATES[0].id);
  const [influencerId, setInfluencerId] = useState<string>("");
  const [manualName, setManualName] = useState("");
  const [manualTopic, setManualTopic] = useState("");
  const [text, setText] = useState("");

  const template = DM_TEMPLATES.find((t) => t.id === templateId) ?? DM_TEMPLATES[0];
  const influencer = state.influencers.find((i) => i.id === influencerId) ?? null;

  const target = useMemo(
    () =>
      influencer
        ? { name: influencer.name || influencer.handle, niche: influencer.niche }
        : { name: manualName, niche: manualTopic },
    [influencer, manualName, manualTopic]
  );

  // Re-fill the editable body whenever the template or target changes.
  useEffect(() => {
    setText(fillTemplate(template.body, target, state.brand));
  }, [template.body, target, state.brand]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-5">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Who are you DMing?
          </h2>
          <Field label="Pick from your list">
            <select
              className={inputCls}
              value={influencerId}
              onChange={(e) => setInfluencerId(e.target.value)}
              disabled={!hydrated}
            >
              <option value="">— manual entry —</option>
              {state.influencers.map((i) => {
                const pm = platformMeta(i.platform);
                return (
                  <option key={i.id} value={i.id}>
                    {pm.glyph} {i.name || i.handle} · {i.niche || "?"}
                  </option>
                );
              })}
            </select>
          </Field>
          {!influencer ? (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Name">
                <input className={inputCls} value={manualName} onChange={(e) => setManualName(e.target.value)} placeholder="Maya" />
              </Field>
              <Field label="Topic">
                <input className={inputCls} value={manualTopic} onChange={(e) => setManualTopic(e.target.value)} placeholder="no-code SaaS" />
              </Field>
            </div>
          ) : null}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">Angle</h2>
          <div className="flex flex-wrap gap-2">
            {DM_TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplateId(t.id)}
                className={`rounded-lg border px-3 py-2 text-left text-xs transition ${
                  t.id === templateId
                    ? "border-amber-400/60 bg-amber-400/10 text-amber-200"
                    : "border-white/10 bg-black/20 text-neutral-300 hover:bg-white/5"
                }`}
              >
                <div className="font-semibold">{t.label}</div>
                <div className="text-[10px] uppercase tracking-wide opacity-70">{t.tag}</div>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-3">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">Your DM</h2>
            <CopyButton text={text} label="Copy DM" />
          </div>
          <textarea
            className={`${inputCls} min-h-[180px] resize-y leading-relaxed`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <p className="mt-2 text-[11px] text-neutral-600">
            Edit freely before you send. Keep it honest — you&apos;re offering a real free feature, not
            charging for it.
          </p>
          {influencer ? (
            <button
              type="button"
              onClick={() => setStage(influencer.id, "contacted")}
              disabled={influencer.stage !== "prospect"}
              className="mt-3 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-xs font-semibold text-amber-300 enabled:hover:bg-amber-400/20 disabled:opacity-40"
            >
              {influencer.stage === "prospect" ? `Mark ${influencer.name || influencer.handle} as DM sent` : "Already contacted ✓"}
            </button>
          ) : null}
        </section>

        <p className="px-1 text-[11px] leading-relaxed text-neutral-600">
          Send from the platform&apos;s own DM/inbox. Bulk-DM tools can get accounts flagged — a handful
          of genuine, personalized messages beats a spray of a thousand.
        </p>
      </div>
    </div>
  );
}
