// Step 5g UPDATED: SYNCR Section with Glassmorphism and AI Architecture Content
// Replaces Glance section with SYNCR AI system showcase

import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Custom hook for animated counter
function useAnimatedCounter(end: number, duration: number = 2, suffix: string = '', startCounting: boolean = false) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!startCounting) {
      setCount(0);
      return;
    }

    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(end * progress));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, startCounting]);
  
  return `${count}${suffix}`;
}

// Animated counter component
function AnimatedNumber({ value, duration = 2, suffix = '', delay = 0 }: { 
  value: number; 
  duration?: number; 
  suffix?: string;
  delay?: number;
}) {
  const [shouldStart, setShouldStart] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldStart(true);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  const animatedValue = useAnimatedCounter(value, duration, suffix, shouldStart);
  return <>{animatedValue}</>;
}

// Animated text component for bottom right box
function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const sentences = text.split('. ').map(sentence => sentence.trim() + (sentence.endsWith('.') ? '' : '.'));
  
  return (
    <div className="space-y-2">
      {sentences.map((sentence, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: delay + index * 0.3,
            ease: "easeOut"
          }}
          className="text-gray-300 text-sm leading-relaxed"
        >
          {sentence}
        </motion.p>
      ))}
    </div>
  );
}

export default function Glance() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      id="syncr"
      aria-label="SYNCR: The Orchestration Engine"
      className="bg-networth-black text-white py-20 md:py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            The Intelligence Layer
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black">
            <span className="text-networth-gold">SYNCR</span>: The Orchestration Engine
          </h1>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            At the heart of NetWorth operates a revolutionary AI architecture where specialized agents harmonize into one symphonic system
          </p>
        </motion.header>

        {/* 2x2 Glassmorphism Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          {/* Top Left: Commander Intelligence - Minerva */}
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative p-8 lg:p-10 rounded-2xl overflow-hidden group backdrop-blur-md bg-white/5 border border-white/10"
            style={{
              background: 'linear-gradient(135deg, rgba(107, 70, 193, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            <div className="relative z-10">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-networth-gold mb-2">
                Commander Intelligence
              </h2>
              <p className="text-5xl lg:text-6xl font-black mb-4 text-networth-gold">
                {isInView ? <AnimatedNumber value={1} duration={1} suffix="" delay={0.2} /> : '0'}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Minerva is an Orchestration intelligence, a system that not only routes messages across all the layer agents and subagents but also one that understand, optimizes and evolves the entire ecosystem.
              </p>
            </div>
            {/* Minerva symbol decoration */}
            <motion.div 
              animate={isInView ? { 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-4 -right-4 w-20 h-20 border-2 border-networth-gold/30 rounded-full"
            >
              <div className="absolute inset-2 border border-networth-gold/30 rounded-full">
                <div className="absolute inset-2 bg-networth-gold/10 rounded-full"></div>
              </div>
            </motion.div>
          </motion.article>

          {/* Top Right: Layer Agents */}
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="relative p-8 lg:p-10 rounded-2xl overflow-hidden group backdrop-blur-md bg-white/5 border border-white/10"
            style={{
              background: 'linear-gradient(135deg, rgba(253, 180, 98, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            <div className="relative z-10">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-networth-gold mb-2">
                Layer Agents
              </h2>
              <p className="text-5xl lg:text-6xl font-black mb-4 text-networth-gold">
                {isInView ? <AnimatedNumber value={7} duration={1.5} suffix="" delay={0.3} /> : '0'}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                7 Layer Agents across 6 domains: Learning, The World & Economics, Analytics and Fairness, Routing & Navigation, High-Performance Trading, and Multi-modal Experience.
              </p>
            </div>
            {/* Layer connections visualization */}
            <div className="absolute bottom-4 right-4 flex flex-wrap gap-1 max-w-20">
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                  className="w-3 h-3 bg-networth-gold/30 rounded border border-networth-gold/50" 
                />
              ))}
            </div>
          </motion.article>

          {/* Bottom Left: Sub Agents */}
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="relative p-8 lg:p-10 rounded-2xl overflow-hidden group backdrop-blur-md bg-white/5 border border-white/10"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 46, 46, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            <div className="relative z-10">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-networth-gold mb-2">
                Sub Agents
              </h2>
              <p className="text-5xl lg:text-6xl font-black mb-4 text-networth-gold">
                {isInView ? <AnimatedNumber value={15} duration={2} suffix="" delay={0.4} /> : '0'}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Layer agents provide the foundational outputs for every domain, each serving a specific purpose in the harmony of SYNCR.
              </p>
            </div>
            {/* Sub-agent network visualization */}
            <div className="absolute bottom-4 right-4">
              <div className="relative w-16 h-16">
                {[...Array(15)].map((_, i) => {
                  const angle = (i * 360) / 15;
                  const radius = 20;
                  const x = Math.cos(angle * Math.PI / 180) * radius;
                  const y = Math.sin(angle * Math.PI / 180) * radius;
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ delay: 1.5 + i * 0.05, duration: 0.3 }}
                      className="absolute w-1 h-1 bg-networth-gold rounded-full"
                      style={{
                        left: `50%`,
                        top: `50%`,
                        transform: `translate(${x}px, ${y}px)`
                      }}
                    />
                  );
                })}
                {/* Central node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 2.5, duration: 0.5 }}
                  className="absolute w-2 h-2 bg-networth-gold rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          </motion.article>

          {/* Bottom Right: Ontological Unification */}
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="relative p-8 lg:p-10 rounded-2xl overflow-hidden group backdrop-blur-md bg-white/5 border border-white/10"
            style={{
              background: 'linear-gradient(135deg, rgba(107, 70, 193, 0.08) 0%, rgba(253, 180, 98, 0.08) 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            <div className="relative z-10">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-sm font-semibold uppercase tracking-wide text-networth-gold mb-4"
              >
                Ontological Unification
              </motion.h2>
              {isInView && (
                <AnimatedText 
                  text="Let each domain speak its natural language; let Minerva be the translator. The ontological unification system allows each domain to use concepts that make sense internally while maintaining system-wide coherence, allowing domains to evolve independently without breaking integration."
                  delay={0.7}
                />
              )}
            </div>
            {/* Translation/connection visualization */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute -bottom-2 -right-2 w-24 h-24 opacity-20"
            >
              <svg viewBox="0 0 24 24" className="w-full h-full text-networth-gold">
                <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </motion.div>
          </motion.article>

        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="syncr"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-networth-gold hover:text-networth-black"
          >
            Discover the Architecture
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}