# Playwright Agent (Fases)

Objetivo: validar UI y regresiones visuales/funcionales en cada fase del proyecto.

## Fase 1 - Smoke
- Verificar que la home carga sin errores.
- Verificar themes forzados:
  - `/?theme=light`
  - `/?theme=dark`

Comando:
```bash
pnpm test:e2e
```

## Fase 2 - UI crítica
- Hero / loader visible.
- Imagen de texto correcta según theme.
- Texto "Próximamente" visible.

## Fase 3 - Responsive
- Comprobación básica mobile/tablet/desktop.
- Layout sin overflow horizontal.

## Fase 4 - Regresión
- Añadir capturas (`toHaveScreenshot`) en vistas clave.
- Ejecutar en CI antes de merge.

## Modo debug local
```bash
pnpm test:e2e:ui
```
