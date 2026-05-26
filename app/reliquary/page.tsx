import Link from "next/link";
import Reliquary from "@/components/Reliquary";

export default function ReliquaryPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-gold/80 hover:text-gold no-underline"
        >
          ← Back to the Study
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl text-parchment leading-tight">
          The Reliquary
        </h1>
        <p className="text-parchment/70 text-sm sm:text-base mt-2 max-w-2xl">
          Sayings of the Fathers and holy relics, gathered one at a time by
          keeping the Daily Trial.
        </p>
      </header>

      <Reliquary />
    </div>
  );
}
