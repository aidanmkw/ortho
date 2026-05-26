import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ProgressProvider } from "@/components/ProgressProvider";
import RankUpBanner from "@/components/RankUpBanner";
import ChantController from "@/components/ChantController";
import DailyDevotional from "@/components/DailyDevotional";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Orthodox Apologist",
  description:
    "Gamified training in Eastern Orthodox theology, history, and apologetics. Every answer cited from Scripture, Council, or Father.",
  manifest:
    (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Apologist",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      {
        url:
          (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0a08",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProgressProvider>
        <RankUpBanner />
        <DailyDevotional />
        <div className="min-h-screen">
          <header className="border-b border-gold/20 sticky top-0 z-30 bg-[#0c0a08]/95 backdrop-blur">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
              <Link href="/" className="flex items-center gap-2 sm:gap-3 no-underline min-w-0">
                <span className="text-gold text-2xl shrink-0">☦</span>
                <div className="min-w-0">
                  <div className="text-parchment text-sm sm:text-base font-semibold tracking-wide truncate">
                    THE ORTHODOX APOLOGIST
                  </div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-gold/70 hidden sm:block">
                    Be ready always · 1 Peter 3:15
                  </div>
                </div>
              </Link>
              <nav className="flex gap-1 sm:gap-2 text-[10px] sm:text-xs shrink-0">
                <Link
                  href="/"
                  className="text-parchment/80 hover:text-gold px-2 py-1 rounded hover:bg-gold/5"
                >
                  Home
                </Link>
                <Link
                  href="/quest"
                  className="text-parchment/80 hover:text-gold px-2 py-1 rounded hover:bg-gold/5"
                >
                  ⚔ Quest
                </Link>
                <Link
                  href="/daily"
                  className="text-parchment/80 hover:text-gold px-2 py-1 rounded hover:bg-gold/5"
                >
                  Daily
                </Link>
                <Link
                  href="/review"
                  className="text-parchment/80 hover:text-gold px-2 py-1 rounded hover:bg-gold/5"
                >
                  Review
                </Link>
                <Link
                  href="/settings"
                  className="text-parchment/80 hover:text-gold px-2 py-1 rounded hover:bg-gold/5"
                  aria-label="Settings"
                >
                  ⚙
                </Link>
                <ChantController />
              </nav>
            </div>
          </header>
          <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-24 sm:pb-10">{children}</main>
          <footer className="border-t border-gold/20 mt-12 sm:mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-xs text-parchment/50 flex justify-between flex-wrap gap-2">
              <span>Δόξα τῷ Θεῷ πάντων ἕνεκεν</span>
              <span>v0.2 — content in formation</span>
            </div>
          </footer>
        </div>
        </ProgressProvider>
      </body>
    </html>
  );
}
