export type ParallaxCleanup = () => void;

export function bindParallax(root: ParentNode = document): ParallaxCleanup {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const nodes = Array.from(
    root.querySelectorAll<HTMLElement>("[data-parallax-speed]"),
  );

  if (nodes.length === 0) {
    return () => undefined;
  }

  let frameId: number | null = null;
  let destroyed = false;
  const initialTransforms = new Map<HTMLElement, string>();

  for (const el of nodes) {
    initialTransforms.set(el, el.style.transform);
  }

  const update = () => {
    if (destroyed) {
      return;
    }

    const y = window.scrollY;

    for (const el of nodes) {
      const speed = Number(el.dataset.parallaxSpeed ?? "0");
      if (!Number.isFinite(speed)) {
        continue;
      }

      el.style.transform = `translate3d(0, ${Math.round(y * speed)}px, 0)`;
    }

    frameId = window.requestAnimationFrame(update);
  };

  frameId = window.requestAnimationFrame(update);

  return () => {
    destroyed = true;

    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    }

    for (const el of nodes) {
      const initialTransform = initialTransforms.get(el);
      if (initialTransform) {
        el.style.transform = initialTransform;
        continue;
      }

      el.style.removeProperty("transform");
    }
  };
}
