# Cinematic Neon Implementation Checklist

Fecha: 2026-05-17

## Checklist por pantalla
- [ ] Respeta palette por tema: cyan/light, magenta/dark.
- [ ] Usa glow sutil de contorno, no glow difuso excesivo.
- [ ] Animaciones principales >= 3.5s (excepto reveal inicial).
- [ ] No usa pulso de escala continuo en elementos clave.
- [ ] Contraste AA mínimo en textos primarios.
- [ ] Focus states visibles y consistentes.

## Checklist por componente UI
- [ ] Variante light/dark probada visualmente.
- [ ] Estados hover/focus/active coherentes con estilo cinematic.
- [ ] Si hay animación, no distrae de la tarea principal.
- [ ] No hay “flicker” ni parpadeos abruptos.

## Loader (baseline ya aprobado)
- [ ] Logo invertido por tema (blanco en light, negro en dark).
- [ ] Contour sweep activo y lento (`4.8s`).
- [ ] Resplandor con máscara del logo.
