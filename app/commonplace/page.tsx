import Link from "next/link";
import CommonplaceBook from "@/components/CommonplaceBook";

export default function CommonplacePage() {
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
          The Commonplace Book
        </h1>
        <p className="text-parchment/70 text-sm sm:text-base mt-2 max-w-2xl">
          Your saved citations — the Scripture, Councils, and Fathers you&rsquo;ve
          gathered into your own arsenal. Save more with the ☆ beside any
          citation while you drill.
        </p>
      </header>

      <CommonplaceBook />
    </div>
  );
}
