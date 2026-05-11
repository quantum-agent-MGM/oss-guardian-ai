"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { GithubIcon } from "@/components/ui/github-icon";
import * as THREE from "three";

/* ── 3D Scene ── */
function Scene() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central sphere */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
        <Sphere args={[1.2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#10b981"
            emissive="#059669"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.1}
            distort={0.25}
            speed={2}
            transparent
            opacity={0.7}
          />
        </Sphere>
      </Float>

      {/* Orbiting rings */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh position={[2.2, 0.5, -1]}>
          <torusGeometry args={[0.25, 0.06, 16, 32]} />
          <meshStandardMaterial color="#6ee7b7" emissive="#34d399" emissiveIntensity={0.5} roughness={0.3} />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={0.3} floatIntensity={1}>
        <mesh position={[-1.8, -0.8, 1.2]}>
          <torusGeometry args={[0.35, 0.05, 16, 48]} />
          <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={0.4} roughness={0.25} />
        </mesh>
      </Float>

      {/* Small particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random() * 2} floatIntensity={0.5 + Math.random()}>
          <mesh
            position={[
              (Math.random() - 0.5) * 5,
              (Math.random() - 0.5) * 5,
              (Math.random() - 0.5) * 3,
            ]}
          >
            <sphereGeometry args={[0.04 + Math.random() * 0.06, 8, 8]} />
            <meshStandardMaterial
              color={Math.random() > 0.5 ? "#6ee7b7" : "#34d399"}
              emissive={Math.random() > 0.5 ? "#10b981" : "#059669"}
              emissiveIntensity={0.6}
            />
          </mesh>
        </Float>
      ))}

      {/* Ambient light */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#10b981" />
      <pointLight position={[-3, -2, -3]} intensity={0.5} color="#34d399" />
    </group>
  );
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

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <Scene />
        </Canvas>
      </div>

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
          Tu Agente AI que
          <br />
          <span className="glow-text">revisa PRs mientras duermes</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          OSS Guardian AI detecta bugs de seguridad, genera comentarios humanos profesionales, crea fixes automáticos y changelog.{" "}
          <span className="text-zinc-300">Ahorra 10+ horas/semana en mantenimiento OSS.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://whop.com/checkout/ch_BfnWOEryPKylvZx/"
            target="_blank"
            rel="noopener"
            className="glass-btn glass-btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg rounded-xl animate-pulse-glow"
          >
            <GithubIcon className="h-5 w-5" />
            Conectar mi repo GitHub
            <ArrowRight className="h-5 w-5" />
          </a>
          <button
            onClick={() => scrollTo("demo")}
            className="glass-btn inline-flex items-center gap-2 px-8 py-4 text-lg rounded-xl"
          >
            Ver demo interactivo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-6 text-sm text-zinc-500"
        >
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-emerald-500" />
            7 días gratis
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>Sin tarjeta de crédito</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>Cancel when you want</span>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
    </section>
  );
}
