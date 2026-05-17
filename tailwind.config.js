/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dashboard-dark': '#0B1426',
        'card-bg': '#121B35',
        'table-header': '#1A2A4D',
        'brand-green': '#22C55E',
        'brand-red': '#EF4444',
        'brand-amber': '#FACC15',
        'brand-blue': '#3B82F6',
        'border-stroke': '#1e293b',
      },
      fontSize: {
        'xxs': '0.65rem',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
