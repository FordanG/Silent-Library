module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#4188E4",
        secondary: "#F9537F",
        tertiary: "#DEF2FF",
      },

      scale: {
        102: "1.02",
      },
    },
  },
  variants: {
    extend: {
      display: ["hover", "group-hover"],
      scale: ["hover", "group-hover"],
      filter: ["group-hover"],
      height: ["group-hover"],
      brightness: ["group-hover"],
      invert: ["group-hover"],
      margin: ["group-hover", "first", "last"],
      textAlign: ["group-hover"],
      fontSize: ["group-hover"],
      justifyContent: ["hover"],
      alignItems: ["hover"],
      backgroundColor: ["active", "focus"],
      pointerEvents: ["hover"],
      borderWidth: ["responsive", "first", "last", "hover", "focus"],
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
