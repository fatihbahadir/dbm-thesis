/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'nunito': ['nunito', 'sans-serif'],
    },
    extend: {
      colors: {
        main: '#6777EE',
        mainHover: '#384DE9',
        grayUpdated: '#6C757D'
      }
    },
  },
  plugins: [],
}