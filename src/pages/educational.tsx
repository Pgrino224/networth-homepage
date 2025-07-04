import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useScrollProgress } from '@/hooks/usescrollprogress';
import styles from '@/styles/Educational.module.css';

// Dynamic imports with SSR disabled for components with animations
const HeroSection = dynamic(() => import('@/sections/educational/HeroSection'), { 
  ssr: false 
});
const IntroSection = dynamic(() => import('@/sections/educational/IntroSection'), { 
  ssr: false 
});
const StatisticsSection = dynamic(() => import('@/sections/educational/StatisticsSection'), { 
  ssr: false 
});
const CarouselSection = dynamic(() => import('@/sections/educational/CarouselSection'), { 
  ssr: false 
});
const CTASection = dynamic(() => import('@/sections/educational/CTASection'), { 
  ssr: false 
});
const Footer = dynamic(() => import('@/sections/Footer'), { 
  ssr: false 
});

export default function EducationalPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <Head>
        <title>About NetWorth - The Future of Finance Education</title>
        <meta name="description" content="Transform your finance education through immersive role-playing. Where traditional education delivers theory, NetWorth delivers mastery." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div ref={containerRef} className={styles.container}>
        {/* Scroll Progress Indicator */}
        <div className={styles.scrollProgress}>
          <div 
            className={styles.scrollProgressBar} 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Main Sections */}
        <HeroSection />
        <IntroSection />
        <StatisticsSection />
        <CarouselSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}