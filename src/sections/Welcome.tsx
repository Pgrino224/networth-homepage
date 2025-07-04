// Welcome Section - "What is NetWorth"
// Features video background with stacked cards that slide out on hover
// UPDATED: 30% larger scale + improved card visibility

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export default function Welcome() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cards = [
    {
      id: 1,
      type: 'profile',
      content: (
        <div className="p-8">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-networth-purple to-networth-gold flex items-center justify-center text-3xl font-bold text-white">
              LA
            </div>
            <div>
              <h3 className="text-white font-semibold text-2xl">Lastic Alexander</h3>
              <p className="text-networth-gold text-3xl font-bold">₦ 726,450</p>
            </div>
          </div>
          
          {/* Mini Chart */}
          <div className="h-40 flex items-end justify-between gap-1.5 mb-5">
            {[40, 55, 45, 70, 65, 80, 75, 85].map((height, i) => (
              <motion.div 
                key={i}
                className="flex-1 bg-networth-gold/30 rounded-t transition-all hover:bg-networth-gold/50"
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
            ))}
          </div>
          
          <div className="flex items-center justify-between text-base">
            <span className="text-gray-400">Growth</span>
            <span className="text-green-400 text-lg font-semibold">+14.5%</span>
          </div>
        </div>
      )
    },
    {
      id: 2,
      type: 'achievements',
      content: (
        <div className="p-8">
          <h3 className="text-white font-semibold text-2xl mb-5">Achievements</h3>
          <div className="grid grid-cols-3 gap-4">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="bg-white/10 rounded-lg p-5 flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className="text-4xl">🏆</div>
              <span className="text-sm text-gray-300">Top 3%</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="bg-white/10 rounded-lg p-5 flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className="text-4xl">⭐</div>
              <span className="text-sm text-gray-300">Champion</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="bg-white/10 rounded-lg p-5 flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className="text-4xl">📈</div>
              <span className="text-sm text-gray-300">Strategist</span>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      type: 'market',
      content: (
        <div className="p-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-semibold text-2xl">Market Index</h3>
            <motion.span 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-3 py-1.5 bg-red-500/20 text-red-400 text-sm rounded-full"
            >
              LIVE
            </motion.span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-gray-400 text-base">S&P 500</span>
              <motion.span 
                className="text-networth-orange font-medium text-lg"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                +1.24%
              </motion.span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-gray-400 text-base">NASDAQ</span>
              <motion.span 
                className="text-red-400 font-medium text-lg"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                -0.58%
              </motion.span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-400 text-base">BTC/USD</span>
              <motion.span 
                className="text-networth-orange font-medium text-lg"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              >
                +3.41%
              </motion.span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-5 py-3 bg-networth-gold text-black font-semibold text-base rounded-lg hover:bg-networth-orange transition-colors"
          >
            Start Trading
          </motion.button>
        </div>
      )
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="what-is-networth"
      aria-label="What is NetWorth"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/what-is-networth-poster.jpg"
        >
          <source src="/videos/what-is-networth-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        
        {/* Gradient overlay for depth */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" 
          aria-hidden="true" 
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-5 xl:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="text-left xl;col-span-2"
          >
            {/* Section Label */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-10"
            >
              What is NetWorth?
            </motion.p>

            {/* Main Content Container with Glass Effect */}
            <div className="relative">
              {/* Glass panel background */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl" />
              
              {/* Content */}
              <div className="relative p-13 lg:p-16">
                {/* Main Headline */}
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-16 leading-tight">
                  NetWorth transforms financial mastery from privilege to practice.
                </h2>
                
                {/* Supporting Text */}
                <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed mb-12">
                  Built on advanced AI that learns from millions of decisions, we create living market simulations where your choices shape both your skills and your social currency. Your NetWorth becomes visible proof of your financial intelligence - earned through competition, refined through practice, recognized by peers.
                </p>
                
                {/* Accent Element */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 125 } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="h-1.5 bg-gradient-to-r from-networth-gold to-networth-orange rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side: Stacked Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[780px] hidden xl:block xl:col-span-1"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence>
                {cards.map((card, index) => {
                  const isActive = activeCard === card.id;
                  const offset = index * 60; // Increased from 30 for better visibility
                  const rotation = index * -2; // Reduced from -3 for cleaner look with larger cards
                  
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ 
                        x: 0, 
                        y: offset, 
                        rotate: rotation,
                        scale: 0.97 - (index * 0.03) // Less dramatic scale reduction
                      }}
                      animate={{ 
                        x: isActive ? 260 : 0, // Increased from 150 for larger cards
                        y: isActive ? -20 : offset, // Lift up when active
                        rotate: isActive ? 0 : rotation,
                        scale: isActive ? 1.05 : 0.97 - (index * 0.03), // Slightly enlarge active card
                        zIndex: isActive ? 10 : cards.length - index
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30 
                      }}
                      onHoverStart={() => setActiveCard(card.id)}
                      onHoverEnd={() => setActiveCard(null)}
                      onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
                      className="absolute cursor-pointer"
                      style={{ 
                        width: '416px', // Increased from 320px (30% bigger)
                        zIndex: isActive ? 10 : cards.length - index
                      }}
                    >
                      <motion.div
                        animate={{ 
                          opacity: isActive ? 1 : activeCard && !isActive ? 0.4 : 1 // More fade for non-active cards
                        }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                      >
                        {/* Card glow effect when active */}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute -inset-6 bg-gradient-to-r from-networth-gold/30 to-networth-orange/30 rounded-2xl blur-2xl"
                          />
                        )}
                        
                        {/* Card content */}
                        <div className={`
                          relative bg-white/10 backdrop-blur-md border rounded-2xl shadow-2xl
                          ${isActive ? 'border-networth-gold/70' : 'border-white/10'}
                          transition-all duration-300
                        `}>
                          {card.content}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}