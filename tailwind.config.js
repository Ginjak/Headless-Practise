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
          ligther: "#eef8f2",
          ligth: "#0CDDA2",
          DEFAULT: "#09BC8A",
          dark: "#0C8D68",
        },
      },
      fontFamily: {
        heading: ["Bebas Neue", "sans-serif"],
      },
      boxShadow: {
        small: "0 0px 10px rgba(0, 0, 0, 0.2)",
        medium: "0 0px 25px rgba(0, 0, 0, 0.5)",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
