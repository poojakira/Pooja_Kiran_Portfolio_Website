"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type UniverseWorld = "home" | "agent" | "identity" | "supply" | "telemetry" | "research";

type SceneProps = {
  progress: number;
  reducedMotion: boolean;
  lite: boolean;
};

const CAMERA_KEYS = [
  { p: 0.00, position: new THREE.Vector3(0, 2.4, 9.6), target: new THREE.Vector3(0, 1.0, -0.5) },
  { p: 0.18, position: new THREE.Vector3(-10.2, 2.2, 4.8), target: new THREE.Vector3(-10.5, 0.8, -1.8) },
  { p: 0.36, position: new THREE.Vector3(10.4, 2.4, 4.5), target: new THREE.Vector3(10.4, 0.8, -2.2) },
  { p: 0.55, position: new THREE.Vector3(-10.1, 2.25, -8.5), target: new THREE.Vector3(-10.1, 0.8, -14.2) },
  { p: 0.74, position: new THREE.Vector3(10.1, 2.45, -8.7), target: new THREE.Vector3(10.1, 0.95, -14.5) },
  { p: 0.94, position: new THREE.Vector3(0, 2.8, -18.0), target: new THREE.Vector3(0, 1.0, -24.0) },
  { p: 1.00, position: new THREE.Vector3(0, 3.0, -19.6), target: new THREE.Vector3(0, 1.1, -25.5) },
];

function sampleCamera(progress: number) {
  const p = THREE.MathUtils.clamp(progress, 0, 1);
  let a = CAMERA_KEYS[0];
  let b = CAMERA_KEYS[CAMERA_KEYS.length - 1];

  for (let i = 0; i < CAMERA_KEYS.length - 1; i++) {
    if (p >= CAMERA_KEYS[i].p && p <= CAMERA_KEYS[i + 1].p) {
      a = CAMERA_KEYS[i];
      b = CAMERA_KEYS[i + 1];
      break;
    }
  }

  const raw = (p - a.p) / Math.max(0.0001, b.p - a.p);
  const t = raw * raw * (3 - 2 * raw);
  return {
    position: a.position.clone().lerp(b.position, t),
    target: a.target.clone().lerp(b.target, t),
  };
}

function CameraRig({ progress, reducedMotion }: Pick<SceneProps, "progress" | "reducedMotion">) {
  const targetRef = useRef(new THREE.Vector3(0, 1, 0));

  useFrame(({ camera, pointer }, delta) => {
    const frame = sampleCamera(progress);
    if (!reducedMotion && progress < 0.08) {
      frame.position.x += pointer.x * 0.34;
      frame.position.y += pointer.y * 0.10;
      frame.target.x += pointer.x * 0.05;
      frame.target.y += pointer.y * 0.025;
    }

    const damping = 1 - Math.pow(0.0008, delta);
    camera.position.lerp(frame.position, damping);
    targetRef.current.lerp(frame.target, damping);
    camera.lookAt(targetRef.current);
  });
  return null;
}

function Beam({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 2.4, 0]}>
        <boxGeometry args={[0.13, 7.8, 0.25]} />
        <meshStandardMaterial color="#20262b" metalness={0.84} roughness={0.30} />
      </mesh>
      <mesh position={[0, 6.25, 0]} rotation-z={Math.PI / 2}>
        <boxGeometry args={[0.12, 7.0, 0.22]} />
        <meshStandardMaterial color="#171c20" metalness={0.88} roughness={0.28} />
      </mesh>
    </group>
  );
}

