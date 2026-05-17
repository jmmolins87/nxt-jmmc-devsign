---
title: Cinematic Neon Style Guide
date: '2026-05-17'
project: nxt-jmmcdevsign
tags:
  - style-guide
  - design-system
  - cinematic
  - neon
  - handoff
---
# Cinematic Neon Style Guide

## Dirección visual oficial
Aplicar en toda la web un estilo cinematográfico neon, consistente entre light/dark:
- Contornos iluminados.
- Barridos de luz elegantes.
- Animaciones más lentas y premium.
- Efectos de brillo controlados (sin exceso).

## Reglas
1. Evitar pulsos de escala continuos en elementos principales.
2. Priorizar movimiento de contorno/sweep frente a zoom.
3. Usar tiempos de animación lentos en efectos principales (3.5s a 6s).
4. Mantener legibilidad y contraste como prioridad.
5. El glow debe reforzar la forma del elemento (silueta), no ocultarla.

## Tema y branding
- Light: logo blanco (`jmmc_logo_blanco.svg`).
- Dark: logo negro (`jmmc_logo_negro.svg`).
- Neon light: cyan.
- Neon dark: magenta.

## Loader baseline aprobado
- Contour sweep lento (`4.8s`).
- Glow por máscara con la forma del logo.
- Reveal inicial cinematográfico.

## Aplicación global
Todo componente nuevo (hero, cards, botones, overlays) debe seguir este lenguaje visual antes de merge.
