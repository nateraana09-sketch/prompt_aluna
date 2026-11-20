'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import contentData from '../../data/content.json';
import EjesNav from '../../components/aprender/EjesNav';
import TerritorioScene from '../../components/aprender/TerritorioScene';
import ConceptIndex from '../../components/aprender/ConceptIndex';
import TreeStudy from '../../components/aprender/TreeStudy';
import PreviousPhaseActivity from '../../components/aprender/PreviousPhaseActivity';

import Activity1DisarmDiscussion from '../../components/activities/Activity1DisarmDiscussion';
import Activity2BuildConversation from '../../components/activities/Activity2BuildConversation';
import Activity3BranchingStory from '../../components/activities/Activity3BranchingStory';
import Activity4ContextLens from '../../components/activities/Activity4ContextLens';

function AprenderContent() {
  const searchParams = useSearchParams();
  const initialEje = searchParams.get('eje') || '1';

  const [activeAxis, setActiveAxis] = useState(['1', '2', '3', '4', '5'].includes(initialEje) ? initialEje : '1');
  const [currentScene, setCurrentScene] = useState('bosque');
  const [currentConceptId, setCurrentConceptId] = useState(null);
  const [reflectionOpen, setReflectionOpen] = useState(false);
  const [provenanceOpen, setProvenanceOpen] = useState(false);
  const [indexDefaultOpen, setIndexDefaultOpen] = useState(false);

  useEffect(() => {
    const ejeParam = searchParams.get('eje');
    if (ejeParam && ['1', '2', '3', '4', '5'].includes(ejeParam)) {
      setActiveAxis(ejeParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#indice') {
      setIndexDefaultOpen(true);
      setActiveAxis('1');
    } else if (hash === '#procedencia' || hash === '#fuentes') {
      setActiveAxis('5');
      setProvenanceOpen(true);
    }

    const handleHash = () => {
      if (window.location.hash === '#indice') {
        setIndexDefaultOpen(true);
        setActiveAxis('1');
      } else if (window.location.hash === '#procedencia' || window.location.hash === '#fuentes') {
        setActiveAxis('5');
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

      {/* Eje 05 · Fuentes y créditos centralizados */}
      <section
        id="eje5"
        className="eje-content"
        aria-labelledby="eje5-title"
        hidden={activeAxis !== '5'}
      >
        <p className="eyebrow">Eje 05 · Fuentes y créditos</p>
        <h2 id="eje5-title">Fuentes, referencias y créditos del proyecto.</h2>
        <p className="lead">
          Centralización de fuentes documentales, referencias institucionales, atribuciones de imágenes y reconocimientos metodológicos de Prototipo de bienestar.
        </p>

        <div className="reading-rows">
          {/* Bloque 1: Fuentes bibliográficas e investigación documental */}
          <details open>
            <summary>Fuentes documentales e investigación</summary>
            <p>
              Documentación técnica y recopilaciones de campo que respaldan los contenidos y términos documentales:
            </p>
            {contentData.fuentes?.map((f, i) => (
              <details key={i} className="reading-source" open>
                <summary>{f.titulo}</summary>
                <p>{f.detalle}</p>
              </details>
            ))}
          </details>

          {/* Bloque 2: Referencias normativas e institucionales (de Apoyo) */}
          <details open>
            <summary>Referencias institucionales y teleorientación (Apoyo)</summary>
            <p>
              Fuentes oficiales y entidades consultadas para las rutas de orientación y cuidado:
            </p>
            <details className="reading-source" open>
              <summary>Línea 106 · Ministerio de Salud y Protección Social</summary>
              <p>
                Recurso de teleorientación en salud mental del Ministerio de Salud. La ruta nacional corresponde a territorios sin una línea 106 propia; donde existe una línea local, la atención puede canalizarse territorialmente.
              </p>
              <p>
                La circular ministerial de febrero de 2026 mantiene esta ruta nacional. El directorio publicado en agosto de 2025 no registra una línea departamental activa para Magdalena; ese dato histórico no garantiza la situación local actual. Consulta el directorio para tu ubicación. La conectividad y el enrutamiento pueden variar; no se garantiza conexión ni respuesta inmediata.
              </p>
              <p>
                <a
                  className="text-link"
                  href="https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/directorio-salud-mental-prevencion-suicidio-minsalud.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Directorio oficial nacional y territorial ↗
                </a>
              </p>
              <p>
                <a
                  className="text-link"
                  href="https://www.minsalud.gov.co/Normatividad_Nuevo/Circular%20Externa%20No%20002%20de%202026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Circular del Ministerio ↗
                </a>
              </p>
            </details>
            <details className="reading-source" open>
              <summary>Bienestar Universitario · Universidad del Magdalena</summary>
              <p>
                La Dirección de Bienestar Universitario informa sobre sus servicios de Desarrollo Humano y atención en Psicología. Consulta con la institución la disponibilidad y los requisitos vigentes.
              </p>
              <p>
                <a
                  className="text-link"
                  href="https://www.unimagdalena.edu.co/UnidadesOrganizativas/Direccion/10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar información institucional ↗
                </a>
              </p>
              <p className="photo-note">
                Página oficial consultada el 17 de noviembre de 2026. Abrirás un sitio externo. Este enlace no es un servicio de emergencia.
              </p>
            </details>
          </details>

          {/* Bloque 3: Atribuciones de imágenes fotográficas y licencias */}
          <details open>
            <summary>Fotografías y licencias de uso</summary>
            <ul>
              <li>
                <strong>Sierra Nevada de Santa Marta (sierra-nevada-taggen.jpg):</strong>{' '}
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
                <strong>Referencia de manzanilla (manzanilla-tulumnes.jpg):</strong>{' '}
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
                <strong>Neblina (bosque-neblina.jpg):</strong>{' '}
                <a
                  href="https://www.pexels.com/photo/an-aerial-photography-of-green-trees-on-a-foggy-mountain-6965010/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mikhail Nilov
                </a>
                . Paisaje ilustrativo de naturaleza; no se atribuye a la Sierra Nevada.{' '}
                <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">
                  Licencia Pexels
                </a>
                .
              </li>
              <li>
                <strong>Río (rio-bosque.jpg):</strong>{' '}
                <a
                  href="https://www.pexels.com/photo/river-on-the-forest-photography-2189708/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Emre Can Acer
                </a>
                . Paisaje ilustrativo de naturaleza; no se atribuye a la Sierra.{' '}
                <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">
                  Licencia Pexels
                </a>
                .
              </li>
              <li>
                <strong>Flores (flores-luz.jpg):</strong>{' '}
                <a
                  href="https://www.pexels.com/photo/close-up-of-flowers-in-a-meadow-12811058/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Irina Iriser
                </a>
                . Paisaje ilustrativo; conservado como recurso gráfico.{' '}
                <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">
                  Licencia Pexels
                </a>
                .
              </li>
            </ul>
          </details>

          {/* Bloque 4: Ilustraciones y recursos vectoriales */}
          <details open>
            <summary>Ilustraciones vectoriales y estudios gráficos</summary>
            <ul>
              <li>
                <strong>Elementos del paisaje (elemento-*.svg):</strong> Ilustraciones originales de niebla, luna, fuego, tierra, árbol, flor, agua, viento y conversación, creadas para Prototipo de bienestar. No representan símbolos tradicionales ni reproducen especies botánicas.
              </li>
              <li>
                <strong>Estudios de guía visual (guia-rama.svg y guia-felino.svg):</strong> Dibujos vectoriales originales del proyecto. La rama señala dónde actuar sin especie botánica atribuida; el felino es una propuesta gráfica de estudio sin significado cultural atribuido. Ninguno es una figura tradicional ni interpreta lo que sientes.
              </li>
            </ul>
          </details>

          {/* Bloque 5: Referencias metodológicas por eje temático */}
          <details open>
            <summary>Referencias conceptuales y metodológicas por eje</summary>
            <ul>
              <li>
                <strong>Eje 01 (Reconocer):</strong> Fuente: Documento técnico 2024 §7.2 y §8.1; Recopilación §3. Frases y agrupación: propuesta pedagógica del equipo, no traducción cultural. Sheishe (rabia) y Nusa (rabia que llega al maltrato) según las fuentes.
              </li>
              <li>
                <strong>Eje 02 (Cuidar):</strong> Fuente: Documento técnico 2024 §6.3 (Nikuma: vida saludable y organización política, social y cultural), §8.1 y §8.3 (Dulazhikshiji: diálogo y acuerdos), §8.5 (trabajos colectivos y puentes), §7.1 (principios de sentido: pensamiento, palabra, escucha y visión), §9 (diagrama de cuidado en relación) y Recopilación §3.
              </li>
              <li>
                <strong>Eje 03 (Acompañar):</strong> Fuente: Recopilación §3, §5 y §8; Documento técnico 2024 §7.2 (sueños y consulta tradicional), §7.3.5 (malestar emocional sin umbral de días) y §8.6–8.8 (rutas de acompañamiento y libre elección de vínculo seguro).
              </li>
              <li>
                <strong>Eje 04 (Contexto):</strong> Fuente: Documento técnico 2024 §6.9.1, §7.2 y §7.3.3; Recopilación §6–7. Jañu (hoja de coca), nuake (tabaco) y sugi (poporo) en sus contextos documentados de desarrollo masculino y responsabilidad; no son indicaciones de uso ni afirmación de inocuidad.
              </li>
            </ul>
          </details>

          {/* Bloque 6: Marco institucional y salvaguardas (de Acerca) */}
          <details open>
            <summary>Marco institucional, propósito y salvaguardas (Acerca)</summary>
            <p>
              <strong>Seminario Intercultural · Universidad del Magdalena:</strong> Experiencia de psicoeducación y orientación intercultural, pensada principalmente para hombres jóvenes Kogui de 18 a 28 años. Acerca experiencias emocionales y posibilidades de cuidado desde contenidos documentados y actividades educativas.
            </p>
            <p>
              <strong>Identidad provisional:</strong> Prototipo de bienestar.
            </p>
            <p>
              <strong>Límites y alcance:</strong> Sus contenidos son informativos y educativos. No realiza diagnósticos ni evaluaciones clínicas, no ofrece terapia ni sustituye la atención de profesionales o instituciones de salud. No solicita cuentas, no almacena respuestas personales ni genera perfiles.
            </p>
          </details>
        </div>
      </section>

      {/* Fuentes y créditos generales (accesible por ancla #procedencia) */}
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