function ArchitecturalShell() {
  const floorStrips = useMemo(() => Array.from({ length: 18 }, (_, i) => -24 + i * 3), []);
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.72, -10]} receiveShadow>
        <planeGeometry args={[42, 58]} />
        <meshStandardMaterial color="#0b0e11" roughness={0.82} metalness={0.08} />
      </mesh>

      {floorStrips.map((z, i) => (
        <mesh key={z} rotation-x={-Math.PI / 2} position={[0, -1.705, z]}>
          <planeGeometry args={[30, 0.025]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#384349" : "#1d252a"} transparent opacity={0.55} />
        </mesh>
      ))}

      {[-15.3, 15.3].map((x) => (
        <mesh key={x} position={[x, 1.6, -10]} rotation-y={Math.PI / 2}>
          <boxGeometry args={[49, 6.6, 0.28]} />
          <meshStandardMaterial color="#0e1317" roughness={0.70} metalness={0.30} />
        </mesh>
      ))}

      {[-14, -7, 0, 7, 14].map((z) => (
        <group key={z}>
          <Beam x={-15.0} z={z} />
          <Beam x={15.0} z={z} />
        </group>
      ))}

      <mesh position={[0, 6.05, -8]}>
        <boxGeometry args={[30, 0.22, 36]} />
        <meshStandardMaterial color="#090d10" roughness={0.52} metalness={0.52} />
      </mesh>

      {[-8.5, 0, 8.5].map((x) => (
        <mesh key={x} position={[x, 5.91, -4]}>
          <boxGeometry args={[5.4, 0.025, 0.20]} />
          <meshBasicMaterial color="#d8e5e2" transparent opacity={0.34} />
        </mesh>
      ))}

      <mesh position={[0, 1.4, -27.0]}>
        <boxGeometry args={[30, 6.4, 0.30]} />
        <meshStandardMaterial color="#0a0e12" roughness={0.68} metalness={0.32} />
      </mesh>
    </group>
  );
}

function ScreenFrame({
  position,
  rotation = [0, 0, 0],
  kind,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  kind: "agent" | "identity" | "provenance";
}) {
  const rows = useMemo(() => Array.from({ length: 7 }, (_, i) => i), []);
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[2.7, 1.55, 0.10]} radius={0.055} smoothness={5}>
        <meshStandardMaterial color="#171d22" roughness={0.24} metalness={0.84} />
      </RoundedBox>
      <mesh position={[0, 0, 0.061]}>
        <planeGeometry args={[2.50, 1.35]} />
        <meshBasicMaterial color={kind === "agent" ? "#102121" : kind === "identity" ? "#111a24" : "#17151d"} />
      </mesh>

      {kind === "agent" && (
        <>
          {rows.map((i) => (
            <mesh key={i} position={[-0.83 + i * 0.27, -0.32 + (i % 2) * 0.08, 0.071]}>
              <boxGeometry args={[0.11, 0.16 + (i % 4) * 0.09, 0.01]} />
              <meshBasicMaterial color={i === 5 ? "#9b625b" : "#6fa49c"} />
            </mesh>
          ))}
          <Line points={[[-1.0,0.38,0.074],[-0.42,0.25,0.074],[0.04,0.34,0.074],[0.56,0.06,0.074],[1.0,0.18,0.074]]} color="#8fb8b2" lineWidth={1} />
        </>
      )}

      {kind === "identity" && (
        <>
          {[
            [-0.90,0.20],[-0.45,-0.26],[0.03,0.34],[0.55,-0.12],[0.96,0.22]
          ].map(([x,y], i) => (
            <mesh key={i} position={[x,y,0.074]}>
              <circleGeometry args={[i === 2 ? 0.095 : 0.065, 18]} />
              <meshBasicMaterial color={i === 4 ? "#aa8068" : "#819db5"} />
            </mesh>
          ))}
          <Line points={[[-0.9,0.2,0.074],[-0.45,-0.26,0.074],[0.03,0.34,0.074],[0.55,-0.12,0.074],[0.96,0.22,0.074]]} color="#66839d" lineWidth={1} />
        </>
      )}

      {kind === "provenance" && (
        <>
          {[0.46,0.16,-0.14,-0.44].map((y, i) => (
            <group key={y}>
              <mesh position={[-0.68,y,0.074]}>
                <boxGeometry args={[0.42,0.07,0.01]} />
                <meshBasicMaterial color={i === 2 ? "#98645e" : "#748d8e"} />
              </mesh>
              <mesh position={[0.22,y,0.074]}>
                <boxGeometry args={[1.02 - i * 0.1,0.07,0.01]} />
                <meshBasicMaterial color="#41535c" />
              </mesh>
            </group>
          ))}
        </>
      )}
    </group>
  );
}

