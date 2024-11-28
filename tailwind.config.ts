import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: "var(--blue)",
        "blue-light": "var(--blue-light)",
        yellow: "rgb(var(--yellow))",
        "yellow-light": "rgb(var(--yellow-light))",
      },
      fontFamily: {
        sans: ["Yantramanav"],
        mono: ["Yantramanav"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
