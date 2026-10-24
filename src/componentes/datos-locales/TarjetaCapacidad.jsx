import React, { useState } from 'react';

export default function TarjetaCapacidad({ item }) {
  const [estaExpandida, setEstaExpandida] = useState(false);

  // Asignar clase de color según la categoría para acentuar el diseño temático
  const obtenerClaseCategoria = (cat) => {
    switch (cat) {
      case 'Sistemas Embebidos y Hardware':
        return 'categoria-embebidos';
      case 'Arquitectura y Backend':
        return 'categoria-backend';
      case 'Persistencia y Datos':
        return 'categoria-datos';
      case 'Inteligencia y Nuevas Tecnologías':
        return 'categoria-inteligencia';
      default:
        return 'categoria-general';
    }
  };

  return (
    <article className={`tarjeta-capacidad ${estaExpandida ? 'expandida' : ''}`}>
      <div className="tarjeta-capacidad-cabecera">
        <span className={`insignia-categoria ${obtenerClaseCategoria(item.categoria)}`}>
          {item.categoria}
        </span>
        <h3 className="titulo-capacidad">{item.nombre}</h3>
      </div>

      <p className="resumen-capacidad">{item.resumen}</p>

      {/* Botón interactivo para consultar información adicional (Criterio 10 - Nivel Propone) */}
      <button
        type="button"
        className={`boton-alternar-detalle ${estaExpandida ? 'activo' : ''}`}
        onClick={() => setEstaExpandida(!estaExpandida)}
        aria-expanded={estaExpandida}
      >
        <span>{estaExpandida ? '▲ Ocultar especificaciones' : '▼ Ver detalles técnicos'}</span>
      </button>

      {estaExpandida && (
        <div className="panel-detalle-capacidad">
          <p className="texto-descripcion-detallada">{item.descripcionDetallada}</p>

          <div className="metadatos-capacidad">
            <div className="fila-meta">
              <span className="etiqueta-meta">Nivel de Adopción:</span>
              <span className={`badge-nivel nivel-${item.nivelAdopcion.toLowerCase()}`}>
                {item.nivelAdopcion}
              </span>
            </div>

            <div className="fila-meta">
              <span className="etiqueta-meta">Tipo de Disciplina:</span>
              <span className="valor-meta">{item.tipo}</span>
            </div>
          </div>

          {item.herramientasRelacionadas && item.herramientasRelacionadas.length > 0 && (
            <div className="seccion-herramientas">
              <span className="etiqueta-herramientas">Herramientas & Tecnologías:</span>
              <div className="chips-herramientas">
                {item.herramientasRelacionadas.map((herramienta) => (
                  <span key={herramienta} className="chip-herramienta">
                    {herramienta}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

