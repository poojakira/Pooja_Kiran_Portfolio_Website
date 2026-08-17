'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/stores/scrollStore';

interface ParticleFieldProps {
  count?: number;
}

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  
  attribute float aOpacity;
  attribute vec3 aOffset;
  
  varying float vOpacity;
  
  void main() {
    vOpacity = aOpacity;
    
    vec3 pos = position;
    
    // Sine-wave drift animation
    pos.x += sin(uTime * 0.3 + aOffset.x * 6.28) * 0.5;
    pos.y += cos(uTime * 0.2 + aOffset.y * 6.28) * 0.4;
    pos.z += sin(uTime * 0.15 + aOffset.z * 6.28) * 0.3;
    
    // Scroll influence - gentle vertical drift
    pos.y += uScroll * 2.0;
    
    // Mouse repulsion
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vec2 screenPos = mvPosition.xy / mvPosition.w;
    
    float dist = distance(screenPos.xy, uMouse);
    float repelRadius = 0.3;
    
    if (dist < repelRadius) {
      float strength = (1.0 - dist / repelRadius) * 0.5;
      vec2 dir = normalize(screenPos.xy - uMouse);
      pos.x += dir.x * strength;
      pos.y += dir.y * strength;
    }
    
    vec4 finalPosition = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_Position = finalPosition;
    
    // Point size with distance attenuation
    gl_PointSize = (3.0 + aOpacity * 4.0) * (300.0 / -mvPosition.z);
  }
`;

const fragmentShader = `
  uniform float uTime;
  
  varying float vOpacity;
  
  void main() {
    // Circular point with soft falloff
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    // Soft circle with radial falloff
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= vOpacity;
    
    // Plasma cyan color: #06B6D4
    vec3 color = vec3(0.024, 0.714, 0.831);
    
    // Subtle pulse
    alpha *= 0.8 + 0.2 * sin(uTime * 0.5);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function ParticleField({ count = 200 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, opacities, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const opacities = new Float32Array(count);
    const offsets = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random positions in a 3D volume
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;

      // Random opacity between 5-25% (0.05 - 0.25)
      opacities[i] = 0.05 + Math.random() * 0.20;

      // Random offset for sine variation
      offsets[i * 3] = Math.random();
      offsets[i * 3 + 1] = Math.random();
      offsets[i * 3 + 2] = Math.random();
    }

    return { positions, opacities, offsets };
  }, [count]);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uScroll: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((_, delta) => {
    if (!materialRef.current) return;

    const { mousePosition, scrollProgress } = useScrollStore.getState();

    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uMouse.value.set(
      mousePosition.x,
      mousePosition.y
    );
    materialRef.current.uniforms.uScroll.value = scrollProgress;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aOpacity"
          array={opacities}
          count={count}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aOffset"
          array={offsets}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </points>
  );
}
