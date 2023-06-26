/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "poppins": ["Poppins", "sans-serif"],
        "space-grotesk": ["Space Grotesk", "sans-serif"],
      },
      screens: {
        "mobile": "360px",
        "desktop": "1180px",
      },
      colors: {
        "black-2": "#232323",
        "brown": "#504538",
        "yellow-ochre": "#E8AA3D",
        "gray-lightest": "#FAFBFD",
      }
    },
  },
  plugins: [],
}