function SeatedResearcher({ reducedMotion }: { reducedMotion: boolean }) {
  const head = useRef<THREE.Mesh>(null);
  const body = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (reducedMotion) return;
    if (body.current) body.current.position.y = Math.sin(clock.elapsedTime * 1.1) * 0.009;
    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, pointer.x * 0.13, 0.025);
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -pointer.y * 0.05, 0.025);
    }
  });

  return (
    <group ref={body} position={[0, -0.16, 0.58]}>
      <mesh position={[0,-0.66,0.35]} castShadow>
        <boxGeometry args={[1.72,0.19,1.55]} />
        <meshStandardMaterial color="#10161a" roughness={0.46} metalness={0.58} />
      </mesh>
      <mesh position={[0,0.24,0.77]} rotation-x={-0.15}>
        <boxGeometry args={[1.55,1.78,0.20]} />
        <meshStandardMaterial color="#11171b" roughness={0.60} metalness={0.28} />
      </mesh>

      <mesh position={[0,0.60,0.18]} castShadow>
        <capsuleGeometry args={[0.40,0.78,10,24]} />
        <meshStandardMaterial color="#262d32" roughness={0.78} />
      </mesh>
      <mesh ref={head} position={[0,1.60,0.06]} castShadow>
        <sphereGeometry args={[0.31,32,32]} />
        <meshStandardMaterial color="#30363a" roughness={0.90} />
      </mesh>
      <mesh position={[-0.43,0.32,-0.12]} rotation-z={0.62}>
        <capsuleGeometry args={[0.095,0.72,8,18]} />
        <meshStandardMaterial color="#252c31" roughness={0.78} />
      </mesh>
      <mesh position={[0.43,0.32,-0.12]} rotation-z={-0.62}>
        <capsuleGeometry args={[0.095,0.72,8,18]} />
        <meshStandardMaterial color="#252c31" roughness={0.78} />
      </mesh>
    </group>
  );
}

