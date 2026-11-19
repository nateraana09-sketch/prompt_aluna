# Prototipo de bienestar · Identidad provisional

## Estado vigente · Fase 4, 18 noviembre 2026

Se mantienen las cuatro páginas y la ejecución con Live Server. No se requieren nuevas dependencias para usar el sitio. Las referencias a fases previas de este archivo son históricas.

**Cuatro experiencias participativas, una por eje:**

| Experiencia | Qué se hace | Qué se busca comprender |
| --- | --- | --- |
| Desarma una discusión | Arrastrar o seleccionar frases y ubicarlas en Sentir, Pensar y Actuar; reubicar y comparar una lectura posible | Una emoción, una interpretación y una acción son diferentes. Sheishe y Nusa se presentan según la fuente, sin equivalencia intercambiable. |
| Construye una conversación | Reorganizar piezas con arrastre o Subir/Bajar; recorrer la secuencia elegida | Observar, escuchar y acordar pueden relacionarse y retomarse; no hay un orden clínico obligatorio. |
| Un mensaje, varios caminos | Tomar decisiones, abrir ramas, volver atrás y comparar cierres | Acompañar permite respetar límites y explorar redes, sin interpretar ni decidir por alguien. |
| La lupa del contexto | Desplazar una lupa por una lámina editorial mediante puntero o deslizador accesible | Distinguir contexto, información y acompañamiento antes de generalizar sobre plantas, objetos y prácticas. |

Se conservan las miradas de la fase anterior dentro de desplegables. Las actividades son propuestas del equipo: no se presentan como juegos tradicionales ni como culturalmente aprobadas. No se manipulan elementos sagrados ni se simulan rituales. No hay puntuación, resultado personal ni almacenamiento.

**Catálogo:** 18 entradas. Se incorporaron escucha, diálogo/acuerdos, consejo/educación propia, sueños en su contexto, aislamiento/vínculos e información/contexto de cuidado. Cada entrada mantiene eje, tipo, representación, explicación, ejemplo y referencia. El catálogo cruza los cuatro ejes; no son dieciocho emociones. No se agregaron sensaciones físicas sin respaldo suficiente.

**Búsqueda local:** `assets/js/busqueda.js` usa coincidencias parciales, grafías documentales, un índice explícito de expresiones en español y tolerancia limitada a errores. Cada resultado explica la relación. «Enojo» y «molesto» conducen a rabia como equivalencia o relación editorial en español, nunca como traducción Kogui. «Impotencia» no se asocia por falta de respaldo. La escritura Kogui permanece marcada como documental y pendiente de revisión lingüística; no hay pronunciación sintetizada.

**Presentación:** `assets/js/presentacion.js` crea un marco de teléfono solo para la ventana superior de escritorio, a partir de 900 px. El contenido real se muestra en un iframe local de 414 px para que sus reglas móviles se apliquen correctamente. En teléfonos no crea iframe ni marco. No usa perfiles ni datos de navegador. La navegación del documento embebido mantiene las cuatro páginas; enlaces institucionales se abren aparte.

**Movimiento:** se retiró la animación permanente de neblina. El control ahora indica «Transiciones», y reduce o activa las respuestas de entrada del paisaje. Se mantienen respuestas a selección, conexión de secuencias y desplazamiento de la lupa. `prefers-reduced-motion` prevalece. No hay bucle de juego ni temporizador de animación.

**Guía revisable:** rama que dirige la atención y estudio gráfico de felino disponibles solo en una exploración opcional. Son ilustraciones originales, sin especie botánica atribuida, sin significado cultural ni función de lectura emocional. El corpus no respalda asignar al jaguar un significado Kogui; la alternativa queda como propuesta gráfica pendiente de validación, sin adopción permanente.

**Archivos nuevos:** `assets/js/experiencias.js`, `assets/js/busqueda.js`, `assets/js/presentacion.js`, `assets/css/participacion.css`, dos SVG de estudios de guía y `tools/test-participacion.cjs`. Se modificaron los cuatro HTML, app.js, content.json/content.js, pruebas y documentación. No se eliminaron recursos anteriores. Respaldo: `backups/antes-fase4-20261118/`.

