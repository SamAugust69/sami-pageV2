/** @type {import('tailwindcss').Config} */
const { colors } = require("tailwindcss/colors")
const { fontFamily } = require("tailwindcss/defaultTheme")
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans]
      },
      colors: {
        ...colors,
        "slate-910": "#101a2e",
        "slate-310": "#c8d1db",
        "slate-350": "#BEC9D5",
        "slate-850": "#202D40"
      },
      height: {
        "112": "25rem",
        '128': '32rem',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
