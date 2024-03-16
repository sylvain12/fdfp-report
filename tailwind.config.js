const plugin = require('tailwindcss');

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'fdfp': {
          main: 'var(--fdfp-main-color)',
          bg: 'var(--fdfp-bg-color)',
          text: 'var(--fdfb-text-color)'
        }
      }
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('not-last-child', '&:not(:last-child)');
    })
  ],
};