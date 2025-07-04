import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import styles from '@/styles/sections/educational/StatisticsSection.module.css';

interface Statistic {
  value: number;
  suffix: string;
  description: string;
}

const statistics: Statistic[] = [
  {
    value: 72,
    suffix: '%',
    description: 'higher motivation when learning via simulation than lecture'
  },
  {
    value: 60,
    suffix: '%',
    description: 'feel more comfort and comprehension'
  },
  {
    value: 9,
    suffix: '%',
    description: 'boost in memory retention'
  },
  {
    value: 68,
    suffix: '%',
    description: 'report of improved worker productivity'
  }
];

// 3D Counter Text Component with proper types
interface Counter3DProps {
  value: number;
  suffix: string;
  inView: boolean;
  position: [number, number, number];
  delay?: number;
}

function Counter3D({ value, suffix, inView, position, delay = 0 }: Counter3DProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);
  
  useEffect(() => {
    if (inView) {
      const animation = animate(count, value, {
        duration: 2,
        ease: 'easeOut',
        delay: delay,
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        }
      });
      return animation.stop;
    }
  }, [inView, value, count, delay]);

  return (
    <Text
      fontSize={1.2}
      anchorX="center"
      anchorY="middle"
      position={position}
    >
      {displayValue}{suffix}
      <meshStandardMaterial 
        color="#FDB462" 
        emissive="#FDB462"
        emissiveIntensity={0.5}
      />
    </Text>
  );
}

// 3D Stat Component
interface Stat3DProps {
  stat: Statistic;
  index: number;
  position: [number, number, number];
  inView: boolean;
}

function Stat3D({ stat, index, position, inView }: Stat3DProps) {
  const colors = ['#FDB462', '#FF8C42', '#FDB462', '#FF8C42'];
  const color = colors[index];

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.3}
      floatingRange={[-0.05, 0.05]}
    >
      <group position={position}>
        {/* Counter */}
        <Counter3D 
          value={stat.value} 
          suffix={stat.suffix} 
          inView={inView}
          position={[0, 0.3, 0]}
          delay={index * 0.2}
        />
        
        {/* Description text */}
        <Text
          fontSize={0.234}
          color="#ffffff"
          anchorX="center"
          anchorY="top"
          position={[0, -0.5, 0]}
          maxWidth={3.2}
          textAlign="center"
        >
          {stat.description}
          <meshStandardMaterial color="#ffffff" opacity={0.8} transparent />
        </Text>
      </group>
    </Float>
  );
}

// Background Particle Field - covers entire section
function ParticleField() {
  const particles = useRef<THREE.Points>(null);
  const count = 500; // Increased for full coverage
  
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    // Much wider spread for full section coverage
    positions[i * 3] = (Math.random() - 0.5) * 60;     // Increased horizontal spread
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;  // Increased vertical spread
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    
    // All particles in pure gold #FDB462
    colors[i * 3] = 0.992;      // 253/255
    colors[i * 3 + 1] = 0.706;  // 180/255  
    colors[i * 3 + 2] = 0.384;  // 98/255
  }
  
  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.01;  // Slower for subtlety
      particles.current.rotation.x = state.clock.elapsedTime * 0.005;
    }
  });
  
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.09}  // Slightly smaller
        vertexColors 
        transparent 
        opacity={0.25}  // More subtle opacity
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Camera Controller
interface CameraControllerProps {
  scrollProgress: number;
}

function CameraController({ scrollProgress }: CameraControllerProps) {
  const { camera } = useThree();
  
  useFrame(() => {
    // Subtle camera movement
    camera.position.z = 8 - scrollProgress * 0.3;
    camera.rotation.y = scrollProgress * 0.05;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Main Component
const StatisticsSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Statistics positions - moved up in Y to be closer to text
  const positions: [number, number, number][] = [
    [-6.5, -1.5, 0],    // Raised Y position
    [-2.2, -1.5, 0],    
    [2.2,  -1.5, 0],     
    [6.5, -1.5, 0]      
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className={styles.statisticsSection} ref={ref}>
      {/* Full-section background canvas */}
      <div className={styles.canvasBackground}>
        <Canvas
          camera={{ position: [0, 2, 8], fov: 70 }}  // Adjusted Y position
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          className={styles.canvas}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#FDB462" />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#FF8C42" />
          
          <ParticleField />
          
          {statistics.map((stat, index) => (
            <Stat3D
              key={index}
              stat={stat}
              index={index}
              position={positions[index]}
              inView={isInView}
            />
          ))}
          
          <CameraController scrollProgress={scrollYProgress.get()} />
          
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Content overlay */}
      <motion.div 
        className={styles.contentContainer}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 
          className={styles.title}
          variants={itemVariants}
        >
          Role-Playing Education
        </motion.h2>
        
        <motion.p 
          className={styles.description}
          variants={itemVariants}
        >
          Role-Playing Education infuses role-playing game (RPG) mechanics, such as avatars, 
          narrative quests, levels, and feedback loops into education. In RPE, learning feels 
          like an adventure, rather than simply absorbing theory, they experience it through 
          dynamic adventures.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default StatisticsSection;