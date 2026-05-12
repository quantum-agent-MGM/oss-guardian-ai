"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/github-icon";
import { useLanguage } from "@/lib/i18n";

export function Pricing() {
  const { t } = useLanguage();

  const plans = [
    {
      name: t.starterName, price: t.starterPrice, period: t.starterPeriod, desc: t.starterDesc,
      href: "https://whop.com/checkout/ch_BfnWOEryPKylvZx/", badge: null,
      features: [t.starterF1, t.starterF2, t.starterF3, t.starterF4, t.starterF5],
    },
    {
      name: t.proName, price: t.proPrice, period: t.proPeriod, desc: t.proDesc,
      href: "https://whop.com/checkout/ch_0OXFoUYPKA3So8x/", badge: t.proBadge,
      features: [t.proF1, t.proF2, t.proF3, t.proF4, t.proF5, t.proF6, t.proF7, t.proF8, t.proF9],
    },
  ];

  return (
    <section id="pricing" className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-500">{t.pricingLabel}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t.pricingTitle} <span className="glow-text">{t.pricingTitleHighlight}</span></h2>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-6 py-2 text-base text-emerald-300 font-medium">
            <Sparkles className="h-4 w-4 text-emerald-400" />{t.pricingBadge}
          </div>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`glass-card relative p-8 flex flex-col ${plan.badge ? "border-emerald-500/20" : ""}`}>
              {plan.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500/90 text-black px-4 py-1 text-xs font-semibold">{plan.badge}</span>}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <div className="mt-3"><span className="text-4xl font-bold">{plan.price}</span><span className="text-zinc-500">{plan.period}</span></div>
              <p className="mt-1 text-sm text-zinc-500">{plan.desc}</p>
              <ul className="mt-6 space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" /><span className="text-zinc-400">{f}</span></li>
                ))}
              </ul>
              <a href={plan.href} target="_blank" rel="noopener"
                className={`mt-8 glass-btn inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold ${plan.badge ? "glass-btn-primary" : ""}`}>
                {t.starterCTA}<ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5 text-emerald-400"><Sparkles className="h-4 w-4" />{t.pricingTrust1}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" /><span>{t.pricingTrust2}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" /><span>{t.pricingTrust3}</span>
          </div>
          <div className="mt-2 rounded-2xl border border-emerald-500/15 bg-gradient-to-r from-emerald-500/[0.06] to-transparent px-8 py-5 text-center max-w-xl">
            <p className="text-base text-emerald-300 font-semibold flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              {t.pricingGuarantee}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
