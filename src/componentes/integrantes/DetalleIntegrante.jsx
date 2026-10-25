import React, { useEffect, useRef, useState } from 'react';

const tabs = [
  { key: 'habilidades', label: 'Habilidades' },
  { key: 'peliculas', label: 'Películas favoritas' },
  { key: 'discos', label: 'Discos favoritos' },
  { key: 'responsabilidad', label: 'Responsabilidad' }
];

export default function DetalleIntegrante({ integrante }) {
  const [activeTab, setActiveTab] = useState('habilidades');
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const botonCerrarRef = useRef(null);
  const disparadorModalRef = useRef(null);
  const tabActiva = tabs.find((tab) => tab.key === activeTab);

  useEffect(() => {
    if (!peliculaSeleccionada) {
      return undefined;
    }

    const scrollAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const manejarEscape = (event) => {
      if (event.key === 'Escape') {
        setPeliculaSeleccionada(null);
      }
    };

    document.addEventListener('keydown', manejarEscape);
    botonCerrarRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', manejarEscape);
      document.body.style.overflow = scrollAnterior;
      disparadorModalRef.current?.focus();
    };
  }, [peliculaSeleccionada]);

  const manejarTeclasPestana = (event, indiceActual) => {
    let indiceSiguiente;

    if (event.key === 'ArrowRight') {
      indiceSiguiente = (indiceActual + 1) % tabs.length;
    } else if (event.key === 'ArrowLeft') {
      indiceSiguiente = (indiceActual - 1 + tabs.length) % tabs.length;
    } else if (event.key === 'Home') {
      indiceSiguiente = 0;
    } else if (event.key === 'End') {
      indiceSiguiente = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveTab(tabs[indiceSiguiente].key);
    document.getElementById(`tab-${integrante.id}-${tabs[indiceSiguiente].key}`)?.focus();
  };

  const renderContent = () => {
    if (activeTab === 'habilidades') {
      return (
        <div className="tab-panel">
          {integrante.habilidades.length > 0 ? (
            <ul>
              {integrante.habilidades.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="empty-profile-data">Información pendiente de confirmar por el integrante.</p>
          )}
        </div>
      );
    }

    if (activeTab === 'peliculas') {
      return (
        <div className="tab-panel">
          {integrante.peliculas.length > 0 ? (
            <ul className="favorite-movies">
              {integrante.peliculas.map((pelicula) => (
                <li key={pelicula.titulo}>
                  <button
                    className="movie-card-button"
                    type="button"
                    onClick={(event) => {
                      disparadorModalRef.current = event.currentTarget;
                      setPeliculaSeleccionada(pelicula);
                    }}
                    aria-label={`Ver ficha de ${pelicula.titulo}`}
                  >
                    <img src={pelicula.imagen} alt="" />
                    <span>{pelicula.titulo}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-profile-data">Información pendiente de confirmar por el integrante.</p>
          )}
        </div>
      );
    }

    if (activeTab === 'discos') {
      return (
        <div className="tab-panel">
          {integrante.discos.length > 0 ? (
            <ul className="favorite-albums">
              {integrante.discos.map((disco) => (
                <li key={`${disco.artista}-${disco.titulo}`}>
                  <img src={disco.imagen} alt={`Portada de ${disco.titulo} de ${disco.artista}`} />
                  <span>
                    <strong>{disco.titulo}</strong>
                    <span>{disco.artista}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-profile-data">Información pendiente de confirmar por el integrante.</p>
          )}
        </div>
      );
    }

    return (
      <div className="tab-panel">
        <p>{integrante.responsabilidades}</p>
      </div>
    );
  };

  return (
    <div className="profile-card">
      <div className="tab-buttons" role="tablist" aria-label={`Información de ${integrante.nombre}`}>
        {tabs.map((tab, indice) => (
          <button
            key={tab.key}
            type="button"
            className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
            onKeyDown={(event) => manejarTeclasPestana(event, indice)}
            id={`tab-${integrante.id}-${tab.key}`}
            role="tab"
            aria-selected={activeTab === tab.key}
            aria-controls={`perfil-tab-panel-${integrante.id}`}
            tabIndex={activeTab === tab.key ? 0 : -1}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        id={`perfil-tab-panel-${integrante.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${integrante.id}-${tabActiva.key}`}
        tabIndex={0}
      >
        {renderContent()}
      </div>

      {peliculaSeleccionada && (
        <div
          className="movie-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPeliculaSeleccionada(null);
            }
          }}
        >
          <section
            className="movie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`movie-title-${integrante.id}`}
          >
            <button
              ref={botonCerrarRef}
              className="movie-modal-close"
              type="button"
              aria-label="Cerrar ficha de película"
              onClick={() => setPeliculaSeleccionada(null)}
            >
              &times;
            </button>
            <img
              className="movie-modal-poster"
              src={peliculaSeleccionada.imagen}
              alt={`Afiche de ${peliculaSeleccionada.titulo}`}
            />
            <div className="movie-modal-details">
              <h2 id={`movie-title-${integrante.id}`}>{peliculaSeleccionada.titulo}</h2>
              <p><strong>Año:</strong> {peliculaSeleccionada.anio}</p>
              <p><strong>Dirección:</strong> {peliculaSeleccionada.direccion}</p>
              <p className="movie-modal-synopsis">
                <strong>Sinopsis:</strong> {peliculaSeleccionada.sinopsis}
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
