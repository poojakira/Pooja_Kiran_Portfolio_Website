"use client";

import { useEffect, useMemo, useRef } from "react";
import { Html, Line, useTexture } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PORTRAIT_URL } from "@/data/portfolio";

type SecurityWorldProps = {
  isRotating: boolean;
  setIsRotating: (value: boolean) => void;
  setStage: (value: number) => void;
};

function CloudPuff({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {[
        [-0.72, 0, 0],
        [-0.2, 0.22, 0.08],
        [0.34, 0.1, -0.02],
        [0.82, -0.02, 0.08],
        [0.05, -0.12, 0.2],
      ].map((p, index) => (
        <mesh key={index} position={p as [number, number, number]}>
          <sphereGeometry args={[0.62, 20, 20]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}

function PacketDrone() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * 0.36;
    ref.current.position.set(Math.cos(t) * 5.5, 1.7 + Math.sin(t * 2) * 0.18, Math.sin(t) * 5.5);
    ref.current.rotation.y = -t + Math.PI / 2;
    ref.current.rotation.z = Math.sin(t * 2) * 0.08;
  });

  return (
    <group ref={ref}>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color="#172334" roughness={0.45} metalness={0.35} />
      </mesh>
      <mesh position={[0.32, 0, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#4aa8ff" />
      </mesh>
      <mesh position={[-0.32, 0, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#4aa8ff" />
      </mesh>
    </group>
  );
}

function SecurityNode({
  position,
  color,
  height = 0.78,
}: {
  position: [number, number, number];
  color: string;
  height?: number;
}) {
  return (
    <group position={position}>
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[0.72, 0.8, 0.26, 32]} />
        <meshStandardMaterial color="#e8eef4" roughness={0.82} />
      </mesh>
      <mesh position={[0, height / 2 + 0.03, 0]} castShadow>
        <boxGeometry args={[0.86, height, 0.86]} />
        <meshStandardMaterial color="#ffffff" roughness={0.42} metalness={0.06} />
      </mesh>
      <mesh position={[0, height + 0.48, 0]} castShadow>
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.18} emissive={color} emissiveIntensity={0.1} />
      </mesh>
    </group>
  );
}

function PortraitMonolith() {
  const texture = useTexture(PORTRAIT_URL);
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group position={[0, -0.08, 0.45]}>
      <mesh position={[0, 0.54, 0]} castShadow>
        <boxGeometry args={[1.45, 1.55, 0.28]} />
        <meshStandardMaterial color="#f6f8fb" roughness={0.36} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.56, 0.151]}>
        <planeGeometry args={[1.22, 1.22]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.92, 1.08, 0.28, 32]} />
        <meshStandardMaterial color="#dfe7ef" roughness={0.72} />
      </mesh>
    </group>
  );
}

