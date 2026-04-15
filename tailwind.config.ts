import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'rgba(148, 163, 184, 0.24)',
        background: '#090e16',
        surface: '#0f172a',
        primary: '#5b72f2',
        muted: '#475569',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(47, 55, 75, 0.22)',
      },
    },
  },
  plugins: [],
};

export default config;
