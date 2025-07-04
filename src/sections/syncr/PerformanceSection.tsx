import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// NetWorth brand colors
const colors = {
  black: '#000000',
  white: '#FFFFFF',
  navy: '#0B1929',
  purple: '#6B46C1',
  gold: '#FDB462',
  orange: '#FF8C42'
};

// Animated metric card
const MetricCard = ({ 
  value, 
  unit, 
  label, 
  description, 
  delay = 0 
}: {
  value: string | number;
  unit?: string;
  label: string;
  description: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 0 50px ${colors.purple}30`
      }}
      className="p-10 rounded-3xl backdrop-blur-sm"
      style={{ 
        background: `linear-gradient(135deg, ${colors.purple}10 0%, ${colors.navy}20 100%)`,
        border: `1px solid ${colors.purple}30`
      }}
    >
      <div className="text-6xl md:text-7xl font-bold font-space-grotesk mb-3" style={{ color: colors.gold }}>
        {value}
        {unit && <span className="text-4xl md:text-5xl" style={{ color: colors.purple }}>{unit}</span>}
      </div>
      <div className="text-2xl mb-3 font-space-grotesk" style={{ color: colors.purple }}>{label}</div>
      <div className="text-sm font-inter" style={{ color: colors.white + '80' }}>{description}</div>
    </motion.div>
  );
};

// Live performance visualization
const PerformanceVisualization = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [transactions, setTransactions] = useState<Array<{
    id: number;
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    life: number;
  }>>([]);

  useFrame((state, delta) => {
    setTransactions(prev => {
      const updated = prev
        .map(t => ({
          ...t,
          position: t.position.clone().add(t.velocity.clone().multiplyScalar(delta)),
          life: t.life - delta
        }))
        .filter(t => t.life > 0);

      if (Math.random() < 0.3) {
        updated.push({
          id: Date.now() + Math.random(),
          position: new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            -5,
            (Math.random() - 0.5) * 5
          ),
          velocity: new THREE.Vector3(0, 10, 0),
          life: 2
        });
      }

      return updated;
    });

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central processing core */}
      <Box args={[2, 2, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={colors.purple} 
          emissive={colors.purple} 
          emissiveIntensity={0.5}
          wireframe
        />
      </Box>

      {/* Transaction particles */}
      {transactions.map(t => (
        <Sphere 
          key={t.id} 
          args={[0.1]} 
          position={t.position}
        >
          <meshBasicMaterial 
            color={colors.gold} 
            transparent 
            opacity={t.life / 2}
          />
        </Sphere>
      ))}

      {/* Connection lines (always 15) */}
      {Array.from({ length: 15 }).map((_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, x, 0, z])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={colors.gold} opacity={0.5} transparent />
          </line>
        );
      })}
    </group>
  );
};

// Latency wave visualization
const LatencyWave = ({ progress }: { progress: number }) => {
  const points = [];
  for (let i = 0; i < 100; i++) {
    const x = (i / 100) * 10 - 5;
    const y = Math.sin((i / 100 + progress) * Math.PI * 4) * 0.5;
    points.push(new THREE.Vector3(x, y, 0));
  }

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={colors.gold} linewidth={2} />
    </line>
  );
};

export const PerformanceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(containerRef, { once: false, margin: "-20%" });
  const waveProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  // Comparison bars animation
  const traditionalWidth = useSpring(useTransform(scrollYProgress, [0.3, 0.5], [0, 100]), {
    stiffness: 100,
    damping: 30
  });
  const syncrWidth = useSpring(useTransform(scrollYProgress, [0.4, 0.6], [0, 100]), {
    stiffness: 100,
    damping: 30
  });

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden" style={{ backgroundColor: colors.black }}>
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors.purple}30 0%, transparent 70%)`
        }}
      />

      <div className="container mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.3em] mb-6 font-inter" style={{ color: colors.purple }}>
            PRODUCTION-READY PERFORMANCE
          </p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-space-grotesk" style={{ color: colors.white }}>
            THESE AREN'T PROMISES.<br />
            THESE ARE BENCHMARKS.
          </h2>
        </motion.div>

        {/* Main performance metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <MetricCard
            value="<10"
            unit="μs"
            label="Trading Execution"
            description="Faster than light travels 10 feet"
            delay={0}
          />
          <MetricCard
            value="10"
            unit="M/sec"
            label="Order Throughput"
            description="Processing entire NYSE daily volume in 4 minutes"
            delay={0.2}
          />
          <MetricCard
            value="60"
            unit="Hz"
            label="Physics Simulation"
            description="Frame-perfect across distributed systems"
            delay={0.4}
          />
        </div>

        {/* Live visualization */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: 3D Performance Viz */}
          <div className="h-[500px] rounded-3xl overflow-hidden" style={{ 
            backgroundColor: colors.navy + '40',
            border: `1px solid ${colors.purple}20`
          }}>
            <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <PerformanceVisualization />
              <LatencyWave progress={waveProgress.get()} />
            </Canvas>
          </div>

          {/* Right: Additional metrics */}
          <div className="flex flex-col justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl"
              style={{ 
                backgroundColor: colors.navy + '40',
                border: `1px solid ${colors.purple}20`
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-inter" style={{ color: colors.white + '80' }}>Emergency Response</span>
                <span className="text-3xl font-bold font-space-grotesk" style={{ color: colors.gold }}>50ms</span>
              </div>
              <div className="text-sm font-inter" style={{ color: colors.white + '60' }}>Complete system halt</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl"
              style={{ 
                backgroundColor: colors.navy + '40',
                border: `1px solid ${colors.purple}20`
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-inter" style={{ color: colors.white + '80' }}>State Synchronization</span>
                <span className="text-3xl font-bold font-space-grotesk" style={{ color: colors.gold }}>100ms</span>
              </div>
              <div className="text-sm font-inter" style={{ color: colors.white + '60' }}>Global coherence</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl"
              style={{ 
                backgroundColor: colors.navy + '40',
                border: `1px solid ${colors.purple}20`
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-inter" style={{ color: colors.white + '80' }}>Cognitive Adaptation</span>
                <span className="text-3xl font-bold font-space-grotesk" style={{ color: colors.gold }}>16ms</span>
              </div>
              <div className="text-sm font-inter" style={{ color: colors.white + '60' }}>Predictive feedback</div>
            </motion.div>
          </div>
        </div>

        {/* Performance comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h3 className="text-4xl font-bold text-center mb-16 font-space-grotesk" style={{ color: colors.white }}>
            Performance Comparison
          </h3>

          {/* Traditional Systems */}
          <div className="mb-8">
            <div className="flex justify-between mb-3">
              <span className="font-inter" style={{ color: colors.white + '80' }}>Traditional Distributed Systems</span>
              <span className="font-space-grotesk" style={{ color: colors.orange }}>50-200ms routing</span>
            </div>
            <div className="h-10 rounded-full overflow-hidden" style={{ backgroundColor: colors.navy + '40' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ 
                  width: traditionalWidth.get() + '%',
                  background: `linear-gradient(90deg, ${colors.orange} 0%, ${colors.orange}80 100%)`
                }}
              />
            </div>
          </div>

          {/* SYNCR */}
          <div>
            <div className="flex justify-between mb-3">
              <span className="font-inter" style={{ color: colors.white + '80' }}>SYNCR Hierarchical Architecture</span>
              <span className="font-space-grotesk" style={{ color: colors.gold }}>&lt;1ms routing</span>
            </div>
            <div className="h-10 rounded-full overflow-hidden" style={{ backgroundColor: colors.navy + '40' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ 
                  width: syncrWidth.get() + '%',
                  background: `linear-gradient(90deg, ${colors.purple} 0%, ${colors.gold} 100%)`
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Scalability proof */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-4xl font-bold mb-12 font-space-grotesk" style={{ color: colors.white }}>
            Scalability Proof
          </h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { users: "1K", status: "No degradation" },
              { users: "10K", status: "Linear scaling" },
              { users: "100K", status: "Auto optimization" },
              { users: "1M", status: "Cloud expansion" }
            ].map((test, i) => (
              <motion.div
                key={test.users}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="p-8 rounded-2xl"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.gold}10 0%, ${colors.purple}10 100%)`,
                  border: `1px solid ${colors.gold}30`
                }}
              >
                <div className="text-4xl font-bold mb-2 font-space-grotesk" style={{ color: colors.gold }}>
                  {test.users}
                </div>
                <div className="text-sm font-space-grotesk mb-2" style={{ color: colors.purple }}>
                  Concurrent Users
                </div>
                <div className="text-xs font-inter" style={{ color: colors.white + '60' }}>
                  {test.status}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The Secret */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-3xl font-bold mb-6 font-space-grotesk" style={{ color: colors.white }}>
            The Secret: Domain Isolation
          </h3>
          <p className="text-lg leading-relaxed font-inter" style={{ color: colors.white + '99' }}>
            WyrSync trades at microsecond speeds because it doesn't wait for consensus. 
            StarkSync adapts to learners without checking with trading. Each domain operates 
            at its optimal speed while Minerva maintains harmony.
          </p>
        </motion.div>
      </div>
    </section>
  );
};