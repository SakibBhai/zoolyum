
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FF5001",
          hover: "#E64600",
        },
        secondary: {
          DEFAULT: "#1E293B",
          hover: "#334155",
        },
        accent: {
          DEFAULT: "#F43F5E",
          hover: "#E11D48",
        },
      },
      fontFamily: {
        sans: ["Inter var", ...fontFamily.sans],
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        }
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse": "pulse 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "text-shimmer": "text-shimmer 3s ease-in-out infinite"
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1E293B 0%, #FF5001 200%)',
        'hero-gradient-light': 'linear-gradient(135deg, #FFF5F1 0%, #FFF 100%)',
        'grid-white': 'linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
