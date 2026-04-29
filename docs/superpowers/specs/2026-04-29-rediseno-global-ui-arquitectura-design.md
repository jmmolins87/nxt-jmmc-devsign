# Diseño: Rediseño Global UI + Base de Arquitectura

Fecha: 2026-04-29  
Proyecto: `nxt-jmmcdevsign`  
Estado: Aprobado en conversación, pendiente de revisión final del usuario en documento

## 1. Objetivo

Realizar un rediseño visual completo del sitio actual y, al mismo tiempo, establecer una base técnica limpia y mantenible para estilos y componentes en Next.js 16.

## 2. Alcance

Incluye todo el sitio actual:

- Home
- About
- Work
- Blog (listado + detalle)
- Admin (layout y pantallas existentes)

## 3. Enfoque elegido

Se adopta enfoque **Shell-first por capas**:

1. Construir base global consistente (foundation + shell + primitives).
2. Migrar páginas por lotes hasta cubrir todo el sitio.
3. Endurecer calidad y eliminar legado al cierre.

Motivo: maximiza consistencia visual y reduce riesgo de regresiones estructurales frente a un rediseño “big-bang”.

## 4. Arquitectura objetivo

### 4.1 Foundation (global)

Definir una base visual única para:

- Tokens de color (incluyendo estados semánticos)
- Tipografía
- Espaciado
- Radios, sombras, superficies
- Motion/estados interactivos
- Reglas responsive

Implementación esperada en `src/styles/` con archivos dedicados a tokens, tema y utilidades.

### 4.2 UI Primitives

Componentes reutilizables y consistentes (sin lógica de negocio específica de página), por ejemplo:

- Button
- Input / Textarea / Select
- Card
- Badge
- Tabs
- Modal/Drawer
- Table

Ubicación principal: `src/components/ui/`.

### 4.3 Composición de páginas

Las páginas deben componer bloques existentes en vez de crear estilos ad-hoc.

- Estructura global: `src/components/layout/`
- Secciones por dominio: `src/components/sections/`
- `src/app/**` centrado en composición y flujo, no en CSS local extenso

## 5. Estructura de carpetas propuesta

- `src/styles/`
  - `tokens.css`
  - `theme.css`
  - `utilities.css`
- `src/components/ui/`
- `src/components/layout/`
- `src/components/sections/`
- `src/app/**` para ensamblado de pantallas

## 6. Reglas de mantenimiento

1. Evitar CSS largo dentro de páginas.
2. Las variantes visuales viven en primitives, no en overrides dispersos.
3. Pantallas nuevas: siempre sobre `layout + sections + ui`.
4. No introducir patrones paralelos para resolver el mismo problema visual.

## 7. Plan de migración por fases

### Fase 1: Foundation

- Definir tokens y escala visual base.
- Alinear base tipográfica y spacing.
- Establecer estados semánticos y responsive.

### Fase 2: Shell global

- Rehacer layout principal del sitio.
- Replantear navegación y contenedores globales.
- Alinear shell de admin con el nuevo sistema.

### Fase 3: UI Primitives

- Construir/normalizar componentes base reutilizables.
- Sustituir piezas inconsistentes existentes.

### Fase 4: Migración de páginas

- Migrar por lotes: home/about/work/blog/admin.
- Validar consistencia visual y de interacción en cada lote.

### Fase 5: Hardening final

- Limpieza de estilos legacy.
- Ajuste fino responsive.
- Revisión de accesibilidad y estados de interacción.

## 8. Calidad y verificación

Criterios mínimos durante la ejecución:

- `pnpm lint` sin errores.
- Sin reglas CSS huérfanas o duplicadas relevantes.
- Estados `hover/focus/disabled/error` consistentes.
- Contraste y legibilidad correctos.
- Navegación/layout estables en móvil y desktop.

## 9. Riesgos y mitigación

### Riesgo 1: convivencia temporal de estilos antiguos y nuevos
Mitigación: migración por lotes con limpieza al cierre de cada lote y hardening final.

### Riesgo 2: inconsistencia de variantes entre páginas
Mitigación: centralizar variantes en primitives y prohibir overrides locales no justificados.

### Riesgo 3: regresiones visuales en admin vs público
Mitigación: usar shell/layout compartidos cuando aplique y checklist de revisión por superficie.

## 10. Criterios de aceptación

Se considera completada esta iniciativa cuando:

1. Todo el sitio actual usa el nuevo sistema visual.
2. Existe una base clara de foundation + primitives + layout + sections.
3. No quedan dependencias significativas de estilos legacy.
4. `pnpm lint` permanece limpio.
5. UX visual y de interacción es consistente en todo el producto.