function CommandCenter({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <group>
      <mesh position={[0,-0.82,-0.72]} castShadow>
        <boxGeometry args={[6.2,0.22,2.35]} />
        <meshStandardMaterial color="#181e22" roughness={0.30} metalness={0.76} />
      </mesh>
      <mesh position={[-2.48,-1.18,-0.72]}>
        <boxGeometry args={[0.36,0.88,1.6]} />
        <meshStandardMaterial color="#12171b" roughness={0.42} metalness={0.55} />
      </mesh>
      <mesh position={[2.48,-1.18,-0.72]}>
        <boxGeometry args={[0.36,0.88,1.6]} />
        <meshStandardMaterial color="#12171b" roughness={0.42} metalness={0.55} />
      </mesh>

      <ScreenFrame position={[-2.45,1.22,-1.47]} rotation={[0,0.25,0]} kind="agent" />
      <ScreenFrame position={[0,1.58,-1.82]} kind="identity" />
      <ScreenFrame position={[2.45,1.22,-1.47]} rotation={[0,-0.25,0]} kind="provenance" />
      <SeatedResearcher reducedMotion={reducedMotion} />

      {[-6.2,6.2].map((x) => (
        <group key={x} position={[x,0.1,-2.1]}>
          <mesh>
            <boxGeometry args={[2.0,4.4,1.72]} />
            <meshStandardMaterial color="#11171b" roughness={0.42} metalness={0.52} />
          </mesh>
          {[1.25,0.45,-0.35,-1.15].map((y) => (
            <mesh key={y} position={[0, y, 0.865]}>
              <boxGeometry args={[1.35,0.05,0.02]} />
              <meshBasicMaterial color="#405052" />
            </mesh>
          ))}
        </group>
      ))}

      <mesh position={[0,-1.68,-2.3]} rotation-x={-Math.PI/2}>
        <ringGeometry args={[3.1,3.14,80]} />
        <meshBasicMaterial color="#688984" transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

function GatewayArch({ x, z, width = 5.5 }: { x: number; z: number; width?: number }) {
  return (
    <group position={[x,0,z]}>
      <mesh position={[-width/2,0.3,0]}>
        <boxGeometry args={[0.32,4.0,0.56]} />
        <meshStandardMaterial color="#1a2024" roughness={0.34} metalness={0.78} />
      </mesh>
      <mesh position={[width/2,0.3,0]}>
        <boxGeometry args={[0.32,4.0,0.56]} />
        <meshStandardMaterial color="#1a2024" roughness={0.34} metalness={0.78} />
      </mesh>
      <mesh position={[0,2.26,0]}>
        <boxGeometry args={[width,0.24,0.56]} />
        <meshStandardMaterial color="#1a2024" roughness={0.34} metalness={0.78} />
      </mesh>
    </group>
  );
}

function AgentControlPlane({ reducedMotion }: { reducedMotion: boolean }) {
  const pulse = useRef<THREE.Mesh>(null);
  const route = useMemo(() => [
    new THREE.Vector3(-13.2,0.20,-2.2),
    new THREE.Vector3(-11.8,0.20,-2.2),
    new THREE.Vector3(-10.4,0.20,-2.2),
    new THREE.Vector3(-9.0,0.20,-2.2),
    new THREE.Vector3(-7.6,0.20,-2.2),
  ], []);

  useFrame(({ clock }) => {
    if (!pulse.current || reducedMotion) return;
    const t = (clock.elapsedTime * 0.18) % 1;
    const s = t * (route.length - 1);
    const i = Math.min(route.length - 2, Math.floor(s));
    pulse.current.position.copy(route[i]).lerp(route[i + 1], s - i);
  });

  return (
    <group>
      <GatewayArch x={-10.4} z={-2.2} width={7.2} />
      <mesh position={[-10.4,-1.56,-2.2]} rotation-x={-Math.PI/2}>
        <planeGeometry args={[9.0,5.8]} />
        <meshStandardMaterial color="#0d1416" roughness={0.62} metalness={0.24} />
      </mesh>
      <Line points={route} color="#719b94" lineWidth={1.2} />
      {route.map((p,i) => (
        <group key={i} position={p}>
          <RoundedBox args={[i === 2 ? 1.08 : 0.64, i === 2 ? 1.5 : 0.82, 0.52]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color={i === 2 ? "#192827" : "#161e23"} roughness={0.36} metalness={0.62} />
          </RoundedBox>
          <mesh position={[0,0,0.271]}>
            <planeGeometry args={[i === 2 ? 0.82 : 0.42, i === 2 ? 1.18 : 0.56]} />
            <meshBasicMaterial color={i === 3 ? "#70413d" : "#2e5d57"} />
          </mesh>
        </group>
      ))}
      <mesh ref={pulse} position={route[0]}>
        <sphereGeometry args={[0.115,24,24]} />
        <meshBasicMaterial color="#d8f0eb" />
      </mesh>
    </group>
  );
}

function IdentityVault() {
  const nodes: Array<[number,number,number]> = [
    [8.0,0.1,-2.4],[9.2,1.30,-2.0],[10.4,0.42,-2.3],[11.8,1.34,-1.9],[13.0,0.12,-2.4],[10.8,2.22,-2.8]
  ];
  return (
    <group>
      <GatewayArch x={10.4} z={-2.2} width={7.4} />
      <mesh position={[10.4,-1.56,-2.2]} rotation-x={-Math.PI/2}>
        <planeGeometry args={[9.2,5.8]} />
        <meshStandardMaterial color="#0d1218" roughness={0.60} metalness={0.28} />
      </mesh>
      <mesh position={[10.4,0.55,-2.35]}>
        <cylinderGeometry args={[1.22,1.48,3.15,48]} />
        <meshPhysicalMaterial color="#17212a" roughness={0.22} metalness={0.72} clearcoat={0.35} />
      </mesh>
      <mesh position={[10.4,0.55,-2.35]}>
        <cylinderGeometry args={[1.62,1.62,3.55,64,1,true]} />
        <meshPhysicalMaterial color="#516d78" transparent opacity={0.08} transmission={0.3} roughness={0.12} side={THREE.DoubleSide} />
      </mesh>
      {nodes.map((n,i) => (
        <mesh key={i} position={n}>
          <icosahedronGeometry args={[i === 2 ? 0.34 : 0.19,1]} />
          <meshStandardMaterial color={i === 4 ? "#a87965" : "#8da5ba"} emissive={i === 4 ? "#3b1510" : "#172c3b"} emissiveIntensity={0.6} />
        </mesh>
      ))}
      <Line points={nodes.slice(0,5)} color="#708ca2" lineWidth={1.05} />
      <Line points={[nodes[2],nodes[5]]} color="#a1875e" lineWidth={1.05} />
    </group>
  );
}

function SupplyLab({ reducedMotion }: { reducedMotion: boolean }) {
  const scanner = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!scanner.current || reducedMotion) return;
    scanner.current.position.x = -10.1 + Math.sin(clock.elapsedTime * 0.65) * 2.35;
  });

  return (
    <group>
      <mesh position={[-10.1,-1.56,-14.3]} rotation-x={-Math.PI/2}>
        <planeGeometry args={[9.8,7.3]} />
        <meshStandardMaterial color="#101417" roughness={0.66} metalness={0.23} />
      </mesh>
      <mesh position={[-10.1,-0.88,-14.3]}>
        <boxGeometry args={[8.7,0.25,2.2]} />
        <meshStandardMaterial color="#191e22" roughness={0.33} metalness={0.70} />
      </mesh>
      {[-13.0,-11.55,-10.1,-8.65,-7.2].map((x,i) => (
        <group key={x} position={[x,-0.18,-14.3]}>
          <RoundedBox args={[0.92,0.92,0.92]} radius={0.075} smoothness={4}>
            <meshStandardMaterial color={i === 2 ? "#242b30" : "#181e22"} wireframe={i === 4} roughness={0.38} metalness={0.48} />
          </RoundedBox>
          <mesh position={[0,0,0.47]}>
            <planeGeometry args={[0.53,0.07]} />
            <meshBasicMaterial color={i === 1 ? "#9d6d63" : "#718f8d"} />
          </mesh>
        </group>
      ))}
      <group ref={scanner} position={[-10.1,0.05,-14.3]}>
        <mesh position={[0,1.2,0]}>
          <boxGeometry args={[0.06,2.95,2.95]} />
          <meshBasicMaterial color="#a6c5c2" transparent opacity={0.34} />
        </mesh>
        <mesh position={[0,2.64,0]}>
          <boxGeometry args={[0.35,0.20,3.2]} />
          <meshStandardMaterial color="#1a2226" roughness={0.30} metalness={0.75} />
        </mesh>
      </group>
      <GatewayArch x={-10.1} z={-17.2} width={7.8} />
    </group>
  );
}

