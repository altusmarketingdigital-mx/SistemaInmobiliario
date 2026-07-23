/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        disponible: '#22C55E',
        apartado: '#EAB308',
        vendido: '#EF4444',
        bloqueado: '#6B7280'
      }
    },
  },
  plugins: [],
}
