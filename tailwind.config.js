/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*{html,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
