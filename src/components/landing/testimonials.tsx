"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "OSS Guardian AI encontró un SQL injection que todo mi equipo pasó por alto. Es como tener un security engineer 24/7.",
    author: "Maintainer de proyecto OSS",
    stars: 5,
  },
  {
    quote:
      "Los comentarios son tan naturales que los contributors piensan que es una persona real. El CHANGELOG automático me ahorra 2 horas por release.",
    author: "Lead Developer, SaaS startup",
    stars: 5,
  },
  {
    quote:
      "Conecté 4 repos en 5 minutos. La primera review llegó antes de que terminara mi café. El OSS Health Score es adictivo.",
    author: "Open Source Contributor",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-12 bg-white/[0.01]">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-500">Testimonials</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Lo que dicen los{" "}
            <span className="glow-text">maintainers</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <blockquote className="text-sm text-zinc-400 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="mt-4 text-xs text-zinc-600">— {t.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
