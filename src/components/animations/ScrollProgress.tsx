'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const bar = barRef.current;
    if (!bar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      if (prefersReducedMotion.current) {
        bar.style.width = `${progress}%`;
      } else {
        gsap.to(bar, {
          width: `${progress}%`,
          duration: 0.1,
          ease: 'none',
        });
      }
    };

    // Initial calculation
    updateProgress();

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-[2px] z-[100] pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-sentinel-violet to-plasma-cyan"
        style={{ width: '0%' }}
      />
    </div>
  );
}
