// Step 5e FIXED: Universe Section - With PNG Images
// Replaces gradient circles with planet images

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function Universe() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const scrollValues = [
    {
      number: "01",
      title: "Arion",
      image: "/images/arion.png",
      description: "Arion is the legendary proving ground of NetWorth, a mystical exoplanet where aspiring financial warriors test their strategic prowess and emotional resilience. Orbiting the golden star Musica in the constellation Delphinus, Arion serves as the central hub for competitive trading mastery, where players wield the enigmatic Chrysoplos (golden instruments of financial alchemy) to shape their destiny across five distinct moons."
    },
    {
      number: "02", 
      title: "Augur",
      image: "/images/augur.png",
      description: "Planet Augur is NetWorth's world of perception and prophecy, a sophisticated planet that houses the game's most mentally demanding arenas. Unlike other planets focused on reflexes or execution, Augur is where cognitive edge, psychological tempo, and probabilistic foresight are tested at the highest level through the SYNCR system architecture."
    },
    {
      number: "03",
      title: "Colossoria",
      image: "/images/colossoria.png",
      description: "Colossoria is the grand competitive arena of NetWorth, the legendary planet where every match echoes through digital Olympus and skill transforms into eternal legacy. Named after history's greatest arenas, Colossoria serves as the ultimate proving ground where elite financial warriors compete in curated tournaments while creative visionaries forge their own competitive mythologies, transforming strategic excellence into community legend."
    },
    {
      number: "04",
      title: "Erebus",
      image: "/images/erebus.png",
      description: "Erebus represents the next evolution of financial education through adversarial gameplay. Named after the primordial deity of darkness, this underworld planet transforms abstract market forces into tangible adversaries called Wraiths, with ultimate challenges manifesting as Specters. Through the revolutionary SYNCR system integration, Erebus becomes a living, breathing educational ecosystem that adapts to each player's journey."
    }, 
    {
      number: "05",
      title: "Ishtar",
      image: "/images/ishtar.png",
      description: "Ishtar is the introspective heart of NetWorth—a planet of mastery and internal evolution where financial warriors forge their foundational strength in silence. Named after the ancient Babylonian goddess of wisdom, Ishtar serves as the sacred development sanctuary where players refine their traits, strategize in contemplation, and build the quiet edge needed to conquer across all planets through sophisticated AI-guided growth."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="universe"
      aria-label="NetWorth core values"
      className="relative bg-networth-black text-networth-white"
      style={{ height: '400vh' }}
    >
      {/* Sticky container - adjusted for mobile with 20% scale */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden" style={{ transform: 'scale(1.5)' }}>
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          {/* Mobile: Stack vertically, Desktop: Side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            
            {/* LEFT SIDE: Title & Values */}
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-12">
              {/* Title + CTA */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold uppercase leading-tight mb-4">
                  The Universe <br />
                  <span className="text-networth-orange">of NetWorth</span>
                </h1>
                <motion.a
                  href="/join"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-4 py-2 md:px-6 md:py-2 bg-networth-black text-networth-white text-xs rounded-full font-semibold uppercase tracking-widest hover:bg-networth-navy transition-colors duration-300"
                >
                  Join The Movement
                </motion.a>
              </motion.div>

              {/* Scroll-Controlled Values - smaller text on mobile */}
              <ul className="flex flex-col gap-4 md:gap-6 lg:gap-8" role="list">
                {scrollValues.map((value, index) => {
                  const itemStart = index / scrollValues.length;
                  const itemEnd = (index + 1) / scrollValues.length;
                  
                  const itemOpacity = useTransform(
                    scrollYProgress,
                    [
                      Math.max(0, itemStart - 0.1),
                      itemStart,
                      itemEnd - 0.1,
                      itemEnd
                    ],
                    [0.5, 1, 1, 0.5]
                  );
                  
                  const itemScale = useTransform(
                    scrollYProgress,
                    [itemStart - 0.1, itemStart, itemEnd - 0.1, itemEnd],
                    [0.95, 1, 1, 0.95]
                  );

                  const descriptionHeight = useTransform(
                    scrollYProgress,
                    [itemStart - 0.05, itemStart, itemEnd - 0.05, itemEnd],
                    ["0px", "120px", "120px", "0px"]
                  );

                  return (
                    <motion.li
                      key={value.number}
                      style={{ 
                        opacity: itemOpacity,
                        scale: itemScale
                      }}
                      className="transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 text-networth-orange-700 uppercase text-xs font-mono mb-1">
                        <span>{value.number}</span>
                        <span className="text-xs md:text-sm">{value.title}</span>
                      </div>
                      <motion.div 
                        style={{ height: descriptionHeight }}
                        className="pl-5 border-l-2 border-networth-black font-medium text-xs md:text-sm overflow-hidden"
                      >
                        <p className="pr-4">{value.description}</p>
                      </motion.div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* RIGHT SIDE: Animated Symbol - Hidden on mobile, smaller on tablet */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-sm xl:max-w-md aspect-square">
                {scrollValues.map((value, index) => {
                  const symbolOpacity = useTransform(
                    scrollYProgress,
                    [
                      (index - 0.5) / scrollValues.length,
                      index / scrollValues.length,
                      (index + 0.5) / scrollValues.length,
                      (index + 1) / scrollValues.length
                    ],
                    [0, 1, 1, 0]
                  );

                  const symbolScale = useTransform(
                    scrollYProgress,
                    [
                      (index - 0.5) / scrollValues.length,
                      index / scrollValues.length,
                      (index + 0.5) / scrollValues.length,
                      (index + 1) / scrollValues.length
                    ],
                    [0.8, 1, 1, 0.8]
                  );

                  const symbolRotate = useTransform(
                    scrollYProgress,
                    [index / scrollValues.length, (index + 1) / scrollValues.length],
                    [0, 180]
                  );

                  return (
                    <motion.div
                      key={index}
                      style={{ 
                        opacity: symbolOpacity,
                        scale: symbolScale
                      }}
                      className="absolute inset-0 w-full h-full flex items-center justify-center"
                    >
                      {/* PNG Image replacing animated gradients */}
                      <motion.div 
                        style={{ rotate: symbolRotate }}
                        className="relative w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src={value.image}
                          alt={`${value.title} planet`}
                          width={400}
                          height={400}
                          className="object-contain w-full h-full"
                          priority={index === 0} // Load first image with priority
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - smaller on mobile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 text-center z-20"
      >
        <p className="text-xs uppercase tracking-wider text-networth-black/50 mb-2">Scroll to explore</p>
        <motion.svg 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-5 md:w-6 md:h-6 mx-auto" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </motion.div>
    </section>
  );
}