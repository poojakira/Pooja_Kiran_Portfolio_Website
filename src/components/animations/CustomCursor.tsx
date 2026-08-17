'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'text'>('default');
  const prefersReducedMotion = useRef(false);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    // Check for touch device
    if (
      'ontouchstart' in window ||
      window.matchMedia('(hover: none)').matches
    ) {
      isTouchDevice.current = true;
      return; // Don't mount custom cursor on touch devices
    }

    // Check for reduced motion
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Hide native cursor
    document.body.classList.add('custom-cursor-active');

    const inner = innerRef.current;
    const outer = outerRef.current;
    if (!inner || !outer) return;

    setIsVisible(true);

    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Inner dot follows 1:1 (instant)
      gsap.set(inner, {
        x: mouse.x,
        y: mouse.y,
      });

      // Outer ring follows with lag
      if (prefersReducedMotion.current) {
        gsap.set(outer, {
          x: mouse.x,
          y: mouse.y,
        });
      } else {
        gsap.to(outer, {
          x: mouse.x,
          y: mouse.y,
          duration: 0.35,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect interactive and text elements
    const handleElementEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      if (
        target.matches('a, button, [data-cursor="pointer"]') ||
        target.closest('a, button, [data-cursor="pointer"]')
      ) {
        setCursorState('pointer');
      } else if (
        target.matches('[data-cursor="text"]') ||
        target.closest('[data-cursor="text"]')
      ) {
        setCursorState('text');
      }
    };

    const handleElementLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      if (
        target.matches('a, button, [data-cursor="pointer"], [data-cursor="text"]') ||
        target.closest('a, button, [data-cursor="pointer"], [data-cursor="text"]')
      ) {
        setCursorState('default');
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementEnter, { passive: true });
    document.addEventListener('mouseout', handleElementLeave, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementEnter);
      document.removeEventListener('mouseout', handleElementLeave);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  // Animate outer ring state changes
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer || isTouchDevice.current) return;

    if (prefersReducedMotion.current) {
      // Just update size without animation
      if (cursorState === 'pointer') {
        gsap.set(outer, { width: 48, height: 48 });
      } else if (cursorState === 'text') {
        gsap.set(outer, { width: 4, height: 32, borderRadius: '2px' });
      } else {
        gsap.set(outer, { width: 32, height: 32, borderRadius: '50%' });
      }
      return;
    }

    if (cursorState === 'pointer') {
      gsap.to(outer, {
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        backdropFilter: 'blur(4px)',
        borderColor: 'rgba(139, 92, 246, 0.6)',
        duration: 0.3,
        ease: 'power2.out',
      });
    } else if (cursorState === 'text') {
      gsap.to(outer, {
        width: 4,
        height: 32,
        borderRadius: '2px',
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        backdropFilter: 'blur(0px)',
        borderColor: 'transparent',
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(outer, {
        width: 32,
        height: 32,
        borderRadius: '50%',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
        borderColor: 'rgba(139, 92, 246, 0.8)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [cursorState]);

  // Don't render on touch devices (SSR-safe: check happens in useEffect)
  if (isTouchDevice.current) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#8B5CF6',
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
        aria-hidden="true"
      />

      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(139, 92, 246, 0.8)',
          backgroundColor: 'transparent',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
        aria-hidden="true"
      />
    </>
  );
}
