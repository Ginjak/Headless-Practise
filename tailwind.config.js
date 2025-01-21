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
        "property-txt": {
          50: "#0AD67A",
          100: "#09C36F",
          200: "#08AF64",
          300: "#079C59",
          400: "#06884E",
          500: "#067543",
          600: "#056138",
          700: "#033F24", //Main text
          800: "#033A21",
          900: "#022716",
          950: "#01130B",
          spinner: "#033f240d",
        },
        "property-bg": {
          50: "#fffff",
          100: "#EEF8F2", // Main background light
          200: "#E2F3E9",
          300: "#D4EDDE",
          400: "#C5E7D3",
          500: "#B7E1C8",
          600: "#A8DCBD",
          700: "#9AD6B2",
          800: "#8BD0A7",
          900: "#7DCA9B",
          950: "#6EC490",
        },
        "property-pr": {
          50: "#12CE99",
          100: "#10BC8B",
          200: "#0FA97D",
          300: "#0C8D68", // Main
          400: "#0B8361",
          500: "#0A7153",
          600: "#085E46",
          700: "#074B38",
          800: "#05382A",
          900: "#03261C",
          950: "#02130E",
        },
        "property-sec": {
          50: "#0CC0D4",
          100: "#0BAFC1",
          200: "#0A9DAE",
          300: "#087F8C", // MAIN
          400: "#087A87",
          500: "#076974",
          600: "#065760",
          700: "#04464D",
          800: "#03343A",
          900: "#022327",
          950: "#011113",
        },
        "property-acc": {
          50: "#0AD69C",
          100: "#09BC8A", // MAIN
          200: "#08AF80",
          300: "#079C72",
          400: "#068864",
          500: "#067555",
          600: "#056147",
          700: "#044E39",
          800: "#033A2B",
          900: "#02271C",
          950: "#01130E",
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
