import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollManager } from "@/components/layout/scroll-manager";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OSS Guardian AI — AI-Powered OSS Maintenance",
    template: "%s | OSS Guardian AI",
  },
  description:
    "Auto-review PRs, detect security bugs, generate changelogs. $29/mo. 7-day free trial.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-zinc-100`}
      >
        <ScrollManager />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
