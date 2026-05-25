import LibraryBrowser from "@/components/LibraryBrowser";
import { saints } from "@/lib/saints";
import Link from "next/link";

export default function LibraryPage() {
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
          The Library
        </h1>
        <p className="text-parchment/70 text-sm sm:text-base mt-2 max-w-2xl">
          Lives of the saints — a cloud of witnesses (Heb 12:1).
          Read alphabetically, by feast day, or open a random life.
          {saints.length} saints in the library.
        </p>
      </header>

      <LibraryBrowser />
    </div>
  );
}
