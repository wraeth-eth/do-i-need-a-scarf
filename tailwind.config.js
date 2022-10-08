/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*{html,tsx}'],
  theme: {
    extend: {
      transitionTimingFunction: {
        scarf: 'cubic-bezier(0, 0, 0.09, 0.96)',
      },
      fontFamily: {
        roboto: ['Roboto'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
