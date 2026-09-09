"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * CameraRig — narrative camera. Uses the global --scroll (0..1) variable set by
 * SmoothScroll plus pointer parallax. Hero is wide; as the user scrolls the
 * camera eases closer, as if moving into the architecture.
 */
export default function CameraRig({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    const scrollStr =
      typeof document !== "undefined"
        ? getComputedStyle(document.documentElement).getPropertyValue("--scroll")
        : "0";
    const scroll = parseFloat(scrollStr) || 0;

    // Only the first ~viewport of scroll affects the hero camera.
    const local = Math.min(scroll * 3, 1);
    const z = THREE.MathUtils.lerp(6.5, 4.4, local);
    const y = THREE.MathUtils.lerp(0, 0.6, local);

    const px = pointer.current.x;
    const py = pointer.current.y;

    target.current.set(px * 0.6, y + py * 0.4, z);
    camera.position.lerp(target.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
