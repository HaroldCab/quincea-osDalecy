import { useEffect, useState } from "react";
import { quinceanera } from "./config.js";

const dateLabel = new Intl.DateTimeFormat("es-MX", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(quinceanera.date);

function Butterfly({ className = "" }) {
  return (
    <svg
      className={`butterfly ${className}`}
      viewBox="0 0 80 72"
      role="img"
      aria-label="Mariposa morada"
    >
      <path
        className="butterfly-wing butterfly-wing-left"
        d="M39 33C31 19 13 3 7 10c-9 11 1 27 25 31C19 40 8 46 12 57c4 10 19 4 28-12"
      />
      <path
        className="butterfly-wing butterfly-wing-right"
        d="M41 33C49 19 67 3 73 10c9 11-1 27-25 31 13-1 24 5 20 16-4 10-19 4-28-12"
      />
      <path className="butterfly-body" d="M38 31c-2 8-1 17 2 22 4-6 4-15 2-22z" />
      <path className="butterfly-antenna" d="M39 33c-3-8-7-10-10-11m13 11c3-8 7-10 10-11" />
    </svg>
  );
}

function Sparkle({ className = "" }) {
  return (
    <svg className={`sparkle ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5 14.4 9.6 22.5 12l-8.1 2.4L12 22.5l-2.4-8.1L1.5 12l8.1-2.4L12 1.5Z" />
    </svg>
  );
}

function useCountdown(targetDate) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = targetDate.getTime() - now.getTime();
  if (remaining <= 0) return null;

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  return { days, hours, minutes };
}

function App() {
  const countdown = useCountdown(quinceanera.date);
  const locationReady = Boolean(quinceanera.locationUrl);

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <a className="wordmark" href="#inicio" aria-label="Inicio">
          <span className="wordmark-mark">D</span>
          <span>Una noche para recordar</span>
        </a>
        <span className="topbar-date">24 · 10 · 2026</span>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            Con mucha ilusión te invito
            <span className="eyebrow-line" />
          </div>

          <h1>
            Mis XV
            <span className="name">{quinceanera.name}</span>
            <span className="title-flourish">Una noche mágica</span>
          </h1>

          <p className="invitation">
            Hay momentos que se sueñan toda la vida. Me encantaría compartir
            contigo esta noche tan especial, llena de amor, música y alegría.
          </p>

          <div className="date-lockup">
            <span className="date-weekday">SÁBADO</span>
            <span className="date-day">24</span>
            <span className="date-month">OCTUBRE</span>
            <span className="date-year">2026</span>
          </div>

          {countdown ? (
            <div className="countdown" aria-label="Cuenta regresiva">
              <span><strong>{countdown.days}</strong> días</span>
              <i />
              <span><strong>{countdown.hours}</strong> horas</span>
              <i />
              <span><strong>{countdown.minutes}</strong> min</span>
            </div>
          ) : (
            <p className="countdown countdown-today">
              {new Date().toDateString() === quinceanera.date.toDateString()
                ? "¡Hoy es el gran día!"
                : "Gracias por celebrar este momento conmigo."}
            </p>
          )}

          <a
            className="location-button"
            href={locationReady ? quinceanera.locationUrl : "#ubicacion"}
            target={locationReady ? "_blank" : undefined}
            rel={locationReady ? "noreferrer" : undefined}
          >
            <span className="button-icon" aria-hidden="true">⌖</span>
            {locationReady ? "Ver ubicación" : "Ver detalles del lugar"}
            <span className="button-arrow" aria-hidden="true">↗</span>
          </a>
          <p className="button-note">
            {locationReady ? "Te espero para celebrar" : "La ubicación se compartirá muy pronto"}
          </p>
        </div>

        <div className="portrait-column">
          <div className="portrait-halo" />
          <div className="portrait-frame">
            <img
              className="portrait"
              src="/quinceanera.jpg"
              alt={`Retrato de ${quinceanera.name} con vestido lila`}
            />
            <div className="portrait-caption">
              <span>Con cariño,</span>
              <strong>{quinceanera.name}</strong>
            </div>
          </div>
          <div className="portrait-decoration portrait-decoration-top" aria-hidden="true" />
          <div className="portrait-decoration portrait-decoration-bottom" aria-hidden="true" />
          <Butterfly className="butterfly-one" />
          <Butterfly className="butterfly-two" />
          <Sparkle className="sparkle-one" />
          <Sparkle className="sparkle-two" />
          <Sparkle className="sparkle-three" />
        </div>
      </section>

      <section className="details" id="ubicacion">
        <div className="details-heading">
          <span className="section-kicker">GUARDA LA FECHA</span>
          <h2>Será aún más especial<br />si estás conmigo</h2>
          <p>{dateLabel}</p>
        </div>
        <div className={`location-card${locationReady ? " location-card-ready" : ""}`}>
          <div className="location-icon" aria-hidden="true">⌖</div>
          <div className="location-copy">
            <h3>{locationReady ? "El lugar de la celebración" : "La celebración"}</h3>
            <p>
              {locationReady
                ? "Domicilio donde se celebrarán mis XV años. Abre el mapa para ver cómo llegar."
                : "En cuanto tengamos todos los detalles, te compartiré la ubicación."}
            </p>
          </div>
          {locationReady ? (
            <a
              className="map-link"
              href={quinceanera.locationUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir ubicación en Google Maps"
            >
              Abrir mapa <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="location-pending">Próximamente</span>
          )}
        </div>
        <div className="guest-notes">
          <article className="guest-note">
            <span className="section-kicker">VESTIMENTA</span>
            <p>El morado y el lila claro están reservados para la quinceañera. ¡Gracias por evitar estos tonos!</p>
          </article>
          <article className="guest-note">
            <span className="section-kicker">REGALOS</span>
            <p>Si no sabes qué regalarme, un regalo en efectivo será bien recibido.</p>
          </article>
        </div>
      </section>

      <footer className="footer">
        <Butterfly className="footer-butterfly" />
        <span>24 · 10 · 2026</span>
      </footer>
    </main>
  );
}

export default App;
