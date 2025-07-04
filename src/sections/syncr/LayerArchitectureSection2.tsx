import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

// NetWorth brand colors
const colors = {
  black: '#000000',
  white: '#FFFFFF',
  navy: '#0B1929',
  purple: '#6B46C1',
  gold: '#FDB462',
  orange: '#FF8C42', 
  steel: 'A6A6A6', 
  blue: '62D0FF',
  violet: '9362FF',
  green: '#4DE38C',
  red: 'FF2E2E',
  yellow: '#F9D65E',
} as const;

// Layer type definition
interface Layer {
  id: string | number;
  number: string;
  name: string;
  title: string;
  description: string;
  color: string;
}

// Layer data
const layers: Layer[] = [
  {
    id: 'minerva',
    number: '',
    name: 'MINERVA',
    title: 'ORCHESTRATION INTELLIGENCE',
    description: "Minerva is the orchestration intelligence that conducts the entire SYNCR symphony. Think of it as the master coordinator that allows all six layers to work together without getting tangled in complexity. While traditional systems suffer from exponential connections as they grow, Minerva enables each layer to speak its own language while ensuring perfect harmony across the system.",
    color: colors.gold,
  },
  {
    id: 0,
    number: '000',
    name: 'STARKSYNC',
    title: 'LEARNING CORE',
    description: "StarkSync is the learning brain of SYNCR—it understands not just what you do, but why you struggle and how you grow. Imagine a system that watches how your voice changes when frustrated, notices when you hesitate before decisions, and learns your unique patterns of growth.",
    color: colors.white,
  },
  {
    id: 1,
    number: '001',
    name: 'PARASYNC',
    title: 'WORLD ENGINE',
    description: "ParaSync brings virtual worlds to life by weaving together the laws of physics and economics. It ensures that every action has weight and every transaction has meaning. Physical actions affect economic outcomes, and economic states change what's physically possible.",
    color: colors.blue,
  },
  {
    id: 2,
    number: '002',
    name: 'JURISYNC',
    title: 'ANALYTICS LAYER',
    description: "JuriSync is the conscience of SYNCR—ensuring fairness isn't just a promise but a measurable reality. It watches over every transaction, every match, every interaction to detect bias and prevent exploitation.",
    color: colors.violet,
  },
  {
    id: 3,
    number: '003',
    name: 'STRATASYNC',
    title: 'ROUTING LAYER',
    description: "StrataSync is the navigation intelligence that understands what you really want, not just what you say. It's like having a GPS that knows not just where you want to go, but why you're going there and the best route for you specifically.",
    color: colors.green,
  },
  {
    id: 4,
    number: '004',
    name: 'WYRSYNC',
    title: 'TRADING LAYER',
    description: "WyrSync is where microseconds mean millions—the high-frequency trading engine built for absolute speed. WyrSync operates at the edge of what's physically possible, executing trades in less than 10 microseconds.",
    color: colors.red,
  },
  {
    id: 5,
    number: '005',
    name: 'AMPLISYNC',
    title: 'EXPERIENCE LAYER',
    description: "AmpliSync transforms raw data into rich human experiences—it's what makes SYNCR feel alive rather than just responsive. Visual effects, sound, and haptic feedback combine to burn achievements into memory.",
    color: colors.yellow,
  },
  {
    id: 6,
    number: '006',
    name: 'INFRASYNC',
    title: 'META-AWARENESS LAYER',
    description: "InfraSync is the meta-awareness layer of the Syncer ecosystem—the living navigator that maps, synchronizes, and governs the entire infrastructure consciousness. It serves as the internal atlas that tracks every entity, connection, and awareness flow across memory, language, audio, and real-time data. More than just support, InfraSync *is* the infrastructure: a fully aware system that orchestrates entanglements between internal components, external realities, and the agents that depend on them.",
    color: colors.steel,
  }
];

// 3D Layer Component Props
interface Layer3DProps {
  layer: Layer;
  index: number;
  isVisible: boolean;
  progress: number;
}

