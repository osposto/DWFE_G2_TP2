# Documentación Técnica: Funcionamiento y Lógica del Sitio en React

Este documento detalla los principios de arquitectura, patrones de diseño y flujo de datos bajo el ecosistema de **React** utilizados en el proyecto **DWFE · Grupo 2 (TP2)**. Está pensado como guía conceptual tanto para la defensa técnica del trabajo como para facilitar la integración entre los integrantes.

---

## 1. El Paradigma SPA (Single Page Application)

A diferencia de los sitios web tradicionales basados en multipágina (MPA) donde cada clic solicita un nuevo archivo HTML al servidor:
- **Punto de montaje único:** Toda la aplicación vive dentro de un único documento HTML (`index.html`) que contiene `<div id="root"></div>`.
- **Renderizado en el cliente (CSR):** React toma el control del DOM a través de `createRoot` en `src/main.jsx`, montando y desmontando componentes en memoria mediante el **Virtual DOM**, lo que elimina por completo el parpadeo y la recarga de página al navegar.
- **Persistencia de sesión y estados:** Al no haber recargas de página, el estado de la aplicación (filtros aplicados, barra lateral expandida/colapsada) se mantiene fluido mientras el usuario interactúa.

---

## 2. Enrutamiento y Arquitectura de Rutas Anidadas (`React Router`)

El enrutamiento se gestiona de forma declarativa en [`src/App.jsx`](file:///home/orlando/tecnicatura_superior/Tecnicatura_A3_C1/Desarrollo_web_Front/DWFE_G2_TP2/src/App.jsx) mediante componentes de `react-router-dom`:

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<ContenedorPrincipal />}>
      <Route index element={<PaginaInicio />} />
      <Route path="capacidades" element={<PaginaCapacidades />} />
      <Route path="servicios-api" element={<PaginaServicios />} />
      <Route path="arquitectura" element={<PaginaArbol />} />
      <Route path="bitacora" element={<PaginaBitacora />} />
      <Route path="*" element={<PaginaNoEncontrada />} />
    </Route>
  </Routes>
</BrowserRouter>
```

### Conceptos Clave:
1. **Patrón Layout y `<Outlet />`:**
   - `<ContenedorPrincipal />` actúa como envoltorio maestro. Este componente **nunca se desmonta** durante la navegación: la barra lateral permanece montada en su posición fija.
   - El componente `<Outlet />` dentro de `ContenedorPrincipal` actúa como un "marcador de posición dinámico". React Router inyecta allí el componente de la página hija correspondiente a la URL activa.
2. **Detección de ruta activa con `<NavLink />`:**
   - En lugar de enlaces `<a>` tradicionales (que recargarían la página), se usa `<NavLink to="..." />`.
   - `NavLink` intercepta el evento de clic, actualiza la URL en el historial del navegador con la *History API* de HTML5 y evalúa internamente la propiedad booleana `isActive` para aplicar automáticamente la clase CSS `.activo`.
3. **Reescritura de rutas en Vercel (`vercel.json`):**
   - Al recargar el navegador en una ruta profunda como `/capacidades`, el servidor web intentaría buscar una carpeta física `/capacidades/index.html` inexistente.
   - El archivo `vercel.json` indica una regla de *rewrite* hacia `/index.html`, permitiendo que React tome el control de la ruta solicitada en cualquier circunstancia sin arrojar error 404.

---

## 3. Flujo de Datos Unidireccional y Paso de `Props`

En React la información viaja en un solo sentido: **desde los componentes padres hacia los componentes hijos** a través de propiedades (*props*), mientras que las acciones hacia arriba se comunican mediante **funciones de devolución de llamada (*callbacks*)**.

### Ejemplo: Módulo de Capacidades (`PaginaCapacidades`)
[`PaginaCapacidades.jsx`](file:///home/orlando/tecnicatura_superior/Tecnicatura_A3_C1/Desarrollo_web_Front/DWFE_G2_TP2/src/paginas/PaginaCapacidades.jsx) centraliza la fuente de la verdad (*single source of truth*) y distribuye datos y eventos a sus hijos:

```text
PaginaCapacidades (Dueño del estado: terminoBusqueda, categoriaSeleccionada)
 ├── BarraBusqueda ──────► Props: { valor, alCambiar }
 ├── FiltroCategoria ────► Props: { categorias, seleccionada, alCambiar }
 └── TarjetaCapacidad ───► Props: { item } (se reutiliza 20 veces)
