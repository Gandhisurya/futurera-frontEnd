/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
      backgroundImage: {
        image: "url('../public/assets/blue.jpeg')",
        desktop: "url('../public/assets/DesktopView.jpeg')",
        mobile: "url('../public/assets/MobileView.jpeg')",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
