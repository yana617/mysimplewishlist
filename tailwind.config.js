/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-grey": "var(--dark-grey)",
        "light-grey": "var(--light-grey)",
        "dark-green": "var(--dark-green)",
        "grey-black": "var(--grey-black)",
        "blue": "var(--blue)",
        "checkbox-green": "var(--checkbox-green)",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
