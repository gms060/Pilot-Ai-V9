/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      spacing: {
        'xs': '0.25rem',  /* 4px */
        'sm': '0.5rem',   /* 8px */
        'md': '1rem',     /* 16px */
        'lg': '1.5rem',   /* 24px */
        'xl': '2rem',     /* 32px */
        'xxl': '3rem',    /* 48px */
      },
      fontSize: {
        'h1': 'clamp(1.4rem, 3.5vw, 2.1rem)',      // 30% reduction from original
        'h2': 'clamp(1.05rem, 2.8vw, 1.4rem)',     // 30% reduction from original
        'h3': 'clamp(0.875rem, 2.1vw, 1.225rem)',  // 30% reduction from original
        'base': 'clamp(0.7rem, 1.4vw, 0.7875rem)', // 30% reduction from original
        'welcome': 'clamp(0.84rem, 2.1vw, 1.26rem)',  // 30% reduction from welcome
        'tagline': 'clamp(0.525rem, 1.26vw, 0.735rem)', // 30% reduction from tagline
      },
      lineHeight: {
        'h1': '1.2',
        'h2': '1.3',
        'h3': '1.4',
        'base': '1.6',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ],
};