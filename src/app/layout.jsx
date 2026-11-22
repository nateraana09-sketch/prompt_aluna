import '../styles/globals.css';
import AppHeader from '../components/layout/AppHeader';
import AppNav from '../components/layout/AppNav';

export const metadata = {
  title: 'Prototipo de bienestar · Seminario Intercultural · Universidad del Magdalena',
  description: 'Experiencia digital de psicoeducación y orientación intercultural para jóvenes, desde los saberes del pueblo Kogui de la Sierra Nevada.'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="app-bg-fixed" aria-hidden="true" />
        <AppHeader />
        <main className="container" id="contenido">
          {children}
        </main>
        <AppNav />
      </body>
    </html>
  );
}
