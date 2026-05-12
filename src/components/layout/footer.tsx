"use client";

import Link from "next/link";
import { GithubIcon } from "@/components/ui/github-icon";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-white/[0.04] bg-[#0a0a0a] px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-4">
          <div className="sm:col-span-1">
            <Link href="/" className="font-bold text-lg"><span className="text-emerald-400">OSS</span> <span className="text-zinc-200">Guardian AI</span></Link>
            <p className="mt-2 text-xs text-zinc-500 leading-relaxed">{t.footerTagline}</p>
          </div>
          <div><h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">{t.footerProduct}</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="#features" className="hover:text-zinc-300 transition-colors">Features</Link></li>
              <li><Link href="#demo" className="hover:text-zinc-300 transition-colors">Demo</Link></li>
              <li><Link href="#pricing" className="hover:text-zinc-300 transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-zinc-300 transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div><h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">{t.footerCompany}</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="https://github.com/quantum-agent-MGM/oss-guardian-ai" target="_blank" rel="noopener" className="hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5"><GithubIcon className="h-3.5 w-3.5" /> GitHub</a></li>
              <li><a href="mailto:hello@oss-guardian.ai" className="hover:text-zinc-300 transition-colors">{t.footerContact}</a></li>
              <li><Link href="/privacy" className="hover:text-zinc-300 transition-colors">{t.footerPrivacy}</Link></li>
            </ul>
          </div>
          <div><h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">{t.footerLegal}</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/terms" className="hover:text-zinc-300 transition-colors">{t.footerTerms}</Link></li>
              <li><Link href="/privacy" className="hover:text-zinc-300 transition-colors">{t.footerPrivacy}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/[0.04] text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} {t.footerRights}
        </div>
      </div>
    </footer>
  );
}
