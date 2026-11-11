"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import * as THREE from "three";

function Sculpture({ progress }: { progress: ReturnType<typeof useMotionValue<number>> }) {
  const group = useRef<THREE.Group>(null);
  const sphere = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!group.current || !sphere.current) return;
    const p = progress.get();
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, p * 1.2, 0.04);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, p > 0.2 ? 1.35 : 0, 0.035);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, p * 0.55, 0.035);
    const scale = THREE.MathUtils.lerp(1, 1.65, Math.min(p * 1.2, 1));
    group.current.scale.setScalar(scale);
    sphere.current.rotation.z += delta * (0.12 + p * 0.35);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 5.8 - p * 0.8, 0.035);
  });

  return <group ref={group}>
    <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.12}>
      <mesh ref={sphere}>
        <icosahedronGeometry args={[1.12, 5]} />
        <meshPhysicalMaterial color="#d8e4d1" metalness={0.62} roughness={0.2} clearcoat={1} clearcoatRoughness={0.12} emissive="#455d2e" emissiveIntensity={0.18} />
      </mesh>
      <mesh scale={1.015}>
        <icosahedronGeometry args={[1.12, 2]} />
        <meshBasicMaterial color="#d9ffc0" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[0.8, 0.2, 0.35]}>
        <torusGeometry args={[1.48, 0.008, 8, 180]} />
        <meshBasicMaterial color="#d5ff8b" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[1.3, 0.4, -0.5]}>
        <torusGeometry args={[1.62, 0.004, 8, 180]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </mesh>
    </Float>
    <Sparkles count={32} scale={4.8} size={1.1} speed={0.12} opacity={0.35} color="#c7ed9b" />
  </group>;
}

export function ScrollScene() {
  const progress = useMotionValue(0);
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (value) => progress.set(value));
  return <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none opacity-60">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.8], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}>
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 4, 5]} intensity={3} color="#e7ffdb" />
      <pointLight position={[-4, -1, 2]} intensity={18} color="#a4ce6b" />
      <Suspense fallback={null}><Sculpture progress={progress} /></Suspense>
    </Canvas>
    <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/30 to-black/90" />
  </div>;
}
