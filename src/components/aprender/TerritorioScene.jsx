'use client';

import { useState, useEffect, useRef } from 'react';
import ConceptDetailPanel from './ConceptDetailPanel';

const SCENES = {
  bosque: {
    image: 'sierra-nevada-taggen.jpg',
    title: 'Entre bosque y montaña',
    number: '01 / 03',
    alt: 'Bosque y cumbres de la Sierra Nevada de Santa Marta, fotografía de Taggen',
    credit: 'Sierra Nevada: Taggen · CC BY-SA 3.0. ',
    points: [
      ['preocupacion', 'Neblina', 25, 36, 'niebla'],
      ['tristeza-profunda', 'Noche y pensamiento', 73, 24, 'noche'],
      ['rabia', 'Fuego y rabia', 70, 65, 'fuego'],
      ['firmeza', 'Tierra y firmeza', 26, 72, 'tierra']
    ]
  },
  flores: {
    image: 'bosque-neblina.jpg',
    title: 'Plantas, flores y viento',
    number: '02 / 03',
    alt: 'Bosque entre neblina, fondo ilustrativo para explorar plantas y viento',
    credit: 'Naturaleza ilustrativa · Pexels. ',
    points: [
      ['calma', 'Flores y frescura', 24, 39, 'manzanilla'],
      ['esperanza', 'Árboles y alivio', 73, 59, 'arbol'],
      ['alegria', 'Alegría', 27, 73, 'palabra'],
      ['nikuma', 'Cuidar en relación', 73, 22, 'viento']
    ]
  },
  rio: {
    image: 'rio-bosque.jpg',
    title: 'La palabra y los vínculos',
    number: '03 / 03',
    alt: 'Un río discurre entre árboles y rocas; fotografía de naturaleza ilustrativa',
    credit: 'Naturaleza ilustrativa · Pexels. ',
    points: [
      ['tristeza-perdida', 'Ante una pérdida', 27, 31, 'agua'],
      ['celos', 'Celos', 73, 48, 'palabra'],
      ['chismes', 'La palabra', 29, 72, 'palabra']
    ]
  }
};

const SUGGESTIONS = ['preocupacion', 'rabia', 'firmeza', 'calma', 'esperanza', 'tristeza-perdida'];

export default function TerritorioScene({
  currentScene,
  onChangeScene,
  currentConceptId,
  onSelectConcept,
  onClosePanel,
  onGoToActivity,
  data
}) {
  const [paused, setPaused] = useState(false);
  const [suggestionIdx, setSuggestionIdx] = useState(0);
  const touchStartRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPaused(mql.matches);
    const handler = (e) => setPaused(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const activeSceneInfo = SCENES[currentScene] || SCENES.bosque;
  const activeConcept = data?.conceptos?.find(c => c.id === currentConceptId) || null;

  const handleSuggest = () => {
    const nextConceptId = SUGGESTIONS[suggestionIdx % SUGGESTIONS.length];
    setSuggestionIdx(prev => prev + 1);
    onSelectConcept(nextConceptId);
  };

  const handlePointerDown = (e) => {
    if (e.pointerType === 'touch' && !e.target.closest('button, #panel-detalle')) {
      touchStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = (e) => {
    if (!touchStartRef.current) return;
    const dx = e.clientX - touchStartRef.current.x;
    const dy = e.clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      const sceneIds = Object.keys(SCENES);
      const currIdx = sceneIds.indexOf(currentScene);
      const nextIdx = (currIdx + (dx < 0 ? 1 : 2)) % sceneIds.length;
      onChangeScene(sceneIds[nextIdx]);
    }
  };

  return (
    <section className="territorio" aria-label="Exploración del territorio">
      <div
        ref={sceneRef}
        className={`escena-wrap ${activeConcept ? 'is-focused' : ''} ${paused ? 'motion-paused' : ''}`}
        id="territorio"
        data-ambiente={currentScene}
        data-reading={activeConcept?.visual || undefined}
        onPointerDown={handlePointerDown}
        onPointerCancel={() => { touchStartRef.current = null; }}
        onPointerUp={handlePointerUp}
      >
        <img
          id="paisaje"
          className="paisaje"
          src={`/assets/img/${activeSceneInfo.image}`}
          alt={activeSceneInfo.alt}
          width={1280}
          height={960}
          fetchPriority="high"
        />
        <div className="scene-shade" aria-hidden="true" />
        <div className="mist-layer" aria-hidden="true" />

        <div className="scene-top">
          <span className="scene-kicker">OBSERVAR · COMPRENDER</span>
          <button
            id="movimiento"
            type="button"
            className="scene-small"
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? 'Transiciones: reducidas' : 'Transiciones: activadas'}
          </button>
        </div>

        <div id="hotspots" role="group" aria-label="Puntos de exploración">
          {activeSceneInfo.points.map(([conceptId, label, x, y, visual]) => {
            const isSelected = currentConceptId === conceptId;
            const imgSrc = visual === 'manzanilla'
              ? '/assets/img/manzanilla-tulumnes.jpg'
              : `/assets/img/elemento-${visual}.svg`;

            return (
              <button
                key={conceptId}
                type="button"
                className={`landmark element-${visual}`}
                style={{ '--x': `${x}%`, '--y': `${y}%` }}
                data-concept={conceptId}
                aria-controls={conceptId === 'nikuma' ? 'eje2' : 'panel-detalle'}
                aria-expanded={isSelected}
                aria-label={`Explorar ${label}`}
                onClick={() => onSelectConcept(conceptId)}
              >
                <img
                  src={imgSrc}
                  alt=""
                  width={172}
                  height={132}
                  className="landmark-figure"
                />
                <span className="landmark-label">{label}</span>
              </button>
            );
          })}
        </div>

        <div className="scene-caption">
          <span id="scene-number">{activeSceneInfo.number}</span>
          <h3 id="scene-title">{activeSceneInfo.title}</h3>
          <p id="scene-description">Elige un elemento del paisaje y descubre una nueva mirada.</p>
        </div>

        {activeConcept && (
          <ConceptDetailPanel
            concept={activeConcept}
            onClose={onClosePanel}
            onGoToActivity={onGoToActivity}
          />
        )}
      </div>

      <div className="scene-tools">
        <button
          id="recorrer"
          type="button"
          className="text-link"
          onClick={handleSuggest}
        >
          Sugerir otra mirada ↗
        </button>
        <a className="text-link" href="#indice">
          Buscar un concepto ↓
        </a>
      </div>

      <div className="ambientes" aria-label="Cambiar paisaje">
        <button
          type="button"
          data-scene="bosque"
          aria-pressed={currentScene === 'bosque'}
          onClick={() => onChangeScene('bosque')}
        >
          <span>01</span> Bosque y neblina
        </button>
        <button
          type="button"
          data-scene="flores"
          aria-pressed={currentScene === 'flores'}
          onClick={() => onChangeScene('flores')}
        >
          <span>02</span> Flores y luz
        </button>
        <button
          type="button"
          data-scene="rio"
          aria-pressed={currentScene === 'rio'}
          onClick={() => onChangeScene('rio')}
        >
          <span>03</span> Junto al río
        </button>
      </div>

      <p className="landscape-credit">
        {activeSceneInfo.credit}
        <a href="#procedencia">Fuentes y créditos</a>
      </p>
    </section>
  );
}
