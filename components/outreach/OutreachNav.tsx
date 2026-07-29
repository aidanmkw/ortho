"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/outreach", label: "Pipeline", exact: true },
  { href: "/outreach/prospects", label: "Prospects" },
  { href: "/outreach/dm", label: "DM Studio" },
  { href: "/outreach/humanizer", label: "Humanizer" },
  { href: "/outreach/carousel", label: "Carousel" },
];

export default function OutreachNav() {
  const pathname = usePathname() ?? "";
  // basePath is stripped from usePathname, so compare against "/outreach…".
  const active = (href: string, exact?: boolean) => {
    const p = pathname.replace(/\/$/, "");
    const h = href.replace(/\/$/, "");
    return exact ? p === h : p === h || p.startsWith(h + "/");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0b0d]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/outreach" className="flex items-center gap-2 no-underline">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-600 text-sm font-black text-black">
            ✦
          </span>
          <span className="text-sm font-bold tracking-tight text-neutral-100">
            Outreach&nbsp;Studio
          </span>
        </Link>
        <nav className="flex flex-1 flex-wrap items-center gap-1 text-xs sm:text-[13px]">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-2.5 py-1.5 no-underline transition ${
                active(l.href, l.exact)
                  ? "bg-amber-400/15 text-amber-300"
                  : "text-neutral-400 hover:bg-white/5 hover:text-neutral-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          className="text-[11px] text-neutral-500 no-underline hover:text-neutral-300"
        >
          ← Orthodox app
        </Link>
      </div>
    </header>
  );
}
