'use client';

import { useState } from 'react';
import Link from 'next/link';
import ActivityGuide from './ActivityGuide';

const STORY = {
  inicio: {
    text: 'El mensaje llega al terminar el día. ¿Cómo abrirías la conversación?',
    choices: [
      { label: 'Ofrecer escuchar', to: 'escucha' },
      { label: 'Proponer buscar compañía', to: 'red' }
    ]
  },
  escucha: {
    text: 'Respondes que puedes escuchar. La persona dice que prefiere no explicar todavía. Escuchar también incluye respetar ese límite.',
    choices: [
      { label: 'Ofrecer compañía sin pedir detalles', to: 'compania' },
      { label: 'Preguntar qué apoyo preferiría', to: 'eleccion' }
    ]
  },
  red: {
    text: 'Propones buscar apoyo. La persona pregunta si tendrá que contar todo a alguien. No hace falta decidir por ella.',
    choices: [
      { label: 'Explorar una persona de confianza', to: 'compania' },
      { label: 'Explorar atención en salud', to: 'salud' }
    ]
  },
  compania: {
    text: 'Acuerdan un momento para acompañarse. La cercanía puede facilitar otra conversación; no garantiza que el malestar desaparezca.',
    choices: [
      { label: 'Pensar también en otras redes', to: 'eleccion' }
    ]
  },
  eleccion: {
    text: 'La persona puede elegir entre vínculos seguros, redes comunitarias y profesionales. No es obligatorio agotar una ruta antes de acceder a salud.',
    end: true
  },
  salud: {
    text: 'Ofreces ayudar a ubicar un servicio de salud. El acompañamiento profesional y comunitario pueden complementarse; no se promete un resultado.',
    end: true
  }
};

export default function Activity3BranchingStory() {
  const [history, setHistory] = useState(['inicio']);
  const [feedback, setFeedback] = useState('');

  const currentStepId = history[history.length - 1];
  const currentStep = STORY[currentStepId];

  const handleChoose = (to) => {
    setHistory(prev => [...prev, to]);
    setFeedback('La historia cambia con esta decisión.');
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, prev.length - 1));
      setFeedback('Puedes explorar otra respuesta.');
    }
  };

  const handleRestart = () => {
    setHistory(['inicio']);
    setFeedback('Elige otro camino para comparar perspectivas.');
  };

  return (
    <section className="playground" data-experience="3" data-branch={currentStepId} id="actividad-eje-3">
      <p className="eyebrow">Exploración participativa · Puedes volver a empezar</p>
      <h3>Un mensaje, varios caminos</h3>
      <p>Una amistad escribe: «Estos días me cuesta estar con los demás». No sabes qué está pasando.</p>
      <p className="play-instruction">Elige una respuesta para recorrer esta historia ficticia. Puedes volver a una decisión anterior.</p>

      <div className="play-board" aria-live="polite">
        <div className="story-illustration">Una conversación imaginada</div>
        <p className="story-text">{currentStep.text}</p>

        {currentStep.choices && currentStep.choices.map((c, i) => (
          <button
            key={i}
            type="button"
            className="story-choice"
            onClick={() => handleChoose(c.to)}
          >
            {c.label}
          </button>
        ))}

        {currentStep.end && (
          <div>
            <p className="story-ending">
              Lo que puedes descubrir: acompañar no es interpretar ni decidir por alguien. Si existe peligro inmediato, busca compañía y atención presencial urgente.
            </p>
            <Link href="/apoyo" className="text-link">
              Ver recursos de apoyo ↗
            </Link>
          </div>
        )}
      </div>

      <p className="play-feedback" role="status">{feedback}</p>

      <button type="button" onClick={handleBack} disabled={history.length <= 1}>
        Volver una decisión
      </button>
      <button type="button" onClick={handleRestart}>
        Empezar otra historia
      </button>

      <ActivityGuide />

      <p className="play-source">
        Base: recopilación §8 y documento 2024 §8.6–8.8. Historia y consecuencias posibles: adaptación del equipo, no testimonio ni predicción.
      </p>
    </section>
  );
}