// 3D Layer Component
const Layer3D: React.FC<Layer3DProps> = ({ layer, index, isVisible, progress }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current || !isVisible) return;
    
    // Gentle rotation when visible
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  // Calculate position based on progress
  const yPosition = isVisible ? 0 : -5;
  const scale = isVisible ? 1 : 0.5;
  const opacity = isVisible ? 1 : 0;

  return (
    <group position={[0, yPosition, 0]} scale={scale}>
      <Box ref={meshRef} args={[4, 0.8, 4]}>
        <meshStandardMaterial
          color={layer.color}
          transparent
          opacity={opacity}
          emissive={layer.color}
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.7}
        />
      </Box>
      {/* Add wireframe overlay for better visibility */}
      <Box args={[4.1, 0.81, 4.1]}>
        <meshBasicMaterial
          color={layer.color}
          wireframe
          transparent
          opacity={opacity * 0.3}
        />
      </Box>
    </group>
  );
};

export const LayerArchitecture2: React.FC = () => {
  const [currentLayerIndex, setCurrentLayerIndex] = useState(0);
  const currentLayer = layers[currentLayerIndex];

  const handlePrevious = () => {
    if (currentLayerIndex > 0) {
      setCurrentLayerIndex(currentLayerIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentLayerIndex < layers.length - 1) {
      setCurrentLayerIndex(currentLayerIndex + 1);
    }
  };

  return (
    <section 
      id="layer-architecture"
      className="relative bg-black h-screen overflow-hidden"
    >
      <div className="relative h-full w-full flex">
        {/* Left side - Layer information */}
        <div className="w-1/2 flex items-center justify-center px-12">
          <div className="max-w-xl">
            {/* Simple fade-in animation for every layer change */}
            <motion.div
              key={currentLayerIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-sm tracking-[0.3em] mb-4 font-inter text-gray-400 uppercase">
                Our Architecture
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                {currentLayer.number && (
                  <span className="text-sm font-mono text-gray-500">
                    {currentLayer.number}
                  </span>
                )}
                <h2 className="text-5xl md:text-6xl font-black text-white">
                  {currentLayer.name}
                </h2>
              </div>
              
              <h3 className="text-2xl font-bold mb-6" style={{ color: currentLayer.color }}>
                {currentLayer.title}
              </h3>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {currentLayer.description}
              </p>

              {/* Navigation buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentLayerIndex === 0}
                  className={`px-4 py-2 text-2xl font-bold transition-all duration-300 ${
                    currentLayerIndex === 0 
                      ? 'text-gray-600 cursor-not-allowed' 
                      : 'text-white hover:text-gray-300 hover:scale-110'
                  }`}
                  aria-label="Previous layer"
                >
                  &lt;
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentLayerIndex === layers.length - 1}
                  className={`px-4 py-2 text-2xl font-bold transition-all duration-300 ${
                    currentLayerIndex === layers.length - 1 
                      ? 'text-gray-600 cursor-not-allowed' 
                      : 'text-white hover:text-gray-300 hover:scale-110'
                  }`}
                  aria-label="Next layer"
                >
                  &gt;
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right side - 3D visualization */}
        <div className="w-1/2 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full max-w-[500px] h-[500px] relative"
          >
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-black rounded-xl" />
            
            <Canvas
              camera={{ position: [0, 2, 8], fov: 60 }}
              className="relative z-10"
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <pointLight position={[-10, -10, -10]} intensity={0.8} />
              <pointLight position={[0, -10, 0]} intensity={0.5} color={currentLayer.color} />
              
              <Layer3D
                layer={currentLayer}
                index={currentLayerIndex}
                isVisible={true}
                progress={0}
              />
            </Canvas>
          </motion.div>
        </div>
      </div>

      {/* Progress indicators */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="flex items-center gap-2">
          {layers.map((_, index) => (
            <motion.div
              key={index}
              className="h-1 bg-white rounded-full transition-all duration-300 cursor-pointer hover:opacity-100"
              initial={{ width: 8, opacity: 0.3 }}
              animate={{
                width: index === currentLayerIndex ? 32 : 8,
                opacity: index <= currentLayerIndex ? 1 : 0.3
              }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentLayerIndex(index)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};