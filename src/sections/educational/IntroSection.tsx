import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from '@/styles/sections/educational/IntroSection.module.css';

interface QuoteSegment {
  id: number;
  text: string;
  type: 'opening' | 'statement' | 'closing';
  alignment?: 'left' | 'center' | 'right';
}

const QuoteSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Function to highlight NetWorth with enhanced styling
  const highlightNetWorth = (text: string) => {
    const parts = text.split(/(NetWorth)/g);
    return parts.map((part, index) => {
      if (part === 'NetWorth') {
        return (
          <motion.span 
            key={index} 
            className={styles.networthHighlight}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {part}
          </motion.span>
        );
      }
      return part;
    });
  };

  // Restructured quote segments for cinematic treatment
  const quoteSegments: QuoteSegment[] = [
    {
      id: 1,
      text: "For too long, the skill of acquiring and defending capital has been protected by institutions. Taught behind sealed doors, practiced through backtested labs, and hidden beneath layers of inaccessible theory.",
      type: 'opening',
      alignment: 'left'
    },
    {
      id: 2,
      text: "This is the ultimate form of learning for anyone ready to step in, with no gatekeepers, no legacy advantage—just decision, consequence, and growth.",
      type: 'closing',
      alignment: 'right'
    }
  ];

  // Enhanced animation variants for different segment types
  const segmentVariants = {
    opening: {
      hidden: { opacity: 0, y: 30, x: -20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          delay: i * 0.4,
        },
      }),
    },
    statement: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
          duration: 1.2,
          ease: [0.34, 1.56, 0.64, 1],
          delay: i * 0.5,
        },
      }),
    },
    closing: {
      hidden: { opacity: 0, y: 30, x: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          delay: i * 0.3,
        },
      }),
    },
  };

  return (
    <section className={styles.quoteSection} ref={containerRef}>
      <div className={styles.quoteContainer}>
        {quoteSegments.map((segment, index) => (
          <motion.div
            key={segment.id}
            className={`${styles.quoteSegment} ${styles[segment.type]} ${styles[segment.alignment || '']}`}
            custom={index}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={segmentVariants[segment.type]}
          >
            <motion.p 
              className={styles.quoteText}
              whileInView={{ 
                y: [0, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
              }}
            >
              {highlightNetWorth(segment.text)}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default QuoteSection;