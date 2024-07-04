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
          'theme-bg': 'var(--tg-theme-bg, #212121)',
          'theme-button': 'var(--tg-theme-button, #8774e1)',
          'theme-button-text': 'var(--tg-theme-button-text, #ffffff)',
          'theme-hint': 'var(--tg-theme-hint, #aaaaaa)',
          'theme-link': 'var(--tg-theme-link, #8774e1)',
          'theme-secondary-bg': 'var(--tg-theme-secondary-bg, #181818)',
          'theme-text': 'var(--tg-theme-text, #ffffff)',
          'theme-header-bg': 'var(--tg-theme-header-bg, #212121)',
          'theme-accent-text': 'var(--tg-theme-accent-text, #8774e1)',
          'theme-section-bg': 'var(--tg-theme-section-bg, #212121)',
          'theme-section-header-text': 'var(--tg-theme-section-header-text, #8774e1)',
          'theme-subtitle-text': 'var(--tg-theme-subtitle-text, #aaaaaa)',
          'theme-destructive-text': 'var(--tg-theme-destructive-text, #ff595a)',
          main: 'var(--tg-theme-main, #8774e1)',
          maino: 'var(--tg-theme-maino, #8774e120)',
          text: 'var(--tg-theme-text, #ffffff)',
          bg: 'var(--tg-theme-bg, #212121)',
        },
      },
    },
  },
  plugins: [nextui()],
};

export default config;
