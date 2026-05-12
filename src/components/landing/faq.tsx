"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function FAQ() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: t.faq1Q, a: t.faq1A }, { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A }, { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A }, { q: t.faq6Q, a: t.faq6A },
    { q: t.faq7Q, a: t.faq7A }, { q: t.faq8Q, a: t.faq8A },
  ];

  return (
    <section id="faq" className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-500">{t.faqLabel}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t.faqTitle} <span className="glow-text">{t.faqTitleHighlight}</span></h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card overflow-hidden cursor-pointer" onClick={() => setOpen(open === i ? null : i)}>
              <div className="flex items-center justify-between p-5">
                <h3 className="text-sm font-medium pr-8">{faq.q}</h3>
                <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                  <Plus className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                </motion.div>
              </div>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-zinc-500 leading-relaxed border-t border-white/[0.04] pt-4">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
