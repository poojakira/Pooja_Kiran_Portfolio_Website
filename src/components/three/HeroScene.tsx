"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import SecurityCore from "./SecurityCore";
import CameraRig from "./CameraRig";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * The hero 3D scene. Lazy-mounted by the Hero section (dynamic import, no SSR).
 * Adaptive DPR, pointer parallax, reduced-motion + low-tier fallbacks.
 */
export default function HeroScene() {
  const { tier, mounted } = useDeviceTier();
  const reduced = useReducedMotion();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  if (!mounted) return null;

  const dpr: [number, number] =
    tier === "high" ? [1, 1.8] : tier === "mid" ? [1, 1.4] : [1, 1];

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      gl={{ antialias: tier !== "low", alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} color="#cfd6dc" />
      <directionalLight position={[-6, -3, -4]} intensity={0.4} color="#5BC8D6" />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#5BC8D6" distance={6} />

      <SecurityCore tier={tier} pointer={reduced ? undefined : pointer} />
      {!reduced && <CameraRig pointer={pointer} />}
    </Canvas>
  );
}
