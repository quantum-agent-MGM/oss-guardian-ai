"use client";

import { motion } from "framer-motion";
import {
  Code2,
  ShieldCheck,
  BarChart3,
  FileText,
  GitPullRequest,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: GitPullRequest,
    title: "AI PR Review",
    description:
      "Every pull request gets an instant, human-quality review. Detects bugs, suggests improvements, and catches anti-patterns before they hit production.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Security Scanner",
    description:
      "Automatically detects exposed secrets, SQL injection, XSS, CSRF, path traversal, and unsafe code patterns. Blocks merge on critical findings.",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    icon: BarChart3,
    title: "OSS Health Score",
    description:
      "Get a 0-100 health score for your repo. Tracks PR velocity, bug density, test coverage, and dependency freshness. Compare with similar projects.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: FileText,
    title: "Auto CHANGELOG",
    description:
      "Generates a structured CHANGELOG.md from merged PRs. Categorizes changes into features, fixes, security, and breaking changes automatically.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Code2,
    title: "Fix Suggestions",
    description:
      "Not just problems — our AI suggests concrete code fixes. Copy-paste ready solutions with explanation, so your team learns while fixing.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description:
      "Connect your GitHub repo in 2 clicks. No YAML configs, no CI scripts. OSS Guardian AI works immediately with TypeScript, Python, Go, and Rust.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything your OSS project needs
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            From automated PR reviews to security scanning and health metrics —
            one tool that replaces 5 separate services.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-zinc-700 hover:bg-zinc-900 transition-all"
            >
              <div
                className={`inline-flex rounded-xl ${feature.bg} p-3 ${feature.color}`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
