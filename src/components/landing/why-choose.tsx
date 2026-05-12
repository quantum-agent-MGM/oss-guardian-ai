"use client";

import { motion } from "framer-motion";
import { VolumeX, Target, DollarSign, GitPullRequest, ClipboardCheck } from "lucide-react";

const reasons = [
  {
    icon: VolumeX,
    title: "Bajo ruido por diseño",
    desc: "No spamea. Si el código está limpio, lo dice y se calla. Tus devs no aprenden a ignorar al bot — aprenden a confiar en él. 94% menos comentarios innecesarios que otros AI reviewers.",
  },
  {
    icon: Target,
    title: "Hecho para OSS, no para enterprise",
    desc: "CodeRabbit y Greptile están construidos para equipos enterprise con procesos pesados. OSS Guardian AI es liviano, rápido y entiende el flujo de GitHub Issues + PRs + Releases como un maintainer más.",
  },
  {
    icon: ClipboardCheck,
    title: "El único reviewer que entiende tu spec",
    desc: "No solo revisa código — revisa que el código cumpla la intención real del proyecto. Con Spec Compliance Guard integrado, cada PR se valida contra tu spec.md y plan.md automáticamente. Nadie más hace esto.",
  },
  {
    icon: DollarSign,
    title: "Precio que un maintainer puede pagar",
    desc: "$19/mes por 3 repos. Menos que una pizza con delivery. CodeRabbit cobra $12/seat y Greptile empieza en $100/mes. Nosotros creemos que el OSS merece herramientas accesibles.",
  },
  {
    icon: GitPullRequest,
    title: "Se integra sin cambiar tu workflow",
    desc: "Instalas el GitHub App en 2 clics. Cero YAML, cero CI scripts, cero webhooks manuales. Abre un PR y en <3 minutos tienes tu review. Como tener un senior dev en tu equipo sin contratarlo.",
  },
];

export function WhyChoose() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-12 bg-white/[0.01]">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-500">
            Why OSS Guardian
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Por qué los maintainers eligen{" "}
            <span className="glow-text">OSS Guardian AI</span>
          </h2>
          <p className="mt-3 text-zinc-500 max-w-xl mx-auto">
            No somos otro AI reviewer genérico. Fuimos diseñados específicamente para las necesidades reales de un maintainer open-source.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-6 flex gap-4"
            >
              <div className="inline-flex rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-2.5 text-emerald-400 h-fit">
                <r.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-base">{r.title}</h3>
                <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
