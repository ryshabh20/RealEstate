/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var"],
      },
      colors: {
        "light-gray": "#A3A3A3",
        gray: "#575756",
        "dark-gray": "#222220",
        white: "#FFFFFF",
        "orange-gradient": "#FA6E29",
        dark: "#1A1A19",
        red: "#DB4437",
        ggreen: "#0F9D58",
        blue: "#4285F4",
      },
    },
  },
  plugins: [],
};
