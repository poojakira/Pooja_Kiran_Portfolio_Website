"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import SecurityWorld from "@/components/three/SecurityWorld";

type SecurityCanvasProps = {
  isRotating: boolean;
  setIsRotating: (value: boolean) => void;
  setStage: (value: number) => void;
};

export default function SecurityCanvas({ isRotating, setIsRotating, setStage }: SecurityCanvasProps) {
  return (
    <Canvas
      className={isRotating ? "three-canvas is-rotating" : "three-canvas"}
      camera={{ position: [0, 1.3, 10.4], fov: 42, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <fog attach="fog" args={["#dcebfa", 12, 28]} />
        <ambientLight intensity={1.25} />
        <hemisphereLight args={["#dff2ff", "#7a897f", 1.45]} />
        <directionalLight
          castShadow
          position={[5, 8, 6]}
          intensity={2.2}
          color="#fff8eb"
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={28}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />
        <directionalLight position={[-5, 3, -4]} intensity={0.8} color="#90c8ff" />
        <pointLight position={[0, 4, 2]} intensity={0.8} color="#ffffff" />
        <SecurityWorld
          isRotating={isRotating}
          setIsRotating={setIsRotating}
          setStage={setStage}
        />
      </Suspense>
    </Canvas>
  );
}
