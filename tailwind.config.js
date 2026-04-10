/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#03061A',
          card: '#0A1035',
          border: '#1A2255',
          light: '#EAEAEA',
        },
        primary: {
          DEFAULT: '#2A528A',
          hover: '#1e3c66',
        },
        accent: {
          DEFAULT: '#6124dacc',
          hover: '#826ae4',
        }
      }
    },
  },
  plugins: [],
}