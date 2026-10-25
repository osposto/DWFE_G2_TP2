import React from 'react';
import { Link } from 'react-router-dom';

export default function PaginaNoEncontrada() {
  return (
    <div className="home-shell" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
      <p className="system-overline" style={{ color: 'var(--color-alerta, #ef4444)' }}>
        404 · SECTOR NO ENCONTRADO
      </p>
      <h1 style={{ fontSize: '2.5rem', margin: '1rem 0', color: 'var(--color-texto, #f1f5f9)' }}>
        Ruta o Coordenada Fuera de Rango
      </h1>
      <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--color-texto-suave, #94a3b8)', lineHeight: '1.7' }}>
        El recurso solicitado no existe o no tiene autorización dentro del Centro de Operaciones. Compruebe la dirección o regrese al panel principal.
      </p>
      <Link to="/" className="primary-button">
        ← Volver al Centro de Control
      </Link>
    </div>
  );
}

