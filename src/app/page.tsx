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
  title: "OSS Guardian AI — Tu Agente AI que revisa PRs mientras duermes",
  description:
    "Detecta bugs de seguridad, genera comentarios humanos profesionales, crea fixes automáticos y changelog. Ahorra 10+ horas/semana en mantenimiento OSS.",
  openGraph: {
    title: "OSS Guardian AI — AI-Powered OSS Maintenance",
    description: "Auto-review PRs, detect security bugs, generate changelogs. $29/mo.",
    url: "https://oss-guardian.ai",
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
