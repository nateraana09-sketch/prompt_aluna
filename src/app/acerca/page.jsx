export const metadata = {
  title: 'Acerca · El territorio vivo · Psicoeducación Intercultural',
  description: 'Acerca de El territorio vivo, psicoeducación intercultural y propósitos pedagógicos.'
};

export default function AcercaPage() {
  return (
    <>
      <section className="about-intro">
        <p className="eyebrow">Psicoeducación Intercultural</p>
        <h2>
          El territorio<br />
          vivo
        </h2>
        <p className="lead">Explorar, comprender y cuidar.</p>
        <p>
          Experiencia de psicoeducación y orientación intercultural, pensada principalmente para jóvenes. Acerca experiencias emocionales y posibilidades de cuidado desde contenidos documentados y actividades educativas.
        </p>
      </section>

      <aside className="aviso" role="note">
        Sus contenidos son informativos y educativos. No realiza diagnósticos ni evaluaciones clínicas, no ofrece terapia ni sustituye la atención de profesionales o instituciones de salud.
      </aside>
    </>
  );
}
