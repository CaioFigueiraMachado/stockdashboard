/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable class-based dark mode
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(220, 90%, 55%)',
        secondary: 'hsl(340, 80%, 60%)',
        accent: 'hsl(45, 90%, 55%)',
      },
    },
  },
  plugins: [],
};
