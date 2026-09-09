import type { Config } from "tailwindcss";

// ============================================================================
// DESIGN SYSTEM — "Interactive AI Security Research Lab"
// Near-black graphite, soft white type, ONE restrained technical accent.
// No neon. No hacker clichés. Editorial spacing, precision geometry.
// ============================================================================

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Graphite depth scale (background -> surface)
        void: "#050506",
        ink: "#0A0B0D",
        graphite: "#121316",
        slate: "#1A1C20",
        steel: "#25282E",
        // Typography
        chalk: "#F4F5F7",
        mist: "#A8ACB4",
        ash: "#6B7078",
        faint: "#3A3D44",
        // Single restrained accent — a cold signal cyan, used sparingly
        signal: "#5BC8D6",
        "signal-dim": "#2E6E77",
        // Semantic states (muted, not neon)
        allow: "#5FB98A",
        block: "#D6685B",
        warn: "#D6A85B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "fluid-xs": "clamp(0.72rem, 0.68rem + 0.2vw, 0.8rem)",
        "fluid-sm": "clamp(0.85rem, 0.8rem + 0.3vw, 0.95rem)",
        "fluid-base": "clamp(1rem, 0.92rem + 0.4vw, 1.1rem)",
        "fluid-lg": "clamp(1.15rem, 1rem + 0.6vw, 1.35rem)",
        "fluid-xl": "clamp(1.35rem, 1.1rem + 1vw, 1.75rem)",
        "fluid-2xl": "clamp(1.7rem, 1.3rem + 1.8vw, 2.4rem)",
        "fluid-3xl": "clamp(2.1rem, 1.5rem + 3vw, 3.4rem)",
        "fluid-4xl": "clamp(2.6rem, 1.7rem + 4.5vw, 4.8rem)",
        "fluid-5xl": "clamp(3rem, 1.8rem + 6vw, 6.5rem)",
        "fluid-6xl": "clamp(3.4rem, 2rem + 8vw, 8.5rem)",
      },
      letterSpacing: {
        tightest: "-0.045em",
        wider: "0.08em",
        widest: "0.22em",
      },
      maxWidth: {
        editorial: "72rem",
        prose: "44rem",
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fade-in 1s ease forwards",
        "pulse-soft": "pulse-soft 3.5s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "pulse-soft": {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16,1,0.3,1)",
      },
    },
  },
  plugins: [],
};

export default config;
