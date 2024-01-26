/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'card-background': '#424769',
        'custom-text-color': '#E9B26E'
      }
    }
  },
  plugins: [],
}