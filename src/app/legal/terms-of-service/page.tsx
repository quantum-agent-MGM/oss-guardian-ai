"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">&larr; Back to home</Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Terms of Service</h1>
          <p className="mt-2 text-sm text-zinc-500">Last updated: May 12, 2026</p>

          <div className="mt-10 space-y-8 text-zinc-400 leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-zinc-200 mb-3">Acceptance of Terms</h2>
              <p>By using OSS Guardian AI you agree to these terms. If you do not agree, do not use the service.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-200 mb-3">Your Responsibilities</h2>
              <p>You are responsible for your repositories and data. You must have the right to connect and analyze any repository you add to our service.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-200 mb-3">Service Provision</h2>
              <p>We provide the service &ldquo;as is&rdquo;. We strive for high availability but do not guarantee 100% uptime. We may modify or discontinue features with reasonable notice.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-200 mb-3">Billing & Cancellation</h2>
              <p>Monthly subscription, cancel anytime via your account settings or Whop. No refunds for partial months except as specified in our guarantee.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-200 mb-3">Satisfaction Guarantee</h2>
              <p>First month free if you don&rsquo;t save at least 5 hours of code review time. Contact <a href="mailto:admin@vortexaisolutions.online" className="text-emerald-400 hover:text-emerald-300">admin@vortexaisolutions.online</a> to claim.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-200 mb-3">Limitation of Liability</h2>
              <p>We are not liable for any damages arising from the use or inability to use our service. You use OSS Guardian AI at your own risk.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-200 mb-3">Contact</h2>
              <p>For legal inquiries: <a href="mailto:admin@vortexaisolutions.online" className="text-emerald-400 hover:text-emerald-300">admin@vortexaisolutions.online</a>.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
