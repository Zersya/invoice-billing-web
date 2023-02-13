/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#ea580c",

          "secondary": "#f43f5e",

          "accent": "#2dd4bf",

          "neutral": "#3D4451",

          "base-100": "#FFFFFF",

          "info": "#3ABFF8",

          "success": "#36D399",

          "warning": "#FBBD23",

          "error": "#F87272",

          "--btn-text-case": "uppercase",
        },
      },

      "dark",

      "cupcake",

      "forest"
    ],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
    require('flowbite/plugin')
  ],
  darkMode: 'class',
}
