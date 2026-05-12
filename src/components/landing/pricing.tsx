"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/github-icon";

const plans = [
  {
    name: "Starter",
    price: "$19",
    period: "/mes",
    desc: "Ideal para maintainers individuales.",
    href: "https://whop.com/checkout/ch_BfnWOEryPKylvZx/",
    badge: null,
    features: [
      "Hasta 3 repositorios",
      "AI PR review (100 PRs/mes)",
      "Security scanner básico",
      "CHANGELOG generator",
      "Soporte comunidad",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mes",
    desc: "Equipos y repos grandes.",
    href: "https://whop.com/checkout/ch_0OXFoUYPKA3So8x/",
    badge: "Más Popular",
    features: [
      "Repositorios ilimitados",
      "AI PR review ilimitado",
      "Security scanner avanzado",
      "OSS Health Score dashboard",
      "Auto-fix suggestions",
      "Reglas de review custom",
              "Prioridad en procesamiento + Auto-Fix avanzado",
              "Spec Compliance Guard",
              "Soporte prioritario",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-500">Pricing</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple,{" "}
            <span className="glow-text">transparente</span>
          </h2>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 text-sm text-zinc-400">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            Cancela cuando quieras · 7 días gratis · Primer mes free si no ahorras 5+ horas
          </div>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card relative p-8 flex flex-col ${
                plan.badge ? "border-emerald-500/20" : ""
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500/90 text-black px-4 py-1 text-xs font-semibold">
                  {plan.badge}
                </span>
              )}

              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <div className="mt-3">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-zinc-500">{plan.period}</span>
              </div>
              <p className="mt-1 text-sm text-zinc-500">{plan.desc}</p>

              <ul className="mt-6 space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                    <span className="text-zinc-400">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                target="_blank"
                rel="noopener"
                className={`mt-8 glass-btn inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold ${
                  plan.badge ? "glass-btn-primary" : ""
                }`}
              >
                Empezar prueba gratis
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Sparkles className="h-4 w-4" />
              7 días gratis
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>Sin tarjeta de crédito</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>Cancela cuando quieras</span>
          </div>
          <p className="text-sm text-zinc-500">
            <span className="text-emerald-400 font-medium">Garantía:</span> Si en tu primer mes no ahorras al menos 5 horas, te devolvemos el dinero.
          </p>
        </div>
      </div>
    </section>
  );
}
