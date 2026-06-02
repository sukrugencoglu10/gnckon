import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        ink: {
          900: "#0b1220",
          800: "#111827",
          700: "#1f2937",
          600: "#374151",
          500: "#4b5563",
          400: "#6b7280",
        },
        wa: { DEFAULT: "#25D366", dark: "#1ebe57" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.06)",
      },
      keyframes: {
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%":      { transform: "scale(1.12)" },
          "28%":      { transform: "scale(1)" },
          "42%":      { transform: "scale(1.08)" },
          "70%":      { transform: "scale(1)" },
        },
        wave: {
          "0%":   { transform: "scale(1)",   opacity: "0.55" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        heartbeat: "heartbeat 1.6s ease-in-out infinite",
        wave: "wave 1.8s ease-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
