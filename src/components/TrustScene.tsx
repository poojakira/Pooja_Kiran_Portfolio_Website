"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type UniverseWorld = "home" | "agent" | "identity" | "supply" | "telemetry" | "research";

const CAMERA_POSITIONS: Record<UniverseWorld, THREE.Vector3> = {
  home: new THREE.Vector3(0, 2.7, 8.6),
  agent: new THREE.Vector3(-10.8, 2.4, 5.4),
  identity: new THREE.Vector3(10.8, 2.6, 4.8),
  supply: new THREE.Vector3(-10.2, 2.1, -8.3),
  telemetry: new THREE.Vector3(10.3, 2.5, -8.5),
  research: new THREE.Vector3(0, 3.1, -18.2),
};

const CAMERA_TARGETS: Record<UniverseWorld, THREE.Vector3> = {
  home: new THREE.Vector3(0, 1.15, 0),
  agent: new THREE.Vector3(-10.8, 0.8, 0),
  identity: new THREE.Vector3(10.8, 0.7, 0),
  supply: new THREE.Vector3(-10.2, 0.65, -13.0),
  telemetry: new THREE.Vector3(10.3, 0.8, -13.0),
  research: new THREE.Vector3(0, 1.0, -23.0),
};

function CameraRig({ world, reducedMotion }: { world: UniverseWorld; reducedMotion: boolean }) {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const desired = CAMERA_POSITIONS[world].clone();
    const focus = CAMERA_TARGETS[world].clone();

    if (!reducedMotion && world === "home") {
      desired.x += pointer.x * 0.45;
      desired.y += pointer.y * 0.16;
      focus.x += pointer.x * 0.08;
      focus.y += pointer.y * 0.04;
    }

    const alpha = 1 - Math.pow(0.0015, delta);
    camera.position.lerp(desired, alpha);
    target.current.lerp(focus, alpha);
    camera.lookAt(target.current);
    state.gl.setClearColor(0x040609, 1);
  });

  return null;
}

function LabShell() {
  const ribs = useMemo(() => Array.from({ length: 11 }, (_, i) => i - 5), []);

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.65, -8]}>
        <planeGeometry args={[48, 50]} />
        <meshStandardMaterial color="#090c10" roughness={0.76} metalness={0.16} />
      </mesh>

      {ribs.map((x) => (
        <group key={x} position={[x * 3.5, 0, -8]}>
          <mesh position={[0, 2.4, 0]}>
            <boxGeometry args={[0.08, 8, 0.18]} />
            <meshStandardMaterial color="#151b21" metalness={0.8} roughness={0.32} />
          </mesh>
          <mesh position={[0, 6.36, 0]} rotation-z={Math.PI / 2}>
            <boxGeometry args={[0.08, 7.8, 0.18]} />
            <meshStandardMaterial color="#10151a" metalness={0.78} roughness={0.35} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 1.7, -26]}>
        <boxGeometry args={[31, 7.2, 0.25]} />
        <meshStandardMaterial color="#0b1015" roughness={0.68} metalness={0.26} />
      </mesh>

      <mesh position={[-15.4, 1.4, -10]} rotation-y={Math.PI / 2}>
        <boxGeometry args={[35, 6.2, 0.18]} />
        <meshStandardMaterial color="#0b1015" roughness={0.72} />
      </mesh>
      <mesh position={[15.4, 1.4, -10]} rotation-y={Math.PI / 2}>
        <boxGeometry args={[35, 6.2, 0.18]} />
        <meshStandardMaterial color="#0b1015" roughness={0.72} />
      </mesh>
    </group>
  );
}

function WorkstationFigure({ reducedMotion }: { reducedMotion: boolean }) {
  const head = useRef<THREE.Mesh>(null);
  const torso = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!reducedMotion && head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, state.pointer.x * 0.18, 0.03);
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -state.pointer.y * 0.07, 0.03);
    }
    if (!reducedMotion && torso.current) {
      torso.current.position.y = -0.22 + Math.sin(state.clock.elapsedTime * 1.15) * 0.008;
    }
  });

  return (
    <group position={[0, -0.22, 0.42]}>
      <mesh position={[0, -0.65, 0.35]}>
        <boxGeometry args={[1.7, 0.18, 1.45]} />
        <meshStandardMaterial color="#10161c" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.34, 0.76]} rotation-x={-0.18}>
        <boxGeometry args={[1.55, 1.8, 0.18]} />
        <meshStandardMaterial color="#11171d" roughness={0.6} />
      </mesh>

      <group ref={torso}>
        <mesh position={[0, 0.52, 0.26]} rotation-x={-0.08}>
          <capsuleGeometry args={[0.38, 0.72, 8, 20]} />
          <meshStandardMaterial color="#242b31" roughness={0.72} />
        </mesh>
        <mesh ref={head} position={[0, 1.48, 0.14]}>
          <sphereGeometry args={[0.31, 28, 28]} />
          <meshStandardMaterial color="#2b3237" roughness={0.82} />
        </mesh>
        <mesh position={[-0.42, 0.3, -0.18]} rotation-z={0.6}>
          <capsuleGeometry args={[0.1, 0.72, 6, 14]} />
          <meshStandardMaterial color="#222a30" roughness={0.72} />
        </mesh>
        <mesh position={[0.42, 0.3, -0.18]} rotation-z={-0.6}>
          <capsuleGeometry args={[0.1, 0.72, 6, 14]} />
          <meshStandardMaterial color="#222a30" roughness={0.72} />
        </mesh>
      </group>
    </group>
  );
}

