/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C90BBC",
          light: "#E5A6E6",
        },
        Accent: {
          DEFAULT: "#00C0D9",
        },
        Highlight: {
          DEFAULT: "#FFCA28",
        },
        white: {
          DEFAULT: "#FEF9FE",
        },
        Black: {
          DEFAULT: "#080609",
        },
        Gray: {
          DEFAULT: "#080609",
        },
        success: {
          DEFAULT: "#0C7040",
          // light: "#22c55e",
        },
        error: {
          DEFAULT: "#C72C41",
          // light: "#f87171",
        },
        warning: {
          DEFAULT: "#FC8621",
          // light: "#fbbf24",
        },
        info: {
          DEFAULT: "#0ea5e9",
          // light: "#38bdf8",
        },
      },
      borderRadius: {
        xl: "12px",
      },
      fontFamily: {
        byekan: ["BYekan", "sans-serif"],
      },
    },
  },
  plugins: [],
};
