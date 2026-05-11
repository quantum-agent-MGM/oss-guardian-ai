"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

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
      {Array.from({ length: 12 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random() * 2} floatIntensity={0.5 + Math.random()}>
          <mesh position={[(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 3]}>
            <sphereGeometry args={[0.04 + Math.random() * 0.06, 8, 8]} />
            <meshStandardMaterial
              color={Math.random() > 0.5 ? "#6ee7b7" : "#34d399"}
              emissive={Math.random() > 0.5 ? "#10b981" : "#059669"}
              emissiveIntensity={0.6}
            />
          </mesh>
        </Float>
      ))}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#10b981" />
      <pointLight position={[-3, -2, -3]} intensity={0.5} color="#34d399" />
    </group>
  );
}

export function HeroThreeScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
        <Scene />
      </Canvas>
    </div>
  );
}
