import { motion, Variants } from 'framer-motion';
import type { FC } from 'react';
import Image from 'next/image';

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  icon?: string;
  accentColor?: 'orange' | 'red' | 'white';
}

const Card: FC<CardProps> = ({ 
  title, 
  description, 
  image, 
  icon, 
  accentColor = 'white'
}) => {
  const accentColors = {
    'orange': '#fdb462',
    'red': '#ff2e2e',
    'white': '#ffffff'
  };

  const isSmallCard = icon && !image;
  const titleSize = isSmallCard ? 'text-lg' : 'text-xl lg:text-2xl xl:text-3xl';

  return (
    <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl border border-white/10 bg-white/[0.03] p-6 group cursor-pointer h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:border-white/20"
      style={{
        boxShadow: '0 8px 32px 0 rgba(253, 179, 98, 0.37)'
      }}
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {icon && (
          <div className="mb-4">
            <Image
              src={`/images/why-syncr/${icon}`}
              alt={title}
              width={48}
              height={48}
              className="opacity-80"
            />
          </div>
        )}
        
        <h3 className={`font-bold text-white mb-3 ${titleSize}`}>
          {title}
          {accentColor !== 'white' && (
            <span style={{ color: accentColors[accentColor] }}>.</span>
          )}
        </h3>
        
        {description && (
          <p className="text-white/90 text-sm lg:text-base leading-relaxed flex-grow">
            {description}
          </p>
        )}
        
        {image && !icon && (
          <div className="mt-auto pt-4">
            <div className="relative h-32 lg:h-48 rounded-lg overflow-hidden">
              <Image
                src={`/images/whysyncr/${image}`}
                alt={title}
                fill
                className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const WhySyncr: FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 lg:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-9xl lg:text-7xl font-semibold text-white mb-4">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-500">SYNCR</span>
          </h2>
          <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto">
            Traditional architectures fail at scale. SYNCR solves the fundamental problems.
          </p>
        </motion.div>

        {/* Bento Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]"
        >
          {/* Large Card 1 - Row 1-2, Col 1-2 */}
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-2 md:row-span-2"
          >
            <Card
              title="The Babylon Problem Solved"
              description="Traditional microservices create O(n²) connections, leading to exponential complexity. SYNCR's hierarchical architecture reduces this to O(n), making large systems manageable."
              image="babylon-problem.png"
              
            />
          </motion.div>

          {/* Large Card 2 - Row 1-2, Col 3-4 */}
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-2 md:row-span-2"
          >
            <Card
              title="Independent Yet Unified"
              description="Layer Agents operate autonomously within their domains while Minerva orchestrates global harmony. Like planets orbiting independently yet bound by gravity."
              image="independent-unified.png"
              
            />
          </motion.div>

          {/* Medium Horizontal 1 - Row 3, Col 1-2 */}
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-2"
          >
            <Card
              title="Domains Speak Their Own Language"
              description="Each domain uses natural concepts. Minerva translates seamlessly, preserving meaning without forcing uniformity."
            />
          </motion.div>

          {/* Medium Horizontal 2 - Row 3, Col 3-4 */}
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-2"
          >
            <Card
              title="Built for Gaming's Impossible Demands"
              description="Sub-10ms trading latency. 60Hz physics. Real-time fairness. SYNCR handles it all without compromise."
            />
          </motion.div>

          {/* Small Card 1 - Row 4, Col 1 */}
          <motion.div variants={itemVariants}>
            <Card
              title="Platform Evolves as Technology advances"
            />
          </motion.div>

          {/* Small Card 2 - Row 4, Col 2 */}
          <motion.div variants={itemVariants}>
            <Card
              title="Biological Wisdom"
            />
          </motion.div>

          {/* Medium Vertical 1 - Row 4-5, Col 3 */}
          <motion.div 
            variants={itemVariants} 
            className="row-span-2"
          >
            <Card
              title="Emergency Override"
              description="When milliseconds matter, Minerva can bypass all protocols and directly command any sub-agent. Complete system halt in <50ms with full audit trail."
              image="emergency.png"
            />
          </motion.div>

          {/* Medium Vertical 2 - Row 4-5, Col 4 */}
          <motion.div 
            variants={itemVariants} 
            className="row-span-2"
          >
            <Card
              title="Semantic Drift Eliminated"
              description="Concepts evolve independently per domain without breaking integration. The ontology adapts, connections persist."
              image="evolution.png"
            />
          </motion.div>

          {/* Small Card 3 - Row 5, Col 1 */}
          <motion.div variants={itemVariants}>
            <Card
              title="Hot Swap Evolution"
            />
          </motion.div>

          {/* Small Card 4 - Row 5, Col 2 */}
          <motion.div variants={itemVariants}>
            <Card
              title="Minerva-Ready, Not Dependent"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySyncr;