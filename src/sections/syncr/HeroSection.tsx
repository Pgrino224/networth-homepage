import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// NetWorth brand colors
const colors = {
  black: '#000000',
  white: '#FFFFFF',
  navy: '#0B1929',
  red: '#FF2E2E',
  gold: '#FDB462',
  orange: '#FF8C42'
};

// Animated counter component
const AnimatedCounter = ({ value, suffix = '', prefix = '', duration = 2 }: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const startTime = Date.now();
      const endValue = value;
      
      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(endValue * easeOutQuart);
        
        setCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      
      requestAnimationFrame(updateCount);
    }
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="font-mono">
      {prefix}{count}{suffix}
    </div>
  );
};

// Neural network background
const NeuralNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Create network nodes */}
      {Array.from({ length: 50 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 10;
        
        return (
          <Sphere key={i} position={[x, y, z]} args={[0.1]}>
            <meshBasicMaterial color={colors.red} />
          </Sphere>
        );
      })}
    </group>
  );
};

// Chaos to order visualization
const ChaosToOrder = ({ progress }: { progress: number }) => {
  const [nodes] = useState(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 8,
    }))
  );

  // Calculate connections based on progress
  const connections = [];
  const connectionCount = Math.floor((1 - progress) * 105);
  
  for (let i = 0; i < Math.min(connectionCount, 105); i++) {
    const from = nodes[i % nodes.length];
    const to = nodes[(i + 1 + Math.floor(i / nodes.length)) % nodes.length];
    connections.push({ from, to });
  }

  return (
    <group>
      {/* Nodes */}
      {nodes.map((node) => (
        <group
          key={node.id}
          position={[
            progress > 0.5 ? node.x * 0.5 : node.x,
            progress > 0.5 ? node.y * 0.5 : node.y,
            progress > 0.5 ? node.z * 0.5 : node.z,
          ]}
        >
          <Sphere args={[0.2]}>
            <meshBasicMaterial color={progress > 0.7 ? colors.gold : colors.orange} />
          </Sphere>
        </group>
      ))}
      
      {/* Connections as lines */}
      {connections.map((conn, i) => (
        <line key={i} opacity={1 - progress}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                conn.from.x, conn.from.y, conn.from.z,
                conn.to.x, conn.to.y, conn.to.z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={colors.orange} opacity={0.3} transparent />
        </line>
      ))}
    </group>
  );
};

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth spring animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effects
  const backgroundY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const contentY = useTransform(smoothProgress, [0, 1], [0, -100]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  // Chaos to order progress
  const chaosProgress = useTransform(smoothProgress, [0, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[100vh]" style={{ backgroundColor: colors.black }}>
      {/* Fixed hero content */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D Background */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: backgroundY, opacity }}
        >
          <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
            <ambientLight intensity={0.1} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            
            {/* Neural network background */}
            <group>
              <NeuralNetwork />
            </group>
            
            {/* Chaos to order visualization */}
            <group>
              <ChaosToOrder progress={chaosProgress.get()} />
            </group>
          </Canvas>
        </motion.div>

        {/* Main content */}
        <motion.div 
          className="relative z-10 h-full flex flex-col items-center justify-center px-8"
          style={{ y: contentY }}
        >
          {/* Main headline with character animation */}
          <motion.h1 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Split text for character animation */}
            <div className="overflow-hidden">
              <motion.span className="block text-7xl md:text-8xl font-bold font-space-grotesk" style={{ color: colors.white }}>
                {"NetWorth".split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      delay: i * 0.03,
                      duration: 0.5,
                      ease: [0.215, 0.61, 0.355, 1]
                    }}
                    className="inline-block"
                    style={{ marginRight: char === ' ' ? '0.3em' : '0' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>
            </div>
            <div className="overflow-hidden mt-2">
              <motion.span className="block text-7xl md:text-8xl font-bold font-space-grotesk" style={{ color: colors.white }}>
                {"SYNCR".split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.5 + i * 0.03,
                      duration: 0.5,
                      ease: [0.215, 0.61, 0.355, 1]
                    }}
                    className="inline-block"
                    style={{ marginRight: char === ' ' ? '0.3em' : '0' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>
            </div>
            <div className="overflow-hidden mt-2">
              <motion.span className="block text-7xl md:text-8xl font-bold font-space-grotesk" style={{ color: colors.white }}>
                {"".split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      delay: 1 + i * 0.03,
                      duration: 0.5,
                      ease: [0.215, 0.61, 0.355, 1]
                    }}
                    className="inline-block"
                    style={{ marginRight: char === ' ' ? '0.3em' : '0' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>
            </div>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 text-center mt-8 max-w-3xl"
          >
            Solving distributed intelligence through hierarchical orchestration, not exponential connections
          </motion.p>

          {/* Power stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5, type: "spring", stiffness: 100 }}
            className="flex gap-12 mt-12"
          >
            <div className="text-center">
              <div className="text-5xl font-bold text-white">
                <AnimatedCounter value={85} suffix="%" />
              </div>
              <div className="text-gray-400 mt-2">Less Complexity</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white">
                <AnimatedCounter value={10} suffix="x" />
              </div>
              <div className="text-gray-400 mt-2">Faster Execution</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white">∞</div>
              <div className="text-gray-400 mt-2">Scalability</div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-bold rounded-lg"
              onClick={() => {
                document.getElementById('LayerArchitectureSection2')?.scrollIntoView({ behavior: 'smooth' });
              }}  // <-- ADD THIS HERE
            >
              DISCOVER THE ARCHITECTURE
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-400 text-sm text-center"
          >
            <p>Scroll to explore</p>
            <div className="w-px h-12 bg-gray-600 mx-auto mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};