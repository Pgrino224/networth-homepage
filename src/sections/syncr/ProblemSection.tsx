import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';

interface Planet {
  name: string;
  orbitRadius: number;
  speed: number;
  angle: number;
  color: string;
  width: number;
  height: number;
}

interface WhatIsSyncrProps {
  className?: string;
}

const WhatIsSyncr: FC<WhatIsSyncrProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const planetsRef = useRef<Planet[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Initialize planets only once
    if (planetsRef.current.length === 0) {
      planetsRef.current = [
        { name: 'StarkSync', orbitRadius: 60, speed: 0.008, angle: 0, color: '#ff2e2e', width: 60, height: 15 },
        { name: 'ParaSync', orbitRadius: 85, speed: 0.006, angle: 1, color: '#fdb462', width: 55, height: 14 },
        { name: 'JuriSync', orbitRadius: 110, speed: 0.005, angle: 2, color: '#ffffff', width: 50, height: 13 },
        { name: 'StrataSync', orbitRadius: 135, speed: 0.004, angle: 3, color: '#ff2e2e', width: 58, height: 15 },
        { name: 'WyrSync', orbitRadius: 160, speed: 0.003, angle: 4, color: '#fdb462', width: 48, height: 12 },
        { name: 'AmpliSync', orbitRadius: 185, speed: 0.002, angle: 5, color: '#ffffff', width: 56, height: 14 },
        { name: 'Infrasync', orbitRadius: 210, speed: 0.001, angle: 6, color: '#ffffff', width: 43, height: 10 }
      ];
    }
    
    // Proper canvas sizing function
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set the display size (CSS pixels)
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      // Set the actual size in memory (scaled for retina)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Reset and scale the drawing context
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Get scale factor based on container size
    const getScaleFactor = () => {
      const rect = container.getBoundingClientRect();
      const minDimension = Math.min(rect.width, rect.height);
      
      // Scale based on the smaller dimension to ensure everything fits
      if (minDimension < 400) return 0.5;
      if (minDimension < 600) return 0.7;
      if (minDimension < 800) return 0.85;
      return 1;
    };

    // Minerva (Sun) configuration
    const sun = { 
      baseRadius: 30,
      color: '#fdb462'
    };

    let isAnimating = true;

    const animate = () => {
      if (!isAnimating || !ctx || !container) return;
      
      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const scale = getScaleFactor();
      
      // Clear canvas properly
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Add dark background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.98)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      const sunRadius = sun.baseRadius * scale;

      // Draw orbits
      ctx.save();
      planetsRef.current.forEach(planet => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.orbitRadius * scale, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      ctx.restore();

      // Draw Minerva (sun) with glow
      ctx.save();
      ctx.shadowBlur = 25 * scale;
      ctx.shadowColor = '#fdb462';
      
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, sunRadius
      );
      gradient.addColorStop(0, '#fdb462');
      gradient.addColorStop(0.6, '#ff6b6b');
      gradient.addColorStop(1, '#fdb462');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();

      // Draw and update planets
      planetsRef.current.forEach(planet => {
        // Update angle for animation
        planet.angle += planet.speed;
        
        const x = centerX + Math.cos(planet.angle) * planet.orbitRadius * scale;
        const y = centerY + Math.sin(planet.angle) * planet.orbitRadius * scale;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(planet.angle);

        // Glow effect for planets
        ctx.shadowBlur = 8 * scale;
        ctx.shadowColor = planet.color;
        
        // Draw rectangular planet
        const width = planet.width * scale * 0.8;
        const height = planet.height * scale * 0.8;
        
        ctx.fillStyle = planet.color;
        ctx.fillRect(-width/2, -height/2, width, height);
        
        // Add subtle border
        ctx.strokeStyle = planet.color;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(-width/2, -height/2, width, height);
        
        ctx.restore();

        // Occasional connections to Minerva
        if (Math.random() > 0.995) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          const gradient = ctx.createLinearGradient(centerX, centerY, x, y);
          gradient.addColorStop(0, `${planet.color}40`);
          gradient.addColorStop(1, `${planet.color}10`);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation with delay
    const timeoutId = setTimeout(() => {
      animate();
    }, 100);

    return () => {
      isAnimating = false;
      clearTimeout(timeoutId);
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mounted]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      className={`min-h-screen bg-black flex items-center justify-center px-8 py-20 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        
        {/* Solar System Visualization - 60% width */}
        <motion.div 
          className="lg:col-span-3 relative h-[600px] flex items-center justify-center"
          variants={contentVariants}
        >
          {/* Canvas container */}
          <div 
            ref={containerRef}
            className="absolute inset-0 w-full h-full"
            style={{ minHeight: '400px' }}
          >
            {mounted && (
              <canvas 
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
                style={{ display: 'block' }}
              />
            )}
          </div>
          
          {/* Section Title Overlay */}
          <div className="absolute top-0 left-0 pointer-events-none z-10">
            <h2 className="text-5xl font-bold text-white mb-2">
              What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">SYNCR</span>?
            </h2>
            <p className="text-xl text-gray-400">Hierarchical Domain Intelligence</p>
          </div>
        </motion.div>

        {/* Glassmorphism Content Box - 40% width */}
        <motion.div 
          className="lg:col-span-2"
          variants={contentVariants}
        >
          <div className="relative">
            {/* Subtle glow behind the box */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-3xl blur-xl" />
            
            {/* Glassmorphism box */}
            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl hover:border-white/20 transition-all duration-300">
              <div className="space-y-6">
                {/* Main content */}
                <div className="space-y-4">
                  <p className="text-xl text-white/90 leading-relaxed">
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                      SYNCR is a hierarchical domain intelligence system
                    </span>{' '}
                    inspired by how intelligence organizes in nature.
                  </p>
                  
                  <p className="text-white/80 leading-relaxed">
                    Just as the human brain doesn't connect every neuron to every other neuron, SYNCR doesn't force every AI component to understand every other component. Instead, it creates sovereign domains—each with absolute authority over its specialty—that communicate through a hierarchical structure.
                  </p>
                  
                  <p className="text-white/80 leading-relaxed">
                    This biological wisdom transforms the exponential complexity of distributed AI into linear, manageable layers.
                  </p>
                </div>

                {/* Visual separator */}
                <div className="flex items-center gap-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1" />
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1" />
                </div>

                {/* Key features */}
                <div className="grid grid-cols-1 gap-4">
                  <motion.div 
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-white/70">
                      <span className="text-white font-medium">Domain Sovereignty:</span> Each layer has absolute authority in its realm
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-white/70">
                      <span className="text-white font-medium">Biological Architecture:</span> Mirrors natural intelligence organization
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-white/70">
                      <span className="text-white font-medium">Linear Complexity:</span> Scales efficiently as system grows
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhatIsSyncr;