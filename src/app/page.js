"use client";
import GlobeHeroWrapper from '@/components/globe/GlobeHeroWrapper';
import LandingNavbar from '@/components/landing/LandingNavbar';
import FeatureCards from '@/components/landing/FeatureCards';
import QuoteSection from '@/components/landing/QuoteSection';

export default function Home() {
  return (
    <div className="bg-[#03050c] text-white">
      <LandingNavbar />
      <GlobeHeroWrapper />
      <FeatureCards />
      <QuoteSection />
    </div>
  );
}
