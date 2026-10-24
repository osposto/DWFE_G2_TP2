import React, { useState, useEffect } from 'react';

export default function NodoArbol({ nodo, expansionForzada }) {
  const [estaAbierto, setEstaAbierto] = useState(true);
  const tieneHijos = nodo.children && nodo.children.length > 0;

  // Permitir que botones globales ("Expandir todo" / "Contraer todo") afecten el estado
  useEffect(() => {
    if (expansionForzada !== null && expansionForzada !== undefined) {
      setEstaAbierto(expansionForzada);
    }
  }, [expansionForzada]);

  const obtenerClaseTipo = (tipo) => {
    switch (tipo) {
      case 'raiz':
        return 'tipo-raiz';
      case 'layout':
        return 'tipo-layout';
      case 'pagina':
        return 'tipo-pagina';
      case 'ui':
        return 'tipo-ui';
      case 'servicio':
        return 'tipo-servicio';
      default:
        return 'tipo-ui';
    }
  };

  return (
    <div className="nodo-arbol-item">
      <div className="fila-nodo-arbol">
        {tieneHijos ? (
          <button
            type="button"
            className="boton-toggle-nodo"
            onClick={() => setEstaAbierto(!estaAbierto)}
            aria-label={estaAbierto ? `Contraer nodo ${nodo.name}` : `Expandir nodo ${nodo.name}`}
            title={estaAbierto ? 'Contraer rama' : 'Expandir rama'}
          >
            {estaAbierto ? '−' : '+'}
          </button>
        ) : (
          <span className="espaciador-hoja" aria-hidden="true">▪</span>
        )}

        <span className="icono-componente" aria-hidden="true">
          {nodo.icono || '⚛️'}
        </span>

        <span className="nombre-componente">
          &lt;{nodo.name}&nbsp;/&gt;
        </span>

        {nodo.tipo && (
          <span className={`insignia-tipo ${obtenerClaseTipo(nodo.tipo)}`}>
            {nodo.tipo}
          </span>
        )}

        {nodo.description && (
          <span className="descripcion-nodo">
            — {nodo.description}
          </span>
        )}
      </div>

      {tieneHijos && estaAbierto && (
        <div className="rama-hijos">
          {nodo.children.map((hijo, indice) => (
            <NodoArbol
              key={`${hijo.name}-${indice}`}
              nodo={hijo}
              expansionForzada={expansionForzada}
            />
          ))}
        </div>
      )}
    </div>
  );
}

