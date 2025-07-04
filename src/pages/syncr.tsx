import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '../sections/syncr/HeroSection';
import ProblemSection  from '../sections/syncr/ProblemSection';
import WhySyncrSection from '../sections/syncr/WhySyncrSection'; 
import { LayerArchitecture1 } from '../sections/syncr/LayerArchitectureSection1';
import { LayerArchitecture2 } from '../sections/syncr/LayerArchitectureSection2';
import { PerformanceSection } from '../sections/syncr/PerformanceSection';
import { ApplicationsSection } from '../sections/syncr/ApplicationSection';
import { EvolutionTimelineSection } from '../sections/syncr/EvolutionTimelineSection';
import { CTASection } from '../sections/syncr/CTASection';
import  Footer  from '../sections/Footer';

const SYNCR: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = 'SYNCR - Hierarchical Intelligence Architecture | NetWorth';
    
    // Reset scroll position
    window.scrollTo(0, 0);
    
    return () => {
      document.title = 'NetWorth';
    };
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black overflow-x-hidden"
    >
      {/* Hero Section */}
      <HeroSection />
      
      {/* Problem Section - The Babylon Problem */}
      <ProblemSection />

      {/* Why Syncr Section - Bento Grid */}
      <WhySyncrSection />

      {/* Layer Architecture Section - Initial View */}
      <LayerArchitecture1 />

      {/* Layer Architecture Section - Pinned Scroll */}
      <LayerArchitecture2 />

      {/* Performance Showcase */}
      <PerformanceSection />
      
      {/* Real-World Applications */}
      <ApplicationsSection />
      
      {/* Evolution Timeline */}
      <EvolutionTimelineSection />
      
      {/* Call to Action */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </motion.main>
  );
};

export default SYNCR;