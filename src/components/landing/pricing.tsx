"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    description: "For indie maintainers and small OSS projects.",
    cta: "Start Free Trial",
    href: "https://whop.com/checkout/ch_BfnWOEryPKylvZx/",
    featured: false,
    features: [
      "Up to 3 repositories",
      "AI PR review (100 PRs/mo)",
      "Basic security scanner",
      "CHANGELOG generator",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing OSS teams with active development.",
    cta: "Start Free Trial",
    href: "https://whop.com/checkout/ch_0OXFoUYPKA3So8x/",
    featured: true,
    features: [
      "Unlimited repositories",
      "AI PR review (unlimited)",
      "Advanced security scanner",
      "OSS Health Score dashboard",
      "Auto-fix suggestions",
      "Custom review rules",
      "Priority support",
      "Slack/Discord integration",
    ],
  },
  {
    name: "Team",
    price: "$79",
    period: "/month",
    description: "For organizations managing multiple OSS projects.",
    cta: "Contact Sales",
    href: "mailto:hello@oss-guardian.ai",
    featured: false,
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Organization-wide dashboard",
      "Custom security policies",
      "Dedicated support",
      "SSO / SAML",
      "Audit logs",
      "99.9% SLA",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            7-day free trial on all plans. No credit card required.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 ${
                plan.featured
                  ? "border-emerald-500/50 bg-emerald-500/5 shadow-lg shadow-emerald-500/10"
                  : "border-zinc-800 bg-zinc-900/50"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-semibold text-black">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-zinc-400">{plan.period}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>

              <ul className="mt-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                    <span className="text-zinc-300">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  asChild
                  className={`w-full gap-2 ${
                    plan.featured
                      ? "bg-emerald-500 text-black hover:bg-emerald-400"
                      : "border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                  }`}
                  variant={plan.featured ? "default" : "outline"}
                >
                  <Link href={plan.href}>
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
