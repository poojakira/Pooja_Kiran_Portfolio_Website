"use client";

import { type CSSProperties, useEffect, useMemo, useRef } from "react";
import { Html, Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

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

function AccessGate({
  z,
  label,
  open,
  hook,
}: {
  z: number;
  label: string;
  open: number;
  hook: string;
}) {
  const eased = THREE.MathUtils.smoothstep(open, 0, 1);
  const slide = eased * 1.82;

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

      <mesh position={[-1.34 - slide, 1.42, 0.04]} castShadow>
        <boxGeometry args={[2.56, 2.58, 0.16]} />
        <meshStandardMaterial color="#151c20" roughness={0.3} metalness={0.72} />
      </mesh>
      <mesh position={[1.34 + slide, 1.42, 0.04]} castShadow>
        <boxGeometry args={[2.56, 2.58, 0.16]} />
        <meshStandardMaterial color="#151c20" roughness={0.3} metalness={0.72} />
      </mesh>

      <mesh position={[-2.35, 1.12, 0.32]}>
        <boxGeometry args={[0.18, 0.32, 0.06]} />
        <meshStandardMaterial color="#10161a" roughness={0.32} metalness={0.35} />
      </mesh>
      <mesh position={[-2.35, 1.18, 0.356]}>
        <boxGeometry args={[0.07, 0.07, 0.01]} />
        <meshBasicMaterial color={open > 0.18 ? "#48d891" : "#d99347"} />
      </mesh>

      <Html position={[0, 2.78, 0.35]} center transform distanceFactor={7}>
        <div className="facility-sign">{label}</div>
      </Html>

      <Html position={[0, 1.72, -1.45]} center transform distanceFactor={6.3}>
        <div className={open > 0.5 ? "door-hook visible" : "door-hook"}>
          <span>MY RULE</span>
          <strong>{hook}</strong>
        </div>
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



function getPathPosition(progress: number) {
  const p = THREE.MathUtils.clamp(progress, 0, 1);
  const z = THREE.MathUtils.lerp(4.8, -57.2, p);
  let x = 0;

  if (p >= 0.22 && p < 0.46) x = THREE.MathUtils.lerp(0, 0.34, (p - 0.22) / 0.24);
  else if (p >= 0.46 && p < 0.7) x = THREE.MathUtils.lerp(0.34, -0.28, (p - 0.46) / 0.24);
  else if (p >= 0.7) x = THREE.MathUtils.lerp(-0.28, 0, (p - 0.7) / 0.3);

  return new THREE.Vector3(x, 0, z);
}

function PoojaWalker({ progress }: { progress: number }) {
  const root = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);
  const previous = useRef(progress);
  const walkEnergy = useRef(0);

  useFrame(({ clock }) => {
    if (!root.current) return;

    const delta = Math.abs(progress - previous.current);
    previous.current = progress;
    walkEnergy.current = Math.max(walkEnergy.current * 0.9, Math.min(1, delta * 190));

    const target = getPathPosition(progress);
    root.current.position.lerp(target, 0.12);

    const energy = walkEnergy.current;
    const cycle = clock.elapsedTime * 7.6;
    const armSwing = Math.sin(cycle) * 0.4 * energy;
    const legSwing = Math.sin(cycle) * 0.47 * energy;

    if (leftArm.current) leftArm.current.rotation.x = armSwing;
    if (rightArm.current) rightArm.current.rotation.x = -armSwing;
    if (leftLeg.current) leftLeg.current.rotation.x = -legSwing;
    if (rightLeg.current) rightLeg.current.rotation.x = legSwing;

    root.current.position.y = Math.abs(Math.sin(cycle)) * 0.012 * energy;
  });

  return (
    <group ref={root} position={[0, 0, 4.8]}>
      <group position={[0, 1.0, 0]}>
        <mesh castShadow position={[0, 0.18, 0]}>
          <capsuleGeometry args={[0.30, 0.74, 10, 18]} />
          <meshStandardMaterial color="#20272d" roughness={0.5} metalness={0.05} />
        </mesh>

        <mesh castShadow position={[0, 0.64, 0]}>
          <sphereGeometry args={[0.245, 28, 28]} />
          <meshStandardMaterial color="#b98c72" roughness={0.62} />
        </mesh>
        <mesh castShadow position={[0, 0.72, -0.04]}>
          <sphereGeometry args={[0.27, 24, 24]} />
          <meshStandardMaterial color="#231d1b" roughness={0.9} />
        </mesh>

        <group ref={leftArm} position={[-0.37, 0.29, 0]}>
          <mesh castShadow position={[0, -0.30, 0]}>
            <capsuleGeometry args={[0.09, 0.5, 8, 14]} />
            <meshStandardMaterial color="#20272d" roughness={0.55} />
          </mesh>
          <mesh castShadow position={[0, -0.62, 0]}>
            <sphereGeometry args={[0.095, 18, 18]} />
            <meshStandardMaterial color="#b98c72" roughness={0.62} />
          </mesh>
        </group>

        <group ref={rightArm} position={[0.37, 0.29, 0]}>
          <mesh castShadow position={[0, -0.30, 0]}>
            <capsuleGeometry args={[0.09, 0.5, 8, 14]} />
            <meshStandardMaterial color="#20272d" roughness={0.55} />
          </mesh>
          <mesh castShadow position={[0, -0.62, 0]}>
            <sphereGeometry args={[0.095, 18, 18]} />
            <meshStandardMaterial color="#b98c72" roughness={0.62} />
          </mesh>
        </group>

        <group ref={leftLeg} position={[-0.16, -0.37, 0]}>
          <mesh castShadow position={[0, -0.49, 0]}>
            <capsuleGeometry args={[0.12, 0.74, 8, 14]} />
            <meshStandardMaterial color="#161b1f" roughness={0.62} />
          </mesh>
          <mesh castShadow position={[0, -0.92, 0.08]}>
            <boxGeometry args={[0.22, 0.12, 0.42]} />
            <meshStandardMaterial color="#0d1114" roughness={0.6} />
          </mesh>
        </group>

        <group ref={rightLeg} position={[0.16, -0.37, 0]}>
          <mesh castShadow position={[0, -0.49, 0]}>
            <capsuleGeometry args={[0.12, 0.74, 8, 14]} />
            <meshStandardMaterial color="#161b1f" roughness={0.62} />
          </mesh>
          <mesh castShadow position={[0, -0.92, 0.08]}>
            <boxGeometry args={[0.22, 0.12, 0.42]} />
            <meshStandardMaterial color="#0d1114" roughness={0.6} />
          </mesh>
        </group>

        <mesh position={[-0.12, 0.22, 0.31]}>
          <boxGeometry args={[0.13, 0.18, 0.02]} />
          <meshStandardMaterial color="#dce3e6" roughness={0.38} />
        </mesh>
      </group>

      <Html position={[0, 2.0, 0]} center transform distanceFactor={6}>
        <div className="pooja-avatar-label">
          <strong>POOJA</strong>
          <span>SECURITY ENGINEER</span>
        </div>
      </Html>
    </group>
  );
}

function GuideRobot({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const checkpoints = useMemo(
    () => [
      { p: 0.0, position: new THREE.Vector3(2.45, 0, 1.4) },
      { p: 0.18, position: new THREE.Vector3(2.55, 0, -7.6) },
      { p: 0.43, position: new THREE.Vector3(-2.55, 0, -24.5) },
      { p: 0.67, position: new THREE.Vector3(2.55, 0, -40.4) },
      { p: 0.87, position: new THREE.Vector3(-2.25, 0, -56.2) },
    ],
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;

    const p = THREE.MathUtils.clamp(progress, 0, 1);
    let target = checkpoints[0].position;

    for (let i = 0; i < checkpoints.length; i += 1) {
      if (p >= checkpoints[i].p) target = checkpoints[i].position;
    }

    group.current.position.lerp(target, 0.09);
    group.current.position.y = Math.sin(clock.elapsedTime * 2.1) * 0.012;

    const lookTarget = new THREE.Vector3(camera.position.x, 1.2, camera.position.z);
    const dummy = new THREE.Object3D();
    dummy.position.copy(group.current.position);
    dummy.lookAt(lookTarget);
    group.current.quaternion.slerp(dummy.quaternion, 0.08);

    if (head.current) {
      head.current.rotation.y = Math.sin(clock.elapsedTime * 0.55) * 0.055;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0.17, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.48, 0.28, 24]} />
        <meshStandardMaterial color="#1a2227" roughness={0.38} metalness={0.68} />
      </mesh>

      <mesh position={[-0.28, 0.04, 0.22]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.11, 0.12, 20]} />
        <meshStandardMaterial color="#10161a" roughness={0.5} metalness={0.7} />
      </mesh>
      <mesh position={[0.28, 0.04, 0.22]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.11, 0.12, 20]} />
        <meshStandardMaterial color="#10161a" roughness={0.5} metalness={0.7} />
      </mesh>

      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.62, 0.78, 0.46]} />
        <meshStandardMaterial color="#c6cdd1" roughness={0.32} metalness={0.58} />
      </mesh>

      <mesh position={[0, 0.74, 0.238]}>
        <planeGeometry args={[0.42, 0.36]} />
        <meshBasicMaterial color="#10232c" />
      </mesh>

      <mesh position={[0, 0.79, 0.244]}>
        <planeGeometry args={[0.30, 0.018]} />
        <meshBasicMaterial color="#65b9e9" />
      </mesh>

      <mesh position={[0, 0.71, 0.244]}>
        <planeGeometry args={[0.22, 0.018]} />
        <meshBasicMaterial color="#78d3a2" />
      </mesh>

      <group ref={head} position={[0, 1.27, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.54, 0.38, 0.42]} />
          <meshStandardMaterial color="#d3dade" roughness={0.28} metalness={0.62} />
        </mesh>
        <mesh position={[0, 0.01, 0.216]}>
          <planeGeometry args={[0.36, 0.17]} />
          <meshBasicMaterial color="#10191e" />
        </mesh>
        <mesh position={[-0.105, 0.02, 0.222]}>
          <circleGeometry args={[0.025, 16]} />
          <meshBasicMaterial color="#69bdf0" />
        </mesh>
        <mesh position={[0.105, 0.02, 0.222]}>
          <circleGeometry args={[0.025, 16]} />
          <meshBasicMaterial color="#69bdf0" />
        </mesh>
      </group>

      <mesh position={[0, 1.55, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.32, 12]} />
        <meshStandardMaterial color="#7b858a" roughness={0.32} metalness={0.72} />
      </mesh>
      <mesh position={[0, 1.73, 0]}>
        <sphereGeometry args={[0.055, 14, 14]} />
        <meshBasicMaterial color="#67c9ff" />
      </mesh>

      <Html position={[0, 1.92, 0]} center transform distanceFactor={6}>
        <div className="guide-robot-label">
          <strong>SENTINEL</strong>
          <span>FACILITY GUIDE</span>
        </div>
      </Html>
    </group>
  );
}

