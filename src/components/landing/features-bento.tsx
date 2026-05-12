"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MessageSquare, FileText, BarChart3, Filter, Code2, ClipboardCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function FeaturesBento() {
  const { t } = useLanguage();

  const features = [
    { icon: ShieldCheck, title: t.featSecurityTitle, desc: t.featSecurityDesc, size: "md", color: "emerald" },
    { icon: ClipboardCheck, title: t.featSpecTitle, desc: t.featSpecDesc, size: "md", color: "indigo" },
    { icon: MessageSquare, title: t.featHumanTitle, desc: t.featHumanDesc, size: "sm", color: "blue" },
    { icon: Filter, title: t.featLowNoiseTitle, desc: t.featLowNoiseDesc, size: "sm", color: "cyan" },
    { icon: BarChart3, title: t.featHealthTitle, desc: t.featHealthDesc, size: "md", color: "amber" },
    { icon: FileText, title: t.featChangelogTitle, desc: t.featChangelogDesc, size: "sm", color: "purple" },
    { icon: Code2, title: t.featAutoFixTitle, desc: t.featAutoFixDesc, size: "sm", color: "rose" },
  ];

  const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    emerald: { bg: "bg-emerald-500/5", border: "border-emerald-500/15", text: "text-emerald-400", glow: "shadow-emerald-500/10" },
    indigo: { bg: "bg-indigo-500/5", border: "border-indigo-500/15", text: "text-indigo-400", glow: "shadow-indigo-500/10" },
    blue: { bg: "bg-blue-500/5", border: "border-blue-500/15", text: "text-blue-400", glow: "shadow-blue-500/10" },
    purple: { bg: "bg-purple-500/5", border: "border-purple-500/15", text: "text-purple-400", glow: "shadow-purple-500/10" },
    amber: { bg: "bg-amber-500/5", border: "border-amber-500/15", text: "text-amber-400", glow: "shadow-amber-500/10" },
    cyan: { bg: "bg-cyan-500/5", border: "border-cyan-500/15", text: "text-cyan-400", glow: "shadow-cyan-500/10" },
    rose: { bg: "bg-rose-500/5", border: "border-rose-500/15", text: "text-rose-400", glow: "shadow-rose-500/10" },
  };

  return (
    <section id="features" className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-500">{t.featuresLabel}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t.featuresTitle} <span className="glow-text">{t.featuresTitleHighlight}</span></h2>
          <p className="mt-3 text-zinc-500 max-w-xl mx-auto">{t.featuresSub}</p>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const c = colorMap[f.color];
            return (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className={`glass-card p-6 flex flex-col gap-4 group ${f.size === "md" ? "sm:col-span-2" : ""}`}>
                <div className={`inline-flex rounded-xl ${c.bg} border ${c.border} p-2.5 ${c.text}`}><f.icon className="h-5 w-5" /></div>
                <div><h3 className="font-semibold text-base">{f.title}</h3><p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">{f.desc}</p></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
