'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
}: MagneticButtonProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const el = elementRef.current;
    if (!el || prefersReducedMotion.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Calculate displacement, capped at 10px
      const maxDisplacement = 10;
      const moveX = Math.max(
        -maxDisplacement,
        Math.min(maxDisplacement, deltaX * strength)
      );
      const moveY = Math.max(
        -maxDisplacement,
        Math.min(maxDisplacement, deltaY * strength)
      );

      gsap.to(el, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={elementRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
