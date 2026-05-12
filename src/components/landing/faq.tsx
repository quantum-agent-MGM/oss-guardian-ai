"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "¿Cómo funciona OSS Guardian AI?",
    a: "Conectas tu repo de GitHub en 2 clics. Cuando abres un PR, nuestro agente AI analiza el diff automáticamente usando IA avanzada y genera una review profesional con comentarios, detección de bugs de seguridad y sugerencias de mejora. Todo aparece como un comment normal en tu PR.",
  },
  {
    q: "¿Qué lenguajes soporta?",
    a: "TypeScript, Python, Go y Rust con soporte completo. Para otros lenguajes, el security scanner y análisis de patrones funcionan igual — solo las sugerencias de código específicas serán más genéricas.",
  },
  {
    q: "¿Mis datos están seguros?",
    a: "Absolutamente. Solo leemos el diff del PR (no tu código completo). No almacenamos código fuente. Usamos Anthropic API con zero-data-retention. Cumplimos con SOC 2.",
  },
  {
    q: "¿Hay free tier?",
    a: "Sí. Repositorios con menos de 50 estrellas son completamente gratis. Para proyectos más grandes, ofrecemos 7 días de prueba gratuita en cualquier plan.",
  },
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Sí, sin permanencia. Cancelas desde Whop con un clic y el acceso sigue hasta el final del período pagado.",
  },
  {
    q: "¿Cómo se integra con mi workflow actual?",
    a: "Cero fricción. Instalas el GitHub App en 2 clics, seleccionas los repos, y listo. Los PR reviews aparecen como comentarios normales. No cambias tu flujo — solo agregas un revisor extra que nunca duerme y tiene memoria infinita de tu codebase.",
  },
  {
    q: "¿Qué diferencia tiene de Copilot o CodeRabbit?",
    a: "Copilot asiste escribiendo código. CodeRabbit revisa pero es genérico. OSS Guardian AI es el único que: (1) conoce tu codebase completo vía RAG, (2) detecta patrones de vulnerabilidad específicos de OSS (supply chain, dependency confusion, exposed secrets), y (3) genera un OSS Health Score que te dice exactamente qué tan mantenible y seguro es tu proyecto comparado con el top 10% de GitHub.",
  },
  {
    q: "¿Tiene SLA de respuesta?",
    a: "El 95% de los PRs reciben review en menos de 3 minutos. Para proyectos con ≥100 estrellas, garantizamos <5 minutos. Si alguna vez falla, tenemos fallback automático al template scanner (gratuito en todos los planes) que cubre SQL injection, XSS, secretos expuestos, y malas prácticas comunes.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-500">FAQ</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Preguntas{" "}
            <span className="glow-text">frecuentes</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass-card overflow-hidden cursor-pointer"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex items-center justify-between p-5">
                <h3 className="text-sm font-medium pr-8">{faq.q}</h3>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                </motion.div>
              </div>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-zinc-500 leading-relaxed border-t border-white/[0.04] pt-4">
                      {faq.a}
                    </p>
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
