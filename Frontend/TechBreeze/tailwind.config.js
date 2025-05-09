import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e6f3ff",
          100: "#cce7ff",
          200: "#99cfff",
          300: "#66b7ff",
          400: "#339fff",
          500: "#0095F6",
          600: "#007acc",
          700: "#005c99",
          800: "#003d66",
          900: "#001f33",
        },
        secondary: {
          50: "#e0fcff",
          100: "#c1f8fd",
          200: "#94f1fa",
          300: "#67e9f6",
          400: "#3ae2f3",
          500: "#06B6D4",
          600: "#0592aa",
          700: "#046d80",
          800: "#024955",
          900: "#01242b",
        },
        accent: {
          50: "#fff3e6",
          100: "#ffe7cc",
          200: "#ffcf99",
          300: "#ffb766",
          400: "#ff9f33",
          500: "#F97316",
          600: "#cc5c12",
          700: "#99450d",
          800: "#662e09",
          900: "#331704",
        },
        success: {
          50: "#e6fbf0",
          100: "#ccf8e1",
          200: "#99f0c3",
          300: "#66e9a5",
          400: "#33e187",
          500: "#10B981",
          600: "#0d9468",
          700: "#0a6f4e",
          800: "#064a34",
          900: "#03251a",
        },
        warning: {
          50: "#fef8e6",
          100: "#fef1cc",
          200: "#fde399",
          300: "#fcd566",
          400: "#fbc733",
          500: "#FBBF24",
          600: "#c9991d",
          700: "#977316",
          800: "#644c0e",
          900: "#322607",
        },
        error: {
          50: "#fde9e9",
          100: "#fcd3d3",
          200: "#f9a7a7",
          300: "#f67b7b",
          400: "#f34f4f",
          500: "#EF4444",
          600: "#bf3636",
          700: "#8f2929",
          800: "#601b1b",
          900: "#300e0e",
        },
      },
      spacing: {
        1: "8px",
        2: "16px",
        3: "24px",
        4: "32px",
        5: "40px",
        6: "48px",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
