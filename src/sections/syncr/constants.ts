// NetWorth brand colors
export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  navy: '#0B1929',
  purple: '#6B46C1',
  gold: '#FDB462',
  orange: '#FF8C42'
} as const;

// Animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

// Viewport settings for animations
export const viewportSettings = {
  once: true,
  margin: "-100px"
};