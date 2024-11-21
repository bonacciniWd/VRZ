/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#030311",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        card: "#001f3f",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        "azul-vr" : "#0c0A4b",
        "verde-vr" : "#27BA7D",
        "pink-vr" : "#c836a3",
        "gray-vr" : "#35475c",

      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.jpg')",
      },
      
    },
  },
  plugins: [],
};


// #001f3f, #0074b9, #00a8cc, #56ccf2,