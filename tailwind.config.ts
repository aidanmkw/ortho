import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#f4ecd8",
        ink: "#1a1814",
        gold: "#c9a227",
        crimson: "#7c1414",
        byzantine: "#3a1f4d",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        display: ["Cinzel", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
