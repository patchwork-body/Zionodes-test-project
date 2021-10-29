module.exports = {
  purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto/1fr': 'auto 1fr',
      },

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
