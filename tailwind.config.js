
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js"
  ],
  mode: 'jit',
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'opacity': 'opacity',
        'display': 'display',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'background-input': 'var(--background-input)',
        edge: 'var(--edge)',
        text: 'var(--text)',
        'text-inverted': 'var(--text-inverted)',
        'text-rgba': 'rgb(var(--text-rgb) / <alpha-value>)',
        'text-inverted-rgba': 'rgb(var(--text-inverted-rgb) / <alpha-value>)',
        'text-muted': 'var(--text-muted)',
        accent: 'var(--accent)',


        'dark-black': '#141414',
        black: '#222222',

        'dark-blue': '#16697b',
        blue: '#4ba0b6',
        'light-blue': '#82c0cb',

        'dark-gray': '#44433b',
        'gray': '#5c6464',
        'light-gray': '#81857d',

        yellow: '#ffa62b',

        'dark-green': '#105551'

      },
      backgroundImage: ( theme) => ({
        // 'gradient-rainbow': 'linear-gradient(81.66deg, #00B5EE 7.21%, #FF45A4 45.05%, #FFBA00 78.07%)',
        // 'gradient-rainblue': 'linear-gradient(90deg, #24cbff 14.53%, #fc59ff 69.36%, #FFBD0C 117.73%)'
      }),
      fontFamily: {
        opensans: ['Open Sans', 'sans-serif'],
      },
    },
    screens: {
      xs: '480px',
      sm: '768px',
      md: '1060px',
    }
  },
  plugins: [],
}

// tailwind cli build command: npx tailwindcss -i ./src/index.css -o ./public/output.css --watch