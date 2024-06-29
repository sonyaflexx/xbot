import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        tg: {
          'theme-bg': '#212121',
          'theme-button': '#8774e1',
          'theme-button-text': '#ffffff',
          'theme-hint': '#aaaaaa',
          'theme-link': '#8774e1',
          'theme-secondary-bg': '#181818',
          'theme-text': '#ffffff',
          'theme-header-bg': '#212121',
          'theme-accent-text': '#8774e1',
          'theme-section-bg': '#212121',
          'theme-section-header-text': '#8774e1',
          'theme-subtitle-text': '#aaaaaa',
          'theme-destructive-text': '#ff595a',
          main: '#8774e1',
          maino: '#8774e120',
          text: '#ffffff',
          bg: '#212121',
        },
      },
    },
  },
  plugins: [nextui()],
};
export default config;
