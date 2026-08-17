'use client';

import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import ParticleField from './ParticleField';
import ThreatParticle from './ThreatParticle';
import { useScrollStore } from '@/stores/scrollStore';

/**
 * Scene renders the R3F Canvas with particle systems.
 * Scroll/mouse synchronization is handled by ScrollSyncBridge,
 * which writes to the Zustand store outside of Canvas.
 */
export default function Scene() {
  const deviceTier = useScrollStore((s) => s.deviceTier);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 10],
          fov: 60,
          near: 0.1,
          far: 100,
        }}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr pixelated />
        <ParticleField count={deviceTier === 'high' ? 200 : 80} />
        {deviceTier === 'high' && <ThreatParticle />}
      </Canvas>
    </div>
  );
}
