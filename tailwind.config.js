module.exports = {
  purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      cursor: {
        grab: 'grab',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['group-focus'],
      borderWidth: ['hover', 'focus'],
    },
  },
  plugins: [],
};
