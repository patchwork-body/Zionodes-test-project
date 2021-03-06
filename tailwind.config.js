module.exports = {
  purge: ['./src/components/**/*.{ts,tsx}', './src/pages/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto/1fr': 'auto 1fr',
        '1fr/auto': '1fr auto',
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
