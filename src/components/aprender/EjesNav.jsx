'use client';

export default function EjesNav({ activeAxis, onSelectAxis }) {
  const axes = [
    { id: '1', number: '01', label: 'Reconocer' },
    { id: '2', number: '02', label: 'Cuidar' },
    { id: '3', number: '03', label: 'Apoyo' },
    { id: '4', number: '04', label: 'Contexto' }
  ];

  return (
    <nav className="ejes-nav" aria-label="Seleccionar eje">
      {axes.map(axis => (
        <button
          key={axis.id}
          type="button"
          data-eje={axis.id}
          aria-pressed={activeAxis === axis.id}
          aria-controls={`eje${axis.id}`}
          onClick={() => onSelectAxis(axis.id)}
        >
          <span>{axis.number}</span>
          <span>{axis.label}</span>
        </button>
      ))}
    </nav>
  );
}
