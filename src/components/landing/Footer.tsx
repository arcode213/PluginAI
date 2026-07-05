import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer>
      <div className="footer-logo">Plugin<span>AI</span></div>
      <div className="footer-links">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/docs">Docs</Link>
        <Link href="/support">Support</Link>
        <Link href="/status">Status</Link>
      </div>
      <div className="footer-copy">© 2026 Plugin AI. All rights reserved.</div>
    </footer>
  );
}
