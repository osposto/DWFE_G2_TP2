import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BarraLateral from './BarraLateral';
import './ContenedorPrincipal.css';

export default function ContenedorPrincipal() {
  const [estaExpandida, setEstaExpandida] = useState(false);
  const [estaAbiertaMovil, setEstaAbiertaMovil] = useState(false);

  return (
    <div className={`estructura-raiz ${estaExpandida ? 'sidebar-expandida' : 'sidebar-colapsada'}`}>
      {/* Telón oscurecido para cerrar el menú en móviles */}
      <div
        className={`telon-fondo ${estaAbiertaMovil ? 'abierto' : ''}`}
        onClick={() => setEstaAbiertaMovil(false)}
        aria-hidden="true"
      />

      {/* Menú lateral inteligente con alternador de expansión estilo Gemini */}
      <BarraLateral
        estaExpandida={estaExpandida}
        alAlternarExpandir={() => setEstaExpandida(!estaExpandida)}
        estaAbiertaMovil={estaAbiertaMovil}
        alCerrarMovil={() => setEstaAbiertaMovil(false)}
      />

      <div className="contenido-principal-layout">
        {/* Encabezado superior visible únicamente en móviles */}
        <header className="cabecera-movil">
          <button
            type="button"
            className="boton-hamburguesa"
            onClick={() => setEstaAbiertaMovil(!estaAbiertaMovil)}
            aria-label="Abrir menú de navegación"
          >
            ☰
          </button>
          <span className="titulo-cabecera-movil">DWFE · Grupo 2</span>
        </header>

        {/* Punto de montaje para las rutas hijas de React Router */}
        <main className="contenedor-pagina">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
