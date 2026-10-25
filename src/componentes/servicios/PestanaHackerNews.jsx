import React, { useState, useEffect, useCallback } from 'react';
import Cargando from '../comunes/Cargando';
import MensajeError from '../comunes/MensajeError';

const CANALES_HN = [
  { id: 'topstories', nombre: '🔥 Tendencias Principales (Top)', icono: '📡' },
  { id: 'beststories', nombre: '⭐ Mejor Valoradas (Best)', icono: '🏆' },
  { id: 'newstories', nombre: '⚡ Recientes en Tiempo Real (New)', icono: '🕒' }
];

const CANTIDAD_HISTORIAS = 9;

export default function PestanaHackerNews() {
  const [canalActivo, setCanalActivo] = useState('topstories');
  const [historias, setHistorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);

  const consultarHackerNews = useCallback(async (canal = canalActivo, simularFallo = false) => {
    setCargando(true);
    setError(null);

    try {
      const urlLista = simularFallo
        ? 'https://hacker-news.firebaseio.com/v0/endpoint_invalido_simulacion.json'
        : `https://hacker-news.firebaseio.com/v0/${canal}.json`;

      const respuestaIds = await fetch(urlLista);

      if (!respuestaIds.ok) {
        throw new Error(
          `Error HTTP ${respuestaIds.status} al conectar con Hacker News Firebase API.`
        );
      }

      const listaIds = await respuestaIds.json();

      if (!Array.isArray(listaIds) || listaIds.length === 0) {
        throw new Error(
          'El nodo de telemetría de Hacker News devolvió una respuesta nula o vacía. Reintenta la sincronización.'
        );
      }

      const primerosIds = listaIds.slice(0, CANTIDAD_HISTORIAS);

      // Resolución concurrente mediante Promise.all para obtener el detalle de cada publicación
      const promesasDetalle = primerosIds.map(async (id) => {
        const resItem = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        if (!resItem.ok) {
          throw new Error(`Fallo al recuperar el ítem #${id}`);
        }
        return resItem.json();
      });

      const itemsResueltos = await Promise.all(promesasDetalle);
      setHistorias(itemsResueltos.filter(Boolean));
      setUltimaActualizacion(new Date().toLocaleTimeString('es-AR'));
    } catch (err) {
      setError(
        err.message || 'Error de conexión al recuperar el flujo de noticias de Hacker News.'
      );
    } finally {
      setCargando(false);
    }
  }, [canalActivo]);

  useEffect(() => {
    consultarHackerNews(canalActivo);
  }, [canalActivo, consultarHackerNews]);

  const extraerDominio = (url) => {
    if (!url) return 'news.ycombinator.com';
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return 'news.ycombinator.com';
    }
  };

  const formatearTiempo = (timestampUnix) => {
    if (!timestampUnix) return 'Reciente';
    const fecha = new Date(timestampUnix * 1000);
    return fecha.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="panel-pestana-servicio">
      {/* Explicación contextual de la segunda API */}
      <div className="caja-contexto-api">
        <div className="contexto-api-info">
          <span className="badge-endpoint">
            GET hacker-news.firebaseio.com/v0/{canalActivo}.json + Promise.all
          </span>
          <p className="texto-contexto-api">
            <strong>Radar Global de Ciberseguridad, Ingeniería y Sistemas:</strong> Consumo concurrente de la API en tiempo real de Hacker News (Y Combinator). Permite al equipo monitorear divulgaciones técnicas, vulnerabilidades zero-day, arquitecturas de software y debates de la comunidad global.
          </p>
        </div>

        <div className="acciones-rapidas-api">
          <button
            type="button"
            className="boton-refrescar-api"
            onClick={() => consultarHackerNews(canalActivo, false)}
            disabled={cargando}
          >
            <span>🔄</span>
            <span>Refrescar radar</span>
          </button>

          <button
            type="button"
            className="boton-simular-error"
            onClick={() => consultarHackerNews(canalActivo, true)}
            disabled={cargando}
            title="Simula un fallo de red para verificar el componente MensajeError y su botón de reintento"
          >
            <span>⚡</span>
            <span>Probar fallo de red</span>
          </button>
        </div>
      </div>

      {/* Selector de canal de Hacker News */}
      <div className="barra-canales-hn">
        <div className="chips-perfiles-sugeridos">
          <span className="etiqueta-sugeridos">Flujo de telemetría:</span>
          {CANALES_HN.map((canal) => (
            <button
              key={canal.id}
              type="button"
              className={`chip-perfil-btn ${canalActivo === canal.id ? 'activo' : ''}`}
              onClick={() => setCanalActivo(canal.id)}
              disabled={cargando}
            >
              {canal.nombre}
            </button>
          ))}
        </div>

        {ultimaActualizacion && !cargando && !error && (
          <span className="marca-tiempo-api">
            Sincronizado a las {ultimaActualizacion} ({historias.length} boletines)
          </span>
        )}
      </div>

      {/* Estados explícitos: Cargando, Error o Grilla de Noticias */}
      {cargando ? (
        <Cargando
          mensaje={`Descargando índices y resolviendo ${CANTIDAD_HISTORIAS} publicaciones en paralelo mediante Promise.all...`}
        />
      ) : error ? (
        <MensajeError
          mensaje={error}
          alReintentar={() => consultarHackerNews(canalActivo, false)}
        />
      ) : (
        <div className="grilla-noticias-hn">
          {historias.map((item, indice) => {
            const urlDestino =
              item.url || `https://news.ycombinator.com/item?id=${item.id}`;
            const dominio = extraerDominio(item.url);

            return (
              <article key={item.id} className="tarjeta-noticia-hn">
                <div className="cabecera-noticia-hn">
                  <span className="numero-orden-hn">
                    #{String(indice + 1).padStart(2, '0')}
                  </span>
                  <span className="dominio-noticia-hn">{dominio}</span>
                  <span className="puntaje-noticia-hn" title="Puntos de relevancia en HN">
                    ▲ {item.score ?? 0} pts
                  </span>
                </div>

                <h3 className="titulo-noticia-hn">
                  <a
                    href={urlDestino}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="enlace-titulo-hn"
                  >
                    {item.title}
                  </a>
                </h3>

                <div className="pie-noticia-hn">
                  <div className="meta-noticia-hn">
                    <span>👤 @{item.by || 'anon'}</span>
                    <span>🕒 {formatearTiempo(item.time)}</span>
                  </div>

                  <div className="enlaces-noticia-hn">
                    <a
                      href={`https://news.ycombinator.com/item?id=${item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="enlace-discusion-hn"
                      title="Ver hilo técnico en Hacker News"
                    >
                      💬 {item.descendants ?? 0} coment.
                    </a>
                    <a
                      href={urlDestino}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="enlace-abrir-fuente"
                    >
                      Abrir ↗
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

