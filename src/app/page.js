"use client";
import GlobeHeroWrapper from '@/components/globe/GlobeHeroWrapper';
import LandingNavbar from '@/components/landing/LandingNavbar';
import FeatureCards from '@/components/landing/FeatureCards';
import QuoteSection from '@/components/landing/QuoteSection';

export default function Home() {
  return (
    <div className="bg-[#03050c] text-white lg:h-screen lg:overflow-hidden lg:flex lg:flex-col">
      <LandingNavbar />
      <div className="lg:flex-1 lg:min-h-0">
        <GlobeHeroWrapper />
      </div>
      <div className="lg:shrink-0">
        <FeatureCards />
        <QuoteSection />
      </div>
    </div>
  );
}
