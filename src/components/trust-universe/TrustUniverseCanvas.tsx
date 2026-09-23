"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Line, PointerLockControls } from "@react-three/drei";
import * as THREE from "three";
import {
  type UniverseWorldId,
  universeWorlds,
  universeWorldMap,
} from "@/data/trustUniverse";

type TravelMode = "foot" | "vehicle";

type TrustUniverseCanvasProps = {
  currentWorld: UniverseWorldId;
  destination: UniverseWorldId | null;
  travelMode: TravelMode;
  quality: "balanced" | "lite";
  onEnterWorld: (world: UniverseWorldId) => void;
  onInspectWorld: (world: UniverseWorldId) => void;
  onTravelModeChange: (mode: TravelMode) => void;
  onAutopilotComplete: () => void;
};

type ControllerProps = Omit<TrustUniverseCanvasProps, "quality">;

const CONTROL_EVENT = "trust-universe-control";

function WorldMonument({
  world,
  current,
}: {
  world: (typeof universeWorlds)[number];
  current: boolean;
}) {
  const [x, z] = world.position;
  const height =
    world.id === "trust" ? 5 :
    world.id === "nexus" ? 8 :
    world.id === "telemetry" ? 6.5 : 5.8;

  const shape =
    world.id === "model" ? "lab" :
    world.id === "runtime" ? "industrial" :
    world.id === "identity" ? "towers" :
    world.id === "agent" ? "gateway" : "block";

  return (
    <group position={[x, 0, z]}>
      {shape === "towers" ? (
        <>
          {[-2.2, 0, 2.2].map((offset, index) => (
            <mesh key={offset} position={[offset, 2.3 + index * 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.7, 4.6 + index * 0.9, 2.2]} />
              <meshStandardMaterial color="#2d3438" roughness={0.68} metalness={0.16} />
            </mesh>
          ))}
          <mesh position={[0, 3.1, 0]}>
            <boxGeometry args={[6.2, 0.22, 0.28]} />
            <meshStandardMaterial color="#8d969a" roughness={0.48} metalness={0.52} />
          </mesh>
        </>
      ) : shape === "gateway" ? (
        <>
          <mesh position={[-2.3, 2.5, 0]} castShadow>
            <boxGeometry args={[1.4, 5, 2.3]} />
            <meshStandardMaterial color="#262d31" roughness={0.6} metalness={0.22} />
          </mesh>
          <mesh position={[2.3, 2.5, 0]} castShadow>
            <boxGeometry args={[1.4, 5, 2.3]} />
            <meshStandardMaterial color="#262d31" roughness={0.6} metalness={0.22} />
          </mesh>
          <mesh position={[0, 5.1, 0]}>
            <boxGeometry args={[6.1, 0.35, 2.3]} />
            <meshStandardMaterial color="#3c464b" roughness={0.52} metalness={0.35} />
          </mesh>
        </>
      ) : shape === "industrial" ? (
        <>
          <mesh position={[0, 2.1, 0]} castShadow>
            <boxGeometry args={[6.6, 4.2, 6.2]} />
            <meshStandardMaterial color="#3d3b37" roughness={0.82} metalness={0.08} />
          </mesh>
          {[-2.3, 0, 2.3].map((offset) => (
            <mesh key={offset} position={[offset, 5.1, 0]}>
              <cylinderGeometry args={[0.38, 0.55, 6, 18]} />
              <meshStandardMaterial color="#55514b" roughness={0.72} metalness={0.18} />
            </mesh>
          ))}
        </>
      ) : shape === "lab" ? (
        <>
          <mesh position={[0, 1.35, 0]} castShadow>
            <boxGeometry args={[7, 2.7, 5.6]} />
            <meshStandardMaterial color="#d2d5d5" roughness={0.42} metalness={0.08} />
          </mesh>
          <mesh position={[0, 3.5, 0]} castShadow>
            <boxGeometry args={[4.6, 1.6, 3.8]} />
            <meshStandardMaterial color="#b9c0c2" roughness={0.38} metalness={0.1} />
          </mesh>
        </>
      ) : (
        <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[world.id === "trust" ? 8 : 5.6, height, world.id === "trust" ? 8 : 5.6]} />
          <meshStandardMaterial
            color={current ? "#53636a" : "#30373b"}
            roughness={0.68}
            metalness={0.15}
          />
        </mesh>
      )}

      <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.6, 5.75, 64]} />
        <meshBasicMaterial color={current ? "#a8dcec" : "#64747b"} transparent opacity={current ? 0.75 : 0.28} />
      </mesh>

      <Html position={[0, height + 1.1, 0]} center distanceFactor={22}>
        <div className={current ? "graybox-world-label current" : "graybox-world-label"}>
          <span>{world.code}</span>
          <strong>{world.shortName}</strong>
        </div>
      </Html>
    </group>
  );
}

