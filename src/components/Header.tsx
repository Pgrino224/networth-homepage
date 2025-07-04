// src/components/Header.tsx
// NetWorth Global Navigation Header - SSR Safe Version
// Fixed hydration issues by properly handling client-side effects
// Updated to include About Us link

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  // Initialize with false to match server-side rendering
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect for header background
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Handle smooth scrolling to sections
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Use a consistent class for both server and client on first render
  const headerClass = mounted && isScrolled
    ? 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-networth-black/95 backdrop-blur-md shadow-lg'
    : 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent';

  return (
    <header className={headerClass}>
      <nav className="max-w-7xl mx-auto px-6 py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Left: NetWorth Text Logo/Home Link */}
          <Link href="/" className="group">
            <span className="text-white font-white text-2xl md:text-3xl tracking-wider hover:text-networth-gold transition-colors duration-300">
              NETWORTH
            </span>
          </Link>

          {/* Right: Navigation Links */}
          <div className="flex items-center gap-6 md:gap-8">
            <Link 
              href="/aboutus"
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-base font-medium"
            >
              About Us
            </Link>
            
            <Link 
              href="/educational"
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-base font-medium"
            >
              Education
            </Link>
            
            <a 
              href="/syncr"
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-base font-medium cursor-pointer"
            >
              SYNCR
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}