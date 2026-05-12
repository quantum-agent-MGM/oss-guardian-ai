"use client";

import { motion } from "framer-motion";
import { VolumeX, Target, DollarSign, GitPullRequest, ClipboardCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function WhyChoose() {
  const { t } = useLanguage();
  const reasons = [
    { icon: VolumeX, title: t.whyLowNoiseTitle, desc: t.whyLowNoiseDesc },
    { icon: ClipboardCheck, title: t.whySpecTitle, desc: t.whySpecDesc },
    { icon: Target, title: t.whyOSSTitle, desc: t.whyOSSDesc },
    { icon: DollarSign, title: t.whyPriceTitle, desc: t.whyPriceDesc },
    { icon: GitPullRequest, title: t.whyIntegrateTitle, desc: t.whyIntegrateDesc },
  ];

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-12 bg-white/[0.01]">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-500">{t.whyLabel}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t.whyTitle} <span className="glow-text">{t.whyTitleHighlight}</span></h2>
          <p className="mt-3 text-zinc-500 max-w-xl mx-auto">{t.whySub}</p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass-card p-6 flex gap-4">
              <div className="inline-flex rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-2.5 text-emerald-400 h-fit"><r.icon className="h-5 w-5" /></div>
              <div><h3 className="font-semibold text-base">{r.title}</h3><p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">{r.desc}</p></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
