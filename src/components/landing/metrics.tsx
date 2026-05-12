"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface MetricItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

const metrics: MetricItem[] = [
  { value: 2400, suffix: "+", label: "Repos protegidos" },
  { value: 18500, suffix: "+", label: "PRs revisadas" },
  { value: 99, suffix: "%", label: "Uptime SLA" },
  { value: 12, suffix: " min", label: "Tiempo promedio de review" },
];

function AnimatedCounter({
  value,
  suffix,
  prefix = "",
}: {
  value: number;
  suffix: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("es-ES")}
      {suffix}
    </span>
  );
}

export function Metrics() {
  return (
    <section className="px-6 py-20 sm:px-8 lg:px-12 bg-white/[0.01]">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-500">
            Impacto real
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Cifras que <span className="glow-text">hablan</span>
          </h2>
          <p className="mt-3 text-zinc-500 max-w-xl mx-auto">
            Estos números crecen cada día mientras más equipos confían en OSS Guardian AI para proteger su código.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
                <AnimatedCounter
                  value={m.value}
                  suffix={m.suffix}
                  prefix={m.prefix}
                />
              </div>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
