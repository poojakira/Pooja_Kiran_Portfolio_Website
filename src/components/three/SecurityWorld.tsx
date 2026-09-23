"use client";

import { type CSSProperties, useEffect, useMemo, useRef } from "react";
import { Html, Line, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PORTRAIT_URL } from "@/data/portfolio";

type SecurityWorldProps = {
  progress: number;
};

function ServerRack({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const servers = Array.from({ length: 10 });

  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.15, 2.85, 0.92]} />
        <meshStandardMaterial color="#11171b" roughness={0.42} metalness={0.62} />
      </mesh>

      <mesh position={[0, 0, 0.475]}>
        <boxGeometry args={[0.98, 2.58, 0.035]} />
        <meshPhysicalMaterial
          color="#0b1014"
          roughness={0.16}
          metalness={0.28}
          transmission={0.12}
          transparent
          opacity={0.9}
        />
      </mesh>

      {servers.map((_, index) => {
        const y = 1.08 - index * 0.235;
        return (
          <group key={index} position={[0, y, 0.505]}>
            <mesh>
              <boxGeometry args={[0.82, 0.145, 0.035]} />
              <meshStandardMaterial color={index % 3 === 0 ? "#26323b" : "#1b252c"} metalness={0.5} roughness={0.38} />
            </mesh>
            <mesh position={[-0.31, 0, 0.026]}>
              <boxGeometry args={[0.028, 0.028, 0.012]} />
              <meshBasicMaterial color={index % 4 === 0 ? "#f0ad4e" : "#40c982"} />
            </mesh>
            <mesh position={[-0.25, 0, 0.026]}>
              <boxGeometry args={[0.018, 0.018, 0.012]} />
              <meshBasicMaterial color="#4aa8ff" />
            </mesh>
          </group>
        );
      })}

      <mesh position={[0, -1.48, 0]}>
        <boxGeometry args={[1.28, 0.12, 1.03]} />
        <meshStandardMaterial color="#232c31" roughness={0.56} metalness={0.52} />
      </mesh>
    </group>
  );
}

function CeilingLight({ z }: { z: number }) {
  return (
    <group position={[0, 3.55, z]}>
      <mesh>
        <boxGeometry args={[3.9, 0.08, 0.28]} />
        <meshStandardMaterial color="#dde3e6" emissive="#dfefff" emissiveIntensity={2.2} />
      </mesh>
      <pointLight position={[0, -0.5, 0]} intensity={1.2} distance={8} color="#d9ecff" />
    </group>
  );
}

function AccessGate({ z, label }: { z: number; label: string }) {
  return (
    <group position={[0, 0, z]}>
      <mesh position={[-2.7, 1.45, 0]} castShadow>
        <boxGeometry args={[0.34, 2.9, 0.55]} />
        <meshStandardMaterial color="#222a30" roughness={0.36} metalness={0.65} />
      </mesh>
      <mesh position={[2.7, 1.45, 0]} castShadow>
        <boxGeometry args={[0.34, 2.9, 0.55]} />
        <meshStandardMaterial color="#222a30" roughness={0.36} metalness={0.65} />
      </mesh>
      <mesh position={[0, 2.82, 0]} castShadow>
        <boxGeometry args={[5.7, 0.22, 0.55]} />
        <meshStandardMaterial color="#242d33" roughness={0.34} metalness={0.62} />
      </mesh>

      <mesh position={[-2.35, 1.12, 0.32]}>
        <boxGeometry args={[0.18, 0.32, 0.06]} />
        <meshStandardMaterial color="#10161a" roughness={0.32} metalness={0.35} />
      </mesh>
      <mesh position={[-2.35, 1.18, 0.356]}>
        <boxGeometry args={[0.07, 0.07, 0.01]} />
        <meshBasicMaterial color="#48d891" />
      </mesh>

      <Html position={[0, 2.78, 0.35]} center transform distanceFactor={7}>
        <div className="facility-sign">{label}</div>
      </Html>
    </group>
  );
}

function WallDisplay({
  position,
  rotation,
  title,
  lines,
  accent,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
  lines: string[];
  accent: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[2.35, 1.35, 0.1]} />
        <meshStandardMaterial color="#11181e" roughness={0.26} metalness={0.34} />
      </mesh>
      <mesh position={[0, 0, 0.057]}>
        <planeGeometry args={[2.14, 1.14]} />
        <meshBasicMaterial color="#0d1419" />
      </mesh>
      <Html position={[0, 0, 0.075]} center transform distanceFactor={5.4}>
        <div className="facility-screen" style={{ "--screen-accent": accent } as CSSProperties}>
          <strong>{title}</strong>
          {lines.map((line) => <span key={line}>{line}</span>)}
        </div>
      </Html>
    </group>
  );
}

