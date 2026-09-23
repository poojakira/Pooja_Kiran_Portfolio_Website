"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, PointerLockControls, RoundedBox, Sky } from "@react-three/drei";
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

const concrete = "#b5afa2";
const paleConcrete = "#d4d0c5";
const darkMetal = "#202629";
const glass = "#42545b";
const stone = "#c1b39d";
const asphalt = "#343638";
const curb = "#c2b9a9";
const desert = "#a9987f";
const planting = "#6e765e";
const warmInterior = "#b7966c";

function GlassBox({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: [number, number, number];
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={scale} />
      <meshPhysicalMaterial
        color={glass}
        roughness={0.16}
        metalness={0.08}
        transmission={0.15}
        transparent
        opacity={0.84}
      />
    </mesh>
  );
}

function WindowBands({
  width,
  y,
  z,
  count,
}: {
  width: number;
  y: number;
  z: number;
  count: number;
}) {
  return (
    <group>
      {Array.from({ length: count }, (_, index) => {
        const x = -width / 2 + 0.65 + index * ((width - 1.3) / Math.max(1, count - 1));
        return (
          <mesh key={index} position={[x, y, z]}>
            <boxGeometry args={[0.52, 0.58, 0.035]} />
            <meshStandardMaterial color={index % 3 === 0 ? warmInterior : "#34484f"} roughness={0.2} metalness={0.1} />
          </mesh>
        );
      })}
    </group>
  );
}

function EntryCanopy({ z = 0 }: { z?: number }) {
  return (
    <group position={[0, 0, z]}>
      <mesh position={[0, 2.55, -1.45]} castShadow>
        <boxGeometry args={[5.4, 0.18, 2.8]} />
        <meshStandardMaterial color={darkMetal} roughness={0.4} metalness={0.42} />
      </mesh>
      {[-2.25, 2.25].map((x) => (
        <mesh key={x} position={[x, 1.35, -1.65]} castShadow>
          <boxGeometry args={[0.16, 2.7, 0.16]} />
          <meshStandardMaterial color="#777a75" roughness={0.42} metalness={0.45} />
        </mesh>
      ))}
      <GlassBox position={[0, 1.55, -1.56]} scale={[3.9, 2.25, 0.08]} />
    </group>
  );
}

function TrustDistrictHQ() {
  return (
    <group>
      <mesh position={[0, 1.45, -5.6]} castShadow receiveShadow>
        <boxGeometry args={[15.4, 2.9, 7.4]} />
        <meshStandardMaterial color={paleConcrete} roughness={0.68} metalness={0.02} />
      </mesh>

      <mesh position={[0, 3.36, -5.6]} castShadow>
        <boxGeometry args={[12.8, 0.72, 6.4]} />
        <meshStandardMaterial color="#afa99d" roughness={0.7} metalness={0.02} />
      </mesh>

      <GlassBox position={[0, 1.55, -1.86]} scale={[11.5, 2.05, 0.1]} />
      <WindowBands width={11.2} y={1.6} z={-1.79} count={13} />
      <EntryCanopy z={0} />

      <mesh position={[0, 0.08, -0.2]} receiveShadow>
        <boxGeometry args={[10.2, 0.12, 3.6]} />
        <meshStandardMaterial color={stone} roughness={0.88} />
      </mesh>

      <mesh position={[-5.5, 0.11, -0.6]} receiveShadow>
        <boxGeometry args={[3.4, 0.17, 2.4]} />
        <meshStandardMaterial color="#5b5b55" roughness={0.58} />
      </mesh>

      <mesh position={[-5.5, 0.2, -0.6]}>
        <boxGeometry args={[2.7, 0.02, 1.7]} />
        <meshPhysicalMaterial color="#1f292d" roughness={0.08} metalness={0.02} transmission={0.1} />
      </mesh>

      <Html position={[-4.9, 2.15, -1.7]} center transform distanceFactor={12}>
        <div className="physical-building-sign">
          <span>POOJA KIRAN</span>
          <strong>TRUST DISTRICT</strong>
          <small>Security Engineering Research Campus</small>
        </div>
      </Html>
    </group>
  );
}

