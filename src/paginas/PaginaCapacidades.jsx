import React, { useState, useMemo } from 'react';
import capacidadesData from '../datos/capacidades.json';
import BarraBusqueda from '../componentes/datos-locales/BarraBusqueda';
import FiltroCategoria from '../componentes/datos-locales/FiltroCategoria';
import TarjetaCapacidad from '../componentes/datos-locales/TarjetaCapacidad';
import '../componentes/datos-locales/DatosLocales.css';

export default function PaginaCapacidades() {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  // Extraer las categorías únicas de forma dinámica desde los datos locales
  const categorias = useMemo(() => {
    return Array.from(new Set(capacidadesData.map((item) => item.categoria)));
  }, []);

  // Filtrado reactivo en tiempo real combinando texto y categoría (Criterio 11)
  const capacidadesFiltradas = useMemo(() => {
    const termino = terminoBusqueda.trim().toLowerCase();

    return capacidadesData.filter((item) => {
      // Coincidencia por texto en nombre, resumen, descripción o herramientas
      const coincideTexto =
        termino === '' ||
        item.nombre.toLowerCase().includes(termino) ||
        item.resumen.toLowerCase().includes(termino) ||
        item.descripcionDetallada.toLowerCase().includes(termino) ||
        item.herramientasRelacionadas?.some((h) => h.toLowerCase().includes(termino));

      // Coincidencia por selector de categoría
      const coincideCategoria =
        categoriaSeleccionada === '' || item.categoria === categoriaSeleccionada;

      return coincideTexto && coincideCategoria;
    });
  }, [terminoBusqueda, categoriaSeleccionada]);

  // Restablecer filtros para recuperar la lista completa de 20 registros
  const handleRestablecer = () => {
    setTerminoBusqueda('');
    setCategoriaSeleccionada('');
  };

  const hayFiltrosActivos = terminoBusqueda !== '' || categoriaSeleccionada !== '';

  return (
    <div className="pagina-capacidades-contenedor">
      {/* Encabezado descriptivo de la sección */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{
          color: '#38bdf8',
          fontSize: '0.82rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em'
        }}>
          Datos Locales JSON · Criterios 10 y 11
        </span>
        <h1 style={{ fontSize: '2.2rem', margin: '0.5rem 0', color: '#f1f5f9' }}>
          Catálogo de Capacidades Técnicas
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '780px', lineHeight: '1.65' }}>
          Inventario de las 20 competencias, tecnologías y disciplinas de ingeniería del equipo. 
          Explora los registros dinámicamente, busca por palabras clave o filtra por área de especialización.
        </p>
      </div>

      {/* Barra de Controles (Buscador, Dropdown y Botón de Reseteo) */}
      <div className="barra-controles-locales">
        <BarraBusqueda
          valor={terminoBusqueda}
          alCambiar={setTerminoBusqueda}
        />

        <FiltroCategoria
          categorias={categorias}
          seleccionada={categoriaSeleccionada}
          alCambiar={setCategoriaSeleccionada}
        />

        {hayFiltrosActivos && (
          <button
            type="button"
            className="boton-restablecer-filtros"
            onClick={handleRestablecer}
            aria-label="Restablecer filtros de búsqueda"
          >
            <span>🔄</span>
            <span>Restablecer filtros</span>
          </button>
        )}
      </div>

      {/* Barra de Estado de Resultados */}
      <div className="barra-estado-resultados">
        <span>
          Mostrando <strong className="destaque-contador">{capacidadesFiltradas.length}</strong> de{' '}
          {capacidadesData.length} capacidades registradas
        </span>
        {hayFiltrosActivos && (
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Filtros aplicados:{' '}
            {terminoBusqueda && `"${terminoBusqueda}" `}
            {categoriaSeleccionada && `[${categoriaSeleccionada}]`}
          </span>
        )}
      </div>

      {/* Grilla de Resultados Dinámicos o Estado Vacío */}
      {capacidadesFiltradas.length > 0 ? (
        <div className="grilla-capacidades">
          {capacidadesFiltradas.map((capacidad) => (
            <TarjetaCapacidad key={capacidad.id} item={capacidad} />
          ))}
        </div>
      ) : (
        /* Estado vacío interactivo (Criterio 11 - Nivel Propone) */
        <div className="estado-vacio-capacidades">
          <span className="icono-estado-vacio" aria-hidden="true">🔍</span>
          <h2 className="titulo-estado-vacio">No se encontraron resultados</h2>
          <p className="texto-estado-vacio">
            No hay capacidades técnicas que coincidan con los criterios actuales de búsqueda
            {terminoBusqueda ? ` para "${terminoBusqueda}"` : ''}
            {categoriaSeleccionada ? ` en la categoría "${categoriaSeleccionada}"` : ''}.
          </p>
          <button
            type="button"
            className="boton-recuperar-lista"
            onClick={handleRestablecer}
          >
            Restablecer lista completa ({capacidadesData.length} capacidades)
          </button>
        </div>
      )}
    </div>
  );
}

