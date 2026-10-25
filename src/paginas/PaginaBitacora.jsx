import React, { useState, useMemo, useEffect } from 'react';
import datosBitacora from '../datos/datosBitacora';
import '../componentes/servicios/SeccionServicios.css';

// Subcomponente AcordeonBitacora reflejado en el Árbol de Renderizado (PaginaArbol.jsx)
export function AcordeonBitacora({ entrada, expansionForzada }) {
  const [abierto, setAbierto] = useState(
    entrada.id === 'bit-01' || entrada.id === 'bit-05' || entrada.id === 'bit-06'
  );

  useEffect(() => {
    if (expansionForzada !== null) {
      setAbierto(expansionForzada);
    }
  }, [expansionForzada]);

  const obtenerClaseAutor = (autor) => {
    if (autor.includes('Orlando')) return 'autor-orlando';
    if (autor.includes('Adriana')) return 'autor-adriana';
    return 'autor-guillermo';
  };

  return (
    <article className={`acordeon-bitacora-item ${abierto ? 'abierto' : ''}`}>
      <button
        type="button"
        className="acordeon-bitacora-cabecera"
        onClick={() => setAbierto((prev) => !prev)}
        aria-expanded={abierto}
      >
        <div className="acordeon-bitacora-meta-superior">
          <span className="fecha-bitacora">📅 {entrada.fecha}</span>
          <span className="categoria-bitacora-badge">{entrada.categoria}</span>
          <span className={`autor-bitacora-badge ${obtenerClaseAutor(entrada.autor)}`}>
            👤 {entrada.autor}
          </span>
        </div>

        <div className="acordeon-bitacora-fila-titulo">
          <h3 className="titulo-entrada-bitacora">{entrada.titulo}</h3>
          <span className="indicador-acordeon-bitacora" aria-hidden="true">
            {abierto ? '− Contraer' : '+ Desplegar'}
          </span>
        </div>

        <p className="resumen-entrada-bitacora">{entrada.resumen}</p>
      </button>

      {abierto && (
        <div className="acordeon-bitacora-cuerpo">
          <div className="bloque-detalle-bitacora">
            <span className="etiqueta-bloque-bitacora">
              🛠️ Desarrollo Técnico y Resolución de Problemas
            </span>
            <p className="texto-bloque-bitacora">{entrada.detalle}</p>
          </div>

          <div className="bloque-aprendizaje-bitacora">
            <span className="etiqueta-bloque-bitacora aprendizaje">
              💡 Lección Aprendida por el Equipo
            </span>
            <p className="texto-bloque-bitacora">{entrada.aprendizajes}</p>
          </div>
        </div>
      )}
    </article>
  );
}

export default function PaginaBitacora() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [autorActivo, setAutorActivo] = useState('Todos');
  const [expansionForzada, setExpansionForzada] = useState(null);

  const categorias = useMemo(() => {
    return ['Todas', ...Array.from(new Set(datosBitacora.map((item) => item.categoria)))];
  }, []);

  const autores = useMemo(() => {
    return ['Todos', ...Array.from(new Set(datosBitacora.map((item) => item.autor)))];
  }, []);

  const entradasFiltradas = useMemo(() => {
    return datosBitacora.filter((item) => {
      const coincideCat =
        categoriaActiva === 'Todas' || item.categoria === categoriaActiva;
      const coincideAutor =
        autorActivo === 'Todos' || item.autor === autorActivo;
      return coincideCat && coincideAutor;
    });
  }, [categoriaActiva, autorActivo]);

  const restablecerFiltros = () => {
    setCategoriaActiva('Todas');
    setAutorActivo('Todos');
  };

  return (
    <div className="pagina-bitacora-contenedor">
      {/* Encabezado descriptivo alineado con el sistema visual de variables.css y global.css */}
      <div style={{ marginBottom: '2rem' }}>
        <p className="system-overline">200 - OK / Registro del Proceso de Ingeniería · Criterio 14</p>
        <h1 style={{ fontSize: '2.2rem', margin: '0.5rem 0', color: 'var(--color-texto, #f1f5f9)' }}>
          Bitácora de Desarrollo y Evolución TP1 → TP2
        </h1>
        <p style={{ color: 'var(--color-texto-suave, #94a3b8)', maxWidth: '820px', lineHeight: '1.65' }}>
          Historial cronológico de decisiones arquitectónicas, dificultades técnicas superadas y aprendizajes colectivos del equipo <strong>200 - OK</strong> durante la construcción de la SPA en React. Filtra los hitos por área temática o integrante y despliega cada acordeón para inspeccionar el detalle de implementación.
        </p>
      </div>

      {/* Barra de controles: Filtros de Categoría, Autor y Expansión Global */}
      <div className="panel-controles-bitacora">
        <div className="grupo-filtros-bitacora">
          <div className="selector-filtro-wrap">
            <label htmlFor="filtro-categoria-bitacora" className="etiqueta-filtro-bitacora">
              🏷️ Categoría:
            </label>
            <select
              id="filtro-categoria-bitacora"
              className="select-bitacora"
              value={categoriaActiva}
              onChange={(e) => setCategoriaActiva(e.target.value)}
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="selector-filtro-wrap">
            <label htmlFor="filtro-autor-bitacora" className="etiqueta-filtro-bitacora">
              👤 Responsable:
            </label>
            <select
              id="filtro-autor-bitacora"
              className="select-bitacora"
              value={autorActivo}
              onChange={(e) => setAutorActivo(e.target.value)}
            >
              {autores.map((autor) => (
                <option key={autor} value={autor}>
                  {autor}
                </option>
              ))}
            </select>
          </div>

          {(categoriaActiva !== 'Todas' || autorActivo !== 'Todos') && (
            <button
              type="button"
              className="boton-limpiar-bitacora"
              onClick={restablecerFiltros}
            >
              🔄 Ver todos ({datosBitacora.length})
            </button>
          )}
        </div>

        <div className="botones-expansion-bitacora">
          <button
            type="button"
            className="boton-accion-bitacora"
            onClick={() => setExpansionForzada(true)}
          >
            ➕ Expandir todos
          </button>
          <button
            type="button"
            className="boton-accion-bitacora"
            onClick={() => setExpansionForzada(false)}
          >
            ➖ Contraer todos
          </button>
        </div>
      </div>

      {/* Barra de resumen estadístico */}
      <div className="barra-resumen-bitacora">
        <span>
          Mostrando <strong style={{ color: 'var(--color-primario, #38bdf8)' }}>{entradasFiltradas.length}</strong> de{' '}
          {datosBitacora.length} hitos documentados
        </span>
        <span>
          Nivel de logro: <strong style={{ color: 'var(--color-estado, #10b981)' }}>Propone</strong> (Acordeones interactivos + Filtros)
        </span>
      </div>

      {/* Lista cronológica de acordeones */}
      <div className="lista-acordeones-bitacora">
        {entradasFiltradas.map((entrada) => (
          <AcordeonBitacora
            key={entrada.id}
            entrada={entrada}
            expansionForzada={expansionForzada}
          />
        ))}
      </div>
    </div>
  );
}
