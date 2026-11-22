'use client';

/**
 * Íconos de un solo trazo para los ejes de "El territorio vivo"
 * Estilo orgánico, trazo uniforme y fondo visual acorde a la identidad.
 */

export function LogoTerritorio({ className = '', size = 32, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Cumbres de la montaña */}
      <path d="M4 22 L11 11 L18 19 L25 8 L32 22" />
      {/* Curvas de nivel / ondas de agua y territorio */}
      <path d="M4 25 C10 23, 14 27, 20 25 C26 23, 29 26, 32 25" />
      <path d="M5 29 C11 27, 15 31, 21 29 C27 27, 29 30, 31 29" />
    </svg>
  );
}

// EJE 01 · Reconocer: Ojo de un solo trazo
export function IconReconocer({ className = '', size = 36, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M4 18 C10 10, 26 10, 32 18 C26 26, 10 26, 4 18 Z" />
      <circle cx="18" cy="18" r="4.5" />
      <circle cx="18" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

// EJE 02 · Cuidar: Hoja de un solo trazo
export function IconCuidar({ className = '', size = 36, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M10 27 C8 17, 14 7, 26 7 C26 19, 21 28, 10 27 Z" />
      <path d="M10 27 C15 22, 19 16, 26 7" />
    </svg>
  );
}

// EJE 03 · Apoyo: Dos círculos entrelazados de un solo trazo
export function IconApoyo({ className = '', size = 36, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="14" cy="18" r="7.5" />
      <circle cx="22" cy="18" r="7.5" />
    </svg>
  );
}

// EJE 04 · Sustancias (Contexto): Brújula / semilla de un solo trazo
export function IconSustancias({ className = '', size = 36, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <ellipse cx="18" cy="18" rx="8" ry="12" />
      <line x1="18" y1="6" x2="18" y2="30" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  );
}

// EJE 05 · Fuentes: Documento / libro de un solo trazo
export function IconFuentes({ className = '', size = 36, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M8 8 C12 6, 16 7, 18 10 C20 7, 24 6, 28 8 L28 26 C24 24, 20 25, 18 28 C16 25, 12 24, 8 26 Z" />
      <line x1="18" y1="10" x2="18" y2="28" />
    </svg>
  );
}

export default function EjeIcon({ ejeId, className = '', size = 36 }) {
  switch (String(ejeId)) {
    case '1':
      return <IconReconocer className={className} size={size} />;
    case '2':
      return <IconCuidar className={className} size={size} />;
    case '3':
      return <IconApoyo className={className} size={size} />;
    case '4':
      return <IconSustancias className={className} size={size} />;
    case '5':
      return <IconFuentes className={className} size={size} />;
    default:
      return null;
  }
}
