// Step 5a: Hero Section with Animations - SPACING FIXED
// Adds more space between MEASURE and the content below

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section 
      id="hero"
      aria-label="Measure Your Worth hero section"
      className="hero-section relative bg-networth-black text-networth-white h-screen overflow-hidden"
    >
      {/* 🎥 Background Video with fade-in animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
          data-video="hero-background"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* 🟦 Dark Overlay for text readability */}
      <div 
        className="absolute inset-0 bg-networth-black bg-opacity-50 z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* 🔤 Main Title: Top Left - Slides down from top */}
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 1,
          delay: 0.5,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="absolute top-20 left-10 md:top-20 md:left-12 text-6xl md:text-8xl lg:text-9xl font-semibold leading-none tracking-tight z-20"
      >
        DISCOVER YOUR
      </motion.h1>

      {/* 💬 Subtext Stack - MOVED DOWN FOR MORE SPACE */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute top-44 md:top-56 left-8 md:left-12 space-y-2 z-20" 
      >
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-base md:text-lg text-gray-300"
        >
          Master Your Financial Future
        </motion.p>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-base md:text-lg text-gray-300"
        >
          Build Wealth Through Knowledge
        </motion.p>
      </motion.div>

      {/* ▶️ CTA Button - ALSO MOVED DOWN */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute top-64 md:top-80 left-8 md:left-12 z-20" 
      >
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-networth-gold text-networth-black px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-networth-orange transition-all duration-300 flex items-center gap-3 shadow-lg"
          aria-label="Start your wealth journey"
        >
          <span className="text-sm md:text-base">START YOUR JOURNEY</span>
          <motion.svg 
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </motion.svg>
        </motion.button>
      </motion.div>

      {/* 🕹️ Bottom Word: Right Side - Fades up from bottom */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 1,
          delay: 0.8,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20"
      >
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-semibold leading-none tracking-tight text-right">
          <br />
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-networth-gold"
          >
            NETWORTH
          </motion.span>
        </h2>
      </motion.div>

      {/* 📊 Decorative Financial Elements with floating animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute bottom-20 left-1/4 w-32 h-32 z-0" 
        aria-hidden="true"
      >
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full bg-gradient-to-tr from-networth-purple to-transparent rounded-full blur-xl" 
        />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 2.2 }}
        className="absolute top-1/3 right-1/4 w-40 h-40 z-0" 
        aria-hidden="true"
      >
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="w-full h-full bg-gradient-to-bl from-networth-gold to-transparent rounded-full blur-xl" 
        />
      </motion.div>
    </section>
  );
}