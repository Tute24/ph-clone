import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        orange1: "#FF5C5C",
        orange2: "#FF776B",
        orangeText: "#FF6154",
        vibrantBlue: "#627089",
        darkerOrange: "#E65100"
      },
    },
  },
  plugins: [],
} satisfies Config;
