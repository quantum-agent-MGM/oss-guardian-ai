"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Acme Corp", initials: "AC" },
  { name: "TechStart", initials: "TS" },
  { name: "OpenAI", initials: "OA" },
  { name: "Vercel", initials: "VE" },
  { name: "Supabase", initials: "SB" },
];

export function SocialProof() {
  return (
    <section className="px-6 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-medium text-zinc-500 uppercase tracking-wider"
        >
          Trusted by OSS maintainers
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap items-center justify-center gap-8"
        >
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-sm font-bold text-zinc-400"
              title={logo.name}
            >
              {logo.initials}
            </div>
          ))}
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 text-lg text-zinc-400 italic max-w-2xl mx-auto"
        >
          &ldquo;OSS Guardian AI caught a critical SQL injection in our PR that
          our team missed. It&apos;s like having a security engineer reviewing
          every single commit.&rdquo;
          <footer className="mt-3 text-sm text-zinc-500 not-italic">
            — Maintainer of a 2,000+ star OSS project
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
