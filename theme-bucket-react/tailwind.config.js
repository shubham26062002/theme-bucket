/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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