function Monitor({ position, rotation = [0, 0, 0], kind }: { position: [number, number, number]; rotation?: [number, number, number]; kind: number }) {
  const bars = useMemo(() => Array.from({ length: 7 }, (_, i) => i), []);

  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[2.3, 1.35, 0.12]} radius={0.06} smoothness={4}>
        <meshStandardMaterial color="#111821" metalness={0.78} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0, 0.067]}>
        <planeGeometry args={[2.1, 1.16]} />
        <meshBasicMaterial color={kind === 0 ? "#122a2c" : kind === 1 ? "#192231" : "#231c29"} />
      </mesh>

      {kind === 0 && bars.map((i) => (
        <mesh key={i} position={[-0.72 + i * 0.24, -0.28 + (i % 2) * 0.11, 0.075]}>
          <boxGeometry args={[0.09, 0.18 + ((i * 17) % 5) * 0.065, 0.01]} />
          <meshBasicMaterial color={i === 5 ? "#a26f68" : "#75aaa3"} />
        </mesh>
      ))}

      {kind === 1 && (
        <>
          {[-0.72, -0.2, 0.32, 0.72].map((x, i) => (
            <mesh key={x} position={[x, i % 2 === 0 ? 0.2 : -0.18, 0.076]}>
              <circleGeometry args={[0.07, 20]} />
              <meshBasicMaterial color={i === 3 ? "#b49a6a" : "#8ca6bc"} />
            </mesh>
          ))}
          <Line points={[[-0.72,0.2,0.08],[-0.2,-0.18,0.08],[0.32,0.2,0.08],[0.72,-0.18,0.08]]} color="#667f95" lineWidth={1} />
        </>
      )}

      {kind === 2 && (
        <>
          {[0.44, 0.12, -0.2, -0.52].map((y, i) => (
            <mesh key={y} position={[0, y, 0.076]}>
              <boxGeometry args={[1.55 - i * 0.14, 0.08, 0.01]} />
              <meshBasicMaterial color={i === 2 ? "#af746b" : "#7e9a99"} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

function CommandLab({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, -0.78, -0.58]}>
        <boxGeometry args={[5.8, 0.25, 2.2]} />
        <meshStandardMaterial color="#151a1f" roughness={0.4} metalness={0.72} />
      </mesh>
      <mesh position={[0, -0.3, -1.5]}>
        <boxGeometry args={[0.18, 1.05, 4.3]} />
        <meshStandardMaterial color="#121820" roughness={0.42} metalness={0.62} />
      </mesh>

      <Monitor position={[-2.35, 1.25, -1.3]} rotation={[0, 0.24, 0]} kind={0} />
      <Monitor position={[0, 1.58, -1.7]} kind={1} />
      <Monitor position={[2.35, 1.25, -1.3]} rotation={[0, -0.24, 0]} kind={2} />

      <WorkstationFigure reducedMotion={reducedMotion} />

      <mesh position={[-5.3, 0.55, -2.1]}>
        <boxGeometry args={[2.2, 3.8, 1.6]} />
        <meshStandardMaterial color="#0f151b" roughness={0.55} metalness={0.48} />
      </mesh>
      <mesh position={[5.3, 0.55, -2.1]}>
        <boxGeometry args={[2.2, 3.8, 1.6]} />
        <meshStandardMaterial color="#0f151b" roughness={0.55} metalness={0.48} />
      </mesh>
    </group>
  );
}

function AgentWorld({ reducedMotion }: { reducedMotion: boolean }) {
  const pulse = useRef<THREE.Mesh>(null);
  const points = useMemo(() => [
    new THREE.Vector3(-13.5, 0.7, -0.4),
    new THREE.Vector3(-12.3, 0.7, -0.4),
    new THREE.Vector3(-10.8, 0.7, -0.4),
    new THREE.Vector3(-9.3, 0.7, -0.4),
    new THREE.Vector3(-8.0, 0.7, -0.4),
  ], []);

  useFrame((state) => {
    if (!pulse.current || reducedMotion) return;
    const t = (state.clock.elapsedTime * 0.22) % 1;
    const idx = Math.min(points.length - 2, Math.floor(t * (points.length - 1)));
    const local = (t * (points.length - 1)) - idx;
    pulse.current.position.copy(points[idx]).lerp(points[idx + 1], local);
  });

  return (
    <group>
      <mesh position={[-10.8, -0.95, -0.4]}>
        <cylinderGeometry args={[4.1, 4.1, 0.16, 72]} />
        <meshStandardMaterial color="#0f161a" roughness={0.48} metalness={0.58} />
      </mesh>
      <Line points={points} color="#709e98" lineWidth={1.2} />
      {points.map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <boxGeometry args={[i === 2 ? 0.95 : 0.56, i === 2 ? 1.3 : 0.72, 0.42]} />
            <meshStandardMaterial color={i === 2 ? "#1a2d2d" : "#172028"} metalness={0.62} roughness={0.38} />
          </mesh>
          <mesh position={[0, 0, 0.225]}>
            <planeGeometry args={[i === 2 ? 0.76 : 0.4, i === 2 ? 1.06 : 0.52]} />
            <meshBasicMaterial color={i === 3 ? "#6e3f3c" : "#315d5b"} />
          </mesh>
        </group>
      ))}
      <mesh ref={pulse} position={points[0]}>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshBasicMaterial color="#d2eee8" />
      </mesh>
    </group>
  );
}

function IdentityWorld() {
  const nodes: Array<[number, number, number]> = [
    [8.1,0.1,-0.5],[9.4,1.25,0.15],[10.8,0.5,-0.4],[12.0,1.35,0.2],[13.35,0.15,-0.45],[11.15,2.2,-0.8]
  ];
  return (
    <group>
      <mesh position={[10.8,-0.95,-0.3]}>
        <cylinderGeometry args={[4.2,4.2,0.18,72]} />
        <meshStandardMaterial color="#0f151c" metalness={0.6} roughness={0.46} />
      </mesh>
      <mesh position={[10.8,0.55,-0.4]}>
        <cylinderGeometry args={[1.2,1.45,3.0,40]} />
        <meshStandardMaterial color="#141d27" metalness={0.74} roughness={0.28} />
      </mesh>
      {nodes.map((n,i) => (
        <mesh key={i} position={n}>
          <icosahedronGeometry args={[i === 2 ? 0.32 : 0.19,1]} />
          <meshStandardMaterial color={i === 4 ? "#8b645e" : "#8ba4ba"} emissive={i === 4 ? "#351411" : "#142536"} emissiveIntensity={0.5} />
        </mesh>
      ))}
      <Line points={nodes.slice(0,5)} color="#667f95" lineWidth={1.1} />
      <Line points={[nodes[2],nodes[5]]} color="#9b855c" lineWidth={1.1} />
    </group>
  );
}

function SupplyWorld({ reducedMotion }: { reducedMotion: boolean }) {
  const scanner = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!scanner.current || reducedMotion) return;
    scanner.current.position.x = -10.2 + Math.sin(state.clock.elapsedTime * 0.8) * 2.2;
  });

  return (
    <group>
      <mesh position={[-10.2,-1.0,-13]}>
        <boxGeometry args={[8.6,0.22,3.6]} />
        <meshStandardMaterial color="#11161b" roughness={0.54} metalness={0.55} />
      </mesh>
      {[-13.0,-11.6,-10.2,-8.8,-7.4].map((x,i) => (
        <group key={x} position={[x,-0.15,-13]}>
          <RoundedBox args={[0.9,0.9,0.9]} radius={0.08} smoothness={3}>
            <meshStandardMaterial color={i === 2 ? "#202a31" : "#171f25"} wireframe={i === 4} metalness={0.38} roughness={0.5} />
          </RoundedBox>
          <mesh position={[0,0,0.46]}>
            <planeGeometry args={[0.52,0.08]} />
            <meshBasicMaterial color={i === 1 ? "#a5776f" : "#759b98"} />
          </mesh>
        </group>
      ))}
      <group ref={scanner} position={[-10.2,0.05,-13]}>
        <mesh position={[0,1.1,0]}>
          <boxGeometry args={[0.07,2.8,2.8]} />
          <meshBasicMaterial color="#748d91" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0,0.05,1.36]}>
          <boxGeometry args={[0.07,0.07,2.72]} />
          <meshBasicMaterial color="#748d91" />
        </mesh>
      </group>
    </group>
  );
}

