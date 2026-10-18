import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        zaren: {
          black: '#050505',
          charcoal: '#11100E',
          surface: '#191613',
          'gold-champagne': '#C6A46A',
          'gold-highlight': '#E8CC95',
          ivory: '#F4EEE3',
          muted: '#B9AE9D',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        persian: ['Vazirmatn', 'sans-serif'],
        script: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-delay': 'fadeInUp 0.8s ease-out 0.3s forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 20px rgba(198,164,106,0.3))' },
          '50%': { filter: 'drop-shadow(0 0 40px rgba(198,164,106,0.6))' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
