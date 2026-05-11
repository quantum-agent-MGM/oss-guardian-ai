"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/github-icon";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.04] bg-[#0a0a0a]/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-emerald-400">OSS</span>
          <span className="text-zinc-200">Guardian AI</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="px-3 py-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors rounded-lg"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/quantum-agent-MGM/oss-guardian-ai"
            target="_blank"
            rel="noopener"
            className="text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <Button
            asChild
            className="bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold rounded-xl"
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
