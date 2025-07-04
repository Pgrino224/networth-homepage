// Step 4: Homepage Assembly
// This file imports and renders all 9 sections in the correct order
// NetWorth - Measure Your Worth. Master Your Future.

import Head from 'next/head';

// Import all 9 section components from Step 3
import Hero from '../sections/Hero';
import Welcome from '../sections/Welcome';
import Bento from '../sections/Bento';
import FounderNote from '../sections/FounderNote';
import Universe from '../sections/Universe';
import Traits from '../sections/Traits';
import Glance from '../sections/Glance';
import JoinCTA from '../sections/JoinCTA';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <>
      <Head>
        {/* SEO and Meta Tags */}
        <title>NetWorth - Measure Your Worth. Master Your Future.</title>
        <meta name="description" content="Transform your financial future through immersive gameplay. Master the 10 traits of wealth builders with NetWorth's revolutionary gamified platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="NetWorth - Measure Your Worth" />
        <meta property="og:description" content="Transform your financial future through immersive gameplay." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="NetWorth" />
        
        {/* Favicon - placeholder */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Fonts - will be configured in Step 6 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      {/* Main content wrapper */}
      <main className="min-h-screen bg-white">
        {/* Section 1: Hero - "MEASURE YOUR WORTH" */}
        <Hero />

        {/* Section 2: Welcome - Introduction with waitlist signup */}
        <Welcome />

        {/* Section 3: Bento - "Your Worth is Your Weapon" feature grid */}
        <Bento />

        {/* Section 4: Founder's Note - Personal message about the mission */}
        <FounderNote />

        {/* Section 5: Universe - Scroll-revealing 4 core values */}
        <Universe />

        {/* Section 6: Traits - The 10 character traits system */}
        <Traits />

        {/* Section 7: Glance - 2x2 metrics grid showcasing impact */}
        <Glance />

        {/* Section 8: Join CTA - Call to action to join NetWorth */}
        <JoinCTA />

        {/* Section 9: Footer - Links and animated NetWorth logo */}
        <Footer />
      </main>
    </>
  );
}