"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

export type TrustWorldId =
  | "core"
  | "agent"
  | "identity"
  | "model"
  | "adversarial"
  | "soc"
  | "cloud"
  | "real"
  | "vault"
  | "observatory";

export type TrustPhase = "normal" | "threat" | "analysis" | "control" | "recovery";
export type TravelMode = "foot" | "vehicle";

type TrustUniverseCanvasProps = {
  currentWorld: TrustWorldId;
  destination?: TrustWorldId | null;
  travelMode?: TravelMode;
  quality?: "balanced" | "lite";
  phase?: TrustPhase;
  reduceMotion?: boolean;
  onEnterWorld?: (id: TrustWorldId) => void;
  onInspectWorld?: (id: TrustWorldId) => void;
  onTravelModeChange?: (mode: TravelMode) => void;
  onAutopilotComplete?: () => void;
};

type Vec3 = [number, number, number];

const WORLD_POSITIONS: Record<TrustWorldId, Vec3> = {
  core: [0, 0, 0],
  agent: [0, 0, -42],
  identity: [35, 0, -16],
  model: [38, 0, 26],
  adversarial: [10, 0, 47],
  soc: [-28, 0, 34],
  cloud: [-42, 0, -8],
  real: [-28, 0, -42],
  vault: [-13, 0, 12],
  observatory: [0, 0, 22],
};

const CAMERA_PRESETS: Record<TrustWorldId, { position: Vec3; target: Vec3 }> = {
  core: { position: [0, 13.5, 31], target: [0, 5.4, -3] },
  agent: { position: [7, 7, -28], target: [0, 4, -42] },
  identity: { position: [48, 10, -3], target: [35, 6, -16] },
  model: { position: [50, 7, 34], target: [38, 3.6, 26] },
  adversarial: { position: [19, 5, 58], target: [10, 2.2, 47] },
  soc: { position: [-17, 7, 45], target: [-28, 3.8, 34] },
  cloud: { position: [-53, 9, 2], target: [-42, 4.2, -8] },
  real: { position: [-15, 9, -53], target: [-28, 2.5, -42] },
  vault: { position: [-4, 5, 19], target: [-13, 2.8, 12] },
  observatory: { position: [0, 18, 31], target: [0, 8, 8] },
};

const concrete = "#32373a";
const concreteLight = "#596064";
const glass = "#16262b";
const steel = "#68747a";
const warm = "#d7c39a";
const cool = "#6ea9b3";
const warning = "#a84639";
const safe = "#85a991";

function Building({
  position,
  size,
  tone = "dark",
  windows = true,
}: {
  position: Vec3;
  size: Vec3;
  tone?: "dark" | "glass" | "light";
  windows?: boolean;
}) {
  const material =
    tone === "glass"
      ? <meshPhysicalMaterial color={glass} metalness={0.22} roughness={0.18} transmission={0.17} transparent opacity={0.92} />
      : <meshStandardMaterial color={tone === "light" ? concreteLight : concrete} metalness={0.26} roughness={0.58} />;

  const floors = Math.max(2, Math.min(8, Math.floor(size[1] / 2.1)));

  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, size[1] / 2, 0]}>
        <boxGeometry args={size} />
        {material}
      </mesh>
      {windows &&
        Array.from({ length: floors }, (_, index) => (
          <mesh key={index} position={[0, 1.2 + index * (size[1] - 1.8) / Math.max(1, floors - 1), size[2] / 2 + 0.012]}>
            <boxGeometry args={[size[0] * 0.72, 0.08, 0.018]} />
            <meshBasicMaterial color={index % 3 === 0 ? warm : cool} transparent opacity={0.34} />
          </mesh>
        ))}
    </group>
  );
}

