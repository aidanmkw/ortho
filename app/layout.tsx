import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Orthodox Apologist",
  description:
    "Gamified training in Eastern Orthodox theology, history, and apologetics. Every answer cited from Scripture, Council, or Father.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-gold/20">
            <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
              <a href="/" className="flex items-center gap-3 no-underline">
                <span className="text-gold text-2xl">☦</span>
                <div>
                  <div className="text-parchment text-lg font-semibold tracking-wide">
                    THE ORTHODOX APOLOGIST
                  </div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gold/70">
                    Be ready always · 1 Peter 3:15
                  </div>
                </div>
              </a>
              <nav className="hidden md:flex gap-6 text-sm">
                <a href="/" className="text-parchment/80 hover:text-gold">Stages</a>
              </nav>
            </div>
          </header>
          <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
          <footer className="border-t border-gold/20 mt-20">
            <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-parchment/50 flex justify-between">
              <span>Δόξα τῷ Θεῷ πάντων ἕνεκεν</span>
              <span>v0.1 — content in formation</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