function TelemetryGrid({ reducedMotion }: { reducedMotion: boolean }) {
  const ring = useRef<THREE.Mesh>(null);
  const bars = useMemo(() => Array.from({ length: 36 }, (_, i) => ({
    x: 6.9 + (i % 6) * 1.28,
    z: -17.0 + Math.floor(i / 6) * 1.18,
    h: 0.34 + ((i * 17) % 9) * 0.14,
  })), []);

  useFrame(({ clock }) => {
    if (!ring.current || reducedMotion) return;
    ring.current.rotation.z = clock.elapsedTime * 0.08;
  });

  return (
    <group>
      <mesh position={[10.1,-1.56,-14.2]} rotation-x={-Math.PI/2}>
        <planeGeometry args={[9.8,8.5]} />
        <meshStandardMaterial color="#0d1216" roughness={0.67} metalness={0.22} />
      </mesh>
      {bars.map((b,i) => (
        <mesh key={i} position={[b.x,-1.35 + b.h/2,b.z]}>
          <boxGeometry args={[0.14,b.h,0.14]} />
          <meshStandardMaterial color={i % 10 === 0 ? "#8f5e58" : "#57797a"} emissive={i % 10 === 0 ? "#32120e" : "#0f292a"} emissiveIntensity={0.42} />
        </mesh>
      ))}
      <mesh ref={ring} position={[10.1,1.25,-14.1]}>
        <torusGeometry args={[1.75,0.026,10,110]} />
        <meshBasicMaterial color="#7d9a9c" transparent opacity={0.68} />
      </mesh>
      <mesh position={[10.1,1.25,-14.1]} rotation-x={Math.PI/2}>
        <torusGeometry args={[1.15,0.026,10,110]} />
        <meshBasicMaterial color="#526e76" transparent opacity={0.58} />
      </mesh>
      <Line points={[[7.3,2.3,-15.6],[8.8,1.2,-14.6],[10.1,1.25,-14.1],[11.6,2.0,-13.2],[13.2,0.7,-12.4]]} color="#759397" lineWidth={1.0} />
    </group>
  );
}

