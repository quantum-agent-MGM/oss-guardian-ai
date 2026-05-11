import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { DemoPreview } from "@/components/landing/demo-preview";
import { SocialProof } from "@/components/landing/social-proof";
import { CTA } from "@/components/landing/cta";

export const metadata: Metadata = {
  title: "OSS Guardian AI — AI-Powered Open Source Maintenance",
  description:
    "Auto-review PRs, detect security bugs, generate changelogs, and get an OSS Health Score. Like having a senior engineer reviewing every PR, 24/7.",
  openGraph: {
    title: "OSS Guardian AI — AI-Powered OSS Maintenance",
    description:
      "Auto-review PRs, detect security bugs, generate changelogs. $29/mo.",
    url: "https://oss-guardian.ai",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <Hero />
      <DemoPreview />
      <Features />
      <SocialProof />
      <Pricing />
      <CTA />
    </main>
  );
}
