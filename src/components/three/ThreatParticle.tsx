'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type ThreatState = 'idle' | 'traveling' | 'intercepted' | 'dissipating';

const threatVertexShader = `
  uniform float uSize;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * (300.0 / -mvPosition.z);
  }
`;

const threatFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  
  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const ringVertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ringFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  
  void main() {
    gl_FragColor = vec4(uColor, uOpacity);
  }
`;

export default function ThreatParticle() {
  const threatRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const stateRef = useRef<ThreatState>('idle');
  const timerRef = useRef(0);
  const progressRef = useRef(0);
  const interceptPointRef = useRef(new THREE.Vector3());
  const startPointRef = useRef(new THREE.Vector3());
  const targetPointRef = useRef(new THREE.Vector3(0, 0, -5));
  const nextTriggerRef = useRef(getRandomDelay());
  const ringScaleRef = useRef(0);

  const [threatPosition] = useState(() => new Float32Array([0, 0, -5]));

  const threatMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: threatVertexShader,
      fragmentShader: threatFragmentShader,
      uniforms: {
        uColor: { value: new THREE.Color('#F59E0B') },
        uSize: { value: 6.0 },
        uOpacity: { value: 0.0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  const ringMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: ringVertexShader,
      fragmentShader: ringFragmentShader,
      uniforms: {
        uColor: { value: new THREE.Color('#8B5CF6') },
        uOpacity: { value: 0.0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, []);

  function getRandomDelay() {
    return 8 + Math.random() * 4; // 8-12 seconds
  }

  function getRandomEdgePosition(): THREE.Vector3 {
    const edge = Math.floor(Math.random() * 4);
    const spread = 12;
    switch (edge) {
      case 0: return new THREE.Vector3(-spread, (Math.random() - 0.5) * spread, -5);
      case 1: return new THREE.Vector3(spread, (Math.random() - 0.5) * spread, -5);
      case 2: return new THREE.Vector3((Math.random() - 0.5) * spread, spread, -5);
      case 3: return new THREE.Vector3((Math.random() - 0.5) * spread, -spread, -5);
      default: return new THREE.Vector3(-spread, 0, -5);
    }
  }

  useFrame((_, delta) => {
    timerRef.current += delta;

    switch (stateRef.current) {
      case 'idle': {
        if (timerRef.current >= nextTriggerRef.current) {
          // Start a new threat
          stateRef.current = 'traveling';
          timerRef.current = 0;
          progressRef.current = 0;
          startPointRef.current = getRandomEdgePosition();
          targetPointRef.current.set(
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            -5
          );
          // Intercept at 60-80% of the way
          const interceptT = 0.6 + Math.random() * 0.2;
          interceptPointRef.current.lerpVectors(
            startPointRef.current,
            targetPointRef.current,
            interceptT
          );
          threatMaterial.uniforms.uOpacity.value = 0.8;
        }
        break;
      }

      case 'traveling': {
        progressRef.current += delta * 0.4; // Travel speed
        
        if (progressRef.current >= 0.7) {
          // Intercept!
          stateRef.current = 'intercepted';
          timerRef.current = 0;
          ringScaleRef.current = 0;
          ringMaterial.uniforms.uOpacity.value = 0.7;
        }

        // Update threat position
        const pos = new THREE.Vector3().lerpVectors(
          startPointRef.current,
          targetPointRef.current,
          progressRef.current
        );
        threatPosition[0] = pos.x;
        threatPosition[1] = pos.y;
        threatPosition[2] = pos.z;

        if (threatRef.current) {
          const geo = threatRef.current.geometry;
          const attr = geo.getAttribute('position');
          if (attr) {
            (attr.array as Float32Array)[0] = pos.x;
            (attr.array as Float32Array)[1] = pos.y;
            (attr.array as Float32Array)[2] = pos.z;
            attr.needsUpdate = true;
          }
        }
        break;
      }

      case 'intercepted': {
        timerRef.current += delta;
        
        // Fade out threat
        threatMaterial.uniforms.uOpacity.value = Math.max(0, 0.8 - timerRef.current * 2);
        
        // Expand ring
        ringScaleRef.current += delta * 8;
        ringMaterial.uniforms.uOpacity.value = Math.max(0, 0.7 - timerRef.current * 1.5);

        if (ringRef.current) {
          ringRef.current.scale.setScalar(ringScaleRef.current);
          ringRef.current.position.copy(interceptPointRef.current);
        }

        if (timerRef.current > 0.8) {
          stateRef.current = 'dissipating';
          timerRef.current = 0;
        }
        break;
      }

      case 'dissipating': {
        timerRef.current += delta;
        
        threatMaterial.uniforms.uOpacity.value = 0;
        ringMaterial.uniforms.uOpacity.value = Math.max(0, 0.2 - timerRef.current * 0.5);

        if (timerRef.current > 0.5) {
          stateRef.current = 'idle';
          timerRef.current = 0;
          nextTriggerRef.current = getRandomDelay();
          ringMaterial.uniforms.uOpacity.value = 0;
          if (ringRef.current) {
            ringRef.current.scale.setScalar(0);
          }
        }
        break;
      }
    }
  });

  return (
    <group>
      {/* Threat particle (amber) */}
      <points ref={threatRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={threatPosition}
            count={1}
            itemSize={3}
          />
        </bufferGeometry>
        <primitive object={threatMaterial} attach="material" />
      </points>

      {/* Barrier ring (violet) */}
      <mesh ref={ringRef} position={[0, 0, -5]}>
        <ringGeometry args={[0.8, 1.0, 32]} />
        <primitive object={ringMaterial} attach="material" />
      </mesh>
    </group>
  );
}
