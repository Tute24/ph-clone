import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        orange1: "#FF5C5C",
        orange2: "#FF776B",
        orangeText: "#FF6154",
        vibrantBlue: "#627089",
        darkerOrange: "#E65100",
        alternativeRed: "#FFCCCB"
      },
    },
  },
  plugins: [],
} satisfies Config;
