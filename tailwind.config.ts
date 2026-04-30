import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: "#FF6B00",
          light: "#FF8C33",
          dark: "#E55A00",
        },
        "india-green": {
          DEFAULT: "#138808",
          light: "#1AA80A",
          dark: "#0F6606",
        },
        navy: {
          DEFAULT: "#000080",
          light: "#0000B3",
        },
        "ashoka-blue": "#06038D",
        glass: "rgba(255,255,255,0.06)",
        "glass-border": "rgba(255,255,255,0.12)",
        "war-room": "#0A0A14",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
        firaCode: ["Fira Code", "monospace"],
      },
      backgroundImage: {
        "tricolor-gradient":
          "linear-gradient(135deg, #FF6B00 0%, #1a1a2e 40%, #138808 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(255,107,0,0.08) 0%, rgba(19,136,8,0.08) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        typing: "typing 1.2s steps(3, end) infinite",
        "power-on": "powerOn 0.6s ease-out forwards",
        "neon-pulse": "neonPulse 2s ease-in-out infinite",
        "classified-fade": "classifiedFade 0.4s ease forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        typing: {
          "0%": { content: "." },
          "33%": { content: ".." },
          "66%": { content: "..." },
        },
        powerOn: {
          "0%": { opacity: "0.2", filter: "brightness(0.3)" },
          "50%": { filter: "brightness(1.5)" },
          "100%": { opacity: "1", filter: "brightness(1)" },
        },
        neonPulse: {
          "0%, 100%": { filter: "drop-shadow(0 0 4px rgba(255,107,0,0.4))" },
          "50%": { filter: "drop-shadow(0 0 10px rgba(255,107,0,0.7))" },
        },
        classifiedFade: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
