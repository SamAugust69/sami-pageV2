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
			colors: {
				...colors,
				g: {
					100: '#615757',
					200: '#494040',
				},
				r: {
					100: '#C3464A',
					200: '#BA3C41',
					300: '#AC383C',
					400: '#9D3337',
					500: '#812A2D',
					600: '#722528',
					700: '#642023',
					800: '#561C1E',
					900: '#481719',
				},
				t: {
					100: '#C9B08E',
					200: '#C0A47D',
					300: '#B8996C',
					400: '#B18D5C',
					500: '#A5814F',
					600: '#947447',
					700: '#84673F',
					800: '#735A38',
					900: '#B8996C',

				},
				b: {
					100: '#3A2C27',
				},
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
