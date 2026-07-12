"use client";
import dynamic from 'next/dynamic';
import GlobeHeroWrapper from '@/components/globe/GlobeHeroWrapper';
import LandingNavbar from '@/components/landing/LandingNavbar';
import FeatureCards from '@/components/landing/FeatureCards';
import QuoteSection from '@/components/landing/QuoteSection';

const SpaceBackdrop = dynamic(() => import('@/components/landing/SpaceBackdrop'), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Guaranteed solid base — shows immediately and stays if WebGL/JS is unavailable */}
      <div className="fixed inset-0 bg-[#03050c] pointer-events-none" aria-hidden="true" />
      <SpaceBackdrop />
      <div className="relative z-10 text-white lg:h-screen lg:overflow-hidden lg:flex lg:flex-col">
        <LandingNavbar />
        <div className="lg:flex-1 lg:min-h-0">
          <GlobeHeroWrapper />
        </div>
        <div className="lg:shrink-0">
          <FeatureCards />
          <QuoteSection />
        </div>
      </div>
    </>
  );
}
