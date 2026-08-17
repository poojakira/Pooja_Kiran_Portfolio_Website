'use client'

import { useRef, useEffect, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface StaggerChildrenProps {
  children: ReactNode
  className?: string
  stagger?: number
  direction?: 'up' | 'left'
}

export default function StaggerChildren({
  children,
  className,
  stagger = 0.1,
  direction = 'up',
}: StaggerChildrenProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const el = containerRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const childElements = el.children

    if (prefersReducedMotion) {
      gsap.set(childElements, { opacity: 1, x: 0, y: 0 })
      return
    }

    const fromProps: Record<string, number> = { opacity: 0 }
    const toProps: Record<string, number> = { opacity: 1 }

    if (direction === 'up') {
      fromProps.y = 40
      toProps.y = 0
    } else {
      fromProps.x = 40
      toProps.x = 0
    }

    gsap.set(childElements, fromProps)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      })

      tl.to(childElements, {
        ...toProps,
        duration: 0.8,
        ease: 'power3.out',
        stagger,
      })
    })

    return () => {
      ctx.revert()
    }
  }, [stagger, direction])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
