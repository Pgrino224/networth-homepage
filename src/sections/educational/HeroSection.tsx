// sections/educational/HeroSection.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from '@/styles/sections/educational/HeroSection.module.css';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms for each layer
  const skyY = useTransform(scrollY, [0, 500], [0, 50]); // Slowest
  const buildingsFarY = useTransform(scrollY, [0, 500], [0, 100]); // Slow
  const buildingsNearY = useTransform(scrollY, [0, 500], [0, 200]); // Medium
  const personY = useTransform(scrollY, [0, 500], [0, 300]); // Fastest
  
  // Title transforms
  const titleOpacity = useTransform(scrollY, [0, 200, 400], [1, 0.5, 0]);
  const titleY = useTransform(scrollY, [0, 500], [0, -30]); // Very subtle movement
  
  // Apply spring for smooth animations
  const smoothSkyY = useSpring(skyY, { stiffness: 100, damping: 30 });
  const smoothBuildingsFarY = useSpring(buildingsFarY, { stiffness: 100, damping: 30 });
  const smoothBuildingsNearY = useSpring(buildingsNearY, { stiffness: 100, damping: 30 });
  const smoothPersonY = useSpring(personY, { stiffness: 100, damping: 30 });
  const smoothTitleOpacity = useSpring(titleOpacity, { stiffness: 100, damping: 30 });
  const smoothTitleY = useSpring(titleY, { stiffness: 100, damping: 30 });
  
  return (
    <section ref={containerRef} className={styles.heroSection}>
      {/* Sky Layer - Furthest Back */}
      <motion.div 
        className={`${styles.parallaxLayer} ${styles.skyLayer}`}
        style={{ y: smoothSkyY }}
      >
        <img 
          src="/images/eduhero/sky-background.png" 
          alt="Sky background"
          className={styles.layerImage}
        />
      </motion.div>
      
      {/* Buildings Far Layer */}
      <motion.div 
        className={`${styles.parallaxLayer} ${styles.buildingsFarLayer}`}
        style={{ y: smoothBuildingsFarY }}
      >
        <img 
          src="/images/eduhero/buildings-far.png" 
          alt="Distant buildings"
          className={styles.layerImage}
        />
      </motion.div>
      
      {/* Buildings Near Layer */}
      <motion.div 
        className={`${styles.parallaxLayer} ${styles.buildingsNearLayer}`}
        style={{ y: smoothBuildingsNearY }}
      >
        <img 
          src="/images/eduhero/buildings-near.png" 
          alt="Near buildings"
          className={styles.layerImage}
        />
      </motion.div>
      
      {/* Person Layer - Foreground */}
      <motion.div 
        className={`${styles.parallaxLayer} ${styles.personLayer}`}
        style={{ y: smoothPersonY }}
      >
        <img 
          src="/images/eduhero/person-back.png" 
          alt="Person looking at city"
          className={styles.layerImage}
        />
      </motion.div>
      
      {/* Title Overlay */}
      <motion.div 
        className={styles.titleOverlay}
        style={{ 
          opacity: smoothTitleOpacity,
          y: smoothTitleY 
        }}
      >
        <h1 className={styles.heroTitle}>
          NETWORTH EDUCATION
        </h1>
      </motion.div>
      
      {/* Optional: Scroll Indicator */}
      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;