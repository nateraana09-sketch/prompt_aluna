'use client';

import { useState, useRef } from 'react';
import ActivityGuide from './ActivityGuide';

const EXPLANATIONS = [
  'Contexto: jañu y nuake aparecen como plantas en las fuentes; sugi es un objeto. No son términos intercambiables.',
  'Información: el documento identifica el acceso desinformado como preocupación. Una práctica tradicional no demuestra inocuidad ni autoriza una recomendación de uso.',
  'Acompañamiento: ante una duda puedes conversar con una persona de confianza, autoridades tradicionales o servicios de salud. No hace falta inventar efectos para pedir orientación.'
];

const WORDS = ['CONTEXTO', 'INFORMACIÓN', 'ACOMPAÑAMIENTO'];

export default function Activity4ContextLens() {
  const [lensPos, setLensPos] = useState(0);
  const [seen, setSeen] = useState(new Set([0]));
  const posterRef = useRef(null);
  const isDragging = useRef(false);

  const zone = Math.min(2, Math.floor(lensPos / 34));

  const reveal = (val) => {
    const v = Math.max(0, Math.min(100, Number(val)));
    setLensPos(v);
    const z = Math.min(2, Math.floor(v / 34));
    setSeen(prev => {
      const next = new Set(prev);
      next.add(z);
      return next;
    });
  };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    updateFromPointer(e);
  };

  const handlePointerMove = (e) => {
    if (isDragging.current) {
      updateFromPointer(e);
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const updateFromPointer = (e) => {
    if (!posterRef.current) return;
    const rect = posterRef.current.getBoundingClientRect();
    if (rect.width > 0) {
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      reveal(pct);
    }
  };

  const handleReset = () => {
    setSeen(new Set([0]));
    reveal(0);
  };

  const feedbackText = EXPLANATIONS[zone] + (seen.size === 3 ? ' Has explorado las tres capas: distinguir objeto, planta y contexto ayuda a preguntar antes de concluir.' : '');

  return (
    <section className="playground" data-experience="4" id="actividad-eje-4">
      <p className="eyebrow">Exploración participativa · Puedes volver a empezar</p>
      <h3>La lupa del contexto</h3>
      <p>Un mensaje menciona plantas y prácticas tradicionales. Una palabra sola no cuenta toda la historia.</p>
      <p className="play-instruction">Mueve la lupa sobre la lámina. También puedes usar el deslizador con las flechas del teclado.</p>

      <div className="play-board">
        <div
          ref={posterRef}
          className="context-poster"
          style={{ '--lens': `${10 + lensPos * 0.8}%` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {WORDS.map((w, i) => (
            <span
              key={w}
              className="poster-zone"
              data-zone={i}
              data-revealed={seen.has(i) ? 'true' : undefined}
            >
              {w}
            </span>
          ))}
          <span className="context-lens" aria-hidden="true" />
        </div>

        <label htmlFor="lupa-posicion">Posición de la lupa</label>
        <input
          id="lupa-posicion"
          type="range"
          min="0"
          max="100"
          value={lensPos}
          aria-describedby="lupa-desc"
          onChange={(e) => reveal(e.target.value)}
        />
        <p id="lupa-desc">La posición permite descubrir tres aspectos del mensaje.</p>
      </div>

      <p className="play-feedback" role="status">{feedbackText}</p>

      <button type="button" onClick={handleReset}>
        Volver a observar
      </button>

      <ActivityGuide />

      <p className="play-source">
        Fuente: documento 2024 §6.9.1, §7.2 y §7.3.3. Lámina y lupa son recursos editoriales; no se manipulan plantas ni objetos ceremoniales.
      </p>
    </section>
  );
}
