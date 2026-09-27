import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#0B0E13",
        panel: "#12161F",
        steel: "#1B212D",
        line: "#28303E",
        ink: "#E6EAF0",
        muted: "#8A93A3",
        cyan: "#3DD6E0",
        allow: "#41D18A",
        warn: "#F5A623",
        block: "#FF5A5F",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
