// aboutUs.tsx - About Us Page
// This file imports and renders 3 sections for the About Us page
// NetWorth - Our Mission to Transform Financial Education

import Head from 'next/head';

// Import the 3 section components
import FounderNote from '../sections/aboutus/FounderNote';  // Reused from homepage
import Beliefs from '../sections/aboutus/Beliefs';          // New scroll-pinned section
import Principles from '../sections/aboutus/Principles';    // New grid section
import Footer from '@/sections/Footer';
export default function aboutus() {
  return (
    <>
      <Head>
        {/* SEO and Meta Tags */}
        <title>About NetWorth - Our Mission to Transform Financial Education</title>
        <meta name="description" content="Learn about NetWorth's mission to make financial mastery accessible to everyone through gamified education. Discover our beliefs, principles, and vision for the future." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Keywords for SEO */}
        <meta name="keywords" content="NetWorth, about us, financial education, gamified learning, mission, beliefs, principles, fintech, edtech" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="About NetWorth - Our Mission" />
        <meta property="og:description" content="Discover how NetWorth is revolutionizing financial education through immersive gameplay and AI-driven learning." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="NetWorth" />
        <meta property="og:url" content="https://networth.game/about" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About NetWorth - Our Mission" />
        <meta name="twitter:description" content="Discover how NetWorth is revolutionizing financial education through immersive gameplay." />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Fonts - assuming same as homepage */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      {/* Main content wrapper */}
      <main className="min-h-screen bg-white">
        {/* Section 1: Founder's Note - Personal message from the founder (REUSED from homepage) */}
        <FounderNote />

        {/* Section 2: Beliefs - Scroll-pinned section with video background revealing 3 core beliefs */}
        <Beliefs />

        {/* Section 3: Principles - Grid layout of 6 guiding principles with icons and CTAs */}
        <Principles />

        {/* Section 3: Principles - Grid layout of 6 guiding principles with icons and CTAs */}
        <Footer />
      </main>
    </>
  );
}