"use client";

import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/github-icon";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-24 sm:px-8 lg:px-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
            <Sparkles className="h-4 w-4" />
            AI-Powered OSS Maintenance
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
        >
          Never miss a
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
            {" "}security bug{" "}
          </span>
          again
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-zinc-400 sm:text-xl max-w-2xl mx-auto"
        >
          OSS Guardian AI reviews every PR automatically, catches security
          vulnerabilities, generates professional comments, and gives your repo
          a health score. Like a senior engineer on your team — 24/7.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-emerald-500 text-black hover:bg-emerald-400 gap-2 px-8 py-6 text-lg"
          >
            <Link href="/dashboard">
              Start Free 7-Day Trial
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
              <GithubIcon className="h-5 w-5" />
              View on GitHub
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-8 text-sm text-zinc-500"
        >
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-emerald-500" />
            SOC 2 Compliant
          </span>
          <span>7-day free trial</span>
          <span>No credit card required</span>
        </motion.div>
      </div>
    </section>
  );
}
