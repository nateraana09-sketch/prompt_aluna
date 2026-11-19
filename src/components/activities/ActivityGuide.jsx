'use client';

import { useState } from 'react';

export default function ActivityGuide() {
  const [guide, setGuide] = useState('rama');

  return (
    <details className="guide-options">
      <summary>Guía visual · propuesta ajustable</summary>
      <p>
        La rama señala dónde actuar; el felino es otra propuesta gráfica sin significado cultural atribuido. Ninguno es una figura tradicional ni interpreta lo que sientes.
      </p>
      <div className="guide-row">
        <img
          src={guide === 'rama' ? '/assets/img/guia-rama.svg' : '/assets/img/guia-felino.svg'}
          alt={guide === 'rama' ? 'Rama ilustrada que dirige la atención hacia la actividad' : 'Estudio gráfico de un felino, pendiente de revisión'}
          width={140}
          height={100}
        />
        <button
          type="button"
          onClick={() => setGuide('rama')}
          aria-pressed={guide === 'rama'}
        >
          Rama
        </button>
        <button
          type="button"
          onClick={() => setGuide('felino')}
          aria-pressed={guide === 'felino'}
        >
          Felino (estudio)
        </button>
      </div>
    </details>
  );
}
