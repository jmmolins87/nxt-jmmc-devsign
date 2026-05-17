---
title: Contexto actual del proyecto
date: '2026-05-17'
project: nxt-jmmcdevsign
tags:
  - handoff
  - codex
  - nextjs
  - shadcn
  - i18n
  - theme
---
# Contexto actual del proyecto

## Stack
- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- shadcn/ui

## Estado funcional (17 mayo 2026)
- i18n base configurado con rutas por locale: `/es` y `/en`.
- Redirección desde `/` al locale detectado por `accept-language`.
- Tema light/dark por preferencia del sistema (CSS media query).
- shadcn inicializado y funcionando.
- Loader visual creado con logo corporativo y glow neon por tema.
- Home localizada (`app/[locale]/page.tsx`) mostrando solo el loader.

## Loader
- Componente: `components/logo-loader.tsx`
- Splash inicial cliente: `components/initial-loader-gate.tsx`
- Loading global: `app/loading.tsx`
- Loading por locale: `app/[locale]/loading.tsx`
- Glow:
  - Light: cyan neon
  - Dark: magenta neon

## Nota importante
- Se aplicó `suppressHydrationWarning` en `app/layout.tsx` para evitar warnings por extensiones de navegador que modifican el DOM antes de hidratar React.
