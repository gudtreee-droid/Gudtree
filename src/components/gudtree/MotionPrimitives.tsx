'use client';

import React from 'react';
import {
  motion,
  useScroll,
  useSpring,
  HTMLMotionProps,
  Transition,
} from 'framer-motion';

export const GT_SPRING: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 28,
  mass: 0.8,
};

export const GT_GENTLE_SPRING: Transition = {
  type: 'spring',
  stiffness: 190,
  damping: 24,
};

export const GT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function TopReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#0A6C33] via-[#16A34A] to-[#22C55E] origin-left z-[70] pointer-events-none"
    />
  );
}

interface FadeUpRevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  yOffset?: number;
  children: React.ReactNode;
}

export function FadeUpReveal({
  delay = 0,
  yOffset = 24,
  children,
  className = '',
  ...props
}: FadeUpRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: GT_EASE,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface TactileCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export function TactileCard({
  children,
  className = '',
  ...props
}: TactileCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      transition={GT_SPRING}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface SquishButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
}

export function SquishButton({
  children,
  className = '',
  ...props
}: SquishButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={GT_SPRING}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function MarqueeRibbon({
  items,
  className = '',
}: {
  items: string[];
  className?: string;
}) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`w-full max-w-full overflow-hidden bg-[#102A56] text-[#FFF9EC] py-3 border-y border-[#0944BA]/40 select-none ${className}`}
      style={{ contain: 'inline-size' }}
    >
      <div className="animate-gt-marquee flex items-center gap-8 whitespace-nowrap">
        {repeated.map((text, idx) => (
          <div key={idx} className="inline-flex items-center gap-8">
            <span className="sc-display-sm text-[#FFF9EC]">
              {text}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#E5F36D]" />
          </div>
        ))}
      </div>
    </div>
  );
}
