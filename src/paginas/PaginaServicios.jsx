import React from 'react';
import SeccionServicios from '../componentes/servicios/SeccionServicios';
import '../componentes/servicios/SeccionServicios.css';

export default function PaginaServicios() {
  return (
    <div className="pagina-servicios-contenedor">
      {/* Encabezado descriptivo alineado con el sistema visual de variables.css y global.css */}
      <div style={{ marginBottom: '2rem' }}>
        <p className="system-overline">200 - OK / Consumo Asíncrono de APIs · Criterio 12</p>
        <h1 style={{ fontSize: '2.2rem', margin: '0.5rem 0', color: 'var(--color-texto, #f1f5f9)' }}>
          Servicios Web y Telemetría Externa
        </h1>
        <p style={{ color: 'var(--color-texto-suave, #94a3b8)', maxWidth: '820px', lineHeight: '1.65' }}>
          Módulo de integración asíncrona en tiempo real conectado a dos fuentes públicas complementarias:{' '}
          <strong>GitHub REST API</strong> para auditar repositorios y actividad de código abierto del equipo, y{' '}
          <strong>Hacker News Firebase API</strong> como radar de tendencias en ingeniería y ciberseguridad.
          Incluye manejo explícito de estados de espera (<em>loading</em>), captura de anomalías de red (<em>error</em>) y controles de actualización bajo demanda.
        </p>
      </div>

      <SeccionServicios />
    </div>
  );
}
