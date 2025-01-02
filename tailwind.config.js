/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          ligth: "#4C4A4A",
          DEFAULT: "#1E1E1E",
          dark: "#FFF8F0",
        },
        secondary: {
          ligther: "#9ff1da",
          ligth: "#0fdba2",
          DEFAULT: "#09BC8A",
          dark: "#03291e",
        },
        white: {
          DEFAULT: "#ffffff",
          dark: "#d1d5db",
        },
        mainTxt: {
          ligther: "#828181",
          ligth: "#4C4A4A",
          DEFAULT: "#1E1E1E",
          dark: "#F3FFFA",
        },
        mainBg: {
          ligther: "#12FFBC",
          ligth: "#0CDDA2",
          DEFAULT: "#09BC8A ",
          dark: "#06533D",
        },
      },
      fontFamily: {
        heading: ["Bebas Neue", "sans-serif"],
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
