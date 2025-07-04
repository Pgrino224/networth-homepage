import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Box, Sphere } from '@react-three/drei';

// NetWorth brand colors
const colors = {
  black: '#000000',
  white: '#FFFFFF',
  navy: '#0B1929',
  purple: '#6B46C1',
  gold: '#FDB462',
  orange: '#FF8C42'
};

// Industry icons mapping
const industryIcons = {
  automotive: '🚗',
  smartCity: '🏙️',
  healthcare: '🏥',
  finance: '💹'
};

// 3D visualization for each industry
const IndustryVisualization = ({ type }: { type: keyof typeof industryIcons }) => {
  const visualizations = {
    automotive: (
      <group>
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <Float key={i} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <Box 
                position={[Math.cos(angle) * 3, 0, Math.sin(angle) * 3]}
                args={[0.8, 0.4, 1.2]}
              >
                <meshStandardMaterial color={colors.gold} metalness={0.8} roughness={0.2} />
              </Box>
            </Float>
          );
        })}
      </group>
    ),
    smartCity: (
      <group>
        {Array.from({ length: 9 }).map((_, i) => {
          const x = (i % 3 - 1) * 2;
          const z = (Math.floor(i / 3) - 1) * 2;
          const height = Math.random() * 2 + 1;
          return (
            <Box key={i} position={[x, height / 2, z]} args={[0.8, height, 0.8]}>
              <meshStandardMaterial color={colors.gold} metalness={0.6} roughness={0.3} />
            </Box>
          );
        })}
      </group>
    ),
    healthcare: (
      <group>
        <Sphere args={[2, 32, 32]}>
          <meshStandardMaterial color={colors.orange} wireframe transparent opacity={0.3} />
        </Sphere>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <Sphere 
              key={i}
              position={[Math.cos(angle) * 2, Math.sin(angle) * 2, 0]}
              args={[0.3]}
            >
              <meshStandardMaterial color={colors.white} emissive={colors.orange} emissiveIntensity={0.5} />
            </Sphere>
          );
        })}
      </group>
    ),
    finance: (
      <group>
        {Array.from({ length: 20 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 4;
          const y = Math.random() * 3;
          const z = (Math.random() - 0.5) * 4;
          return (
            <Float key={i} speed={3} floatIntensity={1}>
              <Box position={[x, y, z]} args={[0.1, 0.5, 0.1]}>
                <meshStandardMaterial 
                  color={Math.random() > 0.5 ? colors.gold : colors.purple} 
                  emissive={Math.random() > 0.5 ? colors.gold : colors.purple}
                  emissiveIntensity={0.5}
                />
              </Box>
            </Float>
          );
        })}
      </group>
    )
  };

  return visualizations[type] || null;
};

