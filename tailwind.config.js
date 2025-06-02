/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,jsx,ts,tsx}"],

  theme: {
    extend: {
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(-200%)", opacity: "0" },
        },
      },
      animation: {
        floatUp: "floatUp 3s linear infinite",
      },
    },
  },
  plugins: [],
};
