"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    { quote: t.testim1Quote, author: t.testim1Author, role: t.testim1Role, stars: 5 },
    { quote: t.testim2Quote, author: t.testim2Author, role: t.testim2Role, stars: 5 },
    { quote: t.testim3Quote, author: t.testim3Author, role: t.testim3Role, stars: 5 },
    { quote: t.testim4Quote, author: t.testim4Author, role: t.testim4Role, stars: 5 },
    { quote: t.testim5Quote, author: t.testim5Author, role: t.testim5Role, stars: 5 },
    { quote: t.testim6Quote, author: t.testim6Author, role: t.testim6Role, stars: 5 },
    { quote: t.testim7Quote, author: t.testim7Author, role: t.testim7Role, stars: 4 },
  ];

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-12 bg-white/[0.01]">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-500">{t.testimLabel}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t.testimTitle} <span className="glow-text">{t.testimTitleHighlight}</span>
          </h2>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.slice(0, 6).map((tm, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card p-6 flex flex-col">
              <div className="flex gap-1 mb-4">{Array.from({ length: tm.stars }).map((_, j) => (<span key={j} className="text-amber-400 text-sm">★</span>))}</div>
              <blockquote className="text-sm text-zinc-400 leading-relaxed flex-1">&ldquo;{tm.quote}&rdquo;</blockquote>
              <div className="mt-4 pt-3 border-t border-white/[0.04]">
                <p className="text-xs font-medium text-zinc-300">{tm.author}</p>
                <p className="text-xs text-zinc-600 mt-0.5">{tm.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
