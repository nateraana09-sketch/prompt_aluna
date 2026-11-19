'use client';

import { useState } from 'react';

export default function PreviousPhaseActivity({ activity }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!activity || !activity.pasos || activity.pasos.length === 0) return null;

  const currentStep = activity.pasos[currentStepIndex];

  return (
    <details className="previous-reading">
      <summary>Explorar las miradas de la fase anterior</summary>
      <div className="learning-activity" data-activity={activity.id}>
        <p className="eyebrow">Para comprender · Explora sin responder</p>
        <h3>{activity.titulo}</h3>
        <p>{activity.intro}</p>

        <div className="activity-controls">
          {activity.pasos.map((step, i) => (
            <button
              key={i}
              type="button"
              aria-pressed={currentStepIndex === i}
              aria-controls={`actividad-${activity.id}`}
              onClick={() => setCurrentStepIndex(i)}
            >
              {step.label}
            </button>
          ))}
        </div>

        <div
          className="activity-stage"
          id={`actividad-${activity.id}`}
          aria-live="polite"
        >
          <img
            src={`/assets/img/elemento-${currentStep.visual}.svg`}
            alt=""
            width={172}
            height={132}
            className="activity-image"
          />
          <div>
            <h4>{currentStep.titulo}</h4>
            <p>{currentStep.texto}</p>
            <p className="reflection-prompt">{currentStep.pregunta}</p>
          </div>
        </div>
      </div>
    </details>
  );
}
