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
      colors: {
        tg: {
          'theme-bg': 'var(--tg-theme-bg-color, #212121)',
          'theme-button': 'var(--tg-theme-button-color, #8774e1)',
          'theme-button-text': 'var(--tg-theme-button-text-color, #ffffff)',
          'theme-hint': 'var(--tg-theme-hint-color, #aaaaaa)',
          'theme-link': 'var(--tg-theme-link, #8774e1)',
          'theme-secondary-bg': 'var(--tg-theme-secondary-bg-color, #181818)',
          'theme-text': 'var(--tg-theme-text-color, #ffffff)',
          'theme-header-bg': 'var(--tg-theme-header-bg, #212121)',
          'theme-accent-text': 'var(--tg-theme-accent-text, #8774e1)',
          'theme-section-bg': 'var(--tg-theme-section-bg, #212121)',
          'theme-section-header-text': 'var(--tg-theme-section-header-text, #8774e1)',
          'theme-subtitle-text': 'var(--tg-theme-subtitle-text, #aaaaaa)',
          'theme-destructive-text': 'var(--tg-theme-destructive-text, #ff595a)',
          main: 'var(--tg-theme-main, #8774e1)',
          maino: 'var(--tg-theme-maino, #8774e120)',
          text: 'var(--tg-theme-text-color, #ffffff)',
          bg: 'var(--tg-theme-bg-color, #212121)',
        },
      },
    },
  },
  plugins: [nextui()],
};

export default config;