function TelemetryWorld({ reducedMotion }: { reducedMotion: boolean }) {
  const bars = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    x: 7.1 + (i % 6) * 1.22,
    z: -15.7 + Math.floor(i / 6) * 1.2,
    h: 0.35 + ((i * 31) % 11) * 0.13
  })), []);

  return (
    <group>
      <mesh position={[10.2,-1.0,-13.3]}>
        <boxGeometry args={[8.8,0.18,7.4]} />
        <meshStandardMaterial color="#0f151a" roughness={0.55} metalness={0.56} />
      </mesh>
      {bars.map((bar,i) => (
        <mesh key={i} position={[bar.x,-0.78 + bar.h/2,bar.z]}>
          <boxGeometry args={[0.16,bar.h,0.16]} />
          <meshStandardMaterial color={i % 9 === 0 ? "#865a55" : "#617f82"} emissive={i % 9 === 0 ? "#31110f" : "#102a2a"} emissiveIntensity={reducedMotion ? 0.25 : 0.4} />
        </mesh>
      ))}
      <mesh position={[10.2,1.35,-13.4]}>
        <torusGeometry args={[1.75,0.025,10,90]} />
        <meshBasicMaterial color="#738f93" transparent opacity={0.6} />
      </mesh>
      <mesh position={[10.2,1.35,-13.4]} rotation-x={Math.PI/2}>
        <torusGeometry args={[1.1,0.025,10,90]} />
        <meshBasicMaterial color="#536b72" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function ResearchWorld() {
  const columns = [-4,-2,0,2,4];
  return (
    <group position={[0,0,-23]}>
      <mesh position={[0,-1.0,0]}>
        <cylinderGeometry args={[5.6,5.6,0.2,72]} />
        <meshStandardMaterial color="#10151a" metalness={0.54} roughness={0.48} />
      </mesh>
      {columns.map((x,i) => (
        <group key={x} position={[x,0,0]}>
          <mesh position={[0,1.25,0]}>
            <boxGeometry args={[0.62,4.2 - Math.abs(x)*0.22,0.62]} />
            <meshStandardMaterial color="#151c22" roughness={0.38} metalness={0.7} />
          </mesh>
          <mesh position={[0,1.25,0.33]}>
            <planeGeometry args={[0.3,2.8 - Math.abs(x)*0.15]} />
            <meshBasicMaterial color={i === 2 ? "#355f5d" : "#293b49"} />
          </mesh>
        </group>
      ))}
      <Line points={[[-4,3.4,0],[-2,3.9,0],[0,4.25,0],[2,3.9,0],[4,3.4,0]]} color="#6d878b" lineWidth={1} />
    </group>
  );
}

function UniverseScene({ world, reducedMotion, lite }: { world: UniverseWorld; reducedMotion: boolean; lite: boolean }) {
  return (
    <>
      <fog attach="fog" args={["#05070b", 10, lite ? 37 : 49]} />
      <ambientLight intensity={0.34} />
      <directionalLight position={[-5,8,4]} intensity={1.8} color="#d8e1df" />
      <pointLight position={[0,4,1]} intensity={22} distance={12} color="#7fa49d" />
      <pointLight position={[-11,2,-1]} intensity={14} distance={10} color="#527f7b" />
      <pointLight position={[11,2,-1]} intensity={14} distance={10} color="#5b7186" />
      <pointLight position={[0,3,-22]} intensity={12} distance={12} color="#6b7b87" />

      <LabShell />
      <CommandLab reducedMotion={reducedMotion} />
      <AgentWorld reducedMotion={reducedMotion} />
      <IdentityWorld />
      <SupplyWorld reducedMotion={reducedMotion} />
      <TelemetryWorld reducedMotion={reducedMotion} />
      <ResearchWorld />
      <CameraRig world={world} reducedMotion={reducedMotion} />
    </>
  );
}

export default function TrustScene({
  world,
  reducedMotion,
  lite
}: {
  world: UniverseWorld;
  reducedMotion: boolean;
  lite: boolean;
}) {
  return (
    <div className="universe-canvas" aria-hidden="true">
      <Canvas
        dpr={lite ? [1, 1.15] : [1, 1.6]}
        camera={{ fov: 42, near: 0.1, far: 80, position: CAMERA_POSITIONS.home.toArray() }}
        gl={{ antialias: !lite, powerPreference: "high-performance", alpha: false }}
      >
        <UniverseScene world={world} reducedMotion={reducedMotion} lite={lite} />
      </Canvas>
    </div>
  );
}
