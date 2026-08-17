// ============================================================================
// Guardian Protocol — Animation & Layout Constants
// ============================================================================

// --- Easing Curves ---

export const EASE = {
  smooth: [0.4, 0.0, 0.2, 1.0] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  power: [0.7, 0.0, 0.3, 1.0] as const,
  linear: [0.0, 0.0, 1.0, 1.0] as const,
} as const;

// --- Duration (ms) ---

export const DURATION = {
  instant: 150,
  fast: 300,
  medium: 600,
  slow: 1000,
} as const;

// --- Breakpoints (px) ---

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

// --- Animation Variants (Framer Motion compatible) ---

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.medium / 1000 } },
} as const;

export const SLIDE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.medium / 1000, ease: EASE.smooth },
  },
} as const;

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
} as const;

export const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.fast / 1000, ease: EASE.smooth },
  },
} as const;
