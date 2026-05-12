"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MessageSquare, FileText, BarChart3, Filter, Code2 } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Security Auditor IA",
    desc: "Detecta prompt injection, secretos expuestos, vulnerabilidades AI y CVEs en <8 segundos. Bloquea merges con riesgo crítico automáticamente.",
    size: "md",
    color: "emerald",
  },
  {
    icon: MessageSquare,
    title: "Comentarios Ultra-Humanos",
    desc: "Nunca más \"AI slop\". Tono profesional de senior dev, sugerencias accionables, referencias a líneas exactas. Tus contributors creen que eres tú.",
    size: "sm",
    color: "blue",
  },
  {
    icon: Filter,
    title: "Low-Noise by Design",
    desc: "Solo flags issues reales. Zero spam. Si no hay nada que reportar, no comenta. 94% menos ruido que otros AI reviewers. Tus devs aman abrir PRs.",
    size: "sm",
    color: "cyan",
  },
  {
    icon: BarChart3,
    title: "OSS Health Score",
    desc: "Score 0-100 semanal + tendencias. PR velocity, bug density, dependency freshness. Comparado contra el top 10% de GitHub. Obsesivamente accionable.",
    size: "md",
    color: "amber",
  },
  {
    icon: FileText,
    title: "Auto CHANGELOG",
    desc: "Markdown perfecto en cada merge. Categoriza features, fixes, breaking changes. Listo para GitHub Releases. Tus usuarios lo notan.",
    size: "sm",
    color: "purple",
  },
  {
    icon: Code2,
    title: "Auto-Fix Suggestions",
    desc: "No solo señala — sugiere el fix exacto con diff aplicable. Copy-paste o commit directo. Tu equipo aprende de cada review.",
    size: "sm",
    color: "rose",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  emerald: { bg: "bg-emerald-500/5", border: "border-emerald-500/15", text: "text-emerald-400", glow: "shadow-emerald-500/10" },
  blue: { bg: "bg-blue-500/5", border: "border-blue-500/15", text: "text-blue-400", glow: "shadow-blue-500/10" },
  purple: { bg: "bg-purple-500/5", border: "border-purple-500/15", text: "text-purple-400", glow: "shadow-purple-500/10" },
  amber: { bg: "bg-amber-500/5", border: "border-amber-500/15", text: "text-amber-400", glow: "shadow-amber-500/10" },
  cyan: { bg: "bg-cyan-500/5", border: "border-cyan-500/15", text: "text-cyan-400", glow: "shadow-cyan-500/10" },
  rose: { bg: "bg-rose-500/5", border: "border-rose-500/15", text: "text-rose-400", glow: "shadow-rose-500/10" },
};

export function FeaturesBento() {
  return (
    <section id="features" className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-500">Features</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Mantenimiento OSS{" "}
            <span className="glow-text">sin fricción</span>
          </h2>
          <p className="mt-3 text-zinc-500 max-w-xl mx-auto">
            Todo lo que tu proyecto open-source necesita en un solo agente. Sin YAML, sin CI scripts, sin configs interminables.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const c = colorMap[f.color];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`glass-card p-6 flex flex-col gap-4 group ${
                  f.size === "md" ? "sm:col-span-2" : ""
                }`}
              >
                <div className={`inline-flex rounded-xl ${c.bg} border ${c.border} p-2.5 ${c.text}`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
