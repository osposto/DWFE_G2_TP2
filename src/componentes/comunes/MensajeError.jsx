import React from 'react';
import '../servicios/SeccionServicios.css';

export default function MensajeError({
  mensaje = 'Se produjo una interrupción al consultar el servicio externo.',
  alReintentar
}) {
  return (
    <div className="estado-error-contenedor" role="alert">
      <div className="icono-alerta-error" aria-hidden="true">
        ⚠️
      </div>
      <span className="insignia-alerta-red">Anomalía de Comunicación HTTP</span>
      <h3 className="titulo-estado-error">No se pudo completar la consulta asíncrona</h3>
      <p className="detalle-estado-error">{mensaje}</p>

      {alReintentar && (
        <button
          type="button"
          className="boton-reintentar-consulta"
          onClick={alReintentar}
        >
          <span>🔄</span>
          <span>Reintentar conexión</span>
        </button>
      )}
    </div>
  );
}

