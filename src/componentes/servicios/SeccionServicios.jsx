import React, { useState } from 'react';
import PestanaGithub from './PestanaGithub';
import PestanaHackerNews from './PestanaHackerNews';
import './SeccionServicios.css';

const FUENTES_SERVICIOS = [
  {
    id: 'github',
    icono: '🐙',
    titulo: 'GitHub REST API',
    subtitulo: 'Repositorios y actividad del equipo',
    protocolo: 'REST v3 JSON'
  },
  {
    id: 'hackernews',
    icono: '📡',
    titulo: 'Hacker News API',
    subtitulo: 'Radar de noticias y ciberinteligencia',
    protocolo: 'Firebase REST'
  }
];

export default function SeccionServicios() {
  const [pestanaActiva, setPestanaActiva] = useState('github');

  const manejarTeclasPestana = (event, indiceActual) => {
    let indiceSiguiente;

    if (event.key === 'ArrowRight') {
      indiceSiguiente = (indiceActual + 1) % FUENTES_SERVICIOS.length;
    } else if (event.key === 'ArrowLeft') {
      indiceSiguiente =
        (indiceActual - 1 + FUENTES_SERVICIOS.length) % FUENTES_SERVICIOS.length;
    } else if (event.key === 'Home') {
      indiceSiguiente = 0;
    } else if (event.key === 'End') {
      indiceSiguiente = FUENTES_SERVICIOS.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nuevaId = FUENTES_SERVICIOS[indiceSiguiente].id;
    setPestanaActiva(nuevaId);
    document.getElementById(`tab-servicio-${nuevaId}`)?.focus();
  };

  return (
    <section
      className="seccion-servicios-contenedor"
      aria-label="Servicios externos conectados"
    >
      {/* Barra de pestañas accesible con soporte de teclado (ArrowLeft / ArrowRight) */}
      <div
        className="barra-pestanas-servicios"
        role="tablist"
        aria-label="Seleccionar fuente de API externa"
      >
        {FUENTES_SERVICIOS.map((fuente, indice) => {
          const activa = pestanaActiva === fuente.id;
          return (
            <button
              key={fuente.id}
              id={`tab-servicio-${fuente.id}`}
              type="button"
              role="tab"
              aria-selected={activa}
              aria-controls={`panel-servicio-${fuente.id}`}
              tabIndex={activa ? 0 : -1}
              className={`boton-pestana-servicio ${activa ? 'activa' : ''}`}
              onClick={() => setPestanaActiva(fuente.id)}
              onKeyDown={(e) => manejarTeclasPestana(e, indice)}
            >
              <span className="icono-pestana-servicio" aria-hidden="true">
                {fuente.icono}
              </span>
              <div className="textos-pestana-servicio">
                <span className="titulo-pestana-servicio">{fuente.titulo}</span>
                <span className="subtitulo-pestana-servicio">{fuente.subtitulo}</span>
              </div>
              <span className="badge-protocolo-servicio">{fuente.protocolo}</span>
            </button>
          );
        })}
      </div>

      {/* Contenido dinámico según la pestaña seleccionada */}
      <div
        id={`panel-servicio-${pestanaActiva}`}
        className="cuerpo-seccion-servicios"
        role="tabpanel"
        aria-labelledby={`tab-servicio-${pestanaActiva}`}
        tabIndex={0}
      >
        {pestanaActiva === 'github' ? (
          <PestanaGithub usuario="osposto" />
        ) : (
          <PestanaHackerNews />
        )}
      </div>
    </section>
  );
}
