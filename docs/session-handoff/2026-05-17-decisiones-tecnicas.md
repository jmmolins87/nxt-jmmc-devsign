---
title: Decisiones técnicas y convenciones
date: '2026-05-17'
project: nxt-jmmcdevsign
tags:
  - handoff
  - arquitectura
  - convenciones
---
# Decisiones técnicas y convenciones

## i18n
- Implementación mínima propia (sin librería externa) en `lib/i18n.ts`.
- `locales`: `en`, `es`.
- `generateStaticParams` en `app/[locale]/page.tsx`.
- Validación de locale con `isLocale`, fallback 404 con `notFound()` si no es válido.

## Tema
- Tailwind + variables CSS en `app/globals.css`.
- Cambio dark/light por `@media (prefers-color-scheme: dark)`.
- shadcn tokens cargados en `:root` + `@theme inline`.

## UI
- shadcn inicializado (`components.json`).
- Componente base generado: `components/ui/button.tsx`.
- Utilidad `cn` en `lib/utils.ts`.

## Carga y UX
- `loading.tsx` en raíz y por locale para estados de segment loading.
- `InitialLoaderGate` fuerza visibilidad del loader en la carga inicial, incluso si la página responde muy rápido.

## Riesgos conocidos
- En entornos con restricciones de red o política de scripts de `pnpm`, `pnpm lint` puede fallar por `approve-builds`, aunque el código esté bien.
- `next build` puede fallar sin conexión por fuentes Google (`Geist`, `Geist Mono`).
