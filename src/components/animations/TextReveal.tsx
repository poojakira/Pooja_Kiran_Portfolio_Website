'use client'

import { useRef, useEffect, createElement } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  splitBy?: 'char' | 'word'
  stagger?: number
}

export default function TextReveal({
  children,
  className,
  as = 'h2',
  splitBy = 'word',
  stagger = 0.03,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      const spans = containerRef.current?.querySelectorAll('.text-reveal-item')
      spans?.forEach((span) => {
        gsap.set(span, { y: '0%', opacity: 1 })
      })
      return
    }

    const el = containerRef.current
    if (!el) return

    const items = el.querySelectorAll('.text-reveal-item')

    gsap.set(items, { y: '100%', opacity: 0 })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      })

      tl.to(items, {
        y: '0%',
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger,
      })
    })

    return () => {
      ctx.revert()
    }
  }, [children, splitBy, stagger])

  const units = splitBy === 'word' ? children.split(' ') : children.split('')

  const content = units.map((unit, i) => {
    const isWord = splitBy === 'word'
    return (
      <span
        key={i}
        style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
      >
        <span
          className="text-reveal-item"
          style={{ display: 'inline-block', willChange: 'transform' }}
        >
          {unit}
          {isWord && i < units.length - 1 ? '\u00A0' : ''}
        </span>
      </span>
    )
  })

  return createElement(
    as,
    { ref: containerRef, className },
    content
  )
}
