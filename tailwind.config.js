/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontSize: {
      xs: "0.6rem",
      sm: "0.8rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.875rem",
      "3xl": "2.25rem",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-mon)"],
      },
    },
  },
  plugins: [],
};
