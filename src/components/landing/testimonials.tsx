"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "OSS Guardian AI encontró un SQL injection que todo mi equipo pasó por alto. Es como tener un security engineer 24/7 que nunca duerme y conoce nuestra codebase mejor que yo.",
    author: "Maintainer · 2.3k ⭐ repo",
    role: "Full-stack OSS",
    stars: 5,
  },
  {
    quote:
      "Los comentarios son tan naturales y contextuales que mis contributors piensan que es un senior engineer de verdad. El CHANGELOG automático me ahorra 2 horas por release. ROI positivo desde el primer mes.",
    author: "Lead Developer · SaaS B2B",
    role: "Next.js + TypeScript",
    stars: 5,
  },
  {
    quote:
      "Conecté 4 repos en 5 minutos. La primera review llegó antes de que terminara mi café. El OSS Health Score es adictivo — finalmente sé qué tan saludable está mi proyecto comparado con la industria.",
    author: "Core Maintainer · 850 ⭐ repo",
    role: "Python OSS",
    stars: 5,
  },
  {
    quote:
      "Lo uso en 3 proyectos con +500 PRs al mes. El security scanner me salvó de publicar una API key en un commit público. Vale cada centavo.",
    author: "Engineering Lead · Fintech",
    role: "Go + Rust microservices",
    stars: 5,
  },
  {
    quote:
      "Migré de CodeRabbit a OSS Guardian AI porque las reviews son mucho más profundas y específicas a mi codebase. Además el dashboard de Health Score me ayuda a priorizar qué issues atacar.",
    author: "OSS Maintainer · 12k ⭐ repo",
    role: "React ecosystem",
    stars: 5,
  },
  {
    quote:
      "La integración con GitHub fue literalmente 2 clics. A los 3 minutos ya tenía mi primera review. Ahora mi equipo duerme tranquilo sabiendo que hay un guardián revisando cada PR.",
    author: "CTO · Startup 8 personas",
    role: "TypeScript monorepo",
    stars: 4,
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
              <div className="mt-4 pt-3 border-t border-white/[0.04]">
                <p className="text-xs font-medium text-zinc-300">{t.author}</p>
                <p className="text-xs text-zinc-600 mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
