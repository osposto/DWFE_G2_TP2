export const datosBitacora = [
  {
    id: 'bit-01',
    fecha: '2026-10-08',
    titulo: 'Transición Arquitectónica del TP1 Estático hacia una SPA en React 18',
    autor: 'Orlando S.',
    categoria: 'Arquitectura y Enrutamiento',
    resumen:
      'Migración de múltiples documentos HTML estáticos a una arquitectura basada en componentes con Vite 5, React 18 y React Router.',
    detalle:
      'En el Trabajo Práctico 1 el sitio dependía de recargas completas de página entre el index y las fichas individuales. Para el TP2 diseñamos un esquema de rutas anidadas gobernado por ContenedorPrincipal.jsx y Outlet, manteniendo viva la BarraLateral sin perder el estado de navegación. Además, se configuró el archivo vercel.json con reglas de rewrite hacia /index.html para evitar errores 404 al recargar rutas profundas en producción.',
    aprendizajes:
      'Separar las responsabilidades en páginas contenedoras (src/paginas/) y componentes presentacionales reutilizables (src/componentes/) permitió que los 3 integrantes del equipo 200 - OK trabajaran en paralelo sin conflictos de fusión en Git.'
  },
  {
    id: 'bit-02',
    fecha: '2026-10-12',
    titulo: 'Identidad Visual "200 - OK", Tokens en variables.css y Tipografías Locales',
    autor: 'Adriana',
    categoria: 'Diseño UI/UX y Estética',
    resumen:
      'Definición del sistema visual SOC / Ciberdefensa Industrial con variables CSS (:root), tipografías autoalojadas (@fontsource) y recursos optimizados en WebP.',
    detalle:
      'Se consolidó la identidad del equipo bajo la marca "200 - OK / Centro de Operaciones", definiendo en variables.css tokens cromáticos (--color-panel, --color-borde, --color-primario-2, --color-warning, --color-alerta) y radios tácticos (--radius-md: 4px, --radius-sm: 2px). Se integraron las familias @fontsource/inter y @fontsource/jetbrains-mono en main.jsx y se optimizaron todas las fotografías, portadas de discos y afiches de películas en formato .webp.',
    aprendizajes:
      'Unificar los tokens en variables.css y aplicarlos de forma transversal en global.css, BarraLateral.css, DatosLocales.css, VistaArbol.css y SeccionServicios.css garantizó una coherencia visual de nivel Supera.'
  },
  {
    id: 'bit-03',
    fecha: '2026-10-15',
    titulo: 'Barra Lateral Persistente Estilo Gemini y Solución de Clipping en Tooltips',
    autor: 'Orlando S.',
    categoria: 'Arquitectura y Enrutamiento',
    resumen:
      'Implementación del menú lateral colapsable/expandible en escritorio, drawer off-canvas en móviles y tooltips flotantes inmunes al recorte por overflow.',
    detalle:
      'Durante las primeras pruebas de la BarraLateral detectamos que los contenedores con overflow-y: auto recortaban los cuadros de ayuda emergentes (tooltips). Se refactorizó la lógica calculando las coordenadas en pantalla mediante getBoundingClientRect() y renderizando el tooltip con position: fixed respecto al viewport, garantizando visibilidad completa tanto en modo compacto como expandido.',
    aprendizajes:
      'Combinar NavLink de React Router con variables CSS dinámicas (--ancho-barra-lateral) permite transiciones fluidas del layout principal sin saltos visuales.'
  },
  {
    id: 'bit-04',
    fecha: '2026-10-18',
    titulo: 'Catálogo Local de 20 Capacidades con Filtrado Reactivo Combinado',
    autor: 'Orlando S.',
    categoria: 'Datos Locales y Estado',
    resumen:
      'Estructuración de capacidades.json en 4 áreas temáticas equilibradas con búsqueda por texto en vivo, filtro por categoría y paneles desplegables.',
    detalle:
      'Se modelaron 20 registros técnicos vinculados a Sistemas Embebidos, Ciberdefensa ICS/SCADA, Desarrollo Backend Seguro e Inteligencia de Datos. Utilizando useMemo se optimizó el filtrado simultáneo por palabra clave (nombre, resumen, descripción y herramientas) y categoría, incorporando además una vista de estado vacío ("Sin resultados") con botón de restablecimiento inmediato.',
    aprendizajes:
      'El estado local independiente dentro de cada TarjetaCapacidad evita re-renderizar toda la grilla cuando el usuario expande o contrae la ficha técnica de un ítem específico.'
  },
  {
    id: 'bit-05',
    fecha: '2026-10-21',
    titulo: 'Perfiles Interactivos en React, Navegación por Teclado y Modales Accesibles',
    autor: 'Adriana',
    categoria: 'Diseño UI/UX y Estética',
    resumen:
      'Desarrollo de PaginaInicio, PaginaPerfil (/perfil/:id) y DetalleIntegrante con pestañas accesibles WAI-ARIA y fichas modales de películas.',
    detalle:
      'Se centralizaron los perfiles de Orlando Sposto, Adriana Van Den Dooren y Guillermo Escobar en datosIntegrantes.js. En DetalleIntegrante.jsx se implementó un sistema de 4 pestañas (Habilidades, Películas favoritas, Discos favoritos y Responsabilidad) con soporte de navegación por flechas de teclado (ArrowLeft, ArrowRight, Home, End) y un diálogo modal accesible (role="dialog", cierre con Escape y restablecimiento automático del foco con useRef) para inspeccionar afiche, año, dirección y sinopsis de cada película.',
    aprendizajes:
      'Cuidar la accesibilidad del teclado y la gestión del foco en modales y tablists eleva la calidad profesional de la interfaz más allá de lo meramente visual.'
  },
  {
    id: 'bit-06',
    fecha: '2026-10-23',
    titulo: 'Integración Asíncrona Dual: GitHub REST API y Hacker News con Promise.all',
    autor: 'Guillermo',
    categoria: 'Servicios API y Asincronía',
    resumen:
      'Desarrollo del módulo de telemetría externa con pestañas intercambiables, peticiones concurrentes y componentes reutilizables Cargando y MensajeError.',
    detalle:
      'La API de Hacker News entrega inicialmente solo un arreglo de IDs numéricos en topstories.json. Para evitar una cascada lenta de peticiones secuenciales, se implementó una resolución en paralelo con Promise.all sobre las historias principales. En paralelo, se integró la API de GitHub con selector rápido de nodos (@osposto, @Adriana-vandendooren, @OWASP, @mitre) y controles para refrescar datos en vivo o simular fallos HTTP, verificando en tiempo real la respuesta del componente MensajeError y su acción alReintentar.',
    aprendizajes:
      'Desacoplar los estados de red (cargando, error y éxito) en componentes reutilizables (Cargando.jsx y MensajeError.jsx) mejora la experiencia de usuario y evita pantallas en blanco ante caídas de red o límites de tasa (Rate Limit 403).'
  },
  {
    id: 'bit-07',
    fecha: '2026-10-24',
    titulo: 'Auditoría del Árbol de Renderizado, Bitácora Interactiva y Documentación IA',
    autor: 'Guillermo',
    categoria: 'Documentación y Calidad',
    resumen:
      'Integración final de las 6 vistas de la SPA, bitácora con acordeones colapsables y actualización integral del README con capturas y matriz de IA.',
    detalle:
      'En la etapa final de integración se conectaron todas las páginas reales en App.jsx y se verificó que la representación en PaginaArbol reflejara los componentes activos de la aplicación. Asimismo, se estructuró esta bitácora interactiva con filtros por categoría y autor, y se documentó en el README.md la tabla de responsabilidades, las capturas de pantalla de la interfaz y la declaración transparente de uso de Inteligencia Artificial por integrante.',
    aprendizajes:
      'Mantener una convención de nombres en español y documentar los contratos de interfaz desde el primer día fue clave para ensamblar el proyecto completo y desplegarlo en Vercel sin fricciones.'
  }
];

export default datosBitacora;
