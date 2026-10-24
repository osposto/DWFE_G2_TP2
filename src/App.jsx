import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContenedorPrincipal from './componentes/estructura/ContenedorPrincipal';

function VistaPortadaTemporal() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 1.5rem',
      background: 'rgba(10, 17, 30, 0.75)',
      borderRadius: '16px',
      border: '1px solid rgba(56, 189, 248, 0.2)',
      backdropFilter: 'blur(10px)'
    }}>
      <span style={{ color: '#38bdf8', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        DWFE · Trabajo Práctico 2 (React)
      </span>
      <h1 style={{ fontSize: '2.4rem', margin: '1rem 0', color: '#f1f5f9' }}>
        Centro de Operaciones y Desarrollo Front-End
      </h1>
      <p style={{ maxWidth: '650px', margin: '0 auto', color: '#94a3b8', lineHeight: '1.7' }}>
        Estructura base y barra lateral persistente configuradas. Espacio listo para la maquetación de la Portada, Hero section y presentación interactiva de integrantes (Responsabilidad de Adriana).
      </p>
    </div>
  );
}

function VistaCapacidadesTemporal() {
  return (
    <div style={{
      padding: '2.5rem',
      background: 'rgba(10, 17, 30, 0.75)',
      borderRadius: '16px',
      border: '1px solid rgba(56, 189, 248, 0.2)',
      backdropFilter: 'blur(10px)'
    }}>
      <h1 style={{ color: '#38bdf8' }}>Catálogo de Capacidades Técnicas</h1>
      <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
        Espacio asignado a <strong>Orlando</strong> para el catálogo JSON con buscador en vivo, filtro por categorías y panel de detalles técnicos.
      </p>
    </div>
  );
}

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

function VistaArbolTemporal() {
  return (
    <div style={{
      padding: '2.5rem',
      background: 'rgba(10, 17, 30, 0.75)',
      borderRadius: '16px',
      border: '1px solid rgba(56, 189, 248, 0.2)',
      backdropFilter: 'blur(10px)'
    }}>
      <h1 style={{ color: '#38bdf8' }}>Árbol de Renderizado de Componentes</h1>
      <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
        Espacio asignado a <strong>Orlando</strong> para el esquema interactivo de jerarquía de componentes con nodos expandibles y colapsables.
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
          <Route index element={<VistaPortadaTemporal />} />
          <Route path="capacidades" element={<VistaCapacidadesTemporal />} />
          <Route path="servicios-api" element={<VistaServiciosTemporal />} />
          <Route path="arquitectura" element={<VistaArbolTemporal />} />
          <Route path="bitacora" element={<VistaBitacoraTemporal />} />
          <Route path="*" element={<VistaPortadaTemporal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
