/* eslint-disable no-undef */
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      colors: {
        primaryYellow: "#FFD700", //  (for product cards and highlights).
        primaryGreen: "#2ECC71", // (for interactive elements like table selection).
        primaryRED: "#E74C3C", // (for errors and important notifications).
        primaryPurple: "#9C27B0", // بنفسجي - الخلفيات الجزئية
        primaryBlue: {
          100: "#2776ab",
          900: "#3498DB",
        }, // (for navigation and secondary actions).
        primaryBlack: "#000000", // أسود - خلفية أو نصوص
        primaryText: "#333333",
        primaryBackground: "#F5F5F5", // (main-background)
        primaryBorder: "#CCCCCC",
      },
      fontFamily: {
        mainFont: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
});
/* eslint-enable no-undef */
