import Link from "next/link";
import PipelineBoard from "@/components/outreach/PipelineBoard";

const STEPS = [
  { n: "1", title: "Find creators", body: "Build a prospect list from the discovery tools.", href: "/outreach/prospects", cta: "Prospects" },
  { n: "2", title: "Slide in", body: "Generate a friendly, honest DM offering a free feature.", href: "/outreach/dm", cta: "DM Studio" },
  { n: "3", title: "Humanize the post", body: "Turn their top post into a real article — in your browser.", href: "/outreach/humanizer", cta: "Humanizer" },
  { n: "4", title: "Build carousels", body: "Slice the article into Instagram slides and export PNGs.", href: "/outreach/carousel", cta: "Carousel" },
];

export default function OutreachHome() {
  return (
    <div>
      <section className="mb-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          Be your own Forbes — for free
        </p>
        <h1 className="mt-2 max-w-2xl text-2xl font-bold leading-tight text-neutral-50 sm:text-3xl">
          Feature creators, don&apos;t charge them $5,000 a year.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">
          Forbes makes ~$300M/yr letting people pay to say &ldquo;as seen on Forbes.&rdquo; This is the
          opposite: a tiny toolkit to find creators, offer them a genuine free feature, turn their
          best post into a humanized article, and spin up Instagram carousels. Runs entirely in your
          browser — no servers, no API keys, no fees.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/outreach/prospects"
            className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-black no-underline hover:bg-amber-300"
          >
            Start prospecting →
          </Link>
          <Link
            href="/outreach/humanizer"
            className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-neutral-200 no-underline hover:bg-white/5"
          >
            Try the humanizer
          </Link>
        </div>
      </section>

      <section className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <Link
            key={s.n}
            href={s.href}
            className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 no-underline transition hover:border-amber-400/40 hover:bg-white/[0.05]"
          >
            <div className="mb-2 grid h-8 w-8 place-items-center rounded-lg bg-amber-400/15 text-sm font-bold text-amber-300">
              {s.n}
            </div>
            <div className="font-semibold text-neutral-100">{s.title}</div>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500">{s.body}</p>
            <span className="mt-2 inline-block text-xs font-semibold text-amber-300 group-hover:underline">
              {s.cta} →
            </span>
          </Link>
        ))}
      </section>

      <PipelineBoard />
    </div>
  );
}
