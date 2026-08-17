'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useScrollStore } from '@/stores/scrollStore';

const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => null,
});

export default function SceneLoader() {
  const deviceTier = useScrollStore((s) => s.deviceTier);

  if (deviceTier === 'low') {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Scene />
    </Suspense>
  );
}
