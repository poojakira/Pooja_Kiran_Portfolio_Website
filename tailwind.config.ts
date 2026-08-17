import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-space": "#0A0A0F",
        obsidian: "#12121A",
        graphite: "#1E1E2E",
        "sentinel-violet": "#8B5CF6",
        "plasma-cyan": "#06B6D4",
        "secure-green": "#10B981",
        "amber-alert": "#F59E0B",
        "pure-light": "#FAFAFA",
        "silver-haze": "#94A3B8",
        whisper: "#475569",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "fluid-xs": "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.625vw, 1.25rem)",
        "fluid-xl": "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
        "fluid-2xl": "clamp(1.5rem, 1.2rem + 1.5vw, 2rem)",
        "fluid-3xl": "clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)",
        "fluid-4xl": "clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem)",
        "fluid-5xl": "clamp(3rem, 2rem + 4vw, 5rem)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "scan-line": "scan-line 3s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "slide-in": "slide-in 0.5s ease-out forwards",
        "matrix-fade": "matrix-fade 3s ease-in-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "matrix-fade": {
          "0%": { opacity: "0" },
          "10%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
    },
  },
  plugins: [],
};

export default config;
