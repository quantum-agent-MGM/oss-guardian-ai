"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ShieldCheck, MessageSquare, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function DemoInteractive() {
  const { t } = useLanguage();
  const [repo, setRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | "done">(null);

  const handleDemo = () => {
    if (!repo.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setResult("done"); }, 2500);
  };

  return (
    <section id="demo" className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-500">{t.demoLabel}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t.demoTitle} <span className="glow-text">{t.demoTitleHighlight}</span></h2>
          <p className="mt-3 text-zinc-500">{t.demoSub}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-1 flex gap-2 max-w-xl mx-auto">
          <input type="text" placeholder={t.demoPlaceholder} value={repo} onChange={(e) => setRepo(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleDemo()}
            className="flex-1 bg-transparent border-none outline-none px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600" />
          <button onClick={handleDemo} disabled={loading || !repo.trim()}
            className="glass-btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50">
            {loading ? (<><span className="animate-spin h-4 w-4 border-2 border-black/30 border-t-black rounded-full" />{t.demoAnalyzing}</>) : (<><Search className="h-4 w-4" />{t.demoAnalyze}</>)}
          </button>
        </motion.div>
        {result === "done" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 glass-card p-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"><ShieldCheck className="h-4 w-4 text-emerald-400" /></div>
              <div className="flex-1 space-y-4">
                <div><p className="font-semibold text-emerald-400">{t.demoResultTitle}</p><p className="text-sm text-zinc-300 mt-1">{t.demoResultClean}</p></div>
                <div className="rounded-xl border border-indigo-500/10 bg-indigo-500/5 p-4">
                  <p className="text-sm font-semibold text-indigo-400 flex items-center gap-1.5">{t.demoSpecScore}</p>
                  <p className="text-sm text-zinc-400 mt-1">{t.demoSpecBody} <code className="text-zinc-300 text-xs bg-zinc-800 px-1 rounded">spec.md §3.1</code>. {t.demoSpecBody2}</p>
                </div>
                <div className="rounded-xl border border-amber-500/10 bg-amber-500/5 p-4">
                  <p className="text-sm font-semibold text-amber-400">{t.demoXSS}</p>
                  <p className="text-sm text-zinc-400 mt-1"><code className="text-zinc-300 text-xs bg-zinc-800 px-1 rounded">src/components/Form.tsx:42</code> — {t.demoXSSFile} <code className="text-emerald-400 text-xs">DOMPurify</code>.</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="text-sm font-semibold text-zinc-300 flex items-center gap-2"><MessageSquare className="h-3.5 w-3.5" />{t.demoSuggestion}</p>
                  <p className="text-sm text-zinc-400 mt-1">{t.demoSuggest} <code className="text-zinc-300 text-xs bg-zinc-800 px-1 rounded">rate-limiter-flexible</code> {t.demoSuggest2}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600"><span>{t.demoFooter}</span><span>·</span><span className="text-emerald-500">{t.demoFooter2}</span></div>
              </div>
            </div>
          </motion.div>
        )}
        {!result && !loading && (<p className="text-center text-xs text-zinc-600 mt-4">{t.demoHint}</p>)}
      </div>
    </section>
  );
}
