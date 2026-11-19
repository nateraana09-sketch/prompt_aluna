'use client';

import { useState } from 'react';
import ActivityGuide from './ActivityGuide';

const PIECE_NAMES = {
  observar: 'Observar lo ocurrido',
  escuchar: 'Escuchar otra perspectiva',
  acordar: 'Proponer un acuerdo'
};

const INITIAL_ORDER = ['acordar', 'observar', 'escuchar'];

export default function Activity2BuildConversation() {
  const [order, setOrder] = useState([...INITIAL_ORDER]);
  const [feedback, setFeedback] = useState('');
  const [connected, setConnected] = useState(false);

  const move = (id, targetIndex) => {
    if (targetIndex < 0 || targetIndex >= order.length) return;
    const fromIndex = order.indexOf(id);
    if (fromIndex === -1) return;
    const newOrder = [...order];
    newOrder.splice(fromIndex, 1);
    newOrder.splice(targetIndex, 0, id);
    setOrder(newOrder);
    setConnected(false);
    setFeedback('Recorrido reorganizado. Puedes explorar otro orden.');
  };

  const handleRunSequence = () => {
    setConnected(true);
    const summary = order.map(id => PIECE_NAMES[id].toLowerCase()).join(' → ');
    setFeedback(`Tu recorrido: ${summary}. Empezar por observar puede ayudar a distinguir hechos de suposiciones; escuchar puede modificar un acuerdo. No es una receta: los pasos pueden retomarse. Dulazhikshiji aparece en el documento como acuerdos y diálogo.`);
  };

  const handleReset = () => {
    setOrder([...INITIAL_ORDER]);
    setConnected(false);
    setFeedback('Prueba otra organización.');
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain');
    if (sourceId && sourceId !== targetId) {
      const targetIndex = order.indexOf(targetId);
      move(sourceId, targetIndex);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <section className="playground" data-experience="2" id="actividad-eje-2">
      <p className="eyebrow">Exploración participativa · Puedes volver a empezar</p>
      <h3>Construye una conversación</h3>
      <p>Dos personas necesitan retomar un trabajo después de un desacuerdo.</p>
      <p className="play-instruction">Reordena las piezas con Subir y Bajar o arrastra una sobre otra. Después observa el recorrido.</p>

      <div className="play-board" data-connected={connected ? 'true' : undefined}>
        {order.map((id, index) => (
          <div
            key={id}
            className="sequence-piece"
            data-drop={id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, id)}
          >
            <button
              type="button"
              className="sequence-handle"
              draggable
              onDragStart={(e) => handleDragStart(e, id)}
              onClick={() => setFeedback('Usa Subir o Bajar para cambiar su posición.')}
            >
              {index + 1}. {PIECE_NAMES[id]}
            </button>
            <button
              type="button"
              disabled={index === 0}
              onClick={() => move(id, index - 1)}
            >
              Subir
            </button>
            <button
              type="button"
              disabled={index === order.length - 1}
              onClick={() => move(id, index + 1)}
            >
              Bajar
            </button>
          </div>
        ))}
      </div>

      <p className="play-feedback" role="status">{feedback}</p>

      <button type="button" className="play-primary" onClick={handleRunSequence}>
        Recorrer mi secuencia
      </button>
      <button type="button" onClick={handleReset}>
        Reiniciar piezas
      </button>

      <ActivityGuide />

      <p className="play-source">
        Fuente: documento 2024 §8.1 y §8.3. Secuencia editorial; no reproduce un consejo ni una consulta tradicional.
      </p>
    </section>
  );
}
