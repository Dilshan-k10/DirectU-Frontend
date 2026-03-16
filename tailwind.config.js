/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Here is our custom color palette
      colors: {
        brand: {
          // Dark theme colors for backgrounds and cards
          dark: '#03061A',
          card: '#0A1035',
          border: '#1A2255',
          
          // Light theme colors for cards (like the upload box)
          light: '#EAEAEA',
        },
        primary: {
          // The main blue color used for buttons
          DEFAULT: '#2A528A',
          hover: '#1e3c66', // A slightly darker shade for hover effects
        },
        accent: {
          // The purple color used for highlights and icons
          DEFAULT: '#8C52FF',
          hover: '#7455F6',
        }
      }
    },
  },
  plugins: [],
}