export default function SecurityWorld({ progress }: SecurityWorldProps) {
  const { camera } = useThree();
  const progressRef = useRef(progress);
  const cameraProgress = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useFrame(({ pointer, clock }) => {
    const p = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const player = getPathPosition(p);

    const cameraTarget = player.clone().add(
      new THREE.Vector3(
        1.45 + pointer.x * 0.55,
        1.85 + pointer.y * 0.18,
        3.8,
      ),
    );

    const delta = Math.abs(p - cameraProgress.current);
    cameraProgress.current = p;
    const moving = Math.min(1, delta * 180);
    cameraTarget.y += Math.sin(clock.elapsedTime * 7.2) * 0.009 * moving;
    cameraTarget.x += Math.sin(clock.elapsedTime * 3.6) * 0.006 * moving;

    const lookAt = player.clone().add(
      new THREE.Vector3(pointer.x * 0.55, 1.2 + pointer.y * 0.2, -2.9),
    );

    camera.position.lerp(cameraTarget, 0.075);
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    const currentLook = camera.position.clone().add(direction.multiplyScalar(6));
    currentLook.lerp(lookAt, 0.085);
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

      <PoojaWalker progress={progress} />
      <GuideRobot progress={progress} />

      <AccessGate
        z={-4.5}
        label="AUTHORIZED PERSONNEL · AI SECURITY LAB"
        open={THREE.MathUtils.clamp((progress - 0.08) / 0.09, 0, 1)}
        hook="I decide what AI is allowed to do before it acts."
      />

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

      <AccessGate
        z={-22}
        label="IDENTITY & AUTHORIZATION ZONE"
        open={THREE.MathUtils.clamp((progress - 0.33) / 0.09, 0, 1)}
        hook="Capability is not permission."
      />

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

      <AccessGate
        z={-38}
        label="MODEL SUPPLY-CHAIN ZONE"
        open={THREE.MathUtils.clamp((progress - 0.58) / 0.09, 0, 1)}
        hook="Trust the evidence, not the filename."
      />
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
