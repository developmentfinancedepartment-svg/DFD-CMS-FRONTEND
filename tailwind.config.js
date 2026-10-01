/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#e6f5f6',
          100: '#ccebed',
          200: '#99d7db',
          300: '#66c3c9',
          400: '#33afb7',
          500: '#00B4C5',
          600: '#008E9B',
          700: '#08767d',
          800: '#084D52',
          900: '#063b3f',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(130deg, #084D52, #008E9B)',
        'login-wallpaper': "url('/loginWallpaper.jpg')",
        'home-wallpaper': "url('/homeWallpaper.jpg')" ,
      }
    },
  },
  // plugins: [
  //   require('flowbite/plugin'),
  //   require('tailwindcss-animated'),
  // ],
}
