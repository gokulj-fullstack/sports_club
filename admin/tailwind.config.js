/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Brand accent — shared between light + dark themes (gold palette).
        brand: {
          50: '#faf8eb',
          100: '#f3ecc9',
          200: '#e8d998',
          300: '#dcbe62',
          400: '#cda137',
          500: '#c9a84c', // Primary gold
          600: '#b3913a',
          700: '#927228',
          800: '#71551a',
          900: '#503a0f',
        },
        // Light theme surfaces — clean white/blue.
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f5f8fd',
          muted: '#eef2f9',
        },
        // Dark theme surfaces — premium dark gray/black matching the frontend.
        night: {
          bg: '#050505',
          surface: '#0f0f0f',
          elevated: '#161616',
          border: '#221d10',
        },
        success: '#16a34a',
        warning: '#d97706',
        danger: '#dc2626',
        info: '#0891b2',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.06)',
        'card-dark': '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
        glow: '0 0 0 1px rgb(201 168 76 / 0.15), 0 8px 24px -4px rgb(201 168 76 / 0.25)',
      },
      keyframes: {
        'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
        'slide-up': { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-up': 'slide-up 0.25s ease-out',
      },
    },
  },
  plugins: [],
};
