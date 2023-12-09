const colors = require('tailwindcss/colors');

/** @type import('tailwindcss').Config */
module.exports = {
  darkMode: 'media',
  content: ['./dist/*.html', './src/js/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Avenir Next', 'Inter', 'sans-serif'],
      },
    },
    colors: {
      transparent: 'transparent',
      white: colors.white,
      black: colors.black,
      red: colors.red,
      primary: 'hsla(206, 100%, 42%, 1)',
      secondary: 'hsla(206, 100%, 33%, 1)',
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
