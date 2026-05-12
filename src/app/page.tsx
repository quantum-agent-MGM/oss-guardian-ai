import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { TrustBar } from "@/components/landing/trust-bar";
import { FeaturesBento } from "@/components/landing/features-bento";
import { HowItWorks } from "@/components/landing/how-it-works";
import { DemoInteractive } from "@/components/landing/demo-interactive";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";

export const metadata: Metadata = {
  title: "OSS Guardian AI — El AI que revisa tus PRs como un senior maintainer 24/7",
  description:
    "Ahorra 10+ horas/semana. El AI que revisa tus PRs como un senior maintainer 24/7. Detecta bugs de seguridad reales, comentarios humanos, auto-changelog y OSS Health Score. Bajo ruido por diseño. 7 días gratis.",
  openGraph: {
    title: "OSS Guardian AI — AI Code Review, Sin Ego, 24/7",
    description: "Save 10+ hrs/week on PR review. Real security detection, human-style comments, auto-changelog, OSS Health Score. 7-day free trial.",
    url: "https://guardian.vortexaisolutions.online",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      <TrustBar />
      <FeaturesBento />
      <HowItWorks />
      <DemoInteractive />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  );
}
