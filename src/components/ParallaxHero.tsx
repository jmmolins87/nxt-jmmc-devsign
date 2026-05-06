"use client";

import { useEffect, useRef } from "react";

type ParallaxHeroProps = {
  children: React.ReactNode;
};

const MOBILE_BREAKPOINT = 768;

export default function ParallaxHero({ children }: ParallaxHeroProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = 0;

    const clearParallax = () => {
      root.style.setProperty("--parallax-bg", "0px");
      root.style.setProperty("--parallax-mid", "0px");
      root.style.setProperty("--parallax-front", "0px");
    };

    const update = () => {
      const reduced = media.matches;
      if (reduced) {
        clearParallax();
        return;
      }

      const scrollY = window.scrollY;
      const factor = window.innerWidth < MOBILE_BREAKPOINT ? 0.5 : 1;
      root.style.setProperty("--parallax-bg", `${Math.round(scrollY * 0.15 * factor)}px`);
      root.style.setProperty("--parallax-mid", `${Math.round(scrollY * 0.35 * factor)}px`);
      root.style.setProperty("--parallax-front", `${Math.round(scrollY * 0.6 * factor)}px`);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        update();
        rafId = 0;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    media.addEventListener("change", update);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      media.removeEventListener("change", update);
    };
  }, []);

  return (
    <section ref={rootRef} className="parallax-hero grid min-h-screen place-items-center px-5 py-10 text-center sm:px-6">
      {children}
    </section>
  );
}
