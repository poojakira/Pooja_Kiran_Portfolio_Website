'use client'

import { useRef, useEffect, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      if (ref.current) {
        gsap.set(ref.current, { opacity: 1, x: 0, y: 0 })
      }
      return
    }

    const el = ref.current
    if (!el) return

    const initialProps: Record<string, number> = { opacity: 0 }
    const animateProps: Record<string, number> = { opacity: 1 }

    switch (direction) {
      case 'up':
        initialProps.y = 40
        animateProps.y = 0
        break
      case 'down':
        initialProps.y = -40
        animateProps.y = 0
        break
      case 'left':
        initialProps.x = 40
        animateProps.x = 0
        break
      case 'right':
        initialProps.x = -40
        animateProps.x = 0
        break
    }

    gsap.set(el, initialProps)

    const ctx = gsap.context(() => {
      gsap.to(el, {
        ...animateProps,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      })
    })

    return () => {
      ctx.revert()
    }
  }, [delay, direction])

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
