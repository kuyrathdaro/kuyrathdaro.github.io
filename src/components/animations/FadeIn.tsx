import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  className = '',
}: FadeInProps) {
  const directionOffset = 24;
  const initialVariants = {
    up: { opacity: 0, y: directionOffset },
    down: { opacity: 0, y: -directionOffset },
    left: { opacity: 0, x: directionOffset },
    right: { opacity: 0, x: -directionOffset },
    none: { opacity: 0 },
  };

  const currentInitial = initialVariants[direction];

  return (
    <motion.div
      initial={currentInitial as any}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