function ResearchChamber() {
  const xPositions = [-4.5,-2.25,0,2.25,4.5];
  return (
    <group position={[0,0,-24.5]}>
      <mesh position={[0,-1.56,0]} rotation-x={-Math.PI/2}>
        <circleGeometry args={[6.3,84]} />
        <meshStandardMaterial color="#0e1215" roughness={0.64} metalness={0.25} />
      </mesh>
      <mesh position={[0,-1.53,0]} rotation-x={-Math.PI/2}>
        <ringGeometry args={[4.9,4.94,84]} />
        <meshBasicMaterial color="#60797d" transparent opacity={0.42} />
      </mesh>
      {xPositions.map((x,i) => (
        <group key={x} position={[x,0,0]}>
          <mesh position={[0,1.10,0]}>
            <boxGeometry args={[0.72,4.6 - Math.abs(x)*0.16,0.72]} />
            <meshStandardMaterial color="#171d21" roughness={0.34} metalness={0.72} />
          </mesh>
          <mesh position={[0,1.10,0.37]}>
            <planeGeometry args={[0.34,2.9 - Math.abs(x)*0.09]} />
            <meshBasicMaterial color={i === 2 ? "#365d5a" : "#2b3c47"} />
          </mesh>
        </group>
      ))}
      <Line points={[[-4.5,3.45,0],[-2.25,3.85,0],[0,4.25,0],[2.25,3.85,0],[4.5,3.45,0]]} color="#789195" lineWidth={1} />
      <GatewayArch x={0} z={-2.3} width={9.8} />
    </group>
  );
}

function Scene({ progress, reducedMotion }: SceneProps) {
  return (
    <>
      <fog attach="fog" args={["#040609", 12, 48]} />
      <ambientLight intensity={0.24} />
      <directionalLight position={[-8,10,6]} intensity={1.55} color="#dbe3e2" castShadow />
      <pointLight position={[0,4.0,2.0]} intensity={18} distance={15} color="#9ec0ba" />
      <pointLight position={[-10,2.0,-2]} intensity={11} distance={11} color="#5f8c84" />
      <pointLight position={[10,2.2,-2]} intensity={10} distance={11} color="#657e95" />
      <pointLight position={[-10,2.0,-14]} intensity={9} distance={10} color="#7f9790" />
      <pointLight position={[10,2.0,-14]} intensity={9} distance={10} color="#5e7b86" />
      <pointLight position={[0,3.0,-24]} intensity={10} distance={11} color="#788a93" />

      <ArchitecturalShell />
      <CommandCenter reducedMotion={reducedMotion} />
      <AgentControlPlane reducedMotion={reducedMotion} />
      <IdentityVault />
      <SupplyLab reducedMotion={reducedMotion} />
      <TelemetryGrid reducedMotion={reducedMotion} />
      <ResearchChamber />
      <CameraRig progress={progress} reducedMotion={reducedMotion} />
    </>
  );
}

export default function TrustScene({ progress, reducedMotion, lite }: SceneProps) {
  return (
    <div className="universe-canvas" aria-hidden="true">
      <Canvas
        shadows={!lite}
        dpr={lite ? [1, 1.15] : [1, 1.55]}
        camera={{ fov: 40, near: 0.1, far: 90, position: [0,2.4,9.6] }}
        gl={{ antialias: !lite, alpha: false, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Scene progress={progress} reducedMotion={reducedMotion} lite={lite} />
      </Canvas>
    </div>
  );
}
