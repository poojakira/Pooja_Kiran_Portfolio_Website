'use client';

import { useEffect, useRef } from 'react';
import { useScrollStore } from '@/stores/scrollStore';

/**
 * ScrollSyncBridge sits in the DOM (not in Canvas) and bridges
 * scroll/mouse events to the Zustand store for Three.js consumption.
 * Uses requestAnimationFrame for smooth, throttled updates.
 */
export default function ScrollSyncBridge() {
  const scrollPendingRef = useRef(false);
  const mousePendingRef = useRef(false);
  const latestScrollRef = useRef(0);
  const latestMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      latestScrollRef.current = Math.min(1, Math.max(0, progress));

      if (!scrollPendingRef.current) {
        scrollPendingRef.current = true;
        requestAnimationFrame(() => {
          useScrollStore.getState().setScrollProgress(latestScrollRef.current);
          scrollPendingRef.current = false;
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      latestMouseRef.current = { x, y };

      if (!mousePendingRef.current) {
        mousePendingRef.current = true;
        requestAnimationFrame(() => {
          const { x: mx, y: my } = latestMouseRef.current;
          useScrollStore.getState().setMousePosition(mx, my);
          mousePendingRef.current = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Initialize scroll position on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
}
