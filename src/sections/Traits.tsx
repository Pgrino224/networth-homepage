// Step 5f FIXED: Traits Section with 30% Scale and Gold Theme
// One trait at a time on desktop, simple list on mobile

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function Traits() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentTraitIndex, setCurrentTraitIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 820);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Scroll progress for the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // The 10 foundational traits
  const traits = [
    {
      id: "analytical-rigor",
      name: "Analytical Rigor",
      subtitle: "Cognitive Mastery",
      description: "Master the art of data-driven decision making. Analyze markets, evaluate risks, and spot opportunities others miss."
    },
    {
      id: "creativity-contrarian",
      name: "Creativity & Contrarian Thinking",
      subtitle: "Innovative Edge",
      description: "Challenge conventional wisdom. Find unique angles in crowded markets and create value where others see none."
    },
    {
      id: "risk-intelligence",
      name: "Risk Intelligence",
      subtitle: "Probabilistic Thinking & Risk Management",
      description: "Calculate risks like a pro. Know when to bet big and when to protect your capital."
    },
    {
      id: "emotional-discipline",
      name: "Emotional Discipline",
      subtitle: "Self-Control & Resilience",
      description: "Keep your cool when markets heat up. Master your emotions to make rational decisions under pressure."
    },
    {
      id: "conviction-independent",
      name: "Conviction & Independent Thinking",
      subtitle: "Thesis Strength",
      description: "Stand by your analysis. Develop strong investment theses and maintain conviction when the crowd disagrees."
    },
    {
      id: "adaptability-learning",
      name: "Adaptability & Continuous Learning",
      subtitle: "Feedback Sensitivity",
      description: "Stay ahead of change. Continuously update your knowledge and adapt strategies to evolving markets."
    },
    {
      id: "strategic-vision",
      name: "Strategic Vision",
      subtitle: "Big-Picture & Systems Thinking",
      description: "See the forest and the trees. Connect dots across industries and time horizons to spot mega-trends."
    },
    {
      id: "execution-decisiveness",
      name: "Execution & Decisiveness",
      subtitle: "Action-Oriented Skill",
      description: "Turn analysis into action. Make timely decisions and execute trades with precision and confidence."
    },
    {
      id: "self-awareness",
      name: "Self-Awareness & Introspection",
      subtitle: "Knowing One's Self",
      description: "Know your strengths and blind spots. Build strategies that align with your unique capabilities."
    },
    {
      id: "integrity-longterm",
      name: "Integrity & Long-Term Orientation",
      subtitle: "Trust and Compounding Mindset",
      description: "Play the long game. Build wealth through patience, integrity, and the power of compound returns."
    }
  ];

  // Update current trait based on scroll - ONLY ON DESKTOP
  useEffect(() => {
    if (!isMobile && scrollYProgress) {
      const unsubscribe = scrollYProgress.onChange((progress) => {
        const index = Math.min(
          Math.floor(progress * traits.length),
          traits.length - 1
        );
        setCurrentTraitIndex(index);
      });
      
      return unsubscribe;
    }
  }, [scrollYProgress, traits.length, isMobile]);

  // Mobile: Regular scrolling section
  if (isMobile) {
    return (
      <section 
        id="traits"
        aria-label="NetWorth character traits system"
        className="bg-black py-16"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6" style={{ transform: 'scale(1.3)' }}>
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-2">
              Master the Fundamentals
            </h2>
            <h1 className="text-3xl md:text-4xl font-white mb-4 uppercase">
              THE 10 <span className="text-networth-gold">TRAITS</span> OF WEALTH BUILDERS
            </h1>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Develop these foundational characteristics through gameplay and watch your real-world financial success soar.
            </p>
          </motion.div>

          {/* Journey Box */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-networth-navy text-white p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Your Journey to Mastery</h3>
              <p className="text-sm text-gray-300 mb-6">
                Each trait represents a crucial skill in your financial journey. As you progress through 
                NetWorth, you'll develop these traits through challenges, scenarios, and real-world applications.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-networth-gold rounded-full" />
                  <span className="text-xs">Track progress in real-time</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-networth-gold rounded-full" />
                  <span className="text-xs">Unlock rewards for each trait</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-networth-gold rounded-full" />
                  <span className="text-xs">Build your unique profile</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Traits List */}
          <div className="space-y-4">
            {traits.map((trait, index) => (
              <motion.div
                key={trait.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-networth-gold to-networth-orange rounded-full flex items-center justify-center text-black font-bold text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {trait.name}
                    </h3>
                    <p className="text-xs uppercase tracking-wide text-networth-gold mb-2">
                      {trait.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {trait.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop: Scroll-based one trait at a time
  return (
    <section 
      ref={sectionRef}
      id="traits"
      aria-label="NetWorth character traits system"
      className="bg-black relative"
      style={{ height: `${traits.length * 100}vh` }} // Important: Set height for scroll
    >
      {/* Sticky container with 30% scale */}
      <div className="sticky top-0 h-screen flex items-center" style={{ transform: 'scale(1.3)' }}>
        <div className="max-w-7xl mx-auto px-6 w-full py-20">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-4">
              Master the Fundamentals
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white">
              The 10 <span className="text-networth-gold">Traits</span> of Wealth Builders
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Develop these foundational characteristics through gameplay and watch your real-world financial success soar.
            </p>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* LEFT: Sticky description */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-networth-navy text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Your Journey to Mastery</h3>
                <p className="text-gray-300 mb-6">
                  Each trait represents a crucial skill in your financial journey. As you progress through 
                  NetWorth, you'll develop these traits through challenges, scenarios, and real-world applications.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-networth-gold rounded-full" />
                    <span className="text-sm">Track progress in real-time</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-networth-gold rounded-full" />
                    <span className="text-sm">Unlock rewards for each trait</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-networth-gold rounded-full" />
                    <span className="text-sm">Build your unique profile</span>
                  </div>
                </div>
                
                {/* Progress indicator */}
                <div className="mt-8">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{currentTraitIndex + 1} / {traits.length}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-networth-gold to-networth-orange rounded-full"
                      animate={{ width: `${((currentTraitIndex + 1) / traits.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Single trait display */}
            <div className="lg:col-span-2 relative h-[400px] flex items-center">
              {traits.map((trait, index) => (
                <motion.div
                  key={trait.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: currentTraitIndex === index ? 1 : 0,
                    y: currentTraitIndex === index ? 0 : 50,
                    scale: currentTraitIndex === index ? 1 : 0.8
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center"
                  style={{ pointerEvents: currentTraitIndex === index ? 'auto' : 'none' }}
                >
                  <div className="bg-black rounded-xl p-8 shadow-lg border-2 border-networth-gold w-full">
                    <div className="flex items-start gap-6">
                      {/* Trait number */}
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: currentTraitIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-networth-gold to-networth-orange rounded-full flex items-center justify-center text-black font-bold text-2xl">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </motion.div>
                      
                      {/* Trait content */}
                      <div className="flex-grow">
                        <motion.h3 
                          initial={{ x: -20 }}
                          animate={{ x: currentTraitIndex === index ? 0 : -20 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="text-2xl font-bold text-white mb-2"
                        >
                          {trait.name}
                        </motion.h3>
                        <motion.p 
                          initial={{ x: -20 }}
                          animate={{ x: currentTraitIndex === index ? 0 : -20 }}
                          transition={{ duration: 0.4, delay: 0.15 }}
                          className="text-sm uppercase tracking-wide text-networth-gold mb-4"
                        >
                          {trait.subtitle}
                        </motion.p>
                        <motion.p 
                          initial={{ x: -20 }}
                          animate={{ x: currentTraitIndex === index ? 0 : -20 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="text-gray-400 leading-relaxed text-lg"
                        >
                          {trait.description}
                        </motion.p>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: currentTraitIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden origin-left"
                    >
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: currentTraitIndex === index ? '75%' : '0%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-networth-gold to-networth-orange rounded-full"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}