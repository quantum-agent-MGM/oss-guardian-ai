"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "OSS Guardian AI encontró un SQL injection que todo mi equipo pasó por alto. Es como tener un security engineer 24/7 que nunca duerme y conoce nuestra codebase mejor que yo.",
    author: "Alex Rivera",
    role: "Maintainer · 2.3k ⭐ repo · Full-stack OSS",
    stars: 5,
  },
  {
    quote:
      "Los comentarios son tan naturales y contextuales que mis contributors piensan que es un senior engineer de verdad. El CHANGELOG automático me ahorra 2 horas por release. ROI positivo desde el primer mes.",
    author: "Sarah Chen",
    role: "Lead Developer · SaaS B2B · Next.js + TypeScript",
    stars: 5,
  },
  {
    quote:
      "Conecté 4 repos en 5 minutos. La primera review llegó antes de que terminara mi café. El OSS Health Score es adictivo — finalmente sé qué tan saludable está mi proyecto comparado con la industria.",
    author: "Marcus Johnson",
    role: "Core Maintainer · 850 ⭐ repo · Python OSS",
    stars: 5,
  },
  {
    quote:
      "Lo uso en 3 proyectos con +500 PRs al mes. El security scanner me salvó de publicar una API key en un commit público. Vale cada centavo.",
    author: "Elena Kowalski",
    role: "Engineering Lead · Fintech · Go + Rust microservices",
    stars: 5,
  },
  {
    quote:
      "Migré de CodeRabbit a OSS Guardian AI porque las reviews son mucho más profundas y específicas a mi codebase. Además el dashboard de Health Score me ayuda a priorizar qué issues atacar.",
    author: "David Park",
    role: "OSS Maintainer · 12k ⭐ repo · React ecosystem",
    stars: 5,
  },
  {
    quote:
      "La integración con GitHub fue literalmente 2 clics. A los 3 minutos ya tenía mi primera review. Ahora mi equipo duerme tranquilo sabiendo que hay un guardián revisando cada PR.",
    author: "Laura Müller",
    role: "CTO · Startup 8 personas · TypeScript monorepo",
    stars: 4,
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export function Testimonials() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonialIndex =
    ((page % testimonials.length) + testimonials.length) % testimonials.length;

  const paginate = useCallback((newDirection: number) => {
    setPage(([prev]) => [prev + newDirection, newDirection]);
  }, []);

  const goTo = useCallback((index: number) => {
    setPage(([prev]) => [index, index > prev ? 1 : -1]);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, paginate]);

  const t = testimonials[testimonialIndex];

  return (
    <section
      id="testimonials"
      className="px-6 py-24 sm:px-8 lg:px-12 bg-white/[0.01]"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-500">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Lo que dicen los{" "}
            <span className="glow-text">maintainers</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.08] text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="Anterior testimonio"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.08] text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Carousel card */}
          <div className="overflow-hidden px-2 sm:px-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="glass-card p-8 sm:p-12"
              >
                <div className="flex flex-col items-center text-center">
                  <Quote className="h-8 w-8 text-emerald-500/60 mb-6" />

                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <span key={j} className="text-amber-400 text-lg">
                        ★
                      </span>
                    ))}
                    {Array.from({ length: 5 - t.stars }).map((_, j) => (
                      <span key={`empty-${j}`} className="text-zinc-700 text-lg">
                        ★
                      </span>
                    ))}
                  </div>

                  <blockquote className="text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-2xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="mt-8 pt-6 border-t border-white/[0.04] w-full max-w-xs">
                    <p className="text-sm font-semibold text-zinc-200">
                      {t.author}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile arrows (below card) */}
          <div className="flex justify-center gap-4 mt-6 sm:hidden">
            <button
              onClick={() => paginate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.08] text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Anterior testimonio"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.08] text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === testimonialIndex
                    ? "w-6 bg-emerald-500"
                    : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
                aria-label={`Ir al testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