function PortraitLobby() {
  const texture = useTexture(PORTRAIT_URL);
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group position={[0, 1.55, 3.4]}>
      <mesh position={[0, 0, -0.035]} castShadow>
        <boxGeometry args={[2.15, 2.15, 0.12]} />
        <meshStandardMaterial color="#1e262b" roughness={0.36} metalness={0.46} />
      </mesh>
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[1.92, 1.92]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <Html position={[0, -1.28, 0.06]} center transform distanceFactor={5.2}>
        <div className="facility-nameplate">
          <strong>POOJA KIRAN</strong>
          <span>SECURITY ENGINEER</span>
        </div>
      </Html>
    </group>
  );
}

function GlassPartition({ z }: { z: number }) {
  return (
    <group position={[0, 1.6, z]}>
      <mesh position={[-4.15, 0, 0]}>
        <boxGeometry args={[0.12, 3.2, 5.8]} />
        <meshPhysicalMaterial
          color="#91a6b2"
          roughness={0.08}
          metalness={0.08}
          transmission={0.45}
          transparent
          opacity={0.28}
        />
      </mesh>
      <mesh position={[4.15, 0, 0]}>
        <boxGeometry args={[0.12, 3.2, 5.8]} />
        <meshPhysicalMaterial
          color="#91a6b2"
          roughness={0.08}
          metalness={0.08}
          transmission={0.45}
          transparent
          opacity={0.28}
        />
      </mesh>
    </group>
  );
}

function ModelVault({ z }: { z: number }) {
  const cabinets = [-2.7, -1.35, 0, 1.35, 2.7];
  return (
    <group position={[0, 0, z]}>
      {cabinets.map((x, index) => (
        <group key={x} position={[x, 1.15, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.02, 2.3, 1.25]} />
            <meshStandardMaterial color="#c9d0d4" roughness={0.28} metalness={0.58} />
          </mesh>
          <mesh position={[0, 0, 0.64]}>
            <boxGeometry args={[0.72, 1.65, 0.035]} />
            <meshStandardMaterial color="#192126" roughness={0.3} metalness={0.34} />
          </mesh>
          <mesh position={[0.28, 0.68, 0.67]}>
            <boxGeometry args={[0.09, 0.09, 0.02]} />
            <meshBasicMaterial color={index % 2 === 0 ? "#52d990" : "#4aa8ff"} />
          </mesh>
        </group>
      ))}
      <Html position={[0, 2.8, 0.2]} center transform distanceFactor={7}>
        <div className="facility-zone-label">MODEL ARTIFACT VAULT</div>
      </Html>
    </group>
  );
}

