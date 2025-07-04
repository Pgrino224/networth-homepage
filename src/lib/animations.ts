import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  initial: { 
    y: 20, 
    opacity: 0,
    // Use transform instead of top/left
    transform: 'translateY(20px)'
  },
  animate: { 
    y: 0, 
    opacity: 1,
    transform: 'translateY(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

// Add will-change for heavy animations
export const optimizedVariants = {
  hidden: { 
    opacity: 0,
    willChange: 'transform, opacity'
  },
  visible: { 
    opacity: 1,
    willChange: 'auto'
  }
};