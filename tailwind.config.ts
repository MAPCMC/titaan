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
      screens: {
        "3xl": "1600px",
      },
      fontFamily: {
        sans: ["Yantramanav"],
        mono: ["Yantramanav"],
      },
      keyframes: {
        light: {
          "0%": {
            transform: "scaleX(0.6)",
            backgroundPosition: "100% 0%",
            opacity: "0.3",
          },
          "50%": { opacity: "0.5" },
          "100%": {
            transform: "scaleX(1)",
            backgroundPosition: "0% 0%",
            opacity: "1",
          },
        },
      },
      animation: {
        light: "light 4s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
