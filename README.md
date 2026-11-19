# Prototipo de bienestar · Identidad provisional
## Migración a Next.js (App Router) · Listo para Vercel

Proyecto de psicoeducación y orientación intercultural del Seminario de la Universidad del Magdalena, adaptado y estructurado con **Next.js (App Router)** para su despliegue inmediato en **Vercel** o ejecución local con Node.js.

No solicita cuentas, no almacena respuestas personales ni incluye evaluación clínica.

---

### 🚀 Despliegue en Vercel

Este repositorio está 100% configurado para Vercel sin necesidad de pasos adicionales:

1. **Subir el repositorio a GitHub / GitLab / Bitbucket**.
2. **Importar el proyecto en Vercel**:
   - Vercel detecta automáticamente **Next.js**.
   - Build Command: `next build` (predeterminado).
   - Output Directory: `.next` (predeterminado).
   - Install Command: `npm install` (predeterminado).
3. Haz clic en **Deploy**. El sitio se desplegará de forma instantánea y reactiva.

---

### 💻 Ejecución en local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:3000
```

Para generar la compilación de producción:
```bash
npm run build
npm run start
```

---

### 📁 Estructura del proyecto organizada

```text
repo_territorio_vivo/
├── package.json               # Dependencias de Next.js y React
├── next.config.mjs            # Configuración de Next.js
├── jsconfig.json              # Alias de rutas (@/*)
├── .gitignore                 # Exclusión de node_modules, .next, variables de entorno y documentos privados
├── README.md                  # Documentación del proyecto
├── public/                    # Archivos estáticos accesibles directamente por la web
│   └── assets/
│       └── img/               # Fotografías e ilustraciones vectoriales (.jpg, .svg)
├── src/
│   ├── app/                   # App Router de Next.js
│   │   ├── layout.jsx         # Layout raíz (AppHeader, AppNav, metadatos, fuentes)
│   │   ├── page.jsx           # Ruta raíz (Inicio · /)
│   │   ├── aprender/
│   │   │   └── page.jsx       # Ruta Aprender (/aprender) con los 4 ejes
│   │   ├── apoyo/
│   │   │   └── page.jsx       # Ruta Apoyo (/apoyo) con Línea 106 y Unimagdalena
│   │   └── acerca/
│   │       └── page.jsx       # Ruta Acerca (/acerca) con propósitos y límites
│   ├── components/            # Componentes React interactivos y accesibles
│   │   ├── layout/
│   │   │   ├── AppHeader.jsx  # Encabezado institucional con salto al contenido
│   │   │   └── AppNav.jsx     # Barra de navegación inferior con estado activo
│   │   ├── aprender/
│   │   │   ├── EjesNav.jsx    # Selector accesible de los 4 ejes
│   │   │   ├── TerritorioScene.jsx     # Escenario paisajístico interactivo con puntos de luz y gestos
│   │   │   ├── ConceptDetailPanel.jsx  # Panel modal/drawer de detalle con pestañas y fuentes
│   │   │   ├── ConceptIndex.jsx        # Buscador y catálogo de conceptos con tolerancia a escritura
│   │   │   ├── TreeStudy.jsx           # Exploración del árbol (raíces, ramas, copa)
│   │   │   └── PreviousPhaseActivity.jsx # Visor de actividades de fases previas
│   │   └── activities/        # Cuatro experiencias participativas interactivas
│   │       ├── ActivityGuide.jsx                 # Alternativa de guía visual (Rama / Felino)
│   │       ├── Activity1DisarmDiscussion.jsx     # Eje 1: Sentir, Pensar y Actuar (drag & drop y toque)
│   │       ├── Activity2BuildConversation.jsx    # Eje 2: Reorganización secuencial de diálogo
│   │       ├── Activity3BranchingStory.jsx       # Eje 3: Narrativa con bifurcaciones reversible
│   │       └── Activity4ContextLens.jsx          # Eje 4: Lupa interactiva de tres capas de contexto
│   ├── data/
│   │   └── content.json       # Datos canónicos de conceptos, ejes, actividades y fuentes
│   ├── lib/
│   │   └── busqueda.js        # Algoritmo de búsqueda local con tolerancia fonética/ortográfica
│   └── styles/                # Hojas de estilo modulares
│       ├── globals.css        # Importación central y ajustes base
│       ├── styles.css         # Base visual y tipográfica
│       ├── territorio.css     # Estilos del escenario paisajístico
│       ├── aprendizaje.css    # Elementos figurativos y tarjetas
│       ├── experiencia.css    # Paleta cálida y composición
│       └── participacion.css  # Mecánicas participativas, lupa, arrastre y marco
├── legacy_vanilla/            # Respaldo intacto de la versión anterior (HTML/JS/CSS vainilla)
├── tools/                     # Scripts de validación y pruebas automatizadas
└── docs_investigacion/        # Documentos de contexto e investigación
```

---

## Cuatro experiencias participativas, una por eje

| Experiencia | Qué se hace | Qué se busca comprender |
| --- | --- | --- |
| **Desarma una discusión** | Arrastrar o seleccionar frases y ubicarlas en Sentir, Pensar y Actuar; reubicar y comparar una lectura posible | Una emoción, una interpretación y una acción son diferentes. Sheishe y Nusa se presentan según la fuente, sin equivalencia intercambiable. |
| **Construye una conversación** | Reorganizar piezas con arrastre o Subir/Bajar; recorrer la secuencia elegida | Observar, escuchar y acordar pueden relacionarse y retomarse; no hay un orden clínico obligatorio. |
| **Un mensaje, varios caminos** | Tomar decisiones, abrir ramas, volver atrás y comparar cierres | Acompañar permite respetar límites y explorar redes, sin interpretar ni decidir por alguien. |
| **La lupa del contexto** | Desplazar una lupa por una lámina editorial mediante puntero o deslizador accesible | Distinguir contexto, información y acompañamiento antes de generalizar sobre plantas, objetos y prácticas. |

---

## Historial de Fases Anteriores

<details>
<summary>Fase 4 · 18 noviembre 2026 (Preservada en legacy_vanilla/)</summary>

Se mantuvieron las cuatro páginas y la ejecución con Live Server. Las actividades son propuestas del equipo: no se presentan como juegos tradicionales ni como culturalmente aprobadas. No se manipulan elementos sagrados ni se simulan rituales. No hay puntuación, resultado personal ni almacenamiento.

Catálogo de 18 entradas. Se incorporaron escucha, diálogo/acuerdos, consejo/educación propia, sueños en su contexto, aislamiento/vínculos e información/contexto de cuidado.

Búsqueda local con coincidencias parciales, grafías documentales e índice explícito de expresiones en español.
</details>

<details>
<summary>Fase 3 · 17 noviembre 2026</summary>

Identidad provisional como Prototipo de bienestar. Portada renovada como entrada al territorio; cuatro recorridos ilustrados y acceso directo a apoyo. En Aprender, el selector de ejes antes del paisaje. Doce conceptos, cuatro actividades de tres miradas, búsqueda, movimiento reducido y retorno del foco.
</details>
