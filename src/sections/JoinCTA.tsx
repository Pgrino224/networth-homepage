// Step 5h FIXED: JoinCTA with Reliable Viewport Detection
// COMPLETE VERSION - All content included

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

export default function JoinCTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Floating animation variants with proper typing
  const floatAnimation: Variants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      transition: {
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="join-cta"
      aria-label="Join NetWorth call to action"
      className="relative bg-black py-32 px-6 overflow-hidden"
    >
      {/* Background pattern - subtle dot grid for texture */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, #000 0%, transparent 50%)',
            backgroundSize: '50px 50px'
          }}
        >
        </div>
      </div>

      {/* Main container */}
      <div className="max-w-6xl mx-auto relative">
        
        {/* FLOATING DECORATIVE ELEMENTS */}
        
        {/* Top-left floating shape - Purple gradient */}
        <motion.div 
          variants={floatAnimation}
          animate={isInView ? "animate" : undefined}
          className="absolute -top-10 md:-top-20 -left-10 md:-left-20 w-24 md:w-40 h-24 md:h-40 opacity-60 pointer-events-none"
          role="presentation"
          aria-hidden="true"
        >
          <div className="w-full h-full bg-gradient-to-br from-networth-white to-transparent rounded-2xl transform rotate-12 blur-xl"></div>
        </motion.div>
        
        {/* Top-right floating shape - Gold gradient */}
        <motion.div 
          variants={floatAnimation}
          animate={isInView ? "animate" : undefined}
          transition={{ delay: 1 }}
          className="absolute -top-8 md:-top-16 -right-8 md:-right-16 w-32 md:w-48 h-32 md:h-48 opacity-60 pointer-events-none"
          role="presentation"
          aria-hidden="true"
        >
          <div className="w-full h-full bg-gradient-to-bl from-networth-gold to-transparent rounded-full transform -rotate-12 blur-xl"></div>
        </motion.div>
        
        {/* Bottom-left floating shape - Orange gradient */}
        <motion.div 
          variants={floatAnimation}
          animate={isInView ? "animate" : undefined}
          transition={{ delay: 2 }}
          className="absolute -bottom-6 md:-bottom-12 -left-6 md:-left-12 w-20 md:w-36 h-20 md:h-36 opacity-60 pointer-events-none"
          role="presentation"
          aria-hidden="true"
        >
          <div className="w-full h-full bg-gradient-to-tr from-networth-orange to-transparent rounded-2xl transform rotate-45 blur-xl"></div>
        </motion.div>
        
        {/* MAIN CARD CONTAINER */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          
          {/* Black card - main content container */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 bg-black text-white rounded-3xl p-12 md:p-16 text-center shadow-2xl"
          >
            {/* Small caption */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-6"
            >
              Join NetWorth
            </motion.p>
            
            {/* Main heading with staggered word animation */}
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 max-w-4xl mx-auto"
            >
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.8 }}
                className="inline-block"
              >
                Shape the Future of
              </motion.span>
              <br />
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 1 }}
                className="inline-block"
              >
                Financial Mastery
              </motion.span>
              <br />
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 1.2 }}
                className="inline-block"
              >
                Together
              </motion.span>
            </motion.h2>
            
            {/* Supporting text */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.4 }}
              className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              Be among the first to experience a revolutionary platform where 
              financial education meets immersive gameplay. Your journey to 
              mastery begins here.
            </motion.p>
            
            {/* CTA Button with hover effects */}
            <motion.a 
              href="#"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 1.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300"
            >
              Get Early Access
              {/* Arrow icon with hover animation */}
              <motion.svg 
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}