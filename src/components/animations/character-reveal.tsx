'use client';

import { motion } from 'framer-motion';

interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const characterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.3 }
  })
};

export function CharacterReveal({ text, className = '', delay = 0 }: CharacterRevealProps) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i + delay}
          variants={characterVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}