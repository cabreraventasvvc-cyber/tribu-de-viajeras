import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tribu: {
          50: '#fdf7f4',
          100: '#fbece7',
          200: '#f8d9cf',
          300: '#f1bdae',
          400: '#e59580',
          500: '#d77054', // Terracotta principal femenino y elegante
          600: '#c55539',
          700: '#a5432c',
          800: '#873927',
          900: '#703325',
          950: '#3c1810',
        },
        sand: {
          50: '#faf8f5',
          100: '#f4efe8',
          200: '#ebe1d4',
          300: '#ddccb8',
          400: '#caa890',
          500: '#b89475',
          600: '#a78063',
          700: '#8a6850',
          800: '#715443',
          900: '#5c4638',
        },
        champagne: {
          50: '#fcfaf6',
          100: '#f7f2e8',
          200: '#ede0ca',
          300: '#dec49f',
          400: '#cca573',
          500: '#be8c53',
          600: '#ab7445',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      screens: {
        'xs': '375px',
      }
    },
  },
  plugins: [],
};
export default config;
