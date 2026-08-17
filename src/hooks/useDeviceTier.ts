'use client';

import { useState, useEffect } from 'react';

export type DeviceTier = 'high' | 'medium' | 'low';

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  };
}

function detectDeviceTier(): DeviceTier {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'medium';
  }

  const nav = navigator as NavigatorWithMemory;

  const cores = nav.hardwareConcurrency ?? 0;
  const memory = nav.deviceMemory ?? 0;
  const connection = nav.connection;
  const effectiveType = connection?.effectiveType ?? 'unknown';

  // Check for high-end device
  const hasManyCorses = cores >= 8;
  const hasHighMemory = memory >= 8;
  const hasGoodConnection = ['4g'].includes(effectiveType) || effectiveType === 'unknown';

  if (hasManyCorses && hasGoodConnection && (hasHighMemory || memory === 0)) {
    return 'high';
  }

  // Check for medium device
  if (cores >= 4) {
    return 'medium';
  }

  // Low performance connections
  if (['slow-2g', '2g'].includes(effectiveType)) {
    return 'low';
  }

  // If we can't detect anything meaningful, default to medium
  if (cores === 0 && memory === 0) {
    return 'medium';
  }

  return 'low';
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('medium');

  useEffect(() => {
    const detected = detectDeviceTier();
    setTier(detected);
  }, []);

  return tier;
}
