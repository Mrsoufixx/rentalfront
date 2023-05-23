/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      'ldark': '#222831',
      'lgrey': '#393E46',
      'lteal': '#00ADB5',
      'lwhite': '#EEEEEE',
      }
    },
    extend: {},
  },
  plugins: [],
}

