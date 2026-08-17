'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CountUpProps {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export default function CountUp({
  target,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
}: CountUpProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const counterRef = useRef({ value: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const el = spanRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      el.innerHTML = `${prefix}${Math.round(target)}${suffix}`
      return
    }

    el.innerHTML = `${prefix}0${suffix}`
    counterRef.current.value = 0

    const ctx = gsap.context(() => {
      gsap.to(counterRef.current, {
        value: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          el.innerHTML = `${prefix}${Math.round(counterRef.current.value)}${suffix}`
        },
      })
    })

    return () => {
      ctx.revert()
    }
  }, [target, duration, suffix, prefix])

  return (
    <span ref={spanRef} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
