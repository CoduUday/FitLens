/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        fitlens: {
          dark: '#080C14',     // Ultra clean deep matte dark
          card: '#0F1523',     // Clean secondary card layer
          surface: '#151C2E',  // Elevated surface
          border: '#1E273D',   // Minimal border
          muted: '#8A99AD',    // Subdued secondary text
          dim: '#4B5565',      // Tertiary labels
          accent: '#00E5FF',   // Focused single sharp cyan accent
          'accent-dim': 'rgba(0, 229, 255, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
