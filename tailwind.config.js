/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    screens: {
      'ph': '431px',
      'tb': '1291px'
    },
    extend: {
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'montserratAlternates': ['Montserrat Alternates', 'sans-serif'],
        'robotoFlex': ['Roboto Flex', {
          fontVariationSettings: '"wdth" 251, "GRAD" 150, "slnt" 0, "XTRA" 468, "XOPQ" 96, "YOPQ" 79, "YTLC" 514, "YTUC" 712, "YTAS" 750, "YTDE" -203, "YTFI" 738'}
        ],
      },
      colors: {
        'primary': '#315D9E',
        'green': '#187721',
        'red': '#D62828',
        'white': '#F5F5F5',
        'black': '#1E1E1E'
      },
      padding: {
        'btnS': "10px 32px",
        'btnX': "15px 32px"
      }
    },
  },
  plugins: [],
}

