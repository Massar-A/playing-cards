/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
    theme: {
      extend: {
        colors: {
          'background-grey': '#dddddd',
          'electric-yellow': '#fff449'
        },
      },
    },
    plugins: [],
  }