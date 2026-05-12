"use client";

import { motion } from "framer-motion";

const trusts = [
  { name: "GitHub", icon: "GH" },
  { name: "Vercel", icon: "VE" },
  { name: "Next.js", icon: "NX" },
  { name: "Supabase", icon: "SB" },
];

export function TrustBar() {
  return (
    <section className="border-y border-white/[0.04] bg-white/[0.01] backdrop-blur-sm py-6">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-wider text-zinc-600"
          >
            Integraciones nativas
          </motion.span>
          {trusts.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <span className="rounded-md bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 text-xs font-mono font-bold text-zinc-400">
                {t.icon}
              </span>
              <span className="text-sm">{t.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
