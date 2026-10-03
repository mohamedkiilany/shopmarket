import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#1B6392', dark: '#0C548A' },
        accent: '#FA8232',
        ink: '#191C1F',
        muted: '#F2F4F5',
        line: '#E4E7E9',
      },
      fontFamily: {
        sans: ['"Public Sans Variable"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
