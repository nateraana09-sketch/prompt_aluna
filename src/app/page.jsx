import Link from 'next/link';

export const metadata = {
  title: 'Inicio · Prototipo de bienestar · Universidad del Magdalena',
  description: 'Experiencia digital de psicoeducación y orientación intercultural para jóvenes, desde los saberes del pueblo Kogui de la Sierra Nevada.'
};

export default function HomePage() {
  return (
    <>
      <section className="entry-landscape">
        <img
          src="/assets/img/sierra-nevada-taggen.jpg"
          alt="Bosque y cumbres de la Sierra Nevada de Santa Marta"
          width={1280}
          height={960}
          fetchPriority="high"
        />
        <div className="entry-shade" />
        <div className="entry-copy">
          <p className="eyebrow">Prototipo de bienestar · Identidad provisional</p>
          <h2>
            Un momento<br />
            para mirar<br />
            <em>lo que vivimos.</em>
          </h2>
          <p>Emociones, vínculos y caminos de cuidado. Una experiencia para explorar a tu ritmo.</p>
          <Link className="btn btn-acento" href="/aprender">
            Entrar al territorio <span aria-hidden="true">↗</span>
          </Link>
          <Link className="entry-support" href="/apoyo">
            Encontrar apoyo
          </Link>
        </div>
        <span className="entry-caption">Sierra Nevada de Santa Marta · Taggen · CC BY-SA 3.0</span>
      </section>

      <section className="entry-invitation">
        <span className="eyebrow">No hay una sola forma de sentir</span>
        <h2>
          Observar abre<br />
          otra mirada.
        </h2>
        <p>
          Una situación puede despertar experiencias distintas. Aquí puedes descubrir palabras, explorar posibilidades y conocer formas de acompañamiento.
        </p>
        <p className="quiet-note">
          Pensado principalmente para hombres jóvenes Kogui de 18 a 28 años. Los saberes documentados conservan su contexto; las actividades son propuestas educativas del proyecto.
        </p>
      </section>

      <section className="journey-menu" aria-labelledby="journey-title">
        <p className="eyebrow">Cuatro recorridos · Ningún orden obligatorio</p>
        <h2 id="journey-title">Elige por dónde empezar</h2>

        <Link href="/aprender?eje=1">
          <img src="/assets/img/elemento-niebla.svg" width={172} height={132} alt="" />
          <div>
            <span>01 · Reconocer</span>
            <h3>Reconocimiento y comprensión de las emociones.</h3>
          </div>
          <b aria-hidden="true">↗</b>
        </Link>

        <Link href="/aprender?eje=2">
          <img src="/assets/img/elemento-arbol.svg" width={172} height={132} alt="" />
          <div>
            <span>02 · Cuidar</span>
            <h3>Regulación emocional, bienestar y autocuidado.</h3>
          </div>
          <b aria-hidden="true">↗</b>
        </Link>

        <Link href="/aprender?eje=3">
          <img src="/assets/img/elemento-agua.svg" width={172} height={132} alt="" />
          <div>
            <span>03 · Buscar compañía</span>
            <h3>Comprensión del malestar emocional y búsqueda de apoyo.</h3>
          </div>
          <b aria-hidden="true">↗</b>
        </Link>

        <Link href="/aprender?eje=4">
          <img src="/assets/img/elemento-tierra.svg" width={172} height={132} alt="" />
          <div>
            <span>04 · Comprender el contexto</span>
            <h3>Sustancias psicoactivas y cuidado.</h3>
          </div>
          <b aria-hidden="true">↗</b>
        </Link>
      </section>

      <aside className="entry-care">
        <h2>También puedes empezar hablando.</h2>
        <p>Encuentra redes de confianza y recursos institucionales de orientación.</p>
        <Link className="text-link" href="/apoyo">
          Ver opciones de apoyo ↗
        </Link>
      </aside>

      <p className="aviso">
        Experiencia informativa y educativa. No realiza diagnósticos, no ofrece terapia ni sustituye la atención profesional.
      </p>
      <p className="photo-note">
        <Link href="/aprender#procedencia">Fuentes y créditos de las imágenes</Link>
      </p>
    </>
  );
}
