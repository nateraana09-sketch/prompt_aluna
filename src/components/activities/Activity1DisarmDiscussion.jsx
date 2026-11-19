'use client';

import { useState } from 'react';
import ActivityGuide from './ActivityGuide';

const PHRASES = [
  { id: 'rabia', text: '«Siento rabia»', target: 'sentir', feedback: 'La rabia es una emoción. El documento nombra Sheishe; no equivale a maltratar.' },
  { id: 'idea', text: '«No me están escuchando»', target: 'pensar', feedback: 'Es una interpretación de la situación, que podría contrastarse conversando.' },
  { id: 'insulto', text: '«Le grita un insulto»', target: 'actuar', feedback: 'Aquí se describe una acción. Nusa se refiere en la fuente a rabia que llega al maltrato.' },
  { id: 'pregunta', text: '«Pregunta qué ocurrió»', target: 'actuar', feedback: 'Preguntar puede abrir diálogo sin asumir qué piensa la otra persona.' }
];

const ZONES = [
  { id: 'sentir', label: 'Sentir' },
  { id: 'pensar', label: 'Pensar' },
  { id: 'actuar', label: 'Actuar' }
];

export default function Activity1DisarmDiscussion() {
  const [places, setPlaces] = useState({});
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [compared, setCompared] = useState(false);

  const handleSelectPhrase = (id) => {
    if (selected === id) {
      setSelected(null);
    } else {
      setSelected(id);
      setFeedback('Ahora elige Sentir, Pensar o Actuar.');
    }
  };

  const handleMoveToZone = (phraseId, zoneId) => {
    if (!ZONES.some(z => z.id === zoneId)) return;
    setPlaces(prev => ({ ...prev, [phraseId]: zoneId }));
    setSelected(null);
    setCompared(false);
    const phrase = PHRASES.find(p => p.id === phraseId);
    if (phrase) {
      setFeedback(phrase.feedback);
    }
  };

  const handleZoneHeaderClick = (zoneId) => {
    if (selected) {
      handleMoveToZone(selected, zoneId);
    } else {
      setFeedback('Primero elige una frase de la escena.');
    }
  };

  const handleCompare = () => {
    if (Object.keys(places).length < PHRASES.length) {
      setFeedback('Ubica las cuatro frases para observar sus relaciones. No hay una nota ni un resultado personal.');
      return;
    }
    setFeedback('Una lectura posible distingue la rabia (sentir), la interpretación (pensar) y el insulto o la pregunta (actuar). Tu distribución se conserva para compararla; puedes cambiarla. Sentir una emoción no justifica una agresión.');
    setCompared(true);
  };

  const handleReset = () => {
    setSelected(null);
    setPlaces({});
    setCompared(false);
    setFeedback('Mesa vacía. Puedes probar otra distribución.');
  };

  const handleDragStart = (e, phraseId) => {
    e.dataTransfer.setData('text/plain', phraseId);
  };

  const handleDrop = (e, zoneId) => {
    e.preventDefault();
    const phraseId = e.dataTransfer.getData('text/plain');
    if (phraseId) {
      handleMoveToZone(phraseId, zoneId);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const unassignedPhrases = PHRASES.filter(p => !places[p.id]);

  return (
    <section className="playground" data-experience="1" id="actividad-eje-1">
      <p className="eyebrow">Exploración participativa · Puedes volver a empezar</p>
      <h3>Desarma una discusión</h3>
      <p>Una tarea compartida no salió como se esperaba. Distingue lo que se siente, se piensa y se hace.</p>
      <p className="play-instruction">Toca una frase y después una zona. También puedes arrastrarla. Puedes moverla otra vez.</p>

      <div className="play-board">
        {/* Tray for unassigned phrases */}
        <div className="phrase-tray">
          {unassignedPhrases.map(p => (
            <button
              key={p.id}
              type="button"
              className="phrase"
              data-piece={p.id}
              aria-pressed={selected === p.id}
              draggable
              onDragStart={(e) => handleDragStart(e, p.id)}
              onClick={() => handleSelectPhrase(p.id)}
            >
              {p.text}
            </button>
          ))}
        </div>

        {/* Drop zones */}
        <div className="drop-zones" data-compared={compared ? 'true' : undefined}>
          {ZONES.map(z => {
            const phrasesInZone = PHRASES.filter(p => places[p.id] === z.id);
            return (
              <div
                key={z.id}
                className="drop-zone"
                data-drop={z.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, z.id)}
              >
                <button type="button" onClick={() => handleZoneHeaderClick(z.id)}>
                  {z.label}
                </button>
                {phrasesInZone.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    className="phrase"
                    data-piece={p.id}
                    aria-pressed={selected === p.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, p.id)}
                    onClick={() => handleSelectPhrase(p.id)}
                  >
                    {p.text}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <p className="play-feedback" role="status">{feedback}</p>

      <button type="button" className="play-primary" onClick={handleCompare}>
        Comparar una lectura posible
      </button>
      <button type="button" onClick={handleReset}>
        Vaciar la mesa
      </button>

      <ActivityGuide />

      <p className="play-source">
        Fuente: documento 2024 §7.2 y §8.1. Frases y agrupación: propuesta pedagógica del equipo, no traducción cultural.
      </p>
    </section>
  );
}
