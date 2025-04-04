export default {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./pages/**/*.{js, ts, jsx, tsx, mdx}",
    "./components/**/*. {js, ts, jsx, tsx, mdx}",
    "./app/**/*.{js,ts, jsx, tsx, mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
