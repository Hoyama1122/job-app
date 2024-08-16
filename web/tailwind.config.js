export default {
  darkMode: 'class', 
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e0fcff",
          100: "#bef8fd",
          200: "#87eaf2",
          300: "#54d1db",
          400: "#38bec9",
          500: "#2cb1bc",
          600: "#14919b",
          700: "#0e7c86",
          800: "#0a6c74",
          900: "#044e54",
        },
        grey: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        black: "#222",
        white: "#fff",
        red: {
          light: "#f8d7da",
          dark: "#842029",
        },
        green: {
          light: "#d1e7dd",
          dark: "#0f5132",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontWeight: {
        100: 100,
        200: 200,
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800,
        900: 900,
      },
      boxShadow: {
        "custom-1": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "custom-2": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "custom-3": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
