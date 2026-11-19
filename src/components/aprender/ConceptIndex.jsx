'use client';

import { useState, useMemo } from 'react';
import { buscar } from '../../lib/busqueda';

export default function ConceptIndex({ data, onSelectConcept, defaultOpen = false }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const results = useMemo(() => {
    return buscar(data, query);
  }, [data, query]);

  const resultCountText = results.length > 0
    ? `${results.length} conceptos y experiencias disponibles`
    : 'No hay coincidencias. Prueba con otra palabra.';

  return (
    <details
      id="indice"
      className="index-disclosure"
      open={isOpen}
      onToggle={(e) => setIsOpen(e.currentTarget.open)}
    >
      <summary>
        Explorar todos los conceptos <span>Conceptos y recursos de los cuatro ejes</span>
      </summary>
      <div className="index-inner">
        <label className="search-label" htmlFor="buscar">
          Encuentra un concepto
        </label>
        <input
          id="buscar"
          type="search"
          placeholder="Nombre, palabra o experiencia…"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p id="resultados" className="photo-note" role="status">
          {resultCountText}
        </p>
        <div id="conceptos" className="conceptos-index">
          {results.map(({ concepto: c, motivo }) => (
            <button
              key={c.id}
              type="button"
              className="concept-row"
              data-concept={c.id}
              aria-controls="panel-detalle"
              onClick={() => onSelectConcept(c.id)}
            >
              <span>
                <strong>{c.nombre}</strong>
                <small>{motivo}</small>
              </span>
              <span className="row-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>
    </details>
  );
}
