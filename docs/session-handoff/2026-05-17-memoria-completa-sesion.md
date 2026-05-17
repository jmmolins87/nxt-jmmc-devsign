---
title: Memoria completa de sesión
date: '2026-05-17'
project: nxt-jmmcdevsign
tags:
  - memory
  - handoff
  - loader
  - theme
  - cinematic-neon
  - i18n
  - shadcn
---
# Memoria completa de sesión

## Estado del proyecto
- Next.js 16 + React 19 + Tailwind v4 + shadcn/ui.
- i18n inicial activo con `/es` y `/en`.
- Redirección por `accept-language` desde `/`.
- Home localizada simplificada a loader-only.

## Loader / branding
- Loader principal implementado con logo corporativo.
- Animación enfocada en resplandor de contorno en movimiento.
- Se eliminaron variantes no deseadas (pulso crecer/decrecer).
- Baseline visual: cinematic neon.

## Theme actual
- Temporalmente forzado a light para toda la web.
- Fondo de loader blanco.
- En light: logo blanco + contorno/resplandor cyan en movimiento reforzado.
- Requisito explícito del usuario: que el impacto visual del movimiento en light sea equivalente al de dark, cambiando solo color.

## Archivos funcionales clave
- `components/logo-loader.tsx`
- `app/globals.css`
- `components/initial-loader-gate.tsx`
- `app/loading.tsx`
- `app/[locale]/loading.tsx`
- `app/[locale]/page.tsx`
- `lib/i18n.ts`

## Decisión de diseño vigente
Aplicar este lenguaje visual (cinematic neon) al resto de la web, documentado en guías del repo y handoff de Obsidian.

## Documentos guía
- `docs/design-system/2026-05-17-cinematic-neon-style-guide.md`
- `docs/design-system/2026-05-17-cinematic-neon-implementation-checklist.md`