function AgentFacility() {
  return (
    <group>
      <mesh position={[-3.35, 2.05, 0]} castShadow>
        <boxGeometry args={[5.2, 4.1, 8]} />
        <meshStandardMaterial color={concrete} roughness={0.74} />
      </mesh>
      <mesh position={[3.35, 2.05, 0]} castShadow>
        <boxGeometry args={[5.2, 4.1, 8]} />
        <meshStandardMaterial color={concrete} roughness={0.74} />
      </mesh>
      <mesh position={[0, 4.22, 0]} castShadow>
        <boxGeometry args={[12, 0.32, 8]} />
        <meshStandardMaterial color={darkMetal} roughness={0.44} metalness={0.32} />
      </mesh>
      <GlassBox position={[0, 1.75, 3.96]} scale={[5.4, 2.4, 0.09]} />
      <mesh position={[0, 1.25, 4.18]}>
        <boxGeometry args={[3.4, 2.5, 0.12]} />
        <meshStandardMaterial color="#171d20" roughness={0.36} metalness={0.3} />
      </mesh>
      <Html position={[0, 3.1, 4.3]} center transform distanceFactor={12}>
        <div className="physical-building-sign">
          <span>SECURE SYSTEMS INTEGRATION CENTER</span>
          <strong>AGENT SECURITY</strong>
          <small>MCP · Tool Execution · Policy Enforcement</small>
        </div>
      </Html>
    </group>
  );
}

function IdentityFacility() {
  return (
    <group>
      {[-2.6, 0, 2.6].map((x, index) => (
        <group key={x}>
          <mesh position={[x, 2.8 + index * 0.25, 0]} castShadow>
            <boxGeometry args={[2.25, 5.6 + index * 0.5, 4.4]} />
            <meshStandardMaterial color={index === 1 ? "#8d8d86" : "#9e9a90"} roughness={0.6} metalness={0.04} />
          </mesh>
          <GlassBox position={[x, 2.8 + index * 0.25, 2.23]} scale={[1.65, 3.9 + index * 0.4, 0.08]} />
        </group>
      ))}
      <mesh position={[0, 3.9, 0]} castShadow>
        <boxGeometry args={[7.7, 0.24, 1.35]} />
        <meshStandardMaterial color={darkMetal} roughness={0.36} metalness={0.36} />
      </mesh>
      <Html position={[0, 6.6, 2.3]} center transform distanceFactor={14}>
        <div className="physical-building-sign">
          <span>AUTHORIZATION RESEARCH</span>
          <strong>IDENTITY METROPOLIS</strong>
          <small>IAM · Roles · Trust · Delegation</small>
        </div>
      </Html>
    </group>
  );
}

function ModelFacility() {
  return (
    <group>
      <mesh position={[0, 1.45, 0]} castShadow>
        <boxGeometry args={[9.5, 2.9, 7]} />
        <meshStandardMaterial color="#d8d8d1" roughness={0.5} />
      </mesh>
      <mesh position={[0, 3.28, -0.3]} castShadow>
        <boxGeometry args={[6.6, 0.75, 5.3]} />
        <meshStandardMaterial color="#c2c5c2" roughness={0.46} />
      </mesh>
      <GlassBox position={[0, 1.55, 3.52]} scale={[7.8, 2.05, 0.08]} />
      {[-3.8, 3.8].map((x) => (
        <mesh key={x} position={[x, 0.72, 4.3]}>
          <boxGeometry args={[1.1, 1.45, 0.7]} />
          <meshStandardMaterial color="#f0efe9" roughness={0.7} />
        </mesh>
      ))}
      <Html position={[0, 4.45, 3.5]} center transform distanceFactor={13}>
        <div className="physical-building-sign light">
          <span>MODEL ASSURANCE LABORATORY</span>
          <strong>PROVENANCE</strong>
          <small>Artifact Intake · Inspection · Trust</small>
        </div>
      </Html>
    </group>
  );
}

function RuntimeFacility() {
  return (
    <group>
      <mesh position={[0, 2.1, 0]} castShadow>
        <boxGeometry args={[9.8, 4.2, 8.2]} />
        <meshStandardMaterial color="#77736c" roughness={0.84} metalness={0.05} />
      </mesh>
      {[-3.2, -1.05, 1.05, 3.2].map((x, index) => (
        <mesh key={x} position={[x, 5.1 + (index % 2) * 0.5, -1.6]}>
          <cylinderGeometry args={[0.34, 0.42, 5.6 + (index % 2), 18]} />
          <meshStandardMaterial color="#595a57" roughness={0.7} metalness={0.16} />
        </mesh>
      ))}
      <mesh position={[0, 3.15, 4.1]} castShadow>
        <boxGeometry args={[8.1, 0.26, 1.1]} />
        <meshStandardMaterial color="#4b4e4d" roughness={0.56} metalness={0.3} />
      </mesh>
      <Html position={[0, 4.65, 4.35]} center transform distanceFactor={13}>
        <div className="physical-building-sign">
          <span>RUNTIME SYSTEMS FOUNDRY</span>
          <strong>ISOLATION & CONTROL</strong>
          <small>Process · Container · Network · Filesystem</small>
        </div>
      </Html>
    </group>
  );
}