function Road({ from, to, width = 2.4 }: { from: Vec3; to: Vec3; width?: number }) {
  const start = new THREE.Vector3(...from);
  const end = new THREE.Vector3(...to);
  const delta = end.clone().sub(start);
  const length = delta.length();
  const midpoint = start.clone().add(end).multiplyScalar(0.5);
  const angle = Math.atan2(delta.x, delta.z);

  return (
    <group position={[midpoint.x, 0.03, midpoint.z]} rotation={[0, angle, 0]}>
      <mesh receiveShadow>
        <boxGeometry args={[width, 0.05, length]} />
        <meshStandardMaterial color="#171b1d" roughness={0.94} />
      </mesh>
      <mesh position={[0, 0.032, 0]}>
        <boxGeometry args={[0.045, 0.012, length * 0.96]} />
        <meshBasicMaterial color="#b7b2a4" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function DataConnection({ from, to, active }: { from: Vec3; to: Vec3; active: boolean }) {
  const curve = useMemo(() => {
    const a = new THREE.Vector3(...from).add(new THREE.Vector3(0, 0.18, 0));
    const b = new THREE.Vector3(...to).add(new THREE.Vector3(0, 0.18, 0));
    const mid = a.clone().add(b).multiplyScalar(0.5);
    mid.y += 0.35;
    return new THREE.CatmullRomCurve3([a, mid, b]);
  }, [from, to]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 48, active ? 0.055 : 0.026, 8, false]} />
      <meshBasicMaterial color={active ? cool : "#5a6669"} transparent opacity={active ? 0.7 : 0.16} />
    </mesh>
  );
}

function TrustCore({ phase }: { phase: TrustPhase }) {
  const alert = phase === "threat" || phase === "analysis";
  return (
    <group position={WORLD_POSITIONS.core}>
      <mesh receiveShadow position={[0, 0.08, 0]}>
        <cylinderGeometry args={[9, 10, 0.16, 48]} />
        <meshStandardMaterial color="#23292c" roughness={0.72} metalness={0.15} />
      </mesh>
      <mesh castShadow position={[0, 5.6, 0]}>
        <cylinderGeometry args={[4.4, 5.1, 11.2, 32]} />
        <meshPhysicalMaterial color="#1a272b" roughness={0.12} metalness={0.25} transmission={0.2} transparent opacity={0.9} />
      </mesh>
      {Array.from({ length: 9 }, (_, index) => (
        <mesh key={index} position={[0, 1.1 + index * 1.08, 4.58 - index * 0.07]}>
          <boxGeometry args={[6.1, 0.045, 0.03]} />
          <meshBasicMaterial color={alert ? warning : warm} transparent opacity={alert ? 0.46 : 0.22} />
        </mesh>
      ))}
      <mesh position={[0, 11.5, 0]}>
        <cylinderGeometry args={[0.55, 0.85, 1.5, 24]} />
        <meshStandardMaterial color={steel} metalness={0.7} roughness={0.24} />
      </mesh>
      <pointLight position={[0, 9, 2]} intensity={alert ? 10 : 5} distance={24} color={alert ? warning : warm} />
    </group>
  );
}

function AgentCity({ phase }: { phase: TrustPhase }) {
  const p = WORLD_POSITIONS.agent;
  const alert = phase === "threat";
  return (
    <group position={p}>
      {[
        [-8, 0, -3, 4, 12, 5],
        [-3, 0, 2, 5, 17, 6],
        [4, 0, -2, 5, 10, 5],
        [8, 0, 4, 4, 15, 5],
        [1, 0, 7, 6, 7, 7],
      ].map((b, index) => (
        <Building key={index} position={[b[0], 0, b[2]] as Vec3} size={[b[3], b[4], b[5]] as Vec3} tone={index === 1 ? "glass" : "dark"} />
      ))}
      <mesh position={[0, 2.25, -8]} castShadow>
        <boxGeometry args={[10, 4.5, 1.2]} />
        <meshStandardMaterial color="#22292d" roughness={0.5} metalness={0.25} />
      </mesh>
      <mesh position={[0, 2.25, -7.37]}>
        <boxGeometry args={[7.8, 2.4, 0.03]} />
        <meshBasicMaterial color={alert ? warning : cool} transparent opacity={alert ? 0.54 : 0.2} />
      </mesh>
      <pointLight position={[0, 4.2, -6]} intensity={alert ? 12 : 4} color={alert ? warning : cool} distance={20} />
    </group>
  );
}

