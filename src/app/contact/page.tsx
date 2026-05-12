"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Clock, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="mx-auto max-w-2xl px-6 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">&larr; Back to home</Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
          <p className="mt-3 text-zinc-400">We&rsquo;re here to help. Reach out and we&rsquo;ll get back to you as soon as possible.</p>

          <div className="mt-10 space-y-6">
            <a href="mailto:admin@vortexaisolutions.online" className="glass-card flex items-center gap-4 p-6 group hover:border-emerald-500/30 transition-colors">
              <div className="inline-flex rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-3 text-emerald-400">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-zinc-200">Email</p>
                <p className="text-sm text-zinc-400 group-hover:text-emerald-400 transition-colors">admin@vortexaisolutions.online</p>
              </div>
            </a>

            <div className="glass-card flex items-center gap-4 p-6">
              <div className="inline-flex rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-3 text-emerald-400">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-zinc-200">Response Time</p>
                <p className="text-sm text-zinc-400">We usually reply within 24 hours.</p>
              </div>
            </div>

            <a href="https://github.com/quantum-agent-MGM/oss-guardian-ai" target="_blank" rel="noopener" className="glass-card flex items-center gap-4 p-6 group hover:border-emerald-500/30 transition-colors">
              <div className="inline-flex rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-3 text-emerald-400">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-zinc-200">GitHub Issues</p>
                <p className="text-sm text-zinc-400 group-hover:text-emerald-400 transition-colors">Open an issue on our public repository</p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