function TelemetryFacility() {
  return (
    <group>
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[10.2, 3, 6.5]} />
        <meshStandardMaterial color="#868a87" roughness={0.62} />
      </mesh>
      <GlassBox position={[0, 1.62, 3.27]} scale={[8.4, 2.1, 0.08]} />
      <mesh position={[0, 6.2, -1.5]} castShadow>
        <cylinderGeometry args={[0.11, 0.18, 8.3, 16]} />
        <meshStandardMaterial color="#565d60" roughness={0.48} metalness={0.52} />
      </mesh>
      {[0, Math.PI / 2].map((rotation) => (
        <mesh key={rotation} position={[0, 7.3, -1.5]} rotation={[0, 0, rotation]}>
          <boxGeometry args={[2.4, 0.08, 0.08]} />
          <meshStandardMaterial color="#7b8386" roughness={0.42} metalness={0.54} />
        </mesh>
      ))}
      <Html position={[0, 3.9, 3.35]} center transform distanceFactor={13}>
        <div className="physical-building-sign">
          <span>SECURITY OPERATIONS CENTER</span>
          <strong>TELEMETRY</strong>
          <small>Events · Detection · Correlation · Response</small>
        </div>
      </Html>
    </group>
  );
}

function CloudFacility() {
  return (
    <group>
      <mesh position={[0, 1.65, 0]} castShadow>
        <boxGeometry args={[11, 3.3, 8]} />
        <meshStandardMaterial color="#8d8c85" roughness={0.72} />
      </mesh>
      {[-3.4, -1.15, 1.15, 3.4].map((x) => (
        <mesh key={x} position={[x, 3.7, -1.4]} castShadow>
          <boxGeometry args={[1.45, 0.75, 1.8]} />
          <meshStandardMaterial color="#616561" roughness={0.7} metalness={0.12} />
        </mesh>
      ))}
      <mesh position={[0, 0.55, 4.2]}>
        <boxGeometry args={[8.4, 1.1, 0.14]} />
        <meshStandardMaterial color="#3e4547" roughness={0.52} metalness={0.22} />
      </mesh>
      <Html position={[0, 4.45, 4.1]} center transform distanceFactor={13}>
        <div className="physical-building-sign">
          <span>INFRASTRUCTURE CONTROLS CENTER</span>
          <strong>CLOUD</strong>
          <small>Workload Identity · Network · Policy</small>
        </div>
      </Html>
    </group>
  );
}

function VaultFacility() {
  return (
    <group>
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[8.2, 1.5, 6.8]} />
        <meshStandardMaterial color="#76716a" roughness={0.88} />
      </mesh>
      <mesh position={[0, 1.65, 0.5]} castShadow>
        <boxGeometry args={[5.8, 0.55, 4.5]} />
        <meshStandardMaterial color="#8a8277" roughness={0.84} />
      </mesh>
      <mesh position={[0, 1.05, 3.42]}>
        <boxGeometry args={[2.4, 2.1, 0.18]} />
        <meshStandardMaterial color="#252a2b" roughness={0.46} metalness={0.28} />
      </mesh>
      <Html position={[0, 2.75, 3.5]} center transform distanceFactor={12}>
        <div className="physical-building-sign">
          <span>EVIDENCE ARCHIVE</span>
          <strong>ENGINEERING VAULT</strong>
          <small>Source · Tests · CI · Limitations</small>
        </div>
      </Html>
    </group>
  );
}

function NexusFacility() {
  return (
    <group>
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[6.4, 6.9, 1.1, 48]} />
        <meshStandardMaterial color={stone} roughness={0.74} />
      </mesh>
      <mesh position={[0, 2.55, 0]} castShadow>
        <cylinderGeometry args={[4.9, 5.2, 3.1, 48]} />
        <meshPhysicalMaterial color="#556267" roughness={0.24} metalness={0.08} transmission={0.12} transparent opacity={0.92} />
      </mesh>
      <mesh position={[0, 4.28, 0]} castShadow>
        <cylinderGeometry args={[5.6, 5.6, 0.22, 48]} />
        <meshStandardMaterial color={darkMetal} roughness={0.38} metalness={0.38} />
      </mesh>
      <Html position={[0, 5.25, 0]} center transform distanceFactor={15}>
        <div className="physical-building-sign">
          <span>EXECUTIVE SYSTEMS REVIEW CENTER</span>
          <strong>TRUST NEXUS</strong>
          <small>Complete Execution Path</small>
        </div>
      </Html>
    </group>
  );
}