```

1. **`BarraBusqueda`** no filtra los datos; solo renderiza el input y avisa a su padre ejecutando `alCambiar(nuevoTexto)`.
2. **`FiltroCategoria`** recibe el listado de categorías disponibles y emite el valor seleccionado mediante `alCambiar(nuevaCategoria)`.
3. **`TarjetaCapacidad`** es un componente puramente presentacional respecto a los datos de la capacidad, pero autónomo respecto a su estado visual interno.

---

## 4. Gestión de Estados con Hooks: `useState` y `useMemo`

### 4.1. `useState` (Estado Local Reactivo)
Se utiliza para cualquier dato que deba provocar una re-renderización de la interfaz cuando cambia:
- En `BarraLateral`: `estaExpandida` (booleano que controla si se muestran solo íconos o íconos + títulos estilo Gemini).
- En `TarjetaCapacidad`: `estaExpandida` (booleano que controla si el panel de detalles técnicos está visible u oculto).
- En `PaginaCapacidades`: `terminoBusqueda` y `categoriaSeleccionada`.

### 4.2. `useMemo` (Optimización y Computación Derivada)
En lugar de almacenar listas filtradas duplicadas en el estado (lo cual es un antipatrón en React), se utiliza `useMemo` para computar los resultados sobre la marcha:

```javascript
const capacidadesFiltradas = useMemo(() => {
  const termino = terminoBusqueda.trim().toLowerCase();
  return capacidadesData.filter((item) => {
    const coincideTexto =
      termino === '' ||
      item.nombre.toLowerCase().includes(termino) ||
      item.resumen.toLowerCase().includes(termino) ||
      item.descripcionDetallada.toLowerCase().includes(termino) ||
      item.herramientasRelacionadas?.some((h) => h.toLowerCase().includes(termino));

    const coincideCategoria =
      categoriaSeleccionada === '' || item.categoria === categoriaSeleccionada;

    return coincideTexto && coincideCategoria;
  });
}, [terminoBusqueda, categoriaSeleccionada]);
```

- **Ventaja de rendimiento:** El filtrado solo se recalcula cuando cambian `terminoBusqueda` o `categoriaSeleccionada`. Si el componente se vuelve a renderizar por otra razón, React devuelve el resultado previamente memorizado sin recomputar.

---

## 5. Renderizado Condicional y Listas con `key`

### 5.1. Listas y el atributo `key`
Al renderizar colecciones dinámicas de elementos (`capacidadesFiltradas.map(...)`), React exige una prop `key` única y estable (en nuestro caso, `capacidad.id` como `"cap-01"`).
- Esto permite al algoritmo de reconciliación de React identificar exactamente qué tarjeta se agregó, modificó o eliminó sin tener que destruir y reconstruir toda la lista en el DOM real.

### 5.2. Manejo de Estado Vacío (Criterio 11 - Propone)
Mediante un operador ternario:
```jsx
{capacidadesFiltradas.length > 0 ? (
  <div className="grilla-capacidades">
    {capacidadesFiltradas.map((item) => (
      <TarjetaCapacidad key={item.id} item={item} />
    ))}
  </div>
) : (
  <div className="estado-vacio-capacidades">
    <h2>No se encontraron resultados</h2>
    <button onClick={handleRestablecer}>Restablecer lista completa</button>
  </div>
)}
```

---

## 6. Solución Técnica de Interfaz: Tooltips Dinámicos con `position: fixed`

Para lograr el comportamiento de menú estilo **Gemini** con explicaciones detalladas sin sufrir recortes por desbordamiento (*overflow clipping*):
1. Los tooltips flotantes tradicionales colocados con `position: absolute` dentro de contenedores con `overflow-x: hidden` o `overflow-y: auto` son recortados por el navegador cuando sobresalen de la barra lateral.
2. En [`BarraLateral.jsx`](file:///home/orlando/tecnicatura_superior/Tecnicatura_A3_C1/Desarrollo_web_Front/DWFE_G2_TP2/src/componentes/estructura/BarraLateral.jsx), al posar el cursor sobre cualquier ícono se captura su posición exacta en pantalla con `e.currentTarget.getBoundingClientRect()`.
3. Un único tooltip global se renderiza con `position: fixed` en las coordenadas `(top, left)` calculadas. Al estar referenciado directamente a la ventana (*viewport*), tiene inmunidad total ante cualquier recorte de contenedores padre y garantiza una experiencia de usuario limpia y profesional.

---

## 7. Recursividad de Componentes (Árbol de Código)

En [`src/componentes/arbol/NodoArbol.jsx`](file:///home/orlando/tecnicatura_superior/Tecnicatura_A3_C1/Desarrollo_web_Front/DWFE_G2_TP2/src/componentes/arbol/NodoArbol.jsx) se implementa el patrón de **componente recursivo**:
- Si el objeto `nodo` tiene hijos en su propiedad `children`, el componente se invoca a sí mismo para renderizar la rama anidada.
- Cada nivel maneja su propio estado local `[estaAbierto, setEstaAbierto]`, lo que permite abrir y cerrar ramas individuales o acoplarse al disparador global para expandir o contraer todo el árbol.
