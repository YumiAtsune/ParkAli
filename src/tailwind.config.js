/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#1a202e',
          950: '#0f1419'
        }
      }
    },
  },
  plugins: [],
}