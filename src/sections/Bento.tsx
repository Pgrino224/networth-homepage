import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EducationalValue: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  // Hydration fix - only run on client
  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 768);
    
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle pamphlet click
  const handlePamphletClick = (): void => {
    setIsOpen(!isOpen);
  };

  // Don't render until client-side to avoid hydration issues
  if (!isClient) {
    return (
      <section className="relative min-h-screen bg-black flex items-center justify-center py-28">
        <div className="w-full max-w-7xl mx-auto px-11 h-[840px]" />
      </section>
    );
  }

  return (
    <>
      <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .perspective-1400 {
          perspective: 1400px;
        }
      `}</style>

      <section 
        ref={sectionRef}
        className="relative min-h-screen bg-black flex items-center justify-center py-28 overflow-hidden"
        aria-label="Educational Value - Role-Playing Education"
      >
        {/* Background ambient particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-[0.03]"
              initial={{
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
              }}
              animate={{
                y: [0, -42, 0],
                x: [0, (i % 2 === 0 ? 14 : -14), 0],
              }}
              transition={{
                duration: 14 + (i % 5) * 2.8,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.28
              }}
            />
          ))}
        </div>

        {/* Desktop: Pamphlet */}
        {isMobile === false && (
          <div 
            className="relative w-full max-w-[78rem] mx-auto px-11 perspective-1400 cursor-pointer"
            onClick={handlePamphletClick}
          >
            <div className="relative w-full h-[700px] preserve-3d">
              
              {/* Left Page (Cover when closed, Description when open) */}
              <motion.div
                className="absolute left-0 w-1/2 h-full preserve-3d"
                animate={{ 
                  rotateY: isOpen ? -180 : 0,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transformOrigin: 'right center' }}
              >
                {/* Front of left page (Cover) */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="w-full h-full bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 rounded-l-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-transparent opacity-10" />
                    <div className="absolute inset-0 flex items-center justify-center p-16">
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight">
                        Role-Playing Education:<br/>An Immersion
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Back of left page (Description when open) */}
                <div 
                  className="absolute inset-0 backface-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="w-full h-full bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 rounded-l-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-transparent opacity-10" />
                    <div className="absolute inset-0 flex items-center justify-center p-16">
                      <div className="max-w-2xl">
                        <p className="text-2xl text-gray-200 leading-relaxed">
                          True learning comes from{' '}
                          <span className="text-orange-500 font-semibold">embodiment</span>
                          . Role-Playing Education places you{' '}
                          <span className="relative inline-block">
                            inside the mind
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
                          </span>{' '}
                          of traders, founders, and financial architects where every decision carries weight and every outcome teaches through experience. Knowledge becomes{' '}
                          <span className="relative inline-block px-1.5 rounded bg-orange-500 bg-opacity-20">
                            instinct
                          </span>{' '}
                          when you live it firsthand.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Page */}
              <motion.div
                className="absolute right-0 w-1/2 h-full preserve-3d"
                animate={{ 
                  rotateY: isOpen ? 180 : 0,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transformOrigin: 'left center' }}
              >
                {/* Front of right page (Click here text) */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="w-full h-full bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 rounded-r-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-bl from-orange-500 to-transparent opacity-10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white text-3xl font-medium">Click here</p>
                    </div>
                  </div>
                </div>

                {/* Back of right page (Learn by Becoming) */}
                <div 
                  className="absolute inset-0 backface-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="w-full h-full bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 rounded-r-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-bl from-orange-500 to-transparent opacity-10" />
                    
                    {/* Background Image - 80% of the page */}
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="w-full h-full max-w-[80%] max-h-[80%] bg-gradient-to-br from-orange-500 to-red-500 opacity-10 rounded-xl" />
                      {/* Replace the gradient div above with an actual image when available:
                      <img 
                        src="/path-to-your-image.jpg" 
                        alt="Educational background"
                        className="w-full h-full max-w-[80%] max-h-[80%] object-cover opacity-20 rounded-xl"
                      /> */}
                    </div>

                    {/* Content on top of image */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-16 z-10">
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-11">
                        Learn by Becoming
                      </h3>
                      <motion.button
                        className="px-11 py-4 border-2 border-orange-500 text-white rounded-full font-semibold text-xl flex items-center gap-3 hover:bg-orange-500 hover:text-black transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Educational</span>
                        <span>→</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Shadow beneath pamphlet */}
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-28 bg-orange-500 rounded-full blur-3xl opacity-10"
                animate={{
                  scale: isOpen ? 1.2 : 1,
                  opacity: isOpen ? 0.05 : 0.1
                }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        )}

        {/* Mobile: Simple Card */}
        {isMobile === true && (
          <div className="relative w-full max-w-lg mx-auto px-8">
            <motion.div 
              className="relative w-full"
              animate={{ rotateY: isOpen ? 180 : 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              style={{ transformStyle: 'preserve-3d' }}
              onClick={handlePamphletClick}
            >
              {/* Front of card */}
              <div className="backface-hidden">
                <div className="bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 rounded-3xl p-11 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-transparent opacity-10 rounded-3xl" />
                  <h2 className="text-3xl font-bold text-white text-center mb-6 relative z-10">
                    Role-Playing Education:<br/>An Immersion
                  </h2>
                  <p className="text-base text-gray-400 text-center relative z-10">
                    Tap to explore
                  </p>
                </div>
              </div>

              {/* Back of card */}
              <div 
                className="absolute inset-0 backface-hidden"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className="bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 rounded-3xl p-11 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-bl from-red-500 to-transparent opacity-10 rounded-3xl" />
                  <h3 className="text-2xl font-bold text-white mb-6 relative z-10">
                    Learn by Becoming
                  </h3>
                  <p className="text-gray-200 leading-relaxed mb-8 relative z-10 text-lg">
                    True learning comes from embodiment. Role-Playing Education places you inside the mind of traders, founders, and financial architects where every decision carries weight.
                  </p>
                  <button className="px-8 py-3 border-2 border-orange-500 text-white rounded-full font-semibold text-base relative z-10 mx-auto block">
                    Educational →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </section>
    </>
  );
};

export default EducationalValue;