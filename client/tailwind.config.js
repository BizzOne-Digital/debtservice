/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a1628',
          800: '#0d1f3c',
          700: '#142850',
          600: '#1a3461',
        },
        crimson: {
          600: '#c0392b',
          500: '#e74c3c',
          400: '#ec6b5a',
        },
        gold: '#f0a500',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
