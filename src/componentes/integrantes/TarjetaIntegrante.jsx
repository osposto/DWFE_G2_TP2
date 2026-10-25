import React from 'react';
import { Link } from 'react-router-dom';

export default function TarjetaIntegrante({ integrante }) {
  return (
    <article className="team-card">
      <div className="team-meta">
        <img className="team-avatar" src={integrante.foto} alt={`Foto de ${integrante.nombre}`} />
        <div>
          <span className="team-index">{integrante.codigo}</span>
          <h3>{integrante.nombre}</h3>
          <div className="team-role">{integrante.rol}</div>
        </div>
      </div>

      <p className="team-bio">{integrante.bio}</p>

      <Link
        to={`/perfil/${integrante.id}`}
        className="team-link"
        aria-label={`Ver perfil de ${integrante.nombre}`}
      >
        Abrir perfil <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
