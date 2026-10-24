import React from 'react';

export default function FiltroCategoria({ categorias, seleccionada, alCambiar }) {
  return (
    <div className="contenedor-selector-categoria">
      <span className="icono-categoria" aria-hidden="true">🏷️</span>
      <select
        className="selector-categoria"
        value={seleccionada}
        onChange={(e) => alCambiar(e.target.value)}
        aria-label="Filtrar por categoría técnica"
      >
        <option value="">Todas las categorías ({categorias.length})</option>
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

