module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Ubunto Mono", "monospace"],
        mulish: ["Mulish", "sans-serif"],
        noto: ["Noto Sans", "sans-serif"],
      },
      borderStyle: ["hover"],
    },
  },
  plugins: [],
};
