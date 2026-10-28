/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        fitlens: {
          dark: '#0B0F19',
          card: '#111827',
          border: '#1F2937',
          muted: '#9CA3AF',
          cyan: '#00F0FF',
          'cyan-dark': '#0891B2',
          lime: '#10B981',
          danger: '#EF4444',
          warning: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

