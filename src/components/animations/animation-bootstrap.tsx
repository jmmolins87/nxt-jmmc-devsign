'use client';

import { useEffect } from 'react';
import { bindParallax } from '@/lib/animation/scroll-parallax';

export function AnimationBootstrap() {
  useEffect(() => {
    const cleanupParallax = bindParallax(document);

    return () => {
      cleanupParallax();
    };
  }, []);

  return null;
}
