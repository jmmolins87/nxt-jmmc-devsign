# Cinematic Neon Style Guide

Fecha: 2026-05-17  
Proyecto: `nxt-jmmcdevsign`

## Dirección visual oficial
Estilo cinematográfico, premium y oscuro/claro adaptable, con énfasis en:
- Contornos luminosos controlados.
- Barridos de luz elegantes (no agresivos).
- Glow con intención visual, no decorativo excesivo.
- Alto contraste y lectura limpia.

## Reglas clave
1. Evitar animaciones de escalado repetitivas tipo "pulse" en elementos principales.
2. Priorizar movimiento lateral/contorno (light sweep o outline sweep) sobre zoom.
3. Mantener transiciones lentas y fluidas:
   - Animaciones protagonistas entre `3.5s` y `6s`.
4. Glow en capas suaves y estables, sin parpadeos bruscos.
5. El contorno del elemento debe sentirse definido por la luz.

## Tema y logos
- Theme `light`: usar `jmmc_logo_blanco.svg`.
- Theme `dark`: usar `jmmc_logo_negro.svg`.
- El resplandor debe seguir la silueta del logo mediante máscara.

## Paleta neon aprobada
- Light: cyan neon (`rgb(34 211 238 / ...)`).
- Dark: magenta neon (`rgb(236 72 153 / ...)`).

## Motion tokens recomendados
- `outline sweep`: `4.8s linear infinite` (base actual aprobada).
- `reveal inicial`: ~`1.2s cubic-bezier(0.2,0.8,0.2,1)`.
- `light sweep puntual`: una pasada de entrada, no bucle continuo.

## Aplicación global (toda la web)
Al diseñar nuevas secciones/componentes:
- Botones, cards y headers pueden llevar borde luminoso sutil en hover/focus.
- Evitar fondos planos sin atmósfera: usar gradientes/luces suaves.
- Mantener consistencia de color neon según tema.
- No mezclar estilos visuales opuestos (minimal flat vs cinematic neon).

## Do / Don't
### Do
- Usar iluminación por contorno.
- Usar tiempos de animación lentos.
- Mantener jerarquía visual clara.

### Don't
- Pulsos de escala constantes en logos o hero principal.
- Demasiados efectos simultáneos.
- Glow tan fuerte que rompa legibilidad.
