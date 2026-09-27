"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Instanced server racks lining a corridor — the "facility".
function Racks({ side, accent }: { side: 1 | -1; accent: string }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 14;
  const color = useMemo(() => new THREE.Color(accent), [accent]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useMemo(() => {
    // set once on mount via effect-like pattern in useFrame guard
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    for (let i = 0; i < count; i++) {
      dummy.position.set(side * 6, 0, -i * 6 - 2);
      dummy.scale.set(2.2, 3.4, 1.6);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
    // subtle emissive pulse
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.25 + 0.12 * Math.sin(clock.elapsedTime * 1.5 + side);
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry />
      <meshStandardMaterial color="#12161F" metalness={0.7} roughness={0.35} emissive={color} emissiveIntensity={0.25} />
    </instancedMesh>
  );
}

function DataStream({ accent }: { accent: string }) {
  const ref = useRef<THREE.Points>(null);
  const N = 260;
  const positions = useMemo(() => {
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = Math.random() * 5;
      arr[i * 3 + 2] = -Math.random() * 80;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < N; i++) {
      let z = pos.getZ(i) + delta * 9;
      if (z > 4) z = -80;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={N} />
      </bufferGeometry>
      <pointsMaterial color={accent} size={0.06} transparent opacity={0.7} />
    </points>
  );
}

function CameraDrift({ enabled }: { enabled: boolean }) {
  useFrame(({ camera, clock, pointer }) => {
    if (!enabled) return;
    const t = clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.12) * 0.6 + pointer.x * 0.5;
    camera.position.y = 2.2 + Math.sin(t * 0.18) * 0.15 + pointer.y * 0.25;
    camera.lookAt(0, 1.8, -20);
  });
  return null;
}

export default function FacilityScene({
  accent = "#3DD6E0",
  motion = true,
}: {
  accent?: string;
  motion?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#0B0E13"]} />
      <fog attach="fog" args={["#0B0E13", 12, 60]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 8, 2]} intensity={0.6} color="#cfe8ff" />
      <pointLight position={[0, 4, -14]} intensity={30} color={accent} distance={40} />

      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -30]}>
        <planeGeometry args={[40, 120]} />
        <meshStandardMaterial color="#0E1218" metalness={0.6} roughness={0.5} />
      </mesh>

      <Racks side={1} accent={accent} />
      <Racks side={-1} accent={accent} />
      <DataStream accent={accent} />
      <CameraDrift enabled={motion} />
    </Canvas>
  );
}