// Industry card component
const IndustryCard = ({ 
  industry, 
  title, 
  challenge, 
  solution, 
  impact,
  layers,
  index 
}: {
  industry: keyof typeof industryIcons;
  title: string;
  challenge: string;
  solution: string;
  impact: string;
  layers: string[];
  index: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="relative rounded-3xl overflow-hidden cursor-pointer"
      style={{ 
        background: `linear-gradient(135deg, ${colors.navy}80 0%, ${colors.black} 100%)`,
        border: `1px solid ${colors.black}20`
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* 3D Visualization */}
      <div className="h-64 relative" style={{ backgroundColor: colors.black + '40' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <IndustryVisualization type={industry} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
        
        {/* Industry icon overlay */}
        <div className="absolute top-4 left-4 text-4xl rounded-xl p-3"
          style={{ 
            backgroundColor: colors.purple + '20',
            backdropFilter: 'blur(10px)'
          }}>
          {industryIcons[industry]}
        </div>
      </div>

      {/* Content */}
      <div className="p-10">
        <h3 className="text-3xl font-bold mb-6 font-space-grotesk" style={{ color: colors.white }}>
          {title}
        </h3>
        
        <div className="space-y-6 font-inter">
          <div>
            <h4 className="text-xs font-semibold mb-2 tracking-wider" style={{ color: colors.gold }}>
              THE CHALLENGE
            </h4>
            <p style={{ color: colors.white + '99' }}>{challenge}</p>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 overflow-hidden"
              >
                <div>
                  <h4 className="text-xs font-semibold mb-2 tracking-wider" style={{ color: colors.purple }}>
                    SYNCR SOLUTION
                  </h4>
                  <p style={{ color: colors.white + '99' }}>{solution}</p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold mb-3 tracking-wider" style={{ color: colors.purple }}>
                    LAYER MAPPING
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {layers.map((layer, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full text-sm font-inter"
                        style={{ 
                          backgroundColor: colors.purple + '20',
                          color: colors.purple,
                          border: `1px solid ${colors.purple}40`
                        }}
                      >
                        {layer}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${colors.white}10` }}>
          <p className="text-xl font-bold font-space-grotesk"
            style={{ 
              background: `linear-gradient(90deg, ${colors.purple} 0%, ${colors.gold} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
            {impact}
          </p>
        </div>

        {/* Expand indicator */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="absolute bottom-4 right-4"
          style={{ color: colors.white + '40' }}
        >
          ▼
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ApplicationsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const floatY1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const applications = [
    {
      industry: 'automotive' as const,
      title: 'Autonomous Vehicle Networks',
      challenge: 'Every self-driving car is an AI system that must coordinate with thousands of others in real-time while maintaining safety.',
      solution: 'Each vehicle becomes a node in the network with dedicated layers for perception, navigation, safety, and traffic coordination.',
      impact: 'From 10,000 individual cars to one intelligent traffic symphony',
      layers: ['StarkSync: Learning', 'ParaSync: Physics', 'JuriSync: Safety', 'StrataSync: Routing', 'WyrSync: Reactions', 'AmpliSync: Feedback']
    },
    {
      industry: 'smartCity' as const,
      title: 'Smart City Infrastructure',
      challenge: 'Cities manage power grids, traffic systems, emergency services, and citizen needs—all requiring real-time coordination.',
      solution: 'City services organized hierarchically with layers for energy, transport, emergency response, and citizen interaction.',
      impact: 'Reducing city response times from minutes to seconds',
      layers: ['Energy Layer', 'Transport Layer', 'Emergency Layer', 'Citizen Layer', 'Analytics Layer', 'Experience Layer']
    },
    {
      industry: 'healthcare' as const,
      title: 'Healthcare Coordination',
      challenge: 'Patient data scattered across providers, treatments need coordination, privacy must be maintained.',
      solution: 'Healthcare domains working in harmony with secure patient records, AI-assisted treatment, and real-time resource management.',
      impact: 'From fragmented care to unified healing',
      layers: ['Patient Records', 'Treatment Planning', 'Resource Management', 'Research Integration', 'Insurance Processing', 'Patient Experience']
    },
    {
      industry: 'finance' as const,
      title: 'Financial Market Infrastructure',
      challenge: 'Markets require microsecond execution, real-time risk assessment, and regulatory compliance—simultaneously.',
      solution: 'Financial operations at the speed of light with dedicated layers for trading, risk, compliance, and analytics.',
      impact: 'Making markets faster AND fairer',
      layers: ['Trading Execution', 'Risk Analysis', 'Compliance Monitoring', 'Market Analytics', 'Client Services', 'Experience Delivery']
    }
  ];

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden" style={{ backgroundColor: colors.black }}>
      {/* Floating background elements */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: floatY1 }}
      >
        <div className="absolute top-20 left-10 text-8xl">🌐</div>
        <div className="absolute bottom-20 right-20 text-8xl">🔗</div>
      </motion.div>
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: floatY2 }}
      >
        <div className="absolute top-40 right-10 text-8xl">🧬</div>
        <div className="absolute bottom-40 left-20 text-8xl">⚡</div>
      </motion.div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.3em] mb-6 font-inter" style={{ color: colors.gold }}>
            UNIVERSAL ARCHITECTURE
          </p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-space-grotesk" style={{ color: colors.white }}>
            ONE ARCHITECTURE.<br />
            INFINITE APPLICATIONS.
          </h2>
          <p className="text-xl max-w-3xl mx-auto font-inter" style={{ color: colors.white + '99' }}>
            The same hierarchical intelligence that powers gaming can transform 
            any industry requiring coordinated AI systems.
          </p>
        </motion.div>

        {/* Industry cards grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {applications.map((app, index) => (
            <IndustryCard key={app.industry} {...app} index={index} />
          ))}
        </div>

        {/* The Pattern */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h3 className="text-5xl font-bold mb-12 font-space-grotesk" style={{ color: colors.white }}>
            The Pattern Is Clear
          </h3>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-10 rounded-3xl" style={{ 
              background: `linear-gradient(135deg, ${colors.orange}10 0%, ${colors.navy}20 100%)`,
              border: `1px solid ${colors.orange}30`
            }}>
              <h4 className="text-2xl font-bold mb-6 font-space-grotesk" style={{ color: colors.orange }}>
                Every Industry Faces
              </h4>
              <ul className="space-y-3 font-inter" style={{ color: colors.white + '99' }}>
                <li>• Too many connections</li>
                <li>• No unified coordination</li>
                <li>• Cascading failures</li>
                <li>• Exponential complexity</li>
              </ul>
            </div>
            <div className="p-10 rounded-3xl" style={{ 
              background: `linear-gradient(135deg, ${colors.gold}10 0%, ${colors.navy}20 100%)`,
              border: `1px solid ${colors.gold}30`
            }}>
              <h4 className="text-2xl font-bold mb-6 font-space-grotesk" style={{ color: colors.gold }}>
                SYNCR Provides
              </h4>
              <ul className="space-y-3 font-inter" style={{ color: colors.white + '99' }}>
                <li>• Hierarchical organization</li>
                <li>• Intelligent orchestration</li>
                <li>• Isolated resilience</li>
                <li>• Linear complexity</li>
              </ul>
            </div>
          </div>

          <motion.p
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-light font-inter"
            style={{ color: colors.white }}
          >
            SYNCR's hierarchical architecture solves them all.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};