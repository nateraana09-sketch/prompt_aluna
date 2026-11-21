'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ConceptDetailPanel({ concept, onClose, onGoToActivity }) {
  const [activeTab, setActiveTab] = useState('significado');
  const panelRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (concept) {
      setActiveTab('significado');
      if (titleRef.current) {
        titleRef.current.focus();
      }
    }
  }, [concept]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && concept) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [concept, onClose]);

  if (!concept) return null;

  return (
    <section
      ref={panelRef}
      className="panel-detalle abierto"
      id="panel-detalle"
      aria-labelledby="pd-titulo"
    >
      <button
        type="button"
        className="pd-cierre"
        id="panel-cierre"
        aria-label="Cerrar detalle y volver al paisaje"
        onClick={onClose}
      >
        ×
      </button>

      <p className="pd-eyebrow" id="pd-eyebrow">
        Eje {concept.eje} · {concept.tipo}
      </p>
      <h3
        ref={titleRef}
        className="pd-titulo"
        id="pd-titulo"
        tabIndex={-1}
      >
        {concept.nombre}
      </h3>
      <p className="pd-kogui" id="pd-kogui">
        {concept.tipo}
      </p>

      <div className="pd-tabs" id="pd-tabs" role="group" aria-label="Lecturas del concepto">
        <button
          type="button"
          className="pd-tab"
          aria-pressed={activeTab === 'significado'}
          onClick={() => setActiveTab('significado')}
        >
          Comprender
        </button>
        <button
          type="button"
          className="pd-tab"
          aria-pressed={activeTab === 'situacion'}
          onClick={() => setActiveTab('situacion')}
        >
          En lo cotidiano
        </button>
        <button
          type="button"
          className="pd-tab"
          aria-pressed={activeTab === 'cuidado'}
          onClick={() => setActiveTab('cuidado')}
        >
          Cuidar
        </button>
      </div>

      <div className="pd-cuerpo" id="pd-cuerpo">
        {activeTab === 'significado' && (
          <>
            <div className="concept-composition">
              <img
                src={`/assets/img/elemento-${concept.visual}.svg`}
                alt="Ilustración educativa"
                width={172}
                height={132}
              />
              <p>{concept.resumen}</p>
            </div>
            <p className="reflection-prompt">{concept.pregunta}</p>

            <details className="reading-more">
              <summary>Profundizar</summary>
              <p>{concept.significado}</p>
            </details>

            <button
              type="button"
              className="play-primary"
              onClick={() => onGoToActivity(concept.eje)}
            >
              Explorar con una actividad
            </button>

            {(concept.id === 'calma' || concept.id === 'esperanza') && (
              <details className="botanical">
                <summary>Una planta mencionada: manzanilla</summary>
                <img
                  src="/assets/img/manzanilla-tulumnes.jpg"
                  alt="Flor rotulada como Matricaria chamomilla por su autor, Tulumnes"
                  width={500}
                  height={513}
                  loading="lazy"
                />
                <p>
                  Referencia posible de manzanilla. La especie exacta mencionada por Judith no está confirmada. No se atribuyen propiedades medicinales.
                </p>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Matricaria_chamomilla_flower.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  Fotografía: Tulumnes · CC BY-SA 4.0
                </a>
              </details>
            )}
          </>
        )}

        {activeTab === 'situacion' && (
          <>
            <p>{concept.situacion}</p>
            <p className="reflection-prompt">{concept.pregunta}</p>
            <p className="source">
              Una situación imaginada para conversar. No necesitas responder ni compartir una experiencia personal.
            </p>
          </>
        )}

        {activeTab === 'cuidado' && (
          <>
            <p>{concept.cuidado}</p>
            <Link href="/apoyo" className="text-link">
              Encontrar acompañamiento ↗
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