function SOCDesk({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.72, 0]} castShadow>
        <boxGeometry args={[3.3, 0.12, 1.1]} />
        <meshStandardMaterial color="#30383d" roughness={0.48} metalness={0.44} />
      </mesh>
      {[-1.25, 1.25].map((x) => (
        <mesh key={x} position={[x, 0.34, 0]}>
          <boxGeometry args={[0.14, 0.7, 0.14]} />
          <meshStandardMaterial color="#20282c" metalness={0.55} roughness={0.45} />
        </mesh>
      ))}
      {[-0.88, 0, 0.88].map((x, index) => (
        <group key={x} position={[x, 1.45, -0.2]} rotation={[-0.08, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.82, 0.52, 0.06]} />
            <meshStandardMaterial color="#11171b" roughness={0.25} metalness={0.36} />
          </mesh>
          <mesh position={[0, 0, 0.036]}>
            <planeGeometry args={[0.72, 0.42]} />
            <meshBasicMaterial color={index === 1 ? "#12304b" : "#10251f"} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function SecurityWorld({ progress }: SecurityWorldProps) {
  const { camera } = useThree();
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const cameraStops = useMemo(
    () => [
      { p: 0, pos: new THREE.Vector3(0, 1.68, 8.4), look: new THREE.Vector3(0, 1.55, 2.9) },
      { p: 0.22, pos: new THREE.Vector3(0, 1.68, -5.2), look: new THREE.Vector3(0, 1.55, -11) },
      { p: 0.46, pos: new THREE.Vector3(-0.45, 1.72, -20.2), look: new THREE.Vector3(0.35, 1.5, -27.5) },
      { p: 0.70, pos: new THREE.Vector3(0.45, 1.72, -36.5), look: new THREE.Vector3(-0.2, 1.45, -44) },
      { p: 1, pos: new THREE.Vector3(0, 1.7, -54.5), look: new THREE.Vector3(0, 1.45, -62) },
    ],
    [],
  );

  useFrame(() => {
    const p = THREE.MathUtils.clamp(progressRef.current, 0, 1);

    let a = cameraStops[0];
    let b = cameraStops[cameraStops.length - 1];
    for (let i = 0; i < cameraStops.length - 1; i += 1) {
      if (p >= cameraStops[i].p && p <= cameraStops[i + 1].p) {
        a = cameraStops[i];
        b = cameraStops[i + 1];
        break;
      }
    }

    const local = THREE.MathUtils.smoothstep(p, a.p, b.p);
    const targetPos = a.pos.clone().lerp(b.pos, local);
    const targetLook = a.look.clone().lerp(b.look, local);

    camera.position.lerp(targetPos, 0.075);
    const currentDirection = new THREE.Vector3();
    camera.getWorldDirection(currentDirection);
    const currentLook = camera.position.clone().add(currentDirection.multiplyScalar(6));
    currentLook.lerp(targetLook, 0.08);
    camera.lookAt(currentLook);
  });

  const rackRows = [
    [-3.25, -10], [-1.95, -10], [1.95, -10], [3.25, -10],
    [-3.25, -14], [-1.95, -14], [1.95, -14], [3.25, -14],
    [-3.25, -27], [-1.95, -27], [1.95, -27], [3.25, -27],
    [-3.25, -31], [-1.95, -31], [1.95, -31], [3.25, -31],
  ] as [number, number][];

  return (
    <>
      <color attach="background" args={["#10161a"]} />

      <mesh position={[0, -0.05, -28]} receiveShadow>
        <boxGeometry args={[9.6, 0.18, 76]} />
        <meshStandardMaterial color="#3b4144" roughness={0.94} metalness={0.04} />
      </mesh>

      <mesh position={[-4.75, 1.8, -28]} receiveShadow>
        <boxGeometry args={[0.16, 3.7, 76]} />
        <meshStandardMaterial color="#262d31" roughness={0.84} metalness={0.18} />
      </mesh>
      <mesh position={[4.75, 1.8, -28]} receiveShadow>
        <boxGeometry args={[0.16, 3.7, 76]} />
        <meshStandardMaterial color="#262d31" roughness={0.84} metalness={0.18} />
      </mesh>
      <mesh position={[0, 3.72, -28]} receiveShadow>
        <boxGeometry args={[9.6, 0.18, 76]} />
        <meshStandardMaterial color="#1e2529" roughness={0.7} metalness={0.34} />
      </mesh>

      {Array.from({ length: 20 }, (_, i) => 5 - i * 3.5).map((z) => (
        <CeilingLight key={z} z={z} />
      ))}

      <PortraitLobby />

      <AccessGate z={-4.5} label="AUTHORIZED PERSONNEL · AI SECURITY LAB" />

      <Line
        points={[[-0.9, 0.08, 4], [-0.9, 0.08, -61]]}
        color="#286fb4"
        lineWidth={2}
        transparent
        opacity={0.48}
      />
      <Line
        points={[[0.9, 0.08, 4], [0.9, 0.08, -61]]}
        color="#694fa6"
        lineWidth={2}
        transparent
        opacity={0.4}
      />

      {rackRows.map(([x, z]) => (
        <ServerRack
          key={`${x}-${z}`}
          position={[x, 1.42, z]}
          rotation={[0, x < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
        />
      ))}

      <GlassPartition z={-12} />

      <WallDisplay
        position={[-4.56, 1.78, -17]}
        rotation={[0, Math.PI / 2, 0]}
        title="AGENT EXECUTION CONTROL"
        lines={["MCP / JSON-RPC policy", "capability checks", "prompt-injection signals", "audit + SIEM validation"]}
        accent="#4aa8ff"
      />
      <WallDisplay
        position={[4.56, 1.78, -25]}
        rotation={[0, -Math.PI / 2, 0]}
        title="IDENTITY CONTROL"
        lines={["AWS IAM analysis", "AssumeRole / PassRole", "wildcard risk", "authorization paths"]}
        accent="#9b7ceb"
      />

      <AccessGate z={-22} label="IDENTITY & AUTHORIZATION ZONE" />

      <mesh position={[0, 0.07, -24.5]} receiveShadow>
        <boxGeometry args={[4.4, 0.035, 6.2]} />
        <meshStandardMaterial color="#252d31" roughness={0.7} metalness={0.2} />
      </mesh>

      <Line
        points={[[-1.8, 0.11, -24], [-1.1, 0.11, -28], [0, 0.11, -29.5], [1.1, 0.11, -28], [1.8, 0.11, -24]]}
        color="#6f5fd0"
        lineWidth={2.1}
        transparent
        opacity={0.7}
      />

      <AccessGate z={-38} label="MODEL SUPPLY-CHAIN ZONE" />
      <ModelVault z={-45.5} />

      <WallDisplay
        position={[-4.56, 1.78, -46]}
        rotation={[0, Math.PI / 2, 0]}
        title="MODEL PROVENANCE"
        lines={["artifact metadata", "serialization risk", "loader behavior", "supply-chain evidence"]}
        accent="#d98a49"
      />

      <SOCDesk position={[0, 0, -58]} />
      <WallDisplay
        position={[0, 2.35, -61.6]}
        rotation={[0, 0, 0]}
        title="DETECTION & VALIDATION"
        lines={["telemetry", "security testing", "evidence", "operational visibility"]}
        accent="#4bc98a"
      />

      <Html position={[0, 3.28, -58.8]} center transform distanceFactor={7}>
        <div className="facility-zone-label">SECURITY OPERATIONS & VALIDATION</div>
      </Html>
    </>
  );
}