**Pruebas:** 20 grupos anteriores y 10 grupos nuevos en DOM emulado. El nuevo conjunto ejecuta clics, eventos de puntero, cancelación, reordenación, ambas ramas de historia, las posiciones de la lupa, reinicios, búsqueda y condiciones del marco. Se usan dobles para geometría y foco; no certifican un dispositivo real. Resultados: `PRUEBAS-DOM.json`, `PRUEBAS-PARTICIPACION.json`, `VALIDACION.json`. Para repetir: `node tools/test-participacion.cjs` y los comandos de verificación ya descritos.

**Pendientes importantes:** renderizado a 360/390/430/1366, ausencia de desbordamiento comprobada visualmente, consola del navegador, arrastre y tacto reales, recepción cultural de las mecánicas y de los estudios de guía. Persiste la restricción de navegador de las fases anteriores: no se eludió ni se importaron perfiles. La implementación existe y sus estados se prueban localmente; no se declara validación visual ni aprobación comunitaria.

Proyecto estático de psicoeducación y orientación intercultural del Seminario de la Universidad del Magdalena, dirigido a hombres jóvenes de 18 a 28 años. No solicita cuentas, no registra respuestas personales y no incluye evaluación clínica.

## Estado vigente · Fase 3, 17 noviembre 2026

La identidad visible es **Prototipo de bienestar**, provisional. El nombre del seminario se retiró de las cuatro páginas; Nikuma tampoco se adopta como marca. Las notas de fases anteriores más abajo describen el historial y no sustituyen este estado.

Portada renovada como entrada al territorio; cuatro recorridos ilustrados y acceso directo a apoyo. En Aprender, el selector de ejes está antes del paisaje: los ejes 2–4 muestran su contenido sin obligar a recorrer el escenario inicial. Se mantienen los doce conceptos, cuatro actividades de tres miradas, búsqueda, movimiento reducido, gestos y retorno del foco. El control «Sugerir otra mirada» abre una lectura sin progreso ni puntuación. La exploración opcional del árbol permite elegir raíces, ramas o copa para abrir preguntas; no interpreta emociones ni adopta una especie o guía definitiva.

Se añadió `assets/css/experiencia.css`, compartido por las cuatro páginas: superficies beige, verde y tierra, nueva composición de portada y escenario, controles táctiles y lectura progresiva. Se mantiene un único tema cálido: evita añadir controles sin propósito. Las capas anteriores permanecen como base y recursos reutilizados.

La Línea 106 tiene ficha informativa y enlace telefónico en Apoyo, con cobertura territorial matizada y enlaces oficiales. Fuentes revisadas el 17/11/2026: directorio ministerial de agosto 2025 y circular de febrero 2026; no se promete disponibilidad efectiva ni atención inmediata. Bienestar de Unimagdalena fue contrastado nuevamente.

Tecnología: HTML semántico, CSS y JavaScript local. No se migra a framework porque los estados y los datos son pequeños y están resueltos sin servidor de aplicación, compilación, cuentas o APIs. No se añade PWA: no hay necesidad de cachear investigación o respaldos ni riesgo de servir una versión educativa desactualizada; los recursos esenciales ya están almacenados localmente. La primera visita mediante un servidor requiere acceso a ese servidor; no se afirma funcionamiento offline después de cerrarlo.

**Validación:** 20 grupos DOM; cada elemento del paisaje, cada panel, las tres lecturas de cada concepto, los doce estados de actividad, el árbol y la sugerencia. Se corrigió el simulador de foco para que use el documento propietario en pruebas con varias instancias. Las imágenes decorativas con `alt=""` se reconocen correctamente como tales en el verificador. Ver `PRUEBAS-DOM.json` y `VALIDACION.json`.

**Pendiente:** renderizado real a 360, 390, 430 y 1366 px, consola y tacto en navegador. Persiste la restricción del origen local registrada anteriormente; no se eludió ni se importaron perfiles. No se afirma haber probado visualmente esas resoluciones. La exploración del árbol y los términos culturales siguen pendientes de revisión comunitaria. Los originales se conservan y verifican por SHA-256.

Respaldo previo: `backups/antes-fase3-20261117/`. Archivos modificados: cuatro HTML, `assets/js/app.js`, `assets/data/content.json` y su JS generado, herramientas de verificación y documentación. Archivo de producto creado: `assets/css/experiencia.css`. No se eliminaron recursos preexistentes.

