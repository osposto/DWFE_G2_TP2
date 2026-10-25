import React, { useState, useEffect, useCallback } from 'react';
import Cargando from '../comunes/Cargando';
import MensajeError from '../comunes/MensajeError';

const PERFILES_SUGERIDOS = [
  { etiqueta: 'Orlando Sposto (Equipo)', usuario: 'osposto' },
  { etiqueta: 'Adriana VDD (Equipo)', usuario: 'Adriana-vandendooren' },
  { etiqueta: 'OWASP Foundation', usuario: 'OWASP' },
  { etiqueta: 'MITRE Corp', usuario: 'mitre' }
];

export default function PestanaGithub({ usuario = 'osposto' }) {
  const [cuentaActiva, setCuentaActiva] = useState(usuario);
  const [inputUsuario, setInputUsuario] = useState(usuario);
  const [perfilInfo, setPerfilInfo] = useState(null);
  const [repositorios, setRepositorios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);

  const consultarGithub = useCallback(async (nombreUsuario, simularFallo = false) => {
    const objetivo = (nombreUsuario || '').trim();
    if (!objetivo) return;

    setCargando(true);
    setError(null);

    try {
      const endpointPerfil = simularFallo
        ? 'https://api.github.com/users/__usuario_inexistente_prueba_error_404__'
        : `https://api.github.com/users/${encodeURIComponent(objetivo)}`;

      const endpointRepos = `https://api.github.com/users/${encodeURIComponent(objetivo)}/repos?sort=updated&per_page=9`;

      const [resPerfil, resRepos] = await Promise.all([
        fetch(endpointPerfil),
        simularFallo ? Promise.resolve({ ok: false, status: 404 }) : fetch(endpointRepos)
      ]);

      if (!resPerfil.ok) {
        if (resPerfil.status === 404) {
          throw new Error(
            `El usuario o nodo "${simularFallo ? 'nodo-inexistente-404' : objetivo}" no fue encontrado en GitHub (HTTP 404). Verifica el identificador o reintenta la conexión.`
          );
        }
        if (resPerfil.status === 403) {
          throw new Error(
            'Límite de peticiones de la API pública de GitHub alcanzado temporalmente (HTTP 403 Rate Limit). Espera unos segundos y presiona Reintentar.'
          );
        }
        throw new Error(`Error HTTP ${resPerfil.status} al consultar GitHub REST API.`);
      }

      if (!resRepos.ok) {
        throw new Error(`No fue posible obtener la lista de repositorios (HTTP ${resRepos.status}).`);
      }

      const [datosPerfil, datosRepos] = await Promise.all([
        resPerfil.json(),
        resRepos.json()
      ]);

      setPerfilInfo(datosPerfil);
      setRepositorios(Array.isArray(datosRepos) ? datosRepos : []);
      setUltimaActualizacion(new Date().toLocaleTimeString('es-AR'));
    } catch (err) {
      setError(err.message || 'Fallo de red al conectar con api.github.com.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    setCuentaActiva(usuario);
    setInputUsuario(usuario);
    consultarGithub(usuario);
  }, [usuario, consultarGithub]);

  const manejarSubmitUsuario = (e) => {
    e.preventDefault();
    const limpio = inputUsuario.trim();
    if (!limpio) return;
    setCuentaActiva(limpio);
    consultarGithub(limpio);
  };

  const seleccionarSugerido = (nuevoUsuario) => {
    setInputUsuario(nuevoUsuario);
    setCuentaActiva(nuevoUsuario);
    consultarGithub(nuevoUsuario);
  };

  return (
    <div className="panel-pestana-servicio">
      {/* Explicación contextual de la fuente de datos */}
      <div className="caja-contexto-api">
        <div className="contexto-api-info">
          <span className="badge-endpoint">GET api.github.com/users/:username/repos</span>
          <p className="texto-contexto-api">
            <strong>Auditoría de Repositorios y Código Abierto:</strong> Consulta en vivo a la API oficial de GitHub para inspeccionar la actividad técnica, lenguajes predominantes, actualizaciones recientes y proyectos publicados por los integrantes del equipo <strong>200 - OK</strong> o fundaciones internacionales de ciberseguridad.
          </p>
        </div>

        <div className="acciones-rapidas-api">
          <button
            type="button"
            className="boton-refrescar-api"
            onClick={() => consultarGithub(cuentaActiva)}
            disabled={cargando}
            title="Volver a consultar los datos en vivo"
          >
            <span>🔄</span>
            <span>Actualizar ahora</span>
          </button>

          <button
            type="button"
            className="boton-simular-error"
            onClick={() => consultarGithub(cuentaActiva, true)}
            disabled={cargando}
            title="Simula una respuesta HTTP 404 para verificar el componente MensajeError y su reintento"
          >
            <span>⚡</span>
            <span>Probar fallo HTTP</span>
          </button>
        </div>
      </div>

      {/* Selector de perfiles y buscador de cuenta de GitHub */}
      <div className="barra-explorador-github">
        <div className="chips-perfiles-sugeridos">
          <span className="etiqueta-sugeridos">Nodos rápidos:</span>
          {PERFILES_SUGERIDOS.map((item) => (
            <button
              key={item.usuario}
              type="button"
              className={`chip-perfil-btn ${
                cuentaActiva.toLowerCase() === item.usuario.toLowerCase() ? 'activo' : ''
              }`}
              onClick={() => seleccionarSugerido(item.usuario)}
            >
              @{item.usuario} <span className="chip-sub">({item.etiqueta})</span>
            </button>
          ))}
        </div>

        <form className="formulario-usuario-github" onSubmit={manejarSubmitUsuario}>
          <input
            type="text"
            className="input-usuario-github"
            placeholder="Consultar otro usuario GitHub..."
            value={inputUsuario}
            onChange={(e) => setInputUsuario(e.target.value)}
            aria-label="Nombre de usuario de GitHub"
          />
          <button type="submit" className="boton-consultar-usuario" disabled={cargando}>
            Consultar
          </button>
        </form>
      </div>

      {/* Estados explícitos: Cargando, Error o Datos */}
      {cargando ? (
        <Cargando
          mensaje={`Consultando perfil y repositorios públicos de @${cuentaActiva} en GitHub REST API...`}
        />
      ) : error ? (
        <MensajeError
          mensaje={error}
          alReintentar={() => consultarGithub(cuentaActiva, false)}
        />
      ) : (
        <>
          {/* Cabecera resumida del usuario/organización consultada */}
          {perfilInfo && (
            <div className="Resumen-perfil-github">
              <img
                src={perfilInfo.avatar_url}
                alt={`Avatar de ${perfilInfo.login}`}
                className="avatar-github-api"
              />
              <div className="datos-principales-github">
                <div className="fila-nombre-github">
                  <h3>{perfilInfo.name || perfilInfo.login}</h3>
                  <a
                    href={perfilInfo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="enlace-perfil-externo"
                  >
                    @{perfilInfo.login} ↗
                  </a>
                </div>
                {perfilInfo.bio && <p className="bio-github-api">{perfilInfo.bio}</p>}
                <div className="metricas-github-api">
                  <span>
                    📦 Repos públicos: <strong>{perfilInfo.public_repos}</strong>
                  </span>
                  <span>
                    👥 Seguidores: <strong>{perfilInfo.followers}</strong>
                  </span>
                  {perfilInfo.location && (
                    <span>
                      📍 Ubicación: <strong>{perfilInfo.location}</strong>
                    </span>
                  )}
                  {ultimaActualizacion && (
                    <span className="marca-tiempo-api">
                      Última sincronización: {ultimaActualizacion}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Grilla de repositorios */}
          {repositorios.length > 0 ? (
            <div className="grilla-repositorios-github">
              {repositorios.map((repo) => (
                <article key={repo.id} className="tarjeta-repo-github">
                  <div className="cabecera-tarjeta-repo">
                    <span className="icono-repo" aria-hidden="true">
                      📁
                    </span>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="titulo-repo-enlace"
                    >
                      {repo.name}
                    </a>
                  </div>

                  <p className="descripcion-repo">
                    {repo.description ||
                      'Repositorio técnico sin descripción extendida en su cabecera.'}
                  </p>

                  <div className="pie-tarjeta-repo">
                    <span className="badge-lenguaje-repo">
                      <span className="punto-lenguaje" />
                      {repo.language || 'Multi / Docs'}
                    </span>

                    <div className="estadisticas-repo">
                      <span title="Estrellas">⭐ {repo.stargazers_count}</span>
                      <span title="Forks">🍴 {repo.forks_count}</span>
                    </div>

                    <span className="fecha-repo">
                      Act.{' '}
                      {new Date(repo.updated_at).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="estado-sin-repos">
              <p>Esta cuenta no posee repositorios públicos disponibles actualmente.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
