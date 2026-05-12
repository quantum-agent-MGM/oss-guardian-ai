"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/ui/github-icon";
import { useLanguage } from "@/lib/i18n";

export function CTA() {
  const { t } = useLanguage();
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-12">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mx-auto max-w-3xl rounded-3xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-zinc-900/50 backdrop-blur-sm p-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.ctaTitle}</h2>
        <p className="mt-4 text-zinc-400 max-w-lg mx-auto">{t.ctaSub}</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/auth/signin" className="glass-btn glass-btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg rounded-xl animate-pulse-glow">
            <GithubIcon className="h-5 w-5" />{t.ctaButton}<ArrowRight className="h-5 w-5" />
          </a>
          <a href="https://github.com/quantum-agent-MGM/oss-guardian-ai" target="_blank" rel="noopener"
            className="glass-btn inline-flex items-center gap-2 px-8 py-4 text-lg rounded-xl">
            <GithubIcon className="h-5 w-5" />{t.ctaStar}
          </a>
        </div>
        <p className="mt-5 text-xs text-zinc-600">{t.ctaFree}</p>
      </motion.div>
    </section>
  );
}
