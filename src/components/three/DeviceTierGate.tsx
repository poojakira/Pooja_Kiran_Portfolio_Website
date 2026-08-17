'use client';

import { useEffect } from 'react';
import { useDeviceTier } from '@/hooks/useDeviceTier';
import { useScrollStore } from '@/stores/scrollStore';
import SceneLoader from './SceneLoader';

/**
 * DeviceTierGate detects the device performance tier and decides
 * what level of Three.js rendering to provide:
 *
 * - 'high': Full particle system (200 particles + threat animation)
 * - 'medium': Reduced particle system (80 particles, no threat animation)
 * - 'low': Render nothing (CSS gradient background handles the visual)
 *
 * This component wraps SceneLoader and updates the zustand store
 * with the detected tier so other components can respond accordingly.
 */
export default function DeviceTierGate() {
  const tier = useDeviceTier();
  const setDeviceTier = useScrollStore((s) => s.setDeviceTier);

  useEffect(() => {
    setDeviceTier(tier);
  }, [tier, setDeviceTier]);

  // Low tier: render nothing — CSS gradient background handles visuals
  if (tier === 'low') {
    return null;
  }

  // SceneLoader already reads deviceTier from the store to determine
  // particle count and threat animation. We just need to gate access.
  return <SceneLoader />;
}
