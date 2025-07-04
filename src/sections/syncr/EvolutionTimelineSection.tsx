import React, { useRef } from 'react';
import { motion } from 'framer-motion';

// NetWorth brand colors
const colors = {
  black: '#000000',
  white: '#FFFFFF',
  navy: '#0B1929',
  purple: '#6B46C1',
  gold: '#FDB462',
  orange: '#FF8C42'
};

const timelineStages = [
  {
    year: '2024-2025',
    title: 'Foundation',
    subtitle: 'Rule-Based Intelligence with ML Enhancement',
    description: 'Algorithmic routing with pattern recognition. Statistical fairness monitoring. Deterministic physics with predictive modeling. Rule-based trading with ML optimization.',
    milestone: 'Proving hierarchy beats complexity',
    color: colors.gold
  },
  {
    year: '2026-2028',
    title: 'Augmentation',
    subtitle: 'Hybrid Human-AI Intelligence',
    description: 'AI begins suggesting optimizations. Deep learning models enhance each layer. Predictive systems anticipate user needs. Human oversight with AI recommendations.',
    milestone: 'AI amplifies human decisions',
    color: colors.gold
  },
  {
    year: '2031-2035',
    title: 'Autonomy',
    subtitle: 'Artificial General Intelligence Integration',
    description: 'Self-designing systems. Autonomous domain evolution. AGI-level understanding. Human partnership, not replacement.',
    milestone: 'Consciousness emerges from hierarchy',
    color: colors.gold
  }
];

export const EvolutionTimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden" style={{ backgroundColor: colors.black }}>
      <div className="container mx-auto px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.3em] mb-6 font-inter" style={{ color: colors.gold }}>
            BUILT FOR TOMORROW'S AI
          </p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-space-grotesk" style={{ color: colors.white }}>
            THE ONLY ARCHITECTURE THAT EVOLVES<br />
            WITH INTELLIGENCE
          </h2>
          <p className="text-xl max-w-4xl mx-auto font-inter" style={{ color: colors.white + '99' }}>
            Most systems are built for today's AI and break with tomorrow's. SYNCR is designed to grow stronger as AI evolves—from current machine learning to future artificial general intelligence.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Background line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2" 
            style={{ backgroundColor: colors.white + '20' }} />
          
          {/* Progress line - fully visible */}
          <div 
            className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2"
            style={{ 
              background: `linear-gradient(90deg, ${colors.gold} 0%, ${colors.gold} 50%, ${colors.gold} 100%)`
            }}
          />

          {/* Timeline stages */}
          <div className="relative grid grid-cols-3 gap-8">
            {timelineStages.map((stage, index) => (
              <motion.div
                key={stage.year}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Timeline dot */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2">
                  <div
                    className="w-6 h-6 rounded-full border-4 shadow-lg"
                    style={{
                      backgroundColor: stage.color,
                      borderColor: colors.black,
                    }}
                  />
                  {/* Pulse effect on hover */}
                  <div
                    className="absolute inset-0 rounded-full animate-pulse"
                    style={{
                      backgroundColor: stage.color,
                      opacity: 0.3,
                    }}
                  />
                </div>

                {/* Content card */}
                <motion.div
                  className="mt-12 p-10 rounded-3xl backdrop-blur-sm"
                  style={{ 
                    background: `linear-gradient(135deg, ${stage.color}10 0%, ${colors.navy}20 100%)`,
                    border: `1px solid ${stage.color}30`
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div>
                    <span className="text-sm font-space-grotesk" style={{ color: stage.color + '99' }}>{stage.year}</span>
                    <h3 className="text-4xl font-bold mt-2 mb-2 font-space-grotesk" style={{ color: colors.white }}>{stage.title}</h3>
                    <p className="text-xl mb-6 font-inter" style={{ color: stage.color }}>{stage.subtitle}</p>
                    <p className="mb-8 leading-relaxed font-inter" style={{ color: colors.white + '99' }}>
                      {stage.description}
                    </p>
                    <div className="pt-6" style={{ borderTop: `1px solid ${colors.white}10` }}>
                      <p className="text-sm font-inter" style={{ color: colors.white + '60' }}>
                        <span>Key Milestone:</span>
                        <span className="block mt-2 text-lg italic font-space-grotesk" style={{ color: stage.color }}>
                          "{stage.milestone}"
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold mb-12 font-space-grotesk" style={{ color: colors.white }}>
              Why SYNCR Survives the Evolution
            </h3>
            <div className="grid grid-cols-2 gap-8 text-left">
              <div className="p-8 rounded-2xl" style={{ 
                backgroundColor: colors.gold + '10',
                border: `1px solid ${colors.gold}30`
              }}>
                <h4 className="font-bold mb-4 font-space-grotesk" style={{ color: colors.gold }}>Traditional Systems</h4>
                <ul className="space-y-3 text-sm font-inter" style={{ color: colors.white + '80' }}>
                  <li>• Built for specific AI capabilities</li>
                  <li>• Require complete rebuilds for new AI</li>
                  <li>• Break under increased intelligence</li>
                  <li>• Cannot adapt to AGI</li>
                </ul>
              </div>
              <div className="p-8 rounded-2xl" style={{ 
                backgroundColor: colors.gold + '10',
                border: `1px solid ${colors.gold}30`
              }}>
                <h4 className="font-bold mb-4 font-space-grotesk" style={{ color: colors.gold }}>SYNCR's Design</h4>
                <ul className="space-y-3 text-sm font-inter" style={{ color: colors.white + '80' }}>
                  <li>• Each layer evolves separately</li>
                  <li>• New concepts integrate naturally</li>
                  <li>• Complexity stays linear</li>
                  <li>• AGI considered from day one</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Vision quote */}
          <motion.div
            className="mt-16 p-12 rounded-3xl"
            style={{ 
              background: `linear-gradient(135deg, ${colors.gold}10 0%, ${colors.gold}10 100%)`,
              border: `1px solid ${colors.gold}20`
            }}
            whileInView={{ scale: [0.95, 1] }}
            viewport={{ once: true }}
          >
            <p className="text-2xl font-light italic leading-relaxed font-inter" style={{ color: colors.white }}>
              "In 2035, every AGI system will use hierarchical architecture. 
              The only question is whether they'll license SYNCR or spend a decade trying to reinvent it."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};