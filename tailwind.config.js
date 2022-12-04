module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'orange-bohr': '#ff622e',
        'violet-bohr': '#5819f1',
        'gray-222': '#222222',
        'black-footer': '#363636',
        'user-table-header-color': '#F5F6FA',
        'user-button-color': '#5819F1',
      },
      textColor: {
        'gray-4a': '#4A4A4A',
        'gray-222': '#222222',
        'orange-bohr': '#ff622e',
        'violet-bohr': '#5819f1',
        'orange-ff7': '#ff7c4d',
        'white-FB': 'rgba(255,255,255,.75)',
      },

      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        '2md': '840px',
      },
      backgroundImage: () => ({
        'hero-home': "url('/images/CABECERA_INTRO.png')",
        'hero-aboutus': "url('/images/INNOVATIVE_COMPANY.jpg')",
        'hero-benefits': "url('/images/CABECERA_BENEFITS.jpg')",
        'hero-customer': "url('/images/CABECERA_CUSTOMER.jpg')",
        'hero-beliefs': "url('/images/CABECERA_BELIEFS.jpg')",
        'hero-solutions': "url('/images/CABECERA_SOLUTIONS.jpg')",
        'flag-france': "url('/images/france.png')",
        'flag-usa': "url('/images/usa.png')",
      }),
      height: {
        '330p': '330px',
        '370p': '370px',
        '410p': '410px',
        '520p': '520px',
        '580p': '580px',
        '680p': '680px',
        '40px': '40px',
      },
      width: {
        '440p': '440px',
        '236p': '236px',
        '47/100': '47%',
        '40px': '40px',
      },
      backgroundPosition: {
        'top-150': 'center top -150px',
        'top-90': 'center top -90px',
        'left--53/100': '53% center',
        'left--53/100-top-41/100': '53% 41%',
      },
      maxWidth: {
        '440p': '440px',
      },
      maxHeight: {
        '520p': '520px',
        '370p': '370px',
        '330p': '330px',
      },
      backgroundSize: {
        '520p': '520p',
      },
      brightness: {
        90: '90%',
      },
      fontWeight: {
        hairline: 100,
        'extra-light': 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        'extra-bold': 800,
      },
      screens: {
        xs: '340px',
        sm: '640px',
        md: '1181px',
        // => @media (min-width: 768px) { ... }
        lg: '1280px',
        xl: '1530px',
      },
      spacing: {
        '32px': '32px',
        '35px': '35px',
        '10px': '10px',
        '5px': '5px',
        '8px': '8px',
        '24px': '24px',
        '16px': '16px',
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        '18px': '18px',
        '14px': '14px',
      },
    },
    variants: {
      extend: {},
    },
    black: 900,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-css-filters'),
    require('tw-elements/dist/plugin'),
  ],
};
