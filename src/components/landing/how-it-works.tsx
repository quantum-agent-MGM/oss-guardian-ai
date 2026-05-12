"use client";

import { motion } from "framer-motion";
import { GitFork, Cpu, Rocket } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function HowItWorks() {
  const { t } = useLanguage();
  const steps = [
    { number: "01", icon: GitFork, title: t.howStep1Title, desc: t.howStep1Desc },
    { number: "02", icon: Cpu, title: t.howStep2Title, desc: t.howStep2Desc },
    { number: "03", icon: Rocket, title: t.howStep3Title, desc: t.howStep3Desc },
  ];

  return (
    <section id="how-it-works" className="px-6 py-24 sm:px-8 lg:px-12 bg-white/[0.01]">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-500">{t.howLabel}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t.howTitle} <span className="glow-text">{t.howTitleHighlight}</span> {t.howTitle2}</h2>
        </motion.div>
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div key={step.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="relative text-center">
              {i < steps.length - 1 && <div className="hidden sm:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />}
              <div className="glass-card inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-6 animate-float"><step.icon className="h-10 w-10 text-emerald-400" /></div>
              <div className="text-xs font-bold text-emerald-500/60 mb-2">{step.number}</div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
