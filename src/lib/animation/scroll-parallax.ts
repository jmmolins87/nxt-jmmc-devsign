export type ParallaxCleanup = () => void;

export function bindParallax(root?: ParentNode | null): ParallaxCleanup {
  if (typeof window === "undefined" || !root) {
    return () => undefined;
  }

  let nodes: HTMLElement[] = [];
  const initialTranslate = new Map<HTMLElement, string>();
  let pending = false;
  let frameId: number | null = null;
  let destroyed = false;
  let observer: MutationObserver | null = null;

  const collectNodes = () => {
    nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax-speed]"));
    for (const el of nodes) {
      if (!initialTranslate.has(el)) {
        initialTranslate.set(el, el.style.translate);
      }
    }
  };

  const onScroll = () => {
    if (destroyed || pending) {
      return;
    }
    pending = true;
    frameId = window.requestAnimationFrame(update);
  };

  const update = () => {
    if (destroyed) {
      return;
    }

    pending = false;
    const y = window.scrollY;

    for (const el of nodes) {
      const speed = Number(el.dataset.parallaxSpeed ?? "0");
      if (!Number.isFinite(speed)) {
        continue;
      }

      el.style.translate = `0 ${Math.round(y * speed)}px`;
    }
  };

  collectNodes();
  if ("MutationObserver" in window) {
    observer = new MutationObserver(() => {
      collectNodes();
      onScroll();
    });
    const target = root instanceof Document ? root.body : root;
    if (target) {
      observer.observe(target, { childList: true, subtree: true });
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  return () => {
    destroyed = true;
    window.removeEventListener("scroll", onScroll);
    observer?.disconnect();
    observer = null;

    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    }

    for (const el of nodes) {
      const initial = initialTranslate.get(el);
      if (initial) {
        el.style.translate = initial;
      } else {
        el.style.removeProperty("translate");
      }
    }
  };
}
