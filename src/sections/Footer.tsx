// Step 5i: Footer with Animations (Basic Version)
// Canvas animation will be added in a future enhancement
// For now, using CSS animations for the logo

import { motion } from 'framer-motion';

export default function Footer() {
  // Link hover animation
  const linkVariants = {
    initial: { x: 0 },
    hover: { x: 5 }
  };

  return (
    <footer 
      id="footer"
      className="bg-networth-black text-white"
      aria-label="NetWorth footer"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Links grid - 4 columns */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          >
            
            {/* Column 1: Explore */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="space-y-4"
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-networth-gold">
                Explore
              </h2>
              <ul className="space-y-2">
                {['Home', 'Our Story', 'About', 'Contact'].map((item, i) => (
                  <motion.li key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 + i * 0.05 }}>
                    <motion.a 
                      href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-400 hover:text-white transition-colors inline-block"
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      {item}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 2: Features */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="space-y-4"
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-networth-gold">
                Features
              </h2>
              <ul className="space-y-2">
                {['10 Traits System', 'Challenges', 'Rewards', 'Leaderboard'].map((item, i) => (
                  <motion.li key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 + i * 0.05 }}>
                    <motion.a 
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-400 hover:text-white transition-colors inline-block"
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      {item}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Community */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="space-y-4"
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-networth-gold">
                Community
              </h2>
              <ul className="space-y-2">
                {[
                  { name: 'Discord', url: 'https://discord.gg/networth' },
                  { name: 'X (Twitter)', url: 'https://x.com/networthbuild' },
                  { name: 'YouTube', url: 'https://youtube.com/@networth' },
                  { name: 'Blog', url: 'https://medium.com/networth' }
                ].map((item, i) => (
                  <motion.li key={item.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 + i * 0.05 }}>
                    <motion.a 
                      href={item.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
                      whileHover={{ x: 5 }}
                    >
                      {item.name}
                      <motion.svg 
                        initial={{ x: 0, y: 0 }}
                        whileHover={{ x: 2, y: -2 }}
                        className="w-3 h-3" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </motion.svg>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4: Resources */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="space-y-4"
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-networth-gold">
                Resources
              </h2>
              <ul className="space-y-2">
                {['Whitepaper', 'Documentation', 'Media Kit', 'Careers'].map((item, i) => (
                  <motion.li key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 + i * 0.05 }}>
                    <motion.a 
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-400 hover:text-white transition-colors inline-block"
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      {item}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </motion.div>

          {/* Legal section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400"
          >
            <span className="mb-4 md:mb-0">
              © {new Date().getFullYear()} NetWorth. All rights reserved.
            </span>
            <div className="flex gap-6">
              <motion.a 
                href="/privacy" 
                className="hover:text-white transition-colors"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                href="/terms" 
                className="hover:text-white transition-colors"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </motion.div>
        </div>
    </footer>
  );
}