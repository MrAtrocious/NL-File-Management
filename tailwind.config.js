/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // adjust to your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        sf: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"San Francisco"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        glassWhite: 'rgba(255, 255, 255, 0.15)',
        glassDark: 'rgba(0, 0, 0, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        glass: '1rem',
      },
      borderWidth: {
        glass: '1px',
      },
    },
  },
  plugins: [],
}
