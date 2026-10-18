import type { Metadata, Viewport } from "next";
import { Cormorant, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import TransitionProvider from "@/components/providers/TransitionProvider";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Talenmark Group — Structure & Sanctuary",
    template: "%s — Talenmark Group",
  },
  description:
    "Talenmark Group, Calicut. Real estate, construction & township development, and hospitality — building the future, preserving the legacy.",
};

export const viewport: Viewport = {
  themeColor: "#151210",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${hanken.variable} ${plexMono.variable} is-loading`}
    >
      <body>
        <SmoothScroll>
          <TransitionProvider>
            <Nav />
            {children}
            <Loader />
          </TransitionProvider>
        </SmoothScroll>
        <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden opacity-[0.07]" aria-hidden="true">
          <div className="grain absolute -inset-[50%]" />
        </div>
        <Cursor />
      </body>
    </html>
  );
}
