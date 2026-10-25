import React from 'react';
import '../servicios/SeccionServicios.css';

export default function Cargando({
  mensaje = 'Estableciendo enlace seguro y sincronizando telemetría remota...'
}) {
  return (
    <div className="estado-cargando-contenedor" role="status" aria-live="polite">
      <div className="spinner-radar-wrap" aria-hidden="true">
        <div className="spinner-radar-anillo" />
        <span className="spinner-radar-icono">⏳</span>
      </div>
      <span className="etiqueta-estado-red">Sincronizando API Externa</span>
      <p className="mensaje-estado-cargando">{mensaje}</p>
    </div>
  );
}

