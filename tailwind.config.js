/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette sampled from the Power Cranes letterhead:
        // deep navy (wordmark) and crane orange.
        navy: {
          50: '#F2F5FB',
          100: '#E4EAF5',
          200: '#C9D4EA',
          300: '#9DB0D6',
          400: '#6683BA',
          500: '#3C5E9E',
          600: '#274A86',
          700: '#173768',
          800: '#0C2552',
          900: '#08183C',
          950: '#040D25',
        },
        brand: {
          50: '#FFF6E8',
          100: '#FFE8C7',
          200: '#FFD08A',
          300: '#FFB44D',
          400: '#FBA026',
          500: '#F89008',
          600: '#DB7500',
          700: '#B25A04',
          800: '#8C470A',
          900: '#733B0C',
        },
        paper: '#F4F6FA',
      },
      fontFamily: {
        sans: ['Barlow', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Barlow Condensed"', 'Barlow', 'system-ui', 'sans-serif'],
        // Latin brand wordmark: never swapped for the Arabic font.
        brand: ['"Barlow Condensed"', 'Barlow', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 0 rgba(8,24,60,.04), 0 14px 34px -18px rgba(8,24,60,.28)',
      },
    },
  },
  plugins: [],
};
