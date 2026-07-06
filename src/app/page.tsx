import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Stats } from '@/components/landing/Stats';
import { Features } from '@/components/landing/Features';
import { UseCases } from '@/components/landing/UseCases';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { DemoChat } from '@/components/landing/DemoChat';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';
import { AmbientBackground } from '@/components/landing/AmbientBackground';
import { PublicRouteGuard } from '@/components/auth/PublicRouteGuard';

export default function Home() {
  return (
    <>
      <PublicRouteGuard />
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <UseCases />
        <HowItWorks />
        <DemoChat />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
