"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { GithubIcon } from "@/components/ui/github-icon";

/* ── CSS Fallback (cuando WebGL no está disponible) ── */
function CSSNebulaHero() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-transparent animate-pulse-glow" />
        <div className="absolute inset-8 rounded-full border border-emerald-500/10 animate-float" />
        <div className="absolute inset-16 rounded-full border border-emerald-500/5 animate-float" style={{ animationDelay: "-2s" }} />
      </div>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-emerald-400/20"
          style={{
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ── 3D Scene (carga lazy) ── */
function ThreeScene() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Detectar WebGL
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setHasWebGL(!!gl);
    } catch {
      setHasWebGL(false);
    }
    setMounted(true);
  }, []);

  if (!mounted || !hasWebGL) {
    return <CSSNebulaHero />;
  }

  // Dynamic import of Three.js to avoid SSR issues
  const LazyThreeScene = () => {
    const [ThreeComp, setThreeComp] = useState<React.ComponentType | null>(null);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
      import("./hero-three-scene")
        .then((mod) => setThreeComp(() => mod.HeroThreeScene))
        .catch(() => setLoadError(true));
    }, []);

    if (loadError || !ThreeComp) {
      return <CSSNebulaHero />;
    }

    return <ThreeComp />;
  };

  return <LazyThreeScene />;
}

/* ── Hero Section ── */
export function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-emerald-500/[0.03] blur-[150px] rounded-full" />

      {/* 3D Scene (with fallback) */}
      <ThreeScene />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm px-4 py-1.5 text-sm text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            AI-Powered OSS Maintenance · 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08]"
        >
          El AI que revisa tus PRs
          <br />
          <span className="glow-text">como un senior maintainer…</span>
          <br />
          <span className="text-zinc-200">pero 24/7 y sin ego</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          Ahorra 10+ horas/semana. Detecta bugs de seguridad reales, genera comentarios humanos que maintainers responden, auto-changelog y OSS Health Score.{" "}
          <span className="text-zinc-300">Bajo ruido por diseño.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/auth/signin"
              className="glass-btn glass-btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg rounded-xl animate-pulse-glow"
            >
              <GithubIcon className="h-5 w-5" />
              Probar gratis — 7 días
              <ArrowRight className="h-5 w-5" />
            </a>
            <button
              onClick={() => scrollTo("demo")}
              className="glass-btn inline-flex items-center gap-2 px-8 py-4 text-lg rounded-xl"
            >
              Ver demo interactivo
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-emerald-500" />
              7 días gratis
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>Sin tarjeta de crédito</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>Cancela cuando quieras</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
    </section>
  );
}