function Facility({
  id,
  position,
}: {
  id: UniverseWorldId;
  position: [number, number];
}) {
  const [x, z] = position;
  return (
    <group position={[x, 0, z]}>
      {id === "trust" && <TrustDistrictHQ />}
      {id === "agent" && <AgentFacility />}
      {id === "identity" && <IdentityFacility />}
      {id === "model" && <ModelFacility />}
      {id === "runtime" && <RuntimeFacility />}
      {id === "telemetry" && <TelemetryFacility />}
      {id === "cloud" && <CloudFacility />}
      {id === "vault" && <VaultFacility />}
      {id === "nexus" && <NexusFacility />}
    </group>
  );
}

function Road({ to }: { to: [number, number] }) {
  const [x, z] = to;
  const length = Math.sqrt(x * x + z * z);
  const angle = Math.atan2(x, z);
  return (
    <group rotation={[0, angle, 0]} position={[x / 2, 0.04, z / 2]}>
      <mesh receiveShadow>
        <boxGeometry args={[5.4, 0.1, length]} />
        <meshStandardMaterial color={asphalt} roughness={0.96} />
      </mesh>
      {[-2.85, 2.85].map((curbX) => (
        <mesh key={curbX} position={[curbX, 0.12, 0]} receiveShadow>
          <boxGeometry args={[0.28, 0.2, length]} />
          <meshStandardMaterial color={curb} roughness={0.85} />
        </mesh>
      ))}
      {[-3.55, 3.55].map((walkX) => (
        <mesh key={walkX} position={[walkX, 0.085, 0]} receiveShadow>
          <boxGeometry args={[1.1, 0.08, length]} />
          <meshStandardMaterial color="#b8afa0" roughness={0.88} />
        </mesh>
      ))}
      {Array.from({ length: Math.max(2, Math.floor(length / 8)) }, (_, index) => {
        const localZ = -length / 2 + 4 + index * 8;
        return (
          <mesh key={index} position={[0, 0.102, localZ]}>
            <boxGeometry args={[0.08, 0.014, 2.7]} />
            <meshBasicMaterial color="#d7d0bf" transparent opacity={0.62} />
          </mesh>
        );
      })}
    </group>
  );
}

