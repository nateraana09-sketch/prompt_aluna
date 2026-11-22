'use client';

import EjeIcon from '../icons/EjeIcons';

export default function EjesNav({ activeAxis, onSelectAxis }) {
  const axes = [
    { id: '1', number: 'EJE 01', label: 'Reconocer' },
    { id: '2', number: 'EJE 02', label: 'Cuidar' },
    { id: '3', number: 'EJE 03', label: 'Apoyo' },
    { id: '4', number: 'EJE 04', label: 'Sustancias' },
    { id: '5', number: 'EJE 05', label: 'Fuentes' }
  ];

  return (
    <nav className="ejes-nav" aria-label="Seleccionar eje">
      {axes.map(axis => (
        <button
          key={axis.id}
          type="button"
          className="eje-card-btn"
          data-eje={axis.id}
          aria-pressed={activeAxis === axis.id}
          aria-controls={`eje${axis.id}`}
          onClick={() => onSelectAxis(axis.id)}
        >
          <span className="eje-icon-wrap" aria-hidden="true">
            <EjeIcon ejeId={axis.id} size={32} />
          </span>
          <span className="eje-card-meta">{axis.number}</span>
          <span className="eje-card-label">{axis.label}</span>
        </button>
      ))}
    </nav>
  );
}
