"use client";

import { motion } from "framer-motion";

export function DemoPreview() {
  return (
    <section className="px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/80 overflow-hidden shadow-2xl"
        >
          {/* Fake browser chrome */}
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 text-xs text-zinc-500">
              PR #42 — fix: validate user input in login form
            </span>
          </div>

          {/* Fake PR review content */}
          <div className="p-6 space-y-4 font-mono text-sm">
            <div className="flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
              <span className="mt-0.5 text-emerald-400">🤖</span>
              <div>
                <p className="text-emerald-400 font-semibold">
                  OSS Guardian AI — Review
                </p>
                <p className="mt-1 text-zinc-300">
                  ✅ Code structure looks clean. Good use of Zod for validation.
                </p>
                <div className="mt-3 rounded border border-amber-500/20 bg-amber-500/5 p-3">
                  <p className="text-amber-400 font-semibold">
                    ⚠️ Security: Potential XSS vector
                  </p>
                  <p className="mt-1 text-zinc-400">
                    User input is rendered directly without sanitization at{" "}
                    <code className="text-zinc-300">login.tsx:42</code>. Use{" "}
                    <code className="text-emerald-400">DOMPurify.sanitize()</code>{" "}
                    before rendering.
                  </p>
                </div>
                <div className="mt-3 rounded border border-zinc-700/50 bg-zinc-800/50 p-3">
                  <p className="text-zinc-300 font-semibold">
                    💡 Suggestion: Add rate limiting
                  </p>
                  <p className="mt-1 text-zinc-400">
                    Consider adding{" "}
                    <code className="text-zinc-300">rate-limiter-flexible</code>{" "}
                    to prevent brute force attacks on the login endpoint.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-zinc-500">
              <span className="rounded bg-zinc-800 px-2 py-0.5 text-emerald-400">
                +12
              </span>
              <span>OSS Guardian AI reviewed 3 hours ago</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
