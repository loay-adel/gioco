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
        primaryYellow: "#F4B400", // أصفر - الأزرار الرئيسية
        primaryPink: "#E91E63", // وردي - التفاعل
        primaryPurple: "#9C27B0", // بنفسجي - الخلفيات الجزئية
        primaryBlue: "#00B8D4", // أزرق تركواز - البطاقات
        primaryBlack: "#000000", // أسود - خلفية أو نصوص
        primaryWhite: "#FFFFFF", // أبيض للنصوص على خلفية غامقة
      },
      fontFamily: {
        mainFont: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
});
/* eslint-enable no-undef */
