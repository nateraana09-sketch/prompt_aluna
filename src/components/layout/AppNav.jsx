'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppNav() {
  const pathname = usePathname();

  const isCurrent = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="app-nav" aria-label="Navegación principal">
      <Link
        href="/"
        className={`nav-item ${isCurrent('/') ? 'activo' : ''}`}
        aria-current={isCurrent('/') ? 'page' : undefined}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 10L10 3l7 7M5 8.5V17h4v-4h2v4h4V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Inicio</span>
      </Link>
      <Link
        href="/aprender"
        className={`nav-item ${isCurrent('/aprender') ? 'activo' : ''}`}
        aria-current={isCurrent('/aprender') ? 'page' : undefined}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 17c0 0-7-4-7-9a7 7 0 0 1 14 0c0 5-7 9-7 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <line x1="10" y1="17" x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span>Aprender</span>
      </Link>
      <Link
        href="/apoyo"
        className={`nav-item ${isCurrent('/apoyo') ? 'activo' : ''}`}
        aria-current={isCurrent('/apoyo') ? 'page' : undefined}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M6 10V6a2 2 0 0 1 4 0v4M6 10v5a3 3 0 0 0 6 0v-5M6 10H4a2 2 0 0 0 0 4h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Apoyo</span>
      </Link>
      <Link
        href="/acerca"
        className={`nav-item ${isCurrent('/acerca') ? 'activo' : ''}`}
        aria-current={isCurrent('/acerca') ? 'page' : undefined}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="7" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span>Acerca</span>
      </Link>
    </nav>
  );
}
