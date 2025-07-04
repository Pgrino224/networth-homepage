// Beliefs.tsx - Scroll-pinned section with video background
// Located in: src/sections/Beliefs.tsx
// This section reveals 3 core beliefs as the user scrolls

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function Beliefs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Three core beliefs about NetWorth's philosophy
  const beliefs = [
    {
      title: "Complexity as Opportunity",
      content: "We believe complexity isn't a barrier—it's an opportunity. The world's greatest rewards hide behind its most intricate challenges. Those who master the dance of financial markets don't just survive; they thrive."
    },
    {
      title: "Experience Over Information",
      content: "For centuries, we've confused information with education. Real learning happens when knowledge meets experience, when theory collides with practice. We transform abstract concepts into lived moments that reshape how you think about money."
    },
    {
      title: "AI That Thinks Like You",
      content: "We're building AI that thrives on complexity, not one that simplifies it away. Our system doesn't just analyze markets—it understands context, adapts to your journey, and navigates the chaos of the real world alongside you."
    }
  ];

  // Transform values for each belief's opacity
  const belief1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.5], [1, 1, 0]);
  const belief2Opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);
  const belief3Opacity = useTransform(scrollYProgress, [0.5, 0.75, 1], [0, 1, 1]);

  const opacities = [belief1Opacity, belief2Opacity, belief3Opacity];

  return (
    <section 
      ref={containerRef}
      id="beliefs"
      className="relative h-[400vh]" // Height determines scroll length
      aria-label="NetWorth Core Beliefs"
    >
      {/* Sticky container that stays in viewport while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/beliefs-poster.jpg"
        >
          <source src="/videos/beliefs-background.mp4" type="video/mp4" />
          {/* Fallback gradient background if video fails */}
          <div className="absolute inset-0 bg-gradient-to-br from-networth-gold via-networth-black to-networth-gold" />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content Container */}
        <div className="relative z-10 h-full">
          
          {/* Section Title - Positioned top-left */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-24 left-16"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white">
              BELIEFS
            </h1>
          </motion.div>

          {/* Centered Scrolling Beliefs */}
          <div className="h-full flex items-center justify-center px-9">
            <div className="relative max-w-7xl mx-auto w-full">
              {beliefs.map((belief, index) => (
                <motion.div
                  key={index}
                  style={{ opacity: opacities[index] }}
                  className="absolute inset-0 flex flex-col items-center text-center"
                >
                  {/* Belief Content */}
                  <div className="max-w-6xl">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                      {belief.title}
                    </h3>
                    <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed">
                      {belief.content}
                    </p>
                  </div>

                  {/* Visual indicator of progress */}
                  <div className="mt-12 w-full max-w-2xl">
                    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-networth-gold to-networth-gold rounded-full"
                        style={{ 
                          width: useTransform(
                            scrollYProgress, 
                            [index * 0.25, (index + 1) * 0.25], 
                            ['0%', '100%']
                          )
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator (visible only at start) */}
          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
            className="absolute bottom-15 left-1/2 transform -translate-x-1/2 text-center"
          >
            <p className="text-sm uppercase tracking-wider text-white/50 mb-3">
              Scroll to explore our beliefs
            </p>
            <motion.svg 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-9 h-9 mx-auto text-networth-gold" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.div>

        </div>
      </div>
    </section>
  );
}