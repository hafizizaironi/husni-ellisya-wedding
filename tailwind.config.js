/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'script': ['Dancing Script', 'cursive'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '1' }],
        '11xl': ['12rem', { lineHeight: '1' }],
        '12xl': ['14rem', { lineHeight: '1' }],
      },
      colors: {
        warm: {
          50: '#FAF7F3',   // Lightest - your first color
          100: '#F0E4D3',  // Light - your second color
          200: '#DCC5B2',  // Medium - your third color
          300: '#D9A299',  // Dark - your fourth color
          400: '#C8918A',  // Darker variation
          500: '#B7807B',  // Darkest variation
        },
        cream: {
          50: '#FAF7F3',
          100: '#F0E4D3',
          200: '#DCC5B2',
          300: '#D9A299',
          400: '#C8918A',
          500: '#B7807B',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}