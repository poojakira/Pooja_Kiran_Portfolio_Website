"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "high" | "mid" | "low";

/**
 * Coarse device capability detection to scale 3D quality.
 * - low  : mobile / very limited -> minimal or no 3D
 * - mid  : tablets / modest -> reduced geometry + DPR
 * - high : desktop -> full experience
 */
export function useDeviceTier(): { tier: DeviceTier; isMobile: boolean; mounted: boolean } {
  const [state, setState] = useState<{ tier: DeviceTier; isMobile: boolean; mounted: boolean }>({
    tier: "high",
    isMobile: false,
    mounted: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    const cores = navigator.hardwareConcurrency ?? 4;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const isMobile = width < 768 || /Mobi|Android/i.test(navigator.userAgent);

    let tier: DeviceTier = "high";
    if (isMobile || cores <= 4 || mem <= 4) tier = width < 768 ? "low" : "mid";
    if (cores <= 2 || mem <= 2) tier = "low";

    setState({ tier, isMobile, mounted: true });
  }, []);

  return state;
}
