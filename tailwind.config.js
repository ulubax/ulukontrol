/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./js/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kokpit: {
          bg: '#0F172A',
          card: '#1E293B',
          border: '#334155',
          blue: '#3B82F6',
          amber: '#F59E0B',
          emerald: '#10B981',
          rose: '#EF4444'
        }
      }
    },
  },
  plugins: [],
}
