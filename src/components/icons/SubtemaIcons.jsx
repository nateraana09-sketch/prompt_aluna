'use client';

/**
 * Íconos y recuadros cuadrados individuales para los subtemas de "El territorio vivo"
 * Recuadros 1:1 con bordes redondeados y estética orgánica hecha a mano sobre colores de tierra.
 */

// 1. Anillos de tronco (crecimiento, memoria y capas)
export function SvgAnillosTronco({ color = 'currentColor', className = '' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Centro */}
      <circle cx="24" cy="24" r="3" fill={color} />
      {/* Anillo 1 */}
      <path d="M24 16 C29 16, 32 19, 32 24 C32 28, 28 32, 23 32 C18 32, 16 28, 16 24 C16 20, 19 16, 24 16" />
      {/* Anillo 2 */}
      <path d="M24 10 C33 9, 39 16, 38 24 C37 32, 31 38, 23 38 C15 38, 9 31, 10 23 C11 15, 17 11, 24 10" />
      {/* Anillo 3 parcial */}
      <path d="M8 20 C6 28, 11 38, 21 42 C29 44, 38 41, 42 33" />
      {/* Grieta radial orgánica */}
      <line x1="24" y1="24" x2="33" y2="29" />
    </svg>
  );
}

// 2. Hojas y brotes con puntos (vida vegetal, frescura y germinación)
export function SvgHojasBrotes({ color = 'currentColor', className = '' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Tallo curvo */}
      <path d="M12 40 C16 28, 24 18, 36 10" />
      {/* Hoja superior */}
      <path d="M36 10 C30 11, 26 16, 28 22 C33 22, 37 17, 36 10 Z" />
      {/* Hoja media izquierda */}
      <path d="M22 24 C16 23, 13 27, 15 32 C20 32, 23 28, 22 24 Z" />
      {/* Hoja media derecha */}
      <path d="M28 20 C34 19, 38 23, 37 28 C32 29, 29 25, 28 20 Z" />
      {/* Puntos orgánicos / esporas de cuidado */}
      <circle cx="16" cy="14" r="1.5" fill={color} />
      <circle cx="34" cy="36" r="1.5" fill={color} />
      <circle cx="40" cy="22" r="1.8" fill={color} />
      <circle cx="10" cy="28" r="1.2" fill={color} />
    </svg>
  );
}

// 3. Hongos (conexión, redes de suelo y soporte)
export function SvgHongos({ color = 'currentColor', className = '' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Sombrero hongo principal */}
      <path d="M10 24 C10 12, 30 12, 30 24 Z" />
      {/* Tallo principal */}
      <path d="M17 24 C17 32, 16 38, 15 40 L23 40 C23 38, 23 32, 23 24" />
      {/* Puntos en el sombrero */}
      <circle cx="16" cy="18" r="1.2" fill={color} />
      <circle cx="24" cy="16" r="1.5" fill={color} />
      {/* Sombrero hongo secundario */}
      <path d="M26 30 C26 22, 40 22, 40 30 Z" />
      {/* Tallo secundario */}
      <path d="M31 30 L31 40 L35 40 L35 30" />
      {/* Suelo micelial orgánico */}
      <path d="M8 40 C18 39, 30 41, 42 40" />
    </svg>
  );
}

// 4. Formas geométricas tipo montaña/pirámide (terrazas de la Sierra y niveles)
export function SvgMontanaPiramide({ color = 'currentColor', className = '' }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Nivel 1 (Cúspide) */}
      <path d="M20 12 L24 8 L28 12" />
      {/* Nivel 2 */}
      <path d="M16 18 L20 18 L20 12 L28 12 L28 18 L32 18" />
      {/* Nivel 3 */}
      <path d="M12 26 L16 26 L16 18 L32 18 L32 26 L36 26" />
      {/* Nivel 4 (Base escalonada) */}
      <path d="M8 36 L12 36 L12 26 L36 26 L36 36 L40 36" />
      {/* Línea de base territorial */}
      <line x1="6" y1="40" x2="42" y2="40" />
      {/* Sol / astro central */}
      <circle cx="24" cy="24" r="2.5" fill={color} />
    </svg>
  );
}

/**
 * Recuadro cuadrado individual (1:1) con bordes redondeados y estética de tierra
 */
export default function SubtemaSquare({
  tipo = 'tronco',
  bg = 'niebla', // 'niebla' | 'crema' | 'musgo' | 'terracota'
  size = 64,
  className = '',
  alt = ''
}) {
  const bgStyles = {
    niebla: { background: 'var(--verde-niebla, #DDE5D0)', color: 'var(--cafe-profundo, #3B2A1E)' },
    crema: { background: 'var(--crema, #F5EFE3)', color: 'var(--cafe-profundo, #3B2A1E)' },
    musgo: { background: 'var(--verde-musgo, #4F6B3A)', color: 'var(--crema, #F5EFE3)' },
    terracota: { background: 'var(--terracota, #9A4F28)', color: 'var(--crema, #F5EFE3)' }
  };

  const currentStyle = bgStyles[bg] || bgStyles.niebla;

  const renderIcon = () => {
    switch (tipo) {
      case 'tronco':
      case 'anillos':
        return <SvgAnillosTronco color="currentColor" className="subtema-svg" />;
      case 'hojas':
      case 'brotes':
        return <SvgHojasBrotes color="currentColor" className="subtema-svg" />;
      case 'hongos':
      case 'micelio':
        return <SvgHongos color="currentColor" className="subtema-svg" />;
      case 'montana':
      case 'piramide':
      default:
        return <SvgMontanaPiramide color="currentColor" className="subtema-svg" />;
    }
  };

  return (
    <div
      className={`subtema-square ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        aspectRatio: '1 / 1',
        borderRadius: '18px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12%',
        boxSizing: 'border-box',
        flexShrink: 0,
        ...currentStyle
      }}
      role="img"
      aria-label={alt || `Subtema: ${tipo}`}
    >
      {renderIcon()}
    </div>
  );
}
