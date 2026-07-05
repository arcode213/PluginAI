import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from '../landing/Footer';
import { AmbientBackground } from '../landing/AmbientBackground';

// Shared chrome for public marketing sub-pages (docs, privacy, terms, etc.).
export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main className="subpage">{children}</main>
      <Footer />
    </>
  );
}
