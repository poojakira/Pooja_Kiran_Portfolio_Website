"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { DeviceTier } from "@/hooks/useDeviceTier";

/**
 * SECURITY CORE
 * A custom hero object: a faceted inner core (the intelligent system) wrapped
 * by a wireframe boundary shell (the security perimeter), with nodes on the
 * boundary and data pulses traveling inward through connective struts.
 *
 * Meaning, not decoration:
 *  - inner solid  = the model / agent (capability)
 *  - outer shell  = the security boundary
 *  - node points  = tools / identities / resources at the edge
 *  - pulses       = requests being inspected as they cross the boundary
 */
export default function SecurityCore({
  tier = "high",
  pointer,
}: {
  tier?: DeviceTier;
  pointer?: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.LineSegments>(null);
  const pulseRefs = useRef<THREE.Mesh[]>([]);

  const detail = tier === "high" ? 1 : 0;
  const nodeCount = tier === "high" ? 14 : tier === "mid" ? 10 : 7;

  // Boundary nodes distributed on a sphere (Fibonacci) — tools/identities.
  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(2.05));
    }
    return pts;
  }, [nodeCount]);

  // Struts from each boundary node toward the core.
  const strutGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions: number[] = [];
    nodes.forEach((n) => {
      const inner = n.clone().multiplyScalar(0.42);
      positions.push(n.x, n.y, n.z, inner.x, inner.y, inner.z);
    });
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [nodes]);

  const shellGeometry = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(2.05, detail === 1 ? 1 : 0);
    return new THREE.WireframeGeometry(ico);
  }, [detail]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      // Gentle constant rotation + subtle cursor parallax
      group.current.rotation.y += delta * 0.12;
      const px = pointer?.current.x ?? 0;
      const py = pointer?.current.y ?? 0;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, py * 0.25, 0.05);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, px * -0.12, 0.05);
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 1.4) * 0.03;
      coreRef.current.scale.setScalar(s);
      coreRef.current.rotation.x -= delta * 0.15;
    }
    if (shellRef.current) shellRef.current.rotation.y -= delta * 0.04;

    // Pulses travel from boundary node inward, then reset (inspection metaphor).
    pulseRefs.current.forEach((p, i) => {
      if (!p) return;
      const node = nodes[i % nodes.length];
      const phase = (t * 0.35 + i / nodeCount) % 1;
      const pos = node.clone().multiplyScalar(1 - phase * 0.58);
      p.position.copy(pos);
      const mat = p.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.sin(phase * Math.PI) * 0.9;
    });
  });

  return (
    <group ref={group}>
      {/* Inner core — the intelligent system */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.85, detail]} />
        <meshStandardMaterial
          color="#1A1C20"
          emissive="#5BC8D6"
          emissiveIntensity={0.12}
          metalness={0.7}
          roughness={0.35}
          flatShading
        />
      </mesh>

      {/* Inner faceted glow edge */}
      <mesh scale={0.87}>
        <icosahedronGeometry args={[0.85, detail]} />
        <meshBasicMaterial color="#5BC8D6" wireframe transparent opacity={0.14} />
      </mesh>

      {/* Boundary shell — the security perimeter */}
      <lineSegments ref={shellRef} geometry={shellGeometry}>
        <lineBasicMaterial color="#3A3D44" transparent opacity={0.5} />
      </lineSegments>

      {/* Connective struts */}
      <lineSegments geometry={strutGeometry}>
        <lineBasicMaterial color="#25282E" transparent opacity={0.65} />
      </lineSegments>

      {/* Boundary nodes */}
      {nodes.map((n, i) => (
        <mesh key={i} position={n}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#A8ACB4" />
        </mesh>
      ))}

      {/* Data pulses crossing the boundary */}
      {nodes.map((_, i) => (
        <mesh
          key={`p${i}`}
          ref={(el) => {
            if (el) pulseRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.05, 10, 10]} />
          <meshBasicMaterial color="#5BC8D6" transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}