export default function SecurityWorld({ isRotating, setIsRotating, setStage }: SecurityWorldProps) {
  const world = useRef<THREE.Group>(null);
  const lastX = useRef(0);
  const speed = useRef(0);
  const dragging = useRef(false);
  const stageRef = useRef(1);

  const links = useMemo(
    () => [
      [[0, -0.2, 0], [-2.15, -0.2, 0.9]],
      [[0, -0.2, 0], [2.05, -0.2, 1.0]],
      [[0, -0.2, 0], [0.2, -0.2, -2.35]],
    ] as [[number, number, number], [number, number, number]][],
    [],
  );

  const updateStage = () => {
    if (!world.current) return;
    const twoPi = Math.PI * 2;
    const rotation = ((world.current.rotation.y % twoPi) + twoPi) % twoPi;

    let next = 1;
    if (rotation >= 0.65 && rotation < 2.15) next = 2;
    else if (rotation >= 2.15 && rotation < 3.75) next = 3;
    else if (rotation >= 3.75 && rotation < 5.45) next = 4;

    if (next !== stageRef.current) {
      stageRef.current = next;
      setStage(next);
    }
  };

  useEffect(() => {
    const keyDown = (event: KeyboardEvent) => {
      if (!world.current) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        setIsRotating(true);
        const direction = event.key === "ArrowLeft" ? 1 : -1;
        speed.current = direction * 0.035;
      }
    };

    const keyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        setIsRotating(false);
      }
    };

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, [setIsRotating]);

  useFrame((_, delta) => {
    if (!world.current) return;

    if (!dragging.current) {
      speed.current *= Math.pow(0.91, delta * 60);
      if (Math.abs(speed.current) < 0.00015) speed.current = 0;
      world.current.rotation.y += speed.current;
    }

    world.current.position.y = Math.sin(performance.now() * 0.00055) * 0.06 - 0.35;
    updateStage();
  });

  const pointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    dragging.current = true;
    setIsRotating(true);
    lastX.current = event.clientX;
    (event.target as Element).setPointerCapture?.(event.pointerId);
  };

  const pointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!dragging.current || !world.current) return;
    event.stopPropagation();
    const deltaX = event.clientX - lastX.current;
    const deltaRotation = deltaX * 0.0075;
    world.current.rotation.y += deltaRotation;
    speed.current = deltaRotation * 0.32;
    lastX.current = event.clientX;
  };

  const pointerUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    dragging.current = false;
    setIsRotating(false);
    try {
      (event.target as Element).releasePointerCapture?.(event.pointerId);
    } catch {
      // Pointer may already be released by the browser.
    }
  };

  return (
    <>
      <group ref={world} rotation={[0.04, 0, 0]} position={[0, -0.35, 0]}>
        <mesh
          position={[0, -0.92, 0]}
          castShadow
          receiveShadow
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerLeave={pointerUp}
        >
          <cylinderGeometry args={[3.35, 3.15, 0.72, 64]} />
          <meshStandardMaterial color="#dce9df" roughness={0.78} metalness={0.02} />
        </mesh>

        <mesh position={[0, -1.72, 0]} rotation={[Math.PI, 0, 0]} castShadow>
          <coneGeometry args={[3.02, 1.35, 32]} />
          <meshStandardMaterial color="#9fb6a8" roughness={0.92} />
        </mesh>

        <mesh position={[0, -0.51, 0]} receiveShadow>
          <cylinderGeometry args={[3.2, 3.2, 0.08, 64]} />
          <meshStandardMaterial color="#f4f7f2" roughness={0.85} />
        </mesh>

        {links.map((points, index) => (
          <Line
            key={index}
            points={points}
            color={index === 0 ? "#2d7ff9" : index === 1 ? "#8857e8" : "#ef8e3d"}
            lineWidth={1.3}
            transparent
            opacity={0.55}
          />
        ))}

        <PortraitMonolith />
        <SecurityNode position={[-2.15, -0.38, 0.9]} color="#2d7ff9" height={0.9} />
        <SecurityNode position={[2.05, -0.38, 1.0]} color="#8857e8" height={1.05} />
        <SecurityNode position={[0.2, -0.38, -2.35]} color="#ef8e3d" height={0.82} />

        <mesh position={[-1.25, -0.42, -1.65]} castShadow>
          <boxGeometry args={[0.56, 0.56, 0.56]} />
          <meshStandardMaterial color="#ffffff" roughness={0.35} />
        </mesh>
        <mesh position={[-1.25, -0.07, -1.65]} castShadow>
          <boxGeometry args={[0.42, 0.12, 0.42]} />
          <meshStandardMaterial color="#2d7ff9" roughness={0.28} emissive="#2d7ff9" emissiveIntensity={0.08} />
        </mesh>

        <mesh position={[1.4, -0.3, -1.35]} castShadow>
          <cylinderGeometry args={[0.38, 0.46, 0.64, 24]} />
          <meshStandardMaterial color="#ffffff" roughness={0.42} />
        </mesh>
        <mesh position={[1.4, 0.08, -1.35]} castShadow>
          <sphereGeometry args={[0.18, 20, 20]} />
          <meshStandardMaterial color="#8857e8" emissive="#8857e8" emissiveIntensity={0.1} />
        </mesh>

        <mesh position={[2.25, -0.43, -0.78]} rotation={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[0.48, 0.38, 0.72]} />
          <meshStandardMaterial color="#f7f9fb" roughness={0.46} />
        </mesh>
        <mesh position={[-2.25, -0.43, -0.72]} rotation={[0, -0.45, 0]} castShadow>
          <boxGeometry args={[0.48, 0.38, 0.72]} />
          <meshStandardMaterial color="#f7f9fb" roughness={0.46} />
        </mesh>

        <mesh
          position={[0, 0.25, 0]}
          visible={false}
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerLeave={pointerUp}
        >
          <sphereGeometry args={[4.1, 18, 18]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>

      <PacketDrone />

      <CloudPuff position={[-6.2, 2.7, -5]} scale={1.25} />
      <CloudPuff position={[6.6, 1.9, -6]} scale={1.05} />
      <CloudPuff position={[-4.8, -1.1, -7]} scale={0.8} />
      <CloudPuff position={[5.2, -1.35, -7.5]} scale={0.9} />

      {isRotating && (
        <Html position={[0, -3.25, 0]} center style={{ pointerEvents: "none" }}>
          <span className="three-rotate-live">exploring</span>
        </Html>
      )}
    </>
  );
}
