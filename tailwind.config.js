/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.js", "./src/**/*.jsx", "./public/index.html"],
  theme: {
    extend: {
      transitionProperty: {
        colors: "color",
      },
    },
  },
  plugins: [],
};
