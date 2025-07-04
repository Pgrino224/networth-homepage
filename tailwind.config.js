/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        networth: {
          black: '#000000',
          white: '#FFFFFF',
          navy: '#0B1929',
          purple: '#6B46C1',
          gold: '#FDB462',
          orange: '#FF8C42',
          // Additional shades for more flexibility
          'purple-light': '#8B6DD1',
          'purple-dark': '#5234A3',
          'navy-light': '#132640',
          'navy-dark': '#060D15',
          'gold-light': '#FDCB8C',
          'gold-dark': '#E09D4F',
          'orange-light': '#FF9F66',
          'orange-dark': '#E67A3C',
        }
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      fontSize: {
        // Fluid typography sizes
        'xs-fluid': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'sm-fluid': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'base-fluid': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'lg-fluid': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'xl-fluid': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        '2xl-fluid': 'clamp(1.5rem, 1.3rem + 1vw, 1.875rem)',
        '3xl-fluid': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)',
        '4xl-fluid': 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)',
        '5xl-fluid': 'clamp(3rem, 2.5rem + 2.5vw, 3.75rem)',
        '6xl-fluid': 'clamp(3.75rem, 3rem + 3.75vw, 4.5rem)',
        '7xl-fluid': 'clamp(4.5rem, 3.5rem + 5vw, 6rem)',
        '8xl-fluid': 'clamp(6rem, 4rem + 10vw, 8rem)',
        '9xl-fluid': 'clamp(8rem, 5rem + 15vw, 10rem)',
      },
      spacing: {
        // Fluid spacing
        'xs-fluid': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
        'sm-fluid': 'clamp(1rem, 0.8rem + 1vw, 1.5rem)',
        'md-fluid': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',
        'lg-fluid': 'clamp(2rem, 1.6rem + 2vw, 3rem)',
        'xl-fluid': 'clamp(3rem, 2.4rem + 3vw, 4rem)',
        '2xl-fluid': 'clamp(4rem, 3.2rem + 4vw, 6rem)',
        '3xl-fluid': 'clamp(6rem, 4.8rem + 6vw, 8rem)',
      },
      backgroundImage: {
        // Custom gradients
        'gradient-primary': 'linear-gradient(135deg, #6B46C1 0%, #0B1929 100%)',
        'gradient-accent': 'linear-gradient(135deg, #FDB462 0%, #FF8C42 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0B1929 0%, #000000 100%)',
        'gradient-radial-purple': 'radial-gradient(circle at 50% 50%, #6B46C1 0%, transparent 70%)',
        'gradient-radial-gold': 'radial-gradient(circle at 50% 50%, #FDB462 0%, transparent 70%)',
        'gradient-mesh': `
          radial-gradient(at 40% 20%, #6B46C1 0px, transparent 50%),
          radial-gradient(at 80% 0%, #FDB462 0px, transparent 50%),
          radial-gradient(at 0% 50%, #0B1929 0px, transparent 50%),
          radial-gradient(at 80% 50%, #FF8C42 0px, transparent 50%),
          radial-gradient(at 0% 100%, #6B46C1 0px, transparent 50%)
        `,
      },
      boxShadow: {
        'glow-purple': '0 0 30px rgba(107, 70, 193, 0.3)',
        'glow-gold': '0 0 30px rgba(253, 180, 98, 0.3)',
        'glow-orange': '0 0 30px rgba(255, 140, 66, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(107, 70, 193, 0.2)',
        'elevation-1': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'elevation-2': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'elevation-3': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'elevation-4': '0 20px 25px rgba(0, 0, 0, 0.15)',
        'elevation-5': '0 40px 50px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 4s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'slide-left': 'slide-left 0.5s ease-out',
        'slide-right': 'slide-right 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-left': {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-right': {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      letterSpacing: {
        'extra-tight': '-0.03em',
      },
      lineHeight: {
        'extra-tight': '0.9',
      },
    },
  },
  plugins: [
    // Plugin for additional utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.perspective-1000': {
          'perspective': '1000px',
        },
        '.transform-gpu': {
          'transform': 'translateZ(0)',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}