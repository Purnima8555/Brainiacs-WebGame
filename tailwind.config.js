/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Pixelify Sans"', 'cursive'],
        sans: ['"Work Sans"', 'sans-serif'],
      },
    }
  },
  plugins: []
};