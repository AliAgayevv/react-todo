/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: 
      {
        "custom-gold" : "#FFD700",
        "custom-brown" : "#8B4513",
        "custom-slategray" : "#708090",
      },
    },
  },
  plugins: [],
}