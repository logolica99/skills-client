/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        hind: ["var(--font-HindSiliguri)", ...fontFamily.sans],
      },
      colors: {
        teal: "#107B61",
        yellow: "#DE9931",

        purple: "#B153E0",
        paragraph: "#2E2E2E",
        heading: "#0F0F0F",
        darkParagraph: "#BCBCBC",
        darkHeading: "#E2E8F0",
      },
      screens: {
        lgXl: "1440px",
        lgXxl: "1600px",
        lgMd: "1350px",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
};
