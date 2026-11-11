import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07080b",
        foreground: "#f3f5f9",
        brand: {
          50: "#f7fee7",
          100: "#f0fdd4",
          200: "#e0fca9",
          300: "#ccff00", // Hero Electric Lime
          400: "#bef264",
          500: "#a3e635",
          600: "#84cc16",
          DEFAULT: "#ccff00",
          glow: "rgba(204, 255, 0, 0.35)",
        },
        surface: {
          950: "#050608",
          900: "#090b10",
          850: "#0e1118",
          800: "#141722",
          750: "#1a1e2d",
          700: "#22283a",
          border: "rgba(255, 255, 255, 0.08)",
          borderGlow: "rgba(204, 255, 0, 0.25)",
        },
        accent: {
          cyan: "#38bdf8",
          purple: "#a855f7",
          emerald: "#10b981",
          rose: "#f43f5e",
          amber: "#fbbf24",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        }
      },
      boxShadow: {
        'brand-glow': '0 0 35px -5px rgba(204, 255, 0, 0.3)',
        'brand-glow-lg': '0 0 60px -10px rgba(204, 255, 0, 0.4)',
        'cyan-glow': '0 0 30px -5px rgba(56, 189, 248, 0.25)',
        'surface-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [],
};
export default config;
