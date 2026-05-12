"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">&larr; Back to home</Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-zinc-500">Last updated: May 12, 2026</p>

          <div className="mt-10 space-y-8 text-zinc-400 leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-zinc-200 mb-3">Introduction</h2>
              <p>OSS Guardian AI (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy. This Privacy Policy explains what data we collect, how we use it, and your rights.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-200 mb-3">What We Collect</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>GitHub username and repository data (only what you explicitly connect)</li>
                <li>PR content for review purposes</li>
                <li>Usage analytics (anonymous)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-200 mb-3">How We Use It</h2>
              <p>We use your data solely to provide the OSS Guardian AI service. We do not sell your data to third parties. We do not use your code to train AI models without explicit consent.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-200 mb-3">Data Retention</h2>
              <p>PR review data is processed in real-time and not stored permanently. Usage analytics are retained for up to 12 months for service improvement purposes.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-200 mb-3">Contact</h2>
              <p>For questions about this policy, contact us at <a href="mailto:admin@vortexaisolutions.online" className="text-emerald-400 hover:text-emerald-300">admin@vortexaisolutions.online</a>.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
