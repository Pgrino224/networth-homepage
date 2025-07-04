import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '@/styles/sections/educational/CarouselSection.module.css';

interface CardData {
  id: number;
  title: string;
  description: string;
  imagePath: string;
}

const cards: CardData[] = [
  {
    id: 1,
    title: "Enter Any Realm",
    description: "Step into Arion, Augur, Colossoria, Erebus, or Ishtar.",
    imagePath: "/images/educational/enter-realm.png"
  },
  {
    id: 2,
    title: "Make Decisions Under Pressure",
    description: "Act inside volatility, timing, and risk.",
    imagePath: "/images/educational/decisions.png"
  },
  {
    id: 3,
    title: "Get Instant Feedback",
    description: "Receive real-time feedback on your performances post-game.",
    imagePath: "/images/educational/feedback.png"
  },
  {
    id: 4,
    title: "Gain or Burn NetWorth",
    description: "Your NetWorth shifts. Traits evolve or decay.",
    imagePath: "/images/educational/networth.png"
  },
  {
    id: 5,
    title: "Adapt and Re-enter",
    description: "Adapt your strategy. Improve your next outcome.",
    imagePath: "/images/educational/adapt.png"
  }
];

const CarouselSection: React.FC = () => {
  const [dimensions, setDimensions] = useState({
    containerSize: 840,
    radius: 392,
    svgCenter: 420,
    horizontalOffset: 98, // Half of card width (196px) to align center with circle
    verticalOffset: 60
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width <= 400) {
        setDimensions({
          containerSize: 360,
          radius: 160,
          svgCenter: 180,
          horizontalOffset: 50, // Half of card width (100px) for small mobile
          verticalOffset: 32 // Adjust vertical offset for small mobile
        });
      } else if (width <= 768) {
        setDimensions({
          containerSize: 500,
          radius: 230,
          svgCenter: 250,
          horizontalOffset: 70, // Half of card width (140px) for mobile
          verticalOffset: 48 // Adjust vertical offset for mobile
        });
      } else if (width <= 1024) {
        setDimensions({
          containerSize: 700,
          radius: 320,
          svgCenter: 350,
          horizontalOffset: 84, // Half of card width (168px) for tablet
          verticalOffset: 60 // Adjust vertical offset for tablet
        });
      } else {
        setDimensions({
          containerSize: 840,
          radius: 392,
          svgCenter: 420,
          horizontalOffset: 98, // Half of card width (196px) for desktop
          verticalOffset: 80 // Adjust vertical offset for desktop
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Calculate card positions in a circle with horizontal offset
  const getCardPosition = (index: number, total: number) => {
    const angle = (index * 360 / total) - 90; // Start from top
    const x = Math.cos(angle * Math.PI / 180) * dimensions.radius - dimensions.horizontalOffset; // Subtract offset to move left
    const y = Math.sin(angle * Math.PI / 180) * dimensions.radius - dimensions.verticalOffset;
    return { x, y };
  };

  return (
    <section className={styles.feedbackLoopSection}>
      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Title */}
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          NETWORTH LEARNING FEEDBACK LOOP
        </motion.h2>

        {/* Feedback Loop Container */}
        <div className={styles.feedbackLoop}>
          {/* Rotating Connection Line */}
          <motion.div 
            className={styles.rotatingLineContainer}
            animate={{ rotate: 360 }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <svg className={styles.connectionLine} viewBox={`0 0 ${dimensions.containerSize} ${dimensions.containerSize}`}>
              <circle
                cx={dimensions.svgCenter}
                cy={dimensions.svgCenter}
                r={dimensions.radius}
                fill="none"
                stroke="#FDB462"
                strokeWidth="2"
                strokeDasharray="12 8"
                opacity="0.8"
              />
            </svg>
          </motion.div>

          {/* Glassmorphism Cards */}
          {cards.map((card, index) => {
            const position = getCardPosition(index, cards.length);
            return (
              <motion.div
                key={card.id}
                className={styles.card}
                style={{
                  left: `calc(50% + ${position.x}px)`,
                  top: `calc(50% + ${position.y}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
                variants={cardVariants}
              >
                <div className={styles.cardInner}>
                  <div className={styles.cardImageContainer}>
                    <Image
                      src={card.imagePath}
                      alt={card.title}
                      width={84}
                      height={84}
                      className={styles.cardImage}
                    />
                  </div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDescription}>{card.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default CarouselSection;