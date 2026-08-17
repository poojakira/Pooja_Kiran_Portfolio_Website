import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScrollStore } from '@/stores/scrollStore';

export interface ParticleScrollModifiers {
  speed: number;
  spread: number;
  grouping: number;
  intensity: number;
}

/**
 * Custom hook for use inside R3F Canvas (via useFrame).
 * Reads scrollProgress from the Zustand store and returns
 * behavior modifiers based on the current scroll section.
 *
 * Uses useScrollStore.getState() to avoid React re-renders.
 * Smoothly interpolates between section values.
 */
export function useParticleScroll(): ParticleScrollModifiers {
  const modifiersRef = useRef<ParticleScrollModifiers>({
    speed: 0.5,
    spread: 1.0,
    grouping: 0.0,
    intensity: 0.5,
  });

  useFrame(() => {
    const { scrollProgress } = useScrollStore.getState();
    const current = modifiersRef.current;

    let targetSpeed: number;
    let targetSpread: number;
    let targetGrouping: number;
    let targetIntensity: number;

    if (scrollProgress < 0.15) {
      // Hero section (0-0.15): particles spread wide, moderate speed
      targetSpeed = 0.5;
      targetSpread = 1.0;
      targetGrouping = 0.0;
      targetIntensity = 0.5;
    } else if (scrollProgress < 0.3) {
      // About section (0.15-0.3): particles cluster slightly toward center
      targetSpeed = 0.4;
      targetSpread = 0.7;
      targetGrouping = 0.3;
      targetIntensity = 0.4;
    } else if (scrollProgress < 0.5) {
      // Domains section (0.3-0.5): particles form into 5 loose groups
      targetSpeed = 0.45;
      targetSpread = 0.6;
      targetGrouping = 0.8;
      targetIntensity = 0.6;
    } else if (scrollProgress < 0.7) {
      // Projects section (0.5-0.7): particles speed up, more active
      targetSpeed = 0.7;
      targetSpread = 0.85;
      targetGrouping = 0.4;
      targetIntensity = 0.8;
    } else {
      // Experience/Contact (0.7-1.0): particles calm down, drift slowly
      targetSpeed = 0.25;
      targetSpread = 0.9;
      targetGrouping = 0.1;
      targetIntensity = 0.3;
    }

    // Smooth interpolation (lerp) for seamless transitions
    const lerpFactor = 0.03;
    current.speed += (targetSpeed - current.speed) * lerpFactor;
    current.spread += (targetSpread - current.spread) * lerpFactor;
    current.grouping += (targetGrouping - current.grouping) * lerpFactor;
    current.intensity += (targetIntensity - current.intensity) * lerpFactor;
  });

  return modifiersRef.current;
}
