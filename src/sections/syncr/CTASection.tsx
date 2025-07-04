import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { colors } from './constants';

// CTA Card component
const CTACard = ({ 
  title, 
  subtitle, 
  description, 
  items, 
  buttonText, 
  buttonColor,
  delay = 0 
}: {
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  buttonText: string;
  buttonColor: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="h-full flex flex-col rounded-2xl border border-gray-800"
      style={{ 
        background: `linear-gradient(135deg, ${colors.navy}20 0%, ${colors.black} 100%)` 
      }}
    >
      <div className="p-8 flex-grow">
        <h3 className="text-2xl font-bold text-white mb-2 font-space-grotesk">{title}</h3>
        <p className="font-semibold mb-4" style={{ color: colors.gold }}>{subtitle}</p>
        <p className="text-gray-300 mb-6 font-inter">{description}</p>
        
        <div className="space-y-2 mb-8">
          {items.map((item, i) => (
            <div key={i} className="flex items-start">
              <span className="mr-2" style={{ color: colors.gold }}>•</span>
              <span className="text-gray-400 text-sm font-inter">{item}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-8 pt-0">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 rounded-lg font-semibold text-white font-space-grotesk
            transition-all duration-300 shadow-lg hover:shadow-xl"
          style={{ backgroundColor: buttonColor }}
        >
          {buttonText}
        </motion.button>
      </div>
    </motion.div>
  );
};

export const CTASection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax background
  const backgroundY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden" 
      style={{ backgroundColor: colors.black }}>
      
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          y: backgroundY,
          background: `radial-gradient(circle at 50% 50%, ${colors.purple}20 0%, transparent 70%)`
        }}
      />

      <div className="container mx-auto px-8 relative z-10">
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 font-space-grotesk" 
            style={{ color: colors.white }}>
            READY TO BUILD THE FUTURE OF<br />
            <span style={{ color: colors.gold }}>DISTRIBUTED INTELLIGENCE?</span>
          </h2>
        </motion.div>

        {/* CTA Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <CTACard
            title="For Investors"
            subtitle="Schedule Architecture Deep Dive"
            description="See the system that transforms complexity into opportunity."
            items={[
              "Live system demonstration",
              "Performance benchmarks verified",
              "Roadmap to AGI integration",
              "Market opportunity analysis"
            ]}
            buttonText="SCHEDULE INVESTMENT REVIEW"
            buttonColor={colors.black}
            delay={0}
          />
          
          <CTACard
            title="For Enterprises"
            subtitle="Custom Implementation Workshop"
            description="Discover how SYNCR transforms your industry."
            items={[
              "Architecture mapping session",
              "Integration pathway assessment",
              "ROI projections with timelines",
              "Pilot program framework"
            ]}
            buttonText="REQUEST ENTERPRISE DEMO"
            buttonColor={colors.black}
            delay={0.1}
          />
          
          <CTACard
            title="For Developers"
            subtitle="Access Technical Resources"
            description="Build with the architecture of tomorrow."
            items={[
              "Complete documentation",
              "API specifications and SDKs",
              "Integration guidelines",
              "Discord community access"
            ]}
            buttonText="EXPLORE DOCUMENTATION"
            buttonColor={colors.black}
            delay={0.2}
          />
          
          <CTACard
            title="For Researchers"
            subtitle="Academic Collaboration"
            description="Push the boundaries of distributed AI."
            items={[
              "Research partnerships",
              "Publication opportunities",
              "Conference speaking",
              "Grant application support"
            ]}
            buttonText="DOWNLOAD WHITEPAPER"
            buttonColor={colors.black}
            delay={0.3}
          />
        </div>

        {/* Final thought */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="p-12 rounded-2xl border"
            style={{ 
              borderColor: `${colors.gold}40`,
              background: `linear-gradient(135deg, ${colors.gold}10 0%, transparent 100%)`
            }}>
            <p className="text-2xl font-light leading-relaxed mb-8 font-inter" 
              style={{ color: colors.white }}>
              "Every breakthrough in computing started with someone saying 'there must be a better way.' 
              From mainframes to PCs, from desktop to mobile, from cloud to AI.
            </p>
            <p className="text-3xl font-bold font-space-grotesk" style={{ color: colors.gold }}>
              Today, that better way is hierarchical intelligence.
            </p>
            <p className="text-xl mt-4 font-inter" style={{ color: colors.white }}>
              Tomorrow, it will be the only way.
            </p>
          </div>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 text-xl font-bold rounded-xl font-space-grotesk
              shadow-2xl transition-all duration-300"
            style={{ 
              background: `linear-gradient(135deg, ${colors.black} 0%, ${colors.orange} 100%)`,
              color: colors.white
            }}
          >
            START YOUR JOURNEY
          </motion.button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-20 text-center"
        >
          <div className="flex flex-wrap justify-center gap-8 text-sm font-inter"
            style={{ color: colors.white + '60' }}>
            <span>Architecture documented in comprehensive technical reference</span>
            <span>•</span>
            <span>Designed for scalability from day one</span>
            <span>•</span>
            <span>Built on proven hierarchical principles</span>
            <span>•</span>
            <span>Ready for evolution to AGI</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};