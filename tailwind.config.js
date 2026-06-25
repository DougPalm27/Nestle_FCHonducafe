/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracota: {
          DEFAULT: '#C0392B',
          light: '#E74C3C',
          dark: '#A93226',
        },
        crema: {
          DEFAULT: '#F2EDE4',
          dark: '#E8DFD0',
        },
        cafe: {
          DEFAULT: '#3E2723',
          medium: '#5D4037',
          light: '#795548',
        },
        verde: {
          joven: '#2E7D32',
          lima: '#8BC34A',
          bosque: '#1B5E20',
        },
        azul: {
          DEFAULT: '#1565C0',
          light: '#1976D2',
          dark: '#0D47A1',
        },
        naranja: {
          yoro: '#E65100',
          light: '#F57C00',
        },
        dorado: {
          DEFAULT: '#F57F17',
          light: '#FFB300',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 8s ease-in-out infinite',
        'blob-slow': 'blob 12s ease-in-out infinite',
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'gradient-shift': 'gradientShift 14s ease infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 40% 30% 60% 50%' },
          '75%': { borderRadius: '40% 60% 60% 30% / 60% 40% 50% 40%' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1.0) translate(0%, 0%)' },
          '100%': { transform: 'scale(1.15) translate(-2%, -2%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
