import React from 'react';

export default function BarraBusqueda({ valor, alCambiar }) {
  return (
    <div className="contenedor-input-busqueda">
      <span className="icono-busqueda" aria-hidden="true">🔍</span>
      <input
        type="text"
        className="input-busqueda"
        placeholder="Buscar por nombre, tecnología o descripción..."
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
        aria-label="Buscar capacidades técnicas"
      />
      {valor && (
        <button
          type="button"
          className="boton-limpiar-busqueda"
          onClick={() => alCambiar('')}
          aria-label="Limpiar texto de búsqueda"
          title="Limpiar búsqueda"
        >
          ✕
        </button>
      )}
    </div>
  );
}