## Abrir con Live Server

1. En VS Code: **Archivo → Abrir carpeta** y seleccionar `C:\Users\ESTUDIANTE\Downloads\jieo - copia`.
2. Con la extensión **Live Server** instalada, hacer clic derecho en `index.html` → **Open with Live Server**.
3. Abrir la dirección local que indique la extensión, normalmente `http://127.0.0.1:5500/index.html`.
4. Usar la navegación inferior para Inicio, Aprender, Apoyo y Acerca. En Aprender: puntos de luz, selector de paisajes, cuatro ejes e índice con búsqueda.

Alternativa sin extensión, desde esta carpeta: `python -m http.server 8000 --bind 127.0.0.1`; abrir `http://127.0.0.1:8000/index.html`. Detener con Ctrl+C. El servidor iniciado durante la intervención utiliza ese puerto mientras continúe activo.

No se necesita npm para ejecutar el sitio. No se importan perfiles, contraseñas, cookies ni sesiones de Chrome. Las imágenes y la tipografía de sistema funcionan sin solicitudes a proveedores externos; los enlaces institucionales y créditos solo se abren al seleccionarlos.

## Estructura

```text
index.html                  Inicio y acceso a cuatro ejes
aprender.html               Territorio, índice, cuatro ejes y procedencia
apoyo.html                  Redes de cuidado y enlace institucional
acerca.html                 Presentación breve y límites
assets/
  css/styles.css            Base visual conservada del proyecto recibido
  css/territorio.css        Evolución del paisaje y adaptación responsive
  css/aprendizaje.css       Elementos figurativos y actividades progresivas
  js/app.js                 Motor de exploración y navegación
  data/content.json         Fuente editable de los doce conceptos y referencias
  data/content.js           Copia generada para uso local sin fetch
  img/                      Cinco fotografías conservadas, nueve SVG y PROCEDENCIA.md
docs_investigacion/          Originales intactos
backups/
  estado-recibido-20261116/  Los cuatro HTML y assets antes de intervenir
  fuentes-sha256.json        Huellas de integridad de la investigación
tools/
  build-data.py             Regenera content.js desde content.json
  verificar.py              Revisión estática, integridad y HTTP local
  test-dom.cjs              Interacciones en DOM emulado
  test-runtime/             Dependencia exclusiva de las pruebas
AUDITORIA.md                Estado recibido, decisiones y alcance
VALIDACION.json             Resultado reproducible de comprobaciones locales
PRUEBAS-DOM.json             Resultados de las interacciones emuladas
```

## Contenidos y distribución

- **Reconocimiento y comprensión de las emociones.** Doce entradas: preocupación/miedo/desorientación (Twan/twang), tristeza profunda (Seishtuiji), tristeza por pérdida, rabia (Sheishe), rabia que llega al maltrato (Nusa), firmeza/seguridad/estabilidad, calma/frescura, esperanza/alivio/sanación, alegría, celos (Mauldi), chismes/calumnias (Muldzigaba – dula), críticas/palabras intolerantes (Kaka). Se distinguen emociones, estados, experiencias, conceptos culturales y prácticas de relación. No se presentan doce emociones universales.
- **Regulación emocional, bienestar y autocuidado.** Nikuma incluye organización política, social y cultural, vínculos con territorio, familia, linajes y autoridades. Guiaba, trabajos colectivos y principios de sentido aparecen con referencias.
- **Comprensión del malestar emocional y búsqueda de apoyo.** Lecturas sin diagnóstico ni umbrales de días; redes de confianza, autoridades tradicionales y servicios de salud como posibilidades complementarias.
- **Sustancias psicoactivas y cuidado.** Contextos documentados de jañu, nuake y sugi; límites de registro y orientación hacia apoyo. No se equipara una práctica tradicional con consumo recreativo ni se afirma inocuidad.

El contenido específico sobre alcohol se retiró de los cuatro HTML y de todos los datos y JS activos, incluido el JSON antiguo que no estaba conectado al prototipo. Los documentos originales y la copia de seguridad conservan su contenido histórico.

## Fuentes y límites