function Road({ to }: { to: [number, number] }) {
  const [x, z] = to;
  const length = Math.sqrt(x * x + z * z);
  const angle = Math.atan2(x, z);
  return (
    <group rotation={[0, angle, 0]} position={[x / 2, 0.015, z / 2]}>
      <mesh receiveShadow>
        <boxGeometry args={[4.8, 0.08, length]} />
        <meshStandardMaterial color="#242729" roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.052, 0]}>
        <boxGeometry args={[0.06, 0.012, length - 2]} />
        <meshBasicMaterial color="#b7b19d" transparent opacity={0.48} />
      </mesh>
    </group>
  );
}


function CampusWayfinding() {
  const signs = [
    { position: [0, 0, -6] as [number, number, number], rotation: 0, title: "NORTH", lines: ["Agent Security", "Trust Nexus"] },
    { position: [6, 0, 0] as [number, number, number], rotation: Math.PI / 2, title: "EAST", lines: ["Identity", "Model Provenance"] },
    { position: [-6, 0, 0] as [number, number, number], rotation: -Math.PI / 2, title: "WEST", lines: ["Cloud", "Telemetry"] },
    { position: [0, 0, 7] as [number, number, number], rotation: Math.PI, title: "SOUTH", lines: ["Runtime", "Engineering Vault"] },
  ];

  return (
    <group>
      {signs.map((sign) => (
        <group key={sign.title} position={sign.position} rotation={[0, sign.rotation, 0]}>
          <mesh position={[0, 1.35, 0]} castShadow>
            <boxGeometry args={[0.12, 2.7, 0.12]} />
            <meshStandardMaterial color="#5f625e" roughness={0.72} metalness={0.22} />
          </mesh>
          <mesh position={[0, 2.42, -0.03]} castShadow>
            <boxGeometry args={[2.2, 0.78, 0.12]} />
            <meshStandardMaterial color="#e2e1da" roughness={0.62} metalness={0.08} />
          </mesh>
          <Html position={[0, 2.43, -0.11]} center transform distanceFactor={8}>
            <div className="campus-wayfinding-sign">
              <span>{sign.title}</span>
              {sign.lines.map((line) => <strong key={line}>{line}</strong>)}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

function ArrivalCourt() {
  return (
    <group>
      <mesh position={[0, 0.025, 5.2]} receiveShadow>
        <boxGeometry args={[12, 0.06, 7.2]} />
        <meshStandardMaterial color="#8d8474" roughness={0.95} />
      </mesh>

      <mesh position={[2.7, 0.055, 2.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.05, 2.13, 64]} />
        <meshBasicMaterial color="#e8e6de" transparent opacity={0.7} />
      </mesh>

      <mesh position={[2.7, 0.061, 2.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.3, 5.2]} />
        <meshBasicMaterial color="#2e3233" transparent opacity={0.32} />
      </mesh>

      {[-4.6, -3.4, -2.2, -1, 0.2].map((x) => (
        <mesh key={x} position={[x, 0.48, 6.7]} castShadow>
          <cylinderGeometry args={[0.07, 0.085, 0.96, 18]} />
          <meshStandardMaterial color="#777b77" roughness={0.62} metalness={0.46} />
        </mesh>
      ))}

      <Html position={[-3.8, 1.6, 5.55]} center transform distanceFactor={9}>
        <div className="arrival-monument">
          <span>POOJA KIRAN</span>
          <strong>TRUST DISTRICT</strong>
          <small>Security Engineering Research Campus</small>
        </div>
      </Html>

      <Html position={[2.7, 0.16, 0.6]} center transform distanceFactor={10}>
        <div className="parking-bay-label">AUTONOMOUS ARRIVAL · BAY 01</div>
      </Html>
    </group>
  );
}

function RoadMarkings() {
  return (
    <group>
      {universeWorlds.filter((world) => world.id !== "trust").map((world) => {
        const [x, z] = world.position;
        const length = Math.sqrt(x * x + z * z);
        const angle = Math.atan2(x, z);
        const stripes = Math.max(2, Math.floor(length / 8));

        return (
          <group key={world.id} rotation={[0, angle, 0]} position={[x / 2, 0.078, z / 2]}>
            {Array.from({ length: stripes }, (_, index) => {
              const localZ = -length / 2 + 4 + index * 8;
              return (
                <mesh key={index} position={[0, 0, localZ]}>
                  <boxGeometry args={[0.07, 0.01, 2.4]} />
                  <meshBasicMaterial color="#d8d1bf" transparent opacity={0.48} />
                </mesh>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}

function Vehicle({ position, active }: { position: THREE.Vector3; active: boolean }) {
  const root = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!root.current) return;
    root.current.position.copy(position);
  });

  return (
    <group ref={root} position={position}>
      <mesh position={[0, 0.48, 0]} castShadow>
        <boxGeometry args={[2.1, 0.55, 4.8]} />
        <meshStandardMaterial color="#15191b" roughness={0.32} metalness={0.58} />
      </mesh>
      <mesh position={[0, 0.95, -0.25]} castShadow>
        <boxGeometry args={[1.75, 0.72, 2.45]} />
        <meshPhysicalMaterial
          color="#252b2e"
          roughness={0.2}
          metalness={0.48}
          transmission={0.08}
        />
      </mesh>
      {[-0.82, 0.82].flatMap((x) => [-1.55, 1.55].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, 0.28, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.33, 0.33, 0.18, 24]} />
          <meshStandardMaterial color="#090b0c" roughness={0.72} />
        </mesh>
      )))}
      <mesh position={[0, 0.63, -2.43]}>
        <boxGeometry args={[1.3, 0.08, 0.035]} />
        <meshBasicMaterial color={active ? "#8edbf5" : "#666d70"} />
      </mesh>
      {!active && (
        <Html position={[0, 1.7, 0]} center distanceFactor={10}>
          <div className="graybox-vehicle-label"><strong>AUTONOMOUS GRAND TOURER</strong><span>E · ENTER VEHICLE</span></div>
        </Html>
      )}
    </group>
  );
}

function TrustSignal() {
  const points = useMemo(
    () =>
      universeWorlds
        .filter((world) => world.id !== "trust")
        .map((world) => new THREE.Vector3(world.position[0], 0.16, world.position[1])),
    [],
  );

  return (
    <>
      {points.map((point, index) => (
        <Line
          key={index}
          points={[[0, 0.16, 0], point]}
          color="#83b4c5"
          transparent
          opacity={0.13}
          lineWidth={0.55}
        />
      ))}
    </>
  );
}

function Mountains() {
  return (
    <group>
      {Array.from({ length: 18 }, (_, index) => {
        const angle = (index / 18) * Math.PI * 2;
        const radius = 82 + (index % 3) * 6;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const h = 8 + (index % 5) * 2.4;
        return (
          <mesh key={index} position={[x, h / 2 - 0.1, z]} rotation={[0, angle * 0.7, 0]}>
            <coneGeometry args={[8 + (index % 4), h, 5]} />
            <meshStandardMaterial color="#71695d" roughness={1} />
          </mesh>
        );
      })}
    </group>
  );
}

function ExploreController({
  currentWorld,
  destination,
  travelMode,
  onEnterWorld,
  onInspectWorld,
  onTravelModeChange,
  onAutopilotComplete,
}: ControllerProps) {
  const { camera, gl } = useThree();
  const keys = useRef(new Set<string>());
  const player = useRef(new THREE.Vector3(0, 0, 8));
  const parkedVehicle = useRef(new THREE.Vector3(2.7, 0, 2.8));
  const destinationRef = useRef(destination);

  useEffect(() => {
    destinationRef.current = destination;
  }, [destination]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName ?? "")) return;
      keys.current.add(event.key.toLowerCase());

      if (event.key.toLowerCase() === "e") {
        const position = player.current;
        if (travelMode === "vehicle") {
          onTravelModeChange("foot");
          parkedVehicle.current.copy(position).add(new THREE.Vector3(2.7, 0, 1.6));
          return;
        }

        if (position.distanceTo(parkedVehicle.current) < 5.2) {
          onTravelModeChange("vehicle");
          return;
        }

        let nearest: UniverseWorldId | null = null;
        let distance = Infinity;
        universeWorlds.forEach((world) => {
          const d = position.distanceTo(new THREE.Vector3(world.position[0], 0, world.position[1]));
          if (d < distance) {
            distance = d;
            nearest = world.id;
          }
        });
        if (nearest && distance < 8) onEnterWorld(nearest);
      }

      if (event.key.toLowerCase() === "f") {
        let nearest = universeWorldMap[currentWorld];
        let distance = Infinity;
        universeWorlds.forEach((world) => {
          const d = player.current.distanceTo(new THREE.Vector3(world.position[0], 0, world.position[1]));
          if (d < distance) {
            distance = d;
            nearest = world;
          }
        });
        if (distance < 12) onInspectWorld(nearest.id);
      }
    };

    const onKeyUp = (event: KeyboardEvent) => keys.current.delete(event.key.toLowerCase());
    const onControl = (event: Event) => {
      const custom = event as CustomEvent<{ key: string; down?: boolean }>;
      const key = custom.detail.key.toLowerCase();
      if (custom.detail.down === false) keys.current.delete(key);
      else {
        keys.current.add(key);
        window.setTimeout(() => keys.current.delete(key), 170);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener(CONTROL_EVENT, onControl);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener(CONTROL_EVENT, onControl);
    };
  }, [currentWorld, onEnterWorld, onInspectWorld, onTravelModeChange, travelMode]);

  useFrame((_, delta) => {
    const targetWorld = destinationRef.current
      ? universeWorldMap[destinationRef.current]
      : null;

    if (targetWorld) {
      const target = new THREE.Vector3(targetWorld.position[0], 0, targetWorld.position[1] + 7);
      const speed = travelMode === "vehicle" ? 18 : 11;
      const toTarget = target.clone().sub(player.current);
      const distance = toTarget.length();
      if (distance > 1.2) {
        player.current.add(toTarget.normalize().multiplyScalar(Math.min(distance, speed * delta)));
        camera.lookAt(targetWorld.position[0], travelMode === "vehicle" ? 1.2 : 1.65, targetWorld.position[1]);
      } else {
        destinationRef.current = null;
        onAutopilotComplete();
        onEnterWorld(targetWorld.id);
      }
    } else {
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();
      const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
      const movement = new THREE.Vector3();
      if (keys.current.has("w") || keys.current.has("arrowup")) movement.add(forward);
      if (keys.current.has("s") || keys.current.has("arrowdown")) movement.sub(forward);
      if (keys.current.has("a") || keys.current.has("arrowleft")) movement.sub(right);
      if (keys.current.has("d") || keys.current.has("arrowright")) movement.add(right);
      if (movement.lengthSq() > 0) {
        const sprint = keys.current.has("shift") ? 1.55 : 1;
        const baseSpeed = travelMode === "vehicle" ? 11 : 5.2;
        movement.normalize().multiplyScalar(baseSpeed * sprint * delta);
        player.current.add(movement);
      }
    }

    const bound = 72;
    player.current.x = THREE.MathUtils.clamp(player.current.x, -bound, bound);
    player.current.z = THREE.MathUtils.clamp(player.current.z, -bound, bound);

    camera.position.x = player.current.x;
    camera.position.z = player.current.z;
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      travelMode === "vehicle" ? 1.32 : 1.68,
      0.12,
    );

    if (travelMode === "vehicle") parkedVehicle.current.copy(player.current);
  });

  useEffect(() => {
    const prevent = (event: MouseEvent) => {
      if (document.pointerLockElement === gl.domElement) event.preventDefault();
    };
    gl.domElement.addEventListener("contextmenu", prevent);
    return () => gl.domElement.removeEventListener("contextmenu", prevent);
  }, [gl]);

  return (
    <>
      <Vehicle position={parkedVehicle.current} active={travelMode === "vehicle"} />
      <PointerLockControls selector="#universe-look-button" />
    </>
  );
}

function UniverseScene(props: TrustUniverseCanvasProps) {
  return (
    <>
      <color attach="background" args={["#b7ad99"]} />
      <fog attach="fog" args={["#b7ad99", 45, 112]} />
      <ambientLight intensity={0.72} />
      <hemisphereLight args={["#d7e0e2", "#796b58", 1.05]} />
      <directionalLight
        position={[30, 48, 10]}
        intensity={2.4}
        color="#fff0d7"
        castShadow={props.quality === "balanced"}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[190, 190]} />
        <meshStandardMaterial color="#a89980" roughness={0.98} />
      </mesh>

      <Mountains />
      <TrustSignal />
      <ArrivalCourt />
      <CampusWayfinding />
      <RoadMarkings />

      {universeWorlds.filter((world) => world.id !== "trust").map((world) => (
        <Road key={world.id} to={world.position} />
      ))}

      {universeWorlds.map((world) => (
        <WorldMonument
          key={world.id}
          world={world}
          current={props.currentWorld === world.id}
        />
      ))}

      <ExploreController {...props} />
    </>
  );
}

export default function TrustUniverseCanvas(props: TrustUniverseCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.68, 8], fov: 50, near: 0.1, far: 220 }}
      dpr={props.quality === "lite" ? 1 : [1, 1.35]}
      shadows={props.quality === "balanced"}
      gl={{
        antialias: props.quality === "balanced",
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
    >
      <Suspense fallback={null}>
        <UniverseScene {...props} />
      </Suspense>
    </Canvas>
  );
}

export { CONTROL_EVENT };
