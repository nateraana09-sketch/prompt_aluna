import Link from 'next/link';

export default function AppHeader() {
  return (
    <>
      <header className="app-header">
        <div className="hdr-marca" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 1C5 1 2 4 2 8c0 5 7 9 7 9s7-4 7-9c0-4-3-7-7-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            <circle cx="9" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
          </svg>
        </div>
        <div className="hdr-txt">
          <h1>Psicoeducación intercultural</h1>
          <p>Universidad del Magdalena</p>
        </div>
      </header>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
    </>
  );
}
