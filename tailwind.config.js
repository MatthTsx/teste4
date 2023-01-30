/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cor1:"#E9C46A",
        cor2:"#1F2041",
        Cor3:"#2A9D8F",
        cor4:"#F4A261",
        cor5:"#E76F51",
      }
    },
  },
  plugins: [],
}
