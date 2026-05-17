---
title: Next steps para próxima sesión
date: '2026-05-17'
project: nxt-jmmcdevsign
tags:
  - handoff
  - next-steps
  - backlog
---
# Next steps para próxima sesión

## Prioridad alta
- Definir comportamiento final de la home:
  - Opción A: mantener pantalla loader permanente.
  - Opción B: loader temporal y luego contenido real.
- Si será temporal, decidir duración y transición (fade/scale).

## Prioridad media
- Expandir catálogo shadcn:
  - `card`, `input`, `dialog`, `dropdown-menu`, `skeleton`.
- Crear layout base de app (header/footer) manteniendo i18n y theme.

## Prioridad media
- Mejorar i18n:
  - Extraer textos a diccionarios por archivo/namespace.
  - Añadir selector de idioma en UI y persistencia (cookie).

## Prioridad baja
- Definir estrategia de fuentes para build offline:
  - Mantener Google Fonts (actual).
  - O migrar a fuentes locales para evitar fallos por red.

## Checklist de arranque de sesión
- Revisar `app/layout.tsx`, `app/globals.css`, `components/logo-loader.tsx`.
- Confirmar si el loader debe ser permanente o solo splash.
- Ejecutar lint local y validar navegación `/`, `/es`, `/en`.