function DesertPlant({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) {
  return (
    <group position={[x, 0, z]} scale={scale}>
      {[0, 1.2, -1.2, 2.35, -2.1].map((rotation, index) => (
        <mesh key={rotation} rotation={[0.35, rotation, rotation * 0.12]} position={[Math.sin(rotation) * 0.08, 0.28, Math.cos(rotation) * 0.08]}>
          <coneGeometry args={[0.09, 0.58 + (index % 2) * 0.1, 10]} />
          <meshStandardMaterial color={index % 2 ? "#65705a" : planting} roughness={0.96} />
        </mesh>
      ))}
    </group>
  );
}

function DesertLandscape() {
  const plants = [
    [-7.4, 4.7, 1.2],[-8.8, 1.8,.9],[-6.8,-1.8,.8],[7.8,4.5,1.05],[8.5,1.2,.85],[7.1,-2.7,.75],
    [-11,7,.8],[10.8,7.4,1],[12,-5,.8],[-12,-6,.95],[4.7,10,.8],[-4.8,10.5,.9],
    [-16,-16,.8],[18,-17,.7],[18,13,.75],[-17,15,.8],
  ] as const;
  return (
    <group>
      {plants.map(([x,z,s], index) => <DesertPlant key={index} x={x} z={z} scale={s} />)}
      {([[-6.2,3.1],[-7.3,2.2],[7.3,3.2],[6.4,2.2]] as [number,number][]).map((p,index)=>(
        <mesh key={index} position={[p[0],0.16,p[1]]} rotation={[0,index*.6,0]}>
          <dodecahedronGeometry args={[0.48 + (index%2)*.18,0]} />
          <meshStandardMaterial color="#8f806e" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}


function CampusLight({ x, z, rotation = 0 }: { x: number; z: number; rotation?: number }) {
  return (
    <group position={[x,0,z]} rotation={[0,rotation,0]}>
      <mesh position={[0,1.9,0]} castShadow>
        <cylinderGeometry args={[0.055,0.075,3.8,14]} />
        <meshStandardMaterial color="#595f60" roughness={0.48} metalness={0.52} />
      </mesh>
      <mesh position={[0.28,3.65,0]} castShadow>
        <boxGeometry args={[0.58,0.09,0.2]} />
        <meshStandardMaterial color="#414748" roughness={0.38} metalness={0.55} />
      </mesh>
      <mesh position={[0.28,3.59,0]}>
        <boxGeometry args={[0.42,0.025,0.11]} />
        <meshBasicMaterial color="#e3d7ba" />
      </mesh>
    </group>
  );
}

function CampusInfrastructure() {
  const lights = [
    [-7.2,9.4,0],[7.2,9.4,Math.PI],[-7.2,2.4,0],[7.2,2.4,Math.PI],
    [-11,-8,0],[11,-8,Math.PI],[-12,16,0],[12,16,Math.PI],
  ] as [number,number,number][];

  return (
    <group>
      {lights.map(([x,z,r],index)=><CampusLight key={index} x={x} z={z} rotation={r} />)}

      <group position={[10.5,0,6]}>
        <mesh position={[0,1.9,0]} castShadow>
          <boxGeometry args={[6.8,0.18,4.1]} />
          <meshStandardMaterial color="#3e4546" roughness={0.38} metalness={0.46} />
        </mesh>
        {[-2.8,2.8].flatMap((x)=>[-1.45,1.45].map((z)=>(
          <mesh key={`${x}-${z}`} position={[x,0.92,z]} castShadow>
            <boxGeometry args={[0.14,1.84,0.14]} />
            <meshStandardMaterial color="#555c5d" roughness={0.45} metalness={0.5} />
          </mesh>
        )))}
        {[-2,-.7,.7,2].map((x)=>(
          <mesh key={x} position={[x,1.98,0]}>
            <boxGeometry args={[1.15,0.035,3.8]} />
            <meshStandardMaterial color="#1e2729" roughness={0.24} metalness={0.38} />
          </mesh>
        ))}
        <mesh position={[0,0.06,0]} receiveShadow>
          <boxGeometry args={[7.4,0.08,4.8]} />
          <meshStandardMaterial color="#77766f" roughness={0.84} />
        </mesh>
      </group>

      {[-8.4,-6.9,-5.4].map((x)=>(
        <mesh key={x} position={[x,0.48,-10.4]} castShadow>
          <boxGeometry args={[0.9,0.96,0.55]} />
          <meshStandardMaterial color="#747974" roughness={0.68} metalness={0.2} />
        </mesh>
      ))}

      <mesh position={[-12.4,0.35,-3.8]} castShadow>
        <boxGeometry args={[2.5,0.7,1.2]} />
        <meshStandardMaterial color="#877f70" roughness={0.88} />
      </mesh>
      <mesh position={[-12.4,0.72,-3.8]}>
        <boxGeometry args={[2.15,0.05,0.85]} />
        <meshStandardMaterial color="#aaa08e" roughness={0.8} />
      </mesh>
    </group>
  );
}

function TerrainVariation() {
  const patches = [
    [-20,18,16,10,"#a08f77"],[19,16,14,9,"#ad9c84"],[-22,-18,18,12,"#9d8b73"],
    [21,-17,16,11,"#b09f87"],[-2,26,22,8,"#a59279"],[28,0,10,18,"#a29179"],
  ] as [number,number,number,number,string][];
  return (
    <group>
      {patches.map(([x,z,w,d,color],index)=>(
        <mesh key={index} position={[x,0.012,z]} rotation={[-Math.PI/2,0,index*.2]}>
          <planeGeometry args={[w,d]} />
          <meshStandardMaterial color={color} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function SecurityGate() {
  return (
    <group position={[0,0,12.5]}>
      {[-3.2,3.2].map((x) => (
        <group key={x} position={[x,0,0]}>
          <mesh position={[0,1.4,0]} castShadow>
            <boxGeometry args={[0.6,2.8,0.8]} />
            <meshStandardMaterial color="#6f706b" roughness={0.66} metalness={0.2} />
          </mesh>
          <mesh position={[0,2.9,0]} castShadow>
            <boxGeometry args={[0.25,0.9,0.25]} />
            <meshStandardMaterial color="#484d4e" roughness={0.48} metalness={0.4} />
          </mesh>
        </group>
      ))}
      <mesh position={[0,2.7,0]} castShadow>
        <boxGeometry args={[7.1,0.22,0.42]} />
        <meshStandardMaterial color="#555a5b" roughness={0.48} metalness={0.42} />
      </mesh>
      <mesh position={[0,0.74,0]}>
        <boxGeometry args={[4.8,0.08,0.08]} />
        <meshStandardMaterial color="#d9d5c9" roughness={0.66} />
      </mesh>
    </group>
  );
}

function ArrivalCourt() {
  return (
    <group>
      <mesh position={[0,0.035,5.8]} receiveShadow>
        <boxGeometry args={[15.2,0.08,9.4]} />
        <meshStandardMaterial color={stone} roughness={0.9} />
      </mesh>
      <mesh position={[3.2,0.075,4.6]} receiveShadow>
        <boxGeometry args={[3.4,0.08,6.5]} />
        <meshStandardMaterial color="#77766f" roughness={0.8} />
      </mesh>
      <mesh position={[-4.7,0.12,4.7]} receiveShadow>
        <boxGeometry args={[3.6,0.18,2.7]} />
        <meshStandardMaterial color="#5c5c57" roughness={0.62} />
      </mesh>
      <mesh position={[-4.7,0.19,4.7]}>
        <boxGeometry args={[3.1,0.03,2.2]} />
        <meshPhysicalMaterial color="#263236" roughness={0.1} transmission={0.08} />
      </mesh>
      {[-6.5,-5,-3.5,-2].map((x)=>(
        <mesh key={x} position={[x,0.48,8.1]} castShadow>
          <cylinderGeometry args={[0.07,0.085,0.96,18]} />
          <meshStandardMaterial color="#747773" roughness={0.6} metalness={0.4} />
        </mesh>
      ))}
      <Html position={[-4.3,1.55,6.4]} center transform distanceFactor={10}>
        <div className="arrival-monument">
          <span>POOJA KIRAN</span>
          <strong>TRUST DISTRICT</strong>
          <small>Security Engineering Research Campus</small>
        </div>
      </Html>
    </group>
  );
}

function CampusWayfinding() {
  const signs = [
    { position: [0,0,-10] as [number,number,number], rotation:0, title:"NORTH", lines:["Agent Security","Trust Nexus"] },
    { position: [9,0,0] as [number,number,number], rotation:Math.PI/2, title:"EAST", lines:["Identity","Model Provenance"] },
    { position: [-9,0,0] as [number,number,number], rotation:-Math.PI/2, title:"WEST", lines:["Cloud","Telemetry"] },
    { position: [0,0,10] as [number,number,number], rotation:Math.PI, title:"SOUTH", lines:["Runtime","Engineering Vault"] },
  ];
  return (
    <group>
      {signs.map((sign)=>(
        <group key={sign.title} position={sign.position} rotation={[0,sign.rotation,0]}>
          <mesh position={[0,1.3,0]} castShadow>
            <boxGeometry args={[0.12,2.6,0.12]} />
            <meshStandardMaterial color="#60635f" roughness={0.68} metalness={0.24} />
          </mesh>
          <mesh position={[0,2.35,-0.02]} castShadow>
            <boxGeometry args={[2.35,0.76,0.12]} />
            <meshStandardMaterial color="#dddcd4" roughness={0.64} />
          </mesh>
          <Html position={[0,2.36,-0.1]} center transform distanceFactor={9}>
            <div className="campus-wayfinding-sign">
              <span>{sign.title}</span>
              {sign.lines.map((line)=><strong key={line}>{line}</strong>)}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

function Vehicle({ position, active }: { position: THREE.Vector3; active: boolean }) {
  const root = useRef<THREE.Group>(null);

  useFrame(() => {
    if (root.current) root.current.position.copy(position);
  });

  return (
    <group ref={root} position={position} rotation={[0,Math.PI,0]}>
      <RoundedBox args={[2.05,0.5,5.2]} radius={0.22} smoothness={8} position={[0,0.47,0]} castShadow>
        <meshStandardMaterial color="#171b1d" roughness={0.2} metalness={0.72} />
      </RoundedBox>

      <RoundedBox args={[1.72,0.64,2.85]} radius={0.28} smoothness={8} position={[0,0.9,-0.2]} castShadow>
        <meshPhysicalMaterial color="#273035" roughness={0.16} metalness={0.42} transmission={0.08} />
      </RoundedBox>

      <mesh position={[0,0.56,2.62]} castShadow>
        <boxGeometry args={[1.6,0.11,0.08]} />
        <meshStandardMaterial color="#262b2c" roughness={0.28} metalness={0.62} />
      </mesh>

      <mesh position={[0,0.66,-2.62]} castShadow>
        <boxGeometry args={[1.35,0.08,0.05]} />
        <meshBasicMaterial color={active ? "#c9d7d8" : "#7f3731"} />
      </mesh>

      {[-0.91,0.91].flatMap((x)=>[-1.65,1.65].map((z)=>(
        <group key={`${x}-${z}`} position={[x,0.28,z]}>
          <mesh rotation={[0,0,Math.PI/2]} castShadow>
            <cylinderGeometry args={[0.38,0.38,0.22,28]} />
            <meshStandardMaterial color="#0e1011" roughness={0.7} />
          </mesh>
          <mesh rotation={[0,0,Math.PI/2]}>
            <cylinderGeometry args={[0.19,0.19,0.235,20]} />
            <meshStandardMaterial color="#686d6e" roughness={0.36} metalness={0.64} />
          </mesh>
        </group>
      )))}

      {[-0.58,0.58].map((x)=>(
        <mesh key={x} position={[x,0.51,2.66]}>
          <boxGeometry args={[0.62,0.11,0.04]} />
          <meshBasicMaterial color="#e8e0c9" />
        </mesh>
      ))}

      {!active && (
        <Html position={[0,1.72,-0.2]} center distanceFactor={11}>
          <div className="graybox-vehicle-label">
            <strong>AUTONOMOUS GRAND TOURER</strong>
            <span>E · ENTER VEHICLE</span>
          </div>
        </Html>
      )}
    </group>
  );
}

function Mountains() {
  return (
    <group>
      {Array.from({length:18},(_,index)=>{
        const angle=(index/18)*Math.PI*2;
        const radius=86+(index%3)*7;
        const x=Math.sin(angle)*radius;
        const z=Math.cos(angle)*radius;
        const h=8+(index%5)*2.6;
        return (
          <mesh key={index} position={[x,h/2-.1,z]} rotation={[0,angle*.7,0]}>
            <coneGeometry args={[9+(index%4),h,6]} />
            <meshStandardMaterial color={index%2?"#756c60":"#7f7567"} roughness={1} />
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
  const player = useRef(new THREE.Vector3(0,0,10.5));
  const parkedVehicle = useRef(new THREE.Vector3(3.2,0,4.6));
  const destinationRef = useRef(destination);

  useEffect(()=>{ destinationRef.current=destination; },[destination]);

  useEffect(()=>{
    const onKeyDown=(event:KeyboardEvent)=>{
      if(["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName??"")) return;
      keys.current.add(event.key.toLowerCase());

      if(event.key.toLowerCase()==="e"){
        const position=player.current;
        if(travelMode==="vehicle"){
          onTravelModeChange("foot");
          parkedVehicle.current.copy(position).add(new THREE.Vector3(2.7,0,1.6));
          return;
        }
        if(position.distanceTo(parkedVehicle.current)<5.4){
          onTravelModeChange("vehicle");
          return;
        }

        let nearest:UniverseWorldId|null=null;
        let distance=Infinity;
        universeWorlds.forEach((world)=>{
          const d=position.distanceTo(new THREE.Vector3(world.position[0],0,world.position[1]));
          if(d<distance){ distance=d; nearest=world.id; }
        });
        if(nearest&&distance<9) onEnterWorld(nearest);
      }

      if(event.key.toLowerCase()==="f"){
        let nearest=universeWorldMap[currentWorld];
        let distance=Infinity;
        universeWorlds.forEach((world)=>{
          const d=player.current.distanceTo(new THREE.Vector3(world.position[0],0,world.position[1]));
          if(d<distance){ distance=d; nearest=world; }
        });
        if(distance<13) onInspectWorld(nearest.id);
      }
    };

    const onKeyUp=(event:KeyboardEvent)=>keys.current.delete(event.key.toLowerCase());
    const onControl=(event:Event)=>{
      const custom=event as CustomEvent<{key:string;down?:boolean}>;
      const key=custom.detail.key.toLowerCase();
      if(custom.detail.down===false) keys.current.delete(key);
      else{
        keys.current.add(key);
        window.setTimeout(()=>keys.current.delete(key),170);
      }
    };

    window.addEventListener("keydown",onKeyDown);
    window.addEventListener("keyup",onKeyUp);
    window.addEventListener(CONTROL_EVENT,onControl);
    return()=>{
      window.removeEventListener("keydown",onKeyDown);
      window.removeEventListener("keyup",onKeyUp);
      window.removeEventListener(CONTROL_EVENT,onControl);
    };
  },[currentWorld,onEnterWorld,onInspectWorld,onTravelModeChange,travelMode]);

  useFrame((_,delta)=>{
    const targetWorld=destinationRef.current?universeWorldMap[destinationRef.current]:null;

    if(targetWorld){
      const target=new THREE.Vector3(targetWorld.position[0],0,targetWorld.position[1]+8);
      const speed=travelMode==="vehicle"?14:7.5;
      const toTarget=target.clone().sub(player.current);
      const distance=toTarget.length();
      if(distance>1.35){
        player.current.add(toTarget.normalize().multiplyScalar(Math.min(distance,speed*delta)));
        camera.lookAt(targetWorld.position[0],travelMode==="vehicle"?1.25:1.65,targetWorld.position[1]);
      }else{
        destinationRef.current=null;
        onAutopilotComplete();
        onEnterWorld(targetWorld.id);
      }
    }else{
      const forward=new THREE.Vector3();
      camera.getWorldDirection(forward);
      forward.y=0;
      forward.normalize();
      const right=new THREE.Vector3().crossVectors(forward,camera.up).normalize();
      const movement=new THREE.Vector3();
      if(keys.current.has("w")||keys.current.has("arrowup")) movement.add(forward);
      if(keys.current.has("s")||keys.current.has("arrowdown")) movement.sub(forward);
      if(keys.current.has("a")||keys.current.has("arrowleft")) movement.sub(right);
      if(keys.current.has("d")||keys.current.has("arrowright")) movement.add(right);

      if(movement.lengthSq()>0){
        const sprint=keys.current.has("shift")?1.35:1;
        const baseSpeed=travelMode==="vehicle"?8.5:3.9;
        movement.normalize().multiplyScalar(baseSpeed*sprint*delta);
        player.current.add(movement);
      }
    }

    const bound=74;
    player.current.x=THREE.MathUtils.clamp(player.current.x,-bound,bound);
    player.current.z=THREE.MathUtils.clamp(player.current.z,-bound,bound);

    camera.position.x=THREE.MathUtils.lerp(camera.position.x,player.current.x,0.18);
    camera.position.z=THREE.MathUtils.lerp(camera.position.z,player.current.z,0.18);
    camera.position.y=THREE.MathUtils.lerp(camera.position.y,travelMode==="vehicle"?1.36:1.68,0.1);

    if(travelMode==="vehicle") parkedVehicle.current.copy(player.current);
  });

  useEffect(()=>{
    const prevent=(event:MouseEvent)=>{
      if(document.pointerLockElement===gl.domElement) event.preventDefault();
    };
    gl.domElement.addEventListener("contextmenu",prevent);
    return()=>gl.domElement.removeEventListener("contextmenu",prevent);
  },[gl]);

  return (
    <>
      <Vehicle position={parkedVehicle.current} active={travelMode==="vehicle"} />
      <PointerLockControls selector="#universe-look-button" />
    </>
  );
}

function UniverseScene(props:TrustUniverseCanvasProps){
  return (
    <>
      <Sky
        distance={450000}
        sunPosition={[34,18,-20]}
        turbidity={7.5}
        rayleigh={2.4}
        mieCoefficient={0.008}
        mieDirectionalG={0.82}
      />
      <fog attach="fog" args={["#b6ab99",58,132]} />
      <ambientLight intensity={0.62} />
      <hemisphereLight args={["#d8e0df","#746756",1.05]} />
      <directionalLight
        position={[34,42,18]}
        intensity={2.65}
        color="#ffe4be"
        castShadow={props.quality==="balanced"}
        shadow-mapSize-width={props.quality==="balanced"?1536:512}
        shadow-mapSize-height={props.quality==="balanced"?1536:512}
      />

      <mesh rotation={[-Math.PI/2,0,0]} receiveShadow>
        <planeGeometry args={[200,200]} />
        <meshStandardMaterial color={desert} roughness={1} />
      </mesh>

      <Mountains />
      <TerrainVariation />
      <ArrivalCourt />
      <SecurityGate />
      <CampusWayfinding />
      <CampusInfrastructure />
      <DesertLandscape />

      {universeWorlds.filter((world)=>world.id!=="trust").map((world)=>(
        <Road key={world.id} to={world.position} />
      ))}

      {universeWorlds.map((world)=>(
        <Facility key={world.id} id={world.id} position={world.position} />
      ))}

      <ExploreController {...props} />
    </>
  );
}

export default function TrustUniverseCanvas(props:TrustUniverseCanvasProps){
  return (
    <Canvas
      camera={{position:[0,1.68,10.5],fov:46,near:.1,far:240}}
      dpr={props.quality==="lite"?1:[1,1.35]}
      shadows={props.quality==="balanced"}
      gl={{
        antialias:props.quality==="balanced",
        powerPreference:"high-performance",
        toneMapping:THREE.ACESFilmicToneMapping,
        toneMappingExposure:.98,
      }}
    >
      <Suspense fallback={null}>
        <UniverseScene {...props} />
      </Suspense>
    </Canvas>
  );
}

export { CONTROL_EVENT };
