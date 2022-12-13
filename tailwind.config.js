module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "orange-bohr": "#ff622e",
        "violet-bohr": "#5819f1",
        "violet-bohr-bis": "#350F91",
        "violet-bohr-dark": "#280972",
        "violet-bohr-obs":"#280B6F",
        "violet-bohr-claire": "#492394",
        "violet-menu": "#260570",
        "gray-222": "#222222",
        "black-footer": "#363636",
        "gray-bg": "#F5F6FA",
        "gray-6f": "#6F729C",
      },
      textColor: {
        "gray-4a": "#4A4A4A",
        "gray-222": "#222222",
        "gray-6f": "#6F729C",
        "orange-bohr": "#ff622e",
        "violet-bohr": "#5819f1",
        "violet-bohr-bis": "#350F91",
        "violet-bohr-dark": "#280972",
        "orange-bohr": "#ff7c4d",
        "white-FB": "rgba(255,255,255,.75)",
        "dark-grey": "#1E293B"
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Campton: ["Campton", "sans-serif"],
        CamptonBold: ["CamptonBold", "sans-serif"],
        CamptonThin: ["CamptonThin", "sans-serif"],
      },
      screens: {
        "2md": "840px",
      },
      backgroundImage: () => ({
        "hero-home": "url('/images/CABECERA_INTRO.png')",
        "hero-aboutus": "url('/images/INNOVATIVE_COMPANY.jpg')",
        "hero-benefits": "url('/images/Hero-Technologie.png')",
        "hero-customer": "url('/images/Hero-Contactez-nous.png')",
        "hero-beliefs": "url('/images/Hero-Qui-sommes-nous.png')",
        "hero-solutions": "url('/images/CABECERA_SOLUTIONS.jpg')",
        "hero-banner": "url('/images/Banner.png')",
        "flag-france": "url('/images/france.png')",
        "flag-usa": "url('/images/usa.png')",
      }),
      height: {
        "330p": "330px",
        "370p": "370px",
        "410p": "410px",
        "520p": "520px",
        "580p": "580px",
        "680p": "680px",
      },
      width: {
        "440p": "440px",
        "47/100": "47%",
      },
      backgroundPosition: {
        "top-150": "center top -150px",
        "top-90": "center top -90px",
        "left--53/100": "53% center",
        "left--53/100-top-41/100": "53% 41%",
      },
      maxWidth: {
        "440p": "440px",
      },
      maxHeight: {
        "520p": "520px",
        "370p": "370px",
        "330p": "330px",
      },
      backgroundSize: {
        "520p": "520p",
      },
      brightness: {
        90: "90%",
      },
    },
    screens: {
      
      'xs': '340px',
      'sm': '640px',
      'md': '1181px',
      // => @media (min-width: 768px) { ... }
      'lg': '1280px',
      'xl': '1530px',
     
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-css-filters"),
    require('tw-elements/dist/plugin'),
  ],
}
