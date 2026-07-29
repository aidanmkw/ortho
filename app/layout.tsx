import type { Metadata, Viewport } from "next";
import { ProgressProvider } from "@/components/ProgressProvider";
import AppFrame from "@/components/AppFrame";
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
          <AppFrame>{children}</AppFrame>
        </ProgressProvider>
      </body>
    </html>
  );
}
