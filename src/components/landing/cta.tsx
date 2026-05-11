"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-zinc-900 p-12 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to secure your OSS project?
        </h2>
        <p className="mt-4 text-lg text-zinc-400">
          Start your 7-day free trial. No credit card required. Connect your
          first repo in under 2 minutes.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="bg-emerald-500 text-black hover:bg-emerald-400 gap-2 px-8 py-6 text-lg"
          >
            <Link href="/dashboard">
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 gap-2 px-8 py-6 text-lg"
          >
            <Link
              href="https://github.com/quantum-agent-MGM/oss-guardian-ai"
              target="_blank"
            >
              <Github className="h-5 w-5" />
              Star on GitHub
            </Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          Free for OSS projects with &lt;50 stars. No catch.
        </p>
      </motion.div>
    </section>
  );
}
