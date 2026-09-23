"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import SecurityWorld from "@/components/three/SecurityWorld";

type SecurityCanvasProps = {
  progress: number;
};

export default function SecurityCanvas({ progress }: SecurityCanvasProps) {
  return (
    <Canvas
      className="facility-canvas"
      camera={{ position: [0, 1.68, 8.4], fov: 55, near: 0.1, far: 120 }}
      dpr={[1, 1.45]}
      shadows
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: 3,
        toneMappingExposure: 1.02,
      }}
    >
      <Suspense fallback={null}>
        <fog attach="fog" args={["#151b1f", 13, 34]} />
        <ambientLight intensity={0.52} />
        <hemisphereLight args={["#9eb7c8", "#1d2529", 0.48]} />
        <directionalLight
          castShadow
          position={[4.5, 7.5, 3]}
          intensity={1.25}
          color="#e7f0f5"
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={38}
          shadow-camera-left={-9}
          shadow-camera-right={9}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />
        <SecurityWorld progress={progress} />
      </Suspense>
    </Canvas>
  );
}
