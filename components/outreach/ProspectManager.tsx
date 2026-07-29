"use client";

import { useState } from "react";
import { useOutreach } from "@/components/outreach/OutreachProvider";
import { Field, inputCls } from "@/components/outreach/ui";
import { DISCOVERY_TOOLS } from "@/lib/outreach/discovery";
import {
  PLATFORMS,
  STAGES,
  platformMeta,
  type Influencer,
  type Platform,
  type Stage,
} from "@/lib/outreach/types";

interface Draft {
  name: string;
  handle: string;
  platform: Platform;
  niche: string;
  followers: string;
  topPost: string;
  email: string;
  notes: string;
  stage: Stage;
}

const emptyDraft: Draft = {
  name: "",
  handle: "",
  platform: "instagram",
  niche: "",
  followers: "",
  topPost: "",
  email: "",
  notes: "",
  stage: "prospect",
};

export default function ProspectManager() {
  const { state, hydrated, addInfluencer, updateInfluencer, removeInfluencer, setBrand } =
    useOutreach();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.handle.trim() && !draft.name.trim()) return;
    const payload = {
      name: draft.name.trim(),
      handle: draft.handle.trim(),
      platform: draft.platform,
      niche: draft.niche.trim(),
      followers: Math.max(0, parseInt(draft.followers, 10) || 0),
      topPost: draft.topPost.trim(),
      email: draft.email.trim(),
      notes: draft.notes.trim(),
      stage: draft.stage,
    };
    if (editingId) {
      updateInfluencer(editingId, payload);
      setEditingId(null);
    } else {
      addInfluencer(payload);
    }
    setDraft(emptyDraft);
  };

  const startEdit = (inf: Influencer) => {
    setEditingId(inf.id);
    setDraft({
      name: inf.name,
      handle: inf.handle,
      platform: inf.platform,
      niche: inf.niche,
      followers: String(inf.followers || ""),
      topPost: inf.topPost,
      email: inf.email,
      notes: inf.notes,
      stage: inf.stage,
    });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(emptyDraft);
  };

  return (
    <div className="space-y-8">
      {/* Brand settings */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="mb-1 text-lg font-bold text-neutral-100">Your brand</h2>
        <p className="mb-4 text-xs text-neutral-500">
          This is the &ldquo;little blog and shit&rdquo; you&apos;re building. It fills into every DM,
          article, and carousel.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Blog / page name">
            <input
              className={inputCls}
              value={state.brand.blogName}
              onChange={(e) => setBrand({ blogName: e.target.value })}
              placeholder="The Signal"
            />
          </Field>
          <Field label="Your name">
            <input
              className={inputCls}
              value={state.brand.yourName}
              onChange={(e) => setBrand({ yourName: e.target.value })}
              placeholder="Alex"
            />
          </Field>
          <Field label="Your handle">
            <input
              className={inputCls}
              value={state.brand.yourHandle}
              onChange={(e) => setBrand({ yourHandle: e.target.value })}
              placeholder="@thesignal"
            />
          </Field>
        </div>
      </section>

      {/* Add / edit prospect */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="mb-4 text-lg font-bold text-neutral-100">
          {editingId ? "Edit prospect" : "Add a prospect"}
        </h2>
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
          <Field label="Name">
            <input className={inputCls} value={draft.name} onChange={(e) => set("name", e.target.value)} placeholder="Maya" />
          </Field>
          <Field label="Handle">
            <input className={inputCls} value={draft.handle} onChange={(e) => set("handle", e.target.value)} placeholder="@mayabuilds" />
          </Field>
          <Field label="Platform">
            <select
              className={inputCls}
              value={draft.platform}
              onChange={(e) => set("platform", e.target.value as Platform)}
            >
              {PLATFORMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Niche / topic">
            <input className={inputCls} value={draft.niche} onChange={(e) => set("niche", e.target.value)} placeholder="no-code SaaS" />
          </Field>
          <Field label="Followers">
            <input
              className={inputCls}
              inputMode="numeric"
              value={draft.followers}
              onChange={(e) => set("followers", e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="48000"
            />
          </Field>
          <Field label="Stage">
            <select
              className={inputCls}
              value={draft.stage}
              onChange={(e) => set("stage", e.target.value as Stage)}
            >
              {STAGES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Top post" hint="A URL or a one-line description — the Humanizer can pull this in.">
              <input className={inputCls} value={draft.topPost} onChange={(e) => set("topPost", e.target.value)} placeholder="Carousel: 'I shipped 3 apps with zero code'" />
            </Field>
          </div>
          <Field label="Email (optional)">
            <input className={inputCls} value={draft.email} onChange={(e) => set("email", e.target.value)} placeholder="maya@example.com" />
          </Field>
          <Field label="Notes (optional)">
            <input className={inputCls} value={draft.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Replied warm, wants a draft first" />
          </Field>
          <div className="flex items-center gap-2 sm:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-300"
            >
              {editingId ? "Save changes" : "+ Add prospect"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg border border-white/15 px-4 py-2 text-sm text-neutral-300 hover:bg-white/5"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </section>

      {/* Roster */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">
          Your list {hydrated ? `(${state.influencers.length})` : ""}
        </h2>
        {!hydrated ? (
          <div className="py-10 text-center text-sm text-neutral-500">Loading…</div>
        ) : state.influencers.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-sm text-neutral-600">
            No prospects yet. Add one above.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-3 py-2">Creator</th>
                  <th className="px-3 py-2">Niche</th>
                  <th className="px-3 py-2">Followers</th>
                  <th className="px-3 py-2">Stage</th>
                  <th className="px-3 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.influencers.map((inf) => {
                  const pm = platformMeta(inf.platform);
                  return (
                    <tr key={inf.id} className="border-t border-white/5">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-base ${pm.tone}`}>{pm.glyph}</span>
                          <div className="min-w-0">
                            <div className="font-medium text-neutral-100">{inf.name || inf.handle}</div>
                            <div className="text-xs text-neutral-500">{inf.handle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-neutral-400">{inf.niche || "—"}</td>
                      <td className="px-3 py-2 text-neutral-400">{inf.followers.toLocaleString()}</td>
                      <td className="px-3 py-2">
                        <select
                          className="rounded border border-white/10 bg-black/30 px-2 py-1 text-xs text-neutral-200"
                          value={inf.stage}
                          onChange={(e) => updateInfluencer(inf.id, { stage: e.target.value as Stage })}
                        >
                          {STAGES.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => startEdit(inf)}
                            className="rounded border border-white/10 px-2 py-1 text-xs text-neutral-300 hover:bg-white/5"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => removeInfluencer(inf.id)}
                            className="rounded border border-white/10 px-2 py-1 text-xs text-neutral-500 hover:bg-red-500/10 hover:text-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Discovery directory */}
      <section>
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-neutral-400">
          Where to find creators
        </h2>
        <p className="mb-3 text-xs text-neutral-500">
          Discovery platforms to source prospects from. Pick ones that expose emails if you want to
          reach out off-platform.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DISCOVERY_TOOLS.map((t) => (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 no-underline transition hover:border-amber-400/40 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-sm font-bold text-neutral-200">
                    {t.glyph}
                  </span>
                  <span className="font-semibold text-neutral-100">{t.name}</span>
                </div>
                {t.emails ? (
                  <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                    emails
                  </span>
                ) : null}
              </div>
              <div className="mt-2 text-xs font-medium text-amber-300/80">{t.reach}</div>
              <p className="mt-1 text-xs leading-relaxed text-neutral-500">{t.blurb}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
