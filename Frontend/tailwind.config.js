/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily : {
      secondaryFont : ["Mukta" , "sans-serif"],
      ThirdFont : ["Cabin", "sans-serif"],
      UbantuFont : ["Ubuntu", "sans-serif"],
      RobotoFont : ["Roboto", "sans-serif"],
    }
  },
  plugins: [],
}