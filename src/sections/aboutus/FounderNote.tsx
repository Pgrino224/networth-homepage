import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FounderNote() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"]
  });

  // Parallax effect for the quote
  const quoteY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation variants for text highlighting
  const highlightVariants = {
    hidden: { color: "#FFFFFF" },
    visible: { color: "#FDB462" }
  };

  const gameHighlightVariants = {
    hidden: { color: "#FFFFFF" },
    visible: { color: "#FDB462" }
  };

  const battlegroundVariants = {
    hidden: { color: "#FFFFFF" },
    visible: { color: "#FF2E2E" }
  };

  const gameVariants = {
    hidden: { color: "#FFFFFF" },
    visible: { color: "#FF2E2E" }
  };

  const playerVariants = {
    hidden: { color: "#FFFFFF" },
    visible: { color: "#FDB462" }
  };

  return (
    <section 
      ref={sectionRef}
      id="founder-note"
      className="relative bg-black text-white py-20 md:py-24 lg:py-32 px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Background effects - very subtle */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(253, 180, 98, 0.1) 0%, transparent 50%)',
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="relative z-10">
        {/* Section Label */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">
            Founder's Story
          </h2>
        </motion.div>

        {/* Main Quote Container - Increased width and text size */}
        <motion.div 
          className="max-w-full lg:max-w-7xl mx-auto text-left"
          style={{ y: quoteY }}
        >
          <motion.blockquote 
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-tight lg:leading-snug mb-12 md:mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="mb-8 md:mb-12">
              "As someone who grew up immersed in the worlds of{' '}
              <motion.span
                variants={gameHighlightVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="relative cursor-pointer group"
                onMouseEnter={(e) => {
                  e.target.style.textShadow = '0 0 20px rgba(253, 180, 98, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textShadow = 'none';
                }}
              >
                Starcraft
              </motion.span>
              ,{' '}
              <motion.span
                variants={gameHighlightVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="relative cursor-pointer group"
                onMouseEnter={(e) => {
                  e.target.style.textShadow = '0 0 20px rgba(253, 180, 98, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textShadow = 'none';
                }}
              >
                League
              </motion.span>
              ,{' '}
              <motion.span
                variants={gameHighlightVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 1.6 }}
                className="relative cursor-pointer group"
                onMouseEnter={(e) => {
                  e.target.style.textShadow = '0 0 20px rgba(253, 180, 98, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textShadow = 'none';
                }}
              >
                Dark Souls
              </motion.span>
              , and{' '}
              <motion.span
                variants={gameHighlightVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 1.8 }}
                className="relative cursor-pointer group"
                onMouseEnter={(e) => {
                  e.target.style.textShadow = '0 0 20px rgba(253, 180, 98, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textShadow = 'none';
                }}
              >
                FIFA
              </motion.span>
              {' '}— I didn't just play games, I studied what made them{' '}
              <motion.span
                variants={highlightVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 2.0 }}
              >
                powerful
              </motion.span>
              .
            </p>
            
            <p className="mb-8 md:mb-12">
              <motion.span
                variants={highlightVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="font-semibold"
              >
                NetWorth
              </motion.span>
              {' '}is my way of turning capital into a{' '}
              <motion.span
                variants={battlegroundVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 2.2 }}
              >
                battleground
              </motion.span>
              , learning into a{' '}
              <motion.span
                variants={gameVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 2.4 }}
              >
                game
              </motion.span>
              , and ambition into an identity system.
            </p>
            
            <p>
              Gamification only works when it's built by a{' '}
              <motion.span
                variants={playerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 2.6 }}
              >
                player
              </motion.span>
              {' '}— and I've been one my{' '}
              <motion.span
                variants={playerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 2.8 }}
                className="relative"
              >
                whole life
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 3.0 }}
                  style={{ originX: 0 }}
                />
              </motion.span>
              ."
            </p>
          </motion.blockquote>

          {/* Attribution */}
          <motion.div 
            className="mt-12 md:mt-16 pt-8 border-t border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 3.2 }}
          >
            <p className="text-xl md:text-2xl">
              <span className="text-orange-400 font-medium">Luis Lee</span>
              <span className="text-gray-400 ml-2">Founder & CEO</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Subtle decorative elements */}
        <motion.div 
          className="absolute top-1/2 left-20 w-2 h-2 bg-orange-400 rounded-full opacity-30"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.3 } : {}}
          transition={{ duration: 0.5, delay: 1.5 }}
        />
        <motion.div 
          className="absolute top-1/3 right-32 w-3 h-3 bg-red-500 rounded-full opacity-20"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.2 } : {}}
          transition={{ duration: 0.5, delay: 2.0 }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-orange-400 rounded-full opacity-40"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.4 } : {}}
          transition={{ duration: 0.5, delay: 2.5 }}
        />
      </div>
    </section>
  );
}