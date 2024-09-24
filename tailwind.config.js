/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
    theme: {
      extend: {
        colors: {
          'background-grey': '#dddddd',
          'electric-yellow': '#fff449',
          'plant-green': '#87ff7c',
          'fire-red': '#ff6868',
          'water-blue': '#76cde0'
        },
      },
    },
    plugins: [],
    corePlugins: { preflight: false }
  }