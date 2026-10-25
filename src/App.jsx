import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContenedorPrincipal from './componentes/estructura/ContenedorPrincipal';
import PaginaCapacidades from './paginas/PaginaCapacidades';
import PaginaArbol from './paginas/PaginaArbol';
import PaginaInicio from './paginas/PaginaInicio';
import PaginaPerfil from './paginas/PaginaPerfil';

function VistaServiciosTemporal() {
  return (
    <div style={{
      padding: '2.5rem',
      background: 'rgba(10, 17, 30, 0.75)',
      borderRadius: '16px',
      border: '1px solid rgba(56, 189, 248, 0.2)',
      backdropFilter: 'blur(10px)'
    }}>
      <h1 style={{ color: '#38bdf8' }}>Servicios y APIs Externas</h1>
      <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
        Espacio asignado a <strong>Guillermo</strong> para la integración asíncrona de GitHub REST API y Hacker News API con manejo de carga y errores.
      </p>
    </div>
  );
}

function VistaBitacoraTemporal() {
  return (
    <div style={{
      padding: '2.5rem',
      background: 'rgba(10, 17, 30, 0.75)',
      borderRadius: '16px',
      border: '1px solid rgba(56, 189, 248, 0.2)',
      backdropFilter: 'blur(10px)'
    }}>
      <h1 style={{ color: '#38bdf8' }}>Bitácora de Desarrollo</h1>
      <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
        Espacio asignado a <strong>Guillermo</strong> para el registro cronológico del proyecto presentado mediante acordeones interactivos.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContenedorPrincipal />}>
          <Route index element={<PaginaInicio />} />
          <Route path="perfil/:id" element={<PaginaPerfil />} />
          <Route path="capacidades" element={<PaginaCapacidades />} />
          <Route path="servicios-api" element={<VistaServiciosTemporal />} />
          <Route path="arquitectura" element={<PaginaArbol />} />
          <Route path="bitacora" element={<VistaBitacoraTemporal />} />
          <Route path="*" element={<PaginaInicio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
