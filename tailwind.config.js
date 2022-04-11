module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#4188E4",
        secondary: "#F9537F",
        tertiary: "#DEF2FF",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
