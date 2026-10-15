/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dashboard-dark': 'var(--bg-page)',
        'card-bg': 'var(--bg-kpi)',
        'table-header': 'var(--thead)',
        'brand-green': '#22C55E',
        'brand-red': '#EF4444',
        'brand-amber': '#FACC15',
        'brand-blue': '#3B82F6',
        'border-stroke': 'var(--border-stroke)',
        'neon-cyan': 'rgb(var(--fin-accent-rgb) / <alpha-value>)',
        'neon-blue': 'rgb(var(--fin-accent2-rgb) / <alpha-value>)',
        'card-dark': 'rgb(var(--card-dark-rgb) / <alpha-value>)',
        'status-green': '#22c55e',
        'status-amber': '#f59e0b',
        'status-red': '#ef4444',
        'text-cyan': '#06b6d4',
        'text-lime': '#a3e635',
        'text-emerald': '#10b981',
        'text-slate': '#94a3b8',
      },
      fontSize: {
        'xxs': '0.65rem',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(168, 85, 247, 0.18)',
        'glow-green': '0 0 15px rgba(34, 197, 94, 0.2)',
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.2)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(168, 85, 247, 0.18)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 30px rgba(168, 85, 247, 0.28)' },
        },
      },
    },
  },
  plugins: [],
}
