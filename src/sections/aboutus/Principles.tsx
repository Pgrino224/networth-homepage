// Principles.tsx - Core principles that guide NetWorth (Dark Theme)
// Located in: src/sections/Principles.tsx
// Grid layout showcasing 6 guiding principles with black background

import { motion } from 'framer-motion';

export default function Principles() {
  const principles = [
    {
      icon: "🎯",
      title: "Education First, Profits Second",
      description: "We measure success by lives transformed, not just revenue generated. Every feature, every update, every decision starts with one question: Does this help our users master their financial future?"
    },
    {
      icon: "🌊",
      title: "Embrace the Journey",
      description: "Financial mastery isn't a destination—it's a lifelong journey. We celebrate small wins, learn from setbacks, and understand that true wealth is built one informed decision at a time."
    },
    {
      icon: "🤝",
      title: "Transparency Builds Trust",
      description: "No hidden fees, no complex terms, no gatekeeping. We believe in radical transparency because trust is the foundation of any meaningful financial relationship."
    },
    {
      icon: "⚡",
      title: "Innovation with Purpose",
      description: "We don't gamify for entertainment—we gamify for transformation. Every game mechanic, every AI feature, every innovation serves our mission to make financial literacy universal."
    },
    {
      icon: "🌟",
      title: "Community Over Competition",
      description: "Your success is our success. We foster collaboration over competition, knowing that when one member rises, they lift others with them. Together, we're stronger."
    },
    {
      icon: "🔮",
      title: "Future-Proof Learning",
      description: "Markets evolve, technologies advance, but principles endure. We teach timeless wisdom through modern methods, preparing you for financial challenges that don't yet exist."
    }
  ];

  return (
    <section 
      id="principles"
      className="relative bg-black py-20 md:py-32 overflow-hidden"
      aria-label="NetWorth Guiding Principles"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-networth-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-networth-gold rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4"
          >
            How We Operate
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white"
          >
            Our Guiding <span className="text-networth-gold">Principles</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            These aren't just words on a wall. They're the promises we make to every 
            user who trusts us with their financial education journey.
          </motion.p>
        </div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gray-900 rounded-2xl p-8 h-full shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-networth-gold/20">
                {/* Icon */}
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {principle.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-networth-gold transition-colors">
                  {principle.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-networth-gold to-networth-white p-[2px] rounded-2xl inline-block">
            <div className="bg-black rounded-2xl px-12 py-8">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Ready to Experience the <span className="text-networth-gold">NetWorth Difference</span>?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands who are transforming their financial future through 
                immersive gameplay and proven education methods.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/"
                  className="inline-flex items-center gap-3 bg-networth-gold text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300"
                >
                  Start Learning
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a 
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-transparent text-networth-gold px-8 py-4 rounded-full font-semibold border-2 border-networth-gold hover:bg-networth-gold hover:text-black transform hover:scale-105 transition-all duration-300"
                >
                  Get in Touch
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}