import Link from 'next/link';
import { LogoTerritorio } from '../icons/EjeIcons';

export default function AppHeader() {
  return (
    <>
      <header className="app-header">
        <Link href="/" className="hdr-brand-link" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div className="hdr-marca" aria-hidden="true" style={{ background: 'var(--verde-musgo, #4F6B3A)', color: 'var(--crema, #F5EFE3)', borderRadius: '12px', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogoTerritorio size={24} />
          </div>
          <div className="hdr-txt">
            <h1 style={{ fontFamily: 'var(--fuente-titulos, serif)', fontSize: '17px', margin: 0, color: 'var(--cafe-profundo, #3B2A1E)', fontWeight: 600 }}>El territorio vivo</h1>
            <p style={{ fontSize: '10px', letterSpacing: '.12em', color: 'var(--verde-musgo, #4F6B3A)', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>Psicoeducación intercultural</p>
          </div>
        </Link>
      </header>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
    </>
  );
}
