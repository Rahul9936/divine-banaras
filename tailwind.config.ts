import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm spiritual palette inspired by Banaras ghats, marigold & saffron
        saffron: {
          DEFAULT: "#E8751A",
          light: "#F59E0B",
          dark: "#C25E10",
        },
        marigold: "#F4A623",
        maroon: {
          DEFAULT: "#7B1E1E",
          dark: "#4A1010",
        },
        cream: "#FDF6EC",
        sand: "#F3E7D3",
        gold: "#C9A227",
        ink: "#2A1A12",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(74, 16, 16, 0.25)",
        card: "0 8px 30px -10px rgba(42, 26, 18, 0.20)",
      },
      backgroundImage: {
        "ghat-gradient":
          "linear-gradient(135deg, #4A1010 0%, #7B1E1E 45%, #C25E10 100%)",
        "sunrise-gradient":
          "linear-gradient(160deg, #F4A623 0%, #E8751A 55%, #7B1E1E 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(0.97)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        flicker: "flicker 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
