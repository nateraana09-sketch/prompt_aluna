import Link from 'next/link';

export const metadata = {
  title: 'Apoyo · Prototipo de bienestar',
  description: 'Redes de cuidado, teleorientación en salud mental y enlaces de bienestar institucional.'
};

export default function ApoyoPage() {
  return (
    <>
      <section className="support-hero">
        <img
          src="/assets/img/rio-bosque.jpg"
          alt="Río entre árboles y piedras; fotografía ilustrativa"
          width={1200}
          height={1500}
        />
        <div>
          <p className="eyebrow">Eje 03 · Redes de cuidado</p>
          <h2>Un camino que puedes compartir.</h2>
          <p>No necesitas resolverlo todo a solas.</p>
        </div>
      </section>

      <section className="support-copy">
        <h2>Buscar acompañamiento</h2>
        <p>
          Puedes buscar compañía en una persona de confianza, en tu red comunitaria o en un servicio de salud. Son posibilidades que pueden complementarse; no son pasos obligatorios.
        </p>
        <ol className="support-path">
          <li>
            <strong>Habla con alguien de confianza</strong>
            <p>Puede ser tu familia, una amistad o una persona que te escuche sin humillarte. Si un vínculo no es seguro, elige otra posibilidad.</p>
          </li>
          <li>
            <strong>Acércate a tu red comunitaria</strong>
            <p>Mamo, saka, mayores o agentes de salud de tu comunidad pueden orientar desde los saberes propios, cuando esa sea tu elección.</p>
          </li>
          <li>
            <strong>Consulta un servicio de salud</strong>
            <p>Puedes acudir al centro de salud de tu zona o solicitar orientación a tu entidad de salud. No necesitas completar primero otra ruta.</p>
          </li>
        </ol>
      </section>

      <aside className="urgent-note">
        <h2>Si hay peligro ahora</h2>
        <p>
          Si tú o alguien cercano piensa hacerse daño o está en peligro inmediato, busca una persona que pueda acompañar y acude a un servicio de urgencias. No esperes a continuar navegando.
        </p>
      </aside>

      <section className="line-resource" id="linea106">
        <p className="eyebrow">Orientación en Colombia</p>
        <h2>Línea 106</h2>
        <p>
          Recurso de teleorientación en salud mental del Ministerio de Salud. La ruta nacional corresponde a territorios sin una línea 106 propia; donde existe una línea local, la atención puede canalizarse territorialmente.
        </p>
        <a className="btn btn-acento" href="tel:106">
          Llamar al 106
        </a>
        <p className="quiet-note">
          Si hay peligro inmediato, busca compañía y atención presencial urgente. Si no logras comunicarte, acude a un servicio de salud.
        </p>
      </section>

      <section className="institution">
        <p className="eyebrow">Para la comunidad universitaria</p>
        <h2>Bienestar de la Universidad del Magdalena</h2>
        <p>
          La Dirección de Bienestar Universitario informa sobre sus servicios de Desarrollo Humano y atención en Psicología. Consulta con la institución la disponibilidad y los requisitos vigentes.
        </p>
        <a
          className="btn btn-acento"
          href="https://www.unimagdalena.edu.co/UnidadesOrganizativas/Direccion/10"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar información institucional ↗
        </a>
        <p className="photo-note">
          Página oficial consultada el 17 de noviembre de 2026. Abrirás un sitio externo. Este enlace no es un servicio de emergencia.
        </p>
      </section>

      <p className="aviso">
        Prototipo de bienestar informa y orienta. No realiza diagnósticos, no ofrece terapia ni sustituye la atención profesional o institucional.
      </p>
    </>
  );
}
