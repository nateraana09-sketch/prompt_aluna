'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import contentData from '@/data/content.json';
import EjesNav from '@/components/aprender/EjesNav';
import TerritorioScene from '@/components/aprender/TerritorioScene';
import ConceptIndex from '@/components/aprender/ConceptIndex';
import TreeStudy from '@/components/aprender/TreeStudy';
import PreviousPhaseActivity from '@/components/aprender/PreviousPhaseActivity';

import Activity1DisarmDiscussion from '@/components/activities/Activity1DisarmDiscussion';
import Activity2BuildConversation from '@/components/activities/Activity2BuildConversation';
import Activity3BranchingStory from '@/components/activities/Activity3BranchingStory';
import Activity4ContextLens from '@/components/activities/Activity4ContextLens';

function AprenderContent() {
  const searchParams = useSearchParams();
  const initialEje = searchParams.get('eje') || '1';

  const [activeAxis, setActiveAxis] = useState(['1', '2', '3', '4'].includes(initialEje) ? initialEje : '1');
  const [currentScene, setCurrentScene] = useState('bosque');
  const [currentConceptId, setCurrentConceptId] = useState(null);
  const [reflectionOpen, setReflectionOpen] = useState(false);
  const [provenanceOpen, setProvenanceOpen] = useState(false);
  const [indexDefaultOpen, setIndexDefaultOpen] = useState(false);

  useEffect(() => {
    const ejeParam = searchParams.get('eje');
    if (ejeParam && ['1', '2', '3', '4'].includes(ejeParam)) {
      setActiveAxis(ejeParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#indice') {
      setIndexDefaultOpen(true);
      setActiveAxis('1');
    } else if (hash === '#procedencia') {
      setProvenanceOpen(true);
    }

    const handleHash = () => {
      if (window.location.hash === '#indice') {
        setIndexDefaultOpen(true);
        setActiveAxis('1');
      } else if (window.location.hash === '#procedencia') {
        setProvenanceOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectAxis = (axisId, scroll = true) => {
    setActiveAxis(axisId);
    setCurrentConceptId(null);
    const url = new URL(window.location.href);
    url.searchParams.set('eje', axisId);
    if (scroll) url.hash = '';
    window.history.replaceState(null, '', url);

    if (scroll) {
      const heading = document.getElementById(`eje${axisId}-title`);
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSelectConcept = (conceptId) => {
    if (conceptId === 'nikuma') {
      handleSelectAxis('2', true);
      return;
    }
    const c = contentData.conceptos.find(c => c.id === conceptId);
    if (!c) return;
    if (c.escena && c.escena !== currentScene) {
      setCurrentScene(c.escena);
    }
    setCurrentConceptId(conceptId);

    // Ensure we are viewing Eje 1 (where the scene is)
    if (activeAxis !== '1') {
      setActiveAxis('1');
    }
    const sceneEl = document.getElementById('territorio');
    if (sceneEl) {
      sceneEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleClosePanel = () => {
    setCurrentConceptId(null);
  };

  const handleGoToActivity = (axisId) => {
    setCurrentConceptId(null);
    handleSelectAxis(String(axisId), false);
    setTimeout(() => {
      const target = document.querySelector(`[data-experience="${axisId}"]`);
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.focus({ preventScroll: true });
      }
    }, 100);
  };

  const activityForAxis = (axisId) => {
    return contentData.actividades?.find(a => String(a.id) === String(axisId));
  };

  return (
    <>
      <section className="explore-intro">
        <p className="eyebrow">Observa · Explora · Comprende</p>
        <h2>
          El territorio vivo<span>.</span>
        </h2>
        <p>Acércate a un elemento. Descubre una experiencia y otra forma de mirarla.</p>
      </section>

      <EjesNav activeAxis={activeAxis} onSelectAxis={handleSelectAxis} />

      {/* Territorio landscape exploration shown on Eje 1 */}
      {activeAxis === '1' && (
        <TerritorioScene
          currentScene={currentScene}
          onChangeScene={setCurrentScene}
          currentConceptId={currentConceptId}
          onSelectConcept={handleSelectConcept}
          onClosePanel={handleClosePanel}
          onGoToActivity={handleGoToActivity}
          data={contentData}
        />
      )}

      {/* Eje 01 */}
      <section
        id="eje1"
        className="eje-content"
        aria-labelledby="eje1-title"
        hidden={activeAxis !== '1'}
      >
        <p className="eyebrow">Eje 01 · Reconocer</p>
        <h2 id="eje1-title">Reconocimiento y comprensión de las emociones.</h2>
        <p>Una emoción, una acción y una forma de relacionarnos no son lo mismo. Acércate a sus diferencias, a tu ritmo.</p>

        <Activity1DisarmDiscussion />
        <PreviousPhaseActivity activity={activityForAxis(1)} />

        <ConceptIndex
          data={contentData}
          onSelectConcept={handleSelectConcept}
          defaultOpen={indexDefaultOpen}
        />

        <details className="reflection">
          <summary>Otra mirada: sentir y actuar</summary>
          <p className="eyebrow">Una pausa para comprender</p>
          <h3>Sentir y actuar son diferentes</h3>
          <p>En una discusión alguien siente rabia y después insulta. ¿Cómo podemos distinguir esos dos momentos?</p>
          <button
            type="button"
            id="reflexion"
            className="btn btn-acento"
            aria-expanded={reflectionOpen}
            aria-controls="reflexion-texto"
            onClick={() => setReflectionOpen(!reflectionOpen)}
          >
            {reflectionOpen ? 'Cerrar la reflexión' : 'Abrir la reflexión'}
          </button>
          {reflectionOpen && (
            <div id="reflexion-texto">
              <p>
                <strong>Sheishe</strong> nombra la rabia en el informe; <strong>Nusa</strong> se refiere a cuando ya se llega al maltrato. Sentir una emoción no justifica una agresión. El diálogo y los acuerdos aparecen en §8.1 como principios de convivencia.
              </p>
              <details className="reading-source">
                <summary>Sobre esta lectura</summary>
                <p>Situación y lectura propuestas por el equipo. No es una evaluación ni genera un resultado personal.</p>
              </details>
            </div>
          )}
        </details>
      </section>

      {/* Eje 02 */}
      <section
        id="eje2"
        className="eje-content"
        aria-labelledby="eje2-title"
        hidden={activeAxis !== '2'}
      >
        <p className="eyebrow">Eje 02 · Cuidar</p>
        <h2 id="eje2-title">Regulación emocional, bienestar y autocuidado.</h2>

        <div className="nikuma-story">
          <img
            src="/assets/img/elemento-arbol.svg"
            width={172}
            height={132}
            alt="Ilustración de un árbol sin atribución botánica o cultural"
          />
          <div>
            <p className="eyebrow">Persona · Vínculos · Entorno</p>
            <h3>El cuidado también está en los vínculos</h3>
            <p>
              El bienestar no se limita a lo individual. La escucha, los acuerdos y la vida compartida permiten pensar el cuidado en relación con otras personas y con el entorno.
            </p>
            <details className="reading-source">
              <summary>Referencia cultural: Nikuma</summary>
              <p>
                El documento técnico de 2024, §6.3, emplea esta grafía y la vincula con vida saludable y organización política, social y cultural. Es una definición de esa fuente. Su uso público, su escritura y su pertinencia como posible nombre requieren validación; no es la identidad del producto.
              </p>
            </details>
          </div>
        </div>

        <Activity2BuildConversation />
        <PreviousPhaseActivity activity={activityForAxis(2)} />

        <TreeStudy />

        <div className="relation-map" aria-label="Ámbitos del cuidado en relación">
          <span>Persona y familia</span>
          <span>Comunidad y autoridades</span>
          <strong>Cuidar en relación</strong>
          <span>Territorio y naturaleza</span>
          <span>Organización y linajes</span>
        </div>

        <details className="reading-source">
          <summary>Sobre esta lectura</summary>
          <p>Diagrama del equipo basado en §6.3 y §9; no representa una cartografía comunitaria.</p>
        </details>

        <div className="reading-rows">
          <details>
            <summary>El consejo y la educación propia</summary>
            <p>
              El informe sitúa el consejo de los mayores como orientación a lo largo de la vida. Incluye aprender a cuidar la palabra y la relación con el entorno. No se presenta como una receta individual ni como una orden de callar el sufrimiento.
            </p>
            <details className="reading-source">
              <summary>Sobre esta lectura</summary>
              <p>Documento §8.1 y §8.3.</p>
            </details>
          </details>
          <details>
            <summary>Los vínculos también cuidan</summary>
            <p>
              Adecuar caminos, construir puentes y espacios comunitarios aparecen como trabajos colectivos relacionados con bienestar. No son actividades prescritas por Prototipo de bienestar: tienen contexto y organización propios.
            </p>
            <details className="reading-source">
              <summary>Sobre esta lectura</summary>
              <p>Documento §8.5.</p>
            </details>
          </details>
          <details>
            <summary>Pensamiento, palabra, escucha y visión</summary>
            <p>
              El documento describe cuatro principios de sentido. Su cuidado se relaciona con la armonía personal, social, comunitaria y territorial.
            </p>
            <details className="reading-source">
              <summary>Sobre esta lectura</summary>
              <p>Documento §7.1.</p>
            </details>
          </details>
          <details>
            <summary>Flores, viento y plantas: mirar con atención</summary>
            <p>
              La recopilación atribuye a Judith estas imágenes para hablar de frescura, alivio y vida saludable. La manzanilla es uno de los nombres recogidos. Su especie exacta no está confirmada; aquí se muestra una referencia posible, sin recomendar usos medicinales.
            </p>
            <details className="reading-source">
              <summary>Sobre esta lectura</summary>
              <p>Recopilación §3. Asociación pendiente de validación directa.</p>
            </details>
          </details>
        </div>

        <aside className="editorial">
          <strong>Una situación para conversar</strong>
          <p>
            Después de un conflicto en un trabajo compartido, ¿con quién podrías hablar y qué acuerdos sería posible construir? Es una pregunta del equipo, inspirada en el diálogo y los acuerdos de §8.1. Puedes pensarla en privado; no se registra ninguna respuesta.
          </p>
        </aside>
      </section>

      {/* Eje 03 */}
      <section
        id="eje3"
        className="eje-content"
        aria-labelledby="eje3-title"
        hidden={activeAxis !== '3'}
      >
        <p className="eyebrow">Eje 03 · Acompañar</p>
        <h2 id="eje3-title">Comprensión del malestar emocional y búsqueda de apoyo.</h2>
        <p className="lead">No necesitas tener un nombre exacto para lo que sientes para pedir compañía.</p>

        <Activity3BranchingStory />
        <PreviousPhaseActivity activity={activityForAxis(3)} />

        <p>
          Las fuentes relacionan el malestar con las vivencias, los vínculos y la vida espiritual y comunitaria. Estas perspectivas culturales no son diagnósticos médicos ni causas que Prototipo de bienestar pueda atribuir a una persona.
        </p>

        <div className="reading-rows">
          <details open>
            <summary>Cuando el malestar necesita atención</summary>
            <p>
              Una tristeza que preocupa, la dificultad para dormir tras una pérdida o el aislamiento merecen una conversación y acompañamiento. No hay en este prototipo un número de días ni una lista para determinar un trastorno.
            </p>
            <details className="reading-source">
              <summary>Sobre esta lectura</summary>
              <p>Recopilación §3 y §5; documento §7.3.5. Orientación editorial sin evaluación.</p>
            </details>
          </details>
          <details>
            <summary>Los sueños en su contexto</summary>
            <p>
              El documento reconoce los sueños dentro del cuidado preventivo y sitúa su interpretación bajo la consulta tradicional. Prototipo de bienestar no interpreta sueños ni simula la consulta del mamo o la saka.
            </p>
            <details className="reading-source">
              <summary>Sobre esta lectura</summary>
              <p>Documento §7.2.</p>
            </details>
          </details>
        </div>

        <ol className="support-path">
          <li>
            <strong>Una persona que pueda escucharte</strong>
            <p>La recopilación destaca a los padres y personas de confianza. Si ese vínculo no es seguro o accesible, busca otra persona que pueda acompañarte.</p>
          </li>
          <li>
            <strong>Redes y autoridades tradicionales</strong>
            <p>Mamo, saka, mayores y acompañamiento comunitario, según el contexto y la decisión de la persona.</p>
          </li>
          <li>
            <strong>Servicios de salud</strong>
            <p>El diálogo intercultural puede articular el cuidado propio con profesionales. No tienes que agotar una ruta antes de acceder a atención.</p>
          </li>
        </ol>

        <details className="reading-source">
          <summary>Sobre esta lectura</summary>
          <p>Fuentes: recopilación §8 y documento §8.6–8.8. La posibilidad de elegir un vínculo seguro y acceder directamente a salud es orientación del equipo.</p>
        </details>

        <Link className="btn btn-acento" href="/apoyo">
          Ver opciones de acompañamiento ↗
        </Link>

        <aside className="aviso">
          Si existe peligro inmediato o alguien piensa hacerse daño, busca compañía y atención presencial urgente. No esperes a terminar estas lecturas.
        </aside>
      </section>

      {/* Eje 04 */}
      <section
        id="eje4"
        className="eje-content"
        aria-labelledby="eje4-title"
        hidden={activeAxis !== '4'}
      >
        <p className="eyebrow">Eje 04 · Informarse</p>
        <h2 id="eje4-title">Sustancias psicoactivas y cuidado.</h2>
        <p className="lead">Comprender el contexto también es cuidar.</p>

        <Activity4ContextLens />
        <PreviousPhaseActivity activity={activityForAxis(4)} />

        <p>
          El informe identifica el acceso fácil y desinformado a sustancias como una preocupación. También reconoce limitaciones de registro: la ausencia de datos no permite concluir ausencia de situaciones ni inventar cifras.
        </p>
        <details className="reading-source">
          <summary>Sobre esta lectura</summary>
          <p>Documento §7.2 y §7.3.3.</p>
        </details>

        <div className="context-split">
          <article>
            <span className="eyebrow">Cada práctica tiene un contexto</span>
            <h3>Jañu, nuake y sugi</h3>
            <p>
              El documento menciona la hoja de coca, el tabaco y el poporo en contextos tradicionales. En el ciclo de desarrollo masculino, la entrega del poporo se relaciona con madurez, reflexión, palabra y responsabilidad.
            </p>
            <p>
              Son plantas y objetos con contextos distintos; el poporo no es una sustancia. Esta descripción no constituye una indicación de uso ni una afirmación de inocuidad.
            </p>
            <details className="reading-source">
              <summary>Sobre esta lectura</summary>
              <p>Documento §6.9.1; recopilación §6–7.</p>
            </details>
          </article>
          <article>
            <span className="eyebrow">Para cuidar</span>
            <h3>Preguntar antes de asumir</h3>
            <p>
              No equiparar una práctica tradicional con consumo recreativo o problemático. Si una situación te preocupa, conversa con una persona de confianza, una autoridad tradicional o un servicio de salud.
            </p>
            <p>
              Evita tomar decisiones desde la presión de otras personas o información que no comprendes. La experiencia no recomienda sustancias ni ofrece pautas de consumo.
            </p>
          </article>
        </div>

        <Link className="text-link" href="/apoyo">
          Encontrar acompañamiento ↗
        </Link>
      </section>

      {/* Fuentes y créditos */}
      <details
        id="procedencia"
        className="provenance"
        open={provenanceOpen}
        onToggle={(e) => setProvenanceOpen(e.currentTarget.open)}
      >
        <summary>Fuentes y créditos</summary>
        <p>
          Las actividades y las ilustraciones son propuestas educativas de Prototipo de bienestar. Las asociaciones culturales conservan los matices de las fuentes y necesitan revisión comunitaria. Puedes consultar las precisiones dentro de cada lectura.
        </p>

        <div id="fuentes">
          {contentData.fuentes?.map((f, i) => (
            <details key={i}>
              <summary>{f.titulo}</summary>
              <p>{f.detalle}</p>
            </details>
          ))}
        </div>

        <details>
          <summary>Fotografías e ilustraciones</summary>
          <ul>
            <li>
              Sierra Nevada de Santa Marta:{' '}
              <a
                href="https://commons.wikimedia.org/wiki/File:Sierra_Nevada_de_Santa_Marta.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Taggen, 2011
              </a>{' '}
              ·{' '}
              <a
                href="https://creativecommons.org/licenses/by-sa/3.0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY-SA 3.0
              </a>
              . Recorte y ajuste de luminosidad en pantalla; adaptación bajo la misma licencia.
            </li>
            <li>
              Referencia de manzanilla:{' '}
              <a
                href="https://commons.wikimedia.org/wiki/File:Matricaria_chamomilla_flower.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tulumnes, 2016
              </a>{' '}
              ·{' '}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY-SA 4.0
              </a>
              . Rotulada como Matricaria chamomilla por el autor; no identifica la planta concreta de Judith. Recorte en pantalla bajo la misma licencia.
            </li>
            <li>
              Neblina:{' '}
              <a
                href="https://www.pexels.com/photo/an-aerial-photography-of-green-trees-on-a-foggy-mountain-6965010/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mikhail Nilov
              </a>
              . Río:{' '}
              <a
                href="https://www.pexels.com/photo/river-on-the-forest-photography-2189708/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Emre Can Acer
              </a>
              . Paisajes ilustrativos; no se atribuyen a la Sierra.{' '}
              <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">
                Licencia Pexels
              </a>
              .
            </li>
            <li>
              Ilustraciones de niebla, luna, fuego, tierra, árbol, flor, agua, viento y conversación: creadas para Prototipo de bienestar. No representan símbolos tradicionales ni reproducen especies botánicas.
            </li>
          </ul>
        </details>
      </details>
    </>
  );
}

export default function AprenderPage() {
  return (
    <Suspense fallback={<div className="explore-intro"><p>Cargando territorio vivo…</p></div>}>
      <AprenderContent />
    </Suspense>
  );
}
