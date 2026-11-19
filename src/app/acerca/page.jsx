export const metadata = {
  title: 'Acerca · Prototipo de bienestar',
  description: 'Acerca del prototipo de bienestar, identidad provisional y propósitos pedagógicos.'
};

export default function AcercaPage() {
  return (
    <>
      <section className="about-intro">
        <p className="eyebrow">Identidad provisional</p>
        <h2>
          Prototipo<br />
          de bienestar
        </h2>
        <p className="lead">Explorar, comprender y cuidar.</p>
        <p>
          Experiencia de psicoeducación y orientación intercultural, pensada principalmente para hombres jóvenes Kogui de 18 a 28 años. Acerca experiencias emocionales y posibilidades de cuidado desde contenidos documentados y actividades educativas.
        </p>
      </section>

      <aside className="aviso" role="note">
        Sus contenidos son informativos y educativos. No realiza diagnósticos ni evaluaciones clínicas, no ofrece terapia ni sustituye la atención de profesionales o instituciones de salud.
      </aside>
    </>
  );
}
