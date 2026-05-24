import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ProgressProvider } from "@/components/ProgressProvider";
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
        <div className="min-h-screen">
          <header className="border-b border-gold/20">
            <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 no-underline">
                <span className="text-gold text-2xl">☦</span>
                <div>
                  <div className="text-parchment text-base sm:text-lg font-semibold tracking-wide">
                    THE ORTHODOX APOLOGIST
                  </div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold/70">
                    Be ready always · 1 Peter 3:15
                  </div>
                </div>
              </Link>
              <nav className="flex gap-3 sm:gap-6 text-xs sm:text-sm">
                <Link href="/" className="text-parchment/80 hover:text-gold">Stages</Link>
                <Link href="/daily" className="text-parchment/80 hover:text-gold">Daily</Link>
                <Link href="/review" className="text-parchment/80 hover:text-gold">Review</Link>
                <Link href="/settings" className="text-parchment/80 hover:text-gold">⚙</Link>
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
