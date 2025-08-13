import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./constants/**/*.{ts,tsx}",
  ],
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
        // Semantic theme tokens (centralized via CSS variables)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // New brand palette
        fill: { 1: "rgba(255,255,255,0.08)" },
        bankGradient: "#7C3AED", // violet-600 base for legacy gradient uses
        indigo: { 500: "#7C3AED", 700: "#5B21B6" },
        success: {
          25: "#F5FEFB",
          50: "#E9FBF5",
          100: "#CFF3E6",
          600: "#0E9F6E",
          700: "#057A55",
          900: "#044A2A",
        },
        pink: {
          25: "#FFF5FA",
          100: "#FEE5F2",
          500: "#F472B6",
          600: "#EC4899",
          700: "#DB2777",
          900: "#9D174D",
        },
        blue: {
          25: "#F6F5FF",
          100: "#EDE9FE",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          900: "#4C1D95",
        },
        sky: { 1: "#F9F7FF" },
        black: { 1: "#0F1020", 2: "#2A2A3C" },
        gray: {
          25: "#FAFAFB",
          200: "#E7E3EE",
          300: "#D6D0E1",
          500: "#8B89A6",
          600: "#6D6A86",
          700: "#4D4B66",
          900: "#1E1B2E",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "bank-gradient": "linear-gradient(90deg, #7C3AED 0%, #EC4899 100%)",
        "gradient-mesh":
          "linear-gradient(135deg, #0F1020 0%, #3B1D60 50%, #7C3AED 100%)",
        "bank-green-gradient":
          "linear-gradient(90deg, #7C3AED 0%, #22C55E 100%)",
        "auth-gradient":
          "radial-gradient(1200px 600px at 20% 20%, rgba(124,58,237,0.45), transparent 60%), radial-gradient(900px 500px at 80% 70%, rgba(168,85,247,0.6), transparent 65%), linear-gradient(135deg, #0F1020 0%, #3B1D60 50%, #7C3AED 100%)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
        form: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        chart:
          "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
        profile:
          "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        creditCard: "8px 10px 16px 0px rgba(0, 0, 0, 0.05)",
      },
      fontFamily: {
        inter: "var(--font-inter)",
        "ibm-plex-serif": "var(--font-ibm-plex-serif)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
