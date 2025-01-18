import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#212121", // Dark background
        primary: "#8083ff", // Vibrant periwinkle blue
        secondary: "#373544", // Deep muted gray
        tertiary: "#d3fbd8", // Soft mint green
        accent: "#8083ff", // Accent color (same as primary for consistency)
      },
    },
  },
  plugins: [],
} satisfies Config;