function IdentityDistrict({ phase }: { phase: TrustPhase }) {
  const p = WORLD_POSITIONS.identity;
  const alert = phase === "threat" || phase === "analysis";
  return (
    <group position={p}>
      <Building position={[0, 0, 0]} size={[8, 24, 8]} tone="glass" />
      <Building position={[-9, 0, 6]} size={[6, 12, 7]} tone="dark" />
      <Building position={[9, 0, 7]} size={[6, 15, 7]} tone="dark" />
      <mesh position={[0, 10.5, 0]}>
        <boxGeometry args={[8.2, 0.12, 8.2]} />
        <meshBasicMaterial color={alert ? warning : cool} transparent opacity={0.38} />
      </mesh>
      <mesh position={[-4.5, 8, 3.2]} rotation={[0, 0, -0.32]}>
        <boxGeometry args={[10, 0.22, 0.7]} />
        <meshStandardMaterial color={steel} metalness={0.68} roughness={0.26} />
      </mesh>
    </group>
  );
}

function ModelLab({ phase }: { phase: TrustPhase }) {
  const p = WORLD_POSITIONS.model;
  const quarantined = phase === "control" || phase === "recovery";
  return (
    <group position={p}>
      <mesh receiveShadow position={[0, 0.08, 0]}>
        <boxGeometry args={[22, 0.14, 18]} />
        <meshStandardMaterial color="#b8b5aa" roughness={0.88} />
      </mesh>
      <Building position={[-5, 0, 1]} size={[9, 6, 14]} tone="light" windows={false} />
      <Building position={[6.2, 0, 2]} size={[8, 8, 11]} tone="glass" windows={false} />
      <mesh position={[6.2, 3.5, 2]}>
        <boxGeometry args={[4.2, 4.3, 4.2]} />
        <meshPhysicalMaterial color={quarantined ? "#273f38" : "#27373b"} roughness={0.08} metalness={0.1} transmission={0.5} transparent opacity={0.72} />
      </mesh>
      <mesh position={[6.2, 3.5, 2]}>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshStandardMaterial color={quarantined ? safe : cool} metalness={0.35} roughness={0.34} />
      </mesh>
      <pointLight position={[6.2, 5.2, 2]} intensity={quarantined ? 8 : 4} distance={15} color={quarantined ? safe : cool} />
    </group>
  );
}

function AdversarialFacility({ phase }: { phase: TrustPhase }) {
  const p = WORLD_POSITIONS.adversarial;
  const alert = phase !== "normal" && phase !== "recovery";
  return (
    <group position={p}>
      <mesh receiveShadow position={[0, -1.5, 0]}>
        <boxGeometry args={[21, 3.2, 16]} />
        <meshStandardMaterial color="#15191b" roughness={0.78} />
      </mesh>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[17, 3.5, 12]} />
        <meshStandardMaterial color="#24292c" roughness={0.62} metalness={0.22} />
      </mesh>
      {[[-5, 0], [0, 0], [5, 0]].map(([x, z], index) => (
        <mesh key={index} position={[x, 1.1, z + 6.02]}>
          <boxGeometry args={[3.4, 1.1, 0.03]} />
          <meshBasicMaterial color={alert && index === 1 ? warning : "#66777a"} transparent opacity={alert && index === 1 ? 0.65 : 0.22} />
        </mesh>
      ))}
      <pointLight position={[0, 2.5, 3]} intensity={alert ? 10 : 2} distance={18} color={alert ? warning : warm} />
    </group>
  );
}

function Soc({ phase }: { phase: TrustPhase }) {
  const p = WORLD_POSITIONS.soc;
  const active = phase === "analysis" || phase === "control";
  return (
    <group position={p}>
      <Building position={[0, 0, 0]} size={[18, 7, 13]} tone="glass" windows={false} />
      <mesh position={[0, 3.8, 6.53]}>
        <boxGeometry args={[12.5, 2.7, 0.04]} />
        <meshBasicMaterial color={active ? cool : "#4e5a5d"} transparent opacity={active ? 0.52 : 0.18} />
      </mesh>
      {Array.from({ length: 6 }, (_, index) => (
        <mesh key={index} position={[-6.5 + index * 2.6, 1.05, 0]}>
          <boxGeometry args={[1.3, 0.09, 3.1]} />
          <meshStandardMaterial color="#636a6d" roughness={0.62} />
        </mesh>
      ))}
      <pointLight position={[0, 4.8, 3]} intensity={active ? 8 : 3} distance={20} color={cool} />
    </group>
  );
}

