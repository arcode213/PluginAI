import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { AmbientBackground } from '@/components/landing/AmbientBackground';
import { SmoothScroll } from '@/components/landing/fx/SmoothScroll';
import { ScrollProgress } from '@/components/landing/fx/ScrollProgress';
import { Hero } from '@/components/landing/sections/Hero';
import { TrustedBy } from '@/components/landing/sections/TrustedBy';
import { Services } from '@/components/landing/sections/Services';
import { Features } from '@/components/landing/sections/Features';
import { WhyChooseUs } from '@/components/landing/sections/WhyChooseUs';
import { AiCapabilities } from '@/components/landing/sections/AiCapabilities';
import { TechStack } from '@/components/landing/sections/TechStack';
import { Process } from '@/components/landing/sections/Process';
import { CaseStudies } from '@/components/landing/sections/CaseStudies';
import { Stats } from '@/components/landing/sections/Stats';
import { Testimonials } from '@/components/landing/sections/Testimonials';
import { Pricing } from '@/components/landing/sections/Pricing';
import { Faq } from '@/components/landing/sections/Faq';
import { Cta } from '@/components/landing/sections/Cta';
import { Footer } from '@/components/landing/Footer';
import { PublicRouteGuard } from '@/components/auth/PublicRouteGuard';

export default function Home() {
  return (
    <div className="public-surface">
      <PublicRouteGuard />
      <SmoothScroll />
      <ScrollProgress />
      <AmbientBackground />
      <Navbar />
      <main className="font-body relative overflow-x-clip text-white">
        <Hero />
        <TrustedBy />
        <Services />
        <Features />
        <WhyChooseUs />
        <AiCapabilities />
        <TechStack />
        <Process />
        <CaseStudies />
        <Stats />
        <Testimonials />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
