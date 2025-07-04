import React from 'react';
import { motion } from 'framer-motion';

export const LayerArchitecture1: React.FC = () => {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-8">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-sm tracking-[0.3em] mb-6 font-inter text-gray-400">
          SYNCR 
        </p>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter">
          <span className="block text-white">SYNCR</span>
          <span className="block text-white">ORCHESTRATION</span>
          <span className="block bg-gradient-to-r from-red-500 to-red-500 bg-clip-text text-transparent">
            STACK
          </span>
        </h1>
        <p className="mt-8 text-gray-400 max-w-2xl mx-auto">
          Syncr infrastructure features a hierarchically integrated<br />
          stack — 7 Layers, 15 Sub-Agents, and 1 Minerva.
        </p>
        
        {/* Scroll indicator */}
        <motion.div 
          className="mt-16 text-gray-400 text-sm"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Scroll to explore layers
        </motion.div>
        
        {/* Progress dots preview */}
        <div className="mt-8 flex gap-2 justify-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-1 w-8 rounded-full bg-gray-700"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};