function CloudDistrict({ phase }: { phase: TrustPhase }) {
  const p = WORLD_POSITIONS.cloud;
  const active = phase === "analysis" || phase === "control";
  return (
    <group position={p}>
      {[-8, -3, 2, 7].map((x, index) => (
        <group key={x} position={[x, 0, index % 2 ? 3 : -2]}>
          <Building position={[0, 0, 0]} size={[4.2, 6 + index * 1.3, 9]} tone={index === 2 ? "glass" : "dark"} windows={false} />
          {Array.from({ length: 6 }, (_, row) => (
            <mesh key={row} position={[0, 1.1 + row * 0.72, 4.52]}>
              <boxGeometry args={[2.9, 0.05, 0.02]} />
              <meshBasicMaterial color={active ? cool : "#526064"} transparent opacity={active ? 0.38 : 0.16} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, 0.15, 9]} receiveShadow>
        <boxGeometry args={[24, 0.2, 2.2]} />
        <meshStandardMaterial color="#202528" roughness={0.82} />
      </mesh>
    </group>
  );
}

function RealWorldZone({ phase }: { phase: TrustPhase }) {
  const p = WORLD_POSITIONS.real;
  const safeState = phase === "control" || phase === "recovery";
  return (
    <group position={p}>
      <mesh receiveShadow position={[0, 0.02, 0]}>
        <boxGeometry args={[30, 0.05, 22]} />
        <meshStandardMaterial color="#2a2e30" roughness={0.94} />
      </mesh>
      <Building position={[-8, 0, 3]} size={[13, 5, 8]} tone="glass" />
      <mesh position={[5, 0.08, -1]}>
        <boxGeometry args={[18, 0.08, 3.2]} />
        <meshStandardMaterial color="#161a1c" roughness={0.94} />
      </mesh>
      <group position={[6, 1.15, 0]} rotation={[0, -0.35, 0]}>
        <mesh castShadow>
          <boxGeometry args={[7.2, 0.5, 1.1]} />
          <meshStandardMaterial color="#c5c8c7" metalness={0.38} roughness={0.32} />
        </mesh>
        <mesh position={[1.2, 0.7, 0]} rotation={[0, 0, -0.14]}>
          <boxGeometry args={[2.8, 0.18, 6.2]} />
          <meshStandardMaterial color="#c5c8c7" metalness={0.38} roughness={0.32} />
        </mesh>
        <mesh position={[-2.6, 0.55, 0]}>
          <boxGeometry args={[1.2, 1.1, 0.9]} />
          <meshStandardMaterial color="#d0d3d2" metalness={0.32} roughness={0.3} />
        </mesh>
      </group>
      <pointLight position={[0, 5, 1]} intensity={safeState ? 5 : 2.4} distance={24} color={safeState ? safe : warm} />
    </group>
  );
}

function Vault() {
  const p = WORLD_POSITIONS.vault;
  return (
    <group position={p}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[10, 3, 10]} />
        <meshStandardMaterial color="#161a1c" roughness={0.42} metalness={0.48} />
      </mesh>
      <mesh position={[0, 1.5, 5.02]}>
        <boxGeometry args={[3.4, 2.2, 0.06]} />
        <meshStandardMaterial color="#7c8586" roughness={0.32} metalness={0.72} />
      </mesh>
      <mesh position={[0, 1.5, 5.08]}>
        <ringGeometry args={[0.58, 0.72, 28]} />
        <meshBasicMaterial color={warm} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function Observatory() {
  const p = WORLD_POSITIONS.observatory;
  return (
    <group position={p}>
      <mesh position={[0, 3.1, 0]} castShadow>
        <cylinderGeometry args={[5.7, 7.2, 6.2, 32]} />
        <meshPhysicalMaterial color="#263337" roughness={0.14} metalness={0.24} transmission={0.18} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 6.3, 0]}>
        <sphereGeometry args={[4.8, 32, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#213136" roughness={0.08} metalness={0.18} transmission={0.32} transparent opacity={0.72} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function CityBackground() {
  const buildings = useMemo(
    () =>
      Array.from({ length: 44 }, (_, index) => {
        const angle = (index / 44) * Math.PI * 2;
        const radius = 61 + (index % 5) * 3.5;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const h = 4 + (index % 7) * 2.1;
        return { x, z, h, w: 2.4 + (index % 4) * 0.8 };
      }),
    [],
  );
  return (
    <group>
      {buildings.map((b, index) => (
        <Building
          key={index}
          position={[b.x, 0, b.z]}
          size={[b.w, b.h, b.w * 0.9]}
          tone={index % 6 === 0 ? "glass" : "dark"}
          windows={index % 3 !== 0}
        />
      ))}
    </group>
  );
}

function MovingTraffic({ reduceMotion }: { reduceMotion: boolean }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (reduceMotion) return;
    const t = clock.elapsedTime;
    if (a.current) {
      a.current.position.x = Math.sin(t * 0.24) * 22;
      a.current.position.z = -20 + Math.cos(t * 0.24) * 8;
    }
    if (b.current) {
      b.current.position.x = -24 + Math.cos(t * 0.19) * 13;
      b.current.position.z = Math.sin(t * 0.19) * 19;
    }
  });
  return (
    <>
      <mesh ref={a} position={[0, 0.32, -20]}>
        <boxGeometry args={[0.9, 0.36, 2.1]} />
        <meshStandardMaterial color="#272c2f" metalness={0.6} roughness={0.26} />
      </mesh>
      <mesh ref={b} position={[-24, 0.32, 0]}>
        <boxGeometry args={[0.9, 0.36, 2.1]} />
        <meshStandardMaterial color="#313638" metalness={0.55} roughness={0.28} />
      </mesh>
    </>
  );
}

function Aircraft({ reduceMotion }: { reduceMotion: boolean }) {
  const craft = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!craft.current || reduceMotion) return;
    const t = clock.elapsedTime * 0.07;
    craft.current.position.set(Math.cos(t) * 48, 15 + Math.sin(t * 1.7) * 1.8, Math.sin(t) * 48);
    craft.current.rotation.y = -t + Math.PI / 2;
  });
  return (
    <group ref={craft} position={[42, 15, 0]}>
      <mesh>
        <boxGeometry args={[4.2, 0.34, 0.62]} />
        <meshStandardMaterial color="#b6bab9" metalness={0.42} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.08, 5.8]} />
        <meshStandardMaterial color="#aeb3b2" metalness={0.4} roughness={0.3} />
      </mesh>
      <pointLight position={[-2.1, 0, 0]} intensity={1.3} distance={3} color="#bf403b" />
    </group>
  );
}

function Rain({ quality, reduceMotion }: { quality: "balanced" | "lite"; reduceMotion: boolean }) {
  const count = quality === "balanced" ? 500 : 180;
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      values[i * 3] = (Math.random() - 0.5) * 120;
      values[i * 3 + 1] = Math.random() * 28;
      values[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    return values;
  }, [count]);

  useFrame((_, delta) => {
    if (!points.current || reduceMotion) return;
    points.current.position.y -= delta * 6.5;
    if (points.current.position.y < -8) points.current.position.y = 0;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#b6ced2" size={0.035} transparent opacity={0.32} depthWrite={false} />
    </points>
  );
}

function CameraRig({
  currentWorld,
  destination,
  reduceMotion,
  onAutopilotComplete,
  onEnterWorld,
}: Pick<TrustUniverseCanvasProps, "currentWorld" | "destination" | "reduceMotion" | "onAutopilotComplete" | "onEnterWorld">) {
  const { camera, pointer } = useThree();
  const completed = useRef<string | null>(null);
  const world = (destination || currentWorld) as TrustWorldId;
  const preset = CAMERA_PRESETS[world] || CAMERA_PRESETS.core;

  useFrame((_, delta) => {
    const speed = reduceMotion ? 1 : 1 - Math.pow(0.001, delta);
    const targetPosition = new THREE.Vector3(...preset.position);
    const parallaxScale = world === "core" ? 0.55 : 0.28;
    targetPosition.x += pointer.x * parallaxScale;
    targetPosition.y += pointer.y * parallaxScale * 0.45;

    if (reduceMotion) camera.position.copy(targetPosition);
    else camera.position.lerp(targetPosition, Math.min(0.055, speed * 0.06));

    const target = new THREE.Vector3(...preset.target);
    target.x += pointer.x * 0.35;
    target.y += pointer.y * 0.16;
    camera.lookAt(target);

    if (destination && camera.position.distanceTo(targetPosition) < 0.7 && completed.current !== destination) {
      completed.current = destination;
      onEnterWorld?.(destination);
      onAutopilotComplete?.();
    }
    if (!destination) completed.current = null;
  });

  return null;
}

