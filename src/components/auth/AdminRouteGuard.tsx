'use client';
import { useEffect, useState } from 'react';
import { isAdminAuthenticated } from '@/lib/adminAuthService';

/**
 * Wraps admin panel children and blocks render until the auth check completes.
 * Matches the same pattern as AuthGuard in app/app/layout.tsx:
 *   - returns a loading screen while checking (no content flash)
 *   - redirects to /admin/login if not authenticated
 *   - renders children only when auth is confirmed
 */
export function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const authed = isAdminAuthenticated();
    if (!authed) {
      window.location.replace('/admin/login');
    } else {
      setAuthenticated(true);
      setReady(true);
    }
  }, []);

  if (!ready || !authenticated) {
    return (
      <div style={{
        height: '100vh', width: '100vw', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#0a0a0a', color: 'rgba(255,255,255,0.4)',
        fontSize: '14px',
      }}>
        Authenticating constraints...
      </div>
    );
  }

  return <>{children}</>;
}

export function AdminPublicRouteGuard() {
  useEffect(() => {
    if (isAdminAuthenticated()) {
      window.location.replace('/admin/dashboard');
    }
  }, []);

  return null;
}
