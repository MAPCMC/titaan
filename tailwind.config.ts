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
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        blue: "rgb(var(--blue))",
        "blue-light": "rgb(var(--blue-light))",
        yellow: "rgb(var(--yellow))",
        "yellow-light": "rgb(var(--yellow-light))",
        "foreground-light": "rgb(var(--foreground-light))",
        "background-dark": "rgb(var(--background-dark))",
        red: "rgb(var(--red))",
        "red-light": "rgb(var(--red-light))",
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
