const plugin = require('tailwindcss');
const {fontFamily} = require("tailwindcss/defaultTheme")

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
          'main-light': 'var(--fdfp-main-color-light)',
          second: 'var(--fdfp-second-color)',
          bg: 'var(--fdfp-bg-color)',
          bgsecond: 'var(--fdfp-bg-color-second)',
          text: 'var(--fdfb-text-color)',
          textsecond: 'var(--fdfb-text-second-color)',
          light: 'var(--fdfp-light-color)'
        }
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        monospace: ["Work sans", ...fontFamily.mono],
        serif: 'var(--ff-serif)'
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('not-last-child', '&:not(:last-child)');
    })
  ],
};