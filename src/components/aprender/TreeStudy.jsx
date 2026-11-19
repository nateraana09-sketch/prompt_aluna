'use client';

import { useState } from 'react';

const TREE_QUESTIONS = {
  raices: 'Los vínculos pueden sostener: ¿a quién podríamos pedir compañía?',
  ramas: 'Puede haber distintas opciones: ¿qué alternativas de cuidado caben en una situación?',
  copa: 'Antes de responder, observa: ¿qué sabemos y qué estamos suponiendo?'
};

export default function TreeStudy() {
  const [selectedPart, setSelectedPart] = useState('raices');

  return (
    <details className="tree-study">
      <summary>Una pausa junto al árbol · Exploración visual</summary>
      <p>Observa tres partes de esta ilustración y abre una pregunta para conversar. No representa una especie determinada ni una tradición.</p>

      <div className="tree-workbench" data-part={selectedPart}>
        <img
          src="/assets/img/elemento-arbol.svg"
          width={172}
          height={132}
          alt="Árbol esquemático, sin rostro, con tronco y copa"
        />
        <div className="tree-controls">
          <button
            type="button"
            data-tree="raices"
            aria-pressed={selectedPart === 'raices'}
            onClick={() => setSelectedPart('raices')}
          >
            Raíces
          </button>
          <button
            type="button"
            data-tree="ramas"
            aria-pressed={selectedPart === 'ramas'}
            onClick={() => setSelectedPart('ramas')}
          >
            Ramas
          </button>
          <button
            type="button"
            data-tree="copa"
            aria-pressed={selectedPart === 'copa'}
            onClick={() => setSelectedPart('copa')}
          >
            Copa
          </button>
        </div>
      </div>

      <p id="tree-question" role="status">
        {TREE_QUESTIONS[selectedPart]}
      </p>
      <p className="quiet-note">
        Estudio gráfico provisional del proyecto. No interpreta emociones ni cambia según lo que sientas.
      </p>
    </details>
  );
}