function Scene(props: TrustUniverseCanvasProps) {
  const quality = props.quality || "balanced";
  const phase = props.phase || "normal";
  const reduceMotion = Boolean(props.reduceMotion);
  const activeWorld = (props.destination || props.currentWorld) as TrustWorldId;

  const core = WORLD_POSITIONS.core;
  const connections = (Object.keys(WORLD_POSITIONS) as TrustWorldId[]).filter((id) => id !== "core");

  return (
    <>
      <color attach="background" args={["#06090b"]} />
      <fog attach="fog" args={["#10171a", 36, 118]} />
      <Stars radius={130} depth={65} count={quality === "balanced" ? 950 : 350} factor={2.1} saturation={0} fade speed={0.18} />
      <ambientLight intensity={0.34} />
      <hemisphereLight args={["#70848a", "#10100f", 0.42]} />
      <directionalLight
        position={[28, 38, 18]}
        intensity={1.35}
        color="#d8d4c8"
        castShadow={quality === "balanced"}
        shadow-mapSize-width={quality === "balanced" ? 1024 : 512}
        shadow-mapSize-height={quality === "balanced" ? 1024 : 512}
      />
      <pointLight position={[-32, 16, -28]} intensity={6} distance={70} color="#7a9da6" />
      <pointLight position={[38, 12, 26]} intensity={4} distance={52} color="#aa9a79" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[180, 180]} />
        <meshStandardMaterial color="#111719" roughness={0.98} metalness={0.03} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[52, 74, 72]} />
        <meshBasicMaterial color="#1a2326" transparent opacity={0.6} />
      </mesh>

      {connections.map((id) => (
        <Road key={"road-" + id} from={core} to={WORLD_POSITIONS[id]} width={id === "real" ? 3.3 : 2.15} />
      ))}
      {connections.map((id) => (
        <DataConnection key={"data-" + id} from={core} to={WORLD_POSITIONS[id]} active={activeWorld === id || phase !== "normal"} />
      ))}

      <CityBackground />
      <TrustCore phase={phase} />
      <AgentCity phase={activeWorld === "agent" ? phase : "normal"} />
      <IdentityDistrict phase={activeWorld === "identity" ? phase : "normal"} />
      <ModelLab phase={activeWorld === "model" ? phase : "normal"} />
      <AdversarialFacility phase={activeWorld === "adversarial" ? phase : "normal"} />
      <Soc phase={activeWorld === "soc" ? phase : "normal"} />
      <CloudDistrict phase={activeWorld === "cloud" ? phase : "normal"} />
      <RealWorldZone phase={activeWorld === "real" ? phase : "normal"} />
      <Vault />
      <Observatory />
      <MovingTraffic reduceMotion={reduceMotion} />
      <Aircraft reduceMotion={reduceMotion} />
      <Rain quality={quality} reduceMotion={reduceMotion} />

      <CameraRig
        currentWorld={props.currentWorld}
        destination={props.destination}
        reduceMotion={props.reduceMotion}
        onAutopilotComplete={props.onAutopilotComplete}
        onEnterWorld={props.onEnterWorld}
      />
    </>
  );
}

export default function TrustUniverseCanvas(props: TrustUniverseCanvasProps) {
  const quality = props.quality || "balanced";
  return (
    <Canvas
      camera={{ position: CAMERA_PRESETS.core.position, fov: 43, near: 0.1, far: 260 }}
      dpr={quality === "lite" ? 1 : [1, 1.35]}
      shadows={quality === "balanced"}
      gl={{
        antialias: quality === "balanced",
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.82,
      }}
    >
      <Suspense fallback={null}>
        <Scene {...props} />
      </Suspense>
    </Canvas>
  );
}
