import '../styles/globals.css';
import { Fraunces, Source_Sans_3 } from 'next/font/google';
import AppHeader from '../components/layout/AppHeader';
import AppNav from '../components/layout/AppNav';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--fuente-titulos',
  display: 'swap'
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--fuente-cuerpo',
  display: 'swap'
});

export const metadata = {
  title: 'El territorio vivo · Psicoeducación Intercultural · Universidad del Magdalena',
  description: 'Experiencia digital de psicoeducación y orientación intercultural para jóvenes, desde los saberes de la Sierra Nevada.'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${sourceSans.variable}`}>
      <body>
        <AppHeader />
        <main className="container" id="contenido">
          {children}
        </main>
        <AppNav />
      </body>
    </html>
  );
}
