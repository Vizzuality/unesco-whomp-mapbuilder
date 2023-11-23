const colors = require('tailwindcss/colors');

/** @type import('tailwindcss').Config */
module.exports = {
  darkMode: 'media',
  content: ['./dist/*.html', './src/js/**/*.{ts,tsx}'],
  theme: {
    extend: {
      sans: ['Inter', 'sans-serif'],
    },
    colors: {
      white: colors.white,
      primary: 'hsla(206, 100%, 42%, 1)',
      warn: 'hsla(47, 100%, 49%, 1)',
      gray: {
        dark: 'hsla(206, 100%, 15%, 1)',
        light: 'hsla(207, 18%, 49%, 1)',
      },
    },
  },
  variants: {},
  plugins: [],
};