Se contrastó el documento técnico de 2024 con la recopilación y la transcripción disponibles. La transcripción de Judith salta de 6:39 a 45:18. Las asociaciones de neblina, noche, fuego, tierra, flores y viento se atribuyen a la **recopilación del equipo**, con necesidad de confirmación directa. Se retiraron citas literales y afirmaciones clínicas que la fuente disponible no permitía sostener. Los casos cotidianos se identifican como propuestas del equipo.

Pendiente de revisión comunitaria: grafías, uso público de Seishtuiji, significados precisos, asociaciones naturales, representación y recepción de los paisajes. No se generan audios en lengua Kogui, no se inventan traducciones ni se simulan consultas tradicionales. No se afirma validación con usuarios jóvenes.

Fotografía de la Sierra Nevada de Taggen (CC BY-SA 3.0) y referencia posible de manzanilla de Tulumnes (CC BY-SA 4.0), con créditos y licencias visibles a petición. Los fondos de neblina y río de Pexels son ilustrativos. La fotografía anterior de flores se conserva sin usar como identificación botánica. Nueve SVG originales reemplazan los orbes genéricos. Ver `assets/img/PROCEDENCIA.md`.

La única ruta institucional enlazada es la Dirección de Bienestar de Unimagdalena: https://www.unimagdalena.edu.co/UnidadesOrganizativas/Direccion/10 . Verificada en su página oficial el 16/11/2026. No se anuncian horarios, cupos ni elegibilidad garantizados, ni una línea de crisis sin verificación territorial.

## Comprobaciones

Con el servidor local activo:

```powershell
python tools/verificar.py
node --check assets/js/app.js
node --check assets/data/content.js
node tools/test-dom.cjs
```

Para reinstalar la dependencia de pruebas: `npm install --prefix tools/test-runtime --ignore-scripts`. No hace falta para usar el sitio.

Pasaron dieciséis grupos de interacción en DOM emulado, incluyendo los doce conceptos y sus tres lecturas, búsqueda, paisajes, Nikuma, cuatro ejes, cierre y retorno de foco, pausa y reflexión. El verificador comprueba enlaces/anclas locales, imágenes JPEG y dimensiones, datos sincronizados, integridad de originales, términos excluidos y respuestas HTTP.

**No se ejecutó una validación visual en navegador.** El navegador integrado rechazó el origen local por un permiso guardado incluso después de la autorización textual del usuario. Se respetó ese bloqueo, sin abrir Chrome ni recurrir a otro navegador para eludirlo. No hay capturas de página ni resultados de consola de navegador que puedan declararse exitosos. La revisión de imágenes se hizo sobre los archivos locales.

Pendientes de prueba real: vistas de 320/390/430/768/1280 px, ausencia de desbordamiento horizontal, contraste renderizado, desplazamiento del panel, navegación por teclado en navegador, gestos en teléfono, transiciones, consola y red. Las adaptaciones están implementadas, pero esos resultados no están certificados.

## Editar datos

Editar `assets/data/content.json` y ejecutar `python tools/build-data.py`. Esto regenera solo `content.js`; no modifica HTML ni investigación. Las fuentes institucionales y los ejes 2–4 están en el HTML semántico de Aprender.


## Ampliación implementada

Cuatro actividades, una por eje, con tres miradas elegibles en cualquier orden: distinguir emoción y acción; observar, escuchar y acordar; explorar redes de apoyo; diferenciar plantas, objeto y contexto. Son propuestas educativas del equipo, no técnicas tradicionales atribuidas a la comunidad. No tienen puntos, pruebas clínicas, respuestas personales ni almacenamiento.

Los paneles empiezan con un resumen, una ilustración y una pregunta para pensar en privado. Profundización, fuentes y matices se despliegan a petición. El índice completo y los créditos están plegados inicialmente y se abren por enlace directo. Se mantiene la pausa de movimiento, la navegación inferior y los cuatro ejes.

La investigación complementaria y sus decisiones concretas se registran en una sola sección de `AUDITORIA.md`; se cerró al contar con evidencia suficiente. Respaldo previo: `backups/antes-ampliacion-fase2-20261116/`. Pruebas nuevas: estados de las cuatro actividades, referentes locales, lecturas progresivas y enlaces a detalles. Los resultados de DOM emulado no certifican renderizado móvil real.
